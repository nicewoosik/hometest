import axios from 'axios'
import * as cheerio from 'cheerio'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import http from 'http'
import { URL } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = 'http://ecstel.co.kr'
const OUTPUT_DIR = path.join(__dirname, 'dist')
const visited = new Set()
const toVisit = new Set()
const downloaded = new Set()
const failed = []
const allResources = {
  css: new Set(),
  js: new Set(),
  images: new Set(),
  fonts: new Set()
}

const httpAgent = new http.Agent({ keepAlive: false })

async function download(url, filePath) {
  if (downloaded.has(url)) return true
  
  try {
    const response = await axios.get(url, {
      timeout: 30000,
      httpAgent,
      maxRedirects: 5,
      headers: { 'User-Agent': 'Mozilla/5.0' },
      validateStatus: (status) => status === 200,
      responseType: 'arraybuffer'
    })
    
    await fs.ensureDir(path.dirname(filePath))
    await fs.writeFile(filePath, response.data)
    downloaded.add(url)
    return true
  } catch (error) {
    if (!failed.find(f => f.url === url)) {
      failed.push({ url, error: error.message })
    }
    return false
  }
}

function resolveUrl(relativeUrl, baseUrl) {
  if (!relativeUrl || relativeUrl.startsWith('http') || relativeUrl.startsWith('//') || relativeUrl.startsWith('data:')) {
    return relativeUrl?.startsWith('http') && relativeUrl.includes('ecstel.co.kr') ? relativeUrl : null
  }
  
  try {
    return new URL(relativeUrl, baseUrl).href
  } catch {
    return null
  }
}

async function extractAllResources($, url) {
  // CSS 수집
  $('link[rel="stylesheet"]').each((i, elem) => {
    const href = $(elem).attr('href')
    const resolved = resolveUrl(href, url)
    if (resolved && resolved.includes('ecstel.co.kr')) {
      allResources.css.add(resolved)
    }
  })
  
  // JS 수집
  $('script[src]').each((i, elem) => {
    const src = $(elem).attr('src')
    if (src && !src.startsWith('data:')) {
      const resolved = resolveUrl(src, url)
      if (resolved && resolved.includes('ecstel.co.kr')) {
        allResources.js.add(resolved)
      }
    }
  })
  
  // 이미지 수집 (img 태그)
  $('img[src]').each((i, elem) => {
    const src = $(elem).attr('src')
    if (src && !src.startsWith('data:')) {
      const resolved = resolveUrl(src, url)
      if (resolved && resolved.includes('ecstel.co.kr')) {
        allResources.images.add(resolved)
      }
    }
  })
  
  // 인라인 스타일의 배경 이미지
  $('[style]').each((i, elem) => {
    const style = $(elem).attr('style') || ''
    const urlMatches = style.match(/url\(['"]?([^'")]+)['"]?\)/gi)
    if (urlMatches) {
      urlMatches.forEach(match => {
        const imgUrl = match.replace(/url\(['"]?/, '').replace(/['"]?\)/, '')
        const resolved = resolveUrl(imgUrl, url)
        if (resolved && resolved.includes('ecstel.co.kr')) {
          allResources.images.add(resolved)
        }
      })
    }
  })
  
  // CSS 파일 링크에서 폰트 추출
  $('link[href*="font"], link[href*="woff"], link[href*="ttf"]').each((i, elem) => {
    const href = $(elem).attr('href')
    const resolved = resolveUrl(href, url)
    if (resolved && resolved.includes('ecstel.co.kr')) {
      allResources.fonts.add(resolved)
    }
  })
}

async function extractCSSImages(cssPath, cssUrl) {
  try {
    const cssContent = await fs.readFile(cssPath, 'utf-8')
    const urlRegex = /url\(['"]?([^'")]+)['"]?\)/gi
    let match
    while ((match = urlRegex.exec(cssContent)) !== null) {
      let imgUrl = match[1]
      if (imgUrl.includes('Local Settings') || imgUrl.includes('Temporary Internet')) continue
      if (imgUrl.startsWith('data:')) continue
      
      const resolved = resolveUrl(imgUrl, cssUrl)
      if (resolved && resolved.includes('ecstel.co.kr')) {
        allResources.images.add(resolved)
      }
    }
  } catch (error) {
    // CSS 파일이 아직 다운로드되지 않았을 수 있음
  }
}

async function crawlPage(url) {
  // URL 정규화 (# 제거)
  const cleanUrl = url.split('#')[0]
  if (visited.has(cleanUrl)) return
  visited.add(cleanUrl)
  
  console.log(`크롤링: ${cleanUrl}`)
  
  try {
    const response = await axios.get(cleanUrl, {
      timeout: 30000,
      httpAgent,
      headers: { 'User-Agent': 'Mozilla/5.0' },
      validateStatus: (status) => status === 200
    })
    
    const html = response.data
    const $ = cheerio.load(html)
    
    // HTML 저장
    const urlPath = new URL(cleanUrl).pathname
    const htmlPath = urlPath === '/' ? 'index.html' : urlPath.replace(/^\//, '')
    const localHtmlPath = path.join(OUTPUT_DIR, htmlPath)
    await fs.ensureDir(path.dirname(localHtmlPath))
    await fs.writeFile(localHtmlPath, html)
    
    // 모든 리소스 추출
    await extractAllResources($, cleanUrl)
    
    // 링크 수집 (같은 도메인의 모든 페이지)
    $('a[href]').each((i, elem) => {
      const href = $(elem).attr('href')
      const resolved = resolveUrl(href, cleanUrl)
      if (resolved && resolved.includes('ecstel.co.kr')) {
        const pathname = new URL(resolved).pathname
        // HTML 파일이거나 확장자가 없는 경우, 또는 특정 경로
        if (pathname.endsWith('.html') || 
            (!pathname.includes('.') && pathname !== '/' && pathname.length > 1) ||
            pathname.startsWith('/NEW/html/') ||
            pathname.startsWith('/NEW/board/')) {
          toVisit.add(resolved)
        }
      }
    })
    
  } catch (error) {
    console.error(`크롤링 실패: ${cleanUrl}`, error.message)
  }
}

async function downloadAllResources() {
  console.log('\n리소스 다운로드 시작...')
  
  // CSS 다운로드
  console.log(`CSS 파일: ${allResources.css.size}개`)
  for (const cssUrl of allResources.css) {
    const cssPath = cssUrl.replace(BASE_URL, '').replace(/^\//, '')
    const localPath = path.join(OUTPUT_DIR, cssPath)
    await download(cssUrl, localPath)
    // CSS 파일에서 이미지 추출
    await extractCSSImages(localPath, cssUrl)
    await new Promise(r => setTimeout(r, 100))
  }
  
  // JS 다운로드
  console.log(`JS 파일: ${allResources.js.size}개`)
  for (const jsUrl of allResources.js) {
    const jsPath = jsUrl.replace(BASE_URL, '').replace(/^\//, '')
    const localPath = path.join(OUTPUT_DIR, jsPath)
    await download(jsUrl, localPath)
    await new Promise(r => setTimeout(r, 100))
  }
  
  // 폰트 다운로드
  console.log(`폰트 파일: ${allResources.fonts.size}개`)
  for (const fontUrl of allResources.fonts) {
    const fontPath = fontUrl.replace(BASE_URL, '').replace(/^\//, '')
    const localPath = path.join(OUTPUT_DIR, fontPath)
    await download(fontUrl, localPath)
    await new Promise(r => setTimeout(r, 100))
  }
  
  // 이미지 다운로드
  console.log(`이미지 파일: ${allResources.images.size}개`)
  let imgCount = 0
  for (const imgUrl of allResources.images) {
    const imgPath = imgUrl.replace(BASE_URL, '').replace(/^\//, '')
    const localPath = path.join(OUTPUT_DIR, imgPath)
    if (await download(imgUrl, localPath)) {
      imgCount++
      if (imgCount % 20 === 0) process.stdout.write('.')
    }
    await new Promise(r => setTimeout(r, 100))
  }
  console.log('')
  
  // 다운로드된 CSS 파일에서 다시 이미지 추출
  console.log('다운로드된 CSS에서 배경 이미지 재추출 중...')
  const cssFiles = await fs.readdir(path.join(OUTPUT_DIR, 'css')).catch(() => [])
  for (const cssFile of cssFiles) {
    if (cssFile.endsWith('.css')) {
      const cssPath = path.join(OUTPUT_DIR, 'css', cssFile)
      const cssUrl = `${BASE_URL}/css/${cssFile}`
      await extractCSSImages(cssPath, cssUrl)
    }
  }
  
  // 새로 발견된 이미지 다운로드
  if (allResources.images.size > imgCount) {
    console.log(`추가 이미지 다운로드: ${allResources.images.size - imgCount}개`)
    for (const imgUrl of allResources.images) {
      const imgPath = imgUrl.replace(BASE_URL, '').replace(/^\//, '')
      const localPath = path.join(OUTPUT_DIR, imgPath)
      if (!downloaded.has(imgUrl)) {
        await download(imgUrl, localPath)
        await new Promise(r => setTimeout(r, 100))
      }
    }
  }
}

async function main() {
  console.log('🚀 전체 사이트 완전 크롤링 시작...\n')
  
  // 시작 페이지들
  toVisit.add(`${BASE_URL}/NEW/html/index.html`)
  toVisit.add(`${BASE_URL}/index.html`)
  toVisit.add(`${BASE_URL}/NEW/html/en_index.html`)
  
  // 모든 HTML 페이지 크롤링
  let pageCount = 0
  const maxPages = 200
  while (toVisit.size > 0 && pageCount < maxPages) {
    const url = Array.from(toVisit)[0]
    toVisit.delete(url)
    await crawlPage(url)
    pageCount++
    if (pageCount % 10 === 0) {
      console.log(`진행: ${pageCount}페이지 크롤링 완료...`)
    }
    await new Promise(r => setTimeout(r, 300)) // 서버 부하 방지
  }
  
  // 모든 리소스 다운로드
  await downloadAllResources()
  
  console.log(`\n✅ 크롤링 완료!`)
  console.log(`방문한 페이지: ${visited.size}개`)
  console.log(`다운로드한 파일: ${downloaded.size}개`)
  console.log(`CSS: ${allResources.css.size}개`)
  console.log(`JS: ${allResources.js.size}개`)
  console.log(`이미지: ${allResources.images.size}개`)
  console.log(`폰트: ${allResources.fonts.size}개`)
  console.log(`실패: ${failed.length}개`)
  
  if (failed.length > 0) {
    console.log('\n실패한 파일 (처음 20개):')
    failed.slice(0, 20).forEach(f => console.log(`  - ${f.url}`))
  }
  
  // 통계 출력
  console.log('\n=== 파일 통계 ===')
  const htmlCount = await fs.readdir(OUTPUT_DIR, { recursive: true }).then(files => 
    files.filter(f => f.endsWith('.html')).length
  ).catch(() => 0)
  const imgCount = await fs.readdir(OUTPUT_DIR, { recursive: true }).then(files =>
    files.filter(f => /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(f)).length
  ).catch(() => 0)
  const cssCount = await fs.readdir(OUTPUT_DIR, { recursive: true }).then(files =>
    files.filter(f => f.endsWith('.css')).length
  ).catch(() => 0)
  const jsCount = await fs.readdir(OUTPUT_DIR, { recursive: true }).then(files =>
    files.filter(f => f.endsWith('.js')).length
  ).catch(() => 0)
  
  console.log(`HTML: ${htmlCount}개`)
  console.log(`이미지: ${imgCount}개`)
  console.log(`CSS: ${cssCount}개`)
  console.log(`JS: ${jsCount}개`)
}

main().catch(console.error)


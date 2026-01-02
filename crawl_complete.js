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
const allImages = new Set()
const allCSS = new Set()
const allJS = new Set()

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

async function extractResources($, url) {
  // CSS 수집
  $('link[rel="stylesheet"]').each((i, elem) => {
    const href = $(elem).attr('href')
    const resolved = resolveUrl(href, url)
    if (resolved && resolved.includes('ecstel.co.kr')) {
      allCSS.add(resolved)
    }
  })
  
  // JS 수집
  $('script[src]').each((i, elem) => {
    const src = $(elem).attr('src')
    if (src && !src.startsWith('data:')) {
      const resolved = resolveUrl(src, url)
      if (resolved && resolved.includes('ecstel.co.kr')) {
        allJS.add(resolved)
      }
    }
  })
  
  // 이미지 수집
  $('img[src]').each((i, elem) => {
    const src = $(elem).attr('src')
    if (src && !src.startsWith('data:')) {
      const resolved = resolveUrl(src, url)
      if (resolved && resolved.includes('ecstel.co.kr')) {
        allImages.add(resolved)
      }
    }
  })
  
  // 인라인 스타일의 배경 이미지
  $('[style*="background"]').each((i, elem) => {
    const style = $(elem).attr('style') || ''
    const urlMatch = style.match(/url\(['"]?([^'")]+)['"]?\)/i)
    if (urlMatch) {
      const resolved = resolveUrl(urlMatch[1], url)
      if (resolved && resolved.includes('ecstel.co.kr')) {
        allImages.add(resolved)
      }
    }
  })
}

async function crawlPage(url) {
  if (visited.has(url)) return
  visited.add(url)
  
  console.log(`크롤링: ${url}`)
  
  try {
    const response = await axios.get(url, {
      timeout: 30000,
      httpAgent,
      headers: { 'User-Agent': 'Mozilla/5.0' },
      validateStatus: (status) => status === 200
    })
    
    const html = response.data
    const $ = cheerio.load(html)
    
    // HTML 저장
    const urlPath = new URL(url).pathname
    const htmlPath = urlPath === '/' ? 'index.html' : urlPath.replace(/^\//, '')
    const localHtmlPath = path.join(OUTPUT_DIR, htmlPath)
    await fs.ensureDir(path.dirname(localHtmlPath))
    await fs.writeFile(localHtmlPath, html)
    
    // 리소스 추출
    await extractResources($, url)
    
    // 링크 수집 (같은 도메인의 HTML 페이지)
    $('a[href]').each((i, elem) => {
      const href = $(elem).attr('href')
      const resolved = resolveUrl(href, url)
      if (resolved && resolved.includes('ecstel.co.kr')) {
        const pathname = new URL(resolved).pathname
        // HTML 파일이거나 확장자가 없는 경우
        if (pathname.endsWith('.html') || (!pathname.includes('.') && pathname !== '/')) {
          toVisit.add(resolved)
        }
      }
    })
    
  } catch (error) {
    console.error(`크롤링 실패: ${url}`, error.message)
  }
}

async function downloadAllResources() {
  console.log('\n리소스 다운로드 시작...')
  
  // CSS 다운로드
  console.log(`CSS 파일: ${allCSS.size}개`)
  for (const cssUrl of allCSS) {
    const cssPath = cssUrl.replace(BASE_URL, '').replace(/^\//, '')
    const localPath = path.join(OUTPUT_DIR, cssPath)
    await download(cssUrl, localPath)
    await new Promise(r => setTimeout(r, 100))
  }
  
  // JS 다운로드
  console.log(`JS 파일: ${allJS.size}개`)
  for (const jsUrl of allJS) {
    const jsPath = jsUrl.replace(BASE_URL, '').replace(/^\//, '')
    const localPath = path.join(OUTPUT_DIR, jsPath)
    await download(jsUrl, localPath)
    await new Promise(r => setTimeout(r, 100))
  }
  
  // 이미지 다운로드
  console.log(`이미지 파일: ${allImages.size}개`)
  let imgCount = 0
  for (const imgUrl of allImages) {
    const imgPath = imgUrl.replace(BASE_URL, '').replace(/^\//, '')
    const localPath = path.join(OUTPUT_DIR, imgPath)
    if (await download(imgUrl, localPath)) {
      imgCount++
      if (imgCount % 10 === 0) process.stdout.write('.')
    }
    await new Promise(r => setTimeout(r, 100))
  }
  console.log('')
  
  // CSS 파일에서 배경 이미지 추출
  console.log('CSS에서 배경 이미지 추출 중...')
  const cssFiles = await fs.readdir(path.join(OUTPUT_DIR, 'css')).catch(() => [])
  for (const cssFile of cssFiles) {
    if (cssFile.endsWith('.css')) {
      const cssPath = path.join(OUTPUT_DIR, 'css', cssFile)
      try {
        const cssContent = await fs.readFile(cssPath, 'utf-8')
        const urlRegex = /url\(['"]?([^'")]+)['"]?\)/gi
        let match
        while ((match = urlRegex.exec(cssContent)) !== null) {
          let imgUrl = match[1]
          if (imgUrl.includes('Local Settings') || imgUrl.includes('Temporary Internet')) continue
          if (imgUrl.startsWith('data:')) continue
          
          const resolved = resolveUrl(imgUrl, `${BASE_URL}/css/${cssFile}`)
          if (resolved && resolved.includes('ecstel.co.kr')) {
            const imgPath = resolved.replace(BASE_URL, '').replace(/^\//, '')
            const localPath = path.join(OUTPUT_DIR, imgPath)
            await download(resolved, localPath)
          }
        }
      } catch (error) {
        // CSS 파일이 아직 다운로드되지 않았을 수 있음
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
  while (toVisit.size > 0 && pageCount < 100) { // 최대 100페이지
    const url = Array.from(toVisit)[0]
    toVisit.delete(url)
    await crawlPage(url)
    pageCount++
    await new Promise(r => setTimeout(r, 500)) // 서버 부하 방지
  }
  
  // 모든 리소스 다운로드
  await downloadAllResources()
  
  console.log(`\n✅ 크롤링 완료!`)
  console.log(`방문한 페이지: ${visited.size}개`)
  console.log(`다운로드한 파일: ${downloaded.size}개`)
  console.log(`CSS: ${allCSS.size}개`)
  console.log(`JS: ${allJS.size}개`)
  console.log(`이미지: ${allImages.size}개`)
  console.log(`실패: ${failed.length}개`)
  
  if (failed.length > 0) {
    console.log('\n실패한 파일 (처음 10개):')
    failed.slice(0, 10).forEach(f => console.log(`  - ${f.url}`))
  }
}

main().catch(console.error)



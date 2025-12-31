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

const downloaded = new Set()
const failed = []

async function download(url, filePath) {
  if (downloaded.has(url)) return true
  
  try {
    const response = await axios.get(url, {
      timeout: 30000,
      httpAgent: new http.Agent({ keepAlive: false }),
      maxRedirects: 5,
      headers: { 'User-Agent': 'Mozilla/5.0' },
      validateStatus: (status) => status === 200
    })
    
    await fs.ensureDir(path.dirname(filePath))
    await fs.writeFile(filePath, response.data)
    downloaded.add(url)
    return true
  } catch (error) {
    failed.push({ url, error: error.message })
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

async function main() {
  console.log('🚀 완전 크롤링 시작...\n')
  
  // 1. 메인 HTML
  console.log('1. 메인 HTML 다운로드...')
  const mainUrl = `${BASE_URL}/NEW/html/index.html`
  await download(mainUrl, path.join(OUTPUT_DIR, 'NEW/html/index.html'))
  
  // 2. HTML 파싱
  const html = await fs.readFile(path.join(OUTPUT_DIR, 'NEW/html/index.html'), 'utf-8')
  const $ = cheerio.load(html)
  
  // 3. 리소스 수집
  const resources = { css: new Set(), js: new Set(), images: new Set() }
  
  $('link[rel="stylesheet"]').each((i, elem) => {
    const href = $(elem).attr('href')
    const resolved = resolveUrl(href, mainUrl)
    if (resolved) resources.css.add(resolved)
  })
  
  $('script[src]').each((i, elem) => {
    const src = $(elem).attr('src')
    if (src && !src.startsWith('data:')) {
      const resolved = resolveUrl(src, mainUrl)
      if (resolved) resources.js.add(resolved)
    }
  })
  
  $('img[src]').each((i, elem) => {
    const src = $(elem).attr('src')
    if (src && !src.startsWith('data:')) {
      const resolved = resolveUrl(src, mainUrl)
      if (resolved) resources.images.add(resolved)
    }
  })
  
  // 4. CSS 파일 다운로드 및 배경 이미지 추출
  console.log(`2. CSS 파일 다운로드 (${resources.css.size}개)...`)
  for (const cssUrl of resources.css) {
    const cssPath = cssUrl.replace(BASE_URL, '').replace(/^\//, '')
    const localPath = path.join(OUTPUT_DIR, cssPath)
    await download(cssUrl, localPath)
    
    // CSS에서 배경 이미지 추출
    if (await fs.pathExists(localPath)) {
      const cssContent = await fs.readFile(localPath, 'utf-8')
      const urlRegex = /url\(['"]?([^'")]+)['"]?\)/gi
      let match
      while ((match = urlRegex.exec(cssContent)) !== null) {
        let imgUrl = match[1]
        if (imgUrl.includes('Local Settings') || imgUrl.includes('Temporary Internet')) continue
        if (imgUrl.startsWith('data:')) continue
        const resolved = resolveUrl(imgUrl, cssUrl)
        if (resolved) resources.images.add(resolved)
      }
    }
  }
  
  // 5. JS 파일 다운로드
  console.log(`3. JS 파일 다운로드 (${resources.js.size}개)...`)
  for (const jsUrl of resources.js) {
    const jsPath = jsUrl.replace(BASE_URL, '').replace(/^\//, '')
    const localPath = path.join(OUTPUT_DIR, jsPath)
    await download(jsUrl, localPath)
  }
  
  // 6. 이미지 다운로드
  console.log(`4. 이미지 다운로드 (${resources.images.size}개)...`)
  let imgSuccess = 0
  for (const imgUrl of resources.images) {
    const imgPath = imgUrl.replace(BASE_URL, '').replace(/^\//, '')
    const localPath = path.join(OUTPUT_DIR, imgPath)
    if (await download(imgUrl, localPath)) {
      imgSuccess++
      process.stdout.write('.')
    } else {
      process.stdout.write('x')
    }
    await new Promise(r => setTimeout(r, 100))
  }
  console.log('')
  
  // 7. HTML 경로 수정
  console.log('5. HTML 경로 수정...')
  let htmlContent = await fs.readFile(path.join(OUTPUT_DIR, 'NEW/html/index.html'), 'utf-8')
  htmlContent = htmlContent.replace(/href="\.\.\/css\//g, 'href="/css/')
  htmlContent = htmlContent.replace(/src="\.\.\/js\//g, 'src="/js/')
  htmlContent = htmlContent.replace(/src="\.\.\/board\//g, 'src="/board/')
  htmlContent = htmlContent.replace(/src="\.\.\/images\//g, 'src="/NEW/images/')
  await fs.writeFile(path.join(OUTPUT_DIR, 'NEW/html/index.html'), htmlContent)
  
  // 8. CSS 경로 수정
  console.log('6. CSS 경로 수정...')
  const cssFiles = await fs.readdir(path.join(OUTPUT_DIR, 'css'))
  for (const cssFile of cssFiles) {
    if (cssFile.endsWith('.css')) {
      let cssContent = await fs.readFile(path.join(OUTPUT_DIR, 'css', cssFile), 'utf-8')
      cssContent = cssContent.replace(/url\(['"]?\.\.\/images\//g, 'url(\'/NEW/images/')
      cssContent = cssContent.replace(/url\(['"]?\.\.\/NEW\/images\//g, 'url(\'/NEW/images/')
      cssContent = cssContent.replace(/url\(['"]?\/images\//g, 'url(\'/NEW/images/')
      await fs.writeFile(path.join(OUTPUT_DIR, 'css', cssFile), cssContent)
    }
  }
  
  // 9. index.html 생성 (리다이렉트)
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'index.html'),
    '<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=/NEW/html/index.html"></head><body></body></html>'
  )
  
  console.log('\n✅ 크롤링 완료!')
  console.log(`다운로드 성공: ${downloaded.size}개`)
  console.log(`실패: ${failed.length}개`)
  
  if (failed.length > 0) {
    console.log('\n실패한 파일:')
    failed.slice(0, 10).forEach(f => console.log(`  - ${f.url}`))
  }
}

main().catch(console.error)


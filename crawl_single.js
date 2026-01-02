import axios from 'axios'
import * as cheerio from 'cheerio'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'
import http from 'http'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = 'http://ecstel.co.kr'
const OUTPUT_DIR = path.join(__dirname, 'dist')

// 특정 페이지 크롤링
async function crawlSinglePage(url, outputPath) {
  try {
    console.log(`📄 페이지 크롤링: ${url}`)
    
    const response = await axios.get(url, {
      timeout: 30000,
      httpAgent: new http.Agent({
        keepAlive: true
      }),
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        keepAlive: true
      })
    })
    
    const $ = cheerio.load(response.data)
    
    // 모든 리소스 URL 수집
    const resources = {
      css: [],
      js: [],
      images: []
    }
    
    // CSS 파일
    $('link[rel="stylesheet"]').each((i, elem) => {
      const href = $(elem).attr('href')
      if (href) {
        const fullUrl = href.startsWith('http') ? href : new URL(href, BASE_URL).href
        resources.css.push(fullUrl)
      }
    })
    
    // JS 파일
    $('script[src]').each((i, elem) => {
      const src = $(elem).attr('src')
      if (src && !src.startsWith('data:')) {
        const fullUrl = src.startsWith('http') ? src : new URL(src, BASE_URL).href
        resources.js.push(fullUrl)
      }
    })
    
    // 이미지 파일
    $('img[src]').each((i, elem) => {
      const src = $(elem).attr('src')
      if (src && !src.startsWith('data:')) {
        const fullUrl = src.startsWith('http') ? src : new URL(src, BASE_URL).href
        resources.images.push(fullUrl)
      }
    })
    
    // 리소스 URL을 상대 경로로 변경
    resources.css.forEach(cssUrl => {
      const cssPath = cssUrl.replace(BASE_URL, '')
      $('link[href*="' + cssUrl.replace(BASE_URL, '') + '"]').each((i, elem) => {
        $(elem).attr('href', cssPath)
      })
    })
    
    resources.js.forEach(jsUrl => {
      const jsPath = jsUrl.replace(BASE_URL, '')
      $('script[src*="' + jsUrl.replace(BASE_URL, '') + '"]').each((i, elem) => {
        $(elem).attr('src', jsPath)
      })
    })
    
    resources.images.forEach(imgUrl => {
      const imgPath = imgUrl.replace(BASE_URL, '')
      $('img[src*="' + imgUrl.replace(BASE_URL, '') + '"]').each((i, elem) => {
        $(elem).attr('src', imgPath)
      })
    })
    
    // 절대 URL을 상대 경로로 변경
    const html = $.html()
      .replace(new RegExp(BASE_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '')
      .replace(/href="https?:\/\/www?\.?ecstel\.co\.kr/g, 'href="')
      .replace(/src="https?:\/\/www?\.?ecstel\.co\.kr/g, 'src="')
      .replace(/href="http:\/\/ecstel\.co\.kr/g, 'href="')
      .replace(/src="http:\/\/ecstel\.co\.kr/g, 'src="')
    
    await fs.ensureDir(path.dirname(outputPath))
    await fs.writeFile(outputPath, html)
    console.log(`✅ HTML 저장: ${outputPath}`)
    
    // 리소스 다운로드
    console.log(`📦 리소스 다운로드 시작...`)
    
    async function downloadFile(url, filePath) {
      try {
        const response = await axios.get(url, {
          responseType: 'arraybuffer',
          timeout: 30000,
          httpAgent: new http.Agent({ keepAlive: true }),
          httpsAgent: new https.Agent({ rejectUnauthorized: false, keepAlive: true })
        })
        await fs.ensureDir(path.dirname(filePath))
        await fs.writeFile(filePath, response.data)
        console.log(`✅ 다운로드: ${url}`)
        return true
      } catch (error) {
        console.error(`❌ 다운로드 실패: ${url} - ${error.message}`)
        return false
      }
    }
    
    for (const cssUrl of [...new Set(resources.css)]) {
      const cssPath = cssUrl.replace(BASE_URL, '').replace(/^\//, '')
      const localPath = path.join(OUTPUT_DIR, cssPath)
      await downloadFile(cssUrl, localPath)
    }
    
    for (const jsUrl of [...new Set(resources.js)]) {
      const jsPath = jsUrl.replace(BASE_URL, '').replace(/^\//, '')
      const localPath = path.join(OUTPUT_DIR, jsPath)
      await downloadFile(jsUrl, localPath)
    }
    
    for (const imgUrl of [...new Set(resources.images)]) {
      const imgPath = imgUrl.replace(BASE_URL, '').replace(/^\//, '')
      const localPath = path.join(OUTPUT_DIR, imgPath)
      await downloadFile(imgUrl, localPath)
    }
    
    console.log('✅ 완료!')
  } catch (error) {
    console.error(`❌ 크롤링 실패: ${url} - ${error.message}`)
  }
}

// 메인 페이지 크롤링
const mainPageUrl = `${BASE_URL}/NEW/html/index.html`
const outputPath = path.join(OUTPUT_DIR, 'NEW/html/index.html')

console.log('🚀 메인 페이지 크롤링 시작...')
console.log(`URL: ${mainPageUrl}`)
console.log(`출력: ${outputPath}`)
console.log('')

crawlSinglePage(mainPageUrl, outputPath).catch(console.error)



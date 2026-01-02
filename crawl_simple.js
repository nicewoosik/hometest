import axios from 'axios'
import * as cheerio from 'cheerio'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import http from 'http'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = 'http://ecstel.co.kr'
const OUTPUT_DIR = path.join(__dirname, 'dist')

// 간단한 다운로드 함수
async function download(url, filePath) {
  try {
    console.log(`다운로드 시도: ${url}`)
    
    const response = await axios.get(url, {
      timeout: 10000,
      httpAgent: new http.Agent({ keepAlive: false }),
      maxRedirects: 5,
      validateStatus: (status) => status < 500
    })
    
    if (response.status === 200) {
      await fs.ensureDir(path.dirname(filePath))
      await fs.writeFile(filePath, response.data)
      console.log(`✅ 성공: ${url}`)
      return true
    } else {
      console.log(`⚠️ ${response.status}: ${url}`)
      return false
    }
  } catch (error) {
    console.log(`❌ 실패: ${url} - ${error.message}`)
    return false
  }
}

// 메인 페이지 크롤링
async function main() {
  console.log('🚀 간단한 크롤링 시작...\n')
  
  // 1. 메인 페이지
  const mainPage = `${BASE_URL}/NEW/html/index.html`
  const mainHtml = await download(mainPage, path.join(OUTPUT_DIR, 'NEW/html/index.html'))
  
  if (!mainHtml) {
    console.log('\n❌ 메인 페이지를 가져올 수 없습니다.')
    return
  }
  
  // 2. HTML 파싱
  const htmlContent = await fs.readFile(path.join(OUTPUT_DIR, 'NEW/html/index.html'), 'utf-8')
  const $ = cheerio.load(htmlContent)
  
  // 3. 필요한 리소스 수집
  const resources = {
    css: [],
    js: [],
    images: []
  }
  
  // CSS
  $('link[rel="stylesheet"]').each((i, elem) => {
    const href = $(elem).attr('href')
    if (href && !href.startsWith('http') && !href.startsWith('//')) {
      resources.css.push(href.startsWith('/') ? href : '/' + href)
    }
  })
  
  // JS
  $('script[src]').each((i, elem) => {
    const src = $(elem).attr('src')
    if (src && !src.startsWith('http') && !src.startsWith('//') && !src.startsWith('data:')) {
      resources.js.push(src.startsWith('/') ? src : '/' + src)
    }
  })
  
  // 이미지
  $('img[src]').each((i, elem) => {
    const src = $(elem).attr('src')
    if (src && !src.startsWith('http') && !src.startsWith('//') && !src.startsWith('data:')) {
      resources.images.push(src.startsWith('/') ? src : '/' + src)
    }
  })
  
  console.log(`\n발견된 리소스:`)
  console.log(`- CSS: ${resources.css.length}개`)
  console.log(`- JS: ${resources.js.length}개`)
  console.log(`- 이미지: ${resources.images.length}개\n`)
  
  // 4. 리소스 다운로드
  let success = 0
  let fail = 0
  
  for (const css of [...new Set(resources.css)]) {
    const url = BASE_URL + css
    const filePath = path.join(OUTPUT_DIR, css.replace(/^\//, ''))
    if (await download(url, filePath)) success++
    else fail++
    await new Promise(r => setTimeout(r, 300))
  }
  
  for (const js of [...new Set(resources.js)]) {
    const url = BASE_URL + js
    const filePath = path.join(OUTPUT_DIR, js.replace(/^\//, ''))
    if (await download(url, filePath)) success++
    else fail++
    await new Promise(r => setTimeout(r, 300))
  }
  
  for (const img of [...new Set(resources.images)]) {
    const url = BASE_URL + img
    const filePath = path.join(OUTPUT_DIR, img.replace(/^\//, ''))
    if (await download(url, filePath)) success++
    else fail++
    await new Promise(r => setTimeout(r, 200))
  }
  
  console.log(`\n✅ 완료!`)
  console.log(`성공: ${success}개`)
  console.log(`실패: ${fail}개`)
}

main().catch(console.error)



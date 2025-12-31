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

// 디렉토리 생성
await fs.ensureDir(OUTPUT_DIR)
await fs.ensureDir(path.join(OUTPUT_DIR, 'css'))
await fs.ensureDir(path.join(OUTPUT_DIR, 'js'))
await fs.ensureDir(path.join(OUTPUT_DIR, 'images'))
await fs.ensureDir(path.join(OUTPUT_DIR, 'NEW'))

console.log('🚀 ECSTEL 웹사이트 크롤링 시작...')
console.log(`대상 URL: ${BASE_URL}`)
console.log(`출력 디렉토리: ${OUTPUT_DIR}`)
console.log('')

// 파일 다운로드 함수
async function downloadFile(url, filePath) {
  try {
    // URL 정규화
    let normalizedUrl = url
    if (!normalizedUrl.startsWith('http')) {
      normalizedUrl = new URL(normalizedUrl, BASE_URL).href
    }
    
    // 중복 슬래시 제거
    normalizedUrl = normalizedUrl.replace(/([^:]\/)\/+/g, '$1')
    
    const response = await axios.get(normalizedUrl, {
      responseType: 'arraybuffer',
      timeout: 30000,
      httpAgent: new http.Agent({
        keepAlive: true
      }),
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        keepAlive: true
      }),
      validateStatus: function (status) {
        return status >= 200 && status < 400
      }
    })
    
    await fs.ensureDir(path.dirname(filePath))
    await fs.writeFile(filePath, response.data)
    console.log(`✅ 다운로드 완료: ${normalizedUrl}`)
    return true
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error(`❌ 404 Not Found: ${url}`)
    } else {
      console.error(`❌ 다운로드 실패: ${url} - ${error.message}`)
    }
    return false
  }
}

// HTML 페이지 크롤링
async function crawlPage(url, outputPath) {
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
      images: [],
      links: []
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
    
    // 링크 (다른 페이지)
    $('a[href]').each((i, elem) => {
      const href = $(elem).attr('href')
      if (href && href.startsWith('/') && !href.startsWith('//')) {
        resources.links.push(href)
      }
    })
    
    // 리다이렉트 메타 태그 확인
    $('meta[http-equiv="refresh"]').each((i, elem) => {
      const content = $(elem).attr('content')
      if (content && content.includes('url=')) {
        const redirectUrl = content.split('url=')[1]
        if (redirectUrl && redirectUrl.startsWith('/')) {
          resources.links.push(redirectUrl)
        }
      }
    })
    
    // 리소스 URL을 상대 경로로 변경
    resources.css.forEach(cssUrl => {
      const cssPath = cssUrl.replace(BASE_URL, '').replace(/^\/+/, '/')
      const originalPath = cssUrl.replace(BASE_URL, '')
      $('link[rel="stylesheet"]').each((i, elem) => {
        const href = $(elem).attr('href')
        if (href && (href === originalPath || href.includes(originalPath) || cssUrl.includes(href))) {
          $(elem).attr('href', cssPath)
        }
      })
    })
    
    resources.js.forEach(jsUrl => {
      const jsPath = jsUrl.replace(BASE_URL, '').replace(/^\/+/, '/')
      const originalPath = jsUrl.replace(BASE_URL, '')
      $('script[src]').each((i, elem) => {
        const src = $(elem).attr('src')
        if (src && (src === originalPath || src.includes(originalPath) || jsUrl.includes(src))) {
          $(elem).attr('src', jsPath)
        }
      })
    })
    
    resources.images.forEach(imgUrl => {
      const imgPath = imgUrl.replace(BASE_URL, '').replace(/^\/+/, '/')
      const originalPath = imgUrl.replace(BASE_URL, '')
      $('img[src]').each((i, elem) => {
        const src = $(elem).attr('src')
        if (src && (src === originalPath || src.includes(originalPath) || imgUrl.includes(src))) {
          $(elem).attr('src', imgPath)
        }
      })
    })
    
    // 절대 URL을 상대 경로로 변경
    const html = $.html()
      .replace(new RegExp(BASE_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '')
      .replace(/href="https?:\/\/www?\.?ecstel\.co\.kr/g, 'href="')
      .replace(/src="https?:\/\/www?\.?ecstel\.co\.kr/g, 'src="')
      .replace(/href="http:\/\/ecstel\.co\.kr/g, 'href="')
      .replace(/src="http:\/\/ecstel\.co\.kr/g, 'src="')
    
    await fs.writeFile(outputPath, html)
    console.log(`✅ HTML 저장: ${outputPath}`)
    
    // 리소스 다운로드
    console.log(`📦 리소스 다운로드 시작...`)
    
    // CSS 파일 다운로드
    for (const cssUrl of [...new Set(resources.css)]) {
      if (!cssUrl || !cssUrl.includes('ecstel.co.kr')) continue
      let cssPath = cssUrl.replace(BASE_URL, '').replace(/^\/+/, '/')
      if (!cssPath.startsWith('/')) cssPath = '/' + cssPath
      const localPath = path.join(OUTPUT_DIR, cssPath.replace(/^\//, ''))
      const success = await downloadFile(cssUrl, localPath)
      if (!success && cssPath.startsWith('/NEW/')) {
        // 대체 경로 시도
        const altPath = cssPath.replace('/NEW/', '/')
        await downloadFile(BASE_URL + altPath, path.join(OUTPUT_DIR, altPath.replace(/^\//, '')))
      }
    }
    
    // JS 파일 다운로드
    for (const jsUrl of [...new Set(resources.js)]) {
      if (!jsUrl || !jsUrl.includes('ecstel.co.kr')) continue
      let jsPath = jsUrl.replace(BASE_URL, '').replace(/^\/+/, '/')
      if (!jsPath.startsWith('/')) jsPath = '/' + jsPath
      const localPath = path.join(OUTPUT_DIR, jsPath.replace(/^\//, ''))
      const success = await downloadFile(jsUrl, localPath)
      if (!success && jsPath.startsWith('/NEW/')) {
        // 대체 경로 시도
        const altPath = jsPath.replace('/NEW/', '/')
        await downloadFile(BASE_URL + altPath, path.join(OUTPUT_DIR, altPath.replace(/^\//, '')))
      }
    }
    
    // 이미지 파일 다운로드
    for (const imgUrl of [...new Set(resources.images)]) {
      if (!imgUrl || !imgUrl.includes('ecstel.co.kr')) continue
      let imgPath = imgUrl.replace(BASE_URL, '').replace(/^\/+/, '/')
      if (!imgPath.startsWith('/')) imgPath = '/' + imgPath
      const localPath = path.join(OUTPUT_DIR, imgPath.replace(/^\//, ''))
      const success = await downloadFile(imgUrl, localPath)
      if (!success && imgPath.startsWith('/NEW/')) {
        // 대체 경로 시도
        const altPath = imgPath.replace('/NEW/', '/')
        await downloadFile(BASE_URL + altPath, path.join(OUTPUT_DIR, altPath.replace(/^\//, '')))
      }
    }
    
    return resources.links
  } catch (error) {
    console.error(`❌ 페이지 크롤링 실패: ${url} - ${error.message}`)
    return []
  }
}

// 메인 크롤링 함수
async function main() {
  const startUrl = BASE_URL
  const visited = new Set()
  const queue = [startUrl]
  
  visited.add(startUrl)
  
  // 주요 페이지 우선 추가
  const importantPages = [
    '/NEW/html/index.html',
    '/NEW/html/01_01mission.html',
    '/NEW/html/01_03award.html',
    '/NEW/html/03_02customers.html',
    '/NEW/html/04_01injae.html',
    '/NEW/html/04_03welfare.html',
    '/NEW/html/04_06ourCom.html',
    '/NEW/html/04_07careerProcess.html'
  ]
  
  for (const page of importantPages) {
    const fullUrl = new URL(page, BASE_URL).href
    if (!visited.has(fullUrl)) {
      visited.add(fullUrl)
      queue.push(fullUrl)
    }
  }
  
  while (queue.length > 0) {
    const url = queue.shift()
    
    if (!url.includes('ecstel.co.kr')) continue
    
    const urlPath = url.replace(BASE_URL, '') || '/'
    let outputPath
    
    if (urlPath === '/') {
      outputPath = path.join(OUTPUT_DIR, 'index.html')
    } else {
      const cleanPath = urlPath.replace(/^\//, '').replace(/\.html$/, '')
      if (cleanPath.endsWith('index')) {
        outputPath = path.join(OUTPUT_DIR, cleanPath.replace(/\/index$/, ''), 'index.html')
      } else {
        outputPath = path.join(OUTPUT_DIR, cleanPath + '.html')
      }
    }
    
    const links = await crawlPage(url, outputPath)
    
    // 새 링크 추가
    for (const link of links) {
      const fullUrl = new URL(link, BASE_URL).href
      if (!visited.has(fullUrl) && fullUrl.includes('ecstel.co.kr')) {
        visited.add(fullUrl)
        queue.push(fullUrl)
      }
    }
    
    // 요청 간 딜레이 (서버 부하 방지)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  
  console.log('')
  console.log('🎉 크롤링 완료!')
  console.log(`총 ${visited.size}개 페이지 크롤링됨`)
  console.log(`출력 디렉토리: ${OUTPUT_DIR}`)
}

main().catch(console.error)

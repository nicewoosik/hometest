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

// 다운로드 함수 - 재시도 포함
async function downloadWithRetry(url, filePath, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url, {
        timeout: 20000,
        httpAgent: new http.Agent({ keepAlive: false }),
        maxRedirects: 5,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'Accept': '*/*',
          'Accept-Language': 'ko-KR,ko;q=0.9'
        },
        validateStatus: (status) => status === 200
      })
      
      await fs.ensureDir(path.dirname(filePath))
      await fs.writeFile(filePath, response.data)
      return { success: true, url }
    } catch (error) {
      if (i === retries - 1) {
        return { success: false, url, error: error.message }
      }
      await new Promise(r => setTimeout(r, 1000 * (i + 1)))
    }
  }
}

async function main() {
  console.log('🚀 최종 크롤링 시작...\n')
  
  // 1. 메인 페이지
  console.log('📄 메인 페이지 다운로드...')
  const mainResult = await downloadWithRetry(
    `${BASE_URL}/NEW/html/index.html`,
    path.join(OUTPUT_DIR, 'NEW/html/index.html')
  )
  
  if (!mainResult.success) {
    console.log('❌ 메인 페이지 다운로드 실패:', mainResult.error)
    return
  }
  console.log('✅ 메인 페이지 완료\n')
  
  // 2. HTML 파싱
  const html = await fs.readFile(path.join(OUTPUT_DIR, 'NEW/html/index.html'), 'utf-8')
  const $ = cheerio.load(html)
  
  // 3. 모든 리소스 수집
  const resources = {
    css: new Set(),
    js: new Set(),
    images: new Set()
  }
  
  // 상대 경로를 절대 경로로 변환하는 함수
  const resolveUrl = (relativeUrl, basePath) => {
    if (!relativeUrl || relativeUrl.startsWith('http') || relativeUrl.startsWith('//') || relativeUrl.startsWith('data:')) {
      return relativeUrl
    }
    
    // 절대 경로인 경우
    if (relativeUrl.startsWith('/')) {
      return BASE_URL + relativeUrl
    }
    
    // 상대 경로인 경우 (../ 또는 ./)
    const baseDir = basePath.substring(0, basePath.lastIndexOf('/'))
    let resolved = baseDir + '/' + relativeUrl
    
    // .. 처리
    while (resolved.includes('/../')) {
      resolved = resolved.replace(/[^/]+\/\.\.\//g, '')
    }
    
    // . 처리
    resolved = resolved.replace(/\/\.\//g, '/')
    
    // BASE_URL로 변환
    const pathPart = resolved.replace(BASE_URL, '')
    return BASE_URL + pathPart
  }
  
  const basePath = `${BASE_URL}/NEW/html/index.html`
  
  // CSS
  $('link[rel="stylesheet"]').each((i, elem) => {
    let href = $(elem).attr('href')
    if (href) {
      const resolved = resolveUrl(href, basePath)
      if (resolved && resolved.includes('ecstel.co.kr') && !resolved.includes('cdn.')) {
        resources.css.add(resolved)
      }
    }
  })
  
  // JS
  $('script[src]').each((i, elem) => {
    let src = $(elem).attr('src')
    if (src && !src.startsWith('data:')) {
      const resolved = resolveUrl(src, basePath)
      if (resolved && resolved.includes('ecstel.co.kr') && !resolved.includes('code.jquery.com')) {
        resources.js.add(resolved)
      }
    }
  })
  
  // 이미지
  $('img[src]').each((i, elem) => {
    let src = $(elem).attr('src')
    if (src && !src.startsWith('data:')) {
      const resolved = resolveUrl(src, basePath)
      if (resolved && resolved.includes('ecstel.co.kr')) {
        resources.images.add(resolved)
      }
    }
  })
  
  console.log(`발견된 리소스:`)
  console.log(`- CSS: ${resources.css.size}개`)
  console.log(`- JS: ${resources.js.size}개`)
  console.log(`- 이미지: ${resources.images.size}개\n`)
  
  // 4. 다운로드
  const results = { success: 0, fail: 0, failed: [] }
  
  // CSS
  console.log('📦 CSS 파일 다운로드...')
  for (const url of resources.css) {
    const filePath = url.replace(BASE_URL, '').replace(/^\//, '')
    const localPath = path.join(OUTPUT_DIR, filePath)
    const result = await downloadWithRetry(url, localPath)
    if (result.success) {
      results.success++
      process.stdout.write('.')
    } else {
      results.fail++
      results.failed.push({ url, type: 'CSS', error: result.error })
      process.stdout.write('x')
    }
    await new Promise(r => setTimeout(r, 300))
  }
  console.log('')
  
  // JS
  console.log('📦 JS 파일 다운로드...')
  for (const url of resources.js) {
    const filePath = url.replace(BASE_URL, '').replace(/^\//, '')
    const localPath = path.join(OUTPUT_DIR, filePath)
    const result = await downloadWithRetry(url, localPath)
    if (result.success) {
      results.success++
      process.stdout.write('.')
    } else {
      results.fail++
      results.failed.push({ url, type: 'JS', error: result.error })
      process.stdout.write('x')
    }
    await new Promise(r => setTimeout(r, 300))
  }
  console.log('')
  
  // 이미지
  console.log('📦 이미지 파일 다운로드...')
  for (const url of resources.images) {
    const filePath = url.replace(BASE_URL, '').replace(/^\//, '')
    const localPath = path.join(OUTPUT_DIR, filePath)
    const result = await downloadWithRetry(url, localPath)
    if (result.success) {
      results.success++
      process.stdout.write('.')
    } else {
      results.fail++
      results.failed.push({ url, type: 'Image', error: result.error })
      process.stdout.write('x')
    }
    await new Promise(r => setTimeout(r, 200))
  }
  console.log('')
  
  // 결과
  console.log('\n✅ 크롤링 완료!')
  console.log(`성공: ${results.success}개`)
  console.log(`실패: ${results.fail}개`)
  
  if (results.failed.length > 0) {
    console.log('\n❌ 실패한 파일들:')
    results.failed.forEach(f => {
      console.log(`  - ${f.type}: ${f.url}`)
    })
  }
}

main().catch(console.error)


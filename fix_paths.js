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

// 상대 경로를 절대 URL로 변환
function resolveRelativeUrl(relativeUrl, baseUrl) {
  if (!relativeUrl) return null
  if (relativeUrl.startsWith('http') || relativeUrl.startsWith('//')) return relativeUrl
  if (relativeUrl.startsWith('data:')) return null
  
  try {
    // baseUrl이 /NEW/html/index.html이면 ../css/는 /css/가 되어야 함
    const resolved = new URL(relativeUrl, baseUrl).href
    
    // 잘못된 경로 수정: /NEW/css/ -> /css/
    if (resolved.includes('/NEW/css/') || resolved.includes('/NEW/js/')) {
      return resolved.replace('/NEW/css/', '/css/').replace('/NEW/js/', '/js/')
    }
    
    return resolved
  } catch (error) {
    return null
  }
}

// 다운로드 함수
async function downloadFile(url, filePath) {
  try {
    const response = await axios.get(url, {
      timeout: 20000,
      httpAgent: new http.Agent({ keepAlive: false }),
      maxRedirects: 5,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': '*/*'
      },
      validateStatus: (status) => status === 200
    })
    
    await fs.ensureDir(path.dirname(filePath))
    await fs.writeFile(filePath, response.data)
    return { success: true, url }
  } catch (error) {
    return { success: false, url, error: error.message }
  }
}

async function main() {
  console.log('🚀 경로 수정된 크롤링 시작...\n')
  
  // 1. 메인 페이지
  const mainUrl = `${BASE_URL}/NEW/html/index.html`
  const mainPath = path.join(OUTPUT_DIR, 'NEW/html/index.html')
  
  console.log('📄 메인 페이지 다운로드...')
  const mainResult = await downloadFile(mainUrl, mainPath)
  if (!mainResult.success) {
    console.log('❌ 메인 페이지 실패:', mainResult.error)
    return
  }
  console.log('✅ 메인 페이지 완료\n')
  
  // 2. HTML 파싱
  const html = await fs.readFile(mainPath, 'utf-8')
  const $ = cheerio.load(html)
  
  // 3. 리소스 수집 (상대 경로 제대로 처리)
  const resources = {
    css: new Set(),
    js: new Set(),
    images: new Set()
  }
  
  const baseUrl = mainUrl
  
  // CSS
  $('link[rel="stylesheet"]').each((i, elem) => {
    const href = $(elem).attr('href')
    const resolved = resolveRelativeUrl(href, baseUrl)
    if (resolved && resolved.includes('ecstel.co.kr') && !resolved.includes('cdn.')) {
      resources.css.add(resolved)
    }
  })
  
  // JS
  $('script[src]').each((i, elem) => {
    const src = $(elem).attr('src')
    const resolved = resolveRelativeUrl(src, baseUrl)
    if (resolved && resolved.includes('ecstel.co.kr') && !resolved.includes('code.jquery.com')) {
      resources.js.add(resolved)
    }
  })
  
  // 이미지
  $('img[src]').each((i, elem) => {
    const src = $(elem).attr('src')
    const resolved = resolveRelativeUrl(src, baseUrl)
    if (resolved && resolved.includes('ecstel.co.kr')) {
      resources.images.add(resolved)
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
    const result = await downloadFile(url, localPath)
    if (result.success) {
      results.success++
      console.log(`✅ ${filePath}`)
    } else {
      results.fail++
      results.failed.push({ url, type: 'CSS', error: result.error })
      console.log(`❌ ${filePath}`)
    }
    await new Promise(r => setTimeout(r, 300))
  }
  
  // JS
  console.log('\n📦 JS 파일 다운로드...')
  for (const url of resources.js) {
    const filePath = url.replace(BASE_URL, '').replace(/^\//, '')
    const localPath = path.join(OUTPUT_DIR, filePath)
    const result = await downloadFile(url, localPath)
    if (result.success) {
      results.success++
      console.log(`✅ ${filePath}`)
    } else {
      results.fail++
      results.failed.push({ url, type: 'JS', error: result.error })
      console.log(`❌ ${filePath}`)
    }
    await new Promise(r => setTimeout(r, 300))
  }
  
  // 이미지
  console.log('\n📦 이미지 파일 다운로드...')
  for (const url of resources.images) {
    const filePath = url.replace(BASE_URL, '').replace(/^\//, '')
    const localPath = path.join(OUTPUT_DIR, filePath)
    const result = await downloadFile(url, localPath)
    if (result.success) {
      results.success++
      console.log(`✅ ${filePath}`)
    } else {
      results.fail++
      results.failed.push({ url, type: 'Image', error: result.error })
      console.log(`❌ ${filePath}`)
    }
    await new Promise(r => setTimeout(r, 200))
  }
  
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


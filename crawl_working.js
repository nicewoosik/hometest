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

// 실제 작동하는 다운로드 함수
async function downloadFile(url, filePath) {
  try {
    const response = await axios.get(url, {
      timeout: 15000,
      httpAgent: new http.Agent({ keepAlive: false }),
      maxRedirects: 5,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    })
    
    if (response.status === 200) {
      await fs.ensureDir(path.dirname(filePath))
      await fs.writeFile(filePath, response.data)
      return true
    }
    return false
  } catch (error) {
    return false
  }
}

async function main() {
  console.log('🚀 크롤링 시작...\n')
  
  // 1. 메인 페이지 다운로드
  console.log('1. 메인 페이지 다운로드...')
  const mainUrl = `${BASE_URL}/NEW/html/index.html`
  const mainPath = path.join(OUTPUT_DIR, 'NEW/html/index.html')
  
  if (!(await downloadFile(mainUrl, mainPath))) {
    console.log('❌ 메인 페이지 다운로드 실패')
    return
  }
  console.log('✅ 메인 페이지 다운로드 완료\n')
  
  // 2. HTML 파싱
  const html = await fs.readFile(mainPath, 'utf-8')
  const $ = cheerio.load(html)
  
  // 3. 리소스 수집
  const files = new Set()
  
  // CSS
  $('link[rel="stylesheet"]').each((i, elem) => {
    let href = $(elem).attr('href')
    if (href && !href.startsWith('http') && !href.startsWith('//')) {
      if (!href.startsWith('/')) href = '/' + href
      files.add(href)
    }
  })
  
  // JS
  $('script[src]').each((i, elem) => {
    let src = $(elem).attr('src')
    if (src && !src.startsWith('http') && !src.startsWith('//') && !src.startsWith('data:')) {
      if (!src.startsWith('/')) src = '/' + src
      files.add(src)
    }
  })
  
  // 이미지
  $('img[src]').each((i, elem) => {
    let src = $(elem).attr('src')
    if (src && !src.startsWith('http') && !src.startsWith('//') && !src.startsWith('data:')) {
      if (!src.startsWith('/')) src = '/' + src
      files.add(src)
    }
  })
  
  console.log(`2. 발견된 파일: ${files.size}개\n`)
  
  // 4. 파일 다운로드
  let success = 0
  let fail = 0
  
  for (const file of files) {
    const url = BASE_URL + file
    const filePath = path.join(OUTPUT_DIR, file.replace(/^\//, ''))
    
    process.stdout.write(`다운로드 중: ${file} ... `)
    
    if (await downloadFile(url, filePath)) {
      console.log('✅')
      success++
    } else {
      console.log('❌')
      fail++
    }
    
    await new Promise(r => setTimeout(r, 500))
  }
  
  console.log(`\n✅ 완료!`)
  console.log(`성공: ${success}개`)
  console.log(`실패: ${fail}개`)
}

main().catch(console.error)



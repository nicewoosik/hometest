import axios from 'axios'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import http from 'http'
import * as cheerio from 'cheerio'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = 'http://ecstel.co.kr'
const OUTPUT_DIR = path.join(__dirname, 'dist')

async function download(url, filePath) {
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
    return true
  } catch {
    return false
  }
}

async function main() {
  console.log('🚀 모든 리소스 다운로드 시작...\n')
  
  // 1. 메인 HTML
  console.log('1. HTML 다운로드...')
  await download(`${BASE_URL}/NEW/html/index.html`, path.join(OUTPUT_DIR, 'NEW/html/index.html'))
  
  // 2. CSS 파일들
  console.log('2. CSS 파일 다운로드...')
  const cssFiles = ['reset.css', 'ecs.css', 'ecs_mobile.css', 'font.css', 'jquery.bxslider.css']
  for (const css of cssFiles) {
    await download(`${BASE_URL}/css/${css}`, path.join(OUTPUT_DIR, 'css', css))
  }
  
  // 3. JS 파일들
  console.log('3. JS 파일 다운로드...')
  const jsFiles = ['jquery-1.12.3.min.js', 'jquery.bxslider.min.js', 'default.js']
  for (const js of jsFiles) {
    await download(`${BASE_URL}/js/${js}`, path.join(OUTPUT_DIR, 'js', js))
  }
  
  // 4. HTML 파싱해서 이미지 찾기
  console.log('4. 이미지 찾기...')
  const html = await fs.readFile(path.join(OUTPUT_DIR, 'NEW/html/index.html'), 'utf-8')
  const $ = cheerio.load(html)
  const images = new Set()
  
  $('img[src]').each((i, elem) => {
    let src = $(elem).attr('src')
    if (src && !src.startsWith('data:')) {
      if (src.startsWith('//')) src = 'http:' + src
      if (!src.startsWith('http')) {
        src = src.startsWith('/') ? BASE_URL + src : BASE_URL + '/' + src
      }
      if (src.includes('ecstel.co.kr')) images.add(src)
    }
  })
  
  // 5. CSS에서 배경 이미지 찾기
  const cssContent = await fs.readFile(path.join(OUTPUT_DIR, 'css/ecs.css'), 'utf-8')
  const urlRegex = /url\(['"]?([^'")]+)['"]?\)/gi
  let match
  while ((match = urlRegex.exec(cssContent)) !== null) {
    let imgUrl = match[1]
    if (imgUrl.includes('Local Settings') || imgUrl.includes('Temporary Internet')) continue
    if (imgUrl.startsWith('data:')) continue
    if (imgUrl.startsWith('//')) imgUrl = 'http:' + imgUrl
    if (!imgUrl.startsWith('http')) {
      imgUrl = imgUrl.startsWith('/') ? BASE_URL + imgUrl : BASE_URL + '/NEW/images/' + imgUrl
    }
    if (imgUrl.includes('ecstel.co.kr')) images.add(imgUrl)
  }
  
  // 6. 이미지 다운로드
  console.log(`5. 이미지 다운로드 (${images.size}개)...`)
  let success = 0
  for (const imgUrl of images) {
    const filePath = imgUrl.replace(BASE_URL, '').replace(/^\//, '')
    const localPath = path.join(OUTPUT_DIR, filePath)
    if (await download(imgUrl, localPath)) {
      success++
      process.stdout.write('.')
    } else {
      process.stdout.write('x')
    }
    await new Promise(r => setTimeout(r, 200))
  }
  console.log(`\n\n✅ 완료! 성공: ${success}/${images.size}`)
}

main().catch(console.error)



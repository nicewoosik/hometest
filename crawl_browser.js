import puppeteer from 'puppeteer'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import http from 'http'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = 'http://ecstel.co.kr'
const OUTPUT_DIR = path.join(__dirname, 'dist')

async function downloadResource(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath)
    http.get(url, (response) => {
      if (response.statusCode === 200 || response.statusCode === 301 || response.statusCode === 302) {
        response.pipe(file)
        file.on('finish', () => {
          file.close()
          resolve()
        })
      } else {
        file.close()
        fs.unlink(filePath, () => {})
        reject(new Error(`Failed: ${response.statusCode}`))
      }
    }).on('error', (err) => {
      file.close()
      fs.unlink(filePath, () => {})
      reject(err)
    })
  })
}

async function main() {
  console.log('🚀 브라우저로 크롤링 시작...\n')
  
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  
  // 모든 리소스 요청 가로채기
  const resources = new Set()
  
  page.on('request', (request) => {
    const url = request.url()
    if (url.includes('ecstel.co.kr') && !url.includes('google') && !url.includes('cdn.jsdelivr')) {
      resources.add(url)
    }
  })
  
  console.log('1. 페이지 로드 중...')
  await page.goto(`${BASE_URL}/NEW/html/index.html`, { 
    waitUntil: 'networkidle2',
    timeout: 60000 
  })
  
  console.log(`2. 리소스 수집 완료: ${resources.size}개`)
  
  // HTML 저장
  const html = await page.content()
  await fs.ensureDir(path.join(OUTPUT_DIR, 'NEW/html'))
  await fs.writeFile(path.join(OUTPUT_DIR, 'NEW/html/index.html'), html)
  console.log('3. HTML 저장 완료')
  
  // 모든 리소스 다운로드
  console.log('4. 리소스 다운로드 중...')
  let success = 0
  let fail = 0
  
  for (const url of resources) {
    try {
      const urlPath = new URL(url).pathname
      const localPath = path.join(OUTPUT_DIR, urlPath.replace(/^\//, ''))
      await fs.ensureDir(path.dirname(localPath))
      await downloadResource(url, localPath)
      success++
      if (success % 10 === 0) process.stdout.write('.')
    } catch (error) {
      fail++
    }
  }
  console.log('')
  
  // HTML 경로 수정
  let htmlContent = await fs.readFile(path.join(OUTPUT_DIR, 'NEW/html/index.html'), 'utf-8')
  htmlContent = htmlContent.replace(/href="\.\.\/css\//g, 'href="/css/')
  htmlContent = htmlContent.replace(/src="\.\.\/js\//g, 'src="/js/')
  htmlContent = htmlContent.replace(/src="\.\.\/board\//g, 'src="/board/')
  htmlContent = htmlContent.replace(/src="\.\.\/images\//g, 'src="/NEW/images/')
  await fs.writeFile(path.join(OUTPUT_DIR, 'NEW/html/index.html'), htmlContent)
  
  // 루트 index.html 생성
  await fs.writeFile(
    path.join(OUTPUT_DIR, 'index.html'),
    '<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=/NEW/html/index.html"></head><body></body></html>'
  )
  
  await browser.close()
  
  console.log(`\n✅ 완료!`)
  console.log(`성공: ${success}개, 실패: ${fail}개`)
  console.log(`총 파일: ${await fs.readdir(OUTPUT_DIR, { recursive: true }).then(files => files.length)}`)
}

main().catch(console.error)


import axios from 'axios'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import http from 'http'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = 'http://ecstel.co.kr'
const DIST_DIR = path.join(__dirname, 'dist')

// HTTP agent 설정 (HTTP 요청용)
const httpAgent = new http.Agent({
  keepAlive: true,
  maxSockets: 10
})

async function downloadFile(url, filePath) {
  try {
    const response = await axios.get(url, {
      httpAgent,
      responseType: 'arraybuffer',
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    await fs.writeFile(filePath, response.data)
    console.log(`✅ 다운로드 완료: ${filePath}`)
    return true
  } catch (error) {
    console.error(`❌ 다운로드 실패: ${url} - ${error.message}`)
    return false
  }
}

async function crawlCareerPage() {
  console.log('='.repeat(60))
  console.log('채용공고 페이지 크롤링 시작')
  console.log('='.repeat(60))
  
  const careerUrl = `${BASE_URL}/NEW/board/bbs/board.php?bo_table=career`
  const outputPath = path.join(DIST_DIR, 'NEW/board/bbs/board_career.html')
  
  try {
    console.log(`\n📥 채용공고 페이지 다운로드: ${careerUrl}`)
    const response = await axios.get(careerUrl, {
      httpAgent,
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    let html = response.data
    
    // 상대 경로를 절대 경로로 변경
    html = html.replace(/href="\.\.\//g, 'href="/NEW/')
    html = html.replace(/src="\.\.\//g, 'src="/NEW/')
    html = html.replace(/href="\.\//g, 'href="/NEW/board/bbs/')
    html = html.replace(/src="\.\//g, 'src="/NEW/board/bbs/')
    
    // CSS/JS 경로 수정
    html = html.replace(/href="\/NEW\/css\//g, 'href="/css/')
    html = html.replace(/href="\/NEW\/js\//g, 'href="/js/')
    html = html.replace(/src="\/NEW\/js\//g, 'src="/js/')
    html = html.replace(/src="\/NEW\/images\//g, 'src="/NEW/images/')
    
    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.writeFile(outputPath, html, 'utf-8')
    console.log(`✅ 채용공고 페이지 저장 완료: ${outputPath}`)
    
    // 채용공고 관련 이미지/데이터 폴더 확인
    const careerDataDir = path.join(DIST_DIR, 'NEW/board/data/file/career')
    console.log(`\n📁 채용공고 데이터 폴더 확인: ${careerDataDir}`)
    
    // 원본 사이트에서 career 데이터 폴더의 파일들 확인
    const dataUrl = `${BASE_URL}/NEW/board/data/file/career/`
    console.log(`\n📥 채용공고 데이터 확인: ${dataUrl}`)
    
  } catch (error) {
    console.error(`❌ 채용공고 페이지 크롤링 실패: ${error.message}`)
  }
  
  console.log('\n' + '='.repeat(60))
  console.log('채용공고 페이지 크롤링 완료')
  console.log('='.repeat(60))
}

crawlCareerPage().catch(console.error)


import axios from 'axios'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import http from 'http'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = 'http://ecstel.co.kr'
const DIST_DIR = path.join(__dirname, 'dist')

// HTTP agent 설정
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

async function crawlCareerDetail(wrId) {
  console.log('='.repeat(60))
  console.log(`채용공고 상세 페이지 크롤링 시작: wr_id=${wrId}`)
  console.log('='.repeat(60))
  
  const detailUrl = `${BASE_URL}/NEW/board/bbs/board.php?bo_table=career&wr_id=${wrId}`
  const outputPath = path.join(DIST_DIR, `NEW/board/bbs/board_career_${wrId}.html`)
  
  try {
    console.log(`\n📥 상세 페이지 다운로드: ${detailUrl}`)
    const response = await axios.get(detailUrl, {
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
    html = html.replace(/href="\/NEW\/css\//g, 'href="/NEW/css/')
    html = html.replace(/href="\/NEW\/js\//g, 'href="/NEW/js/')
    html = html.replace(/src="\/NEW\/js\//g, 'src="/NEW/js/')
    html = html.replace(/src="\/NEW\/images\//g, 'src="/NEW/images/')
    
    // 잘못된 경로 수정
    html = html.replace(/href="\/NEW\/bbs\//g, 'href="/NEW/board/bbs/')
    
    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.writeFile(outputPath, html, 'utf-8')
    console.log(`✅ 상세 페이지 저장 완료: ${outputPath}`)
    
  } catch (error) {
    console.error(`❌ 상세 페이지 크롤링 실패: ${error.message}`)
  }
  
  console.log('\n' + '='.repeat(60))
  console.log('상세 페이지 크롤링 완료')
  console.log('='.repeat(60))
}

// 채용공고 목록에서 모든 wr_id 추출
async function crawlAllCareerDetails() {
  const careerIds = [68, 65, 62, 61, 55, 54, 46, 37] // board_career.html에서 확인한 ID들
  
  console.log(`총 ${careerIds.length}개의 상세 페이지 크롤링 시작...\n`)
  
  for (const wrId of careerIds) {
    await crawlCareerDetail(wrId)
    // 서버 부하 방지를 위해 잠시 대기
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  
  console.log('\n모든 상세 페이지 크롤링 완료!')
}

crawlAllCareerDetails().catch(console.error)


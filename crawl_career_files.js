import axios from 'axios'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import http from 'http'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = 'http://ecstel.co.kr'
const DIST_DIR = path.join(__dirname, 'dist')

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
      },
      maxRedirects: 5
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

async function crawlCareerFiles() {
  console.log('='.repeat(60))
  console.log('채용공고 첨부파일 크롤링 시작')
  console.log('='.repeat(60))
  
  // 채용공고 상세 페이지에서 첨부파일 정보 확인
  const careerDetails = [
    { wrId: 68, files: [{ no: 2, name: '입사지원서_경력_지원분야_성명.docx' }] },
    { wrId: 65, files: [{ no: 2, name: '입사지원서.docx' }] },
    { wrId: 62, files: [{ no: 2, name: '입사지원서.docx' }] },
    { wrId: 61, files: [{ no: 2, name: '입사지원서.docx' }] },
    { wrId: 55, files: [{ no: 2, name: '입사지원서.docx' }] },
    { wrId: 54, files: [{ no: 2, name: '입사지원서.docx' }] },
    { wrId: 46, files: [{ no: 2, name: '입사지원서.docx' }] },
    { wrId: 37, files: [{ no: 2, name: '입사지원서.docx' }] },
  ]
  
  const careerDataDir = path.join(DIST_DIR, 'NEW/board/data/file/career')
  await fs.mkdir(careerDataDir, { recursive: true })
  
  for (const detail of careerDetails) {
    for (const file of detail.files) {
      const downloadUrl = `${BASE_URL}/NEW/board/bbs/download.php?bo_table=career&wr_id=${detail.wrId}&no=${file.no}`
      
      // 파일명에서 확장자 추출
      const ext = path.extname(file.name) || '.docx'
      const fileName = `${detail.wrId}_${file.no}${ext}`
      const filePath = path.join(careerDataDir, fileName)
      
      console.log(`\n📥 첨부파일 다운로드: ${file.name}`)
      console.log(`   URL: ${downloadUrl}`)
      console.log(`   저장 경로: ${filePath}`)
      
      await downloadFile(downloadUrl, filePath)
      
      // 서버 부하 방지를 위해 잠시 대기
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
  
  console.log('\n' + '='.repeat(60))
  console.log('채용공고 첨부파일 크롤링 완료')
  console.log('='.repeat(60))
}

crawlCareerFiles().catch(console.error)



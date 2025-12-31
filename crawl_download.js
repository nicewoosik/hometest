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

async function crawlDownloadPage() {
  console.log('='.repeat(60))
  console.log('download.php 파일 크롤링 시작')
  console.log('='.repeat(60))
  
  const downloadUrl = `${BASE_URL}/NEW/board/bbs/download.php?bo_table=career&wr_id=68&no=2`
  const outputPath = path.join(DIST_DIR, 'NEW/board/bbs/download.php')
  
  try {
    console.log(`\n📥 download.php 다운로드: ${downloadUrl}`)
    const response = await axios.get(downloadUrl, {
      httpAgent,
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      maxRedirects: 5,
      validateStatus: function (status) {
        return status >= 200 && status < 400 // 리다이렉트 허용
      }
    })
    
    // download.php는 파일 다운로드를 위한 것이므로, 실제 파일을 찾아야 할 수도 있습니다
    // 하지만 일단 PHP 파일 자체를 저장합니다
    let content = response.data
    
    // HTML이 아닌 경우 (바이너리 파일일 수 있음)
    if (typeof content === 'string') {
      await fs.mkdir(path.dirname(outputPath), { recursive: true })
      await fs.writeFile(outputPath, content, 'utf-8')
      console.log(`✅ download.php 저장 완료: ${outputPath}`)
    } else {
      // 바이너리 파일인 경우
      await fs.mkdir(path.dirname(outputPath), { recursive: true })
      await fs.writeFile(outputPath, Buffer.from(content), 'binary')
      console.log(`✅ download.php (바이너리) 저장 완료: ${outputPath}`)
    }
    
  } catch (error) {
    console.error(`❌ download.php 크롤링 실패: ${error.message}`)
    // 빈 PHP 파일 생성 (에러 방지)
    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.writeFile(outputPath, '<?php\n// Download handler\n?>', 'utf-8')
    console.log(`⚠️ 빈 download.php 파일 생성`)
  }
  
  console.log('\n' + '='.repeat(60))
  console.log('download.php 크롤링 완료')
  console.log('='.repeat(60))
}

crawlDownloadPage().catch(console.error)


import http from 'http'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = 8000
const DIST_DIR = path.join(__dirname, 'dist')

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.pdf': 'application/pdf',
  '.php': 'text/html; charset=utf-8'
}

const server = http.createServer(async (req, res) => {
  // URL 파싱
  const urlObj = new URL(req.url, `http://localhost:${PORT}`)
  let urlPath = urlObj.pathname
  const queryString = urlObj.search.substring(1) // '?' 제거
  
  let filePath = null
  
  // PHP 파일 쿼리 파라미터 처리 (board.php)
  if (queryString && urlPath.includes('board.php')) {
    const params = new URLSearchParams(queryString)
    const boTable = params.get('bo_table')
    // career 페이지는 별도로 크롤링한 HTML 파일 사용
    if (boTable === 'career') {
      const careerHtmlPath = path.join(DIST_DIR, 'NEW/board/bbs/board_career.html')
      try {
        const stat = await fs.stat(careerHtmlPath)
        if (stat.isFile()) {
          filePath = careerHtmlPath
        }
      } catch {
        // 파일이 없으면 기존 board.php 사용
      }
    }
  }
  
  // 상대 경로 정규화 (.. 처리)
  const parts = urlPath.split('/').filter(p => p)
  const normalized = []
  for (const part of parts) {
    if (part === '..') {
      normalized.pop()
    } else if (part !== '.') {
      normalized.push(part)
    }
  }
  urlPath = '/' + normalized.join('/')
  
  // career HTML 파일을 사용하는 경우가 아니면 기본 경로 사용
  if (!filePath) {
    filePath = path.join(DIST_DIR, urlPath === '/' ? 'index.html' : urlPath)
  }
  
  // 디렉토리인 경우 index.html 찾기
  try {
    const stat = await fs.stat(filePath)
    if (stat.isDirectory()) {
      filePath = path.join(filePath, 'index.html')
    }
  } catch (error) {
    // 파일이 없으면 404
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(`<h1>404 - File Not Found</h1><p>요청한 파일: ${urlPath}</p>`)
    return
  }
  
  // 파일 읽기
  try {
    const content = await fs.readFile(filePath)
    const ext = path.extname(filePath).toLowerCase()
    const contentType = mimeTypes[ext] || 'application/octet-stream'
    
    res.writeHead(200, { 'Content-Type': contentType })
    res.end(content)
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(`<h1>404 - File Not Found</h1><p>요청한 파일: ${urlPath}</p>`)
  }
})

server.listen(PORT, 'localhost', () => {
  console.log('='.repeat(60))
  console.log('🌐 ECSTEL 클론 서버 실행 중')
  console.log('='.repeat(60))
  console.log(`서버 주소: http://localhost:${PORT}`)
  console.log(`디렉토리: ${DIST_DIR}`)
  console.log('')
  console.log('서버를 중지하려면 Ctrl+C를 누르세요')
  console.log('='.repeat(60))
})


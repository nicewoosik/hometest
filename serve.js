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
  
  // PHP 파일 쿼리 파라미터 처리 (board.php, download.php)
  if (queryString && (urlPath.includes('board.php') || urlPath.includes('download.php'))) {
    const params = new URLSearchParams(queryString)
    const boTable = params.get('bo_table')
    const wrId = params.get('wr_id')
    const no = params.get('no')
    
    // download.php 처리 - 실제 첨부파일 찾기
    if (urlPath.includes('download.php')) {
      if (boTable === 'career' && wrId && no) {
        // 채용공고 첨부파일 경로 시도
        const possiblePaths = [
          path.join(DIST_DIR, `NEW/board/data/file/career/${wrId}_${no}`),
          path.join(DIST_DIR, `NEW/board/data/file/career/${wrId}_${no}.docx`),
          path.join(DIST_DIR, `NEW/board/data/file/career/${wrId}_${no}.pdf`),
          path.join(DIST_DIR, `NEW/board/data/file/career/${wrId}_${no}.doc`),
          path.join(DIST_DIR, `NEW/board/data/file/career/${wrId}_${no}.xlsx`),
          path.join(DIST_DIR, `NEW/board/data/file/career/${wrId}_${no}.xls`),
        ]
        
        for (const possiblePath of possiblePaths) {
          try {
            const stat = await fs.stat(possiblePath)
            if (stat.isFile()) {
              filePath = possiblePath
              break
            }
          } catch {
            // 파일이 없으면 계속 시도
          }
        }
        
        // 파일을 찾지 못하면 404 반환
        if (!filePath) {
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
          res.end(`<h1>404 - File Not Found</h1><p>다운로드 파일을 찾을 수 없습니다: bo_table=${boTable}, wr_id=${wrId}, no=${no}</p>`)
          return
        }
      }
    } else if (boTable === 'career') {
      // board.php 처리 - career 페이지
      if (wrId) {
        // wr_id가 있으면 상세 페이지 HTML 파일 사용
        const detailHtmlPath = path.join(DIST_DIR, `NEW/board/bbs/board_career_${wrId}.html`)
        try {
          const stat = await fs.stat(detailHtmlPath)
          if (stat.isFile()) {
            filePath = detailHtmlPath
          }
        } catch {
          // 상세 페이지 파일이 없으면 board.php 사용
        }
      } else {
        // 목록 페이지 HTML 파일 사용
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
    // /css/, /js/, /images/ 경로는 /NEW/ 하위에서 찾기
    if (urlPath.startsWith('/css/') || urlPath.startsWith('/js/') || urlPath.startsWith('/images/')) {
      filePath = path.join(DIST_DIR, 'NEW', urlPath)
    } else {
      filePath = path.join(DIST_DIR, urlPath === '/' ? 'index.html' : urlPath)
    }
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
    
    // download.php인 경우 다운로드 헤더 추가
    const headers = { 'Content-Type': contentType }
    if (urlPath.includes('download.php')) {
      const fileName = path.basename(filePath)
      headers['Content-Disposition'] = `attachment; filename="${fileName}"`
    }
    
    res.writeHead(200, headers)
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


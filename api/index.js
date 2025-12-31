import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DIST_DIR = path.join(__dirname, '../dist')

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

export default async function handler(req, res) {
  try {
    // Vercel의 요청 URL 가져오기
    let urlPath = req.url || req.path || '/'
    let queryString = ''
    
    // 쿼리 스트링 분리 (PHP 파일 처리 전에)
    if (urlPath.includes('?')) {
      const parts = urlPath.split('?')
      urlPath = parts[0]
      queryString = parts[1] || ''
    }
    
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
              await fs.access(possiblePath)
              filePath = possiblePath
              break
            } catch {
              // 파일이 없으면 계속 시도
            }
          }
          
          // 파일을 찾지 못하면 404 반환
          if (!filePath) {
            res.status(404).json({ 
              error: 'File Not Found', 
              message: `Download file not found: bo_table=${boTable}, wr_id=${wrId}, no=${no}`,
              triedPaths: possiblePaths.map(p => p.replace(DIST_DIR, ''))
            })
            return
          }
        }
      } else if (boTable) {
        // board.php 처리
        // 나중에 파일을 읽을 때 bo_table 값을 사용하기 위해 req 객체에 저장
        req._boTable = boTable
        req._wrId = wrId
        
        // career 페이지는 별도로 크롤링한 HTML 파일이 있으면 사용
        if (boTable === 'career') {
          if (wrId) {
            // wr_id가 있으면 상세 페이지 HTML 파일 사용
            const detailHtmlPath = path.join(DIST_DIR, `NEW/board/bbs/board_career_${wrId}.html`)
            try {
              await fs.access(detailHtmlPath)
              filePath = detailHtmlPath
              req._useCareerHtml = true
            } catch {
              // 상세 페이지 파일이 없으면 board.php 사용
              req._useCareerHtml = false
            }
          } else {
            // 목록 페이지 HTML 파일 사용
            const careerHtmlPath = path.join(DIST_DIR, 'NEW/board/bbs/board_career.html')
            try {
              await fs.access(careerHtmlPath)
              filePath = careerHtmlPath
              req._useCareerHtml = true
            } catch {
              // 파일이 없으면 기존 board.php 사용
              req._useCareerHtml = false
            }
          }
        }
      }
    }
    
    // 경로가 /로 시작하지 않으면 추가
    if (!urlPath.startsWith('/')) {
      urlPath = '/' + urlPath
    }
    
    // 상대 경로 정규화
    const parts = urlPath.split('/').filter(p => p && p !== '.')
    const normalized = []
    for (const part of parts) {
      if (part === '..') {
        if (normalized.length > 0) {
          normalized.pop()
        }
      } else {
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
      res.status(404).json({ 
        error: 'File Not Found', 
        path: urlPath,
        requested: req.url,
        distDir: DIST_DIR,
        filePath: filePath
      })
      return
    }
    
    // 파일 읽기
    let content = await fs.readFile(filePath)
    const ext = path.extname(filePath).toLowerCase()
    
    // PHP 파일이고 bo_table 파라미터가 있으면 동적으로 수정
    if (ext === '.php' && req._boTable && !req._useCareerHtml) {
      const contentStr = content.toString('utf-8')
      // g4_bo_table 변수를 쿼리 파라미터 값으로 변경
      const modifiedContent = contentStr.replace(
        /var g4_bo_table\s*=\s*"[^"]*";/,
        `var g4_bo_table = "${req._boTable}";`
      )
      content = Buffer.from(modifiedContent, 'utf-8')
    }
    
    const contentType = mimeTypes[ext] || 'application/octet-stream'
    
    // download.php인 경우 다운로드 헤더 추가
    if (urlPath.includes('download.php')) {
      const fileName = path.basename(filePath)
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`)
    }
    
    res.setHeader('Content-Type', contentType)
    res.setHeader('Cache-Control', 'public, max-age=3600')
    res.status(200).send(content)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message,
      path: req.url
    })
  }
}

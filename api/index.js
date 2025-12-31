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
    
    // 쿼리 스트링 제거
    if (urlPath.includes('?')) {
      urlPath = urlPath.split('?')[0]
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
    
    let filePath = path.join(DIST_DIR, urlPath === '/' ? 'index.html' : urlPath)
    
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
        distDir: DIST_DIR
      })
      return
    }
    
    // 파일 읽기
    const content = await fs.readFile(filePath)
    const ext = path.extname(filePath).toLowerCase()
    const contentType = mimeTypes[ext] || 'application/octet-stream'
    
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

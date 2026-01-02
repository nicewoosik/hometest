import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import http from 'http'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = 'http://ecstel.co.kr'
const DIST_DIR = path.join(__dirname, 'dist')

async function download(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath)
    http.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file)
        file.on('finish', () => {
          file.close()
          resolve(true)
        })
      } else {
        file.close()
        fs.unlink(filePath, () => {})
        resolve(false)
      }
    }).on('error', () => {
      file.close()
      fs.unlink(filePath, () => {})
      resolve(false)
    })
  })
}

async function main() {
  console.log('이미지 경로 추출 중...\n')
  
  const images = new Set()
  
  // CSS 파일에서 이미지 추출
  const cssFiles = await fs.readdir(path.join(DIST_DIR, 'css'))
  for (const cssFile of cssFiles) {
    if (cssFile.endsWith('.css')) {
      const cssPath = path.join(DIST_DIR, 'css', cssFile)
      const content = await fs.readFile(cssPath, 'utf-8')
      const urlMatches = content.match(/url\(['"]?([^'")]+)['"]?\)/gi) || []
      
      for (const match of urlMatches) {
        let imgUrl = match.replace(/url\(['"]?/, '').replace(/['"]?\)/, '')
        if (imgUrl.includes('Local Settings') || imgUrl.includes('Temporary')) continue
        if (imgUrl.startsWith('data:')) continue
        
        // 상대 경로 처리
        if (imgUrl.startsWith('../images/')) {
          imgUrl = imgUrl.replace('../images/', '/NEW/images/')
        } else if (imgUrl.startsWith('/images/')) {
          imgUrl = imgUrl.replace('/images/', '/NEW/images/')
        } else if (imgUrl.startsWith('images/')) {
          imgUrl = '/NEW/images/' + imgUrl.replace('images/', '')
        }
        
        if (imgUrl.startsWith('/NEW/images/')) {
          images.add(imgUrl)
        }
      }
    }
  }
  
  // HTML에서 이미지 추출
  const htmlPath = path.join(DIST_DIR, 'NEW/html/index.html')
  const htmlContent = await fs.readFile(htmlPath, 'utf-8')
  const srcMatches = htmlContent.match(/src=['"]([^'"]+)['"]/gi) || []
  
  for (const match of srcMatches) {
    let imgUrl = match.replace(/src=['"]/, '').replace(/['"]$/, '')
    if (imgUrl.startsWith('http')) continue
    if (imgUrl.startsWith('data:')) continue
    
    if (imgUrl.startsWith('/NEW/images/')) {
      images.add(imgUrl)
    } else if (imgUrl.startsWith('../images/')) {
      images.add(imgUrl.replace('../images/', '/NEW/images/'))
    }
  }
  
  console.log(`발견된 이미지: ${images.size}개\n`)
  
  // 이미지 다운로드
  let success = 0
  let fail = 0
  
  for (const imgPath of images) {
    const url = BASE_URL + imgPath
    const localPath = path.join(DIST_DIR, imgPath.replace(/^\//, ''))
    await fs.ensureDir(path.dirname(localPath))
    
    const result = await download(url, localPath)
    if (result) {
      success++
      process.stdout.write('.')
    } else {
      fail++
      process.stdout.write('x')
    }
  }
  
  console.log(`\n\n완료: 성공 ${success}개, 실패 ${fail}개`)
}

main().catch(console.error)



import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import axios from 'axios'
import http from 'http'
import { URL } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = 'http://ecstel.co.kr'
const OUTPUT_DIR = path.join(__dirname, 'dist')

// CSS에서 이미지 URL 추출
function extractImageUrls(cssContent, cssFilePath) {
  const imageUrls = new Set()
  const urlRegex = /url\(['"]?([^'")]+)['"]?\)/gi
  let match
  
  while ((match = urlRegex.exec(cssContent)) !== null) {
    let imgUrl = match[1]
    
    // data: URL 제외
    if (imgUrl.startsWith('data:')) continue
    
    // 절대 URL
    if (imgUrl.startsWith('http')) {
      if (imgUrl.includes('ecstel.co.kr')) {
        imageUrls.add(imgUrl)
      }
      continue
    }
    
    // 상대 경로 처리
    if (imgUrl.startsWith('//')) {
      imgUrl = 'http:' + imgUrl
      if (imgUrl.includes('ecstel.co.kr')) {
        imageUrls.add(imgUrl)
      }
      continue
    }
    
    // 상대 경로를 절대 URL로 변환
    const cssDir = path.dirname(cssFilePath).replace(OUTPUT_DIR, '').replace(/^\//, '')
    let resolvedUrl
    
    if (imgUrl.startsWith('/')) {
      resolvedUrl = BASE_URL + imgUrl
    } else {
      // ../ 처리
      let fullPath = '/' + cssDir + '/' + imgUrl
      while (fullPath.includes('/../')) {
        fullPath = fullPath.replace(/[^/]+\/\.\.\//g, '')
      }
      fullPath = fullPath.replace(/\/\.\//g, '/')
      resolvedUrl = BASE_URL + fullPath
    }
    
    if (resolvedUrl.includes('ecstel.co.kr')) {
      imageUrls.add(resolvedUrl)
    }
  }
  
  return Array.from(imageUrls)
}

// 파일 다운로드
async function downloadFile(url, filePath) {
  try {
    const response = await axios.get(url, {
      timeout: 20000,
      httpAgent: new http.Agent({ keepAlive: false }),
      maxRedirects: 5,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      },
      validateStatus: (status) => status === 200
    })
    
    await fs.ensureDir(path.dirname(filePath))
    await fs.writeFile(filePath, response.data)
    return true
  } catch (error) {
    return false
  }
}

async function main() {
  console.log('🖼️ CSS 배경 이미지 추출 및 다운로드 시작...\n')
  
  // CSS 파일들 찾기
  const cssFiles = [
    path.join(OUTPUT_DIR, 'css/reset.css'),
    path.join(OUTPUT_DIR, 'css/ecs.css'),
    path.join(OUTPUT_DIR, 'css/ecs_mobile.css'),
    path.join(OUTPUT_DIR, 'css/font.css'),
    path.join(OUTPUT_DIR, 'css/jquery.bxslider.css')
  ]
  
  const allImageUrls = new Set()
  
  // 각 CSS 파일에서 이미지 URL 추출
  for (const cssFile of cssFiles) {
    if (await fs.pathExists(cssFile)) {
      console.log(`📄 분석: ${path.basename(cssFile)}`)
      const cssContent = await fs.readFile(cssFile, 'utf-8')
      const imageUrls = extractImageUrls(cssContent, cssFile)
      
      imageUrls.forEach(url => {
        allImageUrls.add(url)
        console.log(`  발견: ${url}`)
      })
    }
  }
  
  console.log(`\n총 발견된 이미지: ${allImageUrls.size}개\n`)
  
  // 이미지 다운로드
  let success = 0
  let fail = 0
  
  for (const imgUrl of allImageUrls) {
    const filePath = imgUrl.replace(BASE_URL, '').replace(/^\//, '')
    const localPath = path.join(OUTPUT_DIR, filePath)
    
    process.stdout.write(`다운로드: ${filePath} ... `)
    
    if (await downloadFile(imgUrl, localPath)) {
      console.log('✅')
      success++
    } else {
      console.log('❌')
      fail++
    }
    
    await new Promise(r => setTimeout(r, 300))
  }
  
  console.log(`\n✅ 완료!`)
  console.log(`성공: ${success}개`)
  console.log(`실패: ${fail}개`)
}

main().catch(console.error)


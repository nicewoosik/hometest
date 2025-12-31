import axios from 'axios'
import * as cheerio from 'cheerio'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import http from 'http'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = 'http://ecstel.co.kr'
const OUTPUT_DIR = path.join(__dirname, 'dist')

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
  console.log('🔍 누락된 이미지 찾기 및 다운로드...\n')
  
  // HTML 파일 읽기
  const htmlPath = path.join(OUTPUT_DIR, 'NEW/html/index.html')
  if (!(await fs.pathExists(htmlPath))) {
    console.log('❌ HTML 파일이 없습니다.')
    return
  }
  
  const html = await fs.readFile(htmlPath, 'utf-8')
  const $ = cheerio.load(html)
  
  // 모든 이미지 URL 수집 (img 태그, CSS 배경 이미지 등)
  const imageUrls = new Set()
  
  // 1. img 태그의 src
  $('img[src]').each((i, elem) => {
    let src = $(elem).attr('src')
    if (src && !src.startsWith('data:')) {
      if (src.startsWith('//')) src = 'http:' + src
      if (!src.startsWith('http')) {
        src = src.startsWith('/') ? BASE_URL + src : BASE_URL + '/' + src
      }
      if (src.includes('ecstel.co.kr')) {
        imageUrls.add(src)
      }
    }
  })
  
  // 2. CSS 파일에서 배경 이미지 찾기
  const cssFiles = [
    path.join(OUTPUT_DIR, 'css/ecs.css'),
    path.join(OUTPUT_DIR, 'css/ecs_mobile.css')
  ]
  
  for (const cssFile of cssFiles) {
    if (await fs.pathExists(cssFile)) {
      const cssContent = await fs.readFile(cssFile, 'utf-8')
      const urlRegex = /url\(['"]?([^'")]+)['"]?\)/gi
      let match
      
      while ((match = urlRegex.exec(cssContent)) !== null) {
        let imgUrl = match[1]
        
        // 잘못된 경로 제외
        if (imgUrl.includes('Local Settings') || imgUrl.includes('Temporary Internet Files')) {
          continue
        }
        
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
        if (imgUrl.startsWith('/')) {
          imageUrls.add(BASE_URL + imgUrl)
        } else {
          // ../ 처리
          const cssDir = path.dirname(cssFile).replace(OUTPUT_DIR, '').replace(/^\//, '')
          let fullPath = '/' + cssDir + '/' + imgUrl
          while (fullPath.includes('/../')) {
            fullPath = fullPath.replace(/[^/]+\/\.\.\//g, '')
          }
          fullPath = fullPath.replace(/\/\.\//g, '/')
          imageUrls.add(BASE_URL + fullPath)
        }
      }
    }
  }
  
  // 3. 일반적으로 사용되는 이미지 경로들 시도
  const commonImages = [
    '/NEW/images/gnbK/newlogo.png',
    '/NEW/images/favicon.ico',
    '/images/dot.gif',
    '/images/spacer.gif',
    '/NEW/images/common/kor_on.png',
    '/NEW/images/common/eng_off.png',
    '/NEW/images/common/mobile_btn.png',
    '/NEW/images/common/mobile_x_btn.jpg',
    '/NEW/images/common/sns_fb.png',
    '/NEW/images/common/sns_insta.png',
    '/NEW/images/common/sns_in.png',
    '/NEW/images/common/sns_gg.png',
    '/NEW/images/common/sns_yt.png'
  ]
  
  commonImages.forEach(img => {
    imageUrls.add(BASE_URL + img)
  })
  
  console.log(`발견된 이미지 URL: ${imageUrls.size}개\n`)
  
  // 이미지 다운로드
  let success = 0
  let fail = 0
  
  for (const imgUrl of imageUrls) {
    const filePath = imgUrl.replace(BASE_URL, '').replace(/^\//, '')
    const localPath = path.join(OUTPUT_DIR, filePath)
    
    // 이미 존재하는지 확인
    if (await fs.pathExists(localPath)) {
      continue
    }
    
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
  console.log(`이미 존재: ${imageUrls.size - success - fail}개`)
}

main().catch(console.error)


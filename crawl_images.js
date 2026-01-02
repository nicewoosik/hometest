import axios from 'axios'
import * as cheerio from 'cheerio'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'
import http from 'http'
import { URL } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = 'http://ecstel.co.kr'
const OUTPUT_DIR = path.join(__dirname, 'dist')

// 이미지 다운로드 함수
async function downloadImage(url, filePath) {
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 30000,
      httpAgent: new http.Agent({ keepAlive: true }),
      httpsAgent: new https.Agent({ rejectUnauthorized: false, keepAlive: true }),
      maxRedirects: 5
    })
    
    await fs.ensureDir(path.dirname(filePath))
    await fs.writeFile(filePath, response.data)
    console.log(`✅ 이미지 다운로드: ${url}`)
    return true
  } catch (error) {
    console.error(`❌ 이미지 다운로드 실패: ${url} - ${error.message}`)
    return false
  }
}

// CSS 파일에서 배경 이미지 URL 추출
async function extractImagesFromCSS(cssUrl) {
  try {
    const response = await axios.get(cssUrl, {
      timeout: 30000,
      httpAgent: new http.Agent({ keepAlive: true }),
      httpsAgent: new https.Agent({ rejectUnauthorized: false, keepAlive: true })
    })
    
    const cssContent = response.data
    const imageUrls = []
    
    // url() 안의 이미지 찾기
    const urlRegex = /url\(['"]?([^'")]+)['"]?\)/gi
    let match
    while ((match = urlRegex.exec(cssContent)) !== null) {
      const imgUrl = match[1]
      if (imgUrl && !imgUrl.startsWith('data:') && !imgUrl.startsWith('http')) {
        const fullUrl = new URL(imgUrl, cssUrl).href
        imageUrls.push(fullUrl)
      } else if (imgUrl && imgUrl.startsWith('http') && imgUrl.includes('ecstel.co.kr')) {
        imageUrls.push(imgUrl)
      }
    }
    
    return [...new Set(imageUrls)]
  } catch (error) {
    console.error(`CSS 파싱 실패: ${cssUrl} - ${error.message}`)
    return []
  }
}

// HTML 페이지에서 모든 이미지 URL 수집
async function getAllImagesFromPage(pageUrl) {
  try {
    const response = await axios.get(pageUrl, {
      timeout: 30000,
      httpAgent: new http.Agent({ keepAlive: true }),
      httpsAgent: new https.Agent({ rejectUnauthorized: false, keepAlive: true })
    })
    
    const $ = cheerio.load(response.data)
    const imageUrls = new Set()
    
    // img 태그의 src
    $('img[src]').each((i, elem) => {
      const src = $(elem).attr('src')
      if (src && !src.startsWith('data:')) {
        const fullUrl = src.startsWith('http') ? src : new URL(src, pageUrl).href
        if (fullUrl.includes('ecstel.co.kr')) {
          imageUrls.add(fullUrl)
        }
      }
    })
    
    // CSS 파일에서 배경 이미지 추출
    $('link[rel="stylesheet"]').each(async (i, elem) => {
      const href = $(elem).attr('href')
      if (href) {
        const cssUrl = href.startsWith('http') ? href : new URL(href, pageUrl).href
        if (cssUrl.includes('ecstel.co.kr')) {
          const cssImages = await extractImagesFromCSS(cssUrl)
          cssImages.forEach(img => imageUrls.add(img))
        }
      }
    })
    
    return Array.from(imageUrls)
  } catch (error) {
    console.error(`페이지 파싱 실패: ${pageUrl} - ${error.message}`)
    return []
  }
}

// 메인 함수
async function main() {
  console.log('🖼️ 이미지 크롤링 시작...')
  console.log(`대상 URL: ${BASE_URL}`)
  console.log('')
  
  const pageUrl = `${BASE_URL}/NEW/html/index.html`
  const imageUrls = await getAllImagesFromPage(pageUrl)
  
  console.log(`발견된 이미지: ${imageUrls.length}개`)
  console.log('')
  
  // CSS 파일들도 확인
  const cssFiles = [
    `${BASE_URL}/css/reset.css`,
    `${BASE_URL}/css/ecs.css`,
    `${BASE_URL}/css/ecs_mobile.css`,
    `${BASE_URL}/css/font.css`,
    `${BASE_URL}/css/jquery.bxslider.css`
  ]
  
  for (const cssUrl of cssFiles) {
    console.log(`CSS 파일 확인: ${cssUrl}`)
    const cssImages = await extractImagesFromCSS(cssUrl)
    cssImages.forEach(img => imageUrls.push(img))
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  
  const allImages = [...new Set(imageUrls)]
  console.log(`총 이미지: ${allImages.length}개`)
  console.log('')
  
  // 이미지 다운로드
  let successCount = 0
  let failCount = 0
  
  for (const imgUrl of allImages) {
    const imgPath = imgUrl.replace(BASE_URL, '').replace(/^\//, '')
    const localPath = path.join(OUTPUT_DIR, imgPath)
    
    const success = await downloadImage(imgUrl, localPath)
    if (success) {
      successCount++
    } else {
      failCount++
    }
    
    await new Promise(resolve => setTimeout(resolve, 200))
  }
  
  console.log('')
  console.log('🎉 이미지 크롤링 완료!')
  console.log(`성공: ${successCount}개`)
  console.log(`실패: ${failCount}개`)
}

main().catch(console.error)



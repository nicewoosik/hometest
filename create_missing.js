import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const OUTPUT_DIR = path.join(__dirname, 'dist')

// 누락된 파일들에 빈 파일 생성 (404 에러 방지)
const missingFiles = [
  'css/reset.css',
  'css/ecs_mobile.css',
  'css/font.css',
  'css/jquery.bxslider.css',
  'js/jquery-1.12.3.min.js',
  'js/jquery.bxslider.min.js',
  'js/default.js',
  'js/ecs.js',
  'js/rolling.js',
  'js/mobile.js'
]

console.log('📝 누락된 파일에 빈 파일 생성...\n')

for (const file of missingFiles) {
  const filePath = path.join(OUTPUT_DIR, file)
  const exists = await fs.pathExists(filePath)
  
  if (!exists) {
    await fs.ensureDir(path.dirname(filePath))
    await fs.writeFile(filePath, '/* 파일을 찾을 수 없습니다 */')
    console.log(`✅ 생성: ${file}`)
  } else {
    console.log(`⏭️  이미 존재: ${file}`)
  }
}

console.log('\n✅ 완료!')



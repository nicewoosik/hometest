#!/bin/bash

BASE_URL="http://ecstel.co.kr"
OUTPUT_DIR="dist"

echo "🖼️ 모든 이미지 폴더 다운로드..."
echo ""

# 이미지 폴더들
image_folders=(
  "NEW/images/gnbK"
  "NEW/images/common"
  "NEW/images/kor"
  "images"
)

for folder in "${image_folders[@]}"; do
  echo "다운로드: $folder"
  mkdir -p "$OUTPUT_DIR/$folder"
  
  # 폴더의 모든 파일 다운로드 시도
  # 실제로는 wget이나 curl로 재귀적으로 다운로드해야 하지만,
  # 여기서는 주요 파일들만 시도
  if [ "$folder" = "NEW/images/gnbK" ]; then
    curl -s -f "$BASE_URL/$folder/newlogo.png" -o "$OUTPUT_DIR/$folder/newlogo.png" 2>/dev/null && echo "  ✅ newlogo.png" || echo "  ❌ newlogo.png"
  fi
  
  if [ "$folder" = "NEW/images/common" ]; then
    files=("kor_on.png" "sns_insta.png" "mobile_btn.png" "sns_in.png" "eng_off.png" "sns_gg.png" "sns_fb.png" "sns_yt.png" "mobile_x_btn.jpg" "favicon.ico")
    for file in "${files[@]}"; do
      curl -s -f "$BASE_URL/$folder/$file" -o "$OUTPUT_DIR/$folder/$file" 2>/dev/null && echo "  ✅ $file" || echo "  ❌ $file"
    done
  fi
done

echo ""
echo "✅ 완료!"


#!/bin/bash

BASE_URL="http://ecstel.co.kr"
OUTPUT_DIR="dist"

echo "🔧 누락된 파일 다운로드..."
echo ""

# CSS 파일들
echo "1. CSS 파일 다운로드..."
mkdir -p "$OUTPUT_DIR/css"
files=(
  "css/reset.css"
  "css/ecs.css"
  "css/ecs_mobile.css"
  "css/font.css"
  "css/jquery.bxslider.css"
)

for file in "${files[@]}"; do
  url="$BASE_URL/$file"
  output="$OUTPUT_DIR/$file"
  echo -n "다운로드: $file ... "
  if curl -s -f "$url" -o "$output" 2>/dev/null; then
    echo "✅"
  else
    echo "❌"
  fi
done

# JS 파일들
echo ""
echo "2. JS 파일 다운로드..."
mkdir -p "$OUTPUT_DIR/js"
files=(
  "js/jquery-1.12.3.min.js"
  "js/jquery.bxslider.min.js"
  "js/default.js"
  "js/ecs.js"
  "js/rolling.js"
  "js/mobile.js"
)

for file in "${files[@]}"; do
  url="$BASE_URL/$file"
  output="$OUTPUT_DIR/$file"
  echo -n "다운로드: $file ... "
  if curl -s -f "$url" -o "$output" 2>/dev/null; then
    echo "✅"
  else
    echo "❌"
  fi
done

echo ""
echo "✅ 완료!"



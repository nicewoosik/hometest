#!/bin/bash

BASE="http://ecstel.co.kr"
OUT="dist"

echo "메인 화면 이미지 다운로드 시작..."

# 메인 페이지 HTML 다시 다운로드
curl -sL "$BASE/NEW/html/index.html" -o $OUT/NEW/html/index.html

# 메인 페이지에서 사용하는 이미지 경로 추출
images=(
  "/NEW/images/kor/main_bg.jpg"
  "/NEW/images/kor/main_visual.jpg"
  "/NEW/images/kor/main_slide_01.jpg"
  "/NEW/images/kor/main_slide_02.jpg"
  "/NEW/images/kor/main_slide_03.jpg"
  "/NEW/images/kor/main_slide_04.jpg"
  "/NEW/images/kor/main_title.png"
  "/NEW/images/kor/main_icon_bg.png"
  "/NEW/images/kor/main_service_01.jpg"
  "/NEW/images/kor/main_service_02.jpg"
  "/NEW/images/kor/main_service_03.jpg"
  "/NEW/images/kor/main_partner_bg.jpg"
  "/NEW/images/kor/main_customer_bg.jpg"
  "/NEW/images/kor/main_news_bg.jpg"
  "/NEW/images/kor/main_cta_bg.jpg"
  "/NEW/images/kor/main_footer_bg.jpg"
)

# HTML에서 실제로 사용되는 이미지 경로 추출
html_images=$(curl -sL "$BASE/NEW/html/index.html" | grep -oE 'src=["\047][^"\047]+["\047]' | sed 's/src="//g; s/"//g' | grep -v "^http" | grep -v "^data:" | grep "/NEW/images/kor/" | sort -u)

echo "발견된 이미지:"
echo "$html_images"

# 이미지 다운로드
for img in $html_images; do
  localpath="${OUT}${img}"
  dir=$(dirname "$localpath")
  mkdir -p "$dir"
  echo "다운로드: $img"
  curl -sL "${BASE}${img}" -o "$localpath" && echo "  ✅ 성공" || echo "  ❌ 실패"
done

# 추가로 일반적인 메인 이미지들도 시도
for img in "${images[@]}"; do
  localpath="${OUT}${img}"
  if [ ! -f "$localpath" ]; then
    dir=$(dirname "$localpath")
    mkdir -p "$dir"
    echo "다운로드: $img"
    curl -sL "${BASE}${img}" -o "$localpath" && echo "  ✅ 성공" || echo "  ❌ 실패"
  fi
done

echo ""
echo "완료!"



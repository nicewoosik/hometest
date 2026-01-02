#!/bin/bash

BASE="http://ecstel.co.kr"
OUT="dist"

echo "크롤링 시작..."

# 디렉토리 구조 생성
mkdir -p $OUT/{css,js,NEW/html,NEW/images/common,NEW/images/kor,NEW/images/gnbK,board/js,NEW/html/js}

# HTML
echo "HTML 다운로드..."
curl -sL "$BASE/NEW/html/index.html" -o $OUT/NEW/html/index.html

# CSS
echo "CSS 다운로드..."
curl -sL "$BASE/css/reset.css" -o $OUT/css/reset.css
curl -sL "$BASE/css/ecs.css" -o $OUT/css/ecs.css
curl -sL "$BASE/css/ecs_mobile.css" -o $OUT/css/ecs_mobile.css
curl -sL "$BASE/css/font.css" -o $OUT/css/font.css
curl -sL "$BASE/css/jquery.bxslider.css" -o $OUT/css/jquery.bxslider.css

# JS
echo "JS 다운로드..."
curl -sL "$BASE/js/jquery-1.12.3.min.js" -o $OUT/js/jquery-1.12.3.min.js
curl -sL "$BASE/js/jquery.bxslider.min.js" -o $OUT/js/jquery.bxslider.min.js
curl -sL "$BASE/js/default.js" -o $OUT/js/default.js
curl -sL "$BASE/js/ecs.js" -o $OUT/js/ecs.js
curl -sL "$BASE/js/rolling.js" -o $OUT/js/rolling.js
curl -sL "$BASE/js/mobile.js" -o $OUT/js/mobile.js
curl -sL "$BASE/board/js/move_layer.js" -o $OUT/board/js/move_layer.js
curl -sL "$BASE/NEW/html/js/minhyuk.js" -o $OUT/NEW/html/js/minhyuk.js 2>/dev/null || true

# 이미지 - HTML에서 찾은 것들
echo "이미지 다운로드..."
images=(
  "/NEW/images/common/mobile_btn.png"
  "/NEW/images/common/kor_on.png"
  "/NEW/images/common/eng_off.png"
  "/NEW/images/common/sns_fb.png"
  "/NEW/images/common/sns_insta.png"
  "/NEW/images/common/sns_blog.png"
  "/NEW/images/common/sns_gg.png"
  "/NEW/images/common/sns_in.png"
  "/NEW/images/common/sns_yt.png"
  "/NEW/images/common/mobile_x_btn.jpg"
  "/NEW/images/common/dot.gif"
  "/NEW/images/common/favicon.ico"
  "/NEW/images/common/logo.png"
  "/NEW/images/gnbK/newlogo.png"
  "/NEW/images/kor/copyright.png"
  "/NEW/images/kor/s1_icon01.png"
  "/NEW/images/kor/s1_icon02.png"
  "/NEW/images/kor/s1_icon03.png"
  "/NEW/images/kor/s1_icon04.png"
  "/NEW/images/kor/cus_logo_01.png"
  "/NEW/images/kor/cus_logo_02.png"
  "/NEW/images/kor/cus_logo_03.png"
  "/NEW/images/kor/cus_logo_04.png"
  "/NEW/images/kor/cus_logo_05.png"
  "/NEW/images/kor/cus_logo_06.png"
  "/NEW/images/kor/cus_logo_07.png"
  "/NEW/images/kor/cus_logo_08.png"
  "/NEW/images/kor/cus_logo_09.png"
  "/NEW/images/kor/cus_logo_10.png"
  "/NEW/images/kor/cus_logo_11.png"
  "/NEW/images/kor/cus_logo_12.png"
  "/NEW/images/kor/cus_logo_13.png"
  "/NEW/images/kor/cus_logo_14.png"
  "/NEW/images/kor/cus_logo_15.png"
  "/NEW/images/kor/cus_logo_16.png"
  "/NEW/images/kor/cus_logo_17.png"
  "/NEW/images/kor/cus_logo_18.png"
  "/NEW/images/kor/cus_logo_19.png"
  "/NEW/images/kor/cus_logo_20.png"
  "/NEW/images/kor/part_logo_01.png"
  "/NEW/images/kor/part_logo_02.png"
  "/NEW/images/kor/part_logo_03.png"
  "/NEW/images/kor/part_logo_04.png"
  "/NEW/images/kor/part_logo_05.png"
  "/NEW/images/kor/part_logo_06.png"
  "/NEW/images/kor/part_logo_07.png"
)

for img in "${images[@]}"; do
  localpath="${OUT}${img}"
  dir=$(dirname "$localpath")
  mkdir -p "$dir"
  curl -sL "${BASE}${img}" -o "$localpath" 2>/dev/null && echo "✅ $img" || echo "❌ $img"
done

# 루트 index.html (리다이렉트)
cat > $OUT/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="refresh" content="0;url=/NEW/html/index.html">
</head>
<body></body>
</html>
EOF

echo ""
echo "크롤링 완료!"
echo "총 파일: $(find $OUT -type f | wc -l | tr -d ' ')"



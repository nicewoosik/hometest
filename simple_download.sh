#!/bin/bash

BASE_URL="http://ecstel.co.kr"
OUTPUT_DIR="dist"

echo "🚀 간단한 다운로드 시작..."

# 디렉토리 생성
mkdir -p ${OUTPUT_DIR}/{css,js,NEW/html,NEW/images/common,board/js}

# HTML
echo "1. HTML 다운로드..."
curl -sL "${BASE_URL}/NEW/html/index.html" -o ${OUTPUT_DIR}/NEW/html/index.html

# CSS
echo "2. CSS 다운로드..."
curl -sL "${BASE_URL}/css/reset.css" -o ${OUTPUT_DIR}/css/reset.css
curl -sL "${BASE_URL}/css/ecs.css" -o ${OUTPUT_DIR}/css/ecs.css
curl -sL "${BASE_URL}/css/ecs_mobile.css" -o ${OUTPUT_DIR}/css/ecs_mobile.css
curl -sL "${BASE_URL}/css/font.css" -o ${OUTPUT_DIR}/css/font.css
curl -sL "${BASE_URL}/css/jquery.bxslider.css" -o ${OUTPUT_DIR}/css/jquery.bxslider.css

# JS
echo "3. JS 다운로드..."
curl -sL "${BASE_URL}/js/jquery-1.12.3.min.js" -o ${OUTPUT_DIR}/js/jquery-1.12.3.min.js
curl -sL "${BASE_URL}/js/jquery.bxslider.min.js" -o ${OUTPUT_DIR}/js/jquery.bxslider.min.js
curl -sL "${BASE_URL}/js/default.js" -o ${OUTPUT_DIR}/js/default.js
curl -sL "${BASE_URL}/js/ecs.js" -o ${OUTPUT_DIR}/js/ecs.js
curl -sL "${BASE_URL}/js/rolling.js" -o ${OUTPUT_DIR}/js/rolling.js
curl -sL "${BASE_URL}/js/mobile.js" -o ${OUTPUT_DIR}/js/mobile.js
curl -sL "${BASE_URL}/board/js/move_layer.js" -o ${OUTPUT_DIR}/board/js/move_layer.js

# 이미지 (일반적인 경로)
echo "4. 이미지 다운로드..."
for img in dot.gif logo.png favicon.ico; do
  curl -sL "${BASE_URL}/NEW/images/common/${img}" -o ${OUTPUT_DIR}/NEW/images/common/${img} 2>/dev/null || true
done

# HTML 경로 수정
echo "5. 경로 수정..."
sed -i '' 's|href="../css/|href="/css/|g' ${OUTPUT_DIR}/NEW/html/index.html
sed -i '' 's|src="../js/|src="/js/|g' ${OUTPUT_DIR}/NEW/html/index.html
sed -i '' 's|src="../board/|src="/board/|g' ${OUTPUT_DIR}/NEW/html/index.html
sed -i '' 's|src="../images/|src="/NEW/images/|g' ${OUTPUT_DIR}/NEW/html/index.html

# CSS 경로 수정
find ${OUTPUT_DIR}/css -name "*.css" -exec sed -i '' 's|url(../images/|url(/NEW/images/|g' {} \;

# 루트 index.html
cat > ${OUTPUT_DIR}/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="refresh" content="0;url=/NEW/html/index.html">
</head>
<body></body>
</html>
EOF

echo "✅ 완료!"


#!/bin/bash

cd /Users/tommyjang/ecstel-clone

echo "🔧 모든 경로 수정 중..."

# HTML 파일의 상대 경로를 절대 경로로 변경
sed -i '' 's|href="../css/|href="/css/|g' dist/NEW/html/index.html
sed -i '' 's|src="../js/|src="/js/|g' dist/NEW/html/index.html
sed -i '' 's|src="../board/|src="/board/|g' dist/NEW/html/index.html
sed -i '' 's|src="../images/|src="/NEW/images/|g' dist/NEW/html/index.html

# CSS 파일의 상대 경로도 수정
find dist/css -name "*.css" -exec sed -i '' 's|url(\.\./|url(/|g' {} \;
find dist/css -name "*.css" -exec sed -i '' 's|url(\.\.\/images/|url(/NEW/images/|g' {} \;

echo "✅ 경로 수정 완료!"


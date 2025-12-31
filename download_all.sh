#!/bin/bash

BASE="http://ecstel.co.kr"
OUT="dist"

mkdir -p $OUT/{css,js,NEW/html,NEW/images/common,NEW/images,board/js}

echo "=== HTML ==="
curl -sL "$BASE/NEW/html/index.html" -o $OUT/NEW/html/index.html

echo "=== CSS ==="
curl -sL "$BASE/css/reset.css" -o $OUT/css/reset.css
curl -sL "$BASE/css/ecs.css" -o $OUT/css/ecs.css  
curl -sL "$BASE/css/ecs_mobile.css" -o $OUT/css/ecs_mobile.css
curl -sL "$BASE/css/font.css" -o $OUT/css/font.css
curl -sL "$BASE/css/jquery.bxslider.css" -o $OUT/css/jquery.bxslider.css

echo "=== JS ==="
curl -sL "$BASE/js/jquery-1.12.3.min.js" -o $OUT/js/jquery-1.12.3.min.js
curl -sL "$BASE/js/jquery.bxslider.min.js" -o $OUT/js/jquery.bxslider.min.js
curl -sL "$BASE/js/default.js" -o $OUT/js/default.js
curl -sL "$BASE/js/ecs.js" -o $OUT/js/ecs.js
curl -sL "$BASE/js/rolling.js" -o $OUT/js/rolling.js
curl -sL "$BASE/js/mobile.js" -o $OUT/js/mobile.js
curl -sL "$BASE/board/js/move_layer.js" -o $OUT/board/js/move_layer.js

echo "=== CSS에서 이미지 경로 추출 ==="
for css in $OUT/css/*.css; do
  grep -o "url([^)]*)" "$css" | sed "s/url(//g; s/)//g; s/'//g; s/\"//g" | grep -v "^data:" | grep -v "Local Settings" | while read img; do
    if [[ $img == ../images/* ]]; then
      imgpath=$(echo $img | sed 's|../images/|NEW/images/|')
      dir=$(dirname "$OUT/$imgpath")
      mkdir -p "$dir"
      echo "다운로드: $img -> $imgpath"
      curl -sL "$BASE/$imgpath" -o "$OUT/$imgpath" 2>/dev/null || true
    elif [[ $img == /NEW/images/* ]]; then
      imgpath=$(echo $img | sed 's|^/||')
      dir=$(dirname "$OUT/$imgpath")
      mkdir -p "$dir"
      echo "다운로드: $img -> $imgpath"
      curl -sL "$BASE/$imgpath" -o "$OUT/$imgpath" 2>/dev/null || true
    fi
  done
done

echo "=== HTML에서 이미지 경로 추출 ==="
grep -oE 'src="[^"]*"' $OUT/NEW/html/index.html | sed 's/src="//g; s/"//g' | grep -v "^data:" | grep -v "^http" | while read img; do
  if [[ $img == ../images/* ]]; then
    imgpath=$(echo $img | sed 's|../images/|NEW/images/|')
    dir=$(dirname "$OUT/$imgpath")
    mkdir -p "$dir"
    echo "다운로드: $img -> $imgpath"
    curl -sL "$BASE/$imgpath" -o "$OUT/$imgpath" 2>/dev/null || true
  fi
done

echo "=== 경로 수정 ==="
sed -i '' 's|href="../css/|href="/css/|g' $OUT/NEW/html/index.html
sed -i '' 's|src="../js/|src="/js/|g' $OUT/NEW/html/index.html
sed -i '' 's|src="../board/|src="/board/|g' $OUT/NEW/html/index.html
sed -i '' 's|src="../images/|src="/NEW/images/|g' $OUT/NEW/html/index.html

find $OUT/css -name "*.css" -exec sed -i '' 's|url(../images/|url(/NEW/images/|g' {} \;
find $OUT/css -name "*.css" -exec sed -i '' 's|url(/images/|url(/NEW/images/|g' {} \;

cat > $OUT/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="refresh" content="0;url=/NEW/html/index.html">
</head>
<body></body>
</html>
EOF

echo "=== 완료 ==="
find $OUT -type f | wc -l | xargs echo "총 파일 수:"

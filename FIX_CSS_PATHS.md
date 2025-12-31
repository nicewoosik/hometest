# CSS 경로 문제 해결

## 🔍 문제

HTML 파일에서 CSS 경로가 상대 경로(`../css/`)로 되어 있어서 서버가 제대로 처리하지 못하고 있습니다.

## ✅ 해결 방법

### 방법 1: 서버 재시작 (수정된 서버 코드 사용)

서버 코드를 수정했습니다. 서버를 재시작하세요:

```bash
cd /Users/tommyjang/ecstel-clone

# 기존 서버 중지 (Ctrl+C)
# 새로 시작
npm run dev
```

### 방법 2: HTML 파일의 CSS 경로 수정

HTML 파일에서 상대 경로를 절대 경로로 변경:

`dist/NEW/html/index.html` 파일을 열어서:

```html
<!-- 변경 전 -->
<link rel="stylesheet" type="text/css" href="../css/reset.css">

<!-- 변경 후 -->
<link rel="stylesheet" type="text/css" href="/css/reset.css">
```

모든 `../css/`를 `/css/`로, `../js/`를 `/js/`로 변경

## 🚀 빠른 해결

1. **서버 재시작** (수정된 코드 사용)
   ```bash
   npm run dev
   ```

2. **브라우저 새로고침** (Cmd+R 또는 F5)

3. **개발자 도구 확인** (F12)
   - Network 탭에서 실패한 파일 확인
   - Console 탭에서 에러 확인

## 📋 확인 사항

서버를 재시작한 후:
- CSS 파일이 로드되는지 확인
- 이미지가 표시되는지 확인
- 아이콘이 표시되는지 확인

문제가 계속되면 브라우저 개발자 도구의 에러 메시지를 알려주세요!


# 서버 실행 에러 해결

## 🔍 에러 원인

`EPERM: operation not permitted` 에러는 포트 바인딩 권한 문제입니다.

## ✅ 해결 완료

서버가 `localhost`로만 바인딩되도록 수정했습니다.

## 🚀 다시 실행하기

터미널에서:

```bash
cd /Users/tommyjang/ecstel-clone
npm run dev
```

또는:

```bash
node serve.js
```

## 📋 예상 출력

```
============================================================
🌐 ECSTEL 클론 서버 실행 중
============================================================
서버 주소: http://localhost:8000
디렉토리: /Users/tommyjang/ecstel-clone/dist

서버를 중지하려면 Ctrl+C를 누르세요
============================================================
```

이 메시지가 보이면 브라우저에서 **http://localhost:8000** 접속하세요!

---

## 🔄 다른 포트 사용하기

포트 8000이 문제라면 다른 포트로 변경:

`serve.js` 파일에서:
```javascript
const PORT = 8001  // 8000에서 8001로 변경
```

그 다음:
```bash
node serve.js
```

브라우저에서 **http://localhost:8001** 접속


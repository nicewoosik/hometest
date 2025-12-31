# 크롤링 재실행 가이드

## 🔍 문제

실제 메인 페이지(`/NEW/html/index.html`)가 크롤링되지 않았습니다.

## ✅ 해결

크롤링 스크립트를 개선했습니다:
- 리다이렉트 메타 태그를 따라가도록 수정
- 주요 페이지를 우선 크롤링하도록 추가

## 🚀 다시 크롤링하기

터미널에서:

```bash
cd /Users/tommyjang/ecstel-clone

# 기존 dist 폴더 삭제 (선택사항)
rm -rf dist

# 크롤링 재실행
npm run crawl
```

## ⏱️ 예상 시간

- 약 5-10분 소요될 수 있습니다
- 진행 상황이 터미널에 표시됩니다

## ✅ 완료 후

크롤링이 완료되면:

```bash
npm run dev
```

브라우저에서 **http://localhost:8000** 접속

---

## 📋 크롤링되는 주요 페이지

- `/NEW/html/index.html` - 메인 페이지
- `/NEW/html/01_01mission.html` - 미션 페이지
- `/NEW/html/01_03award.html` - 수상 페이지
- 기타 모든 링크된 페이지들


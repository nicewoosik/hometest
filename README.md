# ECSTEL 사이트 크롤링 프로젝트

http://ecstel.co.kr 사이트를 완전히 크롤링한 프로젝트입니다.

## 크롤링된 내용

- **HTML 페이지**: 33개 (한국어 + 영어)
- **이미지 파일**: 631개
- **CSS 파일**: 6개
- **JS 파일**: 17개
- **PDF 파일**: 9개
- **총 파일**: 712개 이상

## 실행 방법

```bash
# 의존성 설치
npm install

# 서버 실행
npm run dev
```

브라우저에서 `http://localhost:8000` 접속

## 크롤링 스크립트

- `crawl_everything.js`: 전체 사이트 크롤링
- `crawl_complete.js`: 완전 크롤링 (더 포괄적)
- `simple_crawl.sh`: 간단한 크롤링 스크립트

## 파일 구조

```
dist/
├── NEW/
│   ├── html/          # HTML 페이지들
│   ├── images/        # 이미지 파일들
│   ├── js/            # JavaScript 파일들
│   └── pdf/           # PDF 파일들
├── css/               # CSS 파일들
└── js/                # JavaScript 파일들
```

## 주의사항

이 프로젝트는 교육/연구 목적으로만 사용하세요.
원본 사이트의 저작권을 존중하세요.

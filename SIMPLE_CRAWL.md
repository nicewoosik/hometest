# 간단한 크롤링 방법

## 🔧 새로운 간단한 스크립트

복잡한 로직 대신 간단하고 확실한 방법으로 크롤링합니다.

## 🚀 실행 방법

```bash
cd /Users/tommyjang/ecstel-clone

# 간단한 크롤링 실행
npm run crawl-simple
```

## 📋 작동 방식

1. 메인 페이지만 먼저 다운로드
2. HTML에서 필요한 리소스 URL 추출
3. 각 리소스를 하나씩 다운로드
4. 성공/실패 명확히 표시

## ⚠️ 실패하는 파일들

일부 파일은 원본 사이트에서 접근이 안 될 수 있습니다:
- 외부 CDN (jQuery UI 등)
- 동적 생성 리소스
- 보호된 파일

이런 경우는 정상입니다. 가능한 파일만 다운로드됩니다.

## 💡 대안: wget 사용

더 확실한 방법으로 wget을 사용할 수도 있습니다:

```bash
cd /Users/tommyjang/ecstel-clone
mkdir -p dist

# wget으로 전체 사이트 다운로드
wget --recursive --page-requisites --html-extension --convert-links --domains=ecstel.co.kr --no-parent http://ecstel.co.kr/NEW/html/index.html -P dist/
```

wget이 설치되어 있다면 이 방법이 더 확실합니다.


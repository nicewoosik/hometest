# 🚀 빠른 시작 가이드

## 1단계: 의존성 설치

터미널에서 다음 명령어를 실행하세요:

```bash
cd /Users/tommyjang/ecstel-clone

# npm 권한 문제가 있다면 먼저 실행:
sudo chown -R $(whoami) ~/.npm

# 의존성 설치
npm install
```

## 2단계: 웹사이트 크롤링

```bash
npm run crawl
```

이 명령어는 www.ecstel.co.kr의 모든 페이지, CSS, JS, 이미지를 다운로드합니다.
- 시간이 걸릴 수 있습니다 (5-10분)
- 진행 상황이 터미널에 표시됩니다

## 3단계: 로컬 서버 실행

```bash
npm run dev
```

브라우저에서 **http://localhost:8000** 접속

---

## 📋 전체 명령어

```bash
# 프로젝트 폴더로 이동
cd /Users/tommyjang/ecstel-clone

# npm 권한 수정 (필요시)
sudo chown -R $(whoami) ~/.npm

# 의존성 설치
npm install

# 크롤링 실행
npm run crawl

# 서버 실행
npm run dev
```

---

## ⚠️ 문제 해결

### npm 권한 에러
```bash
sudo chown -R $(whoami) ~/.npm
npm install
```

### 크롤링이 느린 경우
- 정상입니다. 모든 리소스를 다운로드하므로 시간이 걸립니다
- 진행 상황을 확인하세요

### 일부 리소스가 다운로드되지 않는 경우
- 정상입니다. 일부 외부 리소스는 다운로드되지 않을 수 있습니다
- 필요시 수동으로 확인하고 수정하세요

---

## 🎯 다음 단계

크롤링이 완료되면:
1. `dist/` 폴더에 모든 파일이 저장됩니다
2. `npm run dev`로 서버 실행
3. 브라우저에서 확인
4. 필요시 파일 수정


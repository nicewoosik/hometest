# Git 저장소 설정 가이드

## 1. Git 저장소 초기화

터미널에서 다음 명령어를 실행하세요:

```bash
cd /Users/tommyjang/ecstel-clone
git init
```

## 2. 파일 추가 및 커밋

```bash
git add .
git commit -m "Initial commit: ECSTEL 사이트 크롤링 완료"
```

## 3. GitHub 저장소 생성

1. https://github.com/new 접속
2. 저장소 이름 입력 (예: `ecstel-clone`)
3. Public 또는 Private 선택
4. "Create repository" 클릭

## 4. 원격 저장소 연결 및 푸시

GitHub에서 제공하는 명령어를 실행하세요:

```bash
git remote add origin https://github.com/사용자명/ecstel-clone.git
git branch -M main
git push -u origin main
```

또는 SSH를 사용하는 경우:

```bash
git remote add origin git@github.com:사용자명/ecstel-clone.git
git branch -M main
git push -u origin main
```

## 완료!

이제 GitHub에서 프로젝트를 확인할 수 있습니다.


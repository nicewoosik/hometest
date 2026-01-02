# GitHub에 푸시하기

## 저장소가 이미 존재하는 경우

만약 `nicewoosik/hometest` 저장소가 이미 있다면:

```bash
cd /Users/tommyjang/ecstel-clone
git init
git add .
git commit -m "Initial commit: ECSTEL 사이트 크롤링 완료"
git remote add origin https://github.com/nicewoosik/hometest.git
git branch -M main
git push -u origin main
```

## 저장소가 없는 경우 (새로 만들어야 하는 경우)

1. https://github.com/new 접속
2. Repository name에 `hometest` 입력
3. Public 또는 Private 선택
4. "Create repository" 클릭
5. 아래 명령어 실행:

```bash
cd /Users/tommyjang/ecstel-clone
git init
git add .
git commit -m "Initial commit: ECSTEL 사이트 크롤링 완료"
git remote add origin https://github.com/nicewoosik/hometest.git
git branch -M main
git push -u origin main
```

## 저장소 확인

저장소가 이미 있는지 확인하려면:
https://github.com/nicewoosik/hometest

이 URL이 존재하면 이미 있는 것이고, 404가 나오면 새로 만들어야 합니다.



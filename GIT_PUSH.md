# Git 푸시 가이드

## ecstel-clone (hometest) 프로젝트

```bash
cd /Users/tommyjang/ecstel-clone
git push origin main
```

## ecstel-admin (hometest-admin) 프로젝트

```bash
cd /Users/tommyjang/ecstel-admin
git push origin main
```

## 인증 문제가 있는 경우

GitHub 인증이 필요할 수 있습니다:

1. **Personal Access Token 사용**:
   - GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - "Generate new token" 클릭
   - 권한 선택: `repo` 체크
   - 토큰 생성 후 복사
   - 푸시 시 비밀번호 대신 토큰 입력

2. **또는 SSH 키 사용**:
   ```bash
   # 원격 저장소 URL을 SSH로 변경
   git remote set-url origin git@github.com:nicewoosik/hometest.git
   git push origin main
   ```

## 커밋된 내용

### ecstel-clone
- 간편문의 폼 Supabase 연동
- inquiry.js 파일 추가
- index.html 수정

### ecstel-admin
- 계정 관리 메뉴 구현
- 간편문의 확인 메뉴 구현
- 관련 컴포넌트 및 페이지 추가



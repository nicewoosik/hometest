# Supabase RLS 정책 수정 - 단계별 가이드

## 현재 문제
간편문의 제출 시 다음 오류 발생:
- **401 Unauthorized**
- **"new row violates row-level security policy for table 'inquiries'"**

## 해결 방법 (단계별)

### 1단계: Supabase Dashboard 접속
1. https://supabase.com 접속
2. 로그인
3. `ecstel-admin` 프로젝트 선택

### 2단계: SQL Editor 열기
1. 왼쪽 메뉴에서 **SQL Editor** 클릭
2. **New query** 버튼 클릭

### 3단계: SQL 실행
다음 SQL을 복사하여 붙여넣기:

```sql
-- 기존 INSERT 정책 모두 삭제
DROP POLICY IF EXISTS "모든 사용자는 inquiries 생성 가능" ON inquiries;
DROP POLICY IF EXISTS "Allow anon insert inquiries" ON inquiries;
DROP POLICY IF EXISTS "Allow authenticated insert inquiries" ON inquiries;
DROP POLICY IF EXISTS "Enable insert for anon users" ON inquiries;

-- 익명 사용자(anon) INSERT 권한 부여
CREATE POLICY "Allow anon insert inquiries"
  ON inquiries FOR INSERT
  TO anon
  WITH CHECK (true);

-- 인증된 사용자(authenticated) INSERT 권한 부여
CREATE POLICY "Allow authenticated insert inquiries"
  ON inquiries FOR INSERT
  TO authenticated
  WITH CHECK (true);
```

4. **Run** 버튼 클릭 (또는 `Ctrl+Enter` / `Cmd+Enter`)

### 4단계: 정책 확인
다음 SQL로 확인:

```sql
SELECT 
  policyname,
  roles,
  cmd,
  with_check
FROM pg_policies
WHERE tablename = 'inquiries' AND cmd = 'INSERT';
```

**예상 결과:**
- `Allow anon insert inquiries` | `{anon}` | `INSERT` | `true`
- `Allow authenticated insert inquiries` | `{authenticated}` | `INSERT` | `true`

### 5단계: 테스트
1. 브라우저로 돌아가기
2. 페이지 강력 새로고침: `Cmd+Shift+R` (Mac) 또는 `Ctrl+Shift+R` (Windows)
3. 간편문의 폼 작성
4. "문의하기" 버튼 클릭
5. 성공 메시지 확인

## 문제가 계속되면

### Table Editor에서 확인:
1. **Table Editor** → **inquiries** 테이블 선택
2. 상단 **Policies** 탭 클릭
3. INSERT 정책이 있는지 확인
4. 없으면 **New Policy** 클릭하여 생성

### RLS 활성화 확인:
1. **Table Editor** → **inquiries** 테이블 선택
2. 오른쪽 사이드바에서 **RLS enabled** 토글이 켜져 있는지 확인
3. 켜져 있으면 정책이 필요함 (위 SQL 실행)



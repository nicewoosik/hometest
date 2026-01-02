# Supabase RLS 정책 수정 (간편문의 INSERT 권한)

## 문제
간편문의 제출 시 401 오류 발생:
```
new row violates row-level security policy for table "inquiries"
```

## 해결 방법

### 방법 1: SQL Editor에서 실행 (권장)

1. **Supabase Dashboard** 접속
2. 왼쪽 메뉴에서 **SQL Editor** 클릭
3. **New query** 클릭
4. 다음 SQL 복사하여 붙여넣기:

```sql
-- 1. 기존 INSERT 정책 확인
SELECT 
  policyname,
  roles,
  cmd,
  with_check
FROM pg_policies
WHERE tablename = 'inquiries' AND cmd = 'INSERT';

-- 2. 기존 정책 삭제 (있는 경우)
DROP POLICY IF EXISTS "모든 사용자는 inquiries 생성 가능" ON inquiries;
DROP POLICY IF EXISTS "Enable insert for anon users" ON inquiries;
DROP POLICY IF EXISTS "Allow anon insert" ON inquiries;

-- 3. 익명 사용자(anon)도 INSERT 가능하도록 정책 생성
CREATE POLICY "Allow anon insert inquiries"
  ON inquiries FOR INSERT
  TO anon
  WITH CHECK (true);

-- 4. 인증된 사용자도 INSERT 가능하도록 정책 생성
CREATE POLICY "Allow authenticated insert inquiries"
  ON inquiries FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 5. 정책 확인
SELECT 
  policyname,
  roles,
  cmd,
  with_check
FROM pg_policies
WHERE tablename = 'inquiries' AND cmd = 'INSERT';
```

5. **Run** 버튼 클릭 (또는 Ctrl+Enter)

### 방법 2: Table Editor에서 수정

1. **Table Editor** → **inquiries** 테이블 선택
2. 상단 탭에서 **Policies** 클릭
3. **New Policy** 클릭
4. 설정:
   - **Policy name**: `Allow anon insert inquiries`
   - **Allowed operation**: `INSERT`
   - **Target roles**: `anon` 선택
   - **USING expression**: 비워두기
   - **WITH CHECK expression**: `true`
5. **Review** → **Save policy** 클릭

### 확인

정책이 제대로 생성되었는지 확인:

```sql
SELECT 
  policyname,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'inquiries' AND cmd = 'INSERT';
```

결과에 `anon` 역할이 포함되어 있어야 합니다.

## 테스트

정책 수정 후:
1. 브라우저에서 페이지 새로고침 (Cmd+Shift+R)
2. 간편문의 폼 작성
3. "문의하기" 버튼 클릭
4. 성공 메시지 확인



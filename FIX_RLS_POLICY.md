# Supabase RLS 정책 수정 가이드

## 문제
간편문의 제출 시 "new row violates row-level security policy for table 'inquiries'" 오류 발생

## 해결 방법

### Supabase Dashboard에서 실행:

1. **Supabase Dashboard** → **SQL Editor**로 이동

2. 다음 SQL 실행:

```sql
-- 기존 INSERT 정책 확인
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'inquiries' AND cmd = 'INSERT';

-- 기존 정책 삭제 (있는 경우)
DROP POLICY IF EXISTS "모든 사용자는 inquiries 생성 가능" ON inquiries;

-- 익명 사용자(anon)도 INSERT 가능하도록 정책 재생성
CREATE POLICY "모든 사용자는 inquiries 생성 가능"
  ON inquiries FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- 정책 확인
SELECT 
  policyname,
  roles,
  cmd,
  with_check
FROM pg_policies
WHERE tablename = 'inquiries';
```

### 또는 Table Editor에서:

1. **Table Editor** → **inquiries** 테이블 선택
2. **RLS Policies** 탭 클릭
3. INSERT 정책 확인:
   - 정책이 없으면 "New Policy" 클릭
   - Policy name: `모든 사용자는 inquiries 생성 가능`
   - Allowed operation: `INSERT`
   - Target roles: `authenticated`, `anon` 모두 선택
   - USING expression: 비워두기
   - WITH CHECK expression: `true`
4. **Save** 클릭

## 확인

정책이 제대로 설정되었는지 확인:

```sql
SELECT 
  policyname,
  roles,
  cmd,
  with_check
FROM pg_policies
WHERE tablename = 'inquiries' AND cmd = 'INSERT';
```

결과에 `anon`이 포함되어 있어야 합니다.



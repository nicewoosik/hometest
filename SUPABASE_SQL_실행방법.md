# Supabase에서 SQL 실행 방법

## 1단계: Supabase 대시보드 접속
1. https://supabase.com 접속
2. 로그인
3. 프로젝트 선택 (qzymoraaukwicqlhjbsy)

## 2단계: SQL Editor 열기
1. 왼쪽 사이드바에서 **"SQL Editor"** 클릭
2. 또는 상단 메뉴에서 **"SQL Editor"** 선택

## 3단계: SQL 실행
1. SQL Editor 화면에서 **"New query"** 클릭
2. 아래 SQL을 복사해서 붙여넣기:

```sql
-- 1. inquiries 테이블 구조 확인
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default,
  character_maximum_length
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'inquiries'
ORDER BY ordinal_position;
```

3. **"Run"** 버튼 클릭 (또는 `Cmd+Enter` / `Ctrl+Enter`)
4. 결과 확인

## 4단계: RLS 정책 확인
다음 SQL 실행:

```sql
-- 2. 현재 RLS 정책 확인
SELECT 
  policyname,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'inquiries'
ORDER BY cmd, policyname;
```

## 5단계: 정책 재생성
다음 SQL 실행:

```sql
-- 모든 정책 삭제 후 재생성
DO $$
BEGIN
  -- 모든 정책 삭제
  DROP POLICY IF EXISTS "anon_insert_inquiries_policy" ON public.inquiries;
  DROP POLICY IF EXISTS "Allow anon insert inquiries" ON public.inquiries;
  DROP POLICY IF EXISTS "anon_insert_inquiries" ON public.inquiries;
  
  -- RLS 활성화
  ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
  
  -- 익명 사용자 INSERT 정책 생성
  CREATE POLICY "anon_insert_inquiries_policy"
    ON public.inquiries
    FOR INSERT
    TO anon
    WITH CHECK (true);
    
  RAISE NOTICE '정책 생성 완료';
END $$;
```

## 6단계: 최종 확인
다음 SQL 실행:

```sql
-- 정책이 제대로 생성되었는지 확인
SELECT 
  policyname,
  roles::text[] as roles_array,
  cmd,
  with_check
FROM pg_policies
WHERE tablename = 'inquiries' AND cmd = 'INSERT';
```

## 결과 확인 방법

### 테이블 구조 확인 결과 예시:
```
column_name    | data_type | is_nullable | column_default
---------------|-----------|-------------|---------------
id             | bigint    | NO          | nextval(...)
name           | text      | YES         | null
company        | text      | YES         | null
email          | text      | YES         | null
phone          | text      | YES         | null
content        | text      | YES         | null
status         | text      | YES         | null
created_at     | timestamp | YES         | now()
```

### 정책 확인 결과 예시:
```
policyname                      | roles_array | cmd    | with_check
--------------------------------|-------------|--------|------------
anon_insert_inquiries_policy    | {anon}      | INSERT | true
```

## 문제 해결

### 정책이 보이지 않는 경우:
- 정책 생성 SQL을 다시 실행
- `RAISE NOTICE` 메시지 확인

### 오류가 발생하는 경우:
- 오류 메시지를 복사해서 알려주세요
- 특히 "permission denied" 오류가 나면 프로젝트 관리자 권한 확인



-- Supabase에서 inquiries 테이블 스키마 확인

-- 1. 테이블 구조 확인
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'inquiries'
ORDER BY ordinal_position;

-- 2. RLS 정책 확인
SELECT 
  policyname,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'inquiries'
ORDER BY cmd, policyname;

-- 3. RLS 활성화 여부 확인
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename = 'inquiries';

-- 4. 테스트 INSERT (실제로 작동하는지 확인)
-- 주의: 이 쿼리는 anon 역할로 실행하면 안 됩니다. authenticated 역할로 실행하세요.
-- INSERT INTO public.inquiries (name, company, email, phone, content, status)
-- VALUES ('테스트', '테스트회사', 'test@test.com', '010-1234-5678', '테스트 내용', 'new');



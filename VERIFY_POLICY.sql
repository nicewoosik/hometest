-- 정책 확인 및 문제 진단

-- 1. 현재 모든 정책 확인
SELECT 
  policyname,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'inquiries';

-- 2. RLS 활성화 여부 확인
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename = 'inquiries';

-- 3. anon 역할 확인
SELECT 
  rolname,
  rolsuper
FROM pg_roles
WHERE rolname = 'anon';

-- 4. 정책이 없다면 생성
-- 이 부분은 정책이 없을 때만 실행하세요
-- CREATE POLICY "anon_insert_inquiries_policy"
--   ON public.inquiries
--   FOR INSERT
--   TO anon
--   WITH CHECK (true);



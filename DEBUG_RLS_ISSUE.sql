-- RLS 정책 문제 진단

-- 1. 현재 RLS 정책 상세 확인
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,  -- PERMISSIVE vs RESTRICTIVE
  roles,       -- 적용되는 역할
  cmd,         -- SELECT, INSERT, UPDATE, DELETE, ALL
  qual,        -- USING 절
  with_check   -- WITH CHECK 절
FROM pg_policies
WHERE tablename = 'inquiries'
ORDER BY cmd, policyname;

-- 2. RLS 활성화 여부 확인
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename = 'inquiries';

-- 3. 테이블 소유자 확인
SELECT 
  tablename,
  tableowner
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename = 'inquiries';

-- 4. anon 역할이 실제로 존재하는지 확인
SELECT 
  rolname,
  rolsuper,
  rolcreaterole,
  rolcreatedb
FROM pg_roles
WHERE rolname IN ('anon', 'authenticated', 'service_role');

-- 5. 현재 사용자 역할 확인 (Supabase에서 실행 시)
SELECT current_user, session_user;

-- 6. RLS 정책을 완전히 재생성 (모든 정책 삭제 후 재생성)
-- 주의: 이 SQL은 기존 정책을 모두 삭제합니다
DO $$
BEGIN
  -- 모든 기존 정책 삭제
  DROP POLICY IF EXISTS "Allow anon insert inquiries" ON public.inquiries;
  DROP POLICY IF EXISTS "anon_insert_inquiries" ON public.inquiries;
  DROP POLICY IF EXISTS "Allow authenticated insert inquiries" ON public.inquiries;
  DROP POLICY IF EXISTS "authenticated_insert_inquiries" ON public.inquiries;
  DROP POLICY IF EXISTS "모든 사용자는 inquiries 생성 가능" ON public.inquiries;
  DROP POLICY IF EXISTS "Enable insert for anon users" ON public.inquiries;
  
  -- RLS 활성화
  ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
  
  -- 익명 사용자 INSERT 정책 생성 (명시적으로 public 스키마 지정)
  EXECUTE format('CREATE POLICY %I ON %I.%I FOR INSERT TO %I WITH CHECK (true)',
    'anon_insert_policy',
    'public',
    'inquiries',
    'anon'
  );
  
  RAISE NOTICE 'RLS 정책 재생성 완료';
END $$;

-- 7. 최종 확인
SELECT 
  policyname,
  roles,
  cmd,
  with_check
FROM pg_policies
WHERE tablename = 'inquiries'
ORDER BY cmd, policyname;



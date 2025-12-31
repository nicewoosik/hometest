-- RLS 정책 최종 수정 - 완전히 재생성

-- 1. 모든 기존 정책 완전 삭제
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN (
    SELECT policyname 
    FROM pg_policies 
    WHERE tablename = 'inquiries'
  ) LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.inquiries', r.policyname);
    RAISE NOTICE 'Deleted policy: %', r.policyname;
  END LOOP;
END $$;

-- 2. RLS 활성화 확인
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 3. 익명 사용자 INSERT 정책 생성 (명시적으로 public 스키마 지정)
CREATE POLICY "anon_insert_inquiries_policy"
  ON public.inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 4. 인증된 사용자 INSERT 정책 생성
CREATE POLICY "authenticated_insert_inquiries_policy"
  ON public.inquiries
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 5. 인증된 사용자 SELECT 정책 생성
CREATE POLICY "authenticated_select_inquiries_policy"
  ON public.inquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- 6. 인증된 사용자 UPDATE 정책 생성
CREATE POLICY "authenticated_update_inquiries_policy"
  ON public.inquiries
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 7. 최종 확인
SELECT 
  policyname,
  roles,
  cmd,
  with_check,
  qual
FROM pg_policies
WHERE tablename = 'inquiries'
ORDER BY cmd, policyname;

-- 8. anon 역할 확인
SELECT 
  rolname,
  rolsuper,
  rolcreaterole,
  rolcreatedb
FROM pg_roles
WHERE rolname = 'anon';

-- 9. 테이블 소유자 및 RLS 상태 확인
SELECT 
  tablename,
  tableowner,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename = 'inquiries';


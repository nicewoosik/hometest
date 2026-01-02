-- RLS 정책 완전 초기화 및 재생성

-- 1. 현재 모든 정책 확인
SELECT 
  policyname,
  roles,
  cmd,
  with_check,
  qual
FROM pg_policies
WHERE tablename = 'inquiries';

-- 2. 모든 기존 정책 삭제
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'inquiries') LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.inquiries', r.policyname);
  END LOOP;
END $$;

-- 3. RLS 활성화 확인
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 4. 익명 사용자 INSERT 정책 생성
CREATE POLICY "anon_insert_inquiries"
  ON public.inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 5. 인증된 사용자 INSERT 정책 생성
CREATE POLICY "authenticated_insert_inquiries"
  ON public.inquiries
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 6. 인증된 사용자 SELECT 정책 생성
CREATE POLICY "authenticated_select_inquiries"
  ON public.inquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- 7. 인증된 사용자 UPDATE 정책 생성
CREATE POLICY "authenticated_update_inquiries"
  ON public.inquiries
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 8. 최종 확인
SELECT 
  policyname,
  roles,
  cmd,
  with_check
FROM pg_policies
WHERE tablename = 'inquiries'
ORDER BY cmd, policyname;



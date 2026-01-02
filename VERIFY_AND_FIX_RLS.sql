-- RLS 정책 확인 및 완전 재생성

-- 1. 현재 inquiries 테이블의 모든 정책 확인
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
WHERE tablename = 'inquiries'
ORDER BY cmd, policyname;

-- 2. RLS가 활성화되어 있는지 확인
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE tablename = 'inquiries';

-- 3. 모든 기존 정책 완전 삭제
DROP POLICY IF EXISTS "Allow anon insert inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow authenticated insert inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "모든 사용자는 inquiries 생성 가능" ON public.inquiries;
DROP POLICY IF EXISTS "Enable insert for anon users" ON public.inquiries;
DROP POLICY IF EXISTS "관리자는 모든 inquiries 조회 가능" ON public.inquiries;
DROP POLICY IF EXISTS "관리자는 inquiries 수정 가능" ON public.inquiries;

-- 4. RLS 활성화 확인 (필요시 활성화)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 5. 익명 사용자 INSERT 정책 생성 (명시적으로 public 스키마 지정)
CREATE POLICY "Allow anon insert inquiries"
  ON public.inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 6. 인증된 사용자 INSERT 정책 생성
CREATE POLICY "Allow authenticated insert inquiries"
  ON public.inquiries
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 7. 인증된 사용자 SELECT 정책 생성
CREATE POLICY "Allow authenticated select inquiries"
  ON public.inquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- 8. 인증된 사용자 UPDATE 정책 생성
CREATE POLICY "Allow authenticated update inquiries"
  ON public.inquiries
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 9. 최종 확인
SELECT 
  policyname,
  roles,
  cmd,
  with_check,
  qual
FROM pg_policies
WHERE tablename = 'inquiries'
ORDER BY cmd, policyname;



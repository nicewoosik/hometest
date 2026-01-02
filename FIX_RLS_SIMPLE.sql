-- RLS 정책 재생성 (간단 버전)

-- 1단계: 모든 기존 정책 삭제
DROP POLICY IF EXISTS "anon_insert_inquiries_policy" ON public.inquiries;
DROP POLICY IF EXISTS "Allow anon insert inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "anon_insert_inquiries" ON public.inquiries;

-- 2단계: RLS 활성화
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 3단계: 익명 사용자 INSERT 정책 생성
CREATE POLICY "anon_insert_inquiries_policy"
  ON public.inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 4단계: 확인
SELECT 
  policyname,
  roles,
  cmd,
  with_check
FROM pg_policies
WHERE tablename = 'inquiries' AND cmd = 'INSERT';



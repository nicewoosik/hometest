-- RLS 일시 비활성화 (테스트용)
-- ⚠️ 주의: 보안상 프로덕션 환경에서는 사용하지 마세요!

ALTER TABLE public.inquiries DISABLE ROW LEVEL SECURITY;

-- 확인
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename = 'inquiries';

-- 결과: rls_enabled가 false여야 합니다.



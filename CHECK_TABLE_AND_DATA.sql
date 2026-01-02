-- 테이블 스키마와 데이터 확인

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

-- 3. RLS 활성화 여부 확인
SELECT 
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename = 'inquiries';

-- 4. 테스트 데이터로 직접 INSERT 시도 (anon 역할로)
-- 주의: 이 쿼리는 Supabase SQL Editor에서 실행하면 service_role로 실행되므로
-- 실제 anon 역할로 테스트하려면 REST API를 사용해야 합니다.

-- 5. 정책을 완전히 재생성 (더 명시적으로)
DO $$
BEGIN
  -- 모든 정책 삭제
  DROP POLICY IF EXISTS "anon_insert_inquiries_policy" ON public.inquiries;
  DROP POLICY IF EXISTS "Allow anon insert inquiries" ON public.inquiries;
  DROP POLICY IF EXISTS "anon_insert_inquiries" ON public.inquiries;
  
  -- RLS 활성화
  ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
  
  -- 익명 사용자 INSERT 정책 생성 (명시적으로 WITH CHECK (true))
  EXECUTE 'CREATE POLICY "anon_insert_inquiries_policy"
    ON public.inquiries
    FOR INSERT
    TO anon
    WITH CHECK (true)';
    
  RAISE NOTICE '정책 생성 완료';
END $$;

-- 6. 최종 확인
SELECT 
  policyname,
  roles::text[] as roles_array,
  cmd,
  with_check,
  qual
FROM pg_policies
WHERE tablename = 'inquiries'
ORDER BY cmd, policyname;



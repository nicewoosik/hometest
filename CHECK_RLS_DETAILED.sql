-- RLS 정책 상세 확인 및 문제 해결

-- 1. inquiries 테이블의 모든 정책 확인
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
  rowsecurity
FROM pg_tables
WHERE tablename = 'inquiries';

-- 3. 모든 INSERT 정책 삭제 후 재생성
DROP POLICY IF EXISTS "Allow anon insert inquiries" ON inquiries;
DROP POLICY IF EXISTS "Allow authenticated insert inquiries" ON inquiries;
DROP POLICY IF EXISTS "모든 사용자는 inquiries 생성 가능" ON inquiries;
DROP POLICY IF EXISTS "Enable insert for anon users" ON inquiries;

-- 4. 익명 사용자 INSERT 정책 재생성 (INSERT는 WITH CHECK만 사용)
CREATE POLICY "Allow anon insert inquiries"
  ON inquiries FOR INSERT
  TO anon
  WITH CHECK (true);

-- 5. 인증된 사용자 INSERT 정책 재생성
CREATE POLICY "Allow authenticated insert inquiries"
  ON inquiries FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 6. 최종 확인
SELECT 
  policyname,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'inquiries' AND cmd = 'INSERT';


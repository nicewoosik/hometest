-- 최종 RLS 정책 수정 (모든 정책 삭제 후 재생성)

-- 1. inquiries 테이블의 모든 정책 확인
SELECT 
  policyname,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'inquiries'
ORDER BY cmd, policyname;

-- 2. 모든 기존 정책 삭제
DROP POLICY IF EXISTS "Allow anon insert inquiries" ON inquiries;
DROP POLICY IF EXISTS "Allow authenticated insert inquiries" ON inquiries;
DROP POLICY IF EXISTS "모든 사용자는 inquiries 생성 가능" ON inquiries;
DROP POLICY IF EXISTS "Enable insert for anon users" ON inquiries;
DROP POLICY IF EXISTS "관리자는 모든 inquiries 조회 가능" ON inquiries;
DROP POLICY IF EXISTS "관리자는 inquiries 수정 가능" ON inquiries;

-- 3. 익명 사용자 INSERT 정책 생성 (WITH CHECK만 사용)
CREATE POLICY "Allow anon insert inquiries"
  ON inquiries FOR INSERT
  TO anon
  WITH CHECK (true);

-- 4. 인증된 사용자 INSERT 정책 생성
CREATE POLICY "Allow authenticated insert inquiries"
  ON inquiries FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 5. 인증된 사용자 SELECT 정책 생성
CREATE POLICY "Allow authenticated select inquiries"
  ON inquiries FOR SELECT
  TO authenticated
  USING (true);

-- 6. 인증된 사용자 UPDATE 정책 생성
CREATE POLICY "Allow authenticated update inquiries"
  ON inquiries FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 7. 최종 확인
SELECT 
  policyname,
  roles,
  cmd,
  with_check
FROM pg_policies
WHERE tablename = 'inquiries'
ORDER BY cmd, policyname;



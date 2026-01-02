-- 기존 정책 삭제 후 재생성

-- 1. 기존 정책 확인
SELECT 
  policyname,
  roles,
  cmd,
  with_check
FROM pg_policies
WHERE tablename = 'inquiries' AND cmd = 'INSERT';

-- 2. 기존 정책 삭제
DROP POLICY IF EXISTS "Allow anon insert inquiries" ON inquiries;
DROP POLICY IF EXISTS "모든 사용자는 inquiries 생성 가능" ON inquiries;
DROP POLICY IF EXISTS "Allow authenticated insert inquiries" ON inquiries;

-- 3. 익명 사용자 INSERT 권한 부여 (재생성)
CREATE POLICY "Allow anon insert inquiries"
  ON inquiries FOR INSERT
  TO anon
  WITH CHECK (true);

-- 4. 인증된 사용자 INSERT 권한 부여
CREATE POLICY "Allow authenticated insert inquiries"
  ON inquiries FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 5. 최종 확인
SELECT 
  policyname,
  roles,
  cmd,
  with_check
FROM pg_policies
WHERE tablename = 'inquiries' AND cmd = 'INSERT';



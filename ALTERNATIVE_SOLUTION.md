# RLS 정책 문제 해결 대안

## 문제 상황
RLS 정책을 생성했지만 여전히 401 오류가 발생합니다.

## 해결 방법 1: Table Editor에서 직접 정책 생성

1. Supabase 대시보드 접속
2. **Table Editor** 클릭
3. **inquiries** 테이블 선택
4. 상단 **"Policies"** 탭 클릭
5. **"New Policy"** 버튼 클릭
6. 다음 설정:
   - **Policy Name**: `anon_insert_inquiries`
   - **Allowed Operation**: `INSERT`
   - **Target Roles**: `anon`
   - **USING expression**: (비워두기)
   - **WITH CHECK expression**: `true`
7. **"Review"** 클릭 후 **"Save Policy"** 클릭

## 해결 방법 2: RLS 일시 비활성화 (테스트용)

⚠️ **주의**: 보안상 권장하지 않지만, 테스트 목적으로만 사용하세요.

```sql
-- RLS 일시 비활성화 (테스트용)
ALTER TABLE public.inquiries DISABLE ROW LEVEL SECURITY;

-- 테스트 후 다시 활성화
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
```

## 해결 방법 3: 서비스 역할 키 사용 (임시)

⚠️ **주의**: 보안상 권장하지 않지만, 문제 진단용으로만 사용하세요.

1. Supabase 대시보드 → **Settings** → **API**
2. **service_role** 키 복사
3. 코드에서 임시로 사용 (테스트 후 원래대로 복구)

## 해결 방법 4: 정책 완전 재생성

```sql
-- 모든 정책 삭제
DROP POLICY IF EXISTS "anon_insert_inquiries_policy" ON public.inquiries;
DROP POLICY IF EXISTS "anon_insert_inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow anon insert inquiries" ON public.inquiries;

-- RLS 비활성화 후 재활성화
ALTER TABLE public.inquiries DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 정책 재생성
CREATE POLICY "anon_insert_inquiries_policy"
  ON public.inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

## 확인 방법

정책이 제대로 생성되었는지 확인:

```sql
SELECT 
  policyname,
  roles,
  cmd,
  with_check
FROM pg_policies
WHERE tablename = 'inquiries' AND cmd = 'INSERT';
```

결과에서 다음을 확인:
- `policyname`: 정책 이름
- `roles`: `{anon}` 또는 `anon` 포함
- `cmd`: `INSERT`
- `with_check`: `true`



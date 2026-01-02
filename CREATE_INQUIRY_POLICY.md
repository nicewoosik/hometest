# inquiries 테이블 RLS 정책 생성 가이드

## 현재 상황
`admin_users` 테이블의 정책만 보이고 `inquiries` 테이블의 정책이 없습니다.

## 해결 방법

### 방법 1: Table Editor에서 직접 생성 (권장)

1. **Table Editor**에서 **inquiries** 테이블 선택
2. 상단 **Policies** 탭 클릭
3. **Create policy** 버튼 클릭
4. 다음 설정:
   - **Policy name**: `Allow anon insert inquiries`
   - **Allowed operation**: `INSERT` 선택
   - **Target roles**: `anon` 선택 (체크박스)
   - **USING expression**: 비워두기 (INSERT에는 사용 안 함)
   - **WITH CHECK expression**: `true` 입력
5. **Review** → **Save policy** 클릭

### 방법 2: SQL Editor에서 실행

```sql
-- inquiries 테이블의 모든 정책 확인
SELECT 
  policyname,
  roles,
  cmd,
  with_check
FROM pg_policies
WHERE tablename = 'inquiries';

-- 정책이 없으면 생성
CREATE POLICY "Allow anon insert inquiries"
  ON inquiries FOR INSERT
  TO anon
  WITH CHECK (true);
```

## 확인

정책 생성 후:
1. **Policies** 탭에서 `inquiries` 테이블 선택
2. INSERT 정책이 보이는지 확인
3. `anon` 역할이 포함되어 있는지 확인

## 테스트

1. 브라우저 강력 새로고침: `Cmd+Shift+R`
2. 간편문의 폼 제출
3. 성공 메시지 확인



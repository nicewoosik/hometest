# 빠른 해결: Supabase RLS 정책 수정

## 지금 바로 해야 할 일

### 1. Supabase Dashboard 열기
https://supabase.com/dashboard/project/qzymoraaukwicqlhjbsy

### 2. SQL Editor 열기
왼쪽 메뉴에서 **SQL Editor** 클릭

### 3. 이 SQL 복사해서 실행

```sql
-- 익명 사용자 INSERT 권한 부여
CREATE POLICY "Allow anon insert inquiries"
  ON inquiries FOR INSERT
  TO anon
  WITH CHECK (true);
```

**Run** 버튼 클릭!

### 4. 확인
다음 SQL로 확인:

```sql
SELECT policyname, roles, cmd 
FROM pg_policies 
WHERE tablename = 'inquiries' AND cmd = 'INSERT';
```

`anon`이 보이면 성공!

### 5. 브라우저 새로고침
`Cmd+Shift+R` (Mac) 또는 `Ctrl+Shift+R` (Windows)

### 6. 다시 테스트
간편문의 폼 제출

---

## 여전히 안 되면

### Table Editor에서 직접 확인:
1. **Table Editor** → **inquiries** 테이블
2. 오른쪽 사이드바에서 **RLS enabled** 확인
3. **Policies** 탭 클릭
4. INSERT 정책이 있는지 확인
5. 없으면 **New Policy** 클릭:
   - Policy name: `Allow anon insert`
   - Operation: `INSERT`
   - Roles: `anon` 선택
   - WITH CHECK: `true`
   - Save



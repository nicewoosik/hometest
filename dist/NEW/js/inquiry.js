// 간편문의 Supabase 제출 스크립트

// Supabase 설정 (전역 변수 사용 - index.html에서 이미 선언됨)
// SUPABASE_URL과 SUPABASE_ANON_KEY는 index.html에서 전역 변수로 선언되어 있음

// 간편문의 폼 제출 함수
async function submitInquiry(formData) {
  // 전역 변수 확인
  if (typeof SUPABASE_URL === 'undefined' || typeof SUPABASE_ANON_KEY === 'undefined') {
    console.error('Supabase 설정이 로드되지 않았습니다.')
    throw new Error('Supabase 설정 오류')
  }
  
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/inquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        name: formData.wr_name,
        company: formData.wr_subject,
        email: formData.wr_email,
        phone: formData.wr_2 || null,
        content: formData.wr_content,
        status: 'new'
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || '문의 접수 실패')
    }

    return await response.json()
  } catch (error) {
    console.error('문의 접수 오류:', error)
    throw error
  }
}

// 폼 제출 핸들러
function handleInquirySubmit(e) {
  e.preventDefault()
  
  const form = e.target
  const formData = {
    wr_name: form.wr_name.value.trim(),
    wr_subject: form.wr_subject.value.trim(),
    wr_email: form.wr_email.value.trim(),
    wr_2: form.wr_2 ? form.wr_2.value.trim() : '',
    wr_content: form.wr_content.value.trim(),
    agree: form.agree ? form.agree.checked : false
  }

  // 유효성 검사
  if (!formData.wr_name) {
    alert('이름을 입력해주세요.')
    form.wr_name.focus()
    return false
  }

  if (!formData.wr_subject) {
    alert('회사명을 입력해주세요.')
    form.wr_subject.focus()
    return false
  }

  if (!formData.wr_email) {
    alert('이메일을 입력해주세요.')
    form.wr_email.focus()
    return false
  }

  // 이메일 형식 검사
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.wr_email)) {
    alert('올바른 이메일 형식을 입력해주세요.')
    form.wr_email.focus()
    return false
  }

  if (!formData.wr_content) {
    alert('문의내용을 입력해주세요.')
    form.wr_content.focus()
    return false
  }

  if (!formData.agree) {
    alert('개인정보 취급방침에 동의해주세요.')
    if (form.agree) form.agree.focus()
    return false
  }

  // 제출 버튼 비활성화
  const submitBtn = form.querySelector('#btn_submit')
  const originalValue = submitBtn.value
  submitBtn.disabled = true
  submitBtn.value = '제출 중...'

  // Supabase에 제출
  submitInquiry(formData)
    .then(() => {
      alert('문의가 접수되었습니다.\n빠른 시일 내에 답변드리겠습니다.')
      form.reset()
      
      // 폼 닫기
      if (typeof $ !== 'undefined') {
        $('.quick_contact .cnt').slideUp()
      }
    })
    .catch((error) => {
      alert('문의 접수 중 오류가 발생했습니다.\n다시 시도해주세요.')
      console.error('문의 접수 오류:', error)
    })
    .finally(() => {
      submitBtn.disabled = false
      submitBtn.value = originalValue
    })

  return false
}

// 페이지 로드 시 폼에 이벤트 리스너 추가
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    const inquiryForm = document.querySelector('form[name="frm"]')
    if (inquiryForm) {
      // 기존 onsubmit 제거하고 새 핸들러 추가
      inquiryForm.onsubmit = null
      inquiryForm.addEventListener('submit', handleInquirySubmit)
    }
  })
}


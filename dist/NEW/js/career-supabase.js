// 채용공고 목록을 Supabase에서 가져와서 동적으로 렌더링
(function() {
  // Supabase 설정
  const SUPABASE_URL = 'https://qzymoraaukwicqlhjbsy.supabase.co'
  const SUPABASE_ANON_KEY = 'sb_publishable_9h5TGNNrnzpjvWCu_CYxVg_VuOC7XFr'
  
  // Supabase 클라이언트 초기화
  const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  
  // 채용공고 목록을 가져오는 함수
  async function loadJobPostings() {
    try {
      const { data, error } = await supabaseClient
        .from('job_postings')
        .select('*')
        .eq('status', 'open') // 접수중인 공고만 표시
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('채용공고 로드 오류:', error)
        return
      }
      
      if (data && data.length > 0) {
        renderJobPostings(data)
      } else {
        // 데이터가 없을 경우 기존 정적 HTML 유지 또는 메시지 표시
        console.log('등록된 채용공고가 없습니다.')
      }
    } catch (error) {
      console.error('채용공고 로드 중 오류:', error)
    }
  }
  
  // 채용공고 목록을 렌더링하는 함수
  function renderJobPostings(postings) {
    const table = document.querySelector('.care_List_Table')
    if (!table) return
    
    // 기존 데이터 행 제거 (헤더 제외)
    const existingRows = table.querySelectorAll('tr.carL_active')
    existingRows.forEach(row => row.remove())
    
    // 새 데이터 행 추가
    postings.forEach(posting => {
      const row = document.createElement('tr')
      row.className = 'carL_active'
      
      // 상태 이미지
      const statusImg = posting.status === 'open' 
        ? '/NEW/images/kor/j_t_jupsu.png' 
        : '/NEW/images/kor/j_t_magam.png'
      const statusAlt = posting.status === 'open' ? '접수중' : '마감'
      
      // 접수기한 포맷팅
      let deadlineText = '채용시 마감'
      if (posting.deadline) {
        const deadline = new Date(posting.deadline)
        deadlineText = deadline.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }
      
      // 지원대상
      const targetAudience = posting.target_audience || '상시채용'
      
      row.innerHTML = `
        <td class="carJUPIMG">
          <img src="${statusImg}" alt="${statusAlt}">
        </td>
        <td class="TeT TC_title">
          <a href="/NEW/board/bbs/board.php?bo_table=career&wr_id=${posting.id}">${escapeHtml(posting.title)}</a>
        </td>
        <td class="TeT">${escapeHtml(targetAudience)}</td>
        <td class="TeT">${deadlineText}</td>
        <td class="TeT">
          <a href="/NEW/board/bbs/board.php?bo_table=career&wr_id=${posting.id}">
            <img src="/NEW/images/kor/j_t_view.png" alt="보기">
          </a>
        </td>
      `
      
      table.appendChild(row)
    })
  }
  
  // HTML 이스케이프 함수
  function escapeHtml(text) {
    if (!text) return ''
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }
  
  // 페이지 로드 시 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadJobPostings)
  } else {
    loadJobPostings()
  }
})()


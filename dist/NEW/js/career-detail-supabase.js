// 채용공고 상세 페이지를 Supabase에서 가져와서 동적으로 렌더링
(function() {
  // URL에서 wr_id 파라미터 추출
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
    const results = regex.exec(location.search)
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
  }
  
  const postingId = getUrlParameter('wr_id')
  if (!postingId) return // wr_id가 없으면 실행하지 않음
  
  // Supabase 설정
  const SUPABASE_URL = 'https://qzymoraaukwicqlhjbsy.supabase.co'
  const SUPABASE_ANON_KEY = 'sb_publishable_9h5TGNNrnzpjvWCu_CYxVg_VuOC7XFr'
  
  // Supabase 클라이언트 초기화
  const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  
  // 채용공고 상세 정보를 가져오는 함수
  async function loadJobPostingDetail() {
    try {
      const { data, error } = await supabaseClient
        .from('job_postings')
        .select('*')
        .eq('id', postingId)
        .single()
      
      if (error) {
        console.error('채용공고 상세 로드 오류:', error)
        return
      }
      
      if (data) {
        renderJobPostingDetail(data)
      }
    } catch (error) {
      console.error('채용공고 상세 로드 중 오류:', error)
    }
  }
  
  // 채용공고 상세 정보를 렌더링하는 함수
  function renderJobPostingDetail(posting) {
    // 제목 업데이트
    const titleElement = document.querySelector('.careerDetail_title, .serv_title, h1, h2')
    if (titleElement) {
      titleElement.textContent = posting.title || titleElement.textContent
    }
    
    // 상세 내용 렌더링 (기존 내용을 찾아서 교체)
    const contentContainer = document.querySelector('.careerDetail_content, .subpage_cont, .service_box')
    if (contentContainer) {
      // 기존 정적 내용을 Supabase 데이터로 교체
      let html = `
        <div class="career-detail-content" style="padding: 20px;">
          <h2>${escapeHtml(posting.title)}</h2>
          
          ${posting.description ? `<div class="description">${posting.description}</div>` : ''}
          
          ${posting.department ? `
            <div class="detail-section">
              <h3>모집부문</h3>
              <p>${escapeHtml(posting.department)}</p>
            </div>
          ` : ''}
          
          ${posting.target_audience ? `
            <div class="detail-section">
              <h3>지원대상</h3>
              <p>${escapeHtml(posting.target_audience)}</p>
            </div>
          ` : ''}
          
          ${posting.location ? `
            <div class="detail-section">
              <h3>근무지역</h3>
              <p>${escapeHtml(posting.location)}</p>
            </div>
          ` : ''}
          
          ${posting.main_duties ? `
            <div class="detail-section">
              <h3>주요업무</h3>
              <div>${posting.main_duties}</div>
            </div>
          ` : ''}
          
          ${posting.required_qualifications ? `
            <div class="detail-section">
              <h3>필수요건</h3>
              <div>${posting.required_qualifications}</div>
            </div>
          ` : ''}
          
          ${posting.preferred_qualifications ? `
            <div class="detail-section">
              <h3>우대사항</h3>
              <div>${posting.preferred_qualifications}</div>
            </div>
          ` : ''}
          
          ${posting.recruitment_process ? `
            <div class="detail-section">
              <h3>전형일정</h3>
              <div>${posting.recruitment_process}</div>
            </div>
          ` : ''}
          
          ${posting.contact_email || posting.contact_phone ? `
            <div class="detail-section">
              <h3>지원문의</h3>
              ${posting.contact_email ? `<p>이메일: ${escapeHtml(posting.contact_email)}</p>` : ''}
              ${posting.contact_phone ? `<p>전화: ${escapeHtml(posting.contact_phone)}</p>` : ''}
            </div>
          ` : ''}
          
          ${posting.attachment_url ? `
            <div class="detail-section">
              <a href="${escapeHtml(posting.attachment_url)}" target="_blank" class="download-btn">
                지원서 다운로드
              </a>
            </div>
          ` : ''}
        </div>
      `
      
      // 기존 내용을 찾아서 교체하거나 추가
      const existingContent = contentContainer.querySelector('.career-detail-content')
      if (existingContent) {
        existingContent.outerHTML = html
      } else {
        // 기존 정적 내용 뒤에 추가
        const staticContent = contentContainer.querySelector('table, .careerList, .careerDetail')
        if (staticContent) {
          staticContent.insertAdjacentHTML('afterend', html)
          // 정적 내용 숨기기 (선택사항)
          staticContent.style.display = 'none'
        } else {
          contentContainer.insertAdjacentHTML('beforeend', html)
        }
      }
    }
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
    document.addEventListener('DOMContentLoaded', loadJobPostingDetail)
  } else {
    loadJobPostingDetail()
  }
})()


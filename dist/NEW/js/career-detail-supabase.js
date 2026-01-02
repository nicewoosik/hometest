// 채용공고 상세 페이지를 Supabase에서 가져와서 동적으로 렌더링
(function() {
  // URL 파라미터 추출 함수
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
    const results = regex.exec(location.search)
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
  }
  
  // URL 파라미터 확인
  const postingId = getUrlParameter('wr_id')
  const boTable = getUrlParameter('bo_table')
  
  // 채용공고 상세 페이지가 아니면 실행하지 않음
  if (!postingId || boTable !== 'career') {
    console.log('채용공고 상세 페이지가 아닙니다.')
    return
  }
  
  console.log('채용공고 ID:', postingId)
  
  // HTML 이스케이프 함수
  function escapeHtml(text) {
    if (!text) return ''
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }
  
  // 채용공고 상세 정보를 렌더링하는 함수
  function renderJobPostingDetail(posting) {
    console.log('채용공고 상세 데이터 렌더링:', posting)
    
    // 페이지 제목 업데이트
    document.title = `${posting.title} - ECS텔레콤`
    
    // 상단 배너 제목 변경
    const subpageTitle = document.getElementById('subpage_title') || document.querySelector('.subpage_img p')
    if (subpageTitle) subpageTitle.textContent = 'Job Openings'
    
    // 배너 이미지 변경
    const subpageBanner = document.getElementById('subpage_banner') || document.querySelector('.subpage_img img')
    if (subpageBanner) subpageBanner.src = '/NEW/images/kor/top_e_04_new.jpg'
    
    // breadcrumb 변경
    const breadcrumbPath = document.getElementById('breadcrumb_path') || document.querySelector('.locs')
    if (breadcrumbPath) {
      if (breadcrumbPath.querySelector('span')) {
        breadcrumbPath.querySelector('span').innerHTML = 'Recruitment <img src="/NEW/images/kor/icon_next.png"> Job Openings'
      } else {
        breadcrumbPath.innerHTML = '<a href="#"><img src="/NEW/images/kor/icon_house.png"></a> Recruitment <img src="/NEW/images/kor/icon_next.png"> Job Openings'
      }
    }
    
    // ECS News 내용 숨기기
    const newsContent = document.querySelector('.ourComBox, .peopleUL2')
    if (newsContent) {
      newsContent.style.display = 'none'
    }
    
    // 서비스 박스 내용 교체
    const serviceBox = document.getElementById('service_box') || document.querySelector('.service_box')
    if (!serviceBox) {
      console.error('서비스 박스를 찾을 수 없습니다.')
      return
    }
    
    // 상세 내용 HTML 생성 (기존 HTML 구조와 동일하게)
    let detailHtml = ''
    
    // 상세 설명
    if (posting.description) {
      detailHtml += `<div class="carInTXT">${posting.description}</div>`
    }
    
    // 주요업무 (수행직무)
    if (posting.main_duties || posting.work_experience) {
      detailHtml += `<div class="carInTXT_title"><img src="/NEW/images/kor/Y_1.png" alt="수행직무"></div>`
      if (posting.main_duties) {
        detailHtml += `<div class="carInTXT">${posting.main_duties}</div>`
      }
    }
    
    // 필수요건 및 우대사항 (Job Description)
    if (posting.required_qualifications || posting.preferred_qualifications) {
      let jobDescHtml = ''
      if (posting.required_qualifications) {
        jobDescHtml += posting.required_qualifications
      }
      if (posting.preferred_qualifications) {
        if (jobDescHtml) jobDescHtml += '<br /><br />'
        jobDescHtml += posting.preferred_qualifications
      }
      if (jobDescHtml) {
        detailHtml += `<div class="carInTXT">${jobDescHtml}</div>`
      }
    }
    
    // 지원서 다운로드
    if (posting.attachment_url) {
      detailHtml += `
        <div class="carInTXT_title"><img src="/NEW/images/kor/Y_4.png" alt="지원서다운"></div>
        <p class="carInTXT">
          <a href="${escapeHtml(posting.attachment_url)}" target="_blank" title="지원서">
            <img src="/NEW/images/kor/Y_down_btn.png" alt="지원서다운">
          </a>
        </p>
      `
    }
    
    // 전형일정
    if (posting.recruitment_process) {
      detailHtml += `
        <div class="carInTXT_title"><img src="/NEW/images/kor/Y_5.png" alt="전형일정"></div>
        <p class="carInTXT">${posting.recruitment_process}</p>
      `
    }
    
    // 지원문의
    if (posting.contact_email || posting.contact_phone) {
      let contactHtml = ''
      if (posting.contact_email) {
        contactHtml += escapeHtml(posting.contact_email)
      }
      if (posting.contact_phone) {
        if (contactHtml) contactHtml += '<br />'
        contactHtml += escapeHtml(posting.contact_phone)
      }
      detailHtml += `
        <div class="carInTXT_title"><img src="/NEW/images/kor/Y_6.png" alt="지원문의"></div>
        <p class="carInTXT">${contactHtml}</p>
      `
    }
    
    // 하단 구분선 및 버튼
    detailHtml += `
      <div class="carBotBars"></div>
      <div class="caree_btns">
        <a href="/NEW/board/bbs/write.php?bo_table=apply&career=${posting.id}">
          <img src="/NEW/images/kor/btn_jiwon.png" alt="지원하기">
        </a>
        &nbsp;<a href="/NEW/board/bbs/board.php?bo_table=apply&career=${posting.id}">
          <img src="/NEW/images/kor/btn_jiwonhyun.png" alt="지원현황">
        </a>&nbsp;
        <a href="/NEW/board/bbs/board.php?bo_table=career">
          <img src="/NEW/images/kor/btn_list.png" alt="목록">
        </a>
      </div>
    `
    
    // 서비스 박스 전체 내용 교체 (기존 HTML 구조와 동일하게)
    serviceBox.innerHTML = `
      <p class="serv_title">
        <img src="/NEW/images/kor/serv_title14.png" alt="채용공고">
        <i>채용 프로세스</i>
      </p>
      <p class="serv_title_bar"><img src="/NEW/images/kor/serv_bar.png" alt=""></p>
      <div class="servUni_con1">
        Join the Winning Team<br class="nonBr850">
        Discover our Potential! Discover your Potential!
      </div>
      <div class="careerView">
        <div class="careV_Box">
          <table class="carV_Table">
            <tr>
              <td class="carV_title">제목</td>
              <td class="carV_title_C">${escapeHtml(posting.title)}</td>
              <td class="carV_date">접수기한</td>
              <td class="carV_date_C">${posting.deadline ? new Date(posting.deadline).toLocaleDateString('ko-KR') : '채용시 마감'}</td>
              <td class="carV_hit">조회</td>
              <td class="carV_hit_C">${posting.view_count || 0}</td>
            </tr>
          </table>
          <div class="career_content">
            <table class="carInside_Table">
              <tr>
                <th class="carInside_Ta_1">모집부문</th>
                <th class="carInside_Ta_2">지원대상</th>
                <th class="carInside_Ta_3">직무</th>
                <th class="carInside_Ta_4">지역</th>
                <th class="carInside_Ta_5">직급</th>
                <th class="carInside_Ta_6">모집인원</th>
              </tr>
              <tr>
                <td>${escapeHtml(posting.department || '')}</td>
                <td>${escapeHtml(posting.target_audience || '')}</td>
                <td>${escapeHtml(posting.job_type || '')}</td>
                <td>${escapeHtml(posting.location || '')}</td>
                <td>${escapeHtml(posting.position_level || '')}</td>
                <td>${posting.recruitment_count ? `${posting.recruitment_count}명` : ''}</td>
              </tr>
            </table>
            ${detailHtml}
          </div>
        </div>
      </div>
    `
  }
  
  // Fetch API를 사용하여 직접 데이터 로드 (Supabase 클라이언트가 없을 때)
  async function loadWithFetch() {
    try {
      console.log('Fetch API로 채용공고 상세 정보 로드 시작:', postingId)
      const response = await fetch(
        `https://qzymoraaukwicqlhjbsy.supabase.co/rest/v1/job_postings?id=eq.${postingId}&select=*`,
        {
          headers: {
            'apikey': 'sb_publishable_9h5TGNNrnzpjvWCu_CYxVg_VuOC7XFr',
            'Authorization': 'Bearer sb_publishable_9h5TGNNrnzpjvWCu_CYxVg_VuOC7XFr'
          }
        }
      )
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Fetch로 받은 데이터:', data)
      
      if (data && data.length > 0) {
        renderJobPostingDetail(data[0])
      } else {
        console.error('채용공고 데이터를 찾을 수 없습니다.')
      }
    } catch (error) {
      console.error('Fetch로 데이터 로드 실패:', error)
    }
  }
  
  // Supabase 클라이언트가 로드될 때까지 대기 (최대 5초)
  function waitForSupabase(callback, maxAttempts = 50) {
    if (typeof supabase !== 'undefined') {
      callback()
    } else if (maxAttempts > 0) {
      setTimeout(() => waitForSupabase(callback, maxAttempts - 1), 100)
    } else {
      console.warn('Supabase 클라이언트를 로드할 수 없습니다. Fetch API를 사용합니다.')
      loadWithFetch()
    }
  }
  
  // 데이터 로드 함수
  function loadJobPostingDetail() {
    const SUPABASE_URL = 'https://qzymoraaukwicqlhjbsy.supabase.co'
    const SUPABASE_ANON_KEY = 'sb_publishable_9h5TGNNrnzpjvWCu_CYxVg_VuOC7XFr'
    
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    
    supabaseClient
      .from('job_postings')
      .select('*')
      .eq('id', postingId)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error('채용공고 상세 로드 오류:', error)
          // 에러 발생 시 Fetch API로 재시도
          loadWithFetch()
          return
        }
        
        if (data) {
          console.log('채용공고 상세 데이터:', data)
          renderJobPostingDetail(data)
        } else {
          console.error('채용공고 데이터를 찾을 수 없습니다.')
        }
      })
      .catch((error) => {
        console.error('채용공고 상세 로드 중 오류:', error)
        // 에러 발생 시 Fetch API로 재시도
        loadWithFetch()
      })
  }
  
  // 페이지 로드 시 실행
  function init() {
    waitForSupabase(function() {
      loadJobPostingDetail()
    })
  }
  
  // DOM이 준비되면 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()

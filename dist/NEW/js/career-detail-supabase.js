// 채용공고 상세 페이지를 Supabase에서 가져와서 동적으로 렌더링
(function() {
  // Supabase 클라이언트가 로드될 때까지 대기
  function waitForSupabase(callback) {
    if (typeof supabase !== 'undefined') {
      callback()
    } else {
      setTimeout(() => waitForSupabase(callback), 100)
    }
  }
  
  waitForSupabase(function() {
    // URL에서 wr_id 파라미터 추출
    function getUrlParameter(name) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
      const regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
      const results = regex.exec(location.search)
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
    }
    
    const postingId = getUrlParameter('wr_id')
    const boTable = getUrlParameter('bo_table')
    
    // 채용공고 상세 페이지가 아니면 실행하지 않음
    if (!postingId || boTable !== 'career') {
      console.log('채용공고 상세 페이지가 아닙니다.')
      return
    }
    
    console.log('채용공고 ID:', postingId)
    
    // Supabase 설정
    const SUPABASE_URL = 'https://qzymoraaukwicqlhjbsy.supabase.co'
    const SUPABASE_ANON_KEY = 'sb_publishable_9h5TGNNrnzpjvWCu_CYxVg_VuOC7XFr'
    
    // Supabase 클라이언트 초기화
    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    
    // 채용공고 상세 정보를 가져오는 함수
    async function loadJobPostingDetail() {
      try {
        console.log('채용공고 상세 정보 로드 시작:', postingId)
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
          console.log('채용공고 상세 데이터:', data)
          renderJobPostingDetail(data)
        } else {
          console.log('채용공고 데이터를 찾을 수 없습니다.')
        }
      } catch (error) {
        console.error('채용공고 상세 로드 중 오류:', error)
      }
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
      if (serviceBox) {
        // 상세 내용 HTML 생성
        let detailHtml = ''
        
        if (posting.description) {
          detailHtml += `<div class="detail-section" style="margin: 20px 0;">${posting.description}</div>`
        }
        
        if (posting.main_duties) {
          detailHtml += `
            <div class="detail-section" style="margin: 20px 0;">
              <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">주요업무</h3>
              <div>${posting.main_duties}</div>
            </div>
          `
        }
        
        if (posting.required_qualifications) {
          detailHtml += `
            <div class="detail-section" style="margin: 20px 0;">
              <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">필수요건</h3>
              <div>${posting.required_qualifications}</div>
            </div>
          `
        }
        
        if (posting.preferred_qualifications) {
          detailHtml += `
            <div class="detail-section" style="margin: 20px 0;">
              <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">우대사항</h3>
              <div>${posting.preferred_qualifications}</div>
            </div>
          `
        }
        
        if (posting.recruitment_process) {
          detailHtml += `
            <div class="detail-section" style="margin: 20px 0;">
              <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">전형일정</h3>
              <div>${posting.recruitment_process}</div>
            </div>
          `
        }
        
        if (posting.contact_email || posting.contact_phone) {
          detailHtml += `
            <div class="detail-section" style="margin: 20px 0;">
              <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">지원문의</h3>
              ${posting.contact_email ? `<p>이메일: ${escapeHtml(posting.contact_email)}</p>` : ''}
              ${posting.contact_phone ? `<p>전화: ${escapeHtml(posting.contact_phone)}</p>` : ''}
            </div>
          `
        }
        
        if (posting.attachment_url) {
          detailHtml += `
            <div class="detail-section" style="margin: 20px 0;">
              <a href="${escapeHtml(posting.attachment_url)}" target="_blank" style="display: inline-block; padding: 10px 20px; background: #102381; color: white; text-decoration: none; border-radius: 5px;">
                지원서 다운로드
              </a>
            </div>
          `
        }
        
        // 서비스 박스 전체 내용 교체
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
              <table class="carV_Table" style="width: 100%; margin-bottom: 20px;">
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
                <table class="carInside_Table" style="width: 100%; margin-bottom: 20px;">
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
                <div class="supabase-dynamic-content">
                  ${detailHtml}
                </div>
              </div>
            </div>
          </div>
        `
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
  })
})()

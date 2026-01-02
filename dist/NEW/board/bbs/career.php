<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>채용공고 | ECS텔레콤</title>

<link rel="stylesheet" type="text/css" href="/NEW/css/reset.css">
<link rel="stylesheet" type="text/css" href="/NEW/css/ecs.css">
<link rel="stylesheet" type="text/css" href="/NEW/css/ecs_mobile.css">
<link rel="stylesheet" type="text/css" href="/NEW/css/font.css">
<link rel="stylesheet" type="text/css" href="/NEW/css/jquery.bxslider.css">
<script type="text/javascript" src="/NEW/js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="https://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
<script type="text/javascript" src="/NEW/js/jquery.bxslider.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

<!-- Supabase 클라이언트 라이브러리 -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<style>
.career-loading {
    text-align: center;
    padding: 40px;
    color: #666;
}
.career-error {
    text-align: center;
    padding: 40px;
    color: #d32f2f;
    background: #ffebee;
    border-radius: 4px;
    margin: 20px 0;
}
.application-form {
    margin-top: 30px;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 8px;
}
.application-form h3 {
    margin-bottom: 20px;
    color: #333;
}
.application-form .form-group {
    margin-bottom: 15px;
}
.application-form label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
}
.application-form input,
.application-form textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
}
.application-form textarea {
    min-height: 100px;
    resize: vertical;
}
.application-form button {
    background: #1976d2;
    color: white;
    padding: 12px 30px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
}
.application-form button:hover {
    background: #1565c0;
}
.application-form button:disabled {
    background: #ccc;
    cursor: not-allowed;
}
.success-message {
    background: #4caf50;
    color: white;
    padding: 15px;
    border-radius: 4px;
    margin-top: 15px;
    display: none;
}
</style>

</head>
<body topmargin="0" leftmargin="0">

<!-- 헤더/네비게이션은 기존 board.php와 동일한 구조 사용 -->
<!-- 간단한 버전으로 구현 -->
<div class="wrap Mwrap">
  <div class="bodys">
    <div class="subpage_img">
        <p>Job Openings</p>
        <div><img src="/NEW/images/kor/top_e_04_new.jpg" alt=""></div>
    </div>
    
<div class="subpage_cont">
    <div class="locs">
        <a href="/NEW/html/index.html"><img src="/NEW/images/kor/icon_house.png"></a>
        <span>Recruitment <img src="/NEW/images/kor/icon_next.png"> Job Openings</span>
    </div>
    
    <!-- 채용공고 목록 영역 -->
    <div id="career_list_container">
        <div class="service_box">
            <p class="serv_title">
                <img src="/NEW/images/kor/serv_title14.png" alt="채용공고">
                <i>채용 프로세스</i>
            </p>
            <p class="serv_title_bar"><img src="/NEW/images/kor/serv_bar.png" alt=""></p>
            <div class="servUni_con1">
                Join the Winning Team<br class="nonBr850">
                Discover our Potential! Discover your Potential!
            </div>
        </div>
        <div class="careerList">
            <table class="care_List_Table">
                <tr>
                    <th class="carT_T1"><img src="/NEW/images/kor/j_t_1.png" alt="지원여부"></th>
                    <th class="carT_T2"><img src="/NEW/images/kor/j_t_2.png" alt="공고"></th>
                    <th class="carT_T3"><img src="/NEW/images/kor/j_t_3.png" alt="지원대상"></th>
                    <th class="carT_T4"><img src="/NEW/images/kor/j_t_4.png" alt="접수기한"></th>
                    <th class="carT_T5"><img src="/NEW/images/kor/j_t_5.png" alt="내용"></th>
                </tr>
                <tbody id="career_list_tbody">
                    <tr>
                        <td colspan="5" class="career-loading">
                            채용공고를 불러오는 중...
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    
    <!-- 채용공고 상세 영역 -->
    <div id="career_detail_container" style="display: none;">
        <div class="service_box" id="career_detail_box">
            <!-- 상세 내용이 여기에 동적으로 로드됩니다 -->
        </div>
    </div>
</div>

<script type="text/javascript">
(function() {
    'use strict';
    
    // Supabase 설정
    const SUPABASE_URL = 'https://qzymoraaukwicqlhjbsy.supabase.co';
    const SUPABASE_ANON_KEY = 'sb_publishable_9h5TGNNrnzpjvWCu_CYxVg_VuOC7XFr';
    
    // Supabase 클라이언트 생성
    function getSupabaseClient() {
        return supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    
    // HTML 이스케이프 함수
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // URL 파라미터 확인
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    
    const wrId = getUrlParameter('id');
    
    // 채용공고 목록 로드
    async function loadJobPostings() {
        console.log('채용공고 목록 로드 시작');
        const tbody = document.getElementById('career_list_tbody');
        
        try {
            tbody.innerHTML = '<tr><td colspan="5" class="career-loading">채용공고를 불러오는 중...</td></tr>';
            
            const supabaseClient = getSupabaseClient();
            console.log('Supabase 클라이언트 초기화 완료');
            
            // 실제 테이블의 모든 필드를 명시적으로 조회
            const { data, error, count } = await supabaseClient
                .from('job_postings')
                .select('*', { count: 'exact' })
                .order('updated_at', { ascending: false })
                .order('created_at', { ascending: false });
            
            console.log('조회된 채용공고 개수:', data ? data.length : 0);
            console.log('Supabase count:', count);
            if (data && data.length > 0) {
                console.log('첫 번째 채용공고의 모든 필드:', Object.keys(data[0]));
                console.log('모든 채용공고 ID 목록:', data.map(p => ({ id: p.id, title: p.title, status: p.status })));
                console.log('첫 번째 채용공고 전체 데이터:', JSON.stringify(data[0], null, 2));
            }
            
            if (error) {
                console.error('채용공고 로드 오류:', error);
                tbody.innerHTML = '<tr><td colspan="5" class="career-error">채용공고를 불러오는 중 오류가 발생했습니다: ' + escapeHtml(error.message) + '</td></tr>';
                return;
            }
            
            if (!data || data.length === 0) {
                console.warn('등록된 채용공고가 없습니다.');
                tbody.innerHTML = '<tr><td colspan="5" class="career-loading">등록된 채용공고가 없습니다.</td></tr>';
                return;
            }
            
            console.log('총 ' + data.length + '개의 채용공고를 찾았습니다');
            
            tbody.innerHTML = '';
            let renderedCount = 0;
            
            data.forEach((posting, index) => {
                console.log(`채용공고 ${index + 1}/${data.length}:`, {
                    id: posting.id,
                    title: posting.title,
                    status: posting.status
                });
                
                const row = document.createElement('tr');
                row.className = 'carL_active';
                
                // 상태 이미지
                const statusImg = posting.status === 'open' 
                    ? '/NEW/images/kor/j_t_jupsu.png' 
                    : '/NEW/images/kor/j_t_magam.png';
                const statusAlt = posting.status === 'open' ? '접수중' : '마감';
                
                // 접수기한 포맷팅
                let deadlineText = '채용시 마감';
                if (posting.deadline) {
                    const deadline = new Date(posting.deadline);
                    deadlineText = deadline.toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                }
                
                // 지원대상
                const targetAudience = posting.target_audience || '상시채용';
                
                row.innerHTML = `
                    <td class="carJUPIMG">
                        <img src="${statusImg}" alt="${statusAlt}">
                    </td>
                    <td class="TeT TC_title">
                        <a href="#" onclick="showCareerDetail('${posting.id}'); return false;">${escapeHtml(posting.title)}</a>
                    </td>
                    <td class="TeT">${escapeHtml(targetAudience)}</td>
                    <td class="TeT">${deadlineText}</td>
                    <td class="TeT">
                        <a href="#" onclick="showCareerDetail('${posting.id}'); return false;">
                            <img src="/NEW/images/kor/j_t_view.png" alt="보기">
                        </a>
                    </td>
                `;
                
                tbody.appendChild(row);
                renderedCount++;
            });
            
            console.log('채용공고 목록 렌더링 완료, 총 ' + data.length + '개 조회, ' + renderedCount + '개 표시됨');
            
        } catch (error) {
            console.error('채용공고 로드 중 오류:', error);
            tbody.innerHTML = '<tr><td colspan="5" class="career-error">채용공고를 불러오는 중 오류가 발생했습니다: ' + escapeHtml(error.message) + '</td></tr>';
        }
    }
    
    // 채용공고 상세 정보 로드
    async function loadJobPostingDetail(jobId) {
        console.log('채용공고 상세 정보 로드 시작, id:', jobId);
        const detailBox = document.getElementById('career_detail_box');
        
        try {
            detailBox.innerHTML = '<div class="career-loading">채용공고 상세 정보를 불러오는 중...</div>';
            
            const supabaseClient = getSupabaseClient();
            
            const { data, error } = await supabaseClient
                .from('job_postings')
                .select('*', { count: null })
                .eq('id', jobId)
                .single();
            
            if (data) {
                console.log('상세 조회된 채용공고의 모든 필드:', Object.keys(data));
                console.log('상세 조회된 채용공고 전체 데이터:', JSON.stringify(data, null, 2));
            }
            
            if (error) {
                console.error('채용공고 상세 로드 오류:', error);
                detailBox.innerHTML = '<div class="career-error">채용공고를 불러오는 중 오류가 발생했습니다: ' + escapeHtml(error.message) + '</div>';
                return;
            }
            
            if (!data) {
                console.warn('채용공고를 찾을 수 없습니다.');
                detailBox.innerHTML = '<div class="career-loading">채용공고를 찾을 수 없습니다.</div>';
                return;
            }
            
            console.log('채용공고 상세 데이터:', data);
            renderJobPostingDetail(data);
            
        } catch (error) {
            console.error('채용공고 상세 로드 중 오류:', error);
            detailBox.innerHTML = '<div class="career-error">채용공고를 불러오는 중 오류가 발생했습니다: ' + escapeHtml(error.message) + '</div>';
        }
    }
    
    // 채용공고 상세 정보 렌더링
    function renderJobPostingDetail(posting) {
        console.log('채용공고 상세 정보 렌더링 시작:', posting);
        console.log('렌더링할 모든 필드:', posting);
        
        // 접수기한 포맷팅
        let deadlineText = '채용시 마감';
        if (posting.deadline) {
            const deadline = new Date(posting.deadline);
            deadlineText = deadline.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }

        // 상세 내용 HTML 생성
        let detailHtml = '';

        // 상세 설명
        if (posting.description) {
            detailHtml += `<p class="carInTXT">${posting.description}</p>`;
        }

        // 주요업무
        if (posting.main_duties || posting.work_experience) {
            detailHtml += `<div class="carInTXT_title"><img src="/NEW/images/kor/Y_1.png" alt="수행직무"></div>`;
            if (posting.main_duties) {
                detailHtml += `<div class="carInTXT">${posting.main_duties}</div>`;
            }
        }

        // 필수요건 및 우대사항
        if (posting.required_qualifications || posting.preferred_qualifications) {
            let jobDescHtml = '';
            if (posting.required_qualifications) {
                jobDescHtml += posting.required_qualifications;
            }
            if (posting.preferred_qualifications) {
                if (jobDescHtml) jobDescHtml += '<br /><br />';
                jobDescHtml += posting.preferred_qualifications;
            }
            if (jobDescHtml) {
                detailHtml += `<div class="carInTXT">${jobDescHtml}</div>`;
            }
        }

        // 지원서 다운로드
        if (posting.attachment_url) {
            detailHtml += `
                <div class="carInTXT_title"><img src="/NEW/images/kor/Y_4.png" alt="지원서다운"></div>
                <p class="carInTXT">
                    <a href="${escapeHtml(posting.attachment_url)}" target="_blank" title='지원서'><img src="/NEW/images/kor/Y_down_btn.png" alt="지원서다운"></a>
                </p>
            `;
        }

        // 전형일정
        if (posting.recruitment_process) {
            detailHtml += `
                <div class="carInTXT_title"><img src="/NEW/images/kor/Y_5.png" alt="전형일정"></div>
                <p class="carInTXT">${posting.recruitment_process}</p>
            `;
        }

        // 지원문의
        if (posting.contact_email || posting.contact_phone) {
            let contactHtml = '';
            if (posting.contact_email) {
                contactHtml += escapeHtml(posting.contact_email);
            }
            if (posting.contact_phone) {
                if (contactHtml) contactHtml += '<br />';
                contactHtml += escapeHtml(posting.contact_phone);
            }
            detailHtml += `
                <div class="carInTXT_title"><img src="/NEW/images/kor/Y_6.png" alt="지원문의"></div>
                <p class="carInTXT">${contactHtml}</p>
            `;
        }

        // 전체 HTML 생성 (기존 board.php와 동일한 구조)
        let html = `
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
                            <td class="carV_date_C">${deadlineText}</td>
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
                                <td>${posting.recruitment_count ? posting.recruitment_count + '명' : ''}</td>
                            </tr>
                        </table>
                        ${detailHtml}
                    </div>
                    <div class="carBotBars"></div>
                    <div class="caree_btns">
                        <a href="#" onclick="showApplicationForm('${posting.id}'); return false;">
                            <img src="/NEW/images/kor/btn_jiwon.png" alt="지원하기">
                        </a>
                        &nbsp;<a href="/NEW/board/bbs/board.php?bo_table=apply&career=${posting.id}">
                            <img src="/NEW/images/kor/btn_jiwonhyun.png" alt="지원현황">
                        </a>&nbsp;
                        <a href="career.php">
                            <img src="/NEW/images/kor/btn_list.png" alt="목록">
                        </a>
                    </div>
                </div>
            </div>
            
            <!-- 지원 폼 (기존 구조와 동일하게) -->
            <div class="application-form" id="application_form" style="display: none;">
                <h3>지원하기</h3>
                <form id="applicationForm" onsubmit="submitApplication(event, '${posting.id}'); return false;">
                    <div class="form-group">
                        <label for="applicant_name">이름 *</label>
                        <input type="text" id="applicant_name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="applicant_email">이메일 *</label>
                        <input type="email" id="applicant_email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="applicant_phone">연락처</label>
                        <input type="tel" id="applicant_phone" name="phone">
                    </div>
                    <div class="form-group">
                        <label for="applicant_resume">이력서/자기소개서 URL</label>
                        <input type="url" id="applicant_resume" name="resume_url" placeholder="Google Drive, Dropbox 등의 공유 링크">
                    </div>
                    <div class="form-group">
                        <label for="applicant_message">추가 메시지</label>
                        <textarea id="applicant_message" name="message" placeholder="추가로 전달하고 싶은 내용이 있으시면 입력해주세요."></textarea>
                    </div>
                    <button type="submit" id="submitBtn">지원하기</button>
                    <div class="success-message" id="successMessage">지원이 완료되었습니다. 감사합니다!</div>
                </form>
            </div>
        `;
        
        document.getElementById('career_detail_box').innerHTML = html;
        console.log('채용공고 상세 정보 렌더링 완료');
    }
    
    // 채용공고 상세 보기
    window.showCareerDetail = function(jobId) {
        console.log('채용공고 상세 보기, id:', jobId);
        document.getElementById('career_list_container').style.display = 'none';
        document.getElementById('career_detail_container').style.display = 'block';
        
        // URL 업데이트 (히스토리 관리)
        const newUrl = window.location.pathname + '?id=' + jobId;
        window.history.pushState({ id: jobId }, '', newUrl);
        
        loadJobPostingDetail(jobId);
    };
    
    // 지원 폼 표시
    window.showApplicationForm = function(jobId) {
        const form = document.getElementById('application_form');
        if (form) {
            form.style.display = form.style.display === 'none' ? 'block' : 'none';
            if (form.style.display === 'block') {
                form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    };
    
    // 지원서 제출
    window.submitApplication = async function(event, jobId) {
        event.preventDefault();
        console.log('지원서 제출 시작, job_id:', jobId);
        
        const form = document.getElementById('applicationForm');
        const submitBtn = document.getElementById('submitBtn');
        const successMessage = document.getElementById('successMessage');
        
        const formData = {
            job_posting_id: jobId,
            name: document.getElementById('applicant_name').value,
            email: document.getElementById('applicant_email').value,
            phone: document.getElementById('applicant_phone').value || null,
            resume_url: document.getElementById('applicant_resume').value || null,
            message: document.getElementById('applicant_message').value || null,
            status: 'applied'
        };
        
        try {
            submitBtn.disabled = true;
            submitBtn.textContent = '제출 중...';
            
            const supabaseClient = getSupabaseClient();
            
            const { data, error } = await supabaseClient
                .from('job_applications')
                .insert([formData])
                .select();
            
            if (error) {
                console.error('지원서 제출 오류:', error);
                alert('지원서 제출 중 오류가 발생했습니다: ' + error.message);
                submitBtn.disabled = false;
                submitBtn.textContent = '지원하기';
                return;
            }
            
            console.log('지원서 제출 성공:', data);
            
            // 성공 메시지 표시
            successMessage.style.display = 'block';
            form.reset();
            
            // 3초 후 성공 메시지 숨기기
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
            
            submitBtn.disabled = false;
            submitBtn.textContent = '지원하기';
            
        } catch (error) {
            console.error('지원서 제출 중 오류:', error);
            alert('지원서 제출 중 오류가 발생했습니다.');
            submitBtn.disabled = false;
            submitBtn.textContent = '지원하기';
        }
    };
    
    // 브라우저 뒤로가기 처리
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.id) {
            showCareerDetail(event.state.id);
        } else {
            document.getElementById('career_list_container').style.display = 'block';
            document.getElementById('career_detail_container').style.display = 'none';
        }
    });
    
    // 페이지 로드 시 실행
    console.log('채용공고 페이지 초기화, id:', wrId);
    
    function initializePage() {
        if (wrId) {
            console.log('상세 페이지 로드');
            showCareerDetail(wrId);
        } else {
            console.log('목록 페이지 로드');
            loadJobPostings();
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializePage);
    } else {
        initializePage();
    }
    
})();
</script>

</body>
</html>


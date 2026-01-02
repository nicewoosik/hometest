<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>ECS | ECS텔레콤</title>

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
<meta name="description" content="ARS, 콜센터, CTI, CRM, IPCC, 통합콜센터, 녹취, IPPBX, 콜센터구축, IVR, 컨택센터솔루션, AI, 챗봇, 음성인식, STT">
<meta name="keywords" content="ARS, 콜센터, CTI, CRM, IPCC, 통합콜센터, 녹취, IPPBX, 콜센터구축, IVR, 컨택센터솔루션, AI, 챗봇, 음성인식, STT" />
<meta name="robots" content="follow, all" />
<meta name="author" content="Chairone Creative">

<meta property="og:type" content="website">
<meta property="og:title" content="ECS텔레콤">
<meta property="og:description" content="ARS, 콜센터, CTI, CRM, IPCC, 통합콜센터, 녹취, IPPBX, 콜센터구축, IVR, 컨택센터솔루션, AI, 챗봇, 음성인식, STT">
<meta property="og:image" content="http://ecstel.co.kr/NEW/images/gnbK/newlogo.png">
<meta property="og:url" content="http://ecstel.co.kr/">

<!--[if lte IE 8]>
<style type="text/css">
#bg ul li{background:none !important}
#bg ul li img{position:static; left:0; top:0;}
</style>
<script type="text/javascript" src="/NEW/js/minhyuk.js"></script>
<![endif]-->

</head>
<script type="text/javascript">
// 자바스크립트에서 사용하는 전역변수 선언
var g4_path      = "..";
var g4_bbs       = "bbs";
var g4_bbs_img   = "img";
var g4_url       = "http://ecstel.co.kr/NEW/board";
var g4_is_member = "";
var g4_is_admin  = "";
var g4_bo_table  = "notice";
var g4_sca       = "";
var g4_charset   = "utf-8";
var g4_cookie_domain = "";
var board_image_width ="600";
var g4_is_gecko  = navigator.userAgent.toLowerCase().indexOf("gecko") != -1;
var g4_is_ie     = navigator.userAgent.toLowerCase().indexOf("msie") != -1;
</script>
<!-- <script type="text/javascript" src="../js/jquery-1.4.2.min.js"></script> -->
<script type="text/javascript" src="/NEW/board/js/common.js"></script>
<body topmargin="0" leftmargin="0" >
<script type="text/javascript" src="/NEW/board/js/sideview.js"></script>

<div class="mobile_home_btn">
  <a href="#"><img src="/NEW/images/common/mobile_btn.png" alt="모바일에서 메뉴열기"></a>
</div><!-- Only Mobile -->

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-111281995-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'UA-111281995-1');
</script>
<!-- //Global site tag (gtag.js) - Google Analytics -->
<!-- <script src="http://ecstel.co.kr/NEW/js/jquery.droppy.js"></script> -->

<!-- <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script> -->
<script>
$(function(){
  let hoverTimer;

  $('.pcGNB').on('mouseenter', function(){
    clearTimeout(hoverTimer);
    $('.nav_bg').stop(true, true).slideDown(250);
    $('.gnb > li > ul').stop(true, true).slideDown(250);
  });

  $('.pcGNB').on('mouseleave', function(){
    hoverTimer = setTimeout(() => {
      $('.nav_bg').stop(true, true).slideUp(250);
      $('.gnb > li > ul').stop(true, true).slideUp(250);
      $('.gnb > li').removeClass('active');
    }, 200);
  });

  $('.gnb > li').hover(
    function(){
      $('.gnb > li').removeClass('active');
      $(this).addClass('active');
    },
    function(){
      $(this).removeClass('active');
    }
  );
});

</script>

<div class="wrap Mwrap">
  <div class="bodys">

    <div id="nav">
      <div class="inner">

        <div class="right_top">
          <ul class="sns">
            <li><a href="https://www.facebook.com/ecstel" target="_blank"><img src="/NEW/images/common/sns_fb.png"
                  alt=""></a></li>
            <li><a href="https://www.instagram.com/ecstelecom/" target="_blank"><img
                  src="/NEW/images/common/sns_insta.png" alt=""></a></li>
            <li><a href="http://ecstel.business.site/" target="_blank"><img src="/NEW/images/common/sns_gg.png"
                  alt=""></a>
            </li>
            <li><a href="https://www.linkedin.com/company/482822/" target="_blank"><img
                  src="/NEW/images/common/sns_in.png" alt=""></a></li>
            <li><a href="https://www.youtube.com/channel/UCICHlAfNdW_Gl1WzduPTeQw/featured" target="_blank"><img
                  src="/NEW/images/common/sns_yt.png" alt=""></a></li>
          </ul>
          <ul class="language">
            <li><a href="/NEW/html/index.html"><img src="/NEW/images/common/kor_on.png" alt=""></a></li>
            <li><a href="/NEW/html/en_index.html"><img src="/NEW/images/common/eng_off.png" alt=""></a></li>
          </ul>
        </div>


        <div class="nav_body">
          <div class="Gnb_btn"><a href="/NEW/html/index.html"><img src="/NEW/images/gnbK/newlogo.png" alt="뉴로고"></a>
          </div>

          <div class="pcGNB">
            <ul class="gnb">
              <li class="gnb01">
                <a class="gnb01_a" href="#">COMPANY</a>
                <ul>
                  <li class="nb"><a class="gn0101" href="/NEW/html/01_01mission.html">Mission & Values</a></li>
                  <li><a class="gn0102" href="/NEW/html/01_02history.html">History</a></li>
                  <li><a class="gn0103" href="/NEW/html/01_03award.html">Awards & Recognition</a></li>
                </ul>
              </li>
              <li class="gnb02">
                <a class="gnb02_a" href="#">서비스&솔루션</a>
                <ul>
                  <li class="nb"><a class="gn0201" href="/NEW/html/02_02contact.html">Customer Success(CC)</a></li>
                  <li><a class="gn0202" href="/NEW/html/02_01unified.html">Digital Workplace(UC)</a></li>
                  <li><a class="gn0203" href="/NEW/html/02_05maintain.html">ETaaS</a></li>
                  <!-- <li><a class="gn0204" href="/NEW/html/02_03si.html">시스템 통합</a></li>
				  <li><a class="gn0205" href="/NEW/html/02_04tel.html">비디오</a></li>
				  <li><a class="gn0206" href="/NEW/html/02_05maintain.html">고객맞춤형 서비스</a></li> -->
                </ul>
                <!-- 2020-08-07 주석 <ul>
				  <li class="nb"><a class="gn0201" href="/NEW/html/02_02contact.html">컨택센터</a></li>
				  <li><a class="gn0202" href="/NEW/html/02_01unified.html">통합커뮤니케이션</a></li>
				  <li><a class="gn0203" href="/NEW/html/02_02_ni.html">네트워크 통합</a></li>
				  <li><a class="gn0204" href="/NEW/html/02_03si.html">시스템 통합</a></li>
				  <li><a class="gn0205" href="/NEW/html/02_04tel.html">비디오</a></li>
				<li><a class="gn0206" href="/NEW/html/02_05maintain.html">고객맞춤형 서비스</a></li>
			  </ul> -->
              </li>
              <li class="gnb03">
                <a class="gnb03_a" href="#">파트너&고객사</a>
                <ul>
                  <li class="nb"><a class="gn0301" href="/NEW/html/03_01partners.html">Partners</a></li>
                  <li><a class="gn0302" href="/NEW/html/03_02customers.html">Customers</a></li>

                </ul>
              </li>
              <li class="gnb04">
                <a class="gnb04_a" href="#">ECS ONE채용</a>
                <ul>
                  <li class="nb"><a class="gn0401" href="/NEW/html/04_01injae.html">인재상</a></li>
                  <li><a class="gn0402" href="/NEW/html/04_02zikmu.html">직무소개</a></li>
                  <li><a class="gn0403" href="/NEW/html/04_03welfare.html">복지 및 웰니스 프로그램</a></li>
                  <li><a class="gn0404" href="/NEW/html/04_04edu.html">교육체계</a></li>
                  <li><a class="gn0405" href="/NEW/html/04_06ourCom.html">우리회사는요</a></li>
                  <li><a class="gn0406" href="/NEW/html/04_07careerProcess.html">채용 프로세스</a></li>
                  <li><a class="gn0407" href="/NEW/board/bbs/board.php?bo_table=career">채용 공고</a></li>
                </ul>
              </li>
              <li class="gnb05">
                <a class="gnb05_a" href="#">CONTACT US</a>
                <ul>
                  <li class="mmEng nb"><a class="gn0501" href="/NEW/html/05_01support.html">Support</a></li>
                  <li><a class="gn0502" href="/NEW/html/05_02location.html">찾아오시는 길</a></li>
                </ul>
              </li>
              <li class="gnb06">
                <a class="gnb06_a" href="#">ECS소식</a>
                <ul>
                  <li class="nb"><a class="gn0601" href="/NEW/html/06_01ir.html">재무/공시·공고정보</a></li>
                  <li><a class="gn0602" href="/NEW/pdf/ECSTelecom_Introduction_FY25_f.pdf" target="_blank">회사소개서</a></li>
                  <li class="mmEng"><a class="gn0603" href="/NEW/board/bbs/board.php?bo_table=notice">ECS News</a></li>
                  <li><a class="gn0604" href="https://blog.naver.com/ecstelecom">ECS 블로그</a></li>
                </ul>
              </li>
            </ul><!-- pcGNB_BOX -->
          </div>
        </div>
		<h1></h1>


        <div class="nav_bg"></div>
      </div>
    </div>
    <h1></h1>
    <!--     <style>
    .right_top {
      overflow: hidden;
      position: absolute;
      right: 30px;
      top: 15px;
      display: flex;
    }
  
    .right_top .language {
      position: relative;
      right: auto;
      top: 8px;
    }
  
    .right_top .sns {
      padding-right: 10px;
    }
  
    .right_top .sns li {
      float: left;
      margin-right: 7px;
    }
  
    .right_top .sns li img {
      width: 25px;
    }
  
    @media (max-width: 1196px) {
      .right_top .sns {
        display: none;
      }
    }
  </style> --><style>
.peoulliFis a img{width:220px;height:236px;}
</style>


  <!-- <div class="subpage_img">
            <p class="title_news"><img src='../data/file/notice/notice_head_1516196421' border='0'></p>
        <div><img src="../../images/kor/top_e_04.jpg" alt=""></div> -->
	<div class="subpage_img">
        <p>ECS News</p>
        <div><img src="/NEW/images/kor/top_e_06_new.jpg" alt=""></div>
    </div>
    </div>
    <div class="subpage_cont">
        <div class="locs">
            <a href="#"><img src="/NEW/images/kor/icon_house.png"></a>
            ECS NOW <img src="/NEW/images/kor/icon_next.png">
            ECS NEWS        </div>
        <div class="service_box">


			 <p class="serv_title"><img src='../data/file/notice/notice_tail_1516243874' border='0'>                <i>ECS NEWS</i>
            </p>
            <p class="serv_title_bar"><img src="../../images/kor/serv_bar.png" alt=""></p>
        </div>

       <div class="ourComBox">
            <ul class="peopleUL2">
			  
				<li class="peoulliFis">


					                    <a class="people2Btn1" href="#">
				         <img src='img/noimg.jpg' border='0'>
                        <p>
                            <span>2002년 고객초청 콜센터 세미나 개최</span>
                            <b></b>
                        </p>
                    </a>

					



                </li>

				
				<li class="peoulliFis">


					                    <a class="people2Btn2" href="#">
				         <img src='img/noimg.jpg' border='0'>
                        <p>
                            <span>ECS텔레콤 CIC코리아 콜센터 구축</span>
                            <b></b>
                        </p>
                    </a>

					



                </li>

				
				<li class="peoulliFis">


					                    <a class="people2Btn3" href="#">
				         <img src='img/noimg.jpg' border='0'>
                        <p>
                            <span>ECS텔레콤 SK텔레콤과 구내무선전화 제휴식</span>
                            <b></b>
                        </p>
                    </a>

					



                </li>

				
				<li class="peoulliFis">


					                    <a class="people2Btn4" href="#">
				         <img src='img/noimg.jpg' border='0'>
                        <p>
                            <span>우량기술기업선정</span>
                            <b></b>
                        </p>
                    </a>

					



                </li>

				
				<li class="peoulliFis">


					                    <a class="people2Btn5" href="#">
				         <img src='img/noimg.jpg' border='0'>
                        <p>
                            <span>기술평가기업 벤처 등록</span>
                            <b></b>
                        </p>
                    </a>

					



                </li>

				
				<li class="peoulliFis">


					                    <a class="people2Btn6" href="#">
				         <img src='img/noimg.jpg' border='0'>
                        <p>
                            <span>통신기술연구소 설립 및 인정서 획득</span>
                            <b></b>
                        </p>
                    </a>

					



                </li>

				
            </ul>
       </div>
    </div>

		  
<div class="prj2_1Step">
    <div class="gall_close"><a href="#"><img src="../../images/kor/btn_gall_close2.png" alt="close"></a></div>
    <div class="interVBOX2">
        <ul class="TTPP">
            <li class="TTPP_L">
                <i style='font-size:1.5em'>2002년 고객초청 콜센터 세미나 개최</i>
                <b><img src="../../images/kor/dums2.png" alt=""></b>
            </li>
            <li class="TTPP_R">
				         <img src='img/noimg.jpg' border='0'>					  </li>
        </ul>
		<div style="margin: 2% 5% 2% 0; word-break:break-all; ">ECS텔레콤은 5월 24-25일, 1박 2일 동안 제주도 신라호텔에서, 현재 Merdian 1을 사용중인 우수고객을 대상으로 2002 고객초청 콜센터 세미나를 개최하였다. <br><br>이번 세미나에서는 Nortel Networks사의 Virtual Call Center Solution, Advatel사의 Queue Management Communication 소개 및 ECS텔레콤의 콜센터 솔루션발표가 있었으며, 향후 콜센터 시장의 발전 방향 및 신기능을 소개되었다. <br> </div>
    </div><!-- interVBOX -->
</div><!-- prj_1Step -->

<div class="prj2_2Step">
    <div class="gall_close"><a href="#"><img src="../../images/kor/btn_gall_close2.png" alt="close"></a></div>
    <div class="interVBOX2">
        <ul class="TTPP">
            <li class="TTPP_L">
                <i style='font-size:1.5em'>ECS텔레콤 CIC코리아 콜센터 구축</i>
                <b><img src="../../images/kor/dums2.png" alt=""></b>
            </li>
            <li class="TTPP_R">
				         <img src='img/noimg.jpg' border='0'>					  </li>
        </ul>
		<div style="margin: 2% 5% 2% 0; word-break:break-all; ">주)ECS텔레콤은 CRM아웃소싱 전문회사인 CIC코리아의 본사 콜센터 SI를 수주하여 성공리에 구축완료 하였다.<br><br>이번 프로젝트는 아웃바운드 상담을 중심으로 한 예측다이얼링 시스템 적용과 상담원 효율성 증대에 적합하도록 구축되었으며 세계최고의 메리디안1 교환기와 제니시스 T-Server를 사용하였다. <br><br>CIC코리아는 이번 구축을 통하여 국내 최대, 최고의 아웃소싱 <br>전문회사의 위치를 확고히 하고 있다 </div>
    </div><!-- interVBOX -->
</div><!-- prj_1Step -->

<div class="prj2_3Step">
    <div class="gall_close"><a href="#"><img src="../../images/kor/btn_gall_close2.png" alt="close"></a></div>
    <div class="interVBOX2">
        <ul class="TTPP">
            <li class="TTPP_L">
                <i style='font-size:1.5em'>ECS텔레콤 SK텔레콤과 구내무선전화 제휴식</i>
                <b><img src="../../images/kor/dums2.png" alt=""></b>
            </li>
            <li class="TTPP_R">
				         <img src='img/noimg.jpg' border='0'>					  </li>
        </ul>
		<div style="margin: 2% 5% 2% 0; word-break:break-all; ">ECS텔레콤은 오는 3월부터 구내무선전화 서비스를 제공하는 SK텔레콤 (대표 표문수)과 시스템 개발 및 생산과 공동 마케팅에 대한 사업협력 제휴를 맺었다.  </div>
    </div><!-- interVBOX -->
</div><!-- prj_1Step -->

<div class="prj2_4Step">
    <div class="gall_close"><a href="#"><img src="../../images/kor/btn_gall_close2.png" alt="close"></a></div>
    <div class="interVBOX2">
        <ul class="TTPP">
            <li class="TTPP_L">
                <i style='font-size:1.5em'>우량기술기업선정</i>
                <b><img src="../../images/kor/dums2.png" alt=""></b>
            </li>
            <li class="TTPP_R">
				         <img src='img/noimg.jpg' border='0'>					  </li>
        </ul>
		<div style="margin: 2% 5% 2% 0; word-break:break-all; "><img src=/upfiles/ttt.gif> </div>
    </div><!-- interVBOX -->
</div><!-- prj_1Step -->

<div class="prj2_5Step">
    <div class="gall_close"><a href="#"><img src="../../images/kor/btn_gall_close2.png" alt="close"></a></div>
    <div class="interVBOX2">
        <ul class="TTPP">
            <li class="TTPP_L">
                <i style='font-size:1.5em'>기술평가기업 벤처 등록</i>
                <b><img src="../../images/kor/dums2.png" alt=""></b>
            </li>
            <li class="TTPP_R">
				         <img src='img/noimg.jpg' border='0'>					  </li>
        </ul>
		<div style="margin: 2% 5% 2% 0; word-break:break-all; ">2001년 4월 14일 서울지방중소기업청으로 부터 우수기술보유에 의한 기술평가기업 벤처로 확인받았다  </div>
    </div><!-- interVBOX -->
</div><!-- prj_1Step -->

<div class="prj2_6Step">
    <div class="gall_close"><a href="#"><img src="../../images/kor/btn_gall_close2.png" alt="close"></a></div>
    <div class="interVBOX2">
        <ul class="TTPP">
            <li class="TTPP_L">
                <i style='font-size:1.5em'>통신기술연구소 설립 및 인정서 획득</i>
                <b><img src="../../images/kor/dums2.png" alt=""></b>
            </li>
            <li class="TTPP_R">
				         <img src='img/noimg.jpg' border='0'>					  </li>
        </ul>
		<div style="margin: 2% 5% 2% 0; word-break:break-all; ">전담 조직을 갖추고 전문적인 기술관리와 지속적인 개발투자와 연구개발 능력향상을 통하여 경쟁력 있는 제품 개발 및 솔루션 제공으로 회사의 매출증대와 핵심 기술력 확보를 위하여 2001년 2월 1일 통신기술연구소를 설립하게 되었으며, 한국산업기술진흥협회로부터 2001년 3월 9일 기업부설연구소로 인정 받았다.  </div>
    </div><!-- interVBOX -->
</div><!-- prj_1Step -->



<div class='L_pager'><ul> <li><a href='./board.php?bo_table=notice&page=26&page=1'><img src='/NEW/images/kor/Lbtn_leftGo.png' alt=''></a></li>  <li><a href='./board.php?bo_table=notice&page=26&page=24'><img src='/NEW/images/kor/Lbtn_left.png' alt=''></a></li>  <li><a class='L_num' href='./board.php?bo_table=notice&page=26&page=25'>25</a></li>  <li><a class='L_num L_active' href='#'>26</a></li>  <li><a class='L_num' href='./board.php?bo_table=notice&page=26&page=27'>27</a></li>  <li><a href='./board.php?bo_table=notice&page=26&page=27'><img src='/NEW/images/kor/Lbtn_rightGo.png' alt=''></a></li>  </ul></div>


<script type="text/javascript" src="../../js/rolling.js"></script>
<script type="text/javascript" src="../../js/ecs.js"></script>
<script type="text/javascript" src="../../js/ecs_sub.js"></script>
<script type="text/javascript" src="../../js/mobile.js"></script>



    <div class="subpage_copyright_gap">
    </div>



 <style>
 .copyright {position:relative;}
/*.copyright .btn {position:absolute; right:40px; top:30px;}*/
.copyright .btn a {margin-top:15px; display:inline-block; font-size:13px; color:#a9a9a9; padding:5px 15px; border:1px solid rgba(255,255,255,.3);}

.quick_contact {font-family: 'NotoSansCJKkr-Regular',notokr-regular;position:fixed; bottom:0; right:20px;width:280px;}
.quick_contact .quick_btn{background:#102381;color:#fff;border-radius:10px 10px 0 0;text-align:center; padding:15px 0; font-size:20px;cursor:pointer;width:100%;letter-spacing:2px;font-weight:100;}
.quick_contact .cnt {background:rgba(0,0,0,0.8);display:none;padding:5% 5%;}
.quick_contact .cnt .input{width:98%;margin:2% 0;height:30px; border:1px solid #aaa;padding-left:2%;background:transparent;color:#aaa;font-size:14px;}
.quick_contact .cnt .input::placeholder{color:#aaa;}
.quick_contact .cnt .content::placeholder{color:#aaa;}
.quick_contact .cnt .content{width:97%;margin:2% 0;border:1px solid #aaa;padding-left:2%;padding-top:2%;background:transparent;color:#aaa;font-size:14px;}
.quick_contact .cnt #btn_submit{width:99%;margin:2% 0;height:45px; border:0;padding-left:2%;background:#102381;color:#fff;font-size:14px;font-family: 'NotoSansCJKkr-Regular',notokr-regular;letter-spacing:2px;cursor:pointer;}
.quick_contact .cnt .txt{color:#fff;font-size:14px;}
.quick_contact .cnt a{color:#fff;text-decoration:underline;margin-left:4px;font-size:14px;}
 </style>
    <div class="copyright">
        서울특별시 서초구 반포대로 28길8(서초동 1543-1)일홍빌딩<br class="mobile_sh"> T. 02-3415-8300 F.02-3415-8338<br>
<i>il-Hong Building 8, Banpo-daero 28-gil, Seocho-gu, Seoul, Korea</i>
<p><!-- <img src="/NEW/images/kor/copyright.png" alt=""> -->copyrightⓒECS Telecom</p>
		<div class="btn"><a href="javascript:GoPage('copy1')">개인정보처리방침</a></div>
    </div>
</div>
</div>

<div class="quick_contact">
<div class="quick_btn">간편문의</div>
  <form name=frm method=post action="/NEW/board/bbs/write_update.php" onsubmit="return checkFrm(this);">
		<input type=hidden name=w        value="">
		<input type=hidden name=bo_table value="rksvusansdml">
		<input type=hidden name=wr_id    value="">
		<input type=hidden name=sca      value="">
		<input type=hidden name=sfl      value="">
		<input type=hidden name=stx      value="">
		<input type=hidden name=spt      value="">
		<input type=hidden name=sst      value="">
		<input type=hidden name=sod      value="">
		<input type=hidden name=s    value="s">
		<input type=hidden value='secret' name='secret'>
		<input type=hidden name=wr_1    value="main">
		
	<ul class="cnt">
		<li><input class="input name" placeholder="이름 *" name="wr_name" required itemname="이름"></li>
		<li><input class="input com" placeholder="회사명 *" name="wr_subject" required itemname="회사명"></li>
		<li><input class="input mail" placeholder="메일주소 *" name="wr_email" id="wr_email" required class="email" email itemname="메일주소"></li>
		<li><input class="input com" placeholder="연락처" name="wr_2" itemname="연락처"></li>
		<li><textarea  rows="5" class="content" placeholder="문의내용 *" name="wr_content" required itemname="문의내용"></textarea></li>
		<li><input type="checkbox" class="chk" name=agree><span class="txt"> 개인정보 취급방침동의</span> <a href="javascript:GoPage('copy1')">전문보기</a></li>
		<li><input type="submit" id="btn_submit" value="문의하기"></li>
	</ul>
</form>
<iframe width=0 height=0 name='hiddenframe2' style='display:none;'></iframe>
 
</div>
<script>
    $("document").ready(function(){            
        $(".quick_contact .quick_btn").click(function(){
            $(".quick_contact .cnt").slideToggle()
        }) 
    }) 
</script>

<script type="text/javascript">

function checkFrm(obj) {

		var email = document.getElementById("wr_email").value;
		var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

		if(exptext.test(email)==false){
			alert("이 메일형식이 올바르지 않습니다.");
			document.frm.wr_email.focus();
			return false;
		}


	 if(obj.agree.checked == false) {
	  alert('개인정보 취급방침 동의에 체크해주세요.');
	  obj.agree.focus();
	  return false;
	 }
	 document.frm.target ="hiddenframe2";

}
</script>
	

<div class="mobile_menu"> 
    <div class="m_close">            
        <p><a href="#"><img src="/NEW/images/common/mobile_x_btn.jpg" alt="닫기버튼"></a></p>
    </div>
    <div class="mm_language">
        <a href="#">LANGUAGE - KOR</a>
    </div>
    <div class="nn_language">
        <a href="/NEW/html/en_index.html">ENGLISH</a>
    <!--     <a href="#">CHINESE</a> -->
    </div>
    <div class="mm_login">
        <a href="/NEW/html/05_02location.html">LOCATION</a>
 <!--        <a id="mo_Rev" href="#">RESERVATION</a> -->
    </div>

    <div class="menu1 mm">
        <a href="#">COMPANY</a>
    </div>
    <div class="menu1_x nn">
        <a href="/NEW/html/01_01mission.html" style="padding-top:2px;">- Mission & Values</a>
        <a href="/NEW/html/01_02history.html">- History</a>
        <a href="/NEW/html/01_03award.html">- Awards & Recognition</a> 
    </div> 
    <div class="menu2 mm">
        <a href="#">SERVICES & SOLUTIONS</a>
    </div>
	<div class="menu2_x nn">
        <a href="/NEW/html/02_02contact.html" style="padding-top:2px;">- Customer Success(CC)</a>
        <a href="/NEW/html/02_01unified.html">- Digital Workplace(UC)</a>
        <a href="/NEW/html/02_05maintain.html">- ETaaS</a>
        <!-- <a href="/NEW/html/02_03si.html">- 시스템 통합</a>
        <a href="/NEW/html/02_04tel.html">- 비디오</a>
        <a href="/NEW/html/02_05maintain.html">- 고객맞춤형 서비스</a> -->
    </div>
    <!-- 2020-08-07 주석 <div class="menu2_x nn">
        <a href="/NEW/html/02_02contact.html" style="padding-top:2px;">- 컨택센터</a>
        <a href="/NEW/html/02_01unified.html">- 통합커뮤니케이션</a>
        <a href="/NEW/html/02_02_ni.html">- 네트워크 통합</a>
        <a href="/NEW/html/02_03si.html">- 시스템 통합</a>
        <a href="/NEW/html/02_04tel.html">- 비디오</a>
        <a href="/NEW/html/02_05maintain.html">- 고객맞춤형 서비스</a>
    </div> -->
    <div class="menu3 mm">
        <a href="#">PARTNERS & CUSTOMERS</a>
    </div>
     <div class="menu3_x nn">
        <a href="/NEW/html/03_01partners.html" style="padding-top:2px;">- Partners</a>
        <a href="/NEW/html/03_02customers.html">- Customers</a>        
    </div>
    <div class="menu4 mm">
        <a href="#">RECRUITMENT</a>
    </div>
   <div class="menu4_x nn">
        <a href="/NEW/html/04_01injae.html" style="padding-top:2px;">- 인재상</a>
         <a href="/NEW/html/04_02zikmu.html">- 직무소개</a>
         <a href="/NEW/html/04_03welfare.html">- 복리후생제도</a>
         <a href="/NEW/html/04_04edu.html">- 교육체계</a>
<!--          <a href="/NEW/html/04_05ecsNow.html">- ECS Now</a> -->
         <a href="/NEW/html/04_06ourCom.html">- 우리회사는요</a>
         <a href="/NEW/html/04_07careerProcess.html">- 채용 프로세스</a>
         <a href="/NEW/board/bbs/board.php?bo_table=career">- 채용 공고</a>
    </div>
    <div class="menu5 mm">
        <a href="#">CONTACT US</a>
    </div>
    <div class="menu5_x nn">
        <a href="/NEW/html/05_01support.html" style="padding-top:2px;">- Support</a>
        <a href="/NEW/html/05_02location.html">- 찾아오시는 길</a>
    </div>
    <div class="menu6 mm">
        <a href="#">ECS NOW</a>
    </div>
    <div class="menu6_x nn" style="border-bottom: 1px solid #2e2e2e;">
        <a href="/NEW/html/06_01ir.html" style="padding-top:2px;">- 재무정보</a>
        <a href="/NEW/pdf/ECSTelecom_Introduction_FY25.pdf" target="_blank">- 회사소개서</a>
        <a href="/NEW/board/bbs/board.php?bo_table=notice">- ECS News</a>
        <a href="/NEW/board/bbs/board.php?bo_table=Open_Archive">- ECS Open Archive</a>
    </div>

	<ul class="sns">
		<li><a href="https://www.facebook.com/ecstel" target="_blank"><img src="/NEW/images/common/sns_fb.png" alt=""></a></li>
		<li><a href="https://www.instagram.com/ecstelecom/" target="_blank"><img src="/NEW/images/common/sns_insta.png" alt=""></a></li>
		<li><a href="http://ecstel.business.site/" target="_blank"><img src="/NEW/images/common/sns_gg.png" alt=""></a></li>
		<li><a href="https://www.linkedin.com/company/482822/" target="_blank"><img src="/NEW/images/common/sns_in.png" alt=""></a></li>
		<li><a href="https://www.youtube.com/channel/UCICHlAfNdW_Gl1WzduPTeQw/featured" target="_blank"><img src="/NEW/images/common/sns_yt.png" alt=""></a></li>
	</ul>
<style>
.mobile_menu .sns{padding: 20px;position: relative;z-index: 50;}
.mobile_menu .sns li{float: left;margin-right: 6px;}
.mobile_menu .sns li img{width: 30px;}
</style>
    <div class="mm_back">       
    </div>

</div>
<div class="black_cover"></div>








<!-- 게시판 목록 끝 -->
<br />
<!-- 사용스킨 : gallery -->
<script type="text/javascript" src="/NEW/board/js/wrest.js"></script>

<!-- 새창 대신 사용하는 iframe -->
<iframe width=0 height=0 name='hiddenframe' style='display:none;'></iframe>


<script type="text/javascript" src="/NEW/js/rolling.js"></script>
<script type="text/javascript" src="/NEW/js/ecs.js"></script>
<script type="text/javascript" src="/NEW/js/ecs_sub.js"></script>
<script type="text/javascript" src="/NEW/js/mobile.js"></script>


</body>
</html>

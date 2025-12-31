


(function($){
	var screenH = $(window).height();
	var screenW = $(window).width();
	var screenH_win = $(document).height() //스크롤 포함 전체
	var screenW_win = $(document).width() 
	$('.prj_1Step').css('height',screenH_win)
	$('.prj_2Step').css('height',screenH_win)
	$('.prj_3Step').css('height',screenH_win)
	$('.prj_4Step').css('height',screenH_win)
	$('.prj_5Step').css('height',screenH_win)
	$('.prj_6Step').css('height',screenH_win)
	$('.prj_7Step').css('height',screenH_win)
	$('.prj_8Step').css('height',screenH_win)
	$('.prj2_1Step').css('height',screenH_win)
	$('.prj2_2Step').css('height',screenH_win)
	$('.prj2_3Step').css('height',screenH_win)
	$('.prj2_4Step').css('height',screenH_win)
	$('.prj2_5Step').css('height',screenH_win)
	$('.prj2_6Step').css('height',screenH_win)
	$('.prj2_7Step').css('height',screenH_win)
	$('.prj2_8Step').css('height',screenH_win)


	var main_img_div_img_H = parseFloat($('.main_img div img').css('height'))/2
	$('.main_img p').css('top',main_img_div_img_H-70)
	$('.main_img span').css('top',main_img_div_img_H+20)
	$('.main_img i').css('top',main_img_div_img_H+20)
	var main_misIMG_H = parseFloat( $('.main_mission_bg img').css('height') ) /2
	$('.main_mission').css('top',main_misIMG_H-70)
	$('.main_mission_txt').css('top',main_misIMG_H-40)
	$('.main_missionBox i').css('top',main_misIMG_H-10)
	var maICO_W = parseFloat($('.ma_ico_1').css('width'))/2
	$('.ma_ico_1').css('marginLeft',-maICO_W)
	var maICO_W2 = parseFloat($('.ma_ico_2').css('width'))/2
	$('.ma_ico_2').css('marginLeft',-maICO_W2)	

	if(screenW <= 400 && screenW > 0){ 
		$('.main_img div').find('img').attr('src','/NEW/images/common/main_img2.jpg');
		$('.bodys h1').find('img').attr("src","/NEW/images/common/logo_small.png")
		$('.mobile_home_btn a').find('img').attr("src","/NEW/images/common/mobile_small_btn.png")
		$('.m_close p a img').attr("src","/NEW/images/common/mobile_x_small_btn.jpg")		
		$('.main_mission_bg').find('img').attr('src','/NEW/images/kor/main_mission_bg2.jpg');
		var main_misIMG_H2 = parseFloat( $('.main_mission_bg img').css('height') ) /2
		$('.main_img p').find('img').attr('src','/NEW/images/kor/main_txt_differ2.png');
		$('.main_img p').css('marginLeft','-110px');
		
		var ma_DIV_H0 = parseFloat($('.main_img div img').css('height'))/2
		$('.main_img p').css('top',ma_DIV_H0-55)
		$('.main_img i').css('top',ma_DIV_H0-15)
		$('.main_mission').css('top',main_misIMG_H2-50)
		$('.main_missionBox i').css('top',main_misIMG_H2-10)		
		$('.main_blue_box p').find('img').attr('src','/NEW/images/kor/main_color_txt1_.png');
		$('.main_red_box p').find('img').attr('src','/NEW/images/kor/main_color_txt2_.png');		
		$('.main_img div').find('img').attr('src','/NEW/images/common/main_img_none.jpg');
		console.log("380-0 L"+screenW)
	}
	if(screenW <= 667 && screenW > 400){ 
		$('.main_img div').find('img').attr('src','/NEW/images/common/main_img2.jpg');
		$('.bodys h1').find('img').attr("src","/NEW/images/common/logo.png")
		$('.mobile_home_btn a').find('img').attr("src","/NEW/images/common/mobile_btn.png")
		$('.m_close p a img').attr("src","/NEW/images/common/mobile_x_btn.jpg")
		$('.main_mission_bg').find('img').attr('src','/NEW/images/kor/main_mission_bg2.jpg');
		var main_misIMG_H2 = parseFloat( $('.main_mission_bg img').css('height') ) /2
		$('.main_img p').find('img').attr('src','/NEW/images/kor/main_txt_differ.png');
		$('.main_img p').css('marginLeft','-162px');

		var ma_DIV_H = parseFloat($('.main_img div img').css('height'))/2
		$('.main_img p').css('top',ma_DIV_H-70)
		$('.main_img i').css('top',ma_DIV_H)
		$('.main_mission').css('top',main_misIMG_H2-50)
		$('.main_missionBox i').css('top',main_misIMG_H2-10)
		$('.main_blue_box p').find('img').attr('src','/NEW/images/kor/main_color_txt1_.png');
		$('.main_red_box p').find('img').attr('src','/NEW/images/kor/main_color_txt2_.png');
		$('.main_img div').find('img').attr('src','/NEW/images/common/main_img_none.jpg');
		console.log("667-380 L"+screenW)
		

	}if(screenW <= 940 && screenW > 667){ 
		$('.main_img div').find('img').attr('src','/NEW/images/common/main_img2.jpg');
		$('.bodys h1').find('img').attr("src","/NEW/images/common/logo.png")
		$('.mobile_home_btn a').find('img').attr("src","/NEW/images/common/mobile_btn.png")
		$('.m_close p a img').attr("src","/NEW/images/common/mobile_x_btn.jpg")
		$('.main_img p').find('img').attr('src','/NEW/images/kor/main_txt_differ.png');
		$('.main_img p').css('marginLeft','-162px');
		var ma_DIV_H1 = parseFloat($('.main_img div img').css('height'))/2
		$('.main_img p').css('top',ma_DIV_H1-70)
		$('.main_img i').css('top',ma_DIV_H1)
		$('.main_mission_bg').find('img').attr('src','/NEW/images/kor/main_mission_bg2.jpg');
		var main_misH2 = parseFloat( $('.main_mission_bg img').css('height') ) /2
		$('.main_mission').css('top',main_misH2-50)
		$('.main_missionBox i').css('top',main_misH2-10)
		$('.main_img div').find('img').attr('src','/NEW/images/common/main_img_none.jpg');
		
		console.log("940-667 L"+screenW)
	}if(screenW > 940){ 
		$('.bodys h1').find('img').attr("src","/NEW/images/common/logo.png")
		$('.mobile_home_btn a').find('img').attr("src","/NEW/images/common/mobile_btn.png")
		$('.m_close p a img').attr("src","/NEW/images/common/mobile_x_btn.jpg")
		$('.main_img p').find('img').attr('src','/NEW/images/kor/main_txt_differ.png');
		$('.main_img p').css('marginLeft','-162px');
		$('.main_mission_bg').find('img').attr('src','/NEW/images/kor/main_mission_bg.jpg');
		$('.main_img div').find('img').attr('src','/NEW/images/common/main_img_none.jpg');
		console.log("940 Over L"+screenW)
	}if(screenW < 1600){
		$('.main_img div').find('img').attr('src','/NEW/images/common/main_img_none.jpg');
	}if(screenW >= 1600){
		$('.main_img div').find('img').attr('src','/NEW/images/common/main_img.jpg');
	}

}) (jQuery) 

$(window).bind("load",function(){ 
	var screenH = $(window).height();
	var screenW = $(window).width();
	var screenH_win = $(document).height() 
	var screenW_win = $(document).width() 
	//인터뷰백그라운드
	$('.prj_1Step').css('height',screenH_win)
	$('.prj_2Step').css('height',screenH_win)
	$('.prj_3Step').css('height',screenH_win)
	$('.prj_4Step').css('height',screenH_win)
	$('.prj_5Step').css('height',screenH_win)
	$('.prj_6Step').css('height',screenH_win)
	$('.prj_7Step').css('height',screenH_win)
	$('.prj_8Step').css('height',screenH_win)
	$('.prj2_1Step').css('height',screenH_win)
	$('.prj2_2Step').css('height',screenH_win)
	$('.prj2_3Step').css('height',screenH_win)
	$('.prj2_4Step').css('height',screenH_win)
	$('.prj2_5Step').css('height',screenH_win)
	$('.prj2_6Step').css('height',screenH_win)
	$('.prj2_7Step').css('height',screenH_win)
	$('.prj2_8Step').css('height',screenH_win)


	var main_img_div_img_H = parseFloat($('.main_img div img').css('height'))/2
	$('.main_img p').css('top',main_img_div_img_H-70)
	$('.main_img span').css('top',main_img_div_img_H+20)
	$('.main_img i').css('top',main_img_div_img_H+20)
	var main_misIMG_H = parseFloat( $('.main_mission_bg img').css('height') ) /2
	$('.main_mission').css('top',main_misIMG_H-70)
	$('.main_mission_txt').css('top',main_misIMG_H-40)
	$('.main_missionBox i').css('top',main_misIMG_H-10)
	var maICO_W = parseFloat($('.ma_ico_1').css('width'))/2
	$('.ma_ico_1').css('marginLeft',-maICO_W)
	var maICO_W2 = parseFloat($('.ma_ico_2').css('width'))/2
	$('.ma_ico_2').css('marginLeft',-maICO_W2)	

	if(screenW <= 400 && screenW > 0){
		$('.main_img div').find('img').attr('src','/NEW/images/common/main_img2.jpg');
		$('.bodys h1').find('img').attr("src","/NEW/images/common/logo_small.png")
		$('.mobile_home_btn a').find('img').attr("src","/NEW/images/common/mobile_small_btn.png")
		$('.m_close p a img').attr("src","/NEW/images/common/mobile_x_small_btn.jpg")		
		$('.main_mission_bg').find('img').attr('src','/NEW/images/kor/main_mission_bg2.jpg');
		var main_misIMG_H2 = parseFloat( $('.main_mission_bg img').css('height') ) /2
		$('.main_img p').find('img').attr('src','/NEW/images/kor/main_txt_differ2.png');
		$('.main_img p').css('marginLeft','-110px');
		
		var ma_DIV_H0 = parseFloat($('.main_img div img').css('height'))/2
		$('.main_img p').css('top',ma_DIV_H0-55)
		$('.main_img i').css('top',ma_DIV_H0-15)
		$('.main_mission').css('top',main_misIMG_H2-50)
		$('.main_missionBox i').css('top',main_misIMG_H2-10)		
		$('.main_blue_box p').find('img').attr('src','/NEW/images/kor/main_color_txt1_.png');
		$('.main_red_box p').find('img').attr('src','/NEW/images/kor/main_color_txt2_.png');		
		$('.main_img div').find('img').attr('src','/NEW/images/common/main_img_none.jpg');
		console.log("380-0 L"+screenW)
	}
	if(screenW <= 667 && screenW > 400){
		$('.main_img div').find('img').attr('src','/NEW/images/common/main_img2.jpg');
		$('.bodys h1').find('img').attr("src","/NEW/images/common/logo.png")
		$('.mobile_home_btn a').find('img').attr("src","/NEW/images/common/mobile_btn.png")
		$('.m_close p a img').attr("src","/NEW/images/common/mobile_x_btn.jpg")
		$('.main_mission_bg').find('img').attr('src','/NEW/images/kor/main_mission_bg2.jpg');
		var main_misIMG_H2 = parseFloat( $('.main_mission_bg img').css('height') ) /2
		$('.main_img p').find('img').attr('src','/NEW/images/kor/main_txt_differ.png');
		$('.main_img p').css('marginLeft','-162px');

		var ma_DIV_H = parseFloat($('.main_img div img').css('height'))/2
		$('.main_img p').css('top',ma_DIV_H-70)
		$('.main_img i').css('top',ma_DIV_H)
		$('.main_mission').css('top',main_misIMG_H2-50)
		$('.main_missionBox i').css('top',main_misIMG_H2-10)
		$('.main_blue_box p').find('img').attr('src','/NEW/images/kor/main_color_txt1_.png');
		$('.main_red_box p').find('img').attr('src','/NEW/images/kor/main_color_txt2_.png');
		$('.main_img div').find('img').attr('src','/NEW/images/common/main_img_none.jpg');
		console.log("667-380 L"+screenW)
		

	}if(screenW <= 940 && screenW > 667){ 
		$('.main_img div').find('img').attr('src','/NEW/images/common/main_img2.jpg');
		$('.bodys h1').find('img').attr("src","/NEW/images/common/logo.png")
		$('.mobile_home_btn a').find('img').attr("src","/NEW/images/common/mobile_btn.png")
		$('.m_close p a img').attr("src","/NEW/images/common/mobile_x_btn.jpg")
		$('.main_img p').find('img').attr('src','/NEW/images/kor/main_txt_differ.png');
		$('.main_img p').css('marginLeft','-162px');
		var ma_DIV_H1 = parseFloat($('.main_img div img').css('height'))/2
		$('.main_img p').css('top',ma_DIV_H1-70)
		$('.main_img i').css('top',ma_DIV_H1)
		$('.main_mission_bg').find('img').attr('src','/NEW/images/kor/main_mission_bg2.jpg');
		var main_misH2 = parseFloat( $('.main_mission_bg img').css('height') ) /2
		$('.main_mission').css('top',main_misH2-50)
		$('.main_missionBox i').css('top',main_misH2-10)
		$('.main_img div').find('img').attr('src','/NEW/images/common/main_img_none.jpg');
		
		console.log("940-667 L"+screenW)
	}if(screenW > 940){
		$('.bodys h1').find('img').attr("src","/NEW/images/common/logo.png")
		$('.mobile_home_btn a').find('img').attr("src","/NEW/images/common/mobile_btn.png")
		$('.m_close p a img').attr("src","/NEW/images/common/mobile_x_btn.jpg")
		$('.main_img p').find('img').attr('src','/NEW/images/kor/main_txt_differ.png');
		$('.main_img p').css('marginLeft','-162px');
		$('.main_mission_bg').find('img').attr('src','/NEW/images/kor/main_mission_bg.jpg');
		$('.main_img div').find('img').attr('src','/NEW/images/common/main_img_none.jpg');
		console.log("940 Over L"+screenW)
	}if(screenW < 1600){
		$('.main_img div').find('img').attr('src','/NEW/images/common/main_img_none.jpg');
	}if(screenW >= 1600){
		$('.main_img div').find('img').attr('src','/NEW/images/common/main_img.jpg');
	}


}); //load

$(window).bind("resize",function(){ 
	var screenH = $(window).height();
	var screenW = $(window).width();
	var screenH_win = $(document).height() 
	var screenW_win = $(document).width() 
	$('.prj_1Step').css('height',screenH_win)
	$('.prj_2Step').css('height',screenH_win)
	$('.prj_3Step').css('height',screenH_win)
	$('.prj_4Step').css('height',screenH_win)
	$('.prj_5Step').css('height',screenH_win)
	$('.prj_6Step').css('height',screenH_win)
	$('.prj_7Step').css('height',screenH_win)
	$('.prj_8Step').css('height',screenH_win)
	$('.prj2_1Step').css('height',screenH_win)
	$('.prj2_2Step').css('height',screenH_win)
	$('.prj2_3Step').css('height',screenH_win)
	$('.prj2_4Step').css('height',screenH_win)
	$('.prj2_5Step').css('height',screenH_win)
	$('.prj2_6Step').css('height',screenH_win)
	$('.prj2_7Step').css('height',screenH_win)
	$('.prj2_8Step').css('height',screenH_win)


	var main_img_div_img_H = parseFloat($('.main_img div img').css('height'))/2
	$('.main_img p').css('top',main_img_div_img_H-70)
	$('.main_img span').css('top',main_img_div_img_H+20)
	$('.main_img i').css('top',main_img_div_img_H+20)
	var main_misIMG_H = parseFloat( $('.main_mission_bg img').css('height') ) /2
	$('.main_mission').css('top',main_misIMG_H-70)
	$('.main_mission_txt').css('top',main_misIMG_H-40)
	$('.main_missionBox i').css('top',main_misIMG_H-10)
	var maICO_W = parseFloat($('.ma_ico_1').css('width'))/2
	$('.ma_ico_1').css('marginLeft',-maICO_W)
	var maICO_W2 = parseFloat($('.ma_ico_2').css('width'))/2
	$('.ma_ico_2').css('marginLeft',-maICO_W2)	

	if(screenW <= 400 && screenW > 0){ 
		$('.main_img div').find('img').attr('src','/NEW/images/common/main_img2.jpg');
		$('.bodys h1').find('img').attr("src","/NEW/images/common/logo_small.png")
		$('.mobile_home_btn a').find('img').attr("src","/NEW/images/common/mobile_small_btn.png")
		$('.m_close p a img').attr("src","/NEW/images/common/mobile_x_small_btn.jpg")		
		$('.main_mission_bg').find('img').attr('src','/NEW/images/kor/main_mission_bg2.jpg');
		var main_misIMG_H2 = parseFloat( $('.main_mission_bg img').css('height') ) /2
		$('.main_img p').find('img').attr('src','/NEW/images/kor/main_txt_differ2.png');
		$('.main_img p').css('marginLeft','-110px');
		
		var ma_DIV_H0 = parseFloat($('.main_img div img').css('height'))/2
		$('.main_img p').css('top',ma_DIV_H0-55)
		$('.main_img i').css('top',ma_DIV_H0-15)
		$('.main_mission').css('top',main_misIMG_H2-50)
		$('.main_missionBox i').css('top',main_misIMG_H2-10)		
		$('.main_blue_box p').find('img').attr('src','/NEW/images/kor/main_color_txt1_.png');
		$('.main_red_box p').find('img').attr('src','/NEW/images/kor/main_color_txt2_.png');		
		$('.main_img div').find('img').attr('src','/NEW/images/common/main_img_none.jpg');
		console.log("380-0 L"+screenW)
	}
	if(screenW <= 667 && screenW > 400){ 
		$('.main_img div').find('img').attr('src','/NEW/images/common/main_img2.jpg');
		$('.bodys h1').find('img').attr("src","/NEW/images/common/logo.png")
		$('.mobile_home_btn a').find('img').attr("src","/NEW/images/common/mobile_btn.png")
		$('.m_close p a img').attr("src","/NEW/images/common/mobile_x_btn.jpg")
		$('.main_mission_bg').find('img').attr('src','/NEW/images/kor/main_mission_bg2.jpg');
		var main_misIMG_H2 = parseFloat( $('.main_mission_bg img').css('height') ) /2
		$('.main_img p').find('img').attr('src','/NEW/images/kor/main_txt_differ.png');
		$('.main_img p').css('marginLeft','-162px');

		var ma_DIV_H = parseFloat($('.main_img div img').css('height'))/2
		$('.main_img p').css('top',ma_DIV_H-70)
		$('.main_img i').css('top',ma_DIV_H)
		$('.main_mission').css('top',main_misIMG_H2-50)
		$('.main_missionBox i').css('top',main_misIMG_H2-10)
		$('.main_blue_box p').find('img').attr('src','/NEW/images/kor/main_color_txt1_.png');
		$('.main_red_box p').find('img').attr('src','/NEW/images/kor/main_color_txt2_.png');
		$('.main_img div').find('img').attr('src','/NEW/images/common/main_img_none.jpg');
		console.log("667-380 L"+screenW)
		

	}if(screenW <= 940 && screenW > 667){ 
		$('.main_img div').find('img').attr('src','/NEW/images/common/main_img2.jpg');
		$('.bodys h1').find('img').attr("src","/NEW/images/common/logo.png")
		$('.mobile_home_btn a').find('img').attr("src","/NEW/images/common/mobile_btn.png")
		$('.m_close p a img').attr("src","/NEW/images/common/mobile_x_btn.jpg")
		$('.main_img p').find('img').attr('src','/NEW/images/kor/main_txt_differ.png');
		$('.main_img p').css('marginLeft','-162px');
		var ma_DIV_H1 = parseFloat($('.main_img div img').css('height'))/2
		$('.main_img p').css('top',ma_DIV_H1-70)
		$('.main_img i').css('top',ma_DIV_H1)
		$('.main_mission_bg').find('img').attr('src','/NEW/images/kor/main_mission_bg2.jpg');
		var main_misH2 = parseFloat( $('.main_mission_bg img').css('height') ) /2
		$('.main_mission').css('top',main_misH2-50)
		$('.main_missionBox i').css('top',main_misH2-10)
		$('.main_img div').find('img').attr('src','/NEW/images/common/main_img_none.jpg');
		
		console.log("940-667 L"+screenW)
	}if(screenW > 940){ 
		$('.bodys h1').find('img').attr("src","/NEW/images/common/logo.png")
		$('.mobile_home_btn a').find('img').attr("src","/NEW/images/common/mobile_btn.png")
		$('.m_close p a img').attr("src","/NEW/images/common/mobile_x_btn.jpg")
		$('.main_img p').find('img').attr('src','/NEW/images/kor/main_txt_differ.png');
		$('.main_img p').css('marginLeft','-162px');
		$('.main_mission_bg').find('img').attr('src','/NEW/images/kor/main_mission_bg.jpg');
		$('.main_img div').find('img').attr('src','/NEW/images/common/main_img_none.jpg');
		console.log("940 Over L"+screenW)
	}if(screenW < 1600){
		$('.main_img div').find('img').attr('src','/NEW/images/common/main_img_none.jpg');
	}if(screenW >= 1600){
		$('.main_img div').find('img').attr('src','/NEW/images/common/main_img.jpg');
	}


}); //resize






var util = "close"
$('.util_open_K a').bind("click", function(){	
	if(util == "close"){		
		$('#langSelect').css('display','block').animate({height:60},1200,"easeOutCubic")
		util = "open"
		$('.util_open_K > a > img').attr('src','/NEW/images/common/btn_A_kor_.png');
	}else if(util == "open"){
		$('#langSelect').stop().animate({height:0},200,"easeInCubic",function(){ $('#langSelect').css('display','none')})
		util = "close"
		$('.util_open_K > a > img').attr('src','/NEW/images/common/btn_A_kor.png');
	}
});


var Mutil = "close"
$('.mm_language a').bind("click", function(){	
	if(Mutil == "close"){		
		$('.mobile_menu .nn_language').animate({height:25},1000,"easeOutCubic")
		Mutil = "open"		
	}else if(Mutil == "open"){
		$('.mobile_menu .nn_language').stop().animate({height:0},600,"easeInOutCubic")
		Mutil = "close"	
	}
});





// 직무소개
var zik1 = "off"
$('.zzikLI_1 a').bind("click", function(){	
	if(zik1=="off"){
		$('.zzikLI_1 p').css('display','block').css('opacity','0').animate({opacity:100},1300);	
		$('.zzikLI_2 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_3 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_4 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_5 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_6 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_7 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_8 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_9 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		zik1="on";zik2="off";zik3="off";zik4="off";zik5="off";zik6="off";zik7="off";zik8="off";zik9="off";
	}else if(zik1=="on"){
		$('.zzikLI_1 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		zik1="off";
	}
	return false;
});
var zik2 = "off"
$('.zzikLI_2 a').bind("click", function(){	
	if(zik2=="off"){
		$('.zzikLI_1 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_2 p').css('display','block').css('opacity','0').animate({opacity:100},1300);	
		$('.zzikLI_3 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_4 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_5 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_6 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_7 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_8 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_9 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		zik1="off";zik2="on";zik3="off";zik4="off";zik5="off";zik6="off";zik7="off";zik8="off";zik9="off";
	}else if(zik2=="on"){
		$('.zzikLI_2 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});		
		zik2="off";
	}
	return false;
});
var zik3 = "off"
$('.zzikLI_3 a').bind("click", function(){	
	if(zik3=="off"){
		$('.zzikLI_1 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_2 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_3 p').css('display','block').css('opacity','0').animate({opacity:100},1300);	
		$('.zzikLI_4 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_5 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_6 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_7 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_8 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_9 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		zik1="off";zik2="off";zik3="on";zik4="off";zik5="off";zik6="off";zik7="off";zik8="off";zik9="off";
	}else if(zik3=="on"){
		$('.zzikLI_3 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});		
		zik3="off";
	}
	return false;
});
var zik4 = "off"
$('.zzikLI_4 a').bind("click", function(){	
	if(zik4=="off"){
		$('.zzikLI_1 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_2 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_3 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_4 p').css('display','block').css('opacity','0').animate({opacity:100},1300);	
		$('.zzikLI_5 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_6 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_7 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_8 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_9 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zikIcons ul').css('padding-bottom','150px');	//유튜브 안짤리도록 추가
		zik1="off";zik2="off";zik3="off";zik4="on";zik5="off";zik6="off";zik7="off";zik8="off";zik9="off";
	}else if(zik4=="on"){
		$('.zzikLI_4 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});	
		$('.zikIcons ul').css('padding-bottom','70px');	//유튜브 안짤리도록 추가
		zik4="off";
	}
	return false;
});
var zik5 = "off"
$('.zzikLI_5 a').bind("click", function(){	
	if(zik5=="off"){
		$('.zzikLI_1 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_2 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_3 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_4 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_5 p').css('display','block').css('opacity','0').animate({opacity:100},1300);	
		$('.zzikLI_6 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_7 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_8 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_9 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zikIcons ul').css('padding-bottom','150px');	//유튜브 안짤리도록 추가
		zik1="off";zik2="off";zik3="off";zik4="off";zik5="on";zik6="off";zik7="off";zik8="off";zik9="off";
	}else if(zik5=="on"){
		$('.zzikLI_5 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});	
		$('.zikIcons ul').css('padding-bottom','70px');	//유튜브 안짤리도록 추가	
		zik5="off";
	}
	return false;
});
var zik6 = "off"
$('.zzikLI_6 a').bind("click", function(){	
	if(zik6=="off"){
		$('.zzikLI_1 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_2 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_3 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_4 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_5 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_6 p').css('display','block').css('opacity','0').animate({opacity:100},1300);	
		$('.zzikLI_7 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_8 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_9 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		zik1="off";zik2="off";zik3="off";zik4="off";zik5="off";zik6="on";zik7="off";zik8="off";zik9="off";
	}else if(zik6=="on"){
		$('.zzikLI_6 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});		
		zik6="off";
	}
	return false;
});
var zik7 = "off"
$('.zzikLI_7 a').bind("click", function(){	
	if(zik7=="off"){
		$('.zzikLI_1 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_2 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_3 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_4 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_5 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_6 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_7 p').css('display','block').css('opacity','0').animate({opacity:100},1300);	
		$('.zzikLI_8 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_9 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zikIcons ul').css('padding-bottom','400px');	//유튜브 안짤리도록 추가
		zik1="off";zik2="off";zik3="off";zik4="off";zik5="off";zik6="off";zik7="on";zik8="off";zik9="off";
	}else if(zik7=="on"){
		$('.zzikLI_7 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});	
		$('.zikIcons ul').css('padding-bottom','70px');	//유튜브 안짤리도록 추가	
		zik7="off";
	}
	return false;
});
var zik8 = "off"
$('.zzikLI_8 a').bind("click", function(){	
	if(zik8=="off"){
		$('.zzikLI_1 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_2 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_3 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_4 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_5 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_6 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_7 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_8 p').css('display','block').css('opacity','0').animate({opacity:100},1300);	
		$('.zzikLI_9 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zikIcons ul').css('padding-bottom','400px');	//유튜브 안짤리도록 추가
		zik1="off";zik2="off";zik3="off";zik4="off";zik5="off";zik6="off";zik7="off";zik8="on";zik9="off";
	}else if(zik8=="on"){
		$('.zzikLI_8 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});	
		$('.zikIcons ul').css('padding-bottom','70px');	//유튜브 안짤리도록 추가	
		zik8="off";
	}
	return false;
});
var zik9 = "off"
$('.zzikLI_9 a').bind("click", function(){	
	if(zik9=="off"){
		$('.zzikLI_1 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_2 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_3 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_4 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_5 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_6 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_7 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_8 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.zzikLI_9 p').css('display','block').css('opacity','0').animate({opacity:100},1300);	
		$('.zikIcons ul').css('padding-bottom','400px');	//유튜브 안짤리도록 추가
		zik1="off";zik2="off";zik3="off";zik4="off";zik5="off";zik6="off";zik7="off";zik8="off";zik9="on";
	}else if(zik9=="on"){
		$('.zzikLI_9 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});	
		$('.zikIcons ul').css('padding-bottom','70px');	//유튜브 안짤리도록 추가	
		zik9="off";
	}
	return false;
});




















var kyo1 = "off"
$('.edu_L1 a').bind("click", function(){	
	if(kyo1=="off"){
		$('.edu_L1 p').css('display','block').css('opacity','0').animate({opacity:100},1300);	
		$('.edu_L2 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.edu_L3 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.edu_L4 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.edu_L5 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.edu_L6 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});		
		kyo1="on";kyo2="off";kyo3="off";kyo4="off";kyo5="off";kyo6="off";
	}else if(kyo1=="on"){
		$('.edu_L1 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		kyo1="off";
	}
	return false;
});
var kyo2 = "off"
$('.edu_L2 a').bind("click", function(){	
	if(kyo2=="off"){
		$('.edu_L1 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.edu_L2 p').css('display','block').css('opacity','0').animate({opacity:100},1300);	
		$('.edu_L3 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.edu_L4 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.edu_L5 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.edu_L6 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});		
		kyo1="off";kyo2="on";kyo3="off";kyo4="off";kyo5="off";kyo6="off";
	}else if(kyo2=="on"){
		$('.edu_L2 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});		
		kyo2="off";
	}
	return false;
});
var kyo3 = "off"
$('.edu_L3 a').bind("click", function(){	
	if(kyo3=="off"){
		$('.edu_L1 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.edu_L2 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.edu_L3 p').css('display','block').css('opacity','0').animate({opacity:100},1300);	
		$('.edu_L4 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.edu_L5 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.edu_L6 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});		
		kyo1="off";kyo2="off";kyo3="on";kyo4="off";kyo5="off";kyo6="off";
	}else if(kyo3=="on"){
		$('.edu_L3 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});		
		kyo3="off";
	}
	return false;
});
var kyo4 = "off"
$('.edu_L4 a').bind("click", function(){	
	if(kyo4=="off"){
		$('.edu_L1 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.edu_L2 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.edu_L3 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.edu_L4 p').css('display','block').css('opacity','0').animate({opacity:100},1300);	
		$('.edu_L5 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.edu_L6 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});		
		kyo1="off";kyo2="off";kyo3="off";kyo4="on";kyo5="off";kyo6="off";
	}else if(kyo4=="on"){
		$('.edu_L4 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});		
		kyo4="off";
	}
	return false;
});
var kyo5 = "off"
$('.edu_L5 a').bind("click", function(){	
	if(kyo5=="off"){
		$('.edu_L1 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.edu_L2 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.edu_L3 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.edu_L4 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.edu_L5 p').css('display','block').css('opacity','0').animate({opacity:100},1300);	
		$('.edu_L6 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});		
		kyo1="off";kyo2="off";kyo3="off";kyo4="off";kyo5="on";kyo6="off";
	}else if(kyo5=="on"){
		$('.edu_L5 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});		
		kyo5="off";
	}
	return false;
});
var kyo6 = "off"
$('.edu_L6 a').bind("click", function(){	
	if(kyo6=="off"){
		$('.edu_L1 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.edu_L2 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.edu_L3 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.edu_L4 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.edu_L5 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});
		$('.edu_L6 p').css('display','block').css('opacity','0').animate({opacity:100},1300);		
		kyo1="off";kyo2="off";kyo3="off";kyo4="off";kyo5="off";kyo6="on";
	}else if(kyo6=="on"){
		$('.edu_L6 p').stop().animate({opacity:0},200,function(){$(this).css('display','none')});		
		kyo6="off";
	}
	return false;
});












$(".peopleUL li a").on("mouseenter", function(){
	if($(this).find('img').length > 0){
			$(this).find('img').attr('src', $(this).find('img').attr('src').replace('_g_','_c_'));
			$(this).find('p').css('backgroundColor','#7e7e7e').css('color','white')
			$(this).find('b').css('color','white')
			$(this).find('span').css('color','white')
		}
});

$(".peopleUL li a").on("mouseleave", function(){
	if($(this).find('img').length > 0){
			$(this).find('img').attr('src', $(this).find('img').attr('src').replace('_c_','_g_'));
			$(this).find('p').css('backgroundColor','#e8e8e8')
			$(this).find('b').css('color','black')
			$(this).find('span').css('color','#626262')
		}
});

$(".peopleUL2 li a").on("mouseenter", function(){
	if($(this).find('img').length > 0){
			$(this).find('img').attr('src', $(this).find('img').attr('src').replace('_g_','_c_'));
			$(this).find('p').css('backgroundColor','#7e7e7e').css('color','white')
			$(this).find('b').css('color','white')
			$(this).find('span').css('color','white')
		}
});



$(".peopleUL2 li a").on("mouseleave", function(){
	if($(this).find('img').length > 0){
			$(this).find('img').attr('src', $(this).find('img').attr('src').replace('_c_','_g_'));
			$(this).find('p').css('backgroundColor','#e8e8e8')
			$(this).find('b').css('color','black')
			$(this).find('span').css('color','#626262')
		}
});



$('.gall_close').bind("click", function(){
	$('.prj_1Step').css('display','none');
	$('.prj_2Step').css('display','none');
	$('.prj_3Step').css('display','none');
	$('.prj_4Step').css('display','none');
	$('.prj_5Step').css('display','none');
	$('.prj_6Step').css('display','none');
	$('.prj_7Step').css('display','none');
	$('.prj_8Step').css('display','none');
	$('.prj2_1Step').css('display','none');
	$('.prj2_2Step').css('display','none');
	$('.prj2_3Step').css('display','none');
	$('.prj2_4Step').css('display','none');
	$('.prj2_5Step').css('display','none');
	$('.prj2_6Step').css('display','none');
	$('.prj2_7Step').css('display','none');
	$('.prj2_8Step').css('display','none');


});

$('.peopleBtn1').bind("click", function(){
	$('.prj_1Step').css('display','block');
});
$('.peopleBtn2').bind("click", function(){
	$('.prj_2Step').css('display','block');
});
$('.peopleBtn3').bind("click", function(){
	$('.prj_3Step').css('display','block');
});
$('.peopleBtn4').bind("click", function(){
	$('.prj_4Step').css('display','block');
});
$('.peopleBtn5').bind("click", function(){
	$('.prj_5Step').css('display','block');
});
$('.peopleBtn6').bind("click", function(){
	$('.prj_6Step').css('display','block');
});
$('.peopleBtn7').bind("click", function(){
	$('.prj_7Step').css('display','block');
});
$('.peopleBtn8').bind("click", function(){
	$('.prj_8Step').css('display','block');
});



$('.people2Btn1').bind("click", function(){
	$('.prj2_1Step').css('display','block');
});
$('.people2Btn2').bind("click", function(){
	$('.prj2_2Step').css('display','block');
});
$('.people2Btn3').bind("click", function(){
	$('.prj2_3Step').css('display','block');
});
$('.people2Btn4').bind("click", function(){
	$('.prj2_4Step').css('display','block');
});
$('.people2Btn5').bind("click", function(){
	$('.prj2_5Step').css('display','block');
});
$('.people2Btn6').bind("click", function(){
	$('.prj2_6Step').css('display','block');
});
$('.people2Btn7').bind("click", function(){
	$('.prj2_7Step').css('display','block');
});
$('.people2Btn8').bind("click", function(){
	$('.prj2_8Step').css('display','block');
});




/*var gnb = {
	wrap : $('.gnb'),
	oneDepth : $('.gnb > li'),
	twoDepth : $('.gnb > li > ul > li'),
	speed : 300, // 속도
	ease : 'easeOutCirc' // easing
}

var gnb_reset = function(){
	$('.gnb > li.on').removeClass('on')
	.find('> a').css('border-color','#fff')
	.find('+ ul').stop().slideUp({duration:gnb.speed,easing:gnb.ease});
}

gnb.oneDepth.bind('mouseenter',function(){
	gnb_reset();
	$(this).addClass('on')
	.find('> a').css('border-color','#fff')
	.find('+ ul').slideDown({duration:gnb.speed,easing:gnb.ease});
});

gnb.twoDepth.hover(
function(){
	$(this).css('background-color','#fff');
},
function(){
	$(this).css('background-color','#fff');
});

gnb.wrap.bind('mouseleave',function(){
	gnb_reset();
});*/









































































//연 GNB메뉴
	var menu=1;
	var sub=1;
	
	function hide(){
		if(menu && sub){
			$(".GNB .active").next().css('display', 'block');
			$(".GNB .active").next().stop().animate({'top': '34px', 'opacity': 0}, 300);
			$(".GNB .active").removeClass("active");
		}
	}

	$(".GNB>li>a").bind("mouseover focus",function(){
		$(".GNB .active").next().css('display', 'none');
		$(".GNB .active").next().stop().animate({'top': '22px', 'opacity': 0}, 300);
		$(".GNB .active").removeClass("active");
		$(this).addClass("active");
		$(this).next().css('display','block');
		$(this).next().stop().animate({'top': '38px', 'opacity': '1'}, 300,"easeOutCubic")
	})

	$(".GNB").mouseenter(function(){
		menu=0;
	});
	$(".GNB ul").mouseenter(function(){
		sub=0;
	});
	
	$(".GNB").mouseleave(function(){
		menu=1;
		setTimeout(hide,500);
	});
	$(".GNB ul").mouseleave(function(){
		sub=1;
		setTimeout(hide,500);
	});

	$('.GNB ul a').on('mouseenter', function(){
		$(this).find('img').attr('src', $(this).find('img').attr('src').replace('_e_','_k_'));
	});

	$('.GNB ul a').on('mouseleave', function(){
		$(this).find('img').attr('src', $(this).find('img').attr('src').replace('_k_','_e_'));
	});
//연 GNB메뉴 끝


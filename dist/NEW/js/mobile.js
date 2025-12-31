var black_coverH = $(".black_cover").css("height")
$(".mm_back").css("height",black_coverH)
$(window).bind("load",function(){ 
	var black_coverH = $(document).height()
	$(".mm_back").css("height",black_coverH)
	
}); 


$(".mobile_home_btn").bind("click",function(){
	$('.mobile_menu').css('display','block');
	$('.mobile_menu').animate({right:0},200,"easeOutCubic");
	$('.black_cover').css('display','block');
	$('.black_cover').animate({opacity:0.8},300,"easeInOutQuad");

	return false;
});

$(".m_close a").bind("click",function(){ 
	$('.mobile_menu').animate({right:-323},500,"easeInOutCubic",function(){
		$(this).css('display','none');
	});
	$('.black_cover').animate({opacity:0},500,"easeInQuad",function(){
		$(this).css('display','none');
	});
	$(".menu1_x").animate({height:0},600,"easeOutCubic")
	$(".menu2_x").animate({height:0},600,"easeOutCubic")
	$(".menu3_x").animate({height:0},600,"easeOutCubic")
	$(".menu4_x").animate({height:0},600,"easeOutCubic")
	$(".menu5_x").animate({height:0},600,"easeOutCubic")
	m_menu01="close"
	m_menu02="close"
	m_menu03="close"
	m_menu04="close"
	m_menu05="close"
	return false;
});

var m_menu01="close"; var m_menu02="close"; 
var m_menu03="close"; var m_menu04="close"; var m_menu05="close"; var m_menu06="close"



$(".menu1 a").bind("click",function(){
	if(m_menu01=="close"||m_menu02=="open"||m_menu03=="open"||m_menu04=="open"||m_menu05=="open"||m_menu06=="open"){
		$(".menu1_x").animate({height:110},600,"easeOutCubic")
		$(".menu2_x").animate({height:0},600,"easeOutCubic")
		$(".menu3_x").animate({height:0},600,"easeOutCubic")
		$(".menu4_x").animate({height:0},600,"easeOutCubic")
		$(".menu5_x").animate({height:0},600,"easeOutCubic")
		$(".menu6_x").animate({height:0},600,"easeOutCubic")

		m_menu01="open"; m_menu02="close"; m_menu03="close"; m_menu04="close";m_menu05="close";m_menu06="close";
	}else if(m_menu01=="open"){
		$(".menu1_x").stop().animate({height:0},700,"easeOutCubic")
		m_menu01="close"
	}
	return false;
});
$(".menu2 a").bind("click",function(){
	if(m_menu01=="open"||m_menu02=="close"||m_menu03=="open"||m_menu04=="open"||m_menu05=="open"||m_menu06=="open"){
		$(".menu2_x").animate({height:110},600,"easeOutCubic")
		$(".menu1_x").animate({height:0},600,"easeOutCubic")
		$(".menu3_x").animate({height:0},600,"easeOutCubic")
		$(".menu4_x").animate({height:0},600,"easeOutCubic")
		$(".menu5_x").animate({height:0},600,"easeOutCubic")
		$(".menu6_x").animate({height:0},600,"easeOutCubic")
		m_menu01="close"; m_menu02="open"; m_menu03="close"; m_menu04="close";m_menu05="close";m_menu06="close";
	}else if(m_menu02=="open"){
		$(".menu2_x").stop().animate({height:0},700,"easeOutCubic")
		m_menu02="close"
	}
	return false;
});
$(".menu3 a").bind("click",function(){
	if(m_menu01=="open"||m_menu02=="open"||m_menu03=="close"||m_menu04=="open"||m_menu05=="open"||m_menu06=="open"){
		$(".menu3_x").animate({height:70},600,"easeOutCubic")
		$(".menu2_x").animate({height:0},600,"easeOutCubic")
		$(".menu1_x").animate({height:0},600,"easeOutCubic")
		$(".menu4_x").animate({height:0},600,"easeOutCubic")
		$(".menu5_x").animate({height:0},600,"easeOutCubic")
		$(".menu6_x").animate({height:0},600,"easeOutCubic")
		m_menu01="close"; m_menu02="close"; m_menu03="open"; m_menu04="close";m_menu05="close";m_menu06="close";
	}else if(m_menu03=="open"){
		$(".menu3_x").stop().animate({height:0},700,"easeOutCubic")
		m_menu03="close"
	}
	return false;
});
$(".menu4 a").bind("click",function(){
	if(m_menu01=="open"||m_menu02=="open"||m_menu03=="open"||m_menu04=="close"||m_menu05=="open"||m_menu06=="open"){
		$(".menu4_x").animate({height:230},600,"easeOutCubic")
		$(".menu1_x").animate({height:0},600,"easeOutCubic")
		$(".menu2_x").animate({height:0},600,"easeOutCubic")
		$(".menu3_x").animate({height:0},600,"easeOutCubic")
		$(".menu5_x").animate({height:0},600,"easeOutCubic")
		$(".menu6_x").animate({height:0},600,"easeOutCubic")
		m_menu01="close"; m_menu02="close"; m_menu03="close"; m_menu04="open";m_menu05="close";m_menu06="close";
	}else if(m_menu04=="open"){
		$(".menu4_x").stop().animate({height:0},700,"easeOutCubic")
		m_menu04="close"
	}
	return false;
});
$(".menu5 a").bind("click",function(){
	if(m_menu01=="open"||m_menu02=="open"||m_menu03=="open"||m_menu04=="open"||m_menu05=="close"||m_menu06=="open"){
		$(".menu5_x").animate({height:75},600,"easeOutCubic")
		$(".menu1_x").animate({height:0},600,"easeOutCubic")
		$(".menu2_x").animate({height:0},600,"easeOutCubic")
		$(".menu3_x").animate({height:0},600,"easeOutCubic")
		$(".menu4_x").animate({height:0},600,"easeOutCubic")
		$(".menu6_x").animate({height:0},600,"easeOutCubic")
		m_menu01="close"; m_menu02="close"; m_menu03="close"; m_menu04="close";m_menu05="open";m_menu06="close";
	}else if(m_menu05=="open"){
		$(".menu5_x").stop().animate({height:0},700,"easeOutCubic")
		m_menu05="close"
	}
	return false;
});
$(".menu6 a").bind("click",function(){
	if(m_menu01=="open"||m_menu02=="open"||m_menu03=="open"||m_menu04=="open"||m_menu05=="open"||m_menu06=="close"){
		$(".menu6_x").animate({height:140},600,"easeOutCubic")
		$(".menu1_x").animate({height:0},600,"easeOutCubic")
		$(".menu2_x").animate({height:0},600,"easeOutCubic")
		$(".menu3_x").animate({height:0},600,"easeOutCubic")
		$(".menu4_x").animate({height:0},600,"easeOutCubic")
		$(".menu5_x").animate({height:0},600,"easeOutCubic")
		m_menu01="close"; m_menu02="close"; m_menu03="close"; m_menu04="close";m_menu05="close";m_menu06="open";
	}else if(m_menu06=="open"){
		$(".menu6_x").stop().animate({height:0},700,"easeOutCubic")
		m_menu06="close"
	}
	return false;
});

$(".mm_customer a").bind("click",function(){
	if(m_menu05=="close"){
		$(".mm_customer_x").show(400);
		$(".mm_gameng_x").hide(400);
		$(".mm_service_x").hide(400);
		$(".mm_product_x").hide(400);
		$(".mm_specom_x").hide(400);
		m_menu05="open"
	}else if(m_menu05=="open"){
		$(".mm_customer_x").hide(400);
		m_menu05="close"
	}
	return false;
});



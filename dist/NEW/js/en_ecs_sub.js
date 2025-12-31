///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////   LOAD   //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
(function($){
	var screenH = $(window).height();
	var screenW = $(window).width();
	var screenH_win = $(document).height() //
	var screenW_win = $(document).width() 
	if(screenW <= 380 && screenW > 0){ //$('.subpage_img div').find('img').attr('src', $('.subpage_img div').find('img').attr('src').replace('_e_','_k_'));
		if($('.subpage_img div').length > 0){$('.subpage_img div').find('img').attr('src', $('.subpage_img div').find('img').attr('src').replace('_e_','_k_'));	}		
		//var subTopImg_H3 = parseFloat($('.subpage_img div img').css('height'))/2
		//$('.subpage_img p').css('top',subTopImg_H3-10)
		$('.subpage_img p').css('top','50%')
		$('.subpage_img p').css('marginTop','-10px')
		
			}
	if(screenW <= 667 && screenW > 380){ //
		//$('.subpage_img div').find('img').attr('src', $('.subpage_img div').find('img').attr('src').replace('_e_','_k_'));
		if($('.subpage_img div').length > 0){
		$('.subpage_img div').find('img').attr('src', $('.subpage_img div').find('img').attr('src').replace('_e_','_k_'));	}
		$('.subpage_img p').css('top','50%')
		$('.subpage_img p').css('marginTop','-10px')
	}if(screenW <= 940 && screenW > 667){ 

		//$('.subpage_img div').find('img').attr('src', $('.subpage_img div').find('img').attr('src').replace('_e_','_k_'));
		if($('.subpage_img div').length > 0){
				$('.subpage_img div').find('img').attr('src', $('.subpage_img div').find('img').attr('src').replace('_e_','_k_'));	}
		$('.subpage_img p').css('top','50%')
		$('.subpage_img p').css('marginTop','-10px')		
		console.log("940-667 L"+screenW)
	}if(screenW > 940){ 
		//$('.subpage_img div').find('img').attr('src', $('.subpage_img div').find('img').attr('src').replace('_k_','_e_'));
		if($('.subpage_img div').length > 0){
				$('.subpage_img div').find('img').attr('src', $('.subpage_img div').find('img').attr('src').replace('_k_','_e_'));}
		$('.subpage_img p').css('top','50%')
		$('.subpage_img p').css('marginTop','-10px')
		console.log("940 Over L"+screenW)
	}

}) (jQuery) 



$(window).bind("load",function(){ 
	var screenH = $(window).height();
	var screenW = $(window).width();
	var screenH_win = $(document).height() //
	var screenW_win = $(document).width() 
	if(screenW <= 380 && screenW > 0){ //
		//$('.subpage_img div').find('img').attr('src', $('.subpage_img div').find('img').attr('src').replace('_e_','_k_'));
		if($('.subpage_img div').length > 0){
				$('.subpage_img div').find('img').attr('src', $('.subpage_img div').find('img').attr('src').replace('_e_','_k_'));
			}		
		//var subTopImg_H3 = parseFloat($('.subpage_img div img').css('height'))/2
		//$('.subpage_img p').css('top',subTopImg_H3-10)
		$('.subpage_img p').css('top','50%')$('.subpage_img p').css('marginTop','-10px')
	}
	if(screenW <= 667 && screenW > 380){ 
		//$('.subpage_img div').find('img').attr('src', $('.subpage_img div').find('img').attr('src').replace('_e_','_k_'));
		if($('.subpage_img div').length > 0){
			console.log("FFFF")
				$('.subpage_img div').find('img').attr('src', $('.subpage_img div').find('img').attr('src').replace('_e_','_k_'));}
		$('.subpage_img p').css('top','50%')
		$('.subpage_img p').css('marginTop','-10px')
		console.log("667-380 L"+screenW)
	}if(screenW <= 940 && screenW > 667){ 
		//$('.subpage_img div').find('img').attr('src', $('.subpage_img div').find('img').attr('src').replace('_e_','_k_'));
		if($('.subpage_img div').length > 0){
				$('.subpage_img div').find('img').attr('src', $('.subpage_img div').find('img').attr('src').replace('_e_','_k_'));}
		$('.subpage_img p').css('top','50%')
		$('.subpage_img p').css('marginTop','-10px')
		
		console.log("940-667 L"+screenW)
	}if(screenW > 940){ 
		//$('.subpage_img div').find('img').attr('src', $('.subpage_img div').find('img').attr('src').replace('_k_','_e_'));
		if($('.subpage_img div').length > 0){
				$('.subpage_img div').find('img').attr('src', $('.subpage_img div').find('img').attr('src').replace('_k_','_e_'));}
		$('.subpage_img p').css('top','50%')
		$('.subpage_img p').css('marginTop','-10px')
		console.log("940 Over L"+screenW)
	}


}); 

$(window).bind("resize",function(){ 
	var screenH = $(window).height();
	var screenW = $(window).width();
	var screenH_win = $(document).height() 
	var screenW_win = $(document).width() 
	if(screenW <= 380 && screenW > 0){ 
	
		//$('.subpage_img div').find('img').attr('src', $('.subpage_img div').find('img').attr('src').replace('_e_','_k_'));
		if($('.subpage_img div').length > 0){
				$('.subpage_img div').find('img').attr('src', $('.subpage_img div').find('img').attr('src').replace('_e_','_k_'));
			}
		$('.subpage_img p').css('top','50%')
		$('.subpage_img p').css('marginTop','-10px')
		console.log("380-0 L"+screenW)
	}
	if(screenW <= 667 && screenW > 380){ 

		//$('.subpage_img div').find('img').attr('src', $('.subpage_img div').find('img').attr('src').replace('_e_','_k_'));
		if($('.subpage_img div').length > 0){
				$('.subpage_img div').find('img').attr('src', $('.subpage_img div').find('img').attr('src').replace('_e_','_k_'));
			}
		$('.subpage_img p').css('top','50%')
		$('.subpage_img p').css('marginTop','-10px')
		console.log("667-380 L"+screenW)
		

	}if(screenW <= 940 && screenW > 667){ 

		//$('.subpage_img div').find('img').attr('src', $('.subpage_img div').find('img').attr('src').replace('_e_','_k_'));
		if($('.subpage_img div').length > 0){
				$('.subpage_img div').find('img').attr('src', $('.subpage_img div').find('img').attr('src').replace('_e_','_k_'));
			}
		$('.subpage_img p').css('top','50%')
		$('.subpage_img p').css('marginTop','-10px')
		
		console.log("940-667 L"+screenW)
	}if(screenW > 940){ 

		//$('.subpage_img div').find('img').attr('src', $('.subpage_img div').find('img').attr('src').replace('_k_','_e_'));
		if($('.subpage_img div').length > 0){
				$('.subpage_img div').find('img').attr('src', $('.subpage_img div').find('img').attr('src').replace('_k_','_e_'));
			}
		$('.subpage_img p').css('top','50%')
		$('.subpage_img p').css('marginTop','-10px')
		console.log("940 Over L"+screenW)
	}


}); 
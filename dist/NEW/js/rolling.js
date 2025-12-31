
(function($){
	// 배경 자동롤링
	var bg = {
		items : $('#bg > ul > li'),
		nums : 0,
		speed : 2500,
		speed_out : 2500,
		interval_ : 5200,
		sizes : $('#bg > ul > li').length
	}
	
	var bg_set = function(){
		bg.items.each(function(index){
			bg_url = $(this).find('img').attr('src');
			$(this).css({
				'background-image':'url('+bg_url+')'
			});	
		});
	}

	var bg_evt = function(){
		bg.nums++;
		before_num = bg.nums-1;
		if(bg.nums >= bg.sizes){
			
			bg.nums = 0;
			before_num = bg.sizes-1;
		}
		
		bg.items.eq(bg.nums).css('z-index','1').fadeIn(bg.speed);
		bg.items.eq(before_num).css('z-index','0').fadeOut(bg.speed_out);
	}
	
	var bg_interval;
	var bg_auto = function(){
		bg_interval = setInterval(bg_evt,bg.interval_);
	}
	
	if($('.main').length > 0){
		bg_auto();
	}
	
	bg_set();
	
	
}) (jQuery);
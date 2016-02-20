function toggleMenu(link_class, sub_menu_class, pic_class){
	$('.'+sub_menu_class).toggle();
}

$(document).ready(function() {
    $(".header-subnav-menu[id*='hs-menu-']").hide();
	
	$('.main-slider .bxslider').bxSlider({
		controls: false
	});
	/*$('.latest-goods-slider .bxslider').bxSlider({
		pager: false,
		infiniteLoop: false,
		controls: true,
		minSlides: 4,
		maxSlides: 4,
		slideWidth: 270,
		slideMargin: 30,
		moveSlides: 1,
	});*/
	
	var lg_slider = $('.latest-goods-slider .bxslider').bxSlider({
		pager: false,
		infiniteLoop: false,
		controls: false,
		pager: true,
		pagerType: 'short',
		minSlides: 4,
		maxSlides: 4,
		slideWidth: 270,
		slideMargin: 30,
		moveSlides: 1,
		onSlideAfter: function(){
			var slides_count = lg_slider.getSlideCount()
			var current_slide = lg_slider.getCurrentSlide() + 1;
			if (current_slide == 1){
				$('#latest-good-prev').removeClass('active');
			} else {
				$('#latest-good-prev').addClass('active');
			}
			if (current_slide  == slides_count){
				$('#latest-good-next').removeClass('active');
			} else {
				$('#latest-good-next').addClass('active');
			}
			console.log(slides_count);
			console.log(current_slide);
		}
	});

	$('#latest-good-next').click(function(){
		lg_slider.goToNextSlide();
		return false;
	});

	$('#latest-good-prev').click(function(){
		lg_slider.goToPrevSlide();
		return false;
	});
});



function toggle(objName) {
    var obj = $(objName),
        blocks = $("div[id*='vipad-']");
    
    if (obj.css("display") != "none") {
        obj.animate({ height: 'hide' }, 500);
    } else {
        var visibleBlocks = $("div[id*='vipad-']:visible");

        if (visibleBlocks.length < 1) {
            obj.animate({ height: 'show' }, 500);
        } else {
            $(visibleBlocks).animate({ height: 'hide' }, 500, function() {
                obj.animate({ height: 'show' }, 500);
            });            
        }
        
    }

}

$(document).mouseup(function (e){ // ������� ����� �� ���-���������
	var div = $(".header-subnav-menu"); // �������
	if (!div.is(e.target) // ���� ���� ��� �� �� �������
		&& div.has(e.target).length === 0 // � �� �� ��� �������� ���������
		&& ($('.header-nav-item').has(e.target).length === 0)){ // � �� �� ������ ����
		div.hide(); // �������� ���
		$('.header-nav-item').removeClass('active');	// ������� ��������� ����
	}
});

function toggleMenu(link_id, sub_menu_id, link_items_class, pic_class){
	if ($('#'+sub_menu_id+':visible').length < 1) {	// ���� ������� ����� ���� �� ������������
		$('.header-nav-item').removeClass('active');	//����� ��������� � ������ �������
		$('.'+link_items_class).hide();	//�������� ������ �������
		$('#'+link_id).addClass('active'); // ���������� ������� ����� ����
		$('#'+sub_menu_id).show();	//���������� ��������� �������
	} else {	// ���� ������ �� ��������� �������
		$('#'+sub_menu_id).hide();	//�������� ���
		$('.header-nav-item').removeClass('active');	//����� ���������
	}
		
}


$(document).ready(function() {
    $(".header-subnav-menu[id*='hs-menu-']").hide();
	
	$('.main-slider .bxslider').bxSlider({
		controls: false,
	});
	
	$('.latest-goods-slider .bxslider').bxSlider({
		pager: false,
		infiniteLoop: false,
		controls: true,
		hideControlOnEnd: true,
		minSlides: 4,
		maxSlides: 4,
		slideWidth: 270,
		slideMargin: 30,
		moveSlides: 1
	});
	
	$('.recommended-goods-slider .bxslider').bxSlider({
		pager: false,
		infiniteLoop: false,
		controls: true,
		hideControlOnEnd: true,
		minSlides: 4,
		maxSlides: 4,
		slideWidth: 270,
		slideMargin: 30,
		moveSlides: 1
	});
	
	brands_visible_count = 6;
	var brands_slider = $('.main-brands-slider .bxslider').bxSlider({
		pager: false,
		infiniteLoop: false,
		controls: false,
		//pagerType: 'short',
		minSlides: brands_visible_count,
		maxSlides: brands_visible_count,
		slideWidth: 180,
		slideMargin: 80,
		moveSlides: 1,
		onSlideAfter: function(){
			activateSlideButton(brands_slider, 'main-brands-prev', 'main-brands-next', brands_visible_count);
		}
	});
	
	$('#main-brands-next').click(function(){
		brands_slider.goToNextSlide();
		return false;
	});

	$('#main-brands-prev').click(function(){
		brands_slider.goToPrevSlide();
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

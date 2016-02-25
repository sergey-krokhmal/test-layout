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
	
	$('.main-slider>.bxslider').bxSlider({
		controls: false,
		auto: true,
		speed: 1500
	});
	
	$('.latest-goods-slider>.bxslider').bxSlider({
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
	
	$('.recommended-goods-slider>.bxslider').bxSlider({
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
	
	$('.goods-item-photo-slider>.bxslider').bxSlider({
		pager: false,
		infiniteLoop: false,
		controls: true,
		hideControlOnEnd: true
	});
	
	$('.main-brands-slider .bxslider').bxSlider({
		pager: false,
		infiniteLoop: false,
		controls: true,
		hideControlOnEnd: true,
		minSlides: 6,
		maxSlides: 6,
		slideWidth: 180,
		slideMargin: 80,
		moveSlides: 1
	});
});

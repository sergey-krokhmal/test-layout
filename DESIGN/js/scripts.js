$(document).mouseup(function (e){ // событие клика по веб-документу
	var div = $(".header-subnav-menu"); // подменю
	if (!div.is(e.target) // если клик был не по подменю
		&& div.has(e.target).length === 0 // и не по его дочерним элементам
		&& ($('.header-nav-item').has(e.target).length === 0)){ // и не по пункту меню
		div.hide(); // скрываем его
		$('.header-nav-item').removeClass('active');	// убираем подсветку меню
	}
});

function toggleMenu(link_id, sub_menu_id, link_items_class, pic_class){
	if ($('#'+sub_menu_id+':visible').length < 1) {	// если текущий пункт меню не отображается
		$('.header-nav-item').removeClass('active');	//снять подсветку с других пунктов
		$('.'+link_items_class).hide();	//спрятать бругие подменю
		$('#'+link_id).addClass('active'); // подсветить текущий пункт меню
		$('#'+sub_menu_id).show();	//отобразить выбранное подменю
	} else {	// если нажали на выбранное подменю
		$('#'+sub_menu_id).hide();	//спрятать его
		$('.header-nav-item').removeClass('active');	//снять подсветку
	}
		
}

function toggle_dropdown(dropdown_list_id, dropdown_img_id){
		$('#'+dropdown_list_id).toggle('500');
		$('#'+dropdown_img_id).toggleClass('dropdown-down');
		$('#'+dropdown_img_id).toggleClass('dropdown-up');
	}

function toggle_class(base_block_id, add_class){
	$('#'+base_block_id).toggleClass(add_class);
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
	
	var options = { active: true, lowercasemodulename: { active: false } };
	$('.cstm-checkbox').cstmForm(options);
	
	$('.price-slider').slider({
		range: true,
		min: 0,
		max: 10000,
		step: 100,
		values: [ 500, 5000 ],
		slide: function( event, ui ) {
			$( ".price-range-left").val(ui.values[ 0 ]);
			$( ".price-range-right").val(ui.values[ 1 ]);
		}
	});
	
	$('.sort-goods-select').selectmenu({
		select: function( event, ui ) {
			$('.ui-selectmenu-button').html('Сортировать по: <b style="color: #2c3e50">'+ui.item.label+'</b>');
		},
		create: function( event, ui ) {
			$('.sort-goods-tools .ui-selectmenu-button').html('Сортировать по: <b style="color: #2c3e50">Цене</b>');
		}
	});
});

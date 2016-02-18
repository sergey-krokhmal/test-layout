$(document).ready(function(){

	
	// Fancybox для всплывающих форм
	$('[href^=#fb-]').fancybox({
		padding : 20,
		margin: 50,
		scrolling : 'no',
		fitToView: false,
		helpers: {
			title: null
		}
	});
	
	// Fancybox для Яндекс.карт
	$('[href^=#yamap-]').fancybox({
		padding : 20,
		margin: 50,
		scrolling : 'no',
		fitToView: false,
		helpers: {
			title: null,
			overlay: {
				locked: false
			}
		},
		wrapCSS: 'fb-yamap'
	});
	
	// Fancybox для просмотра картинок
	$('[rel^="img-"]').fancybox({
		arrows: true,
		loop: false,
		prevEffect: 'fade',
		nextEffect: 'fade',
		scrolling: 'no',
		padding: 20,
		margin: 50,
		minWidth: 400,
		helpers: {
			title: {
				type: 'inside',
				position: 'top'
			}
		},
		tpl: {
			wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="emblem bg4"><em class="em1"></em></div><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>'
		},
		wrapCSS: 'fb-gallery'
	});	
	
	
});
function toggleMenu(link_class, sub_menu_class, pic_class){
	$('.'+sub_menu_class).toggle();
}

$(document).ready(function() {
    $(".header-subnav-menu[id*='hs-menu-']").hide();
	
	$('.bxslider').bxSlider({
		controls: false
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

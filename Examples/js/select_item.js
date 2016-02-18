$(document).ready(function(){
	$("#user_menu").on("click", ".user_menu_button",function(){
		$(".user_menu_button").removeClass("selected_item");
		$(this).addClass("selected_item");
	});
	
	$("#order_card_list").on( "click", ".order_card", function(){
		$(".order_card").removeClass("selected_item");
		$(this).addClass("selected_item");
	});
});

function toggleForTimeline(element, class_names, fs_text, sc_text){
	names = class_names.split(',');
	el = $('.'+names[0]);
	if (element.text() == fs_text) {
		element.css("color","red");
		element.text(sc_text);
	} else {
		element.css("color","#428bca");
		element.text(fs_text);
	}
	for (i = 0; i < names.length; i++) {
		el = $('.'+$.trim(names[i]));
		el.toggle();
	}
}
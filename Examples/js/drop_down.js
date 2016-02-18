$(document).ready(function(){
	$("#user_menu").on("click",".drop_down_button",function(){
		var id = $(this).attr("id");
		if ($(".drop_down_list#"+id).is(":visible")) {
			$(".drop_down_button#" + id + " .button_img").attr("src", "img/down.png");
		} else {
			$(".drop_down_button#" + id + " .button_img").attr("src", "img/up.png");
		}
		$(".drop_down_list#"+id).slideToggle("fast");
	});
	
	$("#order").on("click","#order_history_title",function(){
		if ($("#order_history_list").is(":visible")) {
			$("#order_history_title .button_img").attr("src", "img/down.png");
		}else {
			$("#order_history_title .button_img").attr("src", "img/up.png");
		}
		$("#order_history_list").slideToggle("fast");
		$(".hide_seen_logs").toggle();
	});
});
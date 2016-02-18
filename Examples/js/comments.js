function addComment() {
	var comment = $.trim($("#new_order_comment_ta").val());
	var order_num = $("#ep_order_id").val();
	console.log(comment);
	console.log(order_num);
	jQuery.ajax({
		type: 'POST',
		url: '/ajax.php',
		data: {'ACTION':'ADD_COMMENT_ORDER','ORDER_NUM':order_num,'COMMENT':comment},
		async: false,
		success: function(data) {
			$("#order_comment_list").html(data);
			$("#new_order_comment_ta").val("");
			$.fancybox.close();
		},
		dataType: 'html',
		error: function() {},
		complete: function() {}
	});
}
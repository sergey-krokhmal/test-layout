/*$("body").on("click", "#dlg-btn-edit-form", function() {
	order_num = $("#field_order_num").val();
	old_value = $("#field_old_value").val();
	new_value = $("#field_new_value").val();
	field = $("#field_db_name").val();
	field_name = $("#field_name").val();
	updateFieldOrder();
}*/

function openEditForm(order_num, old_value, field, field_name) {
	$("[rel='field_name']").text(field_name);
	$("[name='field_order_num']").val(order_num);
	$("[name='field_old_value']").val(old_value);
	$("[name='field_db_name']").val(field);
	$("[name='field_new_value']").attr("value",old_value);
	//$("#field_new_value").val(old_value);
	$.fancybox( $('#fb-5').html());
	if (field == "incoming_date") {
		$(".fancybox-inner [name='field_new_value']").datepicker();
	}
	if (field == "delivery_address") {
		$(".fancybox-inner [name='field_new_value']").hide();
		$(".fancybox-inner [name='field_ta_new_value']").show();
		$(".fancybox-inner [name='field_ta_new_value']").val(old_value);
	}
}

function updateFieldOrder(){
	ORDER_NUM = $(".fancybox-inner [name='field_order_num']").val();
	OLD_VALUE = $.trim($(".fancybox-inner [name='field_old_value']").val());
	NEW_VALUE = $.trim($(".fancybox-inner [name='field_new_value']").val());
	FIELD = $(".fancybox-inner [name='field_db_name']").val();
	FIELD_NAME = $(".fancybox-inner [rel='field_name']").text();
	if (FIELD == "delivery_address") {
		NEW_VALUE = $(".fancybox-inner [name='field_ta_new_value']").val();
	}
	if (NEW_VALUE==OLD_VALUE){
		alert('Значение не изменено');
		return false;
	}
	jQuery.ajax({
		type: 'POST',
		url: '/ajax.php',
		data: {'ACTION':'UPDATE_FIELD_ORDER','ORDER_NUM':ORDER_NUM,'OLD_VALUE':OLD_VALUE,'NEW_VALUE':NEW_VALUE,'FIELD':FIELD,'FIELD_NAME':FIELD_NAME},
		async: false,
		success: function(data) {
			var status_name = $(".user_menu_button.selected_item").attr("id").replace("_orders", "");
			refreshPage(status_name, ORDER_NUM);
			$.fancybox.close();
		},
		dataType: 'html',
		error: function() {},
		complete: function() {}
	});
}

function showAddItem(){
	var html = 
		'<tr id="id_tr_light" class="last_product_list_tr">'+
		'<input type="hidden" class="edit_order_input_item" name="item_link"/>'+
		'<td align="right"><button class="btn-auto-articul">A</button></td>'+
		'<td align="left"><input type="text" class="edit_order_input_item" name="item_articul"/></td>'+
		'<td align="left"><input type="text" class="edit_order_input_item" name="item_name"/></td>'+
		'<td align="right"><input type="text" class="edit_order_input_item" name="item_count"/></td>'+
		'<td align="right"><input type="text" class="edit_order_input_item" name="item_price"/></td></tr>';
	$(".product_list_auto_col").show();
	if ($(".last_product_list_tr").length > 0){
		$(".last_product_list_tr").after(html);
		$(".last_product_list_tr").first().removeClass("last_product_list_tr");
	} else {
		$(".tr_table_product_list").after(html);
	}
	$("#edit_order_add_item").hide();
	$("#edit_order_confirm_item").show();
	$("#edit_order_cancel_item").show();
	$("#edit_order_edit_items").hide();
}

function confirmItem(){
	var item_articul = $.trim($(".edit_order_input_item[name='item_articul']").val());
	var item_name = $.trim($(".edit_order_input_item[name='item_name']").val());
	var item_link = $.trim($(".edit_order_input_item[name='item_link']").val());
	var item_count = $.trim($(".edit_order_input_item[name='item_count']").val());
	var item_price = $.trim($(".edit_order_input_item[name='item_price']").val());
	var order_num = $(".dlg-enter-prepay #ep_order_id").val();
	var items_arr = [];
	items_arr[0] = {
		articul: item_articul,
		name:	item_name,
		link:	item_link,
		count:	item_count,
		price:	item_price
		};
	$.post("ajax.php", {ACTION:"ADD_NEW_ITEMS", ITEMS_ARR:items_arr, ORDER_NUM:order_num}, function(){
		getOrderByNum(order_num);
		$(".product_list_auto_col").hide();
		$("#edit_order_add_item").show();
		$("#edit_order_confirm_item").hide();
		$("#edit_order_cancel_item").hide();
		$("#edit_order_edit_items").show();
	});
	
}

function cancelAddItem() {
	$(".product_list_auto_col").hide();
	$(".last_product_list_tr").remove();
	$("#id_tr_light").last().addClass("last_product_list_tr");
	$("#edit_order_add_item").show();
	$("#edit_order_confirm_item").hide();
	$("#edit_order_cancel_item").hide();
	$("#edit_order_edit_items").show();
}

function editItems() {
	$("#table_product_list_edit").show();
	$("#edit_order_edit_items").hide();
	$("#edit_order_confirm_edit").show();
	$("#edit_order_cancel_edit").show();
	$("#edit_order_add_item").hide();
	$("#table_product_list").hide();
	$("#table_product_list_edit").show();
}

function confirmEdit() {
	$("#edit_order_edit_items").show();
	$("#edit_order_confirm_edit").hide();
	$("#edit_order_cancel_edit").hide();
	$("#edit_order_add_item").show();
	var order_num = $(".dlg-enter-prepay #ep_order_id").val();
	var items = $(".item_edit_row");
	var items_arr = [];
	for (var i = 0; i < items.length; i++){
		items_arr[i] = {
			id:		$(items[i]).find(".item_edit_id").attr("id"),
			articul:	$.trim($(items[i]).find("[name='item_articul']").val()),
			name:	$.trim($(items[i]).find("[name='item_name']").val()),
			count:	$.trim($(items[i]).find("[name='item_count']").val()),
			link:	$.trim($(items[i]).find("[name='item_link']").val()),
			price:	$.trim($(items[i]).find("[name='item_price']").val()),
			need_del: $(items[i]).find(".need_delete").length
		};
	}
	$.ajax({
		type: 'POST',
		url: '/ajax.php',
		data: {'ACTION':'UPDATE_ITEMS','ORDER_NUM':order_num,'ITEMS_ARR':items_arr},
		async: false,
		success: function(data) {
		},
		dataType: 'html',
		error: function() {},
		complete: function() {}
	});
	var order_num = $(".dlg-enter-prepay #ep_order_id").val();
	var status_name = $(".user_menu_button.selected_item").attr("id").replace("_orders", "");
	refreshPage(status_name, order_num);
}

function cancelEdit() {
	var order_num = $(".dlg-enter-prepay #ep_order_id").val();
	var status_name = $(".user_menu_button.selected_item").attr("id").replace("_orders", "");
	getOrderByNum(order_num);
}

$(document).ready(function(){
	$("#order").on("click", ".delete_item_button",function(){
		$(this).addClass("need_delete");
		$(".item_edit_row").has(".delete_item_button.need_delete").hide();
	});
	
	//auto fill by articul
	$("body").on("click", ".btn-auto-articul", function() {
		var row = $(this).parent().parent();
		var art = row.find("[name='item_articul']").val();
		$.ajax({
		  method: "GET",
		  url: "item_articul.php",
		  data: { articul: art}
		}).done(function(json) {
			//if (json != 'false') {
				var articul = art;
				var price = json.price;
				var type_size = "";
				var type_size_full = "";
				var name = "";
				var link = "";
				switch(json.r_name){
					case "shina":
						type_size = json.w_size + "/" + json.h_size + " R" + json.r_size + " " + json.index;
						type_size_full = "Типоразмер: <strong>" + type_size + "</strong>";
						index2 = json.index2;
						if (json.index2 == null) {
							index2 = "";
						} else {
							index2 += " ";
						}
						name = "Шина " + json.b_name+ " " + json.m_name + " " + type_size + " " + index2 + type_size_full;
						link = "/"+json.r_name+"/tyre/"+json.b_url+"/"+json.m_url+"/"+json.id;
						break;
					case "disk":
						type_size = json.w_size + "x" + json.r_size + "/" + json.pcd + " DIA" + json.dia + " ET" + json.et;
						type_size_full = "Типоразмер: <strong>" + type_size + "</strong>";
						name = "Диск " + json.b_name+ " " + json.m_name + " " + type_size_full;
						link = "/"+json.r_name+"/tyre/"+json.b_url+"/"+json.m_url+"/"+json.id;
						break;
					case "akb":
						type_size = json.param;
						type_size_full = "Параметры: <strong>" + type_size + "</strong>";
						name = "Аккумулятор " + json.b_name+ " " + json.name + " " + type_size_full;
						link = "/"+json.r_name+"/tyre/"+json.b_url+"/"+json.url;
						break;
				}
				row.find("[name='item_link']").val(link);
				row.find("[name='item_articul']").val(articul);
				row.find("[name='item_name']").val(name);
				row.find("[name='item_count']").val(1);
				row.find("[name='item_price']").val(price);
			//}
		});
	});
});
$(document).ready(function(){
	
	
	/*
	//-------------change status--------------
	$('.fancybox').fancybox({

		closeBtn    : false, // hide close button
		closeClick  : false, // prevents closing when clicking INSIDE fancybox
		helpers     : { 
			// prevents closing when clicking OUTSIDE fancybox
			overlay : {closeClick: false} 
		},
		keys : {
			// prevents closing when press ESC button
			close  : null
		}
    });*/
	
	$("#order").on("click", "#change_status a",function(){
		$(".dlg-change-status").dialog({
		  resizable: false,
		  height: 180,
		  width: 300,
		  modal: true,
		  title: "Изменение статуса",
		  buttons: {
			"Изменить": function() {
				var new_status = $("#status-drop-down option:selected").val();
				var order_num = $(".order_card.selected_item").attr("id");
				if (new_status == 6) {
					$.fancybox({
						content:  $('#fb-8').html(),
						closeBtn    : false,
						closeClick  : false,
						helpers     : { overlay : {closeClick: false} },
						keys : {close  : null}
					});
				} else if (new_status == 3){
					$( this ).dialog("close");
					$('[href="#fb-3"]').click();
				} else {
					$.post("ajax.php", {ACTION:"CHANGE_STATUS", order_num:order_num, new_status:new_status}, function(status_name){
						if (new_status == 5){
							$(".sms_message").text("Заказ номер " + order_num + " готов к выдаче. Ждем вас по адресу ул. Михалицына д. 10. Интернет-магазин ");
							$(".order_num_sms").text(order_num);
							$.fancybox({
								content:  $('#fb-9').html(),
								closeBtn    : false,
								closeClick  : false,
								helpers     : { overlay : {closeClick: false} },
								keys : {close  : null}
							});
						} else {
							refreshPage(status_name, order_num);
						}
					});
				}
				$( this ).dialog("close");
			},
			"Отмена": function() {
				$( this ).dialog("close");
			}
		  }
		});
		$("#status-drop-down").selectmenu();
	});
	
	$("body").on("click", "#dlg-btn-cancel-comment",function(){
		var order_num = $(".order_card.selected_item").attr("id");
		var comment = $(".fancybox-inner [name='canceled_comment']").val();
		if (comment != ""){
			$.post("ajax.php", {ACTION:"CHANGE_STATUS", order_num:order_num, new_status:6});
			$.post("ajax.php", {ACTION:"SET_CANCELED_COMMENT", ORDER_NUM:order_num, COMMENT:comment}, function(){
				refreshPage("canceled", order_num);
			});
			$.fancybox.close();
		} else {
			$(".fancybox-inner .dlg-cancel-comment-err").text("Введите причину отмены!");
		}
	});
	//-------------end change status--------------
	
	function addZero(i) {
		return (i < 10)? "0" + i: i;
	}
	
	//-------------show release order dialog------
	$("#order").on("click", "a[href='#fb-3']", function(){
		var order_num = $(".dlg-enter-prepay #ep_order_id").val();
		//console.log(order_num);
		$.post("ajax.php", {ACTION:"GET_ORDER_SUMM", ORDER_NUM:order_num}, function(data){
			var sums = $.parseJSON(data);
			//console.log(sums);
			$("#io_order_num").text(order_num);
			$("#io_order_sum").text(sums.SUMM);
			$("#io_order_prepay").text(sums.PREPAY);
			var sum_left = sums.SUMM - sums.PREPAY;
			$("#io_order_sum_left").text(sum_left);
			$("#pay_sum").val(sum_left);
			
			var today = new Date();
			dd = addZero(today.getDate());
			mm = addZero(today.getMonth() + 1);
			y = today.getFullYear();
			
			$("#release_date").val(y+'-'+mm+'-'+dd);
		});
	});
	//-------------end----------------------------
	
	//----------add new order dialog------------
	
	$("body").on("click", "a[href='#fb-6']", function() {	
		$(".ao_field").val("");
		$(".ao_field[name='add_order_pay_meth']").val(1);
		$(".ao_field[name='add_order_del_meth']").val(1);
		$(".ao_field[name='add_order_address']").hide();
		$(".ao_field[name='add_order_address']").val("");
		var count = $("#items_input_table .add_order_item").length;
		for(var i = 0; i < count-1; i++) {
			$("#items_input_table .add_order_item").last().remove();
		}
	});
	
	//auto fill by articul
	$("body").on("click", ".dlg-btn-auto-articul", function() {
		var row = $(this).parent().parent(".add_order_item");
		var art = row.find("[name='add_order_item_articul']").val();
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
				}
				row.find("[name='add_order_item_link']").val(link);
				row.find("[name='add_order_item_articul']").val(articul);
				row.find("[name='add_order_item_name']").val(name);
				row.find("[name='add_order_item_count']").val(1);
				row.find("[name='add_order_item_price']").val(price);
			//}
		});
	});
	
	//add item fields
	$("body").on("click", "#dlg-btn-more_items", function() {
		var html = 	'<tr class="add_order_item">';
		html +=			'<input type="hidden" name="add_order_item_link" class="ao_field"/>';
		html +=			'<td align="left" width="5%"><button class="dlg-btn-auto-articul">A</button></td>';
		html +=			'<td align="left" width="14%"><input type="text" name="add_order_item_articul" class="ao_field"/></td>';
		html +=			'<td align="left" width="56%"><input type="text" name="add_order_item_name" class="ao_field"/></td>';
		html +=			'<td align="right" width="12%"><input type="text" name="add_order_item_count" class="ao_field"/></td>';
		html +=			'<td align="right" width="13%"><input type="text" name="add_order_item_price" class="ao_field"/></td></tr>';
		$("#items_input_table tbody").append(html);
	});
	
	//drop item fields
	$("body").on("click", "#dlg-btn-remove-item", function() {
		if ($("#items_input_table .add_order_item").length > 1) {
			$("#items_input_table .add_order_item").last().remove();
		}
	});
	
	//add new order
	$("body").on("click", "#dlg-btn-add-order",function(){
		var fio = $.trim($(".ao_field[name='add_order_fio']").val());
		var email = $.trim($(".ao_field[name='add_order_email']").val());
		var phone = $.trim($(".ao_field[name='add_order_phone']").val());
		var pay_meth = $(".ao_field[name='add_order_pay_meth']").val();
		var del_meth = $(".ao_field[name='add_order_del_meth']").val();
		var del_addr = $(".ao_field[name='add_order_address']").val();
		var items = $(".add_order_item");
		var items_arr = [];
		for (var i = 0; i < items.length; i++){
			items_arr[i] = {
				articul: $.trim($(items[i]).find("[name='add_order_item_articul']").val()),
				name:	$.trim($(items[i]).find("[name='add_order_item_name']").val()),
				link: $.trim($(items[i]).find("[name='add_order_item_link']").val()),
				count:	$.trim($(items[i]).find("[name='add_order_item_count']").val()),
				price:	$.trim($(items[i]).find("[name='add_order_item_price']").val())
			};
		}
		$.post("ajax.php", {ACTION:"ADD_NEW_ORDER", CLIENT_FIO:fio, CLIENT_EMAIL:email, CLIENT_PHONE:phone, PAY_METHOD:pay_meth, DEL_METHOD:del_meth, ADDRESS:del_addr}, function(data){
			var order_info = $.parseJSON(data);
			//refreshPage("processing", order_info.ORDER_NUM);
			$.post("ajax.php", {ACTION:"ADD_NEW_ITEMS", ITEMS_ARR:items_arr, ORDER_NUM:order_info.ORDER_NUM}, function(data){
				//console.log(data);
			});
			$(".dlg-new-order-num #ao-new-order-num").text(order_info.ORDER_NUM);
			$("#user_menu").load("user_menu.php");
			$.fancybox( $('#fb-7').html());
		});
		$.fancybox.close();
	});
	
	$(".ao_field[name='add_order_del_meth']").change(function(){
		var del_meth = $(".ao_field[name='add_order_del_meth']").val();
		if (del_meth > 1) {
			$(".ao_field[name='add_order_address']").show();
		} else {
			$(".ao_field[name='add_order_address']").hide();
		}
	});
	//------new order dialog end-------------
});

$(document).ready(function(){

	$("body").on("click", "#dlg-btn-enter",function(){
		var prepay_sum = $(".dlg-enter-prepay #prepay_sum").val();
		var order_num = $(".dlg-enter-prepay #ep_order_id").val();
		var method = $(".dlg-enter-prepay .prepay_method:checked").val();
		var card_invoice = $(".dlg-enter-prepay [name='card_invoice_num']").val();
		//console.log(card_invoice);
		var format_doc = $(".dlg-enter-prepay #format_doc").prop("checked");
		$.post("/ajax.php", {ACTION: 'ENTER_PREPAY', prepay_sum:prepay_sum, order_num:order_num, format_doc:format_doc, prepay_method:method, card_invoice:card_invoice}, function(data){
			
			if (data == "true") {
				//var id = $(".order_card.selected_item .order_card_id").attr("id");
				window.open("http://home.protektor57.ru/doc.php?order_num="+order_num);
				//console.log(order_num);
			}
			refreshPage("arrival", order_num);
		});
		$.fancybox.close();
	});
	
//----------release order--------------------
	$("body").on("click", "#dlg-btn-issue",function(){
		var order_num = $("#io_order_num").text();
		var pay_sum = $("#pay_sum").val();
		var pay_method = $(".pay_method[name='order_pay_method']:checked").val();
		var card_invoice = $(".dlg-issue-order [name='card_invoice_num']").val();
		var rel_date = $('.dlg-issue-order #release_date').val();
		//console.log(rel_date);
		//console.log(pay_method);
		var left_sum = $("#io_order_sum_left").text();
		var ch_order_card = $("#ch_order_card").prop("checked");
		var ch_receipt = $("#ch_receipt").prop("checked");
		if (pay_sum == left_sum){
			if (pay_method > 0){
				$.post("/ajax.php", {ACTION: 'RELEASE_ORDER', order_num:order_num, pay_method: pay_method, card_invoice:card_invoice, release_date: rel_date}, function(){
					if (ch_order_card) {
						window.open("http://home.protektor57.ru/doc_order_card.php?order_num="+order_num);
					}
					if (ch_receipt) {
						window.open("http://home.protektor57.ru/doc_check.php?order_num="+order_num);
					}
				});
				refreshPage("done", order_num);
			} else {
				alert("Не указан способ доплаты");
			}
		} else {
			alert("Указанная сумма на равна остатку");
		}
		$.fancybox.close();
	});
//----------end-------------------------------
	
	$("body").on("click", "#dlg-btn-close",function(){
		$.fancybox.close();
	});
	
	$(".datepicker").datepicker($.datepicker.regional[ "ru" ]);
	
	$("body").on("click", "#dlg-btn-date",function(){
		var order_num = $("#id_order_id").text();
		var date = $("#incoming_date").val();
		var comment = $("#incoming_comment").val();
		$.post("ajax.php", {ACTION:"SET_INCOMING_DATE_ORDER", ORDER_NUM:order_num, COMMENT:comment, INCOMING_DATE:date}, function(){
			var status_name = $(".user_menu_button.selected_item").attr("id").replace("_orders","");
			refreshPage(status_name, order_num);
		});
		$.fancybox.close();
	});
	
});

//--------SMS-MESSAGE------------------
function send_sms(){
	var order_num = $(".order_card.selected_item").attr("id");
	var message = $("#fb-9 .sms_message").text();
	console.log(order_num + " wer " + message);
	$.post("ajax.php", {ACTION:"SEND_SMS", ORDER_NUM:order_num, MESSAGE: message}, function(data){
		console.log(data);
		$.fancybox.close();
	});
}
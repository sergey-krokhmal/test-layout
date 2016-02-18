
//----------------ПОИСК ЗАКАЗОВ------------------
function search_result_click(status, number) {	//Нажатие по результату поиска
	$('.search_fast_result').html('');			//Очистить результат поиска
	$('.search_fast_result').hide();
	refreshPage(status, number);				//Перейти на старницу просмотра заказа
}

function search_number_order() {			//Поиск заказов по ключевому слову
		number=$('#search_input').val();	//Ключевое слово
		jQuery.ajax({
			type: 'GET',
			url: '/ajax.php',
			data: {'ACTION':'SEARCH_ORDER','ORDER_NUM':number},
			async: false,
			success: function(data) {
				html="";
				$.each(data,function(index,val){
					 html=html+'<a href="#" onclick="search_result_click(\''+val.status+'\', \''+val.number+'\'); return false;">Заказ №'+val.number+' ('+val.fio+' '+val.phone+')</a>';
				  });
				  
				 if (html=="")
					{
						$('.search_fast_result').show();
						$('.search_fast_result').html('<a>Ничего не найдено</a>');
					}
				 else
					{
						$('.search_fast_result').show();
						$('.search_fast_result').html(html);
					}
			},
			dataType: 'json',
			error: function() {},
			complete: function() {}
		});
	}
//----------------------------------------------------
	
//----------------ОБНОВЛЕНИЕ СТРАНИЦЫ ПРОСМОТРА ЗАКАЗА-----
function refreshPage(status_name, order_num) {										//Перезагрузить страницу просмотра заказа по номеру и папке
	$("#user_menu").load("user_menu.php", function(){								//Перезагрузить меню
		$(".user_menu_button#"+status_name+"_orders").addClass("selected_item");	//Выделить нужную папку status_name
		$.get("orders.php", {status:status_name},  function(orders){				//Загрузить содержимое папки
			$("#order_card_list").text("");											//Очистить старое содержимое
			$("#order_card_list").html(orders);
			$("#order_card_list").hide(0);
			$("#order_card_list").show('fast');
			getOrderByNum(order_num);							//Загрузить просмотр заказа
			window.setTimeout(setSelected,150);					//Задержка до окончания загрузки
			function setSelected(){								//Выбрать загружаемый заказ
				$("#"+order_num).addClass("selected_item");
			}
		});
	});
}

function getOrdersByStatus(status){							//
	$.get("orders.php", {status:status},  function(orders){
			$("#order_card_list").text("");
			$("#order").text("");
			$("#order_card_list").html(orders);
			$("#order_card_list").hide(0);
			$("#order_card_list").show('fast');
		});
}

function getOrderByNum(order_num){
	$.get("orders.php", {order_num:order_num},  function(order){
			$("#order").text("");
			$("#order").html(order);
			$("#order").hide(0);
			$("#order").show('fast');
			$(".dlg-enter-prepay #ep_order_id").val(order_num);
			$("#io_order_num").text(order_num);
			$("#id_order_id").text(order_num);
		});
}
//--------------------------------------------------------

//---------------Обновить страницу при переходе к заказу----------
$(document).ready(function(){
	var status_name = $(".redirect_status").val();
	var order_num = $(".redirect_order_num").val();
	//console.log(status_name+"\n"+order_num);
	if (status_name !== undefined && order_num !== undefined && status_name !== "" && order_num !== ""){
		refreshPage(status_name, order_num);
	}
});

function toggleHistoryLogs() {
	$(".seen_order_log").toggle();
	if ($(".hide_seen_logs").text() == "Подробно") {
		$(".hide_seen_logs").text("Кратко");
	} else {
		$(".hide_seen_logs").text("Подробно");
	}
}

$(document).ready(function(){
	$("#user_menu").on("click", ".user_menu_button",function(){
		var status = $(this).attr("id").replace("_orders", "");
		getOrdersByStatus(status);
	});
	$("#order_card_list").on( "click", ".order_card:not(:has(.statnew))", function(){
		var order_num = $(this).attr("id");
		getOrderByNum(order_num);
	});
});
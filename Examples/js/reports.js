$(document).ready(function(){
	//----------Filter report radio switch
	$("body").on("click", ".report_radio_filter:has(input[name='report_filter'])", function(){
		$("[name='report_filter']").prop("checked", false);
		$(this).find("input").prop("checked", true);
		$(".report_filter_form").submit();
	});
	
	//----------Filter report radio switch time
	$("body").on("click", ".report_radio_filter:has(input[name='report_time'])", function(){
		$("[name='report_time']").prop("checked", false);
		$(this).find("input").prop("checked", true);
		$(".report_filter_form").submit();
	});
	
	//----------Filter report on change user
	$("body").on("change", ".report_user_filter", function(){
		$(".report_filter_form").submit();
	});
	
	//----------Filter report on change status
	$("body").on("change", ".report_status_filter", function(){
		$(".report_filter_form").submit();
	});
	
	//----------Filter report on change period
	$("body").on("change", ".period_datepicker", function(){
		$(".report_radio_filter input[name='report_time']").prop("checked", false);
		$(".report_radio_filter input[value='7'][name='report_time']").prop("checked", true);
		$(".report_filter_form").submit();
	});
	
	//----------Filter report user click
	/*$("body").on("click", ".rt_hovered_row", function(){
		$user_id = $(this).find(".report_user_id").text();
		$("[name='report_filter']").prop("checked", false);
		$(".report_radio_filter input[value='2'][name='report_filter']").prop("checked", true);
		$(".report_user_filter option").prop("selected", false);
		$(".report_user_filter option[value='"+$user_id+"']").prop("selected", true);
		$("select[name='user_name']").val($user_id);
		$(".report_filter_form").submit();
		//console.log($(".report_user_filter select").val());
	});*/
	
	//----------Datepickers
	$(".period_datepicker").datepicker($.datepicker.regional[ "ru" ]);
	$(".period_datepicker").attr("readonly", true);
	
	$(".report_radio_filter:has(input[name='report_time']:checked)").addClass("selected_filter");
	
	$("input[name='order_list_need']").val("no");
});

//-----------Список заказов---------------------
function getUserOrders(id_user, id_status){
	$("input[name='order_list_user']").val(id_user);
	$("input[name='order_list_status']").val(id_status);
	$("input[name='order_list_need']").val("user");
	$(".report_filter_form").submit();
}

function getMarketOrders(market, id_status){
	$("input[name='order_list_market']").val(market);
	$("input[name='order_list_status']").val(id_status);
	$("input[name='order_list_need']").val("market");
	$(".report_filter_form").submit();
}
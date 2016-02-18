$(document).ready(function(){
	if (window.location.toString().indexOf('orders') >= 0){
		$(".main_menu_orders_tab").addClass("selected_tab");
	} else
	if (window.location.toString().indexOf('services') >= 0){
		$(".main_menu_services_tab").addClass("selected_tab");
	} else
	if (window.location.toString().indexOf('tyre_store') >= 0){
		$(".main_menu_tyre_store_tab").addClass("selected_tab");
	} else
	if (window.location.toString().indexOf('reports') >= 0){
		$(".main_menu_reports_tab").addClass("selected_tab");
	} else
	if (window.location.toString().indexOf('tools') >= 0){
		$(".main_menu_tools_tab").addClass("selected_tab");
	}
});
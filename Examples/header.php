<?php
	require_once("config/dbconfig.php");
	require_once("config/access.php");
	
	$db = getDb();
	$query = "SELECT * FROM `users` WHERE login = '".$_SESSION["username"]."'";
	$users = $db->run($query);
	$fio = $db->nextRow($users);

	$query="SELECT description FROM `user_group` WHERE id='$fio[id_user_group]'";

	$line=sql($query);
	$r=sqlget($line);
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<link rel="stylesheet" type="text/css" href="/css/jquery-ui.min.css"/>
		<link rel="stylesheet" type="text/css" href="/css/style.css"/>
		<link rel="stylesheet" type="text/css" href="/css/jquery.fancybox.css"/>
		<link rel="stylesheet" type="text/css" href="/css/modals.css"/>
		<link rel="stylesheet" type="text/css" href="/css/order_comments.css"/>
		<link rel="stylesheet" type="text/css" href="/css/services.css"/>
		<link rel="stylesheet" type="text/css" href="/css/reports.css"/>
		
		<script type="text/javascript" src="/js/jquery/jquery-min.js"></script>
		<script type="text/javascript" src="/js/jquery/jquery-ui.min.js"></script>
		<script type="text/javascript" src="/js/jquery/jquery.fancybox-2.1.5.min.js"></script>
		<script type="text/javascript" src="/js/jquery/lib.js"></script>
		<script type="text/javascript" src="/js/jquery/jquery.cookie.js"></script>
		<script type="text/javascript" src="/js/jquery/ru-datepicker.js"></script>
		<script type="text/javascript" src="/js/jquery/jquery.fileupload.js"></script>
		
		<script type="text/javascript" src="/js/tab_switch.js"></script>
		<script type="text/javascript" src="/js/drop_down.js"></script>
		<script type="text/javascript" src="/js/select_item.js"></script>
		<script type="text/javascript" src="/js/ajax_orders.js"></script>
		<script type="text/javascript" src="/js/menu_order_up.js"></script>
		<script type="text/javascript" src="/js/edit_form.js"></script>
		<script type="text/javascript" src="/js/comments.js"></script>
		<script type="text/javascript" src="/js/scripts.js"></script>
	</head>
	<body>
		<div id="wrapper">
			<div id="header" class="header">
				<div id="site_title">
				<!--	<h1>Ваш магазин</h1>
					<a href="#">yourdomain.ru</a> -->
					
				</div>
				<div id="user_card">
					<div id="user_name"><?=$fio["fio"]?><br>(<?=$r['description'];?>)</div>
					<div id="log_out">
						<a href="http://home.protektor57.ru/auth.php" >Выйти</a>
					</div>
				</div>
				<div id="main_menu">
					<a href="http://home.protektor57.ru?page=orders">
						<div class="main_menu_tab main_menu_orders_tab">
							<div class="item_orders_count">
							</div>
							Заказы
						</div>
					</a>
					<!--<a href="#"><div class="main_menu_tab">Покупатели</div></a>-->
					<a href="http://home.protektor57.ru?page=services">
						<div class="main_menu_tab main_menu_services_tab">
							<div class="service_orders_count">
							</div>
							Сервисы
						</div>
					</a>
					<a href="http://home.protektor57.ru?page=tyre_store"><div class="main_menu_tab main_menu_tyre_store_tab">Хранение шин</div></a>
					<a href="http://home.protektor57.ru?page=reports"><div class="main_menu_tab main_menu_reports_tab">Отчеты</div></a>
					<a href="http://home.protektor57.ru?page=tools"><div class="main_menu_tab main_menu_tools_tab">Инструменты</div></a>
				</div>
			</div>
		
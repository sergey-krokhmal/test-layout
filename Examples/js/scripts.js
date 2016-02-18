$(document).ready(function(){
//-------------------РАДИО МЕНЮ--------------------
	$("body").on("click", ".radio_menu_item", function(){
		$(this).parent().find("input[type='radio']").prop("checked", false);
		//console.log($(this).parent().find("input[type='radio']").html());
		$(this).find("input").prop("checked", true);
		$(".radio_menu_form").submit();
	});
	
	$(".radio_menu_item:has(input:checked)").addClass("selected_filter");
	
//-------------------ХРАНЕНИЕ ШИН------------------
	$(".ta_file_names").prop("readonly", true);
	
	$('.fancy_image').fancybox({
		arrows: true,
		loop: false,
		prevEffect: 'fade',
		nextEffect: 'fade',
		scrolling: 'no',
		padding: 10,
		margin: 10,
		/*helpers: {title: null},
		wrapCSS: 'fb-img-preview'*/
	});
});
	function add_tyres_input(){
		$(".remove_tyre_input").show();
		html = '';
		html += '<tr class="tyres_input">' +
					'<td style="vertical-align: top"></td>' +
					'<td><input name="tyre_size[]" ></input></td>' +
					'<td><input name="tyre_model[]"></input></td>' +
					'<td><input name="tyre_count[]" ></input></td>' +
				'</tr>';
		$(".tyres_input").last().after(html);
	}
	
	function add_disks_input(){
		$(".remove_disk_input").show();
		html = '';
		html += '<tr class="disks_input">' +
					'<td style="vertical-align: top"></td>' +
					'<td><input name="disk_size[]" ></input></td>' +
					'<td><input name="disk_model[]"></input></td>' +
					'<td><input name="disk_count[]" ></input></td>' +
				'</tr>';
		$(".disks_input").last().after(html);
	}
	
	function remove_tyre_input(){
		if ($(".tyres_input").length > 1){
			$(".tyres_input").last().remove();
		}
		if ($(".tyres_input").length < 2){
			$(".remove_tyre_input").hide();
		}
	}
	
	function remove_disk_input(){
		if ($(".disks_input").length > 1){
			$(".disks_input").last().remove();
		}
		if ($(".disks_input").length < 2){
			$(".remove_disk_input").hide();
		}
	}
	
$(document).ready(function(){
//-------------------ДОБАВЛЕНИЕ ФОТО ШИН--------------
	$('.upload_file').click(function(){
		// имитация нажатия на поле выбора файла
		$('.file_photos').click();
	});
	
	var fc = 0;	//Количество добавляемых файлов
	// инициализация плагина jQuery File Upload
	$('.form_ajax_photo').fileupload({
		add: function (e, data) {
			//console.log("file added");
			var fp_count = fc;
			var lf_count = $(".tyre_store_img").length;
			//console.log(fp_count);
			//console.log(lf_count);
			if (fp_count + lf_count > 10) {
			} else {
				// Автоматически загружаем файл при добавлении в очередь
				$('.loading').show();
				$('.loading_persent').show();
				$('.loading_persent').text("0%");
				var jqXHR = data.submit();
				//$('.form_ajax_photo').submit();
			}
		},
		change: function(e, data){
			fc = data.files.length;
			var fp_count = fc;
			var lf_count = $(".tyre_store_img").length;
			if (fp_count + lf_count > 10) {
				alert("Фотографий должно быть не более 10-и.");
			}
		},
		
		progress: function(e, data){

			// Вычисление процента загрузки
			var progress = parseInt(data.loaded / data.total * 100, 10);
			//console.log(data);
			// обновляем шкалу
			$('.loading_persent').text(/*"Файл "+data.files[0].name+" :"+*/progress+"%");
			
		},
		
		fail: function(e, data){
			//console.log('error');
			//console.log(data);
			//console.log(e);
			$('.loading').hide();
			$('.loading_persent').hide();
		},
		
		done:function(e, data){
			//console.log("done");
			//console.log($(e.target).find("[name='id']").val());
			//console.log(data);
			//console.log(e);
			$(".preview_img").append(data.result);
			$('.loading').hide();
			$('.loading_persent').hide();
		},
		always: function (e, data) {
			fc = 0;
		},
		
		dataType: 'html'
 
	});
	
	$('.services').on('click', '.tyre_store_del_button', function(){
		var img_block = $(this).parent(".tyre_store_img_block");
		id = img_block.find(".tyre_store_id").val();
		//console.log(img_block.html());
		photo_name = img_block.find(".tyre_store_photo_name").val();
		//console.log(id + photo_name);
		$.ajax({
				method: "GET",
				url: "tyre_store/upload_photo.php",
				async: true,
				data: { photo_action: "delete", id: id, photo_name: photo_name}
			}).success(function(){
				//console.log("del");
				img_block.remove();
				if ($(".tyre_store_img").length == 0){
					$(".preview_img").text("");
				}
			});
	});
	
//-------------------АВТОШИРИНА TEXTAREA--------------
	$(".auto_height").keyup(function(){
		$(this).css('height', 'auto' );
		$(this).height(this.scrollHeight);
	});
	
	$(".auto_height").css('height', 'auto' );
	if ($(".auto_height")[0] != null){
		$.each($(".auto_height"), function(){
			$(this).height(this.scrollHeight);
		});
	}
	
//-------------------ПОИСК ЗАКАЗОВ НА ХРАНЕНИЕ ШИН----
	var delay = (function(){	//Функция задержки после последнего ввода символа
		var timer = 0;
		return function(callback, ms){
			clearTimeout (timer);
			timer = setTimeout(callback, ms);
		};
	})();
	$('.search_word').keyup(function() {	//Ввод символа
		$(".search_item_list").html("");
		var input_name = $('.search_word').val();
		if (input_name.length > 0) {
			delay(function(){				//По истечению задержки после ввода
				$.ajax({
					method: "GET",
					url: "ajax.php",
					dataType: "json",
					async: true,
					data: { ACTION: "SEARCH_TYRE_STORE" ,SEARCH_WORD: input_name}
				}).success(function(items){
					if (items.length != 0) {
						for(i = 0; i < items.length; i++){
							$(".search_item_list").append('<li><a href="?page=tyre_store&action=preview&id='+items[i].key+'">'+items[i].value+'</a></li>');
						}
						$(".search_item_list").show();
					} else {
						$(".search_item_list").hide();
					}
				});
			}, 500 );
		} else {
			$(".search_item_list").hide();
			$(".search_item_list").html("");
		}
	});
	
});

//-------------------СЕРВИСЫ-----------------

$.expr[':'].findContent = function(obj, index, meta) {
  var matchParams = meta[3].split(','),
	  regexFlags = 'ig',
	  regex = new RegExp('^' + $.trim(matchParams) + '$', regexFlags);
  return regex.test($(obj).text());
};

function show_timepicker(class_name, date_class) {
	reserved_timestamps($('.' + date_class));
	months = ["", "января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
	date = $('.' + date_class).val().split('-');
	$('.' + class_name + ' .rus_date').text(date[2] + " " + months[parseInt(date[1])] + " " + date[0]);
	$(".checker_timeline_load").show();
	$(".checker_timeline").hide();
	$.fancybox({
		content: $('.' + class_name).html()
	});
}

function toggle_timestamp(check){
	/*checked_time = check1.find("span").text();
	check = $(".time_stamp:has(span:findContent('"+checked_time+"'))");
	console.log(check);*/
	if (check.hasClass("reserved_timestamp")){
		$(".timestamp_error").text("Выберите свободное время");
	} else {
		if (check.hasClass("checked_timestamp")){
			//console.log(check);
			check.removeClass("checked_timestamp");
		} else {
			check.addClass("checked_timestamp");
		}
		$(".timestamp_error").text();
	}
}

function accept_timestamps(){
	stamps = $(".fancybox-inner .checked_timestamp");
	//console.log(stamps);
	if (stamps.length > 0){
		//console.log($(stamps[0]).find("span").text());
		time = $(stamps[0]).find("span").text();
		duration = stamps.length * 30;
		$(".add_service_datetime[name='time']").val(time);
		$("input[name='work_time']").val(duration);
		stamps.removeClass("checked_timestamp");
		$.fancybox.close();
	} else {
		$(".timestamp_error").text("Время выполнения работ не выбрано");
	}
	/*for (i = 0; i < stamps.length; i++) {
		stamps[i].find("span").;
	}*/
}

function reserved_timestamps(date_input){
	
	date = date_input.val();
	id_service = $("input[name='id_service']").val();
	//console.log(id_service);
	$.ajax({
		method: "GET",
		url: "ajax.php",
		dataType: "json",
		async: true,
		data: { ACTION: "GET_RESERVED_SERVICES" ,DATE: date}
	}).success(function(items){
		//console.log(items);
		if (items.length > 0){
			$(".time_stamp").removeClass("reserved_timestamp");
			for (i = 0; i < items.length; i++){
				time_parts = items[i].create_time.split(":");
				if (time_parts[0].indexOf('0') == 0){
					time_parts[0] = time_parts[0].replace('0', '');
				}
				time = time_parts[0] + ":" + time_parts[1];
				//console.log(time);
				//console.log(items[i]);
				start_time = $(".time_stamp:has(span:findContent('"+time+"'))");
				//console.log(".time_stamp:has(span:findContent('"+time+"'))");
				//console.log(start_time);
				
				if (items[i].id == id_service){
					start_time.addClass("checked_timestamp");
				} else {
					start_time.addClass("reserved_timestamp");
				}
				
				duration = items[i].work_time/30;
				//console.log(duration);
				next_time = start_time;
				
				for (j = 1; j < duration; j++){
					if (next_time.next(".time_stamp").length == 0){
						//console.log(next_time.parent(".time_stamp_row").nextAll(".time_stamp_row").first().find(".time_stamp").first().html());
						next_time = next_time.parent(".time_stamp_row").nextAll(".time_stamp_row").first().find(".time_stamp").first();
					} else {
						next_time = next_time.next(".time_stamp");
					}
					
					//console.log(next_time.next(".time_stamp"));
					//console.log("item.id = " + items[i].id);
					if (items[i].id == id_service){
						next_time.addClass("checked_timestamp");
					} else {
						next_time.addClass("reserved_timestamp");
					}
				}
			}
			collis = $(".checked_timestamp.reserved_timestamp");
			if (collis.length > 0){
				collis.removeClass("checked_timestamp");
			}
		} else {
			$(".time_stamp").removeClass("reserved_timestamp");
		}
		$(".checker_timeline_load").hide();
		$(".checker_timeline").show();
	});
}

//ДОБАВЛЕНИЕ СЕРВИСОВ
//Изменение селекта, дополнение новой опцией по соответствии значению
function toggleSelectOption(curSelect, targetVal, editSelect, editOptionVal, editOptionText){
	if (curSelect.val() == targetVal){
		editSelect.append('<option value="' + editOptionVal+ '">' + editOptionText + '</option>');
		editSelect.val(editOptionVal);
	} else {
		editSelect.find("option[value='" + editOptionVal + "']").remove();
	}
}

//Ошибка при не выбранном селекте
function unselectError(errSelect, errVal, showError){
	if ($(".seasonal_store_service_err").length > 0){
		$(".seasonal_store_service_err").remove();
	}
	if (errSelect.val() == errVal){
		showError();
		return true;
	} else {
		return false;
	}
}

function onStoreUnselected(){
	html = '<span class="seasonal_store_service_err" style="color:red; font-weight: bold;">Значение "На хранение" не должно быть "Не определено"</span>';
	$(".seasonal_store_service_err").remove();
	$("select[name='seasonal_store']").before(html);
}

//Проверка занятого времени при одобрении заказа
function timeIsReserved(){
	status = $("select[name='status']").val();
	if (status == 2){
		date = $("input[name='date']").val();
		time = $("input[name='time']").val();
		work_time = $("input[name='work_time']").val();
		$.ajax({
			method: "GET",
			url: "ajax.php",
			dataType: "json",
			async: false,
			data: { ACTION: "CHECK_RESERVED_TIME" ,DATE: date, TIME: time, WORK_TIME: work_time}
		}).success(function(reserved){
			if (reserved) {
				$.fancybox({
					content: '<div style="float:left; width: 350px; height: 50px;"><span style="color:red; font-weight: bold;">Невозможно принять заказ!</span><br>' +
						'<span style="color:red;">На выбранное время уже есть принятый заказ</span></div>'
				});
			} else {
				$('form[name=\'add_service\']').submit();
			}
		});
	} else {
		$('form[name=\'add_service\']').submit();
	}
}

function addNewService(){
	if (unselectError($('select[name=\'seasonal_store\']'), '0', onStoreUnselected)){
		return false;
	} else {
		timeIsReserved();
	}
}


//------------Подсветить вкладку с новыми заказами
$(document).ready(function(){
	check_new_orders();
	setInterval(function() {
		check_new_orders();
	}, 20000);
});

function check_new_orders() {
	//console.log(new Date());
	$.ajax({
		method: "GET",
		url: "/ajax.php",
		dataType: "json",
		async: true,
		timeout: 4000,
		data: { ACTION: "CHECK_NEW_ORDERS"}
	}).success(function(new_orders){
		if (new_orders != null) {
			if (new_orders.item_orders > 0){
				$(".item_orders_count").addClass("highlight_orders_count");
				$(".item_orders_count").text(new_orders.item_orders);
				if ($("#new_orders .orders_count").length > 0){
					$("#new_orders .orders_count").text(new_orders.item_orders);
					//console.log(new_orders.item_orders);
				}
			} else {
				$(".item_orders_count").removeClass("highlight_orders_count");
				$("#new_orders .orders_count").text(0);
				$(".item_orders_count").text("");
			}
			if (new_orders.service_orders > 0){
				$(".service_orders_count").addClass("highlight_orders_count");
				$(".service_orders_count").text(new_orders.service_orders);
			} else {
				$(".service_orders_count").removeClass("highlight_orders_count");
				$(".service_orders_count").text("");
			}
		}
	});
}

//------------Принять заказ------------------
$(document).ready(function(){
	$("#order_card_list").on( "click", ".order_card:has(.statnew)", function(){
		var order_num = $(this).attr("id");
		var time_name = $(this).find(".order_card_time_name").text();
		$(".dlg-set-user #dlg_order_num").text(order_num);
		$(".dlg-set-user").dialog({
		  resizable: false,
		  height: 200,
		  modal: true,
		  title: order_num,
		  buttons: {
			"Да": function() {
				var status = "";
				$.get("/ajax.php", {ACTION:'SET_RESP_USER',order_num:order_num},  function(){
				});
				if ($(".item_orders_count").text() == 1){
					$(".item_orders_count").removeClass("highlight_orders_count");
					$(".item_orders_count").text("");
				} else if ($(".item_orders_count").text() > 1) {
					cnt = $(".item_orders_count").text();
					$(".item_orders_count").text(cnt - 1);
				}
				refreshPage("processing", order_num);
				$( this ).dialog("close");
			},
			"Отмена": function() {
				$( this ).dialog("close");
			}
		  }
		});
	});
});

//-----------show card num input-------------
function show_card_invoice_num_pledge(){
	$('.dlg-enter-prepay .card_invoice_num').hide();
	if ($('.prepay_method:checked').val() == 2 || $('.prepay_method:checked').val() == 3){
		//console.log($('.dlg-enter-prepay .prepay_method:checked').val());
		$('.dlg-enter-prepay .card_invoice_num').show();
	}
}

function show_card_invoice_num_surcharge(){
	$('.dlg-issue-order .card_invoice_num').hide();
	if ($('.pay_method:checked').val() == 2 || $('.pay_method:checked').val() == 3){
		//console.log($('.dlg-enter-prepay .prepay_method:checked').val());
		$('.dlg-issue-order .card_invoice_num').show();
	}
}
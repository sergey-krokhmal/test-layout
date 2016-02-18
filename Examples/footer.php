		</div>
			<div style="display:none; font-size: 11pt;" class="dlg-set-user">
				<p>Назначить Вас ответственным за заказ № <strong><span id="dlg_order_num"></span></strong>?</p>
				<p id="dlg_order_info"></p>
			</div>
			<?php
				$query = "SELECT * FROM `order_status`;";
				$statuses = $db->run($query);
			?>
			<div style="display:none; font-size: 11pt; overflow: visible; " class="dlg-change-status">
				<select name="order_status" id="status-drop-down" style="font-size: 11pt;">
					<?php 
						for($i = 1; $i <= mysql_num_rows($statuses); $i++) {
							$status = $db->nextRow($statuses);
					?><option value="<?=$status['id']?>"><?=$status['description']?></option>
					<?php
						}
					?>
				</select>
			</div>
			<div id="fb-5" style="display:none;" class="dlg-edit-form">
				<div class="dlg-title">Редактирование: <label rel="field_name"></label></div>
				<input type="hidden" name="field_order_num"/>
				<input type="hidden" name="field_old_value"/>
				<input type="hidden" name="field_db_name">
				<div class="dlg-textbox">
					<label>Новое значение поля </label>
					<input type="text" name="field_new_value"/>
					<textarea name="field_ta_new_value">
					</textarea>
				</div>
				<button class="dlg-btn" id="dlg-btn-close">Отмена</button>
				<button class="dlg-btn" id="dlg-btn-edit-form" onclick="updateFieldOrder()">Изменить</button>
			</div>
			<div id="fb-2" style="display: none;width: 300px;height: 250px;" class="dlg-enter-prepay">
				<div class="dlg-title">Внести предоплату</div>
				<div class="dlg-textbox" style="width: 250px">
					<input type="hidden" id="ep_order_id"/>
					<input type="text" id="prepay_sum"/><span> &#8381;</span>
				</div>
				<label>Способ предоплаты</label>
				<div class="dlg-check">
					<fieldset>
						<input class="prepay_method" name="prepay_method" type="radio" value="1" onclick="show_card_invoice_num_pledge()"/>
						<label>Наличные</label><br/>
						<input class="prepay_method" name="prepay_method" type="radio" value="2" onclick="show_card_invoice_num_pledge()"/>
						<label>На карту Роману</label><br/>
						<input class="prepay_method" name="prepay_method" type="radio" value="3" onclick="show_card_invoice_num_pledge()"/>
						<label>Безналичный (терминал)</label><br/>
					</fieldset>
				</div>
				<div class="dlg-textbox card_invoice_num" style="width: 250px; display:none;">
					<label>Карта/Счет </label>
					<input type="text" name="card_invoice_num"/>
				</div>
				<div class="dlg-check">
					<input type="checkbox" value="Оформить документ" id="format_doc"/>
					<label>Оформить документ</label>
				</div>
				<button class="dlg-btn" id="dlg-btn-close">Отмена</button>
				<button class="dlg-btn" id="dlg-btn-enter">Внести</button>
			</div>
			<div id="fb-3" style="display:none;" class="dlg-issue-order">
				<div class="dlg-title">Выдать заказ №<span id="io_order_num"></span></div>
				<div class="dlg-text" id="text-issue-order">
					<table>
						<tr>
							<td align="left" width="75%">Сумма:</td>
							<td align="right" width="20%" id="io_order_sum"></td>
							<td align="left" width="5%">&#8381;</td>
						</tr>
						<tr>
							<td align="left" width="75%">Внесена предоплата:</td>
							<td align="right" width="20%" id="io_order_prepay"></td>
							<td align="left" width="5%">&#8381;</td>
						</tr>
						<tr>
							<td align="left" width="75%">Остаток к доплате:</td>
							<td align="right" width="20%" id="io_order_sum_left"></td>
							<td align="left" width="5%">&#8381;</td>
						</tr>
						<tr>
							<td align="left" width="75%">Сумма доплаты:</td>
							<td align="right" width="20%"><input type="hidden" id="io_order_id"/><input type="text" id="pay_sum"/></td>
							<td align="left" width="5%">&#8381;</td>
						</tr>
						<tr>
							<td align="left" width="75%">Дата доплаты</td>
							<td align="right" width="20%"><input type="text" class="datepicker" id="release_date" style="width: 100px"/></td>
							<td align="left" width="5%"></td>
						</tr>
					</table>
				</div>
				<label>Способ доплаты</label>
				<div class="dlg-check">
					<fieldset>
						<input class="pay_method" name="order_pay_method" type="radio" value="1" onclick="show_card_invoice_num_surcharge()"/>
						<label>Наличные</label><br/>
						<input class="pay_method" name="order_pay_method" type="radio" value="2" onclick="show_card_invoice_num_surcharge()"/>
						<label>На карту Роману</label><br/>
						<input class="pay_method" name="order_pay_method" type="radio" value="3" onclick="show_card_invoice_num_surcharge()"/>
						<label>Безналичный (терминал)</label><br/>
					</fieldset>
				</div>
				<div class="dlg-textbox card_invoice_num" style="width: 250px; display:none;">
					<label>Карта/Счет </label>
					<input type="text" name="card_invoice_num"/>
				</div>
				<div class="dlg-check">
					<input type="checkbox" id="ch_order_card"/>
					<label>Карточка заказа</label>
				</div>
				<div class="dlg-check">
					<input type="checkbox" id="ch_receipt"/>
					<label>Товарный чек</label>
				</div>
				<button class="dlg-btn" id="dlg-btn-close">Отмена</button>
				<button class="dlg-btn" id="dlg-btn-issue">Выдать</button>
			</div>
			<div id="fb-4" style="display:none;" class="dlg-incoming-date">
				<div class="dlg-title">Дата доставки</div>
				<div class="dlg-textbox">
					<input type="hidden" id="id_order_id"/>
					<label>Дата </label>
					<input type="text" id="incoming_date" class="datepicker"/>
				</div>
				<div class="dlg-textbox">
					<label>Комментарий:</label>
				</div>
				<div class="dlg-textbox">
					<textarea id="incoming_comment" name="comment" ></textarea>
				</div>				
				<button class="dlg-btn" id="dlg-btn-close">Отмена</button>
				<button class="dlg-btn" id="dlg-btn-date">Назначить</button>
			</div>
			<?include_once("add_order_dlg.php");?>
			<div id="fb-8" style="display: none;" class="dlg-cancel-comment">
				<div class="dlg-title">Причина отмены заказа</div>
				<div class="dlg-textbox">
					<label style="color:red;" class="dlg-cancel-comment-err"></label>
				</div>
				<div class="dlg-textbox">
					<label>Комментарий:</label>
				</div>
				<div class="dlg-textbox">
					<textarea class="canceled_comment" name="canceled_comment"></textarea>
				</div>
				<button class="dlg-btn" id="dlg-btn-cancel-comment">Принять</button>
			</div>
			<div id="fb-9" style="display: none;" class="dlg-sms-message">
				<div class="dlg-title">SMS-оповещение клиента</div>
				<div class="dlg-textbox">
					<label style="color:red;" class="dlg-sms-message-err"></label>
				</div>
				<div class="dlg-textbox">
					<label>Сообщение:</label>
				</div>
				<div class="dlg-textbox">
					<textarea class="sms_message" name="sms_message" style="width: 300px; height: 80px"></textarea>
				</div>
				<div class="order_num_sms" style="display: none;"></div>
				<button class="dlg-btn" onclick="send_sms()">Отправить</button>
			</div>
		</div>
	</body>
</html>
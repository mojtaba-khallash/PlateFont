// jQuery Plugin
// version 0.2, Dec 18th, 2014
// by Mojtaba Khallash
var validLetters = [
	',',';','Q','[','\\',
	'd','f','g','h','i',
	'j','k','l','n','q',
	'r','s','u','w','x'
];
function isValidLetter(letter) {
	return validLetters.indexOf(letter) >= 0;
}

(function($) {
	$.plate = function(element, options) {
		var defaults = {
			country		: 	'ir',
			// national
			// protocol
			// motorcycle
			// historical
			// freeTradeZone
			type 	: 	'national',
			number 	: 	'12n52311',
			size 	: 	'100px',
			place	:	'anzali',
			edit	:	false
		}
		
		
		var totalInput = 8;
		var plugin = this;
		
		plugin.settings = {};
		
		var init = function() {
			plugin.settings = $.extend({}, defaults, options);
			plugin.element = element;
			
			create_plate();
		}
		
		plugin.set_type = function(type) {
			plugin.settings.type = type;
		}
		
		plugin.get_number = function() {
			var plateNumber = '';
			plugin.element.find('.plate-char').each(function() {
				plateNumber += $(this).val();
			});
			return plateNumber;
		}
		
		plugin.set_number = function(number) {
			plugin.settings.number = number;
		}
		
		plugin.set_size = function(size) {
			plugin.settings.size = size;
		}
		
		plugin.set_place = function(place) {
			plugin.settings.place = place;
		}
		
		plugin.refresh = function() {
			create_plate();
		}
		
		var updateTotalInput = function() {
			switch (plugin.settings.type) {
				case "national":
				case "motorcycle":
					totalInput = 8;
					break;
				case "protocol":
					totalInput = 4;
					break;
				case "historical":
				case "freeTradeZone":
					totalInput = 5;
					break;
			}
		}
		
		var create_plate = function() {
			updateTotalInput();
			var place = $(plugin.element);
			place.addClass('plateContainer')
			place.html('');
						
			if (plugin.settings.type == 'national' || plugin.settings.type == 'protocol') {
				// Part 1
				var part1 = $('<div>').addClass('icon-stack');
				part1.html(	'<span class="icon icon-stack-2x" style="color:#0147A9;">&#x007D;</span>' +
							'<span class="icon icon-stack-2x" style="color:#FFFFFF;">&#x007C;</span>' +
							'<span class="icon icon-stack-2x" style="color:#00A651;">&#x007E;</span>' +
							'<span class="icon icon-stack-2x" style="color:#ED1C24;">&#x00A1;</span>' +
							'<span class="icon stack-fitst icon-stack-2x">&#x007B;</span>');
				place.append(part1);
				
				if (plugin.settings.type == 'national') {
					// Part 2
					var letter = '';
					var part2 = $('<div>').attr('style', 'display:inline;');
					for (var i = 0; i < 6; i++) {
						var current = plugin.settings.number[i];
						
						if (i == 2) {			// letter
							letter = current;

							if (!isValidLetter(letter))
								current = '&#x0020;';
							var tmp = $('<div>').addClass('icon-stack');
							if (plugin.settings.edit) {
								tmp.html(	'<span class="icon stack-fitst icon-stack-2x">&#x00A4;</span>' + 
											'<input type="text" ind="' + i + '" value="' + current + '" maxlength="1" onkeypress="return isValidLetter(String.fromCharCode(event.charCode));" class="plate-char plate-input plate-letter icon-stack-2x number-' + i + '" style="width: 0.5em;"/>');
							}
							else {
								tmp.html(	'<span class="icon stack-fitst icon-stack-2x">&#x00A4;</span>' + 
											'<span class="icon icon-stack-2x plate-char">' + current + '</span>');
							}

							part2.append(tmp);
						}
						else {					// number
							var number = parseInt(current,10);
							if (isNaN(number))
								number = '&#x0020;';
							var tmp = $('<div>').addClass('icon-stack');
							if (plugin.settings.edit) {
								tmp.html(	'<span class="icon stack-fitst icon-stack-2x">&#x00A3;</span>' + 
											'<input type="text" ind="' + i + '" value="' + number + '" maxlength="1" onkeypress="return event.charCode >= 48 && event.charCode <= 57" class="plate-char plate-input plate-number icon-stack-2x number-' + i + '"/>');
							}
							else {
								tmp.html(	'<span class="icon stack-fitst icon-stack-2x">&#x00A3;</span>' + 
											'<span class="icon icon-stack-2x plate-char">' + number + '</span>');
							}

							part2.append(tmp);
						}
					}
					place.append(part2);
				
					// Part 3
					var part3 = $('<div>').addClass('icon-stack');
					part3.html('<span class="icon stack-fitst icon-stack-2x">&#x00A2;</span>');
					place.append(part3);
					
					// Part 4
					var part4 = $('<div>').addClass('icon-stack');
					
					var leftLetter = '&#x0020;';
					if (plugin.settings.number.length > 6) {
						leftLetter = parseInt(plugin.settings.number[6],10);
						if (isNaN(leftLetter))
							leftLetter = '&#x0020;';
					}

								
					var rightLetter = '&#x0020;';
					if (plugin.settings.number.length > 7) {
						rightLetter = parseInt(plugin.settings.number[7],10);
						if (isNaN(rightLetter))
							rightLetter = '&#x0020;';
					}

					if (plugin.settings.edit) {
						part4.html(	'<span class="icon stack-fitst icon-stack-2x">&#x00A5;</span>' +
									'<input type="text" ind="6" value="' + leftLetter + '" maxlength="1" onkeypress="return event.charCode >= 48 && event.charCode <= 57" class="plate-char plate-input sub-number icon-stack-2x" style=""/>' +
									'<input type="text" ind="7" value="' + rightLetter + '" maxlength="1" onkeypress="return event.charCode >= 48 && event.charCode <= 57" class="plate-char plate-input sub-number icon-stack-2x" style="margin-left: 0.32em;"/>');
					}
					else {
						part4.html(	'<span class="icon stack-fitst icon-stack-2x">&#x00A5;</span>' +
									'<span class="icon icon-stack-2x plate-char sub-number">' + leftLetter + '</span>' +
									'<span class="icon icon-stack-2x plate-char sub-number" style="margin-left: 0.306em;">' + rightLetter + '</span>');
					}
					place.append(part4);
				}
				else if (plugin.settings.type == 'protocol') {
					// Part 2
					var part2 = $('<div>').addClass('icon-stack');
					part2.html(	'<span class="icon stack-fitst icon-stack-2x">&#x00A8;</span>' +
								'<span class="icon icon-stack-2x">&#x00A9;</span>');
					place.append(part2);
					
					// Part 3
					var part3 = $('<div>').attr('style', 'display:inline;');
					for (var i = 0; i < 4; i++) {
						var current = plugin.settings.number[i];
						
						var number = parseInt(current,10);
						if (isNaN(number))
							number = '&#x0020;';
						var tmp = $('<div>').addClass('icon-stack');
						if (plugin.settings.edit) {
							tmp.html(	'<span class="icon stack-fitst icon-stack-2x">&#x00A3;</span>' + 
										'<input type="text" ind="' + i + '" value="' + number + '" maxlength="1" onkeypress="return event.charCode >= 48 && event.charCode <= 57" class="plate-char plate-input plate-number icon-stack-2x number-' + i + '"/>');
						}
						else {
							tmp.html(	'<span class="icon stack-fitst icon-stack-2x">&#x00A3;</span>' + 
										'<span class="icon icon-stack-2x plate-char">' + number + '</span>');
						}

						part3.append(tmp);
					}
					place.append(part3);
				}
				
				var part5 = $('<div>').addClass('icon-stack');
				part5.html(	'<span class="icon stack-fitst icon-stack-2x">&#x00A6;</span>');
				place.append(part5);
			}
			else if (plugin.settings.type == 'motorcycle') {
				var part1 = '<div class="icon-stack motorcycle">' + 
								'<span class="icon icon-stack-2x">&#x00AA;</span>' +
								'<span class="icon icon-stack-2x stack-fitst" style="color:#0147A9;">&#x00AC;</span>' +
								'<span class="icon icon-stack-2x" style="color:#FFFFFF;">&#x00AB;</span>' +
								'<span class="icon icon-stack-2x" style="color:#00A651;">&#x00AE;</span>' +
								'<span class="icon icon-stack-2x" style="color:#ED1C24;">&#x00AF;</span>';
				
				for (var i = 0; i < 8; i++) {
					var current = plugin.settings.number[i];
					
					var number = parseInt(current,10);
					if (isNaN(number))
						number = '&#x0020;';
					if (plugin.settings.edit) {
						part1 +=	'<input type="text" ind="' + i + '" value="' + number + '" maxlength="1" onkeypress="return event.charCode >= 48 && event.charCode <= 57" class="plate-char plate-input plate-number icon-stack-2x number-' + i + ' pchar' + i + '"/>';
					}
					else {
						part1 +=	'<span class="icon icon-stack-2x plate-char pchar' + i + '">' + number + '</span>';
					}
				}
				
				part1 +=	'</div>';
				place.append(part1);
			}
			else if (plugin.settings.type == 'historical') {
				var part1 = '<div class="icon-stack historical">' + 
								'<img alt="tehran" src="pic/tehran.png" class="img-plate">' +
								'<span class="icon icon-stack-2x stack-fitst" style="color:#0147A9;">&#x00B1;</span>' +
								'<span class="icon icon-stack-2x" style="color:#FFF;">&#x00B2;</span>' +
								'<span style="color:#FFFFFF;" class="icon icon-stack-2x">&#x00B3;</span>' +
								'<span style="color:#00A651;" class="icon icon-stack-2x">&#x00B4;</span>' +
								'<span class="icon icon-stack-2x" style="color:#ED1C24;">&#x00B5;</span>';
				
				part1 +=	'</div>';
				place.append(part1);
				
				var part2 = '<div class="icon-stack historical">' + 
								'<span class="icon icon-stack-2x" style="color:#643200;">&#x00B7;</span>' +
								'<span class="icon icon-stack-2x" style="color:#FFF;">&#x00B8;</span>';
				for (var i = 0; i < 5; i++) {
					var current = plugin.settings.number[i];
					
					var number = parseInt(current,10);
					if (isNaN(number))
						number = '&#x0020;';
					if (plugin.settings.edit) {
						part2 +=	'<input type="text" ind="' + i + '" value="' + number + '" maxlength="1" onkeypress="return event.charCode >= 48 && event.charCode <= 57" class="plate-char plate-input plate-number icon-stack-2x number-' + i + ' pchar' + i + '"/>';
					}
					else {
						part2 +=	'<span class="icon icon-stack-2x plate-char pchar' + i + '">' + number + '</span>';
					}
				}
				place.append(part2);
			}
			else if (plugin.settings.type == 'freeTradeZone') {
				var part1 = '<div class="icon-stack freeTradeZone">' + 
								'<span class="icon icon-stack-2x stack-fitst" style="color:#0147A9;">&#x00B1;</span>' +
								'<span style="color:#FFFFFF;" class="icon icon-stack-2x">&#x00CC;</span>' +
								'<span style="color:#00A651;" class="icon icon-stack-2x">&#x00B4;</span>' +
								'<span class="icon icon-stack-2x" style="color:#ED1C24;">&#x00B5;</span>' +
								get_place_chars();
				
				part1 +=	'</div>';
				place.append(part1);
				
				var part2 = '<div class="icon-stack freeTradeZone">' + 
								'<span class="icon icon-stack-2x" style="color:#FFF;">&#x00B7;</span>' +
								'<span class="icon-stack-2x en-plate">' + plugin.settings.number.substring(0, totalInput) + '</span>';
				for (var i = 0; i < 5; i++) {
					var current = plugin.settings.number[i];
					
					var number = parseInt(current,10);
					if (isNaN(number))
						number = '&#x0020;';
					if (plugin.settings.edit) {
						part2 +=	'<input type="text" ind="' + i + '" value="' + number + '" maxlength="1" onkeypress="return event.charCode >= 48 && event.charCode <= 57" class="plate-char plate-input plate-number icon-stack-2x number-' + i + ' pchar' + i + '"/>';
					}
					else {
						part2 +=	'<span class="icon icon-stack-2x plate-char pchar' + i + '">' + number + '</span>';
					}
				}
				place.append(part2);
			}
			
			place.css({
				color		: 	get_color(letter),
				background	: 	get_background(letter),
				fontSize	: 	plugin.settings.size
			});

			if (plugin.settings.edit) {
				place.find('input').css({
					'color'		: 	get_color(letter)
				});
			}
			
			if (Object.hasOwnProperty.call(window, "ActiveXObject") && !window.ActiveXObject) {
				// is IE11
				place.addClass('plateContainerIE11');
			}
			else if (navigator.userAgent.indexOf('Chrome')>0) {
				// is Chrome
				place.addClass('plateContainerChrome');
			}
			
			if (plugin.settings.edit) {
				plugin.element.find('.plate-input').off('keyup', handleKeyUp);
				plugin.element.find('.plate-input').on('keyup', handleKeyUp);
			}
		}
		
		var handleKeyUp = function(e) {
			var isLetter = $(this).hasClass('plate-letter');
			var ind = parseInt($(this).attr('ind'), 10);
			var keyCode = e.keyCode ? e.keyCode : e.which;
			var key = String.fromCharCode(keyCode);
			switch(keyCode) {
				case 9:
					if (e.shiftKey)
						goto_before(ind);
					else
						goto_next(ind);
					break;
				// left
				case 37:
					goto_before(ind);
					break;
				// right
				case 39:
					goto_next(ind);
					break;
				default:
					if (isLetter) {
						key = key.toLowerCase();
						if (key == 'ü') key = '\\';
						if (key == 'û') key = '[';
						if (key == '¼') key = ',';
						if (key == 'º') key = ';';
						// valid letter
						if (isValidLetter(key)) {
							$(this).val(key);
							letter = key;
							set_backgound(letter);
							goto_next(ind);
						}
					}
					else {
						// 0 - 9
						if (48 <= keyCode && keyCode <= 57) {
							$(this).val(key);
							$(this).parent().find('.en-plate').text(plugin.get_number());
							goto_next(ind);
						}
						else if (96 <= keyCode && keyCode <= 105) {
							goto_next(ind);
						}
					}
					break;
			}
		}
		
		var goto_before = function(index) {
			if (index == 0)
				index++;
			plugin.element.find('input:eq(' + (index-1) + ')').select().focus();
		}
		
		var goto_next = function(index) {
			if (index == totalInput-1)
				index--;
			plugin.element.find('input:eq(' + (index+1) + ')').select().focus();
		}
		
		var set_backgound = function(letter) {
			plugin.element.css({
				color		: 	get_color(letter),
				background	: 	get_background(letter)
			});
			plugin.element.find('input').css({
				'color'		: 	get_color(letter)
			});
		}
		
		var get_color = function(letter) {
			switch (plugin.settings.type) {
				case 'national':
					switch(letter) {
						default:
							return '#000000';
						case 'h':
						case '\\':
							return '#FFFFFF';
					}
				case 'protocol':
				case 'historical':
					return '#FFFFFF';
				case 'motorcycle':
				case 'freeTradeZone':
					return '#000000';
			}
		}
		
		var get_background = function(letter) {
			switch (plugin.settings.type) {
				case 'national':
					switch(letter) {
						default:
							return '#FFFFFF';
						case 'h':
							return '#ED1C24';
						case '\\':
							return '#005329';
						case 'u':
						case ';':
						case 'j':
							return '#FFC913';
					}
				case 'protocol':
					return '#ED1C24';
				case 'motorcycle':
				case 'historical':
					return '#FFFFFF';
				case 'freeTradeZone':
					return '#000000';
			}
		}
		
		var get_place_chars = function() {
			switch (plugin.settings.place) {
				case 'anzali':
					return 	'<span class="icon icon-stack-2x" style="color:#FFF;">&#x00C3;</span>' +
							'<span class="icon icon-stack-2x" style="color:#FDB913;">&#x00C4;</span>' +
							'<span class="icon icon-stack-2x" style="color:#0064B0;">&#x00C5;</span>' +
							'<span class="icon icon-stack-2x" style="color:#186131;">&#x00C6;</span>';
				case 'aras':
					return 	'<span class="icon icon-stack-2x" style="color:#FFF;">&#x00BF;</span>' +
							'<span class="icon icon-stack-2x" style="color:#1D9E4F;">&#x00C0;</span>' +
							'<span class="icon icon-stack-2x" style="color:#FAA61A;">&#x00C1;</span>';
				case 'arvand':
					return  '<span class="icon icon-stack-2x" style="color:#FFF;">&#x00BB;</span>' +
							'<span class="icon icon-stack-2x" style="color:#F14B34;">&#x00BC;</span>' +
							'<span class="icon icon-stack-2x" style="color:#0394D3;">&#x00BD;</span>';
				case 'kish':
					return 	'<span class="icon icon-stack-2x" style="color:#FFF;">&#x00BA;</span>';
				case 'maku':
					return 	'<span class="icon icon-stack-2x" style="color:#FFF;">&#x00C8;</span>' +
							'<span class="icon icon-stack-2x" style="color:#5A5374;">&#x00C9;</span>' +
							'<span class="icon icon-stack-2x" style="color:#FEE46B;">&#x00CA;</span>';
				default:
					return '';
			}
		}
		
		init();
	}
})(jQuery);
$(document).ready(
		function() {
			// 关键字
			var keyWord = new Array("private", "public", "abstract", "class",
					"final", "implements", "interface", "native", "new",
					"static", "synchronized", "break", "continue", "return",
					"do", "while", "if", "else", "for", "switch", "case",
					"default", "try", "catch", "throw", "import", "package",
					"boolean", "byte", "char", "int", "double", "float",
					"long", "short", "null", "true", "false", "this", "void",
					"goto", "const");
			var mChar = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i",
					"j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u",
					"v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G",
					"H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
					"T", "U", "V", "W", "X", "Y", "Z");
			var number = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8",
					"9");
			$("#open").click(function(event) {
				var fileInput = document.getElementById("fileInput");
				fileInput.click();
			});
			$("#fileInput").change(function(event) {
				var files = this.files;
				for (var i = 0, f; f = files[i]; i++) {
					var reader = new FileReader();
					reader.onload = (function(file) {
						return function(e) {
							$("#text").html(this.result);
							wAnalysis();
						};
					})(f);
					// 读取文件内容
					reader.readAsText(f);
				}

			});
			// 词法分析器
			function wAnalysis() {
				var mCode = $("#text").val();
				var i = 0;
				var temp;
				var num;// 用于记录哪个字节码
				var str;
				for (var j = 0; j < mCode.length; j++) {
					temp = mCode.charAt(i);
					str = "";
					num = 0;
					// 有换行或者空格时跳过
					while (temp == ' ' || temp == '\n') {
						i++;
						temp = mCode.charAt(i);
						continue;
					}
					if ((temp >= 'a' && temp <= 'z')
							|| (temp >= 'A' && temp <= 'Z')) {

						while ((temp >= '0' && temp <= '9')
								|| (temp >= 'a' && temp <= 'z')
								|| (temp >= 'A' && temp <= 'Z')) {

							str += temp;
							temp = mCode.charAt(++i);
						}
						// 关键字
						num = 51;
						var k;
						for (k = 0; k < keyWord.length; k++) {
							if (str == keyWord[k]) {
								num += k;
								break;
							}
						}
						// 字符
						num = 1;
						for (k = 0; k < mChar.length; k++) {
							if (str == keyWord[k]) {
								num += k;
								break;
							} else {
								num = 0;
							}
						}

					} else if (temp >= '0' && temp <= '9') {// 数字

						while (temp >= '0' && temp <= '9') {
							str += temp;
							temp = mCode.charAt(++i);
						}
						num = 100;
						for (var k = 0; k < number.length; k++) {
							if (str == number[k]) {
								num += k;
								break;
							} else {
								num = 0;
							}
						}
					} else {// 其他字符
						var temp1 = mCode.charAt(i + 1);
						i++;
						switch (temp) {
						case '_':
							num = 129;
							str += "_";
							break;
						case '+':
							str += "_";
							if (temp1 == '=') {
								num = 140;
								str += "=";
							} else if (temp1 == '+') {
								str += "+";
								num = 130;
							} else {
								num = 110;
							}
							break;
						case '-':
							str += "-";
							if (temp1 == '=') {
								str += "=";
								num = 141;
							} else if (temp1 == '-') {
								str += "-";
								num = 131;
							} else {
								num = 111;
							}
							break;
						case '*':
							str += "*";
							if (temp1 == '=') {
								str += "=";
								num = 142;
							} else {
								num = 112;
							}
							break;
						case '/':
							str += "/";
							if (temp1 == '=') {
								str += "=";
								num = 143;
							} else {
								num = 113;
							}
							break;
						case '%':
							str += "%";
							num = 114;
							break;
						case '=':
							str += "=";
							if (temp1 == '=') {
								str += "=";
								num = 132;
							} else {
								num = 127;
							}
							break;
						case '>':
							str += ">";
							if (temp1 == '=') {
								str += "=";
								num = 134;
							} else if (temp1 == '>') {
								str += "_>";
								num = 137;
							} else {
								num = 119;
							}
							break;
						case '<':
							str += "<";
							if (temp1 == '=') {
								str += "=";
								num = 135;
							} else if (temp1 == '<') {
								str += "<";
								num = 136;
							} else {
								num = 120;
							}
							break;
						case '&':
							str += "&";
							if (temp1 == '&') {
								str += "&";
								num = 138;
							} else {
								num = 121;
							}
							break;
						case '|':
							str += "|";
							if (temp1 == '|') {
								str += "|";
								num = 139;
							} else {
								num = 122;
							}
							break;
						case '^':
							str += "^";
							num = 123;
							break;
						case '~':
							str += "~";
							num = 124;
							break;
						case '!':
							str += "!";
							if (temp1 == '=') {
								str += "=";
								num = 133;
							} else {
								num = 125;
							}
							break;
						case ';':
							str += ";";
							num = 128;
							break;
						case '"':
							str += "\"";
							num = 145;
							break;
						}
					}
					alert(str + " " + num + " " + i);
				}
			}
			// // 添加行号
			// function createTextAreaWithLines(id) {
			// var lineObjOffsetTop = 2;
			// var el = document.createElement('DIV');
			// var ta = document.getElementById(id);
			// ta.parentNode.insertBefore(el, ta);
			// el.appendChild(ta);
			// el.className = 'textAreaWithLines';
			// el.style.width = (ta.offsetWidth + 30) + 'px';
			// ta.style.position = 'absolute';
			// ta.style.left = '30px';
			// el.style.height = (ta.offsetHeight + 2) + 'px';
			// el.style.overflow = 'hidden';
			// el.style.position = 'relative';
			// el.style.width = (ta.offsetWidth + 30) + 'px';
			// var lineObj = document.createElement('DIV');
			// lineObj.style.position = 'absolute';
			// lineObj.style.top = lineObjOffsetTop + 'px';
			// lineObj.style.left = '0px';
			// lineObj.style.width = '27px';
			// el.insertBefore(lineObj, ta);
			// lineObj.style.textAlign = 'right';
			// lineObj.className = 'lineObj';
			// var string = '';
			// for (var no = 1; no < 20; no++) {
			// if (string.length > 0)
			// string = string + '<br>';
			// string = string + no;
			// }
			// ta.onkeydown = function() {
			// positionLineObj(lineObj, ta);
			// };
			// ta.onmousedown = function() {
			// positionLineObj(lineObj, ta);
			// };
			// ta.onscroll = function() {
			// positionLineObj(lineObj, ta);
			// };
			// ta.onblur = function() {
			// positionLineObj(lineObj, ta);
			// };
			// ta.onfocus = function() {
			// positionLineObj(lineObj, ta);
			// };
			// ta.onmouseover = function() {
			// positionLineObj(lineObj, ta);
			// };
			// lineObj.innerHTML = string;
			// }
			// function positionLineObj(obj, ta) {
			// obj.style.top = (ta.scrollTop * -1 + lineObjOffsetTop) + 'px';
			// }
		});
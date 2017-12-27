define(function() {
	var b = 0;
	return {
		selectTime: function() {
			(function($) {
				$.init();
				var result = $('.demo2_ti')[0];
				var result1 = $('.demo2_ti1')[0];
				var btns = $('.btn_t');
				var a = 0;
				//时间段
				var result2 = $('.demo1_ti')[0];
				var result22 = $('.demo1_ti1')[0];
				var btns2 = $('.btn_t11');
				btns.each(function(i, btn) {
					btn.addEventListener('tap', function() {
						var _self = this;
						if(_self.picker) {
							_self.picker.show(function(rs) {
								result.innerText = rs.text;
								_self.picker.dispose();
								_self.picker = null;
							});
						} else {
							var optionsJson = this.getAttribute('data-options') || '{}';
							var options = JSON.parse(optionsJson);
							var id = this.getAttribute('id');
							_self.picker = new $.DtPicker(options);
							_self.picker.show(function(rs) {
								a++;
								if(a == 1) {
									result.innerHTML = rs.text;
									_self.value = "+截止日期";
								} else {
									result1.style.display = "block";
									result1.innerHTML = rs.text;
									_self.remove();
								}
								_self.picker.dispose();
								_self.picker = null;
							});
						}
					}, false);
				});
				//时间段
				btns2.each(function(i, btn) {
					btn.addEventListener('tap', function() {
						var _self = this;
						if(_self.picker) {
							_self.picker.show(function(rs) {
								result2.innerText = rs.text;
								_self.picker.dispose();
								_self.picker = null;
							});
						} else {
							var optionsJson = this.getAttribute('data-options') || '{}';
							var options = JSON.parse(optionsJson);
							var id = this.getAttribute('id');
							_self.picker = new $.DtPicker(options);
							_self.picker.show(function(rs) {
								b++;
								if(b == 1) {
									result2.innerHTML = rs.text;
								} else {
									result22.style.display = "block";
									result22.innerHTML = rs.text;
									_self.style.display = "none";
								}
								_self.picker.dispose();
								_self.picker = null;
							});
						}
					}, false);
				});

			})(mui);
		},
		/**
		 * 点击禁止选择时间
		 */
		NoTime: function() {
			$(".iss_ch").click(function() {
				if($(this).is(':checked')) {
					$("#demo1").attr("disabled", "disabled");
					if($(".demo1_ti").html() != "" && $(".demo1_ti1").html() == "") {
						$(".demo1_ti").html("");
						b = 0;
					} else if($(".demo1_ti").html() != "" && $(".demo1_ti1").html() != "") {
						b = 0;
						$(".demo1_ti").html("");
						$(".demo1_ti1").html("");
						$(".demo1_ti1").hide();
						$("#demo1").show()
					}
				} else {
					$("#demo1").attr("disabled", false);
				}
			})
		},
		/**
		 * 选择地址
		 */
		adress: function() {
			(function($, doc) {
				$.init();
				$.ready(function() {
					var cityPicker3 = new $.PopPicker({
						layer: 3
					});
					cityPicker3.setData(cityData3);
					var showCityPickerButton = doc.getElementById('showCityPicker3');
					var cityResult3 = doc.querySelector(".adddss")
					var areadId = doc.querySelector(".areadId")
					showCityPickerButton.addEventListener('tap', function(event) {
						cityPicker3.show(function(items) {
							if(items[2].text == undefined) {
								cityResult3.value = items[0].text + items[1].text;
								areadId.value = items[1].value;
							} else {
								cityResult3.value = items[0].text + items[1].text + items[2].text;
								areadId.value = items[2].value;
							}

							//返回 false 可以阻止选择框的关闭
							//return false;
						});
					}, false);
				});
			})(mui, document);
		},
		/**
		 * 主页 选项卡
		 */
		indexTypeClick: function() {
			$(".index_address_tit>div").click(function() {
				$(this).addClass("active").siblings().removeClass("active");
				$(this).find("img").attr("src", "images/icon/down_active.png").parent().siblings().find("img").attr("src", "images/icon/down.png")
				if($(".index_address_list1").hasClass("active")) {
					$(".index_address_cont1").show(300);
					$(".index_address_cont2").hide(300);
					$(".index_address_cont3").hide(300);
					var heighttt = $(window).height();
					var heightt =$(this).parent().parent().height();
					var c_height = heighttt - heightt - 80 +"px"
					$(".close_box").css("height",c_height);
				} else if($(".index_address_list2").hasClass("active")) {
					$(".index_address_cont2").show(300);
					$(".index_address_cont1").hide(300);
					$(".index_address_cont3").hide(300);
					var heighttt = $(window).height();
					var heightt =$(this).parent().parent().height();
					var c_height = heighttt - heightt - 80 +"px"
					$(".close_box").css("height",c_height);
				} else if($(".index_address_list3").hasClass("active")) {
					$(".index_address_cont3").show(300);
					$(".index_address_cont2").hide(300);
					$(".index_address_cont1").hide(300);
					var heighttt = $(window).height();
					var heightt =$(this).parent().parent().height();
					var c_height = heighttt - heightt - 80 +"px"
					$(".close_box").css("height",c_height);
				}
				
				//得到页面宽高
				var heighttt = $(window).height();
				var heightt =$(this).parent().parent().height();
				var c_height = heighttt - heightt - 80 +"px"
				$(".close_box").css("height",c_height);
				
			});

			$(".addresse").click(function() {
				if($(".index_address_list_box").is(":hidden")) {
					$(".index_address_list_box").show();
				} else {
					$(".index_address_list_box").hide();
				}
			});
			$(".close_box").click(function(){
				$(".index_address_list_box").hide();
			})
		},
//		close_box: function(){
//			//得到页面宽高
//			var heighttt = $(window).height();
//			var widthhh = $(window).width();
//			var widthh =$(".index_address_list").width();
//			var heightt =$(".index_address_list").height();
//			var c_width = widthhh - widthh +"px"
//			var c_height = heighttt - heightt +"px"
//			$(".close_box").css("height",c_height);
//		},

	}
});
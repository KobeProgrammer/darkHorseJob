/**
 * 存入其他js调用的通用方法
 */

define(["ini"], function(ini) {
	var wait = 60;
	return {
		/**
		 * 验证手机号是否合法
		 * @param {Object} val 手机号
		 *  不合法 true ， 合法 false
		 */
		mobileValidator: function(val) {
			if(!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(val))) {
				return true;
			}
			return false;
		},
		/**
		 * 验证身份证号码 
		 * 不合法 true ， 合法 false
		 * @param {Object} val
		 */
		cardValidator: function(val) {
			if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val))) {
				return true;
			}
			return false;
		},
		/**
		 * 验证是否为空
		 * @param {Object} val 
		 * 为空 true ，不为空 false 
		 */
		emptyValidator: function(val) {
			if(val == null || val == "") {
				return true;
			}
			return false;
		},
		/**
		 * 验证码倒计时
		 * @param {Object} o 点击按钮this
		 */
		time: function(o) {
			if(wait == 0) {
				o.removeAttribute("disabled");
				o.value = "获取验证码";
				o.innerHTML = "获取验证码";
				wait = 60;
				return wait;
			} else {
				o.setAttribute("disabled", true);
				o.value = "重新发送(" + wait + ")";
				o.innerHTML = "重新发送(" + wait + ")";
				wait--;
				return wait;
			}
		},
		/**
		 * 获取地址栏中的参数信息
		 * 
		 * @param name
		 *            参数名
		 */
		GetQueryString: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if(r != null)
				return unescape(r[2]);
			return null;
		},
		/**
		 * 获取微信中 的 用户同意授权，获取code
		 * @param {Object} redirect_uri
		 * 					授权后重定向的回调链接地址， 请使用 urlEncode 对链接进行处理
		 * @param {Object} scope
		 * 				应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息 ）
		 */
		getWeiXinCode: function(redirect_uri, scope) {
			var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + ini.APPID + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=' + scope + '&state=123#wechat_redirect';
			window.location.href = encodeURI(url);
		},
		/**
		 * 格式化时间
		 * @param {Object} time new date(时间)
		 * @param {Object} format 时间合适 ：yyyy/MM/dd hh:mm:ss
		 */
		format: function(time,format) {
			var o = {
				"M+": time.getMonth() + 1, //month
				"d+": time.getDate(), //day
				"h+": time.getHours(), //hour
				"m+": time.getMinutes(), //minute
				"s+": time.getSeconds(), //second
				"q+": Math.floor((time.getMonth() + 3) / 3), //quarter
				"S": time.getMilliseconds() //millisecond
			}
			if(/(y+)/.test(format)) format = format.replace(RegExp.$1,
				(time.getFullYear() + "").substr(4 - RegExp.$1.length));
			for(var k in o)
				if(new RegExp("(" + k + ")").test(format))
					format = format.replace(RegExp.$1,
						RegExp.$1.length == 1 ? o[k] :
						("00" + o[k]).substr(("" + o[k]).length));
			return format;
		},
		/**
		 *  广播无缝轮播
		 */
		nes : function() {
				//获取列表父容器
				var vip = document.getElementById("vip");
				//得到li个数
				var numb = $("#list li").length;
				//获取信息列表
				var list = document.getElementById("list");
				//创建第二个列表设置一系列样式id等
				var list1 = document.createElement("ul");
				list1.setAttribute("id", "list1");
				//初始位置为300正好在第一个列表的下面
				list1.style.top = 50*numb + "px";
				list1.style.position = "absolute";
				//插入文档流
				vip.appendChild(list1);
				//把第一个列表的结构内容复制给第二个
				list1.innerHTML = list.innerHTML;
				//第一个列表
				function b() {
					//top值为当前的top减10   
					list.style.top = parseInt(list.style.top) - 10 + "px";
					//如果top值为-300那么初始化top
					if(parseInt(list.style.top) == -50*numb) {
						list.style.top = 0;
					}
					//这里是实现间隔滚动判断
					//当top值整除50(每个li的高度)时候清除定时器  
					if(parseInt(list.style.top) % 50 == 0) {
						clearInterval(time);
						//然后两秒后再次执行time=setInterval
						se = setTimeout(function() {
							time = setInterval(b, 30);
						}, 2000);
					}
				};
				//定时器
				time = setInterval(b, 30);
				//第二个列表与第一个列表操作一样，只是修改了高度
				function c() {
					list1.style.top = parseInt(list1.style.top) - 10 + "px";
					if(parseInt(list1.style.top) == 0) {
						list1.style.top = 100 + "px";
					}
					if(parseInt(list1.style.top) % 50 == 0) {
						clearInterval(time1);
						se1 = setTimeout(function() {
							time1 = setInterval(c, 30);
						}, 2000);
					}
				};
				time1 = setInterval(c, 30);
				//鼠标移入列表时 清除两个定时器
				vip.onmouseover = function() {
					clearTimeout(se);
					clearTimeout(se1);
					clearInterval(time);
					clearInterval(time1);
				};
				//鼠标划出时先判断如果定时器在执行则清除
				vip.onmouseout = function() {
					if(time && time1) {
						clearInterval(time);
						clearInterval(time1)
					}
					if(se && se1) {
						clearTimeout(se);
						clearTimeout(se1)
					}
					//再次执行定时器
					se = setTimeout(function() {
						time = setInterval(b, 30);
					}, 2000);
					se1 = setTimeout(function() {
						time1 = setInterval(c, 30);
					}, 2000);
				};
			}
	}
});
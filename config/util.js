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
			var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ini.APPID+'&redirect_uri=' + redirect_uri + '&response_type=code&scope='+scope+'&state=123#wechat_redirect';
			window.location.href=encodeURI(url);
		}
	}
});
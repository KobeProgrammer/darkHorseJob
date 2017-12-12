/**
 * 存入其他js调用的通用方法
 */

define(function() {
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
		}
	}
});
/**
 * 每个页面初始化时必须引用 存放一些通用的信息
 * 如：跨域网址，sessionStorage 
 * 技术：require.js 模块化
 * @user : 谢东生
 * @time : 2017年11月13日10:35:31
 */
define(function() {
	var sessionStorage = window.sessionStorage;
	var localStorage = window.localStorage;
	return {
		/**
		 * 跨域的网址的通用部分
		 */
		url: "http://127.0.0.1:8080/darkHorseJob",
		/**
		 * 获取session中的值
		 * @param {Object} type
		 */
		getSessionParams: function(type) {
			switch(type) {
				case "verificationCode"://验证码
					{
						return sessionStorage.getItem("verificationCode");
					}
					break;
			}
		},
		/**
		 * 设置session中的值
		 * @param {Object} type
		 * @param {Object} value
		 */
		setSessionParams: function(type, value) {
			switch(type) {
				case "verificationCode"://验证码
					{
						sessionStorage.setItem("verificationCode", value);
					}
					break;
			}
		},
		/**
		 * 获取localStorage中的值
		 * @param {Object} type
		 */
		getLocalParams : function(type){
			switch(type) {
				case "call"://电话号码
					{
						return localStorage.getItem("call");
					}
					break;
			}
		},
		/**
		 * 设置localStorage中的值
		 * @param {Object} type
		 * @param {Object} value
		 */
		setLocalParams : function(type, value){
			switch(type) {
				case "call"://电话号码
					{
						localStorage.setItem("call", value);
					}
					break;
			}
		}
	}
});
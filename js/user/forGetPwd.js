/**
 * 忘记密码
 * @user 谢东生
 * @time :2017年12月27日20:45:50
 */
require.config({
	baseUrl: "", //根目录
	paths: {
		jquery: "js/jquery-1.11.0",
		Vue: "js/vue.min",
		resource: "js/vue-resource",
		ini: "config/ini",
		util: "config/util",
		commont: "js/commont",
	},

	//	waitSeconds: 7//超时时间
});

require(['jquery', 'ini', 'Vue', 'util', 'commont'], function($, ini, Vue, util, commont) {
	var url = ini.url; //获取通用的url

	var vm = new Vue({
		el: '#vueUpdatePwd',
		data: {
			userCall: ini.getLocalParams("call"),
			oldPwd : null,
			newPwd: null,
			agePwd: null,
			isPass: false, //原是否通过验证
			code : null,//短信验证码

		},
		watch: { //存入 监听值得变化
		},
		mounted: function() { //页面初始化时 执行
			this.queryUser();
		},
		methods: {
			/**
			 * 修改密码
			 */
			updatePwd: function() {
				if(this.code == null || this.code != ini.getSessionParams("verificationCode")){
					mui.toast('验证码有误');
				}else if(this.newPwd == null || this.agePwd == null) {
					mui.toast('密码不能为空！');
				} else if(this.agePwd != this.newPwd) {
					mui.toast('两次密码不一致！');
				} else if(this.agePwd.length < 6 || this.agePwd.length > 12) {
					mui.toast('密码长度在6~12之间');
				} else {
					this.doUserPwd(); //修改密码
				}
			},
			/**
			 * 查询
			 */
			queryUser: function() {
				var _this = this;
				$.ajax({
					url: url + '/user/login',
					type: 'POST',
					data: {
						userCall: _this.userCall
					},
					dataType: 'json',
					async: false,
					success: function(data) {
						if(data.code == 200 && data.obj != null) {
							_this.oldPwd = data.obj.userPwd;
						}
					}
				})
			},
			/**
			 * 重置密码
			 */
			doUserPwd: function() {
				_this = this;
				$.ajax({
					url: url + '/user/doUserPwd',
					type: 'POST',
					data: {
						userCall: _this.userCall,
						oldPwd: _this.oldPwd,
						newPwd: _this.newPwd
					},
					dataType: 'json',
					success: function(data) {
						if(data.code == 200) {
							mui.toast('修改成功');
							setTimeout(function() {
								location.href = "personal.html";
							}, 200)
						}
					}
				})
			},
			/**
			 * 点击获取验证码
			 */
			getCode: function(e) {
				var _this = this;
				if(util.mobileValidator(_this.userCall)) {
					mui.toast('手机号有误！');
				} else {
					$.ajax({
						type: "post",
						url: url + "/user/userSendCode",
						data: {
							"userCall":_this.userCall,
							"type" : 1
						},
						dataType: 'json',
						success: function(data) {
							if(data.code > 0) {
								time(e.target);
								ini.setSessionParams("verificationCode", data.obj); //把验证码存入sessionStorage
							}else {
								mui.toast('发送验证失败！');
							}
						}
					});
				}
			}

		},
		updated: function() { // 创建成功后

		}
	})

	var wait = 60;
	/**
	 * 时间倒计时
	 */
	function time(o) {
		if(wait == 0) {
			o.removeAttribute("disabled");
			o.value = "获取验证码";
			o.innerHTML = "获取验证码";
			wait = 60;
		} else {
			o.setAttribute("disabled", true);
			o.value = "重新发送(" + wait + ")";
			o.innerHTML = "重新发送(" + wait + ")";
			wait--;
			setTimeout(function() {
				time(o)
			}, 1000)
		}
	}

});
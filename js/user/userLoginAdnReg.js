/**
 * 用户用户登录和注册的JS
 * @user 谢东生
 * @time :2017年12月11日17:04:40
 */
require.config({
	baseUrl: "", //根目录
	paths: {
		jquery: "js/jquery-1.11.0",
		Vue: "js/vue.min",
		resource: "js/vue-resource",
		ini: "config/ini",
		util: "config/util"
	}
	//	waitSeconds: 7//超时时间
});

require(['jquery', 'ini', 'Vue', 'util'], function($, ini, Vue, util) {
	var url = ini.url; //获取通用的url

	/**
	 * 点击获取验证码
	 */
	$("#getCode").on("click", function() {
		if(util.mobileValidator($(".reg_phone").val())) {
			mui.toast('手机号有误！');
		} else {
			$.ajax({
				type: "post",
				url: url + "/user/userSendCode",
				data: {
					"userCall": $(".reg_phone").val()
				},
				dataType: 'json',
				success: function(data) {
					if(data.code > 0) {
						util.time(this);//定时效果60s
						ini.setSessionParams("verificationCode",data.obj.code);//把验证码存入sessionStorage
					} else if(data.code == -400){//已被注册
						mui.toast(data.mssage);
					}else{
						mui.toast('发送验证失败！');
					}

				}
			});
		}
	});

	/**
	 * 点击注册
	 */
	$("#registerUser").on("click", function() {
		var code = ini.getSessionParams("verificationCode");
		console.log(code)
		if(util.mobileValidator($(".reg_phone").val())) {
			mui.toast('手机号有误！');
		} else if($(".reg_pwd").val().length > 12 || $(".reg_pwd").val().length < 6) {
			mui.toast('请输入6-12位密码！');
		}else if(typeof(code) == "undefined"){
			mui.toast('验证码有误');
		}else if($(".reg_yzm").val() == "" || $(".log_pwd").val() != ini.getSessionParams("verificationCode")) {
			mui.toast('验证码有误');
		}else{
			$.ajax({
				type: "post",
				url: url + "/user/register",
				data: {
					"userCall": $(".reg_phone").val(),
					"userPwd" : $(".reg_pwd").val()
				},
				dataType: 'json',
				success: function(data) {
					if(data.code > 0) {
						//把验证码存入localStorage
						ini.setLocalParams("call",$(".reg_phone").val());
					} else {
						mui.toast('注册失败');
					}

				}
			});
		}
	});

});
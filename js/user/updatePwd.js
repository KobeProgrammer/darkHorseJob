/**
 * 修改密码
 * @user 谢东生
 * @time :2017年12月12日22:33:39
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
			odlPwd: null,
			newPwd: null,
			agePwd: null,
			isPass: false, //原是否通过验证

		},
		watch: { //存入 监听值得变化
		},
		mounted: function() { //页面初始化时 执行

		},
		methods: {
			/**
			 * 修改密码
			 */
			updatePwd: function() {
				this.queryUser();
				console.log(this.isPass)
				if(this.isPass == false) { //原密码不正确
					mui.toast('旧密码有误！');
				}else if(this.agePwd == null || this.agePwd == null){
					mui.toast('密码不能为空！');
				}else if(this.agePwd != this.newPwd) {
					mui.toast('两次密码不一致！');
				} else if(this.agePwd.length < 6 || this.agePwd.length > 12) {
					mui.toast('密码长度在6~12之间');
				} else {
					this.doUserPwd();//修改密码
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
						userCall: _this.userCall,
						userPwd: _this.odlPwd
					},
					dataType: 'json',
					async : false, 
					success: function(data) {
						if(data.code == 200 && data.obj != null) {
							_this.isPass = true;
						}else{
							_this.isPass = false;
						}
					}
				})
			},
			/**
			 * 修改密码
			 */
			doUserPwd: function() {
				_this = this;
				$.ajax({
					url: url + '/user/doUserPwd',
					type: 'POST',
					data: {
						userCall: _this.userCall,
						oldPwd: _this.odlPwd,
						newPwd : _this.newPwd
					},
					dataType: 'json',
					success: function(data) {
						if(data.code == 200) {
							mui.toast('修改成功');
							setTimeout(function() {
								location.href = "personal.html";
							}, 1000)
						}
					}
				})
			}
		},
		updated: function() { // 创建成功后

		}
	})

});
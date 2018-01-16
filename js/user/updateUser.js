/**
 * 更新用户信息
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
		layer: "js/layer/layer",
	},

	//	waitSeconds: 7//超时时间
});

require(['jquery', 'ini', 'Vue', 'util', 'commont', 'layer'], function($, ini, Vue, util, commont, layer) {
	var url = ini.url; //获取通用的url
	var vm = new Vue({
		el: '#vueUser',
		data: {
			urlAjax: url + '/user/doUser',
			userId: null,
			userName: null,
			userPwd: null,
			userCall: null,
			userSex: null,
			userBirthday: null,
			userPhoto: null,
			userComment: null,
			walletBean: 0,
			file: null,
		},
		watch: { //存入 监听值得变化
		},
		mounted: function() { //页面初始化时 执行
			this.queryUserById(); //根据用户ID查询用户的指定信息
			this.initialWallet(); //初始化钱包信息

		},
		methods: {
			queryUserById: function() {
				var _this = this;
				$.ajax({
					url: url + '/user/login',
					data: {
						"userCall": ini.getLocalParams("call")
					},
					type: 'POST',
					async: false,
					dataType: 'json',
					success: function(data) {
						if(data.code == 200 && data.obj != null) {
							_this.userName = data.obj.userName;
							_this.userCall = data.obj.userCall;
							_this.userSex = data.obj.userSex;
							_this.userBirthday = data.obj.userBirthday;
							_this.userId = data.obj.userId;
							_this.userPwd = data.obj.userPwd;
							if(data.obj.userPhoto != null) {
								_this.userPhoto = url + "/images/" + data.obj.userPhoto;
							} else {
								_this.userPhoto = "images/60x60.gif";
							}
						}
					}
				})
			},
			initialWallet: function() { //初始化钱包
				var _this = this;
				$.ajax({
					url: url + '/user/queryWalletByCall',
					type: 'POST',
					data: {
						userCall: ini.getLocalParams("call")
					},
					async: false,
					dataType: 'json',
					success: function(data) {
						console.log(data.obj.walletBean)
						if(data.code == 200 && data.obj != null) {
							_this.walletBean = data.obj.walletBean
						}
					}
				})
			},
			/**
			 * 点击保存
			 */
			doUser: function() {
				var _this = this;
				if(this.userName == null) {
					mui.toast('请输入真实姓名');
				} else if(util.mobileValidator(this.userCall)) {
					mui.toast('手机号有误');
				} else {

					var formData = new FormData();
					formData.append("userId", _this.userId)
					formData.append("userName", _this.userName)
					formData.append("userCall", _this.userCall)
					formData.append("userSex", $('input[name="userSex"]:checked').val())
					formData.append("userBirthday", _this.userBirthday)
					formData.append("userPwd", _this.userPwd)
					formData.append("userState", 1)
					formData.append("file", _this.file)
					$.ajax({
						type: "POST",
						url: url + '/user/doUser',
						data: formData, // 你的formid
						processData: false,
						contentType: false,
						error: function(request) {
							mui.toast('更新失败');
							console.log(request)
						},
						beforeSend: function() {
							var index = layer.load(1, {
								shade: [0.5, '#fff'] //0.1透明度的白色背景
							});
						},
						success: function(data) {
							if(data.code > 0) {
								mui.toast('更新成功');	
								setTimeout(function() {
									location.href = "personal.html";
								}, 200);
							} else if(data.code < 0) {
								layer.closeAll('loading'); //关闭加载层
								mui.toast('更新失败');
							}
						}
					});
				}
			},
			/**
			 * 点击头像更改
			 */
			updateImg: function() {
				var _this = this;
				$("#userPhoto").click(); //隐藏了input:file样式后，点击头像就可以本地上传
				$("#userPhoto").on("change", function(e) {
					var objUrl = _this.getObjectURL(this.files[0]); //获取图片的路径，该路径不是图片在本地的路径
					_this.userPhoto = objUrl;
					if(objUrl) {
						$("#pic").attr("src", objUrl); //将图片路径存入src中，显示出图片
					}
				});
			},
			/**
			 * 上传图片信息
			 * @param {Object} file
			 */
			getObjectURL: function(file) {
				this.file = file;
				var url = null;
				if(window.createObjectURL != undefined) { // basic
					url = window.createObjectURL(file);
				} else if(window.URL != undefined) { // mozilla(firefox)
					url = window.URL.createObjectURL(file);
				} else if(window.webkitURL != undefined) { // webkit or chrome
					url = window.webkitURL.createObjectURL(file);
				}
				return url;
			},
			myBm: function() { //我的报名
				if(typeof(ini.getLocalParams("userId")) == "undefined" || ini.getLocalParams("userId") == null) {
					mui.toast('请先登录！');
					setTimeout(function() {
						location.href = "loging.html"
					}, 200);
					return;
				}
				location.href = "mybm.html"
			},
			myQb: function() { //我的钱包
				if(typeof(ini.getLocalParams("userId")) == "undefined" || ini.getLocalParams("userId") == null) {
					mui.toast('请先登录！');
					setTimeout(function() {
						location.href = "loging.html"
					}, 200);
					return;
				}
				location.href = "temp.html"
			},
			MySc: function() { //我的收藏
				if(typeof(ini.getLocalParams("userId")) == "undefined" || ini.getLocalParams("userId") == null) {
					mui.toast('请先登录！');
					setTimeout(function() {
						location.href = "loging.html"
					}, 200);
					return;
				}
				location.href = "mysc.html"
			},
			myFb: function() { //我要发布
				if(typeof(ini.getLocalParams("userId")) == "undefined" || ini.getLocalParams("userId") == null) {
					mui.toast('请先登录！');
					setTimeout(function() {
						location.href = "loging.html"
					}, 200);
					return;
				}
				location.href = "myissue.html"
			},
			myUpdata: function() {
				if(typeof(ini.getLocalParams("userId")) == "undefined" || ini.getLocalParams("userId") == null) {
					mui.toast('请先登录！');
					setTimeout(function() {
						location.href = "loging.html"
					}, 200);
					return;
				}
				location.href = "pwdupdata.html"
			},
			qiandao: function() {
				if(typeof(ini.getLocalParams("userId")) == "undefined" || ini.getLocalParams("userId") == null) {
					mui.toast('请先登录！');
					setTimeout(function() {
						location.href = "loging.html"
					}, 200);
					return;
				}
				location.href = "qiandao.html"
			},
			myJl: function() {
				if(typeof(ini.getLocalParams("userId")) == "undefined" || ini.getLocalParams("userId") == null) {
					mui.toast('请先登录！');
					setTimeout(function() {
						location.href = "loging.html"
					}, 200);
					return;
				}
				location.href = "myjl.html"
			},
			/**
			 * 忘记密码
			 */
			myForGetPwd: function() {
				location.href = "forGetPwd.html"
			},
			/**
			 * 关于我们
			 */
			mygy: function() {
				location.href = "mygy.html"
			}

		},
		updated: function() { // 创建成功后

		}
	})
});
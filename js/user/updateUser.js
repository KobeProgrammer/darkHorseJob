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
	},

	//	waitSeconds: 7//超时时间
});

require(['jquery', 'ini', 'Vue', 'util', 'commont'], function($, ini, Vue, util, commont) {
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
			userCard: null,
			userBirthday: null,
			userPhoto: null,
			userComment: null,
			walletBean : 0,
			file: null,
		},
		watch: { //存入 监听值得变化
		},
		mounted: function() { //页面初始化时 执行
			this.queryUserById(); //根据用户ID查询用户的指定信息

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
					dataType: 'json',
					success: function(data) {
						if(data.code == 200) {
							_this.userName = data.obj.userName;
							_this.userCall = data.obj.userCall;
							_this.userSex = data.obj.userSex;
							_this.userCard = data.obj.userCard;
							_this.userBirthday = data.obj.userBirthday;
							_this.userId = data.obj.userId;
							_this.userPwd = data.obj.userPwd;
							_this.walletBean = data.obj.walletBean
							if(data.obj.userPhoto != null) {
								_this.userPhoto = url + "/" + data.obj.userPhoto;
							} else {
								_this.userPhoto = "images/60x60.gif";
							}
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
				} else if(util.cardValidator(this.userCard)) {
					mui.toast('身份证号码有误');
				} else if(util.mobileValidator(this.userCall)) {
					mui.toast('手机号有误');
				} else {

					var formData = new FormData();
					formData.append("userId",_this.userId)
					formData.append("userName",_this.userName)
					formData.append("userCall",_this.userCall)
					formData.append("userSex",$('input[name="userSex"]:checked').val())
					formData.append("userCard",_this.userCard)
					formData.append("userBirthday",_this.userBirthday)
					formData.append("userPwd",_this.userPwd)
					formData.append("userState",1)
					formData.append("file",_this.file)
					$.ajax({
						type: "POST",
						url: url + '/user/doUser',
						data:formData, // 你的formid
						processData: false,
						contentType: false,
						error: function(request) {
							mui.toast('更新失败');
							console.log(request)
						},
						success: function(data) {
							if(data.code > 0) {
								mui.toast('更新成功');
								setTimeout(function(){ location.href="personal.html"; }, 1000);
							} else if(data.code < 0) {
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
			myBm : function(){//我的报名
				location.href="mybm.html"
			},
			myQb : function(){//我的钱包
				location.href="wallet.html"
			},
			MySc : function(){//我的收藏
				location.href="mysc.html"
			},
			myFb:function(){//我要发布
				location.href="issue.html"
			},
			myUpdata : function(){
				location.href="pwdupdata.html"
			}
			
		},
		updated: function() { // 创建成功后

		}
	})
});
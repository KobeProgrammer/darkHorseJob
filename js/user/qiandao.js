/**
 * 用户签到
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
});

require(['jquery', 'ini', 'Vue', 'util', 'commont'], function($, ini, Vue, util, commont) {
	var url = ini.url; //获取通用的url

	var vm = new Vue({
		el: '#vueSignin',
		data: {
			walletBean: null, //兼职豆
			singinNumber: 0, //连续签到次数
			singinTime: null, //最近签到时间
			isSignin: false, //是否签到 true已经签到   false--没有签到
			isShowGetWallet: false, //是否显示领取兼职豆
		},
		watch: { //存入 监听值得变化
		},
		mounted: function() { //页面初始化时 执行
			this.initialWallet(); //初始化钱包
			this.isToday(this.singinTime); //判断是否已经签到
		},
		methods: {
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
						if(data.code == 200) {
							_this.walletBean = data.obj.walletBean;
							_this.singinNumber = data.obj.singinNumber;
							_this.singinTime = data.obj.singinTime;
							if(_this.singinNumber == 3 || _this.singinNumber == 5 || _this.singinNumber == 7) { //是否显示“领取兼职豆”
								_this.isShowGetWallet = true
							} else {
								_this.isShowGetWallet = false;
							}
						}
					}
				})
			},
			/**
			 * 点击签到
			 */
			intoSignin: function() {
				var _this = this;
				if(this.isSignin) { //已经签到
					mui.toast('今天你已经签到过了哦！明天再来吧！');
				} else { //没有签到
					$.ajax({
						url: url + '/user/doUpdateSigninByUserId',
						type: 'POST',
						data: {
							userCall: ini.getLocalParams("call"),
							userId: ini.getLocalParams("userId")
						},
						async: false,
						dataType: 'json',
						success: function(data) {
							if(data.code == 200) {
								mui.toast('签到成功');
								_this.initialWallet() //更新信息
								_this.isToday(_this.singinTime);
							} else {
								mui.toast('签到失败');
								console.log(data);
							}
						}
					})

				}
			},
			/**
			 * 点击领取兼职豆
			 */
//			walletBean: function() {
//				if(this.isShowGetWallet) {
//					
//				}
//			},
			/**
			 * 判断是签到是否在今天
			 */
			isToday: function(time) {
				if(time == null || time == "") {
					this.isSignin = false;
					return;
				}
				var dateTime = null;
				if(time.indexOf(" ") < 0) {
					dateTime = time;
				} else {
					dateTime = time.substring(0, time.indexOf(" "));
				}

				var d = new Date();
				var day = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

				if(day == dateTime) {
					this.isSignin = true;
				} else {
					this.isSignin = false;
				}
			},
			/**
			 * 更新签到信息
			 */
			updateSignin: function() {

			}

		},
		updated: function() { // 创建成功后

		}
	})

});
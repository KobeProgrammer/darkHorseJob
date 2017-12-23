/**
 * 展示用户收藏信息
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

	/**
	 * 时间格式化
	 */
	Vue.filter('formatTiem', function(value) {
		if(value.indexOf(" ") < 0) {
			return value
		} else {
			return value.substring(0, value.indexOf(" "))
		}

	})

	/**
	 * 发布者图片
	 */
	Vue.filter('photo', function(val) {
		if(val != null) {
			return url + "/" + val;
		} else {
			return "images/60x60.gif";
		}

	})

	var vm = new Vue({
		el: '#vueMySc',
		data: {
			job: [], //分页兼职信息
			jobId: null, //选中的兼职ID

			walletBean: 0, //用户兼职豆

		},
		watch: { //存入 监听值得变化
		},
		mounted: function() { //页面初始化时 执行
			this.initialCollect(); //初始化我收藏
			this.getUserWallet(); //获取用户兼职豆
		},
		methods: {
			initialCollect: function() { //初始化我收藏
				var _this = this;
				$.ajax({
					url: url + '/user/queryCollectByUserCallOrJobId',
					type: 'POST',
					data: {
						userCall: ini.getLocalParams("call")
					},
					dataType: 'json',
					success: function(data) {
						if(data.code == 200) {
							_this.job = data.obj;
						}
					}
				})
			},
			/**
			 *  点击选中收藏赋值jobId
			 */
			selectCollectGetJobId: function(jobId, e) {
				this.jobId = jobId;
				var li = $(e.target).parents("li");
				li.find(".mysc_time").find("img").attr("src", "images/icon/checked.png");
				li.addClass("mysc_active");
				li.siblings("li").find(".mysc_time").find("img").attr("src", "images/icon/yuan_checked.png")
				li.siblings().removeClass("mysc_active");
			},
			/**
			 * 点击取消收藏
			 */
			doCollect: function() {
				var _this = this;

				if(_this.jobId == null) {
					mui.toast('请选择兼职');
					return;
				}

				$.ajax({
					url: url + '/user/doDeleteCollect',
					type: 'POST',
					data: {
						userCall: null,
						jobId: _this.jobId
					},
					dataType: 'json',
					success: function(data) {
						if(data.code == 200) {
							mui.toast('取消成功');
							_this.initialCollect(); //初始化我收藏
							_this.jobId = null;
						}
					}
				})
			},
			/**
			 * 点击我要报名
			 */
			baomin: function() {
				var _this = this;
				if(_this.walletBean < 2) { //兼职豆不足
					mui.toast('您的兼职豆不足');
				} else {
					$.ajax({
						url: url + '/job/doInsertJobByUser',
						type: 'POST',
						data: {
							jobId: _this.jobId,
							userId: ini.getLocalParams("userId")
						},
						dataType: 'json',
						success: function(data) {
							console.log(data);
							if(data.code == 200) {
								_this.doUpdateWallet(); //扣除2个兼职豆
							} else {
								mui.toast('报名失败！,请选择兼职');
							}
						}
					})
				}

			},
			/**
			 * 获取用户的兼职豆
			 */
			getUserWallet: function() {
				var _this = this;
				$.ajax({
					url: url + '/user/queryWalletByCall',
					data: {
						userCall: ini.getLocalParams("call")
					},
					type: 'POST',
					dataType: 'json',
					success: function(data) {
						if(data.code == 200) {
							_this.walletBean = data.obj.walletBean;
						}
					}
				})
			},
			/**
			 * 发布兼职扣2个，
			 */
			doUpdateWallet: function() {
				var _this = this;
				$.ajax({
					url: url + '/user/doUpdateWallet',
					data: {
						userCall: ini.getLocalParams("call"),
						userId: ini.getLocalParams("userId"),
						walletBean: 2
					},
					type: 'POST',
					dataType: 'json',
					success: function(data) {
						if(data.code == 200) {
							mui.toast('报名成功！');
							setTimeout(function() {
								location.href = "mybm.html"
							}, 1000);
						} else {
							mui.toast(data.mssage);
						}
					}
				})
			},
		},
		updated: function() { // 创建成功后

		}
	})

});
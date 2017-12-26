/**
 * 我的报名
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
	 * 计算发布的时间
	 */
	Vue.filter('showTime', function(nDate) {
		var oDate = new Date(); // 获取当地显示器的时间
		var time = Math.floor((oDate - new Date(nDate)) / 1000);
		var d = Math.floor(time / 86400);
		var h = Math.floor(time % 86400 / 3600);
		var m = Math.floor(time % 86400 % 3600 / 60);
		var s = time % 60;
		if(d == 0) {
			if(h == 0) {
				return m + '分前';
			}
			return h + '小时' + m + '分前';
		} else {
			return d + "天" + h + '小时前';

		}
	});

	/**
	 * 发布者图片
	 */
	Vue.filter('photo', function(val) {
		if(val != null) {
			return url + "/images/" + val;
		} else {
			return "images/60x60.gif";
		}

	})

	var vm = new Vue({
		el: '#vueBm',
		data: {
			job: [], //兼职信息
			jobId: null, //选中的兼职ID

		},
		watch: { //存入 监听值得变化
		},
		mounted: function() { //页面初始化时 执行
			if(typeof(ini.getLocalParams("call")) == "undefined" || ini.getLocalParams("call") == null) {
				mui.toast('请先登录！');
				setTimeout(function() {
					location.href = "loging.html"
				}, 200);
				return;
			}
			this.initialBm(); //初始化我报名
		},
		methods: {
			initialBm: function() { //初始化我报名
				var _this = this;
				$.ajax({
					url: url + '/user/queryMyUserJobBuId',
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
			 * 进入详细兼职中jobId
			 * @param {Object} job
			 */
			intoJob: function(job) {
				location.href = "issue_part.html?jobId=" + job.jobId
			}

		},
		updated: function() { // 创建成功后

		}
	})

});
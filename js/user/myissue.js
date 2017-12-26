/**
 * 我的发布
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
			return url + "/images/" + val;
		} else {
			return "images/60x60.gif";
		}

	})

	var vm = new Vue({
		el: '#vueIssue',
		data: {
			job: [], //分页兼职信息
			jobId: null, //选中的兼职ID
			isSelectcheckBox: true, //是否选择单选按钮，false，没有选择--可以跳转路径

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
			this.initialIssue(); //初始化我发布
		},
		methods: {
			initialIssue: function() { //初始化我发布
				var _this = this;
				$.ajax({
					url: url + '/user/querytMyIssueByUserId',
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
			 *  点击选中删除发布，赋值jobId
			 */
			selectCollectGetJobId: function(jobId, e) {
				this.isSelectcheckBox = false;
				this.jobId = jobId;
				console.log(this.jobId)
				var li = $(e.target).parents(".mysc_time");
				li.find("img").attr("src", "images/icon/checked.png");
				li.addClass("mysc_active");
				li.parents("li").siblings("li").find(".mysc_time").find("img").attr("src", "images/icon/yuan_checked.png")
				li.parents("li").siblings().removeClass("mysc_active");
			},
			/**
			 * 点击查询已报名人员的信息
			 * @param {Object} jobId
			 * @param {Object} e
			 */
			queryBmUser: function(jobId, e) {
				if(this.isSelectcheckBox) {
					location.href = "bmUser.html?jobId=" + jobId;
				}
				this.isSelectcheckBox = true;

			},
			/**
			 * 删除发布
			 */
			deleteMyIssue: function() {
				var _this = this;
				if(_this.jobId == null) {
					mui.toast('请选择删除信息');
					return;
				}
				//弹出删除提示框
				mui.confirm('您确定要删除该信息？', '是否删除', ['否', '是'], function(e) {
					if(e.index == 1) { //删除
						$.ajax({
							url: url + '/job/deleteMyIssue',
							type: 'POST',
							data: {
								jobId: _this.jobId
							},
							dataType: 'json',
							success: function(data) {
								if(data.code == 200) {
									mui.toast('删除成功');
									_this.initialIssue();
									_this.jobId = null;
								}
							}
						})

					}
				})
			},
			/**
			 * 我要发布
			 */
			issue: function() {
				location.href = "issue.html";
			}
		},
		updated: function() { // 创建成功后

		}
	})

});
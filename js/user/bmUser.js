/**
 * 报名人信息
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
		el: '#vueBmUser',
		data: {
			users: [], //兼职信息
			jobId : util.GetQueryString("jobId"),//兼职ID

		},
		watch: { //存入 监听值得变化
		},
		mounted: function() { //页面初始化时 执行
			this.initialBmUser(); //初始化我报名人信息
		},
		methods: {
			initialBmUser: function() { //初始化我报名人信息
				var _this = this;
				$.ajax({
					url: url + '/user/queryUserBuJobId',
					type: 'POST',
					data: {
						jobId: _this.jobId
					},
					dataType: 'json',
					success: function(data) {
						if(data.code == 200) {
							_this.users = data.obj;
						}
					}
				})
			},
			/**
			 * 进入详细兼职中jobId
			 * @param {Object} job
			 */
			intoBmUser : function(users){
				location.href = "detailUser.html?userCall="+users.userCall
			}
			
		},
		updated: function() { // 创建成功后

		}
	})

});
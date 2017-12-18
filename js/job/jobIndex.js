/**
 * 兼职信息
 * @user 谢东生
 * @time :2017年12月17日13:31:18
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
	}
	//	waitSeconds: 7//超时时间
});

require(['jquery', 'ini', 'Vue', 'util', 'commont'], function($, ini, Vue, util, commont) {
	var url = ini.url; //获取通用的url



	var vm = new Vue({
		el: '#vueJob',
		data: {
			jobType: [], //兼职类型
			jobArea: [], //兼职区域

		},
		watch: { //存入 监听值得变化
		},
		mounted: function() { //页面初始化时 执行
			this.queryJobType(); //查询出全部的类型、区域

		},
		methods: {
			queryJobType: function() {
				var _this = this;
				$.ajax({
					url: url + '/job/jobTypeAndAreaAndTime',
					type: 'POST',
					dataType: 'json',
					success: function(data) {
						if(data.code == 200) {
							_this.jobArea = data.obj.jobArea;
							_this.jobType = data.obj.jobType;
						}
					}
				})
			},
			initVuePage: function() {
				mui.init({
					swipeBack: true //启用右滑关闭功能
				});
				mui("#slider").slider({
					interval: 2000
				});
			}

		},
		updated: function() { // 创建成功后

		}
	})
		console.log(vm.$nextTick())
			 vm.$nextTick(function () {
        // DOM 现在更新了
 mui("#slider").slider({
               interval: 3000
          });
      })

});
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
			return h + '小时' + m + '分' + s + '秒前';
		} else {
			return d + "天" + h + '小时' + m + '分' + s + '秒前';

		}
	});

	Vue.filter('photo', function(val) {
		console.log(val)
		if(val != null) {
			return url + "/" + val;
		} else {
			return "images/60x60.gif";
		}

	})

	var vm = new Vue({
		el: '#vueJob',
		data: {
			jobType: [], //兼职类型
			jobArea: [], //兼职区域
			job: [], //分页兼职信息
			page: 20, //每页展示的条数
			count: 0, //总页数
			name: null, //模糊查询条件
			jtName: null, //兼职类型
			jttName: null, //兼职日期
			areaId: null, //兼职地址ID
			areaName: null, //兼职地址名称

		},
		watch: { //存入 监听值得变化
		},
		mounted: function() { //页面初始化时 执行
			commont.indexTypeClick();
			window.addEventListener('scroll', this.loadMore);
			this.queryJobType(); //查询出全部的类型、区域
			this.getjobByPage(); //初始化页面
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
			/**
			 * 页面滑动
			 */
			loadMore: function() { //监听页面滑动
				if($(window).scrollTop() >= $(document).height() - $(window).height()) {
					var _this = this;
					if(_this.count != $("#jobLi li").length) {
						_this.page = _this.page + 20;
						console.log(_this.page)
						setTimeout(function() {
							var vueGoods = document.querySelector('#vueJob')
							var height = vueGoods.clientHeight;
							vueGoods.style.height = height + 68.4 * 20 + 'px';
							_this.getjobByPage();
						}, 1000)
					}
				}
			},
			/**
			 * 分页查询兼职信息
			 */
			getjobByPage: function() {
				var _this = this;
				$.ajax({
					url: url + '/job/jobPage',
					type: 'POST',
					data: {
						page: _this.page,
						name: _this.name,
						jtName: _this.jtName,
						jttName: _this.jttName
					},
					dataType: 'json',
					success: function(data) {
						console.log(data)
						if(data.code == 200) {
							_this.count = data.obj.count;
							_this.job = data.obj.data;
						}
					}
				})
			},
			/**
			 * 选择地区
			 * @param {Object} areaId
			 * @param {Object} e
			 */
			jobTypeArea: function(job, e) {
				if(job == 0) {
					this.areaId = null;
					this.areaName = null;
					$(e.target).parent().find("span").css({
						"border": "solid 1px #fe7418",
						"color": "#fe7418"
					})
				} else {
					this.areaId = job.areaId;
					this.areaName = job.areaName;
				}
				$(".index_address_list_box").hide(300);
				$(e.target).parent().addClass("active").siblings().removeClass("active")
				$(e.target).parent().siblings("p").find("span").css({
					"border": "solid 1px #cdcbcb",
					"color": "#333"
				})
				//				this.getjobByPage();//分页查询
			},
			/**
			 * 选择兼职类型
			 * @param {Object} jtName
			 * @param {Object} e
			 */
			jobSelectType: function(job, e) {
				if(job == 0) {
					this.jtName = null;
					$(e.target).parent().find("span").css({
						"border": "solid 1px #fe7418",
						"color": "#fe7418"
					})
				} else {
					this.jtName = job.jtName;
				}
				$(".index_address_list_box").hide(300);
				console.log($(e.target).html())
				$(e.target).parent().addClass("active").siblings().removeClass("active")
				$(e.target).parent().siblings("p").find("span").css({
					"border": "solid 1px #cdcbcb",
					"color": "#333"
				})
				//				this.getjobByPage();//分页查询
			},
			/**
			 * 兼职时间类型
			 */
			jobTimeType: function(jttName, timeCode, e) {
				this.jttName = jttName;
				$(".index_address_list_box").hide(300);
				$(e.target).parent().addClass("active").siblings().removeClass("active")
				//				this.getjobByPage();//分页查询
			},
			/**
			 * 关闭搜索
			 */
			returnJob: function() {
				$(".index_box2").hide();
				$(".index_box1").show();
			},
			/**
			 * 点击搜索
			 */
			searchJob: function() {
				$(".par_box").hide()
			},
			/**
			 * 进入详细兼职中jobId
			 * @param {Object} job
			 */
			intoJob : function(job){
				location.href = "issue_part.html?jobId="+job.jobId
			}
		},
		updated: function() { // 创建成功后

		}
	})

});
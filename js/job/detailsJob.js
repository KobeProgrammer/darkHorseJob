/**
 * 兼职详情
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
		el: '#detailsJob',
		data: {
			jobId: util.GetQueryString("jobId"), //传来的id
			jobWork: null, //工作时间
			jobTime: null, //上班时间
			jobNumber: null, //招聘人数
			jobMoney: null, //工资待遇
			jobName: null, //兼职名称
			jobAddress: null, //工作地点
			jobCompany: null, //机构名
			jobContacts: null, //联系人
			jobCall: null, //联系人电话
			jobText: null, //工作内容
			jtName: null, //类型名
			jobSex: null, //性别
			telCall: null, //拨通电话
			isCollect: false, //是否收藏该兼职  false没有收藏   true已收藏

			walletBean: 0, //用户兼职豆

		},
		watch: { //存入 监听值得变化

		},
		mounted: function() { //页面初始化时 执行
			this.detailsJob(); //兼职详情
			this.isCollectJob(); //判断是否收藏该兼职
		},
		methods: {
			/**
			 * 兼职详情
			 */
			detailsJob: function() {
				var _this = this;
				$.ajax({
					url: url + '/job/jobById',
					type: 'POST',
					data: {
						jobId: _this.jobId
					},
					dataType: 'json',
					success: function(data) {
						if(data.code == 200) {
							_this.jobWork = data.obj.jobWorkbeginTime.substring(0, data.obj.jobWorkbeginTime.indexOf(" ")) + " 至 " + data.obj.jobWorkendTime.substring(0, data.obj.jobWorkendTime.indexOf(" ")) //时间
							_this.jobNumber = data.obj.jobNumber + "人";
							_this.jobMoney = data.obj.jobMoney + data.obj.jttName;
							_this.jobName = data.obj.jobName //兼职名称
							_this.jobAddress = data.obj.jobAddress //工作地点
							_this.jobCompany = data.obj.jobCompany //机构名
							_this.jobContacts = data.obj.jobContacts //联系人
							_this.jobCall = data.obj.jobCall //联系人电话
							_this.jobText = data.obj.jobText //工作内容
							_this.jtName = data.obj.jtName //类型名
							_this.jobSex = data.obj.jobSex == 1 ? "男" : "女"; //性别
							_this.telCall = "tel:" + data.obj.jobCall; //拨通电话
							if(data.obj.jobBegintime == "00:00:00" || data.obj.jobBegintime == null || data.obj.jobEndtime == "00:00:00" || data.obj.jobEndtime == null) {
								_this.jobTime = "不限";
							} else {
								_this.jobTime = data.obj.jobBegintime + " 至 " + data.obj.jobEndtime;
							}

						}
					}
				})
			},
			/**
			 * 判断是否收藏该兼职
			 */
			isCollectJob: function() {
				var _this = this;
				$.ajax({
					url: url + '/user/queryCollectByUserCallOrJobId',
					type: 'POST',
					data: {
						jobId: _this.jobId
					},
					dataType: 'json',
					success: function(data) {
						console.log(data);
						if(data.code == 200) {
							if(data.obj.length != 0) {
								_this.isCollect = true;
							}
						}
					}
				})
			},
			/**
			 * 点击我的收藏
			 */
			doCollect: function() {
				var _this = this;
				if(typeof(ini.getLocalParams("userId")) == "undefined" || ini.getLocalParams("userId") == null) {
					mui.toast('请先登录！');
					setTimeout(function() {
						location.href = "loging.html"
					}, 1000);
					return;
				}

				if(_this.isCollect) { //已收藏   改为  未收藏（删除收藏）
					$.ajax({
						url: url + '/user/doDeleteCollect',
						type: 'POST',
						data: {
							userCall: null,
							jobId: _this.jobId
						},
						dataType: 'json',
						success: function(data) {
							console.log(data);
							if(data.code == 200) {
								_this.isCollect = false;
							}
						}
					})
				} else { //未收藏   改为   已收藏（新增收藏）
					$.ajax({
						url: url + '/user/doInsertCollect',
						type: 'POST',
						data: {
							collectUserId: ini.getLocalParams("userId"),
							collectJobId: _this.jobId
						},
						dataType: 'json',
						success: function(data) {
							console.log(data);
							if(data.code == 200) {
								_this.isCollect = true;
							}
						}
					})
				}
			},
			/**
			 * 点击我要报名
			 */
			baomin: function() {
				var _this = this;
				if(typeof(ini.getLocalParams("userId")) == "undefined" || ini.getLocalParams("userId") == null) {
					mui.toast('请先登录！');
					setTimeout(function() {
						location.href = "loging.html"
					}, 1000);
					return;
				}

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
								_this.doUpdateWallet();//报名扣除兼职豆
							} else {
								mui.toast('报名失败！');
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
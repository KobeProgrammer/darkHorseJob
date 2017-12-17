/**
 * 用户发布兼职信息
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
		commont: "js/commont"
	}
	//	waitSeconds: 7//超时时间
});

require(['jquery', 'ini', 'Vue', 'util', 'commont'], function($, ini, Vue, util, commont) {
	var url = ini.url; //获取通用的url

	var vm = new Vue({
		el: '#vueIssue',
		data: {
			jobType: [], //兼职类型
			jobTimeType: [], //兼职时间类型
			jobSelectSex: [{
					sex: '不限'
				},
				{
					sex: '男'
				},
				{
					sex: '女'
				},
			],
			jobTypeText: null, //选中的兼职类型
			sex : "不限",
			jobMoneyText: '元/天', //选中的工资待遇
			jobTypeId: null, //兼职类型ID
			jobMoneyId: null, //选中的工资待遇ID
			jobName: null, //兼职名
			jobNumber: null, //需招聘人数
			jobSex: 2, //性别要求
			jobMoney: null, //工资待遇
			jobAddress: null, //工作地点
			jobCompany: null, //机构名
			jobContacts: null, //联系人
			jobCall: null, //联系人电话
			jobText: null, //工作内容

		},
		watch: { //存入 监听值得变化
		},
		mounted: function() { //页面初始化时 执行
			this.queryJobType(); //查询出全部的类型
			commont.selectTime(); //MUI时间插件
			commont.NoTime(); //点击禁止选择时间
			commont.adress();
		},
		methods: {
			/**
			 * 查询出全部的类型
			 */
			queryJobType: function() {
				var _this = this;
				$.ajax({
					url: url + '/job/jobType',
					type: 'POST',
					dataType: 'json',
					success: function(data) {
						if(data.code == 200) {
							_this.jobTimeType = data.obj.jobTimeType;
							_this.jobType = data.obj.jobType;
							for(var i = 0; i < data.obj.jobTimeType.length; i++) {
								if(data.obj.jobTimeType[i].jttName == "元/天") {
									_this.jobMoneyId = data.obj.jobTimeType[i].jttId;
								}
							}
						}
					}
				})
			},
			/**
			 * 点击发布
			 */
			jobCommit: function() {
				var _this = this;
				if($(".iss_cont2 li:nth-of-type(1) input").val() == "") {
					mui.toast('请输入兼职标题！');
					return false;
				} else if($(".iss_cont li:nth-of-type(3) span:first-of-type").text() == "" || $(".iss_cont li:nth-of-type(3) span:last-of-type").text() == "") {
					mui.toast('请选择工作日期！');
					return false;
				} else if($(".iss_cont li:nth-of-type(5) input").val() == "") {
					mui.toast('请输入招聘人数！');
					return false;
				} else if($(".iss_cont li:nth-of-type(6) input").val() == "") {
					mui.toast('请输入工资待遇！');
					return false;
				} else if($(".iss_cont1 li:nth-of-type(2) input").val() == "") {
					mui.toast('请输入发布机构！');
					return false;
				} else if($(".iss_cont1 li:nth-of-type(3) input").val() == "") {
					mui.toast('请输入详细地址！');
					return false;
				} else if($(".iss_cont1 li:nth-of-type(4) input").val() == "") {
					mui.toast('请输入姓名！');
					return false;
				} else if($(".iss_cont1 li:nth-of-type(5) input").val() == "") {
					mui.toast('请输入手机号！');
					return false;
				} else if(util.mobileValidator($(".iss_cont1 li:nth-of-type(5) input").val())) {
					mui.toast('手机号有误！');
					return false;
				} else {
					$.ajax({
						url: url + '/job/dojob',
						data: {
							"jobAreadId":'520101',
							"jobUserId" : ini.getLocalParams("userId"),//发布者id
							"jobJtid" : _this.jobTypeId,//兼职类型ID
							"jobJttid" : _this.jobMoneyId,//选中的工资待遇ID
							"jobName": _this.jobName, //兼职名
							"jobNumber": _this.jobNumber, //需招聘人数
							"jobSex": _this.jobSex, //性别要求
							"jobMoney": _this.jobMoney, //工资待遇
							"jobAddress": _this.jobAddress, //工作地点
							"jobCompany": _this.jobCompany, //机构名
							"jobContacts": _this.jobContacts, //联系人
							"jobCall": _this.jobCall, //联系人电话
							"jobText": _this.jobText, //工作内容
							"jobWorkbeginTime": $(".demo2_ti").html(),//	开始上班
							"jobWorkendTime": $(".demo2_ti1").html(),//	结束上班
							"jobBegintime": $(".demo1_ti").html(),////工作开始时间
							"jobBegintime" : $(".demo1_ti1").html(),//工作结束时间
							'jobComment' : ""//备注
						},
						type: 'POST',
						dataType: 'json',
						success: function(data) {
							if(data.code == 200) {

							}
						}
					})
					mui.toast('发布成功！');

				}
			},
			/**
			 * 打开选择性别
			 */
			selectSex: function() {
				//显示弹出层
				$(".iss_box").show(100);
				$(".iss_moob1").show();
				$(".iss_moob2").hide();
			},
			/**
			 * 打开选择钱
			 */
			selectMon: function() {
				//显示弹出层
				$(".iss_box").show(100);
				$(".iss_moob2").show();
				$(".iss_moob1").hide();
			},
			/**
			 * 选中兼职类型并赋值
			 */
			selectType: function(e, val) {
				$(e.target).parent().addClass("active").siblings().removeClass("active");
				this.jobTypeText = val.jtName;
				this.jobTypeId = val.jtId;
				$(".par_list").hide();
			},
			/**
			 * 选中兼职类型
			 */
			selectTypeLx: function() {
				$(".par_list").show();
			},
			/***
			 * 关闭蒙版
			 */
			closebox: function() {
				$(".iss_box").hide(100);
			},
			/**
			 * 选择性别并赋值
			 */
			selectSexJob: function(e, val) {
				this.sex = val;
				if(val == "女"){
					this.jobSex = 0;
				}else if(val == "男"){
					this.jobSex = 1;
				}else{
					this.jobSex = 2;
				}
				$(e.target).addClass("active").siblings().removeClass("active")
				$(".iss_box").hide(100);
			},
			/**
			 * 选中的工资待遇并赋值
			 * @param {Object} e
			 * @param {Object} val
			 */
			selectMoneyJob: function(e, val) {
				this.jobMoney = val.jttName;
				this.jobMoneyId = val.jttId;
				$(e.target).addClass("active").siblings().removeClass("active")
				$(".iss_box").hide(100);
			},

		},
		updated: function() { // 创建成功后

		}
	})

});
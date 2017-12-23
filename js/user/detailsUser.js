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
		el: '#detailsUser',
		data: {
			userCalled: util.GetQueryString("userCall"), //传来的id
			user : [],//用户信息
			userName : null,
			userCall : null,
			userSex : null,
			userCard : null,
			userBirthday : null,
			tellCall : null,

		},
		watch: { //存入 监听值得变化

		},
		mounted: function() { //页面初始化时 执行
			this.detailsUser(); //用户详细信息
		},
		methods: {
			/**
			 * 兼职详情
			 */
			detailsUser: function() {
				var _this = this;
				$.ajax({
					url: url + '/user/login',
					type: 'POST',
					data: {
						userCall: _this.userCalled
					},
					dataType: 'json',
					success: function(data) {
						if(data.code == 200) {
							_this.userName = data.obj.userName;
							_this.userCall = data.obj.userCall;
							_this.userSex = data.obj.userSex == 1 ? '男' : '女';
							_this.userCard = data.obj.userCard;
							_this.userBirthday = data.obj.userBirthday;
							_this.tellCall = "tel:"+data.obj.userCall;
						}
					}
				})
			},
			
		},
		updated: function() { // 创建成功后

		}
	})

});
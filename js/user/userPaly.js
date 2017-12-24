/**
 * 用户钱包
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
		el: '#vuePaly',
		data: {
			walletBean: null, //兼职豆
		},
		watch: { //存入 监听值得变化

		},
		mounted: function() { //页面初始化时 执行
			this.initialWallet(); //初始化钱包
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
						}
					}
				})
			},
			
		},
		updated: function() { // 创建成功后

		}
	})

});
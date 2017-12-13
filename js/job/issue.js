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
		util: "config/util"
	}
	//	waitSeconds: 7//超时时间
});

requir(['jquery', 'ini', 'Vue', 'util'], function($, ini, Vue, util){
	var url = ini.url; //获取通用的url
	
});

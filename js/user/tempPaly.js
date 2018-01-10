/**
 * 用户钱包
 * @user 谢东生
 * @time :2017年12月12日22:33:39
 */
require.config({
	baseUrl: "", //根目录
	paths: {
		jquery: "js/jquery-1.11.0",
		ini: "config/ini",
		util: "config/util",
		wx: "http://res.wx.qq.com/open/js/jweixin-1.2.0"
	},
});

require(['jquery', 'ini',  'util', "wx"], function($, ini, util) {
	var url = ini.url; //获取通用的url
	util.getWeiXinCode(ini.returnUrl + '/wallet.html', 'snsapi_base'); //微信登录(直接跳转，只能获取用户openid)
});
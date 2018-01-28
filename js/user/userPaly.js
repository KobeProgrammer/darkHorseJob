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
		layer: "js/layer/layer",
		wx: "http://res.wx.qq.com/open/js/jweixin-1.2.0"
	},
});

require(['jquery', 'ini', 'Vue', 'util', 'commont', "wx", "layer"], function($, ini, Vue, util, commont, wx, layer) {
	var url = ini.url; //获取通用的url
	var code = util.GetQueryString("code"); //获取微信授权后的code
	if(code == null) {
		//		util.getWeiXinCode(ini.returnUrl + '/wallet.html', 'snsapi_base'); //微信登录(直接跳转，只能获取用户openid)
		location.href = "temp.html"
	}
	var vm = new Vue({
		el: '#vuePaly',
		data: {
			walletBean: null, //兼职豆
			bean: 0, //充值的兼职豆
			walletNumber: 0, //充值金额
		},
		watch: { //存入 监听值得变化

		},
		mounted: function() { //页面初始化时 执行
			this.initialWallet(); //初始化钱包
			if(code != null) {
				this.wxJsApiCheck(); //初始化获取JSAPI签名
			}
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
			/**
			 * 获取JSAPI签名
			 */
			wxJsApiCheck: function() {
				var _this = this;
				$.ajax({
					url: url + '/pay/wxJsApiCheck',
					type: 'POST',
					data: {
						code: code
					},
					async: false,
					dataType: 'json',
					success: function(data) {
						console.log(data)
						if(data.code == 200) {
							wx.config({
								debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
								appId: data.obj.appid, // 必填，公众号的唯一标识
								timestamp: data.obj.timestamp, // 必填，生成签名的时间戳
								nonceStr: data.obj.nonceStr, // 必填，生成签名的随机串
								signature: data.obj.signature, // 必填，签名，见附录1
								jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
							});
							wx.ready(function() {

							});
							wx.error(function(res) {
								alert("JSSDK失败")
							});
						}
					}
				})
			},
			/**
			 * 充值的金额 微信同一下单
			 * @param {Object} money
			 */
			payMoney: function(money, bean) {
				//加载
				var index = layer.load(1, {
					shade: [0.5, '#fff'] //0.1透明度的白色背景
				});

				var _this = this;
				_this.bean = bean;
				_this.walletNumber = money;
				$.ajax({
					url: url + '/pay/unifiedOrder',
					type: 'POST',
					data: {
						code: code,
						money: money
					},
					dataType: 'json',
					success: function(data) {

						if(data.code == 200) {
							_this.wxPay(data.obj); //微信支付信息
						} else {
							mui.toast('支付失败');
							layer.closeAll('loading'); //关闭加载层
						}

					}
				})

			},
			wxPay: function(obj) {
				console.log(obj)
				var _this = this;
				wx.checkJsApi({
					jsApiList: ['chooseWXPay'], // 检查微信支付接口是否可用
					success: function(res) { //支持
						console.log(res)
						wx.chooseWXPay({
							'timestamp': obj.timeStamp,
							'nonceStr': obj.nonceStr,
							'package': obj.packageValue,
							'paySign': obj.paySign,
							'signType': 'MD5', // 支付签名
							cancel: function(res) { //用户取消支付

							},
							error: function(res) { //支付错误
								alert("支付错误" + JSON.stringify(res))
							},
							success: function(res) { //支付成功
								_this.doWalletPay();
							}
						});
					}
				});
			},
			/**
			 * 用户充值
			 */
			doWalletPay: function() {
				var _this = this;
				$.ajax({
					url: url + '/user/doWalletPay',
					type: 'POST',
					data: {
						userCall: ini.getLocalParams("call"),
						walletBean: _this.bean,
						walletNumber: _this.walletNumber
					},
					dataType: 'json',
					success: function(data) {
						if(data.code == 200) {
							layer.closeAll('loading'); //关闭加载层
							mui.toast('支付成功');
							this.initialWallet(); //初始化钱包
							layer.closeAll('loading'); //关闭加载层
						} else {
							mui.toast('支付失败');
							layer.closeAll('loading'); //关闭加载层
						}

					}
				})
			}

		},
		updated: function() { // 创建成功后

		}
	})

});
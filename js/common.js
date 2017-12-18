$(function(){
//	var b = 0;
//	(function($) {
//				$.init();
//				var result = $('.demo2_ti')[0];
//				var result1 = $('.demo2_ti1')[0];
//				var btns = $('.btn_t');
//				var a = 0;
//				//时间段
//				var result2 = $('.demo1_ti')[0];
//				var result22 = $('.demo1_ti1')[0];
//				var btns2 = $('.btn_t11');
//				btns.each(function(i, btn) {
//					btn.addEventListener('tap', function() {
//						var _self = this;
//						if(_self.picker) {
//							_self.picker.show(function (rs) {
//								result.innerText =rs.text;
//								_self.picker.dispose();
//								_self.picker = null;
//							});
//						} else {
//							var optionsJson = this.getAttribute('data-options') || '{}';
//							var options = JSON.parse(optionsJson);
//							var id = this.getAttribute('id');
//							_self.picker = new $.DtPicker(options);
//							_self.picker.show(function(rs) {
//								a++;
//								if(a==1){
//									result.innerHTML =rs.text;
//								}else{
//									result1.style.display="block";
//									result1.innerHTML =rs.text;
//									_self.remove();
//								}
//								_self.picker.dispose();
//								_self.picker = null;
//							});
//						}
//					}, false);
//				});
//				//时间段
//				btns2.each(function(i, btn) {
//					btn.addEventListener('tap', function() {
//						var _self = this;
//						if(_self.picker) {
//							_self.picker.show(function (rs) {
//								result2.innerText =rs.text;
//								_self.picker.dispose();
//								_self.picker = null;
//							});
//						} else {
//							var optionsJson = this.getAttribute('data-options') || '{}';
//							var options = JSON.parse(optionsJson);
//							var id = this.getAttribute('id');
//							_self.picker = new $.DtPicker(options);
//							_self.picker.show(function(rs) {
//								b++;
//								if(b==1){
//									result2.innerHTML =rs.text;
//								}else{
//									result22.style.display="block";
//									result22.innerHTML =rs.text;
//									_self.style.display="none";
//								}
//								_self.picker.dispose();
//								_self.picker = null;
//							});
//						}
//					}, false);
//				});
//
//			})(mui);
//	//显示隐藏弹出层
//	$(".address").click(function(){
//		if($(".index_address_list_box").is(":hidden")){
//			$(".index_address_list_box").show();
//		}else{
//			$(".index_address_list_box").hide();
//		}
//	})
	//关闭遮罩
	$(".index_address_list_box").click(function(){
		$(".index_address_list_box").hide();
	})
	//选项卡
	$(".index_address_tit>div").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		$(this).find("img").attr("src","images/icon/down_active.png").parent().siblings().find("img").attr("src","images/icon/down.png")
		if($(".index_address_list1").hasClass("active")){
			$(".index_address_cont1").show(300);
			$(".index_address_cont2").hide(300);
			$(".index_address_cont3").hide(300);
		}
		else if($(".index_address_list2").hasClass("active")){
			$(".index_address_cont2").show(300);
			$(".index_address_cont1").hide(300);
			$(".index_address_cont3").hide(300);
		}
		else if($(".index_address_list3").hasClass("active")){
			$(".index_address_cont3").show(300);
			$(".index_address_cont2").hide(300);
			$(".index_address_cont1").hide(300);
		}
	})
	//点击关闭弹出层
	$(".index_address_cont_text>li").click(function(){
		$(".index_address_list_box").hide(300);
		$(this).addClass("active").siblings().removeClass("active")
		$(this).siblings("p").find("span").css({"border": "solid 1px #cdcbcb","color":"#333"})
	})
	$(".index_address_cont_text3>li").click(function(){
		$(".index_address_list_box").hide(300);
		$(this).addClass("active").siblings().removeClass("active")
	})
	//选择兼职类型
//	$(".par").click(function(){
//		location.href="par.html";
//	})
	//选择兼职类型
//	$(".par_list>li").click(function(){
//		$(this).addClass("active").siblings().removeClass("active");
//		$(".par").val($(this).text());
//		$(".par_list").hide();
//	})
	//点击禁止选择时间
//	$(".iss_ch").click(function(){
//		if($(this).is(':checked')){
//			$("#demo1").attr("disabled","disabled");
//			if($(".demo1_ti").html()!="" && $(".demo1_ti1").html()==""){
//				$(".demo1_ti").html("");
//				b=0;
//			}else if($(".demo1_ti").html()!="" && $(".demo1_ti1").html()!=""){
//				b=0;
//				$(".demo1_ti").html("");
//				$(".demo1_ti1").html("");
//				$(".demo1_ti1").hide();
//				$("#demo1").show()
//			}
//		}else{
//			$("#demo1").attr("disabled",false);
//		}
//	})
	//选择性别
//	$(".iis_sex").click(function(){
//		//显示弹出层
//		$(".iss_box").show(100);
//		$(".iss_moob1").show();
//		$(".iss_moob2").hide();
//	})
//	//选择钱
//	$(".iis_mon").click(function(){
//		//显示弹出层
//		$(".iss_box").show(100);
//		$(".iss_moob2").show();
//		$(".iss_moob1").hide();
//	})
//	$(".iss_box").click(function(){
//		$(".iss_box").hide(100);
//	})
	//取值 赋值
//	$(".iss_mob>li").click(function(){
//		$(this).addClass("active").siblings().removeClass("active")
//		if($(".iss_moob2").is(":hidden")){
//			$(".iis_sex_text").val($(this).text());
//		}else{
//			$(".iss_qian").text($(this).text());
//		}
//		$(".iss_box").hide(100);
//	})
	//点击input
	$(".iis_qian").click(function(){
		event.stopPropagation();//阻止冒泡 
		 return false;  
	})
	//收藏
	var i =0;
	$(".iss_sc").click(function(){
		
		if(i==0){
			$(".iss_sc").find("img").attr("src","images/icon/shoucang_active.png");
			mui.toast('已收藏');
			++i;
		}else{
			$(".iss_sc").find("img").attr("src","images/icon/shouchang.png");
			mui.toast('已取消收藏');
			--i;
		}
	})
	//报名
	var ii = 0;
	$(".baomin").click(function(){
		if(ii==0){
			$(".baomin").text("已报名");
			mui.toast('报名成功');
			++ii;
		}
	})
	//手机号码正则
	var  phone = /^1[34578]\d{9}$/;
	//发布
//	$(".issue_btn").click(function(){
//		if($(".iss_cont2 li:nth-of-type(1) input").val()==""){
//			mui.toast('请输入兼职标题！');
//		}else if($(".iss_cont li:nth-of-type(3) span:first-of-type").text()=="" || $(".iss_cont li:nth-of-type(3) span:last-of-type").text()=="" ){
//			mui.toast('请选择工作日期！');
//		}else if($(".iss_cont li:nth-of-type(5) input").val()==""){
//			mui.toast('请输入招聘人数！');	
//		}else if($(".iss_cont li:nth-of-type(6) input").val()==""){
//			mui.toast('请输入工资待遇！');	
//		}else if($(".iss_cont1 li:nth-of-type(2) input").val()==""){
//			mui.toast('请输入发布机构！');
//		}else if($(".iss_cont1 li:nth-of-type(3) input").val()==""){
//			mui.toast('请输入详细地址！');
//		}else if($(".iss_cont1 li:nth-of-type(4) input").val()==""){
//			mui.toast('请输入姓名！');
//		}else if($(".iss_cont1 li:nth-of-type(5) input").val()==""){
//			mui.toast('请输入手机号！');
//		}else if(!(phone.test($(".iss_cont1 li:nth-of-type(5) input").val()))){
//			mui.toast('手机号有误！');
//		}else{
//			mui.toast('发布成功！');
//		}
//	})
	//点击选中收藏
	$(".mysc_>li").click(function(){
		$(this).find(".mysc_time").find("img").attr("src","images/icon/checked.png");
		$(this).addClass("mysc_active");
		$(this).siblings("li").find(".mysc_time").find("img").attr("src","images/icon/yuan_checked.png")
		$(this).siblings().removeClass("mysc_active");
	})
	//点击取消收藏
	$(".mysc_bott>span:first-of-type").click(function(){
		$(".mysc_>.mysc_active").remove();
	})
	//登录
//	$(".login_btn").click(function(){
//		if(!(phone.test($(".log_phone").val()))){
//			mui.toast('手机号有误！');
//		}else if($(".log_pwd").val().length>12 || $(".log_pwd").val().length<6){
//			mui.toast('请输入6-12位密码！');
//		}else{
//			if($(".log_phone").val()==15223059337 && $(".log_pwd").val()==123456){
//				location.href="index.html";
//			}
//		}
//	})
	//验证码
//	$(".reg_yzm_btn").click(function(){
//		if(phone.test($(".reg_phone").val())){
//			time(this);
//		}else{
//			mui.toast('手机号有误！');
//		}
//	})
	//注册
//	$(".reg_btn").click(function(){
//		if(!(phone.test($(".reg_phone").val()))){
//			mui.toast('手机号有误！');
//		}
//		else if($(".reg_pwd").val().length>12 || $(".reg_pwd").val().length<6){
//			mui.toast('请输入6-12位密码！');
//		}
//		else if($(".reg_yzm").val()=="" || $(".log_pwd").val()!=1234){
//			mui.toast('验证码有误');
//		}
//	})
	//退出登录
//	$(".per_btn").click(function(){
//		location.href="loging.html"
//	})
	//修改密码
	$(".updata_btn").click(function(){
		if(!($(".updata_oldpwd").val()==123456)){
			mui.toast('旧密码有误！');
		}else if($(".updata_newpwd").val().length>12 || $(".updata_newpwd").val().length<6){
			mui.toast('请输入新密码！');
		}else if($(".updata_newpwd").val()!=$(".updata_yespwd").val()){
			mui.toast('两次密码不一致！');
		}else{
			mui.toast('保存成功！');
			setTimeout(function(){
				location.href="personal.html"
			},2000)
		}
	})
	//简历保存
//	var  namee = /^[\u4E00-\u9FA5]{1,6}$/;
//	var sfz = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
//	$(".myjl_btn").click(function(){
//		if(!(namee.test($(".namee").val()))){
//			mui.toast('请输入真实姓名');
//		}else if(!(sfz.test($(".sfz").val()))){
//			mui.toast('身份证号码有误');
//		}else if(!(phone.test($(".phonee").val()))){
//			mui.toast('手机号有误');
//		}
//	})
	//编辑简历
//	$(".per_top_right").click(function(){
//		location.href="myjl.html"
//	})
	//我的报名
//	$(".bm").click(function(){
//		location.href="mybm.html"
//	})
	//我的钱包
//	$(".qb").click(function(){
//		location.href="wallet.html"
//	})
	//我的收藏
//	$(".sc").click(function(){
//		location.href="mysc.html"
//	})
//	//我的发布
//	$(".fb").click(function(){
//		location.href="myissue.html"
//	})
//	//我要发布
	$(".my_btn").click(function(){
		location.href="issue.html"
	})

	//修改密码
//	$(".updata").click(function(){
//		location.href="pwdupdata.html"
//	})
	//兼职详情
	$(".index_>li").click(function(){
		location.href="issue_part.html"
	})
	//签到
	$(".qd").click(function(){
		location.href="qiandao.html"
	})
	$(".qiandao_btn").click(function(){
		if($(this).text()=="签到"){
			$(this).text("已签到");
			mui.toast('签到成功');
		}else{
			mui.toast('今天你已经签到过了哦！明天再来吧！');
		}
		
	})
	//选择类型
	$(".lx").click(function(){
		$(".par_list").show();
	})
	//搜索显示隐藏
	$(".par_s").click(function(){
		$(".par_box").hide();
	})
	$(".par_box>li").click(function(){
		$(".par_box").hide();
	})
})
//验证码倒计时
//var wait=60;
//function time(o) {
//	if (wait == 0) {
//		o.removeAttribute("disabled");			
//		o.value="获取验证码";
//		o.innerHTML="获取验证码";
//		wait = 60;
//	} else {
//		o.setAttribute("disabled", true);
//		o.value="重新发送(" + wait + ")";
//		o.innerHTML="重新发送(" + wait + ")";
//		wait--;
//		setTimeout(function() {
//			time(o)
//		},1000)
//	}
//}

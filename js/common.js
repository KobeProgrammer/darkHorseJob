$(function(){
	//显示隐藏弹出层
	$(".address").click(function(){
		if($(".index_address_list_box").is(":hidden")){
			$(".index_address_list_box").show(300);
		}else{
			$(".index_address_list_box").hide(300);
		}
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
	
})
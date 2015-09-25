$(function() {
	$('#popup-login').click(function(event) {
		popup('login');
		//load方法加载
		//$(".tanceng div").load('/block/login',function(){
			//加载出重置密码页面
			/*$('.forget a').click(function(event) {
		    	$(".tanceng div").empty().load('/block/reset');
		    });

		    $('.denglu-con .zc-link a').click(function(event) {
		    	$(".tanceng div").empty().load('/block/register');
		    });*/
		});
	
		$('.denglu-con .zc-link a').click(function(event) {
		    popup('register');
		});
		$('.denglu-con .forget a').click(function(event) {
		    popup('reset');
		});

		$('.register .zc-link a').click(function(event) {
		    popup('login');
		});
	});

function popup(pageName){
	$(".tanceng").css('display','block');
	if(pageName=='login'){
		$(".tanceng>div").append($('#page-login'));
	}else if(pageName=='register'){
		$(".tanceng>div").append($('#page-register'));
	}else if(pageName=='reset'){
		$(".tanceng>div").append($('#page-reset'));
	}

	$('.tanceng .close').click(function(event) {
        $(".tanceng>div").children().appendTo($('#page-popup'));
        $(".tanceng").css('display','none');
    });

}
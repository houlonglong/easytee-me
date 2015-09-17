$(function() {
	$(".how ").click(function(event) {
        /*$('.nav').animate({marginTop:500},500);*/
        $('.try').animate({height:594},1000);
    });

    $(window).scroll(function(event) {
        var num=$(window).scrollTop();
        var num2=$(window).height();
        if(num>500){
            $('.try').animate({height:0},0)
        }

        if(num>num2){
            $('.go-top').fadeIn();
        }else{$('.go-top').fadeOut();}
    	});

    	$('.go-top').click(function(event) {
        $('html,body').animate({scrollTop:0},500);
    	});
    });
/*});*/
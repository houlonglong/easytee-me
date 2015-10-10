$(function() {
    $(".btns").click(function(event) {
        /*$('.nav').animate({marginTop:500},500);*/
        $('.try').animate({height:594},1000);
    });

    $(window).scroll(function(event) {
        var num=$(window).scrollTop();
        if(num>500){
            $('.try').animate({height:0},0)
        }
    });

    $(".tanceng").css('height',$('window').height());
    $('.tanceng .close').click(function(event) {
        $(".tanceng").css('display','none');
    });
    top1();
    pingjia();
    template();
});


/*
 评价部分的功能
 */
function pingjia(){
    $(".pingjia li:lt(5)").clone().appendTo('.pingjia');
    /*$(".pingjia li:lt(5)").css('background',"pink")*/

    var timer=null;
    var num=0;
    setInterval(function(){
        num++;
        if(num>2) {num=0; $('.pingjia').css('top',0)}
        $(".pingjia").animate({'top':-num*480},500)

    }, 3000)

}

/*
 返回顶部部分的功能
 */
function top1(){
    $(window).scroll(function(event) {
        var num1=$(window).scrollTop();
        var num2=$(window).height();
        if(num1>num2){
            $('.go-top').fadeIn();
        }else{$('.go-top').fadeOut();}
    });

    $('.go-top').click(function(event) {
        $('html,body').animate({scrollTop:0},500);
    });
}

/*
    模板部分的功能
 */
function template(){
    var num=0;
    //右按钮
    $('.help-r').click(function(){
        num++;
        if(num<3){
            $('.template ul').animate({'left':-num*1045},500);
        }else{
        num=2;
    }
    })

    //左按钮
    $('.help-l').click(function(){
        num--;
        if(num>=0){
            $('.template ul').animate({'left':-num*1045},500);
        }else{
            num=0;
        }
    })
}


$(function() {
	$('.xiaotu li').click(function(event) {
		$(this).addClass('current').siblings().removeClass('current');
		var num=$(this).index();
		$('.datu li').eq(num).addClass('current').siblings().removeClass('current');
	});

	
//tab栏切换的部分
	$('.tab-con li').click(function(event) {
		$(this).addClass('current').siblings().removeClass('current');
	});

    
    var num1=$('#introduce').offset().top;
    var num2=$('#details').offset().top;
    var num3=$('#rule').offset().top;
    var num4=$('.tab-lan').offset().top;
    $(window).scroll(function(event) {
    	var num=$(window).scrollTop();
    	//导航栏吸顶效果
        if(num>num4){
			$('.tab-lan').css({'position':'fixed','top':0,'left':'50%','transform': 'translate(-50%,0)'});
		}else{
			$('.tab-lan').css({'position':'static','transform': 'translate(0,0)'});
		}

    	if(num>=num3){
            console.log(1);
    		 $('.tab-con li:eq(2)').addClass('current').siblings().removeClass('current');
    	}else if(num>=num2){
            console.log(2);
             $('.tab-con li:eq(1)').addClass('current').siblings().removeClass('current');
        }else if(num>=num1){
            console.log(3);
             $('.tab-con li:eq(0)').addClass('current').siblings().removeClass('current');
        }
    });
    //设置弹窗的高度
    $('.tanchuang').height($(window).height());

    $('.cha').click(function(event) {
        $('.tanchuang').hide();
    });

    $('.color-list').click(function(event) {
        $('.tanchuang').show();
    });
  
    //清浮动
    $('.style-info li').addClass('clearfix');

    $('.add').click(function(event) {
        $('.style-info li:first').clone(true).appendTo('.style-info');
    });

    var number = 1;
    $('.number-info .left').click(function(event) {
        var parent = $(this).parents('li');
        number--;
        if($('.number-info input', parent).val()<=1){
            number=1;
        }else{
            $('.number-info input', parent).val(number);
        }

    });
    $('.number-info .right').click(function(event) {
        var parent = $(this).parents('li');
        number++;
        $('.number-info input', parent).val(number);
    });

    //颜色部分的内容
    $('.yanse-info').click(function(event) {
        event.stopPropagation();
        $(this).toggleClass('current');
    });;
    
    $('.palette').click(function(event) {
       event.stopPropagation();
    });
    $('.yanse-info span').click(function(event) {
       event.stopPropagation();
    });

    $('.palette a').click(function(event) {
        var colorNum=$(this).children('i').css('background');
        //alert(colorNum)
        var paren=$(this).parents('.yanse-info')
        var brother=$(this).parent().siblings('span');
        paren.css('background',colorNum);
        brother.css('background',colorNum);
    });

    $(window).click(function(event) {
        $('.yanse-info').removeClass('current')
    });

    //尺码信息ajax
});
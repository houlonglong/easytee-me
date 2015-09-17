$(function() {
	$('.anniu a.right').click(function(event) {
		$(this).addClass('cur').siblings('.shar').css('display','block');
		event.stopPropagation();
	});
	$(window).click(function(event) {
		$('.anniu a.right').removeClass('cur').siblings('.shar').css('display','none');
	});

	TouchSlide({
		slideCell:"#actM",
		mainCell: ".actM1",
		prevCell: ".left",
        nextCell: ".right"
	})

	var num=0;
	$('.act1 li:first').clone().appendTo('.act1');
	$('.act-con .right').click(function(event) {
		num++;
		if(num>3){$('.act1').css('left',0); num=0};
		//if(num<0){num=0};
		$(".act1").animate({'left':-num*262+'px'},500);
	});
	$('.act-con .left').click(function(event) {
		//var num=0;
		num--;
		//if(num>4){num=4};
		if(num<0){$('.act1').css('left',-768); num=3;};
		$(".act1").animate({'left':-num*262+'px'},500);
	});

});
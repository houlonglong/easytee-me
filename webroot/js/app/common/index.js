$(function() {
	$(".how ").click(function(event) {
        
        $('.try').animate({height:594},1000);
    });

	$(".try i").click(function(event) {
		$('.try').animate({height:0},1000);
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
    
    	$('.forget a').click(function(event) {
    		$('.reset-con').addClass('show').siblings().removeClass('show');
    	});

    	
//登录时判断手机正则
   $('.btnLogin').click(function(event) {
   		var tel = $("#phone").val();

   		var reg = /(1[3-9]\d{9}$)/;
			if(!reg.test(tel)){
				//alert("请输入正确格式的手机号码！");
				$('.tel').addClass('wrong').children('span').html('输入错误');
				return false;
			}else{$('.tel').removeClass('wrong').children('span').html('');}

   		var LoginP=$('#LoginPass').val();
   			if(!LoginP){
   				$('.login-p').addClass('wrong').children('span').html('密码不能为空');
   				return;
   			}else{$('.login-p').removeClass('wrong').children('span').html('');}
			
			
   });

//登录时发送的ajax 
	$(".btnLogin").click(function(event) {
			var userName=$("#phone").val();
			var userPass=$("#LoginPass").val();
			$.ajax({
				type:"post",
				url:"",
				data:{
					userName:userName,
					userPass:userPass
				},
				success:function(data){
					if(sataus==0){//0代表响应成功
						window.location.href="";
					} else{
						$('.denglu-con').addClass('wrong');
					}

				}
			})
		});
	 
//z重置密码

	//60s倒计时
	var wait=60;
	var timer=null;
	function time(a){
		if(wait==0){
			a.removeAttribute("disabled");
			$("#testing").html("获取验证码").css('background','#fff');
			wait=60;

		}else{
			a.setAttribute("disabled", true);
			$("#testing").html(wait+"后重新发送").css('background','#eee');
			wait--;
			clearTimeout(timer);
			timer=setTimeout(function(){time(a)},1000);
		}
	}
	
	$('#testing').click(function(event) {
		time(this);
		$.get('/login',{
			phone:$("#res-phone").val()
		},function(){
			if(status==0){
				//time(this);
			}else{
				$(".sj").addClass('err');
			}
		})
	});

//点击重置判断密码的正则
	$(".denglu input").keyup(function(event) {  //过滤空格 
		$(this).val($(this).val().replace(/(^\s*)|(\s*$)/g, ""));
	});  
		
	var wait1=5;
		function fn(){   //五秒倒计时
				if(wait1==0){
				document.location.href="";
				wait=5;
				}else{
					$(".zc-success i").html(wait1);
					wait--;
					setTimeout(function(){fn()
					},1000)
				}
			}
	

	$('.res-btn').click(function(event) {
		//alert("密码格式错误");
		//var reg2=/^[a-zA-Z0-9]{6,32}$/;
		var reg2=/^[\S]{6,32}$/;
		var resPass=$("#res-pass").val();
		var resPass2=$("#res-pass2").val();
		var resPhone=$('#res-phone').val();
		var resTest=$("#res-test").val();

		if(!reg2.test(resPass)){
			//alert("密码格式错误");
			$("#res-pass").parent().addClass('test-err'); 
			return;
		}else{
			$("#res-pass").parent().removeClass('test-err');
		}

		if(resPass!=resPass2){   //判断密码是否一致
			$("#res-pass2").parent().addClass('test-err');
			return;
		}else{
			$("#res-pass2").parent().removeClass('test-err');
		}
		//重置密码手机和验证码的验证
		var reg = /(1[3-9]\d{9}$)/;
			if(!reg.test(resPhone)){
				//alert("请输入正确格式的手机号码！");
				$('.tel').addClass('wrong').children('span').html('输入错误');
				return false;
			}else{$('.tel').removeClass('wrong').children('span').html('');}
		

		$.ajax({
			type:"post",
			url:"",
			data:$(".reset-con>div>input").serialize(),
			success:function(){
				if(status==0){
					$('.ret-success').addClass('show').siblings('div').removeClass('show');
					fn();
				}
			}
		})



	});
 





 });

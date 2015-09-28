$(function () {
    $(".how ").click(function (event) {

        $('.try').animate({height: 594}, 1000);
    });

    $(".try i").click(function (event) {
        $('.try').animate({height: 0}, 1000);
    });
    $(window).scroll(function (event) {
        var num = $(window).scrollTop();
        var num2 = $(window).height();
        if (num > 500) {
            $('.try').animate({height: 0}, 0)
        }

        if (num > num2) {
            $('.go-top').fadeIn();
        } else {
            $('.go-top').fadeOut();
        }
    });

    $('.go-top').click(function (event) {
        $('html,body').animate({scrollTop: 0}, 500);
    });

//登录时判断手机正则
	var reg = /(1[3-9]\d{9}$)/;
    
    $('.btnLogin').click(function (event) {
        var tel = $("#phone").val();
        var userName = $("#phone").val();
        var userPass = $("#LoginPass").val();
        

        if (!reg.test(tel)) {
            //alert("请输入正确格式的手机号码！");
            $('.tel').addClass('wrong').children('span').html('输入错误');
            return false;
        } else {
            $('.tel').removeClass('wrong').children('span').html('账号不存在');
        }

        var LoginP = $('#LoginPass').val();
        if (!LoginP) {
            $('.login-p').addClass('wrong').children('span').html('密码不能为空');
            return;
        } else {
            $('.login-p').removeClass('wrong').children('span').html('密码错误');
        }
        //登录时发送的ajax 
        $.ajax({
            type: "post",
            url: "/api",
            data: {
                mobile: userName,
                password:sha1(userPass),
                action:"login",
                redirect:"/user/index",
                model: "user/auth"
            },
            success: function (data) {
                if (data.status == 8102) {//81-2代表账号不存在
                    $('.tel').children('span').html('账号不存在');
                    $('.tel').addClass('wrong');
                    return;
                } else if(data.status==8103){
                   $('.login-p').addClass('wrong').children('span').html('密码错误');
                }

            }
        })

    });


//z重置密码

    //60s倒计时
  var wait = 60;
    var timer = null;
    var resPass = $("#res-pass").val();
    var resPass2 = $("#res-pass2").val();
    var resPhone = $('#res-phone').val();
    var resTest = $("#res-test").val();

    function time(a) {
        if (wait == 0) {
            a.removeAttribute("disabled");
            $(a).html("获取验证码").css('background', '#fff');
            wait = 60;

        } else {
            a.attr("disabled",true);
            $(a).html(wait + "后重新发送").css('background', '#eee');
            wait--;
            clearTimeout(timer);
            timer = setTimeout(function () {
                time(a)
            }, 1000);
        }
    }


    $('#testing').click(function (event) {
        resPass = $("#res-pass").val();
        resPass2 = $("#res-pass2").val();
        resPhone = $('#res-phone').val();
        resTest = $("#res-test").val();
        //重置密码手机和验证码的验证
      /*  var reg3 = /^[1][358][0-9]{9}$/;
        if (!reg3.test(resPhone)) {
            //alert("请输入正确格式的手机号码！");
            $('.reset-con .sj').addClass('err');
            return false;
        } else {
            $('.reset-con .sj').removeClass('err');
        }*/
        var that=$(this);
         time(this);
        $.get('/login', {
            model: "user/register",
            phone: $("#res-phone").val()
        }, function () {
            if (status == 0) {
                time(that);
            } else {
                $(".reset-con .sj").addClass('err');
            }
        })
    });



    $(".denglu input").keyup(function (event) {  //过滤文字中间的空格
        $(this).val($(this).val().replace(/(^\s*)|(\s*$)/g, ""));
        $.trim($(".denglu input"));  //过滤文字两边的空格；
        $('div').removeClass('err test-err wrong Prompt phone-err');  //每次输入时去掉错误提示
    });
    
    //点击重置判断密码的正则
    var wait1 = 5;
    function fn() {   //五秒倒计时
        if (wait1 == 0) {
            document.location.href = "";
            wait = 5;
        } else {
            $(".zc-success i").html(wait1);
            wait--;
            setTimeout(function () {
                fn()
            }, 1000)
        }
    }


    $('.res-btn').click(function (event) {

        //alert("密码格式错误");
        //var reg2=/^[a-zA-Z0-9]{6,32}$/;
        resPass = $("#res-pass").val();
        resPass2 = $("#res-pass2").val();
        resPhone = $('#res-phone').val();
        resTest = $("#res-test").val();
        var reg2 = /^[\S]{6,32}$/;
        var reg = /(1[3-9]\d{9}$)/;
        if (!reg.test(resPhone)) {
            //alert("请输入正确格式的手机号码！");
            $('.reset-con .sj').addClass('err');
            return ;
        } else {
            $('.reset-con .sj').removeClass('err');
        }
        //验证码问题
        if(resTest==''){
        	$("#res-test").parent().addClass('test-err').children('i').html("请输入验证码");
        	return;
        }else{
        	$("#res-test").parent().removeClass('test-err').children('i').html("验证码错误");
        }
        
        //密码问题
        if (!reg2.test(resPass)) {
            //alert("密码格式错误");
            $("#res-pass").parent().addClass('test-err');
            return;
        } else {
            $("#res-pass").parent().removeClass('test-err');
        }

        if (resPass != resPass2) {   //判断密码是否一致
            $("#res-pass2").parent().addClass('test-err');
            return;
        } else {
            $("#res-pass2").parent().removeClass('test-err');
        }
        
        $.ajax({
            type: "post",
            url: "",
            data: $(".reset-con>div>input").serialize(),
            success: function () {
                if (status === 0) {
                    $('.ret-success').addClass('show').siblings('div').removeClass('show');
                    fn();
                }
            }
        })
    });
 
	//注册页面判断
	var regPhone=$('#reg-phone').val();
	var regTest=$('#reg-test').val();
	var regPass=$('#reg-pass').val();

	$('#reg-testing').click(function(event) {

		 regPhone=$('#reg-phone').val();
		 regTest=$('#reg-test').val();
		 regPass=$('#reg-pass').val();

		if (!reg.test(regPhone)) {
            //alert("请输入正确格式的手机号码！");
            $('#reg-phone').parent().addClass('err');/*.children('i').html('输入错误')*/
            return false;
        } else {
            $('#reg-phone').parent().removeClass('err');
        }

        $.get("/api",
            {  //注册时发送验证码
                model: "user/register",
                action: "get_code",
                mobile: regPhone
              },
            function (response,sataus,xhr){
            if(response.status==0){
                time($('#reg-testing'));
            }else if(response.status==1){
                $('#reg-phone').parent().addClass('err').children('i').html('该账号已注册');
            }
        });

	});

	$('.reg-btn').click(function(event) {
		regPhone=$('#reg-phone').val();
		regTest=$('#reg-test').val();
		regPass=$('#reg-pass').val();
		var reg2 = /^[\S]{6,32}$/;
		if (!reg.test(regPhone)) {
            //alert("请输入正确格式的手机号码！");
            $('#reg-phone').parent().addClass('err');/*.children('i').html('输入错误')*/
            return false;
        } else {
            $('#reg-phone').parent().removeClass('err');
        }

		if(regTest==''){
        	$("#reg-test").parent().addClass('Prompt').children('i').html("请输入验证码");
        	return;
        }else{
        	$("#reg-test").parent().removeClass('Prompt').children('i').html("验证码错误");
        }
        
        //密码问题
        if (!reg2.test(regPass)) {
            //alert("密码格式错误");
            $("#reg-pass").parent().addClass('Prompt');
            return;
        } else {
            $("#reg-pass").parent().removeClass('Prompt');
        }
		
		$.ajax({
			type:'post',
			url:"/api",
			data:{
				model: "user/register",
                action: "do_register",
                redirect: "/order?id=1",
                mobile:regPhone,
                captcha:regTest,
                password:sha1(regPass)
			},
			success:function(data){
				if(data.status===0){  //注册成功显示 成功页面 倒计时5秒返回首页或当前页
                    $('.reg-success').addClass('show').siblings('div').removeClass('show');
                    fn();
                }else if(data.status==80011){
                    $("#reg-test").parent().addClass('Prompt').children('i').html("验证码错误");
                }
			}
		})
	});

	//关联已有账户
	$('.agree2').click(function(event) {
		var relPhone=$('#rel-phone').val();
		var relPass= $('#rel-pass').val();
		var reg2 = /^[\S]{6,32}$/;

		if (!reg.test(relPhone)) {
            //alert("请输入正确格式的手机号码！");
            $('#rel-phone').parent().addClass('err').children('i').html('输入错误');/**/
            return false;
        } else {
            $('#rel-phone').parent().removeClass('err').children('i').html('未注册账号');
        }

        
        if(relPass==''){
        	$("#rel-pass").parent().addClass('err').children('i').html('请输入密码');
        	return;
        }else{
        	$("#rel-pass").parent().removeClass('err').children('i').html('密码错误');
        }

        $.ajax({
        	type:'post',
        	url :'',
        	data:{
        		relPhone:'relPhone',
        		relPass :'relPass'
        	},
        	success:function(){
        		if(status===0){
        			$('.rel-success').addClass('show').siblings('div').removeClass('show');
        		}
        	}
        })

	});


	//关联手机账户
    /*$('.guanlian-sj').click(function(event) {
        event.stopPropagation();
    });
    $('.guanlian-sj label').click(function(event) {
        event.stopPropagation();
    });*/
    $('#relP-testing').click(function(event) {
        var relPphone=$('#relP-phone').val();
        var reg = /(1[3-9]\d{9}$)/;
        if (!reg.test(relPphone)) {
            //alert("请输入正确格式的手机号码！");
            $('#relP-phone').parent().addClass('phone-err');/*.children('i').html('输入错误');*/
            return false;
        } else {
            $('#relP-phone').parent().removeClass('phone-err')
        }
        //time(this);测试
        $.get('/login', {
            phone1: 'relPphone',
        }, function () {
            if (status == 0) {
                time(this);
            } else {
                $('#relP-phone').parent().addClass('phone-err');
            }
        })
    });

    $('#agree1').click(function(event) {
        var relPphone=$('#relP-phone').val();
        var relPtest=$('#relP-test').val();
        var relPpass=$('#relP-pass').val();
        var reg2 = /^[\S]{6,32}$/;
        var reg = /(1[3-9]\d{9}$)/;
        
        if (!reg.test(relPphone)) {
            //alert("请输入正确格式的手机号码！");
            $('#relP-phone').parent().addClass('phone-err');/*.children('i').html('输入错误')*/
            return false;
        } else {
            $('#relP-phone').parent().removeClass('phone-err');
        }

        if(relPtest==''){
            $("#relP-test").parent().addClass('err').children('i').html("请输入验证码");
            return;
        }else{
            $("#relP-test").parent().removeClass('err').children('i').html("验证码错误");
        }
        
        //密码问题
        if (!reg2.test(relPpass)) {
            //alert("密码格式错误");
            $("#relP-pass").parent().addClass('err');
            return;
        } else {
            $("#relP-pass").parent().removeClass('err');
        }
        
        $.ajax({
            type:'post',
            url:"",
            data:{
                phone:'relPphone',
                Test:'relPtest',
                userPass:'relPpass'
            },
            success:function(){
                if(status===0){
                    $('.rel-success').addClass('show').siblings('div').removeClass('show');
                    fn();
                }
            }
        })

    });
  //注册成功

});//结尾括号


<!-- <script type="text/javascript">
	$(function() {
		var reg = /(1[3-9]\d{9}$)/;
    
    $('.btnLogin').click(function (event) {
        var tel = $("#phone").val();
        var userName = $("#phone").val();
        var userPass = $("#LoginPass").val();
        var reg = /(1[3-9]\d{9}$)/;
        if (!reg.test(tel)) {
            //alert("请输入正确格式的手机号码！");
            $('.tel').addClass('wrong').children('span').html('输入错误');
            return false;
        } else {
            $('.tel').removeClass('wrong').children('span').html('');
        }

        var LoginP = $('#LoginPass').val();
        if (!LoginP) {
            $('.login-p').addClass('wrong').children('span').html('密码不能为空');
            return;
        } else {
            $('.login-p').removeClass('wrong').children('span').html('');
        }
        //登录时发送的ajax 
        $.ajax({
            type: "post",
            url: "",
            data: {
                userName: userName,
                userPass: userPass
            },
            success: function (data) {
                if (status === 0) {//0代表响应成功
                    window.location.href = "";
                } else {
                    $('.denglu-con').addClass('wrong');
                }

            }
        })

    });
	});
</script> -->
<div class="denglu">
		<img src="/css/common/images/denglu-bg.png" >
		<div>
			<div class="denglu-con show">
				<h3 >请登录</h3>
				<div class=' mar-center  tel'>
					<label for="phone">手机</label>
					<br>
					<input type="text" id="phone">
					<span  class="hidden triangle"></span>
				</div>
				<div class='login-p'>
					<label for="LoginPass">登录密码</label>
					<br>
					<input type="password" id="LoginPass"  >
					<span class="hidden triangle">密码有误</span>
				</div>
				<div class="forget">
					<a href="javascrpit:;">忘记密码</a>
				</div>
				<div>
					<a href="#" class="btnLogin">登录</a>
				</div>
				<div class="other-login ">
					<span>第三方登录</span>
					<a href="#" class="qq"></a>
					<a href="#" class="wb"></a>
					<a href="#" class="wx"></a>
				</div>
				<div class="zc-link login-zc-link">
					<a href="javascrpit:;">没有账号？免费注册</a>
				</div>
			</div>
			
			
			<!-- 注册成功 -->
			<div class="zc-success reg-success">
				<h3>注册成功!</h3>
				<p>感谢注册易衫网！我们将在<i>5</i>秒后回到当前页面</p>
				<div class="link-btn">
					<a href="#">跳至首页</a>
					<a href="#">回当前页</a>
				</div>
			</div>
			
			<!-- 关联成功 -->
			<div class="zc-success rel-success">
				<h3>关联成功!</h3>
				<p>您已成功关联！我们将在<i>5</i>秒后回到当前页面</p>
				<div class="link-btn">
					<a href="#">跳至首页</a>
					<a href="#">回当前页</a>
				</div>
			</div>
			<!-- 重置密码成功 -->
			<div class="zc-success ret-success">
				<h3>重置成功!</h3>
				<p>您已重置成功！我们将在<i>5</i>秒后回到当前页面</p>
				<div class="link-btn">
					<a href="#">跳至首页</a>
					<a href="#">回当前页</a>
				</div>
			</div>
		</div>
	</div>
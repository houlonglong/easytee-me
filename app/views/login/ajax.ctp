<div class="login-main">
    <div>
        <form role="form" class="form"  id="loginForm">
            <div class="form-group">
                <label class="control-label">手机</label>
                <input class="form-control" type="tel" name="username" >
            </div>
            <div class="form-group">
                <label class="control-label">密码</label>
                <input class="form-control" type="password" name="password" onkeyup="value = value.replace(/\s/g, '')">
            </div>
            <div class="form-group">
                <button type="button" data-loading-text="正在努力登录中..." class="btn btn-success btn-lg" id="loginAction">登录</button>
                <a href="/login/findPassword" class="forget-pass">忘记密码?</a> 
            </div>
            <input name="relurl" type="hidden" value="<?php echo $relurl; ?>">
        </form>
        <hr>
    </div>
    <div>
        <h4>合作网站登录</h4>
        <div>
            <a class="btn-login btn-login-zhifubao hidden-xs" href="javascript:authLogin('alipay','<?php echo $relurl; ?>');"><em class="iconfont icon-alipay"></em></a>
<!--            <a class="btn-login-weixin" href="javascript:authLogin('wechat','<?php echo $relurl; ?>');"><em class="iconfont icon-iconfontweixin"></em></a>
            <a class="btn-login-qq" href="javascript:authLogin('qq','<?php echo $relurl; ?>');"><em class="iconfont icon-qq"></em></a>-->
            <a class="btn-login-weibo" href="javascript:authLogin('weibo','<?php echo $relurl; ?>');"><em class="iconfont icon-weibo"></em></a>
            <!--<a class="btn-login btn-login-douban" href="javascript:authLogin('douban','<?php echo $relurl; ?>');"><em class="iconfont icon-douban"></em></a>-->
        </div>
    </div>
    <div>
        <hr>
        <a  href="/register/<?php echo $ajax_request; ?>?relurl=<?php echo urlencode($relurl);?>" class="btn btn-primary btn-block btn-lg">没有帐号？免费注册</a>
    </div>
</div>
<script src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
<script type="text/javascript">

    $(function () {
        if (isWechat()) {
            $('.btn-login-zhifubao').hide();
        }
        var username = $('.login-main input[name="username"]');
        var password = $('.login-main input[name="password"]');
        username.on('keydown', function () {
            username.prevAll('label').text('手机').parents('.form-group').removeClass('has-error');
        });
        password.on('keydown', function () {
            password.prevAll('label').text('密码').parents('.form-group').removeClass('has-error');
        });
        $('#loginAction').click(function () {

            if (username.val() == '') {
                username.focus().prevAll('label').text('请输入手机号码').parents('.form-group').addClass('has-error');
                return false;
            }
            if (username.val().indexOf('@') > -1) {
                var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (!filter.test(username.val())) {
                    username.focus().prevAll('label').text('邮箱格式错误').parents('.form-group').addClass('has-error');
                    return false;
                }
            } else {
                var filter = /^((1[0-9]{1})+\d{9})$/;
                if (!filter.test(username.val())) {
                    username.focus().prevAll('label').text('手机号码格式错误').parents('.form-group').addClass('has-error');
                    return false;
                }
            }
            if (password.val() == '') {
                password.focus().prevAll('label').text('请输入登录密码').parents('.form-group').addClass('has-error');
                return false;
            }
            if (password.val().length < 6) {
                password.focus().prevAll('label').text('登录密码至少需要6位').parents('.form-group').addClass('has-error');
                return false;
            }
            if (password.val().length > 32) {
                password.focus().prevAll('label').text('登录密码不能超过32位').parents('.form-group').addClass('has-error');
                return false;
            }
            $(this).button('loading');
            $.ajax({
                url: "/login/",
                type: "POST",
                dataType: 'json',
                data: $('#loginForm').serialize(),
                success: function (data) {
                    if (data.status == 'OK') {
                        if (data.url) {
                            location.href = data.url;
                        } else {
                            location.href = '/account/';
                        }
                    } else {
                        alert(data.msg);
                        $('#loginAction').button('reset');
                        return false;
                    }
                },
                error: function () {
                    alert('因为网络问题登录失败，请重试！');
                    $('#loginAction').button('reset');
                    return false;
                }
            });


            return false;
        });

    });


</script>
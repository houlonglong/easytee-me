<?php
$redirect = empty($_REQUEST['redirect'])?"":$_REQUEST['redirect'];
?><!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <meta name="renderer" content="webkit">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>登陆-易衫网-中国服装定制首选平台</title>
    <meta name="keywords" content="定制T恤,定制T恤,T恤,T恤丝网印刷,刺绣,数码印刷,设计,定制服装"/>
    <meta name="description" content="使用易衫网的T恤在线设计工具来创建您的作品.您可以上传自己的设计,或者使用我们丰富的素材库和众多的各种字体."/>
    <?php include(block("block/html_head"));?>
</head><body>
<?php include(block("block/nav_bar"));?>
<div class="page-wrapper">
    <div class="login">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 hidden-xs">
                    <img src="/resources/public/image/bar.png" class="img-responsive">
                </div>
                <div class="col-sm-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <div class="panel-title"><h4>请登录</h4></div>
                            <div class="panel-body">
                                <div class="login-main">
                                    <div>
                                        <form role="form" class="form"  id="loginForm">
                                            <div class="form-group">
                                                <label class="control-label">手机号码或者邮箱</label>
                                                <input class="form-control" type="tel" name="username" >
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label">密码</label>
                                                <input class="form-control" type="password" name="password" onkeyup="value = value.replace(/\s/g, '')">
                                            </div>
                                            <div class="form-group">
                                                <button type="button" data-loading-text="正在努力登录中..." class="btn btn-success btn-lg" id="loginAction">登录</button>
                                                <a href="/login/findPassword" class="forget-pass hide">忘记密码?</a>
                                            </div>
                                            <input name="redirect" type="hidden" id="redirect" value="<?=$redirect?>">
                                        </form>
                                        <hr>
                                    </div>
                                    <div class="hide">
                                        <h4>合作网站登录</h4>
                                        <div>
                                            <!-- <a class="btn-login btn-login-zhifubao hidden-xs" href="javascript:authLogin('alipay','http://11.dev.jzw.com/');"><em class="iconfont icon-alipay"></em></a>
                                            <!--            <a class="btn-login-weixin" href="javascript:authLogin('wechat','http://11.dev.jzw.com/');"><em class="iconfont icon-iconfontweixin"></em></a>
                                                        <a class="btn-login-qq" href="javascript:authLogin('qq','http://11.dev.jzw.com/');"><em class="iconfont icon-qq"></em></a>-->
                                            <a class="btn-login-weibo" href="javascript:authLogin('weibo','http://<?=$_SERVER['HTTP_HOST']?>/');"><em class="iconfont icon-weibo"></em></a>
                                            <!--<a class="btn-login btn-login-douban" href="javascript:authLogin('douban','http://11.dev.jzw.com/');"><em class="iconfont icon-douban"></em></a>-->
                                        </div>
                                    </div>
                                    <div>
                                        <hr>
                                        <a  href="/user/register?relurl=" class="btn btn-primary btn-block btn-lg">没有帐号？免费注册</a>
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
                                            username.prevAll('label').text('手机号码或者邮箱').parents('.form-group').removeClass('has-error');
                                        });
                                        password.on('keydown', function () {
                                            password.prevAll('label').text('密码').parents('.form-group').removeClass('has-error');
                                        });
                                        $('#loginAction').click(function () {

                                            if (username.val() == '') {
                                                username.focus().prevAll('label').text('请输入手机号码或者邮箱').parents('.form-group').addClass('has-error');
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
                                                url: "/api?model=user/auth&action=login",
                                                type: "POST",
                                                dataType: 'json',
                                                data: $('#loginForm').serialize(),
                                                success: function (data) {
                                                    if (data.status == 0) {
                                                        if (data.redirect) {
                                                            location.href = data.redirect;
                                                        } else {
                                                            location.href = '/user/index';
                                                        }
                                                    } else {
                                                        alert(data.message);
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


                                </script>                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
<?php include(block("block/page_footer"));?>
</body>
</html>
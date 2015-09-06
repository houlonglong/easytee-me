<?php
if(Model_User_Auth::is_logined()) \PtLib\location("/user/index");

?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <meta name="renderer" content="webkit">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>免费注册-易衫网-中国服装定制首选平台</title>
    <meta name="keywords" content="定制T恤,定制T恤,T恤,T恤丝网印刷,刺绣,数码印刷,设计,定制服装"/>
    <meta name="description" content="使用易衫网的T恤在线设计工具来创建您的作品.您可以上传自己的设计,或者使用我们丰富的素材库和众多的各种字体."/>
    <?php include(block("block/html_head"));?>
    <link rel="stylesheet" type="text/css" href="/resources/public/css/jquery-labelauty.css">


    <script src="/resources/public/js/jquery-labelauty.js" type="text/javascript"></script>

</head>
<body>
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
                            <div class="panel-title"><h4>免费注册</h4></div>
                            <div class="panel-body">
                                <div class="login-main">
                                    <div>
                                        <div>
                                            <form role="form" class="form" method="post"  id="registerForm">
                                                <div class="form-group">
                                                    <label class="control-label">
                                                        手机
                                                    </label>
                                                    <div class="input-group">
                                                        <input type="tel" class="form-control" name="mobile" value="" placeholder="请输入您的手机" id="mobile"/>
                                <span class="group-span-filestyle input-group-btn" tabindex="0">
                                    <button type="button" class="btn btn-default getCaptcha" id="getCaptcha" data-loading-text="获取中...">获取验证码</button>
                                </span>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="control-label">
                                                        验证码
                                                    </label>
                                                    <input class="form-control" type="tel" name="captcha" id="captcha"/>
                                                </div>
                                                <div class="form-group">
                                                    <label class="control-label">
                                                        登录密码
                                                    </label>
                                                    <input class="form-control" type="text" name="password" id="password" autocomplete="off" onkeyup="value = value.replace(/\s/g, '')"/>
                                                </div>
                                                <div class="form-group">
                                                    <label class="control-label">
                                                    </label>
                                                    <button type="button" data-loading-text="正在玩命注册中..." class="btn btn-success btn-lg" id="registerAction">
                                                        免费注册
                                                    </button>
                                                    <?php if(!empty($_GET['campus'])){
                                                        ?>
                                                        <span style="display: inline-block;vertical-align:bottom; height: 40px;">
                                                            <input type="checkbox" name="checkbox"  disabled checked   class="labelauty" id="labelauty-704876" style="display: none; ">
                                                            <label for="labelauty-704876">
                                                                <span class="labelauty-unchecked-image">
                                                                </span><span class="labelauty-unchecked">校园达人</span>
                                                                <span class="labelauty-checked-image">
                                                                </span><span class="labelauty-checked">校园达人</span></label>
                                                        </span>
                                                    <?php } ?>
                                                </div>

                                                <input name="redirect" type="hidden" value="<?php echo empty($_GET['redirect'])? '/user/index': $_GET['redirect'] ?>">
                                            </form>
                                        </div>
                                        <div>
                                            <h4>合作网站登录</h4>
                                            <div>
                                                <!--<a class="btn-login btn-login-zhifubao hidden-xs" href="javascript:authLogin('alipay','http://11.dev.jzw.com/');"><em class="iconfont icon-alipay"></em></a>
                                                <a class="btn-login-weixin" href="javascript:authLogin('wechat','http://11.dev.jzw.com/');"><em class="iconfont icon-iconfontweixin"></em></a>-->
                                                <!--<a class="btn-login-qq" href="javascript:authLogin('qq','http://11.dev.jzw.com/');"><em class="iconfont icon-qq"></em></a>-->
                                                <a class="btn-login-weibo hide" href="javascript:authLogin('weibo','http://<?=$_SERVER['HTTP_HOST']?>/');"><em class="iconfont icon-weibo"></em></a>
                                                <!--<a class="btn-login btn-login-douban" href="javascript:authLogin('douban','http://11.dev.jzw.com/');"><em class="iconfont icon-douban"></em></a>-->
                                            </div>
                                        </div>
                                        <div>
                                            <hr>
                                            <a href="/user/auth/login" class="btn btn-primary btn-block btn-lg">已有帐号？立即登录</a>
                                        </div>
                                    </div>
                                    <script src="/resources/public/js/jquery.cookie.js"></script>
                                    <script type="text/javascript">
                                        $(function () {
                                            var mobile = $.cookie("mobile_cookie");
                                            if(mobile){
                                                $("#mobile").val(mobile);
                                            };

                                            smsCountDown('#getCaptcha');
                                            $('#mobile').on('keyup',function(){
                                                $(this).parents('.form-group').removeClass('has-error').find('label.control-label').text('手机号码');
                                            });
                                            $('#password').on('keyup',function(){
                                                $(this).parents('.form-group').removeClass('has-error').find('label.control-label').text('登录密码');
                                            });
                                            $("#captcha").on('keyup',function(){
                                                $(this).parents('.form-group').removeClass('has-error').find('label.control-label').text('验证码');
                                            });

                                            $('#registerAction').click(function () {

                                                if ($('#mobile').val() == '') {
                                                    $('#mobile').focus().parents('.form-group').addClass('has-error').find('label.control-label').text('请输入手机号码');
                                                    return;
                                                }

                                                var filter  = /^((1[0-9]{1})+\d{9})$/;
                                                if (!filter.test($('#mobile').val())) {
                                                    $('#mobile').focus().parents('.form-group').addClass('has-error').find('label.control-label').text('请输入正确的手机号码');
                                                    return false;
                                                }

                                                if ($("#captcha").val() == '') {
                                                    $("#captcha").focus().parents('.form-group').addClass('has-error').find('label.control-label').text('请输入验证码');
                                                    return;
                                                }
                                                else if ( $('#password').val() == '') {
                                                    $('#password').focus().parents('.form-group').addClass('has-error').find('label.control-label').text('请输入密码');
                                                    return;
                                                }
                                                else if ( $('#password').val().length < 6) {
                                                    $('#password').focus().parents('.form-group').addClass('has-error').find('label.control-label').text('为了账户安全，密码不能少于6位');
                                                    return;
                                                }
                                                else if ( $('#password').val().length > 32) {
                                                    $('#password').focus().parents('.form-group').addClass('has-error').find('label.control-label').text('密码请不要超过32位');
                                                    return;
                                                }
                                                $(this).button('loading');
                                                $.ajax({
                                                    url: "/api?model=user/register&action=do_register",
                                                    type: "POST",
                                                    dataType:'json',
                                                    data: $('#registerForm').serialize(),
                                                    success: function(data){

                                                        if(data.status == 0){
                                                            $.cookie("mobile_cookie",'',{path:"/"});
                                                            if(data.return.redirect && data.return.redirect !=''){
                                                                location.href=data.return.redirect;
                                                            }else{
                                                                location.href='/user/index';
                                                            }
                                                        }else{
                                                            alert(data.message);
                                                            $('#registerAction').button('reset');
                                                            return false;
                                                        }
                                                    },
                                                    error:function(){
                                                        alert('因为网络问题注册失败，请重试！');
                                                        $('#registerAction').button('reset');
                                                        return false;
                                                    }
                                                });

                                                return false;
                                            });

                                            $('#getCaptcha').click(function () {
                                                var mobile = $("#mobile");
                                                if (mobile.val() == '') {
                                                    mobile.focus().parents('.form-group').addClass('has-error').find('label.control-label').text('请输入手机号码');
                                                    return false;
                                                }
                                                if (!(/^((1[0-9]{1})+\d{9})$/.test(mobile.val()))) {
                                                    $("#mobile").focus().parents('.form-group').addClass('has-error').find('label.control-label').text('请输入正确手机号码');
                                                    return false;
                                                }else{
                                                    $("#mobile").parents('.form-group').removeClass('has-error').find(".control-label").text("手机");

                                                }
                                                $.cookie("mobile_cookie",mobile.val(),{path:"/"});
                                                $(this).attr('disabled', true);
                                                $.post("/api?model=user/register&action=get_code&mobile=" + mobile.val(),function(data){
                                                    if (data.status == 0) {
                                                        $.cookie("Captcha",60,{path:"/"});
                                                        smsCountDown('#getCaptcha');
                                                        $("#captcha").focus();
                                                    } else {
                                                        alert(data.message);
                                                        $('#getCaptcha').focus().parents('.form-group').addClass('has-error').find('label.control-label').text(json.msg);
                                                    }
                                                },"json");
                                                return false;
                                            });
                                        });
                                    </script>
                                </div>
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
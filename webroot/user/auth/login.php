
<!DOCTYPE html>
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
    <link rel="stylesheet" href="/resources/public/css/bootstrap.min.css">
    <link rel="stylesheet" href="/resources/public/css/bootstrap-theme.css">

    <link rel="stylesheet" href="/resources/public/css/public.css">
    <!--[if lt IE 9]>
    <script src="/resources/public/js/ie8-responsive-file-warning.js"></script>
    <![endif]-->
    <!--[if lt IE 9]>
    <script src="/resources/public/js/html5shiv.min.js"></script>
    <script src="/resources/public/js/respond.min.js"></script>
    <![endif]-->
    <!--[if lte IE 6]>
    <link rel="stylesheet" type="text/css" href="/resources/public/css/bootstrap-ie6.min.css">
    <![endif]-->
    <link rel="apple-touch-icon" href="/resources/public/image/apple-touch-icon.png">
    <link rel="icon" href="/resources/public/image/favicon.ico">
    <script src="/resources/public/js/jquery.min.js"></script>
</head><body>
<style>
    #navbar .open a{
        color:#636161
    }
</style>
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">切换导航</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand site-logo" href="/">易衫网</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <li><a href="/design" class="design">开始设计</a></li>
                <!--<li><a href="/invite">邀请朋友</a></li>-->
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li><a href="/login/" class="btn-login"><span class="fa fa-user"></span> &nbsp;登录</a></li>
                <li><a href="/register/" class="btn-reg">注册</a></li>
            </ul>
        </div>
    </div>
</nav><div class="page-wrapper">
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
                                            <input name="relurl" type="hidden" value="http://11.dev.jzw.com/">
                                        </form>
                                        <hr>
                                    </div>
                                    <div>
                                        <h4>合作网站登录</h4>
                                        <div>
                                            <a class="btn-login btn-login-zhifubao hidden-xs" href="javascript:authLogin('alipay','http://11.dev.jzw.com/');"><em class="iconfont icon-alipay"></em></a>
                                            <!--            <a class="btn-login-weixin" href="javascript:authLogin('wechat','http://11.dev.jzw.com/');"><em class="iconfont icon-iconfontweixin"></em></a>
                                                        <a class="btn-login-qq" href="javascript:authLogin('qq','http://11.dev.jzw.com/');"><em class="iconfont icon-qq"></em></a>-->
                                            <a class="btn-login-weibo" href="javascript:authLogin('weibo','http://11.dev.jzw.com/');"><em class="iconfont icon-weibo"></em></a>
                                            <!--<a class="btn-login btn-login-douban" href="javascript:authLogin('douban','http://11.dev.jzw.com/');"><em class="iconfont icon-douban"></em></a>-->
                                        </div>
                                    </div>
                                    <div>
                                        <hr>
                                        <a  href="/register/?relurl=http%3A%2F%2F11.dev.jzw.com%2F" class="btn btn-primary btn-block btn-lg">没有帐号？免费注册</a>
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


                                </script>                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
<div id="page-footer">
    <div class="container">
        <div class="visible-xs">Copyright © 2014-2015 易衫网.</div>
        <div class="hidden-xs pull-left copyright">Copyright © 2014-2015 易衫网.</div>
        <div style="margin-left: 230px">
            <div class="row hidden-xs">
                <div class="col-sm-3 col-md-2 col-lg-3">
                    <ul>
                        <li>导航</li>
                        <li><a href="/">首页</a></li>
                        <li><a href="/design">开始设计</a></li>
                        <!--<li><a href="/invite/">邀请朋友</a></li>-->
                        <li><a href="/about/">关于我们</a></li>
                        <li><a href="/help/">帮助中心</a></li>

                    </ul>
                </div>
                <div class="col-md-3 hidden-sm col-lg-3">
                    <ul>
                        <li>服务</li>
                        <!--
                        <li style="display: none"><a href="http://bbs.easytee.me/">会员认证(免费)</a></li>
                        <li><a href="http://bbs.easytee.me/">易衫社区</a></li>
                        <li><a href="http://bbs.easytee.me/">售后服务</a></li>
                        -->
                        <li><div>客服QQ：202351473</div><div style="padding: 5px 0"><a target="_blank" href="http://sighttp.qq.com/authd?IDKEY=4bea2daab922dc1cd8d2c729d2c285ea888f299becee8145"><img border="0"  src="http://wpa.qq.com/imgd?IDKEY=4bea2daab922dc1cd8d2c729d2c285ea888f299becee8145&pic=51" alt="点击这里给我发消息" title="点击这里给我发消息"/></a></div></li>
                    </ul>
                </div>
                <div class="col-sm-5 col-md-4 col-lg-3">
                    <ul>
                        <li>联系我们</li>
                        <li>工作日：上午9点 - 下午6点</li>
                        <li>休息日：上午9点 - 下午5点</li>
                        <li>客服热线：400-92020-85</li>
                        <li>
                            <a href="http://www.zx110.org/picp?sn=310107100040719" style="">
                                <img style="margin-top: 10px;;height:27px;width: 80px;" src="/resources/public/image/picp_bg.png" alt="沪公网备" border="0"/>
                            </a>
                        </li>
                        <!--<li><a href="#">在线客服</a></li>-->
                    </ul>
                </div>
                <div class="col-sm-4 col-md-3 col-lg-3">
                    <ul>
                        <li>官方</li>
                        <li><a href="http://weibo.com/easytee" target="_blank"><em class="iconfont icon-weibo"></em> 官方微博</a></li>
                        <li>
                            <a href="javascript:void(0)" id='weixinIcon'><em class="iconfont icon-iconfontweixin"></em> 官方微信</a>
                            <div id='site-footer-weixin'>
                                <img width="100%" src='/resources/public/image/qrcode.jpg'>
                            </div>
                        </li>
                        <li>

                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/html" id="modal">
    <div class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body">

                </div>
                <div class="modal-footer">
                    <button type="button" class="easytee-modal-cancel btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="easytee-modal-ok btn btn-primary" data-loading-text="加载中...">确定</button>
                </div>
            </div>
        </div>
    </div>
</script>
<script>
    $(function(){
        var mechat = $("<script>");
        mechat.attr(
            {
                src: '//meiqia.com/js/mechat.js?unitid=55dd21444eae358b1c000009',
                charset: 'UTF-8',
                async: 'async'
            });
    })
</script>


<script src="/resources/public/js/bootstrap.min.js"></script>
<script src="/resources/public/js/public.js"></script>
<!--[if lte IE 6]>
<script type="text/javascript" src="/resources/public/js/bootstrap-ie.js"></script>
<![endif]-->
<script type="text/javascript">
    $('#weixinIcon').hover(function () {
        $('#site-footer-weixin').show();
    }, function () {
        $('#site-footer-weixin').hide();
    })
    $('.design').click(function () {
        if (/android/i.test(navigator.userAgent) || /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) || /MicroMessenger/i.test(navigator.userAgent)) {
            alert('为了您能有更好的设计体验，请在电脑上进行在线设计操作O(∩_∩)O');
            return false;
        }
    })
</script>
</body>
</html>
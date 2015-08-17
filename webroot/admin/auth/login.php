
<?php
$site_name = "易衫网";
$site_domain = "easytee.me";
$redirect_url = empty($_GET['redirect'])?"":$_GET['redirect'];
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta charset="utf-8" />
    <title><?=$site_name?>Login</title>

    <meta name="description" content="User login page" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

    <!-- bootstrap & fontawesome -->
    <link rel="stylesheet" href="/ace/assets/css/bootstrap.min.css" />
    <link rel="stylesheet" href="/ace/assets/font-awesome/4.2.0/css/font-awesome.min.css" />

    <!-- text fonts -->
    <link rel="stylesheet" href="/ace/assets/fonts/fonts.googleapis.com.css" />

    <!-- ace styles -->
    <link rel="stylesheet" href="/ace/assets/css/ace.min.css" />
    <link rel="stylesheet" href="/admin/assets/css/style.css" />

    <!--[if lte IE 9]>
    <link rel="stylesheet" href="/ace/assets/css/ace-part2.min.css" />
    <![endif]-->
    <link rel="stylesheet" href="/ace/assets/css/ace-rtl.min.css" />

    <!--[if lte IE 9]>
    <link rel="stylesheet" href="/ace/assets/css/ace-ie.min.css" />
    <![endif]-->

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->

    <!--[if lt IE 9]>
    <script src="/ace/assets/js/html5shiv.min.js"></script>
    <script src="/ace/assets/js/respond.min.js"></script>
    <![endif]-->
    <style>
        *{
            -webkit-user-select: none;
        }
    </style>
</head>
<body class="login-layout light-login">
<input type="hidden" id="redirect" value="<?=$redirect_url?>"/>
<div class="main-container">
    <div class="main-content">
        <div class="row">
            <div class="col-sm-10 col-sm-offset-1">
                <div class="login-container">
                    <div class="center">
                        <h1>
                            <i class="ace-icon fa fa-leaf green"></i>
                            <span class="red"><?=$site_name?></span>
                            <span class="white" id="id-text2">管理平台</span>
                        </h1>
                        <h4 class="blue" id="id-company-text">&copy; <?=$site_domain?></h4>
                    </div>

                    <div class="space-6"></div>

                    <div class="position-relative">
                        <div id="login-box" class="login-box visible widget-box no-border">
                            <div class="widget-body">
                                <div class="widget-main">
                                    <h4 class="header blue lighter bigger center">
                                        <i class="ace-icon fa fa-coffee green"></i> 登 陆
                                    </h4>
                                    <div class="space-6"></div>
                                    <form>
                                        <fieldset>
                                            <label class="block clearfix">
                                                <span class="block input-icon input-icon-right">
                                                    <input type="text" id="username" class="form-control" placeholder="用户名" />
                                                    <i class="ace-icon fa fa-user"></i>
                                                </span>
                                            </label>
                                            <label class="block clearfix">
                                                <span class="block input-icon input-icon-right">
                                                    <input type="password" id="password" class="form-control" placeholder="密码" />
                                                    <i class="ace-icon fa fa-lock"></i>
                                                </span>
                                            </label>
                                            <label class="block clearfix">
                                                <span class="block input-icon input-icon-right">
                                                    <input type="password" id="captcha" class="form-control span" placeholder="验证码" />
                                                    <i class="ace-icon">
                                                        <img id="captcha_img" style="cursor:pointer;margin-top:-1px;margin-right:-4px;" src="/api?model=tools/captcha&action=img&type=admin_auth_login" alt=""/>
                                                    </i>
                                                </span>
                                            </label>
                                            <div class="space"></div>
                                            <div class="clearfix">
                                                <label class="inline" style="display: none!important">
                                                    <input type="checkbox" class="ace" />
                                                    <span class="lbl"> Remember Me</span>
                                                </label>
                                                <button onclick="login()" type="button" class="width-35 pull-right btn btn-sm btn-primary">
                                                    <i class="ace-icon fa fa-key"></i>
                                                    <span class="bigger-110">登陆</span>
                                                </button>
                                            </div>

                                            <div class="space-4"></div>
                                        </fieldset>
                                    </form>

                                    <div class="social-or-login center hide">
                                        <span class="bigger-110">Or Login Using</span>
                                    </div>

                                    <div class="space-6 hide"></div>

                                    <div class="social-login center hide">
                                        <a class="btn btn-primary">
                                            <i class="ace-icon fa fa-facebook"></i>
                                        </a>

                                        <a class="btn btn-info">
                                            <i class="ace-icon fa fa-twitter"></i>
                                        </a>

                                        <a class="btn btn-danger">
                                            <i class="ace-icon fa fa-google-plus"></i>
                                        </a>
                                    </div>
                                </div><!-- /.widget-main -->

                                <div class="toolbar clearfix">
                                    <div class="hide">
                                        <a href="#" data-target="#forgot-box" class="forgot-password-link">
                                            <i class="ace-icon fa fa-arrow-left"></i>&nbsp;
                                            I forgot my password
                                        </a>
                                    </div>

                                    <div class="hide">
                                        <a href="#" data-target="#signup-box" class="user-signup-link">
                                            I want to register
                                            <i class="ace-icon fa fa-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div><!-- /.widget-body -->
                        </div><!-- /.login-box -->

                        <div id="forgot-box" class="forgot-box widget-box no-border">
                            <div class="widget-body">
                                <div class="widget-main">
                                    <h4 class="header red lighter bigger">
                                        <i class="ace-icon fa fa-key"></i>
                                        Retrieve Password
                                    </h4>

                                    <div class="space-6"></div>
                                    <p>
                                        Enter your email and to receive instructions
                                    </p>

                                    <form>
                                        <fieldset>
                                            <label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="email" class="form-control" placeholder="Email" />
															<i class="ace-icon fa fa-envelope"></i>
														</span>
                                            </label>

                                            <div class="clearfix">
                                                <button type="button" class="width-35 pull-right btn btn-sm btn-danger">
                                                    <i class="ace-icon fa fa-lightbulb-o"></i>
                                                    <span class="bigger-110">Send Me!</span>
                                                </button>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div><!-- /.widget-main -->

                                <div class="toolbar center">
                                    <a href="#" data-target="#login-box" class="back-to-login-link">
                                        Back to login
                                        <i class="ace-icon fa fa-arrow-right"></i>
                                    </a>
                                </div>
                            </div><!-- /.widget-body -->
                        </div><!-- /.forgot-box -->

                        <div id="signup-box" class="signup-box widget-box no-border">
                            <div class="widget-body">
                                <div class="widget-main">
                                    <h4 class="header green lighter bigger">
                                        <i class="ace-icon fa fa-users blue"></i>
                                        New User Registration
                                    </h4>

                                    <div class="space-6"></div>
                                    <p> Enter your details to begin: </p>

                                    <form>
                                        <fieldset>
                                            <label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="email" class="form-control" placeholder="Email" />
															<i class="ace-icon fa fa-envelope"></i>
														</span>
                                            </label>

                                            <label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="text" class="form-control" placeholder="Username" />
															<i class="ace-icon fa fa-user"></i>
														</span>
                                            </label>

                                            <label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="password" class="form-control" placeholder="Password" />
															<i class="ace-icon fa fa-lock"></i>
														</span>
                                            </label>

                                            <label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="password" class="form-control" placeholder="Repeat password" />
															<i class="ace-icon fa fa-retweet"></i>
														</span>
                                            </label>

                                            <label class="block">
                                                <input type="checkbox" class="ace" />
														<span class="lbl">
															I accept the
															<a href="#">User Agreement</a>
														</span>
                                            </label>

                                            <div class="space-24"></div>

                                            <div class="clearfix">
                                                <button type="reset" class="width-30 pull-left btn btn-sm">
                                                    <i class="ace-icon fa fa-refresh"></i>
                                                    <span class="bigger-110">Reset</span>
                                                </button>

                                                <button type="button" class="width-65 pull-right btn btn-sm btn-success">
                                                    <span class="bigger-110">Register</span>

                                                    <i class="ace-icon fa fa-arrow-right icon-on-right"></i>
                                                </button>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>

                                <div class="toolbar center">
                                    <a href="#" data-target="#login-box" class="back-to-login-link">
                                        <i class="ace-icon fa fa-arrow-left"></i>
                                        Back to login
                                    </a>
                                </div>
                            </div><!-- /.widget-body -->
                        </div><!-- /.signup-box -->
                    </div><!-- /.position-relative -->

                    <div class="navbar-fixed-top align-right">
                        <br />
                        &nbsp;
                        <a id="btn-login-dark" href="#">Dark</a>
                        &nbsp;
                        <span class="blue">/</span>
                        &nbsp;
                        <a id="btn-login-blur" href="#">Blur</a>
                        &nbsp;
                        <span class="blue">/</span>
                        &nbsp;
                        <a id="btn-login-light" href="#">Light</a>
                        &nbsp; &nbsp; &nbsp;
                    </div>
                </div>
            </div><!-- /.col -->
        </div><!-- /.row -->
    </div><!-- /.main-content -->
</div><!-- /.main-container -->

<!-- basic scripts -->

<!--[if !IE]> -->
<script src="/ace/assets/js/jquery.2.1.1.min.js"></script>

<!-- <![endif]-->

<!--[if IE]>
<script src="/ace/assets/js/jquery.1.11.1.min.js"></script>
<![endif]-->

<!--[if !IE]> -->
<script type="text/javascript">
    window.jQuery || document.write("<script src='/ace/assets/js/jquery.min.js'>"+"<"+"/script>");
</script>

<!-- <![endif]-->

<!--[if IE]>
<script type="text/javascript">
    window.jQuery || document.write("<script src='/ace/assets/js/jquery1x.min.js'>"+"<"+"/script>");
</script>
<![endif]-->
<script type="text/javascript">
    if('ontouchstart' in document.documentElement) document.write("<script src='/ace/assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
</script>

<!-- inline scripts related to this page -->
<script type="text/javascript">
    jQuery(function($) {
        $(document).on('click', '.toolbar a[data-target]', function(e) {
            e.preventDefault();
            var target = $(this).data('target');
            $('.widget-box.visible').removeClass('visible');//hide others
            $(target).addClass('visible');//show target
        });
    });

    function login(){
        var username = $("#username").val();
        var password = $("#password").val();
        var redirect = $("#redirect").val();
        var captcha = $("#captcha").val();
        $.post('/api',{
            model:"admin/auth",
            action:"login",
            username:username,
            password:password,
            redirect:redirect,
            captcha:captcha
        },function(data){
            if(data.status){
                alert(data.message);
                $("#captcha_img").attr("src",$("#captcha_img").attr("src"));
            }else{
                alert(data.return);
                if(data.redirect) location.href = data.redirect;
            }
        },"json");
        console.log(username,password);
    }
    //you don't need this, just used for changing background
    jQuery(function($) {
        $("#captcha_img").click(function(){
            var src = this.src;
            this.src = this.src;
            return false;
        });
        $('#btn-login-dark').on('click', function(e) {
            $('body').attr('class', 'login-layout');
            $('#id-text2').attr('class', 'white');
            $('#id-company-text').attr('class', 'blue');

            e.preventDefault();
        });
        $('#btn-login-light').on('click', function(e) {
            $('body').attr('class', 'login-layout light-login');
            $('#id-text2').attr('class', 'grey');
            $('#id-company-text').attr('class', 'blue');

            e.preventDefault();
        });
        $('#btn-login-blur').on('click', function(e) {
            $('body').attr('class', 'login-layout blur-login');
            $('#id-text2').attr('class', 'white');
            $('#id-company-text').attr('class', 'light-blue');

            e.preventDefault();
        });

    });
</script>
</body>
</html>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="../../css/common/style.css">
    <link rel="stylesheet" type="text/css" href="../../css/login/login.css">
    <script type="text/javascript" src="../../js/app/common/jquery-1.11.2.min.js"></script>
    <script type="text/javascript" src="../../js/app/common/index.js"></script>
    <script type="text/javascript" src="../../js/app/login/index.js"></script>
    <title></title>
</head>
<body>
<div class="try"><i></i></div>
<header>
    <span class="header-bg"></span>

    <div class="inHead">
        <nav class="typeArea clearfix nav">
            <h1 class="logo">
                <a href="index.html">易衫网</a>
            </h1>
            <span class="how">如何开始</span>

            <div class="login">
                <a href="#" class="begin">发起活动</a>

                <div>
                    <a href="#">消息</a>
                    <a href="#">登录</a>
                    <a href="#">注册</a>
                </div>
            </div>
        </nav>
    </div>
    <div class="head-foot"></div>
</header>


<?php include(block("block/login"))?>


<!-- <input type="password" id="tel">   //判断手机号的正则
<button id="btnJ">提交</button> -->


<div class="foot">
    <div class="infooter clearfix">
        <h2>易衫网</h2>
        <dl>
            <dt>导航</dt>
            <dd>
                <a href="#">首页</a>
            </dd>
            <dd>
                <a href="#">开始设计</a>
            </dd>
            <dd>
                <a href="#">关于我们</a>
            </dd>
            <dd>
                <a href="#">帮助中心</a>
            </dd>
        </dl>
        <dl>
            <dt>服务</dt>
            <dd>客服QQ：12345678</dd>
        </dl>
        <dl>
            <dt>联系我们</dt>
            <dd>工作日：上午9点 - 下午6点</dd>
            <dd>休息日：上午9点 - 下午5点</dd>
            <dd>客服热线 ： 400-92020-85</dd>
        </dl>
        <dl>
            <dt>官方</dt>
            <dd class="weibo">
                <a href="#">微博</a>
            </dd>
            <dd class="weixin">微信</dd>
        </dl>
        <span class="ewm"></span>

        <p>Copyright © 2014-2015 易衫网 沪公网备310107100040719</p>
    </div>
</div>
</body>
</html>
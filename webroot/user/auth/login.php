<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="../../css/common/style.css">
    <link rel="stylesheet" type="text/css" href="../../css/login/login.css">
    <script type="text/javascript" src="../../js/app/common/jquery-1.11.2.min.js"></script>
    <script type="text/javascript" src="/js/libs/crypt/sha1.js"></script>
    <script type="text/javascript" src="/js/app/common/index.js"></script>
    <script type="text/javascript" src="/js/app/login/index.js"></script>
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

<?php include(block("block/footer")) ?>

</body>
</html>
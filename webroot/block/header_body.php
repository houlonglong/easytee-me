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
                    <a href="#" id="popup-login">登录</a>
                    <a href="#" id="popup-register">注册</a>
                </div>
            </div>
        </nav>
    </div>
    <div class="head-foot"></div>
</header>

<div class="try"><i></i></div>
<div class="tanceng">
    <span class="close"></span>
    <div></div>
</div>
<div class="hidden" id="page-popup">
    <div id="page-login">
        <?php include(block("block/login")) ?>
    </div>
    <div id="page-register">
        <?php include(block("block/register")) ?>
    </div>
    <div id="page-reset">
        <?php include(block("block/reset")) ?>
    </div>
</div>
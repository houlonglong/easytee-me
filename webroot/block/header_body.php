
<header>
    <span class="header-bg"></span>
    <div class="inHead">
        <nav class="typeArea clearfix nav">
            <h1 class="logo">
                <a href="index.html">易衫网</a>
            </h1>
            <span class="how">如何开始</span>

            <div class="login login-personage">
                <a href="#" class="begin">发起活动</a>

                <div class=""><!--左边div登录后添加类名current就可以隐藏登录和注册 显示头像和昵称 没登录就删除current-->
                    <a href="#">消息</a>
                    <?php if(!Model_User_Auth::is_logined()){ ?>
                    <a href="#" id="popup-login">登录</a>
                    <a href="#" id="popup-register" >注册</a>
                    <?php }else{ ?>


                </div>
                <div class="afterLogin">
                    <span><?php echo PtApp::$auth['nick_name'] ?></span>
                    <a href="#"><img src="../css/common/images/login_icon.jpg"></a>
                    <div class="popup-personage">
                        <ul>
                            <li><a href="#">活动管理</a></li>
                            <li><a href="#">展示中心</a></li>
                            <li><a href="#">我的关注</a></li>
                            <li><a href="#">我的订单</a></li>
                            <li><a href="#">管理中心</a></li>
                            <li><a href="#">退出登录</a></li>
                        </ul>
                    </div>
                </div>

                <?php } ?>
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
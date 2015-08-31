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
            <?php if(Model_User_Auth::is_logined()){?>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="/user/order/index">我的订单</a></li>
                    <li><a href="/user/activity/index">我的活动</a></li>
                    <li class="dropdown  pull-right">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">你好，18601628937 <span class="caret"></span></a>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="/user/setting/profile">账户设置</a></li>
                            <li class="divider"></li>
                            <li><a href="/api?model=user/auth&action=logout">注销</a></li>
                        </ul>
                    </li>
                </ul>
            <?php }else{ ?>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="/user/auth/login" class="btn-login"><span class="fa fa-user"></span> &nbsp;登录</a></li>
                    <li><a href="/user/register" class="btn-reg">注册</a></li>
                </ul>
            <?php }?>
        </div>
    </div>
</nav>
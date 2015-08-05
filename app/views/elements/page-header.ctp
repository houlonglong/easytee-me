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
                <?php if (empty($user)) { ?>
                    <li><a href="/login/" class="btn-login"><span class="fa fa-user"></span> &nbsp;登录</a></li>
                    <li><a href="/register/" class="btn-reg">注册</a></li>
                <?php } else { ?>
                    <li><a href="/account/order/">我的订单</a></li>
                    <li><a href="/account/">卖家中心</a></li>
                    <li class="dropdown  pull-right">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">你好，<?= $user['nickname']; ?> <span class="caret"></span></a>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="/account/setting">账户设置</a></li>
                            <li class="divider"></li>
                            <li><a href="/login/loginout">注销</a></li>
                        </ul>
                    </li>
                <?php } ?>
            </ul>
        </div>
    </div>
</nav>
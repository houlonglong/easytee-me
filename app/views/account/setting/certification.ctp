<div class="account-nav">
    <div class="container">
        <ul class="nav nav-tabs">
            <li><a href="/Account/">活动管理</a></li>
            <li><a href="/Account/design/clipart">我的素材</a></li>
            <li><a href="/Account/order/">我的订单</a></li>
            <li><a href="/Account/moneyflow/">收支明细</a></li>
            <li class="active pull-right"><a href="/Account/setting/">个人设置</a></li>
        </ul>
    </div>
</div>

<div class="account-main account-setting">
    <div class="container">
        <div class="row">
            <div class="col-sm-3 col-md-2 sidebar">
                <h4>个人设置</h4>
                <ul class="nav nav-pills nav-stacked">
                    <li>
                        <a href="/Account/setting/">个人资料</a>
                    </li>
                    <li>
                        <a href="/Account/setting/address">收货地址</a>
                    </li>
                    <li class="active">
                        <a href="/Account/setting/certification">实名认证</a>
                    </li>
                    <li>
                        <a href="/Account/setting/pay">收款账号</a>
                    </li>
                    <li>
                        <a href="/Account/setting/safebind">账号绑定</a>
                    </li>
                    <?php if ($user['mobile']) {
                        ?>
                        <li>
                            <a href="/Account/setting/changpass">修改密码</a>
                        </li>
                    <?php } ?>
                </ul>
            </div>
            <div class="col-sm-9 col-md-10 account-main-right">

            </div>
        </div>
    </div>
</div>
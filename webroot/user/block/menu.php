<!-- Navigation -->
<aside id="menu">
    <div id="navigation">
        <div class="profile-picture">
            <?php
            $uid = Model_User_Abstract::get_uid();
            $user = PtLib\db_select_row("select u.id,u.app_uid,u.nick_name,n.photo from users as u left join new_users as n on n.id = u.app_uid where u.id = ?",$uid);
            ?>
            <a href="/user/index">
                <img style="width: 50px;height:50px" src="<?=empty($user['photo'])?"/static/images/no-photo.png":$user['photo'] ?>" class="img-circle m-b" alt="logo">
            </a>

            <div class="stats-label text-color">
                <span class="font-extra-bold"><?=$user['nick_name']?></span>
                <div class="dropdown" style="margin-top: 10px;">
                    <a class="dropdown-toggle" href="#" data-toggle="dropdown">
                        <small class="text-muted">注册用户 <b class="caret"></b></small>
                    </a>
                    <ul class="dropdown-menu animated fadeInLeft m-t-xs">
                        <li><a href="/user/setting/profile">个人资料</a></li>
                        <li><a href="/user/setting/address">收货地址</a></li>
                       <li class="divider"></li>
                        <li><a href="/api?model=user/auth&action=logout">退出</a></li>
                    </ul>
                </div>
            </div>
        </div>
<?php
function check_active_sub_menu($control){
    if(PtApp::$control == $control) echo "active";
}
function check_active_menu($controls){
    if(in_array(PtApp::$control,$controls)) echo "active";
}
?>
        <ul class="nav" id="side-menu">
            <!--            <li class="active">-->
            <!--                <a href="index.html"> <span class="nav-label">Dashboard</span> <span class="label label-success pull-right">v.1</span> </a>-->
            <!--            </li>-->
            <!--            <li>-->
            <!--                <a href="analytics.html">-->
            <!--                    <span class="nav-label">我是发起人</span>-->
            <!--                    <span class="label label-warning pull-right">NEW</span> </a>-->
            <!--            </li>-->
            <li class="<?php check_active_menu(array('/user/activity/index','/user/activity/detail'))?>">
                <a href="#"><span class="nav-label">我是发起人</span><span class="fa arrow"></span> </a>
                <ul class="nav nav-second-level">
                    <li class="<?php check_active_sub_menu('/user/activity/index')?>"><a href="/user/activity/index">我的活动</a></li>
                    <li class="hide"><a href="#typography.html">营销中心</a></li>
                    <li class="hide"><a href="#typography.html">寻找设计</a></li>
                </ul>
            </li>
            <li class="hide">
                <a href="#"><span class="nav-label">我的展示中心</span><span class="fa arrow"></span> </a>
                <ul class="nav nav-second-level">
                    <li><a href="#projects.html">展示中心</a></li>
                    <li><a href="#contacts.html">店面装修</a></li>
                </ul>
            </li>
            <li class="hide">
                <a href="#"><span class="nav-label">我的关注</span><span class="fa arrow"></span> </a>
                <ul class="nav nav-second-level">
                    <li><a href="#transition_two.html">关注店面</a></li>
                </ul>
            </li>
            <li class="hide">
                <a href="#"><span class="nav-label">我的信息</span><span class="fa arrow"></span> </a>
                <ul class="nav nav-second-level">
                    <li><a href="#login.html">店面留言</a></li>
                    <li><a href="#register.html">私信</a></li>
                    <li><a href="#error_one.html">系统通知</a></li>
                </ul>
            </li>
            <li class="hide">
                <a href="#"><span class="nav-label">我是设计师</span><span class="fa arrow"></span> </a>
                <ul class="nav nav-second-level">
                    <li><a href="#tables_design.html">设计师认证</a></li>
                    <li><a href="#datatables.html">模板</a></li>
                    <li><a href="#datatables.html">作品</a></li>
                    <li><a href="#footable.html">我的邀请</a></li>

                </ul>
            </li>
            <li class="<?php check_active_menu(array('/user/order/index','/user/order/detail'))?>">
                <a href="#"><span class="nav-label">我的订单</span><span class="fa arrow"></span> </a>
                <ul class="nav nav-second-level">
                    <li class="<?php check_active_sub_menu('/user/order/index')?>"><a href="/user/order/index" >订单列表</a></li>
                </ul>
            </li>
            <li class="<?php check_active_menu(array('/user/setting/profile','/user/setting/address','/user/setting/pay_account','/user/setting/withdraw','/user/setting/withdraw_record'))?>">
                <a href="#"><span class="nav-label">管理中心</span><span class="fa arrow"></span> </a>
                <ul class="nav nav-second-level">
                    <li class="<?php check_active_sub_menu('/user/setting/profile')?>"><a href="/user/setting/profile" >个人资料</a></li>
                    <li class="hide"><a href="#datatables.html">我的成长</a></li>
                    <li class="<?php check_active_sub_menu('/user/setting/profile')?>"><a href="/user/setting/address">收货地址</a></li>
                    <li class="<?php check_active_sub_menu('/user/setting/pay_account')?>"><a href="/user/setting/pay_account" >收款帐户</a></li>
                    <li class="<?php check_active_sub_menu('/user/setting/withdraw')?>"><a href="/user/setting/withdraw" >提现申请</a></li>
                    <li class="<?php check_active_sub_menu('/user/setting/withdraw_record')?>"><a href="/user/setting/withdraw_record" >提现申请记录</a></li>
                    <li class="hide"><a href="#footable.html">收支管理</a></li>
                    <li class="hide"><a href="#footable.html">安全中心</a></li>
                    <li class="hide"><a href="#footable.html">帐户绑定</a></li>
                </ul>
            </li>

        </ul>
    </div>
</aside>
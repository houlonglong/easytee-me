<ul class="nav nav-pills nav-stacked">
    <li class="p">
        <small class="text-muted">个人中心</small>
    </li>
    <li class="ng-scope <?php echo @$accountMenu=='sales'?'active':'';?>">
        <a href="/home/design/">
            <span class="label label-green pull-right ng-binding ng-scope"></span>
            <em class="fa fa-fw fa-lg fa-inbox"></em>
            <span class="ng-binding">我的众筹</span>
        </a>
    </li>
    <li class="ng-scope <?php echo @$accountMenu=='designs'?'active':'';?>">
        <a href="/home/designDraft/">
            <em class="fa fa-fw fa-lg fa-pencil"></em>
            <span class="ng-binding">我的草稿箱</span>
        </a>
    </li>
    <li class="ng-scope <?php echo @$accountMenu=='photo'?'active':'';?>">
        <a href="/home/photo/">
            <em class="fa fa-fw fa-lg fa-photo"></em>
            <span class="ng-binding">素材库</span>
        </a>
    </li>
    <li class="ng-scope <?php echo @$accountMenu=='order'?'active':'';?>">
        <a href="/home/orderList"><span class="label label-green pull-right ng-binding ng-scope"></span>
            <em class="fa fa-fw fa-lg fa-shopping-cart"></em>
            <span class="ng-binding">我的订单</span>
        </a>
    </li>
    <li class="ng-scope <?php echo @$accountMenu=='pay-details'?'active':'';?>">
        <a href="/home/moneyFlow/">
            <em class="fa fa-fw fa-lg fa-money"></em>
            <span class="ng-binding">收支明细</span>
        </a>
    </li>
    <li class="ng-scope <?php echo @$accountMenu=='service'?'active':'';?>">
        <a href="/service/"><span class="label label-green pull-right ng-binding ng-scope"></span>
            <em class="fa fa-fw fa-lg fa-coffee"></em>
            <span class="ng-binding">客服中心</span>
        </a>
    </li>
    <li class="ng-scope <?php echo @$accountMenu=='address'?'active':'';?>">
        <a href="/home/addressList">
            <em class="fa fa-fw fa-lg fa-gear"></em>
            <span class="ng-binding">地址簿</span>
        </a>
    </li>
    <li class="ng-scope <?php echo @$accountMenu=='home'?'active':'';?>">
        <a href="/home/#home">
            <em class="fa fa-fw fa-lg fa-gear"></em>
            <span class="ng-binding">账户设置</span>
        </a>
    </li>
    <li class="ng-scope">
        <a href="<?=WWW_URL?>/login/loginout">
            <em class="fa fa-fw fa-lg fa-power-off"></em>
            <span class="ng-binding">注销</span>
        </a>
    </li>
</ul>
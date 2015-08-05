<div class="account-nav">
    <div class="container">
        <ul class="nav nav-tabs">
            <li><a href="/Account/">活动管理</a></li>
            <li class="active"><a href="/Account/design/clipart">我的素材</a></li>
            <li><a href="/Account/order/">我的订单</a></li>
            <li><a href="/Account/moneyflow/">收支明细</a></li>
            <li class="pull-right"><a href="/Account/setting/">个人设置</a></li>
        </ul>
    </div>
</div>

<div class="account-main account-design">
    <div class="container">
        <div class="row">
            <div class="col-sm-3 col-md-2 sidebar">
                <h4>我的素材</h4>
                <ul class="nav nav-pills nav-stacked">
                    <li class="active">
                        <a href="/Account/design/clipart">我的素材</a>
                    </li>
                    <!--
                    <li>
                        <a href="/Account/design/share">素材共享计划</a>
                    </li>
                    -->
                </ul>
            </div>
            <div class="col-sm-9 col-md-10 account-main-right">
                  <div class="row">
                    <?php
                    $count = '';
                    if (isset($designs['item'][1])) {
                    $count = $designs['item'][0]['count'];
                    unset($designs['item'][0]);
                    foreach ($designs['item'] as $design) {
                    ?>
                    <div class="col-sm-2">
                        <img class="img-responsive" src="<?php echo $design['attribute']['thumb_jit']; ?>">
                        <h5><?php echo $design['attribute']['art_name']; ?></h5>
                    </div>
                    <?php }} else{ ?>
                      <div class="col-sm-12"><h5>您还没有素材哦</h5></div>
                <?php    }?>
                </div>
                 <nav class="pull-right">
                   <?php echo pageClass($count,12,'');?>
                </nav>
            </div>
        </div>
    </div>
</div>
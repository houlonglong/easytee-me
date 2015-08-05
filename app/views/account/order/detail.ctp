<div class="account-nav hidden-print">
    <div class="container">
        <ul class="nav nav-tabs" role="navigation">
            <li><a href="/Account/">活动管理</a></li>
            <li><a href="/Account/design/clipart">我的素材</a></li>
            <li class="active"><a href="/Account/order/">我的订单</a></li>
            <li><a href="/Account/moneyflow/">收支明细</a></li>
            <li class="pull-right"><a href="/Account/setting/">个人设置</a></li>
        </ul>
    </div>
</div>
<div class="account-main account-order-detail">
    <div class="container">
        <div class="row">
            <div class="col-sm-3 col-md-2 sidebar hidden-print">
                <h4>我的订单</h4>
                <ul class="nav nav-pills nav-stacked" role="navigation">
                    <?php
                    $class = '';
                    if (!isset($status)) {
                        $status = 'unpaid';
                    }
                    if ($status == 'unpaid') {
                        $class = 'class="active"';
                    } else {
                        $class = '';
                    }
                    ?>
                    <li <?php echo $class; ?>>
                        <a href="/Account/order/unpaid">待付款</a>
                    </li>
                    <?php
                    if ($status == 'paid') {
                        $class = 'class="active"';
                    } else {
                        $class = '';
                    }
                    ?>
                    <li <?php echo $class; ?>>
                        <a href="/Account/order/paid">已付款</a>
                    </li>
                    <?php
                    if ($status == 'close') {
                        $class = 'class="active"';
                    } else {
                        $class = '';
                    }
                    ?>
                    <li <?php echo $class; ?>>
                        <a href="/Account/order/close">已关闭</a>
                    </li>
                    <?php
                    if ($status == 'finish') {
                        $class = 'class="active"';
                    } else {
                        $class = '';
                    }
                    ?>
                    <li <?php echo $class; ?>>
                        <a href="/Account/order/finish">已完成</a>
                    </li>
                </ul>
            </div>
            <?php
            if (!$order) {
                echo '<div>当前订单不存在</div>';
            } else {
                $orderGoods = $order['OrderGoods'];
                $orderAttribute = $order['OrderAttribute'];
                $express = null;
                if (isset($order['express'])) {
                    $express = $order['express'];
                }
                $order = $order['Order'];
                ?>
                <div class="col-sm-9 col-md-10  account-main-right">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="btn-group pull-right  hidden-print">
                                <?php
                                if ($order['status'] == '待付款' && $order['activity_real_end_time'] > date('Y-m-d H:i:s')) {
                                    echo '<div class="row"><div class="col-xs-12">
                                          <a href="/order/?pay_type=alipay&order_id=' . $order['id'] . '" class="btn btn-sm btn-warning" id="gotopay">
                                              <span class="iconfont icon-alipay"></span> 支付宝支付</a>
                                        <a class="btn btn-success" onclick="do_wechat_pay(' . $order['id'] . ')">
                                            <span class="iconfont icon-iconfontweixin" ></span> 微信支付</a>

                                            </div></div>';
                                }
                                if ($order['status'] != '待付款') {
                                    echo ' <button type="button" onclick="window.print();" class="btn btn-default btn-sm">打印票据
                                </button>
                                <a href="tuihuo.php?id=1"  class="hidden btn btn-success btn-sm get-tuihuo">申请售后
                                </a>
                                <button type="button" class="hidden btn btn-default btn-sm"  id="get-invoice" data-href="invoice.php">申请发票
                                </button>';
                                }
                                ?>

                            </div>
                            <h3 class="">订单号:<?php echo $order['order_no']; ?></h3>
                            <span>订购时间：<?php echo $orderAttribute['pay_time']; ?>
                                &nbsp;&nbsp;&nbsp;发货时间： <?php echo empty($order['delivery_time']) ? '还未发货' : $order['delivery_time']; ?></span>
                            <hr>
                            <div class="row mb-lg">
                                <div class="col-sm-6 col-xs-12">
                                    <div class="row">
                                        <div class="col-md-2 text-center visible-md visible-lg">
                                            <em class="iconfont icon-97kuaidi"></em>
                                        </div>
                                        <div class="col-md-10">
                                            <h5>收货人：<?php echo $order['ship_name']; ?></h5>
                                            <address><?php echo $order['ship_province'] . $order['ship_city'] . $order['ship_area'] . $order['ship_addr']; ?>
                                                <br><?php echo $order['ship_mobile']; ?></address>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6 col-xs-12">
                                    <div class="text-center" style="line-height: 100px;display: none">
                                        等待发货
                                    </div>
                                    <?php if (!empty($express)) { ?>
                                        <div class="clearfix">
                                            <p class="pull-left">物流公司
                                            </p>

                                            <p class="pull-right mr"><?php echo $express['name']; ?>
                                            </p>
                                        </div>
                                        <div class="clearfix">
                                            <p class="pull-left">物流单号
                                            </p>

                                            <p class="pull-right mr"><?php echo $express['express_no']; ?><span
                                                    class="hidden-print">(<a href="#"
                                                                             data-href="<?php echo $express['api'] . '?number=' . $express['express_no']; ?>"
                                                                             id="kuaidi-search">查物流</a>)</span>
                                            </p>
                                        </div>
                                        <div class="clearfix">
                                            <p class="pull-left">签收时间
                                            </p>

                                            <p class="pull-right mr"><?php
                                                if ($order['sign_time'] == '0000-00-00 00:00:00') {
                                                    echo '还未签收';
                                                };
                                                ?>
                                            </p>
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="table-responsive table-bordered mb-lg">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th>商品信息#</th>
                                        <th style="width: 80px">尺码</th>
                                        <th style="width: 60px">数量</th>
                                        <th style="width: 60px">单价</th>
                                        <th class="text-right" style="width: 60px">总价</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <?php
                                    if ($orderGoods && is_array($orderGoods)) {
                                        foreach ($orderGoods as $good) {
                                            ?>
                                            <tr>
                                                <td>
                                                    <div class="media">
                                                        <a class="media-left" href="#">
                                                            <img src="<?php echo $good['img_path']; ?>" alt="...">
                                                        </a>

                                                        <div class="media-body">
                                                            <h4 class="media-heading"><?php echo $good['product_name'] . '(' . $good['product_style_name'] . ')' . $good['manufacturer_brand_name']; ?></h4>
                                                        </div>
                                                    </div>
                                                <td><?php echo $good['size']; ?></td>
                                                <td><?php echo $good['quantity']; ?></td>
                                                <td><?php echo $good['unit_price']; ?></td>
                                                <td class="text-right"><?php echo round($good['unit_price'] * $good['quantity'],2); ?></td>
                                            </tr>
                                        <?php
                                        }
                                    }
                                    ?>
                                    </tbody>
                                </table>
                            </div>
                            <div class="row">
                                <div class="col-sm-offset-8 col-sm-4 pv">
 <?php if ($order['status'] == '待付款') {
                                ?>
                                        <div class="clearfix"><p class="pull-left h4">邮费
                                            </p>

                                            <p class="pull-right mr h4">￥<?php echo $order['express_price']; ?>
                                            </p></div>
                                    <div class="clearfix"><?php } ?>
                                        <p class="pull-left h4">合计
                                        </p>

                                        <p class="pull-right mr h4">
                                            ￥<?php echo  ($order['status'] != '待付款')?$order['total_price']:$order['total_price']+$order['express_price']; ?>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <hr style="border-top: 2px dotted #ddd">
                            <?php if ($order['status'] != '待付款') {
                                ?>
                                <table class="table">
                                    <thead>
                                    <tr class="gray">
                                        <th>支付方式#</th>
                                        <th>支付单号</th>
                                        <th class="text-right">金额</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr class="bg-gray">
                                        <td><?php
                                            switch ($orderAttribute['pay_type']) {
                                                case 'wechat':
                                                    echo '微信支付';
                                                    break;
                                                case 'unionpay':
                                                    echo '网银支付';
                                                    break;
                                                case 'easytee':
                                                    echo '站内交易';
                                                    break;
                                                case 'alipay':
                                                    echo '支付宝';
                                                    break;
                                            }
                                            ?></td>
                                        <td><?php echo $orderAttribute['pay_no']; ?></td>
                                        <td class="text-right"><?php echo $orderAttribute['pay_price']; ?></td>
                                    </tr>
                                    <tr class="bg-gray hidden">
                                        <td>兑换</td>
                                        <td>兑换码：SDFS-DG43-TEGf-FDH5</td>
                                        <td class="text-right">-156</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div class="row">
                                    <div class="col-sm-offset-8 col-sm-4 pv">
                                        <div class="clearfix">
                                            <p class="pull-left">快递费
                                            </p>

                                            <p class="pull-right mr">￥<?php echo $order['express_price']; ?>
                                            </p>
                                        </div>
                                        <div class="clearfix">
                                            <p class="pull-left h3">共支付
                                            </p>

                                            <p class="pull-right mr h3">￥<?php echo $orderAttribute['pay_price']; ?>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            <?php
                            }
                            ?>
                        </div>
                    </div>
                </div>
            <?php }
            ?>
        </div>
    </div>
</div>
<script>
    function do_wechat_pay(id) {
        popup('微信扫码支付', '/order/?format=html&pay_type=wechat&order_id=' + id, {
            cancel: {
                show: true, callback: null
            },
            ok: {
                show: true, callback: function (m, $this) {
                    location.reload();
                    return false;
                }
            }
        });
    }
</script>


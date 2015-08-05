<div class="account-nav">
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
<div class="account-main account-order">
    <div class="container">
        <div class="row">
            <div class="col-sm-3 col-md-2 sidebar">
                <h4>我的订单</h4>
                <ul class="nav nav-pills nav-stacked" role="navigation">
                    <?php
                    $class = '';
                    if (!isset($id)) {
                        $id = 'unpaid';
                    }if ($id == 'unpaid') {
                        $class = 'class="active"';
                    } else {
                        $class = '';
                    }
                    ?>
                    <li <?php echo $class; ?>>
                        <a href = "/Account/order/unpaid">待付款</a>
                    </li>
                    <?php
                    if ($id == 'paid') {
                        $class = 'class="active"';
                    } else {
                        $class = '';
                    }
                    ?>
                    <li <?php echo $class; ?>>
                        <a href = "/Account/order/paid">已付款</a>
                    </li>
                    <?php
                    if ($id == 'close') {
                        $class = 'class="active"';
                    } else {
                        $class = '';
                    }
                    ?>
                    <li <?php echo $class; ?>>
                        <a href = "/Account/order/close">已关闭</a>
                    </li>
                    <?php
                    if ($id == 'finish') {
                        $class = 'class="active"';
                    } else {
                        $class = '';
                    }
                    ?>
                    <li <?php echo $class; ?>>
                        <a href = "/Account/order/finish">已完成</a>
                    </li>
                </ul>
            </div>
            <div class = "col-sm-9 col-md-10 account-main-right">
                <form class = "form-inline" role = "form">
                    <div class = "form-group">
                        <label class = "sr-only" for = "orderId">订单号</label>
                        <input type = "text" class = "form-control" id = "orderId" placeholder = "订单号" value = "<?php echo strip_tags(@$_GET['orderId']); ?>">
                    </div>
                    <div class = "form-group">
                        <label class = "sr-only" for = "activity-name">活动名称</label>
                        <input type = "text" class = "form-control" id = "design-name" placeholder = "活动名称" value = "<?php echo strip_tags(@$_GET['activityName']); ?>">
                    </div>
                    <div class = "form-group" id = "reservation">
                        <label class = "sr-only">订单时间</label>
                        <div class = "form-control">
                            <i class = "fa fa-calendar fa-lg"></i>
                            <span id = "period"><?php echo $startTime; ?> 至 <?php echo $endTime; ?></span>

                            <b class = "caret"></b>
                        </div>
                    </div>
                    <div class = "form-group form-search">
                        <button class = "btn btn-primary btn-sm" id = "search-order">搜索</button>
                    </div>
                </form>
                <hr>
                <table class = "table table-hover table-striped">
                    <thead>

                        <tr>
                            <th>订单信息</th>
                            <th style = "min-width: 80px">收货人</th>
                            <th style = "min-width: 80px">订单金额</th>
                            <th class = "text-center" style = "min-width: 80px">购买时间</th>
                            <th style = "min-width: 100px">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $count = 0;
                        if ($orderList) {
                            $count = $orderList['count'];
                            unset($orderList['count']);
                            foreach ($orderList as $order) {
                                ?>
                                <tr>
                                    <td>
                                        <div>单号：<a href="/account/order/<?php echo $order['id']; ?>" target="_blank" class="no-link"><?php echo $order['order_no']; ?></a>&nbsp;&nbsp; </div>
                                        <div class="media">
                                            <a class="media-left" href="#">
                                                <img src="<?php echo $order['order_goods']['img_path']; ?>">
                                            </a>
                                            <div class="media-body">
                                                <h5 class="media-heading"><a href="/activity/<?php echo $order['activity_id']; ?>" target="_blank"  class="no-link"><?php echo $order['name']; ?></a></h5>
                                            </div>
                                        </div>
                                    </td>
                                    <td><?php echo $order['ship_name']; ?></td>
                                    <td>￥<?php echo $order['total_price']; ?></td>
                                    <td class="text-center"><?php echo $order['create_time']; ?></td>
                                    <td>
                                        <div><a href="/account/order/<?php echo $order['id'] . '/' . $id; ?>" target="_blank">查看</a></div>
                                        <?php
                                        $status = $order['status'];
                                        if (in_array($status, array('待付款', '待发货')) && ($order['real_end_time'] > date('Y-m-d H:i:s'))) {
                                            if ($status == '待付款') {
                                                echo '<div><a href="/account/order/' . $order['id'] . '/' . $id . ';">去付款</a></div>';
                                                echo '<div><a href="/account/order/cancel/' . $order['id'] . '" class="canle-order">取消订单</a></div>';
                                            } else {
                                                echo '<div><a href="/account/order/cancel/' . $order['id'] . '?type=paid" class="canle-order">取消订单</a></div>';
                                            }
                                        }
                                        if (in_array($status, array('已关闭', '已完成'))) {
                                            echo "<div>$status</div>";
                                        }

                                        if (in_array($status, array('已发货'))) {
                                            echo '<div><span class="label label-info">已发货</span><br><a href="/account/order/express?order_id=' . $order['id'] . '">查看物流</a></div>';
                                        }
                                        if (in_array($status, array('已收货', '已评价'))) {
                                            echo '<div><span class="label label-success">交易完成</span></div>';
                                        }
                                        ?>
                                    </td>
                                </tr>
                                <?php
                            }
                        }
                        ?>
                    </tbody>
                </table>
                <?php echo pageClass($count, 10, ''); ?>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="/resources/public/js/daterangepicker.js"></script>
<script type="text/javascript">
    $(function () {
        $('#search-order').click(function () {
            var activityName = $('#design-name').val();
            var orderId = $('#orderId').val();
            var date = $('#period').text().split('至');
            var src = window.location.href;
            location.href = '/account/order/<?php echo $id; ?>' + '?activityName=' + activityName + '&orderId=' + orderId + '&startDate=' + $.trim(date[0]) + '&endDate=' + $.trim(date[1]);
            return false;
        });
        $('.canle-order').click(function () {
            var $this = $(this);
            if (confirm('您确定要取消订单')) {
                $.ajax({
                    url: $this.attr('href'),
                    dataType: 'json',
                    success: function (msg) {
                        if (msg.status == 'OK') {
                            $this.parents('tr').fadeOut(300, function () {
                                $this.remove();
                            })
                        } else {
                            alert(msg.msg);
                        }
                    },
                });
            }
            return false;
        })
        $('#reservation').daterangepicker({
            ranges: {
                '今天': [moment(), moment()],
                '昨天': [moment().subtract('days', 1), moment().subtract('days', 1)],
                '最近7天': [moment().subtract('days', 6), moment()],
                '最近30天': [moment().subtract('days', 29), moment()],
                '本月': [moment().startOf('month'), moment().endOf('month')],
            },
            customRange: false,
            startDate: moment().subtract('days', 29),
            endDate: moment()
        },
        function (start, end) {
            $('#reservation span').html(start.format('YYYY-MM-D') + ' 至 ' + end.format('YYYY-MM-D'));
        }
        );
    });
</script>


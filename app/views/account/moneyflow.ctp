<div class="account-nav">
    <div class="container">
        <ul class="nav nav-tabs">
            <li><a href="/Account/">活动管理</a></li>
            <li><a href="/Account/design/clipart">我的素材</a></li>
            <li><a href="/Account/order/">我的订单</a></li>
            <li class="active"><a href="/Account/moneyflow/">收支明细</a></li>
            <li class="pull-right"><a href="/Account/setting/">个人设置</a></li>
        </ul>
    </div>
</div>
<div class="account-main account-moneyflow">
    <div class="container">
        <div class="row">
            <div class="col-sm-3 col-md-2 sidebar">
                <h4>收支明细</h4>
                <ul class="nav nav-pills nav-stacked">
                    <li class="active">
                        <a href="/Account/moneyflow/">收支明细</a>
                    </li>
                    <li>
                        <a href="/Account/moneyflow/withdrawal">申请提现</a>
                    </li>
                </ul>
            </div>
            <div class="col-sm-9 col-md-10 account-main-right">
                <form class="form-inline" role="form">
                    <div class="form-group">
                        <label class="sr-only" for="exampleInputEmail2">交易号</label>
                        <input type="email" class="form-control input-sm" id="order-no" placeholder="交易号" value="<?php @$_GET['order_no']; ?>">
                    </div>
                    <div class="form-group" id="reservation">
                        <label class="sr-only" for="exampleInputEmail2">订单时间</label>
                        <div class="form-control input-sm">
                            <i class="fa fa-calendar fa-lg"></i>
                            <span id="period"><?php echo $startTime; ?> 至 <?php echo $endTime; ?></span> <b class="caret"></b>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="sr-only" for="type">资金流向</label>
                        <select  class="form-control input-sm" id="type">
                            <option value="0" <?php echo (@$_GET['type'] == 0) ? 'selected' : '' ?> >全部</option>
                            <option value="1" <?php echo (@$_GET['type'] == 1) ? 'selected' : '' ?> >收入</option>
                            <option value="-1" <?php echo (@$_GET['type'] == -1) ? 'selected' : '' ?> >支出</option>
                        </select>
                    </div>
                    <div class="form-group form-search">
                        <!--<button class="btn btn-primary">搜索</button>-->
                        <input type="button" value="搜索" class="btn btn-primary" id="search">
                    </div>
                </form>
                <hr>
                <div class="table-responsive">
                    <table class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th style="width: 100px">交易号</th>
                                <th class="text-center">时间</th>
                                <th style="width: 340px">内容</th>
                                <th class="text-center">金额</th>
                                <th>渠道</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            $count = 0;
                            if (isset($moneyFlow['count'])) {
                                $count = $moneyFlow['count'];
                                unset($moneyFlow['count']);
                            }
                            if ($moneyFlow && is_array($moneyFlow)) {
                                foreach ($moneyFlow as $moneyInfo) {
                                    $moneyInfo = $moneyInfo['UserMoneyFlow'];
                                    ?>
                                    <tr>
                                        <td>
                                            <a href="/account/order/order.php" target="_blank"><?php echo $moneyInfo['serial_number']; ?></a>
                                        </td>
                                        <td class="text-center"><?php echo $moneyInfo['create_time']; ?></td>
                                        <td> <?php echo $moneyInfo['content']; ?></td>
                                        <td class="text-center">
                                            <span class="label <?php echo ($moneyInfo['type'] == 1) ? 'label-success' : 'label-danger' ?>">￥<?php echo $moneyInfo['money']; ?></span>
                                        </td>
                                        <td>
                                            <?php
                                            switch ($moneyInfo['pay_type']) {
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
                                            ?>
                                        </td>
                                    </tr>
                                    <?php
                                }
                            }
                            ?>
                        </tbody>
                    </table>
                </div>
                <?php echo pageClass($count, 5, ''); ?>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="/resources/public/js/daterangepicker.js"></script>
<script>
    $(function () {
        $('#search').click(function () {
            var order_no = $('#order-no').val();
            var type = $('#type').val();
            var date = $('#period').text().split('至');
            location.href = '/Account/moneyflow/<?php echo $type;?>?order_no=' + order_no + '&type=' + type + '&startDate=' + $.trim(date[0]) + '&endDate=' + $.trim(date[1]);
            return false;
        });
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
    })
</script>

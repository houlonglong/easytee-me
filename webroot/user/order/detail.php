<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Page title -->
    <title>订单详情 | 会员中心</title>
    <?php include(block("user/block/head"))?>
    <link rel="stylesheet" href="/static/styles/style.css">
</head>
<body>
<?php include(block("user/block/body_head"))?>
<?php include(block("user/block/menu"))?>

<!-- Main Wrapper -->
<div id="wrapper">
    <div class="normalheader transition animated fadeIn">
        <div class="hpanel">
            <div class="panel-body">
                <a class="small-header-action" href="/user/index">
                    <div class="clip-header">
                        <i class="fa fa-arrow-up"></i>
                    </div>
                </a>
                <div id="hbreadcrumb" class="pull-right m-t-lg">
                    <ol class="hbreadcrumb breadcrumb">
                        <li><a href="/user/index">会员中心</a></li>
                        <li class="active">
                            <span>订单详情</span>
                        </li>
                    </ol>
                </div>
                <h2 class="font-light m-b-xs">
                    订单详情
                </h2>
                <small></small>
            </div>
        </div>
    </div>
    <div class="content animate-panel">

        <div class="row">
            <div class="col-lg-12 animated-panel zoomIn" style="animation-delay: 0.1s;">
                <div class="hpanel">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-6 animated-panel zoomIn" style="animation-delay: 0.2s;">
                                <h4>订单号 <small><?=$order['order_no']?></small></h4>
                            </div>
                            <div class="col-md-6 animated-panel zoomIn" style="animation-delay: 0.2s;">
                                <div class="text-right">
                                    <button class="btn btn-default btn-sm"><i class="fa fa-pencil"></i> 修改 </button>
                                    <button class="btn btn-default btn-sm"><i class="fa fa-check "></i> 保存 </button>
                                    <button class="btn btn-primary btn-sm"><i class="fa fa-dollar"></i> 去支付</button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="panel-body p-xl">
                        <div class="row m-b-xl">
                            <div class="col-sm-6 animated-panel zoomIn" style="animation-delay: 0.3s;">
                                <h4></h4>
                                <p>
                                    <span><strong>订购时间:</strong> <?=$order['create_time']?></span><br>
                                    <span><strong>订单状态:</strong> <?=$order['status']?></span><br>
                                </p>
                            </div>
                            <div class="col-sm-6 text-right animated-panel zoomIn" style="animation-delay: 0.4s;">
                                <span>收货人:</span>
                                <address>
                                    <strong><?=$order['ship_name']?></strong><br>
                                    <?=$order['ship_province']?> - <?=$order['ship_city']?> - <?=$order['ship_area']?><br>
                                    <?=$order['ship_addr']?><br>
                                    <abbr title="Phone">电话:</abbr> <?=$order['ship_mobile']?>
                                </address>
                                <p style="display: none">
                                    <span><strong>发货时间:</strong> 2015-06-07</span><br>
                                </p>
                            </div>
                        </div>

                        <div class="table-responsive m-t">
                            <table class="table table-striped">
                                <thead>
                                <tr>
                                    <th>商品信息#</th>
                                    <th style="width: 50px;">尺码</th>
                                    <th>数量</th>
                                    <th>单价</th>
                                    <th>总价</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <img style="width: 50px;height:50px;" src="http://cdn.open.easytee.me//products/2/front.png">
                                        <strong>圆领男款(浅粉色)</strong>
                                    </td>
                                    <td>XL</td>
                                    <td>2</td>
                                    <td>21.1 元</td>
                                    <td>21.1 元</td>
                                </tr>


                                </tbody>
                            </table>
                        </div>
                        <div class="row m-t">
                            <div class="col-md-4 col-md-offset-8 animated-panel zoomIn" style="animation-delay: 0.4s;">
                                <table class="table table-striped text-right">
                                    <tbody>

                                    <tr>
                                        <td><strong>快递费 :</strong></td>
                                        <td><?=$order['express_price']?> 元</td>
                                    </tr>
                                    <tr>
                                        <td><strong>总计 :</strong></td>
                                        <td><?=$order['express_price']+$order['total_price'] ?> 元</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row" style="display: <?=empty($order['notes'])?'none':'block' ?>">
                            <div class="col-md-6 animated-panel zoomIn" style="animation-delay: 0.5s;">
                                <div class="m-t"><strong>备注</strong>
                                <p><?=$order['notes']?></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
    <!-- Footer-->
    <?php include(block("user/block/footer"))?>

</div>

<!-- Vendor scripts -->
<script src="/static/vendor/jquery/dist/jquery.min.js"></script>
<script src="/static/vendor/jquery-ui/jquery-ui.min.js"></script>
<script src="/static/vendor/slimScroll/jquery.slimscroll.min.js"></script>
<script src="/static/vendor/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="/static/vendor/jquery-flot/jquery.flot.js"></script>
<script src="/static/vendor/jquery-flot/jquery.flot.resize.js"></script>
<script src="/static/vendor/jquery-flot/jquery.flot.pie.js"></script>
<script src="/static/vendor/flot.curvedlines/curvedLines.js"></script>
<script src="/static/vendor/jquery.flot.spline/index.js"></script>
<script src="/static/vendor/metisMenu/dist/metisMenu.min.js"></script>
<script src="/static/vendor/iCheck/icheck.min.js"></script>
<script src="/static/vendor/peity/jquery.peity.min.js"></script>
<script src="/static/vendor/sparkline/index.js"></script>

<!-- App scripts -->
<script src="/static/scripts/homer.js"></script>
<script>
    $(function () {


    });
</script>
</body>
</html>
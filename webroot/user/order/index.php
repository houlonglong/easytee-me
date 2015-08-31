<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Page title -->
    <title>我的订单 | 会员中心</title>
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
                            <span>订单列表</span>
                        </li>
                    </ol>
                </div>
                <h2 class="font-light m-b-xs">
                    我的订单
                </h2>
                <small></small>
            </div>
        </div>
    </div>
    <div class="content animate-panel">


        <div class="row">
            <div class="col-lg-12 animated-panel zoomIn" style="animation-delay: 0.4s;">
                <div class="hpanel">
                    <ul class="nav nav-tabs">
                        <li class="active"><a data-toggle="tab" href="#tab-1" aria-expanded="true"> 全部</a></li>
                        <li class=""><a data-toggle="tab" href="#tab-2" aria-expanded="false">未付款</a></li>
                        <li class=""><a data-toggle="tab" href="#tab-2" aria-expanded="false">已付款</a></li>
                        <li class=""><a data-toggle="tab" href="#tab-2" aria-expanded="false">已发货</a></li>
                        <li class=""><a data-toggle="tab" href="#tab-2" aria-expanded="false">已退款</a></li>
                        <li class=""><a data-toggle="tab" href="#tab-2" aria-expanded="false">已关闭</a></li>
                        <li role="presentation" class="dropdown">
                            <a href="#" id="myTabDrop1" class="dropdown-toggle" data-toggle="dropdown" aria-controls="myTabDrop1-contents" aria-expanded="false">更多 <span class="caret"></span></a>
                            <ul class="dropdown-menu" aria-labelledby="myTabDrop1" id="myTabDrop1-contents">
                                <li class=""><a href="#dropdown1" role="tab" id="dropdown1-tab" data-toggle="tab" aria-controls="dropdown1" aria-expanded="false">已发货</a></li>
                                <li class=""><a href="#dropdown1" role="tab" id="dropdown1-tab" data-toggle="tab" aria-controls="dropdown1" aria-expanded="false">已退款</a></li>
                                <li class=""><a href="#dropdown2" role="tab" id="dropdown2-tab" data-toggle="tab" aria-controls="dropdown2" aria-expanded="false">已关闭</a></li>
                            </ul>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div id="tab-1" class="tab-pane active">
                            <div class="panel-body">
                                <div class="table-responsive project-list">
                                    <table class="table table-striped">
                                        <thead>
                                        <tr>
                                            <th>订单信息</th>
                                            <th>收货人</th>
                                            <th>订单金额</th>
                                            <th>购买时间</th>
                                            <th>操作</th>
                                        </tr>
                                        </thead>
                                        <tbody><?php foreach($rows as $row){ ?>
                                        <tr>
                                            <td>
                                                <img style="width: 50px;height:50px;" src="http://cdn.open.easytee.me//products/2/front.png">
                                                <b><?=$row['order_no']?>  </b>
                                            </td>
                                            <td>
                                                李四
                                            </td>
                                            <td><?=$row['goods_price']?></td>
                                            <td><?=$row['add_time']?></td>
                                            <td><a href="/user/order/detail?id=<?=$row['id']?>">查看</a></td>
                                        </tr>
                                        <?php } ?>

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <div class="panel-footer">
                                <?=$pager?>
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
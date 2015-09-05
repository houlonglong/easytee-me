<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Page title -->
    <title>我的活动 | 会员中心</title>
    <?php include(block("user/block/head"))?>
    <link rel="stylesheet" href="/static/styles/style.css">
</head>
<body>
<?php include(block("user/block/body_head"))?>
<?php include(block("user/block/menu"))?>
<!-- Main Wrapper -->
<div id="wrapper">
    <div class="content animate-panel">
        <div class="row">
            <div class="col-lg-12">
                <div class="hpanel">
                    <div class="panel-body">
                        <div class="row">

                            <div class="col-md-6 text-center">
                                <i class="pe-7s-cash  fa-2x"></i>

                                <h1 class="m-xs"><?=$money_all?> <small>元</small>  </h1>

                                <h3 class="font-extra-bold no-margins text-success">
                                    累计利润
                                </h3>
                                <small></small>

                            </div>
                            <div class="col-md-6 text-center">
                                <i class="pe-7s-credit fa-2x"></i>
                                <h1 class="m-xs"><?=$money?> <small>元</small></h1>

                                <h3 class="font-extra-bold no-margins text-success">
                                    账户余额
                                </h3>
                                <small></small>
                            </div>
                        </div>
                    </div>
                    <div class="panel-footer">

                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="hpanel">
                    <ul class="nav nav-tabs">
                        <li class="<?php if($status == '进行中') echo 'active';?>">
                            <a data-toggle="tab" onclick="location.href='/user/activity/index?status=进行中'" aria-expanded="true">进行中</a></li>
                        <li class="<?php if($status == '成功') echo 'active';?>">
                            <a data-toggle="tab" onclick="location.href='/user/activity/index?status=成功'" aria-expanded="false">成功</a></li>
                        <li class="<?php if($status == '已结束') echo 'active';?>">
                            <a data-toggle="tab" onclick="location.href='/user/activity/index?status=已结束'" aria-expanded="false">已结束</a></li>
                        <li class="<?php if($status == '全部') echo 'active';?>">
                            <a data-toggle="tab" onclick="location.href='/user/activity/index?status=全部'" aria-expanded="false">全部</a></li>
                        <li role="presentation" class="dropdown" style="display: none;">
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
                                <table class="table table-striped">
                                    <tbody>
                                    <?php
                                    foreach($rows as $row){
                                        $lastDate = ceil((strtotime($row['real_end_time']) - time()) / 86400); //60s*60min*24h
                                        if($lastDate < 0){
                                            $lastDate = 0;
                                        }
                                        ?>
                                        <tr data-id="<?=$row['id']?>">
                                            <td style="width: 70px;">
                                                <img style="width: 50px;height:50px;" src="http://cdn.open.easytee.me/products/2/front.png">
                                            </td>
                                            <td>
                                                <?php
                                                if ($row['status'] == 'create') {
                                                    echo '<a href="/design?DesignID=' . $row['design_id'] . '&ActivityID=' . $row['id'] . '" target="_blank">' . $row['name'] . '</a>';
                                                } else {
                                                    echo '<a href="/activity/' . $row['id'] . '" target="_blank">' . $row['name'] . '</a>';
                                                }
                                                ?>
                                            </td>
                                            <td>
                                                <span class="pie"><?=$row['sales_count']?>/<?=$row['sales_target']?></span>
                                            </td>
                                            <td>
                                                <?php
                                                if($lastDate == 0){
                                                    echo "已结束";
                                                }else{
                                                    echo empty($activity['real_end_time']) ? '-' : "剩余时间: ".$lastDate." 天";
                                                }
                                                ?>
                                            </td>
                                            <td style="width: 150px;" class="tooltip-action">
                                                <button type="button" class="btn btn-sm btn-default" data-toggle="tooltip" data-placement="top" title="" data-original-title="修改"><i class="fa fa-edit"></i></button>
                                                <button type="button" class="btn btn-sm btn-default" data-toggle="tooltip" data-placement="top" title="" data-original-title="提前结束"><i class="fa fa-stop"></i></button>
                                                <button type="button" class="btn btn-sm btn-default" data-toggle="tooltip" data-placement="top" title="" data-original-title="复制"><i class="fa fa-copy"></i></button>
                                            </td>
                                            <td style="width: 80px;" class="tooltip-action">
                                                <button style="outline: none" type="button" class="btn btn-sm btn-circle btn-warning" data-toggle="tooltip" data-placement="top" title="进行中"></button>
                                            </td>
                                        </tr>
                                    <?php } ?>
                                    </tbody>
                                </table>
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
        $('.tooltip-action').tooltip({
            selector: "[data-toggle=tooltip]"
        });

    });
</script>
</body>
</html>
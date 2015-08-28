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
                            <div class="col-md-4 text-center">
                                <i class="pe-7s-share fa-2x"></i>

                                <h1 class="m-xs">0 <small>件</small></h1>

                                <h3 class="font-extra-bold no-margins text-success">
                                    销量
                                </h3>
                                <small></small>
                            </div>
                            <div class="col-md-4 text-center">
                                <i class="pe-7s-cash  fa-2x"></i>

                                <h1 class="m-xs">0 <small>元</small>  </h1>

                                <h3 class="font-extra-bold no-margins text-success">
                                    利润
                                </h3>
                                <small></small>

                            </div>
                            <div class="col-md-4 text-center">
                                <i class="pe-7s-credit fa-2x"></i>
                                <h1 class="m-xs">0 <small>元</small></h1>

                                <h3 class="font-extra-bold no-margins text-success">
                                    可提现
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
                    <div class="panel-body list">
                        <div class="table-responsive project-list">

                            <table class="table table-striped">

                                <tbody>
                                <tr>
                                    <td style="width: 70px;">
                                        <img style="width: 50px;height:50px;" src="http://cdn.open.easytee.me/products/2/front.png">
                                    </td>
                                    <td>
                                        <strong>******</strong>
                                    </td>
                                    <td>
                                        <span class="pie">10/50</span>
                                    </td>
                                    <td>剩余时间:1 天</td>
                                    <td style="width: 150px;" class="tooltip-action">
                                        <button type="button" class="btn btn-sm btn-default" data-toggle="tooltip" data-placement="top" title="" data-original-title="修改"><i class="fa fa-edit"></i></button>
                                        <button type="button" class="btn btn-sm btn-default" data-toggle="tooltip" data-placement="top" title="" data-original-title="提前结束"><i class="fa fa-stop"></i></button>
                                        <button type="button" class="btn btn-sm btn-default" data-toggle="tooltip" data-placement="top" title="" data-original-title="复制"><i class="fa fa-copy"></i></button>

                                    </td>
                                    <td style="width: 80px;" class="tooltip-action">
                                        <button style="outline: none" type="button" class="btn btn-sm btn-circle btn-warning" data-toggle="tooltip" data-placement="top" title="进行中"></button>
                                    </td>
                                </tr>

                                </tbody>
                            </table>
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
        })

    });
</script>
</body>
</html>
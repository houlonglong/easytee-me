<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Page title -->
    <title>收货地址 | 会员中心</title>
    <?php include(block("user/block/head"))?>
    <link rel="stylesheet" href="/static/styles/style.css">
</head>
<body>
<?php include(block("user/block/body_head"))?>
<?php include(block("user/block/menu"))?>

<!-- Main Wrapper -->
<div id="wrapper">
    <div class="small-header transition animated fadeIn">
        <div class="hpanel">
            <div class="panel-body">
                <div id="hbreadcrumb" class="pull-right">
                    <ol class="hbreadcrumb breadcrumb">
                        <li><a href="/user/index">会员中心</a></li>
                        <li>
                            <span>管理中心</span>
                        </li>
                        <li class="active">
                            <span>收货地址</span>
                        </li>
                    </ol>
                </div>
                <h2 class="font-light m-b-xs">
                    收货地址
                </h2>
                <small></small>
            </div>
        </div>
    </div>

    <div class="content animate-panel">

        <div>
            <div class="row">
                <div class="col-lg-12 animated-panel zoomIn" style="animation-delay: 0.2s;">

                    <div class="hpanel">

                        <div class="panel-body">
                                <button class="btn btn-success"  data-toggle="modal" data-target="#model_address">新加</button>
                            </div>
                        </div>

                </div></div>
            <div class="row">
                <div class="col-lg-12 animated-panel zoomIn" style="animation-delay: 0.2s;">
                    <div class="hpanel">

                        <div class="panel-body">
                            <div class="table-responsive project-list">
                                <table class="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>地址</th>
                                        <th width="80px">收货人</th>
                                        <th width="160px">电话</th>
                                        <th width="80px">操作</th>
                                    </tr>
                                    </thead>
                                    <tbody><?php foreach($rows as $row){ ?>
                                    <tr>
                                        <td>
                                            <?=$row['address']?><br>
                                            <?=$row['province']?> - <?=$row['city']?> - <?=$row['county']?>
                                        </td>
                                        <td><?=$row['name']?></td>
                                        <td><?=$row['mobile']?></td>
                                        <td><a href="#" class="btn btn-primary btn-sm">修改</a></td>
                                    </tr><?php } ?>

                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
    <!-- Footer-->
    <?php include(block("user/block/footer"))?>

    <div class="modal fade" id="model_address" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="color-line"></div>
                <div class="modal-header text-center">
                    <h4 class="modal-title">收货地址</h4>
                </div>
                <div class="modal-body">

                    <form method="get" onsubmit="return false;" class="form-horizontal">
                        <div class="form-group"><label class="col-sm-2 control-label">收人人姓名</label>
                            <div class="col-sm-3"><input type="text" class="form-control"></div>
                        </div>
                        <div class="hr-line-dashed"></div>
                        <div class="form-group"><label class="col-sm-2 control-label">电话</label>
                            <div class="col-sm-4"><input type="text" class="form-control"></div>
                        </div>
                        <div class="hr-line-dashed"></div>
                        <div class="form-group"><label class="col-sm-2 control-label">省</label>
                            <div class="col-sm-3"><input type="text" class="form-control"></div>
                        </div>
                        <div class="hr-line-dashed"></div>
                        <div class="form-group"><label class="col-sm-2 control-label">市</label>
                            <div class="col-sm-3"><input type="text" class="form-control"></div>
                        </div>
                        <div class="hr-line-dashed"></div>
                        <div class="form-group"><label class="col-sm-2 control-label">区</label>
                            <div class="col-sm-3"><input type="text" class="form-control"></div>
                        </div>
                        <div class="hr-line-dashed"></div>
                        <div class="hr-line-dashed"></div>
                        <div class="form-group"><label class="col-sm-2 control-label">地址</label>
                            <div class="col-sm-10"><input type="text" class="form-control"></div>
                        </div>
                        <div class="hr-line-dashed"></div>

                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary">保存</button>
                </div>
            </div>
        </div>
    </div>

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
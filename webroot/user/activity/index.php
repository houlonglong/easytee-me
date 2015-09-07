<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Page title -->
    <title>我的活动 | 会员中心</title>
    <?php include(block("user/block/head")) ?>
    <link rel="stylesheet" href="/static/styles/style.css">
</head>
<body>
<?php include(block("user/block/body_head")) ?>
<?php include(block("user/block/menu")) ?>
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

                                <h1 class="m-xs"><?= $money_all ?>
                                    <small>元</small>
                                </h1>

                                <h3 class="font-extra-bold no-margins text-success">
                                    累计利润
                                </h3>
                                <small></small>

                            </div>
                            <div class="col-md-6 text-center">
                                <i class="pe-7s-credit fa-2x"></i>

                                <h1 class="m-xs"><?= $money ?>
                                    <small>元</small>
                                </h1>

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
                        <li class="<?php if ($status == '进行中') echo 'active'; ?>">
                            <a data-toggle="tab" onclick="location.href='/user/activity/index?status=进行中'"
                               aria-expanded="true">进行中</a></li>
                        <li class="<?php if ($status == '成功') echo 'active'; ?>">
                            <a data-toggle="tab" onclick="location.href='/user/activity/index?status=成功'"
                               aria-expanded="false">成功</a></li>
                        <li class="<?php if ($status == '已结束') echo 'active'; ?>">
                            <a data-toggle="tab" onclick="location.href='/user/activity/index?status=已结束'"
                               aria-expanded="false">已结束</a></li>
                        <li class="<?php if ($status == '全部') echo 'active'; ?>">
                            <a data-toggle="tab" onclick="location.href='/user/activity/index?status=全部'"
                               aria-expanded="false">全部</a></li>
                        <li role="presentation" class="dropdown" style="display: none;">
                            <a href="#" id="myTabDrop1" class="dropdown-toggle" data-toggle="dropdown"
                               aria-controls="myTabDrop1-contents" aria-expanded="false">更多 <span class="caret"></span></a>
                            <ul class="dropdown-menu" aria-labelledby="myTabDrop1" id="myTabDrop1-contents">
                                <li class=""><a href="#dropdown1" role="tab" id="dropdown1-tab" data-toggle="tab"
                                                aria-controls="dropdown1" aria-expanded="false">已发货</a></li>
                                <li class=""><a href="#dropdown1" role="tab" id="dropdown1-tab" data-toggle="tab"
                                                aria-controls="dropdown1" aria-expanded="false">已退款</a></li>
                                <li class=""><a href="#dropdown2" role="tab" id="dropdown2-tab" data-toggle="tab"
                                                aria-controls="dropdown2" aria-expanded="false">已关闭</a></li>
                            </ul>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div id="tab-1" class="tab-pane active">
                            <div class="panel-body">
                                <table class="table table-striped">
                                    <tbody>
                                    <?php
                                    foreach ($rows as $row) {
                                        $lastDate = ceil((strtotime($row['real_end_time']) - time()) / 86400); //60s*60min*24h
                                        if ($lastDate < 0) {
                                            $lastDate = 0;
                                        }
                                        ?>
                                        <tr data-id="<?= $row['id'] ?>">

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
                                                <span class="pie"><?= $row['sales_count'] ?>
                                                    /<?= $row['sales_target'] ?></span>
                                            </td>
                                            <td>
                                                <?php
                                                if ($lastDate == 0) {
                                                    echo "已结束";
                                                } else {
                                                    echo empty($row['real_end_time']) ? '-' : "剩余时间: " . $lastDate . " 天";
                                                }
                                                ?>
                                            </td>
                                            <td style="width: 150px;" class="tooltip-action">
                                                <button type="button" class="btn btn-sm btn-default hide"
                                                        data-id="<?php echo $row['id']; ?>" data-toggle="tooltip"
                                                        data-placement="top" title="" data-original-title="修改"><i
                                                        class="fa fa-edit"></i></button>
                                                <button type="button" class="btn btn-sm btn-default close-activity hide"
                                                        data-id="<?php echo $row['id']; ?>" data-toggle="modal"
                                                        data-target=".bs-example-modal-sm" data-placement="top" title=""
                                                        data-original-title="提前结束"><i class="fa fa-stop"></i></button>
                                                <button type="button" class="btn btn-sm btn-default hide"
                                                        data-id="<?php echo $row['id']; ?>" data-toggle="tooltip"
                                                        data-placement="top" title="" data-original-title="复制"><i
                                                        class="fa fa-copy"></i></button>
                                            </td>
                                            <td style="width: 80px;" class="tooltip-action">
                                                <button style="outline: none" type="button"
                                                        class="hide btn btn-sm btn-circle btn-warning" data-toggle="tooltip"
                                                        data-placement="top" title="进行中"></button>
                                            </td>
                                        </tr>
                                    <?php } ?>
                                    </tbody>
                                </table>
                            </div>
                            <div class="panel-footer">
                                <?= $pager ?>
                            </div>
                        </div>

                    </div>


                </div>

            </div>
        </div>
    </div>
    <!-- Footer-->

    <div class="modal fade bs-example-modal-sm" id="modal_test" aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <button type="button" class="bootbox-close-button close" data-dismiss="modal" aria-hidden="true"
                        style="margin-top: 5px;margin-right: 10px;">×
                </button>
                <div class="modal-header">
                    <h4>提前结束</h4>
                </div>
                <div class="modal-body">
                </div>
                <div id="apply_back" class="tab-pane">
                </div>
            </div>
        </div>
    </div>

    <?php include(block("user/block/footer")) ?>

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
    function real_close_activity(obj){
         obj = $(obj);
        alert(obj.attr('data-id'));
    }
    $(function () {
        $('.tooltip-action').tooltip({
            selector: "[data-toggle=tooltip]"
        });
        // edit activity
        $('.fa-edit').click(function () {
            location.href = '/user/activity/detail?id=' + $(this).parent().attr('data-id');
        })

        // close activity
        var msg = {
            "msg1": "<p>确定结束该活动吗？</p>",
            "msg2": "<ol><li>该活动还没有达到最小起订量(10件)</li><li>现在结束，所有款项将会退回给买家</li></ol><p>确定结束该活动吗？</p>",


            "msg3": '<ol><li>该活动没有达到众筹目标(50件);</li><li>如按照当前的数量生产，加工总成本为：<span class="label label-warning">￥{{price}}</span></li><li>按照当前成本生产，您的利润为：<span class="label label-success">￥{{profie}}</span></li></ol>',
            "msg4": "<ol><li>活动结束后，买家将不能再继续购买;</li><li>活动结束后，我们会马上安排生产;</li><li>买家会在活动结束后的20个工作日之内收到商品;</li></ol><p>确定要提前结束该活动吗？</p>",
        };
        $('.close-activity').click(function () {
            var aid = $(this).attr('data-id');
            $.ajax({
                url: "/api?model=user/activity&action=close_activity",
                data: {
                    name: $("input[name='activity_name']").val(),
                    description: $("#description").val(),
                    id: aid
                },
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    var common_button =  "<button type='button' class='btn btn-sm btn-success btn btn-sm apply-back' >"+
                            "取消<i class='ace-icon fa fa-arrow-right icon-on-right bigger-110'></i></button>"+
                            "<button type='button' class='btn btn-sm btn-success btn btn-sm apply-back real_close_activity' onclick='real_close_activity(this)' data-id='"+aid+"'>"+
                            "结束<i class='ace-icon fa fa-arrow-right icon-on-right bigger-110'></i></button>";
                    var message = msg[data.return.msg]+common_button;

                    if (data.return.msg == 'msg3') {
                        message = msg['msg1']+"<button type='button' class='btn btn-sm btn-success btn btn-sm apply-back' >"+
                            "取消<i class='ace-icon fa fa-arrow-right icon-on-right bigger-110'></i></button>"+
                            "<button type='button' class='btn btn-sm btn-success btn btn-sm apply-back' data-id='"+aid+"'>"+
                            "结束<i class='ace-icon fa fa-arrow-right icon-on-right bigger-110'></i></button>";
                    }
                    $('.bs-example-modal-sm').find('.modal-body').html(message);
                    $('.bs-example-modal-sm').modal('show');
                }
            })
//            var str=null;
//            var status = $(this).attr('status');
//            var profie = $(this).attr('profie');
//            var eachprice = $(this).attr('each-price');
//            var cancel = {show: true, className: 'btn-danger', callback: null};
//            var ok = {show: true, callback: function () {
//                closeActivity(aid);
//            }, className: 'btn-success'};
//            str = msg[status];
//            if (status == "msg3") {
//                str = msg[status].replace('{{price}}', eachprice).replace('{{profie}}', profie);
//                cancel.text = '结束并退款';
//                cancel.callback = function () {
//                    closeActivity(aid, 'end');
//                }
//                ok.callback = function () {
//                    closeActivity(aid, 'product');
//                }
//                ok.text = '结束活动 并 开始生产';
//            }
//            if (status == 'msg4') {
//                ok.callback = function () {
//                    closeActivity(aid, 'product');
//                }
//
//            }
//            popup('操作提示', str, {cancel: cancel, ok: ok}, {newmodal: false});
            return false;
        })

    });
</script>
</body>
</html>
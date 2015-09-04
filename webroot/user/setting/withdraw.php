<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Page title -->
    <title>提现申请 | 会员中心</title>
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
                            <span>收款帐号</span>
                        </li>
                    </ol>
                </div>
                <h2 class="font-light m-b-xs">
                    收款帐号
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
                            <style>
                                .text_height{
                                    line-height: 24px;
                                    height: 24px;
                                    margin-top: 4px;
                                    display: inline-block;
                                }
                            </style>
                            <form method="get" onsubmit="return false;" class="form-horizontal">

                                <div class="hr-line-dashed"></div>
                                <div class="form-group"><label class="col-sm-2 control-label">帐户余额</label>
                                    <div class="col-sm-5"><div class="text_height"><?=$balance_tx?></div> 元</div>
                                </div>
                                <div class="form-group"><label class="col-sm-2 control-label">提现帐户类型</label>
                                    <?php
                                    $pay_types = array(
                                        "wechat"=>"微信支付",
                                        "alipay"=>"支付宝"
                                    );

                                    ?>
                                    <div class="col-sm-5"><div class="text_height"><?=$pay_types[$pay_type]?></div></div>
                                </div>
                                <div class="form-group"><label class="col-sm-2 control-label">提现帐户</label>
                                    <div class="col-sm-5"><div class="text_height"><?=$pay_account?></div></div>
                                </div>
                                <div class="hr-line-dashed"></div>
                                <div class="form-group"><label class="col-sm-2 control-label">提现金额</label>
                                    <div class="col-sm-3"><input type="number" id="amount" class="form-control"></div>
                                </div>
                                <div class="hr-line-dashed"></div>
                                <div class="form-group">
                                    <div class="col-sm-8 col-sm-offset-2">
                                        <button class="btn btn-primary" type="button" onclick="do_withdraw(this)">提现</button>
                                    </div>
                                </div>
                            </form>

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
    function do_withdraw(obj){
        var amount = $("#amount").val();
        if(!amount)
            return alert("提现金额不能为空");
        $(obj).attr("disabled",true);
        $.post("/api",{
            model:"user/setting",
            action:"do_withdraw",
            amount:amount
        },function(data){
            if(data.status == 0){
                alert("提交成功");
                location.href = "/user/setting/withdraw_record";
            }else{
                alert(data.message);
                $(obj).removeAttr("disabled");
            }
        },"json");
    }
    $(function () {


    });
</script>
</body>
</html>
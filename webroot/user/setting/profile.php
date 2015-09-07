<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Page title -->
    <title>资料修改 | 会员中心</title>
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
                            <span>资料修改</span>
                        </li>
                    </ol>
                </div>
                <h2 class="font-light m-b-xs">
                    资料修改
                </h2>
                <small></small>
            </div>
        </div>
    </div>

    <div class="content animate-panel">

        <div>

            <div class="row">
                <div class="col-lg-8 animated-panel zoomIn" style="animation-delay: 0.2s;">
                    <div class="hpanel">

                        <div class="panel-body">
                            <form method="get" onsubmit="return false;" class="form-horizontal">
                                <div class="form-group"><label class="col-sm-2 control-label">昵称</label>
                                    <div class="col-sm-10"><input type="text" id="nick_name" class="form-control" value="<?=empty($nick_name) ? "" : $nick_name;?>"></div>
                                </div>
                                <div class="hr-line-dashed"></div>
                                <div class="form-group"><label class="col-sm-2 control-label">手机号</label>
                                    <div class="col-sm-10"><input type="text" id="mobile" class="form-control" value="<?=empty($mobile)? "" : $mobile;?>"></div>
                                </div>
                                <div class="hr-line-dashed"></div>
                                <div class="form-group">
                                    <div class="col-sm-8 col-sm-offset-2">
                                        <button class="btn btn-primary" type="button" onclick="change_profile()">修改</button>
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
    function change_profile(){
        var nick_name = $("#nick_name").val();
        if(!nick_name) return alert("呢称不能为空");
        var mobile = $("#mobile").val();
        if(!mobile) return alert("手机号不能为空");

        $.post("/api",{
            model:"user/setting",
            action:"profile_save",
            nick_name:nick_name,
            mobile:mobile
        },function(data){
            if(data.status == 0){
                alert("修改成功");
                location.reload();
            }else{
                alert(data.message);
            }
        },"json");
    }
    $(function () {


    });
</script>
</body>
</html>
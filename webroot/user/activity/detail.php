<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Page title -->
    <title>活动详情 | 会员中心</title>
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
                        <li><a href="/user/index">我的活动</a></li>
                        <li class="active">
                            <span>活动详情</span>
                        </li>
                    </ol>
                </div>
                <h2 class="font-light m-b-xs">
                    活动详情
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
                        <form method="get" onsubmit="return false;" class="form-horizontal">

                            <div class="form-group"><label class="col-sm-2 control-label">名称</label>
                                <div class="col-sm-8"><input type="text" class="form-control" name="activity_name" value="<?php echo @$detail['name'];?>"></div>
                            </div>

                            <div class="hr-line-dashed"></div>
                            <div class="form-group"><label class="col-sm-2 control-label">介绍</label>
                                <div class="col-sm-8">
                                        <textarea  cols="30" rows="10" class="form-control" id="description" ><?php echo @$detail['description'];?></textarea>
                                </div>
                            </div>
                            <div class="hr-line-dashed"></div>
                            <div class="form-group">
                                <div class="col-sm-8 col-sm-offset-2">
                                    <button class="btn btn-primary edit-activity" type="button">保存</button>
                                </div>
                            </div>
                        </form>
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
     $('.edit-activity').click(function(){
         var id = <?php echo empty($_REQUEST['id'])?0:$_REQUEST['id'];?>;
         $.ajax({
             url:"/api?model=user/activity&action=edit",
             data:{
                 name:$("input[name='activity_name']").val(),
                 description:$("#description").val(),
                 id:id
             },
             type:'POST',
             success: function (status) {
                 if(status == 0){
                     alert("保存失败");
                 }
             }
         })
     })

    });
</script>
</body>
</html>
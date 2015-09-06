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
                                        <th width="120px">操作</th>
                                    </tr>
                                    </thead>
                                    <tbody><?php foreach($rows as $row){ ?>
                                    <tr data-id="<?=$row['id']?>">
                                        <td>
                                            <?=$row['address']?><br>
                                            <?=$row['province']?> - <?=$row['city']?> - <?=$row['county']?>
                                        </td>
                                        <td><?=$row['name']?></td>
                                        <td><?=$row['mobile']?></td>
                                        <td>
                                            <button onclick="change_address(this)" class="hide btn btn-primary btn-sm">修改</button>
                                            <button onclick="delete_address(this)" class="btn btn-danger btn-sm">删除</button>
                                        </td>
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
    <script src="/resources/public/js/region_select.js"></script>

    <div class="modal fade" id="model_address" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="color-line"></div>
                <div class="modal-header text-center">
                    <h4 class="modal-title">收货地址</h4>
                </div>
                <div class="modal-body">

                    <form method="get" onsubmit="return false;" class="form-horizontal">

                            <div class="row">
                                <div class="col-xs-5" style="margin-right: 10px;">
                                    <div class="form-group">
                                        <label class="control-label">姓名：</label>
                                        <input class="form-control" placeholder="请输入收货人姓名" value="" name="name" id="name">
                                    </div>
                                </div>
                                <div class="col-xs-5">
                                    <div class="form-group">
                                        <label class="control-label">手机：</label>
                                        <input class="form-control" type="tel" placeholder="请输入收货人手机" value="" id="tel">
                                    </div>
                                </div>
                            </div>


                            <div class="form-group">
                                <label class="control-label">区域：</label>

                                <div class="row">
                                    <div class="col-xs-4">
                                        <select class="form-control" name="province" id="province">
                                        </select>
                                    </div>
                                    <div class="col-xs-4">
                                        <select class="form-control" name="city" id="city">
                                        </select>
                                    </div>
                                    <div class="col-xs-4">
                                        <select class="form-control" name="county" id="county"></select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label">详细地址：</label>
                                <input class="form-control" placeholder="请输入详细地址" value="" id="address" name="address">
                            </div>
                        </form>
                </div>
                <div class="modal-footer">
                    <input type="hidden" id="addr_id" value="">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" onclick="save_address()">保存</button>
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
    function change_address(obj){
        var id = $(obj).parents("tr").data("id");
        $.get("/api?model=user/setting&action=address_detail&id="+id,function(data){
            var address = data.return;
            $("#addr_id").val(address['id']);
            $("#name").val(address['name']);
            $("#tel").val(address['mobile']);
            $("#address").val(address['address']);
            console.log(address)
            new PCAS('province', 'city', 'county', address['province'], address['city'], address['county']);
            $("#model_address").modal("show");
        },"json");
    }
    function delete_address(obj){
        var id = $(obj).parents("tr").data("id");
        if(!confirm("确定要删除么?")) return;
        $.post("/api",{
            model:"user/setting",
            action:"address_delete",
            id:id
        },function(){
            location.reload();
        });
    }
    function save_address(){
        var name = $("#name").val();
        var tel = $("#tel").val();
        var province = $("#province").val();
        var city = $("#city").val();
        var county = $("#county").val();
        var address = $("#address").val();
        var id = $("#addr_id").val();
        $.post("/api",{
            model:"user/setting",
            action:"save_address",
            name:name,
            id:id,
            tel:tel,
            province:province,
            city:city,
            county:county,
            address:address
        },function(data){
            if(data.status == 0){
                alert("保存成功");
                location.reload();
            }else{
                alert(data.message);
            }
        },"json");

    }
    $(function () {
        new PCAS('province', 'city', 'county', '', '', '');
    });
</script>
</body>
</html>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <?php
    /**
     * 产品详情
     *
     */
    include(block("admin/block/html_head"))?>
    <!-- ace styles -->
    <link rel="stylesheet" href="/ace/assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
    <link rel="stylesheet" href="/admin/assets/css/style.css" class="ace-main-stylesheet" />
    <style>
        .canvas{
            border:1px solid grey;
            height: 502px;
            width: 502px;
            position: absolute;
        }
        .tab-pane {
            position: relative;
        }
        .region{
            position: absolute;
            top:10px;
            right:10px;
            width: 100px;;
        }
        .tabs-below .tab-content{
            height: 530px;
        }
        .design_area{
            border:1px solid yellow;
        }
    </style>
</head>
<body class="no-skin">
<?php include(block("admin/block/navbar"))?>
<div class="main-container" id="main-container">
    <script type="text/javascript">try{ace.settings.check('main-container' , 'fixed')}catch(e){}</script>
    <?php include(block("admin/block/sidebar"))?>
    <div class="main-content">
        <div class="main-content-inner">
            <?php include(block("admin/block/breadcrumbs"))?>
            <div class="page-content">
                <?php include(block("admin/block/ace-settings-container"))?>
                <div class="page-header">
                    <h1 style="position: relative">
                        产品详情
                        <small>
                            <i class="ace-icon fa fa-angle-double-right"></i>

                        </small>
                        <button style="position: absolute;top:0px;right:0px;" onclick="history.go(-1)" class="btn btn-white btn-info btn-bold no-border">
                            <i class="ace-icon fa fa-hand-o-left blue"></i>
                        </button>
                    </h1>
                </div><!-- /.page-header -->
                <div class="row">
                    <div class="col-xs-12">
                        <!-- PAGE CONTENT BEGINS -->

                        <div class="row">
                            <div class="col-xs-12">

                                <div class="tabbable">
                                    <ul class="nav nav-tabs padding-12 tab-color-blue background-blue" id="myTab4">
                                        <li class="active">
                                            <a data-toggle="tab" href="#base" aria-expanded="true">基本信息</a>
                                        </li>

                                        <li class="">
                                            <a data-toggle="tab" href="#des" aria-expanded="false">描述</a>
                                        </li>

                                        <li>
                                            <a data-toggle="tab" href="#dropdown14">More</a>
                                        </li>
                                    </ul>

                                    <div class="tab-content">
                                        <div id="base" class="tab-pane active">
                                            <p>
                                                <?php echo $product['name'];?>
                                            <hr>
                                            </p>
                                            <div class="row">
                                                <div class="col-xs-3">
                                                    <table id="style_list" class="table table-striped table-bordered table-hover"><?php foreach($styles as $style){?>
                                                        <tr onclick="select_style(<?php echo $style['id'];?>,'<?php echo $style['color'];?>')">
                                                            <td style="width: 40px;">
                                                                <div style="background-color: #<?=$style['color']?>;display:inline-block;border:1px solid grey;border-radius:2px;height:20px;width:20px;"></div>
                                                            </td>
                                                            <td style="width: 60px;">
                                                                <?=$style['color_name']?>
                                                            </td>
                                                            <td ><?=$style['purchase_price']?> / <?=$style['selling_price']?>
                                                            </td>
                                                        </tr><?php } ?>
                                                    </table>
                                                </div>
                                                <div class="col-xs-9">
                                                    <div id="style_detail" style="display: none">

                                                        <div class="row">
                                                            <div class="col-sm-12" id="size_div">

                                                            </div>
                                                        </div>
                                                        <hr>
                                                        <div class="row">
                                                            <div class="col-sm-12">
                                                                <div class="tabbable tabs-below">
                                                                    <div class="tab-content">
                                                                        <div id="front" class="tab-pane active">
                                                                            <div class="canvas"></div>
                                                                            <div class="region">
                                                                                <p>
                                                                                    x: <input type="text" class="x" style="width: 50px;">
                                                                                </p>
                                                                                <p>
                                                                                    y: <input type="text" class="y" style="width: 50px;">
                                                                                </p>
                                                                                <p>
                                                                                    w: <input type="text" class="w" style="width: 50px;">
                                                                                </p>
                                                                                <p>
                                                                                    h: <input type="text" class="h" style="width: 50px;">
                                                                                </p>

                                                                            </div>
                                                                        </div>
                                                                        <div id="back" class="tab-pane">
                                                                            <div class="canvas"></div>
                                                                            <div class="region">
                                                                                <p>
                                                                                    x: <input type="text" class="x" style="width: 50px;">
                                                                                </p>
                                                                                <p>
                                                                                    y: <input type="text" class="y" style="width: 50px;">
                                                                                </p>
                                                                                <p>
                                                                                    w: <input type="text" class="w" style="width: 50px;">
                                                                                </p>
                                                                                <p>
                                                                                    h: <input type="text" class="h" style="width: 50px;">
                                                                                </p>

                                                                            </div>

                                                                        </div>
                                                                        <div id="third" class="tab-pane">
                                                                            <div class="canvas"></div>
                                                                            <div class="region">
                                                                                <p>
                                                                                    x: <input type="text" class="x" style="width: 50px;">
                                                                                </p>
                                                                                <p>
                                                                                    y: <input type="text" class="y" style="width: 50px;">
                                                                                </p>
                                                                                <p>
                                                                                    w: <input type="text" class="w" style="width: 50px;">
                                                                                </p>
                                                                                <p>
                                                                                    h: <input type="text" class="h" style="width: 50px;">
                                                                                </p>

                                                                            </div>
                                                                        </div>
                                                                        <div id="fourth" class="tab-pane">
                                                                            <div class="canvas"></div>
                                                                            <div class="region">
                                                                                <p>
                                                                                    x: <input type="text" class="x" style="width: 50px;">
                                                                                </p>
                                                                                <p>
                                                                                    y: <input type="text" class="y" style="width: 50px;">
                                                                                </p>
                                                                                <p>
                                                                                    w: <input type="text" class="w" style="width: 50px;">
                                                                                </p>
                                                                                <p>
                                                                                    h: <input type="text" class="h" style="width: 50px;">
                                                                                </p>

                                                                            </div>

                                                                        </div>
                                                                    </div>

                                                                    <ul class="nav nav-tabs">
                                                                        <li class="active">
                                                                            <a data-toggle="tab" href="#front" aria-expanded="false">前</a>
                                                                        </li>
                                                                        <li class="">
                                                                            <a data-toggle="tab" href="#back" aria-expanded="false">后</a>
                                                                        </li>
                                                                        <li class="">
                                                                            <a data-toggle="tab" href="#third" aria-expanded="false">左</a>
                                                                        </li>
                                                                        <li class="">
                                                                            <a data-toggle="tab" href="#fourth" aria-expanded="false">右</a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div id="des" class="tab-pane">
                                            <p class="muted">
                                                <?php #echo replace_cdn($product['long_description']);?>
                                            </p>
                                        </div>

                                        <div id="dropdown14" class="tab-pane">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div><!-- /.page-content -->
        </div>
    </div><!-- /.main-content -->
    <?php include(block("admin/block/footer"))?>
</div><!-- /.main-container -->
<?php include(block("admin/block/scripts"))?>

<!-- page specific plugin scripts -->
<script src="/ace/assets/js/bootstrap-datepicker.min.js"></script>
<script src="/ace/assets/js/jquery.jqGrid.min.js"></script>
<script src="/ace/assets/js/grid.locale-en.js"></script>
<script class="reload" src="main.js"></script>

<script type="text/javascript">
    $(function(){
        $("#style_list").find("tr").eq(0).click();
    });
    function set_region(side,x,y,w,h){
        var $canvas = $("#"+side).find(".canvas");
        $canvas.append('<div class="design_area" style="position: absolute;top:'+y/2+'px;left:'+x/2+'px;width: '+w/2+'px;height:'+h/2+'px"></div>');
    }
    function select_style($style_id,$color){
        $.post("/api",{
            model:"admin/product/product",
            action:"style_detail",
            style_id:$style_id
        },function(data){
            $("#style_detail").fadeIn(300);
            //console.log(data.return);
            var sizes = data.return.sizes;
            var images = data.return.images;
            $("#size_div").html("");
            for(var i in sizes){
                var size = sizes[i];
                $("#size_div").append('<span style="margin-right: 10px;" class="label label-xlg label-light arrowed-in-right">'+size.size+' : '+size.inventory+'</span>');
            }
            for(var i in images){
                var image = images[i];
                //console.log(image);
                //console.log($("#"+image.side+" .canvas"));
                $("#"+image.side+" .canvas").html('<img style="background-color:#'+$color+';width:500px;height:500px;" src="'+image.imgurl+'">');
                $("#"+image.side).find(".x").val(image.x);
                $("#"+image.side).find(".y").val(image.y);
                $("#"+image.side).find(".w").val(image.w);
                $("#"+image.side).find(".h").val(image.h);

                set_region(image.side,image.x,image.y,image.w,image.h);
            }
        });
    }
</script>
</body>
</html>
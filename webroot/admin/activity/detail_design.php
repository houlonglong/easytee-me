<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <?php
    /**
     * 活动详情
     *
     */

    include(block("admin/block/html_head"));
    $row = Model_Admin_Activity::activity_detail($_REQUEST['id']);
    ?>

    <!-- page specific plugin styles -->
    <link rel="stylesheet" href="/ace/assets/css/jquery-ui.min.css"/>
    <link rel="stylesheet" href="/ace/assets/css/bootstrap-datetimepicker.min.css"/>
    <link rel="stylesheet" href="/ace/assets/css/ui.jqgrid.min.css"/>

    <!-- ace styles -->
    <link rel="stylesheet" href="/ace/assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style"/>
    <link rel="stylesheet" href="/admin/assets/css/style.css" class="ace-main-stylesheet"/>

    <script src="/js/libs/snap.svg/snap.svg.js"></script>
    <script>
        var svgs = <?php echo json_encode($svgs)?>;
        function gen_svg($id,$side,$color,$url,region){
            $t = region.split(",");
            console.log($id,$color,$url,$side,region  );
            var s = Snap("#product_"+$side+"_"+$id);
            var r = s.paper.rect( 0, 0, 500, 500);
            r.paper.attr("fill","#"+$color);
            var c = s.paper.image($url, 0, 0, 500, 500);
            var c1 = s.paper.image(svgs[$side], $t[0]/2,$t[1]/2,$t[2]/2,$t[3]/2);
            //s.paper.attr("style", "background-color:#"+$color);
            //var svg_url = svgs[$side];
            /**
             * Snap.load(svg_url, function (f) {
                s.append(f);
                s.select("svg").attr("x",$t[0]/2)
                s.select("svg").attr("y",$t[1]/2)
                s.select("svg").attr("width",$t[2]/2)
                s.select("svg").attr("height",$t[3]/2)
            });
             */
        }
    </script>
</head>
<body class="no-skin">
<?php include(block("admin/block/navbar")) ?>
<div class="main-container" id="main-container">
    <script type="text/javascript">try {
            ace.settings.check('main-container', 'fixed')
        } catch (e) {
        }</script>
    <?php include(block("admin/block/sidebar")) ?>
    <div class="main-content">
        <div class="main-content-inner">
            <?php include(block("admin/block/breadcrumbs")) ?>
            <div class="page-content">
                <?php include(block("admin/block/ace-settings-container")) ?>
                <div class="row">
                    <div class="col-xs-12">
                        <!-- PAGE CONTENT BEGINS -->
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="tabbable">
                                    <ul class="nav nav-tabs padding-12 tab-color-blue background-blue" id="myTab4">
                                        <li class="active">
                                            <a data-toggle="tab" href="#design_product">Design Products</a>
                                        </li>
                                        <li class="">
                                            <a data-toggle="tab" href="#design_svg">Design Svg</a>
                                        </li>

                                    </ul>

                                    <div class="tab-content">
                                        <div id="design_product" class="tab-pane in active">
                                            <div style="display: none;">
                                                <canvas id="canvas" width="500px" height="500px"></canvas>
                                            </div>
                                            <table class="table table-striped table-bordered table-hover">

                                           <?php
                                           foreach($act_product_styles as $products){
                                                foreach($products as $product){?>
                                                    <tr>

                                                        <td><?php echo "<div class='product_svg'><svg width='500' height='500' id='product_".$product['side']."_".$product['product_style_id']."'></svg></div><script>gen_svg(".$product['product_style_id'].",'".$product['side']."','".$product['color']."','".$product['imgurl']."','".$product['region']."','".$product['y']."','".$product['w']."','".$product['h']."')</script><hr>";?></td>
                                                        <td class="product_img"></td>
                                                        <td><button class="btn btn-primary btn-xs" onclick="gen_product_svg(this)">生成</button></td>

                                                    </tr>

                                                <?php }
                                           }
                                           ?></table>
                                        </div>
                                        <div id="design_svg" class="tab-pane ">
                                            <hr>
                                            <table class="table table-striped table-bordered table-hover">
                                                <tr>
                                                    <th>方位</th>
                                                    <th>SVG</th>
                                                    <th>IMG</th>
                                                    <th>create_time</th>
                                                    <th>up_time</th>
                                                    <th>try_time</th>
                                                    <th>err_msg</th>
                                                    <th>操作</th>
                                                </tr>
                                                <?php
                                                //print_pre($design_svgs);
                                                foreach($design_svgs as $design_svg){ ?>
                                                <tr data-side="<?=$design_svg['side']?>" data-id="<?=$design_svg['design_id']?>">
                                                    <td>
                                                        <?=$design_svg['side']?>
                                                    </td>
                                                    <td>
                                                        <img class="svg_url" src="<?= $design_svg['svg_url'] ?>" alt="">
                                                    </td>
                                                    <td class="img_url"><?php if($design_svg['img_url']){ ?>
                                                            <img src="<?= $design_svg['img_url'] ?>" alt="">
                                                        <?php }else{?>
                                                            没有生成
                                                        <?php } ?>
                                                    </td>
                                                    <td>
                                                        <?=$design_svg['create_time']?>
                                                    </td>
                                                    <td>
                                                        <?=$design_svg['up_time']?>
                                                    </td>
                                                    <td>
                                                        <?=$design_svg['try_time']?>
                                                    </td>
                                                    <td>
                                                        <?=$design_svg['err_msg']?>
                                                    </td>
                                                    <td>
                                                        <button class="btn btn-primary btn-xs" onclick="gen_design_svg(this)">生成</button>
                                                    </td>
                                                </tr><?php } ?>
                                            </table>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <!-- /.col -->
                </div>
                <!-- /.row -->
            </div>
            <!-- /.page-content -->
        </div>
    </div>
    <!-- /.main-content -->
    <?php include(block("admin/block/footer")) ?>
</div>

<!-- /.main-container -->
<?php include(block("admin/block/scripts")) ?>
<!-- page specific plugin scripts -->
<script type="text/javascript" src="/js/libs/canvg/canvg.js"></script>
<script src="/ace/assets/js/moment.min.js"></script>
<script src="/ace/assets/js/bootstrap-datetimepicker.min.js"></script>
<script src="/ace/assets/js/jquery.jqGrid.min.js"></script>
<script src="/ace/assets/js/grid.locale-en.js"></script>
<script src="/ace/assets/js/bootstrap-datepicker.min.js"></script>


<script type="text/javascript">

    var grid_selector = "#grid-table";
    var pager_selector = "#grid-pager";
    function gen_product_svg(obj){
        var $svg = $(obj).parents("tr").find(".product_svg").html();
        //console.log($svg);
        canvg('canvas', $svg,{
            log:true,
            useCORS: true,
            ignoreDimensions: true,
            ignoreClear: true,
            ignoreMouse: true, ignoreAnimation: true ,
            renderCallback: function (dom) {
                var imageDataUri = canvas.toDataURL("image/png");
                console.log(imageDataUri);

            }
        });
    }
    function gen_design_svg(obj){

        var id = $(obj).parents("tr").data("id");
        var side = $(obj).parents("tr").data("side");
        var $svg_url = $(obj).parents("tr").find(".svg_url").attr("src");

        canvg('canvas', $svg_url,{
            renderCallback: function (dom) {
                var imageDataUri = canvas.toDataURL("image/png");
                $(obj).parents("tr").find(".img_url").html('<img src="'+imageDataUri+'">');
                $.post("/api",{
                    model:"admin/site/design",
                    action:"save_svg_png",
                    side:side,
                    design_id:id,
                    img_content:imageDataUri,
                },function(data){

                });
            }
        });

    }

</script>
</body>
</html>
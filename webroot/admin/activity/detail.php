<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <?php
    /**
     * 众筹detail
     *
     */
    $id = empty($_REQUEST['id'])?"":$_REQUEST['id'];
    include(block("admin/block/html_head"))?>
    <link rel="stylesheet" href="/ace/assets/css/jquery-ui.custom.min.css" />
    <link rel="stylesheet" href="/ace/assets/css/chosen.min.css" />
    <link rel="stylesheet" href="/ace/assets/css/datepicker.min.css" />
    <link rel="stylesheet" href="/ace/assets/css/bootstrap-timepicker.min.css" />
    <link rel="stylesheet" href="/ace/assets/css/daterangepicker.min.css" />
    <link rel="stylesheet" href="/ace/assets/css/bootstrap-datetimepicker.min.css" />
    <link rel="stylesheet" href="/ace/assets/css/colorpicker.min.css" />

    <!-- ace styles -->
    <link rel="stylesheet" href="/ace/assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
    <link rel="stylesheet" href="/admin/assets/css/style.css" class="ace-main-stylesheet" />
    <script type="text/javascript" src="http://gabelerner.github.io/canvg/rgbcolor.js"></script>
    <script type="text/javascript" src="http://gabelerner.github.io/canvg/StackBlur.js"></script>
    <script type="text/javascript" src="http://gabelerner.github.io/canvg/canvg.js"></script>
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
                    <h1>
                        众筹详情
                    </h1>
                </div><!-- /.page-header -->
                <div class="row">
                    <div class="col-xs-12">
                        <!-- PAGE CONTENT BEGINS -->
                        <div>
                            <?php
                            $str = "";
                            foreach($act_product_styles as $act_product_style){
                                $side = $act_product_style['side'];
                                if($design_svgs['svg_'.$side]){
                                    $content = $design_svgs['svg_'.$side];
                                    $content = Model_Design::replace_svg($content);
                                    echo "<hr>";
                                    echo $act_product_style['region'];
                                    echo "<br><div style='border:1px solid red;display: inline-block'>";
                                    echo $design_svgs['svg_'.$side];
                                    echo "</div>";
                                    echo "<div style='border:1px solid gray;display: inline-block'><img src='/svg/{$side}.png' alt=''></div><hr>";
                                }
                            }
                            foreach($act_product_styles as $act_product_style){
                                $colors = json_decode($act_product_style['colors'], TRUE);
                                $colorName = '';
                                if ($colors) {
                                    $max = $colors[0]['accounting'];
                                    $colorName = $colors[0]['name'];
                                    foreach ($colors as $color) {
                                        if ($color['accounting'] > $max) {
                                            $max = $color['accounting'];
                                            $colorName = $color['name'];
                                        }
                                    }
                                }

                                $side = $act_product_style['side'];
                                $design = Model_Design::reset_svg($design_svgs['svg_'.$side]);

                                $img_url = str_replace("REPLACE_DOMAIN_WITH","http://cdn.open.easytee.me/",$act_product_style['imgurl']);
                                if($colorName) $colorName = 'background-color:#'.$colorName;
                                echo "<hr>";
                                if($design){
                                    $str = '<div style=" border:1px solid grey;margin-right:10px;display:inline-block;height: 500px;width:500px;">'.
                                        '<svg height="100%" width="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  style="overflow: hidden; position: relative;'. $colorName .'"'.
                                        ' viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet">' .
                                        '<image x="0" y="0" width="500" height="500" preserveAspectRatio="none" xlink:href="' . $img_url . '" transform="matrix(1,0,0,1,0,0)"></image>';

                                    $r = $act_product_style["region"];


                                    $t = explode(",",$r);
                                    //pt_log($t);
                                    $x = $t['0']/2;
                                    $y = $t['1']/2;
                                    $w = $t['2']/2;
                                    $h = $t['3']/2;
                                    $str .= "<svg x='$x' y='$y'".substr($design,4);
                                    $str .= '</svg></div>';

                                    echo $str;
                                }
                            }
                            ?>
                        </div>
                    </div>
                </div>
            </div><!-- /.page-content -->
        </div>
    </div><!-- /.main-content -->
    <?php include(block("admin/block/footer"))?>
</div><!-- /.main-container -->
<?php include(block("admin/block/scripts"))?>
<script src="/ace/assets/js/jquery-ui.custom.min.js"></script>
<script src="/ace/assets/js/jquery.ui.touch-punch.min.js"></script>
<script src="/ace/assets/js/chosen.jquery.min.js"></script>
<script src="/ace/assets/js/fuelux.spinner.min.js"></script>
<script src="/ace/assets/js/bootstrap-datepicker.min.js"></script>
<script src="/ace/assets/js/bootstrap-timepicker.min.js"></script>
<script src="/ace/assets/js/moment.min.js"></script>
<script src="/ace/assets/js/daterangepicker.min.js"></script>
<script src="/ace/assets/js/bootstrap-datetimepicker.min.js"></script>
<script src="/ace/assets/js/bootstrap-colorpicker.min.js"></script>
<script src="/ace/assets/js/jquery.knob.min.js"></script>
<script src="/ace/assets/js/jquery.autosize.min.js"></script>
<script src="/ace/assets/js/jquery.inputlimiter.1.3.1.min.js"></script>
<script src="/ace/assets/js/jquery.maskedinput.min.js"></script>
<script src="/ace/assets/js/bootstrap-tag.min.js"></script>
<script>
    $(function(){

        var id = '<?=$id?>';
        $.get("/api?model=admin/user&action=detail",{id:id},function(data){
            var row = data['return'];
            $(".auto_change").each(function(){
                var key = this.id;
                var value = row[key];
                $(this).val(value);
            });
            //console.log(row);
            $("#form").fadeIn(200);
        },"json");
        $('#pic_upload').ace_file_input({
            style:'well',
            btn_choose:'拖一张图片到这里或者点击选择图片',
            btn_change:null,
            no_icon : "ace-icon fa fa-picture-o",
            whitelist_ext : ["jpeg", "jpg", "png", "gif" , "bmp"],
            whitelist_mime : ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/bmp"],
            droppable:true,
            thumbnail:'large'//small | large | fit
            //,icon_remove:null//set null, to hide remove/reset button
            /**,before_change:function(files, dropped) {
						//Check an example below
						//or examples/file-upload.html
						return true;
					}*/
            /**,before_remove : function() {
						return true;
					}*/
            ,
            preview_error : function(filename, error_code) {
                //name of the file that failed
                //error_code values
                //1 = 'FILE_LOAD_FAILED',
                //2 = 'IMAGE_LOAD_FAILED',
                //3 = 'THUMBNAIL_FAILED'
                //alert(error_code);
            }

        }).on('change', function(){

            //console.log($(this).data('ace_input_files'));
            //console.log($(this).data('ace_input_method'));
            var files = $(this).data('ace_input_files');
            var file = files[0];
            var start = 0;
            var stop = file.size - 1;
            var reader = new FileReader();
            // If we use onloadend, we need to check the readyState.
            reader.onloadend = function(evt) {
                if (evt.target.readyState == FileReader.DONE) { // DONE == 2
                    var content = evt.target.result;
                    //console.log(content.length);
                    $.post("/api?model=admin/tools/pic&action=upload",{content:content},function(data){
                        console.log(data)
                    },"json");
                }
            };
            var blob = file.slice(start, stop + 1);
            //console.log(blob);
            reader.readAsDataURL(blob);

        });


    });


</script>
</body>
</html>
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
                        修改用户
                    </h1>
                </div><!-- /.page-header -->
                <div class="row">
                    <div class="col-xs-12">
                        <!-- PAGE CONTENT BEGINS -->
                        <form class="form-horizontal" style="display: none" id="form" role="form">
                            <div class="form-group">
                                <label class="col-sm-2 control-label no-padding-right" for="name">姓名</label>
                                <div class="col-sm-9">
                                    <input type="text"  class="col-xs-12 col-sm-6 auto_change" id="name" placeholder="姓名"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label no-padding-right" for="email">Email</label>
                                <div class="col-sm-9">
                                    <input type="text"  class="col-xs-12 col-sm-6 auto_change" id="email" placeholder="Email"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label no-padding-right" for="mobile">Mobile</label>
                                <div class="col-sm-9">
                                    <input type="text"  class="col-xs-12 col-sm-6 auto_change" id="mobile" placeholder="Mobile"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label no-padding-right" for="qq">QQ</label>
                                <div class="col-sm-9">
                                    <input type="text"  class="col-xs-12 col-sm-6 auto_change" id="qq" placeholder="QQ"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label no-padding-right" for="create_time">注册时间</label>
                                <div class="col-sm-9">
                                    <input type="text" disabled class="col-xs-12 col-sm-6 auto_change" id="create_time" placeholder="注册时间"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label no-padding-right" for="create_time">最后登陆</label>
                                <div class="col-sm-9">
                                    <input type="text" disabled class="col-xs-12 col-sm-6 auto_change" id="create_time" placeholder="最后登陆"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label no-padding-right" for="last_login_ip">最后登陆IP</label>
                                <div class="col-sm-9">
                                    <input type="text" disabled class="col-xs-12 col-sm-6 auto_change" id="last_login_ip" placeholder="最后登陆IP"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label no-padding-right" for="avatar">头像</label>
                                <div class="col-sm-9">
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <img src="http://www.easytee.me/assets/images/header1.png" alt=""/>
                                        </div>
                                    </div>
                                    <div class="row" style="margin-top:10px">
                                        <div class="col-sm-6">
                                            <input multiple="" type="file" id="pic_upload" />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="clearfix form-actions">
                                <div class="col-md-offset-3 col-md-9">
                                    <button class="btn btn-info" type="button">
                                        <i class="ace-icon fa fa-check bigger-110"></i>
                                        提交
                                    </button>
                                </div>
                            </div>
                        </form>
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
        $.get("/admin/user?action=detail",{id:id},function(data){
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
                    $.post("/admin/tools/pic?action=upload",{content:content},function(data){
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
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <?php
        $id = empty($_REQUEST['id'])?"":$_REQUEST['id'];
    ?>
    <?php include(block("admin/block/html_head"))?>
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
                        用户信息
                    </h1>
                </div><!-- /.page-header -->
                <div class="row">
                    <div class="col-sm-12">
                        <div class="tabbable">
                            <ul class="nav nav-tabs padding-12 tab-color-blue background-blue" id="myTab4">
                                <li class="active">
                                    <a data-toggle="tab" href="#home4">基本信息</a>
                                </li>

                                <li>
                                    <a data-toggle="tab" href="#profile4">认证</a>
                                </li>

                                <li>
                                    <a data-toggle="tab" href="#dropdown14">收货地址</a>
                                </li>

                                <li>
                                    <a data-toggle="tab" href="#dropdown14">体现记录</a>
                                </li>

                                <li>
                                    <a data-toggle="tab" href="#dropdown14">发起的活动</a>
                                </li>

                                <li>
                                    <a data-toggle="tab" href="#dropdown14">订单</a>
                                </li>

                                <li>
                                    <a data-toggle="tab" href="#dropdown14">收藏的活动</a>
                                </li>

                                <li>
                                    <a data-toggle="tab" href="#dropdown14">财务流水</a>
                                </li>

                                <li>
                                    <a data-toggle="tab" href="#dropdown14">第三方绑定</a>
                                </li>
                            </ul>

                            <div class="tab-content">
                                <div id="home4" class="tab-pane in active">
                                    <form class="form-horizontal" role="form">


                                            <div class="form-group">
                                                <label class="col-sm-2 control-label" for="ds_host">UID：</label>
                                                <div class="col-sm-4">
                                                    <input class="form-control" id="uid" type="text" readonly value="<?php echo $user['id'] ?>"/>
                                                </div>
                                               <!-- <label class="col-sm-2 control-label" for="ds_name">密码：</label>
                                                <div class="col-sm-4">
                                                    <input class="form-control" id="ds_name" type="password" value="<?php /*echo $user['password'] */?>" />
                                                </div>-->

                                            </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label" for="ds_username">昵称：</label>
                                            <div class="col-sm-4">
                                                <input data-table="et_user" data-field="nick_name" class="auto_change form-control" id="ds_username" type="text" value="<?php echo $user['nick_name'] ?>">
                                            </div>


                                        </div>
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label" for="ds_username">手机号：</label>
                                                <div class="col-sm-4">
                                                    <input class="form-control" id="ds_username" type="text" value="<?php echo $user['mobile'] ?>"/>
                                                </div>
                                                <label class="col-sm-2 control-label" for="ds_password">提现账号：</label>
                                                <div class="col-sm-4">
                                                    <input data-table="et_user_withdraw_account" data-field="withdraw_account" class="auto_change form-control" id="ds_password" type="text" value="<?php echo $user['withdraw_account'] ?>"/>
                                                </div>
                                            </div>

                                        <div class="form-group">
                                            <label class="col-sm-2 control-label" for="ds_username">可提现余额：</label>
                                            <div class="col-sm-4">
                                                <input class="form-control" id="ds_username" type="text" value="<?php echo $user['balance_tx'] ?>"/>
                                            </div>
                                            <label class="col-sm-2 control-label" for="ds_password">暂时冻结余额：</label>
                                            <div class="col-sm-4">
                                                <input class="form-control" id="ds_password" type="text" value="<?php echo $user['balance_block'] ?>"/>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label class="col-sm-2 control-label" for="ds_username">不可提现余额：</label>
                                            <div class="col-sm-4">
                                                <input class="form-control" id="ds_username" type="text" value="<?php echo $user['balance_ntx'] ?>"/>
                                            </div>
                                            <label class="col-sm-2 control-label" for="ds_password">总赚取余额：</label>
                                            <div class="col-sm-4">
                                                <input class="form-control" id="ds_password" type="text" value="<?php echo $user['total_earn'] ?>"/>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="disabledSelect"  class="col-sm-2 control-label">余额：</label>
                                            <div class="col-sm-4">

                                                <input class="form-control" id="ds_password" type="text" value="<?php echo $user['balance_tx']+$user['balance_ntx']+$user['balance_block'] ?>">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="disabledSelect"  class="col-sm-2 control-label">Email：</label>
                                            <div class="col-sm-4">
                                                <input class="form-control" id="ds_password" type="text" value="<?php $user['email'] ?>">
                                            </div>
                                            <label for="disabledSelect"  class="col-sm-2 control-label">提现账号类型：</label>
                                            <div class="col-sm-4">
                                                <div class="col-sm-4">
                                                    <select id="disabledSelect" class="form-control">

                                                        <option <?php if($user['withdraw_type']==1) echo "selected" ?> value="1">微信</option>
                                                        <option <?php if($user['withdraw_type']==0) echo "selected" ?> value="0">支付宝</option>
                                                        <option <?php if($user['withdraw_type']==2) echo "selected" ?> value="2">银行账号</option>


                                                    </select>
                                                </div>
                                            </div>
                                        </div>
    `                     <!--              <div class="form-group">
                                            <label for="disabledSelect"  class="col-sm-2 control-label">状态：</label>
                                            <input name="switch-field-1" class="ace ace-switch ace-switch-4" type="checkbox">
                                            <span class="lbl"></span>

                                        </div>

                                        <div class="form-group">
                                            <label for="disabledSelect"  class="col-sm-2 control-label">认证：</label>
                                            <input name="switch-field-1" class="ace ace-switch ace-switch-4" type="checkbox">
                                            <span class="lbl"></span>
                                        </div>-->

                                    </form>

                                </div>

                                <div id="profile4" class="tab-pane">
                                    <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid.</p>
                                </div>

                                <div id="dropdown14" class="tab-pane">
                                    <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12">
                        <!-- PAGE CONTENT BEGINS -->

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

        $(".auto_change").change(function(){
            var table = $(this).data("table");
            var field = $(this).data("field");
            var value = this.value;
            var uid = $("#uid").val();
            $.post("/api",{
                model:"admin/user",
                action:"update",
                table:table,
                field:field,
                value:value,
                uid:uid
            },function(data){
                if(data.status == 0){

                }else{
                    alert(data.message);
                }
            },"json");
            console.log(table,uid,this.value)
        });

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
    });
</script>
</body>
</html>
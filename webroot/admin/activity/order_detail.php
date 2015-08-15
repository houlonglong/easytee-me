<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <?php
    $order = Model_Admin_Order::detail($_REQUEST['id']);
    /**
     * 订单详情
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
                        订单详情
                    </h1>
                </div><!-- /.page-header -->
                <div class="row">
                    <div class="col-xs-12">
                        <div class="account-main account-order-detail">
                            <div class="container">
                                <div class="row">
                                    <?php

                                    if (!$order) {
                                        echo '<div>当前订单不存在</div>';
                                    } else {
                                        $orderGoods = $order['orderGoods'];
                                        $express = null;
                                        if (isset($order['express'])) {
                                            $express = $order['express'];
                                        }
                                        ?>
                                        <div class="col-sm-9 col-md-10  account-main-right">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <div class="btn-group pull-right  hidden-print">
                                                        <?php
                                                        if ($order['status'] == '待付款' && $order['real_end_time'] > date('Y-m-d H:i:s')) {
                                                            echo '<div class="row"><div class="col-xs-12">
                                          <a href="/order/?pay_type=alipay&order_id=' . $order['id'] . '" class="btn btn-sm btn-warning" id="gotopay">
                                              <span class="iconfont icon-alipay"></span> 支付宝支付</a>
                                        <a class="btn btn-success" onclick="do_wechat_pay(' . $order['id'] . ')">
                                            <span class="iconfont icon-iconfontweixin" ></span> 微信支付</a>

                                            </div></div>';
                                                        }
                                                        if ($order['status'] != '待付款') {
                                                            echo ' <button type="button" onclick="window.print();" class="btn btn-default btn-sm">打印票据
                                </button>
                                <a href="tuihuo.php?id=1"  class="hidden btn btn-success btn-sm get-tuihuo">申请售后
                                </a>
                                <button type="button" class="hidden btn btn-default btn-sm"  id="get-invoice" data-href="invoice.php">申请发票
                                </button>';
                                                        }
                                                        ?>

                                                    </div>
                                                    <h3 class="">订单号:<?php echo $order['order_no']; ?></h3>
                            <span>订购时间：<?php echo $order['pay_time']; ?>
                                &nbsp;&nbsp;&nbsp;发货时间： <?php echo empty($order['delivery_time']) ? '还未发货' : $order['delivery_time']; ?></span>
                                                    <hr>
                                                    <div class="row mb-lg">
                                                        <div class="col-sm-6 col-xs-12">
                                                            <div class="row">
                                                                <div class="col-md-2 text-center visible-md visible-lg">
                                                                    <em class="iconfont icon-97kuaidi"></em>
                                                                </div>
                                                                <div class="col-md-10">
                                                                    <h5>收货人：<?php echo $order['ship_name']; ?></h5>
                                                                    <address><?php echo $order['ship_province'] . $order['ship_city'] . $order['ship_area'] . $order['ship_addr']; ?>
                                                                        <br><?php echo $order['ship_mobile']; ?></address>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-6 col-xs-12">
                                                            <div class="text-center" style="line-height: 100px;display: none">
                                                                等待发货
                                                            </div>
                                                            <?php if (!empty($express)) { ?>
                                                                <div class="clearfix">
                                                                    <p class="pull-left">物流公司
                                                                    </p>

                                                                    <p class="pull-right mr"><?php echo $express['name']; ?>
                                                                    </p>
                                                                </div>
                                                                <div class="clearfix">
                                                                    <p class="pull-left">物流单号
                                                                    </p>

                                                                    <p class="pull-right mr"><?php echo $express['express_no']; ?><span
                                                                            class="hidden-print">(<a href="#"
                                                                                                     data-href="<?php echo $express['api'] . '?number=' . $express['express_no']; ?>"
                                                                                                     id="kuaidi-search">查物流</a>)</span>
                                                                    </p>
                                                                </div>
                                                                <div class="clearfix">
                                                                    <p class="pull-left">签收时间
                                                                    </p>

                                                                    <p class="pull-right mr"><?php
                                                                        if ($order['sign_time'] == '0000-00-00 00:00:00') {
                                                                            echo '还未签收';
                                                                        };
                                                                        ?>
                                                                    </p>
                                                                </div>
                                                            <?php } ?>
                                                        </div>
                                                    </div>
                                                    <div class="table-responsive table-bordered mb-lg">
                                                        <table class="table">
                                                            <thead>
                                                            <tr>
                                                                <th>商品信息#</th>
                                                                <th style="width: 80px">尺码</th>
                                                                <th style="width: 60px">数量</th>
                                                                <th style="width: 60px">单价</th>
                                                                <th class="text-right" style="width: 60px">总价</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            <?php
                                                            if ($orderGoods && is_array($orderGoods)) {
                                                                foreach ($orderGoods as $good) {

                                                                    ?>
                                                                    <tr>
                                                                        <td>
                                                                            <div class="media">
                                                                                <a class="media-left" href="#">
                                                                                    <img src="<?php echo $good['img_path']; ?>" alt="...">
                                                                                </a>

                                                                                <div class="media-body">
                                                                                    <h4 class="media-heading"><?php echo $good['product_name'] . '(' . $good['product_style_name'] . ')' . $good['manufacturer_brand_name']; ?></h4>
                                                                                </div>
                                                                            </div>
                                                                        <td><?php echo $good['size']; ?></td>
                                                                        <td><?php echo $good['quantity']; ?></td>
                                                                        <td><?php echo $good['unit_price']; ?></td>
                                                                        <td class="text-right"><?php echo round($good['unit_price'] * $good['quantity'],2); ?></td>
                                                                    </tr>
                                                                    <?php
                                                                }
                                                            }
                                                            ?>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-sm-offset-8 col-sm-4 pv">
                                                            <?php if ($order['status'] == '待付款') {
                                                            ?>
                                                            <div class="clearfix"><p class="pull-left h4">邮费
                                                                </p>

                                                                <p class="pull-right mr h4">￥<?php echo $order['express_price']; ?>
                                                                </p></div>
                                                            <div class="clearfix"><?php } ?>
                                                                <p class="pull-left h4">合计
                                                                </p>

                                                                <p class="pull-right mr h4">
                                                                    ￥<?php echo  ($order['status'] != '待付款')?$order['total_price']:$order['total_price']+$order['express_price']; ?>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr style="border-top: 2px dotted #ddd">
                                                    <?php if ($order['status'] != '待付款') {
                                                        ?>
                                                        <table class="table">
                                                            <thead>
                                                            <tr class="gray">
                                                                <th>支付方式#</th>
                                                                <th>支付单号</th>
                                                                <th class="text-right">金额</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            <tr class="bg-gray">
                                                                <td><?php
                                                                    switch ($order['pay_type']) {
                                                                        case 'wechat':
                                                                            echo '微信支付';
                                                                            break;
                                                                        case 'unionpay':
                                                                            echo '网银支付';
                                                                            break;
                                                                        case 'easytee':
                                                                            echo '站内交易';
                                                                            break;
                                                                        case 'alipay':
                                                                            echo '支付宝';
                                                                            break;
                                                                    }
                                                                    ?></td>
                                                                <td><?php echo $order['pay_no']; ?></td>
                                                                <td class="text-right"><?php echo $order['pay_price']; ?></td>
                                                            </tr>
                                                            <tr class="bg-gray hidden">
                                                                <td>兑换</td>
                                                                <td>兑换码：SDFS-DG43-TEGf-FDH5</td>
                                                                <td class="text-right">-156</td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                        <div class="row">
                                                            <div class="col-sm-offset-8 col-sm-4 pv">
                                                                <div class="clearfix">
                                                                    <p class="pull-left">快递费
                                                                    </p>

                                                                    <p class="pull-right mr">￥<?php echo $order['express_price']; ?>
                                                                    </p>
                                                                </div>
                                                                <div class="clearfix">
                                                                    <p class="pull-left h3">共支付
                                                                    </p>

                                                                    <p class="pull-right mr h3">￥<?php echo $order['pay_price']; ?>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <?php
                                                    }
                                                    ?>
                                                </div>
                                            </div>
                                        </div>
                                    <?php }
                                    ?>
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
        var url = "/api?model=admin/user&action=detail";
        $.get(url,{id:id},function(data){
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
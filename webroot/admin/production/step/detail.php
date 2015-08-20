<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <?php
    /**
     * Controller Name Replace
     *
     */
    include(block("admin/block/html_head"))?>
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
                        生产详情
                        <small>
                            <i class="ace-icon fa fa-angle-double-right"></i>

                        </small>
                    </h1>
                </div><!-- /.page-header -->
                <div class="row">
                    <div class="col-xs-12">
                        <div class="row">
                            <div class="col-xs-12">
                                <div>
                                    <button class="btn btn-primary" onclick="">下单生产</button>
                                </div>
                                <h2>活动ID:<?=$activity['id']?></h2>
                                <table class="table table-striped table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th>产品名</th>
                                        <th>品牌</th>
                                        <th>颜色</th>
                                        <th>色值</th>
                                        <th>颜色名</th>
                                        <th>尺寸</th>
                                        <th>订单数量</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <?php
                                    //echo "<pre />";
                                    //print_r($styles);
                                    $total = 0;
                                    foreach($styles as $style){
                                    foreach($style['orders'] as $order){
                                        $total += $order['quantity'];
                                        ?>
                                    <tr>
                                        <td><?=$style['name']?></td>
                                        <td><?=$style['mb_name']?></td>
                                        <td><div style="background-color: #<?=$style['color']?>;width: 20px;height:20px;"></div></td>
                                        <td><?=$style['color']?></td>
                                        <td><?=$style['color_name']?></td>
                                        <td><?=$order['size']?></td>
                                        <td><?=$order['quantity']?></td>
                                    </tr>

                                    <?php }} ?>
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <td colspan="6" style="text-align: right;">总计:</td>
                                        <td><?=$total?></td>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div><!-- /.span -->
                        </div>

                        <div class="row">
                            <div class="col-xs-12">
                                <table class="table table-striped table-bordered table-hover">
                                    <tbody>
                                    <?php
                                    //echo "<pre />";
                                    //print_r($styles);
                                    $total = 0;
                                    foreach($styles as $style){
                                            ?>
                                            <tr>
                                                <td>
                                                    <div><?=$style['name']?><div style="display:inline-block;background-color: #<?=$style['color']?>;width: 20px;height:20px;"></div></div>
                                                    <?php foreach($style['images'] as $image){?><table>
                                                        <tr>
                                                            <td>
                                                                <img style="background-color:#<?=$style['color']?>;width:250px" src="<?=replace_cdn($image['imgurl'])?>" alt="">
                                                            </td>
                                                            <td>
                                                                <table>
                                                                    <tr>
                                                                        <td></td>
                                                                        <td></td>
                                                                    </tr>
                                                                </table>

                                                            </td>
                                                        </tr>
                                                    </table>


                                                    <?php } ?>
                                                </td>
                                            </tr>

                                        <?php } ?>
                                    </tbody>

                                </table>
                            </div><!-- /.span -->
                        </div>

                    </div>
                </div>
            </div><!-- /.page-content -->
        </div>
    </div><!-- /.main-content -->
    <?php include(block("admin/block/footer"))?>
</div><!-- /.main-container -->

<div class="bootbox modal fade bootbox-prompt in" tabindex="-1" role="dialog" aria-hidden="false"
     style="display: block; padding-right: 15px;">
    <div class="modal-backdrop fade in" style="height: 697px;"></div>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×
                </button>
                <h4 class="modal-title">What is your name?</h4></div>
            <div class="modal-body">
                <div class="bootbox-body">
                    <form class="bootbox-form"><input class="bootbox-input bootbox-input-text form-control"
                                                      autocomplete="off" type="text"></form>
                </div>
            </div>
            <div class="modal-footer">
                <button data-bb-handler="cancel" type="button" class="btn btn-default">Cancel</button>
                <button data-bb-handler="confirm" type="button" class="btn btn-primary">OK</button>
            </div>
        </div>
    </div>
</div>


<?php include(block("admin/block/scripts"))?>
</body>
</html>

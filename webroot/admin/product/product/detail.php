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
                        产品详情
                        <small>
                            <i class="ace-icon fa fa-angle-double-right"></i>

                        </small>
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
                                            </p>

                                        </div>

                                        <div id="des" class="tab-pane">
                                            <p class="muted">
                                                <?php echo replace_cdn($product['long_description']);?>
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
</body>
</html>

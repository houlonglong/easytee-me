<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <?php
    /**
     * 设计工具
     *
     */
    include(block("admin/block/html_head"))?>
    <!-- ace styles -->
    <link rel="stylesheet" href="/ace/assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
    <link rel="stylesheet" href="/admin/assets/css/style.css" class="ace-main-stylesheet" />
    <link rel="stylesheet" href="design.css" class="ace-main-stylesheet" />

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
                        设计工具
                        <small>
                            <i class="ace-icon fa fa-angle-double-right"></i>
                        </small>
                    </h1>
                </div><!-- /.page-header -->
                <div class="row">
                    <div class="col-xs-12">
                        <div class="row">
                            <div class="col-xs-8">
                                <div class="main-content-wrapper">
                                    <div class="editor-main-area">
                                        <div id="canvas-wrapper" class="editor-area">
                                            <div class="canvas-bg-wrapper">
                                                <img class="canvas-bg" alt="" style="background-color: grey" src="http://cdn.open.easytee.me/products/2/front.png" style="-webkit-user-select: none;">
                                                <div class="canvas-container" style="-webkit-user-select: none; width: 500px; height: 500px; left: 37.5px; top: 0px; position: absolute; z-index: 100; opacity: 1;">
                                                    <canvas id="canvas" width="500" height="500"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-4">
                                <label class="btn btn-primary" for="file_select">
                                    <input id="file_select" type="file" style="display:none;">
                                    上传图片
                                </label>
                                <hr>
                                <div>
                                    <input type="text" id="c_text"> <button class="btn" onclick="change_text()">修改</button>
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
<script src="/js/libs/fabric/fabric.js"></script>
<script class="reload" src="design.js"></script>
<script class="reload" src="main.js"></script>

<script>

</script>
</body>
</html>

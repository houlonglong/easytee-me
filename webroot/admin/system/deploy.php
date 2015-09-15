<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <?php
    /**
     * 部署管理
     *
     */
    include(block("admin/block/html_head"))?>
    <!-- ace styles -->
    <link rel="stylesheet" href="/ace/assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
    <link rel="stylesheet" href="/admin/assets/css/style.css" class="ace-main-stylesheet" />
    <style>
        #deploy_cmd,#deploy_res{
            display: none;
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
                    <h1>
                        部署管理
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
                                <div style="margin-bottom: 20px;">
                                    <button class="btn btn-success" onclick="git_commit()">本地提交</button>
                               </div>
                            </div>
                            <div class="col-xs-12">
                                <div style="margin-bottom: 20px;">
                                    <button class="btn btn-primary" onclick="deploy('v_1_1_test')">V1.1 线上测试环境</button>
                                    <button class="btn btn-danger" onclick="deploy('v_1_1_product')">V1.1 线上正式环境</button>
                                    <button class="btn btn-primary" onclick="deploy('v_2_0_product')">V2.0 线上正式环境</button>
                                    <button class="btn btn-primary" onclick="deploy('v_2_0_test')">V2.0 线上测试环境</button>
                                    <button class="btn btn-primary" onclick="deploy('v_2_0_task_service')">V2.0 线上 Task Service</button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <pre id="deploy_cmd"></pre>
                            </div>
                            <div class="col-xs-12">
                                <pre id="deploy_res"></pre>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">

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
<script>
    function git_commit(){
        $("#deploy_cmd,#deploy_cmd").html("");
        var $msg = prompt("提交信息:");
        if(!$msg) return;
        $.post("/api",{
            model:"admin/system/deploy",
            action:"git_commit",
            msg:$msg
        },function(data){
            $("#deploy_cmd").html(data.return.cmd);
            $("#deploy_res").html(data.return.res);
        });
    }
    function deploy($action){
        $("#deploy_cmd,#deploy_cmd").html("");
        if(!confirm("确定要执行此操作么")) return;
        $.post("/api",{
            model:"admin/system/deploy",
            action:$action,
        },function(data){
            $("#deploy_cmd").html(data.return.cmd);
            $("#deploy_res").html(data.return.res);
        });
    }
</script>
</body>
</html>

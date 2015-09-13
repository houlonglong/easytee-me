<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <?php
    /**
     * 系统信息
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
                        系统信息
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
                                <table class="table table-striped table-bordered table-hover">
                                    <tbody>
                                    <tr>
                                        <td style="width: 120px;text-align: right">
                                            开发环境
                                        </td>
                                        <td>
                                            <?php echo PtApp::$ENV;?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 120px;text-align: right">
                                            服务器
                                        </td>
                                        <td>
                                            <?php echo $_SERVER['SERVER_SOFTWARE'];?> -
                                            <?php echo PHP_OS;?> -
                                            PHP <?php echo PHP_VERSION;?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 120px;text-align: right">
                                            PHP.ini
                                        </td>
                                        <td>
                                            <?php
                                            $t = array(
                                                "session.save_handler",
                                                "session.gc_divisor",
                                                "session.gc_probability",
                                                "session.gc_maxlifetime",
                                                "upload_max_filesize",
                                                "post_max_size",
                                                "max_execution_time",
                                                "memory_limit",
                                                "date.timezone",
                                                "display_errors",
                                                "error_log",
                                                "error_reporting",
                                            );
                                            foreach($t as $v){
                                                echo "<b>".$v."</b> => ".ini_get($v)."<br>";
                                            }
                                            ?>
                                        </td>
                                    <tr>
                                        <td style="width: 120px;text-align: right">
                                            数据库
                                        </td>
                                        <td><pre><?php print_r(PtApp::$setting['db']);
                                            ?></pre>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 120px;text-align: right">
                                            ssh config
                                        </td>
                                        <td>
                                            <pre><?php
                                                system("cat ~/.ssh/config");
                                                ?></pre>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 120px;text-align: right">
                                            Apache Info
                                        </td>
                                        <td>
                                            <pre style="width: 100%"><?php
                                                system("apachectl -S");
                                                ?></pre>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 120px;text-align: right">
                                            public key
                                        </td>
                                        <td>
                                            <pre style="width: 500px"><?php
                                                system("cat ~/.ssh/id_rsa.pub");
                                                ?></pre>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 120px;text-align: right">
                                            ssh 免密码登陆
                                        </td>
                                        <td>
                                            <pre style="width: 500px">mkdir -p ~/.ssh;chmod 0700 ~/.ssh
touch ~/.ssh/authorized_keys
vim ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys</pre>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 120px;text-align: right">
                                            rsync
                                        </td>
                                        <td>
                                            <pre>rsync --exclude=\'www/app/tmp\' --exclude=\'.git\' -a -r -t -v --progress /data/git/easytee/easytee_v1-1 /opt/projects/easytee"</pre>
                                        </td>
                                    </tr>
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
<?php include(block("admin/block/scripts"))?>
</body>
</html>
<!DOCTYPE html>
<html lang="zh-CN">
<?php echo $this->element('site-header'); ?>
<body>
<?php echo $this->element('page-header'); ?>
<div class="page-wrapper">
    <div class="login">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 hidden-xs">
                    <img src="/resources/public/image/bar.png" class="img-responsive">
                </div>
                <div class="col-sm-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <div class="panel-title"><h4>免费注册</h4></div>
                            <div class="panel-body">
                                <?php
                                $ajax_request = false;
                                include 'ajax.ctp';
                                ?>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php
echo $this->element('site-footer');
?>
</body>
</html>
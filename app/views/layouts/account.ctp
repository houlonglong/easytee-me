<!DOCTYPE html>
<html lang="zh-CN">
<?php echo $this->element('site-header'); ?>
<link rel="stylesheet" type="text/css" href="/resources/theme/account/css/account.css">
<link rel="stylesheet" type="text/css" href="/resources/public/css/daterangepicker-bs3.css">
<body>
<?php echo $this->element('page-header'); ?>
<div class="page-wrapper">
    <div class="account">
        <div class="account-header">
            <div class="clearfix hidden-print">
                <div class="container">
                    <div class="account-photo pull-left">
                        <img class="img-circle"
                             src="<?php echo $userPhoto;?>" onerror="this.src='/resources/public/image/no-photo.png'"/>
                    </div>
                    <div class="account-profile">
                        <div class="row">
                            <div class="col-sm-4">
                                <p class="name"><?php echo $user['nickname']; ?></p>
                                <p class="profession"><?php echo $user['abstract']; ?></p>
                            </div>
                            <div class="col-sm-8 hidden-xs">
                                <div class="account-tip">
                                    <div class="row">
                                        <div class="col-sm-6">账户余额：<span>￥<?php echo $money; ?></span> <a href="/Account/moneyflow/withdrawal/" class="btn btn-success">提现</a></div>
                                        <div class="col-sm-6">累计利润：<span>￥<?php echo $moneyAll; ?></span></div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <?php echo $content_for_layout; ?>
        </div>

    </div>
</div>
<?php
echo $this->element('site-footer');
?>
</body>
</html>
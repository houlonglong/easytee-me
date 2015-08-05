<div class="account-nav">
    <div class="container">
        <ul class="nav nav-tabs">
            <li><a href="/Account/">活动管理</a></li>
            <li><a href="/Account/design/clipart">我的素材</a></li>
            <li><a href="/Account/order/">我的订单</a></li>
            <li><a href="/Account/moneyflow/">收支明细</a></li>
            <li class="active pull-right"><a href="/Account/setting/">个人设置</a></li>
        </ul>
    </div>
</div>

<div class="account-main account-setting">
    <div class="container">
        <div class="row">
            <div class="col-sm-3 col-md-2 sidebar">
                <h4>个人设置</h4>
                <ul class="nav nav-pills nav-stacked">
                    <li>
                        <a href="/Account/setting/">个人资料</a>
                    </li>
                    <li>
                        <a href="/Account/setting/address">收货地址</a>
                    </li>
                    <!--
                    <li>
                        <a href="/Account/setting/certification">实名认证</a>
                    </li>
                    -->
                    <li class="active">
                        <a href="/Account/setting/pay">收款账号</a>
                    </li>
                    <!--
                    <li>
                        <a href="/Account/setting/safebind">账号绑定</a>
                    </li>
                    -->
                    <?php if ($user['mobile']) {
                        ?>
                        <li>
                            <a href="/Account/setting/changpass">修改密码</a>
                        </li>
                    <?php } ?>
                </ul>
            </div>
            <div class="col-sm-9 col-md-10 account-main-right">
                <form role="form" method="post" id="payForm" target="/Account/pay">
                    <div class="form-group">
                        <label for="payType" class="control-label">帐号类型</label>
                        <select class="form-control" name="pay-type" id="payType">
                            <option value="alipay" <?php if ($type == 'alipay') echo 'selected'; ?> >支付宝</option>
                            <option value="wechat" <?php if ($type == 'wechat') echo 'selected'; ?> >微信支付</option>
                            <option value="unionpay"<?php if ($type == 'unionpay') echo 'selected'; ?> >银行帐号</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="payAccount" class="control-label">帐号</label>
                        <input type="text" class="form-control pay-account" id="payAccount" name="pay-account" placeholder="请输入您的帐号" value="<?php echo $account; ?>">
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-default save-account">确定修改</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<script>
    $(function () {
        $('#payAccount').on('keyup', function () {
            $(this).parents('.form-group').removeClass('has-error').find('.control-label').text('帐号');
        });
        $('.save-account').click(function () {
            if ($.trim($('#payAccount').val()) == '') {
                $('#payAccount').focus().prevAll('label').text('请输入收款账号').parents('.form-group').addClass('has-error');
                return false;
            }


            $.ajax({
                url: '/account/ajaxSaveAccount/',
                type: 'post',
                dataType: 'json',
                data: {
                    pay_type: $('#payType').val(),
                    pay_account: $.trim($("#payAccount").val()),
                    captcha: $("#inputCaptcha").val()
                },
                success: function (status) {
                    popup(status.msg, false, false, {
                        size: 'modal-lg',
                        backdrop: false
                    }, null, function (modal) {
                        setTimeout(function () {
                            modal.modal('hide')
                        }, 2000);
                    });
                }
            });
        })
    })


</script>
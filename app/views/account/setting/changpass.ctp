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
                    <li>
                        <a href="/Account/setting/pay">收款账号</a>
                    </li>
                    <!--
                    <li>
                        <a href="/Account/setting/safebind">账号绑定</a>
                    </li>
                    -->
                    <li class="active">
                        <a href="/Account/setting/changpass">修改密码</a>
                    </li>
                </ul>
            </div>
            <div class="col-sm-9 col-md-10 account-main-right">
                <form method="post">
                    <div class="form-group">
                        <label for="oldPassword" class="control-label">当前密码</label>
                        <input type="password" class="form-control" name="oldPassword" id="oldPassword" placeholder="输入当前使用的密码">
                    </div>
                    <div class="form-group">
                        <label for="newPassword" class="control-label">新密码</label>
                        <input type="text" class="form-control" name="newPassword" id="newPassword" placeholder="输入新密码" autocomplete="off" onkeyup="value = value.replace(/\s/g, '')">
                    </div>
                    <a href="javascript:;" class="btn btn-default" id="changpass">确定修改</a>
                </form>
            </div>
        </div>
    </div>
</div>
<script type="text/html" id="changpass">
    <div class="modal-content"><div class="alert alert-success ng-scope" role="alert" style="margin-bottom: 0">
            密码修改成功！<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
        </div></div>
</script>

<script>
    $('#newPassword').on('keydown', function () {
        $(this).prevAll('label').text('请输入新密码').parents('.form-group').removeClass('has-error');
    });
    $('#oldPassword').on('keydown', function () {
        $(this).prevAll('label').text('请输入当前密码').parents('.form-group').removeClass('has-error');
    });
    $('#newPassword').on('keyup', function () {
        $(this).prevAll('label').text('请输入新密码').parents('.form-group').removeClass('has-error');
    });
    $('#changpass').click(function () {
        var oldpassword = $('#oldPassword'), newPassword = $('#newPassword');
        if (oldpassword.val() == '') {
            oldpassword.prevAll('label').text('请输入当前密码').parents('.form-group').addClass('has-error');
            oldpassword.focus();
            return false;
        }
        if (newPassword.val() == '') {
            newPassword.prevAll('label').text('您没有输入新密码').parents('.form-group').addClass('has-error');
            newPassword.focus();
            return false;
        }
        if (newPassword.val().length < 6) {
            newPassword.prevAll('label').text('密码太短了可不安全哦^_^(至少需要6位)').parents('.form-group').addClass('has-error');
            newPassword.focus();
            return false;
        }
        if (newPassword.val().length > 32) {
            newPassword.prevAll('label').text('密码太长了可不好记哦^_^(最长32位)').parents('.form-group').addClass('has-error');
            newPassword.focus();
            return false;
        }
        $(this).button('正在修改密码..')
        $.ajax({
            url: "/account/setting/changpass",
            data: {
                'oldpass': oldpassword.val(),
                'newpass': newPassword.val()
            },
            type: "post",
            dataType: 'json',
            success: function (json) {
                $('#changpass').button('reset');
                if (json && json.status) {
                    popup(json.msg, false, false, {
                        size: 'modal-lg',
                        backdrop: false
                    }, function (modal) {
                        setTimeout(function () {
                            modal.modal('hide')
                        }, 2000);
                    });
                    if (json.status == 'ok') {
                        $('#oldPassword').val(''), $('#newPassword').val('');
                    }
                }
                return;
            },
            error: function () {
                popup('密码修改失败，请稍后重试！', false, false, {
                    size: 'modal-lg',
                    backdrop: false
                }, function (modal) {
                    setTimeout(function () {
                        modal.modal('hide')
                    }, 2000);
                });
            }
        })
    });
</script>
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
                    <li class="active">
                        <a href="/Account/setting/">个人资料</a>
                    </li>
                    <li>
                        <a href="/Account/setting/address">收货地址</a>
                    </li>
                    <!--
                    <li>
                        <a href="/Account/setting/certification">实名认证</a>
                    </li>--->
                    <li>
                        <a href="/Account/setting/pay">收款账号</a>
                    </li>
                    <!--<li>
                        <a href="/Account/setting/safebind">账号绑定</a>
                    </li>
                    --->
                    <?php if ($user['mobile']) {
                        ?>
                        <li>
                            <a href="/Account/setting/changpass">修改密码</a>
                        </li>
                    <?php } ?>
                </ul>
            </div>
            <div class="col-sm-9 col-md-10 account-main-right">
                <form method="post" enctype="multipart/form-data">
                    <div class="form-group">
                        <label class="control-label">昵称</label>
                        <input type="text" id="nickname" name="nickname" class="form-control" placeholder="请输入昵称" value="<?php echo $user['nickname']; ?>">
                    </div>
                    <div class="form-group">
                        <label class="control-label">头像</label>
                        <input accept="image/*" type="file" data-classbutton="btn btn-default" data-classinput="form-control inline" class="form-control" id="personalImage" name="personalImage" tabindex="-1" style="position: absolute; clip: rect(0px 0px 0px 0px);">
                        <div class="bootstrap-filestyle input-group"><input type="text" class="form-control " disabled=""> <span class="group-span-filestyle input-group-btn" tabindex="0"><label for="personalImage" class="btn btn-default "><span class="glyphicon glyphicon-folder-open"></span>选择图片</label></span></div>
                        <input type="hidden" name="oldimg"  value="<?php echo $user['photo']; ?>" id="old-img"><div class="personal"><img class="img-responsive img-circle" src="<?php echo $userPhoto; ?>" onerror="this.src='/resources/public/image/no-photo.png'"/></div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">个性签名</label>
                        <textarea maxlength="20" name="abstract" id="abstract" class="form-control" placeholder="请输入个性签名（20个字符以内）"><?php echo $user['abstract']; ?></textarea>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-default save-personal" data-loading-text="正在保存...">确定修改</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<script>
    $(function () {
        $('#nickname').on('keyup', function () {
            $(this).parents('.form-group').removeClass('has-error').find('label.control-label').text('昵称');
        });
        $('#abstract').on('keyup', function () {
            $(this).parents('.form-group').removeClass('has-error').find('label.control-label').text('个性签名');
        });
        $('#personalImage').on('change', function () {
            $(this).parents('.form-group').removeClass('has-error').find('label.control-label').text('头像');
        });
        $('#personalImage').on('change', function () {
            $(this).nextAll('div').find('input').val(this.value);
            if (this.files.length > 0 && this.files[0].size < 20480) {
                $(this).focus().parents('.form-group').addClass('has-error').find('label.control-label').text('您上传的图片过小会导致显示效果不理想，请上传大于20K的图片');
                return false;
            }
        });
        $('.save-personal').click(function () {
            var abstract = $('#abstract'), nickname = $('#nickname'), personalImage = $('#personalImage'), v;
            if (nickname.val() == '') {
                nickname.focus().parents('.form-group').addClass('has-error').find('label.control-label').text('请输入昵称');
                return false;
            }
            if (v = nickname.val(), v.length < 3 || v.length > 10) {
                nickname.focus().parents('.form-group').addClass('has-error').find('label.control-label').text('昵称的长度应该是3 - 10 个字符');
                return false;
            }
            if (personalImage.length > 0 && personalImage[0].files.length == 0 && $('#old-img').val() == '') {
                personalImage.focus().parents('.form-group').addClass('has-error').find('label.control-label').text('请上传您的头像');
                return false;
            }
            if (personalImage.length > 0 && personalImage[0].files[0] && personalImage[0].files[0].size < 20480) {
                personalImage.focus().parents('.form-group').addClass('has-error').find('label.control-label').text('您上传的图片过小会导致显示效果不理想，请上传大于20K的图片');
                return false;
            }
            if (personalImage.length > 0 && personalImage[0].files[0] && personalImage[0].files[0].size > 2048000) {
                personalImage.focus().parents('.form-group').addClass('has-error').find('label.control-label').text('上传的图片请不要超过2M');
                return false;
            }
            if (v = abstract.val(), v != '' && v.length > 20) {
                abstract.focus().parents('.form-group').addClass('has-error').find('label.control-label').text('签名不能超过20个字');
                return false;
            }
            $(this).button('loading');
            $('.save-personal').parents('form').submit();
        });
    });
</script>
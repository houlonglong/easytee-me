<!DOCTYPE html>
<html lang="zh-CN">
    <?php echo $this->element('site-header'); ?>

    <body>
        <?php echo $this->element('page-header'); ?>
        <style>
            .find-password {padding: 80px 0}
            .find-password .container{background-color: #fff;padding: 20px;min-height: 400px;}
            .find-password-nav,.find-password-main{width: 500px;margin: 0 auto}
            .find-password-nav span{background-color: #9d9d9d;display: block;margin:0 auto;width: 30px;height: 30px;line-height: 30px;font-size: 22px;color: #fff;text-align: center;border-radius: 15px}
            .find-password-nav b{display: block;text-align: center;line-height: 25px;color: #8D8D8D}
            .find-password-nav .active span{background-color: #019875;}
            .find-password-nav .active b{color: #000}
            .find-password-main{position: relative;}
            .find-password-main > .form{position: absolute;left: 0;top: 0;width: 100%;background-color: #fff;display:none;}
            .find-password-main > .form:first-child{display: block;}
            .find-password-main > .form >.form-group:first-child{margin-top: 20px;}

        </style>
        <div class="page-wrapper">
            <div class="find-password">
                <div class="container">

                    <div class="row">
                        <div class="col-sm-12">
                            <div class="find-password-nav">
                                <div class="row">
                                    <div class="col-sm-4 icon-mobile find-password-nav-step active"><span>1</span><b>输入手机号</b></div>
                                    <div class="col-sm-4 icon-captcha find-password-nav-step"><span>2</span><b>手机验证</b></div>
                                    <div class="col-sm-4 icon-password find-password-nav-step"><span>3</span><b>重置密码</b></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="find-password-main">
                        <form class="form">
                            <div class="form-group">
                                <label class="control-label">请输入手机</label>
                                <input class="form-control" type="tel" value="" placeholder="请输入手机" onkeyup="value = value.replace(/\s/g, '')">
                            </div>
                            <div class="form-group">
                                <button type="button" class="btn btn-primary button-next" data-type="mobile">下一步</button>
                            </div>
                        </form>
                        <form class="form">
                            <div class="form-group">
                                <label class="control-label">请输入验证码</label>
                                <input class="form-control" value="" placeholder="请输入验证码" onkeyup="value = value.replace(/\s/g, '')">
                            </div>
                            <div  class="col-sm-4">
                                <button type="button" class="btn btn-primary  button-prev">上一步</button>
                            </div>
                            <div  class="col-sm-4">
                                <button type="button" class="btn btn-primary" data-type="captcha">下一步</button>
                            </div>
                        </form>
                        <form class="form">
                            <div class="form-group">
                                <label class="control-label">请输入新密码</label>
                                <input class="form-control" value="" placeholder="请输入新密码" onkeyup="value = value.replace(/\s/g, '')">
                            </div>
                            <div  class="col-sm-4">
                                <button type="button" class="btn btn-primary button-prev">上一步</button>
                            </div>
                            <div  class="col-sm-4">
                                <button type="button" class="btn btn-primary submit"data-type="password">确定修改</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
        <?php
        echo $this->element('site-footer');
        ?>
        <script>
            function setnav_next() {
                $('.find-password-nav').find('.find-password-nav-step.active').removeClass('active').next().addClass('active');

            }
            function setnav_prev() {
                $('.find-password-nav').find('.find-password-nav-step.active').removeClass('active').prev().addClass('active');

            }
            $('.button-prev').click(function () {
                $(this).parents('form').fadeOut(500).prev().fadeIn(500);
                setnav_prev();
                return;
            });
            $('.btn-primary').click(function () {
                var tip = $(this).parents('form').find('.form-group:eq(0)');
                var type = $(this).attr('data-type');
                var input = $(this).parents('form').find('input');
                var $this = $(this);
                var value = input.val();
                if (type == 'password') {
                    if (value.length > 32) {
                        $(this).focus().parents('form').find('.form-group:eq(0)').addClass('has-error');
                        tip.find('label').text('密码长度不能超过32');
                        return fasle;
                    }
                    if (value.length < 6) {
                        $(this).focus().parents('form').find('.form-group:eq(0)').addClass('has-error');
                        tip.find('label').text('密码长度不能小于6位');
                        return fasle;
                    }
                }
                $.ajax({
                    url: '/login/modifyPassword/',
                    dataType: 'json',
                    data:{
                        value:encodeURIComponent(input.val()),
                        type:type
                    },
                    type:'post',
                    success: function (status) {
                        if (status && status.status == 0) {
                            tip.addClass('has-error');
                            tip.find('label').text(status.msg);
                            input.focus();
                            return false;
                        }
                        if (type == 'password') {
                            popup(status.msg, false, false, null, function (modal) {
                                setTimeout(function () {
                                    modal.modal('hide');
                                    window.location.href='/login/';
                                }, 2000);
                            }, {
                                size: 'modal-lg',
                                backdrop: false
                            });
                            return false;
                        }
                        $this.parents('form').fadeOut(500).next().fadeIn(500);
                        setnav_next();
                    }
                })
            });
            $('input').blur(function () {
                var value = $(this).val();
                if (value == '') {
                    var tip = $(this).focus().parents('form').find('.form-group:eq(0)').addClass('has-error');
                } else {
                    $(this).parents('form').find('.form-group:eq(0)').removeClass('has-error');
                }
            });
        </script>
    </body>
</html>

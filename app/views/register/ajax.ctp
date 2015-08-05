<div class="login-main">
    <div>
        <div>
                    <form role="form" class="form" method="post"  id="registerForm">
                        <div class="form-group">
                            <label class="control-label">
                                手机
                            </label>
                                <div class="input-group">
                                    <input type="tel" class="form-control" name="mobile" value="" placeholder="请输入您的手机" id="mobile"/>
                                <span class="group-span-filestyle input-group-btn" tabindex="0">
                                    <button type="button" class="btn btn-default getCaptcha" id="getCaptcha" data-loading-text="获取中...">获取验证码</button>
                                </span>
                                </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label">
                                验证码
                            </label>
                                <input class="form-control" type="tel" name="captcha" id="captcha"/>
                        </div>
                        <div class="form-group">
                            <label class="control-label">
                                登录密码
                            </label>
                                <input class="form-control" type="text" name="password" id="password" autocomplete="off" onkeyup="value = value.replace(/\s/g, '')"/>
                        </div>
                        <div class="form-group">
                            <label class="control-label">
                            </label>
                                <button type="button" data-loading-text="正在玩命注册中..." class="btn btn-success btn-lg" id="registerAction">
                                    免费注册
                                </button>
                        </div>
                         <input name="relurl" type="hidden" value="<?php echo $relurl;?>">
                    </form>
        </div>
        <div>
            <h4>合作网站登录</h4>
            <div>
                <a class="btn-login btn-login-zhifubao hidden-xs" href="javascript:authLogin('alipay','<?php echo $relurl;?>');"><em class="iconfont icon-alipay"></em></a>
                <!--<a class="btn-login-weixin" href="javascript:authLogin('wechat','<?php echo $relurl;?>');"><em class="iconfont icon-iconfontweixin"></em></a>-->
                <!--<a class="btn-login-qq" href="javascript:authLogin('qq','<?php echo $relurl;?>');"><em class="iconfont icon-qq"></em></a>-->
                <a class="btn-login-weibo" href="javascript:authLogin('weibo','<?php echo $relurl;?>');"><em class="iconfont icon-weibo"></em></a>
                <!--<a class="btn-login btn-login-douban" href="javascript:authLogin('douban','<?php echo $relurl;?>');"><em class="iconfont icon-douban"></em></a>-->
            </div>
        </div>
        <div>
            <hr>
            <a href="/login/<?php echo $ajax_request; ?>?relurl=<?php echo urlencode($relurl);?>" class="btn btn-primary btn-block btn-lg">已有帐号？立即登录</a>
        </div>
    </div>
    <script src="/resources/public/js/jquery.cookie.js"></script>
    <script type="text/javascript">
        $(function () {
            var mobile = $.cookie("mobile");
            if(mobile){
                $("#mobile").val(mobile);
            };

            smsCountDown('#getCaptcha');
            $('#mobile').on('keyup',function(){
                $(this).parents('.form-group').removeClass('has-error').find('label.control-label').text('手机号码');
            });
            $('#password').on('keyup',function(){
                $(this).parents('.form-group').removeClass('has-error').find('label.control-label').text('登录密码');
            });
            $("#captcha").on('keyup',function(){
                $(this).parents('.form-group').removeClass('has-error').find('label.control-label').text('验证码');
            });

            $('#registerAction').click(function () {

                if ($('#mobile').val() == '') {
                    $('#mobile').focus().parents('.form-group').addClass('has-error').find('label.control-label').text('请输入手机号码');
                    return;
                }

                var filter  = /^((1[0-9]{1})+\d{9})$/;
                if (!filter.test($('#mobile').val())) {
                    $('#mobile').focus().parents('.form-group').addClass('has-error').find('label.control-label').text('请输入正确的手机号码');
                    return false;
                }

                if ($("#captcha").val() == '') {
                    $("#captcha").focus().parents('.form-group').addClass('has-error').find('label.control-label').text('请输入验证码');
                    return;
                }
                else if ( $('#password').val() == '') {
                    $('#password').focus().parents('.form-group').addClass('has-error').find('label.control-label').text('请输入密码');
                    return;
                }
                else if ( $('#password').val().length < 6) {
                    $('#password').focus().parents('.form-group').addClass('has-error').find('label.control-label').text('为了账户安全，密码不能少于6位');
                    return;
                }
                else if ( $('#password').val().length > 32) {
                    $('#password').focus().parents('.form-group').addClass('has-error').find('label.control-label').text('密码请不要超过32位');
                    return;
                }
                $(this).button('loading');
                $.ajax({
                    url: "/register/",
                    type: "POST",
                    dataType:'json',
                    data: $('#registerForm').serialize(),
                    success: function(data){
                        if(data.status == 'OK'){
                            $.cookie("mobile",'',{path:"/"});
                            if(data.url && data.url !=''){
                                location.href=data.url;
                            }else{
                                location.href='/account/';
                            }
                        }else{
                            alert(data.msg);
                            $('#registerAction').button('reset');
                            return false;
                        }
                    },
                    error:function(){
                        alert('因为网络问题注册失败，请重试！');
                        $('#registerAction').button('reset');
                        return false;
                    }
                });

                return false;
            });

            $('#getCaptcha').click(function () {
                var mobile = $("#mobile");
                    if (mobile.val() == '') {
                        mobile.focus().parents('.form-group').addClass('has-error').find('label.control-label').text('请输入手机号码');
                        return false;
                    }
                    if (!(/^((1[0-9]{1})+\d{9})$/.test(mobile.val()))) {
                        $("#mobile").focus().parents('.form-group').addClass('has-error').find('label.control-label').text('请输入正确手机号码');
                        return false;
                    }
                $.cookie("mobile",mobile.val(),{path:"/"});

                $(this).attr('disabled', true);

                $.ajax({
                    url:"/register/getCode/" + mobile.val(),
                    dataType:'json',
                    success:function(json){
                        console.log(json);
                        if (json&&json.status&&json.status == 'OK') {
                            $.cookie("Captcha",60,{path:"/"});
                            smsCountDown('#getCaptcha');
                            $("#captcha").focus();
                        } else {
                            if(json && json.msg){
                                $('#getCaptcha').focus().parents('.form-group').addClass('has-error').find('label.control-label').text(json.msg);
                            }else{
                                $('#getCaptcha').focus().parents('.form-group').addClass('has-error').find('label.control-label').text('验证码获取失败,请稍后重试');

                            }
                            $('#getCaptcha').text('获取验证码');
                        }
                        return;
                    },
                    error:function(){
                        alert('因为网络问题注册失败，请重试！');
                        return false;
                    }

                });
                return false;

            });


        });
    </script>
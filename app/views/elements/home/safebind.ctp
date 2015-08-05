<div>
    <form class="form form-horizontal" role="form" method="post" id="safebindform">
        <?php if($type=='mobile'){ ?>
        <div class="form-group check-mobile">
            <label for="mobile" class="col-sm-3 control-label">手机</label>
            <div class="col-sm-9">
                <div class="input-group">
                    <?php if($validOld == false){ ?>
                    <input type="text" class="form-control" id="mobile" name="value" value="<?=showPhone($user['User']['mobile']);?>" <?php if($user['User']['mobile_checked']=='y') echo 'readonly';?>>
                    <?php }else{ ?>
                    <input type="text" class="form-control" id="mobile" name="value" value="" >
                    <?php } ?>
                    <span class="group-span-filestyle input-group-btn" tabindex="0">
                        <label  for="filestyle-0" class="btn btn-default" id="sendCaptcha">获取验证码<span></span></label>
                    </span>
                </div>
            </div>

        </div>
            <div class="form-group">
                <label for="captcha" class="col-sm-3"></label>
                <div class="col-sm-9">
                    <div class="input-group">
                        <input type="text" class="form-control" id="captcha" name="captcha" placeholder="请输入验证码">
                    </div>
                </div>
            </div>
        <?php
        }
        if($type=='email') {
            ?>
            <div class="form-group check-email">
                <label for="email" class="col-sm-3 control-label">邮箱</label>

                <div class="col-sm-9">
                    <div class="input-group">
                        <?php if($validOld == false){ ?>
                        <input type="text" class="form-control" id="email" name="value" value="<?=showEmail($user['User']['email'])?>"  <?php if($user['User']['email_checked']=='y') echo 'readonly';?> >
                        <?php }else{ ?>
                        <input type="text" class="form-control" id="email" name="value" value="" >
                        <?php } ?>
                        <span class="group-span-filestyle input-group-btn" tabindex="0">
                            <label for="filestyle-0" class="btn btn-default " id="sendCaptcha">获取验证码<span></span></label></span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="captcha" class="col-sm-3"></label>
                <div class="col-sm-9">
                    <div class="input-group">
                        <input type="text" class="form-control" id="captcha" name="captcha" placeholder="请输入验证码">
                    </div>
                </div>
            </div>
        <?php
        }
        ?>
    </form>
</div>

<script type="text/javascript">
$(function(){
    var validOld = <?=intval($validOld);?>; 

    <?php if($user['User'][$type.'_checked']=='y' && $validOld == false){ ?>
        $('.modal .modal-footer .btn-primary').html('下一步');
    <?php }else{ ?>
        $('.modal .modal-footer .btn-primary').html('确定');
    <?php } ?>

    $('#sendCaptcha').unbind("click").click(function(){
        var type = $(this).parent().prev().attr('id');
        var value = $(this).parent().prev().val();
        
        $.getJSON("/home/ajaxSendCaptchaForSafe/"+type + '/' + value, function(json){
            if(json.status == 'ok'){
                timer = window.setInterval(conutDown,1000);
                alert('发送成功');
                return false;
            }else{
                alert(json.msg);
            }
        });
    });

    $('.modal .modal-footer .btn-primary').unbind("click").click(function(){
        if($('#sendCaptcha').parent().prev().attr('readonly') != 'readonly'){
            var value = $('#sendCaptcha').parent().prev();
        }
        var type = $('#sendCaptcha').parent().prev().attr('id');
        var captcha = $('#captcha').val();

        if(value == ''){
            alert('请填写信息');
        }else if(captcha == ''){
            alert('请填写验证码');
        }else{
            $.post('/home/safe/'+ type, $('#safebindform').serialize(), function(data) {
                if(data.status == 'ok'){
                    if(validOld == false){
                        //下一步
                        var title = type=='mobile'?'手机绑定':'邮箱绑定';
                        popup(title,'/home/safe/'+type,true,function(a){
                            clearInterval(timer); 
                            //$('.modal .modal-footer .btn-primary').html('确定');
                        },false);
                    }else{
                        //绑定结束
                        alert(data.msg);
                        document.location.reload();
                    }
                    
                }else{
                    alert(data.msg);
                }
            },"json");
        }
    });
});

//倒计时
var time = 60;
var spans = $('#sendCaptcha span');
var conutDown = function(){
time--;
var span = '('+ time +')';
if(time >= 0){
    spans.text(span);
     $('#sendCaptcha').attr('disabled',true);
}else{
   clearInterval(timer); 
   spans.text("");
   $('#sendCaptcha').attr('disabled', false);
}
};
</script>
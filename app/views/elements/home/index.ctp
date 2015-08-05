<?php 
function getLevel($maxPoint){
    if($maxPoint < 200) return 1;
    if($maxPoint < 1000) return 2;
    if($maxPoint < 4000) return 3;
    if($maxPoint < 10000) return 4;
    if($maxPoint < 30000) return 5;
    if($maxPoint < 80000) return 6;
    if($maxPoint < 200000) return 7;
    if($maxPoint < 500000) return 8;
    return 9;
}
?>
<div class="panel panel-default">
    <div class="panel-heading">
        概览
    </div>
    <div class="panel-body account-index">
        <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#home" role="tab" data-toggle="tab" class="tab-home">概览</a></li>
            <li role="presentation"><a href="#authbind" role="tab" data-toggle="tab" class="tab-authbind">帐号绑定</a></li>
            <li role="presentation"><a href="#certification" role="tab" data-toggle="tab" class="tab-certification">实名认证</a></li>
            <li role="presentation"><a href="#pay" role="tab" data-toggle="tab">收款账号</a></li>
            <li role="presentation"><a href="#safe" role="tab" data-toggle="tab">账号安全</a></li>
        </ul>
        <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="home">
                <div class="account-index-main">
                    <div class="row line">
                        <div class="col-sm-12">
                            你好，<a href="#"><?=$user['User']['name'];?></a>
                            <?php if(empty($userCertification) || $userCertification['UserCertification']['passed'] == 0){ ?>
                            <a href="#certification" class="renzheng"><em class="iconfont icon-shenfenrenzheng"></em>未认证</a>
                            <?php }else{ ?>
                            <a href="#certification" class="renzheng"><em class="iconfont icon-shenfenrenzheng"></em>已认证（<?=$userCertification['UserCertification']['passed']?>）</a>
                            <?php } ?>
                        </div>
                    </div>
                    <div class="row line account-jifen">
                        <div class="col-sm-12">
                            当前等级：<span><em class="iconfont icon-iconfontvip<?=getLevel($user['User']['max_point']);?>"></em><?=$user['User']['max_point'];?></span>当前积分：<span class="jifen-number"><em class="iconfont icon-keyongjifen"></em><?=$user['User']['point'];?></span>
                        </div>
                    </div>
                    <div class="row line account-bind">
                        <div class="col-sm-12">
                            登录方式：
                            <?php if(empty($bind['alipay'])){ ?>
                            <a href="javascript:toBind('alipay')"  class="account-bind-zhifubao disabled account-bind"><em class="iconfont icon-4"></em>未绑定</a>
                            <?php }else{ ?>
                            <a href="#" class="account-bind-zhifubao account-bind-client"><em class="iconfont icon-4"></em>已绑定</a>
                            <?php } ?>

                            <?php if(empty($bind['qq'])){ ?>
                            <a href="javascript:toBind('qq')"  class="account-bind-qq disabled account-bind"><em class="iconfont icon-dengluqq"></em>未绑定</a>
                            <?php }else{ ?>
                            <a href="#" class="account-bind-qq account-bind-client"><em class="iconfont icon-dengluqq"></em>已绑定</a>
                            <?php } ?>
                            
                            <?php if(empty($bind['wechat_web'])){ ?>
                            <a href="javascript:toBind('wechat_web')"  class="account-bind-weixin disabled account-bind"><em class="iconfont icon-weixin"></em>未绑定</a>
                            <?php }else{ ?>
                            <a href="#" class="account-bind-weixin account-bind-client"><em class="iconfont icon-weixin"></em>已绑定</a>
                            <?php } ?>

                            <?php if(empty($bind['weibo'])){ ?>
                            <a href="javascript:toBind('weibo')"  class="account-bind-weibo disabled account-bind"><em class="iconfont icon-sina"></em>未绑定</a>
                            <?php }else{ ?>
                            <a href="#" class="account-bind-weibo account-bind-client"><em class="iconfont icon-sina"></em>已绑定</a>
                            <?php } ?>

                            <?php if(empty($bind['douban'])){ ?>
                            <a href="javascript:toBind('douban')" class="account-bind-douban disabled account-bind"><em class="iconfont icon-doubanyin"></em>未绑定</a>
                            <?php }else{ ?>
                            <a href="#" class="account-bind-douban account-bind-client "><em class="iconfont icon-doubanyin"></em>已绑定</a>
                            <?php } ?>

                        </div>
                    </div>
                    <div class="row line account-money">
                        <div class="col-sm-12">
                            账户余额：<span><em class="iconfont icon-yue"></em><?=$user['User']['money'];?></span><a href="#" id="withdrawals">提现</a><a href="/home/moneyFlow/">收支明细</a>
                        </div>
                    </div>

                    <hr/>
                    <?php echo $this->element('home/safe');?>
                </div>
            </div>
            <div role="tabpanel" class="tab-pane" id="authbind"></div>
            <div role="tabpanel" class="tab-pane" id="certification"></div>
            <div role="tabpanel" class="tab-pane" id="pay"></div>
            <div role="tabpanel" class="tab-pane" id="safe"></div>
        </div>
    </div>
</div>
<script type="text/javascript">
var userCertification = "<?php echo $userCertification['UserCertification']['id'];?>";
$("#withdrawals").click(function(){
if(userCertification == ''){
    alert("通过认证的用户才可以提现哦");
    location.href = '/home/#certification';
    $('.tab-home').attr('aria-expanded',false);
    $('.tab-home').parent().removeClass('active');
    $('.tab-certification').attr('aria-expanded',true);
    $('.tab-certification').parent().addClass('active');
    $('#certification').addClass('active');
    $('#home').removeClass('active');
    return false;
}else{
    popup("申请提现",'/home/withdrawApply',true,null,function(m){
        m.find('.modal-dialog').css("width","800px");
        m.find('.btn-primary').click(function(){
            var realMoney 	= parseFloat($('#realMoney').html());
            var cash 		= parseFloat($('#cash').val());
            var total 		= parseFloat($('#total').html());
            if(total > realMoney){
                alert('您的余额不足');
                return;
            }

            $.get('/home/withdrawApply/'+cash,function(d){
                if(d == 1){
                    alert('提现申请已提交');
                }
            });
        })
    });
}
});
$.ajax({
    url:"/home/authbind/",
    dataType:"html",
    success:function(html){
     $('#authbind').html(html); 
    }
});
$('.account-bind-client').each(function(){
  $(this).off("click").click(function(){
     $('.tab-home').attr('aria-expanded',false);
     $('.tab-home').parent().removeClass('active');
     $('.tab-authbind').attr('aria-expanded',true);
     $('.tab-authbind').parent().addClass('active');
     $('#home').removeClass('active');
     $('#authbind').addClass('active');
 });
});
  
</script>
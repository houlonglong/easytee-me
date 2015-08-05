<div class="row account-mobile-mail">
    <div class="col-xs-12">
        <table class="table table-not-border table-condensed">
            <tbody>

            <?php if($user['User']['mobile_checked'] == 'n'){ ?>
            <tr class="not-bind">
                <td style="width:60px;">
                    <em class="iconfont icon-shoujirenzheng"></em>
                </td>
                <td>手机绑定<em class="iconfont icon-bbgzsjinggao"></em>
                    <div>没有绑定</div>
                </td>
                <td style="width:160px;"><a href="#" class="bindmobile" rel="mobile">绑定手机号码</a></td>
            </tr>
            <?php }else{ ?>
            <tr>
                <td style="width:60px;">
                    <em class="iconfont icon-shoujirenzheng"></em>
                </td>
                <td>手机绑定<em class="iconfont icon-zhengquerightxian"></em>
                    <div>已绑定手机：<?=showPhone($user['User']['mobile']);?></div>
                </td>
                <td style="width:160px;"><a href="#" class="bindmobile" rel="mobile">修改手机号码</a></td>
            </tr>
            <?php } ?>
            

            <?php if($user['User']['email_checked'] == 'n'){ ?>
            <tr class="not-bind">
                <td>
                    <em class="iconfont icon-youxiangrenzheng"></em>
                </td>
                <td>邮箱绑定<em class="iconfont icon-bbgzsjinggao"></em>
                    <div>没有绑定</div>
                </td>
                <td><a href="#" class="bindmobile" rel="email">绑定邮箱账号</a></td>
            </tr>
            <?php }else{ ?>
            <tr>
                <td>
                    <em class="iconfont icon-youxiangrenzheng"></em>
                </td>
                <td>邮箱绑定<em class="iconfont icon-zhengquerightxian"></em>
                    <div>已绑定邮箱：<?=showEmail($user['User']['email'])?></div>
                </td>
                <td><a href="#" class="bindmobile" rel="email">修改邮箱账号</a></td>
            </tr>
            <?php } ?>

            </tbody>
        </table>
    </div>
</div>
<script type="text/javascript">
$('.bindmobile').click(function(){
    var type = $(this).attr('rel');
    title = '修改绑定账号';
    popup(title,'/home/safe/'+type,true,function(a){
        //$('.modal .modal-footer .btn-primary').html('确定');
    },false);
})
</script>
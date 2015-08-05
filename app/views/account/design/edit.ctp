<div class="account-nav">
    <div class="container">
        <ul class="nav nav-tabs">
            <li><a href="/Account/">活动管理</a></li>
            <li><a href="/Account/design/clipart">我的素材</a></li>
            <li><a href="/Account/order/">我的订单</a></li>
            <li><a href="/Account/moneyflow/">收支明细</a></li>
            <li class="pull-right"><a href="/Account/setting/">个人设置</a></li>
        </ul>
    </div>
</div>
<div class="account-main account-design">
    <div class="container">
        <div class="row">
            <div class="col-sm-3 col-md-2 sidebar">
                <h4>活动管理</h4>
                <ul class="nav nav-pills nav-stacked">
                    <li>
                        <a href="/Account/index/create">设计中</a>
                    </li>
                    <li class="active">
                        <a href="/Account/index/ongoing">进行中</a>
                    </li>
                    <li>
                        <a href="/Account/index/success">成功的</a>
                    </li>
                    <li>
                        <a href="/Account/index/failure">失败的</a>
                    </li>
                </ul>
            </div>
            <div class="col-sm-9 col-md-10 account-main-right">
                <form class="form" action="/home/designEdit/<?= $activity['id']; ?>" method="post" id="designForm">
                    <div class="form-group">
                        <label class="control-label">名称</label>
                        <input type="text" class="form-control" placeholder="请输入名称" name="name" value="<?php echo $activity['name']; ?>" style="margin-bottom:10px;">
                    </div>

                    <div class="form-group">
                        <label  class="control-label">介绍</label>
                        <textarea  id="design_intro" name="activity_info"  placeholder="请输入介绍" rows="20" style="min-height: 260px;width: 100%;"><?php echo @$activity['description']; ?></textarea>
                    </div>
<!--                    <div class="form-group">
                        <label class="control-label">
                            <input type="checkbox" id="design_kuaidi" name="delivery_address" value="1" <?php if (!empty($activity['delivery_address'])) echo 'checked'; ?>>
                            易衫网免费配送到指定地址，买家到领取地址领取。</label>
                    </div>-->
                    <div class="kuaidi" <?php if (empty($activity['delivery_address'])) echo 'style="display:none;"'; ?>>
                        <div class="styleAdderss" style="display: block;">
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-btn">
                                        <button type="button" class="btn btn-success getAddress">选择收货地址</button>
                                    </div>
                                    <input type="text" class="form-control" disabled="" id="select_address" value="<?php echo $activity['delivery_address']; ?>">
                                    <input type="hidden" name="address_id" id="addressId" value="0" >
                                </div>
                            </div>
                        </div>
                        <div class="styleAdderss" style="display: block;">
                            <div class="form-group">
                                <textarea class="form-control" rows="3" name="remark" placeholder="你可以在这里捎一句话给买家"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-primary save-activity">保存</button>
                        <button type="button" class="btn btn-default" onclick="window.history.back()">取消</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<script>
 var activityId = <?php echo $activity['id']; ?>;</script>
 <script type="text/javascript" charset="utf-8" src="/resources/plug/ueedit/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="/resources/plug/ueedit/ueditor.all.min.js"> </script>
<script>
   
    $(function(){
     var ue = UE.getEditor('design_intro');
     
    $('#design_kuaidi').change(function () {
        var status = $(this).is(':checked');
        if (status == true) {
            $('.styleAdderss').css('display', 'block');
        } else {
            $('.styleAdderss').css('display', 'none');
        }
    });

    $('.save-activity').click(function () {
        $.ajax({
            url: '/account/ajaxUpdateActivity/' +activityId,
            type: 'post',
            dataType: 'json',
            data: {
                name: $("input[name='name']").val(),
                description: ue.getContent(),
                delivery_type: $("#design_kuaidi").val(),
                remark: $("input[name='remark']").val(),
            },
            success: function (status) {
                popup(status.msg, false, false, null, function (modal) {
                    setTimeout(function () {
                        modal.modal('hide')
                    }, 2000);
                }, {
                    size: 'modal-lg',
                    backdrop: false
                });
            }

        });
    })
    })
</script>
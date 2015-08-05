<div class="account-nav">
    <div class="container">
        <ul class="nav nav-tabs">
            <li><a href="/Account/">活动管理</a></li>
            <li class="active"><a href="/Account/design/clipart">我的素材</a></li>
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
                <h4>我的素材</h4>
                <ul class="nav nav-pills nav-stacked">
                    <li class="active">
                        <a href="/Account/design/1">我的素材</a>
                    </li>
                    <li>
                        <a href="/Account/design/clipart">我的素材</a>
                    </li>
                    <!--
                    <li>
                        <a href="/Account/design/share">素材共享计划</a>
                    </li>
                    -->
                </ul>
            </div>
            <div class="col-sm-9 col-md-10 account-main-right">
                <div class="row">
                    <?php
                    $count = '';
                    if (isset($designs['item'][1])) {
                        $count = $designs['item'][0]['count'];
                        unset($designs['item'][0]);
                        foreach ($designs['item'] as $design) {
                            ?>
                            <div class="col-sm-4 col-xs-12">
                                <a href="/design/?DesignID=<?php echo $design['attribute']['design_id']; ?>&ActivityID=<?php echo $design['attribute']['activity_id']; ?>">
                                    <img class="img-responsive" src="<?php echo $design['attribute']['thumburl']; ?>">
                                    <h5><?php echo $design['attribute']['name']; ?></h5></a>
                                <span class="iconfont icon-delete" data-id="<?php echo $design['attribute']['design_id']; ?>"></span>
                            </div>
                        <?php }
                    } else { ?>
                        <div class="col-xs-12"><h4>您还没有设计哦</h4><a href="/design/" class="btn btn-primary">马上设计</a></div>
<?php } ?>
                </div>
                <hr>
                <nav class="pull-right">
<?php echo pageClass($count, 6, ''); ?>
                </nav>
            </div>
        </div>
    </div>
</div>
<?php ?>
<script type="text/javascript">
    $(function () {
        $('.icon-delete').click(function () {
            var $this = $(this);
            var id = $(this).attr('data-id');
            if (confirm('您确认删除吗？\n删除后将不能恢复哦.')) {
                $.ajax({
                    url: '/account/ajaxDeleteDesign/' + id,
                    dataType:'json',
                    success: function (str) {
                        $this.parents('.col-sm-4').fadeOut(300, function () {
                            if (str.status == 1) {
                                 $(this).remove();
                            }
                            popup(str.msg, false, false, {
                                size: 'modal-lg',
                                backdrop: false
                            }, function (modal) {
                                setTimeout(function () {
                                    modal.modal('hide')
                                }, 2000);
                            });
                        })
                    },
                    error: function () {
                        alert('因为网络问题登录失败，请重试！');
                        return false;
                    }
                });
            }
            return false;
        });
    })
</script>
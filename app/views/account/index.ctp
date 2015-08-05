<div class="account-nav">
    <div class="container">

        <ul class="nav nav-tabs">
            <li class="active"><a href="/Account/">活动管理</a></li>
            <li><a href="/Account/design/clipart">我的素材</a></li>
            <li><a href="/Account/order/">我的订单</a></li>
            <li><a href="/Account/moneyflow/">收支明细</a></li>
            <li class="pull-right"><a href="/Account/setting/">个人设置</a></li>
        </ul>
    </div>
</div>
<div class="account-main">
    <div class="container">
        <div class="row">
            <div class="col-sm-3 col-md-2 sidebar">
                <h4>活动管理</h4>
                <ul class="nav nav-pills nav-stacked">
                    <li class="<?php if ($status == 'create') echo 'active' ?>">
                        <a href="/Account/index/create">设计中</a>
                    </li>
                    <li class="<?php if ($status == 'ongoing') echo 'active' ?>">
                        <a href="/Account/index/ongoing">进行中</a>
                    </li>
                    <li class="<?php if ($status == 'success') echo 'active' ?>">
                        <a href="/Account/index/success">成功的</a>
                    </li>
                    <li class="<?php if ($status == 'failure') echo 'active' ?>">
                        <a href="/Account/index/failure">失败的</a>
                    </li>
                </ul>
            </div>
            <div class="col-sm-9 col-md-10 account-main-right">
                <?php
                $count = @$activities['count'];
                unset($activities['count']);
                if (is_array($activities) && isset($activities[0])) {
                    foreach ($activities as $activity) {
                        $activity = $activity['Activity'];
                        $lastDate = ceil((strtotime($activity['real_end_time']) - time()) / 86400); //60s*60min*24h 
                        ?>
                        <div class="row activity-item" id="activity-<?php echo $activity['id']; ?>">
                            <div class="col-xs-2 col-md-3 ">
                                <img src="<?php echo @$activity['image']; ?>">
                            </div>
                            <div class="col-xs-10 col-md-9 ">
                                <table width="100%">
                                    <tbody>
                                        <tr>
                                            <td colspan="2">
                                                <?php
                                                if ($activity['status'] == 'create') {
                                                    echo '<h4 class="media-heading"><a href="/design?DesignID=' . $activity['design_id'] . '&ActivityID=' . $activity['id'] . '" target="_blank">' . $activity['name'] . '</a</h4>';
                                                } else {
                                                    echo '<h4 class="media-heading"><a href="/activity/' . $activity['id'] . '" target="_blank">' . $activity['name'] . '</a</h4>';
                                                }
                                                ?>


                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <div class="progress">
                                                    <div class="progress-bar progress-bar-success" role="progressbar"
                                                         aria-valuenow="130" aria-valuemin="0" aria-valuemax="100"
                                                         style="width: <?php echo empty($activity['sales_target']) ? 0 : (($activity['sales_count'] / $activity['sales_target']) * 100) . '%'; ?>">
                                                        <span class="sr-only">20%</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="account-activity-other">
                                            <td>
                                                <div><?php echo empty($activity['real_end_time']) ? '-' : $lastDate; ?>天</div>
                                                <span>剩余时间</span>
                                            </td>
                                            <td align="right">
                                                <div><?php echo empty($activity['sales_target']) ? '-/-' : $activity['sales_count'] . '/' . $activity['sales_target']; ?></div>
                                                <span>众筹目标</span></td>
                                        </tr>
                                        <tr>
                                            <td class="account-activity-tool">
                                                <?php
                                                if ($activity['status'] == 'create') {
                                                    echo '<a class="link" href="/design?ActivityID=' . $activity['id'] . '&DesignID=' . $activity['design_id'] . '" target="_black">继续设计</a>';
                                                } else {
                                                    ?>
                                                    <?php if ($lastDate > 0) { ?>
                                                        <a class="link" href="/account/designEdit/<?php echo $activity['id'] ?>">编辑描述</a>
                                                    <?php } ?>
                                                    <?php
                                                    if ($lastDate > 0 && $activity['status'] == 'ongoing') {
                                                        $salesCount = $activity['sales_count'];
                                                        if($salesCount == 0){
                                                            $status = 'msg2';
                                                        }
                                                        if ($salesCount > 0 && $salesCount < 10) {
                                                            $status = 'msg1';
                                                        }
                                                        if ($salesCount >= 10 && $salesCount < $activity['sales_target']) {
                                                            $status = 'msg3';
                                                        }
                                                        if ($salesCount >= $activity['sales_target']) {
                                                            $status = 'msg4';
                                                        }
                                                        ?>
                                                        <a class="link close-activity" href="#" activity-id="<?php echo $activity['id'] ?>" status="<?php echo $status ?>" profie = "<?php echo @$activity['profie']; ?>" each-price = "<?php echo @$activity['eachPrice']; ?>">提前结束</a>
                                                    <?php } ?>
                                                    <a class="link copy-activity" href="#" rel="<?php echo $activity['id']; ?>">复制活动</a>
                                                    <a class="link"
                                                       href="/activity/<?php echo$activity['id']; ?>" target="_blank">讨论区</a>
                                                   <?php } ?>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <hr>
                        <?php
                    }
                } else {
                    ?>
                    <div class="row">
                        <div class="col-sm-12">
                            <h4>您还没有创建活动哦</h4><a href="/design/" class="btn btn-primary">马上创建</a>
                        </div>
                    </div>
                <?php } ?>
                <nav class="pull-right">
                    <?php echo pageClass($count, 5, ''); ?>
                </nav>
            </div>
        </div>
    </div>
</div>

<script>
    function closeActivity(aid, status) {
        status = status || "";
        $.ajax({
            url: '/account/closeActivityById/' + aid + '/' + status,
            type: 'post',
            dataType: 'json',
            success: function (status) {
                console.log(status);
                if (status.status == 1) {
                    popup('操作成功！', false, false, null, function (modal) {
                        $('#activity-' + aid).fadeOut(300, function () {
                            $(this).remove()
                        });
                        setTimeout(function () {
                            modal.modal('hide')
                        }, 2000);
                    }, {
                        size: 'modal-lg',
                        backdrop: false
                    });
                } else {
                    popup(status.msg, false, false, null, function (modal) {
                        setTimeout(function () {
                            modal.modal('hide')
                        }, 2000);
                    }, {
                        size: 'modal-lg',
                        backdrop: false
                    });
                }
            },
            error: function () {
                popup('网络故障，操作失败，请重试', false, false, null, function (modal) {
                    setTimeout(function () {
                        modal.modal('hide')
                    }, 2000);
                }, {
                    size: 'modal-lg',
                    backdrop: false
                });
            }
        });
    }
    var msg = {
        "msg1": "<ol><li>该活动还没有达到最小起订量(10件)</li><li>现在结束，所有款项将会退回给买家</li></ol><p>确定结束该活动吗？</p>",
        "msg2": "<p>确定结束该活动吗？</p>",
        "msg3": '<ol><li>该活动没有达到众筹目标(50件);</li><li>如按照当前的数量生产，加工总成本为：<span class="label label-warning">￥{{price}}</span></li><li>按照当前成本生产，您的利润为：<span class="label label-success">￥{{profie}}</span></li></ol>',
        "msg4": "<ol><li>活动结束后，买家将不能再继续购买;</li><li>活动结束后，我们会马上安排生产;</li><li>买家会在活动结束后的20个工作日之内收到商品;</li></ol><p>确定要提前结束该活动吗？</p>",
    };
    $('.close-activity').click(function () {
        var aid = $(this).attr('activity-id');
        var str=null;
        var status = $(this).attr('status');
        var profie = $(this).attr('profie');
        var eachprice = $(this).attr('each-price');
        var cancel = {show: true, className: 'btn-danger', callback: null};
        var ok = {show: true, callback: function () {
                closeActivity(aid);
            }, className: 'btn-success'};
        str = msg[status];
        if (status == "msg3") {
            str = msg[status].replace('{{price}}', eachprice).replace('{{profie}}', profie);
            cancel.text = '结束并退款';
            cancel.callback = function () {
                closeActivity(aid, 'end');
            }
            ok.callback = function () {
                closeActivity(aid, 'product');
            }
            ok.text = '结束活动 并 开始生产';
        }
        if (status == 'msg4') {
            ok.callback = function () {
                closeActivity(aid, 'product');
            }

        }
        popup('操作提示', str, {cancel: cancel, ok: ok}, {newmodal: false});
        return false;
    })

    $('.copy-activity').each(function () {
        $(this).click(function () {
            var aid = $(this).attr('rel');
            $.ajax({
                url: '/account/ajaxCopyActivity/' + aid,
                type: 'post',
                dataType: 'json',
                success: function (status) {
                    popup(status.msg, false, false, {
                        size: 'modal-lg',
                        backdrop: false
                    }, function (modal) {
                        if (status.status == 1) {
                            setTimeout(function () {
                                location.href = '/design/?ActivityID=' + status.activityId + '&DesignID=' + status.designId;
                            }, 2000);
                        }
                    }, null);
                },
                error: function () {
                    popup('网络故障，操作失败，请重试', false, false, {
                        size: 'modal-lg',
                        backdrop: false
                    }, function (modal) {
                        setTimeout(function () {
                            modal.modal('hide')
                        }, 2000);
                    }, null);
                }
            });
        })
    })
</script>
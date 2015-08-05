<div class="account-nav" xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">
    <div class="container">
        <ul class="nav nav-tabs">
            <li><a href="/Account/">活动管理</a></li>
            <li><a href="/Account/design/clipart">我的素材</a></li>
            <li><a href="/Account/order/">我的订单</a></li>
            <li class="active"><a href="/Account/moneyflow/">收支明细</a></li>
            <li class="pull-right"><a href="/Account/setting/">个人设置</a></li>
        </ul>
    </div>
</div>
<div class="account-main account-moneyflow">
    <div class="container">
        <div class="row">
            <div class="col-sm-3 col-md-2 sidebar">
                <h4>收支明细</h4>
                <ul class="nav nav-pills nav-stacked">
                    <li>
                        <a href="/Account/moneyflow/">收支明细</a>
                    </li>
                    <li class="active">
                        <a href="/Account/moneyflow/withdrawal">申请提现</a>
                    </li>
                </ul>
            </div>
            <div class="col-sm-9 col-md-10 account-main-right">
                <div class="row">
                    <div class="col-sm-7">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    账户余额：
                                </label>

                                <div class="col-sm-9">
                                    <p class="form-control-static">￥<span id="realMoney"><?php echo $money; ?></span></p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    收款账号：
                                </label>

                                <div class="col-sm-9">
                                    <p class="form-control-static"><?php echo $account; ?></p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    提现金额：
                                </label>

                                <div class="col-sm-9">
                                    <input class="form-control" type="number" id="money" min="1">
                                        <span class="text-danger"></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    手续费：
                                </label>

                                <div class="col-sm-9">
                                    <p class="form-control-static">0 元 <span
                                            class="glyphicon glyphicon-info-sign"></span></p>
                                    <div class="table-tip">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th>单笔汇款金额</th>
                                                    <th>单笔汇款手续费</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>300元以下（含300元）</td>
                                                    <td>1.5/笔</td>
                                                </tr>
                                                <tr>
                                                    <td>300元－500元（含500元）</td>
                                                    <td>3元/笔</td>
                                                </tr>
                                                <tr>
                                                    <td>500元－5000元（含5000元）</td>
                                                    <td>5元/笔</td>
                                                </tr>
                                                <tr>
                                                    <td>5000元－100000元（含100000元）</td>
                                                    <td>10元/笔</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">
                                    实际扣除金额：
                                </label>

                                <div class="col-sm-9">
                                    <p class="form-control-static"><span class="real-money">0</span> 元 <span class="label label-success">推广期间，免费手续费</span></p>
                                </div>
                            </div>
                            <div class="form-group">

                                <div class="col-sm-offset-3 col-sm-9">
                                    <button type="button" class="btn btn-primary">申请提现</button>
                                </div>

                            </div>
                        </form>
                    </div>
                    <div class="col-sm-5"></div>
                </div>


            </div>
        </div>
    </div>
</div>
<script>
    var account = '<?php echo @$account; ?>';
    /*
     var type = "";
     var charge = {
     'alipay': {
     'money': '0.15',
     'top': '25',
     'low': '2'
     },
     'wechat': {
     'money': '0.0025',
     'top': '25',
     'low': '1'
     },
     'unionpay': {
     'money': '0.3',
     'top': '50',
     'low': '2'
     }
     };
     var top_money = charge[type]['top'];
     var rate = charge[type]['money'];
     var low = charge[type]['low'];
     $('#money').blur(function () {
     var money = $(this).val();
     var hand_charge = rate * money / 100;
     console.log(hand_charge);
     if (hand_charge > top_money) {
     hand_charge = top_money;
     }
     if (hand_charge < low) {
     hand_charge = low;
     }
     console.log(hand_charge);
     })*/
    $(function () {
        if (account == '') {
            popup('您还没有设置收款账号，不能提现,马上为您跳转到账号设置页面哦', false, false, null, function (modal) {
                setTimeout(function () {
                    location.href = '/account/pay';
                }, 2000);
            }, {
                size: 'modal-lg',
                backdrop: false
            });
        }
        $(".glyphicon-info-sign").hover(function () {
            var $this = $(this);
            $('.table-tip').css({
                left: $this.position().left + 20,
                top: $this.position().top + 20
            });
            $('.table-tip').fadeIn(300);
        }, function () {
            $('.table-tip').fadeOut(300);
        })
    })


    $('#money').on('keyup', function () {
        $(this).next().text('');
        $('.real-money').text($(this).val());
    })

    /**
     * 申请提现
     * @param {type} param
     */
    $('.btn-primary').click(function () {
        if (account == '') {
            popup('您还没有设置收款账号，不能提现,马上为您跳转到账号设置页面哦', false, false, null, function (modal) {
                setTimeout(function () {
                    location.href = '/account/pay';
                }, 2000);
            }, {
                size: 'modal-lg',
                backdrop: false
            });
        }
        var money = $('#money').val();
        if (money == '') {
            $('#money').next().text('请输入提现金额');
            $('#money').focus();
            return false;
        }
        if (parseInt(money) < 1) {
            $('#money').next().text('提现的金额应该大于0');
            $('#money').focus();
            return false;
        }
        if (money ><?php echo $money; ?>) {
            $('#money').next().text('提现的金额应该小于当前金额');
            $('#money').focus();
            return false;
        }
        $.ajax({
            url: '/account/ajaxApplyForCash/' + $('#money').val(),
            type: 'post',
            dataType: 'json',
            success: function (status) {
                popup(status.msg, false, false, null, null, function (modal) {
                    setTimeout(function () {
                        modal.modal('hide')
                    }, 2000);
                });
            }
        });
    })
</script>

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
                    <li>
                        <a href="/Account/setting/">个人资料</a>
                    </li>
                    <li class="active">
                        <a href="/Account/setting/address">收货地址</a>
                    </li>
                    <!--
                    <li>
                        <a href="/Account/setting/certification">实名认证</a>
                    </li>
                    -->
                    <li>
                        <a href="/Account/setting/pay">收款账号</a>
                    </li>
                    <!--
                    <li>
                        <a href="/Account/setting/safebind">账号绑定</a>
                    </li>
                    -->
                    <?php if ($user['mobile']) {
                        ?>
                        <li>
                            <a href="/Account/setting/changpass">修改密码</a>
                        </li>
                    <?php } ?>
                </ul>
            </div>
            <div class="col-sm-9 col-md-10 account-main-right">
                <div class="row">
                    <div class="col-xs-12">
                        <a href="javascript:void(0)" class="pull-right btn btn-primary btn-sm" id="addAddress">添加新地址</a>
                        <h4>收货地址</h4>
                    </div>
                </div>
                <?php $jsonAddress = '[]';
                if ($addresses && is_array($addresses)) { ?>
                    <div class="table table-responsive">
                        <table class="table">
                            <thead>

                                <tr>
                                    <td>收货人</td>
                                    <td>街道地址</td>
                                    <td>手机</td>
                                    <td></td>
                                    <td>操作</td>
                                </tr>

                            </thead>
                            <tbody>
                                <?php
                                $jsonAddress = array();
                                foreach ($addresses as $address) {
                                    $address = $address['UserAddress'];
                                    $jsonAddress[$address['id']] = $address;
                                    ?>
                                    <tr>
                                        <td><?php echo $address['name']; ?></td>
                                        <td><?php echo $address['country'] . $address['province'] . $address['city'] . $address['county'] . $address['address']; ?></td>
                                        <td>
                                            <?php echo $address['mobile']; ?>
                                        </td>
                                        <td class="defaultAdress"><a href="/home/defaultAddress/70"><?php echo (!$address['default']) ? '' : '默认地址'; ?></a>
                                        </td>
                                        <td><a href="#" data-id="<?php echo $address['id']; ?>" class="adress_modify">修改</a><span>|</span>
                                            <a href="#" data-id="<?php echo $address['id']; ?>" class="adress_remove">删除</a></td>
                                    </tr>
                                    <?php
                                }
                                $jsonAddress = json_encode($jsonAddress);
                                ?>
                            </tbody>
                        </table>
                    </div>
                <?php } ?>
            </div>
        </div>
    </div>
</div>
<script src="/resources/public/js/region_select.js"></script>

<script type="text/javascript">
    var address = <?php echo $jsonAddress; ?>;
    $(function () {
        $("#addAddress").click(function () {
            popup('添加地址', '/Account/setting/address-edit/', {
                cancel: {
                    show: true, callback: null
                },
                ok: {
                    show: true, callback: function (m, $this) {
                        saveAddress(function () {
                            $($this).button('reset');
                        });
                        return false;
                    }
                }
            });
            return false;
        });
        $(".adress_modify").click(function () {
            var id = $(this).attr('data-id');
            $.ajax({
                url: '/Account/setting/address-edit/',
                data: eval(address[id]),
                type: 'post',
                success: function (str) {
                    popup('修改地址', str, {
                        cancel: {
                            show: true, callback: null
                        },
                        ok: {
                            show: true, callback: function (m, $this) {
                                saveAddress(function () {
                                    $($this).button('reset');
                                });
                                return false;
                            }
                        }
                    });
                },
                error: function () {
                    alert('因为网络问题登录失败，请重试！');
                    return false;
                }
            });
            return false;
        });
        $(".adress_remove").click(function () {
            var $this = $(this);
            popup('确认删除', '<h3>您确认删除该地址吗？</h3>', {
                cancel: {
                    show: true, callback: null
                },
                ok: {
                    show: true, callback: function () {
                        $.ajax({
                            url: '/account/ajaxDeleteAddress/' + $this.attr('data-id'),
                            dataType: 'json',
                            success: function (status) {
                                popup(status.msg, false, false, null, function (modal) {
                                    setTimeout(function () {
                                        modal.modal('hide');
                                        $this.parents('tr').fadeOut(300, function () {
                                            $(this).remove();
                                        })
                                    }, 2000);
                                }, {
                                    size: 'modal-lg',
                                    backdrop: false
                                });
                            }
                        })
                        return false;
                    }
                }
            });
            return false;
        });
    });

    function saveAddress(callback) {
        on_save_addr({success: function (status) {
                popup(status.msg, false, false, {
                    size: 'modal-lg',
                    backdrop: false
                }, null, function (modal) {
                    setTimeout(function () {
                        modal.modal('hide');
                        location.reload();
                    }, 2000);
                });
            }, error: function () {
                callback && callback();
            }});
    }
</script>
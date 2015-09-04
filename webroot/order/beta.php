<!DOCTYPE html>
<html lang="zh-CN">
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="Cache-Control" content="no-siteapp"/>
<meta name="renderer" content="webkit">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<title><?php echo $activity['name'];?> - 订单确认-易衫网-中国服装定制首选平台</title>
<meta name="keywords" content="定制T恤,定制T恤,T恤,T恤丝网印刷,刺绣,数码印刷,设计,定制服装"/>
<meta name="description" content="使用易衫网的T恤在线设计工具来创建您的作品.您可以上传自己的设计,或者使用我们丰富的素材库和众多的各种字体."/>
<?php include(block("block/html_head"));?>
<script src="/resources/public/js/jquery.cookie.js"></script>
<script src="/resources/public/js/region_select.js"></script>
<link rel="stylesheet" type="text/css" href="/resources/theme/order/css/order.css">
<body>
<?php include(block("block/nav_bar"));?>
<div class="page-wrapper order">
    <div class="container">
        <h4>订单确认</h4>
        <div class="visible-xs">表格看不全？请试试水平拖动</div>
        <div class="table-responsive">
            <table class="table table-hover order-list">
                <thead>
                <tr>
                    <th style="width: 60px"></th>
                    <th style="text-align: left">款式</th>
                    <th>颜色</th>
                    <th>尺码</th>
                    <th>数量</th>
                    <th>金额</th>
                    <th></th>
                </tr>
                </thead>
                <tbody id="product_list">

                </tbody>
            </table>
        </div>
        <hr>
        <div class="row">
            <div class="col-sm-12">
                <h4 style="line-height: 1.6">收货地址
                    <?php
                    $style = '';
                    if($activity['delivery_type'] == 'unity'){
                        $style = 'style="display:none"';
                    }
                    ?>

                    <button class="btn btn-sm btn-primary pull-right" onclick="show_add_addr()" <?php echo $style;?>>使用新地址</button>
                    <!--<button class="btn btn-sm btn-primary pull-right" onclick="use_wechat_addr()" id="use_wechat_addr"
                            style="display: none">使用微信地址
                    </button>-->
                </h4>
                <input type="hidden" value="" id="addr_id"/>
                <input type="hidden" value="" id="addr_province"/>

                <div class="list-group" id="addr_list_div"
                     style="display: <?php echo empty($addresses) ? 'none' : 'block' ?>">
                    <?php
                    $ii = 0;
                    $has_default = false;
                    foreach ($addresses as $address):
                        ?>
                        <label class="addr_item list-group-item">
                            <input class="addr_item_input pull-left"
                                   data-id="<?php echo $address['id'];?>"
                                   name="addressId" type="radio"
                                   onclick="sel_address(this)" <?php
                            if (count($addresses) == 1) {
                                echo ' checked';
                            } else {
                                if ($address['province'] && !$has_default) {
                                    echo ' checked';
                                    $has_default = true;
                                }
                            }
                            ?>>

                            <div style="margin-left: 25px" class="addr_area"><strong style="font-size: 14px;"><?php echo $address['name'];?></strong><span
                                    class="pull-right"><?php echo $address['mobile'];?></span>

                                <div><span
                                        class="addr_province"><?php echo $address['province'];?></span> -
                                    <?php echo $address['city'];?> -
                                    <?php echo $address['county'];?> -
                                    <?php echo $address['address'];?></div>
                            </div>


                        </label>
                        <?php
                        $ii++;
                    endforeach;
                    ?>
                </div>
                <form onsubmit="return false;" style="display: <?php echo empty($addresses) ? 'block' : 'none' ?>"
                      id="addr_detail_form">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-xs-6"><label class="control-label">姓名：</label>
                                <input id="name" class="form-control" placeholder="请输入收货人姓名"></div>
                            <div class="col-xs-6"><label class="control-label">电话：</label>
                                <input id="tel" type="tel" class="form-control" placeholder="请输入收货人电话/手机"></div>
                        </div>

                    </div>
                    <div class="form-group">
                        <label class="control-label">区域：</label>

                        <div class="row">
                            <div class="col-xs-4"><select id="province" name="province" class="form-control">
                                </select></div>
                            <div class="col-xs-4"><select id="city" name="city" class="form-control">
                                </select></div>
                            <div class="col-xs-4"><select id="area" name="area" class="form-control">
                                </select></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">详细地址：</label>
                        <input id="addr" class="form-control" placeholder="请输入详细地址">
                    </div>
                    <button class="btn btn-primary" onclick="on_save_addr_from_order(this)">保存地址</button>
                    <button class="btn btn-info" onclick="on_back_addr_list()">返回</button>
                </form>
            </div>
        </div>
        <!--    <hr>

          <div class="row">
               <div class="col-sm-12">
                   <h4><label style="display: block">
                       <input type="checkbox" id="order-plug-coupon" value="option1"> 使用优惠券
                   </label>
                   </h4>

                   <div class="row order-plug-coupon" style="display: none">
                       <div class="col-xs-12">
                           <div class="input-group">
                               <input type="text" class="form-control" id="exampleInputAmount" placeholder="请输入优惠券">

                               <div class="input-group-btn">
                                   <button class="btn btn-primary">添加</button>
                               </div>
                           </div>
                       </div>
                       <div class="col-xs-12">
                           <div class="pull-left alert alert-success" role="alert">
                               <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span
                                       aria-hidden="true">&times;</span></button>
                               AWTGSDBXCV-q35TEWGSDVZS
                           </div>
                       </div>
                   </div>
               </div>
           </div>-->
        <hr>
        <div class="row">
            <div class="col-sm-12">
                <h4>订单备注</h4>
                <textarea class="form-control" id="notes"
                          placeholder="如您有特殊要求，请在此留言(限200字)，也可拨打服务热线：400-92020-85。" maxlength="200"></textarea>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-sm-12">
                <h4>订单总计</h4>
            </div>

            <div class="col-sm-6 col-xs-12">
                <div class="row order-total">
                    <div class="col-xs-12">
                        <div>总计：<span><span style="display: inline-block;width: 100px">￥<b id="total_amount"></b></span></span>
                        </div>
                        <div style="display: none">优惠：<span><span style="display: inline-block;width: 100px">￥<b id="">19.00</b></span></span>
                        </div>
                        <div>快递：<span><span style="display: inline-block;width: 100px">￥<b
                                        id="total_express"></b></span></span></div>
                        <div>实付：<span><span style="display: inline-block;width: 100px">￥<b
                                        id="total_pay"></b></span></span></div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-xs-12">
                <h5>小提示</h5>
                <ol>
                    <li>该活动必须在<span class="label label-warning"><?php echo $activity['end_time'];?></span>之前，达到最小起订量10件。</li>
                    <li>未达到众筹目标，但超过最小起订量的活动，由发起人决定是否生产。</li>
                    <li>众筹失败的活动，系统将会把您支付的预订款退到您在易衫网的<b>账户余额</b>中。</li>
                    <li>您随时可以将账户余额中的款项申请提现到您的支付宝、微信或银行账户。</li>
                </ol>
            </div>
        </div>

        <hr>
        <div class="row order-pay">
            <div class="col-xs-12">
                <button class="btn btn-lg btn-danger btn-buy-alipay" onclick="do_pay(this,'alipay')"
                        style="display: none"><span
                        class="iconfont icon-alipay"></span> 支付宝支付
                </button>
                <button class="btn btn-lg btn-danger btn-buy-wechat" onclick="do_pay(this,'wechat')"
                        style="display: none"><span
                        class="iconfont icon-iconfontweixin"></span> 微信支付
                </button>
            </div>
        </div>
    </div>
</div>
<?php include(block("block/page_footer"));?>
<script>
    var EASYTEE_API = '';
    var act_id = '<?php echo $act_id;?>';
    var delivery_type = '<?php echo $activity['delivery_type'];?>';
    var express_area_price = <?php echo json_encode($express_area_price)?>;
</script>
<script src="/resources/theme/order/js/order.js"></script>
</body>
</html>
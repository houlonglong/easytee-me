<!DOCTYPE html>
<html lang="zh-CN">
<?php echo $this->element('site-header'); ?>
<script src="/resources/public/js/jquery.cookie.js"></script>
<script src="/resources/public/js/region_select.js"></script>

<link rel="stylesheet" type="text/css" href="/resources/theme/order/css/order.css">
<body>
<?php echo $this->element('page-header'); ?>
<div class="page-wrapper order order-complete">
    <div class="container">
        <div class="col-xs-12">

                <h3>尊敬的<strong><?php echo $user['nickname']?></strong>：</h3>
                <p>您已成功预购，请牢记以下信息:</p>
                <div>
                    <h4>订单信息：</h4>
                    <ul class="bg-info">
                        <li><p><span class="label label-info" style="margin-right: 10px">活动名称</span><?php echo $order['Order']['name']?></p></li>
                        <li><p><span class="label label-info" style="margin-right: 10px">订单编号</span><?php echo $order['Order']['order_no']?></p></li>
                        <li><p><span class="label label-info" style="margin-right: 10px">订单总额</span>￥<?php echo $order['Order']['total_price'] + $order['Order']['express_price']?>元</p></li>
                    </ul>
                    <h4>商品列表：</h4>
                    <?php foreach($order['OrderGoods'] as $goods):?>

                    <div class="media bg-info">
                        <div class="media-left">
                            <a href="#">
                                <img style="width: 60xp;height:60px;" class="media-object" src="<?php echo $goods['img_path'];?>">
                            </a>
                        </div>
                        <div class="media-body">
                            <h4 class="media-heading"><?php echo $goods['product_name'];?></h4>
                            <span style="margin-left: 10px">颜色：<?php echo $goods['product_style_name'];?></span> <span style="margin-left: 10px">尺码：<?php echo $goods['size'];?></span> <span style="margin-left: 10px">数量：<?php echo $goods['quantity'];?></span>
                        </div>
                    </div>
                    <?php endforeach ?>

                    <h4>物流信息：</h4>
                    <ul class="bg-info">
                        <li><p><span class="label label-primary" style="margin-right: 10px">收&nbsp; 货&nbsp; 人</span><?php echo $order['Order']['ship_name']?></p></li>
                        <li><p><span class="label label-primary text-justify" style="margin-right: 10px">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话</span><?php echo $order['Order']['ship_mobile']?></p></li>
                        <li><p><span class="label label-primary" style="margin-right: 10px">收货地址</span><?php echo $order['Order']['ship_province']." - ".$order['Order']['ship_city']." - ".$order['Order']['ship_area']." - ".$order['Order']['ship_addr']?></p></li>
                    </ul>
                </div>
                <p>商品将会在活动结束后的10个工作日内发出，请耐心等待，届时我们会通过免费短信的方式通知您。</p>
                <p>非常感谢您的信赖，如有任何疑问，请联系我们，客服电话：<a href="tel:4009202085">4009202085</a></p>
                <p align="center" id="addfriend"><img style="width: 200px;display: block;margin: 10px auto" src="/resources/public/image/qrcode.jpg"/>关注官方微信，随时获取帮助</p>
                <p class="text-center"><button onclick="location.href='/account/order/<?php echo $order['Order']['id']?>'" type="button" class="btn btn-success btn-large">朕知道了</button></p>


        </div>

    </div>
</div>
<?php echo $this->element('site-footer'); ?>
</body>
</html>

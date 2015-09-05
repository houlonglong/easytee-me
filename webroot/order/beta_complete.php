<?php
$order_id = $_GET['order_id'];
$order = PtLib\db_select_row("select o.*,u.nick_name from orders as o left join users as u on u.id = o.uid where o.id = ?",$order_id);
?>
<!DOCTYPE html>
<html lang="zh-CN">
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="Cache-Control" content="no-siteapp"/>
<meta name="renderer" content="webkit">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<title>订单支付成功-易衫网-中国服装定制首选平台</title>
<meta name="keywords" content="定制T恤,定制T恤,T恤,T恤丝网印刷,刺绣,数码印刷,设计,定制服装"/>
<meta name="description" content="使用易衫网的T恤在线设计工具来创建您的作品.您可以上传自己的设计,或者使用我们丰富的素材库和众多的各种字体."/>
<?php include(block("block/html_head"));?>
<link rel="stylesheet" type="text/css" href="/resources/theme/order/css/order.css">
<body>
<?php include(block("block/nav_bar"));?>

<div class="page-wrapper order order-complete">
    <div class="container">
        <div class="col-xs-12">

            <h3>尊敬的<strong><?php echo $order['nick_name']?></strong>：</h3>
            <p>您已成功预购，请牢记以下信息:</p>
            <div>
                <h4>订单信息：</h4>
                <ul class="bg-info">
                    <li><p><span class="label label-info" style="margin-right: 10px">订单编号</span><?php echo $order['order_no']?></p></li>
                    <li><p><span class="label label-info" style="margin-right: 10px">订单总额</span>￥<?php echo $order['total_price'] + $order['express_price']?>元</p></li>
                </ul>

                <h4>物流信息：</h4>
                <ul class="bg-info">
                    <li><p><span class="label label-primary" style="margin-right: 10px">收&nbsp; 货&nbsp; 人</span><?php echo $order['ship_name']?></p></li>
                    <li><p><span class="label label-primary text-justify" style="margin-right: 10px">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话</span><?php echo $order['ship_mobile']?></p></li>
                    <li><p><span class="label label-primary" style="margin-right: 10px">收货地址</span><?php echo $order['ship_province']." - ".$order['ship_city']." - ".$order['ship_area']." - ".$order['ship_addr']?></p></li>
                </ul>
            </div>
            <p>商品将会在活动结束后的10个工作日内发出，请耐心等待，届时我们会通过免费短信的方式通知您。</p>
            <p>非常感谢您的信赖，如有任何疑问，请联系我们，客服电话：<a href="tel:4009202085">4009202085</a></p>
            <p align="center" id="addfriend"><img style="width: 200px;display: block;margin: 10px auto" src="/resources/public/image/qrcode.jpg"/>关注官方微信，随时获取帮助</p>
            <p class="text-center"><button onclick="location.href='/user/order/detail?id=<?php echo $order['id']?>'" type="button" class="btn btn-success btn-large">订单详情</button></p>


        </div>

    </div>
</div>
<?php include(block("block/page_footer"));?>
</body>
</html>


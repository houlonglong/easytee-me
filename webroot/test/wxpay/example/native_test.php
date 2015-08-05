<?php
$notify = new Service\Wechat\Pay\Nativeapi();
$url = $notify->build_get_wcpay_qrcode_url("http://demo.ptphp.com/wxpay/example/notify_test",array(
    "body"=>"body",
    "order_no"=>time().time(),
    "price"=>0.01
),1);
echo $url;
$data = urlencode($url);
echo "<img src='/tools/qrcode?action=get&data=$data'>";
<?php
$api = new Service\Alipay\Api();
$url = $api->build_alipay_requery_url(array(
    "order_no"=>time(),
    "name"=>"name",
    "body"=>"body",
    "price"=>0.01,
));
echo '<a href="'.$url.'" target="_blank">test</a><hr>';
echo "<textarea style='width: 800px;height: 100px'>$url</textarea>";

<?php
$order_no = time();
$subject = '测试alipay';
$body = '222';
$price = 0.01;
$url =  Model_Order_Pay_Alipay::build_alipay_requery_url($order_no,$subject,$body,$price);

echo '<a href="'.$url.'" target="_blank">test</a><hr>';
echo "<textarea style='width: 800px;height: 100px'>$url</textarea>";

?>                                                                                                                                                                                                                                                                                                         
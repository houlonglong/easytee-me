<?php
$order_id = $_GET['order_id'];
$pay_type = $_GET['pay_type'];

$order = PtLib\db_select_row("select * from orders where id = ?",$order_id);
$price = $order['express_price'] + $order['total_price'];
if(PtApp::$ENV != "product"){
    $price = 0.01;
}

if($pay_type == "alipay"){
    $url = Model_Order_Pay_Alipay::build_alipay_requery_url($order['order_no'],$order['name'],$order['body'],$price);
    pt_debug($url);
    \PtLib\location($url);
}else{
    $price = $price*100;
    $js_param = Model_Order_Pay_Wechat::build_js_param($order['order_no'],$order['body'],$price);
    pt_debug($js_param);
    $redirect_url = "/order/beta_complete?order_id=".$order['id'];
    $cancel_redirect_url = "/order/beta?act_id=".$order['activity_id'];
}
?><html>
<head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>微信支付</title>
    <script type="text/javascript">
        //调用微信JS api 支付
        function jsApiCall()
        {
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest',
                <?php echo $js_param; ?>,
                function(res){
                    if(res.err_msg == 'get_brand_wcpay_request:ok'){
                        window.location.href = "<?php echo $redirect_url; ?>,";
                    }else if(res.err_msg == 'get_brand_wcpay_request:cancel' ||
                        res.err_msg == 'get_brand_wcpay_request:fail'){
                        window.location.href = "<?php echo $cancel_redirect_url; ?>,";
                    }
                }
            );
        }

        function callpay()
        {
            if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                    document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                }
            }else{
                jsApiCall();
            }
        }
    </script>
</head>
<body  onload="callpay()">

</body>
</html>

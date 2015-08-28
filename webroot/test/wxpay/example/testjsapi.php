<?php
$order_no = WxPayConfig::MCHID . date("YmdHis");
$body = 'test';
$price = 1;
$jsApiParameters = Model_Order_Pay_Wechat::build_js_param($order_no,$body,$price);
?>
<html>
<head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>微信支付样例-支付</title>
    <script type="text/javascript">
        //调用微信JS api 支付
        function jsApiCall()
        {
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest',
                <?php echo $jsApiParameters; ?>,
                function(res){
                    //WeixinJSBridge.log(res.err_msg);
//                    alert(res.err_code+res.err_desc+res.err_msg);
                    if(res.err_msg == 'get_brand_wcpay_request:ok'){
                        //支付成功
                        //alert("支付成功");
                        // $redirect_url 支付成功跳转页面url
                        window.location.href = "<?php echo $redirect_url; ?>,";
                    }else if(res.err_msg == 'get_brand_wcpay_request:cancel' ||
                        res.err_msg == 'get_brand_wcpay_request:fail'){
                        // $cancel_redirect_url 支付失败跳转页面url
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
<body>
<br/>
<font color="#9ACD32"><b>该笔订单支付金额为<span style="color:#f00;font-size:50px">1分</span>钱</b></font><br/><br/>
<div align="center">
    <button style="width:210px; height:50px; border-radius: 15px;background-color:#FE6714; border:0px #FE6714 solid; cursor: pointer;  color:white;  font-size:16px;" type="button" onclick="callpay()" >立即支付</button>
</div>
</body>
</html>
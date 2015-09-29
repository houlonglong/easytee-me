<html>
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

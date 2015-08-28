<?php

/**
 * 支付宝支付
 */
class Model_Order_Pay_Alipay extends BaseModel
{
    static $table = "";

    function __construct()
    {
        //parent::__construct();
    }

    /**
     * 构造支付宝请求支付url
     * @param  $info
     * @return string
     */
    static function build_alipay_requery_url($order_no, $subject, $body, $price)
    {
        $settings = PtApp::$setting['alipay'];
        require_once(PATH_LIBS . "/alipay/lib/alipay_submit.class.php");
        $parameter = array(
            "service" => "create_direct_pay_by_user",
            "partner" => $settings['partner'],
            "payment_type" => 1,
            "notify_url" => 'http://' . $_SERVER['HTTP_HOST'] . $settings['notify_url'],
            "return_url" => 'http://' . $_SERVER['HTTP_HOST'] . $settings['return_url'],
            "seller_email" => $settings['seller_email'],
            "out_trade_no" => $order_no,
            "subject" => $subject,
            "total_fee" => $price,
            "body" => $body,
            "show_url" => "",
            "anti_phishing_key" => "",
            "exter_invoke_ip" => "",
            "_input_charset" => $settings['input_charset']
        );
        //pt_log(ALIPAY_CALLBACK_NOTIFY);
        //pt_log(ALIPAY_CALLBACK_RETURN);
        $alipay_config['partner'] = $settings['partner'];
        $alipay_config['key'] = $settings['key'];
        $alipay_config['sign_type'] = $settings['sign_type'];
        $alipay_config['input_charset'] = $settings['input_charset'];
        $alipay_config['cacert'] = "";
        $alipay_config['transport'] = 'http';
        //建立请求
        $alipaySubmit = new AlipaySubmit($alipay_config);
        $para = $alipaySubmit->buildRequestPara($parameter);
        $url = $alipaySubmit->alipay_gateway_new;
        while (list ($key, $val) = each($para)) {
            $url .= $key . "=" . urlencode($val) . "&";
        }
        $url = substr($url, 0, -1);
        return $url;
    }

    static function return_callback()
    {
        $settings = PtApp::$setting['alipay'];
        require_once(PATH_LIBS . "/alipay/lib/alipay_notify.class.php");
        $alipay_config['partner'] = $settings['partner'];
        $alipay_config['key'] = $settings['key'];
        $alipay_config['sign_type'] = $settings['sign_type'];
        $alipay_config['input_charset'] = $settings['input_charset'];
        $alipay_config['cacert'] = "";
        $alipay_config['transport'] = 'http';

        $alipay = new AlipayNotify($alipay_config);
        $result = $alipay->verifyReturn();
        if ($result) {
            return array(
                "order_no" => $_GET['out_trade_no'], //商户订单号
                "price" => $_GET['total_fee'],
                "trade_no" => $_GET['trade_no'], //支付宝交易号
                'trade_status' => $_GET['trade_status'], // TRADE_FINISHED|TRADE_SUCCESS
            );
        } else {
            return false;
        }

    }

    static function notify()
    {
        $settings = PtApp::$setting['alipay'];
        require_once(PATH_LIBS . "/alipay/lib/alipay_notify.class.php");
        $alipay_config['partner'] = $settings['partner'];
        $alipay_config['key'] = $settings['key'];
        $alipay_config['sign_type'] = $settings['sign_type'];
        $alipay_config['input_charset'] = $settings['input_charset'];
        $alipay_config['cacert'] = "";
        $alipay_config['transport'] = 'http';
        //计算得出通知验证结果
        $alipayNotify = new AlipayNotify($alipay_config);
        $verify_result = $alipayNotify->verifyNotify();
        if ($verify_result) {//验证成功
            $out_trade_no = $_POST['out_trade_no'];
            //支付宝交易号
            $trade_no = $_POST['trade_no'];
            //交易状态
            $trade_status = $_POST['trade_status'];
            if ($_POST['trade_status'] == 'TRADE_FINISHED') {
                //判断该笔订单是否在商户网站中已经做过处理
                //如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
                //如果有做过处理，不执行商户的业务程序

                //注意：
                //该种交易状态只在两种情况下出现
                //1、开通了普通即时到账，买家付款成功后。
                //2、开通了高级即时到账，从该笔交易成功时间算起，过了签约时的可退款时限（如：三个月以内可退款、一年以内可退款等）后。
            } else if ($_POST['trade_status'] == 'TRADE_SUCCESS') {
                //判断该笔订单是否在商户网站中已经做过处理
                //如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
                //如果有做过处理，不执行商户的业务程序

                //注意：
                //该种交易状态只在一种情况下出现——开通了高级即时到账，买家付款成功后。
            }
            return array(
                "order_no" => $out_trade_no, //商户订单号
                "price" => $_POST['total_fee'],
                "trade_no" => $trade_no, //支付宝交易号
                'trade_status' => $trade_status, // TRADE_FINISHED|TRADE_SUCCESS
            );
        } else {//验证失败
            //echo "fail";
            return false;
        }
    }

    /**
     * 支付宝回调方法 return|notify
     * @param $is_notify 1|notify 0|return
     * @throws Exception
     */
    static function handler_callback($is_notify)
    {
        if ($is_notify) {
            $result = self::notify();
            if (in_array($result['trade_status'], array('TRADE_FINISHED', 'TRADE_SUCCESS'))) {
                Model_Order_Pay::success($result['order_no'], $result['trade_no'], $result['price'], 'alipay',$is_notify);
                echo 'success';
                exit;
            } else {
                echo "fail";
                exit;
            }
        } else {
            $result = self::return_callback();
            if (in_array($result['trade_status'], array('TRADE_FINISHED', 'TRADE_SUCCESS'))) {
                Model_Order_Pay::success($result['order_no'], $result['trade_no'], $result['price'], 'alipay',$is_notify);
            } else {
                throw new Exception('验证签名不正确');
            }
        }
    }
}
<?php
/**
 * Created by PhpStorm.
 * User: joseph
 * Date: 6/17/15
 * Time: 2:29 PM
 */
require_once(__DIR__."/lib/alipay_submit.class.php");
require_once(__DIR__."/lib/alipay_notify.class.php");

class AlipayService {
    /**
     * 构造支付宝请求支付url
     * @param  $info
     * @return string
     */
    function build_alipay_requery_url($info){
        $parameter = array(
            "service" => "create_direct_pay_by_user",
            "partner" => ALIPAY_PARTNER,
            "payment_type"	=> 1,
            "notify_url"	=> ALIPAY_CALLBACK_NOTIFY,
            "return_url"	=> ALIPAY_CALLBACK_RETURN,
            "seller_email"	=> ALIPAY_SELLER_EMAIL,
            "out_trade_no"	=> $info['orderno'],
            "subject"	=> $info['subject'],
            "total_fee"	=> $info['price'],
            "body"	=> $info['body'],
            "show_url"	=> "",
            "anti_phishing_key"	=> "",
            "exter_invoke_ip"	=> "",
            "_input_charset"	=> ALIPAY_INPUT_CHARSET
        );
        $alipay_config['partner']		= ALIPAY_PARTNER;
        $alipay_config['key']			= ALIPAY_KEY;
        $alipay_config['sign_type']    = strtoupper('MD5');
        $alipay_config['input_charset']= strtolower('utf-8');
        $alipay_config['cacert']    = "";
        $alipay_config['transport']    = 'http';
        //建立请求
        $alipaySubmit = new AlipaySubmit($alipay_config);
        $para = $alipaySubmit->buildRequestPara($parameter);
        $query = $alipaySubmit->alipay_gateway_new;
        while (list ($key, $val) = each ($para)) {
            $query.= $key."=".urlencode($val)."&";
        }
        $query = substr($query,0,-1);
        return $query;
    }

    function return_callback(){
        $alipay_config['partner']		= ALIPAY_PARTNER;
        $alipay_config['key']			= ALIPAY_KEY;
        $alipay_config['sign_type']    = strtoupper('MD5');
        $alipay_config['input_charset']= strtolower('utf-8');
        $alipay_config['cacert']    = "";
        $alipay_config['transport']    = 'http';
        $alipay = new AlipayNotify($alipay_config);
        $result = $alipay->verifyReturn();
        if($result){
            return array(
                "orderno"=>$_GET['out_trade_no'],
                "price"=>$_GET['total_fee'],
                "trade_no"=>$_GET['trade_no'],
            );
        }else{
            return false;
        }

    }
    function notify_callback(){

    }

}
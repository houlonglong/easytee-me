<?php
/**
 * Created by PhpStorm.
 * User: joseph
 * Date: 6/17/15
 * Time: 2:29 PM
 */

require_once APP . "/libs/wechat/payment/WxPayPubHelper.php";
require_once APP . "/config/wechat_pay.php";

class WcpayService {
    var $jsApi;
    function __construct(){
        $this->jsApi = new JsApi_pub();
    }
    /**
     * 枸造请求微信Authorization code url
     * @param  $return_url
     * @return string
     */
    function build_get_wcpay_code_url($return_url){
        $url = $this->jsApi->createOauthUrlForCode(urlencode($return_url));
        return $url;
    }
    function build_get_wcpay_qrcode_url($notify_url,$order_info){
        require_once APP . "/libs/wechat/WxPay.NativePay.php";
        $input = new WxPayUnifiedOrder();
        $input->SetBody($order_info['body']);
        //$input->SetAttach("test");
        //$order_info['order_no'] =  WxPayConfig::MCHID.date("YmdHis");
        $input->SetOut_trade_no($order_info['order_no']);
        $input->SetTotal_fee($order_info['price']*100);
        $input->SetTime_start(date("YmdHis"));
        $input->SetTime_expire(date("YmdHis", time() + 600));
        //$input->SetGoods_tag("test");
        $input->SetNotify_url($notify_url);
        $input->SetTrade_type("NATIVE");
        $input->SetProduct_id($order_info['activity_id']);
        $notify = new NativePay();
        $result = $notify->GetPayUrl($input);
        if(!empty($result['result_code']) && $result['result_code'] == 'FAIL'){
            throw new EtException($result['err_code_des']);
        }
        if(!empty($result["code_url"])){
            $url = $result["code_url"];
        }else{
            throw new EtException("未知错误");
        }
        pt_log($url);
        return $url;
    }
    function get_return_url($url,$query = array()){
        $q = "";
        if(!empty($query)) {
            $q .= "?".http_build_query($query);
        }
        $url = $url. $q;
        return $url;
    }
    function get_openid_by_code($code){
        $this->jsApi->setCode($code);
        return $this->jsApi->getOpenId();
    }

    function format_js_api_param($openId,$order_info,$notify_url){
        //使用统一支付接口
        $unifiedOrder = new UnifiedOrder_pub();
        //设置统一支付接口参数
        //设置必填参数
        $unifiedOrder->setParameter("openid", $openId);
        $unifiedOrder->setParameter("body", $order_info['body']); //商品描述
        $unifiedOrder->setParameter("out_trade_no", $order_info['order_no']); //商户订单号
        $unifiedOrder->setParameter("total_fee", $order_info['price']); //总金额，单价分
        $unifiedOrder->setParameter("notify_url", $notify_url); //通知地址
        $unifiedOrder->setParameter("trade_type", "JSAPI"); //交易类型
        $prepay_id = $unifiedOrder->getPrepayId();
        pt_log($prepay_id);
        $this->jsApi->setPrepayId($prepay_id);
        return $this->jsApi->getParameters();
    }


}
<?php
namespace Service\Wechat\Pay;
require_once APP . "/libs/wechat/WxPay.NativePay.php";
use WxPayUnifiedOrder;
use NativePay;
use Exception;

class Nativeapi{
    /**
     * 生成微信支付二维码所需URL 如:weixin://wxpay/bizpayurl?pr=FtBh818
     * @param $notify_url
     * @param $order_info
     * @return mixed
     * @throws Exception
     */
    function build_get_wcpay_qrcode_url($notify_url,$order_info,$product_id = ''){
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
        $input->SetProduct_id($product_id);
        $notify = new NativePay();
        $result = $notify->GetPayUrl($input);
        if(!empty($result['result_code']) && $result['result_code'] == 'FAIL'){
            throw new Exception($result['err_code_des']);
        }
        if(!empty($result["code_url"])){
            $url = $result["code_url"];
        }else{
            throw new Exception("未知错误");
        }
        pt_log($url);
        return $url;
    }
}
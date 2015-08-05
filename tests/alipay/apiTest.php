<?php
namespace Service\Alipay;
use PtLib\UnitTest as UnitTest;
class ApiTest extends UnitTest {

    /**
     * 构造支付宝请求支付url
     * @param  $info
     * @return string
     */
    function test_build_alipay_requery_url(){
        $api = new Api();
        $url = $api->build_alipay_requery_url(array(
            "order_no"=>time(),
            "name"=>"name",
            "body"=>"body",
            "price"=>0.01,
        ));
        $this->assertContains("https://",$url);
        pt_log($url);
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
        pt_log($result);
        if($result){
            return array(
                "order_no" => $_GET['out_trade_no'], //商户订单号
                "price"    => $_GET['total_fee'],
                "trade_no" => $_GET['trade_no'], //支付宝交易号
                'trade_status'=> $_GET['trade_status'], // TRADE_FINISHED|TRADE_SUCCESS
            );
        }else{
            return false;
        }

    }
    function notify_callback(){
        $alipay_config['partner']		= ALIPAY_PARTNER;
        $alipay_config['key']			= ALIPAY_KEY;
        $alipay_config['sign_type']    = strtoupper('MD5');
        $alipay_config['input_charset']= strtolower('utf-8');
        $alipay_config['cacert']    = "";
        $alipay_config['transport']    = 'http';
        //计算得出通知验证结果
        $alipayNotify = new AlipayNotify($alipay_config);
        $verify_result = $alipayNotify->verifyNotify();

        if($verify_result) {//验证成功
            $out_trade_no = $_POST['out_trade_no'];
            //支付宝交易号
            $trade_no = $_POST['trade_no'];
            //交易状态
            $trade_status = $_POST['trade_status'];

            if($_POST['trade_status'] == 'TRADE_FINISHED') {
                //判断该笔订单是否在商户网站中已经做过处理
                //如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
                //如果有做过处理，不执行商户的业务程序

                //注意：
                //该种交易状态只在两种情况下出现
                //1、开通了普通即时到账，买家付款成功后。
                //2、开通了高级即时到账，从该笔交易成功时间算起，过了签约时的可退款时限（如：三个月以内可退款、一年以内可退款等）后。
                pt_log("$out_trade_no:TRADE_FINISHED");
            }
            else if ($_POST['trade_status'] == 'TRADE_SUCCESS') {
                //判断该笔订单是否在商户网站中已经做过处理
                //如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
                //如果有做过处理，不执行商户的业务程序

                //注意：
                //该种交易状态只在一种情况下出现——开通了高级即时到账，买家付款成功后。
                pt_log("$out_trade_no:TRADE_SUCCESS");
            }
            return array(
                "order_no" => $out_trade_no, //商户订单号
                "price"    => $_POST['total_fee'],
                "trade_no" => $trade_no, //支付宝交易号
                'trade_status'=> $trade_status, // TRADE_FINISHED|TRADE_SUCCESS
            );
            //echo "success";
        }
        else {//验证失败
            //echo "fail";
            pt_log("alipay notify fail");
            return false;
        }

    }

}
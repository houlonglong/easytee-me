<?php
use PtLib\UnitTest as UnitTest;
/**
 * 支付宝支付
 *
 */
class AlipayTest extends UnitTest{
    /**
     *
     */
    function test_cli_test(){
        $order_no = '12345567894963';
        $subject = '测试alipay';
        $body = '222';
        $price = 0.01;
        echo Model_Order_Pay_Alipay::build_alipay_requery_url($order_no,$subject,$body,$price);
    }


    /**
     *
     *
    function test_action_test(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));

        //$this->test_host = "2.dev.jzw.com";
        $this->set_local_test_proxy();
        $res = $this->post_action("/api",array(
            "model"=>"test",
            "action"=>"test",
            "username"=>"test",
            "password"=>md5("test"),
        ));
    }
     */
}
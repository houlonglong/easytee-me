<?php
use PtLib\UnitTest as UnitTest;
/**
 * 支付
 *
 */
class PayTest extends UnitTest{

    function test_update_pay_success(){
        $order_id = 466;
        $pay_type =  "alipay";
        $pay_price = 10.2;
        $pay_no = "1111111111111";
        Model_Order_Pay::update_pay_success($order_id,$pay_type,$pay_price,$pay_no);
    }
    function test_view_order_pay(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));

        //$this->test_host = "2.dev.jzw.com";
        $this->set_local_test_proxy();
        $res = $this->post_action("/order/pay/confirm",array(
            "order_no"=>"15092917031683445",
            "pay_type"=>"alipay",
        ));

        print_r($res);
    }
}
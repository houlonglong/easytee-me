<?php
use PtLib\UnitTest as UnitTest;
/**
 * 支付
 *
 */
class PayTest extends UnitTest{
    function test_save(){
        Model_Order_Pay::save(111,0,111,0);
    }

    function test_update_pay_success(){
        Model_Order_Pay::update_pay_success(111,1,11.1,"ssss");
    }

    /**
     *
     *
    function test_cli_test(){
        $this->cli("deamon/task","run");
    }
     */

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
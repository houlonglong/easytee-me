<?php
use PtLib\UnitTest as UnitTest;
/**
 * 用户注册
 *
 */
class ForgetpassTest extends UnitTest{

    function test_action_do_forgetpass(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));

        //$this->test_host = "2.dev.jzw.com";
        $this->set_local_test_proxy();
        $res = $this->post_action("/api",array(
            "model"=>"user/forgetpass",
            "action"=>"do_forgetpass",
            "mobile"=>"13564898513",
            "password"=>sha1("111111"),
            "captcha"=>'610569',
            "verify_password" => sha1("111111")
        ));
    }
    function test_action_get_code(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));

        //$this->test_host = "2.dev.jzw.com";
        $this->set_local_test_proxy();
        $res = $this->post_action("/api",array(
            "model"=>"user/forgetpass",
            "action"=>"get_code",
            "mobile"=>"13564898513",
        ));

    }


}
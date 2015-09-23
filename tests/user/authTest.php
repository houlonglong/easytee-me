<?php
use PtLib\UnitTest as UnitTest;
/**
 *
 *
 */
class AuthTest extends UnitTest{
    /**
     * 登陆
     */
    function test_actin_login(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));
        $this->set_local_test_proxy();
        $res = $this->post_action("api",array(
            "model"=>"user/auth",
            "action"=>"login",
            "mobile"=>"18601628931",
            "password"=>"111111",
        ));
    }

    /**
     * 退出
     */
    function test_actin_loginout(){
        $this->set_http_opt(array(
            "debug"=>1,
            "header"=>0,
            "cookie"=>1,
        ));

        $this->set_local_test_proxy();
        $res = $this->get_action("api",array(
            "model"=>"user/auth",
            "action"=>"logout"
        ));
        var_dump($res);
    }
    /**
     * 帐户设置
     */
    function test_actin_account_setting(){
        $this->set_http_opt(array(
            "debug"=>1,
            "header"=>0,
            "cookie"=>0,
        ));

        $this->set_local_test_proxy();
        $res = $this->get_action("/design");
        $this->assertContains('<a href="/login/loginout">注销</a>',$res,"用户没有登陆");
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
        $res = $this->post_action("/auth/login?action=do_login",array(
            "username"=>"test",
            "password"=>md5("test"),
        ));
    }
     */
}
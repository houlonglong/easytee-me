<?php
/**
 * 管理认证
 *
 */
class AuthTest extends PtLib\UnitTest {
    /**
     *
     *
    function test_cli_test(){
        $this->cli("deamon/task","run");
    }
     */

    /**
     *
     */
    function test_action_login(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>1,
        ));
        $this->test_host = "2.dev.jzw.com";
        $this->set_local_test_proxy();
        $res = $this->post_action("/api",array(
            "model"=>"admin/auth",
            "action"=>"login",
            "captcha"=>"captcha",
            "username"=>"admin",
            "password"=>"admin8888",
        ));
        $res = json_decode($res,1);
        print_r($res);
    }



}
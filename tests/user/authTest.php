<?php
use PtLib\UnitTest as UnitTest;
/**
 *
 *
 */
class AuthTest extends UnitTest{
    /**
     *
     */
    function test_actin_do_login(){
        $this->set_http_opt(array(
            "debug"=>1,
            "header"=>0,
            "cookie"=>0,
        ));
        $res = $this->post_action("/user/auth?action=do_login",array(
            "username"=>"test",
            "password"=>md5("test"),
        ));
        //var_dump($res);
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
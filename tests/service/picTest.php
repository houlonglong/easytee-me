<?php
use PtLib\UnitTest as UnitTest;
/**
 * 图片服务
 *
 */
class PicTest extends UnitTest{
    /**
     *
     *
     */
    function test_cli_test(){
        $this->cli("service/pic","run");
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
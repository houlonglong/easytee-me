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
            "cookie"=>0,
        ));
        $res = $this->post_action("/admin/auth?action=login",array(
            "username"=>"test",
            "password"=>md5("test"),
        ));
    }

}
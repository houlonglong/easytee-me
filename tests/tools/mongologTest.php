<?php
use PtLib\UnitTest as UnitTest;
/**
 * Mongo日志
 *
 */
class MongologTest extends UnitTest{
    /**
     *
     */
    function test_action_push(){
        $this->set_test_host("dev.ptphp.com");
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));
        //$res = $this->post_action("/tools/mongolog?action=push",
        //    json_encode(array(2)));
        m_log("test","msg");
        //sock_send("dev.ptphp.com/tools/mongolog?action=push",array("t"=>2));
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
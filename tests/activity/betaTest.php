<?php
use PtLib\UnitTest as UnitTest;
/**
 * 活动beta
 *
 */
class BetaTest extends UnitTest{

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
    function test_action_test(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));

        //$this->test_host = "2.dev.jzw.com";
        $this->set_local_test_proxy();
        $res = $this->post_action("/api",array(
            "model"=>"activity",
            "action"=>"detail",
            "username"=>"test",
            "password"=>md5("test"),
        ));
    }

}
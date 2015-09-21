<?php
use PtLib\UnitTest as UnitTest;
/**
 * 活动
 *
 */
class ActivityTest extends UnitTest{
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
        $this->test_host = "11.dev.jzw.com";
        //$this->set_local_test_proxy();
        //$res = $this->post_action("/login/",array(
        //    "username"=>18601628937,
        //    "password"=>"111111",
        //));

        $this->set_local_test_proxy();
        $res = $this->get_action("/Account/closeActivityById/3903/end");
        echo($res);
    }

}
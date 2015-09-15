<?php
use PtLib\UnitTest as UnitTest;
/**
 * 数据库迁移
 *
 */
class Merge1Test extends UnitTest{
    /**
     *
     */
    function test_cli_test(){
        $this->cli("tools/db/merge1","run","","local");
    }
    function test_cli_test1(){
        $this->cli("tools/db/merge1","run1","","local");
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
<?php
use PtLib\UnitTest as UnitTest;
/**
 * 设计
 *
 */
class DesignTest extends UnitTest{
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
            "debug"=>1,
            "header"=>1,
            "cookie"=>0,
        ));
        $this->set_test_host("http://www.easytee.com");
        $res = $this->get_action("/");
    }

}
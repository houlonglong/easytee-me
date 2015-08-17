<?php
use PtLib\UnitTest as UnitTest;
/**
 * 成本
 *
 */
class CostTest extends UnitTest{
    function test_calculate_profie(){
        Model_Cost::calculate_profie(70);
    }
    /**
     *
     *
    function test_cli_test(){
        $this->cli("deamon/task","run");
    }
     */

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
<?php
use PtLib\UnitTest as UnitTest;
/**
 * 用户注册
 *
 */
class RegisterTest extends UnitTest{
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
    function test_action_register(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));

        //$this->test_host = "2.dev.jzw.com";
        $this->set_local_test_proxy();
        $res = $this->post_action("/api",array(
            "model"=>"user/register",
            "action"=>"do_register",
            "username"=>"test",
            "password"=>md5("test"),
        ));
        echo $res;
    }

    function test_action_auth(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));

        $this->test_host = "1.dev.jzw.com";
        $this->set_local_test_proxy();
        $res = $this->post_action("/api",array(
            "model"=>"campus",
            "action"=>"do_auth",
            "img_url"=>"",
            "real_name"=>"",
            "student_no"=>"",
            "school_name"=>"",
            "major"=>"",
        ));
        echo $res;
    }

}
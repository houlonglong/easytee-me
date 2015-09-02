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
    function test_action_login(){
        $this->set_http_opt(array(
            "debug"=>1,
            "header"=>0,
            "cookie"=>1,
        ));

        $this->test_host = "11.dev.jzw.com";
        $this->set_local_test_proxy();
        $res = $this->post_action("/login/index",array(
            "username"=>'15601854797',
            "password"=>"123456",
        ));
        echo $res;
    }
    function test_action_auth(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>1,
        ));
        $this->test_action_login();
        $this->test_host = "11.dev.jzw.com";
        $content = "data:image/png;base64,".base64_encode(file_get_contents('E:/11.jpg'));
        $this->set_local_test_proxy();
        $res = $this->post_action("/campus/do_auth",array(
            "img_url"=>$content,
            "real_name"=>"lixiaomei",
            "student_no"=>"09010614",
            "school_name"=>"jiangxi",
            "major"=>"informatin manager",
        ));
        echo $res;
    }

}
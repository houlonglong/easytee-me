<?php
use PtLib\UnitTest as UnitTest;
/**
 * 发送邮件
 *
 */
class EmailTest extends UnitTest{


    function test_send_email(){

       $ret =  Model_Tools_Email::send_email('1061109495@qq.com','OS8iI2','紫精灵');
        var_dump($ret);
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
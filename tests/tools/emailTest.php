<?php
use PtLib\UnitTest as UnitTest;
/**
 * 发送邮件
 *
 */
class EmailTest extends UnitTest{


    function test_send_email(){
       $ret =  Model_Tools_Email::subemail_send('1061109495@qq.com','紫精灵','OS8iI2');
        var_dump($ret);
    }

    function test_phpmailer_send_email(){
        $to_mail = '1020983581@qq.com';
        $title = 'xxx';
        $content = 'xxx';
        $debug = 1;
        $res = Model_Tools_Email::phpmailer_send_email($to_mail,$title,$content);
        var_dump($res);
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
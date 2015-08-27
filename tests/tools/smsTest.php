<?php
use PtLib\UnitTest as UnitTest;
/**
 * 短信发送
 *
 */
class SmsTest extends UnitTest{

    function test_sms(){

        $options = array(
            'username' => "叶子洛奇",
            'activity' => '1234',
            'salesNum' =>19,
        );
        $res = Model_Tools_Sms::sendsms('15601854797','tTCBU',$options);
        var_dump($res);
    }
    /**
     *
     */
    function test_cli_test(){
        $this->cli("tools/sms","send");
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
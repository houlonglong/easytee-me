<?php
use PtLib\UnitTest as UnitTest;

class CaptchaTest extends UnitTest{
    function test_action_test(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));
        $res = $this->get_action("/tools/captcha?action=img");
        $this->assertTrue(substr($res,1,3) == "PNG");
    }

}
<?php
use PtLib\UnitTest as UnitTest;
/**
 * svg转PNG
 *
 */
class ConvertTest extends UnitTest{



    /**
     *
     */
    function test_action_test(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));

        $this->test_host = "2.dev.jzw.la";
        //$this->set_local_test_proxy();
        $res = $this->post_action("/api",array(
            "model"=>"tools/svg/convert",
            "action"=>"png",
        ));
        //print_r($res);
    }

}
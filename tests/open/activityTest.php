<?php
use PtLib\UnitTest as UnitTest;
/**
 * 活动第三方接口
 *
 */
class ActivityTest extends UnitTest{
    function test_action_create(){
        define("APP_ID","be9fa777ce1dfacfc7d18029531a0e3e");
        define("APP_SECRET","2fc6866f6c832bd30dbc61ef5885e52a");
        define("API_URL","http://service.easytee.me/api");

        $request = array(
            "model"=>"open/activity",
            "action"=>"create",
            "app_id"=>APP_ID,
            "uid"=>1,
            "mobile"=>"13866566995",
            "time"=>time(),
            "return_url"=>"http://www.xxxx.com/",
        );

        $request['sign'] =  md5(http_build_query($request).APP_SECRET);

        //$url = API_URL."?".http_build_query($request);
        //header("Location:".$url);

        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));

        //$this->test_host = "2.dev.jzw.com";
        $this->set_local_test_proxy();
        $res = $this->post_action("/api",$request);
        print_r($res);

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
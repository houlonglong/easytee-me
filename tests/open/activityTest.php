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
        //define("API_URL","http://2.dev.jzw.com/api");

        $request = array(
            "model"=>"open/activity",
            "action"=>"create",
            "app_id"=>APP_ID,
            "uid"=>3,
            "extra_price"=>10.5,
            "extra_percent"=>0.25,
            "mobile"=>"13866566999",
            "time"=>time(),
            "return_url"=>"http://www.baidu.com/",
        );

        $request['sign'] =  md5(http_build_query($request).APP_SECRET);

        $url = API_URL."?".http_build_query($request);
        die($url);
        //header("Location:".$url);

        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));

        $this->test_host = "2.dev.jzw.com";
        $this->set_local_test_proxy();
        $res = $this->post_action("/api",$request);
        print_r($res);

    }
    function test_action_detail(){
        define("APP_ID","be9fa777ce1dfacfc7d18029531a0e3e");
        define("APP_SECRET","2fc6866f6c832bd30dbc61ef5885e52a");
        define("API_URL","http://service.easytee.me/api");
        //define("API_URL","http://2.dev.jzw.com/api");
        $request = array(
            "model"=>"open/activity",
            "action"=>"detail",
            "app_id"=>APP_ID,
            "activity_id"=>4566,
            "time"=>time(),
        );

        $request['sign'] =  md5(http_build_query($request).APP_SECRET);

        $url = API_URL."?".http_build_query($request);
        die($url);
        //header("Location:".$url);

        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));

        $this->test_host = "2.dev.jzw.com";
        $this->set_local_test_proxy();
        $res = $this->post_action("/api",$request);
        $res = json_decode($res,1);
        print_r($res);

    }

    function test_action_order(){
        define("APP_ID","be9fa777ce1dfacfc7d18029531a0e3e");
        define("APP_SECRET","2fc6866f6c832bd30dbc61ef5885e52a");
        define("API_URL","http://service.easytee.me/api");

        $request = array(
            "model"=>"open/activity",
            "action"=>"order",
            "app_id"=>APP_ID,
            "activity_id"=>4550,
            "time"=>time(),
        );

        $request['sign'] =  md5(http_build_query($request).APP_SECRET);

        $url = API_URL."?".http_build_query($request);
        echo $url;exit;
        //header("Location:".$url);

        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));

        //$this->test_host = "2.dev.jzw.com";
        $this->set_local_test_proxy();
        $res = $this->post_action("/api",$request);
        $res = json_decode($res,1);
        echo json_encode($res,JSON_PRETTY_PRINT);

    }
    function test_action_close(){
        define("APP_ID","be9fa777ce1dfacfc7d18029531a0e3e");
        define("APP_SECRET","2fc6866f6c832bd30dbc61ef5885e52a");
        define("API_URL","http://service.easytee.me/api");

        $request = array(
            "model"=>"open/activity",
            "action"=>"close",
            "app_id"=>APP_ID,
            "status"=>3,
            "activity_id"=>2,
            "time"=>time(),
        );

        $request['sign'] =  md5(http_build_query($request).APP_SECRET);

        $url = API_URL."?".http_build_query($request);
        //die($url);
        //header("Location:".$url);

        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));

        //$this->test_host = "2.dev.jzw.com";
        $this->set_local_test_proxy();
        $res = $this->post_action("/api",$request);
        $res = json_decode($res,1);
        echo json_encode($res,JSON_PRETTY_PRINT);

    }

}
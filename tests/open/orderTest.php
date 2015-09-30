<?php
use PtLib\UnitTest as UnitTest;
/**
 * 订单第三方接口
 *
 */
class OrderTest extends UnitTest{

    function test_action_save(){
        define("APP_ID","be9fa777ce1dfacfc7d18029531a0e3e");
        define("APP_SECRET","2fc6866f6c832bd30dbc61ef5885e52a");
        define("API_URL","http://www.easytee.me/api");

        $request = array(
            "model"=>"open/order",
            "action"=>"save",
            "app_id"=>APP_ID,
            "order_no"=>"1111111111111",
            "activity_id"=>4550,
            "goods_price"=>100.01,
            "quantity"=>4,
            "ship_name"=>"李四",
            "ship_tel"=>"1355555555",
            "ship_province"=>"上海",
            "ship_city"=>"上海",
            "ship_county"=>"长宁区",
            "ship_addr"=>"长宁路100号",
            "subject"=>"订单描述",
            "notes"=>"备注",
            "goods"=>json_encode(array(
                array(
                    "style_id"=>1,
                    "pro_size"=>"XL",
                    "unit_price"=>100.2,
                    "quantity"=>2,
                ),
                array(
                    "style_id"=>2,
                    "pro_size"=>"XL",
                    "unit_price"=>100.3,
                    "quantity"=>2,
                )
            )),
            "time"=>time(),
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
}
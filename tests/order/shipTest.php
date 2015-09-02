<?php
use PtLib\UnitTest as UnitTest;
/**
 * 发货
 *
 */
class ShipTest extends UnitTest{
    function test_save(){
        $order_id = 44;
        $name= "张三";
        $tel= "13555555555";
        $province= "上海市";
        $city= "市辖区";
        $county= "长宁区";
        $addr= "长宁路100号";
        $exp_com= "韵达";
        $exp_price= 8.0;
        Model_Order_Ship::save($order_id,$name,$tel,$province,$city,$county,$addr,$exp_com,$exp_price);
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
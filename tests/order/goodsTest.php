<?php
use PtLib\UnitTest as UnitTest;
/**
 * 订单产品
 *
 */
class GoodsTest extends UnitTest{
    function test_save(){
        $goods = array(
            array(
                #款式ID
                "style_id"=>1,
                #尺码
                "size"=>"XL",
                #数量
                "quantity"=>1,
            ),
        );
        $order_id = 1;
        Model_Order_Goods::save($order_id,$goods);
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
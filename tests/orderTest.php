<?php
use PtLib\UnitTest as UnitTest;
/**
 * 订单
 *
 */
class OrderTest extends UnitTest{
    function test_get_list(){
        $rows = Model_Order::get_list();
        print_r($rows);
    }

    function test_detail_info(){
        $row = Model_Order::detail_info_with_goods("15092411015584654");
        print_r($row);
    }

    function test_action_save(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));

        $this->test_host = "2.dev.jzw.com";
        $this->set_local_test_proxy();
        $res = $this->post_action("/api",array(
            "model"=>"user/order",
            "action"=>"save",
            #活动ID
            "activity_id"=>4311,
            #订单商品
            "goods"=>json_encode(
                array(
                    array(
                        #款式ID
                        "style_id"=>66,
                        #尺码
                        "pro_size"=>"XL",
                        #数量
                        "quantity"=>1,
                    ),
                )
            ),
            #支付类型 - alipay 支付宝 - wechat 微信 - account 帐户余额
            "pay_type"=>"alipay",
            #收货人 姓名
            "ship_name"=>"李四",
            #收货人 电话
            "ship_tel"=>"13555555555",
            #收货人 省
            "ship_province"=>"上海市",
            #收货人 市
            "ship_city"=>"市辖区",
            #收货人 区
            "ship_county"=>"长宁",
            #收货人 区
            "ship_addr"=>"XX路XX号",
            #快递费
            "exp_price"=>8.0,
            #快递公司
            "exp_com"=>"韵达",
            #备注
            "notes"=>"备注",
        ));

        print_r($res);
    }
    function test_get_save_goods(){
        $goods = array(
            array(
                #款式ID
                "style_id"=>66,
                #尺码$_goods
                "pro_size"=>"XL",
                #数量
                "quantity"=>1,
            ),
        );

        $res = Model_Order::get_save_goods(4311,$goods);
        print_r($res);

    }
    function test_save(){
        $uid = 1;
        $goods_price = 11.11;
        $exp_price = 11.11;
        $quantity = 10;
        $subject = "subject";
        $body = "subject";
        $notes = "notes";
        $activity_id = 1;
        echo Model_Order::save($uid,$activity_id,$goods_price,$exp_price,$quantity,$subject,$body,$notes);
    }
    function test_gen_order_no(){
        echo Model_Order::gen_order_no();
    }
    function test_get_order_info_by_id(){
        $order = Model_Order::get_order_info_by_id(49);
        print_r($order);
    }
    function test_get_order_info_by_order_no(){
        $order = Model_Order::get_order_info_by_order_no("15090222123578336");
        print_r($order);
    }

}
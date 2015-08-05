<?php
use PtLib\UnitTest as UnitTest;
/**
 * 订制成功
 *
 */
class CostTest extends UnitTest{
    /**
     * 成本计算
     */
    function test_cal(){
        $cost = Model_Tshirt_Cost::get_print_cost();
        var_dump($cost);
        $color_num = 6;
        $sale_num = 50;
        echo (Model_Tshirt_Cost::calculate($color_num,$sale_num)+25)*1.5;
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
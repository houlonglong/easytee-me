<?php
namespace Service\Wechat\Pay;
use PtLib\UnitTest as UnitTest;
/**
 * Created by PhpStorm.
 * User: joseph
 * Date: 7/22/15
 * Time: 8:32 PM
 */

class ApiTest extends UnitTest{
    function test_build_get_wcpay_qrcode_url(){
        $api = new Nativeapi();
        $url = $api->build_get_wcpay_qrcode_url("http://www.baidu.com",array(
            "body"=>"body",
            "order_no"=>time().time(),
            "price"=>1,
            "activity_id"=>1
        ));
        $this->assertStringStartsWith("weixin://wxpay",$url);
    }
}
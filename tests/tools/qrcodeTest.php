<?php
/**
 * 二维码生成
 * User: joseph
 * Date: 7/10/15
 * Time: 5:52 PM
 */
class QrcodeTest extends BaseTestCase {
    function test_http_action_get(){
        $this->set_http_opt(array(
            "debug"=>1,
            "header"=>0,
            "cookie"=>0,
        ));
        $res = $this->get_action("/tools/qrcode?action=get");
        $bin = (substr($res,0,2));
        $data = @unpack("C2chars", $bin);
        $type_code = intval($data["chars1"].$data["chars2"]);
        $this->assertTrue(13780 == $type_code,"这不是一张png图片");
    }
}

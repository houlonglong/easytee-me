<?php
use PtLib\UnitTest as UnitTest;
/**
 * 图片服务
 *
 */
class PicTest extends UnitTest{
    /**
     *
     *
     */
    function test_cli_test(){
        $this->cli("service/pic","run","--act_id=1","develop");
    }
    function test_upload_to_aliyun_oss(){
        $path = "tpl_26_2_front_merge.png";
        $remote_path = "test/test/test.png";
        echo Model_Service_Pic::upload_to_aliyun_oss($path,$remote_path);
    }
    function test_merge_design_pics(){
        Model_Service_Pic::merge_activity_pics(37);
    }

    function test_test(){
        Model_Service_Pic::test();
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
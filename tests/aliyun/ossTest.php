<?php
use PtLib\UnitTest as UnitTest;
/**
 * 阿里云上传
 *
 */
class OssTest extends UnitTest{

    function test_upload_file(){

        $local_path = __DIR__."/test.png";
        $remote_path = "test/test/test/test.png";
        $url = Model_Aliyun_Oss::upload_file($local_path,$remote_path);
        \PtLib\log($url);

    }

    function test_upload_content(){

        $local_path = __DIR__."/test.png";
        $remote_path = "test/test/test/test.png";
        $url = Model_Aliyun_Oss::upload_content(file_get_contents($local_path),$remote_path);
        \PtLib\log($url);

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
        $res = $this->post_action("/auth/login?action=do_login",array(
            "username"=>"test",
            "password"=>md5("test"),
        ));
    }
     */
}
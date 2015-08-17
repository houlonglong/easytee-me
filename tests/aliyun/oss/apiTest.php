<?php
namespace Service\Aliyun\Oss;
use PtLib\UnitTest as UnitTest;
class ApiTest extends UnitTest {
    function test_upload_file(){
        $org_path = __FILE__;
        $remote_path = "test/test.php";
        $url = Api::oss_upload_file("dholer",$org_path,$remote_path);
        $this->assertContains("http://",$url,"oss_upload_file 上传本地文件错误");
    }
    function test_upload_file_content(){
        $org_path     = __FILE__;
        $content      = file_get_contents($org_path);
        $content_size = strlen($content);
        $remote_path  = "test/test12.php";
        $url          = Api::oss_upload_file_content("dholer",$remote_path,$content,$content_size);
        $this->assertContains("http://",$url,"oss_upload_file 上传本地文件错误");
    }
}

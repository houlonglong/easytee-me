<?php
namespace Service\Aliyun\Oss;
include_once PATH_APP."/libs/aliyun/oss/sdk.class.php";

use ALIOSS;
use Exception;

class Api{
    static $debug = false;
    /**
     * @param $bucket
     * @param $org_path    上传文件绝对地址
     * @param $remote_path 上传文件相对远程地址
     * @return string
     * @throws Exception
     */
    static function oss_upload_file($bucket,$org_path,$remote_path){
        echo($org_path);exit;
        if(!file_exists($org_path)){
            throw new Exception("上传文件不存在");
        }
        $oss_sdk_service = new ALIOSS();
        $oss_sdk_service->set_debug_mode(self::$debug);
        //\PtLib\log("bucket:$bucket,uploading:$remote_path");
        $rest = $oss_sdk_service->upload_file_by_file($bucket,$remote_path,$org_path);
        return self::handle_result($rest);
    }

    /**
     * @param $bucket
     * @param $remote_path  上传文件远程地址
     * @param $content      上传文件内容
     * @param $content_size 上传文件大小
     * @return string
     * @throws Exception
     */
    static function oss_upload_file_content($bucket,$remote_path,$content,$content_size){
        $upload_file_options = array('content' => $content, 'length' => $content_size);
        $oss_sdk_service = new ALIOSS();
        \PtLib\log("bucket:$bucket,uploading:$remote_path");
        $rest = $oss_sdk_service->upload_file_by_content($bucket,$remote_path,$upload_file_options);
        return self::handle_result($rest);
    }

    static function handle_result($rest){
        $status = @$rest->status;
        if($status != 200){
            $body = simplexml_load_string($rest->body);
            \PtLib\log($body);
            throw new Exception($body->Message);
        }
        $url = empty($rest->header['x-oss-request-url'])?"":$rest->header['x-oss-request-url'];
        //\PtLib\log("上传成功:$url");
        return $url;
    }
}


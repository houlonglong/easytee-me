<?php
/**
 *
 */
class Model_Admin_Tools_Pic extends Model_Admin_Abstract{
    /**
     * @param
     * @return
     */
    function action_upload(){
        $request = Pt\http_request("content");
        $content = $request['content'];
        //pt_log($content);
        $content = substr($content,13);
        //pt_log($content);
        $content = base64_decode($content);
        //pt_log($content);
        //todo upload aliyun
        //file_put_contents(PATH_WEBROOT."/test.jpg",$content);
        $url = "/test.jpg";
        $data['url'] = $url;
        return $data;
    }
    function action_test(){
        $test = 1;
        echo 11;
    }

}
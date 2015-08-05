<?php

class Model_Test_Test{
    function action_test(){
        $request = pt_http_request("test11","test1");
        //$curl = new PtCurl();
        //$res = $curl->get("http://www.baidu.com");
        //$data['curl'] = $res['info'];
        $data['test11'] = $request;
        //pt_log($data);
        return $data;
    }
}
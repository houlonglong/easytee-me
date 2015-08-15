<?php
/**
 * Created by PhpStorm.
 * User: joseph
 * Date: 7/10/15
 * Time: 5:49 PM
 */
class Model_Tools_Mongolog{
    function action_push(){
        if (ob_get_level() == 0) ob_start();
        echo PHP_EOL;
        ob_flush();
        PtApp::$ob_flushed = true;
        flush();
        ob_end_flush();
        $data = Pt\http_request_body();
        if(!$data) throw new Exception("no data input");
        $data = json_decode($data,1);
        $__mongo_client = new MongoClient();
        $db_name = empty($_GET['db'])?"mongo_log":$_GET['db'];
        $collection = empty($_GET['collection'])?"php_log":$_GET['collection'];
        $mongo_log = $__mongo_client->selectCollection($db_name,$collection );
        $mongo_log->insert($data);
        return "ok";
    }
}
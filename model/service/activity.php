<?php

class Model_Service_Activity{
    static $table = "";
    function __construct(){
        //parent::__construct();
    }
    function cli_run(){
        if(PtApp::$ENV == "product"){
            $url = "http://www.easytee.me/Activity/cronCloseActivity?appKey=wqdc";
        }else{
            $url = "http://11.dev.jzw.la/Activity/cronCloseActivity?appKey=wqdc";
        }
        while(1){
            $sleep = "10";
            if(PtApp::$ENV == "test"){
                sleep($sleep);
                echo date('h:i:s')." : test continue".PHP_EOL;
                continue;
            }

            $res = @file_get_contents($url);
            if($res !== false){
                $msg = "suc!";
            }else{
                $msg = "request fail!";
            }
            echo date('h:i:s')." : ".$msg.PHP_EOL;
            sleep($sleep);
        }
    }
}
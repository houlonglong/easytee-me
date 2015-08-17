<?php

class Model_Service_Order{
    static $table = "";
    function __construct(){
        //parent::__construct();
    }
    function cli_run(){
        if(PtApp::$ENV == "product"){
            $url = "http://www.easytee.me/cron/order";
        }else{
            $url = "http://11.dev.jzw.la/cron/order";
        }
        while(1){
            $sleep = "10";
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
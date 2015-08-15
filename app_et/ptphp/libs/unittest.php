<?php
namespace PtLib;
use PHPUnit_Framework_TestCase;

class UnitTest extends PHPUnit_Framework_TestCase{
    var $curl_response = array();
    var $http_opt = array();
    var $test_host = '';
    function set_test_host($host = ''){
        $this->test_host = $host;
    }
    function __construct(){
        parent::__construct();
    }

    function cli($model,$method,$args = "",$env = "develop"){
        //echo PATH_CLI;
        $cmd = "php ".PATH_CLI." --model=$model --action=$method --env=$env $args";
        log($cmd);
        $res = shell_exec($cmd);
        log($res);
    }

    function set_http_opt($http_opt){
        $opt = array(
            "cookie"=>0,
            "header"=>0,
            "debug"=>0,
        );
        $this->http_opt = array_merge($opt,$http_opt);
    }
    function __parse_url_action($action){
        $this->curl_response = array();
        if(substr($action,0,7) != "http://"){
            if(substr($action,0,1) != "/"){
                $action = "/".$action;
            }
            if($this->test_host == ''){
                $action = TEST_URL.$action;
            }else{
                $action = "http://".str_replace("http://","",$this->test_host).$action;
            }

        }
        log($action);
        return $action;
    }
    function __handle_action_result($res){
        $this->set_test_host();
        //pt_log($res);
        $this->curl_response = $res;
        if($res['error']){
            log("error",$res['error']);
            exit;
        }
        if(!empty($this->http_opt['header']) && $res['header']){
            log("response header: \n\n%s\n",$res['header']);
        }

        if(!empty($this->http_opt['cookie']) && $res['cookie']){
            log("response cookie file: %s",$res['cookie_file']);
            log("response cookie: %s",$res['cookie']);
            //$cookie = file_get_contents($res['cookie_file']);
            //pt_log($cookie);
        }
        $this->local_proxy = array();
        $body = $res['body'];
        $this->response_info = $res['info'];
        if(substr($body,0,1) == "{"){
            $body = json_decode($body,1);
            log(unicodeString(json_encode($body,JSON_PRETTY_PRINT)));
        }else{
            $body = trim(substr($body,strpos($body,"\r\n\r\n")));
            //log("return:",$body);
        }
        return $body;
    }
    var $response_info = array();
    var $local_proxy = array();

    function set_local_test_proxy(){
        $this->local_proxy = array(
            CURLOPT_HTTPPROXYTUNNEL=>1,
            CURLOPT_PROXY=>"127.0.0.1:80",
        );
    }
    function set_curl_opt(){

        $opt = array();
        if(!empty($this->http_opt['debug'])){
            $opt = array(CURLOPT_VERBOSE=>1);
        }

        if($this->local_proxy){
            foreach($this->local_proxy as $key=>$value){
                $opt[$key]=$value;
            }
        }
        return $opt;
    }
    function get_action($action){
        $action = $this->__parse_url_action($action);
        $curl = new Curl();
        $opt = $this->set_curl_opt();
        //print_r($opt);exit;
        $res = $curl->get($action,$opt);
        return $this->__handle_action_result($res);
    }
    function post_action($action,$data = array()){
        $action = $this->__parse_url_action($action);
        $curl = new Curl();
        $opt = $this->set_curl_opt();
        $res = $curl->post($action,$data,$opt);
        return $this->__handle_action_result($res);
    }
    function curl_get($url){
        $curl = new Curl();
        $res  = $curl->get($url);
    }
}

<?php
namespace PtLib;
use Pt;
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

    function cli($model,$method){
        //echo PATH_CLI;
        $cmd = "php ".PATH_CLI." $model $method";
        Pt\log($cmd);
        $res = shell_exec($cmd);
        Pt\log($res);
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
        Pt\log($action);
        return $action;
    }
    function get_action($action){
        $action = $this->__parse_url_action($action);
        $curl = new Curl();
        $opt = array();
        if(!empty($this->http_opt['debug'])){
            $opt = array(CURLOPT_VERBOSE=>1);
        }
        $res = $curl->get($action,$opt);
        return $this->__handle_action_result($res);
    }
    function __handle_action_result($res){
        $this->set_test_host();
        //pt_log($res);
        $this->curl_response = $res;
        if($res['error']){
            Pt\log("error",$res['error']);
            exit;
        }
        if(!empty($this->http_opt['header']) && $res['header']){
            Pt\log("response header: \n\n%s\n",$res['header']);
        }

        if(!empty($this->http_opt['cookie']) && $res['cookie']){
            Pt\log("response cookie: %s",$res['cookie']);
            //$cookie = file_get_contents($res['cookie_file']);
            //pt_log($cookie);
        }

        $body = $res['body'];
        if(substr($body,0,1) == "{"){
            $body = json_decode($body,1);
            Pt\log(Pt\unicodeString(json_encode($body,JSON_PRETTY_PRINT)));
        }else{
            Pt\log("return:",$body);
        }
        return $body;
    }
    function post_action($action,$data = array()){
        $action = $this->__parse_url_action($action);
        $curl = new Curl();
        $opt = array();
        if(!empty($this->http_opt['debug'])){
            $opt = array(CURLOPT_VERBOSE=>1);
        }
        $res = $curl->post($action,$data,$opt);
        return $this->__handle_action_result($res);
    }
}

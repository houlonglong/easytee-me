<?php
use PtLib\Captcha as PtCaptcha;
/**
 *
 */
class Model_Tools_Captcha{
    static $session_code_prefix = "session_code";
    function action_img(){
        $request = PtLib\http_request("type");
        PtApp::session_start();
        $captcha = new PtCaptcha();
        $captcha->gen($request['type']);
        self::set_session_code($captcha->get_code(),$request['type']);
    }
    static function set_session_code($code,$type ="reg"){
        $_SESSION[self::$session_code_prefix."_".$type] = $code;
    }
    static function get_session_code($type){
        return empty($_SESSION[self::$session_code_prefix."_".$type])? "" : $_SESSION[self::$session_code_prefix."_".$type];
    }
    static function delete_session_code($type){
        unset($_SESSION[self::$session_code_prefix."_".$type]);
    }
    static function check_captcha_code($code,$type){
        if(empty($code)){
            throw new Exception("楠岃瘉鐮佷笉鑳戒负绌?);
        }
        PtApp::session_start();
        $_code = self::get_session_code($type);
        //Pt\log("code:%s,_code:%s,type:%s",$code,$_code,$type);
        if($_code != $code){
            throw new Exception("楠岃瘉鐮佷笉姝ｇ‘");
        }
    }
}
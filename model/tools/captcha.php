<?php
use PtLib\Captcha as PtCaptcha;
/**
 *
 */
class Model_Tools_Captcha{
    static $session_code_prefix = "session_code";
    function action_img($type){
        PtApp::session_start();
        $captcha = new PtCaptcha();
        $captcha->gen($type);
        self::set_session_code($captcha->get_code(),$type);
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
            throw new Exception("验证码不能为空");
        }
        PtApp::session_start();
        $_code = self::get_session_code($type);
        if($_code != $code){
            throw new Exception("验证码不正确");
        }
    }
    function action_session(){
        PtApp::session_start();
        if(!\PtLib\local_dev() && isset($_SESSION)) return $_SESSION;
    }
}
<?php
/**
 * 用户注册
 */
class Model_User_Register extends BaseModel {
    static $table = "";
    function __construct(){
        //parent::__construct();
    }
    function action_do_register(){
        PtApp::session_start();
        $reg_captcha = $_SESSION['reg_captcha'];
        $captcha = self::_request("captcha");
        $mobile = self::_request("mobile");
        $password = md5(sha1(self::_request("password")));
        if($captcha != $reg_captcha) throw new Exception("验证码不正确");
        self::_db(NEW_DB)->insert("user",array(
            "mobile"=>$mobile,
            "password"=>$password,
            "add_time"=>add_time,
        ));
        unset($_SESSION['reg_captcha']);

    }
    function action_get_code(){
        PtApp::session_start();
        //注册验证码
        $reg_captcha = $_SESSION['reg_captcha'] = rand(1000,9999).rand(10,99);
        $mobile = self::_request("mobile");
        $project = "";
        $option = array();
        Model_Tools_Sms::sendsms($mobile,$project,$option);
        return array();
    }

}
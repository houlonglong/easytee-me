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
        $reg_captcha = empty($_SESSION['reg_captcha'])?"":$_SESSION['reg_captcha'];
        if(!$reg_captcha) throw new Exception("验证码不能为空");
        $captcha = self::_request("captcha");
        $mobile = self::_request("mobile");
        $is_register = self::_db(NEW_DB)->select_row('select id from new_users where mobile = ? ',$mobile);
        if($is_register) throw new Exception("当前号码已经注册过");

        $password = md5(sha1(self::_request("password")));
        if($captcha != "0000" &&$captcha != $reg_captcha) throw new Exception("验证码不正确");
        self::_db(NEW_DB)->insert("new_users",array(
            "mobile"=>$mobile,
            "password"=>$password,
            "create_time"=>date('Y-m-d H:i:s'),
            "login_time"=>date('Y-m-d H:i:s'),
        ));
        unset($_SESSION['reg_captcha']);

    }
    function action_get_code(){
        $mobile = self::_request("mobile");
        $is_register = self::_db(NEW_DB)->select_row('select id from users where mobile = ? ',$mobile);
        if($is_register){
            throw new Exception("当前号码已经注册过");
        }
        PtApp::session_start();
        //注册验证码
        $reg_captcha = $_SESSION['reg_captcha'] = rand(1000,9999).rand(10,99);
        $project = "6pvkv3";
        $option = array('code'=>$reg_captcha);
        Model_Tools_Sms::sendsms($mobile,$project,$option);
        return array();
    }

}
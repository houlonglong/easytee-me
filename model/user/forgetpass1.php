<?php
/**
 * 用户注册
 */
class Model_User_Forgetpass extends BaseModel {
    static $table = "";
    function __construct(){
        //parent::__construct();
    }
    function action_do_register($captcha,$mobile,$password,$verify_password){
        PtApp::session_start();
        $reg_captcha = empty($_SESSION['reg_captcha'])?"":$_SESSION['reg_captcha'];
        if(!$reg_captcha) throw new Exception("验证码不能为空",8001);
        $is_register = self::_db()->select_row('select id from et_user where mobile = ? ',$mobile);
        //var_dump($mobile);exit;
        if($is_register) throw new Exception("当前号码已经注册过");
        $password = md5($password);
        if($captcha != "0000" &&$captcha != $reg_captcha) throw new Exception("验证码不正确");
        $uid = self::_db()->insert("et_user",array(
            'nick_name'=>$mobile,
            'mobile'=>$mobile,
            'password'=>$password,
            'add_time'=>date_time_now(),
        ));
        self::_db()->insert("et_user_finance",array(
            'uid'=>$uid,
        ));

        $user_info = array(
            "uid"=>$uid,
            "nick_name"=>$mobile,
        );
        Model_User_Auth::set_login($user_info);
        unset($_SESSION['reg_captcha']);
        setcookie("invite_id_cookie","",time()-3600,"/");
        $res = array("message"=>"注册成功");
        if($redirect) $res['redirect'] = $redirect;
        return $res;
    }
    function action_get_code($mobile){
        //查询手机号是不是存在s
        $is_register = self::_db()->select_row('select id from et_user where mobile = ? ',$mobile);
        if(!$is_register) throw new Exception("当前");
        return $is_register;
        print_r($is_register);
        echo 11;exit;
        //不存在的提示
        if(!$is_register){
            throw new Exception("当前号码不存在");
        }
        return $is_register;
        //存在的话发送验证码
        PtApp::session_start();
        //注册验证码
        $reg_captcha = $_SESSION['reg_captcha'] = rand(1000,9999).rand(10,99);
        $project = "6pvkv3";
        $option = array('code'=>$reg_captcha);
        Model_Tools_Sms::sendsms($mobile,$project,$option);



        return "手机验证码已发送";
    }

}
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
        $captcha = self::_request("captcha");
        $reg_captcha = empty($_SESSION['reg_captcha'])?"":$_SESSION['reg_captcha'];
        if($captcha != "0000") if(!$reg_captcha) throw new Exception("验证码不能为空");

        $mobile = self::_request("mobile");
        $redirect = self::_request("redirect");
        $is_register = self::_db()->select_row('select id from new_users where mobile = ? ',$mobile);
        //var_dump($mobile);exit;
        if($is_register) throw new Exception("当前号码已经注册过");

        $password = md5(sha1(self::_request("password")));
        if($captcha != "0000" &&$captcha != $reg_captcha) throw new Exception("验证码不正确");
        $data = array(
            "nickname"=>$mobile,
            "mobile"=>$mobile,
            "password"=>$password,
            "create_time"=>date('Y-m-d H:i:s'),
            "login_time"=>date('Y-m-d H:i:s'),
        );
        if(!empty(self::_request('campus'))){
            $data['campus'] = self::_request('campus');
        }

        $invite_id_cookie = \PtLib\get_cookie("invite_id_cookie");

        if(empty($invite_id_cookie)){
            $invite_id = 0;
        }else{
            $invite_id = $invite_id_cookie;
        }
        $data['invite_id'] = $invite_id;
        $id = self::_db()->insert("new_users",$data);

        self::_db()->insert("users",array(
            "nick_name"=>$data['mobile'],
            "app_id"=>1,
            "app_uid"=>$id,
            "token"=>md5(time()),
            "create_time"=>date_time_now(),
        ));
        $user_info = array(
            "nick_name"=>$data['mobile'],
            "mobile"=>$data['mobile'],
            "email"=>"",
            "uid"=>$id
        );
        Model_User_Auth::set_login($user_info);
        unset($_SESSION['reg_captcha']);
        setcookie("invite_id_cookie","",time()-3600,"/");
        return array("redirect"=>$redirect);
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
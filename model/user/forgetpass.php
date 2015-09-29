<?php
/**
 * 密码重置
 */
class Model_User_Forgetpass extends BaseModel {
    static $table = "";
    function __construct(){
        //parent::__construct();
    }
    function action_do_forgetpass($captcha,$mobile,$password,$verify_password){
        //检查密码是不是一样
        if($password != $verify_password) throw new Exception("两次密码不一样");
       // 开始seesion
        PtApp::session_start();
         //检测seesion是不是配置过，配置为空，没有配置等于当前配置，并且关联手机号
        $forgetpass_captcha = empty($_SESSION['forgetpass_captcha_'.$mobile])?"":$_SESSION['forgetpass_captcha_'.$mobile];
         //检测验证码位空
        if(!$forgetpass_captcha) throw new Exception("验证码不能为空");
         //查询用户存在
        $user = self::_db()->select_row('select id from et_user where mobile = ? ',$mobile);
          //如果不存在
        if(!$user) throw new Exception("当前号码没有注册过");
        //密码加密
        $password = md5($verify_password);
         //验证码对比
        if($captcha != $forgetpass_captcha) throw new Exception("验证码不正确");
        //数据库更新密码
        self::_db()->update("et_user",array(
            'password'=>$password,
        ),array(
            'id' =>$user['id']
        ));
        //删除session验证码
        unset($_SESSION['forgetpass_captcha_'.$mobile]);
        //执行结果
        return "更新成功";
    }
    function action_get_code($mobile){
        //查询手机号是不是存在
        $is_register = self::_db()->select_row('select id from et_user where mobile = ? ',$mobile);
         //如果手机号不存在；
        if(!$is_register) throw new Exception("当前号码没有注册过");
        //开启session
        PtApp::session_start();
        //生成session验证码，并且关联手机号
        $forgetpass_captcha = $_SESSION['forgetpass_captcha_'.$mobile] = rand(1000,9999).rand(10,99);
        $project = "6pvkv3";
        $option = array('code'=>$forgetpass_captcha);
        Model_Tools_Sms::sendsms($mobile,$project,$option);

        return "手机验证码已发送";
    }

}
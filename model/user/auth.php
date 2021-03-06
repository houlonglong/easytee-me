<?php
/**
 *用户认证
 */

class Model_User_Auth extends BaseModel{
    /**
     * 退出
     * @url /user/auth?action=logout
     */
    function action_logout(){
        PtLib\remove_cookie(self::get_cookie_auth_key());
        PtLib\location("/");
    }
    function view_login(){
        if(Model_User_Auth::is_logined()) $this->_location("/user/index");
    }
    /**
     * 登陆
     */
    function action_login($mobile,$password,$redirect){
        PtApp::session_start();
        if(self::login($mobile,$password)){
            $res = array(
                "message"=>"登陆成功",
            );
            if(!empty($redirect)){
                $res['redirect'] = $redirect;
            }
            return $res;
        }
    }

    static function set_login($user_info){
        $cookie_auth_key = self::get_cookie_auth_key();
        $value = PtLib\secure_cookie_encode($cookie_auth_key,json_encode($user_info));
        $expire = 24*7; //时
        setcookie($cookie_auth_key,$value,time()+60*60*$expire,"/");
    }
    static function login($mobile,$password){
        $user = self::_db()->select_row("select * from et_user where mobile = ?",$mobile);
        if(!$user) throw new Exception("用户不存在",8102);
        $password = md5($password);
        if($user['password'] == $password){
            $user_info = array(
                "nick_name"=>$user['nick_name'] ? $user['nick_name']:($user['mobile']?$user['mobile']:$user['email']),
                "mobile"=>$user['mobile'],
                "email"=>$user['email'],
                "uid"=>$user['id']
            );
            self::set_login($user_info);
            return true;
        }else{
            throw new Exception("密码不正确",8103);
        }
    }
    static function get_cookie_auth_key(){
        global $setting;
        if(empty($setting['cookie_admin_auth_key'])){
            $cookie_auth_key = "a_".md5(__FILE__);
        }else{
            $cookie_auth_key = $setting['cookie_admin_auth_key'];
        }
        return $cookie_auth_key;
    }

    static function redirect_login_page($redirect = ''){
        $url = '/user/auth/login';
        if(PtLib\is_xhr()){
            PtLib\json_response('',1,"请先登陆",$url);
        }else{
            $redirect = empty($redirect)?PtApp::current_url():$redirect;
            PtLib\location("/user/auth/login?redirect=".urldecode($redirect));
        }
    }
    static function check_logined(){
        if(!self::is_logined()){
            self::redirect_login_page();
        }
    }
    static function get_uid(){
        if(empty(PtApp::$auth['uid'])) throw new Exception("用户没有登陆");
        return PtApp::$auth['uid'];
    }
    static function is_logined(){
        if(PtLib\is_cli()){
            return true;
        }
        $cookie_auth_key = self::get_cookie_auth_key();
        $logined = false;
        if(!isset($_COOKIE[$cookie_auth_key])){
            return $logined;
        }
        $auth_info = PtLib\secure_cookie_decode($cookie_auth_key,$_COOKIE[$cookie_auth_key]);
        if($auth_info){
            $auth_info = json_decode($auth_info,true);
        }
        if($auth_info && !empty($auth_info['uid'])){
            PtApp::$auth = $auth_info;
            $logined = True;
        }else{
            $logined = false;
        }
        return $logined;
    }

}
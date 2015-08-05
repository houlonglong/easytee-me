<?php
/**
 *用户认证
 */

class Model_Admin_Auth{
    /**
     * 退出
     * @url /admin/auth?action=logout
     */
    function action_logout(){
        Pt\remove_cookie(self::get_cookie_auth_key());
        Pt\location("/admin/index");
    }
    /**
     * 登陆
     */
    function action_login(){
        $request = Pt\http_request("username","password","captcha","redirect");
        Model_Tools_Captcha::check_captcha_code($request['captcha'],'admin_auth_login');
        if(self::login($request['username'],$request['password'])){
            if(empty($request['redirect'])){
                $url = "/admin/index";
            }else{
                $url = $request['redirect'];
            }
            Model_Tools_Captcha::delete_session_code("admin_auth_login");
            Pt\json_response("登陆成功",0,"",$url);
        }
    }
    static function set_login($user_info){
        $cookie_auth_key = self::get_cookie_auth_key();
        $value = Pt\secure_cookie_encode($cookie_auth_key,json_encode($user_info));
        $expire = 24*7; //时
        setcookie($cookie_auth_key,$value,time()+60*60*$expire,"/");
    }
    static function login($username,$password){
        if($username == "admin" && $password == "admin8888"){

            $user_info = array(
                "username"=>$username,
            );
            self::set_login($user_info);
            return true;
        }else{
            throw new Pt\ErrorException("用户名和密码不正确");
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
        $url = '/admin/auth/login';
        if(Pt\is_xhr()){
            json_response('',1,"请先登陆",$url);
        }else{
            $redirect = empty($redirect)?Pt\App::current_url():$redirect;
            Pt\location("/admin/auth/login?redirect=".urldecode($redirect));
        }
    }
    static function check_logined(){
        if(!self::is_logined()){
            self::redirect_login_page();
        }
    }
    static function is_logined(){
        if(Pt\is_cli()){
            return true;
        }
        $cookie_auth_key = self::get_cookie_auth_key();
        $logined = false;
        if(!isset($_COOKIE[$cookie_auth_key])){
            return $logined;
        }
        $auth_info = Pt\secure_cookie_decode($cookie_auth_key,$_COOKIE[$cookie_auth_key]);
        if($auth_info){
            Pt\App::$auth = json_decode($auth_info,1);
            $logined = True;
        }else{
            $logined = false;
        }
        return $logined;
    }
}
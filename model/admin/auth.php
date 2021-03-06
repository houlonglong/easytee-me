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
        PtLib\remove_cookie(self::get_cookie_auth_key());
        PtLib\location("/admin/index");
    }
    function action_login_as(){
        $request = \PtLib\http_request("uid");
        $uid = $request['uid'];
        $user = \PtLib\db_select_row("select n.* from users as u left join new_users as n on n.id = u.app_uid where n.id = ?",$uid);
        $user_info = array(
            "nick_name"=>$user['nickname'] ? $user['nickname']:($user['mobile']?$user['mobile']:$user['email']),
            "mobile"=>$user['mobile'],
            "email"=>$user['email'],
            "uid"=>$user['id']
        );
        Model_User_Auth::set_login($user_info);
        \PtLib\location("/user/index");
    }
    /**
     * 登陆
     *
     */
    function action_login($username,$password,$captcha,$redirect){
        Model_Tools_Captcha::check_captcha_code($captcha,'admin_auth_login');
        if(self::login($username,$password)){
            if(!$redirect){
                $url = "/admin/index";
            }else{
                $url = $redirect;
            }
            Model_Tools_Captcha::delete_session_code("admin_auth_login");
            PtLib\json_response("登陆成功",0,"",$url);
        }
    }

    static function set_login($user_info){
        $cookie_auth_key = self::get_cookie_auth_key();
        $value = PtLib\secure_cookie_encode($cookie_auth_key,json_encode($user_info));
        $expire = 24*7; //时
        setcookie($cookie_auth_key,$value,time()+60*60*$expire,"/");
    }
    static function login($username,$password){
        if($username == PtApp::$setting['admin']['username'] && $password == PtApp::$setting['admin']['password']){

            $user_info = array(
                "username"=>$username,
            );
            self::set_login($user_info);
            return true;
        }else{
            throw new Exception("用户名和密码不正确");
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
        if(PtLib\is_xhr()){
            PtLib\json_response('',1,"请先登陆",$url);
        }else{
            $redirect = empty($redirect)?PtApp::current_url():$redirect;
            PtLib\location("/admin/auth/login?redirect=".urldecode($redirect));
        }
    }
    static function check_logined(){
        if(!self::is_logined()){
            self::redirect_login_page();
        }
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
            PtApp::$auth = json_decode($auth_info,1);
            $logined = True;
        }else{
            $logined = false;
        }
        return $logined;
    }
}
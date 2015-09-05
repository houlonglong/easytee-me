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
    function action_login(){
        PtApp::session_start();
        $request = PtLib\http_request("username","password","captcha","redirect");
        //Model_Tools_Captcha::check_captcha_code($request['captcha'],'admin_auth_login');
        if(self::login($request['username'],$request['password'])){
            if(empty($request['redirect'])){
                $url = "/user/index";
            }else{
                $url = $request['redirect'];
            }
            //Model_Tools_Captcha::delete_session_code("admin_auth_login");
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
        $field = email_check($username)?"email":"mobile";
        $user = self::_db()->select_row("select * from new_users where {$field} = ?",$username);
        if(!$user) throw new Exception("用户不存在");
        $password = sha1($password);
        if($user['password'] == $password){
            $user_info = array(
                "nick_name"=>$user['nickname'] ? $user['nickname']:($user['mobile']?$user['mobile']:$user['email']),
                "mobile"=>$user['mobile'],
                "email"=>$user['email'],
                "uid"=>$user['id']
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
            PtApp::$auth = json_decode($auth_info,1);
            $logined = True;
        }else{
            $logined = false;
        }
        return $logined;
    }
    function action_oauth_weibo(){
        require PATH_LIBS . '/weibo/saetv2.ex.class.php';
        $app_id = PtApp::$setting['oauth']['weibo']['app_id'];
        $app_key = PtApp::$setting['oauth']['weibo']['app_key'];
        $o = new SaeTOAuthV2($app_id, $app_key);
        $call_back_url = "http://".$_SERVER['HTTP_HOST']."/api?model=user/auth/weibo&action=weibo_callback";
        $code_url = $o->getAuthorizeURL($call_back_url);
        //echo $code_url;
        self::_location($code_url);
    }
}
<?php
/**
 * 微博登录
 */
class Model_User_Auth_Weibo extends BaseModel {
    static $table = "";
    function __construct(){
        //parent::__construct();
    }
    function action_weibo_callback(){
        $app_id = PtApp::$setting['oauth']['weibo']['app_id'];
        $app_key = PtApp::$setting['oauth']['weibo']['app_key'];
        require PATH_LIBS . '/weibo/saetv2.ex.class.php';
        $weibo = new SaeTOAuthV2($app_id, $app_key);
        $relurl = "";
        $auth_url = "/api?model=user/auth&action=oauth_weibo";
        if (isset($_REQUEST['code'])) {
            $keys = array();
            $keys['code'] = $_REQUEST['code'];
            $call_back_url = "http://".$_SERVER['HTTP_HOST']."/api?model=user/auth/weibo&action=weibo_callback";
            $keys['redirect_uri'] = $call_back_url;
            $token = $weibo->getAccessToken('code', $keys);
            if ($token) {
                $_SESSION['weiboToken'] = $token;
            }
        };

        if (isset($_SESSION['weiboToken'])) {
            $token =$_SESSION['weiboToken'];
            $weib_user = new SaeTClientV2("3011908425", "5a6e96aae5f888e8fd8bdcec1b1c5a07", $token['access_token']);
            //var_dump($weib_user);exit;
            if (!isset($token['uid'])) {
                //授权失败。
                self::_location($auth_url);
            }
            $result = $weib_user->show_user_by_id($token['uid']); //根据ID获取用户等基本信息
            if (!isset($result["screen_name"])) {
                //授权失败。
                self::_location($auth_url);
            }
            $user = array(
                "openid" => $token["uid"],
                "nickname" => !empty($result["screen_name"]) ? $result["screen_name"] : $result["name"],
                "photo" => $result["avatar_large"],
                "abstract" => $result["description"],
                "city" => $result["location"],
                "homepage" => 'http://weibo.com/' . $result["profile_url"],
                "relurl" => $relurl,
                "access_token" => $token["access_token"],
                "gender" => $result["gender"], //性别
                "followers_count" => $result["followers_count"], //粉丝数量
                "verified" => $result["verified"], //是否认证微博用户  true false
            );
            var_dump($user);exit;
        } else {
            //授权失败。
            self::_location($auth_url);
        }
    }

    /**
     * 详情视图
     *
    function view_detail(){
        $request = PtLib\http_request("id");
        return self::detail($request['id']);
    }
     */

    /**
     * 列表
     *
    function action_list(){
        return self::table_list();
    }
     */

    /**
     * 详情
     * @return array
     *
    function action_detail(){
        $request = PtLib\http_request("id");
        return self::detail($request['id']);
    }
     */

    /*
    * 列表
    *
    static function table_list(){
        $table_alias = $table = self::$table;
        //$table_alias = '';
        $response = PtLib\get_table_list($table,$table_alias);
        return $response;
    }
    */
    /**
     * 详情
     * @param $id
     * @return array
     *
    static function detail($id){
        $table = self::$table;
        $row = PtLib\db_select_row("select * from $table where id = ?",$id);
        return $row;
    }
     */

    /**
     * 修改
     *
    function action_edit(){
        return self::table_edit();
    }
     */

    /*
    * 修改
    *
    static function table_edit(){
        $table = self::$table;
        return PtLib\table_edit($table);
    }
    */

    /**
     * @param
     * @return
     *
    function action_test(){
        $request = PtLib\http_request("id");
        $data = array();
        $data['id'] = $request;
        return $data;
    }
     */
}
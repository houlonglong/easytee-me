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
        $is_register = self::_db(NEW_DB)->select_row('select id from user where mobile = ? ',$mobile);
        if($is_register){
            throw new Exception("当前号码已经注册过");
        }
        $password = md5(sha1(self::_request("password")));
        if($captcha != $reg_captcha) throw new Exception("验证码不正确");
        self::_db(NEW_DB)->insert("user",array(
            "mobile"=>$mobile,
            "password"=>$password,
            "add_time"=>date('Y-m-d H:i:s'),
        ));
        unset($_SESSION['reg_captcha']);

    }
    function action_get_code(){
        $mobile = self::_request("mobile");
        $is_register = self::_db(NEW_DB)->select_row('select id from user where mobile = ? ',$mobile);
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
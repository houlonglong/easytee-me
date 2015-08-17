<?php

class Model_Admin_User extends Model_Admin_Abstract{
    static $table = "users";
    function __construct(){
        parent::__construct();
    }

    /**
     * @return array
     */
    function action_detail(){
        $request = PtLib\http_request("id");
        return self::detail($request['id']);
    }

    /**
     * @param $id
     * @return array
     */
    static function detail($id){
        $table = self::$table;
        $row = PtLib\db_select_row("select * from $table where id = ?",$id);
        return $row;
    }
    function action_list(){
        return self::table_list();
    }
    function action_edit(){
        return self::table_edit();
    }
    static function table_edit(){
        $table = self::$table;
        return PtLib\table_edit($table);
    }
    static function table_list(){
        $table_alias = $table = self::$table;
        //$table_alias = '';
        $response = PtLib\get_table_list($table,$table_alias);
        return $response;
    }
    function get_auth_user_info(){
        $auth = PtApp::$auth;
        return $auth;
    }

}
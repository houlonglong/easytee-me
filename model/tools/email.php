<?php
/**
 * 发送邮件
 */
class Model_Tools_Email  {
    static $table = "";
    function __construct(){
        //parent::__construct();
    }

    /**
     * @param $to_mail   发送邮箱
     * @param $to_name   发送人NAME
     * @param $project   SUBMIAL PROJECT
     */

    static function subemail_send($to_mail,$to_name,$project){
        require_once PATH_LIBS . '/submail/SUBMAILAutoload.php';

        /*
         |init MAILXsend class
         |--------------------------------------------------------------------------
         */

        $submail=new MAILXsend(PtApp::$setting['submail']['email']);
        $submail->AddTo($to_mail,$to_name);
        $submail->SetProject($project);
        $submail->AddHeaders('X-Accept','zh-cn');
        $submail->AddHeaders('X-Mailer','leo App');

        $xsend=$submail->xsend();

        print_r($xsend);

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
<?php
/**
 * 阿里云上传
 */
class Model_Aliyun_Oss extends BaseModel {
    static $table = "";
    function __construct(){
        //parent::__construct();
    }

    /**
     * @param $local_path 本地路径
     * @param $remote_path oss 路径
     * @return string
     * @throws Exception
     */
    static function upload_file($local_path,$remote_path){
        $oss = new Service\Aliyun\Oss\Api();
        $setting = PtApp::$setting;
        $url = $oss->oss_upload_file($setting['aliyun_oss']['bucket'],$local_path,$remote_path);
        return $url;
    }

    /**
     * @param $content 文件内容
     * @param $remote_path oss 路径
     * @return string
     */
    static function upload_content($content,$remote_path){
        $oss = new Service\Aliyun\Oss\Api();
        $setting = PtApp::$setting;
        $rest = $oss->oss_upload_file_content($setting['aliyun_oss']['bucket'],$remote_path,$content,strlen($content));
        return $rest;
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
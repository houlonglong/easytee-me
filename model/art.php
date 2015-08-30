<?php
/**
 * 素材
 */
class Model_Art{
    static $table = "";
    function __construct(){
        //parent::__construct();
    }
    function action_save(){
        $rand = rand(1000,999).rand(10,99);
        if (isset($_FILES['Filename'])) { //svg
            $files = $_FILES['Filename'];
            //获取svg转换位图后的图片
            $extention = str_replace('image/', '', $files['type']);
            $file_name_org = $files['name'];
            $filename = date("Y/m/d")."/".$file_name_org ."_". $rand . '.' . $extention;
            $remote_path = "arts/svg/{$filename}";
            $local_path = $files['tmp_name'];
        } else {
            $files = $_FILES['file'];
            $extention = str_replace('image/', '', $files['type']);
            $file_name_org = $files['name'];
            $filename = date("Y/m/d")."/".$file_name_org ."_". $rand . '.' . $extention;
            $remote_path = "arts/bitmap/{$filename}";
            $local_path = $files['tmp_name'];
        }
        $url = Model_Aliyun_Oss::upload_file($local_path,$remote_path);
        $printAtr = array(
            'name' => 'Art',
            'item' => array(
                array(
                    'name' => 'ArtID',
                    'value' => $url
                ),
                array(
                    'name' => 'SessionID',
                    'value' => 0
                ),
                array(
                    'name' => 'SessionToken',
                    'value' => 0
                ),
                array(
                    'name' => 'ArtName',
                    'value' => $file_name_org,
                ),
                array(
                    'name' => 'Status',
                    'value' => 'OK'
                ),
            ),
        );
        xml_response($printAtr);
    }
    /**
     * 详情
     * @return array
     *
    function action_detail(){
        $request = PtLib\http_request("id");
        return self::detail($request['id']);
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
     * 列表
     *
    function action_list(){
        return self::table_list();
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
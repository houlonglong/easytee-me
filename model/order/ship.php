<?php
/**
 * 发货
 */
class Model_Order_Ship extends BaseModel {
    static $table = "order_ship";
    function __construct(){
        //parent::__construct();
    }

    static function save($order_id,$name,$tel,$province,$city,$county,$addr,$exp_com,$exp_price){
        self::_db(NEW_DB)->insert(self::$table,array(
            "order_id"=>$order_id,
            "name"=>$name,
            "tel"=>$tel,
            "province"=>$province,
            "city"=>$city,
            "county"=>$county,
            "addr"=>addr,
            "exp_price"=>$exp_price,
            "exp_com"=>$exp_com,
        ));
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
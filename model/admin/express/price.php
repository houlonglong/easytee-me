<?php
/**
 * admin/express/price
 */
class Model_Admin_Express_Price extends Model_Admin_Abstract {
    static $table = "express_prices";
    function __construct(){
        parent::__construct();
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
     */
    function action_list(){
        return self::table_list();
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

    /*
    * 列表
    */
    static function table_list(){
        $table_alias = $table = self::$table;
        //$table_alias = '';
        $response = PtLib\get_table_list($table,$table_alias);
        return $response;
    }
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
     */
    function action_edit(){
        return self::table_edit();
    }

    /*
    * 修改
    */
    static function table_edit(){
        $id = self::_request('id');
        if($id){
            $arr = array();
            if(self::_request('price')){
               $arr['price'] = self::_request('price');
            }
            if(self::_request('price_xz')){
                $arr['price_xz'] = self::_request('price_xz');
            }
          return PtLib\db()->update('express_prices',$arr,array('id'=>$id));
        }
    }

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
<?php
/**
 * 订单第三方接口
 */
class Model_Open_Order extends BaseModel {
    static $table = "";
    function __construct(){
        //parent::__construct();
    }
    function action_save($app_id,$order_no,$activity_id,$uid,$goods_price,
        $quantity,$ship_name,$ship_tel,$ship_province,$ship_city,$ship_county,$ship_addr,
        $notes,$goods,$time,$sign
    ){
        $app = self::_db()->select_row("select app_secret from et_application where app_id = ?",$app_id);
        if(!$app) throw new Exception("app 不存在");
        $request = array(
            "model"=>"open/order",
            "action"=>"save",
            "app_id"=>$app_id,
            "order_no"=>$order_no,
            "activity_id"=>$activity_id,
            "uid"=>$uid,
            "goods_price"=>$goods_price,
            "quantity"=>$quantity,
            "ship_name"=>$ship_name,
            "ship_tel"=>$ship_tel,
            "ship_province"=>$ship_province,
            "ship_city"=>$ship_city,
            "ship_county"=>$ship_county,
            "ship_addr"=>$ship_addr,
            "subject"=>"订单描述",
            "notes"=>$notes,
            "goods"=>$goods,
            "time"=>$time,
        );
        $_sign =  md5(http_build_query($request).$app['app_secret']);
        if($_sign != $sign) throw new Exception("签名不正确");


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
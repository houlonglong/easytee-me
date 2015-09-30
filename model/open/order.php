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
        $quantity,$ship_name,$ship_tel,$ship_province,$ship_city,$ship_county,$ship_addr,$subject,
        $notes,$goods,$time,$sign
    ){
        $app = self::_db()->select_row("select id,app_secret from et_application where app_id = ?",$app_id);
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
            "subject"=>$subject,
            "notes"=>$notes,
            "goods"=>$goods,
            "time"=>$time,
        );
        $_sign =  md5(http_build_query($request).$app['app_secret']);
        if($_sign != $sign) throw new Exception("签名不正确");
        $goods = json_decode($goods,1);
        if(!$goods) throw new Exception("商品不能为空");
        $activity = self::_db()->select_row("select app.id,act.uid from et_app_activity as app left join et_activity_info as act on act.id = app.id where app.app_id = ? and app.id = ?",$app['id'],$activity_id);

        if(!$activity) throw new Exception("活动不存在");

        $order_info = array(
            "order_no"=>$order_no,
            "uid"=>$activity['uid'],
            "goods_price"=>$goods_price,
            "quantity"=>$quantity,
            "exp_price"=>0,
            "subject"=>$subject,
            "body"=>$subject,
            "status"=>1,
            "notes"=>$notes,
            "add_time"=>date_time_now(),
        );
        $order_id = self::_db()->insert("et_order",$order_info);

        self::_db()->insert("et_order_activity",array(
            "order_id"=>$order_id,
            "activity_id"=>$activity_id
        ));

        self::_db()->insert("et_order_pay",array(
            "order_id"=>$order_id,
            "pay_price"=>$goods_price,
            "pay_type"=>"third_part",
            "pay_status"=>1,
            "pay_time"=>date_time_now(),
            "balance_tx"=>0,
            "balance_ntx"=>0,
        ));

        self::_db()->insert("et_order_ship",array(
            "order_id"=>$order_id,
            "exp_price"=>0,
            "exp_com"=>"",
            "province"=>$ship_province,
            "city"=>$ship_province,
            "county"=>$ship_county,
            "addr"=>$ship_addr,
            "name"=>$ship_name,
            "tel"=>$ship_tel
        ));

        //添加商品
        foreach ($goods as $v) {
            self::_db()->insert("et_order_goods",array(
                "order_id"=>$order_id,
                "activity_id"=>$activity_id,
                "style_id"=>$v['style_id'],
                "pro_size"=>$v['pro_size'],
                "cost_price"=>$v['unit_price'],
                "sell_price"=>$v['unit_price'],
                "quantity"=>$v['quantity'],
            ));
        }

        return "订单同步成功";


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
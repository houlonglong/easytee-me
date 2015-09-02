<?php
/**
 * 订单
 */
class Model_Order extends Model_User_Abstract {
    static $table = "order";
    function __construct(){
        //parent::__construct();
    }

    /**
     * 订单确认页
     */
    function view_confirm(){

    }

    /**
     * 订单保存API
     * @link http://git.ptphp.com/easytee/easytee-me/blob/master/docs/order.md
     *
     */
    function action_save(){

    }
    static function gen_order_no(){
        return date('ymdHis') . sprintf('%03d', floor(microtime() * 1000)) . mt_rand(10, 99);
    }
    /**
     *
     * 保存订单
     *
     * @param $uid
     * @param $goods_price
     * @param $exp_price
     * @param $quantity
     * @param $subject
     * @param $body
     * @param $img_url
     * @param $notes
     */
    static function save($uid,$goods_price,$exp_price,$quantity,$subject,$body,$img_url,$notes){
        $order_no = self::gen_order_no();
        $order_id = self::_db(NEW_DB)->insert("order",array(
            'uid'=>$uid,
            'order_no'=>$order_no,
            'goods_price'=>$goods_price,
            'exp_price'=>$exp_price,
            'quantity'=>$quantity,
            'subject'=>$subject,
            'body'=>$body,
            'img_url'=>$img_url,
            'notes'=>$notes,
            'add_time'=>date_time_now(),
        ));
        return $order_id;
    }
    static function bind_activity($order_id,$activity_id){
        self::_db(NEW_DB)->insert("order_activity",array(
            "order_id"=>$order_id,
            "activity_id"=>$activity_id,
        ));
    }
    static function get_order_info_by_id($id){
        return self::_db(NEW_DB)->select_row("
              select o.*,pay.*,ship.*
              from `order` as o
              left join order_pay as pay on pay.order_id = o.id
              left join order_ship as ship on ship.order_id = o.id
              left join order_activity as ac on ac.order_id = o.id
              where o.id = ?
              ",$id);
    }
    static function get_order_info_by_order_no($order_no){
        return self::_db(NEW_DB)->select_row("
              select o.*,pay.*,ship.*
              from `order` as o
              left join order_pay as pay on pay.order_id = o.id
              left join order_ship as ship on ship.order_id = o.id
              left join order_activity as ac on ac.order_id = o.id
              where o.order_no = ?
              ",$order_no);
    }

    static function get_order_status_by_id($id){
        return self::_db(NEW_DB)->select_row("
              select o.status,pay.pay_status,ship.ship_status
              from `order` as o
              left join order_pay as pay on pay.order_id = o.id
              left join order_ship as ship on ship.order_id = o.id
              where o.id = ?
              ",$id);
    }

    static function get_order_status_by_order_no($order_no){
        return self::_db(NEW_DB)->select_row("
              select o.status,pay.pay_status,ship.ship_status
              from `order` as o
              left join order_pay as pay on pay.order_id = o.id
              left join order_ship as ship on ship.order_id = o.id
              where o.id = ?
              ",$order_no);
    }

    /**
     * 关闭订单
     * @param $id
     * @throws Exception
     */
    static function close($id){
        self::_db(NEW_DB)->update("order",array(
            "status"=>0,
            "up_time"=>date_time_now()
        ),array("id"=>$id));
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
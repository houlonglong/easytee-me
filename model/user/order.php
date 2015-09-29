<?php
/**
 * 用户订单
 */
class Model_User_Order extends Model_User_Abstract {
    static $table = "";
    function __construct(){
        parent::__construct();
    }
    function view_index(){

    }
    function view_detail($order_no){

    }

    function action_save($activity_id,$goods,$pay_type,$ship_name,$ship_tel,$ship_province,$ship_city,
                         $ship_county,$ship_addr,$exp_price,$exp_com,$notes
    ){
        $activity = self::_db()->select_row("select name,status,end_time,verify from et_activity_info where id = ?",$activity_id);
        if(!$activity) throw new Exception("没有找到活动");
        if (time() > strtotime($activity['end_time'])) throw new Exception("活动已结束");
        if ($activity['verify'] > 1) throw new Exception("活动审核不通过");
        $subject = $activity['name'];
        $goods = json_decode($goods,1);
        if(!$goods) throw new Exception("产品不能为空");

        $goods = Model_Order::get_save_goods($activity_id,$goods);
        if($goods['quantity'] == 0 ) throw new Exception("没有找到产品");
        $body = $goods['order_body'];
        $goods_price = $goods['goods_price'];
        $quantity = $goods['quantity'];
        $uid = self::get_uid();
        $order = Model_Order::save($uid,$activity_id,$goods_price,$exp_price,$quantity,$subject,$body,$notes);
        Model_Order::save_goods($order['order_id'],$goods['goods']);
        $pay_price = $exp_price + $goods_price;
        Model_Order::save_pay($order['order_id'],$pay_type,$pay_price);
        Model_Order::save_ship($order['order_id'],$exp_price,$exp_com,$ship_name,$ship_tel,$ship_province,$ship_city,$ship_county,$ship_addr);

        $url = "/order/pay/confirm?order_no=".$order['order_no']."&pay_type=".$pay_type;
        //$url = "/order/complete?order_no=".$order['order_no'];
        return array(
            "url"=>$url,
        );
    }
}
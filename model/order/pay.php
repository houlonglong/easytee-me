<?php
/**
 * 支付
 */
class Model_Order_Pay extends BaseModel {
    static $table = "";
    function __construct(){
        //parent::__construct();
    }

    /**
     * 支付成功列新订单状态
     * @param $order_id
     * @param $pay_type
     * @param $pay_price
     * @param $pay_no
     */
    static function update_pay_success($order_id,$pay_type,$pay_price,$pay_no){
        self::_db()->update("order_pay",array(
            "pay_type"  => $pay_type,
            "pay_price" => $pay_price,
            "pay_no"    => $pay_no,
            "pay_time"  => date_time_now(),
            "pay_status"=> 1,
        ),array(
            "order_id"=>$order_id,
        ));
    }

    /**
     * @param $order_no 订单号
     * @param $pay_no 商户号
     * @param $pay_price 支付金额
     * @param $pay_type 支付类型 wechat|alipay
     * @param $is_alipay_notify 是否是支付异步通知
     **/
    static function success($order_no,$pay_no,$pay_price,$pay_type,$is_alipay_notify = false){
        $order = Model_Order::get_order_info_by_order_no($order_no);
        if ($order['pay_status'] == 0 ) {//待付款
            //更新订单状态
            self::update_pay_success($order['id'],$pay_type,$pay_price,$pay_no);

            //更新活动销售总数及销售总金额
            $act_id = intval($order['activity_id']);
            $total_price = floatval($order['exp_price'] + $order['goods_price']);
            $quantity = intval($order['quantity']);
            $sql = "update et_activity_info set sale_total = sale_total + $total_price ,sales_count = sales_count + $quantity where id = ?";
            pt_debug($sql);
            self::_db()->run_sql($sql,$act_id);
            $activity = self::_db()->select_row("select * from et_activity_info where id = ?",$act_id);
            Model_Service_Activity::get_activity_profit($act_id,$activity['colors'],$activity['sale_count'],$activity['sale_target']);

            $user = self::_db()->select_row("select mobile from et_user where id = ?",$order['uid']);
            // 发送短信给买家
            $options = array(
                "order_id"=>$order_no,
                "order_title"=>$order['name'],
            );
            Model_Tools_Sms::sendsms($user['mobile'],"MIzRx2",$options);
            /**
             * 统一发货
             * todo
             * project 6QwzT2
             */


        }
        if($is_alipay_notify){
            echo "success";exit;
        }else{
            self::_location("/order/complete?order_no=".$order['order_no']);
        }
    }
    function view_confirm($order_no,$pay_type){
        $order = Model_Order::get_order_info_by_order_no($order_no);
        $pay_price = $order['pay_price'];

        if(PtApp::$ENV != "product"){
            $pay_price = 0.01;
        }

        if($pay_type == "alipay"){
            $url = Model_Order_Pay_Alipay::build_alipay_requery_url($order['order_no'],$order['subject'],$order['body'],$pay_price);
            pt_debug($url);
            self::_location($url);
        }else{
            $pay_price = $pay_price*100;
            $js_param = Model_Order_Pay_Wechat::build_js_param($order['order_no'],$order['subject']." ".$order['body'],$pay_price);
            pt_debug($js_param);
            $redirect_url = "/order/complete?order_no=".$order['order_no'];
            $cancel_redirect_url = "/order/confirm?act_id=".$order['activity_id'];
        }

        return array(
            "js_param"            => $js_param,
            "redirect_url"        => $redirect_url,
            "cancel_redirect_url" => $cancel_redirect_url
        );
    }
}
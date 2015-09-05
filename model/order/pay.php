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
     * 支付订单保存
     * @param $order_id
     * @param $pay_type
     * @param $pay_price
     * @param int $pay_status
     */
    static function save($order_id,$pay_type,$pay_price,$pay_status = 0){
        self::_db(NEW_DB)->insert("order_pay",array(
            "order_id"=>$order_id,
            "pay_type"=>$pay_type,
            "pay_price"=>$pay_price,
            "pay_status"=>$pay_status,
        ));
    }

    /**
     * 支付成功列新订单状态
     * @param $order_id
     * @param $pay_type
     * @param $pay_price
     * @param $pay_no
     */
    static function update_pay_success($order_id,$pay_type,$pay_price,$pay_no){
        self::_db(NEW_DB)->update("order_pay",array(
            "pay_type"=>$pay_type,
            "pay_price"=>$pay_price,
            "pay_no"=>$pay_no,
            "pay_time"=>date_time_now(),
            "pay_status"=>1,
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
        $order = self::_db()->select_row("select * from orders where order_no = ?",$order_no);

        if ($order['status'] == "待付款") {//已付款
            //更新订单状态
            self::_db()->update("orders",array(
                "status"=>"待发货",
                "pay_type"=>$pay_type,
            ),array("id"=>$order['id']));

            self::_db()->update("order_attributes",array(
                "pay_time"=>date('Y-m-d H:i:s'),
                "pay_type"=>$pay_type,
                "pay_no"=>$pay_no,
            ),array("order_id"=>$order['id']));

            //更新活动销售总数及销售总金额
            $act_id = intval($order['activity_id']);
            $total_price = floatval($order['total_price']);
            $quantity = intval($order['quantity']);
            $sql = "update activities set total = total + $total_price ,sales_count = sales_count + $quantity where id = $act_id";
            pt_debug($sql);
            self::_db()->run_sql($sql);


            //普通支付
            $user = self::_db()->select_row("select mobile from users where id = ?",$order['uid']);
            // 发送短信给买家
            $options = array(
                "order_id"=>$order_no,
                "order_title"=>$order['name'],
            );
            Model_Tools_Sms::sendsms($user['mobile'],"MIzRx2",$options);

            /**
             * 统一发货
             * todo
             *
             * project 6QwzT2
             *
             */


        }
        if($is_alipay_notify){
            echo "success";exit;
        }else{
            self::_location("/order/beta_complete?order_id=".$order['id']);
        }



    }
}
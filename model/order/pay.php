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
        //TODO
    }

}
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
     * @param $order_no 订单号
     * @param $pay_no 商户号
     * @param $pay_price 支付金额
     * @param $pay_type 支付类型 wechat|alipay
     * @param $is_alipay_notify 是否是支付异步通知
     */
    static function success($order_no,$pay_no,$pay_price,$pay_type,$is_alipay_notify = false){
        //TODO
    }

}
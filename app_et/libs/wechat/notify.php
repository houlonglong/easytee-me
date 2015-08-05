<?php
require_once APP."/libs/wechat/lib/WxPay.Api.php";
require_once APP."/libs/wechat//lib/WxPay.Notify.php";

class PayNotifyCallBack extends WxPayNotify
{
    var $obj;
	//查询订单
	public function Queryorder($transaction_id)
	{
		$input = new WxPayOrderQuery();
		$input->SetTransaction_id($transaction_id);
		$result = WxPayApi::orderQuery($input);
		pt_log("query:" . json_encode($result));
		if(array_key_exists("return_code", $result)
			&& array_key_exists("result_code", $result)
			&& $result["return_code"] == "SUCCESS"
			&& $result["result_code"] == "SUCCESS")
		{
			return true;
		}
		return false;
	}
    function set_controller_callback($obj){
        $this->obj = $obj;
    }
	
	//重写回调处理函数
	public function NotifyProcess($data, &$msg)
	{
		pt_log("call back:" . json_encode($data));
		$notfiyOutput = array();
		
		if(!array_key_exists("transaction_id", $data)){
			$msg = "输入参数不正确";
			return false;
		}
		//查询订单，判断订单真实性
		if(!$this->Queryorder($data["transaction_id"])){
			$msg = "订单查询失败";
			return false;
		}
        //微信支付订单号
        $transaction_id = $data['transaction_id'];
        //系统订单号
        $order_no       = $data['out_trade_no'];
        $this->obj->nativenotify_cb($data);
		return true;
	}
}

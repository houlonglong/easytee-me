<?php
include_once (APP.'/libs/wechat/index.php');
/*
 * 获取AddressSign 签名
 * JOE
 * 2014/12/5
 */
class AddressSign
{
	
	function __construct() {
	
	}
	/**
	 * 	作用：产生随机字符串，不长于32位
	 */
	public function createNoncestr( $length = 10 ) 
	{
		$chars = "0123456789";  
		$str ="";
		for ( $i = 0; $i < $length; $i++ )  {  
			$str.= substr($chars, mt_rand(0, strlen($chars)-1), 1);  
		}  
		return $str;
	}
	
	/**
	 * 	作用：格式化参数，签名过程需要使用
	 */
	function formatBizQueryParaMap($paraMap, $urlencode)
	{
		$buff = "";
		ksort($paraMap);
		foreach ($paraMap as $k => $v)
		{
		    if($urlencode)
		    {
			   $v = urlencode($v);
			}
			//$buff .= $k . "=" . $v . "&";

			if($buff == '')
				$buff .= $k . "=" . $v;
			else
				$buff .=  "&". $k . "=" . $v;
		}
		return $buff;
	}
	/**
	 * 	作用：生成签名 address
	 */
	public function getSign_address($Obj)
	{
		foreach ($Obj as $k => $v)
		{
			$Parameters[strtolower($k)] = $v;
		}
		//签名步骤一：按字典序排序参数
		ksort($Parameters);
		$String = $this->formatBizQueryParaMap($Parameters, false);
		$result_ = sha1($String);
		return $result_;
	}

	function genSha1Sign($parameters){
		$signPars = '';
		ksort($parameters);
		foreach($parameters as $k => $v) {
			if("" != $v && "sign" != $k) {
				if($signPars == '')
					$signPars .= $k . "=" . $v;
				else
					$signPars .=  "&". $k . "=" . $v;
			}
		}
		
		return SHA1($signPars);
	}
}
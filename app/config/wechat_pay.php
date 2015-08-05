<?php
/**
 * 	配置账号信息
 */

class WxPayConf_pub
{
    //=======【基本信息设置】=====================================

    #公众号
    //微信公众号身份的唯一标识。审核通过后，在微信发送的邮件中查看
    const APPID = 'wx1d665b1493725ca8';
    //JSAPI接口中获取openid，审核后在公众平台开启开发模式后可查看
    const APPSECRET = 'dd867a5e70854077b31f577fd43b1920';

    #支付相关
    //受理商ID，身份标识
    const MCHID = '1225522802';
    //商户支付密钥Key。审核通过后，在微信发送的邮件中查看
    const KEY = '11eec19d40b46b7f537f5902613b700a';


    //=======【JSAPI路径设置】===================================
    //获取access_token过程中的跳转uri，通过跳转将code传入jsapi支付页面
    const JS_API_CALL_URL = JS_API_CALL_URL;

    //=======【证书路径设置】=====================================
    //证书路径,注意应该填写绝对路径
    const SSLCERT_PATH = '/xxx/xxx/xxxx/WxPayPubHelper/cacert/apiclient_cert.pem';
    const SSLKEY_PATH = '/xxx/xxx/xxxx/WxPayPubHelper/cacert/apiclient_key.pem';

    //=======【异步通知url设置】===================================
    //异步通知url，商户根据实际开发过程设定
    const NOTIFY_URL = 'http://o.dev.jzw.la/payments/notifyUrl/wechat';

    //=======【curl超时设置】===================================
    //本例程通过curl使用HTTP POST方法，此处可修改其超时时间，默认为30秒
    const CURL_TIMEOUT = 30;
}
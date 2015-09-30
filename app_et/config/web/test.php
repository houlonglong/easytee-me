<?php
class WxPayConfig
{
    const APPID = 'wxa057291c31ac46a3';
    const APPSECRET = 'b3831ca44210e160f1a3d9348dc54171';
    const MCHID = '1250556701';
    const KEY = 'abf4a878c679f648a0d275e1f4efb615';
    const SSLCERT_PATH = '../cert/apiclient_cert.pem';
    const SSLKEY_PATH = '../cert/apiclient_key.pem';
    const CURL_PROXY_HOST = "0.0.0.0";//"10.152.18.220";
    const CURL_PROXY_PORT = 0;//8080;
    const REPORT_LEVENL = 1;
    const NOTIFY_URL = '/order/pay/wechat/notify';
    static function get_notify_url(){
        return "http://".$_SERVER['HTTP_HOST'].self::NOTIFY_URL;
    }
}
define("LOCAL_DEV",false);

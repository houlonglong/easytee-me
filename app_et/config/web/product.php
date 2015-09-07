<?php
class WxPayConfig
{
    const APPID = 'wx6be5cc51a7c96fd2';
    const APPSECRET = '71284c4e6e116eacb9ba425306a74d9b';
    const MCHID = '1227101902';
    const KEY = 'QWERTYUIOPasdfghjklzxcvbnm123456';
    const SSLCERT_PATH = '../cert/apiclient_cert.pem';
    const SSLKEY_PATH = '../cert/apiclient_key.pem';
    const CURL_PROXY_HOST = "0.0.0.0";//"10.152.18.220";
    const CURL_PROXY_PORT = 0;//8080;
    const REPORT_LEVENL = 1;
    const NOTIFY_URL = '/api?model=order/pay/wechat&action=notify';
    static function get_notify_url(){
    return "http://".$_SERVER['HTTP_HOST'].self::NOTIFY_URL;
}


<?php
/**
 * Created by PhpStorm.
 * User: joseph
 * Date: 7/10/15
 * Time: 1:25 PM
 */
include_once __DIR__.'/../app/init.php';

defined("PATH_SERVICE") or define("PATH_SERVICE","/data/projects/ptphp/service");
defined("PATH_SERVICE1") or define("PATH_SERVICE1","/data/projects/easytee/open/www/app/service");
defined("APP") or define("APP","/data/projects/easytee/open/www/app");

$_SERVER['REMOTE_ADDR'] = "127.0.0.1";
$_SERVER['HTTP_HOST'] = "open.easytee.me";

#alipay
define('ALIPAY_PARTNER',         '2088511579537124');
define('ALIPAY_KEY',             'vks0cg7118juifvsd2ydeo2is06v6mgy');
define('ALIPAY_SIGN_TYPE',       'md5');
define('ALIPAY_INPUT_CHARSET',   'utf-8');
define('ALIPAY_CACERT',          '');
define('ALIPAY_TRANSPORT',       'http');
define('ALIPAY_CALLBACK',        'http://' . $_SERVER['HTTP_HOST'] . '/auths/callback/alipay/');
define('ALIPAY_CALLBACK_RETURN', 'http://' . $_SERVER['HTTP_HOST'] . '/pay/alipay/return');
define('ALIPAY_CALLBACK_NOTIFY', 'http://' . $_SERVER['HTTP_HOST'] . '/pay/alipay/notify');
define('ALIPAY_SELLER_EMAIL',    'liuxiaoliu@zhongxingwang.com.cn');

function pt_autoload_service($classname)
{
    //pt_log($classname);
    if(substr($classname,0,8) == "Service\\") {
        if(defined("PATH_SERVICE") || defined("PATH_SERVICE1")){
            $path_name = str_replace("\\", "/", strtolower(substr($classname,8))) . ".php";

            //pt_log($path);exit;
            if (is_file($path = PATH_SERVICE . "/" . $path_name)) {
                require_once($path);
            }elseif(is_file($path = PATH_SERVICE1 . "/" . $path_name)){
                require_once($path);
            }
        }
    }
}
spl_autoload_register('pt_autoload_service');

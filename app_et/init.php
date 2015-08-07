<?php
#date_default_timezone_set('PRC');
define("PRE","<pre />");
define("SESSION_HANDLER","redis");
define("PATH_APP",__DIR__);
define("PATH_PRO",realpath(__DIR__."/../"));
define("PATH_MODEL",PATH_PRO."/model");
define("PATH_DOC",PATH_PRO."/docs");
define("PATH_LOG",PATH_PRO."/log");
define("PATH_WEBROOT",PATH_PRO."/webroot");

define("PATH_PTPHP",__DIR__."/ptphp");
define("PATH_LIBS",__DIR__."/libs");
define("PATH_BIN",PATH_PRO."/bin");
define("PATH_CLI",PATH_PRO."/bin/cli.php");
define("PATH_TESTS",PATH_PRO."/tests");
define("PATH_CONFIG",PATH_APP."/config");

include_once __DIR__."/ptphp/PtPHP.php";
include_once __DIR__."/ptphp/PtApp.php";

set_exception_handler('PtLib\exception_handler');
set_error_handler('PtLib\error_handler');
spl_autoload_register('pt_autoload');
register_shutdown_function('PtLib\shutdown');
include_once PATH_CONFIG."/define.php";
$setting = array();
if(is_file(PATH_CONFIG."/setting_default.ini")){
    $setting = parse_ini_file(PATH_CONFIG."/setting_default.ini",true);
}

$_PT_ENV = PtLib\get_pt_env("PT_ENV");
if($_PT_ENV && $_PT_ENV != "develop" && is_file(PATH_CONFIG."/setting_$_PT_ENV.ini")){
    $setting = array_merge($setting,parse_ini_file(PATH_CONFIG."/setting_$_PT_ENV.ini",true));
}
//print_json($setting);exit;
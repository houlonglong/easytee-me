<?php
#date_default_timezone_set('PRC');
define("PRE","<pre />");
define("SESSION_HANDLER","redis");
define("PATH_APP",__DIR__);
define("PATH_PRO",realpath(__DIR__."/../"));
define("PATH_MODEL",PATH_PRO."/model");
define("PATH_LOG",PATH_PRO."/log");
define("PATH_WEBROOT",PATH_PRO."/webroot");

define("PATH_PTPHP",__DIR__."/ptphp");
define("PATH_LIBS",__DIR__."/libs");
define("PATH_BIN",PATH_PRO."/bin");
define("PATH_CLI",PATH_PRO."/bin/cli.php");
define("PATH_TESTS",PATH_PRO."/tests");
define("PATH_CONFIG",PATH_APP."/config");

include_once PATH_PTPHP . "/PtPHP.php";

set_exception_handler('Pt\exception_handler');
set_error_handler('Pt\error_handler');
spl_autoload_register('Pt\autoload');
register_shutdown_function('Pt\shutdown');

include_once PATH_CONFIG."/define.php";

$setting = array();
if(is_file(PATH_CONFIG."/default.ini")){
    $setting = parse_ini_file(PATH_CONFIG."/default.ini",true);
}

$_PT_ENV = Pt\get_pt_env("PT_ENV");
if($_PT_ENV && $_PT_ENV != "develop" && is_file(PATH_CONFIG."/$_PT_ENV.ini")){
    $setting = array_merge($setting,parse_ini_file(PATH_CONFIG."/$_PT_ENV.ini",true));
}
//print_json($setting);exit;
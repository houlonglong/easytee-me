<?php
#date_default_timezone_set('PRC');
define("PRE","<pre />");
define("SESSION_HANDLER","redis");
define("PATH_APP",__DIR__);
define("PATH_PRO",realpath(__DIR__."/../"));
define("PATH_MODEL",PATH_PRO."/model");
define("PATH_DOC",PATH_PRO."/docs");
define("PATH_LOG",PATH_PRO."/log");
define("PATH_SERVICE",PATH_PRO."/service");
define("PATH_WEBROOT",PATH_PRO."/webroot");

define("PATH_PTPHP",__DIR__."/ptphp");
define("PATH_LIBS",__DIR__."/libs");
define("PATH_BIN",PATH_PRO."/bin");
define("PATH_CLI",PATH_PRO."/bin/cli.php");
define("PATH_TESTS",PATH_PRO."/tests");
define("PATH_CONFIG",PATH_APP."/config");

include_once __DIR__."/ptphp/PtPHP.php";
include_once __DIR__."/ptphp/PtApp.php";

function pt_debug($msg){
    if(defined("PT_DEBUG") && !PT_DEBUG) return;
    if(strtolower(PHP_SAPI) == "cli") return;
    $uri = $_SERVER['REQUEST_URI'];
    if(!is_dir("/tmp")) return;
    $date = "h:i:s";
    if(is_array($msg) ||  is_object($msg)){
        $msg = json_encode($msg,JSON_UNESCAPED_UNICODE);
    }
    if(is_bool($msg)){
        $msg = $msg? "true":"false";
    }
    $data = "[$date] $uri: $msg";
    file_put_contents("/tmp/pt_debug.log",$data.PHP_EOL,FILE_APPEND);
}

set_exception_handler('PtLib\exception_handler');
set_error_handler('PtLib\error_handler');
spl_autoload_register('pt_autoload');
register_shutdown_function('PtLib\shutdown');
$setting = array();

function set_setting(){
    $GLOBALS['setting'] = array();
    $_PT_ENV = PtLib\get_pt_env("PT_ENV");
    PtApp::$ENV = $_PT_ENV;
    if(is_file(PATH_CONFIG."/setting/$_PT_ENV.ini")){
        $GLOBALS['setting'] = array_merge($GLOBALS['setting'],parse_ini_file(PATH_CONFIG."/setting/$_PT_ENV.ini",true));
    }

    if(is_file(PATH_CONFIG."/base/$_PT_ENV.php")){
        require PATH_CONFIG."/base/$_PT_ENV.php";
    }
    if(!PtLib\is_cli()){
        if(is_file(PATH_CONFIG."/web/$_PT_ENV.php")){
            require PATH_CONFIG."/web/$_PT_ENV.php";
        }
    }
    PtApp::$setting = $GLOBALS['setting'];
    //return $setting;
}



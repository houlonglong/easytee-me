<?php
#date_default_timezone_set('PRC');
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

set_exception_handler('PtLib\exception_handler');
set_error_handler('PtLib\error_handler');
spl_autoload_register('pt_autoload');
register_shutdown_function('PtLib\shutdown');
$setting = array();



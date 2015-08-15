<?php
/**
 * Created by PhpStorm.
 * User: joseph
 * Date: 7/10/15
 * Time: 1:25 PM
 */

include_once __DIR__.'/../app_et/init.php';
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
set_setting();

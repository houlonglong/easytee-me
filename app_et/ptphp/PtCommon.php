<?php
namespace Pt;
function autoload($classname)
{
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
    //pt_log($classname);
    if(substr($classname,0,6) == "Model_") {
        if(defined("PATH_MODEL")){
            $path = PATH_MODEL . "/" . str_replace("_", "/", strtolower(substr($classname,6))) . ".php";
            //pt_log($path);
            if (is_file($path)) {
                require_once($path);
            } else {
                throw new ErrorException($classname . " 文件地址不存在");
            }
        }
    }elseif(substr(strtolower($classname),0,6) == "ptlib\\" && defined("PATH_PTPHP_LIBS")){
        $path = str_replace("ptlib",PATH_PTPHP_LIBS,str_replace("\\","/",strtolower($classname))).".php";
        //pt_log("require_once: %s",$path);
        if (is_file($path)) {
            require_once($path);
        } else {
            throw new ErrorException($classname . " 文件地址不存在");
        }

    }else{

    }
}

function set_session_handler(){
    if(defined("SESSION_HANDLER")){
        if(SESSION_HANDLER == 'redis' && class_exists("Redis")){
            ini_set('session.save_handler', 'redis');
            ini_set('session.save_path',    'tcp://127.0.0.1:6379');
        }
        if(SESSION_HANDLER == 'memcache' && class_exists("Memcache")){
            ini_set('session.save_handler', 'memcache');
            ini_set('session.save_path',    'tcp://127.0.0.1:11211');
        }
    }
}

function route($model_file,$action,$method_prefix = "action",$return = false)
{
    App::$model = App::get_model($model_file);
    $model_file_path = get_model_file_path($model_file);
    App::$model_path = $model_file_path;
    if(is_dir(PATH_MODEL) &&
        is_file($model_file_path)){

        //include_once(str_replace(DOCUMENT_ROOT,PATH_MODEL,SCRIPT_FILENAME));
        $model_class_name = get_model_class_name(App::$model);
        if(!class_exists($model_class_name)){
            throw new ErrorException("类: $model_class_name 不存在",100404);
        }
        $model_obj = new $model_class_name();
        $model_action_name = get_model_action_name($action,$method_prefix);
        App::$model_class_name = $model_class_name;
        if($method_prefix == 'action'){
            App::$model_action_name = $model_action_name;
        }else{
            App::$model_view_name = $model_action_name;
        }

        if(!method_exists($model_obj,$model_action_name)){
            throw new ErrorException("$method_prefix: $model_class_name->$model_action_name 不存在",100404);
        }
        $model_return = $model_obj->$model_action_name();
        if($model_return !== null){ //有返回值
            //TODO array or object
            if($return){
                return $model_return;
            }else{
                json_response($model_return,0);
            }
        }
    }else{
        throw new ErrorException("Model: $model_file 不存在",100404);
    }
}

function web_route(){

    define("DOCUMENT_ROOT",$_SERVER['DOCUMENT_ROOT']);
    define("SCRIPT_FILENAME",$_SERVER['SCRIPT_FILENAME']);
    define("SCRIPT_NAME",$_SERVER['SCRIPT_NAME']);
    define("REQUEST_URI",$_SERVER['REQUEST_URI']);
    ob_start();

    if(!empty($_SERVER['REDIRECT_URL']) || $_SERVER['SCRIPT_NAME'] == "/index.php"){
        if($_SERVER['SCRIPT_NAME'] == "/index.php")
            $REDIRECT_URL = "/index";
        else
            $REDIRECT_URL = $_SERVER['REDIRECT_URL'];
        $path =  PATH_WEBROOT.$REDIRECT_URL.".php";
        App::$control = $REDIRECT_URL;

        if(is_file($path)){
            App::$control_path = $path;
            include_once $path;exit;
        }else{//action
            //pt_log(PtApp::$model);
            $model_file = $REDIRECT_URL;
            if(!empty($_REQUEST['action'])){
                App::$action = $_REQUEST['action'];
                route($model_file,App::$action,"action");
            }else{
                throw new ErrorException("not found url",100404);
            }
        }
    }else{
        $SCRIPT_NAME = $_SERVER['SCRIPT_NAME'];
        if(substr($SCRIPT_NAME,-4) == ".php"){
            App::$control = $SCRIPT_NAME;
            $path =  PATH_WEBROOT.$SCRIPT_NAME;
            if(is_file($path)) {
                App::$control_path = $path;
                //echo $path;
                include $path;exit;
            }
            //throw new PtException("not found url",100404);
        }else{
            throw new ErrorException("REDIRECT_URL no define , Maybe not apache ");
        }
    }
}

function cli_route(){
    global $argv;
    if(count($argv) < 3){
        throw new ErrorException("\nusage : \n\t php bin/cli.php model cli_method \n");
    }
    $model_file = "/".$argv[1].".php";
    $action = $argv[2];
    route($model_file,$action,"cli");
}
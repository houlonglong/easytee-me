<?php
class PtApp{
    static $auth;
    static $action;
    static $model;
    static $control;
    static $control_path;
    static $model_path;
    static $model_class_name;
    static $model_action_name;
    static $model_view_name;
    static $breadcrumb = array();
    static $session_started = false;
    static $ob_flushed = false;
    static function session_start(){
        if(!self::$session_started){
            session_start();
            self::$session_started = true;
        }
    }
    static function current_url(){
        if(isset($_SERVER['HTTP_HOST']) && isset($_SERVER['SERVER_PORT']) && isset($_SERVER['REQUEST_URI'])){
            $host = "http://".$_SERVER['HTTP_HOST'];
            if($_SERVER['SERVER_PORT'] != 80){
                $host .= ":".$_SERVER['SERVER_PORT'];
            }
            return $host.$_SERVER['REQUEST_URI'];
        }else{
            return "/";
        }
    }
    static function get_model($model){
        if(substr($model,-4) == ".php")
            $model = substr($model,0,-4);
        if(substr($model,0,1) != "/")
            $model = "/".$model;
        return $model;
    }
}

function pt_autoload($classname)
{
    if(substr($classname,0,8) == "Service\\") {
        if(defined("PATH_SERVICE") || defined("PATH_SERVICE1")){
            $path_name = str_replace("\\", "/", strtolower(substr($classname,8))) . ".php";
            if (is_file($path = PATH_SERVICE . "/" . $path_name)) {
                require_once($path);
            }elseif(is_file($path = PATH_SERVICE1 . "/" . $path_name)){
                require_once($path);
            }
        }
    }
    if(substr($classname,0,6) == "Model_") {
        if(defined("PATH_MODEL")){
            $path = PATH_MODEL . "/" . str_replace("_", "/", strtolower(substr($classname,6))) . ".php";
            if (is_file($path)) {
                require_once($path);
            } else {
                throw new PtLib\ErrorException($classname . " 文件地址不存在");
            }
        }
    }elseif(substr(strtolower($classname),0,6) == "ptlib\\" && defined("PATH_PTPHP_LIBS")){
        $path = str_replace("ptlib",PATH_PTPHP_LIBS,str_replace("\\","/",strtolower($classname))).".php";
        if (is_file($path)) {
            require_once($path);
        } else {
            throw new PtLib\ErrorException($classname . " 文件地址不存在");
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

function route_model($model_file,$action,$method_prefix = "action",$return = false)
{
    PtApp::$model = PtApp::get_model($model_file);
    $model_file_path = PtLib\get_model_file_path($model_file);
    PtApp::$model_path = $model_file_path;
    if(is_dir(PATH_MODEL) &&
        is_file($model_file_path)){

        //include_once(str_replace(DOCUMENT_ROOT,PATH_MODEL,SCRIPT_FILENAME));
        $model_class_name = PtLib\get_model_class_name(PtApp::$model);
        if(!class_exists($model_class_name)){
            throw new ErrorException("类: $model_class_name 不存在",100404);
        }
        $model_obj = new $model_class_name();
        $model_action_name = PtLib\get_model_action_name($action,$method_prefix);
        PtApp::$model_class_name = $model_class_name;
        if($method_prefix == 'action'){
            PtApp::$model_action_name = $model_action_name;
        }else{
            PtApp::$model_view_name = $model_action_name;
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
                PtLib\json_response($model_return,0);
            }
        }
    }else{
        throw new ErrorException("Model: $model_file 不存在",100404);
    }
}
function route_control($path){
    include_once PATH_PTPHP."/libs/ui.php";
    $info = pathinfo($path);
    $model_file = str_replace(PATH_WEBROOT,"",$info['dirname']);
    PtApp::$model = PtApp::get_model($model_file);
    $model_file_path = PtLib\get_model_file_path($model_file);
    PtApp::$model_path = $model_file_path;

    if(is_dir(PATH_MODEL) &&
        is_file($model_file_path)){
        $model_class_name = PtLib\get_model_class_name(PtApp::$model);
        $model_action_name = "view_".strtolower($info['filename']);

        PtApp::$model_view_name = $model_action_name;
        if(class_exists($model_class_name) && method_exists($model_class_name,$model_action_name)){
            $model_obj = new $model_class_name();
            $model_return = $model_obj->$model_action_name();
            if($model_return) extract($model_return);
        }
    }
    PtApp::$control_path = $path;
    include_once $path;exit;
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
        PtApp::$control = $REDIRECT_URL;

        if(is_file($path)){
            route_control($path);
        }else{//action
            //pt_log(PtApp::$model);
            $model_file = $REDIRECT_URL;
            if(!empty($_REQUEST['action'])){
                PtApp::$action = $_REQUEST['action'];
                route_model($model_file,PtApp::$action,"action");
            }else{
                throw new ErrorException("not found url",100404);
            }
        }
    }else{
        $SCRIPT_NAME = $_SERVER['SCRIPT_NAME'];
        if(substr($SCRIPT_NAME,-4) == ".php"){
            PtApp::$control = $SCRIPT_NAME;
            $path =  PATH_WEBROOT.$SCRIPT_NAME;
            if(is_file($path)) {
                route_control($path);
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
    route_model($model_file,$action,"cli");
}
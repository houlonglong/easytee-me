<?php
class PtApp{
    static $setting = array();
    static $ENV = "delelop";
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



function set_setting(){
    $GLOBALS['setting'] = parse_ini_file(PATH_CONFIG."/setting.ini",true);
    $_PT_ENV = PtLib\get_pt_env("PT_ENV");
    PtApp::$ENV = $_PT_ENV;
    if(is_file(PATH_CONFIG."/setting/$_PT_ENV.ini")){
        $GLOBALS['setting'] = array_merge($GLOBALS['setting'],parse_ini_file(PATH_CONFIG."/setting/$_PT_ENV.ini",true));
    }
    require PATH_CONFIG."/base.php";
    if(is_file(PATH_CONFIG."/base/$_PT_ENV.php")){
        require PATH_CONFIG."/base/$_PT_ENV.php";
    }
    if(!PtLib\is_cli()){
        require PATH_CONFIG."/web.php";
        if(is_file(PATH_CONFIG."/web/$_PT_ENV.php")){
            require PATH_CONFIG."/web/$_PT_ENV.php";
        }
    }
    //print_josn($GLOBALS['setting']);
    PtApp::$setting = $GLOBALS['setting'];
    //return $setting;
}
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
    set_setting();
    define("DOCUMENT_ROOT",$_SERVER['DOCUMENT_ROOT']);
    define("SCRIPT_FILENAME",$_SERVER['SCRIPT_FILENAME']);
    define("SCRIPT_NAME",$_SERVER['SCRIPT_NAME']);
    define("REQUEST_URI",$_SERVER['REQUEST_URI']);
    ob_start();

    if(isset($_REQUEST['model']) && isset($_REQUEST['action'])){
        $model_file = $_REQUEST['model'];
        PtApp::$action = $_REQUEST['action'];
        route_model($model_file,PtApp::$action,"action");

    }else{

        if(!empty($_SERVER['REDIRECT_URL']) || $_SERVER['SCRIPT_NAME'] == "/index.php"){
            if($_SERVER['SCRIPT_NAME'] == "/index.php")
                $REDIRECT_URL = "/index";
            else
                $REDIRECT_URL = $_SERVER['REDIRECT_URL'];

            if(substr($REDIRECT_URL,-4) == '.php') $REDIRECT_URL = substr($REDIRECT_URL,0,-4);
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
            $info = parse_url(REQUEST_URI);
            $REDIRECT_URL = $info['path'];

            if(substr($REDIRECT_URL,-4) == ".php"){
                PtApp::$control = substr($REDIRECT_URL,0,-4);
                $path =  PATH_WEBROOT.$REDIRECT_URL;
            }else{
                if(substr($REDIRECT_URL,-1) == "/"){
                    $REDIRECT_URL = $REDIRECT_URL."index";
                }
                PtApp::$control = $REDIRECT_URL;
                $REDIRECT_URL = $REDIRECT_URL.".php";
                $path =  PATH_WEBROOT.$REDIRECT_URL;

            }
            if(is_file($path)) {
                route_control($path);
            }else{//action
                $model_file = $REDIRECT_URL;
                if(!empty($_REQUEST['action'])){
                    PtApp::$action = $_REQUEST['action'];
                    route_model($model_file,PtApp::$action,"action");
                }else{
                    throw new ErrorException("not found url",100404);
                }
            }
        }
    }


}
function cli_route(){
    global $argv;
    $usage = "\nusage : \n\t php bin/cli.php --model=index --action=index --env=develop \n";
    if(count($argv) < 2){
        throw new ErrorException($usage);
    }
    $shortopts  = "";
    $longopts  = array(
        "model:",
        "action:",
        "env:",
    );
    $options = getopt($shortopts, $longopts);

    if(empty($options['env'])){
        $_SERVER['PT_ENV'] = "develop";
    }else{
        $_SERVER['PT_ENV'] = $options['env'];
    }
    set_setting();
    if(empty($options['model'])){
        throw new ErrorException($usage);
    }
    if(empty($options['action'])){
        throw new ErrorException($usage);
    }
    if(substr($options['model'],0,1) == '/') $options['model'] = substr($options['model'],1);
    if(substr($options['model'],-4) == '.php') $options['model'] = substr($options['model'],0,-4);

    foreach($_SERVER['argv'] as $value){
        if(substr($value,0,2) == "--"){
            $t = explode("=",substr($value,2));
            if(!in_array($t[0],array("model","action","env"))) $_REQUEST[$t[0]] = $t[1];
        }
    }

    //var_dump($options);
    //print_r($_SERVER['argv']);
    //print_r($_SERVER['PT_ENV']);
    //exit;
    $model_file = "/".$options['model'].".php";
    $action = $options['action'];
    route_model($model_file,$action,"cli");
}

function mysql_escape($str){
    return $str;
}
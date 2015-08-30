<?php
namespace PtLib;
use PtLib;
use Exception;
use Memcache;
use Redis;
use stdClass;

class ErrorException extends Exception{}

function db_select_row($sql){
    $args = func_get_args();
    if(count($args) > 1){
        if(is_array($args[1])){
            $args = $args[1];
        }else{
            array_shift($args);
        }
    }else{
        $args = array();
    }
    return db()->run($sql,$args,TRUE,'one');
}

/**
 * @param $sql
 * @return array
 * @throws Exception
 */
function db_select_rows($sql){
    $args = func_get_args();
    if(count($args) > 1){
        if(is_array($args[1])){
            $args = $args[1];
        }else{
            array_shift($args);
        }
    }else{
        $args = array();
    }
    return db()->run($sql,$args,TRUE,'all');
}

function db($key = "default"){
    return PtLib\Database::init($key);
}


function table_edit($table){
    if(empty($table)) throw new ErrorException("table is not defined");
    $request = http_request("oper");
    //$request = PtLib\http_request("oper");
    $oper = $request['oper'];
    $id = empty($_REQUEST['id'])?"":$_REQUEST['id'];
    $condition = array("id"=>$id);
    $data = http_request("name");
//    $data = PtLib\http_request("name");
    if($oper == 'edit' && $id && $data){
        db()->update($table,$data,$condition);
//        PtLib\db()->update($table,$data,$condition);
    }
    if($oper == 'add'){
        db()->insert($table,$data);
//        PtLib\db()->insert($table,$data);
    }
    if($oper == 'del'&& $id && $data){
        db()->delete($table,$condition);
//        PtLib\db()->delete($table,$condition);
    }
    return array();
}

function get_table_list($table,$table_alias,$join = ''){
    #$join = '';
    //fields
    $select_fields = " $table_alias.* ";
    if(empty($table_alias)) throw new ErrorException("table is not defined");
//    $request = http_request("rows","page","sidx","sord");
    $request = PtLib\http_request("rows","page","sidx","sord");
    $limit = $request['rows'];
    $page = $request['page'];
    $sort = $request['sidx'];
    $sort_type = $request['sord'];

    if(empty($limit)) $limit = 20;
    if(empty($page)) $page = 1;
    if(empty($sort)){
        $sort = "id";
        $sort_type = "desc";
    }else{
        if(empty($sort_type)) $sort_type = "desc";
    }

    //where
    $args = array();
    $where  = " where 1=1 ";
    //order
    $order = "";
    if($sort)
        $order = "order by $table_alias." .addslashes($sort) ." ".$sort_type;
    $sql = "select count($table_alias.id) as total from $table as $table_alias $join $where ";
    $count_res = db()->select_row($sql,$args);
    #$count_res = PtLib\db()->select_row($sql,$args);
    $records = $count_res['total'];
    $response = new stdClass();
    $response->page    = $page;  //cur page

    if( $records > 0 ) {
        $total_pages = ceil($records/$limit);
    }
    else {
        $total_pages = 1;
    }
    if ($page > $total_pages) $page=$total_pages;

    $response->total   = $total_pages;      //total pages
    $response->records = $records; //count

    $skip = ($page - 1) * $limit;

    $sql = "select $select_fields from $table as $table_alias $join $where $order limit $skip,$limit ";
    $rows = db()->select_rows($sql,$args);
    #$rows = PtLib\db()->select_rows($sql,$args);
    foreach($rows as $row){
        $response->rows[] = array(
            'id'=>$row['id'],
            "cell"=>$row
        );
    }
    return $response;
}
/**
 * $unicodeChar = "\u56de\u590d\uff1a";
 * echo  unicodeString($unicodeChar);
 * unicode 编码转 简体中文
 * @param $str
 * @param null $encoding
 * @return mixed
 */
function unicodeString($str, $encoding=null) {
    return preg_replace_callback('/\\\\u([0-9a-fA-F]{4})/u', create_function('$match', 'return mb_convert_encoding(pack("H*", $match[1]), "utf-8", "UTF-16BE");'), $str);
}


function get_pt_env($key){
    if(is_cli()){
        if(isset($_SERVER[$key]))
            return $_SERVER[$key];
        else
            return null;
    }else{
        if(isset($_SERVER[$key]))
            return $_SERVER[$key];
        else
            return null;
    }
}
function json_redirect($msg,$url,$status = 0){
    json_response("",$status,$msg,$url);
}
function get_argvs(){
    $argvs = $_SERVER['argv'];
    return array_slice($argvs,3);
}
function http_client(){
    if(!isset($GLOBALS['http_client_obj'])){
        $http_client_obj =  new PtLib\Curl();
        $GLOBALS['http_client_obj'] = $http_client_obj;
    }else{
        $http_client_obj = $GLOBALS['http_client_obj'];
    }
    return $http_client_obj;
}

function redis($key = "default"){
    $g_key = "redis_cache_obj_$key";
    if(!isset($GLOBALS[$g_key])){
        global $setting;
        if(isset($setting) && isset($setting['redis']) && isset($setting['redis'][$key])){
            $config = $setting['redis'][$key];
            $config['pconnect'] = isset($config['pconnect'])?$config['pconnect']:false;
            $config['timeout']  = isset($config['timeout'])?$config['timeout']:1.5;

        }else{
            $config['host']     = "127.0.0.1";
            $config['port']     = "6379";
            $config['pconnect'] = false;
            $config['timeout']  = 1.5;
        }

        if(!class_exists("Redis")){
            throw new Exception("Redis not found");
        }
        try{
            $timeout = $config['timeout'];
            $obj  = new Redis();
            if(isset($config['pconnect']) && $config['pconnect']){
                $obj->pconnect($config['host'],intval($config['port']),$timeout);
            }else{
                $obj->connect($config['host'],intval($config['port']),$timeout);
            }
            $GLOBALS[$g_key] = $obj;

        }catch (RedisException $e){
            throw new Exception($e->getMessage());
        }catch (Exception $e){
            throw new Exception($e->getMessage());
        }

    }else{
        $obj = $GLOBALS[$g_key];
    }
    return $obj;
}

function mem_cache($key = "default"){
    $g_key = "memcache_obj_$key";
    if(!isset($GLOBALS[$g_key])){
        global $setting;
        if(isset($setting) && isset($setting['mem_cache']) && isset($setting['mem_cache'][$key])){
            $config = $setting['mem_cache'][$key];
            $host = $config['host'];
            $port = $config['port'];
        }else{
            $host = "127.0.0.1";
            $port = 11211;
        }
        $memcache_obj =  new Memcache;
        $memcache_obj->connect($host, $port);
        $GLOBALS[$g_key] = $memcache_obj;
    }else{
        $memcache_obj = $GLOBALS[$g_key];
    }
    return $memcache_obj;
}
function is_xhr(){
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
}
function is_cli(){
    return strtolower(PHP_SAPI) == "cli";
}
function is_win(){
    return strtoupper(substr(PHP_OS,0,3))==='WIN';
}

/**
 * 判断是不是微信浏览器
 * @return bool
 */
function is_wx_browser(){
    return isset($_SERVER['HTTP_USER_AGENT']) && strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false;
}

function pre($var,$is_exit = 0){
    echo PRE;
    print_r($var);
    if($is_exit){
        exit;
    }
}
function print_json($var){
    echo json_encode($var,JSON_PRETTY_PRINT);
    if(is_cli()){

    }else{
        exit;
    }

}
function die_json($var){
    ob_clean();
    echo json_encode($var,JSON_PRETTY_PRINT);
    if(is_cli()){

    }else{
        exit;
    }

}
function http_request(){
    $_args = array();
    $args = func_get_args();
    foreach($args as $key){
        $_args[$key] = isset($_REQUEST[$key])?$_REQUEST[$key]:null;
    }
    return $_args;
}
function http_get(){
    $_args = array();
    $args = func_get_args();
    foreach($args as $key){
        $_args[$key] = isset($_GET[$key])?$_GET[$key]:null;
    }
    return $_args;
}
function http_post(){
    $_args = array();
    $args = func_get_args();
    foreach($args as $key){
        $_args[$key] = isset($_POST[$key])?$_POST[$key]:null;
    }
    return $_args;
}
function http_request_body(){
    return @file_get_contents('php://input');
}
/**
 * json 异常 响应
 *
 * @param string $message   返回提示
 * @param int $status       状态值
 * @param string $redirect  跳转地址
 * @param array $return
 */
function json_error($message,$status = 1,$redirect = '',$return = array(),$exception = array()){
    json_response($return,$status,$message,$redirect,$exception);
}

/**
 * json 成功 响应
 *
 * @param $return
 */
function json_success($return){
    json_response($return);
}

/**
 * json 响应
 *
 * @param $return
 * @param string $message   返回提示
 * @param int $status       状态值
 * @param string $redirect  跳转地址
 * @param object debug      debug信息
 */
function json_response($return,$status = 0,$message = '',$redirect = '',$exception = array()){
    if(is_cli()) return;
    $run_print = ob_get_clean();
    if(!\PtApp::$ob_flushed) header('Content-Type: application/json');
    $debug = array(
        "run_print"=>$run_print,
        "debug"=>get_run_debug()
    );
    $data = array(
        "return"=>$return,
        "message"=>$message,
        "redirect"=>$redirect,
        "status"=>$status,
    );
    if(local_dev()){
        $data['exception'] = $exception;
        $data['debug_sql'] = $debug['debug']['sql'];
        $data['debug_app'] = $debug['debug']['app'];
    }
    echo json_encode($data);exit;
}

/**
 * 获取DEBUG信息
 * @return array
 */
function get_run_debug(){
    if(!local_dev()){
        return array();
    }else{
        log(PtLib\Database::$run_stack);
        return array(
            "sql"=>PtLib\Database::$run_stack,
            "app"=>get_class_vars("PtApp"),
            "include_file"=>get_included_files()
        );
    }

}

/**
 *
 * @param $model_rel_path
 */
function get_model_class_name($model_rel_path){
    if(substr($model_rel_path,0,1) == "/")
        $model_rel_path = substr($model_rel_path,1);
    if(substr($model_rel_path,-4) == ".php")
        $model_rel_path = substr($model_rel_path,0,-4);

    $t = explode("/",$model_rel_path);
    $name = "Model";
    foreach($t as $item){
        $name .= "_".ucfirst($item);
    }
    return $name;
}

function get_model_action_name($action,$prefix = "action"){
    return $prefix."_".strtolower($action);
}

/**
 * 错误信息处理
 * @param $error_code
 * @param $error_msg
 * @param $file
 * @param $line
 */
function error_handler($error_code, $error_msg, $file, $line){
    $msg = array(
        "file"=>$file,
        "line"=>$line,
        "code"=>$error_code,
        "msg"=>$error_msg,
    );
    log("errhd",$msg);
    if(!is_cli()){
        ob_clean();
        json_error($error_msg,$error_code,'',array(),$msg);
    }
    //todo error type exit or not
}
function http_404(){
    header("HTTP/1.1 404 Not Found");
    echo "<h1>Not Found</h1>";
    exit;
}
/**
 * 异常处理
 * @param $exception
 */
function exception_handler($exception){
    $msg = array(
        "file"=>$exception->getFile(),
        "line"=>$exception->getLine(),
        "code"=>$exception->getCode(),
        "msg"=>$exception->getMessage(),
    );
    if(!is_cli()){
        ob_clean();
        $error_code = ($exception->getCode() == 0)?1:$exception->getCode();
        if($error_code == 100404 && !local_dev()){
            http_404();
        }
        json_error($exception->getMessage(),$error_code,'',array(),$msg);
    }else{
        log("except",$msg);
        exit;
    }
}

function log(){
    $log_types = array("debug","error","info","except","errhd");
    $args = func_get_args();

    $_args = array();
    $i = 0;
    $log_type = "debug";
    foreach($args as $arg){
        //var_dump($arg);
        //var_dump($log_types);
        //var_dump(in_array($arg."",$log_types));exit;
        if($i == 0 && !is_array($arg) && in_array($arg."",$log_types)){
            $log_type = $arg;
            if($log_type == "except" || $log_type == "errhd"){
                break;
            }
            continue;
        }
        if(is_array($arg) || is_object($arg)) {
            if (is_cli() || local_dev()) {
                $v = json_encode($arg, JSON_PRETTY_PRINT);
            } else {
                $v = json_encode($arg);
            }
            $_args[] = $v;
        }elseif(is_bool($arg)){
            $_args[] = $arg ? "true" : "false";
        }else{
            $_args[] = $arg."";
        }
        $i++;
    }

    if($log_type == "except" || $log_type == "errhd"){
        $error = func_get_arg(1);
        $code = $error['code'];
        $file = $error['file'];
        $line = $error['line'];
        $_args[] = $error['msg'];
    }else{
        $traces = debug_backtrace();
        $trace = $traces[0];
        $line = $trace['line'];
        $file = $trace['file'];
        $code = 1;
    }
    $date = date("Y:m:d H:i:s");
    if(count($_args) == 1){
        array_unshift($_args,"%s");
    }
    //ob_clean();
    //echo json_encode($_args) ;exit;
    $content =  sprintf("[$date] [$log_type] [$code] $file:$line\n%s",call_user_func_array('sprintf', $_args)).PHP_EOL;

    if(is_cli()){
        echo $content;
    }else{
        if(defined("PATH_LOG")){
            $dir = PATH_LOG;
        }else{
            if(is_win()){
                $dir = "c:\\php_log";
            }else{
                $dir = "/var/tmp/php_log";
            }
        }

        if(!is_dir($dir)){
            @mkdir($dir,0755,1);
        }
        $date1 = date("y_m_d");
        $file_name = "run_$date1.log";
        file_put_contents($dir."/".$file_name,$content,FILE_APPEND);
    }
}



function shutdown(){
    $last_error = error_get_last();
    if ($last_error['type'] == 1) {//Catching fatal errors
        error_handler(E_ERROR, $last_error['message'], $last_error['file'], $last_error['line']);
    }
    if(!is_cli()){
        $http_body = ob_get_clean();
        //pt_log(get_class_vars("PtApp"));
        echo $http_body;
    }
}
function get_model_file_path($path){
    if(substr($path,0,1) != "/") $path = "/".$path;
    if(substr($path,-4) != ".php") $path = $path.".php";
    return PATH_MODEL.$path;
}
function local_dev(){
    if(isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] == '127.0.0.1')
        return true;
    else
        return false;
}
function get_model_test_content($model_test_class_name,$title){
    $content = file_get_contents(PATH_APP."/_templates/test.php");
    $content = str_replace("Model_Test_Class_Name",$model_test_class_name,$content);
    $content = str_replace("Model Title Name",$title,$content);
    return $content;
}
function get_model_content($model_name,$title){
    $content = file_get_contents(PATH_APP."/_templates/model.php");
    $content = str_replace("Model_Class_Name",$model_name,$content);
    $content = str_replace("Model Title Name",$title,$content);
    return $content;
}

function gen_test($model,$title){
    if(substr($model,-4) != ".php") $model = $model.".php";
    if(substr($model,0,1) != "/")   $model = "/".$model;
    $info1 = pathinfo($model);
    $filename = $info1['filename'];

    $path_doc = PATH_DOC."".$info1['dirname']."/".$info1['filename'].".md";

    if(!is_file($path_doc)){
        $content = file_get_contents(PATH_APP."/_templates/doc.md");
        $content = str_replace("MODEL_NAME",$title,$content);
        if(!is_dir(dirname($path_doc))) mkdir(dirname($path_doc),0755,true);
        file_put_contents($path_doc,$content);
    }
    $model_test_class_name = ucfirst($filename)."Test";
    $model_test_file_path = PATH_TESTS.$model;
    $info = pathinfo($model_test_file_path);
    $model_test_file_path = $info['dirname']."/".$filename."Test.php";
    if(is_file($model_test_file_path)){
        //log("%s 测试用例: 已存在!%s",$title,$model_test_file_path);
    }else{
        $model_test_content = get_model_test_content($model_test_class_name,$title," 测试");
        //echo $model_content;
        if(!is_dir(dirname($model_test_file_path))){
            @mkdir(dirname($model_test_file_path),0755,1);
        }
        $res = @file_put_contents($model_test_file_path,$model_test_content);
        if($res){
            log("%s : 测试用例 生成成功!%s",$title,$model_test_file_path);
        }else{
            log("%s 测试用例: 生成失败!%s",$title,$model_test_file_path);
        }
    }
}

function gen_model($model,$title){
    if(substr($model,-4) != ".php") $model = $model.".php";
    if(substr($model,0,1) != "/")   $model = "/".$model;

    gen_test($model,$title);

    $model_class_name = get_model_class_name($model);
    $info1 = pathinfo($model);

    $filename = $info1['filename'];
    $model_file_path = get_model_file_path($model);

    if(is_file($model_file_path)){
        //log("%s: 已存在!%s",$title,$model_file_path);
    }else{
        $model_content = get_model_content($model_class_name,$title);
        //echo $model_content;
        if(!is_dir(dirname($model_file_path))){
            @mkdir(dirname($model_file_path),0755,1);
        }
        $res = @file_put_contents($model_file_path,$model_content);
        if($res){
            log("%s: Model 生成成功!%s",$title,$model_file_path);
        }else{
            log("%s: Model 生成失败!%s",$title,$model_file_path);
        }
    }
}
function get_control_content($title,$tpl = ''){
    if(empty($tpl)){
        $tpl = "default";
    }
    $path = PATH_APP."/_templates/views/".$tpl.".php";
    if(!is_file($path)){
        $path = PATH_APP."/_templates/views/admin_default.php";
    }
    $content = file_get_contents($path);
    $content = str_replace("Controller Name Replace",$title,$content);
    return $content;
}
function gen_control($model,$title,$tpl = '',$model_path = "admin/test"){
    if(substr($model,-4) != ".php") $model = $model.".php";
    if(substr($model,0,1) != "/")   $model = "/".$model;
    if(!defined("PATH_WEBROOT")) throw new ErrorException("PATH_WEBROOT 没有定义");
    $control_path = PATH_WEBROOT.$model;
    if(is_file($control_path)){
        //log("%s: 已生成!%s",$title,$control_path);
    }else{
        if(!is_dir(dirname($control_path))){
            @mkdir(dirname($control_path),0755,1);
        }
        $content = get_control_content($title,$tpl);
        if($tpl == "admin_list"){
            gen_model($model_path,$model_path);
            $content = str_replace("\$__model_path = \"\";","\$__model_path = \"{$model_path}\";",$content);
            //echo $content;exit;
        }

        $res = @file_put_contents($control_path,$content);
        if($res){
            log("%s: Control 生成成功!%s",$title,$control_path);
        }else{
            log("%s: Control 生成失败!%s",$title,$control_path);
        }

    }
}

function view($model = ''){
    if($model == ''){
        $control = PtApp::$control;
        $t = explode("/",$control);
        $action = array_pop($t);
        $model_file = implode("/",$t).".php";
        $data = route($model_file,$action,"view",true);
    }else{
        //todo when $model is null
        throw new Exception("NO MODEL VIEW");
    }
    return $data;
}

function location($url){
    if(is_cli()){
        return;
    }
    ob_clean();
    header("Location: $url");exit;
}

function set_cookie($name,$value,$expire = 24){
    if(is_array($value)){
        $value = json_encode($value);
    }
    setcookie($name,$value,time()+3600*$expire,"/");
}
function get_cookie($name,$default = null){
    if(isset($_COOKIE[$name])){
        return $_COOKIE[$name];
    }else{
        return $default;
    }
}
function remove_cookie($key){
    setcookie($key,"",time()-3600,"/");
}
function cookie_clear_all(){
    foreach($_COOKIE as $k=>$c){
        setcookie($k,"",time()-3600,"/");
    }
}
function secure_cookie_encode($name,$value){
    global $setting;
    if(empty($setting['cookie_secret'])){
        $key = md5(__FILE__);
    }else{
        $key = $setting['cookie_secret'];
    }
    return PtLib\Crypt::create_signed_value($key,$name,$value);
}
function secure_cookie_decode($name,$value,$max_age_days = 31){
    global $setting;
    if(empty($setting['cookie_secret'])){
        $key = md5(__FILE__);
    }else{
        $key = $setting['cookie_secret'];
    }
    return PtLib\Crypt::decode_signed_value($key,$name,$value,$max_age_days);
}

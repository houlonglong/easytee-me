<?php
define("MONGO_LOG_URL_API","dev.ptphp.com/tools/mongolog?action=push&collection=ptphp_dev");
define("PRODUCT_MODE",false);
function m_log(){
    $trace = debug_backtrace();
    $data = $trace[0];
    $data['date'] = date("Y-m-d H:i:s");
    $GLOBALS['__LOG'][] = $data;
}
function m_run_info(){
    function get_xdebug_session(){
        return isset($_COOKIE['XDEBUG_SESSION']) ? $_COOKIE['XDEBUG_SESSION'] : null;
    }
    function mem_convert($size)
    {
        $unit=array('b','kb','mb','gb','tb','pb');
        return @round($size/pow(1024,($i=floor(log($size,1024)))),2).' '.$unit[$i];
    }

    $start_time = isset($_SERVER['REQUEST_TIME_FLOAT']) ? $_SERVER['REQUEST_TIME_FLOAT'] :
        ( isset($_SERVER['REQUEST_TIME']) ? $_SERVER['REQUEST_TIME'] : microtime(true));
    $run_time = microtime(true) - $start_time;
    $memory_peak_usage = memory_get_peak_usage(true);
    $memory_usage = memory_get_usage(true);
    $data['host'] = $_SERVER['HTTP_HOST'];
    $url = $data['url'] = "http://".$_SERVER['HTTP_HOST']. "" . $_SERVER['REQUEST_URI'];
    $data['client_ip'] = $_SERVER['REMOTE_ADDR'];
    $data['run']['run_time'] = $run_time;
    $data['run']['memory_peak_usage']        = $memory_peak_usage;
    $data['run']['memory_peak_usage_format'] = mem_convert($memory_peak_usage);
    $data['run']['memory_usage']        = $memory_usage;
    $data['run']['memory_usage_format'] = mem_convert($memory_usage);
    $data['run']['include'] = get_included_files();
    $_log = [];
    if(isset($GLOBALS['__LOG'])){
        $_log = $GLOBALS['__LOG'];
    }

    $data['log'] = $_log;
    $_sql = [];
    if(isset($GLOBALS['__SQL'])){
        $_sql = $GLOBALS['__SQL'];
    }

    $data['sql'] = $_sql;

    $data['global']['server'] = $_SERVER;
    $data['global']['post'] = $_POST;
    $data['global']['get'] = $_GET;
    $data['global']['session'] = isset($_SESSION)?$_SESSION:null;
    $data['global']['cookie'] = $_COOKIE;
    $date = date("H:i:s");
    $data['date'] = $date;
    sock_send(MONGO_LOG_URL_API,$data);
}
function sock_send($url, $data = array(), $method = "POST") {
    if (substr($url, 0, 7) != "http://") {
        $url = "http://" . $url;
    }
    $method = strtoupper($method);
    if (!empty($data)) {
        $method = "POST";
    }
    if (is_array($data)) {
        $data = json_encode($data);
    }
    $info = parse_url($url);
    $port = 80;
    if (isset($info['port'])) {
        $port = $info['port'];
    }
    $host = $info['host'];
    $path = $info['path'];
    $query = empty($info['query'])?"":"?".$info['query'];
    //var_dump($info);
    //exit;
    $fp = fsockopen($host, $port, $errno, $errstr, 10);
    try {
        if (!$fp) {
            throw new Exception("$errstr ($errno)");
        } else {
            $head = "$method $path$query HTTP/1.0\r\n";
            $head.="Host: $host\r\n";
            $head.="Content-type: application/x-www-form-urlencoded\r\n";
            $head.="Content-Length: " . strlen(trim($data)) . "\r\n";
            $head.="\r\n";
            $head.=trim($data);
            //echo $head;
            fputs($fp, $head);
            while (!feof($fp)) {
                $content = fgets($fp, 128);
                //echo $content;
                break;
            }

            fclose($fp);
        }
    } catch (Exception $e) {
        // log
    }
}

register_shutdown_function(function(){
    if(defined("PRODUCT_MODE") && !PRODUCT_MODE) m_run_info();
});
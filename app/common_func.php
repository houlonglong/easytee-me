<?php

define("MONGO_LOG_URL_API","dev.ptphp.com/tools/mongolog?action=push&collection=new_easytee");
define("PRODUCT_MODE",false);
function m_log(){
    return;
    $trace = debug_backtrace();
    $data = $trace[0];
    $data['date'] = date("Y-m-d H:i:s");
    $GLOBALS['__LOG'][] = $data;
}
function mem_convert($size)
{
    $unit=array('b','kb','mb','gb','tb','pb');
    return @round($size/pow(1024,($i=floor(log($size,1024)))),2).' '.$unit[$i];
}
function m_run_info(){
    return;
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
    $_log = array();
    if(isset($GLOBALS['__LOG'])){
        $_log = $GLOBALS['__LOG'];
    }

    $data['log'] = $_log;
    $_sql = array();
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



function remove_cookie($key){
    setcookie($key,"",time()-3600,"/");
}
/**
 * 判断是不是微信浏览器
 * @return bool
 */
function is_wechat_browser(){
    return isset($_SERVER['HTTP_USER_AGENT']) && strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false;
}
define("TAKS_RECEIVED","take_received");
/**
 * PHP 异步消息通知
 * @param $url
 * @param array|string $data  支持: 多维数组 | json_encode 字符串
 * @param string $method
 * @return bool
 *
 * @用法:

$res = task_notice("http://open.easytee.me/xxx.php",array(
    "test"=>1
));

var_dump($res);

 *
 */
function task_notice($url,$data = array(),$method = "GET"){
    if(substr($url,0,7) != "http://"){
        $url = "http://".$url;
    }
    $method = strtoupper($method);
    if(!empty($data)){
        $method = "POST";
    }
    if(is_array($data)){
        $data = json_encode($data);
    }
    $info = parse_url($url);
    $port = 80;
    if(isset($info['port'])){
        $port = $info['port'];
    }
    $host = $info['host'];
    $path = $info['path'];
    //var_dump($info);
    //exit;
    $fp = fsockopen($host, $port, $errno, $errstr, 10);
    $received = false;
    try{
        if(!$fp) {
            throw new Exception("$errstr ($errno)");
        } else {
            $head ="$method $path HTTP/1.0\r\n";
            $head.="Host: $host\r\n";
            $head.="Content-type: application/x-www-form-urlencoded\r\n";
            $head.="Content-Length: ".strlen(trim($data))."\r\n";
            $head.="\r\n";
            $head.=trim($data);
            fputs($fp,$head);
            while(!feof($fp)) {
                $content = fgets($fp,128);
                if(substr($content,0,strlen(TAKS_RECEIVED)) == TAKS_RECEIVED){
                    echo $content.PHP_EOL;
                    $received = true;
                    break;
                }else{
                    //echo $content.PHP_EOL;
                }

            }
            fclose($fp);
        }
    }catch (Exception $e){
        // log
    }
    return $received;

}

function sendCaptcha(&$controller, $type, $value, $captcha, $userId = 0) {
    if ($type == 'mobile') {
        // return true; //for test
        require_once APP . '/libs/submail/app_config.php';
        require_once APP . '/libs/submail/SUBMAILAutoload.php';
        $submail = new MESSAGEXsend($message_configs);
        $submail->AddTo($value);

        $submail->SetProject('6pvkv3');
        $submail->AddVar('code', $captcha);
        $xsend = $submail->xsend();
        return ($xsend['status'] == 'success');
    }
    if ($type == 'email') {
        $controller->loadModel('SendEmail');
        return $controller->SendEmail->sendCaptcha($controller, $value, $captcha, $userId);
    }
}

function json_encode_cn($var) {
    if (version_compare(PHP_VERSION, '5.4.0') >= 0) {
        return json_encode($var, JSON_UNESCAPED_UNICODE);
    } else {
        return preg_replace("#\\\u([0-9a-f]{4})#ie", "iconv('UCS-2BE', 'UTF-8', pack('H4', '\\1'))", json_encode($var));
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            return preg_replace("#\\\u([0-9a-f]{4})#ie", "iconv('UCS-2LE', 'UTF-8', pack('H4', '\\1'))", json_encode($var));
        } else {
            return preg_replace("#\\\u([0-9a-f]{4})#ie", "iconv('UCS-2BE', 'UTF-8', pack('H4', '\\1'))", json_encode($var));
        }
    }
}

function getIp() {
    static $realip = NULL;
    if ($realip !== NULL)
        return $realip;
    if (isset($_SERVER)) {
        if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $arr = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            foreach ($arr AS $ip) {
                $ip = trim($ip);
                if ($ip != 'unknown') {
                    $realip = $ip;
                    break;
                }
            }
        } elseif (isset($_SERVER['HTTP_CLIENT_IP'])) {
            $realip = $_SERVER['HTTP_CLIENT_IP'];
        } else {
            if (isset($_SERVER['REMOTE_ADDR'])) {
                $realip = $_SERVER['REMOTE_ADDR'];
            } else {
                $realip = '0.0.0.0';
            }
        }
    } else {
        if (getenv('HTTP_X_FORWARDED_FOR')) {
            $realip = getenv('HTTP_X_FORWARDED_FOR');
        } elseif (getenv('HTTP_CLIENT_IP')) {
            $realip = getenv('HTTP_CLIENT_IP');
        } else {
            $realip = getenv('REMOTE_ADDR');
        }
    }
    preg_match('/[\d\.]{7,15}/', $realip, $onlineip);
    $realip = !empty($onlineip[0]) ? $onlineip[0] : '0.0.0.0';
    return $realip;
}

function pageClass($total, $shownu = 20, $url = '') {

    #$page  	当前页码
    #$sqlfirst 	mysql数据库起始项
    #$pagecon	分页导航内容
    global $page, $sqlfirst, $pagecon, $_SERVER;
    $GLOBALS["shownu"] = $shownu;

    if (isset($_GET['page'])) {
        $page = $_GET['page'];
    } else
        $page = 1;

    #如果$url使用默认,即空值,则赋值为本页URL
    if (!$url) {
        $url = $_SERVER["REQUEST_URI"];
    }

    #URL分析
    $parse_url = parse_url($url);
    @$url_query = $parse_url["query"]; //取出在问号?之后内容
    if ($url_query) {
        $url_query = preg_replace("/(&?)(page=$page)/", "", $url_query);
        $url = str_replace($parse_url["query"], $url_query, $url);
        if ($url_query) {
            $url .= "&page";
        } else
            $url .= "page";
    } else
        $url .= "?page";

    #页码计算
    $lastpg = ceil($total / $shownu); //最后页,总页数
    $page = min($lastpg, $page);
    $prepg = max($page - 1, 1);     //上一页
    $nextpg = ($page == $lastpg ? 0 : $page + 1); //下一页
    $sqlfirst = ($page - 1) * $shownu;

    #开始分页导航内容
    $pagecon = "<ul class='pagination pagination-sm'><li class='disabled'><a>显示第 " . ($total ? ($sqlfirst + 1) : 0) . "-" . min($sqlfirst + $shownu, $total) . " 条记录，共 <B>$total</B> 条记录</a></li>";
    if ($lastpg <= 1)
        return false; //如果只有一页则跳出

    if ($page != 1)
        $pagecon .="<li><a href='$url=1'>|&lt;</a></li>";
    else
        $pagecon .="<li class='disabled'><a href='$url=1'>|&lt;</a></li> ";
    if ($prepg)
        $pagecon .=" <li><a href='$url=$prepg'>&lt;</a></li> ";
    else
        $pagecon .=" <li class='disabled'><a href='$url=$prepg'>&lt;</a></li> ";
    if ($nextpg)
        $pagecon .=" <li><a href='$url=$nextpg'>&gt;</a></li> ";
    else
        $pagecon .=" <li class='disabled'><a href='$url=$nextpg'>&gt;</a></li> ";
    if ($page != $lastpg)
        $pagecon.=" <li><a href='$url=$lastpg'>&gt;|</a></li> ";
    else
        $pagecon .=" <li class='disabled'><a href='$url=$lastpg'>&gt;|</a></li> ";

    #下拉跳转列表,循环列出所有页码
    $pagecon .="　<li class='disabled'><a>到第 <select>\n";
    for ($i = 1; $i <= $lastpg; $i++) {
        if ($i == $page)
            $pagecon .="<option value='$url=$i' selected>$i</option>\n";
        else
            $pagecon .="<option value='$url=$i'>$i</option>\n";
    }
    $pagecon .="</select> 页，共 $lastpg 页</a></li>";
    return $pagecon;
}

function pt_log($msg, $type = "info") {
    if (!defined("PT_LOG"))
        return;
    $trace = debug_backtrace();
    $t = $trace[0];
    $file = $t['file'];
    $line = $t['line'];
    $msg = var_export($msg, 1);

    log_error("[$type] [" . date('Y-m-d h:i:s') .
            " ] File: $file : $line\n msg: $msg "
            . "\n========="
    );
}

function log_error($msg, $filename = "run_log.log") {
    if (is_array($msg)) {
        $msg = var_export($msg, 1);
    }
    if ($filename == "run_log.log") {
        $filename = "run_log_" . date("Y_m_d") . ".log";
    }
    if (PHP_SAPI != 'cli') {
        if (defined("PATH_PRO")) {
            $dir = PATH_PRO . "/logs";
            if (!is_writable($dir)) {
                $dir = "/tmp";
            }
        } else {
            $dir = "/tmp";
        }
        @error_log($msg . PHP_EOL, 3, $dir . "/" . $filename);
    } else {
        echo $msg . PHP_EOL;
    }
}
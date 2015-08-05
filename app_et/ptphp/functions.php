<?php
function console($var){
    $GLOBALS['_console'][] = $var;
}
function m_log(){
    $trace = debug_backtrace();
    $data = $trace[0];
    $data['date'] = date("Y-m-d H:i:s");
    //var_dump($data);
    sock_send("dev.ptphp.com/tools/mongolog?action=push",$data);
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
    return;
    $GLOBALS['_console']["include_files"] = get_included_files();
    $GLOBALS['_console']['___SQL'] = @$GLOBALS['___SQL'];
    $content = "\n====\n";
    //$content .= implode("\n",$GLOBALS['_console']["include_files"]);
    //$content .= "\n----";
    $content .= implode("\n",$GLOBALS['_console']["___SQL"]);
    file_put_contents("/data/log/php_run.txt",$content,FILE_APPEND);
    return;
    if(isset($GLOBALS['_console']) && !\Pt\is_cli() && !\Pt\is_xhr()){
        $data = json_encode($GLOBALS['_console']);
        echo "<script>";
        echo 'console.log('.$data.')';
        echo "</script>";
    }
});
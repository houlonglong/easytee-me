<?php
use PtLib\UnitTest as UnitTest;
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
                echo $content;
                //break;
            }

            fclose($fp);
        }
    } catch (Exception $e) {
        // log
    }
}
/**
 * Mongo日志
 *
 */
class MongologTest extends UnitTest{
    /**
     *
     */
    function test_action_push(){
        $this->set_test_host("dev.ptphp.com");
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));
        //$res = $this->post_action("/tools/mongolog?action=push",
        //    json_encode(array(2)));
        //m_log("test","msg");

        ///sock_send("dev.ptphp.com/tools/mongolog?action=push",array("t"=>2));

        sock_send("open.easytee.me/mongo.php?collection=easytee_open",array("t"=>2));
    }


    /**
     *
     *
    function test_action_test(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));
        $res = $this->post_action("/auth/login?action=do_login",array(
            "username"=>"test",
            "password"=>md5("test"),
        ));
    }
     */
}
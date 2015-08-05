<?php
/**
 * Created by PhpStorm.
 * User: yfzhu
 * Date: 15/5/24
 * Time: 12:13
 */
require_once('lib/db.class.php');

$db = new DbModel("mysql:host=rdsc1n8bpzjumxhso878cpublic.mysql.rds.aliyuncs.com;dbname=open_edit","open_edit_write","open_edit_write",true);

require_once 'aliyun2/sdk.class.php';
require_once 'lib/tool.class.php';





ob_end_flush();//关闭缓存
echo str_repeat(" ",200); //ie下 需要先发送256个字节
set_time_limit(0);
$fontList = $db->executeSQL('select * from arts where isdown = 0 order by id desc');
foreach($fontList as $b){

    $a1 = $b["art_jit"];
    $a2 = str_replace("500.png",'250.png',$b["art_jit"]);
    $a3 = $b["thumb_jit"];
    $a4 = $b["art_path"];
    echo "id=".$b["id"];
    echo "<br>";

    $file = file_get($a1);
    flush();
    if($file){
        if(strpos($file,'Internal Error')){
            echo "ERROR $a1";
            flush();
            continue;
        }
        echo "upload start<br>";
        $length = count($file);
        $object = str_replace("REPLACE_DOMAIN_WITH/demo/JITImage/","arts/",$a1);
        var_dump($object,$file,$a1);exit;
        $strr = saveImage($object,$file,$length,"open-edit");
        echo"save ok = ";print_r($strr->header["x-oss-request-url"]);
        echo "<br>";
        flush();
    }

    $file = file_get($a2);
    flush();
    if($file){
        if(strpos($file,'Internal Error')){
            echo "ERROR $a2";
            flush();
            continue;
        }
        echo "upload start<br>";
        $length = count($file);
        $object = str_replace("REPLACE_DOMAIN_WITH/demo/JITImage/","arts/",$a2);
        $strr = saveImage($object,$file,$length,"open-edit");
        echo"save ok = ";print_r($strr->header["x-oss-request-url"]);
        echo "<br>";
        flush();
    }
    $file = file_get($a3);
    flush();
    if($file){
        if(strpos($file,'Internal Error')){
            echo "ERROR $a3";
            flush();
            continue;
        }
        echo "upload start<br>";
        $length = count($file);
        $object = str_replace("REPLACE_DOMAIN_WITH/demo/JITImage/","arts/",$a3);

        $strr = saveImage($object,$file,$length,"open-edit");
        echo"save ok = ";print_r($strr->header["x-oss-request-url"]);
        echo "<br>";
        flush();
    }
    $file = file_get($a4);
    flush();
    if($file){
        if(strpos($file,'Internal Error')){
            echo "ERROR $a4";
            flush();
            continue;
        }
        echo "upload start<br>";
        flush();
        $length = count($file);
        $object = str_replace("REPLACE_DOMAIN_WITH/images/clipart/","arts/",$a4);
        $strr = saveImage($object,$file,$length,"open-edit");
        echo"save ok";print_r($strr->header["x-oss-request-url"]);
        echo "<br>";
        flush();
    }
    echo"<hr>";

    $db->update("arts",array(
        "isdown"=>'1',
        "art_jit"=>str_replace("REPLACE_DOMAIN_WITH/demo/JITImage/",'REPLACE_DOMAIN_WITH/arts/',$b["art_jit"]),
        "art_cached"=>str_replace("REPLACE_DOMAIN_WITH/demo/JITImage/",'REPLACE_DOMAIN_WITH/arts/',$b["art_cached"]),
        "thumb_jit"=>str_replace("REPLACE_DOMAIN_WITH/demo/JITImage/",'REPLACE_DOMAIN_WITH/arts/',$b["thumb_jit"]),
        "thumb_cached"=>str_replace("REPLACE_DOMAIN_WITH/demo/JITImage/",'REPLACE_DOMAIN_WITH/arts/',$b["thumb_cached"]),
        "art_path"=>str_replace("REPLACE_DOMAIN_WITH/images/clipart/",'REPLACE_DOMAIN_WITH/arts/',$b["art_path"]),
    ),'id=?',$b["id"]);

    flush();
}

function file_get($u){

    if(stripos($u,"arts/svg")){
        $u = str_replace("REPLACE_DOMAIN_WITH/arts","http://demo.inksoft.com/images/clipart",$u);
    }else if(stripos($u,"arts/Art")){
        $u = str_replace("REPLACE_DOMAIN_WITH/arts","http://demo.inksoft.com/demo/JITImage",$u);

    }else{
        $u = str_replace("REPLACE_DOMAIN_WITH","http://demo.inksoft.com",$u);
    }
    echo "<div>url=$u</div>";
    return @file_get_contents($u);
}

function saveImage($object,$data,$length,$bucket){
    $object = str_replace("REPLACE_DOMAIN_WITH/","",$object);
    var_dump($object);exit;
    $upload_file_options = array('content' => $data, 'length' => $length);
    $oss_sdk_service = new ALIOSS();
    $rest = $oss_sdk_service->upload_file_by_content($bucket, $object, $upload_file_options);

    return $rest;
}

function geturl($url){
    if(!strpos($url,"arts")){
        $url = str_replace("REPLACE_DOMAIN_WITH","http://demo.inksoft.com",$url);
    }


    $ch = curl_init();
    $user_agent = "Baiduspider+(+http://www.baidu.com/search/spider.htm)";
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_REFERER, "http://demo.inksoft.com/demo/DesignStudio/Home");
    curl_setopt ($ch, CURLOPT_USERAGENT, $user_agent);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $html = curl_exec($ch);
    $status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

     if($status == 404) {
        echo"download 404 : $url<br>";
         return false;
    }else{
         echo"download ok : $url<br>";
        return $html;
     }
}
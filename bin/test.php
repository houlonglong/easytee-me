<?php
/**
 * Created by PhpStorm.
 * User: joseph
 * Date: 15/9/21
 * Time: 下午1:48
 */

define("APP_ID","111");
define("APP_SECRET","111");
define("API_URL","http://www.easytee.me/api");

$request = array(
    "model"=>"open/activity",
    "action"=>"create",
    "app_id"=>APP_ID,
    "uid"=>1,
    "mobile"=>"13866566995",
    "return_url"=>"http://www.baidu.com",
);

$request['sign'] =  md5(http_build_query($request).APP_SECRET);

echo API_URL."?".http_build_query($request);

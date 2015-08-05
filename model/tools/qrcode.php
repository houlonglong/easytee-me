<?php
/**
 * Created by PhpStorm.
 * User: joseph
 * Date: 7/10/15
 * Time: 5:49 PM
 */

class Model_Tools_Qrcode{
    function action_get(){
        #error_reporting(E_ERROR);
        require_once PATH_LIBS.'/phpqrcode/phpqrcode.php';
        $data = pt_http_request("data");
        QRcode::png(urldecode($data['data']));
    }
}
<?php
$api = new Service\Alipay\Api();
$res = $api->return_callback();
var_dump($res);
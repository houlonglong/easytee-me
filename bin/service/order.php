<?php
while(1){
    //执行频率 单位:秒
    $sleep = "30";
    $url = "http://www.easytee.me/cron/order";
    echo date('h:i:s')." : ".file_get_contents($url).PHP_EOL;
    sleep($sleep);
}
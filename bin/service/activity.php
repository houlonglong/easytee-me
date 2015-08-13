<?php
while(1){
    $sleep = "10";
    $url = "http://www.easytee.me/Activity/cronCloseActivity?appKey=wqdc";
    echo date('h:i:s')." : ".file_get_contents($url).PHP_EOL;
    sleep($sleep);
}
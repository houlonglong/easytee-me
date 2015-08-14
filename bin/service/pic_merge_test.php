<?php
while(1){
    //执行频率 单位:秒
    $sleep = "2";
    $cmd = "php /data/projects/easytee/easytee_v2/bin/cli.php service/pic run ptenv=test";
    system($cmd);
    echo $cmd.PHP_EOL;
    sleep($sleep);
}
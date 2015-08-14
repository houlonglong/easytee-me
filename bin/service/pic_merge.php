<?php
while(1){
    //执行频率 单位:秒
    $sleep = "2";
    $cmd = "/usr/bin/php /data/projects/easytee/easytee_v2/bin/cli.php service/pic run";
    system($cmd,$status);
    echo $cmd.PHP_EOL;
    sleep($sleep);
}
<?php
while(1){
    //执行频率 单位:秒
    $sleep = "2";
    system("php /data/projects/easytee/easytee_v2/bin/cli.php service/pic run");
    sleep($sleep);
}
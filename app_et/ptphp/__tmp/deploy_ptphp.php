<?php
/**
 * 同步PtPHP 类库
 */
$path_ptphp = "/data/projects/easytee/easytee_v2/app_et/ptphp/";
$cmd = <<<EOF
mkdir -p ./app/ptphp/
rsync -aztH --exclude '#*' --exclude .DS_Store --exclude .idea --exclude .git --exclude .svn --progress  \
$path_ptphp ./app/ptphp/
EOF;
echo $cmd;
system($cmd);

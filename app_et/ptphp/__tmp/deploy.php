<?php
$ssh_remote = "ptphp";
$path_local = __DIR__;
$path_remote = "/root/test";
$path_ptphp = "/data/projects/easytee/easytee_v2/app_et/ptphp/";
$sync_ptphp = <<<EOF
rsync -aztH --exclude '#*' --exclude .DS_Store --exclude .idea --exclude .git --exclude .svn --progress  \
$path_ptphp ./app/ptphp/
EOF;
system($sync_ptphp);

$sync_project = <<<EOF
rsync -aztHe ssh --exclude '#*' --exclude /log --exclude .DS_Store --exclude .idea --exclude .git --exclude .svn --progress  \
./ $ssh_remote:$path_remote
EOF;

system("ssh $ssh_remote 'mkdir -p $path_remote/log && chmod -R 777 $path_remote/log'");
system($sync_project);
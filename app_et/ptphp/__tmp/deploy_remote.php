<?php
/**
 *
命令格式：
#rsync [option] 源路径 目标路径
其中：
[option]：
a:使用archive模式，等于-rlptgoD，即保持原有的文件权限
z:表示传输时压缩数据
v:显示到屏幕中
e:使用远程shell程序（可以使用rsh或ssh）
--delete:精确保存副本，源主机删除的文件，目标主机也会同步删除
--include=PATTERN:不排除符合PATTERN的文件或目录
--exclude=PATTERN:排除所有符合PATTERN的文件或目录
--password-file:指定用于rsync服务器的用户验证密码

源路径和目标路径可以使用如下格式：
rsync://[USER@]Host[:Port]/Path     <--rsync服务器路径
[USER@]Host::Path                   <--rsync服务器的另一种表示形式
[USER@]Host:Path                    <--远程路径
LocalPath                           <--本地路径
 *
 */
$ssh_remote = "ptphp";
$path_local = __DIR__;
$path_remote = "/data/sites/ptphp.com/tee/";
$cmd = <<<EOF
ssh $ssh_remote "mkdir -p $path_remote/log && chmod -R 777 $path_remote/log";

rsync -aztHe ssh --delete --exclude '#*' --exclude /log --exclude .DS_Store --exclude .idea --exclude .git --exclude .svn --progress  \
./ $ssh_remote:$path_remote
EOF;
echo $cmd;
system($cmd);

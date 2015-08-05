config

    [program:meta.txn.recover.on.error]
    command=/cas/bin/meta.txn.recover.on.error ; 被监控的进程路径
    numprocs=1                    ; 启动几个进程
    directory=/cas/bin            ; 执行前要不要先cd到目录去，一般不用
    autostart=true                ; 随着supervisord的启动而启动
    autorestart=true              ; 自动重启。。当然要选上了
    startretries=10               ; 启动失败时的最多重试次数
    exitcodes=0                   ; 正常退出代码（是说退出代码是这个时就不再重启了吗？待确定）
    stopsignal=KILL               ; 用来杀死进程的信号
    stopwaitsecs=10               ; 发送SIGKILL前的等待时间
    redirect_stderr=true          ; 重定向stderr到stdout

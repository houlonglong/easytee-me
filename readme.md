网站架构
======

首页
------

- url: [http://2.dev.jzw.com/](http://2.dev.jzw.com/)
- src: /webroot/index.php

注册
------
- url: [http://2.dev.jzw.com/user/register](http://2.dev.jzw.com/user/register)
- src: /webroot/user/register.php
- api:
    - 获取手机验证码 [文档](http://git.ptphp.com/easytee/easytee-me/blob/master/docs/user/register.md)
    - 保存注册信息 [文档](http://git.ptphp.com/easytee/easytee-me/blob/master/docs/user/register.md)

登陆
------
- url: [http://2.dev.jzw.com/user/auth/login](http://2.dev.jzw.com/user/auth/login)
- src: /webroot/user/auth/login.php
- api:
    - 提交登陆信息 [文档](http://git.ptphp.com/easytee/easytee-me/blob/master/docs/user/auth/login.md)

退出登陆
------
- url: /api?model=user/auth&action=logout

第三方登陆
------
- QQ
- 新浪微博
- 微信

忘记密码
------
- url: [http://2.dev.jzw.com/user/forget_pass](http://2.dev.jzw.com/user/forget_pass)
- src: /webroot/user/forget_pass.php
- api:
    - 获取手机验证码
    - 提交重置信息 


活动预购
------
- url: [http://2.dev.jzw.com/activity](http://2.dev.jzw.com/activity)
- src: /webroot/activity.php
- api:
    - QQ分享
    - 微博分享
    - 豆瓣分享
    - 微信分享
    - 人人分享


订单确认页
------
- url: [http://2.dev.jzw.com/design](http://2.dev.jzw.com/order/confirm)
- src: /webroot/order/confirm.php
- api:
    - 保存收货地址
    - 修改收货地址
    - 提交订单信息

订单支付成功
------
- url: [http://2.dev.jzw.com/design](http://2.dev.jzw.com/order/complete)
- src: /webroot/order/confirm.php

设计工具
------
- url: [http://2.dev.jzw.com/design](http://2.dev.jzw.com/design)
- src: /webroot/design.php
- api: [文档](http://git.ptphp.com/easytee/easytee-me/blob/master/docs/design/tool/beta.md)
    - 获取设计初始化信息  (已完成)
    - 获取模板列表       (已完成)
    - 计算印刷成本       (已完成)
    - 保存设计          (已完成)
    - 保存活动
    - 查询活动 `url_path` 是否存在
    
PHPSTORM 单步调试
======
配置 php.ini

    [xdebug]
    zend_extension="/usr/local/opt/php55-xdebug/xdebug.so"
    debug.idekey=PHPSTORM
    xdebug.remote_host=127.0.0.1
    ;注意端口为9009，默认为9000，因为跟fpm冲突所以要修改
    xdebug.remote_port=9009
    xdebug.remote_enable=on

修改PHPSTORM setting:

    PHP >> Debug >> xdebug port : 9009
    PHP >> Debug >> DBGp Proxy >> Port : 9009

#APACHE 

    apachectl -M | grep expires_module
    apachectl -M | grep headers_module
    apachectl -M | grep rewrite_module
    apachectl -M | grep mime_module
    
    a2enmod rewrite
    a2enmod headers
    a2enmod expires
    a2enmod  mime
    

#PHPUnit

    PHP >> PHPUnit >> local >> PHPUnit library >> User custom autoloader >> path to script >> phpunit/verder/autoload.php
    PHP >> PHPUnit >> local >> Test Runner >> Default configuration file >> phpunit.xml


    ssh e_dev "cd /data/projects/easytee/easytee_v2_test && git pull origin master"

    php bin/cli.php --model=tools/db/merge1 --action=run --env=develop 

部署
-------
    
    ssh e_www "cd /opt/projects/easytee/easytee_v2 && git pull origin master"
    ssh e_dev "cd /data/projects/easytee/easytee_v2_test && git pull origin master"
    
    git add .  && git commit -m "deploy" && git push origin master && ssh e_dev "cd /data/projects/easytee/easytee_v2_test && git pull origin master"
    
    
    
结束活动
-------

    php bin/cli.php --model=service/activity --action=run --env=develop --commit=1


合并数据库
-------

    php bin/cli.php --model=tools/db/merge1 --action=run --env=develop
    
#supervisor
-------

    sudo apt-get install -y supervisor
    
    
    [inet_http_server]
    port = 0.0.0.0:9001
    username = admin
    password = easytee.me
    
url:
------

    url http://service.jzw.la:9001/

deploy
------

V1.1 线上测试环境
------

    ssh e_dev "cd /data/git/easytee/easytee_v1-1 && git pull origin master && rsync --exclude=\'www/app/tmp\' --exclude=\'.git\' -a -r -t -v --progress /data/git/easytee/easytee_v1-1 /data/projects/easytee"

V1.1 线上正式环境
------

    ssh e_www "cd /data/git/easytee/easytee_v1-1 && git pull origin master && rsync --exclude=\'www/app/tmp\' --exclude=\'.git\' -a -r -t -v --progress /data/git/easytee/easytee_v1-1 /opt/projects/easytee"
   

V2.0 线上正式环境
------

    ssh e_www "cd /opt/projects/easytee/easytee_v2 && git pull origin master"

 
V2.0 线上测试环境
------
    
    ssh e_dev "cd /data/projects/easytee/easytee_v2_test && git pull origin master"

V2.0 线上 Task Service
------

    ssh e_ser "cd /opt/projects/easytee/easytee_v2/ && git pull origin master"

password
------

    admin8888@25015
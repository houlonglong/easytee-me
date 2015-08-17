
#PHPSTORM 单步调试

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

#PHPUnit

    PHP >> PHPUnit >> local >> PHPUnit library >> User custom autoloader >> path to script >> phpunit/verder/autoload.php
    PHP >> PHPUnit >> local >> Test Runner >> Default configuration file >> phpunit.xml


    ssh e_dev "cd /data/projects/easytee/easytee_v2_test && git pull origin master"


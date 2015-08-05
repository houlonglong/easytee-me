<?php
define('ALIPAY_PARTNER',         '2088511579537124');
define('ALIPAY_KEY',             'vks0cg7118juifvsd2ydeo2is06v6mgy');
define('ALIPAY_SIGN_TYPE',       'md5');
define('ALIPAY_INPUT_CHARSET',   'utf-8');
define('ALIPAY_CACERT',          '');
define('ALIPAY_TRANSPORT',       'http');
define('ALIPAY_CALLBACK',        'http://' . $_SERVER['HTTP_HOST'] . '/auths/callback/alipay/');
define('ALIPAY_CALLBACK_RETURN', 'http://' . $_SERVER['HTTP_HOST'] . '/test/alipay/return');
define('ALIPAY_CALLBACK_NOTIFY', 'http://' . $_SERVER['HTTP_HOST'] . '/pay/alipay/notify');
define('ALIPAY_SELLER_EMAIL',    'liuxiaoliu@zhongxingwang.com.cn');

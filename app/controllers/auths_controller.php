<?php

/**
 * Created by PhpStorm.
 * User: yfzhu
 * Date: 15/6/6
 * Time: 19:13
 */
class AuthsController extends AppController {

    var $name = "Auths";
    var $uses = array('User');
    public $userArray;

    function beforeFilter() {
        parent::beforeFilter();
        if (!empty($_GET['relurl'])) {
            $this->Session->write('relurl', $_GET['relurl']);
        }
    }

    function alipay() {
        require APP . "/libs/alipay/lib/alipay_submit.class.php";
        //参数配置
        $alipay = new AlipaySubmit(array(
            'partner' => ALIPAY_PARTNER,
            'key' => ALIPAY_KEY,
            'sign_type' => ALIPAY_SIGN_TYPE,
            'input_charset' => ALIPAY_INPUT_CHARSET,
            'cacert' => ALIPAY_CACERT,
            'transport' => ALIPAY_TRANSPORT,
        ));
        //防钓鱼时间戳
        $anti_phishing_key = $alipay->query_timestamp(); //若要使用请调用类文件submit中的query_timestamp函数
        //构造要请求的参数数组，无需改动
        $parameter = array(
            "service" => "alipay.auth.authorize",
            "partner" => ALIPAY_PARTNER,
            "target_service" => "user.auth.quick.login",
            "return_url" => ALIPAY_CALLBACK, //需http://格式的完整路径，不允许加?id=123这类自定义参数
            "anti_phishing_key" => $anti_phishing_key,
            "_input_charset" => ALIPAY_INPUT_CHARSET
        );

        //建立请求

        echo $alipay->buildRequestForm($parameter, "get", "正在前往支付宝。。。");
        exit;
    }

    function wechat($type = 'web') {
        require APP . '/libs/wechat/index.php';
        switch ($type) {
            case 'mobile'://手机浏览器环境下
                $wechat = new YF_wechat();
                $state = 0; //sale.id;
                $url = $wechat->GetCode(WECHAT_MOBILE_APPKEY, WECHAT_MOBILE_CALLBACK, WECHAT_MOBILE_SCOPE, $state);
                $this->redirect($url);
                break;
            default:
                $this->redirect('https://open.weixin.qq.com/connect/qrconnect?appid=' . WECHAT_WEB_APPKEY . '&redirect_uri=' . urlencode(WECHAT_WEB_CALLBACK) . '&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect');
        }
    }

    function qq() {
        require APP . "/libs/qq/qqConnectAPI.php";
        $qc = new QC();
        $qc->qq_login();
        exit;
    }

    function weibo() {
        require APP . '/libs/weibo/saetv2.ex.class.php';
        $o = new SaeTOAuthV2(WEIBO_APPKEY, WEIBO_APPSECRETKEY);
        $code_url = $o->getAuthorizeURL(WEIBO_CALLBACK);
        $this->redirect($code_url);
        exit;
    }

    function douban() {
        require APP . '/libs/douban/DoubanOAuth.php';
        $douban = new DoubanOAuth(array(
            'key' => DOUBAN_KEY,
            'secret' => DOUBAN_SECRET,
            'redirect_url' => DOUBAN_REDIRECT . "?relurl=" . $this->Session->read('relurl'),
        ));
        $url = $douban->getAuthorizeURL(DOUBAN_SCOPE, DOUBAN_STATE);

        $this->redirect($url);
        exit;
    }

    function callback($type, $wechatType = '') {
        $relurl = $this->Session->read('relurl');
        if (empty($relurl)) {
            $relurl = '/account/';
        }
        if (!empty($_REQUEST['relurl'])) {
            $relurl = $_GET['relurl'];
        }
        switch ($type) {
            case "douban":
                require APP . '/libs/douban/DoubanOAuth.php';
                $douban = new DoubanOAuth(array(
                    'key' => DOUBAN_KEY,
                    'secret' => DOUBAN_SECRET,
                    'redirect_url' => DOUBAN_REDIRECT,
                ));
                $token = $douban->getAccessToken($_GET['code']);
                $result = $douban->get('user/~me');
                if (isset($result["uid"])) {
                    $this->userArray = array(
                        "openid" => $result["uid"],
                        "nickname" => $result["name"],
                        "photo" => $result["large_avatar"],
                        "abstract" => $result["desc"],
                        "city" => $result["loc_name"],
                        "homepage" => $result["alt"],
                        "relurl" => $relurl,
                        "access_token" => $token["access_token"],
                    );
                } else {
                    //用户信息获取失败，返回授权页
                    $this->redirect('/auths/douban/?relurl=' . $relurl);
                    exit;
                }
                break;
            case "weibo":
                require APP . '/libs/weibo/saetv2.ex.class.php';
                $weibo = new SaeTOAuthV2(WEIBO_APPKEY, WEIBO_APPSECRETKEY);
                $relurl = $this->Session->read('relurl');
                if (isset($_REQUEST['code'])) {
                    $keys = array();
                    $keys['code'] = $_REQUEST['code'];
                    $keys['redirect_uri'] = WEIBO_CALLBACK;
                    $token = $weibo->getAccessToken('code', $keys);
                    if ($token) {
                        $this->Session->write('weiboToken', $token);
                    }
                };

                if ($this->Session->read('weiboToken')) {
                    $token = $this->Session->read('weiboToken');
                    $weib_user = new SaeTClientV2(WEIBO_APPKEY, WEIBO_APPSECRETKEY, $token['access_token']);
                    if (!isset($token['uid'])) {
                        //授权失败。
                        $this->redirect('/auths/weibo/?relurl=' . $relurl);
                    }
                    $result = $weib_user->show_user_by_id($token['uid']); //根据ID获取用户等基本信息
                    if (!isset($result["screen_name"])) {
                        //授权失败。
                        $this->redirect('/auths/weibo/?relurl=' . $relurl);
                    }
                    $this->userArray = array(
                        "openid" => $token["uid"],
                        "nickname" => !empty($result["screen_name"]) ? $result["screen_name"] : $result["name"],
                        "photo" => $result["avatar_large"],
                        "abstract" => $result["description"],
                        "city" => $result["location"],
                        "homepage" => 'http://weibo.com/' . $result["profile_url"],
                        "relurl" => $relurl,
                        "access_token" => $token["access_token"],
                        "gender" => $result["gender"], //性别
                        "followers_count" => $result["followers_count"], //粉丝数量
                        "verified" => $result["verified"], //是否认证微博用户  true false
                    );
                } else {
                    //授权失败。
                    $this->redirect('/auths/weibo/?relurl=' . $relurl);
                }
                break;
            case "qq":
                require APP . "/libs/qq/qqConnectAPI.php";
                $qc = new QC();
                $acs = $qc->qq_callback();
                $openId = $qc->get_openid();
                if (empty($openId) || !isset($acs['access_token'])) {
                    //授权失败，返回授权页
                    $this->redirect('/auths/qq/?relurl=' . $relurl);
                    break;
                }
                $qc = new QC($acs['access_token'], $openId);
                $QQ = $qc->get_user_info();
                if (empty($QQ)) {
                    //用户信息获取失败，返回授权页
                    $this->redirect('/auths/qq/?relurl=' . $relurl);
                    break;
                }
                $this->userArray = array(
                    "openid" => $openId,
                    "nickname" => $QQ["nickname"],
                    "photo" => $QQ["figurelurl_2"],
                    "abstract" => '',
                    "city" => $QQ["province"] . " " . $QQ["city"],
                    "homepage" => '',
                    "relurl" => $relurl,
                    "access_token" => $acs['access_token'],
                );
                break;
            case 'alipayreturn':
                include APP . "/libs/alipay/aliapy.service.php";
                $service = new AlipayService();
                $res = $service->return_callback();
                break;
            case 'alipaynotify':
                include APP . "/libs/alipay/aliapy.service.php";
                $service = new AlipayService();
                $res = $service->notify_callback();
                break;
            case 'alipay':
                require_once(APP . "/libs/alipay/lib/alipay_notify.class.php");

                $alipay = new AlipayNotify(array(
                    'partner' => ALIPAY_PARTNER,
                    'key' => ALIPAY_KEY,
                    'sign_type' => ALIPAY_SIGN_TYPE,
                    'input_charset' => ALIPAY_INPUT_CHARSET,
                    'cacert' => ALIPAY_CACERT,
                    'transport' => ALIPAY_TRANSPORT,
                ));
                $result = $alipay->verifyReturn();
                if (!$result) {
                    //用户信息获取失败，返回授权页
                    $this->redirect('/auths/alipay/?relurl=' . $relurl);
                    break;
                }


                if (!isset($_GET['user_id'])) {
                    //用户信息获取失败，返回授权页
                    $this->redirect('/auths/alipay/?relurl=' . $relurl);
                    break;
                }
                $this->userArray = array(
                    "openid" => $_GET['user_id'],
                    "nickname" => $_GET["real_name"],
                    "photo" => '',
                    "abstract" => '',
                    "city" => '',
                    "homepage" => '',
                    "relurl" => $relurl,
                    "access_token" => $_GET['token'],
                    "notify_id" => $_GET['notify_id'],
                );
                break;
            case 'wechat':

                require APP . '/libs/wechat/index.php';
                if (empty($wechatType)) {
                    $this->redirect('/auths/douban/?relurl=' . $relurl);
                    exit;
                } else if ($wechatType == 'web') {
                    $tokenUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' . WECHAT_WEB_APPKEY . '&secret=' . WECHAT_WEB_APPSECRETKEY . '&code=' . $_GET['code'] . '&grant_type=authorization_code';
                    $token = json_decode(file_get_contents($tokenUrl), true);
                    if (isset($token['access_token']) && !empty($token['access_token'])) {
                        $userInfoUrl = 'https://api.weixin.qq.com/sns/userinfo?access_token=' . $token['access_token'] . '&openid=' . $token['openid'];
                        $result = json_decode(file_get_contents($userInfoUrl), true);
                        $this->userArray = array(
                            "openid" => $result["openid"],
                            "nickname" => $result["nickname"],
                            "photo" => $result["headimgurl"],
                            "abstract" => '',
                            "city" => $result["city"],
                            "homepage" => '',
                            "relurl" => $relurl,
                            "access_token" => $token["access_token"],
                        );
                    } else {
                        $this->redirect('/auths/wechat/web?relurl=' . $relurl);
                        exit;
                    }
                } else if ($wechatType == 'mobile') {
                    if (empty($_GET['code'])) {
                        $this->redirect('/auths/wechat/web?relurl=' . $relurl);
                        exit;
                    }
                    $code = $_GET['code'];
                    $wechat = new YF_wechat();
                    $token = $wechat->get_web_access_token(WECHAT_MOBILE_APPKEY, WECHAT_MOBILE_APPSECRETKEY, $code);
                    $result = $wechat->WebGetUserInfo($token['access_token'], $token['openid']);

                    $this->userArray = array(
                        "openid" => $result["openid"],
                        "nickname" => $result["nickname"],
                        "photo" => $result["headimgurl"],
                        "abstract" => '',
                        "city" => $result["city"],
                        "homepage" => '',
                        "relurl" => $relurl,
                        "access_token" => $token["access_token"],
                    );
                }

                break;
        }
        $this->authUser($type);
    }

    private function authUser($type) {
        $this->loadModel('UserAuth');
        $this->loadModel('UserAttribute');
        $this->User->useDbConfig = 'write';
        $this->UserAuth->useDbConfig = 'write';
        $this->UserAttribute->useDbConfig = 'write';

        $user = $this->UserAuth->userExists($type, $this->userArray["openid"]);
        $now_time = date('Y-m-d H:i:s');
        if (!$user) {
            //注册新用户
            $this->User->query('BEGIN');
            try {
                $inviteId = 0;
                if ($this->Cookie->read('invite_uid')) {
                    $inviteUser = $this->User->get($this->Cookie->read('invite_uid'));
                    if ($inviteUser) {
                        $inviteId = $inviteUser['User']['id'];
                        $this->Cookie->delete('invite_uid');
                    }
                }
                $user = $this->User->save(array(
                    'nickname' => $this->filterBlockList($this->userArray["nickname"]),
                    'photo' => $this->userArray["photo"],
                    'abstract' => $this->filterHtml($this->userArray["abstract"]),
                    'login_time' => $now_time,
                    'create_time' => $now_time,
                    'invite_id' => $inviteId,
                ));
                $user['User']['id'] = $this->User->getLastInsertId();
                if (!$user) {
                    throw new Exception('插入失败', 2);
                }
                $location = explode(' ', $this->userArray["city"]);
                $res = $this->UserAttribute->save(array(
                    "uid" => $this->User->id,
                    'location' => $location[0],
                    'homepage' => $this->userArray["homepage"],
                    'reg_ip' => getIp()
                ));
                if (!$res) {
                    throw new Exception('插入失败', 2);
                }
                $res = $this->UserAuth->save(array(
                    "uid" => $this->User->id,
                    'openid' => $this->userArray["openid"],
                    'access_token' => $this->userArray["access_token"],
                    'type' => $type,
                ));
                if (!$res) {
                    throw new Exception('插入失败', 2);
                }
                $this->User->query('COMMIT');
            } catch (Exception $e) {
                $this->User->query('ROLLBACK');
                $this->User->query('COMMIT');
                $this->redirect('/auths/' . $type . '/?error=插入数据失败&relurl=' . $this->userArray['relurl']);
                exit;
            }
        } else {
            $data = array(
                'id' => $user['User']['id'],
                'login_time' => $now_time,
                'login_count' => 'login_count+1'
            );
            if (empty($user['User']['photo']) && !empty($this->userArray["photo"])) {
                $data["photo"] = $this->userArray["photo"];
            }

            $this->User->save($data);
        }
        $this->Cookie->write('uid', $user['User']['id']);
        $this->redirect(urldecode($this->userArray['relurl']));
        exit;
    }

}

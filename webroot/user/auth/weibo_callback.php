<?php
require PATH_LIBS . '/weibo/saetv2.ex.class.php';
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
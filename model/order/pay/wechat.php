<?php


/**
 * 微信支付
 */

class Model_Order_Pay_Wechat extends BaseModel {
    static $table = "";
    function __construct(){
        //parent::__construct();
    }
    static function notify_callback($order_no,$pay_no,$pay_price){
        pt_debug($order_no);
        pt_debug($pay_no);
        pt_debug($pay_price);
        Model_Order_Pay::success($order_no,$pay_no,$pay_price,'wechat');
    }
    static function notify(){
        require_once PATH_LIBS.'/wechat/notify.php';
        $notify = new PayNotifyCallBack();
        $notify->Handle(false);
    }

    static function build_address_params()
    {
        require_once PATH_LIBS . "/wechat/WxPay.JsApiPay.php";
        $tools = new JsApiPay();
        $openId = $tools->GetOpenid();
        $editAddress = $tools->GetEditAddressParameters();
        return $editAddress;
    }

    /**
     * @param $order_no
     * @param $body
     * @param $price
     * @return json数据 可直接填入js函数作为参数
     */
    static function build_js_param($order_no,$body,$price){
        require_once PATH_LIBS."/wechat/lib/WxPay.Api.php";
        require_once PATH_LIBS . "/wechat/WxPay.JsApiPay.php";
        $tools = new JsApiPay();
        $openId = $tools->GetOpenid();
        pt_debug($openId);
        //②、统一下单
        $input = new WxPayUnifiedOrder();
        $input->SetBody($body);
//        $input->SetAttach("test");
        $input->SetOut_trade_no($order_no);
        $input->SetTotal_fee($price);
        $input->SetTime_start(date("YmdHis"));
        $input->SetTime_expire(date("YmdHis", time() + 600));
//        $input->SetGoods_tag("test");
        $input->SetNotify_url(WxPayConfig::get_notify_url());
        $input->SetTrade_type("JSAPI");
        $input->SetOpenid($openId);
        $order = WxPayApi::unifiedOrder($input);
        $jsApiParameters = $tools->GetJsApiParameters($order);
        //获取共享收货地址js函数参数
        return $jsApiParameters;
    }

    /**
     *
     * 通过跳转获取用户的openid，跳转流程如下：
     * 1、设置自己需要调回的url及其其他参数，跳转到微信服务器https://open.weixin.qq.com/connect/oauth2/authorize
     * 2、微信服务处理完成之后会跳转回用户redirect_uri地址，此时会带上一些参数，如：code
     *
     * @return 用户的openid
     */
    public function GetOpenid()
    {
        //通过code获得openid
        if (!isset($_GET['code'])) {
            //触发微信返回code码
            $baseUrl = urlencode('http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);
            pt_log($baseUrl);
            $url = $this->__CreateOauthUrlForCode($baseUrl);
            pt_log($url);
            Header("Location: $url");
            exit();
        } else {
            //获取code码，以获取openid
            $code = $_GET['code'];
            pt_log("code:%s", $code);
            $openid = $this->getOpenidFromMp($code);
            pt_log("openid:%s", $openid);
            return $openid;
        }
    }

    /**
     *
     * 获取地址js参数
     *
     * @return 获取共享收货地址js函数需要的参数，json格式可以直接做参数使用
     */
    public function GetEditAddressParameters()
    {
        $getData = $this->data;
        $data = array();
        $data["appid"] = WxPayConfig::APPID;
        $data["url"] = "http://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
        $time = time();
        $data["timestamp"] = "$time";
        $data["noncestr"] = "1234568";
        $data["accesstoken"] = $getData["access_token"];
        ksort($data);
        $params = $this->ToUrlParams($data);
        $addrSign = sha1($params);

        $afterData = array(
            "addrSign" => $addrSign,
            "signType" => "sha1",
            "scope" => "jsapi_address",
            "appId" => WxPayConfig::APPID,
            "timeStamp" => $data["timestamp"],
            "nonceStr" => $data["noncestr"]
        );
        $parameters = json_encode($afterData);
        return $parameters;
    }

    /**
     *
     * 构造获取code的url连接
     * @param string $redirectUrl 微信服务器回跳的url，需要url编码
     *
     * @return 返回构造好的url
     */
    private function __CreateOauthUrlForCode($redirectUrl)
    {
        $urlObj["appid"] = WxPayConfig::APPID;
        $urlObj["redirect_uri"] = "$redirectUrl";
        $urlObj["response_type"] = "code";
        $urlObj["scope"] = "snsapi_base";
        $urlObj["state"] = "STATE" . "#wechat_redirect";
        $bizString = $this->ToUrlParams($urlObj);
        return "https://open.weixin.qq.com/connect/oauth2/authorize?" . $bizString;
    }

    /**
     *
     * 构造获取open和access_toke的url地址
     * @param string $code ，微信跳转带回的code
     *
     * @return 请求的url
     */
    private function __CreateOauthUrlForOpenid($code)
    {
        $urlObj["appid"] = WxPayConfig::APPID;
        $urlObj["secret"] = WxPayConfig::APPSECRET;
        $urlObj["code"] = $code;
        $urlObj["grant_type"] = "authorization_code";
        $bizString = $this->ToUrlParams($urlObj);
        return "https://api.weixin.qq.com/sns/oauth2/access_token?" . $bizString;
    }

}
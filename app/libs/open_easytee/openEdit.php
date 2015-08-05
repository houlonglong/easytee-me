<?php

/**
 * Created by PhpStorm.
 * User: yfzhu
 * Date: 15/6/7
 * Time: 03:34
 */
class openEdit {

    public function __construct($config = array()) {
        if (empty($config)) {
            return;
        }
        $this->key = $config['key'];
        $this->secret = $config['secret'];
        $this->api = $config['api'];
        $this->dataType = isset($config['dataType']) ? $config['dataType'] : 'xml';
        $this->sign = null;
        $this->sign_time = null;
        $this->userToken = null;
    }

    public function getUserToken($params) {
        $this->sign($params);
        $result = $this->get($this->api . "init/getusertoken/", $params);
        return $result;
    }

    public function getDesignList($params = array(), $userToken = null) {
        $this->userToken = $userToken;
        return $this->get($this->api . "Design/getList/", $params);
    }

    public function initDesign($params = array(), $userToken = null) {
        $this->userToken = $userToken;
        return $this->get($this->api . "Init/initDesign/", $params);
    }

    public function getArtList($params = array(), $userToken = null) {
        $this->userToken = $userToken;
        return $this->get($this->api . "Art/getList/", $params);
    }

    public function getActivity($params, $userToken) {
        $this->userToken = $userToken;
        return $this->get($this->api . "Activity/getList/", $params);
    }

    public function getActivityById($id, $userToken) {
        $this->userToken = $userToken;
        return $this->get($this->api . "Activity/get/", array('id' => $id));
    }

    public function getActivityDetail($id) {
        return $this->get($this->api . "Activity/getDetail/", array('id' => $id));
    }

    public function updateActivityById($params, $userToken) {
        $this->userToken = $userToken;
        return $this->post($this->api . "Activity/update/", $params);
    }

    public function getActivityForum($id) {
        return $this->get($this->api . "Activity/getForum/", array('id' => $id));
    }

    public function closeActivityById($params, $userToken) {
        $this->userToken = $userToken;
        return $this->get($this->api . "Activity/close/", $params);
    }

    public function copyActivityById($params, $userToken) {
        $this->userToken = $userToken;
        return $this->post($this->api . "Activity/copy/", $params);
    }

    /**
     * 删除设计
     */
    public function deleteDesign($params, $userToken) {
        $this->userToken = $userToken;
        return $this->post($this->api . "Design/delete/", $params);
    }

    public function getSupporter($params) {
        return $this->get($this->api . "Activity/getSupporter/", $params);
    }

    public function getForum($id) {
        return $this->get($this->api . "Activity/getForum/", array('id' => $id));
    }

    public function getOrderList($params, $userToken) {
        $this->userToken = $userToken;
        return $this->post($this->api . "order/getList/", $params);
    }

    public function cancelOrder($params, $userToken) {
        $this->userToken = $userToken;
        return $this->get($this->api . "order/cancel/", $params);
    }

    public function moneyFlow($params, $userToken) {
        $this->userToken = $userToken;
        return $this->post($this->api . "user/moneyFlow/", $params);
    }

    public function applyForCash($params, $userToken) {
        $this->userToken = $userToken;
        return $this->post($this->api . "user/applyForCash/", $params);
    }

    public function getUser($userToken) {
        $this->userToken = $userToken;
        return $this->post($this->api . "user/getUser/");
    }

    public function updateOpenUser($params, $userToken) {
        $this->userToken = $userToken;
        return $this->post($this->api . "User/updateUser/", $params);
    }

    public function getAddress($userToken) {
        $this->userToken = $userToken;
        return $this->post($this->api . "Address/getList/", array());
    }

    public function saveAddress($params, $userToken) {
        $this->userToken = $userToken;
        return $this->post($this->api . "Address/save/", $params);
    }

    public function deleteAddress($params, $userToken) {
        $this->userToken = $userToken;
        return $this->post($this->api . "Address/delete/", $params);
    }

    public function saveMoneyflow($params) {
        return $this->post($this->api . "User/saveMoneyflow/", $params);
    }

    /**
     * 提交订单
     * @param $params
     * @param $userToken
     * @return mixed
     */
    public function saveOrder($params, $userToken) {
        $this->userToken = $userToken;
        return $this->post($this->api . "order/save/", $params);
    }

    /**
     * 获取订单详情
     * @param type $params
     * @param type $userToken
     * @return type
     */
    public function getOrderDetail($params, $userToken) {
        $this->userToken = $userToken;
        return $this->post($this->api . "order/get/", $params);
    }

    /**
     * 获取产品详情
     * @param type $resource
     * @param type $params
     * @return type
     */
    public function getProduct($params) {
        return $this->get($this->api . "product/getProductById/", $params);
    }

    /**
     * 获取尺码
     */
    public function size($params) {
        return $this->get($this->api . "activity/size/", $params);
    }

    /**
     * 通过订单号获取订单详情
     * @param $params
     * @param $userToken
     * @return mixed
     */
    public function getOrderByOrderNo($params, $userToken) {
        $this->userToken = $userToken;
        return $this->post($this->api . "order/getOrderByOrderNo", $params);
    }

    public function getExpressAreaPrice() {
        return $this->get($this->api . "express/price");
    }

    public function getHotActivity() {
        return $this->get($this->api . "activity/hotActivity");
    }

    public function likeActivity($params, $userToken) {
        $this->userToken = $userToken;
        return $this->get($this->api . "activity/love", $params);
    }

    public function getOrderPayUrl($params, $userToken) {
        $this->userToken = $userToken;
        return $this->get($this->api . "order/getOrderPayUrl", $params);
    }

    public function get($resource, $params = array()) {
        return $this->oAuthRequest('GET', $resource, $params);
    }

    public function post($resource, $params = array()) {
        return $this->oAuthRequest('POST', $resource, $params);
    }

    public function put($resource, $params = array()) {
        return $this->oAuthRequest('PUT', $resource, $params);
    }

    public function delete($resource, $params = array()) {
        return $this->oAuthRequest('DELETE', $resource, $params);
    }

    public function oAuthRequest($method, $url, $params) {
        if (strpos($url, 'http') !== 0) {
            $url = $this->api . $url;
        }
        switch ($method) {
            case 'GET':
            case 'DELETE':
                return $this->http($method, $url, $params);
        }
        return $this->http($method, $url, $params);
    }

    private function getHeader() {
        return 'Content_type: application/x-www-form-urlencoded';
    }

    public function http($method, $url = '', $params) {

        $params["appKey"] = $this->key;
        $params['dataType'] = $this->dataType;
        if ($this->userToken !== null) {
            $params["userToken"] = $this->userToken;
            $sign = $this->sign($params);
            $params["signTime"] = $sign['sign_time'];
            $params["sign"] = $sign['sign'];
        }

        $ch = curl_init();
        $headers = array();
        $options = array(
            CURLOPT_RETURNTRANSFER => TRUE,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_CONNECTTIMEOUT => 10,
            CURLOPT_HEADER => FALSE,
            CURLOPT_SSL_VERIFYPEER => FALSE,
            CURLOPT_USERAGENT => 'Easytee PHP SDK by yfzhu',
        );
        switch ($method) {
            case 'POST':
                $options[CURLOPT_POST] = TRUE;
                $options[CURLOPT_POSTFIELDS] = $params;
                break;
            case 'PUT':
                $options[CURLOPT_CUSTOMREQUEST] = 'PUT';
                $options[CURLOPT_POSTFIELDS] = $params;
                break;
            case 'DELETE':
                $options[CURLOPT_CUSTOMREQUEST] = 'DELETE';
                break;
            case 'GET':
                $i = 0;
                if (!strstr('?', $url) && $params) {
                    $url = $url . '?';
                } else {
                    $url .= '&';
                }
                foreach ($params as $key => $value) {
                    if ($i != 0) {
                        $url .= '&';
                    }
                    $url .= $key . '=' . $value;
                    $i++;
                }
        }
        $options[CURLOPT_URL] = $url;

        $headers[] = $this->getHeader();
        $headers[] = 'Expect:';
        $options[CURLOPT_HTTPHEADER] = $headers;
        curl_setopt_array($ch, $options);
        $result = curl_exec($ch);
        $this->http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
//        pt_log($url);
        //pt_log($params);
//        pt_log($result);
//        file_put_contents('c:/test1.txt', json_encode($params) . "\r\n", 8);
        // echo $result;
        // echo "\n";
//        echo $url;
//        echo "\n";
        //var_dump($params);
//        exit;
//         echo '============'.$result;exit;
        return $result;
    }

    private function sign($params) {
        if (!is_array($params)) {
            return null;
        }
        $this->sign_time = time();
        //把数组所有元素，按照“参数=参数值”的模式用“&”字符拼接成字符串
        $prestr = $this->createLinkstring($params);
        $mysign = md5($prestr . $this->secret . $this->sign_time);
        return array('sign_time' => time(), 'sign' => $mysign);
    }

    /**
     * 把数组所有元素  按照“参数=参数值”的模式用“&”字符拼接成字符串
     * @param $para ;需要拼接的数组
     * @return 拼接完成以后的字符串
     */
    private function createLinkstring($para) {
        $arg = "";
        $para = $this->paraFilter($para);
        while (list ($key, $val) = each($para)) {
            $arg.=$key . "=" . $val . "&";
        }
        //去掉最后一个&字符
        $arg = substr($arg, 0, count($arg) - 2);

        //如果存在转义字符，那么去掉转义
        if (get_magic_quotes_gpc()) {
            $arg = stripslashes($arg);
        }

        return $arg;
    }

    /**
     * 除去数组中的空值和签名参数
     * @param $para 签名参数组
     * @return 去掉空值与签名参数后的新签名参数组
     */
    private function paraFilter($para) {
        $para_filter = array();
        $keys = array(
            'signTime',
            'sign',
            'url',
            'dataType',
        );
        while (list ($key, $val) = each($para)) {
            if (in_array($key, $keys)) {
                continue;
            } else
                $para_filter[$key] = $para[$key];
        }
        return $this->argSort($para_filter);
    }

    /**
     * 对数组排序
     * @param $para 排序前的数组
     * @return 排序后的数组
     */
    private function argSort($para) {
        ksort($para);
        reset($para);
        return $para;
    }

}

<?php

class EtException extends Exception {
    
}

class OrderController extends AppController {

    var $uses = array('User');
    var $name = "Order";

    function beforeFilter() {
        parent::beforeFilter();
    }

    /**
     * 获取用户地址列表
     *
     * @return array
     */
    function get_user_address_list() {
        $addresses = $this->open->getAddress($this->userToken);
        $addresses = json_decode($addresses, true);
        $this->checkReturnData($addresses);
        return $addresses ? $addresses : array();
    }

    /**
     * 检查活动状态
     */
    function check_act_status($act_id) {
        $return = json_decode($this->open->getActivityDetail($act_id), 1);
        $activity = $return['activity'];
        if (time() > strtotime($activity['endTime'])) {
            $this->redirect('/error404/?error=当前活动已过期');
            exit;
        }
        if (2 == $activity['pass']) {
            $this->redirect('/error404/?error=活动审核未通过');
            exit;
        }
        return $activity;
    }

    function index() {
        if ($this->userId == 0) {
            $this->redirect('/login/?relurl=' . urlencode("http://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']));
            exit;
        }
        if (!empty($_GET['order_id'])) {//用户从我的未付款订单直接去付款
            try {
                if (empty($_GET['pay_type'])) {
                    throw new Exception("支付方式不能为空");
                }
                $pay_type = $_GET['pay_type'];
                $return = $this->open->getOrderPayUrl(array(
                    "order_id" => $_GET['order_id'],
                    'pay_type' => $pay_type,
                    'wx_browser' => is_wechat_browser()
                        ), $this->userToken);

                $res = $this->ajaxCheckReturnData($return);
                if (!$res)
                    throw new Exception("网络错误");
                pt_log($res);
                $res = json_decode($res, 1);
                if (isset($res['status']) && $res['status'] == 0) {
                    throw new Exception($res['msg']['value']);
                }
                if (empty($res['url'])) {
                    throw new Exception("返回支付网址为空");
                }
                $url = $res['url'];
                if ($pay_type == 'alipay') {
                    header("Location: $url");
                } else {
                    if (is_wechat_browser()) {//微信浏览器直接跳转支付
                        header("Location: $url");
                    } else {//扫码支付
                        $url = "/order/qrcode?data=" . urlencode($url);
                        echo '<center><img style="width: 280px;height:280px;" src="' . $url . '"></center>';
                    }
                }
                exit;
            } catch (Exception $e) {
                $msg = $e->getMessage();
                if (empty($_REQUEST['format']))
                    $this->redirect('/error404/?error=' . $msg);
                else {
                    echo "$msg";
                }
                exit;
            }
        } else {
            //活动ID
            $act_id = @$_GET['act_id'];
            if (!$act_id) {
                $this->redirect('/error/?error=缺少参数');
            }
            $activity = $this->check_act_status($act_id);
            $page_name = $activity['name'];

            //用户地址列表
            $addresses = $this->get_user_address_list();
            $express_area_price = $this->open->getExpressAreaPrice();
            //使用微信收货地址回调
            if (@$_GET['a_name']) {
                //微信收货地址
                $wc_addr = array();
                $wc_addr['name'] = @$_GET['a_name'];
                $wc_addr['tel'] = @$_GET['a_mobile'];
                $wc_addr['province'] = @$_GET['a_province'];
                $wc_addr['city'] = @$_GET['a_city'];
                $wc_addr['area'] = @$_GET['a_area'];
                $wc_addr['addr'] = @$_GET['a_addr'];
                $this->open->saveAddress($wc_addr, $this->userToken);
                header("Location: /order?act_id=" . $act_id);
                exit;
            }
            $this->set(compact('page_name', 'act_id', 'addresses', 'express_area_price','activity'));
        }
    }

    //生成二维码图片
    function qrcode() {
        error_reporting(E_ERROR);
        require_once APP . '/libs/phpqrcode/phpqrcode.php';
        if (isset($_GET["data"])) {
            $url = urldecode(@$_GET["data"]);
            QRcode::png($url);
            exit;
        } else {
            die("没有要生成二维码的数据");
        }
    }

    function save() {
        if ($this->userId <= 0) {
            $this->showMessage('请先登陆', 0);
        }
        //$users = $this->User->get($this->userId);
        if ($_POST) {
            $_POST['wx_browser'] = is_wechat_browser();
            $return = $this->open->saveOrder($_POST, $this->userToken);
            pt_log($return);
            echo $this->ajaxCheckReturnData($return);
        } else {
            echo json_encode(array('msg' => '参数不能为空', 'status' => 0));
        }
        exit;
    }

    function complete() {
        $order_no = @$_GET['order_no'];
        if ($this->userId == 0) {
            $this->redirect('/login/?relurl=' . urlencode("http://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']));
        }
        if (!$order_no) {
            $this->redirect('/error404/?error=订单号不能为空');
            exit;
        }
        $order_return = $this->open->getOrderByOrderNo(array("order_no" => $order_no), $this->userToken);
        $order = json_decode($this->ajaxCheckReturnData($order_return), true);

        $page_name = "订单完成";
        //删除订单确认页COOKIE
        remove_cookie("act_order_form");
        $this->set(compact('order', "page_name"));
    }



}

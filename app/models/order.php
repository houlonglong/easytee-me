<?php

class Order extends AppModel {

    public $name = 'Order';
    public $useDbConfig = 'write';
    //订单锁 KEY
    var $order_lock_key = "order_lock_key";
    var $hasMany = array(
        'OrderGoods' => array(
            'className' => 'OrderGoods',
            'foreignKey' => 'order_id',
            'dependent' => true,
        ),
    );
    var $hasOne = array(
        'OrderAttribute' => array(
            'className' => 'OrderAttribute',
            'foreignKey' => 'order_id',
            'conditions' => '',
            'dependent' => true,
        ),
    );

    /**
     * 通过订单ID直接从DB获取订单详情
     * @param $id
     * @return array
     */
    function get_order_by_id($id) {
        $res = $this->query("select * from order where id = " . intval($id));
        return $res;
        cache::clear();
        $data = $this->find('first', array('conditions' => array('Order.id' => $id)));
        return $data;
    }

    /**
     * 通过订单号直接从DB获取订单详情
     * @param $orderno  订单号
     * @return array
     */
    function get_order_by_no($orderno, $cache = false) {
        cache::clear();
        if ($cache) {
            $key = 'orders_no_' . $orderno;
            $data = cache::read($key);
            if (!$data) {
                $data = $this->find('first', array('conditions' => array('Order.order_no' => $orderno)));
                cache::write($key, $data);
            }
        } else {
            $data = $this->find('first', array('conditions' => array('Order.order_no' => $orderno)));
        }

        return $data;
    }

    function get($id) {
        $key = 'orders_id_' . $id;
        $data = cache::read($key);
        if (!$data) {
            $data = $this->find('first', array('conditions' => array('Order.id' => $id)));
            cache::write($key, $data);
        }
        return $data;
    }

    function getByOrderId($orderId) {
        $key = 'orders_order_id_' . $orderId;
        $data = cache::read($key);
        if (!$data) {
            $data = $this->find('first', array('conditions' => array('order_no' => $orderId)));
            cache::write($key, $data);
        }
        return $data;
    }

    function getByActivityId($activityId) {
        $result = $this->find('all', array('conditions' => array('activity_id' => $activityId)));
        return empty($result) ? array() : $result;
    }

    //根据活动的ID查出还没添加快递单的订单
    function getOrderByActivityId($activityId) {
        $result = $this->find('all', array('conditions' => array('activity_id' => $activityId, 'status' => '待发货', 'express_info' => '')));
        return empty($result) ? array() : $result;
    }

    function add($info) {
        //ALTER TABLE `sales` ADD `order_id` BIGINT(15) UNSIGNED NOT NULL COMMENT '订单编号date(''ymdHis'')' AFTER `id`, ADD UNIQUE (`order_id`) ;
        //3次
        $count = 0;
        while (1) {
            try {
                //'14121019442137079'
                $orderId = date('ymdHis') . sprintf('%03d', floor(microtime() * 1000)) . mt_rand(10, 99);
                $this->create();
                $now = date('Y-m-d H:i:s');

                $info['order_no'] = $orderId;
                $info['create_time'] = $now;
                $order = $this->save($info);
                if (!$order) {
                    throw new Exception("Error Processing Request", 1);
                }
                $info['id'] = $this->getLastInsertId();
                return $info;
            } catch (Exception $e) {
                $count++;
                if ($count > 3) {
                    break;
                }
            }
        }

        //10%的概率删除无效订单
        //if (mt_rand(1, 100) < 10) {
        //$this->deleteExpiredOrder();
        //}
        return false;
    }

    /**
     * 付款成功之后更新订单状态
     * @param type $id
     * @return type
     */
    function change_order_status($id, $pay_no, $pay_type) {
        $data['Order.status'] = "'待发货'";
        $data['Order.pay_type'] = "'$pay_type'";
        $data['OrderAttribute.pay_no'] = "'$pay_no'";
        $pay_time = date('Y-m-d H:i:s');
        $data['OrderAttribute.pay_time'] = "'$pay_time'";
        $data['OrderAttribute.pay_type'] = "'$pay_type'";
        $this->updateAll($data, array(
            'Order.id' => $id
        ));
        cache::delete("orders_id_" . $id);
        return $this->getAffectedRows();
    }

    function sendSms($orderId, $phoneNo, $title) {
        $this->updateAll(array('sms_sent' => "'y'"), array('order_id' => $orderId, 'status !=' => '待付款', 'sms_sent' => 'n'));
        if ($this->getAffectedRows()) {
            $ret = $this->getByOrderId($orderId);
            if ($ret[$this->name]['delivery_type'] == 'custom') {
                $receipt = json_decode($ret[$this->name]['delivery_address'], true);
                if (!empty($receipt)) {
                    //发送统一配送短信
                    //【吉重网】您已成功购买“#order_title#”,您的订单号是#order_id#,我们会在15个工作日内将商品配送到#orrder_add#，
                    // 届时请联系#order_lxr#-#order_mob#自行取货。再次感谢您的信赖。如有问题，请联系4009202085
                    $address = $receipt['province'] . $receipt['city'] . $receipt['county'] . $receipt['address'];
                    return tpl_send_sms('7a6460c962c1ccc28158186f6c511217', 631985, '#order_title#=' . $title . '&#order_id#=' . $orderId . '&#orrder_add#=' . $address . '&#order_lxr#=' . $receipt['name'] . '&#order_mob#=' . $receipt['tel'], $phoneNo);
                }
            } else {
                //【吉重网】您已成功购买“#order_title#”,您的订单号是#order_id#
                return tpl_send_sms('7a6460c962c1ccc28158186f6c511217', 609415, '#order_title#=' . $title . '&#order_id#=' . $orderId, $phoneNo);
            }
        }
        return false;
    }

    //获取待生产订单
    function getProduce($activityId, $status = '待发货') {
        //SELECT GROUP_CONCAT(id) FROM `user_orders` WHERE `activity_id` = 2 and `status` = '待发货'
        $ret = $this->find('first', array('fields' => 'GROUP_CONCAT(id) id', 'conditions' => array('activity_id' => $activityId, 'status' => $status)));
        return empty($ret['0']['id']) ? array() : explode(',', $ret['0']['id']);
    }

    function delExpiredOrder($order_id) {
        $this->deleteAll(array('Order.id' => $order_id));
        cache::delete("orders_id_" . $order_id);
    }

    //获取过期订单
    function getExpiredOrder($hour) {
        $time = 60 * 60 * $hour;
        $rows = $this->find('all', array(
            'conditions' => array(
                'Order.status' => '待付款',
                'UNIX_TIMESTAMP(Order.create_time) <  UNIX_TIMESTAMP() - ' . $time
            )
                )
        );
        return $rows;
    }

    //展示最新10条支持者
    function getOrderByActivityIdNews($activityId) {
        return $this->find('all', array('conditions' => array('activity_id' => $activityId, 'status not' => array('待付款', '取消', '已关闭')), 'order' => 'Order.id desc', 'limit' => 5));
    }

    function getByActivityIdLimit($activityId, $offset, $limit) {
        $condition = array('activity_id' => $activityId, 'status not' => array('待付款', '取消', '已关闭'));
        $result = $this->find('all', array('conditions' => $condition, 'order' => 'Order.id desc', 'limit' => $offset . ',' . $limit));
        $count = $this->getCountByActivityId($activityId);
        $result['count'] = $count;
        return empty($result) ? array() : $result;
    }

    // 成功的订单
    function getSuccessByActivityId($activityId) {
        $result = $this->find('all', array('conditions' => array('activity_id' => $activityId, 'status not' => array('待付款', '取消')), 'order' => 'Order.id desc'));
        return empty($result) ? array() : $result;
    }

    /**
     * 查找活动成功的订单数量
     * @param type $activityId
     * @return type
     */
    function getCountByActivityId($activityId) {
        $condition = array('activity_id' => $activityId, 'Order.status not' => array('待付款', '取消', '已关闭'));
        $count = $this->find('count', array('conditions' => $condition));
        return $count;
    }

    function getOrderByUid($condition, $offset, $limit) {
        if ($limit) {
            $result = $this->find('all', array('conditions' => $condition, 'order' => 'Order.id desc', 'limit' => $offset . ',' . $limit));
            $count = $this->find('count', array('conditions' => $condition,));
            $result['count'] = $count;
        } else {
            $result = $this->find('all', array('conditions' => $condition, 'order' => 'Order.id desc'));
            $result['count'] = $count;
        }
        return empty($result) ? array() : $result;
    }

    /**
     * 获取订单完成回调URL
     * @param $uid
     * @param $order_no
     * @throws Exception
     * @author Joseph
     */
    function get_app_order_complete_callback_url_by_uid($uid, $order_no, $type = "order.complete") {
        $callback_url = $this->get_app_order_callback_url($uid);
        $redirect_url = $callback_url . "?type=$type&order_no=" . $order_no;
        pt_log($redirect_url);
        return $redirect_url;
    }

    /**
     * 获取订单取消回调URL
     * @param $uid
     * @param $order_id
     * @throws Exception
     * @author Joseph
     */
    function get_app_order_cancel_callback_url_by_uid($uid, $order_id, $type = "order.cancel") {
        $callback_url = $this->get_app_order_callback_url($uid);
        $redirect_url = $callback_url . "?type=$type&order_id=" . $order_id;
        pt_log($redirect_url);
        return $redirect_url;
    }

    function get_app_order_callback_url($uid) {
        $app_info = db_select_row("select callback_url from users as u left join applications as a on a.id = u.app_id where u.id = ?", $uid);
        if (!$app_info || empty($app_info['callback_url'])) {
            throw new Exception("app callback url not defined");
        }
        $callback_url = $app_info['callback_url'];
        if (substr($callback_url, 0, 7) != "http://") {
            $callback_url = "http://" . $callback_url;
        }
        return $callback_url;
    }

    /**
     * 获取订单支付金额
     * @param $order_row
     * @return float
     */
    function get_order_pay_price($order_row) {
        //return 0.01;
        return round($order_row['total_price'] + $order_row['express_price'], 2);
    }

    /**
     * 获取侍付款订单支付URL
     * @param $order_row 订单信息
     */
    function get_order_pay_url($order_row, $is_wx_browser = false) {
        $payPrices = $this->get_order_pay_price($order_row);
        if ($order_row["pay_type"] == 'wechat') {
            include APP . "/libs/wechat/wcpay.service.php";
            $service = new WcpayService();
            $order_row['price'] = $payPrices;
            pt_log($_SERVER);
            if (!$is_wx_browser) {
                pt_log("wechat pay in browser");
                $url = $service->build_get_wcpay_qrcode_url("http://o.dev.jzw.la/pay/nativenotify/", $order_row);
            } else {
                pt_log("wechat pay in wx browser");
                $return_url = $service->get_return_url(
                        WxPayConf_pub::JS_API_CALL_URL, array(
                    "order_id" => $order_row['id'],
                    "pay_type" => $order_row['pay_type'], //微信支付
                        )
                );
                pt_log($return_url);
                $url = $service->build_get_wcpay_code_url($return_url);
            }
        } else {

            include APP . "/libs/alipay/aliapy.service.php";
            $service = new AlipayService();
            $info = array(
                'order_no' => $order_row['order_no'],
                'name' => $order_row['name'],
                'price' => $payPrices,
                'body' => $order_row['body'],
            );
            pt_log($info);
            $url = $service->build_alipay_requery_url($info);
        }
        pt_log($url);
        return $url;
    }

    //保存订单加锁
    function lock_order() {
        $this->lock_order_release();
        $order_lock = cache::read($this->order_lock_key);
        if ($order_lock) {
            throw new EtException("服务器繁忙,请稍后再试");
        } else {
            cache::write($this->order_lock_key, "1");
        }
    }

    //保存订单释放锁
    function lock_order_release() {
        cache::delete($this->order_lock_key);
    }

    function updateOrderStatusToRefund($activityId) {
        $this->updateAll(array('Order.status' => "'已关闭'"), array('status not' => array('待付款', '取消'), 'activity_id' => $activityId));
        return $this->getAffectedRows();
    }

    function cancelOrder($id) {
        $this->updateAll(array('Order.status' => "'已关闭'"), array('Order.id' => $id));
        return $this->getAffectedRows();
    }

    function updateStatus($activityId, $status) {
        $this->updateAll(array('Order.status' => $status), array('activity_id' => $activityId));
        return $this->getAffectedRows();
    }

    function updateStatusById($id, $status) {
        $this->updateAll(array('Order.status' => $status), array('Order.id' => $id));
        return $this->getAffectedRows();
    }

    function getOrderIdsByActivity($activityId) {
        $result = $this->find('list', array('fields' => 'id', 'conditions' => array('activity_id' => $activityId)));
        return empty($result) ? array() : $result;
    }

    /**
     * 获取要退款的订单
     * @param type $activityId
     * @return type
     */
    function getOrderByActivity($activityId) {
        $result = $this->find('all', array('conditions' => array('activity_id' => $activityId, 'status not' => array('待付款', '已关闭'))));
        return empty($result) ? array() : $result;
    }

}

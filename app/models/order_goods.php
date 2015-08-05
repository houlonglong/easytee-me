<?php

class OrderGoods extends AppModel {

    public $name = 'OrderGoods';
    public $useDbConfig = 'write';

    function get($id) {
        $key = 'order_goods_id_' . $id;
        $data = cache::read($key);
        if (!$data) {
            $data = $this->find('first', array('conditions' => array('id' => $id)));
            cache::write($key, $data);
        }
        return $data;
    }

    function getByUserOrderId($orderId) {
        return $this->find('all', array('conditions' => array('user_order_id' => $orderId)));
    }

    function getOrderByActivityId($activityId) {
        return $this->find('all', array('conditions' => array('activity_id' => $activityId), 'group' => array('order_id')));
    }

    function add($info) {
        $this->create();
        $this->save($info);
        return $this->getLastInsertId();
    }

    function addAll($info) {
        $this->create();
        $this->saveAll($info);
        return $this->getLastInsertId();
    }

    function sumSalesQuantity($userOrderIds) {
        $ret = $this->find('first', array('fields' => 'sum(quantity - real_return_quantity) sales_quantity', 'conditions' => array('user_order_id' => $userOrderIds)));
        return empty($ret['0']['sales_quantity']) ? 0 : $ret['0']['sales_quantity'];
    }

    /**
     * 获取活动的单条记录
     * 
     */
    function getOneByOrderId($orderId) {
        return $this->find('first', array('conditions' => array('order_id' => $orderId)));
    }

    function getQuantityByOrderIds($orderId) {
        $result = $this->find('first', array('fields' => 'sum(quantity) AS sumQuantity', 'conditions' => array('order_id' => $orderId)));
        return empty($result) ? array() : $result;
    }

}

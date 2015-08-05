<?php

class Activity extends AppModel {

    public $name = 'Activity';
    public $useDbConfig = 'write';

    //获取用户发起的活动
    function getActivitys($uid) {
        return $this->find('first', array('conditions' => array('uid' => $uid)));
    }

    //获取用户的一个活动
    public function getActivitysAppid($appId, $id, $canCustom) {
        $key = 'activities_can_custom_1_' . $id;
        $cacheData = cache::read($key);
        if ($cacheData) {
            return $cacheData;
        }
        $data = $this->find('first', array('conditions' => array('app_id' => $appId, 'id' => $id, 'can_custom' => '1')));
        cache::write($key, $data);
        return $data;
    }

    public function getActivityById($id) {
        $key = 'activities_id_' . $id;
        $result = cache::read($key);
        if ($result) {
            return $result;
        }
        $result = $this->find('first', array('conditions' => array('id' => $id)));
        cache::write($key, $result);
        return empty($result) ? array() : $result;
    }

    public function getSuccessActivity($uid, $limit, $offset) {
        $conditions = array(
            'uid' => $uid,
            'not' => array(
                'status' => array('failure', 'ongoing', 'create'),
            )
        );
        $fields = 'id,name,sales_target,sales_count,real_end_time,default_product_style_id,design_id,total,status';
        if ($limit) {
            $result = $this->find('all', array('fields' => $fields, 'conditions' => $conditions, 'limit' => $offset . ',' . $limit, 'order' => 'id desc'));
            $count = $this->find('count', array('conditions' => $conditions,));
            $result['count'] = $count;
        } else {
            $result = $this->find('all', array('fields' => $fields, 'conditions' => $conditions));
            $result['count'] = count($result);
        }
        return empty($result) ? array() : $result;
    }

    public function getFailureActivity($uid, $limit, $offset) {
        $conditions = array(
            'uid' => $uid,
            'status' => 'failure',
        );
        $fields = 'id,name,sales_target,sales_count,real_end_time,default_product_style_id,design_id,total,status';
        if (!empty($limit)) {
            $result = $this->find('all', array(
                'conditions' => $conditions,
                'limit' => $offset . ',' . $limit,
            ));
            $count = $this->find('count', array('conditions' => $conditions,));
            $result['count'] = $count;
        } else {
            $result = $this->find('all', array('fields' => $fields, 'conditions' => $conditions));
            $result['count'] = count($result);
        }
        return empty($result) ? array() : $result;
    }

    public function getActivityBystatus($uid, $limit, $offset, $status) {
        $conditions = array(
            'uid' => $uid,
            'status' => $status,
        );
        $fields = 'id,name,sales_target,sales_count,real_end_time,default_product_style_id,design_id,total,status';
        if (!empty($limit)) {
            $result = $this->find('all', array('fields' => $fields,
                'conditions' => $conditions,
                'limit' => $offset . ',' . $limit,
                'order' => 'id desc',
            ));
            $count = $this->find('count', array('conditions' => $conditions,));
            $result['count'] = $count;
        } else {
            $result = $this->find('all', array('fields' => $fields,
                'conditions' => $conditions));
            $result['count'] = count($result);
        }
        return empty($result) ? array() : $result;
    }

    public function updateActivity($uid, $id, $info) {
        $this->updateAll($info, array('id' => $id,  'uid' => $uid));
        $rows = $this->getAffectedRows();
        if ($rows) {
            cache::delete('activities_id_' . $id);
        }
        return $rows;
    }

    public function closeActivityByIdAndUid($id, $uid) {
        $this->updateAll(array('real_end_time' => '"' . date('Y-m-d H:i:s') . '"', 'status' => '"failure"'), array('id' => $id, 'uid' => $uid));
        return $this->getAffectedRows();
    }

    public function closeActivity($id) {
        $condition['id'] = $id;
        $this->updateAll(array('real_end_time' => '"' . date('Y-m-d H:i:s') . '"', 'status' => '"failure"'), $condition);
        return $this->getAffectedRows();
    }

    public function saveData($configuration) {
        if (!isset($configuration['id']) || !$configuration['id']) {
            $this->create();
        }
        $this->save($configuration);
        if (!isset($configuration['id']) || !$configuration['id']) {
            $configuration['id'] = $this->getLastInsertId();
        }
        return $configuration;
    }

    function updateTotalMoneyCount($id, $money, $count) {
        if ($money > 0) {
            $this->updateAll(array('total' => '`total` + ' . $money, 'sales_count' => '`sales_count`' + $count), array('id' => $id));
        } else if ($money < 0) {
            $this->updateAll(array('total' => '`total` + ' . $money, 'sales_count' => '`sales_count`' + $count), array('id' => $id, 'money >=' => $money));
        }
        cache::delete("activities_id_$id");
        return $this->getAffectedRows();
    }

    function getNameRealEndTimeByid($id) {
        return $this->find('first', array('fields' => array('name', 'status', 'real_end_time'), 'conditions' => array('id' => $id)));
    }

    function getByDesignId($designId) {
        $result = $this->find('first', array('conditions' => array('design_id' => $designId)));
        return empty($result) ? array() : $result;
    }

    /**
     * 更新活动销售总数及销售总金额
     * @param $order
     */
    function change_act_count_and_total($order) {
        $act_id = intval($order['activity_id']);
        $total_price = floatval($order['total_price']);
        $quantity = intval($order['quantity']);
        pt_log("update act count and total");
        $sql = "update activities set total = total + $total_price ,sales_count = sales_count + $quantity where id = $act_id";
        pt_log($sql);
        db("write")->run_sql($sql);
        //$this->updateTotalMoneyCount($act_id,$total_price,$quantity);
    }

    function getHotActivity() {
        $result = $this->find('all', array('conditions' => array('status' => 'ongoing', 'pass' => 1), 'limit' => '0,4'));
        return empty($result) ? array() : $result;
    }

    /**
     * 获取所有生产中的活动
     * @return type
     */
    function getProfieActivity() {
        $result = $this->find('all', array('conditions' => array('status' => 'fabrication')));
        return empty($result) ? array() : $result;
    }

    /**
     * 获取所有过期的的活动
     * @return type
     */
    function getPastActivity() {
        $result = $this->find('all', array('conditions' => array('real_end_time <=' => date('Y-m-d H:i:s'), 'status' => 'ongoing')));
        return empty($result) ? array() : $result;
    }

    /**
     * 10天自动解冻资金
     * @return type
     */
    function getSuccessingActivity() {
        $result = $this->find('all', array('conditions' => array('real_end_time <' => date('Y-m-d H:i:s', strtotime('-10 day')), 'status' => array('fabrication'))));
        return empty($result) ? array() : $result;
    }

    public function updateStatus($id, $status) {
        $this->updateAll(array('status' => $status), array('id' => $id));
        return $this->getAffectedRows();
    }

    public function getUnpassActivity() {
        $result = $this->find('all', array('conditions' => array('real_end_time <=' => date('Y-m-d H:i:s', strtotime('3 day')), 'status' => array('ongoing'))));
        return empty($result) ? array() : $result;
    }

}

?>
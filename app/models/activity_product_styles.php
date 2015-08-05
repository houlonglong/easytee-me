<?php

/*
 * 活动产品样式
 */

class ActivityProductStyles extends AppModel {

    public $name = 'ActivityProductStyles';
    public $useDbConfig = 'write';

    //获取用户发起的活动
    function getActivitysProductStyleId($AppProductId, $AppProductStyleId) {
        $data = $this->find('first', array('conditions' => array('app_product_id' => $AppProductId, 'app_product_style_id' => $AppProductStyleId)));
        return $data;
    }

    //获取用户的一个活动
    public function getActivityId($ActivityId) {
        $result = $this->find('all', array('conditions' => array('activity_id' => $ActivityId)));
        return empty($result) ? array() : $result;
    }

    function getActivitysActivityIdAndProductStyleId($activityId, $appProductStyleId) {
        $result = $this->find('all', array('conditions' => array('activity_id' => $activityId, 'app_product_style_id' => $appProductStyleId)));
        return empty($result) ? array() : $result;
    }

    public function saveData($configuration) {
        $this->create();
        $this->save($configuration);
        return $this->getLastInsertId();
    }

    public function deleteByActivityId($activityId) {
        $this->deleteAll(array('activity_id' => $activityId));
        return $this->getAffectedRows();
    }

    public function getProductStyleByActivityId($activityId) {
        $result = $this->find('list', array('fields' => array('product_style_id'), 'conditions' => array('activity_id' => $activityId)));
        return empty($result) ? array() : $result;
    }

    public function updateData($fields, $conditions) {
        $this->updateAll($fields, $conditions);
        return $this->getAffectedRows();
    }

    public function getOneProductStyle($activityId) {
        $result = $this->find('first', array('' => array('image,sell_price'), 'conditions' => array('activity_id' => $activityId)));
        return ($result) ? $result : array();
    }

    public function getProductIdsByActivityId($activityId) {
        $result = $this->find('list', array('fields' => array('product_id'), 'conditions' => array('activity_id' => $activityId)));
        return ($result) ? $result : array();
    }

}

?>
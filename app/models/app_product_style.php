<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class AppProductStyle extends AppModel {

    public $name = 'AppProductStyle';
    public $useDbConfig = 'default';

    /**
     * 通过id获取产品样式列表
     * @param type $appid
     * @param type $ids
     * @return array
     */
    public function getAppProductStyleListByIds($appId, $ids) {
        $result = $this->find('all', array('conditions' => array('app_id' => $appId, 'enable' => 'Y', 'id' => $ids), 'order' => 'sequence,id'));
        return empty($result) ? array() : $result;
        ;
    }

    public function getAppProductStyleListByPidAndIsDefault($appId, $pid) {
        $data = $this->find('first', array('conditions' => array('app_id' => $appId, 'enable' => 'Y', 'app_product_id' => $pid, 'is_default' => 1), 'order' => 'sequence,id'));
        return $data;
    }

    /**
     * 通过产品Id获取产品样式信息
     * @param type $appId
     * @param type $pid
     * @return array
     */
    public function getAppProductStyleListByPid($appId, $pid) {
        $result = $this->find('all', array('conditions' => array('app_id' => $appId, 'enable' => 'Y', 'app_product_id' => $pid), 'order' => 'sequence,id'));
        return empty($result) ? array() : $result;
    }

    public function getAppProductStyleById($Id) {
        return $this->find('first', array('conditions' => array('id' => $Id, 'enable' => 'Y')));
    }

    public function getAppProductStyleByIds($ids) {
        return $this->find('all', array('conditions' => array('id' => $ids, 'enable' => 'Y')));
    }

    public function getAppProductStyleByProductStyleId($appId, $Id) {
        return $this->find('first', array('conditions' => array('product_style_id' => $Id, 'app_id' => $appId, 'enable' => 'Y')));
    }

}

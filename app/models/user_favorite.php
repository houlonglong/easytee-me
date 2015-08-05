<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class UserFavorite extends AppModel {

    public $name = 'UserFavorite';
    public $useDbConfig = 'write';

    public function getByActivityAndUid($activityId, $ip, $uid) {
        $result = $this->find('first', array('conditions' => array('uid' => $uid, 'activity_id' => $activityId, 'ip' => $ip)));
        return empty($result) ? array() : $result;
    }

    public function deleteLove($id) {
        $this->deleteAll(array('id' => $id));
        return $this->getAffectedRows();
    }

    public function saveData($data) {
        $this->create();
        $data = $this->save($data);
        return $this->getLastInsertId();
    }

    public function getListByActivity($id) {
        $result = $this->find('list', array('fields' => array('ip'), 'conditions' => array('activity_id' => $id, 'uid' => 0)));
        $count = $this->find('list', array('fields' => array('uid'), 'conditions' => array('activity_id' => $id, 'uid >' => 0)));
        return array('ips' => $result, 'uids'=>$count);
    }

}

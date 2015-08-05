<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class SmsTask extends AppModel {

    public $name = 'SmsTask';
    public $useDbConfig = 'write';

    function saveData($data) {
        $this->create();
        $data = $this->save($data);
        return $this->getLastInsertId();//返回刚插入表里的字段id
    }

    function getList() {
        $result = $this->find('all', array('conditions' => array('status' => 0)));
        return ($result) ? $result : array();
    }

}

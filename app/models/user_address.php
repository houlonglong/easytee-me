<?php

class UserAddress extends AppModel {

    public $name = "UserAddress";
    public $useDbConfig = "write";

    function get($id) {
        $key = "user_addresses_$id";
        $result = cache::read($key);
        if (!$result) {
            $result = $this->find('first', array('conditions' => array('id' => $id)));
            cache::write($key, $result);
        }
        return $result;
    }

    function getByUserId($userId) {
        $result = $this->find('all', array('conditions' => array('uid' => $userId), 'order' => 'id desc'));
        return empty($result) ? array() : $result;
    }

    function deleteAddress($Id) {
        $conditions = array('id' => $Id);
        $this->deleteAll($conditions, false);
        cache::clear();
        return $this->getAffectedRows();
    }

    function saveAddress($data) {
        $this->create();
        $data = $this->save($data);
        $data['UserAddress']['id'] = $this->getLastInsertId();
        return $data; //返回刚插入表里的字段id
    }

    function updateAddress($data, $id) {
        $this->id = $id;
        $data = $this->save($data);
        return $this->getAffectedRows();
    }

    function addressExists($hash) {
        $addressInfo = $this->find('first', array('conditions' => array('hash' => $hash)));
        return $addressInfo;
    }

}

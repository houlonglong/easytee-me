<?php

class OrderAttribute extends AppModel {

    public $name = 'OrderAttribute';
    public $useDbConfig = 'write';

    function get($id) {
        $key = 'orders_id_' . $id;
        $data = cache::read($key);
        if (!$data) {
            $data = $this->find('first', array('conditions' => array('id' => $id)));
            cache::write($key, $data);
        }
        return $data;
    }

    function add($info) {
        $this->create();
        $this->save($info);
        return $this->getLastInsertId();
    }
}

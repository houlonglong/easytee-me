<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class OrderExpress extends AppModel {

    public $name = 'OrderExpress';
    public $useDbConfig = 'write';

    public function getByOrderId($id) {
        $key = 'order_express_id_' . $id;
        $data = cache::read($key);
        if (!$data) {
            $data = $this->find('first', array('conditions' => array('order_id' => $id)));
            cache::write($key, $data);
        }
        return $data;
    }

}

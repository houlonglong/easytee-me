<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class Express extends AppModel {

    public $name = 'Express';
    public $useDbConfig = 'write';

    public function get($id) {
        $key = 'express_id_' . $id;
        $data = cache::read($key);
        if (!$data) {
            $data = $this->find('first', array('conditions' => array('id' => $id)));
            cache::write($key, $data);
        }
        return $data;
    }

}

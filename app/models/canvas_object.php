<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class CanvasObject extends AppModel {

    public $name = 'CanvasObject';
    public $useDbConfig = 'write';

    public function saveData($configuration) {
        $this->useDbConfig = 'write';
        $this->create();
        $this->save($configuration);
        return $this->getLastInsertId();exit;
    }

    public function getCanvasObjectByCanvasIds($appid, $ids) {
        $result = $this->find('all', array('conditions' => array('app_id' => $appid, 'canvas_id' => $ids)));
        return empty($result) ? array() : $result;
    }

    public function deleteByCanvasId($ids) {
        $this->deleteAll(array('canvas_id' => $ids));
        return $this->getAffectedRows();
    }

}

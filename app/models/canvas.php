<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Canvas extends AppModel {

    public $name = 'Canvas';
    public $useDbConfig = 'write';

    /**
     * 获取用户通过$token
     * @param type $appid
     * @return array
     */
    public function getCanvasByid($appId, $id) {
        $key = 'canvas_id_' . $id;
        $cacheData = cache::read($key);
        if ($cacheData) {
            return $cacheData;
        }
        $data = $this->find('first', array('conditions' => array('app_id' => $appId, 'id' => $id)));
        cache::write($key, $data);
        return $data;
    }

    public function saveData($configuration) {
        $this->useDbConfig = 'write';
        $this->create();
        $this->save($configuration);
        return $this->getLastInsertId();
    }

    public function getCanvasByDesignId($id) {
        $result = $this->find('all', array('conditions' => array('design_id' => $id), 'order' => 'id'));
        return empty($result) ? array() : $result;
    }
    
     public function getIdsByDesignId($appId, $id) {
        $result = $this->find('list', array('fields'=>array('id'),'conditions' => array('app_id' => $appId, 'design_id' => $id), 'order' => 'id'));
        return empty($result) ? array() : $result;
    }

}

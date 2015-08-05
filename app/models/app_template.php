<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class AppTemplate extends AppModel {

    public $name = 'AppTemplate';
    public $useDbConfig = 'default';

    /**
     * 获取用户通过$token
     * @param type $appid
     * @return array
     */
    public function getAppTemplateByid($id){
        $key = 'app_templates_id_'.$id;
        $cacheData = cache::read($key);
        if($cacheData){
            return $cacheData;
        }
        $result = $this->find('first', array('conditions' => array('id' => $id), 'order' => 'id'));
        cache::write($key,$cacheData);
        return $cacheData;
    }
    
     public function saveData($configuration){
         $this->useDbConfig = 'write';
         $this->create();
         $this->save($configuration);
         return $this->getLastInsertId();
    }
}

<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class DesignProductMap extends AppModel {

    public $name = 'DesignProductMap';
    public $useDbConfig = 'default';

    public function getMapFromDesignProductMapByDesignId($appId, $did) {
        $result = $this->find('all', array('conditions' => array('app_id' => $appId,'design_id'=>$did)));
        return empty($result) ? array() : $result;
    }
    
    public function getMapByPidAndPsIdAndDesignId($appId,$pid,$psid,$did){
        $result = $this->find('all', array('conditions' => array('app_id' => $appId,'design_id'=>$did,'product_id'=>$pid,'product_style_id'=>$psid)));
        return empty($result) ? array() : $result;
    }
    
    public function saveData($configuration){
         $this->useDbConfig = 'write';
         $this->create();
         $this->save($configuration);
    }

}

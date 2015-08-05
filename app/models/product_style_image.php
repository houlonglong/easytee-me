<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class ProductStyleImage extends AppModel {

    public $name = 'ProductStyleImage';
    public $useDbConfig = 'default';

     //获取款式的图片
    public function getProductStyleImageByStyleId($appId,$psids){
        if(!is_array($psids)){
            $psids = array($psids);
        }
        $result = $this->find('all', array('conditions' => array('app_id' => $appId,'product_style_id'=>$psids),'order'=>'sequence'));
        return empty($result)?array():$result;
    }
    
     public function getProductStyleImageByStyleIdAndName($appId,$psid){
        $result = $this->find('first', array('conditions' => array('app_id' => $appId,'product_style_id'=>$psid,'side'=>'front'),'order'=>'sequence'));
        return empty($result)?array():$result;
    }
    
     public function saveData($configuration) {
        $this->useDbConfig = 'write';
        $this->create();
        $this->save($configuration);
        return $this->getLastInsertId();
    }
      public function get(){
        return $this->find('all');  
    }

}

<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class ProductStyleImageRegion extends AppModel {

    public $name = 'ProductStyleImageRegion';
    public $useDbConfig = 'default';
    /**
     * 获取款式对应图片的设计区域
     * @param type $appId
     * @return array
     */
    public function getProductStyleImageRegionByIds($appId,$ids){
        if (!is_array($ids)) {
            $ids = array($ids);
        }
        $result = $this->find('all', array('conditions' => array('app_id' => $appId,'product_style_image_id'=>$ids),'order'=>'sequence'));
        return empty($result)?array():$result;
    }

    public function getProductStyleImageRegionByStyleId($appId,$id){
        $result = $this->find('all', array('conditions' => array('app_id' => $appId,'product_style_id'=>$id),'order'=>'sequence'));
        return empty($result)?array():$result;
    }
}

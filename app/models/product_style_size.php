<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class ProductStyleSize extends AppModel {

    public $name = 'ProductStyleSize';
    #public $useDbConfig = 'default';
    public $useDbConfig = 'write';
    /**
     * 获取款式的尺码，100件以下库存的不显示
     * @param type $appid
     * @param type $ids
     * @return array
     */
    public function getProductStyleSizeByPsids($appId, $ids) {
        if (!is_array($ids)) {
            $ids = array($ids);
        }
        return $this->find('all', array('conditions' => array('app_id' => $appId, 'inventory <' => 100, 'product_style_id' => $ids, 'enable' => 'Y')));
    }

    public function getProductStyleSizeById($appId, $productId, $enable) {
        return $this->find('all', array('conditions' => array('app_id' => $appId, 'product_id' => $productId, 'enable' => 'Y')));
    }
    
    public function getSizeByProductStyleIdAndSize($psId,$size){
        return $this->find('first', array('conditions'=>array('product_style_id'=>$psId,'size'=>$size, 'enable'=> 'Y')));
    }
    public function getProductStyleSizeByProductStyleId($productStyleId){
        return $this->find('all', array('conditions'=>array('product_style_id'=>$productStyleId, 'enable'=> 'Y','inventory'>0)));
    }
    //处理库存
    function handle_inventory_by_id($id,$nums,$type = "-"){
        $id = intval($id);
        $nums = intval($nums);
        $this->updateAll(array(
            "inventory"=>"inventory $type $nums"
        ),array(
            "id"=>$id
        ));
    }
}

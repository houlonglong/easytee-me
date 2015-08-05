<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class ProductSize extends AppModel {

    public $name = 'ProductSize';
    public $useDbConfig = 'default';

    /**
     * 获取产品样式列表
     * @param type $appId
     * @return array
     */
    public function getProductStyleList() {
        $result = $this->find('all', array('conditions' => array('enable' => 'Y'), 'order' => 'sequence,id'));
        return empty($result) ? array() : $result;
    }

    public function getByProductId($productId) {
        $result = $this->find('all', array('conditions' => array('product_id' => $productId)));
        return empty($result) ? array() : $result;
    }

}

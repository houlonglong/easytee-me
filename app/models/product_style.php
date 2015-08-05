<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class ProductStyle extends AppModel {

    public $name = 'ProductStyle';
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

    /**
     * 通过id获取产品样式列表
     * @param type $appid
     * @param type $ids
     * @return array
     */
    public function getProductStyleListByIds($ids) {
        $result = $this->find('all', array('conditions' => array('id' => $ids, 'enable' => 'Y')));
        return empty($result) ? array() : $result;
    }

    /**
     * 根据产品的id获取样式列表
     * @param type $appId
     * @return array
     */
    public function getProductStyleProductByIds($appId, $productId) {
        return $productStyle = $this->find('all', array('conditions' => array('app_id' => $appId, 'product_id' => $productId, 'enable' => 'Y')));
    }

    public function getProductByIdEnable($id) {
        $key = 'product_style_id_' . $id;
        $result = cache::read($key);
        if (!$result) {
            $result = $this->find('first', array('conditions' => array('id' => $id, 'enable' => 'Y')));
            cache::write($key, $result);
        }
        return $result;
    }

}

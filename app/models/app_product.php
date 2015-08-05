<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class AppProduct extends AppModel {

    public $name = 'AppProduct';
    public $useDbConfig = 'default';

    /**
     * 根据appid获取产品列表
     * @param type $appid
     * @return array
     */
    public function getAppProductByAppId($appid) {
        //获取产品列表
        $result = $this->find('all', array('conditions' => array('app_id' => $appid, 'enable' => 'Y'), 'order' => 'sequence'));
        return empty($result) ? array() : $result;
    }

    /**
     * 根据id获取产品
     * @param type $appid,$id
     * @return array
     */
    public function getAppProductById($appid, $id) {
        $key = 'app_products_id_' . $id;
        $cacheData = cache::read($key);
        if ($cacheData) {
            return $cacheData;
        }
        $data = $this->find('first', array('conditions' => array('app_id' => $appid, 'id' => $id, 'enable' => 'Y')));
        cache::write($key, $data);
        return $data;
    }

    /**
     * 根据ids获取app product
     * @param type $appid
     * @param type $ids array
     * @return array
     */
    public function getAppProductByIds($appId, $ids) {
        $result = $this->find('all', array('conditions' => array('app_id' => $appId, 'id' => $ids, 'enable' => 'Y')));
        return empty($result) ? array() : $result;
    }
    
     public function getByProductId($appid, $productId) {
        $data = $this->find('first', array('conditions' => array('app_id' => $appid, 'product_id' => $productId, 'enable' => 'Y')));
        return $data;
    }

}

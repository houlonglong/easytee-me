<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class AppProductCategory extends AppModel {

    public $name = 'AppProductCategory';
    public $useDbConfig = 'default';

    /**
     * 根据appid获取产品列表
     * @param type $appid
     * @return array
     */
    public function getAppProductCategoryByAppId($appid) {
        //获取产品列表
        $result = $this->find('all', array('conditions' => array('app_id' => $appid, 'enable' => 'Y'), 'order' => 'parent_id,sequence,id'));
        return empty($result) ? array() : $result;
    }

    /**
     * 根据id获取产品
     * @param type $appid,$id
     * @return array
     */
    public function getAppProductCategoryById($appid, $id) {
        $key = "app_product_categories_$id";
        $cacheData = cache::read($key);
        if ($cacheData) {
            return $cacheData;
        }
        $data = $this->find('first', array('conditions' => array('app_id' => $appid, 'id' => $id, 'enable' => 'Y'), 'order' => 'parent_id,sequence,id'));
        cache::write($key, $data);
        return $data;
    }

}

<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class AppProductCategoryMap extends AppModel {

    public $name = 'AppProductCategoryMap';
    public $useDbConfig = 'default';

    /**
     * 根据id获取产品
     * @param type $appid,$id
     * @return array
     */
    public function getAppProductCategoryMapById($appid, $id) {
        $key = 'app_product_category_maps_id_' . $id;
        $cacheData = cache::read($key);
        if ($cacheData) {
            return $cacheData;
        }
        $data = $this->find('first', array('conditions' => array('id' => $id, 'app_id' => $appid)));
        cache::write($key, $data);
        return $data;
    }

    /**
     * 获取产品ID通过分类ID
     * @param type $appid
     * @param type $id
     * @return type
     */
    public function getAppProductIdFromProductCategoryMapByCategoryId($appid, $id) {
        $result = $this->find('all', array('fields' => array('app_product_id'),
            'conditions' => array('app_id' => $appid, 'app_product_category_id' => $id)));
        $ids = array();
        if($result) {
            foreach ($result as $value) {
                $ids[] = $value['AppProductCategoryMap']['app_product_id'];
            }
        }
        return $ids;
    }
}

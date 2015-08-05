<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class ColorCategory extends AppModel {

    public $name = 'ColorCategory';
    public $useDbConfig = 'default';

    /**
     * 根据appId获取颜色分类
     * @param type $appID
     * @return array
     */
    public function getColorCategoryByAppID($appId) {
        //获取颜色分类
        $result = $this->find('all', array('conditions' => array('app_id ' => array($appId, 0)), 'order' => 'app_id,sequence,id'));
        return empty($result) ? array() : $result;
    }

    public function getColorCategoryByID($appId, $id) {
        $key = 'color_categories_id' . $id;
        $data = cache::read($key);
        if (!$data) {
            $data = $this->find('first', array('conditions' => array('app_id ' => array($appId, 0), 'id' => $id), 'order' => 'app_id,sequence,id'));
            cache::write($key, $data);
        }
        return $data;
    }

}

<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class ColorCategoryMap extends AppModel {

    public $name = 'ColorCategoryMap';
    public $useDbConfig = 'default';

    /**
     * 根据color id 获取分类ID
     * @param type $appId
     * @param type $cid
     * @return type
     */
    public function getColorCategoryMapByColorID($appId, $cid) {
        $result = $this->find('all', array('conditions' => array('app_id' => $appId, 'colors_id' => $cid), 'order' => 'id'));
        return empty($result) ? array() : $result;
    }

    public function getColorIdFromColorCategoryMapByColorCategoryID($appId, $ccid) {
        $result = $this->find('all', array('fields' => array('colors_id'), 'conditions' => array('app_id' => $appId, 'colors_category_id' => $ccid), 'order' => 'id'));

        $ids = array();
        if ($result) {
            foreach ($result as $arr) {
                $ids[] = $arr['ColorCategoryMap']['colors_id'];
            }
        }
        return $ids;
    }

}

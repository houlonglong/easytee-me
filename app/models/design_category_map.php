<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class DesignCategoryMap extends AppModel {

    public $name = 'DesignCategoryMap';
    public $useDbConfig = 'default';

    public function getDesignIdFromDesignCategoryMapByCategoryId($appId, $cid) {
        $result = $this->find('all', array('fields' => array('design_id'), 'conditions' => array('app_id' => $appId, 'design_category_id' => $cid), 'order' => 'id'));
        $ids = array();
        if($result){
            foreach ($result as $value){
                $ids[] = $value['DesignCategoryMap']['design_id'];
            }  
        }
        return $ids;
    }

    public function getCategoryIdFromDesignCategoryMapByDesignId($appId, $aid) {
        $key = 'design_category_maps_id_' . $aid;
        $data = cache::read($key);
        if (!$data) {
            $data = $this->find('first', array('fields' => array('design_category_id'), 'conditions' => array('app_id' => $appId, 'design_id' => $aid)));
            cache::write($key, $data);
        }
        return $data['DesignCategoryMap'];
    }

}

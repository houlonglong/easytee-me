<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class DesignCategory extends AppModel {

    public $name = 'DesignCategory';
    public $useDbConfig = 'default';


    public function getDesignCategoryByIDParentId($appId, $pid) {
        $result = $this->find('all', array('conditions' => array('app_id' => $appId, 'parent_id' => $pid), 'order' => 'id'));
        return empty($result) ? array() : $result;
    }

    public function getChildrenDesignCategoryById($appId, $pid) {
        $result = $this->find('all', array(
            'conditions' => array(
                'app_id' => $appId,
                'or' => array(
                    'parent_id' => $pid,
                    'id' => $pid,
                )
            ), 'order' => 'id'));
        return empty($result) ? array() : $result;
    }

    public function getDesignCategoryById($appId, $id) {
        $key = 'design_categories_id_' . $id;
        $data = cache::read($key);
        if (!$data) {
            $data = $this->find('first', array('conditions' => array('app_id' => $appId, 'id' => $id)));
            cache::write($key, $data);
        }
        return $data;
    }

}

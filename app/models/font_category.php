<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class FontCategory extends AppModel {

    public $name = 'FontCategory';
    public $useDbConfig = 'default';

    /**
     * 根据appId获取字体分类
     * @param type $appID
     * @return array
     */
    public function getFontCategoryByAppId($appID) {
        $result = $this->find('all', array('conditions' => array('app_id' => $appID), array('order' => 'sequence,id')));
        return empty($result) ? array() : $result;
    }

    public function getFontCategoryByParentId($appID, $parentID = 0) {
        $result = $this->find('all', array('conditions' => array('app_id' => $appID, 'parent_id' => $parentID), array('order' => 'sequence,id')));
        return empty($result) ? array() : $result;
    }

    /**
     * 通过id获取字体分类
     * @param type $appID
     * @param type $ids int or array
     * @return array
     * 
     * 
     */
    public function getFontCategoryById($appID, $ids) {
        if (!is_array($ids)) {
            $ids = array($ids);
        }
        $result = $this->find('all', array('conditions' => array('app_id' => $appID, 'id' => $ids), array('order' => 'sequence,id')));
        return empty($result) ? array() : $result;
    }

}

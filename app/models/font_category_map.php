<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class FontCategoryMap extends AppModel {

    public $name = 'FontCategoryMap';
    public $useDbConfig = 'default';

    public function getFontCategoryMapByCategoryId($appID, $cid) {
        $result = $this->find('all', array('conditions' => array('app_id' => $appID, 'font_category_id' => $cid)));
        return empty($result) ? array() : $result;
    }

    /**
     * 通过id获取字体分类
     * @param type $appID
     * @param type $ids int or array
     * @return array
     */
    public function getFontCategoryMapByFontId($appID, $fid) {
        $result = $this->find('all', array('conditions' => array('app_id' => $appID, 'font_id' => $fid)));
        return empty($result) ? array() : $result;
    }

    /**
     * 根据分类ID获取字体ID
     * @param type $appID
     * @param type $fids
     * @return type
     */
    public function getFontIdByFromFontCategoryMapByFontCategoryId($appID, $fcids) {
        $result = $this->find('all', array('fields' => array('font_id'), 'conditions' => array('app_id' => $appID, 'font_category_id' => $fcids)));
        $ids = array();
        if ($result) {
            foreach ($result as $value) {
                $ids[] = $value['FontCategoryMap']['font_id'];
            }
        }
        return $ids;
    }

    public function getFontCategoryMapByFontIDAndCategoryId($appID, $fontId, $fcId) {
        $result = $this->find('all', array('fields' => array('font_id'), 'conditions' => array('app_id' => $appID, 'font_category_id' => $fcId, 'font_id' => $fontId)));
        return empty($result) ? array() : $result['FontCategoryMap'];
    }

    public function add($config) {
        $this->create();
        $this->save($config);
        return $this->getLastInsertID();
    }

}

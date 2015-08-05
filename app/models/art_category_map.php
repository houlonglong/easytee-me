<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class ArtCategoryMap extends AppModel {

    public $name = 'ArtCategoryMap';
    public $useDbConfig = 'default';

    public function getArtIdFromArtCategoryMapByCategoryId($appId, $cid) {
        $result = $this->find('all', array('fields' => array('art_id'), 'conditions' => array('app_id' => $appId, 'art_category_id' => $cid), 'order' => 'id'));
        $ids = array();
        if($result){
            foreach($result as $value){
                $ids[] = $value['ArtCategoryMap']['art_id'];
            }
        }
        return $ids;
    }

    public function getCategoryIdFromArtCategoryMapByAId($appId, $aid) {
        $result = $this->find('first', array('fields' => array('art_category_id'), 'conditions' => array('app_id' => $appId, 'art_id' => $aid)));
        return isset($result['ArtCategoryMap']['art_category_id'])?$result['ArtCategoryMap']['art_category_id']:FALSE;
    }

}

<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class ArtCategory extends AppModel {

    public $name = 'ArtCategory';
    public $useDbConfig = 'default';

    /**
     * 查询当前id下的所有子节点，包括当前Id
     * @param type $appId
     * @param type $id
     * @return type
     */
    public function getArtCategoryByIDOrParentId($id) {
        $result = $this->find('all', array(
            'conditions' => array(
                'or' => array(
                    'parent_id' => $id,
                    'id' => $id,
                )
            ), 'order' => 'sort_order'));
        return empty($result) ? array() : $result;
    }

    public function getArtCategoryByIDParentId($pid) {
        $result = $this->find('all', array('conditions' => array('parent_id'=>$pid), 'order' => 'sort_order'));
        return empty($result)?array():$result;
    }

    public function getArtCategoryById($id) {
        $key = 'art_categories_id_'.$id;
        $cacheData = cache::read($key);
        if($cacheData){
            return $cacheData;
        }
        $data = $this->find('first', array('conditions' => array('id'=>$id), 'order' => 'sort_order'));
        cache::write($key,$data);
        return $data;
    }
}

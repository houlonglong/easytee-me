<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class Font extends AppModel {

    public $name = 'Font';
    public $useDbConfig = 'write';

    /**
     * 通过id获取字体列表
     * @param type $appID
     * @param type $ids int or array
     * @return array
     */
    public function getFontById($appID, $ids) {
        //获取颜色分类
        if (!is_array($ids)) {
            $ids = array($ids);
        }
        $result = $this->find('all', array('conditions' => array('app_id' => array($appID, 0), 'id' => $ids), 'order' => 'sequence,id'));
        return empty($result) ? array() : $result;
    }

    /**
     * 添加字体
     * @param type $config
     * @return type
     */
    public function add($config) {
        $this->create();
        $this->save($config);
        return $this->getLastInsertID();
    }

    public function get($id) {
        $result = $this->find('first', array('conditions' => array('id' => $id)));
        return empty($result) ? array() : $result;
    }

}

<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class Color extends AppModel {

    public $name = 'Color';
    public $useDbConfig = 'default';

    /**
     * 根据appId获取颜色
     * @param type $appID
     * @return array
     */
    public function getColorByAppID($appId) {
        //获取颜色分类
        $result = $this->find('all', array('conditions' => array('app_id' => $appId), 'order' => 'sequence,id'));
        return empty($result) ? array() : $result;
    }

    /**
     * 根据colorId获取颜色
     * @param type $appID
     * @return array
     */
    public function getColorByID($colorId) {
        $result = $this->find('all', array('conditions' => array('id' => $colorId), 'order' => 'sequence,id'));
        return empty($result) ? array() : $result;
    }

}

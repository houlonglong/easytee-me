<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class AppDesign extends AppModel {

    public $name = 'AppDesign';
    public $useDbConfig = 'write';

    public function getAppDesignByOpenId($appId,$uid){
        $result = $this->find('all', array('conditions' => array('app_id' => $appId,'uid' => $uid),'order'=>'id'));
        return empty($result)?array():$result;
    }
}

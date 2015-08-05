<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class AppArt extends AppModel {

    public $name = 'AppArt';
    public $useDbConfig = 'write';

    public function getAppArtByUserId($appId,$userId){
        $result = $this->find('all', array('conditions' => array('app_id' => $appId,'user_id'=>$userId)));
        return empty($result)?array():$result;
    }
    
    public function add($configuration){
         $this->create();
         $this->save($configuration);
         return $this->getLastInsertId();
    }
}

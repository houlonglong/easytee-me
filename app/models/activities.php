<?php

class Activities extends AppModel {

    public $name = 'Activities';
    public $useDbConfig = 'write';

    //获取用户发起的活动
    function getActivitys($uid) {
        return $this->find('first', array('conditions' => array('uid' => $uid)));
    }

    public function getActivityById($id,$appId) {
        $key = 'activitite_id_'.$id;
        $cacheData = cache::read($key);
        if($cacheData){
            return $cacheData;
        }
        $data = $this->find('first', array('conditions' => array('id' => $id,'app_id'=>$appId)));
        cache::write($key,$data);
        return $data;
    }

}

?>
<?php

class ActivityProduce extends AppModel {

    public $name = 'ActivityProduce';
    public $useDbConfig = 'write';

    public function getActivityById($id) {
        $key = 'activitite_id_' . $id;
        $cacheData = cache::read($key);
        if ($cacheData) {
            return $cacheData;
        }
        $data = $this->find('first', array('conditions' => array('id' => $id)));
        cache::write($key, $data);
        return $data;
    }

    public function getActivityByActivityId($id) {
        $data = $this->find('first', array('conditions' => array('activity_id' => $id)));
        return $data;
    }

    public function saveData($configuration) {
        $this->create();
        $this->save($configuration);
        return $this->getLastInsertId();
    }

    public function getActivity($id) {
        $result = $this->find('all', array('conditions' => array('id' => $id)));
        return empty($result) ? array() : $result;
    }

}

?>
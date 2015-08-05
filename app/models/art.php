<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class Art extends AppModel {

    public $name = 'Art';
    public $useDbConfig = 'default';

    public function getArtByIds($ids) {

        $result = $this->find('all', array('conditions' => array('id' => $ids)));

        return empty($result) ? array() : $result;
    }

    /**
     * 根据appId获取素材
     * @param type $appID
     * @return array
     */
    public function getArtByAppIDRand($limit = 30) {
        $result = $this->find('all', array('conditions' => array('isdown' => 1), 'order' => 'rand()', 'limit' => $limit));
        return empty($result) ? array() : $result;
    }

    public function getArt() {
        $result = $this->find('all', array('order' => 'id'));
        return empty($result) ? array() : $result;
    }

    public function saveData($configuration) {
        $this->useDbConfig = 'write';
        $this->create();
        $this->save($configuration);
        return $this->getLastInsertId();
    }

    public function getArtByUid($uid, $offset, $number) {
        if (!empty($number)) {
            $data = $this->find('all', array('conditions' => array( 'uid' => $uid), 'limit' => $offset . ',' . $number,'order'=>'id desc'));
            $count = $this->find('count', array('conditions' => array( 'uid' => $uid)));
            $data['count'] = $count;
            return $data;
        }
        $data = $this->find('all', array('conditions' => array('app_id ' => $appId, 'uid' => $uid)));
        $data['count'] = count($data);
        return $data;
    }

}

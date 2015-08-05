<?php

/**
 * Created by PhpStorm.
 * User: mac
 * Date: 15/4/30
 * Time: 16:27
 */
class Design extends AppModel {

    public $name = 'Design';
    public $useDbConfig = 'write';

    public function getDesignByUid($appId, $uid, $offset, $number) {
        if (!empty($number)) {
            $data = $this->find('all', array('conditions' => array('app_id ' => $appId, 'uid' => $uid), 'limit' => $offset . ',' . $number, 'order' => 'id desc'));
            $count = $this->find('count', array('conditions' => array('app_id ' => $appId, 'uid' => $uid)));
            $data['count'] = $count;
            return $data;
        }
        $data = $this->find('all', array('conditions' => array('app_id ' => $appId, 'uid' => $uid)));
        $data['count'] = count($data);
        return $data;
    }

    public function get($id) {
        $key = 'design_id_' . $id;
        $result = cache::read($key);
        if (!$result) {
            $result = $this->find('first', array('conditions' => array('id ' => $id)));
            cache::write($key, $result);
        }
        return $result;
    }

    /**
     * 根据appId获取素材
     * @param type $appID
     * @return array
     */
    public function getDesignByAppIDRand($appId, $limit) {
        //获取素材分类
        $result = $this->find('all', array('conditions' => array('app_id' => $appId), 'order' => 'rand()', 'limit' => $limit));
        return $result;
    }

    public function saveData($configuration) {
        $this->useDbConfig = 'write';
        if (!isset($configuration['id'])) {
            $this->create();
        }
        $this->save($configuration);
        if (!isset($configuration['id'])) {
            $configuration['id'] = $this->getLastInsertId();
        }
        return $configuration;
    }

    public function getDesignByisUpdate($isUpdate) {
        $result = $this->find('all', array('conditions' => array('is_update' => $isUpdate, 'not' => array('design' => '')), 'order' => 'id'));
        return empty($result) ? array() : $result;
    }

    public function getDesignByIds($appId, $appUid, $ids) {
//        if ($appUid === 0) {
//            $result = $this->find('all', array('conditions' => array('app_id' => $appId, 'id' => $ids, 'is_public' => 1), 'order' => 'id'));
//        } else {
        $result = $this->find('all', array('conditions' => array('app_id' => $appId, 'id' => $ids, 'uid' => $appUid), 'order' => 'id'));
//        }
        return empty($result) ? array() : $result;
    }

    public function deleteDesign($id, $uid) {
        $this->deleteAll(array('id' => $id, 'uid' => $uid));
        cache::delete('design_id_' . $id);
        return $this->getAffectedRows();
    }

}

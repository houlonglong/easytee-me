<?php

class UserMoneyFlow extends AppModel {

    public $name = 'UserMoneyFlow';
    public $useDbConfig = 'write';

    function get($id) {
        return $this->find('first', array('conditions' => array('id' => $id)));
    }

    function add($info) {
        $this->create();

        $info['create_time'] = date('Y-m-d H:i:s');

        $this->save($info);
        return $this->getLastInsertId();
    }

    function addAll($info) {
        $this->create();

        $info['create_time'] = date('Y-m-d H:i:s');

        $this->saveAll($info);
        return $this->getLastInsertId();
    }

    //`user_id`,`type`,`design_id`, `order_id`, `create_time`
    function getAllConditions($info) {
        $d['user_id'] = $info['user_id'];

        if (isset($info['type']) && $info['type'] != 0) {
            $d['type'] = $info['type'];
        } else {
            $d['type'] = array(-1, 1);
        }

        if (isset($info['content'])) {
            $d['content like'] = "%" . $info['content'] . "%";
        }

        $d['create_time >='] = date('Y-m-d 00:00:00', strtotime($info['time_from']));
        $d['create_time <='] = date('Y-m-d 23:59:59', strtotime($info['time_to']));

        return array(
            'limit' => 10,
            'conditions' => $d,
            'order' => array('id' => 'desc'),
            'recursive' => 0
        );
    }

    function getMoneyFlowByUid($info, $offset = 0, $limit = 0) {
        if ($limit) {
            $result = $this->find('all', array('conditions' => $info, 'limit' => $offset . ',' . $limit));
            $count = $this->find('count', array('conditions' => $info));
            $result['count'] = $count;
        } else {
            $result = $this->find('all', array('conditions' => $info));
        }
        return empty($result) ? array() : $result;
    }

}

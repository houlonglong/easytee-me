<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Application extends AppModel {

    public $name = 'Application';
    public $useDbConfig = 'write';

    public function getApplicationByAppKeyAndAppSecret($appKey, $appSecret) {
        $key = "application_appkey_" . $appKey . '_appsecret_' . $appSecret;
        $result = cache::read($key);
        if (!$result) {
            $result = $this->find('first', array('conditions' => array('app_key' => $appKey, 'app_secret' => $appSecret)));
            cache::write($key, $result);
        }
        return $result;
    }

    public function getApplicationByAppKey($appKey) {
        $key = "application_appkey_" . $appKey;
        $result = cache::read($key);
        if (!$result) {
            $result = $this->find('first', array('conditions' => array('app_key' => $appKey)));
            cache::write($key, $result);
        }
        return $result;
    }

    public function saveData($configuration) {
        $this->useDbConfig = 'write';
        $this->create();
        $this->save($configuration);
        return $this->getLastInsertId();
    }

    public function get($id) {
        cache::clear();
        $key = "application_id_$id";
        $result = cache::read($key);
        if (!$result) {
            $result = $this->find('first', array('conditions' => array('id' => $id)));
            cache::write($key, $result);
        }
        return $result;
    }

    /**
     * 更新第三方用户的余额
     * @param type $id
     * @param type $momey
     */
    public function updateMoney($id, $money) {
        $this->updateAll(array('money' => '`money` + ' . $money), array('id' => $id));
        return $this->getAffectedRows();
    }

}

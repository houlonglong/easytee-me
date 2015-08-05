<?php

App::import("Component", "Session");

class User extends AppModel {

    public $name = 'User';
    public $useDbConfig = 'write';
    public $hasMany = array(
        'UserAuth' => array(
            'className' => 'UserAuth',
            "foreignKey" => 'uid',
            'conditions' => '',
            'order' => '',
            'dependent' => true
        )
    );
    public $hasOne = array(
        'UserAttribute' => array(
            'className' => 'UserAttribute',
            "foreignKey" => 'uid',
            'conditions' => '',
            'dependent' => true
        )
    );
    //积分等级
    public $point = array(1 => 200, 1000, 4000, 10000, 30000, 80000, 200000, 500000);

    function __construct() {
        parent::__construct();
        $this->Session = new SessionComponent();
    }

    function get($id) {
        return $this->find('first', array('conditions' => array('User.id' => $id)));
    }

    function getAllImage($ids) {
         $result = $this->find('all', array('fields'=>'photo','conditions' => array('User.id' => $ids)));
         return empty($result)?array():$result;
    }

    function getByMobile($name) {
        return $this->find('first', array('conditions' => array('mobile' => $name)));
    }

    function getByMobileOrEmail($name) {
        return $this->find('first', array('conditions' => array('or' => array('mobile' => $name, 'email' => $name))));
    }

    function addUser($info) {
        $this->create();
        $now = date('Y-m-d H:i:s');

        $info['login_time'] = $now;
        $info['create_time'] = $now;

        $this->save($info);
        return $this->getLastInsertId();
    }

    function userExists($username, $password) {
        return $this->find('first', array(
                    'conditions' => array(
                        'or' => array(
                            'mobile' => $username,
                            'email' => $username,
                        ),
                        'password' => sha1($password),
                    )
                        )
        );
    }

    function updatePassword($uid, $oldPass, $newPass) {
        $this->updateAll(array('`User`.password' => '"' . sha1($newPass) . '"'), array('`User`.password' => sha1($oldPass), '`User`.id' => $uid));
        return $this->getAffectedRows();
    }

    function setPassword($newPass, $mobile) {
        $this->updateAll(array('`User`.password' => '"' . sha1($newPass) . '"'), array('or' => array('`User`.mobile' => $mobile, '`User`.email' => $mobile)));
        return $this->getAffectedRows();
    }

    function updateUser($fields, $uid) {
        $this->updateAll($fields, array('uid' => $uid));
    }
}

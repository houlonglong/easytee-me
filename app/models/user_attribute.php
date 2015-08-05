<?php

App::import("Component", "Session");

class UserAttribute extends AppModel {
    
    public $useDbConfig = 'write';
    public $name = 'UserAttribute';
    public $belongsTo = array('User' => array('className' => 'User', 'foreignKey' => 'uid'));

    function __construct() {
        parent::__construct();
        $this->Session = new SessionComponent();
    }

    function get($id) {
        return $this->find('first', array('conditions' => array('UserAttribute.id' => $id)));
    }

    function addUserAttribute($info) {
        $this->create();
        $this->save($info);
        return $this->getLastInsertId();
    }
    
    function getByUid($uid){
        return $this->find('first', array('conditions' => array('UserAttribute.uid' => $uid)));
    }

}

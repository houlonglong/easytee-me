<?php

App::import("Component", "Session");

class UserAuth extends AppModel
{

    public $name = 'UserAuth';
    var $belongsTo = array(
        'User' => array(
            'className' => 'User',
            'conditions' => '',
            'order' => '',
            'foreignKey' => 'uid',
            "exclusive"=>true
        ),
    );

    function __construct()
    {
        parent::__construct();
        $this->Session = new SessionComponent();
    }

    function get($id)
    {
        return $this->find('first', array('conditions' => array('id' => $id)));
    }

    function userExists($type, $openId)
    {
        return $this->find('first', array('conditions' => array('type' => $type, 'openid' => $openId)));
    }

}

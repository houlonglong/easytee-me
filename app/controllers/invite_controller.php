<?php

class InviteController extends AppController {

    var $uses = array('User');
    var $name = "Invite";

    function index($uid = '') {
        $page_name = "邀请朋友";
        $this->set(compact('page_name'));
    }

}

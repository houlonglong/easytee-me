<?php

class IndexesController extends AppController {

    var $name = "Indexes";
    var $uses = array('User');

    function beforeFilter() {
        parent::beforeFilter();
    }

    function index() {
        $page_name = "首页";
        $activity = $this->open->getHotActivity();
        $activity = json_decode($activity, true);
        $this->checkReturnData($activity);
        $this->set(compact('page_name', 'activity'));
    }

    function friend($id) {
        if ($id) {
            $this->Cookie->time = 3600 * 24 * 7;
            $this->Cookie->write('invite_uid', $id);
        }
        $this->redirect('/');
        exit;
    }

}

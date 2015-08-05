<?php
class AboutController extends AppController
{

    var $uses = array('User');
    var $name = "About";
    function index(){
        $page_name = "关于易衫";
        $this->set(compact('page_name'));
    }
}
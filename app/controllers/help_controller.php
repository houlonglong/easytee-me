<?php
class HelpController extends AppController
{

    var $uses = array('User');
    var $name = "Help";
    function index(){
        $page_name = "易衫学院";
        $this->set(compact('page_name'));
    }
}
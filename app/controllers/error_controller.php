<?php

/**
 * Created by PhpStorm.
 * User: yfzhu
 * Date: 15/6/16
 * Time: 20:56
 */
class ErrorController extends AppController {

    var $name = 'Error';
    var $uses = array('User');

    function beforeFilter() {
        parent::beforeFilter();
    }

    function index() {
        $page_name = "没有找到网页";
        $error_title = isset($_GET['error']) ? $_GET['error'] : '对不起，您查找的页面在火星，地球暂时无法访问！';
        $this->set(compact('page_name', 'error_title'));
        $this->viewPath = 'errors';
        $this->render('404');
    }
    function nopass(){
        $page_name = "很遗憾，该活动未通过审核";
        $this->set(compact('page_name'));


        $this->viewPath = 'errors';
        $this->render('nopass');
    }

}

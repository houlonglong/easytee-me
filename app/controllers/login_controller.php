<?php

class LoginController extends AppController {

    var $name = "Login";
    var $uses = array('User');

    function beforeFilter() {
        parent::beforeFilter();
    }

    function index() {
        if ($_POST) {
            $this->login();
            exit;
        } else {
            if(empty($_GET['relurl'])){
                $http = @$_SERVER["HTTP_REFERER"];
                if ($http && !strpos($http, '/login/') && !strpos($http, '/register/') && $http != 'http://new.easytee.me/') {
                    $relurl = $http;
                } else {
                    $relurl = "/account/";
                }
            }else{
                $relurl = $_GET['relurl'];
            }
            //$relurl = urlencode($relurl);
            $page_name = "登陆";
            $this->set(compact('page_name', 'relurl'));
        }
    }

    function login() {
        $relurl = @$_REQUEST['relurl'];
        if (!isset($_POST['username']) || !$_POST['username']) {
            $this->showMessage('请输入用户名', 'error', $relurl);
        }
        $username = $_POST['username'];
        if (!isset($_POST['password']) || !$_POST['password']) {
            $this->showMessage('请输入密码', 'error', $relurl);
        }
        $password = $_POST['password'];
        pt_log(sha1($password));
        pt_log($username);
        $user = $this->User->userExists($username, $password);
        pt_log($user);
        if ($user) {
            $this->Cookie->write('uid', $user['User']['id']);

            $this->showMessage('登陆成功', 'OK', $relurl);
        }
        $this->showMessage('用户名或密码错误！', 'error', $relurl);
    }

    function loginout() {
        $this->Cookie->delete('uid');
        $this->Session->delete('EasyTee_Token');
        $this->Session->delete('EasyTee_UserToken');

        $this->redirect('/');
        exit;
    }

    function findPassword() {
        $page_name = "找回密码";
        $this->set(compact('page_name'));
    }

    function modifyPassword() {
        if (!isset($_POST['value'])) {
            echo $this->showMessage('文本框不能为空！', 0);
            exit;
        }
        $value = $_POST['value'];
        if (isset($_POST['type'])) {
            switch ($_POST['type']) {
                case 'mobile':
                    $user = $this->User->getByMobileOrEmail($value);
                    if ($user) {
                        $this->Session->write('mobile', $value);
                        $this->sendCaptcha($value);
                        $this->showMessage('用户名正确！', 1);
                        exit;
                    }
                    echo $this->showMessage('请输入正确的账号！', 0);
                    exit;
                case 'captcha':
                    $this->Session->write('mobile-captcha', $value);
                    if ($value != $this->Session->read('captcha') && $value != '0000') {
                        echo $this->showMessage('验证码不对哦！', 0);
                        exit;
                    }
                    echo $this->showMessage('验证码正确！', 1);
                    exit;
                case 'password':
                    $mobile = $this->Session->read('mobile');
                    if (!$mobile) {
                        echo $this->showMessage('账号不能为空！', 0);
                        exit;
                    }
                    $captcha = $this->Session->read('captcha');
                    //TODO 上线的时候去掉0000
                    if ($captcha != $this->Session->read('mobile-captcha') && $this->Session->read('mobile-captcha') != '0000') {
                        echo $this->showMessage('验证码不对哦！', 0);
                        exit;
                    }
                    $ret = $this->User->setPassword(urldecode($value), $mobile);
                    if ($ret) {
                        echo $this->showMessage('密码修改成功！', 1);
                        exit;
                    }
                    echo $this->showMessage('密码修改失败！', 0);
                    exit;
            }
        }
        exit;
    }

    function setCaptcha() {
        
    }

}

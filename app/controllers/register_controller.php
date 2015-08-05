<?php

/**
 * Created by PhpStorm.
 * User: yfzhu
 * Date: 15/6/4
 * Time: 16:24
 */
class RegisterController extends AppController {

    var $name = "Register";
    var $uses = array('User', 'UserAttribute');
    var $components = array('Session');

    function beforeFilter() {
        parent::beforeFilter();
    }
    function bridge(){
        echo "bridge";exit;
    }
    function index() {

        if (isset($_SERVER["HTTP_REFERER"]) && !strpos($_SERVER["HTTP_REFERER"], '/login/') && !strpos($_SERVER["HTTP_REFERER"], '/register/') && $_SERVER["HTTP_REFERER"] != 'http://new.easytee.me/') {
            $relurl = $_SERVER["HTTP_REFERER"];
        } else {
            $relurl = "/account/";
        }

        if (!empty($_REQUEST['relurl'])) {
            $relurl = ($_REQUEST['relurl']);
        }
        if ($_POST) {
            if (isset($_REQUEST['relurl']) && !$_REQUEST['relurl']) {
                $relurl = $_REQUEST['relurl'];
            }
            if (!isset($_POST['mobile']) || !$_POST['mobile']) {
                $this->showMessage('请输入手机号码', 'error');
            }
            $mobile = $this->filterHtml($_POST['mobile']);
            if ($this->User->getByMobileOrEmail($mobile)) {
                $this->showMessage('该手机已经注册了', 'error');
            }
            if (!isset($_POST['captcha']) || !$_POST['captcha']) {
                $this->showMessage('请输入验证码', 'error');
            }
            $captcha = $_POST['captcha'];
            $code = $this->Session->read('captcha');
            //TODO 正式环境取消0000
            if ($captcha != $code && $captcha !== '0000') {
                $this->showMessage('验证码错误', 'error');
            }
            if (!isset($_POST['password']) || !$_POST['password']) {
                $this->showMessage('请输入密码', 'error');
            }
            $password = $this->filterHtml($_POST['password']);
            if (strlen($password) > 32) {
                $this->showMessage('密码长度不能超过30位！', 'error', $relurl);
            }
            if (strlen($password) < 6) {
                $this->showMessage('密码长度不能小于6位！', 'error', $relurl);
            }
            if (strstr('@', $mobile)) {
                $data['email'] = $mobile;
            } else {
                $data['mobile'] = $mobile;
                $data['mobile_checked'] = 'Y';
            }
            $data['nickname'] = $mobile;
            $data['password'] = sha1($password);
            $this->User->query('START TRANSACTION');
            $inviteId = 0;
            if ($this->Cookie->read('invite_uid')) {
                $inviteUser = $this->User->get($this->Cookie->read('invite_uid'));
                if ($inviteUser) {
                    $inviteId = $inviteUser['User']['id'];
                }
            }
            $data['invite_id'] = $inviteId;
            $uid = $this->User->addUser($data);
            if (!$uid) {
                $this->User->query('ROLLBACK');
                $this->User->query('COMMIT');
                $this->showMessage('注册失败', 'error');
            }
            $uattr['reg_ip'] = getIp();
            $uattr['uid'] = $uid;
            $uaid = $this->UserAttribute->addUserAttribute($uattr);
            if (!$uaid) {
                $this->User->query('ROLLBACK');
                $this->User->query('COMMIT');
                $this->showMessage('注册失败', 'error');
            }
            $this->Session->delete('sendCaptchaTime');
            $this->Cookie->write('uid', $uid);
            $this->User->query('COMMIT');
            $this->Cookie->delete('invite_uid');
            $this->showMessage('注册成功', 'OK', $relurl);
        }

        $page_name = "免费注册";
        $this->set(compact('page_name', 'relurl'));
    }

    /**
     * 获取验证码
     * @param type $recipient 手机号码
     */
    function getCode($recipient) {
        if ($this->userId > 0) {
            $this->showMessage('您已登录', 'error');
        }
        // 判断当前号码是手机还是邮箱
        if ($this->User->getByMobileOrEmail($recipient)) {
            $this->showMessage('您已经注册过', 'error');
        }
        $this->sendCaptcha($recipient);
    }

}

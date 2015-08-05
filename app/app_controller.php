<?php
require_once APP . '/libs/openEditComment.php';
class AppController extends Controller {

    public $components = array('Cookie', 'Session');

    function beforeFilter() {
        $this->Cookie->name = 'USER';
        $this->Cookie->time = 3600 * 24 * 30;
        // $this->Cookie->path = '/';
        $this->Cookie->domain = env('HTTP_BASE');
        $this->Cookie->key = 'ABCD-nDpC-78L5-hZXf';
        $this->userId = @$this->Cookie->read('uid');
        require_once(APP . "/libs/open_easytee/openEdit.php");
        $this->open = new openEdit(array(
            "key" => EASYTEE_APPKEY,
            "secret" => EASYTEE_APPSECRETKEY,
            "api" => EASYTEE_API,
            "dataType" => 'json',
        ));
        $this->userToken = '';
        if ($this->userId > 0) {
            $this->loadModel('User');
            $user = $this->User->get($this->userId);
            $user = $user['User'];
            $this->user = $user;
            $userPhoto = "/resources/public/image/no-photo.png";
            //pt_log($user);
            if (!$user) {
                @$this->Cookie->delete('uid');
            } else {
                $this->userToken = $this->Session->read('EasyTee_UserToken');
                if (!$this->userToken) {
                    $params['uid'] = $this->userId;
                    $params['nickname'] = $user['nickname'];
                    $params['mobile'] = $user['mobile'];
                    $this->userToken = $this->open->getUserToken($params);
                    $this->Session->write('EasyTee_UserToken', $this->userToken);
                }
                if ($user['photo']) {
                    $userPhoto = $user['photo'];
                }
            }
            $money = $this->open->getUser($this->userToken);
            $money = json_decode($money, TRUE);
            $this->checkReturnData($money);
            $moneyAll = $money['money_all'];
            $money = $money['money'];
            $this->set('userToken', $this->userToken);
            $this->set(compact('user', 'userPhoto', 'money', 'moneyAll'));
        }
    }

    function showMessage($str, $status = 'OK', $url = '') {
        $tempArr = $str;
        if (!is_array($str)) {
            $tempArr = array('status' => $status, 'msg' => $str, 'url' => $url);
        }
        echo json_encode_cn($tempArr);
        exit;
    }

    function sendCaptcha($recipient) {
// 判断是当前号码是否已经发送过，时间间隔
        $sendCaptchaTime = $this->Session->read('sendCaptchaTime');
        if ($sendCaptchaTime && time() - $sendCaptchaTime < 60) {
            $this->showMessage('发送间隔过短', 'error');
        }
// 判断当前号码是手机还是邮箱
        if (strstr('@', $recipient)) {
            $type = 'email';
            if (!filter_var($recipient, FILTER_VALIDATE_EMAIL)) {
                $this->showMessage('请输入正确的邮箱', 'error');
            }
        } else {
            $type = 'mobile';
            if (!preg_match("/1[2345678]{1}\d{9}$/", $recipient)) {
                $this->showMessage('请输入正确的手机号', 'error');
            }
        }
// 发送验证码 
        $newCode = mt_rand(1000, 9999);
        if (sendCaptcha($this, $type, $recipient, $newCode) == true) {
            $this->Session->write('captcha', $newCode);
            $this->Session->write('sendCaptchaTime', time());
            $this->showMessage('发送成功');
        }
        $this->showMessage('发送失败', 'error');
    }

    function checkReturnData($info) {
        if (isset($info["name"]) && $info["name"] === 'error') {
            if ($info['attribute']['code'] == 'ERROR_USER_TOKEN') {
                $this->Cookie->delete('uid');
                $this->Session->delete('EasyTee_Token');
                $this->Session->delete('EasyTee_UserToken');
                $this->redirect('/login/');
                exit;
            }
            $this->redirect('/error/?error=' . urlencode($info['value']));
            exit;
        }
    }

    function ajaxCheckReturnData($info) {
        $info = json_decode($info, TRUE);
        if (isset($info["name"]) && $info["name"] === 'error') {
            return json_encode_cn(array('msg' => $info, 'status' => 0));
        }
        return json_encode_cn($info);
    }

    function printSQL() {
        $sources = ConnectionManager::sourceList();
        $logs = array();
        foreach ($sources as $source) {
            $db = &ConnectionManager::getDataSource($source);
            if (!$db->isInterfaceSupported('getLog'))
                continue;
            $logs[$source] = $db->getLog();
        }
        return $logs;
    }

    function alertMessage($message, $url = '') {
        header("Content-type: text/html; charset=utf-8");
        echo "<script>alert('$message'); " . (!empty($url) ? "window.location.href = '$url'; " : "window.history.back(); ") . "</script>";
        exit;
    }

    /**
     * 筛选所有的html
     * @param type $str
     * @return type
     */
    function filterParams($params = array(), $filters = array()) {
        $filters[] = 'userToken';
        $filters[] = 'appKey';
        if (isset($_REQUEST) && !$params) {
            foreach ($_REQUEST as $key => $value) {
                if (in_array($key, $filters)) {
                    continue;
                }
                if (is_array($value)) {
                    continue;
                }
                $_REQUEST[$key] = $this->filterHtml($value);
            }
        }
        if ($params && is_array($params)) {
            foreach ($params as $key => $param) {
                if (in_array($key, $filters)) {
                    continue;
                }
                if (is_array($param)) {
                    continue;
                }
                $params[$key] = $param;
            }
            return $params;
        }
    }

    /**
     * 筛选黑名单
     * @param type $str
     * @return type
     */
    function filterBlockList($str) {
        // 筛选黑名单
        $arr = file_get_contents(APP . '/libs/safeFilter/test1.txt');
        $arr = explode("\r\n", $arr);
        $arr2 = file_get_contents(APP . '/libs/safeFilter/test2.txt');
        $arr2 = explode("\r\n", $arr2);
        $str = str_replace($arr, $arr2, $str);
        return $str;
    }

    /**
     * 过滤html标签
     * @return type
     */
    function filterHtml($str) {
        $str = strip_tags($str);
        return $str;
    }

    /**
     * 防止xss攻击
     */
    function filterXss() {
        
    }

}

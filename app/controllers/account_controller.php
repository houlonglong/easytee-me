<?php

require_once APP . '/webroot/aliyun2/sdk.class.php';

/**
 * Created by PhpStorm.
 * User: seanxue
 * Date: 15-2-3
 * Time: 下午2:52
 */
//require_once(APP . "/libs/open_easytee/openEdit.php");

class AccountController extends AppController {

    var $uses = array('User', 'UserAttribute');
    var $name = "Account";

    function beforeFilter() {
        parent::beforeFilter();
        if ($this->userId == 0) {
            $this->redirect('/login/?relurl=' . urlencode("http://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']));
        }
        $this->layout = 'account';
    }

    function index($status = 'ongoing') {
        $page_name = "活动管理-用户中心";
        $page = 1;
        if (isset($_GET['page'])) {
            $page = $_GET['page'];
        }
        $param = array(
            'page' => $page,
            'limit' => 5,
            'status' => $status,
        );
        $activities = $this->getActivityList($param);
        $this->checkReturnData($activities);
        $this->set(compact('page_name', 'activities', 'status'));
    }

    function design($type = 'design') {
        $page = 1;
        if (isset($_GET['page'])) {
            $page = $_GET['page'];
        }
        if ($type == 'clipart') {
            $this->clipart();
        } else {
            $page_name = "我的设计-用户中心";
            $param = array(
                'page' => $page,
                'limit' => 6,
            );
            $designs = $this->open->getDesignList($param, $this->userToken);
            $designs = json_decode($designs, true);
            $this->checkReturnData($designs);
            $this->set(compact('page_name', 'designs', 'type'));
        }
    }

    function order($id = 'unpaid', $status = 'unpaid') {
        if ($id == 'cancel') {
            $params = array(
                'id' => $status,
                'type' => isset($_REQUEST['type']) ? $_REQUEST['type'] : 'unpaid',
            );
            $orderList = $this->cancelOrder($params, $this->userToken);
            $this->showMessage('订单取消成功');
        } else {
            if (!is_numeric($id)) {
                $page = 1;
                $page_name = "我的订单-用户中心";
                if (isset($_GET['page'])) {
                    $page = $_GET['page'];
                }
                $params = array(
                    'page' => $page,
                    'limit' => 10,
                    'status' => $id,
                );
                if (isset($_REQUEST['orderId']) && $_REQUEST['orderId']) {
                    $params['orderId'] = $_REQUEST['orderId'];
                }
                if (isset($_REQUEST['activityName']) && $_REQUEST['activityName']) {
                    $params['activityName'] = $_REQUEST['activityName'];
                }
                $startTime = date('Y-m-d', strtotime('-30 day'));
                $endTime = date('Y-m-d');
                if (isset($_REQUEST['startDate']) && $_REQUEST['startDate']) {
                    $params['startTime'] = $_REQUEST['startDate'];
                    $startTime = $_REQUEST['endDate'];
                }
                if (isset($_REQUEST['endDate']) && $_REQUEST['endDate']) {
                    $params['endTime'] = $_REQUEST['endDate'];
                    $endTime = $_REQUEST['endDate'];
                }

                $orderList = $this->open->getOrderList($params, $this->userToken);
                $orderList = json_decode($orderList, true);
                $this->checkReturnData($orderList);
                $this->set(compact('page_name', 'orderList', 'id', 'startTime', 'endTime'));
            } else {
                $this->orderDetail($id, $status);
            }
        }
    }

    function orderDetail($id, $status = 'unpaid') {
        $page_name = "订单详情-我的订单-用户中心";
        $params = array(
            'orderId' => $id,
        );
        $order = $this->getOrderDetail($params, $this->userToken);
        $order = json_decode($order, true);
        $this->checkReturnData($order);
        switch ($order['Order']['status']) {
            case '待发货':
            case '已发货':
            case '已收货':
            case'已评价':
                $status = 'paid';
                break;
            case'待付款':
                $status = 'unpaid';
                break;
            case'已完成':
                $status = 'finish';
                break;
            case'已关闭':
                $status = 'close';
                break;
        }
        $this->set(compact('page_name', 'order', 'status'));
        $this->viewPath = 'account/order';
        $this->render('detail');
    }

    function moneyflow($type = '') {
        $page_name = "收支明细-用户中心";
        // 申请提现
        if ($type == 'withdrawal') {
            $this->withdrawal();
        } else {
            //默认值
            $params['time_from'] = date('Y-m-d', strtotime('-30 day'));
            $params['time_to'] = date('Y-m-d');
            $params['page'] = 1;
            $params['limit'] = 5;
            if (isset($_GET['page'])) {
                $params['page'] = $_GET['page'];
            }
            $startTime = date('Y-m-d', strtotime('-30 day'));
            $endTime = date('Y-m-d');
            if (isset($_GET['startDate']) && $_GET['startDate']) {
                $params['time_from'] = $_GET['startDate'];
                $startTime = $_GET['startDate'];
            }
            if (isset($_GET['endDate']) && $_GET['endDate']) {
                $params['time_to'] = $_GET['endDate'];
                $endTime = $_GET['endDate'];
            }
            if (isset($_GET['order_no']) && $_GET['order_no']) {
                $params['order_no'] = $_GET['order_no'];
            }
            if (isset($_GET['type']) && $_GET['type']) {
                $params['type'] = $_GET['type'];
            }
            $params['user_id'] = $this->userId;
            $moneyFlow = $this->open->moneyFlow($params, $this->userToken);
            $moneyFlow = json_decode($moneyFlow, TRUE);
            $this->checkReturnData($moneyFlow);
            $this->set(compact('moneyFlow', 'page_name', 'startTime', 'endTime', 'type'));
        }
    }

    /**
     * 申请提现
     */
    function withdrawal() {
        $page_name = "申请提现-用户中心";
        $users = $this->User->get($this->userId);
        $params = array();
        $money = $this->open->getUser($this->userToken);
        $money = json_decode($money, TRUE);
        $this->checkReturnData($money);
        $money = $money['money'];
        $account = $users['UserAttribute']['pay_account'];
        $this->set(compact('page_name', 'account', 'money'));
        $this->viewPath = 'account/moneyflow';
        $this->render('withdrawal');
    }

    function setting($type = '', $id = '') {
        switch ($type) {
            case "address":
                $this->address();
                break;
            case "address-edit":
                $this->address_edit($id);
                break;
            case "certification":
                $this->certification();
                break;
            case "certification":
                $this->certification();
                break;
            case "pay":
                $this->pay();
                break;
            case "safebind":
                $this->safebind();
                break;
            case "changpass":
                $this->changpass();
                break;
            default:
                if ($_POST) {
                    $this->personal();
                }
                $page_name = "个人设置-用户中心";
                $this->set(compact('page_name'));
                break;
        }
    }

    public function personal() {
        if (!isset($_POST['nickname']) || !$_POST['nickname']) {
            $this->alertMessage('昵称不能为空哦');
        }
        $fields['nickname'] = "'" . $this->filterHtml($this->filterBlockList($_POST['nickname'])) . "'";
        if ((!isset($_FILES['personalImage']) || !$_FILES['personalImage']) && (!isset($_POST['oldimg']) || !$_POST['oldimg'])) {
            $this->alertMessage('头像不能空哦');
        }
        if (isset($_POST['abstract'])) {
            $fields['abstract'] = "'" . $this->filterHtml($_REQUEST['abstract']) . "'";
        }
        if ($_FILES['personalImage']['size'] > 100) {
            $fileParts = pathinfo($_FILES['personalImage']['name']);
            $extention = $fileParts['extension'];
            if (in_array(strtolower($extention), array('jpg', 'jpeg', 'png', 'gif', 'bmp'))) {
                $originalName = $_FILES['personalImage']['name'];
                $filename = time() . '.' . $extention;
                $path = "user/{$this->userId}/{$filename}";
                $file = file_get_contents($_FILES['personalImage']['tmp_name']);
                $upload_file_options = array('content' => $file, 'length' => $_FILES['personalImage']['size']);
                $oss_sdk_service = new ALIOSS();
                $rest = $oss_sdk_service->upload_file_by_content("open-edit", $path, $upload_file_options);
                $fields['photo'] = "'" . CDN_DOMAIN . $path . "'";
            } else {
                $this->alertMessage('图片格式不对哦');
            }
        }
        $this->User->updateUser($fields, $this->userId);
        $params = array(
            'nick_name' => $_POST['nickname'],
        );
        $this->open->updateOpenUser($params, $this->userToken);
        $this->redirect('/account/setting');
    }

    /**
     * 获取收货地址
     */
    function address() {
        $this->page_name = "收货地址-个人设置-用户中心";
        $page_name = $this->page_name;
        $addresses = $this->open->getAddress($this->userToken);
        $addresses = json_decode($addresses, true);
        $this->checkReturnData($addresses);
        $this->set(compact('page_name', 'addresses'));
        $this->viewPath = 'account/setting';
        $this->render('address');
    }

    function address_edit() {
        $this->layout = '';
        $this->page_name = "添加地址-个人设置-用户中心";
        $address = array();
        if (isset($_POST)) {
            $this->page_name = "编辑地址-个人设置-用户中心";
            $address = $_POST;
        }
        $page_name = $this->page_name;
        $this->set(compact('page_name', 'address'));
        $this->viewPath = 'account/setting/address';
        $this->render('edit');
    }

    function certification() {
        $this->page_name = "实名认证-个人设置-用户中心";
        $page_name = $this->page_name;
        $this->set(compact('page_name'));
        $this->viewPath = 'account/setting';
        $this->render('certification');
    }

    function pay() {
        //todo 没有输出支付账号
        $this->page_name = "收款账号-个人设置-用户中心";
        $page_name = $this->page_name;
        $userAttribute = $this->UserAttribute->getByUid($this->userId);
        $type = '';
        $account = '';
        if ($userAttribute) {
            $type = $userAttribute['UserAttribute']['pay_type'];
            $account = $userAttribute['UserAttribute']['pay_account'];
        }
        $this->set(compact('page_name', 'type', 'account'));
        $this->viewPath = 'account/setting';
        $this->render('pay');
    }

    function safebind() {
        $this->page_name = "账号绑定-个人设置-用户中心";
        $page_name = $this->page_name;
        $this->set(compact('page_name'));
        $this->viewPath = 'account/setting';
        $this->render('safebind');
    }

    function changpass() {
        $user = $this->user;
        if (!$user['mobile']) {
            $this->redirect('/error/?error=' . urlencode('您當前是第三方登陆，所以不能修改密码'));
        }
        if ($_POST) {
            if (!$_POST['oldpass']) {
                $this->showMessage('请输入原始密码', 'error');
            }
            if (!$_POST['newpass']) {
                $this->showMessage('请输入新密码', 'error');
            }
            $oldpass = $_POST['oldpass'];
            $newpass = $_POST['newpass'];
            if (strlen($newpass) > 32) {
                $this->showMessage('密码修改长度不能超过32位', 'error');
            }
            if (strlen($newpass) < 6) {
                $this->showMessage('密码修改长度不能少于6位', 'error');
            }
            $ret = $this->User->updatePassword($this->userId, $oldpass, $newpass);
            if ($ret) {
                $this->showMessage('密码修改成功', 'ok');
            }
            $this->showMessage('密码修改失败', 'error');
        }
        $this->page_name = "修改密码-个人设置-用户中心";
        $page_name = $this->page_name;
        $this->set(compact('page_name'));
        $this->viewPath = 'account/setting';
        $this->render('changpass');
    }

    function clipart() {
        $page_name = "我的素材-用户中心";
        $page = 1;
        if (isset($_GET['page'])) {
            $page = $_GET['page'];
        }
        $param = array(
            'page' => $page,
            'limit' => 12,
        );
        $designs = $this->open->getArtList($param, $this->userToken);
        $designs = json_decode($designs, true);
        $this->checkReturnData($designs);
        $type = 'art';
        $this->set(compact('page_name', 'designs', 'type'));
        $this->viewPath = 'account/design';
        $this->render('clipart');
    }

    function designEdit($aid) {
        $activity = $this->open->getActivityById($aid, $this->userToken);
        $activity = json_decode($activity, TRUE);
        $this->checkReturnData($activity);
        $page_name = $activity['name'];
        $this->set(compact('activity', 'page_name'));
        $this->viewPath = 'account/design';
        $this->render('edit');
    }

    function ajaxUpdateActivity($aid) {
        $params = array();
        if (isset($_POST['name']) && !empty($_POST['name'])) {
            $params['name'] = $_POST['name'];
        }
        if (isset($_POST['description']) && !empty($_POST['description'])) {
            $params['description'] = $_POST['description'];
        }
        if (empty($params)) {
            echo json_encode(array('status' => 0));
            exit;
        }
        $params['id'] = $aid;
        $return = $this->open->updateActivityById($params, $this->userToken);
        echo $this->ajaxCheckReturnData($return);
        exit;
    }

    function closeActivityById($aid, $status = 'end') {
        $params = array(
            'status' => $status,
            'id' => $aid,
        );
        $return = $this->open->closeActivityById($params, $this->userToken);
        echo $this->ajaxCheckReturnData($return);
        exit;
    }

    function ajaxCopyActivity($aid) {
        $params = array(
            'id' => $aid,
        );
        $return = $this->open->copyActivityById($params, $this->userToken);
        echo $this->ajaxCheckReturnData($return);
        exit;
    }

    function ajaxSaveAccount() {
        if ($_POST) {
            if (!isset($_POST['pay_type'])) {
                $this->showMessage('请输入支付类型', 0);
            }
            $userInfo['pay_type'] = '"' . $this->filterHtml($_POST['pay_type']) . '"';
            if (!isset($_POST['pay_account']) || !$_POST['pay_account']) {
                $this->showMessage('请填写支付账号', 0);
            }
            $userInfo['pay_account'] = '"' . $this->filterHtml($_POST['pay_account']) . '"';
            $this->loadModel('UserAttribute');
            $ret = $this->UserAttribute->updateAll($userInfo, array('uid' => $this->userId));
            if ($this->UserAttribute->getAffectedRows()) {
                $this->showMessage('保存成功', 1);
            } else {
                $this->showMessage('保存失败', 0);
            }
        }
    }

    /**
     * 申请提现
     * @param type $money
     */
    function ajaxApplyForCash($money = 0) {
        if ($this->userId <= 0) {
            $this->showMessage('请输入提现金额', 0);
        }
        $users = $this->User->get($this->userId);
        $params = array(
            'pay_account' => $users['UserAttribute']['pay_account'],
            'pay_type' => $users['UserAttribute']['pay_type'],
            'money' => $money,
        );
        $return = $this->open->applyForCash($params, $this->userToken);
        echo $this->ajaxCheckReturnData($return);
        exit;
    }

    function ajaxSaveAddress() {
        if ($_POST) {
            $params = $_POST;
            $return = $this->open->saveAddress($params, $this->userToken);
            echo $this->ajaxCheckReturnData($return);
        } else {
            $this->showMessage('参数不能为空', 0);
        }
        exit;
    }

    function ajaxDeleteAddress($id) {
        if (empty($id)) {
            $this->showMessage('参数不能为空', 0);
        }
        $params = array('id' => $id);
        $return = $this->open->deleteAddress($params, $this->userToken);
        echo $this->ajaxCheckReturnData($return);
        exit;
    }

    function ajaxDeleteDesign($id) {
        if (empty($id)) {
            $this->showMessage('参数不能为空', 0);
        }
        $params = array('id' => $id);
        $return = $this->open->deleteDesign($params, $this->userToken);
        echo $this->ajaxCheckReturnData($return);
        exit;
    }

    /**
     * 获取用户活动列表
     * ongoing（进行中）success（成功）end（结束）
     * return json or xml
     */
    public function getActivityList($params) {
        $status = isset($params['status']) ? $params['status'] : 'ongoing';

        $this->loadModel('Design');
        $page = $offset = $limit = '';
        // 是否分页
        if (isset($params['page']) && $params['page']) {
            $page = $params['page'];
        }
        if (isset($params['limit']) && $params['limit']) {
            $limit = $params['limit'];
            $offset = ($page - 1) * $limit;
        }
        $result = array();
        switch ($status) {
            case 'create':
                $result = $this->Activity->getActivityBystatus($this->_app->id, $this->_app->user->id, $limit, $offset, 'create');
                break;
            case 'ongoing':
                $result = $this->Activity->getActivityBystatus($this->_app->id, $this->_app->user->id, $limit, $offset, 'ongoing');
                break;
            case 'success':
                $result = $this->Activity->getSuccessActivity($this->_app->id, $this->_app->user->id, $limit, $offset);
                break;
            case 'failure':
                $result = $this->Activity->getActivityBystatus($this->_app->id, $this->_app->user->id, $limit, $offset, 'failure');
                break;
        }
        $this->loadModel('Canvas');
        foreach ($result as $key => $value) {
            if ($key === 'count') {
                continue;
            }
            $style = $this->ActivityProductStyles->getActivitysActivityIdAndProductStyleId($value['Activity']['id'], $value['Activity']['default_product_style_id']);
            if (!$style) {
                continue;
            }
            $images = json_decode($style[0]['ActivityProductStyles']['image'], TRUE);
            $image = '';
            if (!$images) {
                $canvas = $this->Canvas->getCanvasByDesignId($this->_app->id, $value['Activity']['design_id']);
                if (!$canvas) {
                    $this->common->errorList(50000);
                }
                $design = array();
                $regions = array();
                foreach ($canvas as $can) {
                    $can = $can['Canvas'];
                    if ($can['imgurl']) {
                        $image = $this->cdnReplace($can['imgurl']);
                        break;
                    }
                }
            } else {
                foreach ($images as $img) {
                    if ($img) {
                        $image = $this->cdnReplace($img);
                        break;
                    }
                }
            }
            if ($status == 'ongoing' && $value['Activity']['sales_count']>=10) {
                $arr = $this->calculateProfie($value['Activity']['id']);
                $result[$key]['Activity']['eachPrice'] = $arr[0];
                $result[$key]['Activity']['profie'] = $arr[1];
            }
            $result[$key]['Activity']['image'] = $image;
        }
        return $result;
    }

    public function getList($params) {
        if (!isset($params['userToken'])) {
            $this->common->errorList(10007);
        }
        $userToken = $params['userToken'];
        $appid = $this->_app->id;
        $storeDesignList = array(
            'name' => 'StoreDesignList',
        );
        if (isset($params['page']) && $params['page']) {
            $page = $params['page'];
        }
        if (isset($params['limit']) && $params['limit']) {
            $limit = $params['limit'];
            $offset = ($page - 1) * $limit;
        }
        $designCategory = $designlist = array();
        $designs = array();
        if (isset($did)) {
            $cidByaid = $this->DesignCategoryMap->getCategoryIdFromDesignCategoryMapByDesignId($appid, $did);
            $category = $this->DesignCategory->getDesignCategoryById($appid, $cidByaid);
            $design = $this->Design->getDesignByIds($appid, $did);
            if (!$design) {
                $this->common->errorList(50000);
            }
            $this->getAttribute($design[0]['Design'], $category['DesignCategory'], $designlist);
        } else {
            if (empty($dcid) && empty($did) && empty($userToken)) {
                $designs = $this->Design->getDesignByAppIDRand($appid, 30);
            }
            if (!empty($userToken) && empty($dcid)) {
                $designs = $this->Design->getDesignByUid($appid, $this->_app->user->id, @$offset, @$limit);
            }

            if (is_array($designs) && $designs) {
                if (isset($designs['count'])) {
                    $designlist[] = array(
                        'count' => $designs['count'],
                    );
                    unset($designs['count']);
                }
                $this->loadModel('Canvas');
                foreach ($designs as $design) {
                    $design = $design['Design'];
                    $cidByaid = $this->DesignCategoryMap->getCategoryIdFromDesignCategoryMapByDesignId($appid, $design['id']);
                    $category = $this->DesignCategory->getDesignCategoryById($appid, $cidByaid);
                    $canvases = $this->Canvas->getCanvasByDesignId($this->_app->id, $design['id']);
                    // 取一张存在的图片放到设计页面
                    if ($canvases) {
                        foreach ($canvases as $canvas) {
                            if ($canvas['Canvas']['imgurl']) {
                                $design['thumburl'] = $this->cdnReplace($canvas['Canvas']['imgurl']);
                                break;
                            }
                        }
                    }
                    // 把当前设计对应到的活动ID放到
                    $this->loadModel('Activity');
                    $activity = $this->Activity->getByDesignId($design['id']);
                    if (!$activity) {
                        continue;
                    }
                    $design['activity_id'] = $activity['Activity']['id'];
                    $info = array();
                    $designlist[] = $this->getAttribute($design, $category['DesignCategory'], $info);
                }
                $storeDesignList['item'] = $designlist;
                $this->common->response($storeDesignList);
            }
            if ($dcid) {
                $designCategory = $this->DesignCategory->getChildrenDesignCategoryById($appid, $dcid);
            }
        }
        foreach ($designCategory as $dc) {
            $dc = $dc['DesignCategory'];
            $artids = $this->DesignCategoryMap->getDesignIdFromDesignCategoryMapByCategoryId($appid, $dc['id']);
            $designs = $this->Design->getDesignByIds($appid, $artids);
            foreach ($designs as $design) {
                $design = $design['Design'];
                $artids = array();
                if (in_array($design['id'], $artids)) {
                    continue;
                }
                $artids[] = $design['id'];
                $this->getAttribute($design, $designlist);
            }
        }
        $storeDesignList['item'] = $designlist;
        $this->common->response($storeDesignList);
    }

    public function cancelOrder($params) {
        if (!isset($params['id']) || !$params['id']) {
            $this->common->errorList(800001);
        }
        if (!isset($params['type']) || !$params['type']) {
            $this->common->errorList(1);
        }
        $orderId = $params['id'];
        $type = $params['type'];
        // 退款
        try {
            if ($type == 'paid') {
                $order = $this->Order->get($orderId);
                $order = $order['Order'];
                $activity = $this->Activity->getActivityById($order['activity_id']);
                if ($activity['Activity']['status'] != 'ongoing') {
                    $this->common->response(array('msg' => '活动不是进行中的活动，不能退款哦'));
                }
                $this->Order->query('START TRANSACTION');
                $result = $this->User->updateMoney($order['uid'], $order['total_price']+$order['express_price']);
                if (!$result) {
                    throw new Exception("订单取消失败", 0);
                }
                $arr = array(
                    'activity_id' => $order['activity_id'],
                    'total_price' => -($order['total_price'] + $order['express_price']),
                    'quantity' => -$order['quantity'],
                );
                // 更新活动总金额和活动销售数量
                $this->Activity->change_act_count_and_total($arr);
                // 写入收支明细里面
                $userMoneyFlow = array(
                    'uid' => $order['uid'],
                    'money' => $order['total_price'] + $order['express_price'],
                    'content' => "退款(活动:{$activity['Activity']['name']})",
                    'pay_type' => 'easytee',
                    'create_time' => date('Y-m-d H:i:s'),
                    'type' => 1,
                    'ip' => getIp(),
                );
                $this->loadModel('UserMoneyFlow');
                $lastInsert = $this->UserMoneyFlow->add($userMoneyFlow);
                if (!$lastInsert) {
                    throw new Exception("写入收支明细失败", 0);
                }
                $this->Order->query('COMMIT');
            }
            $this->Order->cancelOrder($orderId);
            $this->common->response(array('status' => 1, 'msg' => '订单取消成功'));
        } catch (Exception $e) {
            $this->Order->query('ROLLBACK');
            $this->Order->query('COMMIT');
            $this->common->response(array('status' => 0, 'msg' => $e->getMessage()));
        }
    }

    public function getOrderDetail() {
        if (!isset($_REQUEST['orderId']) || !$_REQUEST['orderId']) {
            $this->common->errorList(800001);
        }
        $orderId = $_REQUEST['orderId'];
        $order = $this->Order->get($orderId);
        if (!$order) {
            $this->common->response(array());
        }
        $activity = $this->Activity->getActivityById($order['Order']['activity_id']);
        if (!$activity) {
            $this->common->errorList(700000);
        }
        $this->loadModel('OrderExpress');
        $this->loadModel('Express');
        $orderExpress = $this->OrderExpress->getByOrderId($order['Order']['id']);
        if ($orderExpress) {
            $express = $this->Express->get($orderExpress['OrderExpress']['express_id']);
            if ($express) {
                $express['Express']['express_no'] = $orderExpress['OrderExpress']['express_no'];
                $order['express'] = $express['Express'];
            }
        }
        $order['Order']['activity_real_end_time'] = $activity['Activity']['real_end_time'];
        $this->common->response($order);
    }



}

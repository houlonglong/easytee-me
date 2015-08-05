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
    var $uses = array('User', 'Activity', 'Activities', 'Product', 'ProductStyle', 'ActivityProductStyles', 'AppProduct', 'AppProductStyle', 'ProductStyleSize', 'ActivityComment', 'Order', 'ProductStyleImageRegion');

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
            $designs = $this->getDesignList($param, $this->userToken);
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

                $orderList = $this->getOrderList($params, $this->userToken);
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
        $order = $this->getOrderDetail($params);
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
            $moneyFlow = $this->userMoneyFlow($params);
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
        $addresses = $this->getAddressList();
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
        $this->loadModel('UserAttribute');
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
        $designs = $this->getArtList($param);
        $this->checkReturnData($designs);
        $type = 'art';
        $this->set(compact('page_name', 'designs', 'type'));
        $this->viewPath = 'account/design';
        $this->render('clipart');
    }

    function designEdit($aid) {
        $activity = $this->getActivityById(array('id'=>$aid));
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
        $return = $this->updateActivityById($params);
        echo $this->ajaxCheckReturnData($return);
        exit;
    }

    function closeActivityById($aid, $status = 'end') {
        $params = array(
            'status' => $status,
            'id' => $aid,
        );
        $return = $this->ajaxCloseActivity($params);
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
            $return = $this->saveAddress($params, $this->userToken);
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
        $return = $this->deleteAddress($params);
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
                $result = $this->Activity->getActivityBystatus($this->userId, $limit, $offset, 'create');
                break;
            case 'ongoing':
                $result = $this->Activity->getActivityBystatus($this->userId, $limit, $offset, 'ongoing');
                break;
            case 'success':
                $result = $this->Activity->getSuccessActivity($this->userId, $limit, $offset);
                break;
            case 'failure':
                $result = $this->Activity->getActivityBystatus($this->userId, $limit, $offset, 'failure');
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
                $canvas = $this->Canvas->getCanvasByDesignId($value['Activity']['design_id']);
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

    function userMoneyFlow($params) {
        $this->loadModel('UserMoneyFlow');
        cache::clear();
        $uid = $this->userId;
        // 过滤html标签
        $this->filterParams();
        if (isset($params['type']) && $params['type']) {
            $info['type'] = $params['type'];
        }
        if (isset($params['time_from']) && $params['time_from']) {
            $info['create_time >='] = $params['time_from'];
        }
        if (isset($params['time_to']) && $params['time_to']) {
            $info['create_time <='] = $params['time_to'] . ' 23:59:59';
        }
        if (isset($params['content']) && $params['content']) {
            $info['content'] = $params['content'];
        }
        if (isset($params['order_no'])) {
            $info['order_no'] = $params['order_no'];
        }
        $limit = $offset = 0;
        if (isset($params['page'])) {
            $limit = $params['limit'];
            $page = $params['page'];
            $offset = ($page - 1) * $limit;
        }
        $info['uid'] = $uid;
        $userMoneyFlows = $this->UserMoneyFlow->getMoneyFlowByUid($info, $offset, $limit);
        return $userMoneyFlows;
    }

    function getAddressList() {
        $this->loadModel('UserAddress');
        $uid = $this->userId;
        $addresses = $this->UserAddress->getByUserId($uid);
        foreach($addresses as $key=>$address){
            if($address['UserAddress']['default'] == 1){
                unset($addresses[$key]);
                array_unshift($addresses,$address);
                $addresses = array_values($addresses);
                break;
            }
        }
       return $addresses;
    }

    /**
     * 获取剪贴画列表
     * @param type $appKey
     * @param type $acid Art category 分类ID
     * @param type $aid Art ID
     * @param type $userToken User Token
     */
    public function getArtList($params) {
        $userToken = '';
        $this->loadModel('Art');
        $this->loadModel('ArtCategoryMap');
        $this->loadModel('ArtCategory');

        $acid = '';
        $aid = 0;
        if (isset($params['ArtCategoryId'])) {
            $acid = $params['ArtCategoryId'];
        }
        if (isset($params['ArtId'])) {
            $aid = $params['ArtId'];
        }
        $artListArr = array(
            'name' => 'ArtList',
        );
        if (isset($this->userId)) {
            $artListArr = array(
                'name' => 'UserArtList',
            );
        }
        $offset = 0;
        $page = 1;
        $limit = 30;
        if (isset($params['page']) && $params['page']) {
            $page = $params['page'];
        }
        if (isset($params['limit']) && $params['limit']) {
            $limit = $params['limit'];
            $offset = ($page - 1) * $limit;
        }
        $artlist = array();
        $arts = array();
        $artCategory = array();
        // 当art id 存在,列出所有art信息
        if ($aid) {
            $cidByaid = $this->ArtCategoryMap->getCategoryIdFromArtCategoryMapByAId($aid);
            $category = $this->ArtCategory->getArtCategoryById($cidByaid);
            $art = $this->Art->getArtByIds($aid);
            if (!$art) {
                $this->common->errorList(40000);
            }
            $this->getAttribute($art[0]['Art'], $category['ArtCategory'], $artlist);
        } else {
            // 当没有传参数的时候，随机去除30条art信息
            if (empty($acid) && empty($aid) && empty($this->userId)) {
                $arts = $this->Art->getArtByAppIDRand($limit);
            }
            if (!empty($this->userId) && empty($acid)) {
                $arts = $this->Art->getArtByUid($this->userId, $offset, $limit);
            }
            if ($arts) {
                if (isset($arts['count'])) {
                    $artlist[] = array('count' => $arts['count']);
                    unset($arts['count']);
                }
                foreach ($arts as $art) {
                    $art = $art['Art'];
                    $cidByaid = $this->ArtCategoryMap->getCategoryIdFromArtCategoryMapByAId($art['id']);
                    $category = $this->ArtCategory->getArtCategoryById($cidByaid);
                    $this->getArtAttribute($art, $category['ArtCategory'], $artlist);
                }
                $artListArr['item'] = $artlist;
                return $artListArr;
            }
            if ($acid) {
                $artCategory = $this->ArtCategory->getArtCategoryByIDOrParentId($appid, $acid);
            }

            foreach ($artCategory as $ac) {
                $ac = $ac['ArtCategory'];
                $artids = $this->ArtCategoryMap->getArtIdFromArtCategoryMapByCategoryId($appid, $ac['id']);
                $arts = $this->Art->getArtByIds($appid, $artids);
                foreach ($arts as $art) {
                    $art = $art['Art'];
                    $artids = array();
                    if (in_array($art['id'], $artids)) {
                        continue;
                    }
                    $artids[] = $art['id'];
                    $this->getArtAttribute($art, $ac, $artlist);
                }
            }
        }

        $artListArr['item'] = $artlist;
        return $artListArr;
    }

    /**
     * 获取用户订单列表
     */
    function getOrderList($params) {

        $uid = $this->userId;
        if (!isset($params['status'])) {
            $this->common->errorList(800000);
        }
        switch ($params['status']) {
            case 'paid':
                $status = array('待发货', '已发货', '已收货', '已评价');
                break;
            case 'close':
                $status = array('已关闭', '已退款');
                break;
            case 'unpaid':
                $status = array('待付款');
                break;
            case 'finish':
                $status = array('已完成');
                break;
        }
        $page = $offset = $limit = '';
        // 是否分页
        if (isset($params['page']) && $params['page']) {
            $page = $params['page'];
        }
        if (isset($params['limit']) && $params['limit']) {
            $limit = $params['limit'];
            $offset = ($page - 1) * $limit;
        }
        $condition = array(
            'uid' => $uid,
            'status' => $status,
        );
        if (isset($params['orderId']) && $params['orderId']) {
            $condition['order_no'] = $params['orderId'];
        }
        if (isset($params['activityName']) && $params['activityName']) {
            $condition['name'] = $_REQUEST['activityName'];
        }
        if (isset($params['startTime']) && $params['startTime']) {
            $condition['create_time >='] = $params['startTime'];
        }
        if (isset($params['endTime']) && $params['endTime']) {
            $condition['create_time <='] = $params['endTime'] . ' 23:59:59';
        }
        $orders = $this->Order->getOrderByUid($condition, $offset, $limit);
        if (!$orders) {
            $this->common->response(array());
        }
        $ordersList = array('count' => $orders['count']);
        unset($orders['count']);
        foreach ($orders as $key => $order) {
            $orderGood = isset($order['OrderGoods'][0]) ? $order['OrderGoods'][0] : 0;
            $order = $order['Order'];
            $activity = $this->Activity->getNameRealEndTimeByid($order['activity_id']);
            $order['order_goods'] = $orderGood;
            $order['activity_name'] = $activity['Activity']['name'];
            $order['activity_status'] = $activity['Activity']['status'];
            $order['real_end_time'] = $activity['Activity']['real_end_time'];
            $ordersList[] = $order;
        }
        return $ordersList;
    }

    private function getArtAttribute($art, $artCategory, &$artlist) {
        $colors = json_decode($art["art_colors"], true);
        $artColor = array();
        if (is_array($colors) && $colors) {
            foreach ($colors as $color) {
                $artColor[] = array(
                    'name' => 'art_colors',
                    'attribute' => array(
                        'color' => $color,
                    )
                );
            }
        }
        $artlist[] = array(
            'name' => 'art',
            'attribute' => array(
                'art_id' => $art['id'],
                //TODO  这里的宽高不应该是写死的
                'width' => empty($art['width'])?'373':$art['width'],
                'height' => empty($art['height'])?'253':$art['height'],
                'art_type' => $art['type'],
                'can_screen_print' => $art['can_screen_print'],
                'is_featured' => $art['is_featured'],
                'colors' => $art['colors'],
                'art_name' => $art['name'],
                'is_digitized' => $art['is_digitized'],
                'date_created' => $art['date_created'],
                'art_jit' => $art['art_jit'],
                'art_cached' => $art['art_cached'],
                'thumb_jit' => $this->cdnReplace($art['thumb_jit']),
                'thumb_cached' => $art['thumb_cached'],
                'art_path' => $this->cdnReplace($art['art_path']),
                'art_category_id' => $artCategory['id'],
                'category_name' => $artCategory['name_cn'],
                'category_path' => $artCategory['path'],
            ),
            'item' => $artColor,
        );
    }

    /**
     * 获取一个活动基础数据（不含产品）
     * @param $appKey
     * @param $userToken
     * @param $id
     */
    public function getActivityById($params) {
        if (!isset($params['id'])) {
            $this->common->errorList(700000);
        }
        $id = $params['id'];
        $activity = $this->Activity->getActivityById($id);
//        if ($activity['Activity']['uid'] != $this->_app->user->id) {
//            $this->common->errorList(700000);
//        }
        $appProductStyle = $this->AppProductStyle->getAppProductStyleById($activity['Activity']['default_product_style_id']);
        if ($appProductStyle) {
            $activity['Activity']['app_product_id'] = $appProductStyle['AppProductStyle']['app_product_id'];
            $activity['Activity']['app_product_style_id'] = $appProductStyle['AppProductStyle']['id'];
        }
        return $activity['Activity'];
    }

    /**
     * 更新活动
     * @param $appKey
     * @param $userToken
     * @param $id
     */
    public function updateActivityById($params) {
        $this->filterParams(array(), array('description'));
        if (!isset($params['id'])) {
            $this->common->errorList(700000);
        }
        $id = $params['id'];
        $info = array();
        if (isset($params['name']) && $params['name']) {
            $info['name'] = "'" . $this->filterBlockList($_REQUEST['name']) . "'";
        }
        if (isset($params['description']) && $params['description']) {
            $info['description'] = "'" . $params['description'] . "'";
        }
        if (empty($info)) {
            $this->common->errorList(10010);
        }
        $result = $this->Activity->updateActivity($this->userId, $id, $info);
        return array('status' => $result, 'msg' => '保存成功');

    }

    /** 关闭活动
     * @param $appKey
     * @param $userToken
     * @param $id
     * @param $status
     */
    public function ajaxCloseActivity($params) {
        if (!isset($params['id'])) {
            $this->common->errorList(700000);
        }
        $id = $params['id'];
        if (!isset($params['status'])) {
            $this->common->errorList(1);
        }
        $status = $params['status'];
        $this->loadModel('Activity');
        $activity = $this->Activity->getActivityById($id);
        if (!$activity) {
            $this->common->errorList(700000);
        }
        $response = $this->closeActivity($activity, $status);
        return $response;
    }

    /**
     * 复制一个活动
     * @param type $appKey
     * @param type $userToken
     * @param type $id
     * @throws Exception
     */
    function copy($params) {
        if (!$this->userId) {
            $this->common->errorList(10007);
        }
        if (!isset($params['id'])) {
            $this->common->errorList(700000);
        }
        $id = $params['id'];

        $activity = $this->Activity->getActivityById($id);
        $activityProductStyle = $this->ActivityProductStyles->getActivitysActivityIdAndProductStyleId($activity['Activity']['id'], $activity['Activity']['default_product_style_id']);
        if (!$activityProductStyle) {
            $this->common->response(array('status' => 0, 'msg' => '产品没有样式，复制活动失败'));
        }
        $this->loadModel('Design');
        $this->loadModel('DesignSvg');
        $this->loadModel('Canvas');
        $this->loadModel('CanvasObject');
        $ainfo = $activity['Activity'];
        $design = $this->Design->get($ainfo['design_id']);
        $canvases = $this->Canvas->getCanvasByDesignId($this->_app->id, $ainfo['design_id']);
        if (!$canvases) {
            $this->common->errorList(700011);
        }
        $designSvg = $this->DesignSvg->get($ainfo['design_id']);
        try {
            $this->Activity->query('START TRANSACTION');
            unset($ainfo['id']);
            $ainfo['sales_count'] = 0;
            $ainfo['total'] = 0;
            $ainfo['status'] = 'create';
            $ainfo['start_time'] = date('Y-m-d H:i:s');
            $ainfo['end_time'] = '0000-00-00 00:00:00';
            $ainfo['start_time'] = '0000-00-00 00:00:00';
            //保存设计
            $designData = $design['Design'];
            unset($designData['id']);
            $conf = $this->Design->saveData($designData);
            if (!$conf) {
                throw new Exception("复制活动设计失败");
            }
            $copyDesignId = $conf['id'];
            // 保存canvas 需要用到新的design id
            foreach ($canvases as $canvas) {
                $canvas = $canvas['Canvas'];
                $canvasObject = $this->CanvasObject->getCanvasObjectByCanvasIds($this->_app->id, $canvas['id']);
                unset($canvas['id']);
                $canvas['design_id'] = $copyDesignId;
                $copyCanvasId = $this->Canvas->saveData($canvas);
                // 保存canvas object 需要用到canvas id
                foreach ($canvasObject as $object) {
                    $object = $object['CanvasObject'];
                    unset($object['id']);
                    $object['canvas_id'] = $copyCanvasId;
                    $this->CanvasObject->saveData($object);
                }
            }
            // 保存design svg
            $designSvg = $designSvg['DesignSvg'];
            unset($designSvg['id']);
            $designSvg['design_id'] = $copyDesignId;
            $svg = $this->DesignSvg->saveData($designSvg);
            if (!$svg) {
                throw new Exception("复制活动保存svg是失败");
            }
            // 保存活动
            $ainfo['design_id'] = $copyDesignId;
            $aid = $this->Activity->saveData($ainfo);
            if (!$aid) {
                throw new Exception("Copy Activity failed");
            }
            $aid = $aid['id'];
            // 保存活动样式
            $apsinfo = array();
            foreach ($activityProductStyle as $style) {
                $style = $style['ActivityProductStyles'];
                $style['activity_id'] = $aid;
                unset($style['id']);
                $apsinfo[] = $style;
                $apsid = $this->ActivityProductStyles->saveData($style);
                if (!$apsid) {
                    throw new Exception("Coyp ActivityProductStyles failed", 3);
                }
            }
            $this->Activity->query('COMMIT');
            return array('status' => 1, 'msg' => '成功复制一个活动,马上为您跳转到活动编辑页面', 'activityId' => $aid, 'designId' => $copyDesignId);
        } catch (Exception $e) {
            $this->Order->query('ROLLBACK');
            $this->Order->query('COMMIT');
            return array('status' => 0, 'msg' => $e->getMessage());
        }
    }

    /** 删除地址
     * @param $appKey
     * @param $userToken
     */
    function deleteAddress($params) {
        $this->loadModel('UserAddress');
        $uid = $this->userId;
        if (!isset($params['id'])) {
            $this->common->errorList(600008);
        }
        $id = $params['id'];
        $affectRow = $this->UserAddress->deleteAddress($id);
        if ($affectRow) {
            $arr = array(
                'status' => 1,
                'msg' => '成功删除地址'
            );
        } else {
            $arr = array(
                'status' => 0,
                'msg' => '删除地址失败'
            );
        }
        return $arr;
    }

    /** 保存用户地址
     * @param $appKey
     * @param $userToken
     * @param string $source
     * @return string
     */
    function saveAddress($params,$source='') {
      $this->loadModel('UserAddress');
        $uid = $this->userId;
        if (!empty($params)) {
            if (!isset($params['name']) || !$params['name']) {
                $this->common->errorList(600000);
            }
            if (!isset($params['tel']) || !$params['tel']) {
                $this->common->errorList(600001);
            }
            if (!isset($params['province']) || !$params['province']) {
                $this->common->errorList(600002);
            }
            if (!isset($params['city']) || !$params['city']) {
                $this->common->errorList(600004);
            }
            if (!isset($params['area']) || !$params['area']) {
                $this->common->errorList(600005);
            }
            // 过滤所有的html标签
            $this->filterParams();
            $info['name'] = $params['name'];
            $info['mobile'] = $params['tel'];
            $info['province'] = $params['province'];
            $info['city'] = $params['city'];
            $info['county'] = $params['area'];
            $info['address'] = $params['addr'];
            $string = md5(str_replace(' ', '', $uid . $params['name'] . $params['tel'] . $params['province'] . $params['city'] . $params['area'] . $params['addr']));
            $info['hash'] = $string;
            $info['uid'] = $uid;
            $arr = array(
                'status' => 1,
                'msg' => '地址添加成功',
            );
            if (isset($params['id']) && $params['id']) {
                $id = $params['id'];
                $address = $this->UserAddress->get($id);
                if ($address && $address['UserAddress']['uid'] == $uid) {
                    $addressinfo = $this->UserAddress->updateAddress($info, $id);
                    $arr['id'] = $id;
                    if ($source == 'order') {
                        return $addressinfo;
                    }
                    $arr['msg'] = '地址修改成功';
                    return ($arr);
                }
            }
            $address = $this->UserAddress->addressExists($string);
            $addressinfo = '';
            if (!$address) {
                $info['create_time'] = date('Y-m-d H:i:s');
                $addressinfo = $this->UserAddress->saveAddress($info);
                $addressinfo = $addressinfo['UserAddress'];
            } else {
                $addressinfo = $address['UserAddress'];
            }
            $arr['id'] = $addressinfo['id'];
            if ($source == 'order') {
                return $addressinfo;
            }
            return $arr;
        }
    }



}

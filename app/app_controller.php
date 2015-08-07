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
        if (isset($info["name"]) && $info["name"] === 'error') {
            return json_encode_cn(array('msg' => $info, 'status' => 0));
        }
        return json_encode_cn($info);
    }



    function alertMessage($message, $url = '') {
        header("Content-type: text/html; charset=utf-8");
        echo "<script>alert('$message'); " . (!empty($url) ? "window.location.href = '$url'; " : "window.history.back(); ") . "</script>";
        exit;
    }

    /**
     *  检查App是否合法
     * @param type $appKey
     * @return null
     */
    public function checkAppkey() {
        if (!isset($_REQUEST['appKey'])) {
            $this->common->errorList(10003);
        }
        $appKey = $_REQUEST['appKey'];
        if (empty($appKey)) {
            $this->common->errorList(10002);
        }
        $this->loadModel('Application');
        $app = $this->Application->getApplicationByAppKey($appKey);
        if ($app) {
            $app = $app["Application"];
        } else {
            $this->common->errorList(10002);
        }

        //如果有这个缓存，则检查该token得作用域 是不是合法
        $HTTP_REFERER = isset($_SERVER["HTTP_REFERER"]) ? $_SERVER["HTTP_REFERER"] : "http://127.0.0.1";
        $HTTP_REFERER = parse_url($HTTP_REFERER);
        $domain_list = explode(',', $app["domain"]);
        if (in_array(strtolower($HTTP_REFERER['host']), $domain_list)) {
            $this->setAppCache($app);
        } else {
            $this->common->errorList(10008);
        }
        return true;
    }

    /**
     * 检查第三方应用的用户标示
     * @param $appId
     * @param $userToken
     */
    public function checkAppUser() {
        if (!isset($_REQUEST['userToken'])) {
            return false;
        }
        if (empty($_REQUEST['userToken'])) {
            $this->_app->user = (object) array('id' => 0);
        } else {
            $this->loadModel('User');
            $user = $this->User->getUserByUserToken($this->_app->id, $_REQUEST['userToken']);
            if ($user['User']) {
                $this->_app->user = (object) $user['User'];
            } else {
                $this->common->errorList(10007);
            }
        }
    }

    public function checkSign() {
        if (isset($_REQUEST['sign'])) {
            if (isset($_REQUEST['appKey']) && empty($_REQUEST['appKey'])) {
                $this->common->errorList(10003);
            }
            if (empty($_REQUEST['sign'])) {
                $this->common->errorList(10005);
            }
            $appKey = $_REQUEST['appKey'];
            $sign = $_REQUEST['sign'];
            $signTime = $_REQUEST['signTime'];

            $this->loadModel('Application');
            $app = $this->Application->getApplicationByAppKey($appKey);
            if (!$app) {
                $this->common->errorList(10002);
            }
            $app = $app["Application"];

            $newSign = $this->common->createLinkstring($_REQUEST) . $app['app_secret'] . $signTime;
            if ($sign !== md5($newSign)) {
                $this->common->errorList(10009);
            }
            $this->setAppCache($app);
        }
    }

    public function setAppCache($app) {
        $this->_app = (object) $app;
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

    /**
     * 结束活动
     * 两种方式：系统结束，手动结束
     * @param type $id activity id
     * @param type $uid
     */
    protected function closeActivity($activity, $status = 'product') {
        $activity = $activity['Activity'];
        $uid = $activity['uid'];
        // 小于10 直接结束
        $id = $activity['id'];
        if ($activity['sales_count'] < 10) {
            $arr = $this->setActivityToEnd($id, $activity, $uid);
            return $arr;
        }
        // 大于10，小于众筹目标
        $profie = $this->calculateProfie($id);
        $user = $this->User->get($uid);
        $balance = $user['User']['money'];
        if ($activity['sales_count'] >= 10 && $activity['sales_count'] < $activity['sales_target']) {
            // 不管是否有利润，都要结束活动
            if ($status == 'end') {
                $arr = $this->setActivityToEnd($id, $activity, $uid);
                return $arr;
            }
            // 利润为负，余额不够支付，不能生产 (手动结束的情况)
            if ($profie[1] < 0 && $balance < abs($profie[1]) && $status == 'product') {
                return array('status' => 0, 'msg' => "利润为负，余额不够支付，不能生产");
            }
        }
        // 有利润的，直接进入生产
        $info['status'] = "'fabrication'";
        $info['real_end_time'] = "'" . date('Y-m-d H:i:s') . "'";
        $this->Activity->query('BEGIN');
        try {
            $userMoneyFlow = array(
                'uid' => $uid,
                'money' => abs($profie[1]),
                'content' => "其他支出(补足生产成本,活动{$activity['name']})",
                'pay_type' => 'easytee',
                'create_time' => date('Y-m-d H:i:s'),
                'type' => -1,
                'ip' => getIp(),
            );
            $this->loadModel('UserMoneyFlow');
            if ($balance > abs($profie[1]) && $profie[1] < 0) {
                $plusMoney = "-" . abs($profie[1]);
                $userMoneyFlow['money'] = abs($profie[1]);
                $userMoneyFlow['content'] = "其他支出(补足生产成本,活动:{$activity['name']})";
                $result = $this->User->updateMoney($uid, $plusMoney);
                $lastInsert = $this->UserMoneyFlow->add($userMoneyFlow);
                if (!$lastInsert) {
                    throw new Exception("生产失败", 0);
                }
                if (!$result) {
                    throw new Exception("生产失败", 0);
                }
            } else {
                // 当有利润的时候，分配利润
                $result = $this->User->allocationMoney($uid, ($profie[1] * 6) / 10, ($profie[1] * 4) / 10);
                if (!$result && $profie[1] != 0) {
                    throw new Exception("生产失败", 1);
                }
                $userMoneyFlow['money'] = ($profie[1] * 6) / 10;
                $userMoneyFlow['type'] = 1;
                $userMoneyFlow['content'] = "活动收入(活动:{$activity['name']})";
                $lastInsert = $this->UserMoneyFlow->add($userMoneyFlow);
                if (!$lastInsert) {
                    throw new Exception("生产失败", 0);
                }
            }
            // 把订单状态变成已完成
//            $this->Order->updateStatus($activity['id'],'"已完成"');
            $this->Activity->query('COMMIT');
            //发送短信给活动发起人
            $options = array(
                'mobile' => $user['User']['mobile'],
                'username' => $user['User']['nick_name'],
                'salesNum' => $activity['sales_count'],
                'activity' => $activity['name'],
                'money' => $profie[1],
                'id' => $activity['id'],
            );
            sendMessage($options, 11, $this);
            //发送短信给生产负责人
            $options = array(
                'mobile' => PRODUCTION_NOTICE,
                'activityId' => $activity['id'],
                'activityTitle' => $activity['name'],
                'id' => $activity['id'],
            );
            sendMessage($options, 2, $this);
            //  活动结束修改订单状态和更新活动利润
            $info['profie'] = $profie[1];
            $ret = $this->Activity->updateActivity($this->_app->id, $uid, $id, $info);
            if (!$ret) {
                throw new Exception("生产失败", 1);
            }
            return array('status' => 1, 'msg' => "进入生产");
        } catch (Exception $e) {
            $this->Activity->query('ROLLBACK');
            $this->Activity->query('COMMIT');
            return array('status' => 0, 'msg' => $e->getMessage());
        }
    }

    /**
     * 计算利润和单价成本
     * @param type $colors
     * @param type $saleCount
     * @param type $total
     * @return type
     */
    function calculateProfie($aid) {
        $this->loadModel('Activity');
        $aid = (int) $aid;
        if (empty($aid)) {
            $this->common->errorList(1);
        }
        $this->loadModel('Order');
        // 查询出已付款的所有订单
//        var_dump($aid);exit;
        $orders = $this->Order->getOrderByActivity($aid);
        // 订单的服装成本
        $sumCloth = 0;
        foreach ($orders as $order) {
            $orderGoods = $order['OrderGoods'];
            foreach ($orderGoods as $good) {
                $sumCloth +=$good['purchase_price'] * $good['quantity'];
            }
        }

        $query = $this->Activity->query('SELECT Activity.sales_count,Activity.total,Design.colors '
            . 'FROM activities as Activity INNER JOIN designs as Design ON Activity.design_id = Design.id WHERE Activity.id=' . $aid);
        if (!$query) {
            return array('', '');
        }
        // 活动销售总数量
        $saleCount = $query[0]['Activity']['sales_count'];
        // 活动销售总金额
        $total = $query[0]['Activity']['total'];
        // 活动颜色数量
        $colors = $query[0]['Design']['colors'];
        // 单件成本
        $eachPrice = $this->calcMachiningCost($colors, $saleCount);
        // 总成本
        $totalPrice = $sumCloth + $eachPrice * $saleCount;
        // 利润
        $profit = $total - $totalPrice;
        return array(round($totalPrice, 2), round($profit, 2));
    }

    /**
     * 加工成本
     * @param colorCount 产品（四个面所包含）颜色数总
     * @param totalCount 销售目标
     */
    function calcMachiningCost($colorCount, $totalCount) {
        //pt_log($totalCount);
        if ($totalCount == 0) {
            return 0.00;
        }
        return self::calculate_cost($colorCount, $totalCount);
        /**
         * if ($colorCount == 0) {
        return 0.00;
        }
        $money = 10 - ((10 - 2) / 990 * $totalCount);
        $money += $colorCount;
        return $money;
         */
    }

    /**
     * 计算印刷成本
     * @return array
     */
    static function get_print_cost() {
        $color_nums = array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        ;
        $arr = array();
        $sale_nums = array(
            10,
            20,
            30,
            40,
            50,
            100,
            150,
            200,
            300,
            400,
            500,
            600,
            700,
            800,
            900,
            1000,
        );
        $const[10][1] = 15;
        $const[10][10] = 45;

        foreach ($color_nums as $x) {
            $c = count($color_nums);
            if ($x > 1 && $x < 10) {
                $const[10][$c - $x + 1] = round($const[10][$c - $x + 2] - ($const[10][10] - $const[10][1]) / $c, 2);
            }
        }

        $const[20][1] = 13.5;
        $const[20][2] = 19.5;
        $const[20][3] = 22;
        $const[20][4] = 25;
        $const[20][5] = 27.5;
        $const[20][6] = 30.0;
        $const[20][7] = 32.0;
        $const[20][8] = 34.0;
        $const[20][9] = 38.0;
        $const[20][10] = 41.5;

        $const[500][1] = 7.5;
        $const[500][2] = 11.0;
        $const[500][3] = 12;
        $const[500][4] = 14;
        $const[500][5] = 15.0;
        $const[500][6] = 16.40;
        $const[500][7] = 17.0;
        $const[500][8] = 18.0;
        $const[500][9] = 20.0;
        $const[500][10] = 23.0;

        $const1[1] = 5;
        $const1[2] = 6.40;
        $const1[3] = 7.10;
        $const1[4] = 7.80;
        $const1[5] = 8.50;
        $const1[6] = 9.20;
        $const1[7] = 9.90;
        $const1[8] = 10.60;
        $const1[9] = 11.30;
        $const1[10] = 12.0;
        $sale_nums_length = count($sale_nums);
        $_y = 10;
        foreach ($sale_nums as $y) {
            //echo $y.":  ";
            foreach ($color_nums as $x) {
                $value = "";
                if (isset($const[$y][$x])) {
                    $value = $const[$y][$x];
                } else {
                    if ($y == 30) {
                        $value = $arr[$_y][$x] - ($const[$_y][$x] - $const1[$x]) / $sale_nums_length;
                    } else if ($y > 30) {
                        $value = $arr[$_y][$x] - ($const[10][$x] - $const1[$x]) / $sale_nums_length;
                    }
                }
                $arr[$y][$x] = $value;
                //echo round($value,2)." ";
            }
            //ECHO PHP_EOL;
            $_y = $y;
        }
        return $arr;
    }

    /**
     * @param $color_num  颜色数量
     * @param $sale_num   销售数量
     */
    static function calculate_cost($color_num, $sale_num) {

        if ($sale_num > 1000) {
            $sale_num = 1000;
        }
        $costs = self::get_print_cost();
        pt_log($costs);
        pt_log($color_num);
        pt_log($sale_num);
        //var_dump($costs);
        $price = null;
        $pre_sale_num = 10;
        foreach ($costs as $_sale_num => $colors) {
            if ($_sale_num == $sale_num) {
                $price = isset($colors[$color_num]) ? $colors[$color_num] : null;
                break;
            } else {
                if ($sale_num < $_sale_num) {
                    //echo $pre_sale_num." : ".$sale_num." : ".$_sale_num.PHP_EOL;
                    $pre_colors = $costs[$pre_sale_num];
                    //var_dump($pre_colors[$color_num]);
                    //var_dump($colors[$color_num]);
                    $price = $pre_colors[$color_num] + ($colors[$color_num] - $pre_colors[$color_num]) * ($sale_num - $pre_sale_num) / ($_sale_num - $pre_sale_num);
                    break;
                }
            }
            $pre_sale_num = $_sale_num;
        }
        if ($price === null) {
            throw new Exception("没有找到成本");
        }
        //print_r($price);
        return $price;
    }

    function cdnReplace($str) {
        return str_replace('REPLACE_DOMAIN_WITH', CDN_DOMAIN, $str);
    }

    function express($id = null) {
        return array(
            array(
                'id' => 1,
                'name' => '韵达快递',
                'contact' => '老徐',
                'mobile' => '13800000000',
                'address' => '上海市',
                'api' => 'http://wwww.baidu.com/?no={{expressId}}',
            ),
            array(
                'id' => 2,
                'name' => '顺丰快递',
                'contact' => '老徐',
                'mobile' => '13800000000',
                'address' => '上海市',
                'api' => 'http://wwww.baidu.com/?no={{expressId}}',
            ),
            array(
                'id' => 3,
                'name' => '圆通快递',
                'contact' => '老徐',
                'mobile' => '13800000000',
                'address' => '上海市',
                'api' => 'http://wwww.baidu.com/?no={{expressId}}',
            ),
            array(
                'id' => 4,
                'name' => '邮政',
                'contact' => '老徐',
                'mobile' => '13800000000',
                'address' => '上海市',
                'api' => 'http://wwww.baidu.com/?no={{expressId}}',
            )
        );
    }

    /**
     * 筛选所有的html
     * @param type $str
     * @return type
     */
    function filterParams($params = array(), $filters = array()) {
        $filters[] = 'userToken';
        $filters[] = 'appKey';
        if (isset($_REQUEST) && empty($params)) {
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
                $params[$key] = $this->filterHtml($param);
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

    /**
     * 利润分配
     */
    function distributionProfie($activityId = '') {
        if ($activityId) {
            $activity = $this->Activity->get($activityId);
        } else {
            $activity = $this->Activity->getProfieActivity();
        }
        foreach ($activity as $ac) {
            $ac = $ac['Activity'];
            $uid = $ac['uid'];
        }
    }

    function setActivityToEnd($id, $activity, $uid) {
        try {
            $this->Activity->query('BEGIN');
            $result = $this->Activity->closeActivity($id);
            if (!$result) {
                throw new Exception("结束活动失败", 0);
            }
            // 众筹失败，给活动发起人发送短信
            $user = $this->User->get($uid);
            $options = array(
                'mobile' => $user['User']['mobile'],
                'username' => $user['User']['nickname'],
                'salesNum' => $activity['sales_count'],
                'activity' => $activity['name'],
                'id' => $activity['id'],
            );
            sendMessage($options, 6, $this);
            if (!$activity['sales_count']) {
                $this->Activity->query('COMMIT');
                return array('status' => 1, 'msg' => "成功结束活动");
            }
            $orders = $this->Order->getOrderByActivity($id);
            // 把当前活动的订单状态是已付款的改成已完成
            $affectedRow = $this->Order->updateOrderStatusToRefund($id);
            if (!$affectedRow) {
                throw new Exception("订单状态更新失败", 0);
            }
            $userOrders = array();
            $activityName = '';
            foreach ($orders as $order) {
                $order = $order['Order'];
                $activityName = $order['name'];
                if (isset($userOrders[$order['uid']])) {
                    $userOrders[$order['uid']] +=$order['total_price'] + $order['express_price'];
                    continue;
                }
                $userOrders[$order['uid']] = $order['total_price'] + $order['express_price'];
            }
            // 给购买的用户设置退款
            $userMoneyFlow = array(
                'uid' => $uid,
                'pay_type' => 'easytee',
                'create_time' => date('Y-m-d H:i:s'),
                'type' => 1,
                'ip' => getIp(),
            );
            $this->loadModel('UserMoneyFlow');
            foreach ($userOrders as $uid => $money) {
                $result = $this->User->updateMoney($uid, $money);
                $userMoneyFlow['money'] = $money;
                $userMoneyFlow['content'] = "退款(活动:{$activityName})";
                $lastInsert = $this->UserMoneyFlow->add($userMoneyFlow);
                if (!$result) {
                    throw new Exception("退款出错", 0);
                }
                // 给退款用户发送短信
                $user = $this->User->get($uid);
                $options = array(
                    'mobile' => $user['User']['mobile'],
                    'username' => $user['User']['nick_name'],
                    'salesNum' => $activity['sales_count'],
                    'activity' => $activity['name'],
                    'id' => $activity['id'],
                );
                sendMessage($options, 9, $this);
            }
            $this->Activity->query('COMMIT');
        } catch (Exception $e) {
            $this->Activity->query('ROLLBACK');
            $this->Activity->query('COMMIT');
            return array('status' => $e->getCode(), 'msg' => $e->getMessage());
        }
        return array('status' => 1, 'msg' => "成功结束活动");
    }

    /**
     * 计算第三方利润
     */
    function calculateAppProfie($activityId) {
        $activityId = implode(',', $activityId);
        $this->loadModel('Application');
        $this->Activity->useDbConfig = 'write';
        $profie = db_select_rows("SELECT
	SUM(
		(aps.selling_price - ps.selling_price)*og.quantity
	 )AS profice,
	ps.id AS id,
	aps.app_id AS app_id,
	og.quantity AS quantity,
	aps.selling_price,
	ps.selling_price

        FROM
                product_styles AS ps
        INNER JOIN app_product_styles AS aps ON aps.product_style_id = ps.id
        INNER JOIN order_goods AS og ON og.product_style_id = aps.id
        INNER JOIN orders AS o ON o.id = og.order_id
        WHERE
                o.activity_id in ($activityId)
        AND o.`status` IN ('已发货','已收货','已评论') AND DATEDIFF(now(), o.delivery_time)>20 GROUP BY aps.app_id");
        $appProfie = array();
        if ($profie) {
            foreach ($profie as $p) {
                $money = $p['profice'];
                $affect = $this->Application->updateMoney($p['app_id'], $money);
                if (!$affect) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * 把svg里面的图片路径换成base64的
     * @param type $svg
     * @return type
     */
    public function resetSvg($svg) {
        $this->loadModel('Art');
        $svgXml = array();
        foreach ($svg as $key => $v) {
            if (!$v) {
                continue;
            }
            if (!preg_match('/<image(.*?)xlink:href="([0-9]+)"(.*?)\/>/i', $v)) {
                $svgXml[$key] = $v;
                continue;
            }
            preg_match_all('/<image(.*?)xlink:href="([0-9]+)"(.*?)\/>/i', $v, $res);
            if (empty($res[2])) {
                continue;
            }
            $arts = $this->Art->getArtByIds($this->_app->id, $res[2]);
            foreach ($arts as $art) {
                $image = $art['Art']['thumb_jit'];
                $extension = $art['Art']['art_extension'];
                $file = file_get_contents($this->cdnReplace($image));

                $file = base64_encode($file);
                $v = preg_replace('/<image(.*?)xlink:href=\"' . $art['Art']['id'] . '\"(.*?)\/>/s', '<image$1xlink:href="data:image/' . $extension . ';base64,' . $file . '"$2/>', $v);
            }
            $svgXml[$key] = $v;
        }
        return $svgXml;
    }



}

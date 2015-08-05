<?php

class CallController extends AppController {

    var $name = 'Call';
    var $uses = array("User");

    function beforeFilter() {
        parent::beforeFilter();
    }

    function index() {
        $data = @file_get_contents('php://input');
        file_put_contents('c:/test.txt', $data);
        if ($data) {
            $data = json_decode($data, true);
            $users = array();
            foreach ($data as $friend) {
                $inviteFriend = $this->User->get($friend['uid']);
                $inviteUser = $this->User->get($inviteFriend['User']['invite_id']);
                if ($inviteUser) {
                    if (INVITE_MONEY == 0) {
                        break;
                    }
                    // 超过最高邀请金额不做处理
                    if ($inviteUser['User']['invite_money'] >= INVITE_MONEY) {
                        continue;
                    }
                    $money = $friend['money'];
                    $inviteMoney = $friend['money'];
                    // 加上邀请金额>最高邀请金额，只存邀请最高金额
                    if ($inviteUser['User']['invite_money'] + $friend['money'] > INVITE_MONEY) {
                        $money = INVITE_MONEY - $inviteUser['User']['invite_money'];
                        $inviteMoney = INVITE_MONEY;
                    }
                    $this->User->updateUser(array('invite_money' => '`invite_money`+' . $money, 'money' => '`money`+' . $inviteMoney), $inviteFriend['User']['invite_id']);
                    if ($users[$inviteFriend['User']['invite_id']]) {
                        $users[$inviteFriend['User']['invite_id']] +=$money;
                        continue;
                    }
                    $users[$inviteFriend['User']['invite_id']] = array('money' => $money, 'activity_name' => $friend['activity_name']);
                }
            }
            $param['users'] = json_encode($users);
            $this->open->saveMoneyflow($param);
        }
        $type = @$_GET['type'];
        if (!$type) {
            $this->redirect('/error/?error=缺少参数');
        }
        if ($type == "order.complete") {
            $this->redirect("/order/complete?order_no=" . @$_GET['order_no']);
        }
        if ($type == "order.cancel") {
            $this->redirect("/account/order/" . @$_GET['order_id']);
        }
    }

}

<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class AddressController extends AppController {

    var $uses = array('User', 'UserAddress');
    var $name = "Address";

    function beforeFilter() {
        parent::beforeFilter();
    }

    /** 保存用户地址
     * @param $appKey
     * @param $userToken
     * @param string $source
     * @return string
     */
    function save($source = '') {
        if (!isset($_REQUEST['userToken'])) {
            $this->common->errorList(10007);
        }
        $uid = $this->_app->user->id;
        if (!empty($_REQUEST)) {
            if (!isset($_REQUEST['name']) || !$_REQUEST['name']) {
                $this->common->errorList(600000);
            }
            if (!isset($_REQUEST['tel']) || !$_REQUEST['tel']) {
                $this->common->errorList(600001);
            }
            if (!isset($_REQUEST['province']) || !$_REQUEST['province']) {
                $this->common->errorList(600002);
            }
            if (!isset($_REQUEST['city']) || !$_REQUEST['city']) {
                $this->common->errorList(600004);
            }
            if (!isset($_REQUEST['area']) || !$_REQUEST['area']) {
                $this->common->errorList(600005);
            }
            // 过滤所有的html标签
            $this->filterParams();
            $info['name'] = $_REQUEST['name'];
            $info['mobile'] = $_REQUEST['tel'];
            $info['province'] = $_REQUEST['province'];
            $info['city'] = $_REQUEST['city'];
            $info['county'] = $_REQUEST['area'];
            $info['address'] = $_REQUEST['addr'];
            $string = md5(str_replace(' ', '', $uid . $_REQUEST['name'] . $_REQUEST['tel'] . $_REQUEST['province'] . $_REQUEST['city'] . $_REQUEST['area'] . $_REQUEST['addr']));
            $info['hash'] = $string;
            $info['uid'] = $uid;
            $arr = array(
                'status' => 1,
                'msg' => '地址添加成功',
            );
            if (isset($_REQUEST['id']) && $_REQUEST['id']) {
                $id = $_REQUEST['id'];
                $address = $this->UserAddress->get($id);
                if ($address && $address['UserAddress']['uid'] == $uid) {
                    $addressinfo = $this->UserAddress->updateAddress($info, $id);
                    $arr['id'] = $id;
                    if ($source == 'order') {
                        return $addressinfo;
                    }
                    $arr['msg'] = '地址修改成功';
                    $this->common->response($arr);
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
            $this->common->response($arr);
        }
    }

    /** 获取用户的地址
     * @param $appKey
     * @param $userToken
     * @param string $addressId
     * @return array
     */
    function get($id = '') {
        if (!isset($_REQUEST['addressId']) || empty($_REQUEST['addressId'])) {
            $this->common->errorList(600008);
        }
        if (!isset($userToken)) {
            $this->common->errorList(10007);
        }

        $addressId = empty($id) ? $_REQUEST['addressId'] : $id;
        $address = $this->UserAddress->get($addressId);
        if ($id) {
            return $address;
        } else {
            $this->common->response($address);
        }
    }

    /** 删除地址
     * @param $appKey
     * @param $userToken
     */
    function delete() {
        if (!isset($_REQUEST['userToken'])) {
            $this->common->errorList(10007);
        }
        $uid = $this->_app->user->id;
        if (!isset($_REQUEST['id'])) {
            $this->common->errorList(600008);
        }
        $id = $_REQUEST['id'];
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
        $this->common->response($arr);
    }

    function getList() {
        if (!isset($_REQUEST['userToken'])) {
            $this->common->errorList(10007);
        }
        $uid = $this->_app->user->id;
        $addresses = $this->UserAddress->getByUserId($uid);
        foreach($addresses as $key=>$address){
            if($address['UserAddress']['default'] == 1){
                unset($addresses[$key]);
                array_unshift($addresses,$address);
                $addresses = array_values($addresses);
                break;
            }
        }
        $this->common->response($addresses);
    }

}

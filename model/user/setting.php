<?php
/**
 * 用户设置
 */
class Model_User_Setting extends Model_User_Abstract {
    function __construct(){
        parent::__construct();
    }
    function view_profile(){
        $uid = self::get_uid();
        $user = self::_db()->select_row("select u.*,i.* from et_user as u left join et_user_info as i where u.id = ?",$uid);
        return $user;
    }
    function action_profile_save($nick_name){
        $uid = self::get_uid();
        self::_db()->update("users",array("nick_name"=>$nick_name),array("id"=>$uid));
        return array("ok");
    }
    function view_address($p){
        $uid = self::get_uid();
        $page = empty($p)?1:intval($p);
        $addresses = Model_User_Address::get_list($uid,20,$page);
        return $addresses;
    }
    function action_address_detail($id){
        $uid = self::get_uid();
        $row = Model_User_Address::detail($id,$uid);
        return $row;
    }
    function action_address_remove($id){
        $uid = self::get_uid();
        Model_User_Address::remove($id,$uid);
        return "删除成功";
    }
    function action_address_list($p,$limit){
        $uid = self::get_uid();
        $page = empty($p)?1:intval($p);
        $limit = empty($limit)?20:intval($limit);
        $rows = Model_User_Address::get_list($uid,$limit,$page);
        return $rows;
    }
    function action_save_address($id,$name,$tel,$province,$city,$county,$addr,$from_wexin,$is_default){
        $uid = self::get_uid();
        if(!$name){
            throw new Exception("姓名不能为空");
        }
        if(!$tel){
            throw new Exception("电话不能为空");
        }
        if(!$province){
            throw new Exception("省份不能为空");
        }
        if(!$city){
            throw new Exception("城市不能为空");
        }
        if(!$county){
            throw new Exception("区不能为空");
        }
        if(!$addr){
            throw new Exception("地址不能为空");
        }
        $from_wexin = empty($from_wexin)?0:1;
        $is_default = empty($is_default)?0:1;

        if($id){
            Model_User_Address::update($id,$uid,$name,$tel,$province,$city,$county,$addr,$from_wexin,$is_default);
        }else{
            $id = Model_User_Address::save($uid,$name,$tel,$province,$city,$county,$addr,$from_wexin,$is_default);
        }

        return $id;
    }

    function view_withdraw_account(){
        $_accounts = self::_db()->select_rows("select * from et_user_finance where uid = ?",self::get_uid());
        $accounts = array();
        foreach($_accounts as $_account){
            $accounts[$_account['withdraw_type']] = $_account['withdraw_account'];
        }
        return $accounts;
    }
    function action_withdraw_account_save($withdraw_type,$withdraw_account){
        $uid = self::get_uid();
        if(!$withdraw_account){
            throw new Exception("帐户不能为空");
        }
        $row = self::_db()->select_row("select * from et_user_withdraw_account where uid = ? and withdraw_type = ?",$withdraw_type);
        if($row){
            self::_db()->update("et_user_withdraw_account",array(
                "withdraw_type"=>$withdraw_type,
                "withdraw_account"=>$withdraw_account
            ),array("id"=>$row['id']));
        }else{
            self::_db()->insert("et_user_withdraw_account",array(
                'uid'=>$uid,
                "withdraw_type"=>$withdraw_type,
                "withdraw_account"=>$withdraw_account
            ));
        }
        return "保存成功";
    }
    function view_withdraw(){
        $uid = self::get_uid();
        $_accounts = self::_db()->select_rows("select * from et_user_finance where uid = ?",$uid);
        if(!$_accounts) self::_location("/user/setting/withdraw_account");
        $accounts = array();
        foreach($_accounts as $_account){
            $accounts[$_account['withdraw_type']] = $_account['withdraw_account'];
        }
        $res['accounts'] = $accounts;
        $res['balance_tx'] = self::get_balance_tx();;
        return $res;
    }

    function action_do_withdraw($amount,$withdraw_type,$withdraw_account){
        $uid = self::get_uid();
        if(!$amount) throw new Exception("提现金额不能为空");
        if(!$withdraw_type) throw new Exception("提现帐户类型不能为空");
        if(!$withdraw_account) throw new Exception("提现帐户不能为空");
        $account = self::_db()->select_row("select * from et_user_withdraw_account where uid = ? and withdraw_account = ? and withdraw_type = ?",$uid,$withdraw_account,$withdraw_type);
        if(!$account) throw new Exception("提现帐户不存在");

        $balance_tx = self::get_balance_tx();
        if($balance_tx < $amount) throw new Exception("提面金额不能大于帐户可提现金额");

        self::_db()->insert("et_user_withdraw",array(
            "uid"=>$uid,
            "withdraw_fee"=>0,
            "withdraw_amount"=>$amount,
            "withdraw_type"=>$withdraw_type,
            "withdraw_account"=>$withdraw_account,
            "withdraw_status"=>0,
            "withdraw_add_time"=>date_time_now(),
            ));
        self::_db()->update("users",array("money"=>$balance_tx -$amount ),array("id"=>$uid));
        return "提现申请成功";
    }
    function view_withdraw_log(){
        $uid = self::get_uid();
        return Model_User_Widthdraw::get_log($uid);
    }

}
<?php
/**
 * 用户设置
 */
class Model_User_Setting extends Model_User_Abstract {
    static $table = "";
    function __construct(){
        parent::__construct();
    }
    function view_profile(){
        $uid = self::get_uid();
        $user = self::_db()->select_row("select nick_name from users where id = ?",$uid);
        return $user;
    }
    function action_profile_save(){
        $nick_name = self::_request("nick_name");
        $uid = self::get_uid();
        self::_db()->update("users",array("nick_name"=>$nick_name),array("id"=>$uid));
        return array("ok");
    }
    function view_address(){
        $uid = self::get_uid();
        $addresses = self::_db()->select_rows("select * from user_addresses where uid = ?",$uid);
        return array("rows"=>$addresses);
    }
    function view_pay_account(){
        $uid = self::get_uid();
        $account = self::_db()->select_row("select * from user_attributes where uid = ?",$uid);
        return $account;
    }
    function action_pay_account_save(){
        $uid = self::get_uid();
        $pay_type = self::_request("pay_type");
        $pay_account= self::_request("pay_account");
        if(!$pay_account){
            throw new Exception("帐户不能为空");
        }
        self::_db()->update("user_attributes",array(
            "pay_type"=>$pay_type,
            "pay_account"=>$pay_account
        ),array("uid"=>$uid));
        return array("ok");
    }
    function view_withdraw(){
        $uid = self::get_uid();
        $account = self::_db()->select_row("select * from user_attributes where uid = ?",$uid);
        if(!$account['pay_account']) self::_location("/user/setting/pay_account");
        $account['balance_tx'] = self::get_balance_tx();;
        return $account;
    }
    static function get_balance_tx(){
        return 100;
    }
    function action_do_withdraw(){
        $uid = self::get_uid();
        $amount = intval(self::_request("amount"));
        if(!$amount){
            throw new Exception("帐户不能为空");
        }
        $balance_tx = self::get_balance_tx();
        if($balance_tx<$amount){
            throw new Exception("提面金额不能大于帐户可提现金额");
        }
        $account = self::_db()->select_row("select * from user_attributes where uid = ?",$uid);

        $uid = self::get_uid();
        self::_db()->insert("user_withdraw_applies",array(
            "money"=>$amount,
            "pay_type"=>$account['pay_type'],
            "pay_account"=>$account['pay_account'],
            "uid"=>$uid,
            "create_time"=>date_time_now(),
            ));
        return array("ok");
    }
    function view_withdraw_record(){
        $uid = self::get_uid();
        $records = self::_db()->select_rows("select * from user_withdraw_applies where uid = ? order by id desc",$uid);
        return array("rows"=>$records);
    }
    /**
     * 详情视图
     *
    function view_detail(){
        $request = PtLib\http_request("id");
        return self::detail($request['id']);
    }
     */

    /**
     * 列表
     *
    function action_list(){
        return self::table_list();
    }
     */

    /**
     * 详情
     * @return array
     *
    function action_detail(){
        $request = PtLib\http_request("id");
        return self::detail($request['id']);
    }
     */

    /*
    * 列表
    *
    static function table_list(){
        $table_alias = $table = self::$table;
        //$table_alias = '';
        $response = PtLib\get_table_list($table,$table_alias);
        return $response;
    }
    */
    /**
     * 详情
     * @param $id
     * @return array
     *
    static function detail($id){
        $table = self::$table;
        $row = PtLib\db_select_row("select * from $table where id = ?",$id);
        return $row;
    }
     */

    /**
     * 修改
     *
    function action_edit(){
        return self::table_edit();
    }
     */

    /*
    * 修改
    *
    static function table_edit(){
        $table = self::$table;
        return PtLib\table_edit($table);
    }
    */

    /**
     * @param
     * @return
     *
    function action_test(){
        $request = PtLib\http_request("id");
        $data = array();
        $data['id'] = $request;
        return $data;
    }
     */
}
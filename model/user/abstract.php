<?php
/**
 *
 */
class Model_User_Abstract extends BaseModel{
    function __construct(){
        Model_User_Auth::check_logined();
    }
    static function get_uid(){
        $uid = Model_User_Auth::get_uid();
        return $uid;
    }
    static function get_user_finance(){
        return self::_db()->select_row("select * from et_user_finance where id = ?",self::get_uid());
    }

    static function get_balance_tx(){
        $money = self::get_user_finance();
        return empty($money['balance_tx'])?0:$money['balance_tx'];
    }
    static function get_total_earn(){
        $money = self::get_user_finance();
        return empty($money['total_earn'])?0:$money['total_earn'];
    }
}
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
        $user = PtLib\db_select_row("select u.id,u.app_uid,u.nick_name,n.photo from users as u left join new_users as n on n.id = u.app_uid where u.app_uid = ?",$uid);
        return $user['id'];
    }
}
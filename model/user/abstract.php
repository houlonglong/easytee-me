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
}
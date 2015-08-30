<?php
/**
 *
 */
class Model_User_Abstract extends BaseModel{
    function __construct(){
        Model_User_Auth::check_logined();
    }
}
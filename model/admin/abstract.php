<?php
/**
 *
 */
class Model_Admin_Abstract extends BaseModel{
    function __construct(){
        Model_Admin_Auth::check_logined();
    }
}
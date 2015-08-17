<?php
/**
 *
 */
class Model_Admin_Abstract{
    function __construct(){
        Model_Admin_Auth::check_logined();
    }
}
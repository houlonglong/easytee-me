<?php
use PtLib\UnitTest as UnitTest;
/**
 * 活动
 *
 */
class ActivityTest extends UnitTest{
    function test_detail_info(){
        $activity = Model_Activity::detail_info(2595);
        print_r($activity);
    }
    function test_get_list(){
        $activity = Model_Activity::get_list();
        print_r($activity);
    }
}
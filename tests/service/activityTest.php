<?php
use PtLib\UnitTest as UnitTest;
/**
 * 图片服务
 *
 */
class ActivityTest extends UnitTest{
    /**
     *
     *
     */
    function test_cli_test(){
        $this->cli("service/activity","run","develop");
    }

}
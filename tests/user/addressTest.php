<?php
use PtLib\UnitTest as UnitTest;
/**
 * 用户收货地址
 *
 */
class AddressTest extends UnitTest{
    function test_get_list(){
        $rows = Model_User_Address::get_list(202);
        print_r($rows);
    }
    function test_save(){
        $id = Model_User_Address::save(
            "202","1李四",
            "13222222222",
            "上海","上海","长宁",
            "长宁路111号",1,1
        );
        print_r($id);
    }
    function test_detail(){
        $row = Model_User_Address::detail(357,202);
        print_r($row);
    }
    function test_remove(){
        $row = Model_User_Address::remove(357,202);
        print_r($row);
    }
    /**
     *
     *
    function test_cli_test(){
        $this->cli("deamon/task","run");
    }
     */

    /**
     *
     *
    function test_action_test(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));

        //$this->test_host = "2.dev.jzw.com";
        $this->set_local_test_proxy();
        $res = $this->post_action("/api",array(
            "model"=>"test",
            "action"=>"test",
            "username"=>"test",
            "password"=>md5("test"),
        ));
    }
     */
}
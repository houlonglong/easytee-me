<?php
use PtLib\UnitTest as UnitTest;
/**
 * 设计工具
 *
 */
class BetaTest extends UnitTest{
    /**
     *
     */
    function test_cli_test(){
        $this->cli("design/tool/svg","upload");
    }
    function test_action_design_init(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));

        //$this->test_host = "2.dev.jzw.com";
        $this->set_local_test_proxy();
        $res = $this->post_action("/api",array(
            "model"=>"design/tool/beta",
            "action"=>"design_init",
            "json"=>1
        ));
    }
    function test_action_init(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));

        //$this->test_host = "2.dev.jzw.com";
        $this->set_local_test_proxy();
        $res = $this->post_action("/api",array(
            "model"=>"design/tool/beta",
            "action"=>"init",
            "product_id"=>2,
            "json"=>1
        ));
    }

    function test_action_product_get_cat_list(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));

        //$this->test_host = "2.dev.jzw.com";
        $this->set_local_test_proxy();
        $res = $this->post_action("/api",array(
            "model"=>"design/tool/beta",
            "action"=>"product_get_cat_list",
            "json"=>1
        ));
    }

    function test_action_design_get(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));

        //$this->test_host = "2.dev.jzw.com";
        $this->set_local_test_proxy();
        $res = $this->post_action("/api",array(
            "model"=>"design/tool/beta",
            "action"=>"design_get",
            "design_id"=>4311,
            "json"=>1
        ));
    }
    function test_action_product_get_list(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));

        //$this->test_host = "2.dev.jzw.com";
        $this->set_local_test_proxy();
        $res = $this->post_action("/api",array(
            "model"=>"design/tool/beta",
            "action"=>"product_get_list",
            "cat_id"=>1,
            "json"=>1
        ));
    }
    function test_action_activity_info(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));

        //$this->test_host = "2.dev.jzw.com";
        $this->set_local_test_proxy();
        $res = $this->post_action("/api",array(
            "model"=>"design/tool/beta",
            "action"=>"activity_info",
            "id"=>4311,
            "json"=>1
        ));
        echo $res;
    }
}
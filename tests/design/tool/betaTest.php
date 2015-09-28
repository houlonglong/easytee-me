<?php
use PtLib\UnitTest as UnitTest;
/**
 * 设计工具
 *
 */
class BetaTest extends UnitTest{

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
    function test_action_product_pricing(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));

        //$this->test_host = "2.dev.jzw.com";
        $this->set_local_test_proxy();
        $res = $this->post_action("/api",array(
            "model"=>"design/tool/beta",
            "action"=>"product_pricing",
            "sale_count"=>50,
            "color_count"=>3,
            "style_id"=>77,
            "json"=>1
        ));
    }
    function test_action_design_save(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));

        //$this->test_host = "2.dev.jzw.com";
        $this->set_local_test_proxy();
        $res = $this->post_action("/api",array(
            "model"=>"design/tool/beta",
            "action"=>"design_save",
            "color_count"=>5,
            "default_side"=>"front",
            "design_front"=>"design_front",
            "design_back"=>"design_back",
            "design_third"=>"design_third",
            "design_fourth"=>"design_fourth",
            "cat_id"=>1,
            "product_id"=>1,
            "style_id"=>10,
            "json"=>1
        ));
    }
    function test_action_merge_pic(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));

        //$this->test_host = "2.dev.jzw.com";
        $this->set_local_test_proxy();
        $res = $this->post_action("/api",array(
            "model"=>"design/tool/beta",
            "action"=>"merge_pic",
            "svgs"=>json_encode(array(
                "front"=>"<svg></svg>",
                "back"=>"<svg></svg>",
                "third"=>"<svg></svg>",
                "fourth"=>"<svg></svg>"
            )),
            "json"=>1
        ));
    }
    function test_action_get_templates(){
        $this->set_http_opt(array(
            "debug"=>0,
            "header"=>0,
            "cookie"=>0,
        ));

        //$this->test_host = "2.dev.jzw.com";
        $this->set_local_test_proxy();
        $res = $this->post_action("/api",array(
            "model"=>"design/tool/beta",
            "action"=>"get_templates",
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
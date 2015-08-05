<?php

class ConvertTest extends BaseTestCase{
    function test_pic_convert(){
        $svgfront = file_get_contents(__DIR__."/res/test.svg");
        $design_id = 1;
        $app_id = 1;
        Service\Etservice\Convert::pic_convert('svg_front',$svgfront,$design_id,$app_id,"dholer");
    }
    function test_svg_to_png(){
        $svgfront = file_get_contents(__DIR__."/res/test.svg");
        $design_id = 1;
        $app_id = 1;
        Service\Etservice\Convert::svg_to_png($design_id,$app_id,$svgfront,"","","","dholer");
    }
    function test_do_svg_to_png(){
        $_POST['svg_front'] = file_get_contents(__DIR__."/res/test.svg");
        $_POST['design_id'] = 1;
        $_POST['app_id'] = 1;
        Service\Etservice\Convert::action_svg_to_png();
    }
}
<?php
namespace Service\Imagemagick;
use BaseTestCase;
class ConvertTest extends BaseTestCase{
    function test_svg2png(){
        $org_name = __DIR__."/res/test.svg";
        $dst_name = __DIR__."/res/test.png";
        Convert::svg2png($org_name,$dst_name,'',100,100);
        $this->assertTrue(is_file($dst_name),"转换地址失败");
    }
    function test_pdf2png(){
        $org_name = __DIR__."/res/test.pdf";
        $dst_name = __DIR__."/res/test_pdf.png";
        //echo system("convert -density 150 $org_name -quality 90 $dst_name",$return_var);
        echo system("convert $org_name $dst_name",$return_var);
        echo $return_var;
    }

    function test_gen_thumb(){
        $org_name = __DIR__."/res/test.png";
        $dst_name = __DIR__."/res/test_thumb.png";
        Convert::gen_thumb($org_name,$dst_name,200,200);
        $this->assertTrue(is_file($dst_name),"转换地址失败");
    }

}
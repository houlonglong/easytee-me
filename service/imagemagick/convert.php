<?php
namespace Service\Imagemagick;
use Exception;

/**
 * ImageMagick 图片转化类
 * Class Convert
 * @package Service\Imagemagick
 */
class Convert{
    /**
     * 将svg格式的文件转化成png文件
     * @param $org_name  svg源文件绝对地址   如:/path_to_svg/test.svg
     * @param $dst_name  png转换绝对地址地址 如:/path_to_png/test.png
     * @return bool
     * @throws Exception
     */
    static function svg2png($org_name,$dst_name,$background = "",$width = '',$height = ''){
        $org_path = realpath($org_name);
        if(!is_file($org_path)){
            throw new Exception("源文件不存在");
        }
        $resize = ($width || $height) ? "-resize ".$width."x".$height : "";
        $background = ($background == '')? "-background none" : "-background '#".str_replace("#","",$background)."'";
        $cmd = "convert $background $resize $org_path $dst_name";
        pt_log($cmd);
        system($cmd,$return_var);
        if($return_var > 0){// convert error
            throw new Exception("文件转换失败");
        }
        if(!is_file($dst_name)){
            throw new Exception("文件转换失败,未生成转化文件");
        }
        return true;
    }
    /**
     * 生成缩略图
     * @param $org_name      原绝对地址
     * @param $dst_name      生成图绝对地址
     * @param int $t_width   生成缩略图宽
     * @param int $t_height  生成缩略图高
     * @return bool
     * @throws Exception
     *
     * convert -page 200x200+0+0 font1111.png -background none  -compose Xor -flatten result.png
     */
    static function gen_thumb($org_name,$dst_name,$t_width = 200,$t_height = 200){
        list($width, $height) = getimagesize($org_name);
        //pt_log($width);
        //pt_log($height);
        $x = 0;
        if($width < $t_width){
            $x = ($t_width-$width)/2;
        }
        $org_path = realpath($org_name);
        $cmd = "convert -page {$t_width}x{$t_height}+$x+0 $org_path -background none  -compose Xor -flatten $dst_name";
        pt_log($cmd);
        system($cmd,$return_var);
        if($return_var > 0){// convert error
            throw new Exception("文件转换失败");
        }
        return true;
    }
}
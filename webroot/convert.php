<?php
function gen_svg_content($shirt,$x,$y,$w,$h,$color = '',$design = ''){
    $color? $color = 'background-color:#'.$color : '';
    $shirt = "data:image/png;base64,".base64_encode(file_get_contents($shirt));

    $str = '<svg height="500" width="500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  style="overflow: hidden; position: relative;' . $color .'" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet">' .
              '<image x="0" y="0" width="500" height="500" preserveAspectRatio="none" xlink:href="' . $shirt . '" transform="matrix(1,0,0,1,0,0)"></image>';

    if($design){
        $design = "data:image/png;base64,".base64_encode(file_get_contents($design));
        $str .= '<image x="'.$x.'" y="'.$y.'" width="'.$w.'" height="'.$h.'" preserveAspectRatio="none" xlink:href="' . $design . '" transform="matrix(1,0,0,1,0,0)"></image>';
    }
    $str .='</svg>';
    return $str;
}

/**
 * 将svg格式的文件转化成png文件
 * @param $org_name  svg源文件绝对地址,如:/path_to_svg/test.svg
 * @param $dst_name  png转换地址 如: /path_to_png/test.png
 * @return bool
 * @throws Exception
 */
function svg2png($org_name,$dst_name,$background = "",$width = '',$height = ''){
    $org_path = realpath($org_name);
    if(!is_file($org_path)){
        throw new Exception("源文件不存在");
    }

    $resize = ($width || $height) ? "-resize ".$width."x".$height : "";
    $background = ($background == '')? "-background none" : "-background '#".str_replace("#","",$background)."'";
    $cmd = "convert $background $resize $org_path $dst_name";
    m_log($cmd);
    #echo $cmd;
    system($cmd,$return_var);
    if($return_var > 0){// convert error
        throw new Exception("文件转换失败");
    }
    if(!is_file($dst_name)){
        throw new Exception("文件转换失败,未生成转化文件");
    }
    //@unlink($org_path);
    //@unlink($dst_name);
    return true;
}

# convert -page 200x200+0+0 font1111.png -background none  -compose Xor -flatten result.png
function gen_thumb($org_name,$dst_name){
    list($width, $height) = getimagesize($org_name);
    $x = 0;
    if($width < 200){
        $x = (200-$width)/2;
    }
    $org_path = realpath($org_name);

    $cmd = "convert -page 200x200+$x+0 $org_path -background none  -compose Xor -flatten $dst_name";
    pt_log("生成缩略图",$cmd);
    system($cmd,$return_var);
    if($return_var > 0){// convert error
        throw new Exception("文件转换失败");
    }
    if(!is_file($dst_name)){
        throw new Exception("文件转换失败,未生成转化文件");
    }
    //@unlink($org_name);
    //@unlink($dst_name);

    return true;
}
function gen_thumb1($dst_path){
    $image = imagecreatefrompng($dst_path);
    list($width, $height) = getimagesize($dst_path);
    imagesavealpha($image,true);//这里很重要 意思是不要丢了$dst_path图像的透明色;

    $thumb = imagecreatetruecolor(200, 200);
    $color=imagecolorallocate($thumb,255,255,255);#上色
    imagecolortransparent($thumb,$color);#设置透明
    imagefill($thumb,0,0,$color);#设置透明

    imagealphablending($thumb,false);//这里很重要,意思是不合并颜色,直接用$img图像颜色替换,包括透明色;
    imagesavealpha($thumb,true);//这里很重要,意思是不要丢了$thumb图像的透明色;

    imagecopyresampled($thumb, $image, 0, 0, 0, 0, 200, $height, $width, $height);
    imagepng($thumb,"result.png");

    imagedestroy($image);
    imagedestroy($thumb);
}
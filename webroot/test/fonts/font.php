<?php
function gen_font_pic($str,$ttf_font_path,$img_save_path){
    $im = imagecreate(190,40);
    $white = imagecolorallocate($im,0xFF,0xFF,0xFF);
    imagecolortransparent($im,$white);  //imagecolortransparent() 设置具体某种颜色为透明色，若注释
    $black = imagecolorallocate($im,0x00,0x00,0x00);
    imagettftext($im,14,0,10,25,$black,$ttf_font_path,$str); //字体设置部分linux和windows的路径可能不同
    imagepng($im,$img_save_path);

    $url = Service\Aliyun\Oss\Api::oss_upload_file("dholer",$img_save_path,$img_save_path);

    var_dump($url);
}
//gen_font_pic("Microsoft JhengHei","/Users/joseph/Downloads/fonts/JhengHei.ttf","JhengHei.png");

gen_font_pic("楷体","/Users/joseph/Downloads/fonts/kt.ttf","楷体.png");
gen_font_pic("微软雅黑","/Users/joseph/Downloads/fonts/kt.ttf","微软雅黑.png");
gen_font_pic("方正兰亭超细黑简体","/Users/joseph/Downloads/fonts/fz.ttf","方正兰亭超细黑简体.png");
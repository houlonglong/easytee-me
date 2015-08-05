<?php
include_once __DIR__.'/../../app/init.php';
include __DIR__ . "/../../../service/lib/oss/upload.php";


function format_url($url){
    $url = preg_replace('/http.*open-edit/i',"REPLACE_DOMAIN_WITH",$url);
    return $url;
}

function gen_font_pic($str,$ttf_font_path,$img_save_path,$font_id){
    $im = imagecreate(380,50);
    $white = imagecolorallocate($im,0xFF,0xFF,0xFF);
    imagecolortransparent($im,$white);  //imagecolortransparent() 设置具体某种颜色为透明色，若注释
    $black = imagecolorallocate($im,0x00,0x00,0x00);
    imagettftext($im,30,0,10,40,$black,$ttf_font_path,$str); //字体设置部分linux和windows的路径可能不同
    imagepng($im,$img_save_path);
    oss_upload_file("open-edit",$img_save_path,"fonts/".$img_save_path);
    global $setting;
    $setting['db'] = array(
        'open'=>array(
            'type'=>'mysql',
            'host' => 'rdsc1n8bpzjumxhso878cpublic.mysql.rds.aliyuncs.com',
            'port'=>3306,
            'dbname'=>'open_edit',
            'dbuser'=>'open_edit_write',
            'dbpass'=>'open_edit_write',
            'charset'=>'utf8',
        ),
    );
    //return;
    db("open")->update("fonts",array(
        "name_cn"=>$str,
        "gifpath"=>"REPLACE_DOMAIN_WITH/fonts/".$img_save_path,
    ),array(
        "id"=>$font_id
    ));
}
gen_font_pic("微软雅黑","/Users/joseph/Downloads/fonts/yh.ttf","res/msyh.png",136);
gen_font_pic("Microsoft JhengHei","/Users/joseph/Downloads/fonts/JhengHei.ttf","res/JhengHei.png",147);
gen_font_pic("楷体","/Users/joseph/Downloads/fonts/kt.ttf","kt.png",145);
gen_font_pic("方正兰亭超细黑简体","/Users/joseph/Downloads/fonts/fz.ttf","res/fzlx.png",146);
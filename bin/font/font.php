<?php
include_once __DIR__.'/../../app/init.php';

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

function handle_font_js($name){
    $content = trim(file_get_contents("res/$name.font.js"));
    $pattern = "/^\/\*.*?Raphael\.registerFont\(/s";
    $content = preg_replace($pattern, '', $content);
    $res = substr($content,0,-2);
    echo substr($res,0,10);
    $res = json_decode($res,1);
    return $res;
}

function update_font_table($res,$font_id){
    $face = $res['face'];
//print_r($face);exit;
    db("open")->replace("fonts",array(
        "id"=>$font_id,
        "name"=>$face['font-family'],
        "config"=>json_encode(array(
            "w"=>$res['w'],
            "face"=>$res['face'],
        )),
    ));

    db("open")->delete("font_glyphs",array(
        "font_id"=>$font_id
    ));

    $glyphs = $res['glyphs'];
    $i = 0;
    foreach($glyphs as $word => $glyph){
        echo $i++."=>".$word.PHP_EOL;
        db("open")->insert("font_glyphs",array(
            "font_id"=>$font_id,
            "str"=>$word,
            "w"=>empty($glyph['w'])?"":$glyph['w'],
            "glyph"=>json_encode($glyph),
        ));
    }
}
//  KaiTi_normal_400
//  Microsoft_JhengHei_normal_400
//  FZLanTingHeiS-UL-GB_normal_400
//  Microsoft_YaHei_normal_400 147

$res = handle_font_js("FZLanTingHeiS-UL-GB_normal_400");

update_font_table($res,146);
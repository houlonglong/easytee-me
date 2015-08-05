<?php
include_once __DIR__.'/../app_et/init.php';

$ar = file_get_contents(PATH_CONFIG."/architecture/setting.json");
$ar = json_decode($ar,1);
foreach($ar as $node){
    if(isset($node['model']['path'])){
        PtLib\gen_model($node['model']['path'],$node['title']);
    }
    if(isset($node['url'])){
        PtLib\gen_control($node['url'],$node['title']);
    }
    if(isset($node['control'])){
        foreach($node['control'] as $control){
            PtLib\gen_control($control['url'],$control['title']);
        }
    }
}
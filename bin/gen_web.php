<?php
include_once __DIR__.'/../app/init.php';

$ar = file_get_contents(PATH_CONFIG."/architecture/setting.json");
$ar = json_decode($ar,1);
foreach($ar as $node){
    if(isset($node['model']['path'])){
        pt_gen_model($node['model']['path'],$node['title']);
    }
    if(isset($node['url'])){
        pt_gen_control($node['url'],$node['title']);
    }
    if(isset($node['control'])){
        foreach($node['control'] as $control){
            pt_gen_control($control['url'],$control['title']);
        }
    }
}
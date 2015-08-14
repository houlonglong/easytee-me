<?php

function set_pt_env(){
    //var_dump($_SERVER['argv']);
    foreach($_SERVER['argv'] as $k=>$a){
        if(substr($a,0,6) == 'ptenv='){
            $_SERVER['PT_ENV'] = substr($a,6);
        }
    }
}
set_pt_env();
include_once __DIR__ . '/../app_et/cli.php';
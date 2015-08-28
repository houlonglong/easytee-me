<?php
function domain_route($file){
    if(PtLib\is_cli()) return;
    $file = str_replace(PATH_WEBROOT,"",$file);
    if(substr($file,0,1) == "/") $file = substr($file,1);
    $admin = "admin";
    if(substr($file,0,strlen($admin)) == $admin){
        if(!in_array($_SERVER['HTTP_HOST'],
            array("admin.jzw.la","2.dev.jzw.la","2.dev.jzw.com"))){
            throw new Exception("not found",101404);
        }

    }else{
        if(!in_array($_SERVER['HTTP_HOST'],
            array("www.easytee.me","lxm.jzw.la","2.dev.jzw.la","2.dev.jzw.com"))){
            throw new Exception("not found",102404);
        }
    }
}
<?php
function domain_route($file){
    if(PtLib\is_cli()) return;
    $file = str_replace(PATH_WEBROOT,"",$file);
    if(substr($file,0,1) == "/") $file = substr($file,1);
    $admin = "admin";
    $tools = "tools";
    if(substr($file,0,strlen($admin)) == $admin) {
        if (!in_array($_SERVER['HTTP_HOST'],
            array("product.jzw.la", "admin.jzw.la", "demo.jzw.la", "2.dev.jzw.la", "2.dev.jzw.com"))
        ) {
            throw new Exception("not found", 101404);
        }
    }elseif(substr($file,0,strlen($tools)) == $tools){
        if (!in_array($_SERVER['HTTP_HOST'],
            array("service.easytee.me","2.dev.jzw.com"))
        ) {
            throw new Exception("not found", 101404);
        }
    }else{
        if(!in_array($_SERVER['HTTP_HOST'],
            array("service.easytee.me","product.jzw.la","www.easytee.me","demo.jzw.la","lxm.jzw.la","2.dev.jzw.la","2.dev.jzw.com"))){
            throw new Exception("not found",102404);
        }
    }

    if(PtApp::$ENV == "product" && substr($file,0,strlen("test")) == "test"){
        throw new Exception("not found",102404);
    }

}
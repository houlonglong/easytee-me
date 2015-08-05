<?php
include_once __DIR__."/init.php";

include_once __DIR__."/init.php";
include_once __DIR__."/ui.php";
include_once PATH_CONFIG."/define_web.php";

if(Pt\is_cli()){
    Pt\cli_route();
}else{
    Pt\set_session_handler();
    Pt\web_route();
}
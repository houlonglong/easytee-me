<?php
include_once __DIR__."/init.php";

include_once PATH_CONFIG."/define_web.php";

if(PtLib\is_cli()){
    cli_route();
}
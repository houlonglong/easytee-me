<?php
include_once __DIR__."/init.php";
include_once __DIR__."/include/common.php";
if(PtLib\is_cli()){
    cli_route();
}
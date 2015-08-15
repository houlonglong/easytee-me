<?php
include_once __DIR__."/init.php";
if(PtLib\is_cli()){
    cli_route();
}
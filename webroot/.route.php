<?php
error_reporting(E_ALL);
include_once realpath(__DIR__."/../app_et/init.php");
include_once PATH_CONFIG."/define_web.php";
set_session_handler();
web_route();

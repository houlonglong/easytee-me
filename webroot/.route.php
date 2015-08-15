<?php
error_reporting(E_ALL);
include_once realpath(__DIR__."/../app_et/init.php");
set_session_handler();
web_route();

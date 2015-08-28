<?php
if(isset($_SERVER['HTTP_X_FORWARDED_HOST']))
    $_SERVER['HTTP_HOST'] = $_SERVER['HTTP_X_FORWARDED_HOST'];

include_once __DIR__."/../app_et/init.php";
set_session_handler();
web_route();

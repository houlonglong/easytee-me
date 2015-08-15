<?php
include_once __DIR__."/init.php";

include_once PATH_CONFIG."/define_web.php";
set_session_handler();
web_route();
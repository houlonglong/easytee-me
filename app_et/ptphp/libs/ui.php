<?php

function block($name){
    if(substr($name,0,1) != "/") $name = "/".$name;
    return PATH_WEBROOT.$name.".php";
}
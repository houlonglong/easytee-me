<?php
/**
 * Created by PhpStorm.
 * User: joseph
 * Date: 7/10/15
 * Time: 1:25 PM
 */

include_once __DIR__.'/../app_et/init.php';
function pt_autoload_test($classname)
{

}
spl_autoload_register('pt_autoload_test');
pt_init();

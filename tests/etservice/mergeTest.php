<?php

class DATABASE_CONFIG
{
    var $default = array(
        'driver' => 'mysql',
        'persistent' => false,
        'host' => 'rdsc1n8bpzjumxhso878cpublic.mysql.rds.aliyuncs.com',
        'login' => 'open_edit_read',
        'password' => 'open_edit_read',
        'database' => 'open_edit',
        'prefix' => '',
        'encoding' => 'utf8',
    );

    var $write = array(
        'driver' => 'mysql',
        'persistent' => false,
        'host' => 'rdsc1n8bpzjumxhso878cpublic.mysql.rds.aliyuncs.com',
        'login' => 'open_edit_write',
        'password' => 'open_edit_write',
        'database' => 'open_edit',
        'prefix' => '',
        'encoding' => 'utf8',
    );
}
$DATABASE_CONFIG = get_class_vars('DATABASE_CONFIG');
$GLOBALS['setting']['db'] = array(
    'open'=>array(
        'type'=>'mysql',
        'host'=>$DATABASE_CONFIG['default']['host'],
        'port'=>3306,
        'dbname'=>$DATABASE_CONFIG['default']['database'],
        'dbuser'=>$DATABASE_CONFIG['default']['login'],
        'dbpass'=>$DATABASE_CONFIG['default']['password'],
        'charset'=>'utf8',
    ),
    'open_write'=>array(
        'type'=>'mysql',
        'host'=>$DATABASE_CONFIG['write']['host'],
        'port'=>3306,
        'dbname'=>$DATABASE_CONFIG['write']['database'],
        'dbuser'=>$DATABASE_CONFIG['write']['login'],
        'dbpass'=>$DATABASE_CONFIG['write']['password'],
        'charset'=>'utf8',
    ),
);

class MergeTest extends BaseTestCase{
    function test_merge(){
        $data = file_get_contents(__DIR__."/res/merge_pic.json");
        $data = json_decode($data,1);
        Service\Etservice\Merge::merge_pic($data,"dholer");
    }
    function test_gen_svg_content(){
        pt_log("test");
        echo Service\Etservice\Merge::gen_svg_content(__DIR__."/res/test.png");
    }
}
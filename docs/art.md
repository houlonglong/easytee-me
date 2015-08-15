素材
======

#name

http://open.easytee.me/art/save/?appKey=wqdc&userToken=0&DesignID=657

  6 => 'INSERT INTO `arts` (`can_screen_print`, `is_featured`, `colors`, `is_digitized`, `app_id`, `uid`, `isdown`, `is_public`, `date_created`) VALUES (1, 0, 0, 1, 1, 0, 0, 0, \'2015-08-06 14:27:21\')',
    7 => 'SELECT LAST_INSERT_ID() AS insertID',
    8 => 'SELECT COUNT(*) AS `count` FROM `arts` AS `Art`   WHERE `Art`.`id` = 16647374   ',
    9 => 'SELECT COUNT(*) AS `count` FROM `arts` AS `Art`   WHERE `Art`.`id` = 16647374   ',
    10 => 'UPDATE `arts` SET `can_screen_print` = 1, `is_featured` = 0, `colors` = 0, `is_digitized` = 1, `app_id` = 1, `uid` = 0, `isdown` = 0, `is_public` = 0, `date_created` = \'2015-08-06 14:27:21\', `id` = 16647374, `original_art_path` = \'REPLACE_DOMAIN_WITHarts/Bitmap/16647374/blob75026.png\', `thumb_jit` = \'REPLACE_DOMAIN_WITHarts/Art/16647374/blob75026.png\', `art_path` = \'REPLACE_DOMAIN_WITHarts/Bitmap/16647374/blob75026.png\', `art_extension` = \'png\', `type` = \'image\'  WHERE `arts`.`id` = 16647374',



Api Url
------

    /url

请求参数
------

    array (
         'colorLength' => '2',
         'colors' => 'F68B1F,FFFFFF',
       ),
       'get' =>
       array (
         'appKey' => 'wqdc',
         'userToken' => '0',
         'DesignID' => '657',
         'url' => 'art/save/',
       ),

响应
------

正常:

     {

     }


异常:

    {

    }
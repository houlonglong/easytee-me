用户管理
======



#获取用户信息

    http://open.easytee.me/user/getUser/

    SELECT `User`.`id`, `User`.`app_id`, `User`.`app_uid`, `User`.`create_time`, `User`.`token`, `User`.`nick_name`, `User`.`image`, `User`.`mobile`, `User`.`money`, `User`.`money_disabled`, `User`.`money_all`, `User`.`identification` FROM `users` AS `User`   WHERE `app_id` = 1 AND `token` = '9fafd364225b156f23b4e17fe89d5e9763f94245'    LIMIT 1
    SELECT `User`.`id`, `User`.`app_id`, `User`.`app_uid`, `User`.`create_time`, `User`.`token`, `User`.`nick_name`, `User`.`image`, `User`.`mobile`, `User`.`money`, `User`.`money_disabled`, `User`.`money_all`, `User`.`identification` FROM `users` AS `User`   WHERE `id` = 202    LIMIT 1


Api Url
------

    /user/getuser

请求参数
------

     {

     }

响应
------

正常:

     {

     }


异常:

    {

    }

#获取用户信息

    http://open.easytee.me/init/getusertoken/?uid=128&nickname=18652007339&mobile=18652007339&appKey=wqdc&dataType=json

    17 => 'SELECT `User`.`id`, `User`.`app_id`, `User`.`app_uid`, `User`.`create_time`, `User`.`token`, `User`.`nick_name`, `User`.`image`, `User`.`mobile`, `User`.`money`, `User`.`money_disabled`, `User`.`money_all`, `User`.`identification` FROM `users` AS `User`   WHERE `app_id` = 1 AND `app_uid` = 128    LIMIT 1',

Api Url
------

    /user/getuser

请求参数
------

     'get' =>
         array (
           'uid' => '128',
           'nickname' => '18652007339',
           'mobile' => '18652007339',
           'appKey' => 'wqdc',
           'dataType' => 'json',
           'url' => 'init/getusertoken/',
         ),


响应
------

正常:

     {

     }


异常:

    {

    }
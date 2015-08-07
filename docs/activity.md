活动
======

#获取当前用户活动

http://open.easytee.me/Activity/get/?id=658&appKey=wqdc&dataType=json&userToken=9fafd364225b156f23b4e17fe89d5e9763f94245&signTime=1438842352&sign=9170258a59dca9a0d5ad4d777453852d

20 => 'SELECT `Application`.`id`, `Application`.`app_key`, `Application`.`app_secret`, `Application`.`name`, `Application`.`great_time`, `Application`.`domain`, `Application`.`developer_id`, `Application`.`callback_url`, `Application`.`money`, `Application`.`mobile` FROM `applications` AS `Application`   WHERE `app_key` = \'wqdc\'    LIMIT 1',
21 => 'SELECT `Application`.`id`, `Application`.`app_key`, `Application`.`app_secret`, `Application`.`name`, `Application`.`great_time`, `Application`.`domain`, `Application`.`developer_id`, `Application`.`callback_url`, `Application`.`money`, `Application`.`mobile` FROM `applications` AS `Application`   WHERE `app_key` = \'wqdc\'    LIMIT 1',
22 => 'SELECT `User`.`id`, `User`.`app_id`, `User`.`app_uid`, `User`.`create_time`, `User`.`token`, `User`.`nick_name`, `User`.`image`, `User`.`mobile`, `User`.`money`, `User`.`money_disabled`, `User`.`money_all`, `User`.`identification` FROM `users` AS `User`   WHERE `app_id` = 1 AND `token` = \'9fafd364225b156f23b4e17fe89d5e9763f94245\'    LIMIT 1',
23 => 'SELECT `Activity`.`id`, `Activity`.`uid`, `Activity`.`app_id`, `Activity`.`design_id`, `Activity`.`name`, `Activity`.`sales_target`, `Activity`.`sales_count`, `Activity`.`start_time`, `Activity`.`end_time`, `Activity`.`real_end_time`, `Activity`.`abstract`, `Activity`.`description`, `Activity`.`pass`, `Activity`.`free_delivery`, `Activity`.`delivery_type`, `Activity`.`delivery_address`, `Activity`.`custom`, `Activity`.`can_custom`, `Activity`.`default_product_style_id`, `Activity`.`total`, `Activity`.`type`, `Activity`.`address_id`, `Activity`.`status`, `Activity`.`notes`, `Activity`.`free_postage`, `Activity`.`deadline`, `Activity`.`profie` FROM `activities` AS `Activity`   WHERE `id` = 658    LIMIT 1',
24 => 'SELECT `AppProductStyle`.`id`, `AppProductStyle`.`app_product_id`, `AppProductStyle`.`app_id`, `AppProductStyle`.`selling_price`, `AppProductStyle`.`enable`, `AppProductStyle`.`sequence`, `AppProductStyle`.`product_style_id`, `AppProductStyle`.`is_default` FROM `app_product_styles` AS `AppProductStyle`   WHERE `id` IS NULL AND `enable` = \'Y\'    LIMIT 1',

Api Url
------

    /activity/get

请求参数
------

      'get' =>
         array (
           'id' => '658',
           'appKey' => 'wqdc',
           'dataType' => 'json',
           'userToken' => '9fafd364225b156f23b4e17fe89d5e9763f94245',
           'signTime' => '1438842352',
           'sign' => '9170258a59dca9a0d5ad4d777453852d',
           'url' => 'Activity/get/',
         )

响应
------

正常:

     {

     }


异常:

    {

    }


#获取当前用户活动

http://open.easytee.me/Activity/getDetail/?id=660&appKey=wqdc&dataType=json&userToken=da8a32bca695fb7935a89c5de84ce7223d9d8295&signTime=1438842545&sign=00c14f885659e7242c69743e4298cfc7
20 => 'SELECT `Application`.`id`, `Application`.`app_key`, `Application`.`app_secret`, `Application`.`name`, `Application`.`great_time`, `Application`.`domain`, `Application`.`developer_id`, `Application`.`callback_url`, `Application`.`money`, `Application`.`mobile` FROM `applications` AS `Application`   WHERE `app_key` = \'wqdc\'    LIMIT 1',
    21 => 'SELECT `User`.`id`, `User`.`app_id`, `User`.`app_uid`, `User`.`create_time`, `User`.`token`, `User`.`nick_name`, `User`.`image`, `User`.`mobile`, `User`.`money`, `User`.`money_disabled`, `User`.`money_all`, `User`.`identification` FROM `users` AS `User`   WHERE `app_id` = 1 AND `token` = \'da8a32bca695fb7935a89c5de84ce7223d9d8295\'    LIMIT 1',
    22 => 'SELECT `Activities`.`id`, `Activities`.`uid`, `Activities`.`app_id`, `Activities`.`design_id`, `Activities`.`name`, `Activities`.`sales_target`, `Activities`.`sales_count`, `Activities`.`start_time`, `Activities`.`end_time`, `Activities`.`real_end_time`, `Activities`.`abstract`, `Activities`.`description`, `Activities`.`pass`, `Activities`.`free_delivery`, `Activities`.`delivery_type`, `Activities`.`delivery_address`, `Activities`.`custom`, `Activities`.`can_custom`, `Activities`.`default_product_style_id`, `Activities`.`total`, `Activities`.`type`, `Activities`.`address_id`, `Activities`.`status`, `Activities`.`notes`, `Activities`.`free_postage`, `Activities`.`deadline`, `Activities`.`profie` FROM `activities` AS `Activities`   WHERE `id` = 660 AND `app_id` = 1    LIMIT 1',
    23 => 'SHOW FULL COLUMNS FROM `user_favorites`',
    24 => 'SELECT `UserFavorite`.`id`, `UserFavorite`.`ip` FROM `user_favorites` AS `UserFavorite`   WHERE `activity_id` = 660 AND `uid` = 0   ',
    25 => 'SELECT `UserFavorite`.`id`, `UserFavorite`.`uid` FROM `user_favorites` AS `UserFavorite`   WHERE `activity_id` = 660 AND `uid` > 0   ',
    26 => 'SELECT `User`.`id`, `User`.`app_uid` FROM `users` AS `User`   WHERE `id` IS NULL   ',
    27 => 'SELECT `User`.`id`, `User`.`app_id`, `User`.`app_uid`, `User`.`create_time`, `User`.`token`, `User`.`nick_name`, `User`.`image`, `User`.`mobile`, `User`.`money`, `User`.`money_disabled`, `User`.`money_all`, `User`.`identification` FROM `users` AS `User`   WHERE `id` = 128    LIMIT 1',
    28 => 'SELECT COUNT(*) AS `count` FROM `activity_comments` AS `ActivityComment`   WHERE `activity_id` = 660   ',
    29 => 'SELECT `ActivityComment`.`id`, `ActivityComment`.`activity_id`, `ActivityComment`.`app_id`, `ActivityComment`.`user_id`, `ActivityComment`.`content`, `ActivityComment`.`ip`, `ActivityComment`.`post_time`, `ActivityComment`.`pass` FROM `activity_comments` AS `ActivityComment`   WHERE `activity_id` = 660   ORDER BY `id` desc  LIMIT 5',
    30 => 'SELECT COUNT(*) AS `count` FROM `orders` AS `Order` LEFT JOIN `order_attributes` AS `OrderAttribute` ON (`OrderAttribute`.`order_id` = `Order`.`id`)  WHERE `activity_id` = 660 AND `Order`.`status` not IN (\'待付款\', \'取消\', \'已关闭\')   ',
    31 => 'SELECT `Order`.`id`, `Order`.`order_no`, `Order`.`activity_id`, `Order`.`uid`, `Order`.`total_price`, `Order`.`quantity`, `Order`.`express_price`, `Order`.`cdkey_price`, `Order`.`name`, `Order`.`body`, `Order`.`status`, `Order`.`address_id`, `Order`.`delivery_type`, `Order`.`pay_type`, `Order`.`delivery_time`, `Order`.`sign_time`, `Order`.`create_time`, `Order`.`notes`, `Order`.`ship_name`, `Order`.`ship_addr`, `Order`.`ship_mobile`, `Order`.`ship_tel`, `Order`.`ship_province`, `Order`.`ship_city`, `Order`.`ship_area`, `OrderAttribute`.`id`, `OrderAttribute`.`order_id`, `OrderAttribute`.`activity_info`, `OrderAttribute`.`pay_price`, `OrderAttribute`.`pay_time`, `OrderAttribute`.`pay_type`, `OrderAttribute`.`pay_no`, `OrderAttribute`.`sms_sent`, `OrderAttribute`.`invoice_status`, `OrderAttribute`.`invoice` FROM `orders` AS `Order` LEFT JOIN `order_attributes` AS `OrderAttribute` ON (`OrderAttribute`.`order_id` = `Order`.`id`)  WHERE `activity_id` = 660 AND status not IN (\'待付款\', \'取消\', \'已关闭\')   ORDER BY `Order`.`id` desc  LIMIT 5',
    32 => 'SHOW FULL COLUMNS FROM `canvas`',
    33 => 'SELECT `Canvas`.`id`, `Canvas`.`table_name`, `Canvas`.`location`, `Canvas`.`width`, `Canvas`.`height`, `Canvas`.`bgcolor`, `Canvas`.`colors`, `Canvas`.`is_distressed`, `Canvas`.`shadow`, `Canvas`.`region_name`, `Canvas`.`disable_image_add`, `Canvas`.`disable_text_add`, `Canvas`.`disable_image_delete`, `Canvas`.`disable_text_delete`, `Canvas`.`imgurl`, `Canvas`.`app_id`, `Canvas`.`uid`, `Canvas`.`design_id`, `Canvas`.`region` FROM `canvas` AS `Canvas`   WHERE `app_id` = 1 AND `design_id` = 660   ORDER BY `id` ASC ',
    34 => 'SHOW FULL COLUMNS FROM `user_addresses`',
    35 => 'SELECT `ActivityProductStyles`.`id`, `ActivityProductStyles`.`activity_id`, `ActivityProductStyles`.`app_product_id`, `ActivityProductStyles`.`app_product_style_id`, `ActivityProductStyles`.`image`, `ActivityProductStyles`.`sell_price`, `ActivityProductStyles`.`product_style_id`, `ActivityProductStyles`.`product_id` FROM `activity_product_styles` AS `ActivityProductStyles`   WHERE `activity_id` = 660   ',
    36 => 'SELECT `Product`.`id`, `Product`.`app_id`, `Product`.`manufacturer_id`, `Product`.`manufacturer_brand_id`, `Product`.`long_description`, `Product`.`small_description`, `Product`.`inventory`, `Product`.`enable`, `Product`.`sequence`, `Product`.`name`, `Product`.`manufacturer_sku`, `Product`.`sku`, `Product`.`icon`, `Product`.`weight` FROM `products` AS `Product`   WHERE `enable` = \'Y\' AND `id` = 2    LIMIT 1',
    37 => 'SELECT `ProductStyle`.`id`, `ProductStyle`.`product_id`, `ProductStyle`.`app_id`, `ProductStyle`.`is_default`, `ProductStyle`.`colors`, `ProductStyle`.`color_name`, `ProductStyle`.`purchase_price`, `ProductStyle`.`selling_price`, `ProductStyle`.`enable`, `ProductStyle`.`sequence` FROM `product_styles` AS `ProductStyle`   WHERE `id` = 18 AND `enable` = \'Y\'    LIMIT 1',
    38 => 'SELECT `AppProductStyle`.`id`, `AppProductStyle`.`app_product_id`, `AppProductStyle`.`app_id`, `AppProductStyle`.`selling_price`, `AppProductStyle`.`enable`, `AppProductStyle`.`sequence`, `AppProductStyle`.`product_style_id`, `AppProductStyle`.`is_default` FROM `app_product_styles` AS `AppProductStyle`   WHERE `id` = 18 AND `enable` = \'Y\'    LIMIT 1',
    39 => 'SELECT `AppProduct`.`id`, `AppProduct`.`product_id`, `AppProduct`.`product_name`, `AppProduct`.`app_id`, `AppProduct`.`selling_price`, `AppProduct`.`enable`, `AppProduct`.`sequence` FROM `app_products` AS `AppProduct`   WHERE `app_id` = 1 AND `id` = 2 AND `enable` = \'Y\'    LIMIT 1',
    40 => 'SHOW FULL COLUMNS FROM `product_style_images`',
    41 => 'SELECT `ProductStyleImage`.`id`, `ProductStyleImage`.`app_id`, `ProductStyleImage`.`product_id`, `ProductStyleImage`.`product_style_id`, `ProductStyleImage`.`side`, `ProductStyleImage`.`name`, `ProductStyleImage`.`imgurl`, `ProductStyleImage`.`thumburl`, `ProductStyleImage`.`sequence` FROM `product_style_images` AS `ProductStyleImage`   WHERE `app_id` = 1 AND product_style_id = (18)   ORDER BY `sequence` ASC ',
    42 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `product_style_id` = 18 AND `enable` = \'Y\'   ',
    43 => 'SELECT `ProductStyleImageRegion`.`id`, `ProductStyleImageRegion`.`is_default`, `ProductStyleImageRegion`.`name`, `ProductStyleImageRegion`.`region`, `ProductStyleImageRegion`.`render_width_inches`, `ProductStyleImageRegion`.`product_style_image_id`, `ProductStyleImageRegion`.`sequence`, `ProductStyleImageRegion`.`product_style_id`, `ProductStyleImageRegion`.`product_id`, `ProductStyleImageRegion`.`print_mask`, `ProductStyleImageRegion`.`app_id` FROM `product_style_image_regions` AS `ProductStyleImageRegion`   WHERE `app_id` = 1 AND `product_style_id` = 18   ORDER BY `sequence` ASC ',
    44 => 'SELECT `Product`.`id`, `Product`.`app_id`, `Product`.`manufacturer_id`, `Product`.`manufacturer_brand_id`, `Product`.`long_description`, `Product`.`small_description`, `Product`.`inventory`, `Product`.`enable`, `Product`.`sequence`, `Product`.`name`, `Product`.`manufacturer_sku`, `Product`.`sku`, `Product`.`icon`, `Product`.`weight` FROM `products` AS `Product`   WHERE `enable` = \'Y\' AND `id` = 3    LIMIT 1',
    45 => 'SELECT `ProductStyle`.`id`, `ProductStyle`.`product_id`, `ProductStyle`.`app_id`, `ProductStyle`.`is_default`, `ProductStyle`.`colors`, `ProductStyle`.`color_name`, `ProductStyle`.`purchase_price`, `ProductStyle`.`selling_price`, `ProductStyle`.`enable`, `ProductStyle`.`sequence` FROM `product_styles` AS `ProductStyle`   WHERE `id` = 46 AND `enable` = \'Y\'    LIMIT 1',
    46 => 'SELECT `AppProductStyle`.`id`, `AppProductStyle`.`app_product_id`, `AppProductStyle`.`app_id`, `AppProductStyle`.`selling_price`, `AppProductStyle`.`enable`, `AppProductStyle`.`sequence`, `AppProductStyle`.`product_style_id`, `AppProductStyle`.`is_default` FROM `app_product_styles` AS `AppProductStyle`   WHERE `id` = 46 AND `enable` = \'Y\'    LIMIT 1',
    47 => 'SELECT `AppProduct`.`id`, `AppProduct`.`product_id`, `AppProduct`.`product_name`, `AppProduct`.`app_id`, `AppProduct`.`selling_price`, `AppProduct`.`enable`, `AppProduct`.`sequence` FROM `app_products` AS `AppProduct`   WHERE `app_id` = 1 AND `id` = 3 AND `enable` = \'Y\'    LIMIT 1',
    48 => 'SELECT `ProductStyleImage`.`id`, `ProductStyleImage`.`app_id`, `ProductStyleImage`.`product_id`, `ProductStyleImage`.`product_style_id`, `ProductStyleImage`.`side`, `ProductStyleImage`.`name`, `ProductStyleImage`.`imgurl`, `ProductStyleImage`.`thumburl`, `ProductStyleImage`.`sequence` FROM `product_style_images` AS `ProductStyleImage`   WHERE `app_id` = 1 AND product_style_id = (46)   ORDER BY `sequence` ASC ',
    49 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `product_style_id` = 46 AND `enable` = \'Y\'   ',
    50 => 'SELECT `ProductStyleImageRegion`.`id`, `ProductStyleImageRegion`.`is_default`, `ProductStyleImageRegion`.`name`, `ProductStyleImageRegion`.`region`, `ProductStyleImageRegion`.`render_width_inches`, `ProductStyleImageRegion`.`product_style_image_id`, `ProductStyleImageRegion`.`sequence`, `ProductStyleImageRegion`.`product_style_id`, `ProductStyleImageRegion`.`product_id`, `ProductStyleImageRegion`.`print_mask`, `ProductStyleImageRegion`.`app_id` FROM `product_style_image_regions` AS `ProductStyleImageRegion`   WHERE `app_id` = 1 AND `product_style_id` = 46   ORDER BY `sequence` ASC ',

Api Url
------

    /activity/get

请求参数
------

      'get' =>
         array (
           'id' => '660',
           'appKey' => 'wqdc',
           'dataType' => 'json',
           'userToken' => 'da8a32bca695fb7935a89c5de84ce7223d9d8295',
           'signTime' => '1438842545',
           'sign' => '00c14f885659e7242c69743e4298cfc7',
           'url' => 'Activity/getDetail/',
         ),


响应
------

正常:

     {

     }


异常:

    {

    }


#获活动详情

http://open.easytee.me/activity/activityInfo/

10 => 'SELECT `User`.`id`, `User`.`app_id`, `User`.`app_uid`, `User`.`create_time`, `User`.`token`, `User`.`nick_name`, `User`.`image`, `User`.`mobile`, `User`.`money`, `User`.`money_disabled`, `User`.`money_all`, `User`.`identification` FROM `users` AS `User`   WHERE `app_id` = 1 AND `token` = \'9fafd364225b156f23b4e17fe89d5e9763f94245\'    LIMIT 1',
11 => 'SELECT `Activity`.`id`, `Activity`.`uid`, `Activity`.`app_id`, `Activity`.`design_id`, `Activity`.`name`, `Activity`.`sales_target`, `Activity`.`sales_count`, `Activity`.`start_time`, `Activity`.`end_time`, `Activity`.`real_end_time`, `Activity`.`abstract`, `Activity`.`description`, `Activity`.`pass`, `Activity`.`free_delivery`, `Activity`.`delivery_type`, `Activity`.`delivery_address`, `Activity`.`custom`, `Activity`.`can_custom`, `Activity`.`default_product_style_id`, `Activity`.`total`, `Activity`.`type`, `Activity`.`address_id`, `Activity`.`status`, `Activity`.`notes`, `Activity`.`free_postage`, `Activity`.`deadline`, `Activity`.`profie` FROM `activities` AS `Activity`   WHERE `id` = 658    LIMIT 1',
12 => 'SELECT `ActivityProductStyles`.`id`, `ActivityProductStyles`.`activity_id`, `ActivityProductStyles`.`app_product_id`, `ActivityProductStyles`.`app_product_style_id`, `ActivityProductStyles`.`image`, `ActivityProductStyles`.`sell_price`, `ActivityProductStyles`.`product_style_id`, `ActivityProductStyles`.`product_id` FROM `activity_product_styles` AS `ActivityProductStyles`   WHERE `activity_id` = 658   ',

Api Url
------

    /activity/get

请求参数
------

    'post' =>
    array (
      'dataType' => 'json',
      'appKey' => 'wqdc',
      'userToken' => '9fafd364225b156f23b4e17fe89d5e9763f94245',
      'activityId' => '658',
    ),
    'get' =>
    array (
      'url' => 'activity/activityInfo/',
    ),

响应
------

正常:

     {

     }


异常:

    {

    }


#获活动详情

http://open.easytee.me/Activity/getDetail/?id=671&appKey=wqdc&dataType=json

   8 => 'SELECT `User`.`id`, `User`.`app_id`, `User`.`app_uid`, `User`.`create_time`, `User`.`token`, `User`.`nick_name`, `User`.`image`, `User`.`mobile`, `User`.`money`, `User`.`money_disabled`, `User`.`money_all`, `User`.`identification` FROM `users` AS `User`   WHERE `id` = 454    LIMIT 1',
    9 => 'SELECT COUNT(*) AS `count` FROM `activity_comments` AS `ActivityComment`   WHERE `activity_id` = 671   ',
    10 => 'SELECT `ActivityComment`.`id`, `ActivityComment`.`activity_id`, `ActivityComment`.`app_id`, `ActivityComment`.`user_id`, `ActivityComment`.`content`, `ActivityComment`.`ip`, `ActivityComment`.`post_time`, `ActivityComment`.`pass` FROM `activity_comments` AS `ActivityComment`   WHERE `activity_id` = 671   ORDER BY `id` desc  LIMIT 5',
    11 => 'SELECT COUNT(*) AS `count` FROM `orders` AS `Order` LEFT JOIN `order_attributes` AS `OrderAttribute` ON (`OrderAttribute`.`order_id` = `Order`.`id`)  WHERE `activity_id` = 671 AND `Order`.`status` not IN (\'待付款\', \'取消\', \'已关闭\')   ',
    12 => 'SELECT `Order`.`id`, `Order`.`order_no`, `Order`.`activity_id`, `Order`.`uid`, `Order`.`total_price`, `Order`.`quantity`, `Order`.`express_price`, `Order`.`cdkey_price`, `Order`.`name`, `Order`.`body`, `Order`.`status`, `Order`.`address_id`, `Order`.`delivery_type`, `Order`.`pay_type`, `Order`.`delivery_time`, `Order`.`sign_time`, `Order`.`create_time`, `Order`.`notes`, `Order`.`ship_name`, `Order`.`ship_addr`, `Order`.`ship_mobile`, `Order`.`ship_tel`, `Order`.`ship_province`, `Order`.`ship_city`, `Order`.`ship_area`, `OrderAttribute`.`id`, `OrderAttribute`.`order_id`, `OrderAttribute`.`activity_info`, `OrderAttribute`.`pay_price`, `OrderAttribute`.`pay_time`, `OrderAttribute`.`pay_type`, `OrderAttribute`.`pay_no`, `OrderAttribute`.`sms_sent`, `OrderAttribute`.`invoice_status`, `OrderAttribute`.`invoice` FROM `orders` AS `Order` LEFT JOIN `order_attributes` AS `OrderAttribute` ON (`OrderAttribute`.`order_id` = `Order`.`id`)  WHERE `activity_id` = 671 AND status not IN (\'待付款\', \'取消\', \'已关闭\')   ORDER BY `Order`.`id` desc  LIMIT 5',
    13 => 'SHOW FULL COLUMNS FROM `canvas`',
    14 => 'SELECT `Canvas`.`id`, `Canvas`.`table_name`, `Canvas`.`location`, `Canvas`.`width`, `Canvas`.`height`, `Canvas`.`bgcolor`, `Canvas`.`colors`, `Canvas`.`is_distressed`, `Canvas`.`shadow`, `Canvas`.`region_name`, `Canvas`.`disable_image_add`, `Canvas`.`disable_text_add`, `Canvas`.`disable_image_delete`, `Canvas`.`disable_text_delete`, `Canvas`.`imgurl`, `Canvas`.`app_id`, `Canvas`.`uid`, `Canvas`.`design_id`, `Canvas`.`region` FROM `canvas` AS `Canvas`   WHERE `app_id` = 1 AND `design_id` = 671   ORDER BY `id` ASC ',
    15 => 'SHOW FULL COLUMNS FROM `user_addresses`',
    16 => 'SELECT `ActivityProductStyles`.`id`, `ActivityProductStyles`.`activity_id`, `ActivityProductStyles`.`app_product_id`, `ActivityProductStyles`.`app_product_style_id`, `ActivityProductStyles`.`image`, `ActivityProductStyles`.`sell_price`, `ActivityProductStyles`.`product_style_id`, `ActivityProductStyles`.`product_id` FROM `activity_product_styles` AS `ActivityProductStyles`   WHERE `activity_id` = 671   ',
    17 => 'SELECT `Product`.`id`, `Product`.`app_id`, `Product`.`manufacturer_id`, `Product`.`manufacturer_brand_id`, `Product`.`long_description`, `Product`.`small_description`, `Product`.`inventory`, `Product`.`enable`, `Product`.`sequence`, `Product`.`name`, `Product`.`manufacturer_sku`, `Product`.`sku`, `Product`.`icon`, `Product`.`weight` FROM `products` AS `Product`   WHERE `enable` = \'Y\' AND `id` = 2    LIMIT 1',
    18 => 'SELECT `ProductStyle`.`id`, `ProductStyle`.`product_id`, `ProductStyle`.`app_id`, `ProductStyle`.`is_default`, `ProductStyle`.`colors`, `ProductStyle`.`color_name`, `ProductStyle`.`purchase_price`, `ProductStyle`.`selling_price`, `ProductStyle`.`enable`, `ProductStyle`.`sequence` FROM `product_styles` AS `ProductStyle`   WHERE `id` = 45 AND `enable` = \'Y\'    LIMIT 1',
    19 => 'SELECT `AppProductStyle`.`id`, `AppProductStyle`.`app_product_id`, `AppProductStyle`.`app_id`, `AppProductStyle`.`selling_price`, `AppProductStyle`.`enable`, `AppProductStyle`.`sequence`, `AppProductStyle`.`product_style_id`, `AppProductStyle`.`is_default` FROM `app_product_styles` AS `AppProductStyle`   WHERE `id` = 45 AND `enable` = \'Y\'    LIMIT 1',
    20 => 'SELECT `AppProduct`.`id`, `AppProduct`.`product_id`, `AppProduct`.`product_name`, `AppProduct`.`app_id`, `AppProduct`.`selling_price`, `AppProduct`.`enable`, `AppProduct`.`sequence` FROM `app_products` AS `AppProduct`   WHERE `app_id` = 1 AND `id` = 2 AND `enable` = \'Y\'    LIMIT 1',
    21 => 'SHOW FULL COLUMNS FROM `product_style_images`',
    22 => 'SELECT CHARACTER_SET_NAME FROM INFORMATION_SCHEMA.COLLATIONS WHERE COLLATION_NAME= \'utf8_general_ci\';',
    23 => 'SELECT `ProductStyleImage`.`id`, `ProductStyleImage`.`app_id`, `ProductStyleImage`.`product_id`, `ProductStyleImage`.`product_style_id`, `ProductStyleImage`.`side`, `ProductStyleImage`.`name`, `ProductStyleImage`.`imgurl`, `ProductStyleImage`.`thumburl`, `ProductStyleImage`.`sequence` FROM `product_style_images` AS `ProductStyleImage`   WHERE `app_id` = 1 AND product_style_id = (45)   ORDER BY `sequence` ASC ',
    24 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `product_style_id` = 45 AND `enable` = \'Y\'   ',
    25 => 'SELECT `ProductStyleImageRegion`.`id`, `ProductStyleImageRegion`.`is_default`, `ProductStyleImageRegion`.`name`, `ProductStyleImageRegion`.`region`, `ProductStyleImageRegion`.`render_width_inches`, `ProductStyleImageRegion`.`product_style_image_id`, `ProductStyleImageRegion`.`sequence`, `ProductStyleImageRegion`.`product_style_id`, `ProductStyleImageRegion`.`product_id`, `ProductStyleImageRegion`.`print_mask`, `ProductStyleImageRegion`.`app_id` FROM `product_style_image_regions` AS `ProductStyleImageRegion`   WHERE `app_id` = 1 AND `product_style_id` = 45   ORDER BY `sequence` ASC ',
Api Url
------

    /activity/get

请求参数
------

     'get' =>
        array (
          'id' => '671',
          'appKey' => 'wqdc',
          'dataType' => 'json',
          'url' => 'Activity/getDetail/',
        ),
        'session' =>
        array (
          'Config' =>
          array (
            'userAgent' => 'c774ae47b4fac6162fbd4c02dedc9c83',
            'time' => 1438863137,
            'timeout' => 10,
          ),
        ),

响应
------

正常:

     {

     }


异常:

    {

    }



#获活动详情

http://open.easytee.me/Activity/getDetail/?id=671&appKey=wqdc&dataType=json

   8 => 'SELECT `User`.`id`, `User`.`app_id`, `User`.`app_uid`, `User`.`create_time`, `User`.`token`, `User`.`nick_name`, `User`.`image`, `User`.`mobile`, `User`.`money`, `User`.`money_disabled`, `User`.`money_all`, `User`.`identification` FROM `users` AS `User`   WHERE `id` = 454    LIMIT 1',
    9 => 'SELECT COUNT(*) AS `count` FROM `activity_comments` AS `ActivityComment`   WHERE `activity_id` = 671   ',
    10 => 'SELECT `ActivityComment`.`id`, `ActivityComment`.`activity_id`, `ActivityComment`.`app_id`, `ActivityComment`.`user_id`, `ActivityComment`.`content`, `ActivityComment`.`ip`, `ActivityComment`.`post_time`, `ActivityComment`.`pass` FROM `activity_comments` AS `ActivityComment`   WHERE `activity_id` = 671   ORDER BY `id` desc  LIMIT 5',
    11 => 'SELECT COUNT(*) AS `count` FROM `orders` AS `Order` LEFT JOIN `order_attributes` AS `OrderAttribute` ON (`OrderAttribute`.`order_id` = `Order`.`id`)  WHERE `activity_id` = 671 AND `Order`.`status` not IN (\'待付款\', \'取消\', \'已关闭\')   ',
    12 => 'SELECT `Order`.`id`, `Order`.`order_no`, `Order`.`activity_id`, `Order`.`uid`, `Order`.`total_price`, `Order`.`quantity`, `Order`.`express_price`, `Order`.`cdkey_price`, `Order`.`name`, `Order`.`body`, `Order`.`status`, `Order`.`address_id`, `Order`.`delivery_type`, `Order`.`pay_type`, `Order`.`delivery_time`, `Order`.`sign_time`, `Order`.`create_time`, `Order`.`notes`, `Order`.`ship_name`, `Order`.`ship_addr`, `Order`.`ship_mobile`, `Order`.`ship_tel`, `Order`.`ship_province`, `Order`.`ship_city`, `Order`.`ship_area`, `OrderAttribute`.`id`, `OrderAttribute`.`order_id`, `OrderAttribute`.`activity_info`, `OrderAttribute`.`pay_price`, `OrderAttribute`.`pay_time`, `OrderAttribute`.`pay_type`, `OrderAttribute`.`pay_no`, `OrderAttribute`.`sms_sent`, `OrderAttribute`.`invoice_status`, `OrderAttribute`.`invoice` FROM `orders` AS `Order` LEFT JOIN `order_attributes` AS `OrderAttribute` ON (`OrderAttribute`.`order_id` = `Order`.`id`)  WHERE `activity_id` = 671 AND status not IN (\'待付款\', \'取消\', \'已关闭\')   ORDER BY `Order`.`id` desc  LIMIT 5',
    13 => 'SHOW FULL COLUMNS FROM `canvas`',
    14 => 'SELECT `Canvas`.`id`, `Canvas`.`table_name`, `Canvas`.`location`, `Canvas`.`width`, `Canvas`.`height`, `Canvas`.`bgcolor`, `Canvas`.`colors`, `Canvas`.`is_distressed`, `Canvas`.`shadow`, `Canvas`.`region_name`, `Canvas`.`disable_image_add`, `Canvas`.`disable_text_add`, `Canvas`.`disable_image_delete`, `Canvas`.`disable_text_delete`, `Canvas`.`imgurl`, `Canvas`.`app_id`, `Canvas`.`uid`, `Canvas`.`design_id`, `Canvas`.`region` FROM `canvas` AS `Canvas`   WHERE `app_id` = 1 AND `design_id` = 671   ORDER BY `id` ASC ',
    15 => 'SHOW FULL COLUMNS FROM `user_addresses`',
    16 => 'SELECT `ActivityProductStyles`.`id`, `ActivityProductStyles`.`activity_id`, `ActivityProductStyles`.`app_product_id`, `ActivityProductStyles`.`app_product_style_id`, `ActivityProductStyles`.`image`, `ActivityProductStyles`.`sell_price`, `ActivityProductStyles`.`product_style_id`, `ActivityProductStyles`.`product_id` FROM `activity_product_styles` AS `ActivityProductStyles`   WHERE `activity_id` = 671   ',
    17 => 'SELECT `Product`.`id`, `Product`.`app_id`, `Product`.`manufacturer_id`, `Product`.`manufacturer_brand_id`, `Product`.`long_description`, `Product`.`small_description`, `Product`.`inventory`, `Product`.`enable`, `Product`.`sequence`, `Product`.`name`, `Product`.`manufacturer_sku`, `Product`.`sku`, `Product`.`icon`, `Product`.`weight` FROM `products` AS `Product`   WHERE `enable` = \'Y\' AND `id` = 2    LIMIT 1',
    18 => 'SELECT `ProductStyle`.`id`, `ProductStyle`.`product_id`, `ProductStyle`.`app_id`, `ProductStyle`.`is_default`, `ProductStyle`.`colors`, `ProductStyle`.`color_name`, `ProductStyle`.`purchase_price`, `ProductStyle`.`selling_price`, `ProductStyle`.`enable`, `ProductStyle`.`sequence` FROM `product_styles` AS `ProductStyle`   WHERE `id` = 45 AND `enable` = \'Y\'    LIMIT 1',
    19 => 'SELECT `AppProductStyle`.`id`, `AppProductStyle`.`app_product_id`, `AppProductStyle`.`app_id`, `AppProductStyle`.`selling_price`, `AppProductStyle`.`enable`, `AppProductStyle`.`sequence`, `AppProductStyle`.`product_style_id`, `AppProductStyle`.`is_default` FROM `app_product_styles` AS `AppProductStyle`   WHERE `id` = 45 AND `enable` = \'Y\'    LIMIT 1',
    20 => 'SELECT `AppProduct`.`id`, `AppProduct`.`product_id`, `AppProduct`.`product_name`, `AppProduct`.`app_id`, `AppProduct`.`selling_price`, `AppProduct`.`enable`, `AppProduct`.`sequence` FROM `app_products` AS `AppProduct`   WHERE `app_id` = 1 AND `id` = 2 AND `enable` = \'Y\'    LIMIT 1',
    21 => 'SHOW FULL COLUMNS FROM `product_style_images`',
    22 => 'SELECT CHARACTER_SET_NAME FROM INFORMATION_SCHEMA.COLLATIONS WHERE COLLATION_NAME= \'utf8_general_ci\';',
    23 => 'SELECT `ProductStyleImage`.`id`, `ProductStyleImage`.`app_id`, `ProductStyleImage`.`product_id`, `ProductStyleImage`.`product_style_id`, `ProductStyleImage`.`side`, `ProductStyleImage`.`name`, `ProductStyleImage`.`imgurl`, `ProductStyleImage`.`thumburl`, `ProductStyleImage`.`sequence` FROM `product_style_images` AS `ProductStyleImage`   WHERE `app_id` = 1 AND product_style_id = (45)   ORDER BY `sequence` ASC ',
    24 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `product_style_id` = 45 AND `enable` = \'Y\'   ',
    25 => 'SELECT `ProductStyleImageRegion`.`id`, `ProductStyleImageRegion`.`is_default`, `ProductStyleImageRegion`.`name`, `ProductStyleImageRegion`.`region`, `ProductStyleImageRegion`.`render_width_inches`, `ProductStyleImageRegion`.`product_style_image_id`, `ProductStyleImageRegion`.`sequence`, `ProductStyleImageRegion`.`product_style_id`, `ProductStyleImageRegion`.`product_id`, `ProductStyleImageRegion`.`print_mask`, `ProductStyleImageRegion`.`app_id` FROM `product_style_image_regions` AS `ProductStyleImageRegion`   WHERE `app_id` = 1 AND `product_style_id` = 45   ORDER BY `sequence` ASC ',
Api Url
------

    /activity/get

请求参数
------

     'get' =>
        array (
          'id' => '671',
          'appKey' => 'wqdc',
          'dataType' => 'json',
          'url' => 'Activity/getDetail/',
        ),
        'session' =>
        array (
          'Config' =>
          array (
            'userAgent' => 'c774ae47b4fac6162fbd4c02dedc9c83',
            'time' => 1438863137,
            'timeout' => 10,
          ),
        ),

响应
------

正常:

     {

     }


异常:

    {

    }
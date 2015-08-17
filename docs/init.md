初始化
======

#初始化设计工具

http://open.easytee.me/init/getConfig/?appKey=wqdc&productId=2&embroideryMode=false

26 => 'SELECT `Application`.`id`, `Application`.`app_key`, `Application`.`app_secret`, `Application`.`name`, `Application`.`great_time`, `Application`.`domain`, `Application`.`developer_id`, `Application`.`callback_url`, `Application`.`money`, `Application`.`mobile` FROM `applications` AS `Application`   WHERE `app_key` = \'wqdc\'    LIMIT 1',
27 => 'SELECT `FontCategory`.`id`, `FontCategory`.`name`, `FontCategory`.`is_embroidery`, `FontCategory`.`font_count`, `FontCategory`.`sequence`, `FontCategory`.`app_id`, `FontCategory`.`is_zhcn` FROM `font_categories` AS `FontCategory`   WHERE `app_id` = 1   ',
28 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = in ( ".implode(",",$ids).") AND `enable` = \'Y\'   ',
29 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (19) AND `enable` = \'Y\'   ',
30 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (20) AND `enable` = \'Y\'   ',
31 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (21) AND `enable` = \'Y\'   ',
32 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (22) AND `enable` = \'Y\'   ',
33 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (23) AND `enable` = \'Y\'   ',
34 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (24) AND `enable` = \'Y\'   ',
35 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (25) AND `enable` = \'Y\'   ',
36 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (26) AND `enable` = \'Y\'   ',
37 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (27) AND `enable` = \'Y\'   ',
38 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (28) AND `enable` = \'Y\'   ',
39 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (29) AND `enable` = \'Y\'   ',
40 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (30) AND `enable` = \'Y\'   ',
41 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (31) AND `enable` = \'Y\'   ',
42 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (32) AND `enable` = \'Y\'   ',
43 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (33) AND `enable` = \'Y\'   ',
44 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (34) AND `enable` = \'Y\'   ',
45 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (35) AND `enable` = \'Y\'   ',
46 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (36) AND `enable` = \'Y\'   ',
47 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (37) AND `enable` = \'Y\'   ',
48 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (38) AND `enable` = \'Y\'   ',
49 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (39) AND `enable` = \'Y\'   ',
50 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (40) AND `enable` = \'Y\'   ',
51 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (41) AND `enable` = \'Y\'   ',
52 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (42) AND `enable` = \'Y\'   ',
53 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (43) AND `enable` = \'Y\'   ',
54 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (44) AND `enable` = \'Y\'   ',
55 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (45) AND `enable` = \'Y\'   ',
56 => 'SELECT `AppProduct`.`id`, `AppProduct`.`product_id`, `AppProduct`.`product_name`, `AppProduct`.`app_id`, `AppProduct`.`selling_price`, `AppProduct`.`enable`, `AppProduct`.`sequence` FROM `app_products` AS `AppProduct`   WHERE `app_id` = 1 AND `id` = 2 AND `enable` = \'Y\'    LIMIT 1',
57 => 'SELECT `Product`.`id`, `Product`.`app_id`, `Product`.`manufacturer_id`, `Product`.`manufacturer_brand_id`, `Product`.`long_description`, `Product`.`small_description`, `Product`.`inventory`, `Product`.`enable`, `Product`.`sequence`, `Product`.`name`, `Product`.`manufacturer_sku`, `Product`.`sku`, `Product`.`icon`, `Product`.`weight` FROM `products` AS `Product`   WHERE `enable` = \'Y\' AND `id` = 2    LIMIT 1',


Api Url
------

    /url

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
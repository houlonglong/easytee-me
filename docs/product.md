产品
======

#产品分类列表

http://open.easytee.me/product/getCategoryList/?appKey=wqdc



SELECT `AppProductCategory`.`id`, `AppProductCategory`.`name`, `AppProductCategory`.`enable`, `AppProductCategory`.`parent_id`, `AppProductCategory`.`sequence`, `AppProductCategory`.`app_id`, `AppProductCategory`.`thumb`, `AppProductCategory`.`path` FROM `app_product_categories` AS `AppProductCategory`   WHERE `app_id` = 1 AND `enable` = \'Y\'   ORDER BY `parent_id` ASC, `sequence` ASC, `id` ASC

Api Url
------

    /url

请求参数
------

     'get' =>
     array (
       'appKey' => 'wqdc',
       'url' => 'product/getCategoryList/',
     ),

响应
------

正常:

     {

     }


异常:

    {

    }


#产品列表

http://open.easytee.me/product/getList/1/?productCategoryId=1&appKey=wqdc



  2 => 'SELECT `AppProductCategory`.`id`, `AppProductCategory`.`name`,
  `AppProductCategory`.`enable`, `AppProductCategory`.`parent_id`, `AppProductCategory`.`sequence`,
  `AppProductCategory`.`app_id`, `AppProductCategory`.`thumb`, `AppProductCategory`.`path`
   FROM `app_product_categories` AS `AppProductCategory`   WHERE `app_id` = 1
    AND `id` = 1 AND `enable` = \'Y\'   ORDER BY `parent_id` ASC, `sequence` ASC, `id` ASC  LIMIT 1',


    3 => 'SELECT `AppProductCategoryMap`.`app_product_id` FROM `app_product_category_maps` AS `AppProductCategoryMap`   WHERE `app_id` = 1 AND `app_product_category_id` = 1   ',
    4 => 'SELECT `AppProduct`.`id`, `AppProduct`.`product_id`, `AppProduct`.`product_name`, `AppProduct`.`app_id`, `AppProduct`.`selling_price`, `AppProduct`.`enable`, `AppProduct`.`sequence` FROM `app_products` AS `AppProduct`   WHERE `app_id` = 1 AND id IN (1, 2, 3, 4, 5) AND `enable` = \'Y\'   ',
    5 => 'SHOW FULL COLUMNS FROM `manufacturer_brands`',


    7 => 'SELECT `AppProductStyle`.`id`, `AppProductStyle`.`app_product_id`, `AppProductStyle`.`app_id`, `AppProductStyle`.`selling_price`, `AppProductStyle`.`enable`, `AppProductStyle`.`sequence`, `AppProductStyle`.`product_style_id`, `AppProductStyle`.`is_default` FROM `app_product_styles` AS `AppProductStyle`   WHERE `app_id` = 1 AND `enable` = \'Y\' AND `app_product_id` = 2 AND `is_default` = 1   ORDER BY `sequence` ASC, `id` ASC  LIMIT 1',
    8 => 'SELECT `ProductStyle`.`id`, `ProductStyle`.`product_id`, `ProductStyle`.`app_id`, `ProductStyle`.`is_default`, `ProductStyle`.`colors`, `ProductStyle`.`color_name`, `ProductStyle`.`purchase_price`, `ProductStyle`.`selling_price`, `ProductStyle`.`enable`, `ProductStyle`.`sequence` FROM `product_styles` AS `ProductStyle`   WHERE `id` = 18 AND `enable` = \'Y\'   ',
    9 => 'SELECT `ProductStyleImage`.`id`, `ProductStyleImage`.`app_id`, `ProductStyleImage`.`product_id`, `ProductStyleImage`.`product_style_id`, `ProductStyleImage`.`side`, `ProductStyleImage`.`name`, `ProductStyleImage`.`imgurl`, `ProductStyleImage`.`thumburl`, `ProductStyleImage`.`sequence` FROM `product_style_images` AS `ProductStyleImage`   WHERE `app_id` = 1 AND `product_style_id` = 18 AND `side` = \'front\'   ORDER BY `sequence` ASC  LIMIT 1',
    10 => 'SELECT `Manufacturer`.`id`, `Manufacturer`.`name`, `Manufacturer`.`Abbreviation`, `Manufacturer`.`app_id`, `Manufacturer`.`enable`, `Manufacturer`.`type` FROM `manufacturers` AS `Manufacturer`   WHERE `app_id` = 1 AND `enable` = \'Y\' AND `id` = 6    LIMIT 1',
    11 => 'SELECT `ManufacturerBrand`.`id`, `ManufacturerBrand`.`manufacturer_id`, `ManufacturerBrand`.`name`, `ManufacturerBrand`.`brand_image`, `ManufacturerBrand`.`app_id`, `ManufacturerBrand`.`enable` FROM `manufacturer_brands` AS `ManufacturerBrand`   WHERE `app_id` = 1 AND `enable` = \'Y\' AND `manufacturer_id` = 7   ORDER BY `id` ASC  LIMIT 1',
    12 => 'SELECT `Product`.`id`, `Product`.`app_id`, `Product`.`manufacturer_id`, `Product`.`manufacturer_brand_id`, `Product`.`long_description`, `Product`.`small_description`, `Product`.`inventory`, `Product`.`enable`, `Product`.`sequence`, `Product`.`name`, `Product`.`manufacturer_sku`, `Product`.`sku`, `Product`.`icon`, `Product`.`weight` FROM `products` AS `Product`   WHERE `enable` = \'Y\' AND `id` = 3    LIMIT 1',

    13 => 'SELECT `AppProductStyle`.`id`, `AppProductStyle`.`app_product_id`, `AppProductStyle`.`app_id`, `AppProductStyle`.`selling_price`, `AppProductStyle`.`enable`, `AppProductStyle`.`sequence`, `AppProductStyle`.`product_style_id`, `AppProductStyle`.`is_default` FROM `app_product_styles` AS `AppProductStyle`   WHERE `app_id` = 1 AND `enable` = \'Y\' AND `app_product_id` = 3 AND `is_default` = 1   ORDER BY `sequence` ASC, `id` ASC  LIMIT 1',
    14 => 'SELECT `ProductStyle`.`id`, `ProductStyle`.`product_id`, `ProductStyle`.`app_id`, `ProductStyle`.`is_default`, `ProductStyle`.`colors`, `ProductStyle`.`color_name`, `ProductStyle`.`purchase_price`, `ProductStyle`.`selling_price`, `ProductStyle`.`enable`, `ProductStyle`.`sequence` FROM `product_styles` AS `ProductStyle`   WHERE `id` = 46 AND `enable` = \'Y\'   ',
    15 => 'SELECT `ProductStyleImage`.`id`, `ProductStyleImage`.`app_id`, `ProductStyleImage`.`product_id`, `ProductStyleImage`.`product_style_id`, `ProductStyleImage`.`side`, `ProductStyleImage`.`name`, `ProductStyleImage`.`imgurl`, `ProductStyleImage`.`thumburl`, `ProductStyleImage`.`sequence` FROM `product_style_images` AS `ProductStyleImage`   WHERE `app_id` = 1 AND `product_style_id` = 46 AND `side` = \'front\'   ORDER BY `sequence` ASC  LIMIT 1',
    16 => 'SELECT `Product`.`id`, `Product`.`app_id`, `Product`.`manufacturer_id`, `Product`.`manufacturer_brand_id`, `Product`.`long_description`, `Product`.`small_description`, `Product`.`inventory`, `Product`.`enable`, `Product`.`sequence`, `Product`.`name`, `Product`.`manufacturer_sku`, `Product`.`sku`, `Product`.`icon`, `Product`.`weight` FROM `products` AS `Product`   WHERE `enable` = \'Y\' AND `id` = 4    LIMIT 1',

    17 => 'SELECT `AppProductStyle`.`id`, `AppProductStyle`.`app_product_id`, `AppProductStyle`.`app_id`, `AppProductStyle`.`selling_price`, `AppProductStyle`.`enable`, `AppProductStyle`.`sequence`, `AppProductStyle`.`product_style_id`, `AppProductStyle`.`is_default` FROM `app_product_styles` AS `AppProductStyle`   WHERE `app_id` = 1 AND `enable` = \'Y\' AND `app_product_id` = 4 AND `is_default` = 1   ORDER BY `sequence` ASC, `id` ASC  LIMIT 1',
    18 => 'SELECT `ProductStyle`.`id`, `ProductStyle`.`product_id`, `ProductStyle`.`app_id`, `ProductStyle`.`is_default`, `ProductStyle`.`colors`, `ProductStyle`.`color_name`, `ProductStyle`.`purchase_price`, `ProductStyle`.`selling_price`, `ProductStyle`.`enable`, `ProductStyle`.`sequence` FROM `product_styles` AS `ProductStyle`   WHERE `id` = 63 AND `enable` = \'Y\'   ',
    19 => 'SELECT `ProductStyleImage`.`id`, `ProductStyleImage`.`app_id`, `ProductStyleImage`.`product_id`, `ProductStyleImage`.`product_style_id`, `ProductStyleImage`.`side`, `ProductStyleImage`.`name`, `ProductStyleImage`.`imgurl`, `ProductStyleImage`.`thumburl`, `ProductStyleImage`.`sequence` FROM `product_style_images` AS `ProductStyleImage`   WHERE `app_id` = 1 AND `product_style_id` = 63 AND `side` = \'front\'   ORDER BY `sequence` ASC  LIMIT 1',
    20 => 'SELECT `Manufacturer`.`id`, `Manufacturer`.`name`, `Manufacturer`.`Abbreviation`, `Manufacturer`.`app_id`, `Manufacturer`.`enable`, `Manufacturer`.`type` FROM `manufacturers` AS `Manufacturer`   WHERE `app_id` = 1 AND `enable` = \'Y\' AND `id` = 5    LIMIT 1',
    21 => 'SELECT `ManufacturerBrand`.`id`, `ManufacturerBrand`.`manufacturer_id`, `ManufacturerBrand`.`name`, `ManufacturerBrand`.`brand_image`, `ManufacturerBrand`.`app_id`, `ManufacturerBrand`.`enable` FROM `manufacturer_brands` AS `ManufacturerBrand`   WHERE `app_id` = 1 AND `enable` = \'Y\' AND `manufacturer_id` = 6   ORDER BY `id` ASC  LIMIT 1',
    22 => 'SELECT `Product`.`id`, `Product`.`app_id`, `Product`.`manufacturer_id`, `Product`.`manufacturer_brand_id`, `Product`.`long_description`, `Product`.`small_description`, `Product`.`inventory`, `Product`.`enable`, `Product`.`sequence`, `Product`.`name`, `Product`.`manufacturer_sku`, `Product`.`sku`, `Product`.`icon`, `Product`.`weight` FROM `products` AS `Product`   WHERE `enable` = \'Y\' AND `id` = 5    LIMIT 1',

    23 => 'SELECT `AppProductStyle`.`id`, `AppProductStyle`.`app_product_id`, `AppProductStyle`.`app_id`, `AppProductStyle`.`selling_price`, `AppProductStyle`.`enable`, `AppProductStyle`.`sequence`, `AppProductStyle`.`product_style_id`, `AppProductStyle`.`is_default` FROM `app_product_styles` AS `AppProductStyle`   WHERE `app_id` = 1 AND `enable` = \'Y\' AND `app_product_id` = 5 AND `is_default` = 1   ORDER BY `sequence` ASC, `id` ASC  LIMIT 1',
    24 => 'SELECT `ProductStyle`.`id`, `ProductStyle`.`product_id`, `ProductStyle`.`app_id`, `ProductStyle`.`is_default`, `ProductStyle`.`colors`, `ProductStyle`.`color_name`, `ProductStyle`.`purchase_price`, `ProductStyle`.`selling_price`, `ProductStyle`.`enable`, `ProductStyle`.`sequence` FROM `product_styles` AS `ProductStyle`   WHERE `id` = 68 AND `enable` = \'Y\'   ',
    25 => 'SELECT `ProductStyleImage`.`id`, `ProductStyleImage`.`app_id`, `ProductStyleImage`.`product_id`, `ProductStyleImage`.`product_style_id`, `ProductStyleImage`.`side`, `ProductStyleImage`.`name`, `ProductStyleImage`.`imgurl`, `ProductStyleImage`.`thumburl`, `ProductStyleImage`.`sequence` FROM `product_style_images` AS `ProductStyleImage`   WHERE `app_id` = 1 AND `product_style_id` = 68 AND `side` = \'front\'   ORDER BY `sequence` ASC  LIMIT 1',
Api Url
------

    /url

请求参数
------

      'get' =>
         array (
           'productCategoryId' => '1',
           'appKey' => 'wqdc',
           'url' => 'product/getList/1/',
         ),
响应
------

正常:

     {

     }


异常:

    {

    }




#产品详情

http://open.easytee.me/Product/Get/?appKey=wqdc&productId=2&productStyleId=18

    2 => 'SELECT `AppProductStyle`.`id`, `AppProductStyle`.`app_product_id`, `AppProductStyle`.`app_id`, `AppProductStyle`.`selling_price`, `AppProductStyle`.`enable`, `AppProductStyle`.`sequence`, `AppProductStyle`.`product_style_id`, `AppProductStyle`.`is_default` FROM `app_product_styles` AS `AppProductStyle`   WHERE `app_id` = 1 AND `enable` = \'Y\' AND `id` = 18   ORDER BY `sequence` ASC, `id` ASC ',
    3 => 'SELECT `ProductStyle`.`id`, `ProductStyle`.`product_id`, `ProductStyle`.`app_id`, `ProductStyle`.`is_default`, `ProductStyle`.`colors`, `ProductStyle`.`color_name`, `ProductStyle`.`purchase_price`, `ProductStyle`.`selling_price`, `ProductStyle`.`enable`, `ProductStyle`.`sequence` FROM `product_styles` AS `ProductStyle`   WHERE `id` = 18 AND `enable` = \'Y\'   ',
    4 => 'SELECT `ProductStyleSize`.`id`, `ProductStyleSize`.`product_id`, `ProductStyleSize`.`product_style_id`, `ProductStyleSize`.`size`, `ProductStyleSize`.`enable`, `ProductStyleSize`.`inventory`, `ProductStyleSize`.`increase`, `ProductStyleSize`.`app_id` FROM `product_style_sizes` AS `ProductStyleSize`   WHERE `app_id` = 1 AND `inventory` < 100 AND product_style_id = (18) AND `enable` = \'Y\'   ',
    5 => 'SELECT `ProductStyleImage`.`id`, `ProductStyleImage`.`app_id`, `ProductStyleImage`.`product_id`, `ProductStyleImage`.`product_style_id`, `ProductStyleImage`.`side`, `ProductStyleImage`.`name`, `ProductStyleImage`.`imgurl`, `ProductStyleImage`.`thumburl`, `ProductStyleImage`.`sequence` FROM `product_style_images` AS `ProductStyleImage`   WHERE `app_id` = 1 AND product_style_id = (18)   ORDER BY `sequence` ASC ',
    6 => 'SELECT `ProductStyleImageRegion`.`id`, `ProductStyleImageRegion`.`is_default`, `ProductStyleImageRegion`.`name`, `ProductStyleImageRegion`.`region`, `ProductStyleImageRegion`.`render_width_inches`, `ProductStyleImageRegion`.`product_style_image_id`, `ProductStyleImageRegion`.`sequence`, `ProductStyleImageRegion`.`product_style_id`, `ProductStyleImageRegion`.`product_id`, `ProductStyleImageRegion`.`print_mask`, `ProductStyleImageRegion`.`app_id` FROM `product_style_image_regions` AS `ProductStyleImageRegion`   WHERE `app_id` = 1 AND product_style_image_id = (69)   ORDER BY `sequence` ASC ',
    7 => 'SELECT `ProductStyleImageRegion`.`id`, `ProductStyleImageRegion`.`is_default`, `ProductStyleImageRegion`.`name`, `ProductStyleImageRegion`.`region`, `ProductStyleImageRegion`.`render_width_inches`, `ProductStyleImageRegion`.`product_style_image_id`, `ProductStyleImageRegion`.`sequence`, `ProductStyleImageRegion`.`product_style_id`, `ProductStyleImageRegion`.`product_id`, `ProductStyleImageRegion`.`print_mask`, `ProductStyleImageRegion`.`app_id` FROM `product_style_image_regions` AS `ProductStyleImageRegion`   WHERE `app_id` = 1 AND product_style_image_id = (70)   ORDER BY `sequence` ASC ',
    8 => 'SELECT `ProductStyleImageRegion`.`id`, `ProductStyleImageRegion`.`is_default`, `ProductStyleImageRegion`.`name`, `ProductStyleImageRegion`.`region`, `ProductStyleImageRegion`.`render_width_inches`, `ProductStyleImageRegion`.`product_style_image_id`, `ProductStyleImageRegion`.`sequence`, `ProductStyleImageRegion`.`product_style_id`, `ProductStyleImageRegion`.`product_id`, `ProductStyleImageRegion`.`print_mask`, `ProductStyleImageRegion`.`app_id` FROM `product_style_image_regions` AS `ProductStyleImageRegion`   WHERE `app_id` = 1 AND product_style_image_id = (71)   ORDER BY `sequence` ASC ',
    9 => 'SELECT `ProductStyleImageRegion`.`id`, `ProductStyleImageRegion`.`is_default`, `ProductStyleImageRegion`.`name`, `ProductStyleImageRegion`.`region`, `ProductStyleImageRegion`.`render_width_inches`, `ProductStyleImageRegion`.`product_style_image_id`, `ProductStyleImageRegion`.`sequence`, `ProductStyleImageRegion`.`product_style_id`, `ProductStyleImageRegion`.`product_id`, `ProductStyleImageRegion`.`print_mask`, `ProductStyleImageRegion`.`app_id` FROM `product_style_image_regions` AS `ProductStyleImageRegion`   WHERE `app_id` = 1 AND product_style_image_id = (72)   ORDER BY `sequence` ASC ',



Api Url
------

    /url

请求参数
------

      'get' =>
          array (
            'appKey' => 'wqdc',
            'productId' => '2',
            'productStyleId' => '18',
            'url' => 'Product/Get/',
          ),
          'se
响应
------

正常:

     {

     }


异常:

    {

    }
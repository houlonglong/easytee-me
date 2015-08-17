设计
======

#获取设计

http://open.easytee.me/Design/Get/?appKey=wqdc&designId=658&userToken=9fafd364225b156f23b4e17fe89d5e9763f94245

 8 => 'SELECT `User`.`id`, `User`.`app_id`, `User`.`app_uid`, `User`.`create_time`, `User`.`token`, `User`.`nick_name`, `User`.`image`, `User`.`mobile`, `User`.`money`, `User`.`money_disabled`, `User`.`money_all`, `User`.`identification` FROM `users` AS `User`   WHERE `app_id` = 1 AND `token` = \'9fafd364225b156f23b4e17fe89d5e9763f94245\'    LIMIT 1',
9 => 'SELECT `Design`.`id`, `Design`.`category_path`, `Design`.`name`, `Design`.`can_digital_print`, `Design`.`can_screen_print`, `Design`.`can_embroider`, `Design`.`bgcolor`, `Design`.`category_sort_order`, `Design`.`imgurl`, `Design`.`imgurl_cached`, `Design`.`thumburl`, `Design`.`thumburl_cached`, `Design`.`design`, `Design`.`app_id`, `Design`.`max_colors_per_side`, `Design`.`notes`, `Design`.`is_embroidery`, `Design`.`disable`, `Design`.`designer_version`, `Design`.`can_customize`, `Design`.`uid`, `Design`.`is_public`, `Design`.`colors`, `Design`.`svg_front`, `Design`.`svg_back`, `Design`.`svg_third`, `Design`.`svg_fourth`, `Design`.`is_update`, `Design`.`default_product_style_id` FROM `designs` AS `Design`   WHERE `app_id` = 1 AND `id` = 658 AND uid IN (202, 0)   ORDER BY `id` ASC ',
10 => 'SHOW FULL COLUMNS FROM `design_product_maps`',
11 => 'SELECT `DesignProductMap`.`product_id`, `DesignProductMap`.`product_style_id`, `DesignProductMap`.`design_id`, `DesignProductMap`.`app_id`, `DesignProductMap`.`id` FROM `design_product_maps` AS `DesignProductMap`   WHERE `app_id` = 1 AND `design_id` = 658   ',
12 => 'SHOW FULL COLUMNS FROM `canvas`',
13 => 'SELECT `Canvas`.`id`, `Canvas`.`table_name`, `Canvas`.`location`, `Canvas`.`width`, `Canvas`.`height`, `Canvas`.`bgcolor`, `Canvas`.`colors`, `Canvas`.`is_distressed`, `Canvas`.`shadow`, `Canvas`.`region_name`, `Canvas`.`disable_image_add`, `Canvas`.`disable_text_add`, `Canvas`.`disable_image_delete`, `Canvas`.`disable_text_delete`, `Canvas`.`imgurl`, `Canvas`.`app_id`, `Canvas`.`uid`, `Canvas`.`design_id`, `Canvas`.`region` FROM `canvas` AS `Canvas`   WHERE `app_id` = 1 AND `design_id` = 658   ORDER BY `id` ASC ',
14 => 'SHOW FULL COLUMNS FROM `canvas_objects`',
15 => 'SELECT `CanvasObject`.`id`, `CanvasObject`.`table_name`, `CanvasObject`.`location`, `CanvasObject`.`canvas_id`, `CanvasObject`.`x`, `CanvasObject`.`y`, `CanvasObject`.`z`, `CanvasObject`.`width`, `CanvasObject`.`height`, `CanvasObject`.`envelope`, `CanvasObject`.`rotate`, `CanvasObject`.`value`, `CanvasObject`.`colors`, `CanvasObject`.`stroke_width`, `CanvasObject`.`shape`, `CanvasObject`.`sweep`, `CanvasObject`.`wrap_mode`, `CanvasObject`.`wrap_amount`, `CanvasObject`.`fliph`, `CanvasObject`.`flipv`, `CanvasObject`.`kerning`, `CanvasObject`.`disable`, `CanvasObject`.`type`, `CanvasObject`.`app_id`, `CanvasObject`.`path`, `CanvasObject`.`original_path`, `CanvasObject`.`is_public`, `CanvasObject`.`art_id`, `CanvasObject`.`private_fields` FROM `canvas_objects` AS `CanvasObject`   WHERE `app_id` = 1 AND canvas_id = (1002)   ',
16 => 'SELECT `Font`.`id`, `Font`.`name`, `Font`.`swfpath`, `Font`.`jspath`, `Font`.`svgpath`, `Font`.`gifpath`, `Font`.`app_id`, `Font`.`sequence`, `Font`.`name_cn`, `Font`.`config` FROM `fonts` AS `Font`   WHERE app_id IN (1, 0) AND id = (136)   ORDER BY `sequence` ASC, `id` ASC ',
17 => 'SELECT `FontCategoryMap`.`id`, `FontCategoryMap`.`font_id`, `FontCategoryMap`.`font_category_id`, `FontCategoryMap`.`app_id` FROM `font_category_maps` AS `FontCategoryMap`   WHERE `app_id` = 1 AND `font_id` = 136   ',
18 => 'SELECT `FontCategory`.`id`, `FontCategory`.`name`, `FontCategory`.`is_embroidery`, `FontCategory`.`font_count`, `FontCategory`.`sequence`, `FontCategory`.`app_id`, `FontCategory`.`is_zhcn` FROM `font_categories` AS `FontCategory`   WHERE `app_id` = 1 AND id = (756)   ',


Api Url
------

    /url

请求参数
------
 array (
      'appKey' => 'wqdc',
      'designId' => '658',
      'userToken' => '9fafd364225b156f23b4e17fe89d5e9763f94245',
      'url' => 'Design/Get/',
    ),

响应
------

正常:

     {

     }


异常:

    {

    }


#保存设计

http://open.easytee.me/design/save?appKey=wqdc&userToken=


 11 => 'SELECT `Design`.`id`, `Design`.`category_path`, `Design`.`name`, `Design`.`can_digital_print`, `Design`.`can_screen_print`, `Design`.`can_embroider`, `Design`.`bgcolor`, `Design`.`category_sort_order`, `Design`.`imgurl`, `Design`.`imgurl_cached`, `Design`.`thumburl`, `Design`.`thumburl_cached`, `Design`.`design`, `Design`.`app_id`, `Design`.`max_colors_per_side`, `Design`.`notes`, `Design`.`is_embroidery`, `Design`.`disable`, `Design`.`designer_version`, `Design`.`can_customize`, `Design`.`uid`, `Design`.`is_public`, `Design`.`colors`, `Design`.`svg_front`, `Design`.`svg_back`, `Design`.`svg_third`, `Design`.`svg_fourth`, `Design`.`is_update`, `Design`.`default_product_style_id` FROM `designs` AS `Design`   WHERE `id` = 657    LIMIT 1',
    12 => 'SELECT `AppProductStyle`.`id`, `AppProductStyle`.`app_product_id`, `AppProductStyle`.`app_id`, `AppProductStyle`.`selling_price`, `AppProductStyle`.`enable`, `AppProductStyle`.`sequence`, `AppProductStyle`.`product_style_id`, `AppProductStyle`.`is_default` FROM `app_product_styles` AS `AppProductStyle`   WHERE `app_id` = 1 AND `enable` = \'Y\' AND `id` = 18   ORDER BY `sequence` ASC, `id` ASC ',
    13 => 'SELECT `Canvas`.`id`, `Canvas`.`table_name`, `Canvas`.`location`, `Canvas`.`width`, `Canvas`.`height`, `Canvas`.`bgcolor`, `Canvas`.`colors`, `Canvas`.`is_distressed`, `Canvas`.`shadow`, `Canvas`.`region_name`, `Canvas`.`disable_image_add`, `Canvas`.`disable_text_add`, `Canvas`.`disable_image_delete`, `Canvas`.`disable_text_delete`, `Canvas`.`imgurl`, `Canvas`.`app_id`, `Canvas`.`uid`, `Canvas`.`design_id`, `Canvas`.`region` FROM `canvas` AS `Canvas`   WHERE `app_id` = 1 AND `id` = -1    LIMIT 1',
    14 => 'SHOW FULL COLUMNS FROM `canvas_objects`',
    15 => 'BEGIN',
    16 => 'SELECT `Canvas`.`id` FROM `canvas` AS `Canvas`   WHERE `app_id` = 1 AND `design_id` = 657   ORDER BY `id` ASC ',
    17 => 'SELECT `CanvasObject`.`id` FROM `canvas_objects` AS `CanvasObject`   WHERE canvas_id = (1001)   ',
    18 => 'DELETE `CanvasObject` FROM `canvas_objects` AS `CanvasObject`   WHERE `CanvasObject`.`id` = (1088)',
    19 => 'SELECT COUNT(*) AS `count` FROM `canvas` AS `Canvas`   WHERE `Canvas`.`id` = 1001   ',
    20 => 'DELETE `Canvas` FROM `canvas` AS `Canvas`   WHERE `Canvas`.`id` = (1001)',
    21 => 'SELECT `DesignSvg`.`id` FROM `design_svgs` AS `DesignSvg`   WHERE `design_id` = 657   ',
    22 => 'SELECT COUNT(*) AS `count` FROM `designs` AS `Design`   WHERE `Design`.`id` = 657   ',
    23 => 'SELECT COUNT(*) AS `count` FROM `designs` AS `Design`   WHERE `Design`.`id` = 657   ',
    24 => 'UPDATE `designs` SET `is_embroidery` = 0, `name` = \'未命名\', `designer_version` = \'HTML5DS\', `notes` = \'\', `uid` = 0, `app_id` = 1, `id` = 657, `default_product_style_id` = 18, `colors` = 2  WHERE `designs`.`id` = 657',
    25 => 'SHOW FULL COLUMNS FROM `design_product_maps`',
    26 => 'SELECT `DesignProductMap`.`product_id`, `DesignProductMap`.`product_style_id`, `DesignProductMap`.`design_id`, `DesignProductMap`.`app_id`, `DesignProductMap`.`id` FROM `design_product_maps` AS `DesignProductMap`   WHERE `app_id` = 1 AND `design_id` = 657 AND `product_id` = 2 AND `product_style_id` = 18   ',
    27 => 'SELECT `ProductStyle`.`id`, `ProductStyle`.`product_id`, `ProductStyle`.`app_id`, `ProductStyle`.`is_default`, `ProductStyle`.`colors`, `ProductStyle`.`color_name`, `ProductStyle`.`purchase_price`, `ProductStyle`.`selling_price`, `ProductStyle`.`enable`, `ProductStyle`.`sequence` FROM `product_styles` AS `ProductStyle`   WHERE `id` = 18 AND `enable` = \'Y\'   ',
    28 => 'INSERT INTO `design_svgs` (`svg_front`, `svg_back`, `svg_third`, `svg_fourth`, `design_id`) VALUES (\'<svg xmlns=\\"http://www.w3.org/2000/svg\\" xmlns:xlink=\\"http://www.w3.org/1999/xlink\\" height=\\"270\\" version=\\"1.1\\" width=\\"202.5\\" id=\\"svg1\\" style=\\"overflow: hidden; position: relative; height: 270px;\\" preserveAspectRatio=\\"xMinYMin\\"><g id=\\"designGroup1\\" style=\\"clip-path:url(\\\'#designMask1\\\')\\" transform=\\"translate(0,0) scale(1,1)\\"><image x=\\"101.25\\" y=\\"135\\" width=\\"141.75\\" height=\\"98.18404351767904\\" preserveAspectRatio=\\"none\\" xlink:href=\\"16647374\\" id=\\"DsElement2\\" transform=\\"matrix(1.4092,0,0,1.4092,-141.3036,-190.4172)\\" style=\\"-webkit-tap-highlight-color: rgba(0, 0, 0, 0);\\" stroke-width=\\"0.7096370463078848\\"/></g><rect x=\\"1.375\\" y=\\"-0.1790571169537536\\" width=\\"199.75\\" height=\\"138.35811423390751\\" r=\\"0\\" rx=\\"0\\" ry=\\"0\\" fill=\\"#000000\\" stroke=\\"#ffffff\\" id=\\"BoundingBoxRect\\" transform=\\"matrix(1,0,0,1,0,0)\\" fill-opacity=\\"0\\" class=\\"whiteLineClass\\" vector-effect=\\"non-scaling-stroke\\" stroke-width=\\"2\\" style=\\"-webkit-tap-highlight-color: rgba(0, 0, 0, 0); fill-opacity: 0; display: none;\\"/><rect x=\\"1.375\\" y=\\"-0.1790571169537536\\" width=\\"199.75\\" height=\\"138.35811423390751\\" r=\\"0\\" rx=\\"0\\" ry=\\"0\\" fill=\\"#000000\\" stroke=\\"#000000\\" id=\\"BoundingBoxRect\\" transform=\\"matrix(1,0,0,1,0,0)\\" fill-opacity=\\"0\\" class=\\"dashedLineClass\\" vector-effect=\\"non-scaling-stroke\\" stroke-width=\\"1\\" stroke-dasharray=\\"5,5\\" style=\\"-webkit-tap-highlight-color: rgba(0, 0, 0, 0); fill-opacity: 0; display: none;\\"/></svg>\', NULL, NULL, NULL, 657)',
    29 => 'SELECT LAST_INSERT_ID() AS insertID',
    30 => 'INSERT INTO `canvas` (`is_distressed`, `shadow`, `disable_image_add`, `disable_text_add`, `disable_image_delete`, `disable_text_delete`, `region_name`, `region`, `location`, `width`, `height`, `bgcolor`, `app_id`, `design_id`, `colors`) VALUES (0, \'false\', 0, 0, 0, 0, \'前胸\', \'69\', \'front\', 436, 436, \'DEB7CA\', 1, 657, 2)',
    31 => 'SELECT LAST_INSERT_ID() AS insertID',
    32 => 'INSERT INTO `canvas_objects` (`z`, `envelope`, `rotate`, `colors`, `stroke_width`, `sweep`, `wrap_mode`, `wrap_amount`, `fliph`, `flipv`, `kerning`, `disable`, `is_public`, `art_id`, `x`, `width`, `height`, `location`, `app_id`, `private_fields`, `type`, `canvas_id`) VALUES (\'0.000000\', 0, \'0.000000\', \'{\\"color1\\":\\"F68B1F\\",\\"color2\\":\\"FFFFFF\\",\\"colors\\":[]}\', \'0.000000\', \'0.000000\', 0, 0, 0, 0, 0, \'{\\"disable_color_select\\":0,\\"disable_size_width\\":0,\\"disable_size_height\\":0,\\"disable_size_rotation\\":0,\\"disable_position_align\\":0,\\"disable_position_flip\\":0,\\"disable_position_nudge\\":0,\\"disable_layer_frontback\\":0}\', 0, 16647374, 2, 430, 297, \'FRONT\', 1, \'{\\"desaturate\\":\\"\\",\\"canvas_art_rendered\\":0,\\"art_path\\":0}\', \'art\', 1003)',
    33 => 'SELECT LAST_INSERT_ID() AS insertID',
    34 => 'SELECT `Activity`.`id`, `Activity`.`uid`, `Activity`.`app_id`, `Activity`.`design_id`, `Activity`.`name`, `Activity`.`sales_target`, `Activity`.`sales_count`, `Activity`.`start_time`, `Activity`.`end_time`, `Activity`.`real_end_time`, `Activity`.`abstract`, `Activity`.`description`, `Activity`.`pass`, `Activity`.`free_delivery`, `Activity`.`delivery_type`, `Activity`.`delivery_address`, `Activity`.`custom`, `Activity`.`can_custom`, `Activity`.`default_product_style_id`, `Activity`.`total`, `Activity`.`type`, `Activity`.`address_id`, `Activity`.`status`, `Activity`.`notes`, `Activity`.`free_postage`, `Activity`.`deadline`, `Activity`.`profie` FROM `activities` AS `Activity`   WHERE `design_id` = 657    LIMIT 1',
    35 => 'SELECT COUNT(*) AS `count` FROM `activities` AS `Activity`   WHERE `Activity`.`id` = 657   ',
    36 => 'SELECT COUNT(*) AS `count` FROM `activities` AS `Activity`   WHERE `Activity`.`id` = 657   ',
    37 => 'UPDATE `activities` SET `id` = 657, `uid` = 0, `default_product_style_id` = 18  WHERE `activities`.`id` = 657',
    38 => 'SELECT `ActivityProductStyles`.`id`, `ActivityProductStyles`.`activity_id`, `ActivityProductStyles`.`app_product_id`, `ActivityProductStyles`.`app_product_style_id`, `ActivityProductStyles`.`image`, `ActivityProductStyles`.`sell_price`, `ActivityProductStyles`.`product_style_id`, `ActivityProductStyles`.`product_id` FROM `activity_product_styles` AS `ActivityProductStyles`   WHERE `activity_id` = 657   ',
    39 => 'INSERT INTO `activity_product_styles` (`app_product_id`, `app_product_style_id`, `product_id`, `product_style_id`, `sell_price`, `activity_id`) VALUES (2, 18, 2, 18, 55.28, 657)',
    40 => 'SELECT LAST_INSERT_ID() AS insertID',
    41 => 'SHOW FULL COLUMNS FROM `manufacturer_brands`',
    42 => 'SELECT `ManufacturerBrand`.`id`, `ManufacturerBrand`.`manufacturer_id`, `ManufacturerBrand`.`name`, `ManufacturerBrand`.`brand_image`, `ManufacturerBrand`.`app_id`, `ManufacturerBrand`.`enable` FROM `manufacturer_brands` AS `ManufacturerBrand`   WHERE `app_id` = 1 AND `enable` = \'Y\' AND `manufacturer_id` = 0   ORDER BY `id` ASC  LIMIT 1',
    43 => 'COMMIT',


Api Url
------

    /url

请求参数
------
 'post' =>
     array (
       'xmlDesign' => '<UserDesign><designs designer_version="HTML5DS" admin="None" is_embroidery="0" design_id="657" name="未命名" product_style_id="18" notes=""/><canvases canvas_id="-1"   distress_id="" is_distressed="0"  region="前胸" region_id="69" location="front" width="436" height="436" bgcolor="DEB7CA" shadow="false" /><canvas_art  x = "2" width = "430" height = "297" art_id = "16647374" color1 = "F68B1F" color2 = "FFFFFF" location = "FRONT"/></UserDesign>',
       'svgfront' => '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="270" version="1.1" width="202.5" id="svg1" style="overflow: hidden; position: relative; height: 270px;" preserveAspectRatio="xMinYMin"><g id="designGroup1" style="clip-path:url(\'#designMask1\')" transform="translate(0,0) scale(1,1)"><image x="101.25" y="135" width="141.75" height="98.18404351767904" preserveAspectRatio="none" xlink:href="16647374" id="DsElement2" transform="matrix(1.4092,0,0,1.4092,-141.3036,-190.4172)" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" stroke-width="0.7096370463078848"/></g><rect x="1.375" y="-0.1790571169537536" width="199.75" height="138.35811423390751" r="0" rx="0" ry="0" fill="#000000" stroke="#ffffff" id="BoundingBoxRect" transform="matrix(1,0,0,1,0,0)" fill-opacity="0" class="whiteLineClass" vector-effect="non-scaling-stroke" stroke-width="2" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); fill-opacity: 0; display: none;"/><rect x="1.375" y="-0.1790571169537536" width="199.75" height="138.35811423390751" r="0" rx="0" ry="0" fill="#000000" stroke="#000000" id="BoundingBoxRect" transform="matrix(1,0,0,1,0,0)" fill-opacity="0" class="dashedLineClass" vector-effect="non-scaling-stroke" stroke-width="1" stroke-dasharray="5,5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); fill-opacity: 0; display: none;"/></svg>',
     ),
     'get' =>
     array (
       'appKey' => 'wqdc',
       'userToken' => '',
       'url' => 'design/save',
     ),


响应
------

正常:

     {

     }


异常:

    {

    }
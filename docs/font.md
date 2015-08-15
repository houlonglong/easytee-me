字体
======

#获取字体JS

http://open.easytee.me/font/getJsFont/?appKey=wqdc&fontid=136&text=%E8%AF%B7%E8%BE%93%E5%85%A5%E6%96%87%E5%AD%97


 2 => 'SELECT `Font`.`id`, `Font`.`name`, `Font`.`swfpath`, `Font`.`jspath`, `Font`.`svgpath`, `Font`.`gifpath`, `Font`.`app_id`, `Font`.`sequence`, `Font`.`name_cn`, `Font`.`config` FROM `fonts` AS `Font`   WHERE app_id IN (1, 0) AND id = (136)   ORDER BY `sequence` ASC, `id` ASC ',
    3 => 'SELECT `Font`.`id`, `Font`.`name`, `Font`.`swfpath`, `Font`.`jspath`, `Font`.`svgpath`, `Font`.`gifpath`, `Font`.`app_id`, `Font`.`sequence`, `Font`.`name_cn`, `Font`.`config` FROM `fonts` AS `Font`   WHERE `id` = 136    LIMIT 1',
    4 => 'SHOW FULL COLUMNS FROM `font_glyphs`',
    5 => 'SELECT CHARACTER_SET_NAME FROM INFORMATION_SCHEMA.COLLATIONS WHERE COLLATION_NAME= \'utf8_bin\';',
    6 => 'SELECT CHARACTER_SET_NAME FROM INFORMATION_SCHEMA.COLLATIONS WHERE COLLATION_NAME= \'utf8_general_ci\';',
    7 => 'SELECT `FontGlyphs`.`id`, `FontGlyphs`.`font_id`, `FontGlyphs`.`glyph`, `FontGlyphs`.`w`, `FontGlyphs`.`str` FROM `font_glyphs` AS `FontGlyphs`   WHERE `font_id` = 136 AND binary str IN (\'请\', \'输\', \'入\', \'文\', \'字\')   ',


Api Url
------

    /url

请求参数
------

       'get' =>
         array (
           'appKey' => 'wqdc',
           'fontid' => '136',
           'text' => '请输入文字',
           'url' => 'font/getJsFont/',
         ),

响应
------

正常:

     {

     }


异常:

    {

    }
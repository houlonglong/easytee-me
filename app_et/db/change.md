
# 李晓梅 2015-08-18

    CREATE TABLE `audit_reasons` (
     `activity_id` int(11) DEFAULT NULL,
     `create_time` datetime DEFAULT NULL,
     `reason` int(11) DEFAULT NULL,
     `notes` varchar(255) DEFAULT NULL,
     `username` varchar(255) DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# 李晓梅 2015-08-19

   ALTER TABLE `activities`
   DROP COLUMN `update_data`,
   ADD COLUMN `update_data`  int(1) NULL DEFAULT 0 COMMENT '资料是否有更新，0没更新，1更新' AFTER `profie`;



# 周树先 2015-08-18

	ALTER TABLE `product_styles` ADD `color` CHAR(6)  NULL  DEFAULT NULL  AFTER `colors`;
	ALTER TABLE `product_style_image_regions` ADD `h` INT  NULL  DEFAULT NULL  AFTER `region`;
	ALTER TABLE `product_style_image_regions` ADD `w` INT  NULL  DEFAULT NULL  AFTER `region`;
	ALTER TABLE `product_style_image_regions` ADD `y` INT  NULL  DEFAULT NULL  AFTER `region`;
	ALTER TABLE `product_style_image_regions` ADD `x` INT  NULL  DEFAULT NULL  AFTER `region`;


<?php
$rows = <<<EOT
admin/system/log/index|系统日志|admin_list
admin/system/log/detail|系统日志|admin_form
admin/system/site/info|系统信息|admin_default
admin/system/deploy|部署管理|admin_default
user/reg|用户注册
user/forgetpass|忘记密码
user/auth/login|用户登陆
admin/index|管理首页
admin/auth/login|管理登陆
admin/deamon/task/monitor|任务监控
admin/deamon/task/index|任务管理|admin_list
admin/activity/detail|众筹detail|admin_form
admin/activity/order_detail|订单详情|admin_form
admin/activity/order|订单管理|admin_list
admin/activity/index|众筹管理|admin_list
admin/production/index|待生产|admin_list
admin/production/ongoing|生产中|admin_list
admin/production/shipped|已发货|admin_list
admin/aftersale/index|售后管理|admin_list
admin/font/font/index|字体管理|admin_list
admin/font/category/index|字体分类|admin_list
admin/site/art/index|素材管理|admin_list
admin/site/art/detail|素材详情|admin_form
admin/site/product/style/image/color/index|产品款式颜色图片|admin_list
admin/site/activity/product/style/image/index|活动设计图片|admin_list
admin/site/design/index|设计管理|admin_list
admin/site/design/detail|设计详情|admin_form
admin/activity/pending_audit|待审核|admin_list

admin/activity/audit|已审核|admin_list
admin/activity/audit_unpass|审核未通过|admin_list
admin/activity/audit_ongoing|审核通过进行中|admin_list
admin/activity/success|成功的众筹|admin_list
admin/activity/fail|失败的众筹|admin_list


admin/product/product/index|产品管理|admin_list|admin/product/product
admin/product/category/index|产品分类管理|admin_list|admin/product/category
admin/product/product/detail|产品详情|admin_default


EOT;

include_once(__DIR__."/../init.php");
get_controls($rows);

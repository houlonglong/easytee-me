<?php
include_once __DIR__.'/../app_et/init.php';

/**
 * PtLib\gen_control("test","title","admin_default");
 * PtLib\gen_control("test","title","admin_form");
 * PtLib\gen_control("test","title","admin_list");
 */

PtLib\gen_model("ec/bargain","砍价");
PtLib\gen_model("admin/system/log","系统日志");
PtLib\gen_control("admin/system/log/index","系统日志","admin_list");
PtLib\gen_control("admin/system/log/detail","系统日志","admin_form");
PtLib\gen_model("tools/mongolog","Mongo日志");
PtLib\gen_model("tshirt/cost","订制成功");
PtLib\gen_model("admin/ui","管理界面UI");
PtLib\gen_model("user","用户管理");
PtLib\gen_model("user/auth","用户认证");
PtLib\gen_model("admin/user","管理员管理");
PtLib\gen_model("admin/auth","管理认证");
PtLib\gen_model("admin/tools/pic","图片上传");
PtLib\gen_model("tools/captcha","验证码");

PtLib\gen_model("activity","活动");
PtLib\gen_model("init","初始化");
PtLib\gen_model("product","产品");
PtLib\gen_model("design","设计");
PtLib\gen_model("font","字体");
PtLib\gen_model("art","素材");

PtLib\gen_control("user/reg",  "用户注册");
PtLib\gen_control("user/forgetpass",  "忘记密码");
PtLib\gen_control("user/auth/login","用户登陆");
PtLib\gen_control("admin/index","管理首页");
PtLib\gen_control("admin/auth/login","管理登陆");
PtLib\gen_control("admin/auth/logout","管理退出");
PtLib\gen_control("admin/deamon/task/monitor","任务监控");
PtLib\gen_control("admin/deamon/task/manage","任务管理");


PtLib\gen_model("admin/activity","众筹管理");
PtLib\gen_model("admin/production","生产管理");
PtLib\gen_model("admin/aftersale","售后管理");
PtLib\gen_model("admin/order","订单管理");
PtLib\gen_model("activity","活动");
PtLib\gen_model("init","初始化");
PtLib\gen_model("product","产品");
PtLib\gen_model("design","设计");
PtLib\gen_model("font","字体");
PtLib\gen_model("art","素材");


PtLib\gen_control("admin/activity/detail","众筹detail","admin_form");
PtLib\gen_control("admin/activity/order","订单管理","admin_list");
PtLib\gen_control("admin/activity/index","众筹管理","admin_list");
PtLib\gen_control("admin/production/index","生产管理","admin_list");
PtLib\gen_control("admin/aftersale/index","售后管理","admin_list");
PtLib\gen_control("admin/product/product/index","产品管理","admin_list");
PtLib\gen_control("admin/product/category/index","产品分类","admin_list");
PtLib\gen_control("admin/font/font/index","字体管理","admin_list");
PtLib\gen_control("admin/font/category/index","字体分类","admin_list");


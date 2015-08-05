<?php
include_once __DIR__.'/../app_et/init.php';

PtLib\gen_model("ec/bargain11","砍价");exit;

PtLib\gen_model("admin/system/log","系统日志");
PtLib\gen_control("admin/system/log/index","系统日志","admin_list");
PtLib\gen_control("admin/system/log/detail","系统日志","admin_form");

PtLib\gen_model("tools/mongolog","Mongo日志");

PtLib\gen_model("tshirt/cost","订制成功");
exit;


PtLib\gen_model("admin/ui","管理界面UI");

PtLib\gen_model("user","用户管理");
PtLib\gen_model("user/auth","用户认证");
PtLib\gen_model("admin/user","管理员管理");
PtLib\gen_model("admin/auth","管理认证");
PtLib\gen_model("admin/tools/pic","图片上传");
PtLib\gen_model("tools/captcha","验证码");

PtLib\gen_control("user/reg",  "用户注册");
PtLib\gen_control("user/forgetpass",  "忘记密码");
PtLib\gen_control("user/auth/login","用户登陆");
PtLib\gen_control("admin/index","管理首页");
PtLib\gen_control("admin/auth/login","管理登陆");
PtLib\gen_control("admin/auth/logout","管理退出");
PtLib\gen_control("admin/deamon/task/monitor","任务监控");
PtLib\gen_control("admin/deamon/task/manage","任务管理");

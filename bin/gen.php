<?php
include_once __DIR__.'/../app/init.php';

Pt\gen_model("ec/bargain","砍价");
Pt\gen_model("admin/system/log","系统日志");
Pt\gen_control("admin/system/log/index","系统日志","admin_list");
Pt\gen_control("admin/system/log/detail","系统日志","admin_form");

Pt\gen_model("tools/mongolog","Mongo日志");

Pt\gen_model("tshirt/cost","订制成功");
exit;


Pt\gen_model("admin/ui","管理界面UI");

Pt\gen_model("user","用户管理");
Pt\gen_model("user/auth","用户认证");
Pt\gen_model("admin/user","管理员管理");
Pt\gen_model("admin/auth","管理认证");
Pt\gen_model("admin/tools/pic","图片上传");
Pt\gen_model("tools/captcha","验证码");

Pt\gen_control("user/reg",  "用户注册");
Pt\gen_control("user/forgetpass",  "忘记密码");
Pt\gen_control("user/auth/login","用户登陆");
Pt\gen_control("admin/index","管理首页");
Pt\gen_control("admin/auth/login","管理登陆");
Pt\gen_control("admin/auth/logout","管理退出");
Pt\gen_control("admin/deamon/task/monitor","任务监控");
Pt\gen_control("admin/deamon/task/manage","任务管理");

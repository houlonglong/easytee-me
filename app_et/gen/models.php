
<?php
$rows = <<<EOT
ec/bargain|砍价
admin/system/log|系统日志
admin/system/deploy|系统部署
tools/mongolog|Mongo日志
tshirt/cost|订制成功
admin/ui|管理界面UI
user|用户管理
user/setting|用户中心
user/address|用户收货地址
user/widthdraw|用户提现
user/finance|用户财务
user/activity|用户活动
user/order|用户订单

user/auth|用户认证
user/auth/weibo|微博登录
user/register|用户注册
admin/user|管理员管理
admin/auth|管理认证
service/pic|图片服务
admin/tools/pic|图片上传
tools/captcha|验证码
activity|活动
init|初始化
product|产品
design|设计
design/tool/beta|设计工具
campus|易衫开学礼
font|字体
art|素材
admin/deamon/task|后台任务
admin/activity|众筹管理
admin/product|产品管理
admin/production|生产管理
admin/aftersale|售后管理
admin/order|订单管理
init|初始化
activity|活动
activity/beta|活动beta

product|产品
art|素材
font|字体
cost|成本
admin/site/design|设计
admin/site/art|素材
admin/font/font|字体
admin/font/category|字体分类
admin/production/step|待生产
admin/production/index|待生产
admin/production/ongoing|生产中
admin/production/shipped|已发货
admin/site/product/style/image/color|产品款式颜色图片
admin/site/activity/product/style/image|活动设计图片
admin/product/style|产品款式
admin/product/image|产品图片
admin/sales/after_sales|等待处理
admin/user/withdrawapply|提现申请
admin/design/tool|设计工具

aliyun/oss|阿里云上传
tools/sms|短信发送
tools/email|发送邮件
tools/svg/convert|svg转PNG

tools/db/merge1|数据库迁移
order/pay/wechat|微信支付
order/pay/alipay|支付宝支付
order/pay|支付
order/ship|发货
order/beta|订单确认
order/goods|订单产品
order|订单

EOT;

include_once(__DIR__."/../init.php");
get_models($rows);
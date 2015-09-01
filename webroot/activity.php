<?php
$activity = Model_Activity::get_detail();
//print_pre($activity);
$product_info = Model_Activity::get_product_styles($activity['id']);
//print_pre($product_info);
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <meta name="renderer" content="webkit">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>英雄联盟专题-易衫网</title>
    <meta name="keywords" content="定制T恤,定制T恤,T恤,T恤丝网印刷,刺绣,数码印刷,设计,定制服装"/>
    <meta name="description" content="使用易衫网的T恤在线设计工具来创建您的作品.您可以上传自己的设计,或者使用我们丰富的素材库和众多的各种字体."/>
    <link rel="stylesheet" href="/resources/public/css/bootstrap.min.css">
    <link rel="stylesheet" href="/resources/public/css/bootstrap-theme.css">

    <link rel="stylesheet" href="/resources/public/css/public.css">
    <!--[if lt IE 9]>
    <script src="/resources/public/js/ie8-responsive-file-warning.js"></script>
    <![endif]-->
    <!--[if lt IE 9]>
    <script src="/resources/public/js/html5shiv.min.js"></script>
    <script src="/resources/public/js/respond.min.js"></script>
    <![endif]-->
    <!--[if lte IE 6]>
    <link rel="stylesheet" type="text/css" href="/resources/public/css/bootstrap-ie6.min.css">
    <![endif]-->
    <link rel="apple-touch-icon" href="/resources/public/image/apple-touch-icon.png">
    <link rel="icon" href="/resources/public/image/favicon.ico">
    <script src="/resources/public/js/jquery.min.js"></script>
</head>    <script src="/resources/public/js/jquery.cookie.js"></script>
<link rel="stylesheet" type="text/css" href="/resources/theme/activity/css/activity.css">
<body>
<style>
    #navbar .open a{
        color:#636161
    }
</style>
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">切换导航</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand site-logo" href="/">易衫网</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <li><a href="/design" class="design">开始设计</a></li>
                <!--<li><a href="/invite">邀请朋友</a></li>-->
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li><a href="/account/order/">我的订单</a></li>
                <li><a href="/account/">卖家中心</a></li>
                <li class="dropdown  pull-right">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">你好，易衫网 <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="/account/setting">账户设置</a></li>
                        <li><a href="/Account/moneyflow/">收支明细</a></li>
                        <li class="divider"></li>
                        <li><a href="/login/loginout">注销</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>        <div class="page-wrapper activity">
    <div class="container">
        <div class="row">
            <div class="col-sm-8">
                <div class="row">
                    <div class="col-sm-12">
                        <h1>英雄联盟专题</h1>
                        <div class="activity-author">发起人：<span>18751903667</span> <span
                                class="iconfont icon-vcode" style="background-color:#888;"> 未认证</span>
                        </div>
                    </div>
                </div>
                <div class="row activity-showbox">
                    <div class="col-sm-12">
                        <div class="activity-showbox-photo">
                            <svg></svg>
                            <div class="activity-loading"></div>
                        </div>

                        <ul class="activity-showbox-imglist">
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="row activity-property">
                    <div class="col-sm-12">
                        <label class="activity-label">款式</label>
                        <ul id="chang-product" class="clearfix">
                        </ul>
                    </div>
                    <div class="col-sm-12">
                        <label class="activity-label">颜色</label>
                        <ul id="chang-style">

                        </ul>
                    </div>
                    <div class="col-sm-12">
                        <p>本活动的目标是在2015-09-06 18:20:36前售出10件。</p>
                                <span
                                    style="color: #8D8D8D">没有任何风险的预购：若活动失败，你支付的费用将在活动结束后的三个工作日内返还到你的账户。即使在活动进行中时，您也可以随时取消订单！</span>
                    </div>
                    <div class="col-sm-12">
                        <a href="javescript:;" class="btn btn-default pull-right" style="margin-top: 25px;"
                           id="showsize">尺码参考表</a>
                        <label class="activity-label">售价</label>

                        <p class="activity-price">￥<em></em></p>
                    </div>
                    <div class="col-sm-12 activity-time">
                        <div class="progress">
                            <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60"
                                 aria-valuemin="0" aria-valuemax="100"
                                 style="width: 0%;min-width:2em">
                                0%                                    </div>
                        </div>
                        <ul>
                            <li>
                                <!--TODO 时间小于一天的，时间单位为：小时，小于一个小时的，时间单位为分钟，小于分钟的，单位为秒-->
                                <h4>6天</h4>

                                <p>剩余时间</p>
                            </li>
                            <li>
                                <h4>0 件</h4>

                                <p>当前预售</p>
                            </li>
                        </ul>
                    </div>
                    <div class="col-sm-12">
                        <button
                            class="btn btn-warning btn-lg btn-block"                                     id="Preorder">立即预购</button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12">
                        <div class="activity-share clearfix">
                            <div class="pull-left" id="YF-share">
                                <a href="javascript:void(0)" title="微博分享" share="weibo"><span class="iconfont icon-weibo"></span></a>
                                <a href="javascript:void(0)" title="qq分享" share="qq"><span class="iconfont icon-qq"></span></a>
                                <a href="javascript:void(0)" title="微信分享" share="wechat"><span class="iconfont icon-iconfontweixin"></span></a>
                                <a href="javascript:void(0)" title="豆瓣分享" share="douban"><span class="iconfont icon-douban"></span></a>
                                <a href="javascript:void(0)" title="人人分享" share="renren"><span class="iconfont icon-renren"></span></a>
                            </div>
                            <div class="pull-right"><a href="javascript:void(0)" title="喜欢"><span class="iconfont icon-love" style=""></span> <em>喜欢(0)</em></a></div>


                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="row activity-detail">
            <div class="col-sm-8">
                <div class="row">
                    <div class="col-xs-12 activity-detail-nav">
                        <ul class="nav nav-tabs nav-justified" role="tablist">
                            <li role="presentation" class="active"><a href="#activity" role="tab"
                                                                      data-toggle="tab">活动介绍</a></li>
                            <li role="presentation"><a href="#detail" role="tab" data-toggle="tab">商品详情</a></li>
                            <li role="presentation"><a href="#forum" role="tab" data-toggle="tab">讨论区 <span
                                        class="iconfont icon-hot"></span></a></li>
                            <li role="presentation"><a href="#supporter" role="tab" data-toggle="tab">支持者 <span
                                        class="badge">0</span></a></li>
                        </ul>
                    </div>
                    <div class="tab-content col-xs-12 activity-body">
                        <div role="tabpanel" class="tab-pane active"
                             id="activity"><p>为英雄联盟爱好者设计的一款衣服，我们会为你设计专属的英雄，职业的衣服，穿出属于你自己的爱好！“HI，哥们，你也玩ADC呀”，找到更多的游戏伙伴吧</p></div>
                        <div role="tabpanel" class="tab-pane" id="detail"></div>
                        <div role="tabpanel" class="tab-pane" id="forum">
                            <script type="text/javascript">
                                (function () {
                                    var url = "http://widget.weibo.com/distribution/comments.php?width=0&url=auto&brandline=y&skin=2&appkey=889544367&iframskin=2&dpc=1";
                                    url = url.replace("url=auto", "url=" + encodeURIComponent(document.URL));
                                    document.write('<iframe id="WBCommentFrame" src="' + url + '" scrolling="no" frameborder="0" style="width:100%"></iframe>');
                                })();
                            </script>
                            <script src="http://tjs.sjs.sinajs.cn/open/widget/js/widget/comment.js"
                                    type="text/javascript" charset="utf-8"></script>
                            <script type="text/javascript">
                                window.WBComment.init({
                                    "id": "WBCommentFrame"
                                });
                            </script>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="supporter"></div>
                    </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="panel panel-default hidden-xs">
                    <div class="panel-heading">最新支持者 <a href="#supporter" class="pull-right">更多</a></div>
                    <div class="panel-body">
                    </div>
                </div>
                <!--                <div class="panel panel-default hidden-xs">
                                    <div class="panel-heading">最新评论 <a href="#forum" class="pull-right">更多</a></div>
                                    <div class="panel-body">
                                                            </div>
                                </div>-->
            </div>
        </div>
    </div>
</div>
<div id="page-footer">
    <div class="container">
        <div class="visible-xs">Copyright © 2014-2015 易衫网.</div>
        <div class="hidden-xs pull-left copyright">Copyright © 2014-2015 易衫网.</div>
        <div style="margin-left: 230px">
            <div class="row hidden-xs">
                <div class="col-sm-3 col-md-2 col-lg-3">
                    <ul>
                        <li>导航</li>
                        <li><a href="/">首页</a></li>
                        <li><a href="/design">开始设计</a></li>
                        <!--<li><a href="/invite/">邀请朋友</a></li>-->
                        <li><a href="/about/">关于我们</a></li>
                        <li><a href="/help/">帮助中心</a></li>

                    </ul>
                </div>
                <div class="col-md-3 hidden-sm col-lg-3">
                    <ul>
                        <li>服务</li>
                        <!--
                        <li style="display: none"><a href="http://bbs.easytee.me/">会员认证(免费)</a></li>
                        <li><a href="http://bbs.easytee.me/">易衫社区</a></li>
                        <li><a href="http://bbs.easytee.me/">售后服务</a></li>
                        -->
                        <li><div>客服QQ：202351473</div><div style="padding: 5px 0"><a target="_blank" href="http://sighttp.qq.com/authd?IDKEY=4bea2daab922dc1cd8d2c729d2c285ea888f299becee8145"><img border="0"  src="http://wpa.qq.com/imgd?IDKEY=4bea2daab922dc1cd8d2c729d2c285ea888f299becee8145&pic=51" alt="点击这里给我发消息" title="点击这里给我发消息"/></a></div></li>
                    </ul>
                </div>
                <div class="col-sm-5 col-md-4 col-lg-3">
                    <ul>
                        <li>联系我们</li>
                        <li>工作日：上午9点 - 下午6点</li>
                        <li>休息日：上午9点 - 下午5点</li>
                        <li>客服热线：400-92020-85</li>
                        <li>
                            <a href="http://www.zx110.org/picp?sn=310107100040719" style="">
                                <img style="margin-top: 10px;;height:27px;width: 80px;" src="/resources/public/image/picp_bg.png" alt="沪公网备" border="0"/>
                            </a>
                        </li>
                        <!--<li><a href="#">在线客服</a></li>-->
                    </ul>
                </div>
                <div class="col-sm-4 col-md-3 col-lg-3">
                    <ul>
                        <li>官方</li>
                        <li><a href="http://weibo.com/easytee" target="_blank"><em class="iconfont icon-weibo"></em> 官方微博</a></li>
                        <li>
                            <a href="javascript:void(0)" id='weixinIcon'><em class="iconfont icon-iconfontweixin"></em> 官方微信</a>
                            <div id='site-footer-weixin'>
                                <img width="100%" src='/resources/public/image/qrcode.jpg'>
                            </div>
                        </li>
                        <li>

                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/html" id="modal">
    <div class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body">

                </div>
                <div class="modal-footer">
                    <button type="button" class="easytee-modal-cancel btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="easytee-modal-ok btn btn-primary" data-loading-text="加载中...">确定</button>
                </div>
            </div>
        </div>
    </div>
</script>
<script>
    $(function(){
        var mechat = $("<script>");
        mechat.attr(
            {
                src: '//meiqia.com/js/mechat.js?unitid=55dd21444eae358b1c000009',
                charset: 'UTF-8',
                async: 'async'
            });
        $('body').append(mechat);
    })
</script>


<script src="/resources/public/js/bootstrap.min.js"></script>
<script src="/resources/public/js/public.js"></script>
<!--[if lte IE 6]>
<script type="text/javascript" src="/resources/public/js/bootstrap-ie.js"></script>
<![endif]-->
<script type="text/javascript">
    $('#weixinIcon').hover(function () {
        $('#site-footer-weixin').show();
    }, function () {
        $('#site-footer-weixin').hide();
    })
    $('.design').click(function () {
        if (/android/i.test(navigator.userAgent) || /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) || /MicroMessenger/i.test(navigator.userAgent)) {
            alert('为了您能有更好的设计体验，请在电脑上进行在线设计操作O(∩_∩)O');
            return false;
        }
    })
</script>
<script>
    var activity = {
        id: '2518',
        title: '英雄联盟专题',
        abstract:"\u4e3a\u82f1\u96c4\u8054\u76df\u7231\u597d\u8005\u8bbe\u8ba1\u7684\u4e00\u6b3e\u8863\u670d\uff0c\u6211\u4eec\u4f1a\u4e3a\u4f60\u8bbe\u8ba1\u4e13\u5c5e\u7684\u82f1\u96c4\uff0c\u804c\u4e1a\u7684\u8863\u670d\uff0c\u7a7f\u51fa\u5c5e\u4e8e\u4f60\u81ea\u5df1\u7684\u7231\u597d\uff01\u201cHI\uff0c\u54e5\u4eec\uff0c\u4f60\u4e5f\u73a9ADC\u5440\u201d\uff0c\u627e\u5230\u66f4\u591a\u7684\u6e38\u620f\u4f19\u4f34\u5427",
        design: [],
        create_image:1,
        time: '6天'
    };
    var products = {"defaultProductStyleId":"45","prductList":{"2":{"id":"2","name":"\u5706\u9886\u7537\u6b3e","description":"<div style=\"text-align: center;\" class=\"hidden-xs\">\r\n            <img src=\"http:\/\/cdn.open.easytee.me\/\/products\/2\/G_info_m_01.png\"\/><br\/>\r\n            <img src=\"http:\/\/cdn.open.easytee.me\/\/products\/2\/G_info_m_02.png\"\/><br\/>\r\n            <img src=\"http:\/\/cdn.open.easytee.me\/\/products\/2\/G_info_m_03.png\"\/><br\/>\r\n            <img src=\"http:\/\/cdn.open.easytee.me\/\/products\/2\/G_info_m_04.png\"\/><br\/>\r\n            <img src=\"http:\/\/cdn.open.easytee.me\/\/products\/2\/G_info_m_05.png\"\/><br\/>\r\n            <img src=\"http:\/\/cdn.open.easytee.me\/\/products\/2\/G_info_m_06.png\"\/><br\/>\r\n            <img src=\"http:\/\/cdn.open.easytee.me\/\/products\/2\/G_info_m_07.png\"\/><br\/>\r\n        <\/div>\r\n        <div style=\"text-align: center;\" class=\"visible-xs\">\r\n            <img src=\"http:\/\/cdn.open.easytee.me\/\/products\/2\/G_wap_m01.png\"\/><br\/>\r\n            <img src=\"http:\/\/cdn.open.easytee.me\/\/products\/2\/G_wap_m02.png\"\/><br\/>\r\n            <img src=\"http:\/\/cdn.open.easytee.me\/\/products\/2\/G_wap_m03.png\"\/><br\/>\r\n            <img src=\"http:\/\/cdn.open.easytee.me\/\/products\/2\/G_wap_m04.png\"\/><br\/>\r\n            <img src=\"http:\/\/cdn.open.easytee.me\/\/products\/2\/G_wap_m05.png\"\/><br\/>\r\n            <img src=\"http:\/\/cdn.open.easytee.me\/\/products\/2\/G_wap_m06.png\"\/><br\/>\r\n        <\/div>","icon":"http:\/\/d.hiphotos.baidu.com\/image\/pic\/item\/e824b899a9014c08c5816daf097b02087bf4f406.jpg","style":[{"id":"45","name":"\u9ed1\u8272","size":["XS","S","M","L","XL","2XL"],"price":"50.00","color_name":"\u9ed1\u8272","colors":[{"name":"000000","id":"17","accounting":"100"}],"image":{"front":"http:\/\/oss-cn-hangzhou.aliyuncs.com\/open-edit\/product\/design\/product_style\/2518\/177_000000_front_merge.png","back":"http:\/\/oss-cn-hangzhou.aliyuncs.com\/open-edit\/product\/design\/product_style\/1693\/178_000000_back.png","third":"http:\/\/oss-cn-hangzhou.aliyuncs.com\/open-edit\/product\/design\/product_style\/1693\/179_000000_third.png","fourth":"http:\/\/oss-cn-hangzhou.aliyuncs.com\/open-edit\/product\/design\/product_style\/1693\/180_000000_fourth.png"},"has_design":[],"regions":{"front":"285,210,405,540"}}]}}};
</script>
<script type="text/html" id="style-number-template">
    <div class="chang-style-number">
        <div class="alert alert-danger alert-dismissible fade in" style="display: none"></div>
        <div class="visible-xs">表格看不全？请试试水平拖动</div>
        <form method="post" action="" id="chang-style-number-form" class="table-responsive">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th>数量</th>
                    <th>款式</th>
                    <th>颜色</th>
                    <th>尺码</th>
                    <th>价格</th>
                    <th style="width:25px;padding: 8px 0"></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style="width:50px;"><input name="quantity[]" this.style.imeMode='disabled' ; type="tel"
                                                   class="form-control shirt-nums"
                                                   style="text-align: center;padding: 5px 3px;min-width: 30px" value="1"
                                                   onclick="$(this).select()"
                            ></td>
                    <td>
                        <select name="product_style_id[]" class="form-control shirt-pro" style="min-width: 80px">
                        </select>
                    </td>
                    <td>
                        <select name="product_style_id[]" class="form-control shirt-style" style="min-width: 80px">
                        </select>
                    </td>
                    <td>
                        <select name="size[]" class="form-control shirt-sizes" style="width:auto">
                        </select>
                    </td>
                    <td class="shirt-price">0.00元</td>
                    <td style="padding: 8px 0"><a href="#" class="iconfont icon-delete" style="display:none"></a></td>
                </tr>
                </tbody>
            </table>
            <textarea rows="10" cols="60" name="notes" class="user-order-note" style="display:none"></textarea>
        </form>
        <div><a href="" class="add-style">添加其他款式</a></div>

    </div>
</script>
<script src="/resources/theme/activity/js/activity.js"></script>
<script src="/resources/plug/jquery.qrcode.min.js"></script>
<script>
    var activityId = "2518";
    $('.icon-love').on('click', function () {
//                if (userId == 0) {
//                    popup('用户登录', '/login/small', true, function (a) {
//                        a.find('.modal-footer').hide();
//                    });
//                    return false;
//                }
        $.get('/Activity/ajaxLike/' + activityId, function (data) {
            if (data.status == 1) {
                $('.icon-love').css('color', '#F72602').parent().find('em').text('已喜欢(' + data.count + ')');
            }
            if (data.status == 2) {
                $('.icon-love').css('color', '#4b6070').parent().find('em').text('喜欢(' + data.count + ')');
            }
        }, "json")
    })
</script>
</body>
</html>

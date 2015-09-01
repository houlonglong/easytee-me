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
    <title><?=$activity['name']?>-易衫网</title>
    <meta name="keywords" content="定制T恤,定制T恤,T恤,T恤丝网印刷,刺绣,数码印刷,设计,定制服装"/>
    <meta name="description" content="使用易衫网的T恤在线设计工具来创建您的作品.您可以上传自己的设计,或者使用我们丰富的素材库和众多的各种字体."/>
    <?php include(block("block/html_head"));?>
    <script src="/resources/public/js/jquery.cookie.js"></script>
    <link rel="stylesheet" type="text/css" href="/resources/theme/activity/css/activity.css">
</head>
<body>
<?php include(block("block/nav_bar"));?>
<div class="page-wrapper activity">
    <div class="container">
        <div class="row">
            <div class="col-sm-8">
                <div class="row">
                    <div class="col-sm-12">
                        <h1><?=$activity['name']?></h1>
                        <div class="activity-author">发起人：<span>18751903667</span></div>
                    </div>
                </div>
                <div class="row activity-showbox">
                    <div class="col-sm-12">
                        <ul class="activity-showbox-imglist">
                            <li class="active" side="front"><img class="img-responsive"
                                                                 src="http://oss-cn-hangzhou.aliyuncs.com/open-edit/product/design/product_style/2518/177_000000_front_merge.png">
                            </li>
                            <li side="back"><img class="img-responsive"
                                                 src="http://oss-cn-hangzhou.aliyuncs.com/open-edit/product/design/product_style/1693/178_000000_back.png">
                            </li>
                            <li side="third"><img class="img-responsive"
                                                  src="http://oss-cn-hangzhou.aliyuncs.com/open-edit/product/design/product_style/1693/179_000000_third.png">
                            </li>
                            <li side="fourth"><img class="img-responsive"
                                                   src="http://oss-cn-hangzhou.aliyuncs.com/open-edit/product/design/product_style/1693/180_000000_fourth.png">
                            </li>
                        </ul>
                        <div class="activity-showbox-photo">
                            <img class="img-responsive"
                                 src="http://oss-cn-hangzhou.aliyuncs.com/open-edit/product/design/product_style/2518/177_000000_front_merge.png">

                            <div class="activity-loading" style="display: block;background-color: #FFF; opacity: 0.8;"><img style="top:50%;margin-top: -64px;position: absolute;" src="/static/images/loading-bars.svg" width="64" height="64" /></div>
                        </div>


                    </div>
                </div>
                <!--<div class="row activity-showbox">
                    <div class="col-sm-12">
                        <div class="activity-showbox-photo">
                            <svg></svg>
                            <div class="activity-loading"></div>
                        </div>

                        <ul class="activity-showbox-imglist">
                        </ul>
                    </div>
                </div>-->
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
                        <p>本活动的目标是在<?=$activity['end_time']?>前售出<?=$activity['sale_target']?>件。</p>
                                <span style="color: #8D8D8D">没有任何风险的预购：若活动失败，你支付的费用将在活动结束后的三个工作日内返还到你的账户。即使在活动进行中时，您也可以随时取消订单！</span>
                    </div>
                    <div class="col-sm-12">
                        <a href="javescript:;" class="btn btn-default pull-right" style="margin-top: 25px;"
                           id="showsize">尺码参考表</a>
                        <label class="activity-label">售价</label>
                        <p class="activity-price">￥<em></em></p>
                    </div>
                    <div class="col-sm-12 activity-time">
                        <?php
                        $process = (round($activity['sale_count'] / $activity['sale_target'] * 100, 0));
                        ?>
                        <div class="progress">
                            <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60"
                                 aria-valuemin="0" aria-valuemax="100"
                                 style="width: <?=$process?>%;min-width:2em">
                                <?=$process?>%</div>
                        </div>
                        <ul>
                            <li>
                                <?php
                                //TODO 时间小于一天的，时间单位为：小时，小于一个小时的，时间单位为分钟，小于分钟的，单位为秒
                                $endTime = $activity['end_time'];
                                $timestamp = strtotime($endTime) - time();
                                $day = $timestamp / (60 * 60 * 24);
                                if ($day > 1) {
                                    $time = (round($day) < 0) ? 0 : round($day) . ' 天';
                                } else {
                                    $hour = $timestamp / 60 / 60;
                                    if ($hour > 1) {
                                        $time = (round($hour) < 0) ? 0 : round($hour) . ' 小时';
                                    } else {
                                        $time = (round($timestamp / 60)) ? 0 : round($timestamp / 60) . ' 分钟';
                                    }
                                }
                                ?>
                                <h4><?=$time; ?></h4>
                                <p>剩余时间</p>
                            </li>
                            <li>
                                <h4><?php echo empty($activity['sale_count'])?0:$activity['sale_count']; ?> 件</h4>
                                <p>当前预售</p>
                            </li>
                        </ul>
                    </div>
                    <div class="col-sm-12">
                        <button class="btn btn-warning btn-lg btn-block" <?php echo (strtotime($endTime) - time()) <= 0 ? 'style="background-color: #a9a9a9;color:#000000" disabled' : ''; ?>
                            id="Preorder"><?php echo (strtotime($endTime) - time()) <= 0 ? '活动已结束' : '立即预购'; ?></button>
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
                            <div class="pull-right">
                                <a href="javascript:void(0)" title="喜欢"><span class="iconfont icon-love" style=""></span>
                                    <em>喜欢(0)</em>
                                </a>
                            </div>
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
                            <li role="presentation" class="active">
                                <a href="#activity" role="tab" data-toggle="tab">活动介绍</a>
                            </li>
                            <li role="presentation">
                                <a href="#detail" role="tab" data-toggle="tab">商品详情</a>
                            </li>
                        </ul>
                    </div>
                    <div class="tab-content col-xs-12 activity-body">
                        <div role="tabpanel" class="tab-pane active" id="activity">
                            <?=$activity['content']?>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="detail">
                            <? foreach($product_info['products'] as $product){ ?>
                                <div id="pro_<?=$product['id']?>" style="display: none;">
                                    <?=$product['content']?>
                                </div>
                            <?php } ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<input type="hidden" value="<?=$activity['id']?>" id="activity_id">
<?php include(block("block/page_footer"));?>
<script>
    $(function(){
        $("#detail").children().eq(0).show();
    })
    var activity = {
        id: '2518',
        title: '英雄联盟专题',
        abstract:"",
        design: [],
        create_image:1,
        time: '6天'
    };
    //var products = {"defaultProductStyleId":"45","prductList":{"2":{"id":"2","name":"\u5706\u9886\u7537\u6b3e","description":"<div style=\"text-align: center;\" class=\"hidden-xs\">\r\n            <img src=\"http:\/\/cdn.open.easytee.me\/\/products\/2\/G_info_m_01.png\"\/><br\/>\r\n            <img src=\"http:\/\/cdn.open.easytee.me\/\/products\/2\/G_info_m_02.png\"\/><br\/>\r\n            <img src=\"http:\/\/cdn.open.easytee.me\/\/products\/2\/G_info_m_03.png\"\/><br\/>\r\n            <img src=\"http:\/\/cdn.open.easytee.me\/\/products\/2\/G_info_m_04.png\"\/><br\/>\r\n            <img src=\"http:\/\/cdn.open.easytee.me\/\/products\/2\/G_info_m_05.png\"\/><br\/>\r\n            <img src=\"http:\/\/cdn.open.easytee.me\/\/products\/2\/G_info_m_06.png\"\/><br\/>\r\n            <img src=\"http:\/\/cdn.open.easytee.me\/\/products\/2\/G_info_m_07.png\"\/><br\/>\r\n        <\/div>\r\n        <div style=\"text-align: center;\" class=\"visible-xs\">\r\n            <img src=\"http:\/\/cdn.open.easytee.me\/\/products\/2\/G_wap_m01.png\"\/><br\/>\r\n            <img src=\"http:\/\/cdn.open.easytee.me\/\/products\/2\/G_wap_m02.png\"\/><br\/>\r\n            <img src=\"http:\/\/cdn.open.easytee.me\/\/products\/2\/G_wap_m03.png\"\/><br\/>\r\n            <img src=\"http:\/\/cdn.open.easytee.me\/\/products\/2\/G_wap_m04.png\"\/><br\/>\r\n            <img src=\"http:\/\/cdn.open.easytee.me\/\/products\/2\/G_wap_m05.png\"\/><br\/>\r\n            <img src=\"http:\/\/cdn.open.easytee.me\/\/products\/2\/G_wap_m06.png\"\/><br\/>\r\n        <\/div>","icon":"http:\/\/d.hiphotos.baidu.com\/image\/pic\/item\/e824b899a9014c08c5816daf097b02087bf4f406.jpg","style":[{"id":"45","name":"\u9ed1\u8272","size":["XS","S","M","L","XL","2XL"],"price":"50.00","color_name":"\u9ed1\u8272","colors":[{"name":"000000","id":"17","accounting":"100"}],"image":{"front":"http:\/\/oss-cn-hangzhou.aliyuncs.com\/open-edit\/product\/design\/product_style\/2518\/177_000000_front_merge.png","back":"http:\/\/oss-cn-hangzhou.aliyuncs.com\/open-edit\/product\/design\/product_style\/1693\/178_000000_back.png","third":"http:\/\/oss-cn-hangzhou.aliyuncs.com\/open-edit\/product\/design\/product_style\/1693\/179_000000_third.png","fourth":"http:\/\/oss-cn-hangzhou.aliyuncs.com\/open-edit\/product\/design\/product_style\/1693\/180_000000_fourth.png"},"has_design":[],"regions":{"front":"285,210,405,540"}}]}}};
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

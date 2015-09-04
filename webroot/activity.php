<!DOCTYPE html>
<html lang="zh-CN">
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="Cache-Control" content="no-siteapp"/>
<meta name="renderer" content="webkit">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<title>T恤在线设计工具-易衫网-中国服装定制首选平台</title>
<meta name="keywords" content="定制T恤,定制T恤,T恤,T恤丝网印刷,刺绣,数码印刷,设计,定制服装"/>
<meta name="description" content="使用易衫网的T恤在线设计工具来创建您的作品.您可以上传自己的设计,或者使用我们丰富的素材库和众多的各种字体."/>
<?php include(block("block/html_head"));?>
<script src="/resources/public/js/jquery.cookie.js"></script>
<link rel="stylesheet" type="text/css" href="/resources/theme/activity/css/activity.css">
<body>
<?php include(block("block/nav_bar"));?>

<?php
$info = Model_Activity_Beta::get_activity_info();
$svgs = $info['svgs'];
$products = $info['products'];
$activity = $info['activity'];
$user = $info['user'];
$easyteeAdmin = $info['easyteeAdmin'];
$uid = 0;
if (isset($user)) {
    $uid = $user['id'];
}

?>
<div class="page-wrapper activity">
    <?php
    if ($activity['pass'] == 0 && ($user['id'] == $activity['publisher']['uid'] || $easyteeAdmin)) {
        echo '<div class="container alert alert-danger alert-dismissible" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <strong>提示!</strong> 该活动正在审核中，但不影响购买，本提示仅活动发起人可见。
                ' . ($easyteeAdmin ? '<a href="#" class="btn btn-default">通过</a><a href="#" class="btn btn-default">拒绝</a>' : '') . '
            </div>';
    }
    if ($activity['pass'] == 3) {
        echo '<div class="container alert alert-danger alert-dismissible" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <strong>提示!</strong> 该活动未通过审核，仅限活动发起人和管理员浏览。
                ' . ($easyteeAdmin ? '<a href="#" class="btn btn-default">通过</a><a href="#" class="btn btn-default">拒绝</a>' : '') . '
            </div>';
    }
    ?>
    <div class="container">
        <div class="row">
            <div class="col-sm-8">
                <div class="row">
                    <div class="col-sm-12">
                        <h1><?php echo $activity['name']; ?></h1>
                        <?php
                        $nickName = $activity['publisher']['name'];
                        $identifier = '';
                        if ($activity['publisher']['ID'] && $activity['publisher']['ID']) {
                            $id = json_decode($activity['publisher']['ID'], TRUE);
                            $nickName = $id['name'];
                            $identifier = $id['type'];
                        }
                        ?>
                        <div class="activity-author">发起人：<span><?php echo $nickName; ?></span> <span
                                class="iconfont icon-vcode" style="<?php
                            if (empty($identifier)) {
                                echo 'background-color:#888;';
                            }
                            if ($identifier == '企业认证') {
                                echo 'background-color:#4188DC;';
                            }
                            if ($identifier == '个人认证') {
                                echo 'background-color:#0E964F;';
                            }
                            ?>"> <?php echo!empty($identifier) ? $identifier : '未认证'; ?></span>
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
                        <p>本活动的目标是在<?php echo $activity['endTime']; ?>前售出<?php echo $activity['salesTarget']; ?>件。</p>
                                <span
                                    style="color: #8D8D8D">没有任何风险的预购：若活动失败，你支付的费用将在活动结束后的三个工作日内返还到你的账户。即使在活动进行中时，您也可以随时取消订单！</span>
                    </div>
                    <div class="col-sm-12">
                        <a href="javescript:;" class="btn btn-default pull-right" style="margin-top: 25px;"
                           id="showsize">尺码参考表</a>
                        <label class="activity-label">售价</label>

                        <p class="activity-price">￥<em></em></p>
                    </div>
                    <?php
                    $process = (round($activity['salesCount'] / $activity['salesTarget'] * 100, 0));
                    ?>
                    <div class="col-sm-12 activity-time">
                        <div class="progress">
                            <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60"
                                 aria-valuemin="0" aria-valuemax="100"
                                 style="width: <?php echo ($process > 100) ? '100%' : $process . '%'; ?>;min-width:2em">
                                <?php echo $process . '%'; ?>
                            </div>
                        </div>
                        <ul>
                            <li>
                                <!--TODO 时间小于一天的，时间单位为：小时，小于一个小时的，时间单位为分钟，小于分钟的，单位为秒-->
                                <?php
                                $endTime = $activity['endTime'];
                                $timestamp = strtotime($endTime) - time();
                                $day = $timestamp / (60 * 60 * 24);
                                if ($day > 1) {
                                    $time = (round($day) < 0) ? 0 : round($day) . '天';
                                } else {
                                    $hour = $timestamp / 60 / 60;
                                    if ($hour > 1) {
                                        $time = (round($hour) < 0) ? 0 : round($hour) . '小时';
                                    } else {
                                        $time = (round($timestamp / 60)) ? 0 : round($timestamp / 60) . '分钟';
                                    }
                                }
                                ?>
                                <h4><?php echo $time; ?></h4>

                                <p>剩余时间</p>
                            </li>
                            <li>
                                <h4><?php echo $activity['salesCount']; ?> 件</h4>

                                <p>当前预售</p>
                            </li>
                        </ul>
                    </div>
                    <div class="col-sm-12">
                        <button
                            class="btn btn-warning btn-lg btn-block" <?php echo (strtotime($endTime) - time()) <= 0 ? 'style="background-color: #a9a9a9;color:#000000" disabled' : ''; ?>
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
                            <!--<li role="presentation"><a href="#forum" role="tab" data-toggle="tab">讨论区 <span-->
                            <!--class="iconfont icon-hot"></span></a></li>-->
                            <!--<li role="presentation"><a href="#supporter" role="tab" data-toggle="tab">支持者 <span-->
                        </ul>
                    </div>
                    <div class="tab-content col-xs-12 activity-body">
                        <div role="tabpanel" class="tab-pane active"
                             id="activity"><?php echo $activity['description']; ?></div>
                        <div role="tabpanel" class="tab-pane" id="detail"></div>
                        <!--<div role="tabpanel" class="tab-pane" id="forum">-->
                        <!--<script type="text/javascript">-->
                        <!--(function () {-->
                        <!--var url = "http://widget.weibo.com/distribution/comments.php?width=0&url=auto&brandline=y&skin=2&appkey=889544367&iframskin=2&dpc=1";-->
                        <!--url = url.replace("url=auto", "url=" + encodeURIComponent(document.URL));-->
                        <!--document.write('<iframe id="WBCommentFrame" src="' + url + '" scrolling="no" frameborder="0" style="width:100%"></iframe>');-->
                        <!--})();-->
                        <!--</script>-->
                        <!--<script src="http://tjs.sjs.sinajs.cn/open/widget/js/widget/comment.js"-->
                        <!--type="text/javascript" charset="utf-8"></script>-->
                        <!--<script type="text/javascript">-->
                        <!--window.WBComment.init({-->
                        <!--"id": "WBCommentFrame"-->
                        <!--});-->
                        <!--</script>-->
                        <!--</div>-->
                        <!--<div role="tabpanel" class="tab-pane" id="supporter"></div>-->
                    </div>
                </div>
            </div>
            <div class="col-sm-4 hide">

            </div>
        </div>
    </div>
</div>
<?php include(block("block/page_footer"));?>
<script>
    var activity = {
        id: '<?php echo $activity['id']; ?>',
        title: '<?php echo $activity['name']; ?>',
        abstract:<?php echo json_encode($activity['abstract']); ?>,
        design: <?php echo json_encode($svgs); ?>,
        create_image:<?php echo ($activity['create_image']) ? 1 : 0 ?>,
        time: '<?php echo $time;?>'
    };
    var products = <?php echo json_encode($products); ?>;
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
    var activityId = "<?php echo $activity['id']; ?>";
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

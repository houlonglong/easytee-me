<?php
    //判断活动活动id是不是存在
    if(empty($_GET['id'])){
        throw new Exception("活动id不存在");
    }
    $activity_id = $_GET['id'];
    //查询数据库活动表的字段
    $activity_info = PtLib\db()->select_row("select a.uid,a.name,a.sale_count,a.sale_target,a.content,a.thumb_img_url,a.start_time,a.end_time,u.nick_name from et_activity_info as a LEFT  JOIN et_user as u on a.uid = u.id where a.id = ? ",$activity_id);
    //判断数据库是不是有该活动
    if($activity_info == false){
        throw new Exception("没有该活动");
    }
//include(block("block/header"))
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="css/sale/sale.css">
    <link rel="stylesheet" type="text/css" href="css/common/style.css">
    <link rel="stylesheet" type="text/css" href="css/common/popup.css">
    <!-- <script type="text/javascript" src="js/app/sale/time.js"></script> -->
    <script type="text/javascript" src="js/app/common/jquery-1.11.2.min.js"></script>
    <script type="text/javascript" src="/js/libs/crypt/sha1.js"></script>
    <script type="text/javascript" src="/js/libs/jquery.cookie.js"></script>
    <!-- <script type="text/javascript" src="js/app/common/jquery.mousewheel.min.js"></script> -->
    <script type="text/javascript" src="js/app/sale/index.js"></script>
    <script type="text/javascript" src="js/app/common/popup.js"></script>
    <script type="text/javascript" src="js/app/common/index.js"></script>
</head>
<body>


<div class="order banxin clearfix">
    <div class="order-show clearfix">
        <ul class="small-img">
            <li class="current"><img src=""></li>
            <li><img src=""></li>
            <li><img src=""></li>
            <li><img src=""></li>
        </ul>
        <ul class="big-img">
            <li class="current"><img src=""></li>
            <li><img src=""></li>
            <li><img src=""></li>
            <li><img src=""></li>
        </ul>

    </div>
    <div class="order-info">
        <h3><?php echo $activity_info['name'] ?></h3>

        <div class="price clearfix">
            <div class="price-num">99</div>
            <div class="ren">发起人：<span><?php echo $activity_info['nick_name'] ?></span></div>
        </div>
        <div class="num-sell clearfix">
            <div class="clearfix">
                <span class="sell-l">已售出<i><?php echo $activity_info['sale_target'] ?></i>件</span>
                <span class="sell-r">目标<i><?php echo $activity_info['sale_count'] ?></i>件</span>
            </div>
            <p>此预售的活动如果没有达到最低数量，您的款项将全额返还。敬请放心预购。</p>
        </div>
        <div class="style">
            <p>款式</p>
            <select name="" id="changeProduct">

            </select>
        </div>
        <div class="size">
            <p>颜色</p>
            <ul class="color-lump">

            </ul>
            <div class="color-list">
                <a href="javascript:void(0)" >尺码信息</a>
            </div>
        </div>
        <div class="time-down time_num" id="times_wrap">
            <strong>距离结束还有</strong>

            <div class="clock time_w">
                <span class="clock-h" id="times_d"></span><i class="space">天</i>
                <span class="clock-h" id="times_h"></span><i> ：</i>
                <span class="clock-h" id="times_m"></span><i> ：</i>
                <span class="clock-h" id="times_s"></span>
            </div>
        </div>
        <div class="btns">
            <button  id="Pre-order">立即预购</button>
        </div>
        <div class="fenxiang" id="YF-share">
            <span>分享</span>
            <a  href="javascript:void(0)" title="微博分享" share="weibo"></a>
            <a  href="javascript:void(0)" title="豆瓣分享" share="douban"></a>
            <a  href="javascript:void(0)" title="微信分享" share="wechat"></a>
            <a  href="javascript:void(0)"  title="人人分享" share="renren"></a>
            <a  href="javascript:void(0)" title="qq分享" share="qq"></a>

        </div>
    </div>
</div>
<div style="height: 55px; margin-top: 20px;">
    <div class="tab-lan">
        <div class="tab-nav banxin clearfix">
            <span class="tab-logo"></span>
            <ul class="tab-con clearfix">
                <li data-ref="introduce" class="current">
                    <a href="javascript:;">活动介绍</a>
                </li>
                <li data-ref="details">
                    <a href="javascript:;">商品详情</a>
                </li>
                <li data-ref="rule">
                    <a href="javascript:;" data-ref="rule">活动规则</a>
                </li>
            </ul>
        </div>
    </div>
</div>
<div id="introduce" class="banxin"><?php echo $activity_info['content'] ?></div>
<div id="details" class="banxin">详情</div>
<div id="rule" class="banxin">规则</div>
<div class="dialog">
    <div class="dialog-con">
        <span class="cha"></span>

        <h3>选择尺码 & 款式</h3>

        <div class="bt-list">
            <span class="number">数量</span>
            <span class="yanse">颜色</span>
            <span class="product">产品</span>
            <span class="chima">尺码</span>
            <span class="money">价格</span>
        </div>
        <ul class="style-info">

        </ul>
        <div class="amount">
            总计 <span>￥<i>100</i></span>
        </div>
        <div class="add">添加其他款式或颜色</div>
        <div class="buy">
            <a href="#">　购买</a>
        </div>
    </div>
</div>

<div class="dialog-size">
    <div class="dialog-size-con">
        <span class="dialog-icon">ET基础圆领款</span>
        <span class="dialog-size-close"></span>
        <h4>尺码信息</h4>
        <table>
            <tr>
                <td>尺码</td>
                <td>推荐身高</td>
                <td>胸围</td>
                <td>衣长</td>
            </tr>
            <tr>
                <td>S</td>
                <td>165</td>
                <td>96</td>
                <td>61</td>
            </tr>
            <tr>
                <td>M</td>
                <td>170</td>
                <td>104</td>
                <td>65</td>
            </tr>
            <tr>
                <td>L</td>
                <td>175</td>
                <td>110</td>
                <td>68</td>
            </tr>
            <tr>
                <td>XL</td>
                <td>180</td>
                <td>116</td>
                <td>71</td>
            </tr>
            <tr>
                <td>2XL</td>
                <td>185</td>
                <td>124</td>
                <td>74</td>
            </tr>
        </table>
        <button class="dialog-size-btn">确定</button>
    </div>
</div><div class="go-top"></div>

<?php include(block("block/footer")) ?>
        
<script>
    var activity_id = "<?php echo $activity_id ?>";
    var activity = {};
    activity.name = "<?php echo $activity_info['name'] ?>";
    activity.description = "<?php echo strip_tags($activity_info['content']) ?>";
    activity.time ="<?php  echo $activity_info['start_time'] - $activity_info['end_time'] ?>"
    var img_url = "<?php echo $activity_info['thumb_img_url']  ?>"
    console.log(img_url+"22222222222")
    var product_id = <?php echo $activity_info['uid'] ?>;

    function delHtmlTag(str){
        return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
    }

    setTimeout("show_time()",1000);

    var time_d = document.getElementById("times_d");
    var time_h = document.getElementById("times_h");
    var time_m = document.getElementById("times_m");
    var time_s = document.getElementById("times_s");
    var Pre_order = document.getElementById("Pre-order");
    console.log(Pre_order)

    var data = "<?php echo strtr($activity_info['end_time'],'-','/') ?>";  // 设定结束时间
    var time_end = new Date(data);

    time_end = time_end.getTime();

    function show_time() {
        var time_now = new Date();  // 获取当前时间
        time_now = time_now.getTime();
        var time_distance = time_end - time_now;  // 结束时间减去当前时间
        var int_day, int_hour, int_minute, int_second;
        if (time_distance >= 0) {
            // 天时分秒换算
            int_day = Math.floor(time_distance / 86400000)
            time_distance -= int_day * 86400000;
            int_hour = Math.floor(time_distance / 3600000)
            time_distance -= int_hour * 3600000;
            int_minute = Math.floor(time_distance / 60000)
            time_distance -= int_minute * 60000;
            int_second = Math.floor(time_distance / 1000)

            // 时分秒为单数时、前面加零站位
            if (int_hour < 10)
                int_hour = "0" + int_hour;
            if (int_minute < 10)
                int_minute = "0" + int_minute;
            if (int_second < 10)
                int_second = "0" + int_second;

            // 显示时间
            time_d.innerHTML = int_day;
            time_h.innerHTML = int_hour;
            time_m.innerHTML = int_minute;
            time_s.innerHTML = int_second;

            setTimeout("show_time()", 1000);
        } else {
            time_d.innerHTML = 00;
            time_h.innerHTML = 00;
            time_m.innerHTML = 00;
            time_s.innerHTML = 00;
            Pre_order.innerHTML ="活动结束";
            Pre_order.style.backgroundColor = "#a9a9a9";
            Pre_order.setAttribute("disabled", "disabled");

            // clearTimeout(timerID)
        }

        window.setTimeout(function(){ YFshare();},1000);
    };
</script>
<script type="text/javascript" src="js/app/activvity/activvity.js"></script>
<script type="text/javascript" src="js/app/activvity/jquery.qrcode.min.js"></script>

</body>
</html>
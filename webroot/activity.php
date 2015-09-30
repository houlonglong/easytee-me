<?php
$activity_info = PtLib\db()->select_row("select a.uid,a.name,a.sale_count,a.sale_target,a.content,a.thumb_img_url,a.start_time,a.end_time,u.nick_name from et_activity_info as a LEFT  JOIN et_user as u on a.uid = u.id ");
include(block("block/header"))?>
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
                <a href="" target="_blank">尺码信息</a>
            </div>
        </div>
        <div class="time-down time_num"  id="times_wrap">
            <strong>距离结束还有</strong>
            <div class="clock time_w">
                <span class="clock-h" id="times_d"></span><i class="space">天</i>
                <span class="clock-h" id="times_h"></span><i> ：</i>
                <span class="clock-h" id="times_m"></span><i> ：</i>
                <span class="clock-h" id="times_s"></span>
            </div>
        </div>
        <div class="btns">
            <a href="#">　立即预购</a>
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
<div class="tab-lan">
    <div class="tab-nav banxin clearfix">
        <span class="tab-logo"></span>
        <ul class="tab-con clearfix">
            <li class="current"><a href="#introduce">活动介绍</a></li>
            <li><a href="#details">商品详情</a></li>
            <li><a href="#rule">活动规则</a></li>
        </ul>
    </div>
</div>
<div id="introduce" class="banxin"><?php echo $activity_info['content'] ?></div>
<div id="details" class="banxin">详情</div>
<div id="rule" class="banxin">规则</div>
<div class="tanchuang">
    <div class="tanchuang-con">
        <span class="cha"></span>

        <h3>我的订单</h3>

        <div class="bt-list">
            <span class="number">数量</span>
            <span class="yanse">颜色</span>
            <span class="product">产品</span>
            <span class="chima">尺码</span>
            <span class="money">价格</span>
        </div>
        <ul class="style-info">
            <li>
                <img src="css/sale/images/sytle-img.png" id="thumbImg">
                <div class="number-info">
                    <span class="left">-</span>
                    <input type="text" value="1">
                    <span class="right">+</span>
                </div>
                <select name="" id="" class="product-info">
                        
                </select>
                <div class="yanse-info ">
                    <i class='bor10'></i>
                    <span></span>
                    <div class="palette">
                    </div>
                </div>
                
                
                <select name="" id="sizes" class="chima-info">
                   
                </select>
                <div class="money-info">
                    ￥<i>99</i>
                </div>
            </li>
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

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<div class="go-top"></div>
<?php include(block("block/footer")) ?>

<script>

    var activity = {};
    activity.name = "<?php echo $activity_info['name'] ?>";
    activity.description = "<?php echo strip_tags($activity_info['content']) ?>";
    activity.time ="<?php  echo $activity_info['start_time'] - $activity_info['end_time'] ?>"
    var img_url = "<?php echo $activity_info['thumb_img_url']  ?>"
    var product_id = <?php echo $activity_info['uid'] ?>;

    function delHtmlTag(str){
        return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
    }

    setTimeout("show_time()",1000);
    var time_d = document.getElementById("times_d");
    var time_h = document.getElementById("times_h");
    var time_m = document.getElementById("times_m");
    var time_s = document.getElementById("times_s");

    var time_end = new Date("2015/9/29 18:00:00");  // 设定结束时间
    time_end = time_end.getTime();

    function show_time(){
        var time_now = new Date();  // 获取当前时间
        time_now = time_now.getTime();
        var time_distance = time_end - time_now;  // 结束时间减去当前时间
        var int_day, int_hour, int_minute, int_second;
        if(time_distance >= 0){
            // 天时分秒换算
            int_day = Math.floor(time_distance/86400000)
            time_distance -= int_day * 86400000;
            int_hour = Math.floor(time_distance/3600000)
            time_distance -= int_hour * 3600000;
            int_minute = Math.floor(time_distance/60000)
            time_distance -= int_minute * 60000;
            int_second = Math.floor(time_distance/1000)

            // 时分秒为单数时、前面加零站位
            if(int_hour < 10)
                int_hour = "0" + int_hour;
            if(int_minute < 10)
                int_minute = "0" + int_minute;
            if(int_second < 10)
                int_second = "0" + int_second;

            // 显示时间
            time_d.innerHTML = int_day;
            time_h.innerHTML = int_hour;
            time_m.innerHTML = int_minute;
            time_s.innerHTML = int_second;

            setTimeout("show_time()",1000);
        }else{
            time_d.innerHTML = time_d.innerHTML;
            time_h.innerHTML = time_h.innerHTML;
            time_m.innerHTML = time_m.innerHTML;
            time_s.innerHTML = time_s.innerHTML;

            // clearTimeout(timerID)
        }
        window.setTimeout(function(){ YFshare();},1000);
    };
</script>
<script type="text/javascript" src="js/app/activvity/activvity.js"></script>
<script type="text/javascript" src="js/app/activvity/jquery.qrcode.min.js"></script>
</body>
</html>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="css/sale/xiaoshou.css">
    <link rel="stylesheet" type="text/css" href="css/common/style.css">
    <link rel="stylesheet" type="text/css" href="css/common/popup.css">
    <!-- <script type="text/javascript" src="js/app/sale/time.js"></script> -->
    <script type="text/javascript" src="js/app/common/jquery-1.11.2.min.js"></script>
    <script type="text/javascript" src="/js/libs/crypt/sha1.js"></script>
    <!-- <script type="text/javascript" src="js/app/common/jquery.mousewheel.min.js"></script> -->
    <script type="text/javascript" src="js/app/sale/index.js"></script>
    <script type="text/javascript" src="js/app/common/popup.js"></script>
    <script type="text/javascript" src="js/app/common/index.js"></script>
    
    
</head>
<body>

<div class="try"><i></i></div>
<div class="tanceng">
    <span class="close"></span>
    <div></div>
</div>
<div class="hidden" id="page-popup">
    <div id="page-login">
        <?php include(block("block/login"))?>
    </div>
    <div id="page-register">
        <?php include(block("block/register"))?>
    </div>
    
    <div id="page-reset">
        <?php include(block("block/reset"))?>
    </div>
</div>

 
<header>
        <span class="header-bg"></span>
        <div class="inHead">
            <nav class="typeArea clearfix nav">
                <h1 class="logo">
                    <a href="index.html">易衫网</a>
                </h1>
                <span class="how">如何开始</span>
                <div class="login">
                    <a href="#" class="begin">发起活动</a>
                    <div>
                        <a href="#">消息</a>
                        <a href="#" id="popup-login">登录</a>
                        <a href="#" id="popup-register">注册</a>
                    </div>
                </div>
            </nav>
        </div>
        <div class="head-foot"></div>
    </header>
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
        <h3>简易—中式文化新浪潮</h3>

        <div class="price clearfix">
            <div class="price-num">99</div>
            <div class="ren">发起人：<span>巴黎汇呵呵呵呵呵</span></div>
        </div>
        <div class="num-sell clearfix">
            <div class="clearfix">
                <span class="sell-l">已售出<i>8</i>件</span>
                <span class="sell-r">目标<i>20</i>件</span>
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
        <div class="fenxiang">
            <span>分享</span>
            <a href="#"></a>
            <a href="#"></a>
            <a href="#"></a>
            <a href="#"></a>
            <a href="#"></a>
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
<div id="introduce" class="banxin">介绍</div>
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
<div class="foot">
    <div class="infooter clearfix">
        <h2>易衫网</h2>
        <dl>
            <dt>导航</dt>
            <dd>
                <a href="#">首页</a>
            </dd>
            <dd>
                <a href="#">开始设计</a>
            </dd>
            <dd>
                <a href="#">关于我们</a>
            </dd>
            <dd>
                <a href="#">帮助中心</a>
            </dd>
        </dl>
        <dl>
            <dt>服务</dt>
            <dd>客服QQ：12345678</dd>
        </dl>
        <dl>
            <dt>联系我们</dt>
            <dd>工作日：上午9点 - 下午6点</dd>
            <dd>休息日：上午9点 - 下午5点</dd>
            <dd>客服热线 ： 400-92020-85</dd>
        </dl>
        <dl>
            <dt>官方</dt>
            <dd class="weibo">
                <a href="#">微博</a>
            </dd>
            <dd class="weixin">微信</dd>
        </dl>
        <span class="ewm"></span>

        <p>Copyright © 2014-2015 易衫网 沪公网备310107100040719</p>
    </div>
</div>
<script>
    setTimeout("show_time()",1000);
    var time_d = document.getElementById("times_d");
    var time_h = document.getElementById("times_h");
    var time_m = document.getElementById("times_m");
    var time_s = document.getElementById("times_s");

    var time_end = new Date("2015/9/30 18:00:00");  // 设定结束时间
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
    };
</script> 
</body>
</html>
<?php
    $activity = PtLib\db()->select_row("select * from activities where id = ?",2595);
    //print_pre($activity);exit;
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="css/sale/xiaoshou.css">
    <link rel="stylesheet" type="text/css" href="css/common/style.css">
    <script type="text/javascript" src="js/app/common/jquery-1.11.2.min.js"></script>
    <!-- <script type="text/javascript" src="js/app/common/jquery.mousewheel.min.js"></script> -->
    <script type="text/javascript" src="js/app/sale/index.js"></script>
    <script type="text/javascript" src="js/app/common/index.js"></script>
    <script>
        var start_time = "<?=$activity['start_time']?>";
        var deadline = <?=$activity['deadline']?>;
        $(function(){
            $.get("/api",{
                model:'activity',
                action:'detail',
                id:2595
            },function(data){
                if(data.status == 0){//成功返回
                    console.log(data)
                    var activity_detail = data.return;
                    console.log(activity_detail)
                }else{//异常
                    alert(data.message)
                }
            },"json");
        })
    </script>
</head>
<body>
<div class="try"></div>
<header>
    <span class="header-bg"></span>
    <nav class="banxin clearfix nav">
        <h1 class="logo">
            <a href="index.html">易衫网</a>
        </h1>
        <span class="how">如何开始</span>
        <div class="login">
            <a href="#" class="begin">发起活动</a>
            <div>
                <a href="#">消息</a>
                <a href="#">登录</a>
                <a href="#">注册</a>
            </div>
        </div>
    </nav>
</header>
<div class="dingdan banxin clearfix">
    <div class="dingdan-show clearfix">
        <ul class="xiaotu">
            <li class="current">正面</li>
            <li>反面</li>
            <li>左袖</li>
            <li>右袖</li>
        </ul>
        <ul class="datu">
            <li class="current">正面<img src="css/sale/images/show-yifu.png"></li>
            <li>反面<img src="css/sale/images/show-yifu.png"></li>
            <li>左袖<img src="css/sale/images/show-yifu.png"></li>
            <li>右袖<img src="css/sale/images/show-yifu.png"></li>
        </ul>

    </div>
    <div class="dingdan-info">
        <h3>简易—中式文化新浪潮</h3>
        <div class="jiage clearfix">
            <div class="jiage-num">99</div>
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
            <select name="" id="">
                <option value="">基础款T恤</option>
                <option value="">基础款T恤</option>
                <option value="">基础款T恤</option>
                <option value="">基础款T恤</option>
            </select>
        </div>
        <div class="size">
            <p>颜色</p>
            <ul class="color-lump">
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
                <li><span></span></li>
            </ul>
            <div class="color-list">
                尺码信息
            </div>
        </div>
        <div class="time-down">
            <strong>距离结束还有</strong>
            <div class="clock">
                <span class="clock-o">1</span>
                <span class="clock-o">1</span><i class="space">天</i>
                <span class="clock-h">09</span><i> ：</i>
                <span class="clock-h">09</span><i> ：</i>
                <span class="clock-h">09</span>
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
            <span class="chima">尺码</span>
            <span class="product">产品</span>
            <span class="yanse">颜色</span>
            <span class="money">价格</span>
        </div>
        <ul class="style-info">
            <li>
                <img src="css/sale/images/sytle-img.png">
                <div class="number-info">
                    <span class="left">-</span>
                    <input type="text" value="1">
                    <span class="right">+</span>
                </div>
                <select name="" id="" class="chima-info">
                    <option value="">XL</option>
                    <option value="">XL</option>
                    <option value="">XL</option>
                </select>
                <select name="" id="" class="product-info">
                    <option value="">基础圆领T恤</option>
                    <option value="">基础圆领T恤</option>
                    <option value="">基础圆领T恤</option>
                </select>
                <div class="yanse-info current">
                    <span></span>
                </div>
                <div class="money-info">
                    ￥<i>99</i>元
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
</body>
</html>
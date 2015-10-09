<?php
//查热门活动
$i = 0;
$activity_hot = PtLib\db()->select_rows("select a.id, a.name,a.content,a.sale_count,a.sale_target,a.sale_total,a.start_time,a.end_time,a.period,a.sale_count,a.thumb_img_url,a.thumb_svg_url,a.Hot,u.nick_name from et_activity_info  as a left join et_user as u on a.uid = u.id where hot = 1 limit 0,4");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    
    <link rel="stylesheet" type="text/css" href="css/common/style.css">
    <link rel="stylesheet" type="text/css" href="css/index/index.css">
    <link rel="stylesheet" type="text/css" href="css/common/popup.css">
    <script type="text/javascript" src="js/app/common/jquery-1.11.2.min.js"></script>
    <script type="text/javascript" src="js/app/common/popup.js"></script>
    <script type="text/javascript" src="js/app/common/index.js"></script>
    <script type="text/javascript" src="js/app/index/index.js"></script>
    <script type="text/javascript" src="js/app/common/mobile_index.js"></script>
</head>
<body>
    <!-- <div class="try"> 
        <i></i>
    </div> -->
    <div class="tanceng">
        <span class="close"></span>

        <div></div>
    </div>
    <div class="hidden" id="page-popup">
        <div id="page-login">
            <?php include(block("block/login")) ?></div>
        <div id="page-register">
            <?php include(block("block/register")) ?></div>

        <div id="page-reset">
            <?php include(block("block/reset")) ?></div>
    </div>

    <div class="go-top"></div>
    <nav class="banxin clearfix nav">
        <h1 class="logo">
            <a href="index.html">易衫网</a>
        </h1>
        <div class="login">
            <a href="#" class="begin">发起活动</a>
            <div class="login-links">
                <a href="#">消息</a>
                <a href="#" id="popup-login">登录</a>
                <a href="#" id="popup-register">注册</a>
            </div>
        </div>
    </nav>
    <div class="try"><i> </i></div>
    <div class="banner">
        <div class="free"></div>
        <div class="btns">如何开始</div>
    </div>
    <div class="small-banner">
        <div class="color"></div>
        <a href="#">
            <img src="css/index/images/small_banner.png" alt="开学有礼">
        </a>
    </div>

    <div class="main">
        <div class="inMain banxin clearfix">
            <h2 class="hot">热销.推荐</h2>
            <span class="arrow-l"></span>
            <span class="arrow-r"></span>
            <div class="main-con clearfix">
                <div class="m-left">
                    <ul class="act1 clearfix">
                        <?php foreach ($activity_hot as $val){
                            $i++;
                        $Date_1=date("Y-m-d");
                        $Date_2=$val['end_time'];
                        $d1=strtotime($Date_1);
                        $d2=strtotime($Date_2);
                        $left_day=round(($d2-$d1)/3600/24)-1;
                            if($left_day < 0){
                                $left_day = 0;
                            }
                        $jindu = floor(($val['sale_count']/$val['sale_target'])*100);
                        if(empty($val['thumb_img_url']))
                            $val['thumb_img_url'] = $val['thumb_svg_url']
                        ?>

                            <li class="<?php if($i%2==1){
                                echo 'mar12';
                            }else{
                                echo '';
                            }  ?>">
                               <a href="/activity?id=<?=$val['id']?>">
                                <span class="promoter">发起人：<?=$val['nick_name']?></span>
                                <div class="hide">
                                    <p><?=$val['nick_name']?></p>
                                    <p class="mar20"><?=$val['content']?></p>

                                </div>
                                <div>
                                    <img src="<?=$val['thumb_img_url']?>" width="194" height="181"></div>
                                <p class="explain"><?=$val['name']?></p>
                                <div class="progress">
                                    <div class="progress-bar progress-bar-success" role="progressbar"
                                         aria-valuenow="<?php echo floor(($val['sale_count']/$val['sale_target'])*100) ?>"
                                         aria-valuemin="0" aria-valuemax="100" style="width:<?php echo $jindu==0?1:$jindu ?>%"><?php echo $jindu ?>%</div>
                                </div> <strong>发起人：<?=$val['nick_name']?></strong>
                                <div class="num">
                                    <span class="zuo">已售出 <?=$val['sale_count']?> 件</span>
                                    <span class="you">剩余 <?=$left_day?>天</span>
                                </div>
                                </a>
                            </li>
                            <?php } ?>

                    </ul>
            </div>
            <div class="m-right">
                <h3 class="m-right-hd">购买者评价</h3>
                <div class="m-right-con">
                    <ul class="pingjia">
                        <li>
                            <p>
                                用户名字
                                <span>VIP1</span>
                            </p>
                            <p>很喜欢，包装很仔细、严实，物流也很给力，漂亮！颜色这正！</p>
                        </li>
                        <li>
                            <p>
                                用户名字
                                <span>VIP1</span>
                            </p>
                            <p>很喜欢，包装很仔细、严实，物流也很给力，漂亮！颜色这正！</p>
                        </li>
                        <li>
                            <p>
                                用户名字
                                <span>VIP1</span>
                            </p>
                            <p>很喜欢，包装很仔细、严实，物流也很给力，漂亮！颜色这正！</p>
                        </li>
                        <li>
                            <p>
                                用户名字
                                <span>VIP1</span>
                            </p>
                            <p>很喜欢，包装很仔细、严实，物流也很给力，漂亮！颜色这正！</p>
                        </li>
                        <li>
                            <p>
                                用户名字
                                <span>VIP1</span>
                            </p>
                            <p>很喜欢，包装很仔细、严实，物流也很给力，漂亮！颜色这正！</p>
                        </li>

                        <li>
                            <p>
                                用户名字
                                <span>VIP2</span>
                            </p>
                            <p>很喜欢，包装很仔细、严实，物流也很给力，漂亮！颜色这正！</p>
                        </li>
                        <li>
                            <p>
                                用户名字
                                <span>VIP2</span>
                            </p>
                            <p>很喜欢，包装很仔细、严实，物流也很给力，漂亮！颜色这正！</p>
                        </li>
                        <li>
                            <p>
                                用户名字
                                <span>VIP2</span>
                            </p>
                            <p>很喜欢，包装很仔细、严实，物流也很给力，漂亮！颜色这正！</p>
                        </li>
                        <li>
                            <p>
                                用户名字
                                <span>VIP2</span>
                            </p>
                            <p>很喜欢，包装很仔细、严实，物流也很给力，漂亮！颜色这正！</p>
                        </li>
                        <li>
                            <p>
                                用户名字
                                <span>VIP2</span>
                            </p>
                            <p>很喜欢，包装很仔细、严实，物流也很给力，漂亮！颜色这正！</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="help">
    <hr>
    <h3 class="help-title"></h3>
    <span class="help-sentence">上千种模板供你选择</span>
    <a href="#" class="apply">有原创模板？申请成为易衫认证设计师，让你的设计为你工作　　>></a>
    <div class="help-template banxin">
        <span class="help-l"></span>
        <span class="help-r"></span>
        <div class="template">
            <ul class="clearfix">
                <li class="template-con">
                    <i>Cartion</i>
                    <img src="css/index/images/template1.jpg">
                </li>
            </ul>
        </div>
    </div>
</div>
<div class="cooperate-bg">
    <div class="cooperate">
        <hr>
        <h3 class="cooperate-title"></h3>
        <div class="cooperate-con">
            <a href="http://www.zhubajie.com/fzpssj/s.html">
                <img src="css/index/images/cooperate-img.jpg">
                <p>把需要解决的问题放在猪八戒网上，
                通过悬赏模式可以获得多种方案，可以选到百里挑一的作品；通过速配模式，可以寻找到能力精准匹配
                的服务商来提供服务。
                </p>
            </a>
            <a href="猪八戒网">
                <img src="css/index/images/cooperate-img2.jpg">
                <p>图片太小？需要抠图？简单的图像处理可以交给易衫网合作的淘宝美工店来解决。高效，低价，满意。
                </p>
            </a>
        </div>
    </div>
</div>

<div class="ling">
    <i></i>
    <div class="ling-color"></div>
    <div class="ling-bg"></div>
</div>
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
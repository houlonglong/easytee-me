<!DOCTYPE html>
<html lang="zh-CN">
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="Cache-Control" content="no-siteapp"/>
<meta name="renderer" content="webkit">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<title>易衫开学礼</title>
<meta name="keywords" content="定制T恤,定制T恤,T恤,T恤丝网印刷,刺绣,数码印刷,设计,定制服装"/>
<meta name="description" content="使用易衫网的T恤在线设计工具来创建您的作品.您可以上传自己的设计,或者使用我们丰富的素材库和众多的各种字体."/>
<?php include(block("block/html_head"));?>
<link rel="stylesheet" type="text/css" href="/resources/theme/index/css/index.css">
<link rel="stylesheet" type="text/css" href="/resources/theme/index/css/active.css">

<body>
<?php include(block("block/nav_bar"));?>
<div class="page-wrapper">
    <div class="banner">
        <div class="color"></div>
        <img src="/resources/theme/index/image/banner-act.jpg" alt="开学有礼">
    </div>
    <div class="anniu">
        <?php if($is_logined){ ?>
        <?php if($is_authed){ ?>
        <a  class="right" style="background: #1cafad;
	color: #fff;">立刻分享</a>
        <div class="shar  bdsharebuttonbox"  data-tag="share_1"">
        <a target="blank"  data-cmd="sqq"></a>
        <a target="blank"  data-cmd="tsina"></a>
        <a target="blank" data-cmd="weixin"></a>
        <a target="blank" data-cmd="renren"></a>
    </div>
    <?php }else{ ?>
        <a href="/campus/auth" class="left">认证</a>
        <a  class="right" style="background: #1cafad;
	color: #fff;">分享</a>
    <?php } ?>
    <?php }else{ ?>
        <a href="/user/register?campus=1&redirect=<?php echo urlencode('/campus/index')?>" class="left">注册</a>
        <a  class="right" style="background: #1cafad;
	color: #fff;">分享</a>
    <?php } ?>
</div>
<div class="main">
    <div class="con">
    </div>
</div>
<div class="act">
    <h3 class="act-hd">热销.推荐</h3>

    <div class="act-con">
        <sapn class="left"></sapn>
        <sapn class="right"></sapn>
        <ul class="act1">
            <li>
                <div class="hides">
                    <p>纪念反法西斯胜利70周年</p>

                    <p class="mar20">我们看了大量抗日神剧经过科学系统的总结，加上个（zhong）性（kou）化（wei）的风格处理，倾心为 您呈现
                    </p>

                    <p>一起用实际行动支持反法吧！</p>
                </div>
                <div><img src="/resources/theme/index/image/yifu.jpg"></div>
                <p class="explain">手撕鬼子掏心脏——70周年纪念日</p>

                <div class="tiao"></div>
                <strong>发起人：田中一天</strong>

                <div class="num">
                    <span class="zuo">已售出 29 件</span>
                    <span class="you">剩余010天</span>
                </div>
            </li>
            <li class="mar12">
                <div class="hides">
                    <p>纪念反法西斯胜利70周年</p>

                    <p class="mar20">我们看了大量抗日神剧经过科学系统的总结，加上个（zhong）性（kou）化（wei）的风格处理，倾心为 您呈现
                    </p>

                    <p>一起用实际行动支持反法吧！</p>
                </div>
                <div><img src="/resources/theme/index/image/yifu.jpg"></div>
                <p class="explain">手撕鬼子掏心脏——70周年纪念日</p>

                <div class="tiao"></div>
                <strong>发起人：田中一天</strong>

                <div class="num">
                    <span class="zuo">已售出 29 件</span>
                    <span class="you">剩余010天</span>
                </div>
            </li>
            <li>
                <div class="hides">
                    <p>纪念反法西斯胜利70周年</p>

                    <p class="mar20">我们看了大量抗日神剧经过科学系统的总结，加上个（zhong）性（kou）化（wei）的风格处理，倾心为 您呈现
                    </p>

                    <p>一起用实际行动支持反法吧！</p>
                </div>
                <div><img src="/resources/theme/index/image/yifu.jpg"></div>
                <p class="explain">手撕鬼子掏心脏——70周年纪念日</p>

                <div class="tiao"></div>
                <strong>发起人：田中一天</strong>

                <div class="num">
                    <span class="zuo">已售出 29 件</span>
                    <span class="you">剩余010天</span>
                </div>
            </li>

        </ul>
    </div>
</div>
</div>

<?php include(block("block/page_footer"));
$http_host = $_SERVER['HTTP_HOST']  ?>
</body>
<script>
    <?php
    if(!empty($_GET['invite'])){
        \PtLib\set_cookie("invite_id_cookie",$_GET['invite']);
    }

    if(Model_User_Auth::is_logined()){
    echo 'var uid = '.Model_User_Auth::get_uid();
    }else{
    echo 'var uid = null';
    }?>;

    if(uid){
        var bdUrl = 'http://<?php echo $http_host ?>/campus/index?invite='+uid;
    }else{
        var bdUrl = 'http://<?php echo $http_host ?>/campus/index';
    }


	window._bd_share_config = {
        common: {
            bdText: '易衫开学送好礼，学生注册即送20元现金，分享再获好礼',
            bdDesc: '开学“易”，好礼“衫”重奏，快来体验易衫网的全新定制服务',
            bdUrl: bdUrl,
            bdPic: 'http://<?php echo $http_host ?>/resources/theme/index/image/fenxiang.jpg'
        },
      share: [{
            "bdSize": 32
        }]
       
      
        
    };
    with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)]
</script>
</html>


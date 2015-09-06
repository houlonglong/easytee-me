<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <meta name="renderer" content="webkit">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>首页-易衫网-中国服装定制首选平台</title>
    <meta name="keywords" content="定制T恤,定制T恤,T恤,T恤丝网印刷,刺绣,数码印刷,设计,定制服装"/>
    <meta name="description" content="使用易衫网的T恤在线设计工具来创建您的作品.您可以上传自己的设计,或者使用我们丰富的素材库和众多的各种字体."/>
    <?php include(block("block/html_head"));?>
    <link rel="stylesheet" type="text/css" href="/resources/theme/index/css/index.css">
</head>
<body>
<?php include(block("block/nav_bar"));?>
<div class="page-wrapper">
    <!-- 横幅 -->
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner" role="listbox">
            <div class="item active">
                <img class="first-slide" style="display:block;margin: 0 auto" src="/resources/theme/index/image/side1.jpg"
                     alt="First slide">

                <div class="container">
                    <div class="carousel-caption">
                        <p><a href="/design" class="btn btn-lg btn-started design hidden-xs" href="#" role="button">开始设计</a></p>
                    </div>
                </div>
            </div>
        </div>
        <a class="left carousel-control hidden" href="#myCarousel" role="button" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span class="sr-only">上一个</span>
        </a>
        <a class="right carousel-control hidden" href="#myCarousel" role="button" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span class="sr-only">下一个</span>
        </a>
    </div>
    <!-- /.横幅 -->
    <div class="container video-block hidden">
        <div class="row">
            <div class="col-xs-6"><img
                    src="http://img2.imgtn.bdimg.com/it/u=3314021191,3873244427&fm=21&gp=0.jpg"
                    class="img-responsive"></div>
            <div class="col-xs-6">
                <h3>易衫网可以帮助您零成本、零风险、零烦恼的销售高品质个性化服装</h3>

                <p>您只需设计出一个图案，设定价格、销售目标和期限，就可以开始一次服装的众筹！当实现您设定的目标，我们就会开始生产并直接发货给买家，而你则获得利润</p>
            </div>
        </div>
    </div>

    <!-- 活动 -->
    <div class="small-banner">
        <a href="/campus/index"><img src="/resources/public/image/small_banner.png" alt="开学有礼"></a>
    </div>
    <!-- ./活动 -->

    <div class="top-activities" style="display: none">
        <div class="container">
            <h3>热门活动</h3>
            <div class="row">
            </div>
        </div>
    </div>
</div>
<?php include(block("block/page_footer"));?>
</body>
</html>
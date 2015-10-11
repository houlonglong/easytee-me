<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>设计 - 易衫EASYTEE - 每个人都是创业家！预售产品的电商服务平台，彻底颠覆传统商业模式，0成本、0风险，全产业链无忧服务。你只需脑洞大开，创意预售T恤 ，就可践行初次创业梦想。</title>
    <link rel="stylesheet" type="text/css" href="js/app/design/vendor/etds/css/et.ds-min.css"/>
    <link rel="stylesheet" type="text/css" href="css/design/animate.css"/>
    <link rel="stylesheet" type="text/css" href="css/design/style.css"/>
    <link rel="stylesheet" type="text/css" href="css/design/font-family.css"/>
    <link rel="stylesheet" type="text/css" href="css/design/design.css"/>
    <link rel="stylesheet" type="text/css" href="css/design/pricing.css"/>
    <link rel="stylesheet" type="text/css" href="css/design/push.css"/>
    <script src="js/app/design/vendor/jquery-1.11.2.js"></script>
    <script src="js/app/design/vendor/jQuery-FileUploader.js"></script>
    <script src="js/app/design/vendor/etds/et.ds.js"></script>
    <script src="js/app/design/vendor/jQuery-Slider-min.js"></script>

    <script src="js/app/design/main.js"></script>
</head>
<body>
<div class="design-main">
    <div class="design-top">
        <div class="design-top-leaf"></div>
        <div class="design-top-center">
            <div class="design-top-nav">
                <a class="step step-1 active" href="javascript:;"><i class="scissors"></i>1.设计</a>
                <a class="step step-2" href="javascript:;"><i class="scissors"></i>2.设定目标</a>
                <a class="step step-3" href="javascript:;"><i class="scissors"></i>3.添加描述</a>
                <div class="clearfix"></div>
            </div>
            <div class="btn-group">
                <a id="ds_save" class="btn btn-default" href="javascript:;">保存</a>
            </div>
        </div>
    </div>
    <div class="design-center">
        <div class="design-slider">
            <?php include(block("block/design/step1")) ?>
        </div>
        <div class="design-slider">
            <?php include(block("block/design/step2")) ?>
        </div>
        <div class="design-slider">
            <?php include(block("block/design/step3")) ?>
        </div>
    </div>
</div>
</body>
</html>
<?php
$http_host = $_SERVER['HTTP_HOST'];
$pro_id = 2;
$style_id = 18;
$is_login = 1;
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <meta name="renderer" content="webkit">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>T恤在线设计工具-易衫网-中国服装定制首选平台</title>
    <meta name="keywords" content="定制T恤,定制T恤,T恤,T恤丝网印刷,刺绣,数码印刷,设计,定制服装"/>
    <meta name="description" content="使用易衫网的T恤在线设计工具来创建您的作品.您可以上传自己的设计,或者使用我们丰富的素材库和众多的各种字体."/>
    <link rel="stylesheet" href="/resources/public/css/bootstrap.min.css">
    <link rel="stylesheet" href="/resources/public/css/bootstrap-theme.css">

    <link rel="stylesheet" href="/resources/public/css/public.css">
    <!--[if lt IE 9]>
    <script src="/resources/public/js/ie8-responsive-file-warning.js"></script>
    <![endif]-->
    <!--[if lt IE 9]>
    <script src="/resources/public/js/html5shiv.min.js"></script>
    <script src="/resources/public/js/respond.min.js"></script>
    <![endif]-->
    <!--[if lte IE 6]>
    <link rel="stylesheet" type="text/css" href="/resources/public/css/bootstrap-ie6.min.css">
    <![endif]-->
    <link rel="apple-touch-icon" href="/resources/public/image/apple-touch-icon.png">
    <link rel="icon" href="/resources/public/image/favicon.ico">
    <script src="/resources/public/js/jquery.min.js"></script>
    <script type="text/javascript" src="/js/libs/canvg/canvg.js"></script>
    <style>
        #navbar .open a{
            color:#636161
        }
    </style>
</head>
<body>
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">切换导航</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand site-logo" href="/">易衫网</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <li><a href="/design" class="design">开始设计</a></li>
                <!--<li><a href="/invite">邀请朋友</a></li>-->
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li><a href="/account/order/">我的订单</a></li>
                <li><a href="/account/">卖家中心</a></li>
                <li class="dropdown  pull-right">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">你好，18601628937 <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="/account/setting">账户设置</a></li>
                        <li><a href="/Account/moneyflow/">收支明细</a></li>
                        <li class="divider"></li>
                        <li><a href="/login/loginout">注销</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav><div class="container">
    <div class="row">
        <div class="col-12" id="designerParentContainer" style="margin: 70px auto 20px auto;height: 731px;">
            <script type="text/javascript" language="javascript"
                    src="http://<?=$http_host?>/designer/html5/ds/js/launcher.js"></script>
            <script type="text/javascript" language="javascript">
                //console.log=function(){}
                //console.debug=function(){}
                //console.info=function(){}
                /*
                 window.onbeforeunload = function () {
                 return "您的设计还没有保存，您确定要离开吗？"
                 };
                 */
                function StartRedirecting() {
                    window.onbeforeunload = null;
                };

                var flashvars =
                {
                    //"EmbedType":"iframe",
                    "DesignerLocation": "http://<?=$http_host?>/designer/html5",
                    "ApiDomain": "<?=$http_host?>",
                    "SSLEnabled": false,
                    "SSLApiDomain": "<?=$http_host?>",
                    "CdnDomain": "cdn.open.easytee.me",
                    "SSLCdnDomain": "cdn.open.easytee.me",

                    "AppToken": "wqdc",
                    "AppURI": "TShirt_Elephant",
                    "UserToken": "<?php echo $is_login?>",

                    "EnforceBoundaries": false, //强制设计边界
                    "Background": "FFFFFF",
                    "VectorOnly": false,   //仅限矢量图
                    "DigitalPrint": false, //数码
                    "ScreenPrint": true,   //丝网
                    "Embroidery": false,   //刺绣，暂未能提供该功能
                    "MaxScreenPrintColors": "12", // 丝网印刷最多支持的颜色数量

                    "DesignID": "1",  //修改现有设计时，传入该参数
                    "DefaultProductID": "<?=$pro_id?>", //默认产品ID
                    "DefaultProductStyleID": "<?=$style_id?>", //默认产品款式ID
                    "ProductID": "<?=$pro_id?>",
                    "ProductStyleID": "<?=$style_id?>",
                    "ProductCategoryID": "",
                    "ClipArtGalleryID": "",

                    "StartPage": "", //
                    "StartPageCategoryID": "",
                    "StartPageHTML": "",
                    "StartBanner": "",

                    "NextURL": "",
                    "CartURL": "",
                    "OrderSummary": "true",
                    "VideoLink": "",
                    "Phone": "400-920-2085",
                    "WelcomeScreen": "",
                    "ContactUsLink": "",
                    "WelcomeVideo": "",


                    "RoundPrices": false,

                    "PublisherID": "1",
                    "SessionID": "1",
                    "SessionToken": "",
                    "CartRetailItemID": "",
                    "UserName": "",
                    "UserEmail": "",


                    "DisableAddToCart": true,
                    "DisableUploadImage": false,
                    "DisableClipArt": false,
                    "DisableUserArt": false,
                    "DisableProducts": false,
                    "DisableDesigns": false,
                    "DisableDistress": true,
                    "DisableResolutionMeter": true,
                    "DisableUploadVectorArt": false,
                    "DisableUploadRasterArt": false,


                    "OrderID": "",
                    "CartID": "",
                    "ArtID": "",
                    "FontID": "",
                    "Admin": "None",
                    "GreetBoxSetting": "",
                    "HelpVideoOverview": "",
                    "AutoZoom": false,
                    "EnableNameNumbers": false,

                    "AddThisPublisherId": "xa-4fccb0966fef0ba7",
                    "EnableCartPricing": "true",
                    "EnableCartCheckout": "true",
                    "EnableCartBilling": "false",
                    "EnableCartShipping": "true",
                    "PaymentDisabled": "false",
                    "PaymentRequired": "true",
                    "BillingAddressRequired": "true",
                    "PasswordLength": "4",
                    "DefaultCountryCode": "CN",
                    "CurrencyCode": "CAD",
                    "CurrencySymbol": "C$",
                    "HideProductPricing": false,

                    "HideClipArtNames": true,
                    "HideDesignNames": true,
                    "ThemeName": "spring",
                    "Version": "25",
                    "BackgroundColor": "FFFFFF",
                    "addTextEmbroidery": false
                };

                launchDesigner("HTML5DS", flashvars, document.getElementById("designerParentContainer"));
            </script>
        </div>
    </div>
</div>
<div id="page-footer">
    <div class="container">
        <div class="visible-xs">Copyright © 2014-2015 易衫网.</div>
        <div class="hidden-xs pull-left copyright">Copyright © 2014-2015 易衫网.</div>
        <div style="margin-left: 230px">
            <div class="row hidden-xs">
                <div class="col-sm-3 col-md-2 col-lg-3">
                    <ul>
                        <li>导航</li>
                        <li><a href="/">首页</a></li>
                        <li><a href="/design">开始设计</a></li>
                        <!--<li><a href="/invite/">邀请朋友</a></li>-->
                        <li><a href="/about/">关于我们</a></li>
                        <li><a href="/help/">帮助中心</a></li>

                    </ul>
                </div>
                <div class="col-md-3 hidden-sm col-lg-3">
                    <ul>
                        <li>服务</li>
                        <!--
                        <li style="display: none"><a href="http://bbs.easytee.me/">会员认证(免费)</a></li>
                        <li><a href="http://bbs.easytee.me/">易衫社区</a></li>
                        <li><a href="http://bbs.easytee.me/">售后服务</a></li>
                        -->
                        <li><div>客服QQ：202351473</div><div style="padding: 5px 0"><a target="_blank" href="http://sighttp.qq.com/authd?IDKEY=4bea2daab922dc1cd8d2c729d2c285ea888f299becee8145"><img border="0"  src="http://wpa.qq.com/imgd?IDKEY=4bea2daab922dc1cd8d2c729d2c285ea888f299becee8145&pic=51" alt="点击这里给我发消息" title="点击这里给我发消息"/></a></div></li>
                    </ul>
                </div>
                <div class="col-sm-5 col-md-4 col-lg-3">
                    <ul>
                        <li>联系我们</li>
                        <li>工作日：上午9点 - 下午6点</li>
                        <li>休息日：上午9点 - 下午5点</li>
                        <li>客服热线：400-92020-85</li>
                        <li>
                            <a href="http://www.zx110.org/picp?sn=310107100040719" style="">
                                <img style="margin-top: 10px;;height:27px;width: 80px;" src="/resources/public/image/picp_bg.png" alt="沪公网备" border="0"/>
                            </a>
                        </li>
                        <!--<li><a href="#">在线客服</a></li>-->
                    </ul>
                </div>
                <div class="col-sm-4 col-md-3 col-lg-3">
                    <ul>
                        <li>官方</li>
                        <li><a href="http://weibo.com/easytee" target="_blank"><em class="iconfont icon-weibo"></em> 官方微博</a></li>
                        <li>
                            <a href="javascript:void(0)" id='weixinIcon'><em class="iconfont icon-iconfontweixin"></em> 官方微信</a>
                            <div id='site-footer-weixin'>
                                <img width="100%" src='/resources/public/image/qrcode.jpg'>
                            </div>
                        </li>
                        <li>

                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/html" id="modal">
    <div class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body">

                </div>
                <div class="modal-footer">
                    <button type="button" class="easytee-modal-cancel btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="easytee-modal-ok btn btn-primary" data-loading-text="加载中...">确定</button>
                </div>
            </div>
        </div>
    </div>
</script>
<script>
    $(function(){
        var mechat = $("<script>");
        mechat.attr(
            {
                src: '//meiqia.com/js/mechat.js?unitid=55dd21444eae358b1c000009',
                charset: 'UTF-8',
                async: 'async'
            });
    })
</script>


<script src="/resources/public/js/bootstrap.min.js"></script>
<script src="/resources/public/js/public.js"></script>
<!--[if lte IE 6]>
<script type="text/javascript" src="/resources/public/js/bootstrap-ie.js"></script>
<![endif]-->
<script type="text/javascript">
    $('#weixinIcon').hover(function () {
        $('#site-footer-weixin').show();
    }, function () {
        $('#site-footer-weixin').hide();
    })
    $('.design').click(function () {
        if (/android/i.test(navigator.userAgent) || /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) || /MicroMessenger/i.test(navigator.userAgent)) {
            alert('为了您能有更好的设计体验，请在电脑上进行在线设计操作O(∩_∩)O');
            return false;
        }
    })
</script>
<div style="display: none">
    <canvas id="canvas_convert" width="500px" height="500px"></canvas>
</div>
<script>
    function convert(){
        //canvg('canvas_convert', 'http://oss-cn-hangzhou.aliyuncs.com/open-edit/dev/design/svg/825/front.svg',{
        //renderCallback: function (dom) {
        //var imageDataUri = $("#canvas_convert")[0].toDataURL("image/png");
        //console.log(imageDataUri);
        //}
        //});
        canvg('canvas_convert', $("#designerContainer svg")[0].outerHTML,{
            log:true,
            useCORS: true,
            ignoreMouse: true, ignoreAnimation: true ,
            renderCallback: function (dom) {
                var imageDataUri = $("#canvas_convert")[0].toDataURL("image/png");
                console.log(imageDataUri);
            }
        })
    }
</script>
</body>
</html>
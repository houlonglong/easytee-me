<?php
$http_host = $_SERVER['HTTP_HOST'];

$activityId = '';
$designId = '';
if (!isset($_REQUEST['ActivityID'])) {
    $res = Model_Design_Tool_Beta::init();
    $design_id = $res['design_id'];
    $activity_id = $res['activity_id'];
    \PtLib\location("/design?DesignID={$design_id}&ActivityID={$activity_id}");exit;
} else {
    $activityId = intval($_REQUEST['ActivityID']);
    $activity = Model_Design_Tool_Beta::get_act_by_id($activityId);
    // 已经生产的活动不能回到设计
    if ($activity['status'] != 'create') {
        \PtLib\location("/activity/{$activityId}");exit;
    }
    $style_id = $activity['app_product_style_id'];
    $pro_id = $activity['app_product_id'];
    $design_id = $activity['design_id'];
}
if (!isset($pro_id)) {
    $pro_id = 2;
    $style_id = 18;
}
$is_login = Model_User_Auth::is_logined()?1:0;
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
    <?php include(block("block/html_head"));?>
    <script type="text/javascript" src="/js/libs/canvg/canvg.js"></script>
    <script src="/js/libs/snap.svg/snap.svg.js"></script>
    <script src="/js/app/convert.js"></script>
</head>
<body>
<?php include(block("block/nav_bar"));?>
<div class="container">
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

                    "DesignID": "<?=$design_id?>",  //修改现有设计时，传入该参数
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
<?php include(block("block/page_footer"));?>

<div style="display: none">
    <canvas id="canvas_convert" width="500px" height="500px"></canvas>
</div>
<div style="display: none">
    <svg width='500' height='500' id='svg_tmp'></svg>
</div>

<script>
function pt_get_js(){
    $.getScript("/js/app/convert.js?"+(+new Date()),function(){

    });
}
</script>
</body>
</html>
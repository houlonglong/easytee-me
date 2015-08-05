<!DOCTYPE html>
<html lang="zh-CN">
<?php echo $this->element('site-header'); ?>
<body>
<?php echo $this->element('page-header'); ?>
<div class="container">
    <div class="row">
        <div class="col-12" id="designerParentContainer" style="margin: 70px auto 20px auto;height: 731px;">
            <script type="text/javascript" language="javascript"
                    src="<?php echo EASYTEE_API;?>designer/html5/ds/js/launcher.js"></script>
            <script type="text/javascript" language="javascript">

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
                    "DesignerLocation": "<?php echo EASYTEE_API;?>designer/html5",
                    "ApiDomain": "<?php echo substr(EASYTEE_API,7,-1);?>",
                    "SSLEnabled": false,
                    "SSLApiDomain": "<?php echo substr(EASYTEE_API,7,-1);?>",
                    "CdnDomain": "cdn.open.easytee.me",
                    "SSLCdnDomain": "cdn.open.easytee.me",

                    "AppToken": "<?php echo EASYTEE_APPKEY;?>",
                    "AppURI": "TShirt_Elephant",
                    "UserToken": "<?php echo isset($userToken)?$userToken:0;?>",

                    "EnforceBoundaries": true, //强制设计边界
                    "Background": "FFFFFF",
                    "VectorOnly": false,   //仅限矢量图
                    "DigitalPrint": false, //数码
                    "ScreenPrint": true,   //丝网
                    "Embroidery": false,   //刺绣，暂未能提供该功能
                    "MaxScreenPrintColors": "12", // 丝网印刷最多支持的颜色数量

                    "DesignID": "<?php echo $designId;?>",  //修改现有设计时，传入该参数
                    "DefaultProductID": "<?php echo $appProductId;?>", //默认产品ID
                    "DefaultProductStyleID": "<?php echo $appProductStyleId;?>", //默认产品款式ID
                    "ProductID": "<?php echo $appProductId;?>",
                    "ProductStyleID": "<?php echo $appProductStyleId;?>",
                    "ProductCategoryID": "",
                    "ClipArtGalleryID": "",

                    "StartPage": "", //
                    "StartPageCategoryID": "",
                    "StartPageHTML": "",
                    "StartBanner": "",


                    "NextURL": "",
                    "CartURL": "/TShirt_Elephant/Cart",
                    "OrderSummary": "true",
                    "VideoLink": "http://www.youtube.com/watch?v=EfXICdRwt4E",
                    "Phone": "400-920-2085",
                    "WelcomeScreen": "",
                    "ContactUsLink": "/TShirt_Elephant/Stores/Contact",
                    "WelcomeVideo": "",


                    "RoundPrices": false,

                    "PublisherID": "1",
                    "SessionID": "1",
                    "SessionToken": "83470100-F0AD-4A60-BDEF-53DA9419D745",
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
<?php echo $this->element('site-footer'); ?>
</body>
</html>
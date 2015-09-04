<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<div>
    <script type="text/javascript" language="javascript" src="http://192.168.31.168:8080/design/html5/common/js/launcher.js"></script>
    <div align="center" id="designerParentContainer">
        <script type="text/javascript" language="javascript">
            <?php

            $a = file_get_contents('http://192.168.31.168:8080/clientapi/getToken/wqdc/d43tjnbcxzfsdbgf');

            ?>
            <!--
            window.onbeforeunload = function() { return "您的设计还没有保存，您确定要离开吗？" };

            function StartRedirecting()
            {
                window.onbeforeunload = null;
            }
            var flashvars =
            {
                "DesignerLocation": "//img.open.easytee.me/designstudio/html5",
                "ApiDomain": "open.dev.jzw.la/clientapi",
               // "ApiDomain": "192.168.31.188/clientapi",
                 "ApiDomain": "192.168.31.168:8080/clientapi",
                "SSLEnabled": false,
                "SSLApiDomain": "open.dev.jzw.la/clientapi",
               // "SSLApiDomain": "192.168.31.188/clientapi",
                 "SSLApiDomain": "192.168.31.168:8080/clientapi",
                "CdnDomain":"img.open.easytee.me",
                "SSLCdnDomain":"img.open.easytee.me",

                "AppToken": "<?php echo $a;?>",
                "AppURI": "TShirt_Elephant",
                "UserToken": "<?php echo isset($_GET["UserToken"])?$_GET["UserToken"]:1;?>",

                "EnforceBoundaries": false, //强制设计边界
                "Background": "FFFFFF",
                "VectorOnly": "false",   //仅限矢量图
                "DigitalPrint": "false", //数码
                "ScreenPrint": "true",   //丝网
                "Embroidery": "false",   //刺绣，暂未能提供该功能
                "MaxScreenPrintColors": "12", // 丝网印刷最多支持的颜色数量

                "DesignID": "<?php echo isset($_GET["DesignID"])?$_GET["DesignID"]:'';?>",  //修改现有设计时，传入该参数
                "DefaultProductID": "1", //默认产品ID
                "DefaultProductStyleID": "2", //默认产品款式ID
                "ProductID": "1",
                "ProductStyleID": "2",
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




                "RoundPrices": "false",

                "PublisherID": "1",
                "SessionID": "1",
                "SessionToken": "83470100-F0AD-4A60-BDEF-53DA9419D745",
                "CartRetailItemID": "",
                "UserName": "",
                "UserEmail": "",



                "DisableAddToCart": "false",
                "DisableUploadImage": "false",
                "DisableClipArt": "false",
                "DisableUserArt": "false",
                "DisableProducts": "false",
                "DisableDesigns": "false",
                "DisableDistress": "false",
                "DisableResolutionMeter": "true",
                "DisableUploadVectorArt": "false",
                "DisableUploadRasterArt": "false",



                "OrderID": "",
                "CartID": "",
                "ArtID": "",
                "FontID": "",
                "Admin": "None",
                "GreetBoxSetting": "",
                "HelpVideoOverview": "",
                "AutoZoom": "true",
                "EnableNameNumbers": "false",

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
                "HideProductPricing": "false",

                "HideClipArtNames": "true",
                "HideDesignNames": "true",
                "ThemeName": "spring",
                "Version": "25",
                "BackgroundColor": "FFFFFF",
                "addTextEmbroidery":true

            };


            launchDesigner("HTML5DS", flashvars, document.getElementById("designerParentContainer"));

            // -->
        </script>
    </div>
</div>

</body>
</html>
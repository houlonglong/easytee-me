<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <?php
    include(block("admin/block/html_head"))?>
    <!-- page specific plugin styles -->
    <link rel="stylesheet" href="/ace/assets/css/jquery-ui.min.css" />
    <link rel="stylesheet" href="/ace/assets/css/datepicker.min.css" />
    <link rel="stylesheet" href="/ace/assets/css/ui.jqgrid.min.css" />

    <link rel="stylesheet" type="text/css" href="/js/libs/sweetalert/sweetalert.css">
    <link rel="stylesheet" type="text/css" href="/js/libs/nprogress/nprogress.css">
    <!-- ace styles -->
    <link rel="stylesheet" href="/ace/assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
    <link rel="stylesheet" href="/admin/assets/css/style.css" />
    <style>
        html,body{
            overflow: hidden;
        }
    </style>
</head>
<body class="no-skin">
<?php include(block("admin/block/navbar"))?>
<div class="main-container" id="main-container">
    <script type="text/javascript">try{ace.settings.check('main-container' , 'fixed')}catch(e){}</script>
    <?php include(block("admin/block/sidebar"))?>
    <div class="main-content">
        <div class="main-content-inner">
            <iframe id="iframe_content" src="/admin/activity/index" width="100%" height="100%" frameborder="0"></iframe>
            <iframe id="iframe_sub" src="" width="100%" height="100%" frameborder="0" style="display: none"></iframe>
        </div>
    </div>
</div>
<?php include(block("admin/block/scripts"))?>
<!-- page specific plugin scripts -->
<script src="/ace/assets/js/bootstrap-datepicker.min.js"></script>
<script src="/ace/assets/js/jquery.jqGrid.min.js"></script>
<script src="/ace/assets/js/grid.locale-en.js"></script>

<script src="/js/libs/sweetalert/sweetalert.min.js"></script>
<script src="/js/libs/nprogress/nprogress.js"></script>
<script src="/js/libs/notify/notify.js"></script>

<script src="/js/common.js"></script>
<script src="/js/ptlib.js"></script>

<script type="text/javascript">
    function close_iframe_sub(){
        $("#iframe_content").fadeIn(300);
        $("#iframe_sub").attr("src","").fadeOut(300);
    }
    function iframe_open(obj){
        var href = obj.href;
        $("#iframe_content").fadeOut(300);
        $("#iframe_sub").attr("src",href).fadeIn(300);
        return false;
    }
    function set_content_height(){
        var height = $(window).height() - $("#navbar").height() - $(".footer-content").height();
        $(".main-content-inner").height(height);
    }
    jQuery(function($) {

        $(window).resize(function(){
            set_content_height();
        });
        set_content_height();

        $("#sidebar a").click(function(){
            var href = this.href;
            $("#sidebar li").removeClass("active");
            if(href != 'javascript:void(0);'){
                console.log(href);

                $("#sidebar a").parents().removeClass("active");
                $(this).parent().addClass("active");
                $(this).parents("li").addClass("active");
                $("#iframe_content")[0].src = href;
                $("#iframe_content").fadeIn(300);
                $("#iframe_sub").attr("src","").fadeOut(300);
                return false;
            }else{

            }
        });
    });
</script>
</body>
</html>
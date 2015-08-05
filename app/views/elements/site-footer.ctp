<?php echo $this->element('page-footer'); ?>
<script src="/resources/public/js/bootstrap.min.js"></script>
<script src="/resources/public/js/public.js"></script>
<!--[if lte IE 6]>
<script type="text/javascript" src="<?php echo APP_PATH; ?>/resources/public/js/bootstrap-ie.js"></script>
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

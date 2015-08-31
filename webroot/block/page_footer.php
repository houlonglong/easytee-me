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
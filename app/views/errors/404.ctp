<!DOCTYPE html>
<html lang="zh-CN">
<?php echo $this->element('site-header'); ?>
<body>
<?php echo $this->element('page-header'); ?>
<div class="page-wrapper">
    <div class="container  error-404">
        <div class="row">
            <div class="col-sm-12"><h1><?php echo strip_tags($error_title);?></h1></div>
        </div>
        <div class="row">
            <div class="col-sm-6 col-xs-12">
                <img src="/resources/public/image/404.png" class="img-responsive"/>
            </div>
            <div class="col-sm-6 col-xs-12">
                <p>
                    <span><em id='times-404'>5 </em>秒后返回<a href="/">易衫网首页</a></span>
                    <span>或 <a href="javascript:window.history.go(-1);">返回上一页</a></span>
                </p>
                <div>我们正在联系火星总部查找您要的页面，请返回上一页等待处理...</div>
                <ul>
                    <li>不返回吗？</li>
                    <li>确定不返回吗？</li>
                    <li>真的真的确定不返回吗？</li>
                    <li>好吧，还是随便你要不要真的返回上一页吧？</li>
                    <li class="error-404-mask"></li>
                </ul>
            </div>

        </div>
    </div>
</div>
<?php echo $this->element('site-footer'); ?>
<script>
    $(function () {
        $('.error-404 li.error-404-mask').animate({
            height:'0'
        },8000,function(){
            var li = $('.error-404 li:not(.error-404-mask):last');
            li.animate({'font-size':26},300,function(){
                li.animate({'font-size':16},200,function(){
                    li.animate({'font-size':22},200);
                })
            });
        });
    })
</script>
</body>
</html>
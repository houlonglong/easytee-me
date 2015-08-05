<div class="row supporter">
    <!--列表开始-->
    <?php
    $count = 0;
    if ($supporter && is_array($supporter)) {
        $count = $supporter['count'];
        unset($supporter['count']);
        foreach ($supporter as $s) {
            ?>
            <div class="col-sm-4 col-xs-6">
                <div class="media">
                    <div class="media-left">
                        <a href="#">
                            <img class="media-object img-circle" src="<?php echo $s['image']; ?>" onerror="this.src='/resources/public/image/no-photo.png'">
                        </a>
                    </div>
                    <div class="media-body">
                        <h4 class="media-heading"><?php echo empty($s['userName'])?$s['phone']:$s['userName']; ?><span class="pull-right"><?php echo $s['quantity']; ?> 件</span></h4>
                        <p>
                            <span><?php echo $s['time']; ?></span>
                        </p>
                    </div>
                </div>
            </div>
        <?php }
    }else{
        echo '当前还没有支持者，赶紧成为支持第一人吧！';
    }
    ?>
    <!--列表结束-->
</div>
<nav class="pull-right activity-page">
<?php echo pageClass($count, 30, ''); ?>
</nav>
<script>
$(function(){
    $('.activity-page a').click(function(){
        activityPage('',$(this).attr('href'));
        return false;
    });
    $('.activity-page select').on('change',function(){
         activityPage($(this).val());
        return false;
    })
})
</script>
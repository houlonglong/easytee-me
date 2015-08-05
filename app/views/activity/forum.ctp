<div class="comment-login">
    <p class="mbw">亲，你需要登录后才能对该活动进行评论喔！</p>
    <a class="btn btn-primary" href="/login/" title="登陆">登录</a>
    <a class="btn btn-nature" href="/register/" title="注册">立即注册</a>
</div>
<form class="form" action="" method="POST">
    <textarea class="form-control" name="comtent" placeholder="人可以走，留下你的态度。" maxlength="200"></textarea>
    <button class="btn btn-primary pull-right">发布</button>
</form>
<?php
if ($forum && is_array($forum)) {
    foreach ($forum as $f) {
        ?>
        <div class="comment">
            <div class="media">
                <div class="media-left">
                    <a href="#">
                        <img class="media-object img-circle" data-src="holder.js/64x64" alt="64x64" src="<?php echo $f['image']; ?>" data-holder-rendered="true" style="width: 64px; height: 64px;">
                    </a>
                </div>
                <div class="media-body">
                    <h4 class="media-heading"><?php echo $f['userName']; ?></h4>
                    <p><?php echo $f['content']; ?></p>
                    <time><?php echo $f['postTime']; ?></time>
                </div>
            </div>
        </div>
        <?php
    }
}
?>
<script style="text-javascript"></script>
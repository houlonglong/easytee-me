<!DOCTYPE html>
<html lang="zh-CN">
<?php echo $this->element('site-header'); ?>
<style>

    .invite {
        padding-top: 80px;
        text-align: center;

    }

    .invite .container {
        background-color: #fff;
        padding-bottom: 20px;
    }

    .invite h1 {
        font-size: 36px;
        margin-bottom: 20px;
    }

    .invite p {
        margin: 5px;
    }

    .invite span.share-bg {
        font-weight: bold;
        display: block;
        background: url('/resources/theme/invite/icon.jpg') no-repeat center center;
        padding-top: 200px;
        margin-bottom: 10px;
    }

    .invite .share-input  {
        width: 50%;
        margin: 0 auto;
    }
    .invite #span-copy{

    }
</style>
<body>
<?php echo $this->element('page-header'); ?>
<div class="jumbotron invite">
    <div class="container" style="text-align: center">
        <h1>好东西必须一起分享！</h1>

        <p>若您邀请的朋友成为卖家，您就有机会赚取高达￥50000人民币！</p>

        <p>他每出售一件衣服，易衫网奖励你￥1元，最高可以获得￥<b>50000</b>！</p>

        <p>那收益，犹如滔滔江水,连绵不绝,一发而不可收拾也！</p>

        <span class="share-bg">分享专用链接</span>
        <div class="share-input input-group"><input id="share-link" class="form-control" onclick="this.select()" value="<?php echo 'http://'.SITE_DOMAIN.'/'. (isset($user)?'friend/'.$user['id']:'');?>"/><span class="input-group-btn" id="copy-button" data-clipboard-target="share-link" tabindex="0"><label class="btn btn-success ">复制链接</label></span></div>
    </div>
</div>

<?php echo $this->element('site-footer'); ?>
<script src="/resources/plug/clipboard/zeroClipboard.min.js"></script>
<script>
    $(function(){
        var client = new ZeroClipboard(document.getElementById("copy-button"));
        client.on( "ready", function( readyEvent ) {
            // alert( "ZeroClipboard SWF is ready!" );

            client.on( "aftercopy", function( event ) {
                // `this` === `client`
                // `event.target` === the element that was clicked
                //event.target.style.display = "none";
                alert("已经复制到剪贴板" );
            } );
        } );
    })
</script>
</body>
</html>
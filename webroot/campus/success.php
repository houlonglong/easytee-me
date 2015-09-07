<!DOCTYPE html>
<html lang="zh-CN">
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="Cache-Control" content="no-siteapp"/>
<meta name="renderer" content="webkit">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<title>易衫开学礼</title>
<meta name="keywords" content="定制T恤,定制T恤,T恤,T恤丝网印刷,刺绣,数码印刷,设计,定制服装"/>
<meta name="description" content="使用易衫网的T恤在线设计工具来创建您的作品.您可以上传自己的设计,或者使用我们丰富的素材库和众多的各种字体."/>
<?php include(block("block/html_head"));?>
<link rel="stylesheet" type="text/css" href="/resources/theme/index/css/index.css">
	<link rel="stylesheet" type="text/css" href="/resources/theme/index/css/succyss.css">

<body>
<?php include(block("block/nav_bar"));?>

<!-- 新加的注册成功的页面 -->
		<div class="inform">
			<p class="one">
				非常感谢！我们正在飞速的审核你提交的资料，并将在第一时间给你回复。
			</p>
			<p class="two">
				如对本次活动任何意见和建议，可直接发送邮件至service@easytee.me或加入<span>QQ群346527251</span>与管理员进行沟通
			</p>
		</div>
		<div class="banner">
			<div class="color">
			</div>
			<img src="/resources/theme/index/image/banner-act.jpg" alt="开学有礼">
		</div>
		<div class="main">
		</div>
		<div class="btns">
			<span>立刻分享</span>
			<div class="shar bdsharebuttonbox"  data-tag="share_1">

			<a target="blank"  data-cmd="sqq"></a>
			<a target="blank"  data-cmd="tsina"></a>
			<a target="blank" data-cmd="weixin"></a>
			<a target="blank" data-cmd="renren"></a>

			</div>
			</div>

<?php include(block("block/page_footer"));
$http_host = $_SERVER['HTTP_HOST']  ?>
</body>
<script>
	<?php if(Model_User_Auth::is_logined()){
    echo 'var uid = '.Model_User_Auth::get_uid();
    }else{
    echo 'var uid = null';
    }?>;

	if(uid){
		var bdUrl = 'http://<?php echo $http_host ?>/campus/index?invite='+uid;
	}else{
		var bdUrl = 'http://<?php echo $http_host ?>/campus/index';
	}
window._bd_share_config = {
        common: {
            bdText: '易衫开学送好礼，学生注册即送20元现金，分享再获好礼',
            bdDesc: '开学“易”，好礼“衫”重奏，快来体验易衫网的全新定制服务',
            bdUrl: bdUrl,
            bdPic: 'http://<?php echo $http_host ?>/resources/theme/index/image/fenxiang.jpg'
        },
        share: [{
            "bdSize": 32
        }]
    };
    with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)]
</script>
</html>


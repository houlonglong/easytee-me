<!DOCTYPE html>
<html ng-app="appMain">
<head>

    <meta charset="utf-8">
    <title>服装在线设计工具 - 易衫网</title>
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" type="text/css" href="<?=WWW_URL;?>/assets/css/base.css">
    <link rel="stylesheet" type="text/css" href="<?=WWW_URL;?>/assets/css/bootstrap.min.css">
    <style type="text/css">
    	a:link{text-decoration:none;}
    	a:visited{text-decoration:none;}
    	a:hover{text-decoration:none;}
    	a:active{text-decoration:none;}
    	.captcha-head{background-color:#019dd8;padding:10px 20px;}
    	.captcha-head a{display:block;margin:0;color:#fff;font-size:16px;height:70px;line-height:70px;background:url(<?=WWW_URL;?>/assets/images/captcha.jpg) no-repeat left center;padding-left:90px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}
    	.captcha-content{padding:20px 20px 60px 20px;border-bottom:1px solid #999;}
    	.captcha-content p.textIndent{text-indent: 2em;}
    	.captcha-foot{padding:20px;}
    	.captcha-foot p.textIndent{text-indent: 1em;font-size:12px;}
    	.captcha-foot .col-sm-6{margin-bottom:10px;}

    	@media (min-width:768px){
    		.textRight{text-align: right;}
    	}
    </style>
</head>
<body>
	<div class='container'>
		<div class='row'>
			<div class='col-sm-12'>
				<div class='captcha-head'>
					<a href='#'>争做中国最大的个性化团体服装定制平台</a>
				</div>
				<div class='captcha-content'>
					<p>亲爱的<span>易衫网用户</span>：</p>
					<p class='textIndent'>欢迎来到易衫网。</p>
					<p>您此次找回以的验证码是：<em><?=$captcha;?></em>，请在30分钟内使用。</p>
					<p class='textIndent'>如果您并未发过此请求，那么您可以放心的忽略此邮件，无需进一步采取任何操作。</p>
					<br>
					<p>此致</p>
					<p>易衫网敬上</p>
					<p><?=date('Y-m-d');?></p>
				</div>
				<div class='captcha-foot'>
					<div class='row'>
						<div class='col-sm-6'>
							网址：<a href='http://www.easytee.me'>www.easytee.me</a>
						</div>
						<div class='col-sm-6 textRight'>
							<span>客服：4009202085</span>
						</div>
					</div>
					<p class='textIndent'>（请注意，该电子邮件地址不接受回复邮件，要解决问题或了解您的帐户详情，请访问微博帮助）</p>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
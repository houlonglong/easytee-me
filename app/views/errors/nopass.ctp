<!DOCTYPE html>
<html lang="zh-CN">
<?php echo $this->element('site-header'); ?>
<body>
<?php echo $this->element('page-header'); ?>
<div class="page-wrapper">
    <div class="container  error-nopass">
        <div class="row">
            <div class="col-sm-12">
                <div class="ontouch">
                    <h4 class="text-danger">很遗憾，该活动未通过审核。</h4>
                    <p>易衫网致力于尊重知识产权，保护用户合法权益。</p>
                    <p>您可以：</p>
                    <ul>
                        <li>了解易衫网的<a href="/about#about-4">活动审核规则</a>。</li>
                        <li>请修改活动内容，然后发布。</li>
                        <!-- todo  -->
                        <li style="display: none;">您也可以到<a href="http://bbs.easytee.me/">易衫社区</a>获取帮助。</li>
                    </ul>
                    <img src="/resources/public/image/notocuh.png">
                </div>
            </div>
        </div>
    </div>
</div>
<?php echo $this->element('site-footer'); ?>
</body>
</html>
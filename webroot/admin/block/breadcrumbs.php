<div class="breadcrumbs" id="breadcrumbs" style="padding-left: 132px;">
    <script type="text/javascript">try{ace.settings.check('breadcrumbs' , 'fixed')}catch(e){}</script>
    <ul class="breadcrumb">
        <li><i class="ace-icon fa fa-home home-icon"></i> 首页</li>
        <?php if(isset($page_title)){ ?>
        <li><?=$page_title?></li>
        <?php } ?>

    </ul><!-- /.breadcrumb -->
    <div class="nav-search " id="nav-search" style="left:22px;">
        <button class="btn btn-xs btn-white btn-warning btn-bold" onclick="history.go(-1)">
            <i class="ace-icon fa fa-step-backward"></i>
            上一步
        </button>
        <button class="btn btn-xs btn-white btn-success btn-bold" onclick="location.reload()">
            <i class="ace-icon fa fa-refresh"></i>
            刷新
        </button>
    </div><!-- /.nav-search -->
</div>
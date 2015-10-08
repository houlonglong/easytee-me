<div class="breadcrumbs" id="breadcrumbs">
    <script type="text/javascript">try{ace.settings.check('breadcrumbs' , 'fixed')}catch(e){}</script>
    <ul class="breadcrumb">
        <li><i class="ace-icon fa fa-home home-icon"></i> 首页</li>
        <?php if(isset($page_title)){ ?>
        <li><?=$page_title?></li>
        <?php } ?>

    </ul><!-- /.breadcrumb -->
    <div class="nav-search " id="nav-search">

        <button class="btn btn-xs btn-white btn-warning btn-bold" onclick="history.go(-1)">
            <i class="ace-icon fa fa-step-backward"></i>
            上一步
        </button>
    </div><!-- /.nav-search -->
</div>
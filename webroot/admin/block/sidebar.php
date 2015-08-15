<div id="sidebar" class="sidebar responsive">
    <script type="text/javascript">
        try{ace.settings.check('sidebar','fixed')}catch(e){}
    </script>
    <ul class="nav nav-list">
        <?php foreach(Model_Admin_Ui::siderbar() as $menu):
            if(!empty($menu['hide_menu'])){
                continue;
            }?>
        <li class="<?=Model_Admin_Ui::siderbar_active_menu($menu)?>">
            <a href="<?=Model_Admin_Ui::get_menu_url($menu)?>" class="dropdown-toggle">
                <i class="menu-icon fa <?= empty($menu['icon']) ? "fa-list" : $menu['icon']?>"></i>
                <span class="menu-text"> <?=$menu['title']?> </span>
                <?= empty($menu['control']) ? "" : '<b class="arrow fa fa-angle-down"></b>'?>
            </a>
            <b class="arrow"></b>

        </li>
        <?php endforeach;?>
    </ul><!-- /.nav-list -->
    <div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
        <i class="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
    </div>
    <script type="text/javascript">
        try{ace.settings.check('sidebar' , 'collapsed')}catch(e){}
    </script>
</div>
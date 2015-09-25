<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <?php
    /**
     * Controller Name Replace
     *
     */
    $__model_path = "";
    include(block("admin/block/html_head"))?>
    <!-- page specific plugin styles -->
    <link rel="stylesheet" href="/ace/assets/css/jquery-ui.min.css" />
    <link rel="stylesheet" href="/ace/assets/css/datepicker.min.css" />
    <link rel="stylesheet" href="/ace/assets/css/ui.jqgrid.min.css" />
    <!-- ace styles -->
    <link rel="stylesheet" href="/ace/assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
    <link rel="stylesheet" href="/admin/assets/css/style.css" class="ace-main-stylesheet" />
</head>
<body class="no-skin">
<?php include(block("admin/block/navbar"))?>
<div class="main-container" id="main-container">
    <script type="text/javascript">try{ace.settings.check('main-container' , 'fixed')}catch(e){}</script>
    <?php include(block("admin/block/sidebar"))?>
    <div class="main-content">
        <div class="main-content-inner">
            <?php include(block("admin/block/breadcrumbs"))?>
            <div class="page-content">
                <?php include(block("admin/block/ace-settings-container"))?>
                <div class="row">
                    <div class="col-xs-12">
                        <div class="row" style="padding:20px 0">
                            <div class="col-xs-12" id="query_area"></div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <table id="grid-table"></table>
                                <div id="grid-pager"></div>
                                <script type="text/javascript">
                                    var $path_base = ".";
                                </script>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php include(block("admin/block/footer"))?>
</div>
<?php include(block("admin/block/scripts"))?>
<!-- page specific plugin scripts -->
<script src="/ace/assets/js/bootstrap-datepicker.min.js"></script>
<script src="/ace/assets/js/jquery.jqGrid.min.js"></script>
<script src="/ace/assets/js/grid.locale-en.js"></script>
<script type="text/javascript">
    var grid_selector = "#grid-table";
    var pager_selector = "#grid-pager";
    function search(){
        var $query = {
            title:$('#title').val()
        };
        $(grid_selector).jqGrid('setGridParam',{
            datatype:'json',
            postData:$query, //发送数据
            page:1
        }).trigger("reloadGrid"); //重新载入
    }
    jQuery(function($) {
        //$("#query_area").html('<label>Ttile</label><input type="text" id="title"><button class="btn-primary" onclick="search()">search</button>');
        var url_api_base   = "<?php echo $__model_path;?>";
        var url_api_list   = "/api?model="+url_api_base + "&action=list";

        var grid_setting = {
            url:url_api_list,
            url_save:url_api_edit,
            postData:{},
            sortorder:"desc",
            method:"POST",
            height:800,
            rowNum:15,
            rowList:[15,30,50,100],
            caption:"",
            cols:[
                {title:"Id",name:'id',index:'id', width:30, sorttype:"int", editable: false},
                {title:"Title",name:'title',index:'title',editable: false,sortable:false},
            ]

        };

        function get_col(cols){
            var col_name = [];
            for(i in cols){
                var col = cols[i];
                col_name.push(col.title);
            }
            return {
                'name':col_name,
                'model':cols
            };
        }

        //resize to fit page size
        $(window).on('resize.jqGrid', function () {
            $(grid_selector).jqGrid( 'setGridWidth', $(".page-content").width() );
        });
        //resize on sidebar collapse/expand
        var parent_column = $(grid_selector).closest('[class*="col-"]');
        $(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
            if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' ) {
                //setTimeout is for webkit only to give time for DOM changes and then redraw!!!
                setTimeout(function() {
                    $(grid_selector).jqGrid( 'setGridWidth', parent_column.width() );
                }, 0);
            }
        });

        jQuery(grid_selector).jqGrid({

            jsonReader: {
                root:  function (obj) {
                    return obj.return.rows;
                },
                records: function (obj) {
                    return obj.return.records;
                },
                page: function (obj) {
                    return obj.return.page;
                },
                total: function (obj) {
                    return obj.return.total;
                }
            },
            mtype:grid_setting.method,
            url: grid_setting.url,
            datatype: "json",
            height: grid_setting.height,
            colNames:get_col(grid_setting.cols)['name'],
            colModel:get_col(grid_setting.cols)['model'],
            viewrecords : true,
            rowNum:grid_setting.rowNum,
            rowList:grid_setting.rowList,
            pager : pager_selector,
            altRows: false,
            //toppager: true,
            multiselect: false,
            //multikey: "ctrlKey",
            multiboxonly: false,
            loadComplete : function(xhr) {

            },
            editurl: grid_setting.url_save,//nothing is saved
            caption: grid_setting.caption


        });
        $(window).triggerHandler('resize.jqGrid');//trigger window resize to make the grid get the correct size
        //navButtons
        jQuery(grid_selector).jqGrid('navGrid',pager_selector,
            { 	//navbar options
                edit: false,
                editicon : 'ace-icon fa fa-pencil blue',
                add: false,
                addicon : 'ace-icon fa fa-plus-circle purple',
                del: false,
                delicon : 'ace-icon fa fa-trash-o red',
                search: false,
                searchicon : 'ace-icon fa fa-search orange',
                refresh: true,
                refreshicon : 'ace-icon fa fa-refresh green',
                view: false,
                viewicon : 'ace-icon fa fa-search-plus grey',
            }
        );

        $(document).one('ajaxloadstart.page', function(e) {
            $(grid_selector).jqGrid('GridUnload');
            $('.ui-jqdialog').remove();
        });
    });
</script>
</body>
</html>
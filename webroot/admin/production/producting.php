<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <?php
    /**
     * 生产管理
     *
     */
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
                        <!-- PAGE CONTENT BEGINS -->
                        <div class="row" style="padding:20px 0;display:none">
                            <div class="col-xs-12">
                                <label>
                                    Ttile
                                </label>
                                <input type="text" id="title">
                                <button class="btn-primary" onclick="search()">search</button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="tabbable">
                                    <ul class="nav nav-tabs padding-12 tab-color-blue background-blue" id="myTab4">
                                        <li>
                                            <a data-toggle="tab" href="#" onclick="return do_product('index');">待生产</a>
                                        </li class="active">
                                        <li class="active">
                                            <a data-toggle="tab" href="#" onclick="return do_product('producting');">生产中</a>
                                        </li>
                                        <li>
                                            <a data-toggle="tab" href="#" onclick="return do_product('producted');">已完成侍发货</a>
                                        </li>
                                        <li>
                                            <a data-toggle="tab" href="#" onclick="return do_product('shipped');">已发货</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content">
                                        <div class="tab-pane in active">
                                            <table id="grid-table"></table>
                                            <div id="grid-pager"></div>
                                            <script type="text/javascript">
                                                var $path_base = ".";//in Ace demo this will be used for editurl parameter
                                            </script>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <!-- /.span -->
                        </div>
                        <!-- PAGE CONTENT ENDS -->
                    </div><!-- /.col -->
                </div><!-- /.row -->
            </div><!-- /.page-content -->
        </div>
    </div><!-- /.main-content -->
    <?php include(block("admin/block/footer"))?>
</div><!-- /.main-container -->
<?php include(block("admin/block/scripts"))?>
<!-- page specific plugin scripts -->
<script src="/ace/assets/js/bootstrap-datepicker.min.js"></script>
<script src="/ace/assets/js/jquery.jqGrid.min.js"></script>
<script src="/ace/assets/js/grid.locale-en.js"></script>


<div id="product_model" class="bootbox modal fade in" tabindex="-1" role="dialog" aria-hidden="false"
     style="padding-right: 15px;">
    <div class="modal-backdrop fade in" style="height: 697px;"></div>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×
                </button>
                <h4 class="modal-title">修改状态</h4></div>
            <div class="modal-body">
                <input type="hidden" value="" id="model_act_id">
                <div class="bootbox-body">
                    <div class="tabbable">
                        <ul class="nav nav-tabs padding-12 tab-color-blue background-blue" id="myTab4">
                            <li class="active">
                                <a data-toggle="tab" href="#change_man">更换供应商</a>
                            </li>
                            <li>
                                <a data-toggle="tab" href="#finish_product">完成生产</a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div id="change_man" class="tab-pane in active">
                                <div class="modal-body">
                                    <div class="form-group" style="margin-left: 0px;">
                                        <label class="col-sm-3 control-label no-padding-right" for="form-field-1">请选择印花供应商</label>
                                        <div class="col-sm-9">
                                            <select id="manufacturer_id" class="col-xs-10 col-sm-5">
                                                <?php
                                                $manufacturers = PtLib\db_select_rows("select * from manufacturers");
                                                foreach($manufacturers as $manufacturer){?>
                                                    <option value="<?=$manufacturer['id']?>"><?=$manufacturer['name']?></option><?php } ?>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-sm btn-primary apply" onclick="change_man(this)"> 更换 </button>
                                </div>
                            </div>
                            <div id="finish_product" class="tab-pane">
                                <form class="form-horizontal">
                                    <div class="form-group" style="margin-left: -120px;">
                                        <label class="col-sm-3 control-label no-padding-right" for="form-field-1">质检状态</label>
                                        <div class="col-sm-9">
                                            <input name="" id="zj_status" cols="30" rows="10" class="form-control" style="">
                                        </div>
                                    </div>
                                    <div class="form-group" style="margin-left: -120px;">
                                        <label class="col-sm-3 control-label no-padding-right" for="form-field-1">质检意见</label>
                                        <div class="col-sm-9">
                                            <textarea name="" id="zj_opinion" cols="30" rows="10" class="form-control" style="width: 307px;height: 96px;"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-actions center">
                                        <button type="button" class="btn btn-sm btn-success btn btn-sm" onclick="finish_product(this)">
                                            完成
                                        </button>
                                    </div>
                                </form>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

<script type="text/javascript">
    function change_man(obj){
        if(!confirm("确定要执行此操作么!")) return;
        var id = $("#model_act_id").val();
        var manufacturer_id = $("#manufacturer_id").val();
        $.post("/api",{
            model:"/admin/production",
            action:"change_man",
            id:id,
            manufacturer_id:manufacturer_id
        },function(data){
            location.reload();
        });
    }
    function finish_product(obj){
        if(!confirm("确定要执行此操作么!")) return;
        var id = $("#model_act_id").val();
        var zj_status = $("#zj_status").val();
        var zj_opinion = $("#zj_opinion").val();
        $.post("/api",{
            model:"/admin/production",
            action:"finish_product",
            id:id,
            zj_status:zj_status,
            zj_opinion:zj_opinion
        },function(data){
            location.reload();
        });

    }
    function change_status(obj,id){
        $("#model_act_id").val(id);
        $("#product_model").modal("show");
    }

    var frontend_domain = "<?php echo FRONTEND_DOMAIN;?>";
    var url_api_base   = "admin/production";
    var url_api_list   = "/api?model="+url_api_base + "&action=list&status=producting";
    var url_api_edit   = "/api?model="+url_api_base + "&action=edit";
    var url_api_detail = "/"+url_api_base + "/detail";
    function do_product($action){
        location.href = "/"+url_api_base+"/"+$action;
        return false;
    }
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

        var grid_setting = {
            url:url_api_list,
            url_save:url_api_edit,
            method:"POST",
            height:500,
            rowNum:15,
            rowList:[15,30,50,100],
            caption:"",
            cols:[
                {title:"活动ID",name:'id',index:'id', width:40, sorttype:"int", editable: false},
                {title:"活动名称",name:'name',index:'name',editable: true,editoptions:{size:"20",maxlength:"30"},
                    formatter:function(cellvalue, options, rowObject){
                        return '<a href="http://'+frontend_domain+'/activity/'+rowObject['id']+'" target = "_black">'+cellvalue+'</a';
                    }
                },
                {title:"发起人",name:'nick_name',index:'nick_name',width:100,sortable:false,editable: false},
                {title:"订单成交数",name:'sales_count',index:'sales_count',width:100,sortable:false,editable: false},
                {title:"预计交货时间",name:'real_end_time',index:'real_end_time',width:100,sortable:false,editable: false},
                {title:"操作",name:'options',index:'', width:160, fixed:true, sortable:false, resize:false,
                    formatter:function(cellvalue, options, rowObject){
                        var html = '<a class="btn btn-xs btn-primary" href="/admin/production/step/detail?id='+rowObject['id']+'" target = "_black">生产详情</a>';
                        html += ' <a class="btn btn-xs btn-success" onclick="change_status(this,'+rowObject.id+')" >修改状态</a>';
                        return html;
                    }
                },
            ]

        };
        /**
         //colNames:[' ', 'ID','Last Sales','Name', 'Stock', 'Ship via','Notes'],
         /*
         colModel:[
         {title:"",name:'myac',index:'', width:80, fixed:true, sortable:false, resize:false,
             formatter:'actions',
             formatoptions:{
                 keys:true,
                 //delbutton: false,//disable delete button

                 delOptions:{recreateForm: true, beforeShowForm:beforeDeleteCallback},
                 //editformbutton:true, editOptions:{recreateForm: true, beforeShowForm:beforeEditCallback}
             }
         },
         {title:"",name:'id',index:'id', width:60, sorttype:"int", editable: true},
         {title:"",name:'sdate',index:'sdate',width:90, editable:true, sorttype:"date",unformat: pickDate},
         {title:"",name:'name',index:'name', width:150,editable: true,editoptions:{size:"20",maxlength:"30"}},
         {title:"",name:'stock',index:'stock', width:70, editable: true,edittype:"checkbox",editoptions: {value:"Yes:No"},unformat: aceSwitch},
         {title:"",name:'ship',index:'ship', width:90, editable: true,edittype:"select",editoptions:{value:"FE:FedEx;IN:InTime;TN:TNT;AR:ARAMEX"}},
         {title:"",name:'note',index:'note', width:150, sortable:false,editable: true,edittype:"textarea", editoptions:{rows:"2",cols:"10"}}
         ],
         */

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

        //if your grid is inside another element, for example a tab pane, you should use its parent's width:
        /**
         $(window).on('resize.jqGrid', function () {
					var parent_width = $(grid_selector).closest('.tab-pane').width();
					$(grid_selector).jqGrid( 'setGridWidth', parent_width );
				})
         //and also set width when tab pane becomes visible
         $('#myTab a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
				  if($(e.target).attr('href') == '#mygrid') {
					var parent_width = $(grid_selector).closest('.tab-pane').width();
					$(grid_selector).jqGrid( 'setGridWidth', parent_width );
				  }
				})
         */
        var subgrid_data =
            [
                {id:"1", name:"sub grid item 1", qty: 11}
            ];
        jQuery(grid_selector).jqGrid({
            //direction: "rtl",

            //subgrid options
            subGrid : false,
            //subGridModel: [{ name : ['No','Item Name','Qty'], width : [55,200,80] }],
            //datatype: "xml",
            subGridOptions : {
                plusicon : "ace-icon fa fa-plus center bigger-110 blue",
                minusicon  : "ace-icon fa fa-minus center bigger-110 blue",
                openicon : "ace-icon fa fa-chevron-right center orange"
            },
            //for this example we are using local data
            subGridRowExpanded: function (subgridDivId, rowId) {
                var subgridTableId = subgridDivId + "_t";
                $("#" + subgridDivId).html("<table id='" + subgridTableId + "'></table>");
                $("#" + subgridTableId).jqGrid({
                    datatype: 'local',
                    data: subgrid_data,
                    colNames: ['No','Item Name','Qty'],
                    colModel: [
                        { name: 'id', width: 50 },
                        { name: 'name', width: 150 },
                        { name: 'qty', width: 50 }
                    ]
                });
            },
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
            //colNames:[' ', 'ID','Last Sales','Name', 'Stock', 'Ship via','Notes'],
            /*
             colModel:[
             {name:'myac',index:'', width:80, fixed:true, sortable:false, resize:false,
             formatter:'actions',
             formatoptions:{
             keys:true,
             //delbutton: false,//disable delete button

             delOptions:{recreateForm: true, beforeShowForm:beforeDeleteCallback},
             //editformbutton:true, editOptions:{recreateForm: true, beforeShowForm:beforeEditCallback}
             }
             },
             {name:'id',index:'id', width:60, sorttype:"int", editable: true},
             {name:'sdate',index:'sdate',width:90, editable:true, sorttype:"date",unformat: pickDate},
             {name:'name',index:'name', width:150,editable: true,editoptions:{size:"20",maxlength:"30"}},
             {name:'stock',index:'stock', width:70, editable: true,edittype:"checkbox",editoptions: {value:"Yes:No"},unformat: aceSwitch},
             {name:'ship',index:'ship', width:90, editable: true,edittype:"select",editoptions:{value:"FE:FedEx;IN:InTime;TN:TNT;AR:ARAMEX"}},
             {name:'note',index:'note', width:150, sortable:false,editable: true,edittype:"textarea", editoptions:{rows:"2",cols:"10"}}
             ],
             */
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
                console.log(xhr);
                var table = this;
                setTimeout(function(){
                    styleCheckbox(table);

                    updateActionIcons(table);
                    updatePagerIcons(table);
                    enableTooltips(table);
                }, 0);
            },

            editurl: grid_setting.url_save,//nothing is saved
            caption: grid_setting.caption

            //,autowidth: true,
            /**
             ,
             grouping:true,
             groupingView : {
						 groupField : ['name'],
						 groupDataSorted : true,
						 plusicon : 'fa fa-chevron-down bigger-110',
						 minusicon : 'fa fa-chevron-up bigger-110'
					},
             caption: "Grouping"
             */

        });
        $(window).triggerHandler('resize.jqGrid');//trigger window resize to make the grid get the correct size

        //enable search/filter toolbar
        //jQuery(grid_selector).jqGrid('filterToolbar',{defaultSearch:true,stringResult:true})
        //jQuery(grid_selector).filterToolbar({});


        //switch element when editing inline
        function aceSwitch( cellvalue, options, cell ) {
            setTimeout(function(){
                $(cell) .find('input[type=checkbox]')
                    .addClass('ace ace-switch ace-switch-5')
                    .after('<span class="lbl"></span>');
            }, 0);
        }
        //enable datepicker
        function pickDate( cellvalue, options, cell ) {
            setTimeout(function(){
                $(cell) .find('input[type=text]')
                    .datepicker({format:'yyyy-mm-dd' , autoclose:true});
            }, 0);
        }


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
            },
            {
                //edit record form
                //closeAfterEdit: true,
                //width: 700,
                recreateForm: true,
                beforeShowForm : function(e) {
                    var form = $(e[0]);
                    form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
                    style_edit_form(form);
                }
            },
            {
                //new record form
                //width: 700,
                closeAfterAdd: true,
                recreateForm: true,
                viewPagerButtons: false,
                beforeShowForm : function(e) {
                    var form = $(e[0]);
                    form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar')
                        .wrapInner('<div class="widget-header" />')
                    style_edit_form(form);
                }
            },
            {
                //delete record form
                recreateForm: true,
                beforeShowForm : function(e) {
                    var form = $(e[0]);
                    if(form.data('styled')) return false;

                    form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
                    style_delete_form(form);

                    form.data('styled', true);
                },
                onClick : function(e) {
                    //alert(1);
                }
            },
            {
                //search form
                recreateForm: true,
                afterShowSearch: function(e){
                    var form = $(e[0]);
                    form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
                    style_search_form(form);
                },
                afterRedraw: function(){
                    style_search_filters($(this));
                }
                ,
                multipleSearch: true,
                /**
                 multipleGroup:true,
                 showQuery: true
                 */
            },
            {
                //view record form
                recreateForm: true,
                beforeShowForm: function(e){
                    var form = $(e[0]);
                    form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
                }
            }
        );

        function style_edit_form(form) {
            //enable datepicker on "sdate" field and switches for "stock" field
            //form.find('input[name=sdate]').datepicker({format:'yyyy-mm-dd' , autoclose:true})

            //form.find('input[name=stock]').addClass('ace ace-switch ace-switch-5').after('<span class="lbl"></span>');
            //don't wrap inside a label element, the checkbox value won't be submitted (POST'ed)
            //.addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');


            //update buttons classes
            var buttons = form.next().find('.EditButton .fm-button');
            buttons.addClass('btn btn-sm').find('[class*="-icon"]').hide();//ui-icon, s-icon
            buttons.eq(0).addClass('btn-primary').prepend('<i class="ace-icon fa fa-check"></i>');
            buttons.eq(1).prepend('<i class="ace-icon fa fa-times"></i>')

            buttons = form.next().find('.navButton a');
            buttons.find('.ui-icon').hide();
            buttons.eq(0).append('<i class="ace-icon fa fa-chevron-left"></i>');
            buttons.eq(1).append('<i class="ace-icon fa fa-chevron-right"></i>');
        }

        function style_delete_form(form) {
            var buttons = form.next().find('.EditButton .fm-button');
            buttons.addClass('btn btn-sm btn-white btn-round').find('[class*="-icon"]').hide();//ui-icon, s-icon
            buttons.eq(0).addClass('btn-danger').prepend('<i class="ace-icon fa fa-trash-o"></i>');
            buttons.eq(1).addClass('btn-default').prepend('<i class="ace-icon fa fa-times"></i>')
        }

        function style_search_filters(form) {
            form.find('.delete-rule').val('X');
            form.find('.add-rule').addClass('btn btn-xs btn-primary');
            form.find('.add-group').addClass('btn btn-xs btn-success');
            form.find('.delete-group').addClass('btn btn-xs btn-danger');
        }
        function style_search_form(form) {
            var dialog = form.closest('.ui-jqdialog');
            var buttons = dialog.find('.EditTable')
            buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'ace-icon fa fa-retweet');
            buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'ace-icon fa fa-comment-o');
            buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'ace-icon fa fa-search');
        }

        function beforeDeleteCallback(e) {
            var form = $(e[0]);
            if(form.data('styled')) return false;

            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
            style_delete_form(form);

            form.data('styled', true);
        }

        function beforeEditCallback(e) {
            var form = $(e[0]);
            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />');
            style_edit_form(form);
        }



        //it causes some flicker when reloading or navigating grid
        //it may be possible to have some custom formatter to do this as the grid is being created to prevent this
        //or go back to default browser checkbox styles for the grid
        function styleCheckbox(table) {
            /**
             $(table).find('input:checkbox').addClass('ace')
             .wrap('<label />')
             .after('<span class="lbl align-top" />')


             $('.ui-jqgrid-labels th[id*="_cb"]:first-child')
             .find('input.cbox[type=checkbox]').addClass('ace')
             .wrap('<label />').after('<span class="lbl align-top" />');
             */
        }


        //unlike navButtons icons, action icons in rows seem to be hard-coded
        //you can change them like this in here if you want
        function updateActionIcons(table) {
            /**
             var replacement =
             {
                 'ui-ace-icon fa fa-pencil' : 'ace-icon fa fa-pencil blue',
                 'ui-ace-icon fa fa-trash-o' : 'ace-icon fa fa-trash-o red',
                 'ui-icon-disk' : 'ace-icon fa fa-check green',
                 'ui-icon-cancel' : 'ace-icon fa fa-times red'
             };
             $(table).find('.ui-pg-div span.ui-icon').each(function(){
						var icon = $(this);
						var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
						if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
					})
             */
        }

        //replace icons with FontAwesome icons like above
        function updatePagerIcons(table) {
            var replacement =
            {
                'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
                'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
                'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
                'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
            };
            $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
                var icon = $(this);
                var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

                if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
            })
        }

        function enableTooltips(table) {
            $('.navtable .ui-pg-button').tooltip({container:'body'});
            $(table).find('.ui-pg-div').tooltip({container:'body'});
        }

        //var selr = jQuery(grid_selector).jqGrid('getGridParam','selrow');

        $(document).one('ajaxloadstart.page', function(e) {
            $(grid_selector).jqGrid('GridUnload');
            $('.ui-jqdialog').remove();
        });
    });



</script>
</body>
</html>
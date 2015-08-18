<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <?php
    /**
     * 订单管理
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
                        <div class="row" style="margin-bottom:20px">
                                <div class="col-xs-2">
                                    <label>
                                        订单号
                                    </label>
                                    <input type="text" id="order-no">
                                </div>
                                <div class="col-xs-2">
                                    <label>
                                        活动名称
                                    </label>
                                    <input type="text" id="activity-name">
                                </div>
                                <div class="col-xs-2">
                                    <label>
                                        订单状态
                                    </label>
                                    <input type="text" id="order-status">
                                </div>
                                <div class="col-xs-2">
                                    <label>
                                        用户名
                                    </label>
                                    <input type="text" id="username">
                                </div>
                                <div class="col-xs-2">
                                    <button class="btn-primary" onclick="search()">search</button>
                                </div>

                        </div>
                        <div class="row">
                            <div class="col-xs-12">

                                <table id="grid-table"></table>

                                <div id="grid-pager"></div>

                                <script type="text/javascript">
                                    var $path_base = ".";//in Ace demo this will be used for editurl parameter
                                </script>


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
<script type="text/javascript">

    var grid_selector = "#grid-table";
    var pager_selector = "#grid-pager";
    function search(){
        var $query = {
            order_no:$('#order-no').val(),
            activity_name:$('#activity-name').val(),
            status:$('#order-status').val(),
            username:$('#username').val(),

        };
        $(grid_selector).jqGrid('setGridParam',{
            datatype:'json',
            postData:$query, //发送数据
            page:1
        }).trigger("reloadGrid"); //重新载入
    }
    var status = {
        "待发货":"label label-sm label-success arrowed-in",
        "已关闭":"label label-sm label-warning",
        '已发货':"label label-sm label-info arrowed arrowed-righ",
        '已完成':"label label-sm label-inverse arrowed-in",
    };
    jQuery(function($) {
        var grid_setting = {
            url:"/api?model=admin/order&action=list",
            url_save:"/api?model=admin/order&action=edit",
            method:"POST",
            height:500,
            rowNum:15,
            rowList:[15,30,50,100],
            caption:"",
            cols:[
                {title:"Id",name:'id',index:'id', width:40, sorttype:"int", editable: false},
                {title:"订单号",name:'order_no',index:'order_no',width:90,editable: false,editoptions:{size:"20",maxlength:"30"},
                    formatter:'showlink',
                    formatoptions:{
                        baseLinkUrl:'/admin/activity/order_detail',
                        addParam: '',//&t=1
                        idName:'id'
                    }
                },
                {title:"用户名",name:'username',index:'username',width:90,editable: false,editoptions:{size:"20",maxlength:"30"}},
                {title:"活动名称",name:'name',index:'name',editable: false,editoptions:{size:"20",maxlength:"30"},
                    formatter: function (cellvalue, options, rowObject) {
                        return '<a href="/admin/activity/detail?id=' + rowObject.activity_id + '">'+cellvalue+'</a>';
                    }
                },
                {title:"数量",name:'quantity',index:'quantity',width:90,sortable:false,editable: false},
                {title:"订单金额",name:'total_price',index:'total_price',width:90,sortable:false,editable: false},
                {title:"运费",name:'express_price',index:'express_price',width:90,sortable:false,editable: false},
                {title:"状态",name:'status',index:'status',width:90,sortable:false,editable: true,edittype:"custom",
//                    editoptions:{value:"待付款:待付款;已发货:已发货;已收货:已收货;已完成:已完成;已关闭:已关闭"},
                    editoptions:{custom_element: mystatuselem, custom_value:myvalue},
                    formatter:function(cellvalue, options, rowObject){
                        var img = "";
                        if(cellvalue == '待付款'){
                            img = '<span class="label label-sm label-default arrowed-in">'+cellvalue+'</span>';
                        }
                        if(cellvalue == '待发货'){
                            img = '<span class="label label-sm label-success arrowed-in">'+cellvalue+'</span>';
                        }
                        if(cellvalue == '已关闭'){
                            img = '<span class="label label-sm label-warning">'+cellvalue+'</span>';
                        }
                        if(cellvalue == '已发货'){
                            img = '<span class="label label-sm label-info arrowed arrowed-righ">'+cellvalue+'</span>';
                        }
                        if(cellvalue == '已完成'){
                            img = '<span class="label label-sm label-danger arrowed-in">'+cellvalue+'</span>';
                        }
                        if(cellvalue == '已收货'){
                            img = '<span class="label label-sm label-primary arrowed-in">'+cellvalue+'</span>';
                        }
                        return img;
                    }
                },
                {title:"操作",name:'options',index:'', width:80, fixed:true, sortable:false, resize:false,
                    formatter:'actions',
                    formatoptions:{
                        keys:true,
                        //delbutton: false,//disable delete button
                        baseLinkUrl:'someurl.php', addParam: '&action=edit', idName:'id',
                        delOptions:{recreateForm: true, beforeShowForm:beforeDeleteCallback}
                        //editformbutton:true, editOptions:{recreateForm: true, beforeShowForm:beforeEditCallback}
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

        function mystatuselem (value, options) {
            value = $(value).data("status");
            var el = document.createElement("select");
            $(el).append('<option role="option" value="待付款">待付款</option><option role="option" value="待付款">待付款</option><option role="option" value="待发货">待发货' +
                '</option><option role="option" value="已发货">已发货</option><option role="option" value="已收货">已收货</option><option role="option" value="已发货">已发货</option>' +
                '<option role="option" value="已收货">已完成</option>').val(value);
            return el;
        }

        //获取值
        function myvalue(elem) {
            return $(elem).val();
        }
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
                edit: true,
                editicon : 'ace-icon fa fa-pencil blue',
                add: true,
                addicon : 'ace-icon fa fa-plus-circle purple',
                del: true,
                delicon : 'ace-icon fa fa-trash-o red',
                search: true,
                searchicon : 'ace-icon fa fa-search orange',
                refresh: true,
                refreshicon : 'ace-icon fa fa-refresh green',
                view: true,
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
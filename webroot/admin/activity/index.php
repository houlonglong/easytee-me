<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <?php
    /**
     * 众筹管理
     *
     */
    include(block("admin/block/html_head"))?>

    <!-- page specific plugin styles -->
    <link rel="stylesheet" href="/ace/assets/css/jquery-ui.min.css" />
    <link rel="stylesheet" href="/ace/assets/css/bootstrap-datetimepicker.min.css" />
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


                        <div class="row">

                            <div class="col-xs-12">
                                <div class="tabbable">
                                    <ul class="nav nav-tabs padding-12 tab-color-blue background-blue" id="myTab4">
                                        <li class="active">
                                            <a data-toggle="tab" href="#" onclick="location.href='/admin/activity/index'">Home</a>
                                        </li>

                                        <li>
                                            <a data-toggle="tab" href="#" onclick="location.href='/admin/activity/pending_audit'">待审核</a>
                                        </li>

                                        <li>
                                            <a data-toggle="tab" href="#" onclick="location.href='/admin/activity/audit'">已审核</a>
                                        </li>
                                    </ul>

                                    <div class="tab-content">
                                        <div id="home4" class="tab-pane in active">

                                            <div class="row" style="padding:20px 0">
                                                <div class="col-xs-2">
                                                    <label>
                                                        活动名称
                                                    </label>
                                                    <input type="text" id="activity-name">
                                                </div>
                                                <div class="col-xs-2">
                                                    <label>
                                                        用户名
                                                    </label>
                                                    <input type="text" id="username">
                                                </div>
                                                <div class="col-xs-2">
                                                    <label>
                                                        手机号码
                                                    </label>
                                                    <input type="text" id="mobile">
                                                </div>
                                                <div class="col-xs-2">
                                                    <label>
                                                        开始时间
                                                    </label>
                                                    <input type="text" id="start-date">
                                                </div>
                                                <div class="col-xs-2">
                                                    <label>
                                                        结束时间
                                                    </label>
                                                    <input type="text" id="end-date">
                                                </div>
                                                <div class="col-xs-2">
                                                    <button class="btn-primary" onclick="search()">search</button>
                                                    <button class="btn-danger label-success" onclick="reset()">reset</button>
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


                                        </div>


                                    </div>
                                </div>


                            </div>
                        </div>

                        <!-- PAGE CONTENT BEGINS -->

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
<script src="/ace/assets/js/moment.min.js"></script>
<script src="/ace/assets/js/bootstrap-datetimepicker.min.js"></script>
<script src="/ace/assets/js/jquery.jqGrid.min.js"></script>
<script src="/ace/assets/js/grid.locale-en.js"></script>
<script src="/ace/assets/js/bootstrap-datepicker.min.js"></script>


<script type="text/javascript">
    var frontend_domain = "<?php echo FRONTEND_DOMAIN;?>";
    var grid_selector = "#grid-table";
    var pager_selector = "#grid-pager";
    function search(){
        var $query = {
            activity_id:$('#activity-id').val(),
            activity_name:$('#activity-name').val(),
            username:$('#username').val(),
            startDate:$('#start-date').val(),
            endDate:$('#end-date').val()
        };
        $(grid_selector).jqGrid('setGridParam',{
            datatype:'json',
            postData:$query, //发送数据
            page:1
        }).trigger("reloadGrid"); //重新载入
    }
    $('#end-date,#start-date').datepicker({ dateFormat: 'yy-mm-dd' });

    function reset(){
        $('#activity-id').val('');
        $('#activity-name').val('');
        $('#username').val();
        $('#activity-status').val('');
    }
    jQuery(function($) {
        var grid_setting = {
            url:"/api?model=admin/activity&action=list",
            url_save:"/api?model=admin/activity&action=edit",
            method:"POST",
            height:500,
            rowNum:15,
            rowList:[15,30,50,100],
            caption:"",
            cols:[
                {title:"Id",name:'id',index:'id', width:40, sorttype:"int", editable: false},

                {title:"活动名称",name:'name',index:'name',width:90,editable: true,editoptions:{size:"20",maxlength:"30"},
                    formatter:function(cellvalue, options, rowObject){
                        return '<a href="http://'+frontend_domain+'/activity/'+rowObject['id']+'" target = "_black">'+cellvalue+'</a';
                    }
                },
                {title:"发起人",name:'nick_name',index:'nick_name',width:50,editable: true,editoptions:{size:"20",maxlength:"30"}},
                {title:"销售目标件数/实际销售件数",name:'sales_target',index:'sales_target',width:80,editable: true,editoptions:{size:"20",maxlength:"30"},
                    formatter:function(cellvalue, options, rowObject){
                         return cellvalue+'/'+rowObject['sales_count'];
                    }
                },
                {title:"开始时间",name:'start_time',index:'start_time',width:100,sortable:false,editable: true,
                    unformat: pickTimeDate
                },
                {title:"预计结束时间",name:'end_time',index:'end_time',width:100,sortable:false,editable: true,
                    unformat: pickTimeDate
                },
                {title:"实际结束时间",name:'real_end_time',index:'real_end_time',width:100,sortable:false,editable: true,
                    unformat: pickTimeDate
                },
                {title:"众筹状态",name:'activity_status',index:'activity_status',width:100,sortable:false,editable: true,edittype:"custom",
                    editoptions:{custom_element: mystatuselem, custom_value:myvalue},
//                    formatter:function(cellvalue, options, rowObject){
//                        var img = "";
//                        if(cellvalue == 'fabrication'){
//                            img = '<span  data-status="fabrication" class="label label-sm label-success arrowed-in">生产中</span>';
//                        }
//                        if(cellvalue == 'ongoing'){
//                            img = '<span data-status="ongoing" class="label label-sm label-warning">进行中</span>';
//                        }
//                        if(cellvalue == 'success'){
//                            img = '<span data-status="success" class="label label-sm label-info arrowed arrowed-righ">成功</span>';
//                        }
//                        if(cellvalue == 'failure'){
//                            img = '<span data-status="failure" class="label label-sm label-inverse arrowed-in">失败</span>';
//                        }
//                        return img;
//                    }
                },

                {title:"操作",name:'options',index:'', width:80, fixed:true, sortable:false, resize:false,
                    formatter:'actions',
                    formatoptions:{
                        keys:true,
                        //delbutton: false,//disable delete button
                        baseLinkUrl:'someurl.php', addParam: '&action=edit', idName:'id',
                        url:'someurl.php', addParam: '&action=edit', idName:'id',
                        delOptions:{recreateForm: true, beforeShowForm:beforeDeleteCallback}
                        //editformbutton:true, editOptions:{recreateForm: true, beforeShowForm:beforeEditCallback}
                    },
                    formatter:function(cellvalue, options, rowObject){
                        var html;
                        if(rowObject['pass'] == 0 ){
                            html= '<a href="#" >审核</a>&nbsp';
                        }
                         html += '<a href="/admin/activity/detail?id='+rowObject['id']+'" >详情</a>';
                        return html;
                    }
                },
            ]

        };
        //enable datepicker
        function pickTimeDate( cellvalue, options, cell ) {
            setTimeout(function(){
                $(cell) .find('input[type=text]')
                    .datetimepicker({ dateFormat: 'dd-mm-yy' });
            }, 0);
        }

        function showudate(tmpob) {
            $(function() { tmpob.datepicker({ changeMonth: true, changeYear: true, dateFormat: "yy-mm-dd" }); });
        }

        jQuery("#list2").jqGrid('navGrid','#pager2',
            {edit:true,add:true,del:true},
            {width:400,height:400,afterShowForm:function(){showudate($(".editable"));}},
            {width:400,height:400},{},{multipleSearch:true},{});

        function myelem (value, options) {
            value = $(value).data("status");
            console.log(value,options);
            var el = document.createElement("select");
            $(el).append('<option value="0">未审核</option><option value="1">审核</option>').val(value);
            return el;
        }
        function mystatuselem (value, options) {
            value = $(value).data("status");
            console.log(value,options);
            var el = document.createElement("select");
            $(el).append('<option role="option" value="failure">失败</option><option role="option" value="ongoing">进行中</option><option role="option" value="fabrication">生产中</option><option role="option" value="success">成功</option>').val(value);
            return el;
        }

        //获取值
        function myvalue(elem) {
            return $(elem).val();
        }
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
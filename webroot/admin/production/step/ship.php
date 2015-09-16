<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <?php
    /**
     * 发货
     *
     */

    include(block("admin/block/html_head"));
    $row = Model_Admin_Activity::activity_detail($_REQUEST['id']);
    ?>

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
                        <!-- PAGE CONTENT BEGINS -->
                        <div class="row">
                            <div class="col-xs-12">
                                <a class="btn btn-xs btn-primary bulk_shipment" href="#">批量发货</a>
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
<script src="/ace/assets/js/moment.min.js"></script>
<script src="/ace/assets/js/bootstrap-datetimepicker.min.js"></script>
<script src="/ace/assets/js/jquery.jqGrid.min.js"></script>
<script src="/ace/assets/js/grid.locale-en.js"></script>
<script src="/ace/assets/js/bootstrap-datepicker.min.js"></script>


<script type="text/javascript">
    var grid_selector = "#grid-table";
    var pager_selector = "#grid-pager";
    var activity_id = <?php echo (isset($_GET['id'])?$_GET['id']:0);?>;
    var expressInfo = <?php echo json_encode(Model_Admin_Activity::get_express_info());?>;
    function express_change(obj){

        var no_value = $(obj).val();
        var id = $(obj).parents('tr').attr('id');
        $.ajax({
            url:"/api?model=admin/activity&action=add_order_no",
            type:'POST',
            data:{
                express_no:no_value,
                id:id
            },
            success:function(data){

            }
        })


    }
    function express_change_name(obj){

        var no_value = $(obj).val();
        var id = $(obj).parents('tr').attr('id');
        $.ajax({
            url:"/api?model=admin/activity&action=add_order_no",
            type:'POST',
            data:{
                express_id:no_value,
                id:id
            },
            success:function(data){

            }
        })


    }

    jQuery(function($) {

        var grid_setting = {
            url:"/api?model=admin/activity&action=detail_list&status=待发货&id="+<?php echo $_REQUEST['id'];?>,
            url_save:"/api?model=admin/activity&action=add_order_no",
            method:"POST",
            height:390,
            rowNum:15,
            rowList:[15,30,50,100],
            caption:"",
            cols:[
                {title:"活动ID",name:'activity_id',index:'activity_id', width:40, sorttype:"int",sortable:false, editable: false},
                {title:"订单号",name:'order_no',index:'order_no',width:90,editable: false,sortable:false,editoptions:{size:"20",maxlength:"30"}},
                {title:"收件人",name:'ship_name',index:'ship_name',width:50,editable: true,sortable:false,editoptions:{size:"20",maxlength:"30"}},
                {title:"联系电话",name:'ship_mobile',index:'ship_mobile',width:50,sortable:false,editable: true,
                },
                {title:"收货地址",name:'ship_addr',index:'ship_addr',width:150,sortable:false,editable: true,
                    formatter:function(cellvalue, options, rowObject){
                        return rowObject['ship_province']+rowObject['ship_city']+rowObject['ship_area']+cellvalue;
                    }
                },
                {title:"快递单号",name:'express_no',index:'express_id',width:80,sortable:false,editable: true,
                    formatter:function(cellvalue, options, rowObject){
                        return '<input type="text" size="20" maxlength="30" onchange="express_change(this)" class="express_no" name="express_no" role="textbox" class="editable" value="'+cellvalue+'">';
                    }
                },
                {title:"快递公司",name:'express_name',index:'express_comp',width:150,sortable:false,editable: true,edittype:"custom",
                    formatter:function(cellvalue, options, rowObject){
                        var html ='<select class="express_name"  onchange="express_change_name(this)" >';
                        for(var i in expressInfo){
                            if(cellvalue == expressInfo[i].name){
                                html +='<option role="option" value="'+ expressInfo[i].id+'" selected>'+expressInfo[i].name+'</option>';
                            }else{

                            }
                            html +='<option role="option" value="'+ expressInfo[i].id+'">'+expressInfo[i].name+'</option>';
                        }
                        html+='</select>';
                        return html;
                    }

                },
                {title:"操作",name:'id',index:'id', width:80, fixed:true, sortable:false, resize:false,
                    formatter:'actions',
                    formatoptions:{
                        keys:true,
                        //delbutton: false,//disable delete button
                        baseLinkUrl:'someurl.php', addParam: '&action=add_order_no', idName:'id',
                        delOptions:{recreateForm: true, beforeShowForm:beforeDeleteCallback}
                        //editformbutton:true, editOptions:{recreateForm: true, beforeShowForm:beforeEditCallback}
                    }
                },
//                {title:"订购服装品类",name:'manufacturer_name',index:'manufacturer_name',width:100,sortable:false,editable: true,
//                    unformat: pickTimeDate
//                },
//                {title:"订购服装款式",name:'product_style_name',index:'product_style_name',width:100,sortable:false,editable: true,
//                    unformat: pickTimeDate
//                },
//                {title:"订购服装性别",name:'product_name',index:'product_name',width:100,sortable:false,editable: true,
//                    unformat: pickTimeDate
//                },
//                {title:"订购服装颜色",name:'product_style_name',index:'product_style_name',width:100,sortable:false,editable: true,
//                    unformat: pickTimeDate
//                },
//                {title:"订购服装尺码",name:'size',index:'size',width:50,sortable:false,editable: true,
//                    unformat: pickTimeDate
//                },
//                {title:"订购服装数量",name:'quantity',index:'quantity',width:100,sortable:false,editable: true,
//                    unformat: pickTimeDate
//                },
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

            $('.express_name').change(function(){
                var no_value = $(this).val();
                var id = $(this).parents('tr').attr('id');
                $.ajax({
                    url:"/api?model=admin/activity&action=add_order_no",
                    type:'POST',
                    data:{
                        express_name:no_value,
                        id:id
                    },
                    success:function(data){

                    }
                })


            })



        //获取值
        function myvalue(elem) {
            var v = $(elem).val();
            return v;
            var value
            $(elem).children().each(function(){

                if($(this).attr('value') == v){
                    console.log($(this).attr('value'),v,$(this).text());
                     value = $(this).text();
                }
            });
            return value;
        }

        $('.bulk_shipment').click(function(){
            var ids = new Array();

            $("input:checkbox[name*='jqg_grid-table_']:checked").each(function(){
                var datas = $(this).attr('id').split('jqg_grid-table_');
                ids.push(datas[datas.length-1]) ;
            })
            $.ajax({
                url:'/api?model=admin/activity&action=bulk_shipment&activity_id='+activity_id,
                type:'post',
                data:{
                    ids:ids.join(',')
                },
                success:function(data){
                    if(data.status>0){
                        alert(data.message);
                    }else{
                        window.location.reload();
                    }
                }
            })
        })



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
            subGrid : true,
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
                $.ajax({
                    url:'/api?model=admin/activity&action=ordergoods_detail',
                    data:{
                        id:rowId,
                    },
                    type:'POST',
                    dataType:'json',
                    success:function(obj){
                        console.log(obj);
                    $("#" + subgridTableId).jqGrid({
                        datatype: 'local',
                        data: obj,
                        colNames: ['订购服装品类','订购服装款式','订购服装性别','订购服装颜色','订购服装尺码','订购服装数量','采购单价','采购总价','预计交期'],
                        colModel: [
                            { name: 'manufacturer_name', width: 150 },
                            { name: 'product_style_name', width: 150 },
                            { name: 'product_name', width: 150 },

                            { name: 'product_style_name', width: 150 },
                            { name: 'size', width: 150 },
                            { name: 'quantity', width: 150 },

                            { name: 'unit_price', width: 150 },
                            { name: 'total', width: 150 },
                            { name: 'real_end_time', width: 180 }
                        ]
                    });
                  }
                })
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
            multiselect: true,
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
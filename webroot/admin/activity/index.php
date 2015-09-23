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
    <link rel="stylesheet" href="/ace/assets/css/datepicker.min.css"/>
    <link rel="stylesheet" href="/ace/assets/css/bootstrap-datetimepicker.min.css" />
    <link rel="stylesheet" href="/ace/assets/css/ui.jqgrid.min.css" />

    <!-- ace styles -->
    <link rel="stylesheet" href="/ace/assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
    <link rel="stylesheet" href="/admin/assets/css/style.css" class="ace-main-stylesheet" />
    <style>
        .mr-20{
            display: inline-block;
            margin-right:20px;
        }
    </style>
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
                                <div class="widget-box">
                                    <div class="widget-body">
                                        <div class="widget-main">
                                            <form class="form-inline">
                                                <span class="mr-20">
                                                    审核:
                                                    <select name="" id="verify" onchange="search()">
                                                        <option value="">全部</option>
                                                        <option value="0">未审核</option>
                                                        <option value="1">审核通过</option>
                                                        <option value="2">审核不通过</option>
                                                    </select>
                                                </span>
                                                <span class="mr-20">
                                                    状态:
                                                    <select id="status" onchange="search()">
                                                        <option value="1">进行中</option>
                                                        <option value="10">已结束</option>
                                                        <option value="0">草稿</option>  *
                                                        <option value="2">失败的</option> *
                                                        <option value="3">成功的</option>
                                                        <option value="">全部</option>
                                                    </select>

                                                </span>
                                                <span class="mr-20 production_status" style="display: none;">
                                                    生产:
                                                    <select id="production_status" onchange="search()">
                                                        <option value="">全部</option>    *
                                                        <option value="0">待生产</option>
                                                        <option value="1">生产中</option>
                                                        <option value="2">生产完成</option>   *
                                                    </select>
                                                </span>
                                                    <span class="mr-20 ship_status" style="display: none;">
                                                    发货:
                                                    <select id="ship_status" onchange="search()">
                                                        <option value="">全部</option>
                                                        <option value="0">未发货</option>
                                                        <option value="1">已发货</option>
                                                    </select>
                                                </span>
                                                <br><br>
                                                <input type="text"  class="input-small" placeholder="活动ID" id="activity_id">
                                                <input type="text"  class="input-small" placeholder="活动名称" id="activity_name">

<!--                                                <input type="text"  class="input-small" placeholder="开始时间" id="start-date">-->
<!--                                                <input type="text"  class="input-small" placeholder="结束时间" id="end-date">-->
                                                <button type="button" class="btn btn-success btn-sm" onclick="search()">
                                                    <i class="ace-icon fa fa-search bigger-110"></i>搜索
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
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
    <div class="modal fade bs-example-modal-sm" id="modal_test" aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <button type="button" class="bootbox-close-button close" data-dismiss="modal" aria-hidden="true"
                        style="margin-top: 5px;margin-right: 10px;">×
                </button>

                <div class="modal-header">
                    <h4>活动名称：<span id="modal_active"></span></h4>

                </div>
                <div class="tabbable">
                    <ul class="nav nav-tabs padding-12 tab-color-blue background-blue" id="myTab4">
                        <li class="active">
                            <a data-toggle="tab" href="#apply">批准</a>
                        </li>
                        <li>
                            <a data-toggle="tab" href="#apply_back">驳回</a>
                        </li>

                    </ul>

                    <div class="tab-content">
                        <div id="apply" class="tab-pane in active">
                            <div class="modal-body">
                                <div>发起人：<span id="modal_username"></span></div>
                                <div>开始时间：<span id="modal_start_time"></span></div>
                                <div>结束时间：<span id="modal_end_time"></span></div>
                                <div>销售目标：<span id="modal_sales_target"></span></div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-sm btn-danger apply" data-dismiss="modal" data-action="批准"><i
                                        class="ace-icon fa fa-trash-o"></i> 批准
                                </button>
                            </div>
                        </div>

                        <div id="apply_back" class="tab-pane">
                            <form class="form-horizontal">
                                <div class="form-group" style="margin-left: -120px;">
                                    <label class="col-sm-3 control-label no-padding-right" for="form-field-1">拒绝理由 </label>

                                    <div class="col-sm-9">
                                        <select name="reason" id="reason" class="col-xs-10 col-sm-5">
                                            <option value="1">
                                                是否涉及敏感字眼
                                            </option>
                                            <option value="2">
                                                是否辱骂国家领导人
                                            </option>
                                            <option value="3">
                                                是否传播邪教文化
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group" style="margin-left: -120px;">
                                    <label class="col-sm-3 control-label no-padding-right" for="form-field-1">备注</label>

                                    <div class="col-sm-9">
                                        <textarea name="" id="notes" cols="30" rows="10" class="form-control" style="width: 307px;height: 96px;"></textarea>
                                    </div>
                                </div>


                                <div class="form-actions center">
                                    <button type="button" class="btn btn-sm btn-success btn btn-sm apply-back">
                                        驳回
                                        <i class="ace-icon fa fa-arrow-right icon-on-right bigger-110"></i>
                                    </button>
                                </div>
                            </form>


                        </div>


                    </div>
                </div>

            </div>
        </div>
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
    function audit(obj){
        var id = $(obj).data('id');
        $('.apply').data('id',id);
        $('.apply-back').data('id',id);
        $('#modal_active').text($(obj).parents('tr').find('td').eq(0).text());
        $('#modal_username').text($(obj).parents('tr').find('td').eq(1).text());
        $('#modal_end_time').text($(obj).parents('tr').find('td').eq(4).text());
        $('#modal_start_time').text($(obj).parents('tr').find('td').eq(3).text());
        $('#modal_sales_target').text($(obj).parents('tr').find('td').eq(2).text());
    }




    function search(){
//        debugger;
        var status = $('#status').val();
        $query = {
            verify:$('#verify').val(),
            status:status,
            activity_id:$('#activity_id').val(),
            activity_name:$('#activity_name').val(),
        };
        // 0 草稿  10 已结束 2 失败   1 进行中
        $query["ship_status"] =   '';
        $query["production_status"] = '';


        if(status == '0' || status == '10' || status == '2' || status == '1'){
            $('.production_status').hide().val('');
            $('.ship_status').hide().val('');

        }else{
            $('.production_status').show();
            $query["production_status"] = $('#production_status').val();
            // 0 待生产 1 生产中  2生成完成
            if(parseInt($('#production_status').val())==0 ||parseInt($('#production_status').val())==1){
                $('.ship_status').hide().val('');
            }else{
                $('.ship_status').show();
                $query["ship_status"] = $('#ship_status').val();
            }
        }
        console.log($query)
        $(grid_selector).jqGrid('setGridParam',{
            datatype:'json',
            postData:$query, //发送数据
            page:1
        }).trigger("reloadGrid"); //重新载入
    }
    $('.apply').click(function(){
        var $this = $(this);
        var $id = $this.data('id');
        $.ajax({
            url:"/api?model=admin/activity&action=audit",
            data:{
                id:$id,
            },
            type:"POST",
            success: function () {
                $('#'+$id).remove();
            }

        });

    })
    $('#end-date,#start-date').datepicker({ dateFormat: 'yy-mm-dd' });

    function reset(){
        $('#activity-id').val('');
        $('#activity-name').val('');
        $('#username').val();
        $('#activity-status').val('');
    }

    jQuery(function($) {
        var grid_setting = {
            url:"/api?model=admin/activity&action=list&success=index",
            url_save:"/api?model=admin/activity&action=edit",
            method:"POST",
            height:500,
            rowNum:5,
            rowList:[15,30,50,100],
            caption:"",
            cols:[
                {title:"Id",name:'id',index:'id', width:80, fixed:true,sortable:false, editable: false},
                {title:"缩略图",name:'thumb_img_url',width:110, fixed:true,index:'thumb_img_url',sortable:false,editable: false,
                    formatter:function(cellvalue, options, rowObject){
                        var cell = '<img style="width:100px;height:100px;" src="'+cellvalue+'">';
                        return cell;
                    }
                },
                {title:"活动名称",name:'name',index:'name',sortable:false,editable: false,
                    formatter:function(cellvalue, options, rowObject){
                        var act_url = 'http://'+frontend_domain+'/activity/'+rowObject['id'];
                        rowObject["act_url"] = act_url;
                        rowObject['verify'] = rowObject['verify'] == 0 ?"未审核":"已审核";
                        var cell = "<a target='_blank' href='{act_url}'>{name}</a><br>".format(rowObject) +
                            "{verify}<br>".format(rowObject) +
                            "UID:<a target='_blank' href='/admin/user/modify?id={uid}'>{uid}</a>".format(rowObject);
                        return cell;
                    }
                },
                {title:"销售",name:'sale_target',index:'sale_target',width:200,fixed:true,sortable:false,editable: true,
                    formatter:function(cellvalue, options, rowObject){
                        var cell = rowObject.sale_count + "/" + cellvalue ;
                        cell += "<br>总额: "+rowObject.sale_total ;
                        if(rowObject.sale_count > 10){
                            cell += "<br>可进入预生产 " ;
                        }else{
                            cell += "<br>未达10件" ;
                        }
                        return cell;
                    }
                },
                {title:"时间",name:'start_time',index:'start_time',width:200,fixed:true,sortable:false,editable: true,
                    formatter:function(cellvalue, options, rowObject){
                        var cell = "期限:"+rowObject.period +
                            '<br>开始:'+cellvalue+
                            '<br>结束:'+rowObject.end_time;


                        return cell;
                    }
                },
                {title:"状态",name:'activity_status',index:'activity_status',width:100,sortable:false,fixed:true,
                    formatter:function(cellvalue, options, rowObject){
                        var cell = "";
                        if(rowObject.production_status == 1){
                            cell += "生产中<br>";
                        }
                        if(rowObject.production_status == 2){
                            cell += "生产完成<br>";
                        }
                        if(rowObject.production_status == 0){
                            cell += "未生产<br>";
                        }
                        return cell;
                    }
                },
                {title:"操作",name:'options',index:'', width:100, fixed:true, sortable:false, resize:false,
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
                        var html='';
                        html = '<a class="btn btn-xs btn-info"  href="/admin/activity/detail?id='+rowObject['id']+'" >详情</a>&nbsp';
                        if(rowObject['pass'] == 0 ){
                            html += '<a class="btn btn-xs btn-success audit"  href="#"  onclick="audit(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="'+rowObject['id']+'">审核</a>&nbsp';
                        }
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
            var el = document.createElement("select");
            $(el).append('<option value="0">未审核</option><option value="1">审核</option>').val(value);
            return el;
        }
        function mystatuselem (value, options) {
            value = $(value).data("status");
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

            postData:{
                status:1
            },
            sortorder: "desc",
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
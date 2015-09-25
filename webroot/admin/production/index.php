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

                                <div class="row">
                                    <div class="col-xs-12">
                                        <div class="widget-box">
                                            <div class="widget-body">
                                                <div class="widget-main">
                                                    <form class="form-inline">
                                                        <input type="text" class="input-small" placeholder="活动名称" id="activity_name">
                                                        <input type="text" class="input-small" placeholder="活动ID" id="activity_id">
                                                        <span class="mr-20">
                                                            <select name="" id="production_status" onchange="search()">
                                                                <option value="0">待生产</option>
                                                                <option value="1">生产中</option>
                                                                <option value="2">生产完成</option>
                                                                <option value="">全部</option>
                                                            </select>
                                                        </span>
                                                        <span class="mr-20">
                                                            <select name="" id="wait_produce" onchange="search()">
                                                                <option value="0">全部</option>
                                                                <option value="01">目标完成,还没有束</option>
                                                                <option value="02">可生产</option>
                                                            </select>
                                                        </span>
                                                        <span class="mr-20">
                                                            <select name="" id="ship_status" style="display: none" onchange="search()">
                                                                <option value="">全部</option>
                                                                <option value="0">待发货</option>
                                                                <option value="1">已发货</option>
                                                            </select>
                                                        </span>
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


<script type="text/javascript">
    var frontend_domain = "<?php echo FRONTEND_DOMAIN;?>";
    var url_api_base   = "admin/production";
    var url_api_list   = "/api?model="+url_api_base + "&action=list";
    function do_product($action){
        location.href = "/"+url_api_base+"/"+$action;
        return false;
    }
    var grid_selector = "#grid-table";
    var pager_selector = "#grid-pager";
    function search() {
        var production_status = $("#production_status").val();
        var $query = {
            activity_name: $('#activity_name').val(),
            activity_id:$('#activity_id').val(),
            production_status:production_status,
            ship_status:''
        };
        if(production_status === "0"){
            $("#wait_produce").show();
            $("#ship_status").hide();
            $query['production_status'] = $("#wait_produce").val();
        }else{
            if(production_status == 2){
                $("#ship_status").show();
                $query['ship_status'] = $("#ship_status").val();
            }else{
                $("#ship_status").hide();
            }
            $("#wait_produce").hide();
        }

        $(grid_selector).jqGrid('setGridParam',{
            datatype:'json',
            postData:$query, //发送数据
            page:1
        }).trigger("reloadGrid"); //重新载入
    }
    jQuery(function($) {
        var grid_setting = {
            url:url_api_list,
            method:"POST",
            height:800,
            rowNum:6,
            postData:{production_status:0},
            sortorder:"desc",
            rowList:[15,30,50,100],
            caption:"",
            cols:[
                {title:"活动ID",name:'id',index:'id',sortable:false, width:40, sorttype:"int", editable: false},
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
                        var cell = "<a target='_blank' href='{act_url}'>{name}</a><br>" +
                            "{verify}<br>" +
                            "production_status:{production_status}<br>" +
                            "UID:<a target='_blank' href='/admin/user/modify?id={uid}'>{uid}</a>";
                        return cell.format(rowObject);
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
                {title:"订单成交数",name:'sale_count',index:'sale_count',width:50,sortable:false,editable: false},
                {title:"预计交货时间",name:'give_time',index:'give_time',sortable:false,width:100,sortable:false,editable: false},
                {title:"生产",name:'status',index:'status', width:200, fixed:true, sortable:false,
                    formatter:function(cellvalue, options, rowObject){
                        if(rowObject['status'] == 3){
                            if( rowObject['production_status'] == 0){
                                return '<a class="btn btn-xs btn-primary" href="/admin/production/step/detail?id='+cellvalue+'">安排生产</a>';
                            }
                            if( rowObject['production_status'] == 1){
                                return "生产中";
                            }
                            if( rowObject['production_status'] == 2){
                                if( rowObject['ship_status'] == 0){
                                    return "待发货";
                                }else{
                                    return "发货完成";
                                }
                            }
                        }else{
                            return "目标完成,待生产";
                        }

                    },
                },
                {title:"操作",name:'options',index:'', width:100, fixed:true, sortable:false, resize:false,
                    formatter:function(cellvalue, options, rowObject){
                        var html='';
                        html = '<a class="btn btn-xs btn-info" target="_blank" href="/admin/activity/detail?id='+rowObject['id']+'" >详情</a>&nbsp';
                        if(rowObject['pass'] == 0 ){
                            html += '<a class="btn btn-xs btn-success audit"  href="#"  onclick="audit(this)" data-toggle="modal" data-target=".bs-example-modal-sm" data-id="'+rowObject['id']+'">审核</a>&nbsp';
                        }
                        return html;
                    }
                },
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
            sortorder:grid_setting.sortorder,
            postData:grid_setting.postData,
            sortorder:grid_setting.sortorder,
            postData:grid_setting.postData,
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
                var table = this;
                setTimeout(function(){
                    styleCheckbox(table);

                    updateActionIcons(table);
                    updatePagerIcons(table);
                    enableTooltips(table);
                }, 0);
            },
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
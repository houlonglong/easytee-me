<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <?php
    /**
     * 订单管理
     *
     */
    include(block("admin/block/html_head")) ?>

    <!-- page specific plugin styles -->
    <link rel="stylesheet" href="/ace/assets/css/jquery-ui.min.css"/>
    <link rel="stylesheet" href="/ace/assets/css/datepicker.min.css"/>
    <link rel="stylesheet" href="/ace/assets/css/ui.jqgrid.min.css"/>
    <!-- ace styles -->
    <link rel="stylesheet" href="/ace/assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style"/>
    <link rel="stylesheet" href="/admin/assets/css/style.css" class="ace-main-stylesheet"/>
    <style>
        .jqgfirstrow {
            background-color: #C7D3A9;
        }
    </style>
</head>
<body class="no-skin">
<div class="main-container" id="main-container">
    <script type="text/javascript">try {
            ace.settings.check('main-container', 'fixed')
        } catch (e) {
        }</script>
    <div class="main-content">
        <div class="main-content-inner">
            <?php include(block("admin/block/breadcrumbs")) ?>
            <div class="page-content">
                <?php include(block("admin/block/ace-settings-container")) ?>
                <div class="row">
                    <div class="col-xs-12">
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="widget-box">
                                    <div class="widget-body">
                                        <div class="widget-main">
                                            <form class="form-inline">
                                                <input type="text" class="input-small" placeholder="订单号" id="order_no">
                                                <input type="text" class="input-small" placeholder="活动名称"
                                                       id="activity_name">
                                                <input type="text" class="input-small" placeholder="活动ID"
                                                       id="activity_id">
                                                <input type="text" class="input-small" placeholder="手机号码" id="mobile">
                                                <select id="pay_status" onchange="search()">
                                                    <option value="">全部</option>
                                                    <option value="0">待付款</option>
                                                    <option value="1">已付款</option>
                                                </select>
                                                <select id="ship_status" onchange="search()" style="display: none">
                                                    <option value="">全部</option>
                                                    <option value="0">待发货</option>
                                                    <option value="1">已发货</option>
                                                </select>
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
                    </div>
                    <!-- /.col -->
                </div>
                <!-- /.row -->
            </div>
            <!-- /.page-content -->
        </div>
    </div>
    <!-- /.main-content -->
    <?php include(block("admin/block/footer")) ?>
</div>
<!-- /.main-container -->
<?php include(block("admin/block/scripts")) ?>
<!-- page specific plugin scripts -->
<script src="/ace/assets/js/bootstrap-datepicker.min.js"></script>
<script src="/ace/assets/js/jquery.jqGrid.min.js"></script>
<script src="/ace/assets/js/grid.locale-en.js"></script>
<script type="text/javascript">

    var grid_selector = "#grid-table";
    var pager_selector = "#grid-pager";

    function search() {
        var $query = {
            order_no: $('#order_no').val(),
            pay_status: $('#pay_status').val(),
            ship_status: $('#ship_status').val(),
            mobile: $('#mobile').val(),
            activity_id:$('#activity_id').val(),
            activity_name:$('#activity_name').val()
        };
        if($('#pay_status').val() == '0' || $('#pay_status').val() == ''){
            $('#ship_status').hide();
        }else{
            $('#ship_status').show();
            $query['ship_status'] = $('#ship_status').val();
        }

        $(grid_selector).jqGrid('setGridParam', {
            datatype: 'json',
            postData: $query, //发送数据
            page: 1
        }).trigger("reloadGrid"); //重新载入
    }

    jQuery(function ($) {
        var grid_setting = {
            url: "/api?model=admin/order&action=list",
            method: "POST",
            height: 500,
            rowNum: 12,
            postData:{
                pay_status: ''
            },
            rowList: [15, 30, 50, 100],
            caption: "",
            cols: [
                {title: "Id", name: 'id', index: 'id', width: 40, sorttype: true, editable: false},
                {
                    title: "订单号",
                    name: 'order_no',
                    index: 'order_no',
                    width: 150,
                    editable: false,
                    formatter: 'showlink',
                    formatoptions: {
                        baseLinkUrl: '/admin/activity/order_detail',
                        addParam: '',//&t=1
                        idName: 'id'
                    }
                },
                {
                    title: "UID",
                    name: 'uid',
                    index: 'uid',
                    width: 50,
                    editable: false,
                    sortable:false,
                    formatter: function (cellvalue, options, rowObject) {
                        return '<a href="/admin/user/modify?id=' + cellvalue + '">' + cellvalue + '</a>';
                    }
                },
                {
                    title: "活动名称",
                    width: 300,
                    name: 'activity_name',
                    index: 'activity_name',
                    editable: false,
                    sortable:false,
                    formatter: function (cellvalue, options, rowObject) {
                        return '<a  href="/admin/activity/detail?id=' + rowObject.activity_id + '" >' + cellvalue + '</a>';
                    }
                },
                {title: "数量", name: 'quantity', index: 'quantity', width: 50, sortable: false, editable: false,
                    formatter: function (cellvalue, options, rowObject) {
                        return '<b class="green">'+cellvalue+'</b>';
                    }
                },
                {
                    title: "订单金额",
                    name: 'goods_price',
                    index: 'goods_price',
                    width: 90,
                    sortable: false,
                    editable: false,
                    formatter: function (cellvalue, options, rowObject) {
                        return '<b class="blue">$'+cellvalue+'</b>';
                    }
                },
                {
                    title: "运费",
                    name: 'exp_price',
                    index: 'exp_price',
                    width: 90,
                    sortable: false,
                    editable: false,
                    formatter: function (cellvalue, options, rowObject) {
                        return '<span class="blue">'+cellvalue+'</span>';
                    }
                },
                {
                    title: "状态",
                    name: 'status',
                    index: 'status',
                    width: 90,
                    sortable: false,
                    editable: false,
                    formatter: function (cellvalue, options, rowObject) {
                        var cell = '';
                        if(rowObject.pay_status){
                            if(rowObject.ship_status == 1){
                                cell = "<span class='label label-success arrowed-in arrowed-in-right'>已发货</span>"
                            }else{
                                cell = "<span class='label label-warning arrowed arrowed-right'>未发货</span>"
                            }
                        }else{
                            cell = "<span class='label arrowed'>未付款</span>"
                        }
                        return cell;
                    }
                },
                {title: "快递信息", name: 'express_no', index: 'express_no', width: 90, sortable: false, editable: false,
                    formatter: function (cellvalue, options, rowObject) {
                        if(cellvalue!=null){
                            return '<span class="label label-success arrowed-in arrowed-in-right">快递单号：{exp_no}</span></br><span>快递公司:{exp_com}</span>'.format(rowObject);
                        }else{
                            return "<span class='label arrowed'>无</span>";
                        }

                    }
                },

            ]

        };


        function get_col(cols) {
            var col_name = [];
            for (i in cols) {
                var col = cols[i];
                col_name.push(col.title);
            }
            return {
                'name': col_name,
                'model': cols
            };
        }

        //resize to fit page size
        $(window).on('resize.jqGrid', function () {
            $(grid_selector).jqGrid('setGridWidth', $(".page-content").width());
        });
        //resize on sidebar collapse/expand
        var parent_column = $(grid_selector).closest('[class*="col-"]');
        $(document).on('settings.ace.jqGrid', function (ev, event_name, collapsed) {
            if (event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed') {
                //setTimeout is for webkit only to give time for DOM changes and then redraw!!!
                setTimeout(function () {
                    $(grid_selector).jqGrid('setGridWidth', parent_column.width());
                }, 0);
            }
        });



        jQuery(grid_selector).jqGrid({
            //direction: "rtl",

            //subgrid options
            subGrid: true,
            //subGridModel: [{ name : ['No','Item Name','Qty'], width : [55,200,80] }],
            //datatype: "xml",
            subGridOptions: {
                plusicon: "ace-icon fa fa-plus center bigger-110 blue",
                minusicon: "ace-icon fa fa-minus center bigger-110 blue",
                openicon: "ace-icon fa fa-chevron-right center orange"
            },
            //for this example we are using local data
            subGridRowExpanded: function (subgridDivId, rowId) {
                var subgridTableId = subgridDivId + "_t";
                $("#" + subgridDivId).html("<table  style='background-color:#C7D3A9;' id='" + subgridTableId + "'></table>");
                $.ajax({
                    url: '/api?model=admin/order&action=goods_list',
                    data: {
                        id: rowId,
                    },
                    type: 'POST',
                    dataType: 'json',
                    success: function (data) {
                        if(data.status>0){
                            alert(data.message);
                        }
                        $("#" + subgridTableId).jqGrid({
                            datatype: 'local',
                            data: data.return,
                            colNames: ['分类', '品牌', '产品名称', '款式', '尺码', '数量', '采购单价', '采购总价', '预计交期'],
                            colModel: [
                                {name: 'cat_name', width: 80, color: "#3c763d",sortable:false},
                                {name: 'brand_name', width: 80,sortable:false},
                                {name: 'product_name', width: 120,sortable:false},
                                {name: 'style_name', width: 50,sortable:false},
                                {name: 'pro_size', width: 50,sortable:false},
                                {name: 'quantity', width: 50,sortable:false},
                                {name: 'sell_price', width: 100,sortable:false},
                                {name: 'total_price', width: 100,sortable:false},
                                {name: 'end_time', width: 180,sortable:false}
                            ]
                        });
                    }
                })
            },
            jsonReader: {
                root: function (obj) {
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
            mtype: grid_setting.method,
            url: grid_setting.url,
            datatype: "json",
            sortorder: "desc",
            postData:grid_setting.postData,
            height: grid_setting.height,
            colNames: get_col(grid_setting.cols)['name'],
            colModel: get_col(grid_setting.cols)['model'],
            viewrecords: true,
            rowNum: grid_setting.rowNum,
            rowList: grid_setting.rowList,
            pager: pager_selector,
            altRows: false,
            //toppager: true,
            multiselect: false,
            //multikey: "ctrlKey",
            multiboxonly: false,
            loadComplete: function (xhr) {
                var table = this;
                setTimeout(function(){
                    updatePagerIcons(table);
                }, 0);
            },

            editurl: grid_setting.url_save,//nothing is saved
            caption: grid_setting.caption


        });
        $(window).triggerHandler('resize.jqGrid');//trigger window resize to make the grid get the correct size

        //navButtons
        jQuery(grid_selector).jqGrid('navGrid', pager_selector,
            { 	//navbar options
                edit: false,
                editicon: 'ace-icon fa fa-pencil blue',
                add: false,
                addicon: 'ace-icon fa fa-plus-circle purple',
                del: false,
                delicon: 'ace-icon fa fa-trash-o red',
                search: false,
                searchicon: 'ace-icon fa fa-search orange',
                refresh: true,
                refreshicon: 'ace-icon fa fa-refresh green',
                view: false,
                viewicon: 'ace-icon fa fa-search-plus grey',
            }
        );
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

        $(document).one('ajaxloadstart.page', function (e) {
            $(grid_selector).jqGrid('GridUnload');
            $('.ui-jqdialog').remove();
        });
    });
</script>
</body>
</html>
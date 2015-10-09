<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <?php
    /**
     * Controller Name Replace
     *
     */
    $page_title = "生产详情";
    include(block("admin/block/html_head"))?>
    <link rel="stylesheet" href="/ace/assets/css/ui.jqgrid.min.css"/>
    <!-- ace styles -->
    <link rel="stylesheet" href="/ace/assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
    <link rel="stylesheet" href="/admin/assets/css/style.css" class="ace-main-stylesheet" />

</head>
<body class="no-skin">
<div class="main-container" id="main-container">
    <script type="text/javascript">try{ace.settings.check('main-container' , 'fixed')}catch(e){}</script>
    <div class="main-content">
        <div class="main-content-inner">
            <?php include(block("admin/block/breadcrumbs"))?>
            <div class="page-content">
                <?php include(block("admin/block/ace-settings-container"))?>
                <div class="page-header">
                    <h1>
                        <?=$page_title?>
                        <small>
                            <i class="ace-icon fa fa-angle-double-right"></i>
                        </small>
                    </h1>
                </div><!-- /.page-header -->
                <div class="row">
                    <div class="col-xs-12">
                        <div class="row">
                            <div class="col-xs-12">
                                <h2>活动ID: <a href="/admin/activity/detail?id=<?=$info['activity']['id']?>"><?=$info['activity']['id']?></a></h2>
                                <?php if($info['activity']['production_status'] > 0){ ?>
                                    <div>
                                        <table class="table table-striped table-bordered table-hover">
                                            <thead>
                                            <tr>
                                                <th>状态</th>
                                                <th>厂商</th>
                                                <th>工艺</th>
                                                <th>操作员</th>
                                                <th>订单数</th>
                                                <th>下单时间</th>
                                                <th>完成时间</th>
                                                <th>操作</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><span class="label label-success arrowed-in arrowed-in-right"><?=Model_Admin_Production::$production_status[$info['activity']['production_status']]?></span></td>
                                                    <td><?=$produce['m_name']?></td>
                                                    <td><?=$produce['craft']?></td>
                                                    <td><?=Model_Admin_Production::$operator[$produce['operator_id']]?></td>
                                                    <td><?=$produce['order_count']?></td>
                                                    <td><?=$produce['create_time']?></td>
                                                    <td><?=$produce['finish_time']?></td>
                                                    <td>
                                                        <?php if($info['activity']['production_status'] == 1){ ?>
                                                            <button onclick="$('#finish_model').modal('show')" class="btn btn-primary ">完成生产</button>
                                                        <?php }else{ ?>
                                                        <?php if($info['activity']['ship_status'] == 0){ ?>
                                                            <button onclick="$('#ship_model').modal('show')" class="btn btn-info">完成发货</button>
                                                        <?php }else{ ?>
                                                                已发货
                                                        <?php }} ?>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                <?php }else{?>
                                    <div style="margin:10px;">
                                        <button onclick="$('#confirm_model').modal('show')" class="btn btn-primary ">下单生产</button>
                                    </div>
                                <?php } ?>


                                <?php if($info['activity']['production_status']== 2){ ?>


                                    <div class="row">
                                        <div class="col-xs-12">
                                            <table id="grid-table"></table>

                                            <div id="grid-pager"></div>

                                            <script type="text/javascript">
                                                var $path_base = ".";//in Ace demo this will be used for editurl parameter
                                            </script>
                                        </div><!-- /.span -->
                                    </div>


                                <?php } ?>
                                <hr>
                                <table class="table table-striped table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th>产品名</th>
                                        <th>品牌</th>
                                        <th>颜色</th>
                                        <th>色值</th>
                                        <th>颜色名</th>
                                        <th>尺寸</th>
                                        <th>订单数量</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <?php
                                    $total = 0;
                                    foreach($info['styles'] as $product_id=>$styles) {
                                        foreach($styles as $style_key=>$style) {
                                            foreach($style['sizes'] as $size) {
                                                $total += $size['quantity'];?>
                                                <tr>
                                                    <td><?=$size['product_name']?></td>
                                                    <td><?=$size['brand_name']?></td>
                                                    <td><div style="border:1px solid grey;border-radius:3px;background-color: #<?=$style['color']?>;width: 20px;height:20px;"></div></td>
                                                    <td><?=$style['color']?></td>
                                                    <td><?=$style['color_name']?></td>
                                                    <td><?=$size['pro_size']?></td>
                                                    <td><?=$size['quantity']?></td>
                                                </tr>

                                            <?php }
                                        }
                                    }?>
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <td colspan="6" style="text-align: right;">总计:</td>
                                        <td><?=$total?></td>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div><!-- /.span -->
                        </div>
                    </div>
                </div>
            </div><!-- /.page-content -->
        </div>
    </div><!-- /.main-content -->
    <?php include(block("admin/block/footer"))?>
</div><!-- /.main-container -->

<div id="confirm_model" class="bootbox modal fade bootbox-prompt in" tabindex="-1" role="dialog" aria-hidden="false"
     style="padding-right: 15px;">
    <div class="modal-backdrop fade in" style="height: 697px;"></div>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×
                </button>
                <h4 class="modal-title">印花下单</h4></div>
            <div class="modal-body">
                <div class="bootbox-body">
                    <form class="form-horizontal">
                        <div class="form-group" style="margin-left: 0px;">
                            <label class="col-sm-3 control-label no-padding-right" for="form-field-1">请选择印花工艺</label>
                            <div class="col-sm-9">
                                <select id="craft" class="col-xs-10 col-sm-5">
                                    <option value="丝网">丝网</option>
                                    <option value="刺绣">刺绣</option>
                                    <option value="热转印">热转印</option>
                                    <option value="数码">数码</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" style="margin-left: 0px;">
                            <label class="col-sm-3 control-label no-padding-right" for="form-field-1">请选择印花供应商</label>
                            <div class="col-sm-9">
                                <select id="manufacturer_id" class="col-xs-10 col-sm-5">
                                    <?php
                                    foreach($manufacturers as $manufacturer){?>
                                    <option value="<?=$manufacturer['id']?>"><?=$manufacturer['name']?></option><?php } ?>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" style="margin-left: 0px;">
                            <label class="col-sm-3 control-label no-padding-right" for="form-field-1">订单处理人员</label>
                            <div class="col-sm-9">
                                <select id="operator_id" class="col-xs-10 col-sm-5">
                                        <option value="1">洪波</option>
                                        <option value="2">徐萍</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal-footer">
                <button data-bb-handler="cancel" onclick="$('.bootbox-close-button').click();" type="button" class="btn btn-default">取消</button>
                <button type="button" class="btn btn-primary" onclick="do_confirm();">下单</button>
            </div>
        </div>
    </div>
</div>

<div id="finish_model" class="bootbox modal fade in" tabindex="-1" role="dialog" aria-hidden="false"
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
                                            <select id="change_man_id" class="col-xs-10 col-sm-5">
                                                <?php
                                                $manufacturers = PtLib\db()->select_rows("select * from et_product_manufacturer");
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
<!--                                    <div class="form-group" style="margin-left: -120px;">-->
<!--                                        <label class="col-sm-3 control-label no-padding-right" for="form-field-1">质检状态</label>-->
<!--                                        <div class="col-sm-9">-->
<!--                                            <input name="" id="zj_status" cols="30" rows="10" class="form-control" style="">-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                    <div class="form-group" style="margin-left: -120px;">-->
<!--                                        <label class="col-sm-3 control-label no-padding-right" for="form-field-1">质检意见</label>-->
<!--                                        <div class="col-sm-9">-->
<!--                                            <textarea name="" id="zj_opinion" cols="30" rows="10" class="form-control" style="width: 307px;height: 96px;"></textarea>-->
<!--                                        </div>-->
<!--                                    </div>-->
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
<div id="ship_model" class="bootbox modal fade in" tabindex="-1" role="dialog" aria-hidden="false"
     style="padding-right: 15px;">
    <div class="modal-backdrop fade in" style="height: 697px;"></div>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×
                </button>
                <h4 class="modal-title">完成发货</h4></div>
            <div class="modal-body">
                <input type="hidden" value="" id="model_act_id">
                <div class="bootbox-body">
                    <form class="form-horizontal">
                        <div class="form-actions center">
                            <button type="button" class="btn btn-sm btn-success btn btn-sm" onclick="finish_ship(this)">
                                完成
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>
</div>


<?php include(block("admin/block/scripts"))?>
<script>
    var $activity_id = "<?php echo $info["activity"]['id']?>";
    function change_man(obj){
        if(!confirm("确定要执行此操作么!")) return;
        var id = $activity_id;
        var manufacturer_id = $("#change_man_id").val();
        alert(manufacturer_id);
        $.post("/api",{
            model:"admin/production",
            action:"change_man",
            id:id,
            manufacturer_id:manufacturer_id
        },function(data){
            location.reload();
        });
    }
    function finish_product(obj){
        if(!confirm("确定要执行此操作么!")) return;
        var id = $activity_id;
        $.post("/api",{
            model:"admin/production",
            action:"finish_product",
            id:id,
        },function(data){
            location.reload();
        });

    }
    function finish_ship(obj){
        if(!confirm("确定要执行此操作么!")) return;
        var id = $activity_id;
        $.post("/api",{
            model:"admin/production",
            action:"finish_ship",
            id:id,
        },function(data){
            location.reload();
        });

    }

    function do_confirm(){
        if(!confirm("确定要执行此操作么!")) return;
        var $craft = $("#craft").val();
        var $manufacturer_id = $("#manufacturer_id").val();
        var $operator_id = $("#operator_id").val();

        $.post("/api",{
            model:"admin/production",
            action:"do_confirm",
            craft:$craft,
            manufacturer_id:$manufacturer_id,
            operator_id:$operator_id,
            activity_id:$activity_id,
        },function(data){
            //location.reload();
            if(data.status == 0){
                location.reload();
            }else{
                alert(data.message);
            }
        },"json");

    }
</script>
<?php if($info['activity']['production_status']== 2){ ?>
    <script src="/ace/assets/js/jquery.jqGrid.min.js"></script>
    <script src="/ace/assets/js/grid.locale-en.js"></script>
    <script type="text/javascript">

        var grid_selector = "#grid-table";
        var pager_selector = "#grid-pager";
        var activity_id = $activity_id;

        function change_exp_no(order_id,obj){
            var value = obj.value;
            $.post("/api",{
                model:"admin/production",
                action:"do_ship_order",
                order_id:order_id,
                exp_no:value,
            },function(data){
                //location.reload();
                if(data.status == 0){
                    //location.reload();
                }else{
                    alert(data.message);
                    $(obj).focus();

                }
            },"json");
        }
        jQuery(function ($) {
            var grid_setting = {
                url: "/api?model=admin/order&action=list&pay_status=1&activity_id="+activity_id,
                url_save: "/api?model=admin/order&action=edit",
                method: "POST",
                height: 450,
                rowNum: 6,
                rowList: [15, 30, 50, 100],
                caption: "",
                cols: [
                    {title: "Id", name: 'id', index: 'id', width: 40,fixed:true, sorttype: true, editable: false},
                    {
                        title: "订单号",
                        name: 'order_no',
                        index: 'order_no',
                        width: 150,
                        fixed:true,
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
                        fixed:true,
                        editable: false,
                        sortable:false,
                        formatter: function (cellvalue, options, rowObject) {
                            return '<a href="/admin/user/modify?id=' + cellvalue + '">' + cellvalue + '</a>';
                        }
                    },
                    {
                        title: "运费",
                        name: 'exp_price',
                        index: 'exp_price',
                        width: 120,
                        fixed:true,
                        sortable: false,
                        editable: false,
                        formatter: function (cellvalue, options, rowObject) {

                            return '运费:{exp_price}<br>快递:{exp_com}<br>数量:{quantity}'.format(rowObject);
                        }
                    },
                    {
                        title: "地址:",
                        name: 'status',
                        index: 'status',
                        sortable: false,
                        editable: false,
                        formatter: function (cellvalue, options, rowObject) {
                            var cell = '{name} - {tel}<br>{province} - {city} - {county} - {addr}'.format(rowObject);
                            console.log(rowObject);
                            return cell;
                        }
                    },
                    {title: "快递信息", name: 'exp_no', index: 'exp_no', width: 200, fixed:true,sortable: false, editable: false,
                        formatter: function (cellvalue, options, rowObject) {
                            if(cellvalue != null && cellvalue){
                                return '<span>快递单号：<br>{exp_no}</span>'.format(rowObject);
                            }else{
                                return '快递单号:<br><input style="width:100%" onchange="change_exp_no({id},this)">'.format(rowObject);
                            }

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

            //获取值
            function myvalue(elem) {
                return $(elem).val();
            }

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
                    {id: "1", name: "sub grid item 1", qty: 11}
                ];
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
                height: grid_setting.height,
                colNames: get_col(grid_setting.cols)['name'],
                colModel: get_col(grid_setting.cols)['model'],
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
                    console.log(xhr);
                    var table = this;
                    setTimeout(function () {
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
            function aceSwitch(cellvalue, options, cell) {
                setTimeout(function () {
                    $(cell).find('input[type=checkbox]')
                        .addClass('ace ace-switch ace-switch-5')
                        .after('<span class="lbl"></span>');
                }, 0);
            }

            //enable datepicker
            function pickDate(cellvalue, options, cell) {
                setTimeout(function () {
                    $(cell).find('input[type=text]')
                        .datepicker({format: 'yyyy-mm-dd', autoclose: true});
                }, 0);
            }


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
                },
                {
                    //edit record form
                    //closeAfterEdit: true,
                    //width: 700,
                    recreateForm: true,
                    beforeShowForm: function (e) {
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
                    beforeShowForm: function (e) {
                        var form = $(e[0]);
                        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar')
                            .wrapInner('<div class="widget-header" />')
                        style_edit_form(form);
                    }
                },
                {
                    //delete record form
                    recreateForm: true,
                    beforeShowForm: function (e) {
                        var form = $(e[0]);
                        if (form.data('styled')) return false;

                        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
                        style_delete_form(form);

                        form.data('styled', true);
                    },
                    onClick: function (e) {
                        //alert(1);
                    }
                },
                {
                    //search form
                    recreateForm: true,
                    afterShowSearch: function (e) {
                        var form = $(e[0]);
                        form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
                        style_search_form(form);
                    },
                    afterRedraw: function () {
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
                    beforeShowForm: function (e) {
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
                if (form.data('styled')) return false;

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
                    'ui-icon-seek-first': 'ace-icon fa fa-angle-double-left bigger-140',
                    'ui-icon-seek-prev': 'ace-icon fa fa-angle-left bigger-140',
                    'ui-icon-seek-next': 'ace-icon fa fa-angle-right bigger-140',
                    'ui-icon-seek-end': 'ace-icon fa fa-angle-double-right bigger-140'
                };
                $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function () {
                    var icon = $(this);
                    var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

                    if ($class in replacement) icon.attr('class', 'ui-icon ' + replacement[$class]);
                })
            }

            function enableTooltips(table) {
                $('.navtable .ui-pg-button').tooltip({container: 'body'});
                $(table).find('.ui-pg-div').tooltip({container: 'body'});
            }

            //var selr = jQuery(grid_selector).jqGrid('getGridParam','selrow');

            $(document).one('ajaxloadstart.page', function (e) {
                $(grid_selector).jqGrid('GridUnload');
                $('.ui-jqdialog').remove();
            });
        });
    </script>
<?php } ?>
</body>
</html>

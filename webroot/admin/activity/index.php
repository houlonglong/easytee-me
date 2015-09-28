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
                                                        <option value="0">草稿</option>
                                                        <option value="">全部</option>
                                                    </select>
                                                </span>
                                                <span class="mr-20">
                                                    <select id="success_status" onchange="search()" style="display: none;">
                                                        <option value="">全部</option>
                                                        <option value="2">失败的</option>
                                                        <option value="3">成功的</option>
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

        function do_success($id){
            if(!confirm("确定么")) return;
            if(!confirm("确定么")) return;
            $.post("/api",{
                model:"admin/activity",
                action:"do_success",
                id:$id
            },function(data){
                if(data.status == 0){
                    alert("操作成功");
                }else{
                    alert(data.message)
                }
            },"json");
        }
        function do_fail($id){
            if(!confirm("确定要删除么")) return;
            if(!confirm("确定要删除么")) return;
            $.post("/api",{
                model:"admin/activity",
                action:"do_fail",
                id:$id
            },function(data){
                if(data.status == 0){
                    alert("操作成功");
                }else{
                    alert(data.message)
                }
            },"json");
        }
        function del_activity($id,obj){
            if(!confirm("确定要删除么")) return;
            if(!confirm("确定要删除么")) return;

            $.post("/api",{
                model:"admin/activity",
                action:"remove",
                id:$id
            },function(data){
                if(data.status == 0){
                    $(obj).parents("tr").slideUp(800,function(){
                        $(this).remove();
                    });
                }else{
                  alert(data.message)
                }
            },"json");
        }

        function search(){
            var status = $('#status').val();
            var success_status = $("#success_status").val();
            $query = {
                verify:$('#verify').val(),
                status:status,
                activity_id:$('#activity_id').val(),
                activity_name:$('#activity_name').val(),
            };

            if( status == '10'){
                $('#success_status').show();
                if($('#success_status').val()>0){
                    $query['status'] = $('#success_status').val();
                }
            }else{
                $('#success_status').hide();
            }

            $(grid_selector).jqGrid('setGridParam',{
                datatype:'json',
                postData:$query, //发送数据
                page:1
            }).trigger("reloadGrid"); //重新载入
        }

        jQuery(function($) {
            var grid_setting = {
                url:"/api?model=admin/activity&action=list",
                method:"POST",
                postData:{status:1},
                sortorder:"desc",
                height:800,
                rowNum:6,
                rowList:[15,30,50,100],
                caption:"",
                cols:[
                    {title:"Id",name:'id',index:'id', width:80, fixed:true,sortable:true, editable: false},
                    {title:"缩略图",name:'thumb_img_url',width:110, fixed:true,index:'thumb_img_url',sortable:false,editable: false,
                        formatter:function(cellvalue, options, rowObject){
                            var cell = '<img style="width:100px;height:100px;" src="'+cellvalue+'">';
                            return cell;
                        }
                    },
                    {title:"活动名称",name:'name',index:'name', width:600,fixed:true,sortable:false,editable: false,
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

                            var end_time =new Date((rowObject.end_time).replace(/-/g,"/"));
                            var date = new Date();

                            if(date > end_time && rowObject.status == 1 ){
                                if(rowObject.sale_count > 10){
                                    if(rowObject.production_status > 0){
                                        cell += "<br>生产..";
                                    }else{
                                        cell += "<br><button class=\"btn btn-success\" onclick='do_success({id})'>成功</button>" ;
                                    }

                                }else{
                                    cell += "<br>未达10件" ;
                                    cell += "<br><button class=\"btn btn-danger\" onclick='do_fail({id})'>失败</button>" ;
                                }
                            }
                            return cell.format(rowObject);
                        }
                    },
                    {title:"时间",name:'start_time',index:'start_time',width:300,fixed:true,sortable:false,editable: true,
                        formatter:function(cellvalue, options, rowObject){
                            var cell = "期限:"+rowObject.period +
                                '<br>开始:'+cellvalue+
                                '<br>结束:'+rowObject.end_time;
                            return cell;
                        }
                    },
                    {title:"操作",name:'options',index:'', width:300, fixed:true,align:'center', sortable:false, resize:false,
                        formatter:function(cellvalue, options, rowObject){
                            var html='';
                            html  = '<a target="_blank" class="btn btn-success" style="margin-right: 5px;border-radius: 4px;" href="/admin/activity/detail?id={id}" >详情</a>';
                            html += '<a  class="btn btn-info" target="_blank" style="border-radius: 4px;" onclick="del_activity({id},this)" >删除</a>';

                            return html.format(rowObject);
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
                subGrid : false,
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
                sortorder:grid_setting.sortorder,
                postData:grid_setting.postData,
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
                multiselect: false,
                multiboxonly: false,
                loadComplete : function(xhr) {

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
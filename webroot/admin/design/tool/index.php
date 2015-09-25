<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <?php
    /**
     * 设计工具
     *
     */
    include(block("admin/block/html_head"))?>
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
                <div class="page-header">
                    <h1>
                        设计工具
                        <small>
                            <i class="ace-icon fa fa-angle-double-right"></i>
                        </small>
                    </h1>
                </div><!-- /.page-header -->
                <div class="row">
                    <div class="col-xs-12">
                        <div class="row">
                            <div class="col-xs-8">
                                <canvas id="canvas" width="500" height="500"></canvas>
                            </div>
                            <div class="col-xs-4">
                                <label class="btn btn-primary" for="file_select">
                                    <input id="file_select" type="file" style="display:none;">
                                    上传图片
                                </label>
                                <hr>
                                <div>
                                    <input type="text" id="c_text"> <button class="btn" onclick="change_text()">修改</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- /.page-content -->
        </div>
    </div><!-- /.main-content -->
    <?php include(block("admin/block/footer"))?>
</div><!-- /.main-container -->
<?php include(block("admin/block/scripts"))?>
<script src="/js/libs/fabric/fabric.js"></script>
<script class="reload" src="main.js"></script>

<script>
    function change_text(){
        var val = $("#c_text").val();
        texts['text1'] = new fabric.Text(val, { left: 160, top: 150 });
        canvas.add(texts['text1']);
    }
    var canvas = new fabric.Canvas('canvas');
    var texts = {};
    var rect = new fabric.Rect({
        top : 100,
        left : 100,
        width : 60,
        height : 70,
        fill : 'red'
    });
    //texts['text1'] = new fabric.Text('hello world', { left: 160, top: 150 });
    //canvas.add(texts['text1']);
    //fabric.Image.fromURL('http://www.easytee.me/resources/public/image/site-logo.png', function(oImg) {
    //    console.log(oImg);
    //    canvas.add(oImg);
    //},{
    //    left: 160,
    //    top: 100,
   // });
    //canvas.add(rect);
    $(function(){
        fabric.Image.fromURL("/test/LOL.png", function(oImg) {
            // scale image down, and flip it, before adding it onto canvas
            //oImg.scale(0.5).setFlipX(true);
            canvas.add(oImg);
        },{
            width:200,
            height:200,
            left:100,
            top:100
        });
        $("#text1").keydown(function(){
            if(this.value){
                console.log(this.value,texts['text1'])
                texts['text1'].setText(this.value);
                canvas.renderAll();
            }
        });
        $("#file_select").change(function(e){
            if (!(window.File && window.FileList && window.FileReader)) {
                return alert("不支持上传方法");
            }
            var files = e.target.files || e.dataTransfer.files;
            var file = files[0];
            console.log(file.name,file.type,file.size+"bytes",file);
            if (file.type.indexOf("svg") > 0) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    //$("#result").html(e.target.result);
                    fabric.loadSVGFromURL(e.target.result, function(objects, options){
                        var obj = fabric.util.groupSVGElements(objects, options);
                        obj.set({
                            left: 100,
                            top: 100
                        });
                        canvas.add(obj);
                    });
                }
                reader.readAsDataURL(file);
                //reader.readAsText(file);
            }else if (file.type.indexOf("image") == 0) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    var img_base64 = e.target.result;
                    fabric.Image.fromURL(img_base64, function(oImg) {
                        // scale image down, and flip it, before adding it onto canvas
                        //oImg.scale(0.5).setFlipX(true);
                        canvas.add(oImg);
                    },{
                        width:200,
                        height:200,
                        left:100,
                        top:100
                    });
                    //console.log(img_base64);
                    //$("#result").html('<img src="'+img_base64+'">');
                };
                reader.readAsDataURL(file);
            }
        });
    });
</script>
</body>
</html>

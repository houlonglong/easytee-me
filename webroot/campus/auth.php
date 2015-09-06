<!DOCTYPE html>
<html lang="zh-CN">
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="Cache-Control" content="no-siteapp"/>
<meta name="renderer" content="webkit">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<title>易衫开学礼</title>
<meta name="keywords" content="定制T恤,定制T恤,T恤,T恤丝网印刷,刺绣,数码印刷,设计,定制服装"/>
<meta name="description" content="使用易衫网的T恤在线设计工具来创建您的作品.您可以上传自己的设计,或者使用我们丰富的素材库和众多的各种字体."/>
<?php include(block("block/html_head"));?>
<link rel="stylesheet" type="text/css" href="/resources/theme/index/css/index.css">
<link rel="stylesheet" type="text/css" href="/resources/theme/index/css/auth.css">
<body>
<?php include(block("block/nav_bar"));?>
<div class="page-wrapper">
</div>
<div class="banner">
    <div class="color">
    </div>
    <img src="/resources/theme/index/image/banner-act.jpg" alt="开学有礼">
</div>
<div id="form">
    <div>
        <label for="school">
            学校:
        </label>
        <select name="" id="school">
            <option value="吴中职教中心">
                吴中职教中心
            </option>
            <option value="江苏理工学院">
                江苏理工学院
            </option>
            <option value="苏州大学">
                苏州大学
            </option>
            <option value="江苏大学">
                江苏大学
            </option>
            <option value="上海交通大学">
                上海交通大学
            </option>
            <option value="扬州大学">
                扬州大学
            </option>
            <option value="澳门大学">
                澳门大学
            </option>
            <option value="东南大学">
                东南大学
            </option>
            <option value="江苏经贸职业技术学院">
                江苏经贸职业技术学院
            </option>
            <option value="江苏海事职业技术学院">
                江苏海事职业技术学院
            </option>
            <option value="三江学院">
                三江学院
            </option>
            <option value="平顶山学院">
                平顶山学院
            </option>
        </select>
    </div>
    <div class="form">
        <label for="major">专业(可选填):</label>
        <input type="text" id="major">
    </div>
    <div>
        <label for="real_name">姓名:</label>
        <input type="text" id="real_name">
    </div>
    <div>
        <label for="student_no">学号:</label>
        <input type="text" id="student_no">
    </div>
    <div class="pro">
        <label>学生证:</label>
        <input type="file" class="uplode uplode2" id="file_select" value="上传"/>
        <div class="uplode ">
            上传
        </div>
    </div>
    <span>范例：</span>
    <br>
    <p id="result">
    </p>
    <button class="sure">
        确认
    </button>
</div>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
</div>

<?php include(block("block/page_footer"));
$http_host = $_SERVER['HTTP_HOST']  ?>
</body>
<script>$(function() {

        $("#file_select").change(function(e) {
            if (!(window.File && window.FileList && window.FileReader)) {
                return alert("不支持上传方法");
            }
            var files = e.target.files || e.dataTransfer.files;
            var file = files[0];
            console.log(file.name, file.type, file.size + "bytes", file);
            if (file.type.indexOf("svg") > 0) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    $("#result").html(e.target.result);
                }
                reader.readAsText(file);
            } else if (file.type.indexOf("image") == 0) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    var img_base64 = e.target.result;
                    //console.log(img_base64);
                    $("#result").html('<img id="img_url" src="' + img_base64 + '" style="width:300px;height:130px">');
                };
                reader.readAsDataURL(file);
            }
        });
        /**
         * check is chinese
         */
        function is_cn(str) {
            var myReg = /^[\u4e00-\u9fa5]+$/;
            return myReg.test(str);
        }
        $(".sure").on("click", function() {
            var school_name = $("#school").val();
            var real_name = $.trim($("#real_name").val());
            var student_no = $.trim($('#student_no').val());
            var img_url = ($('#img_url').attr("src"));
            var major = $.trim($('#major').val());
            if (!is_cn(real_name)) {
                return alert("姓名只能是中文");
            }
            if (student_no == "") {
                alert("学号不能为空")
            }
            if ($("#result").find('img').html() == undefined) {
                alert("图片没有上传")
            }
            $.post("/api?model=campus&action=do_auth", {
                    school_name: school_name,
                    real_name: real_name,
                    student_no: student_no,
                    img_url: img_url,
                    major: major
                },
                function(data) {
                    if (data.status == 0) {
                        location.href = "/campus/success"
                    } else {
                        alert(data.message)
                    }
                }, "json")
        })
    })</script>
</html>


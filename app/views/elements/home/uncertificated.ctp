<form class="form-horizontal ng-pristine ng-valid" role="form" method="post" action="/home/certification" enctype ="multipart/form-data">
    <!--未认证的提示-->
    <div class="form-group">
        <div class="col-sm-2"></div>
        <div class="col-sm-10"><div class="label label-warning">通过认证的用户才可以提现哦</div></div>
    </div>
    <!--未认证的提示-->
    <div class="form-group">
        <label for="inputEmail3" class="col-sm-2 control-label">认证类型</label>
        <div class="col-sm-10">
            <label class="radio-inline c-radio">
                <input name="type" type="radio" id="personal" value="personal" checked="checked">
                <span class="fa fa-circle"></span>个人</label>
            <label class="radio-inline c-radio">
                <input name="type" type="radio" id="qiye" value="business">
                <span class="fa fa-circle"></span>企业</label>
        </div>
    </div>
    <!--个人类型-->
    <div class="personal">
        <div class="form-group">
            <label for="name" class="col-sm-2 control-label">真实姓名</label>

            <div class="col-sm-10">
                <input type="text" class="form-control" id="name" name="name" placeholder="真实姓名">
            </div>
        </div>
        <div class="form-group">
            <label for="personalIDType" class="col-sm-2 control-label">证件类型</label>
            <div class="col-sm-10">
                <select name="personalIDType" id="personalIDType" class="form-control m-b">
                    <option value="1">身份证</option>
                    <option value="2">学生证</option>
                    <option value="3">台胞证</option>
                    <option value="4">护照</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="personalID" class="col-sm-2 control-label">身份证号</label>

            <div class="col-sm-10">
                <input type="text" class="form-control" id="personalID" name="personalID" placeholder="身份证号">
            </div>
        </div>
        <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">上传证件</label>
            <div class="col-sm-10">
                <input filestyle="" type="file" data-classbutton="btn btn-default" data-classinput="form-control inline"
                       class="form-control" id="personalIDImage" name="personalIDImage" tabindex="-1"
                       style="position: absolute; clip: rect(0px 0px 0px 0px);">

                <div class="bootstrap-filestyle input-group"><input type="text" class="form-control " disabled=""> <span
                        class="group-span-filestyle input-group-btn" tabindex="0"><label for="personalIDImage"
                                                                                         class="btn btn-default "><span
                                class="glyphicon glyphicon-folder-open"></span>选择图片</label></span></div>
            </div>
        </div>
        <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">手持证件照</label>

            <div class="col-sm-10">
                <input filestyle="" type="file" data-classbutton="btn btn-default" data-classinput="form-control inline"
                       class="form-control" id="personalIDWithBodyImage" name="personalIDWithBodyImage" tabindex="-1"
                       style="position: absolute; clip: rect(0px 0px 0px 0px);">

                <div class="bootstrap-filestyle input-group"><input type="text" class="form-control " disabled=""> <span
                        class="group-span-filestyle input-group-btn" tabindex="0"><label for="personalIDWithBodyImage"
                                                                                         class="btn btn-default "><span
                                class="glyphicon glyphicon-folder-open"></span>选择图片</label></span></div>
            </div>
        </div>
    </div>
    <!--企业类型-->
    <div class="business">
        <div class="form-group">
            <label for="companyName" class="col-sm-2 control-label">单位名称</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="companyName" name="companyName" placeholder="单位名称">
            </div>
        </div>
        <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">营业执照副本</label>
            <div class="col-sm-10">
                <input filestyle="" type="file" data-classbutton="btn btn-default" data-classinput="form-control inline"
                       class="form-control" id="businessLicenseImage" name="businessLicenseImage" tabindex="-1"
                       style="position: absolute; clip: rect(0px 0px 0px 0px);">

                <div class="bootstrap-filestyle input-group"><input type="text" class="form-control " disabled=""> <span
                        class="group-span-filestyle input-group-btn" tabindex="0"><label for="businessLicenseImage"
                                                                                         class="btn btn-default "><span
                                class="glyphicon glyphicon-folder-open"></span>选择图片</label></span></div>
            </div>
        </div>
        <div class="form-group">
            <label for="businessLicense" class="col-sm-2 control-label">营业执照注册号</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="businessLicense" name="businessLicense" placeholder="营业执照注册号">
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">营业期限</label>
            <div class="col-sm-10">
                <div class="form-inline">
                    <div class="col-md-10">
                        <div class="form-group">
                        <div class="input-group">
                            <input class="form-control input-datetime-local" type="text" name="year" id="year">
                            <div class="input-group-addon">年</div>
                            <input class="form-control" type="text" name="month" id="month">
                            <div class="input-group-addon">月</div>
                            <input class="form-control" type="text" name="day" id="day">
                            <div class="input-group-addon">日</div>
                        </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                            <label class="checkbox">
                                <input type="checkbox" name="alwaysWorks"> 长期有效
                            </label>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-group">
            <label for="companyAddress" class="col-sm-2 control-label">公司地址</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="companyAddress" name="companyAddress" placeholder="公司地址">
            </div>
        </div>
        <div class="form-group">
            <label for="companyTel" class="col-sm-2 control-label">联系电话</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="companyTel" name="companyTel" placeholder="联系电话">
            </div>
        </div>
        <div class="form-group">
            <label for="institutionCode" class="col-sm-2 control-label">组织机构代码</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="institutionCode" name="institutionCode" placeholder="组织机构代码">
            </div>
        </div>
        <div class="form-group">
            <label for="registeredCapital" class="col-sm-2 control-label">注册资金</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="registeredCapital" name="registeredCapital" placeholder="注册资金">
            </div>
        </div>
        <hr>
        <div class="form-group">
            <label for="legalPerson" class="col-sm-2 control-label">法人代表</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="legalPerson" name="legalPerson" placeholder="法人代表">
            </div>
        </div>
        <div class="form-group">
            <label for="companyIDType" class="col-sm-2 control-label">证件类型</label>
            <div class="col-sm-10">
                <select name="companyIDType" id="companyIDType" class="form-control m-b">
                    <option value="1">身份证</option>
                    <option value="2">学生证</option>
                    <option value="3">台胞证</option>
                    <option value="4">护照</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="companyID" class="col-sm-2 control-label">证件号码</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="companyID" name="companyID" placeholder="证件号码">
            </div>
        </div>
        <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">上传身份证件</label>
            <div class="col-sm-10">
                <input filestyle="" type="file" data-classbutton="btn btn-default" data-classinput="form-control inline"
                       class="form-control" id="companyIDImage" name="companyIDImage" tabindex="-1"
                       style="position: absolute; clip: rect(0px 0px 0px 0px);">

                <div class="bootstrap-filestyle input-group"><input type="text" class="form-control " disabled=""> <span
                        class="group-span-filestyle input-group-btn" tabindex="0"><label for="companyIDImage"
                                                                                         class="btn btn-default "><span
                                class="glyphicon glyphicon-folder-open"></span>选择图片</label></span></div>
            </div>
        </div>
        <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">手持身份证件照</label>

            <div class="col-sm-10">
                <input filestyle="" type="file" data-classbutton="btn btn-default" data-classinput="form-control inline"
                       class="form-control" id="companyIDWithBodyImage" name="companyIDWithBodyImage" tabindex="-1"
                       style="position: absolute; clip: rect(0px 0px 0px 0px);">

                <div class="bootstrap-filestyle input-group"><input type="text" class="form-control " disabled=""> <span
                        class="group-span-filestyle input-group-btn" tabindex="0"><label for="companyIDWithBodyImage"
                                                                                         class="btn btn-default "><span
                                class="glyphicon glyphicon-folder-open"></span>选择图片</label></span></div>
            </div>
        </div>
    </div>
    <div class="form-group">
        <label class="col-sm-2"></label>
        <div class="col-sm-10">
            <button type="submit" class="btn btn-primary" id="submit">提交申请</button>
        </div>
    </div>
</form>
<script>
$(function(){
    $(document).on("change","#certification input[name='type']",function(){
        var v = $(this).val();
        $("#certification .personal,#certification .business").hide();
        $("."+v).show();
    });

    $("input[type='file']").change(function(){
        var filename = $(this).val();
        console.log($(this));
        $(this).next().children('input').val(filename);
    });

    //表单验证
    $('#submit').click(function(){
        //个人
        var val=$('input:radio[id="personal"]:checked').val();
        if(val!=null){      
            if($('#name').val()=='')
            {
                alert('请输入真实姓名');
                return false;
            }else if($('#personalID').val()=='')
            {
                alert('请输入身份证号码');
                return false;
            }
            var personalID = $('#personalID').val();
             //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。  
             if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(personalID)))  
            {
                   alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
                  return false;
            }else if ($('#personalIDImage').val()=='')  
            {
                  alert('请上传证件');
                  return false;
            }
            else if ($('#personalIDWithBodyImage').val()=='')  
            {
                  alert('请上传手持证件照');
                  return false;
            }
                  return true;
     }
     //企业
  else
     {
        if($('#companyName').val()=='')
        {
            alert('请输入单位名称');
            return false;
        }else if($('#businessLicenseImage').val()=='')
        {
            alert('请上传营业执照副本');
            return false;
        }else if($('#businessLicense').val()=='')
        {
            alert('请输入营业执照注册号');
            return false;
        }else if($('#year').val()=='')
        {
            alert('请输入营业期限年份');
            return false;
        }else if($('#month').val()=='')
        {
            alert('请输入营业期限月份');
            return false;
        }else if($('#day').val()=='')
        {
            alert('请输入营业日期');
            return false;
        }else if($('#companyAddress').val()=='')
        {
            alert('请输入公司地址');
            return false;
        }else if($('#companyTel').val()=='')
        {
            alert('请输入联系电话');
            return false;
        }else if($('#institutionCode').val()=='')
        {
            alert('请输入组织机构代码');
            return false;
        }else if($('#registeredCapital').val()=='')
        {
            alert('请输入注册资金');
            return false;
        }else if($('#legalPerson').val()=='')
        {
            alert('请输入法人代表');
            return false;
        }
        else if($('#companyID').val()=='')
        {
            alert('请输入证件号码');
            return false;
        }else if($('#companyIDImage').val()=='')
        {
            alert('请上传上传身份证件');
            return false;
        }else if($('#companyIDWithBodyImage').val()=='')
        {
            alert('请上传手持身份证件照');
            return false;
        }
            return true;
        }
         return false;      
    });
})
</script>
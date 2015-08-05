<div class="form-horizontal ng-pristine">
    <div class="form-group">
        <div class="col-sm-2"></div>
        <div class="col-sm-10">
            <?php if($userCertification['UserCertification']['passed'] == 0){ ?>
            <div class="label label-warning">您的资料正在审核中，请耐心等待</div>
            <?php }else{ ?>
            <div class="label label-success">您已经通过实名认证了</div>
            <?php } ?>
        </div>
    </div>
    <?php if($userCertification['UserCertification']['type'] == 'personal'){ ?>
    <div class="form-group">
        <div class="col-sm-2">认证类型</div>
        <div class="col-sm-10">个人</div>
    </div>
    <div class="form-group">
        <div class="col-sm-2">真实姓名</div>
        <div class="col-sm-10"><?=$userCertification['UserCertification']['name'];?></div>
    </div>
    <div class="form-group">
        <div class="col-sm-2">证件类型</div>
        <div class="col-sm-10"><?=$userCertification['UserCertification']['personalIDType'];?></div>
    </div>
    <div class="form-group">
        <div class="col-sm-2">证件号</div>
        <div class="col-sm-10"><?=showName($userCertification['UserCertification']['personalID']);?></div>
    </div>
    <?php if($userCertification['UserCertification']['passed'] == 1){ ?>
    <hr>
    <div class="form-group">
        <div class="col-sm-2">认证时间</div>
        <div class="col-sm-10"><?=$userCertification['UserCertification']['passed_time'];?></div>
    </div>
    <?php } ?>
    <?php }else{ ?>
    <div class="form-group">
        <div class="col-sm-2">认证类型</div>
        <div class="col-sm-10">企业</div>
    </div>
    <div class="form-group">
        <div class="col-sm-2">企业名称</div>
        <div class="col-sm-10"><?=$userCertification['UserCertification']['name'];?></div>
    </div>
    <div class="form-group">
        <div class="col-sm-2">证件类型</div>
        <div class="col-sm-10"><?=$userCertification['UserCertification']['companyIDType'];?></div>
    </div>
    <div class="form-group">
        <div class="col-sm-2">证件号</div>
        <div class="col-sm-10"><?=showName($userCertification['UserCertification']['companyID']);?></div>
    </div>
    <?php if($userCertification['UserCertification']['passed'] == 1){ ?>
    <hr>
    <div class="form-group">
        <div class="col-sm-2">认证时间</div>
        <div class="col-sm-10"><?=$userCertification['UserCertification']['passed_time'];?></div>
    </div>
    <?php } ?>
    <?php } ?>
</div>
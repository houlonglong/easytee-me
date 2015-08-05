<form id="address-form">

    <div class="row">
        <div class="col-xs-6">
            <div class="form-group">
                <label class="control-label">姓名：</label>
                <input class="form-control" placeholder="请输入收货人姓名" value="<?php echo @$address['name']; ?>" name="name"
                       id="address-name">
            </div>
        </div>
        <div class="col-xs-6">
            <div class="form-group">
                <label class="control-label">手机：</label>
                <input class="form-control" type="tel" placeholder="请输入收货人手机"
                       value="<?php echo @$address['mobile']; ?>" id="address-tel">
            </div>
        </div>
    </div>


    <div class="form-group">
        <label class="control-label">区域：</label>

        <div class="row">
            <div class="col-xs-4"><select class="form-control" name="address-province" id="address-province">
                </select></div>
            <div class="col-xs-4"><select class="form-control" name="address-city" id="address-city">
                </select></div>
            <div class="col-xs-4"><select class="form-control" name="address-area" id="address-area">
                </select></div>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label">详细地址：</label>
        <input class="form-control" placeholder="请输入详细地址" value="<?php echo @$address['address']; ?>" id="address-addr"
               name="addr">
    </div>
    <div class="form-group">
        <input type="hidden" class="form-control" value="<?php echo @$address['id']; ?>" id="address-id"
               name="address-id">
    </div>
</form>
<script>
    new PCAS('address-province', 'address-city', 'address-area', '<?php echo @$address['province']; ?>', '<?php echo @$address['city']; ?>', '<?php echo @$address['county']; ?>');
</script>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>订单确认</title>
    <?php include(block("block/header_header")) ?>
    <link rel="stylesheet" href="../../css/order/detail.css">
    <script src="../../js/app/detail/detail.js"></script>

</head>
<body>
    <?php include(block("block/header_body")) ?>
    <div class="order-detail clearfix typeArea">
        <div class="order-detail-con">
            <ul>
                <li class="order-detail-list">
                    <h4>基础圆领款</h4>
                    <div class="order-detail-list-con clearfix">
                        <img src="../../css/order/img/list_img.png">
                        <ul class="order-detail-list-con-ul">
                            <li>
                                <span>数量</span>
                                <span>尺码</span>
                                <span>产品</span>
                                <span>颜色</span>
                                <span>价格</span>
                            </li>
                            <li  class="list-detail">
                                <span class="list-detail-num">1件</span>
                                <span class="list-detail-size">M</span>
                                <span class="list-detail-style">基础圆领款</span>
                                <span class="list-detail-color"></span>
                                <span class="list-detail-price">￥300.00</span>
                            </li>
                        </ul>

                    </div>
                </li>
                <li class="order-detail-list">
                    <h4>基础圆领款</h4>
                    <div class="order-detail-list-con clearfix">
                        <img src="../../css/order/img/list_img.png">
                        <ul class="order-detail-list-con-ul">
                            <li>
                                <span>数量</span>
                                <span>尺码</span>
                                <span>产品</span>
                                <span>颜色</span>
                                <span>价格</span>
                            </li>
                            <li  class="list-detail">
                                <span class="list-detail-num">1件</span>
                                <span class="list-detail-size">M</span>
                                <span class="list-detail-style">基础圆领款</span>
                                <span class="list-detail-color"></span>
                                <span class="list-detail-price">￥300.00</span>
                            </li>
                        </ul>

                    </div>
                </li>
            </ul>
            <div class="list-logistics clearfix">
                <span class="list-logistics-left">物流</span>
                <span class="list-logistics-right">￥5.00</span>
            </div>
            <div class="list-subtotal clearfix">
                <span class="list-subtotal-left">总计</span>
                <span class="list-subtotal-right">￥35.00</span>
            </div>
        </div>
        <div class="order-detail-invoice">
            <div class="order-detail-invoice-uniform">
                <p>活动发起人：someknjlknoljd已选择了统一发货，您可以根据以下信息到 <span>江苏省南京市</span>领取您的物品</p>
                <p>斗鱼的各位用户,请在9月20日下午14:00-18:00到南京市xxxxxx凭您购买时的手机号或邮箱领取您的物品</p>
                <input type="checkbox" class="order-checkbox">　我需要快递送上门
            </div>
            <div class="expressage">
                <div class="limit">
                    <label>选择快递：<i class="limit-red">*</i></label>
                    <select name="" id="">
                        <option>中通</option>
                        <option>圆通</option>
                        <option>申通</option>
                        <option>顺丰</option>
                    </select>
                </div>
                <hr>
                <div class="expressage-often">
                    <div class="expressage-often-title">常用地址</div>
                    <input type="checkbox" class="order-checkbox">
                    <span class="expressage-often-address">刘晓刘  上海市中江路879号天地软件园12号楼401室  13671647808 </span>
                    <button>修改</button>

                </div>
                <div class="expressage-add">
                    <div class="expressage-often-title">添加新地址</div>
                    <div class="limit">
                        <label for="">收货人姓名：<i class="limit-red">*</i></label>

                        <input type="text">
                    </div>
                    <div class="limit">
                        <label for="">手机号：<i  class="limit-red">*</i></label>
                        <input type="text">
                    </div>
                    <div class="limit">
                        <label for="">所在地区：<i class="limit-red">*</i></label>
                        <select name="" id="province" class="expressage-add-area ">
                            <!--<option>安徽</option>
                            <option>湖南</option>
                            <option>浙江</option>
                            <option>江苏</option>-->
                        </select>
                        <select name="" id="town" class="expressage-add-area ">
                            <!--<option>合肥</option>
                            <option>长沙</option>
                            <option>杭州</option>
                            <option>南京</option>-->
                        </select>
                        <select name="" id="area" class="expressage-add-area ">
                            <!--<option>包河区</option>
                            <option>湖南</option>
                            <option>浙江</option>
                            <option>江苏</option>-->
                        </select>
                    </div>
                    <div class="limit">
                        <label for="">详细地址：<i  class="limit-red">*</i></label>
                        <textarea name="" id="" rows="5" cols="47"></textarea>
                    </div>

                </div>
                <div class="expressage-btn">
                    <button class="expressage-btn-cancel">取消</button>
                    <button class="expressage-btn-sure">保存</button>
                </div>
                <hr>
            </div>
            <div class="payment">
                <div class="balance">
                    <input type="checkbox" class="order-checkbox">
                    <p>账户余额 <i>￥234.00</i>　当前使用 <span>30</span> 元</p>
                    <span class="pay-num">支付￥30.00</span>
                </div>
                <div class="pay-way">
                    <input type="radio" name="way" class="zfb">
                    <input type="radio" name="way" class="wx">
                    <span class="pay-way-num">支付￥30.00</span>
                </div>
                <button class="order-sure">确认支付</button>
            </div>
        </div>
    </div>


    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
<?php include(block("block/footer")) ?>
</body>
<script>
$(function(){
  console.log($(".list-detail-num").html())
})
</script>
</html>

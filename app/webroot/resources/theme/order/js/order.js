$(function () {
    $(".addr_item_input").each(function(){
        if(this.checked) {
            set_address(this);
        }
    });

    handle_act_order_porduct();
    //微信支付
    if(isWechat()){
        $('#use_wechat_addr').show();
        $('.btn-buy-alipay')[0].style.display = "none";
        $('.btn-buy-wechat')[0].style.display = "block";
    }else{
        $('.btn-buy-alipay')[0].style.display = "block";
        $('.btn-buy-wechat')[0].style.display = "none";
    }
    $('#order-plug-coupon').click(function(){
        $('.order-plug-coupon').toggle();
    });
    new PCAS('province', 'city', 'area', '','','');
});

function get_express_price_by_province($province){
    $province = $province.replace("省","").replace("市","");
    var _price = null;
    for(i in express_area_price){
        var area = express_area_price[i]['ExpressPrice'].area;
        var price = express_area_price[i]['ExpressPrice'].price;
        console.log($province,area,price)
        if($province == area){
            _price = price;
            break;
        }
    }
    //console.log(_price);
    return _price;
}
/**
 * 处理订单款式列表
 */
function handle_act_order_porduct(){
    var act_order_form_str = $.cookie("act_order_form");
    if(act_order_form_str == undefined){
        location.href = "/";
        return;
    }
    var act_order_form = JSON.parse(act_order_form_str);
    if(act_order_form.length == 0){
        location.href = "/";
        return;
    }
    //console.log(act_order_form);
    $("#product_list").html("");
    $.each(act_order_form,function(i,row){
        //console.log(row);
        var total = row.nums * row.price;
        var tr_row = '<tr data-pid="'+row.product_id+'" data-sid="'+row.style_id+'">'+
            '<td class="order-list-img"><img class="image" src="'+row.image+'"/></td>'+
            '<td class="order-list-title style_name">'+row.style_name+'</td>'+
            '<td class="order-list-color color_name">'+row.color_name+'</td>'+
            '<td class="order-list-size size">'+row.size+'</td>'+
            '<td class="order-list-num">'+
            '<div class="input-group">'+
            '<span class="input-group-btn">'+
            '<button class="btn btn-default" type="button" onclick="handle_nums(this,0)">-</button>'+
            '</span>'+
            '<input data-price="'+row.price+'" type="text" onchange="on_change_pro_nums(this)" class="form-control pro_nums" value="'+row.nums+'" placeholder="请输入预订数量">'+
            '<span class="input-group-btn">'+
            '<button class="btn btn-default" type="button" onclick="handle_nums(this,1)">+</button>'+
            '</span>'+
            '</div>'+
            '</td>'+
            '<td class="order-list-price">￥<b class="pro_price">'+total.toFixed(2)+'</b></td>'+
            '<td class="order-list-delete">' ;
            if(i!=0){tr_row +='<span class="glyphicon glyphicon-trash" onclick="del_pro_row(this)"></span>' };
        tr_row +='</td>'+
            '</tr>';
        $("#product_list").append(tr_row);
    });
    calculate_order_price();
}

/**
 * 删除款式
 * @param obj
 */
function del_pro_row(obj){
    if($("#product_list tr").length<=1) return alert("您至少要保留一款");

    if(!confirm("确定要删除此款式么?")) return;
    $(obj).parents("tr").fadeOut(200,function(){
        $(this).remove();
        calculate_order_price();
    });

}
/**
 * 计算订单金额
 */
function calculate_order_price(){
    var price = 0.00;
    $(".pro_price").each(function(){
        //console.log(this);
        price += parseFloat($(this).text());
    });
    price = parseFloat(price);
    $("#total_amount").text(price.toFixed(2));

    var express_price = get_order_express_price();
    
    if(express_price != null){
        var total_pay = (price+parseFloat(express_price)-get_coupon_amount()).toFixed(2);
    }else{
        express_price = 0;
        total_pay = 0;
    }
    $("#total_express").text(express_price+"");
    $("#total_pay").text(total_pay);
        
    //alert(express_price);
    
    set_act_order_product();
}

function get_order_express_price(){
    var province = $("#addr_province").val();
    var price = get_express_price_by_province(province);
    return price;
}

function on_change_pro_nums(obj){
    var nums = $(obj).val();
    var _n = parseInt(nums);
    if(_n < 1){
        alert("至少选择一件");
        $(obj).val(1);
        return;
    }
    var $total_price = $(obj).data("price") * _n;
    $(obj).parents("tr").find(".pro_price").text($total_price.toFixed(2));
    set_act_order_product();
    calculate_order_price();
}

/**
 * 加减订单款式数量
 * @param type
 *     1 加
 *     0 减
 */
function handle_nums(obj,type){
    var $nums_obj = $(obj).parent().siblings(".pro_nums");
    var nums = $nums_obj.val();
    var _n = parseInt(nums);
    if(!type && _n == 1){
        alert("至少选择一件");
        return;
    }
    if(type){
        _n++;
    }else{
        _n--;
    }
    var $total_price = $nums_obj.data("price") * _n;
    $(obj).parents("tr").find(".pro_price").text($total_price.toFixed(2));
    $nums_obj.val(_n);

    set_act_order_product();
    calculate_order_price();
}

function get_product_list(){
    var rows = [];
    $("#product_list>tr").each(function(){
        var row = {
            product_id:$(this).data("pid"),
            style_id:$(this).data("sid"),
            style_name:$(".style_name",this).text(),
            size:$(".size",this).text(),
            price:$(".pro_nums",this).data("price"),
            nums:$(".pro_nums",this).val(),
            color_name:$(".color_name",this).text(),
            image:$(".image",this).attr("src")
        };
        //console.log(row);
        rows.push(row);
    });
    return JSON.stringify(rows);
}
/**
 * 设置款式订单cookie
 */
function set_act_order_product(){
    $.cookie("act_order_form",get_product_list(),{path:"/"});
}
/**
 * 获取优惠券金额
 * @returns {number}
 */
function get_coupon_amount(){
    return 0;
}

/**
 * 获取优惠码
 * @returns {string}
 */
function get_coupon_code(){
    return '';
}
function use_wechat_addr(){
    var url = EASYTEE_API+"wechat/address?return="+encodeURIComponent(location.href);
    //alert(url);
    window.location.href = url;
}
function show_add_addr(){
    $("#addr_detail_form").show().prev().hide();
}
function on_back_addr_list(){
    $("#addr_detail_form").hide().prev().show();
}
function on_save_addr_from_order(obj) {

    var name = $("#name").val();
    if (!name) {
        $("#name").focus().parent().addClass("has-error");
        return;
    }else{
        $("#name").focus().parent().removeClass("has-error");
    }

    var tel = $("#tel").val();

    var filter  = /^((1[0-9]{1})+\d{9})$/;
    if (!tel || !filter.test(tel)) {
        $("#tel").focus().parent().addClass("has-error");
        return;
    }else{
        $("#tel").focus().parent().removeClass("has-error");
    }


    var province = $("#province").val();
    if (!province) {
        $("#province").focus().parent().addClass("has-error");
        return;
    }else{
        $("#province").focus().parent().removeClass("has-error");
    }
    var city = $("#city").val();
    if (!city) {
        $("#city").focus().parent().addClass("has-error");
        return;
    }else{
        $("#city").focus().parent().removeClass("has-error");
    }
    var area = $("#area").val();
    if (!area) {
        $("#area").focus().parent().addClass("has-error");
        return;
    }else{
        $("#area").focus().parent().removeClass("has-error");
    }
    var addr = $("#addr").val();
    if (!addr) {
        $("#addr").focus().parent().addClass("has-error");
        return;
    }else{
        $("#addr").focus().parent().removeClass("has-error");
    }
    var data = {};
    data.id = "";
    data.name = name;
    data.tel = tel;
    data.province = province;
    data.city = city;
    data.area = area;
    data.addr = addr;
    $(this).attr("disabled",true);
    $.post('/account/ajaxSaveAddress',data,function(data){
        $(this).removeAttr("disabled");
        if(data.status == 1){//成功
            console.log('data: ',data);
            var id = data.id;
//            var lable_html = '<label class="addr_item list-group-item">' +
//                '<input class="addr_item_input" data-id="'+id+'"' +
//                'name="addressId" type="radio"' +
//                'onclick="sel_address(this)"' +
//                ' <strong>'+name+'</strong> ' +
//                '<span class="addr_province">'+province+'</span> -' +
//                '<strong>'+city+'</strong>' +
//                '<strong>'+area+'</strong>' +
//                '<strong>'+addr+'</strong>' +
//                '</label>';
            var label_html = '<label class="addr_item list-group-item">';
            label_html += '<input class="addr_item_input pull-left" data-id="'+id+'" name="addressId" type="radio" onclick="sel_address(this)">';
            label_html += '<div style="margin-left: 25px" class="addr_area"><strong style="font-size: 14px;">'+name+'</strong><span class="pull-right">'+tel+'</span>';
            label_html += '<div><span class="addr_province">'+province+'</span> -'+city+' -'+area+' -'+addr+'</div>';
            label_html += '</div></label>';
            $("#addr_list_div").append(label_html).find("label:last").click();
            $("#name").val("");
            $("#tel").val("");
            $("#addr").val("");
            on_back_addr_list();
        }
        //window.location.reload();
    },"json");
}

function sel_address(obj){
    set_address(obj);
    calculate_order_price();

}
function set_address(obj){
    var addr_id = $(obj).data("id");
    $("#addr_id").val(addr_id);
    var province = $(obj).siblings(".addr_area").find(".addr_province").text();
    $("#addr_province").val(province);
    $(obj).parent().addClass("list-group-item-success").siblings().removeClass("list-group-item-success")
}

function do_pay(obj,type){

    //alert(type);
    $(obj).attr("disabled","true");
    var addr_id = $("#addr_id").val();
    //alert(addr_id);
    if(!addr_id){
        $(obj).removeAttr("disabled");
        return alert("请选择地址!");
    }
    var note = $("#note").val();
    var data      = {};
    data.notes     = $("#notes").val();
    data.addr_id  = addr_id;
    //支付类型 alipay wechat
    data.pay_type = type;
    //活动ID
    data.act_id = act_id;
    //优惠码
    data.coupon_code = get_coupon_code();
    //优惠劵金额
    data.coupon_amount = get_coupon_amount();
    //总计
    data.total_amount = parseFloat($("#total_amount").text());
    //快递
    data.total_express = parseFloat($("#total_express").text());
    //实付
    data.total_pay = parseFloat($("#total_pay").text());

    //产品款式列表
    data.product_list = get_product_list();
    //console.log(JSON.stringify(data));
    $.post("/order/save",data,function(data){
        if(data){
            if(data.status == 0){
                alert(data.msg.value);
                $(obj).removeAttr("disabled");
            }else{
                if(data.url){
                    location.href = data.url;
                }else{
                    $(obj).removeAttr("disabled");
                    alert("系统错误");
                }
            }
        }else{
            alert("系统错误");
            $(obj).removeAttr("disabled");
        }


    },"json")
}

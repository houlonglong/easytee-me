$(function () {

    $('.small-img li').click(function (event) {
        $(this).addClass('current').siblings().removeClass('current');
        var num = $(this).index();
        $('.big-img li').eq(num).addClass('current').siblings().removeClass('current');
    });

    //tab栏切换的部分
    $('.tab-con li').click(function (event) {
        $(this).addClass('current').siblings().removeClass('current');
    });

    var num1 = $('#introduce').offset().top;
    var num2 = $('#details').offset().top;
    var num3 = $('#rule').offset().top;
    var num4 = $('.tab-lan').offset().top;
    $(window).scroll(function (event) {
        var num = $(window).scrollTop();
        //导航栏吸顶效果
        if (num > num4) {
            $('.tab-lan').css({'position': 'fixed', 'top': 0, 'left': '50%', 'transform': 'translate(-50%,0)'});
        } else {
            $('.tab-lan').css({'position': 'static', 'transform': 'translate(0,0)'});
        }

        if (num >= num3) {
            console.log(1);
            $('.tab-con li:eq(2)').addClass('current').siblings().removeClass('current');
        } else if (num >= num2) {
            console.log(2);
            $('.tab-con li:eq(1)').addClass('current').siblings().removeClass('current');
        } else if (num >= num1) {
            console.log(3);
            $('.tab-con li:eq(0)').addClass('current').siblings().removeClass('current');
        }
    });
    //设置弹窗的高度
    $('.tanchuang').height($(window).height());

    $('.cha').click(function (event) {
        $('.tanchuang').hide();
    });

    $('.color-list').click(function (event) {
        $('.tanchuang').show();
    });

    //清浮动
    $('.style-info li').addClass('clearfix');

    $('.add').click(function (event) {
        $('.style-info li:first').clone(true).appendTo('.style-info');
    });

    //初始化活动页面的展示
    $.get("/api",{
            model:'activity',
            action:'detail',
            id:2595
    },function (data){
        if(data.status==0){

             acticity_detail = data.return;

            var detault_id = acticity_detail.default_style['product_id'];
            var sides = acticity_detail.sides;
            var act_designs = acticity_detail.act_designs;
            var product_designs = acticity_detail.product_designs;
            var sell_price=acticity_detail.default_style['sell_price'];
            
            //图片的展示
            for(var i=0;i<sides.length;i++){
                var sideName = sides[i];
                var imgUrl;
                if(act_designs[detault_id][sideName] != undefined){
                    imgUrl = act_designs[detault_id][sideName].img_url;
                }else{
                    imgUrl = product_designs[detault_id][sideName].img_url;
                }
                $('.big-img li:eq('+i+') img').attr('src', imgUrl);
                $('.small-img li:eq('+i+') img').attr('src', imgUrl);
            }
            //显示价格
            $('.price-num').html(''+sell_price+'')

            //颜色的显示
            var styles=acticity_detail.styles;
            for(var o in styles[detault_id]){
                var color_lump=styles[detault_id][o].color;
                var liobj = $("<li><span></span></li>").css('background',"#"+color_lump);
                $('.color-lump').append(liobj);
            }

            /*$('.color-lump li span').click(function(event) {
                //单击 span的时候 图片的背景色变成li的背景色
                var curent_color=$('.color-lump li').css('background-color'); 
                var detault_color=acticity_detail.default_style['color'];
                    detault_color=curent_color;

            });*/
            
            
            //款式列表显示
            var products=acticity_detail.products;
            var a=0;
            for(o in products){
                var str_1="";
                var style_name=products[o].name;
                str_1 += '<option>'+style_name+'</option>';
                $('.style select').append(str_1);
                a++;
            }
            if(a>0){
                $('.style').show();
            }else{
                $('.style').hide();
            }
        
        //初始化款式列表信息
        model.arr[0].thumbnail = acticity_detail.default_style.thumb_img_url;
        model.arr[0].number = 1;
        model.arr[0].products = acticity_detail.products;
        model.arr[0].styles = acticity_detail.styles[acticity_detail.default_style.product_id];
        model.arr[0].sizes = acticity_detail.sizes[acticity_detail.default_style.product_id][acticity_detail.default_style.product_style_id];
        buildList();

        }
    },'json')

    //定义数据模型-Dialog的视图是一致的。并且最终传给后台使用。
    var model = {
        arr: [{}],
        total: 0
    };

    var acticity_detail;

    function getFirstProduct(list){
        for(var o in list){
            return list[0];
        }
    }

    function getFirstProductStyleByProductId(product_id){
        acticity_detail.products[0];
    }

    function getProduct(product_id) {
        var product = acticity_detail.products[product_id];
        return product;
    }

    //colors
    function getProductStyles(product_id) {
        var styles = acticity_detail.styles[product_id];
        return styles;
    }

    //sizes
    function getProductSizes(product_id, product_style_id) {
        var sizes = acticity_detail.sizes[product_id][product_style_id];
        return sizes;
    }

    function buildProducts(list){
        var html = '';
        for(var o in list){
            var item = list[o];
            html += '<option value="'+item.id+'">'+item.name+'</option>'
        }
        return html;
    }

    function buildStyles(list){
        var html = '';
        for(var o in list){
            var item = list[o];
            html += '<a href="#" data-id="'+item.product_style_id+'" tips="'+item.color_name+'"><i style="background-color: #'+item.name+'"></i></a>';
        }
        return html;
    }

    function buildSizes(list){
        var html = '';
        for(var o in list){
            var item = list[o];
            html += '<option value="'+item.id+'">'+item.size+'</option>'
        }
        return html;
    }

    //初始化数据模型
   /* $.get("/api", {
        model: 'activity',
        action: 'detail',
        id: 2595
    }, function (data) {
        if (data.status == 0) {//成功返回
            activity = data.return;
            console.log(activity);
            model.arr[0].thumbnail = activity.default_style.thumb_img_url;
            model.arr[0].number = 1;
            model.arr[0].products = activity.products;
            model.arr[0].styles = activity.styles[activity.default_style.product_id];
            model.arr[0].sizes = activity.sizes[activity.default_style.product_id][activity.default_style.product_style_id];
            buildList();
        } else {//异常
            alert(data.message)
        }
    }, "json");*/

    function buildList() {
        //1、生成HTML
        var list = model.arr;
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var htmlStr = '';
            htmlStr += '<li class="clearfix">';
            htmlStr += '<img src="' + item.thumbnail + '">';
            htmlStr += '<div class="number-info">';
            htmlStr += '<span class="left">-</span>';
            htmlStr += '<input type="text" value="' + item.number + '">';
            htmlStr += '<span class="right">+</span>';
            htmlStr += '</div>';

            htmlStr += '<select name="" id="" class="product-info">';

            htmlStr +=  buildProducts(item.products);

            htmlStr += '</select>';
            htmlStr += '<div data-id="" class="yanse-info current">';
            //htmlStr += '<span style="' + selectedColor.value + '"></span>';
            htmlStr += '<div class="palette">';

            htmlStr += buildStyles(getProductStyles(getFirstProduct(item.products)));

            htmlStr += '</div>';
            htmlStr += '</div>';
            htmlStr += '<select name="" id="" class="chima-info">';

            htmlStr += buildSizes(getProductSizes(getFirstProduct(item.products),id ));

            htmlStr += '</select>';
            htmlStr += '<div class="money-info">';
            htmlStr += '￥<i></i>';
            htmlStr += '</div>';
            htmlStr += '</li>';
        }
        $('ul.style-info').empty().append(htmlStr);
    }
});
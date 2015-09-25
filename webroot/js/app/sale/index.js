$(function () {

    $('.xiaotu li').click(function (event) {
        $(this).addClass('current').siblings().removeClass('current');
        var num = $(this).index();
        $('.datu li').eq(num).addClass('current').siblings().removeClass('current');
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

    //定义数据模型-Dialog的视图是一致的。并且最终传给后台使用。
    var model = {
        arr: [{}],
        total: 0
    };

    var activity;

    function getFirstProduct(list){
        for(var o in list){
            return list[0];
        }
    }

    function getFirstProductStyleByProductId(product_id){
        activity.products[]
    }

    function getProduct(product_id) {
        var product = activity.products[product_id];
        return product;
    }

    //colors
    function getProductStyles(product_id) {
        var styles = activity.styles[product_id];
        return styles;
    }

    //sizes
    function getProductSizes(product_id, product_style_id) {
        var sizes = activity.sizes[product_id][product_style_id];
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
    $.get("/api", {
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
    }, "json");

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

            htmlStr += buildSizes(getProductSizes(getFirstProduct(item.products).id ));

            htmlStr += '</select>';
            htmlStr += '<div class="money-info">';
            htmlStr += '￥<i></i>';
            htmlStr += '</div>';
            htmlStr += '</li>';
        }
        $('ul.style-info').empty().append(htmlStr);
    }
});
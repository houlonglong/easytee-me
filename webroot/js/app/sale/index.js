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
        $('body').removeClass('current');
    });

    $('.btns').click(function (event) {
        $('.tanchuang').show();
        $('body').addClass('current');
    });

    //清浮动
    $('.style-info li').addClass('clearfix');

    $('.add').click(function (event) {
        $('.style-info li:first').clone(true).appendTo('.style-info');
    });

    //初始化活动页面的展示
    $.get("/api", {
        model: 'activity',
        action: 'detail',
        id: 2595
    }, function (data) {
        if (data.status == 0) {

            acticity_detail = data.return;
            //款式列表显示
            var products = acticity_detail.products;
            var a = 0;
            for (o in products) {
                var str_1 = "";
                var style_name = products[o].name;
                str_1 += '<option value="'+products[o].id+'">' + style_name + '</option>';
                $('.style select').append(str_1);
                a++;
            }
            if (a > 0) {
                $('.style').show();
            } else {
                $('.style').hide();
            }

            $('#changeProduct').change(function(){
                var product_id = $(this).val();
                loadProductInfo(product_id);
            });

            var product_id = acticity_detail.default_style['product_id'];
            loadProductInfo(product_id);

            
            $('.color-lump li span').click(function(event) {
                var current_color = $(this).parent().css('background-color');
                $(".big-img li").css('background-color',current_color);
                $(".small-img li").css('background-color',current_color);
            });
            
            loadListInfo();//初始化列表数据

        }
    }, 'json')

    function loadProductInfo(product_id){
        var sides = acticity_detail.sides;
        var act_designs = acticity_detail.act_designs;
        var product_designs = acticity_detail.product_designs;
        var sell_price = acticity_detail.default_style['sell_price']; 

        //图片的展示
        for (var i = 0; i < sides.length; i++) {
            var sideName = sides[i];
            var imgUrl;
            if (act_designs[product_id][sideName] != undefined) {
                imgUrl = act_designs[product_id][sideName].img_url;
            } else {
                imgUrl = product_designs[product_id][sideName].img_url;
            }
            $('.big-img li:eq(' + i + ') img').attr('src', imgUrl);
            $('.small-img li:eq(' + i + ') img').attr('src', imgUrl);
        }
        //显示价格
        $('.price-num').html('' + sell_price + '');
        

        //颜色的显示
        $('.color-lump').empty();
        $('.palette').empty();
        var styles = acticity_detail.styles;
        for (var o in styles[product_id]) {
            var color_lump = styles[product_id][o].color;
            var liobj = $("<li><span></span></li>").css('background', "#" + color_lump);
            var paletteObj = $('<a href="#"><i></i></a>');
                paletteObj.children().css('background', "#" + color_lump);
            
            $('.color-lump').append(liobj);
            $('.palette').append(paletteObj);
        }
    

    }


    var listModel={
        listAttr:[],
        total:0
    }

    function loadListInfo(){
        //listModel.listAttr[0].thumb_img = acticity_detail.default_style['thumb_img_url'];
        //listModel.listAttr[0].number=1;
       //$('.style-info li:eq(0) #thumbImg').attr('src',listAttr[0].thumb_img);
       var thumb_img = acticity_detail.default_style['thumb_img_url'];
       var products = acticity_detail.products;
       var product_id = acticity_detail.default_style.product_id;
       var product_style_id=acticity_detail.default_style.product_style_id;
       var sizes = acticity_detail.sizes[product_id][product_style_id];
       
       
       //$('.money-info').html(''++'')
       $('.style-info li #thumbImg').attr('src',thumb_img);
       
       for(var o in products){
            var str_2 = "";
            var style2_name = products[o].name;
            str_2 += '<option value="'+products[o].id+'">' + style2_name + '</option>';
            $('.product-info').append(str_2);
       }

       for(var o in sizes){
            var list_size=sizes[o].size;
            var size_Ojb='';
            size_Ojb += '<option value="'+sizes.id+'">'+list_size+'</option>';
            $('#sizes').append(size_Ojb);
       }
       

       num_change();

       
    }

    function num_change(){
        var lis_numbel = 1;
        var lis_sell_price = acticity_detail.default_style.sell_price;
        var lis_subtotal = lis_numbel*lis_sell_price;
        $('.money-info i').html(''+lis_subtotal+'');
        
        $('.number-info .left').click(function(event) {
            if(lis_numbel>1){
                lis_numbel--;
            }else{
                lis_numbel=1;
            }
            $(this).siblings('input').val(lis_numbel);

            lis_subtotal = lis_numbel*lis_sell_price;
            $(this).parent().siblings('money-info').children('i').html(''+lis_subtotal+'');
        });

        $('.number-info .right').click(function(event) {
            lis_numbel++;
            $(this).siblings('input').val(lis_numbel);

            lis_subtotal = lis_numbel*lis_sell_price;
            $(this).parent().siblings('money-info').children('i').html(''+lis_subtotal+'');
        });

        
    }

});
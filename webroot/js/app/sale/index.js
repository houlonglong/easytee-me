$(function () {

    /**
     * 初始化缩略图及事件
     */
    function initThumbnail() {
        $('.small-img li').click(function (event) {
            $(this).addClass('current').siblings().removeClass('current');
            var num = $(this).index();
            $('.big-img li').eq(num).addClass('current').siblings().removeClass('current');
        });
    }

    /**
     * 初始化产品介绍Tab及事件
     */
    function initProductDescriptionTab() {
        $('.tab-con li').click(function (event) {
            event.preventDefault();
            var sign = $(this).data('ref');
            var top = $('#' + sign).offset().top;
            $(window).scrollTop(top - 75);
            $(this).addClass('current').siblings().removeClass('current');
        });
    }

    /**
     * 初始化产品介绍定位事件
     */
    function initContextPosition() {
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
                $('.tab-con li:eq(2)').addClass('current').siblings().removeClass('current');
            } else if (num >= num2) {
                $('.tab-con li:eq(1)').addClass('current').siblings().removeClass('current');
            } else if (num >= num1) {
                $('.tab-con li:eq(0)').addClass('current').siblings().removeClass('current');
            }
        });
    }

    /**
     * 初始化Dialog事件
     */
    function initDialog() {
        $(window).click(function(event) {
            $('.color-info').removeClass('current');
        });

        $('.cha').click(function (event) {
            $('.dialog').hide();
            $('body').removeClass('current');
        });

        $('.btns').click(function (event) {
            $('.dialog').show();
            $('body').addClass('current');
        });

        $('.buy>a').click(function(){
            var arr = [];
            var total = parseFloat($('.amount i').html());
            $('li', '.style-info').each(function(){
                var item = {
                    num : $('.number-info input', this).val(),
                    product_id : $('.product-info', this).val(),
                    product_style_id : $('.color-info', this).attr('data-style-id'),
                    product_size_id : $('.chima-info', this).val(),
                    subtotal : parseFloat($('.money-info i', this).html())
                };
                arr.push(item);
            });
            console.log(total, arr);
        });
    }

    /**
     * 初始化活动页面数据
     */
    function init() {

        var activity_detail;

        $.get("/api", {
            model: 'activity',
            action: 'detail',
            id: 2595
        }, function (data) {
            if (data.status == 0) {
                activity_detail = data.return;
                console.log(activity_detail);
                var products = activity_detail.products;
                var products_len = 0;
                for (o in products) {
                    var str = '<option value="' + products[o].id + '">' + products[o].name + '</option>';
                    $('.style select').append(str);
                    products_len++;
                }

                if (products_len > 0) {
                    $('.style').show();
                } else {
                    $('.style').hide();
                }

                $('#changeProduct').change(function () {
                    var product_id = $(this).val();
                    loadProductInfo(product_id);
                }).change();

                $('.add').click(function () {
                    buildItem();
                }).click();
            }
        }, 'json');

        function buildItem() {
            var thumb_img = activity_detail.default_style.thumb_img_url;
            var number = 1;
            var list_products = activity_detail.products;
            var list_styles = activity_detail.styles[activity_detail.default_style.product_id];
            var list_size = activity_detail.sizes[activity_detail.default_style.product_id][activity_detail.default_style.product_style_id];
            var sell_price = activity_detail.default_style.sell_price;

            var str = '';
            str += "<li class='clearfix'>";
            str += '<img src="' + thumb_img + '" id="thumbImg">';
            str += '<div class="number-info">';
            str += '<span class="left">-</span>';
            str += '<input type="text" value="' + number + '">';
            str += '<span class="right">+</span>';
            str += '</div>';
            str += '<select class="product-info">';
            for (var o in list_products) {
                str += '<option value="' + list_products[o].id + '">' + list_products[o].name + '</option>';
            }
            str += '</select>';
            str += '<div class="color-info" data-style-id="'+activity_detail.default_style.product_style_id+'">';
            str += '<i class="bor10"></i>';
            str += '<span></span>';
            str += '<div class="palette">';
            for (var o in list_styles) {
                var style_id = list_styles[o].product_style_id;
                var style_color = list_styles[o].color;
                str += '<a href="#" data-product-id="'+activity_detail.default_style.product_id+'" data-style-id="' + style_id + '" style="background-color:#' + style_color + ';"></a>';
            }

            str += '</div>';
            str += '</div>';
            str += '<select  class="chima-info">';
            for (var o in list_size) {
                var size = list_size[o];
                str += '<option value="' + size.id + '">' + size.size + '</option>';
            }
            str += '</select>';
            str += '<div class="money-info">';
            str += '￥<i>' + sell_price + '</i>';
            str += '</div>';
            str += '</li>';
            var li = $(str);
            $('.style-info').append(li);

            calcBuyListTotalPrice();

            //bind event
            $('.number-info .left', li).click(function(event) {
                var lis_number = $('.number-info input', li).val();
                if(lis_number>1){
                    lis_number--;
                }else{
                    lis_number=1;
                }
                $('.number-info input', li).val(lis_number);
                $(this).siblings('input').val(lis_number);

                $('.money-info i', li).html((lis_number*sell_price).toFixed(2));

                calcBuyListTotalPrice();
            });

            $('.number-info .right', li).click(function(event) {
                var lis_number = $('.number-info input', li).val();
                lis_number++;
                $(this).siblings('input').val(lis_number);

                $('.money-info i', li).html((lis_number*sell_price).toFixed(2));

                calcBuyListTotalPrice();
            });

            $('.number-info input', li).keyup(function(){
                var lis_number = $(this).val();
                $('.money-info i', li).html((lis_number*sell_price).toFixed(2));

                calcBuyListTotalPrice();
            });

            $('.product-info', li).change(function(){
                var product_id = $(this).val();
                var list_styles = activity_detail.styles[product_id];
                var str = '';
                for (var o in list_styles) {
                    var style_id = list_styles[o].product_style_id;
                    var style_color = list_styles[o].color;
                    str += '<a href="#" data-product-id="'+product_id+'" data-style-id="' + style_id + '" style="background-color:#' + style_color + ';"></a>';
                }
                $('.palette', li).empty().append(str);

                bindColorPicketEvent(li);

                $('.palette a', li).eq(0).click();
            });

            $('.color-info', li).click(function(event) {
                $(this).toggleClass('current');
                event.stopPropagation();
            });

            bindColorPicketEvent(li);

            $('.palette', li).click(function(event) {
                event.stopPropagation();
            });
        }

        function bindColorPicketEvent(li){

            $('.palette a', li).click(function(event) {
                event.stopPropagation();
                var b = $(this).css('background-color');
                $(this).parents('.color-info').css('background-color', b);
                $('.color-info', li).removeClass('current');

                var product_id = $(this).attr('data-product-id');
                var style_id = $(this).attr('data-style-id');
                var list_size = activity_detail.sizes[product_id][style_id];

                $(this).parents('.color-info').attr('data-style-id', style_id);
                var str = '';
                for (var o in list_size) {
                    var size = list_size[o];
                    str += '<option value="' + size.id + '">' + size.size + '</option>';
                }
                $('.chima-info', li).empty().append(str);

                var style = activity_detail.styles[product_id]['style_'+style_id];
                var sell_price = parseFloat(style.sell_price);
                var lis_number = parseInt($('.number-info input', li).val());
                $('.money-info i', li).html((lis_number*sell_price).toFixed(2));

                calcBuyListTotalPrice();
            });

        }

        function calcBuyListTotalPrice(){
            var total = 0;
            $('.money-info i').each(function(){
                var subtotal = parseFloat($(this).html());
                total += subtotal;
            });
            $('.amount i').html(total.toFixed(2));
        }

        function loadProductInfo(product_id) {
            var sides = activity_detail.sides;
            var act_designs = activity_detail.act_designs;
            var product_designs = activity_detail.product_designs;
            var sell_price = activity_detail.default_style['sell_price'];

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
            $('.price-num').html(sell_price);

            //颜色的显示
            $('.color-lump').empty();
            $('.palette').empty();
            var styles = activity_detail.styles;
            for (var o in styles[product_id]) {
                var color_lump = styles[product_id][o].color;
                var liobj = $("<li><span></span></li>").css('background', "#" + color_lump);
                var paletteObj = $('<a href="#"></a>').css('background', "#" + color_lump);


                $('.color-lump').append(liobj);
                $('.palette').append(paletteObj);
            }

            $('.color-lump li span').click(function (event) {
                var current_color = $(this).parent().css('background-color');
                $(".big-img li").css('background-color', current_color);
                $(".small-img li").css('background-color', current_color);
            });

        }
    }

    init();

    initThumbnail();

    initProductDescriptionTab();

    initContextPosition();

    initDialog();

});
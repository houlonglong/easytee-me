$(function () {
    $('.tabs>.tab').click(function () {
        var idx = $(this).index();
        $('.tabs>.tab').removeClass('active');
        $(this).addClass('active');
        $('.tab-content').removeClass('active');
        $('.tab-content').eq(idx).addClass('active');
    });

    $('#upload_location_btn').click(function () {
        showImageUploadLayer();
    });

    $('#image_store_btn').click(function () {
        showImageStoreLayer();
    });

    $('.design-dropdown-btn').click(function (e) {
        e.stopPropagation();
        var menu = $(this).siblings('.design-dropdown-menu');
        $('.design-dropdown-menu').each(function (idx, obj) {
            if (obj != menu[0]) {
                $(obj).hide();
            }
        });
        menu.toggle();
    });

    $('.design-dropdown-menu').click(function (e) {
        e.stopPropagation();
    });

    $(window).click(function () {
        $('.design-dropdown-menu').hide();
    });

    function showImageLayer() {
        $('.tab-content-image-layout, .tab-content-image-layout-or').show();
        $('.upload-location').hide();
        $('.image-store').hide();
    }

    function showImageUploadLayer() {
        $('.tab-content-image-layout, .tab-content-image-layout-or').hide();
        $('.upload-location').show();
        $('.image-store').hide();
    }

    function showImageStoreLayer() {
        $('.tab-content-image-layout, .tab-content-image-layout-or').hide();
        $('.upload-location').hide();
        $('.image-store').show();
    }

    function setDsHeight() {
        var tools = $('.design-tools');
        var rTools = $('.design-right-tools');
        var design = $('.design-center');
        if (tools.outerHeight() > rTools.outerHeight()) {
            design.height(tools.outerHeight() + parseInt(tools.css('marginTop')) + 20);
        } else {
            design.height(rTools.outerHeight() + parseInt(rTools.css('marginTop')) + 20);
        }
    }

    function initFontFamilies() {
        var path = '/designer/fonts';
        var fontType = 'popular';
        var fonts = [
            'helvetica',
            'altehaasgrotesk',
            'bebas',
            'college',
            'creampuff',
            'distantgalaxy',
            'goudybookletter',
            'lindenhill',
            'lobster',
            'museoslab',
            'permanentmarker',
            'russian',
            'wasabi'
        ];
        for (var o in fonts) {
            var image = path + '/' + fontType + '/' + fonts[o] + '.png';
            var woff = path + '/' + fontType + '/' + fonts[o] + '.woff';
            if (o == 0) {
                $('img', '.design-dropdown-fontfamily').attr('src', image);
            }
            var item = $('<a class="font-families-item">').css('backgroundImage', 'url(' + image + ')').attr('data-image', image).attr('data-woff', woff);
            $('.font-families').append(item);
        }
        $('.font-families-item').click(function () {
            var image = $(this).attr('data-image');
            $('img', '.design-dropdown-fontfamily').attr('src', image);
            $(this).parents('.design-dropdown').find('.design-dropdown-menu').hide();
        });
    }

    function initColorPicker() {
        var colors = [
            '黑色,#000000',
            '白色,#FFFFFF',
            '浅粉色,#DEB7CA',
            '栗色,#582D40',
            '红色,#B7312C',
            '橙色,#DD4814',
            '雏菊色,#FCD450',
            '爱尔兰绿,#00985F',
            '森林绿,#203731',
            '藏青色,#21314D',
            '宝蓝色,#1D4F91',
            '卡罗莱纳蓝,#6F9AD3',
            '浅蓝色,#A4B3C9',
            '深巧克力色,#443135',
            '沙色,#CAC0B6',
            'RS运动灰色,#88898B',
            '炭色,#4E4F53',
            '杜鹃花色,#EB67B9',
            '海利康花色,#E21776',
            '金色,#FFB612',
            '浅绿色,#76D750',
            '军绿色,#6D6F64',
            '麻灰爱尔兰绿,#00966C',
            '宝石蓝,#0073B0',
            '紫色,#412D5D',
            '麻灰紫,#614D7D',
            '栗黄色,#866761',
            '深麻灰色,#404545',
            '深麻灰,#666766',
            '浅麻灰,#DCD7D4',
            '荧光黄色,#C4D52A',
            '荧光绿色,#98D55C',
            '麻灰色,#8C8985',
            '紫红色,#672E45',
            '深黄色,#F6D400'
        ];
        for (var o in colors) {
            var name = colors[o].split(',')[0];
            var value = colors[o].split(',')[1];
            var item = $('<a class="color-picket-item" title="' + name + '"><span style="background: ' + value + ';"></span></a>');
            $('.color-picket-list').append(item);
        }
        $('.color-picket-item').click(function () {
            var bgColor = $('span', this).css('backgroundColor');
            $(this).parents('.design-dropdown').find('.design-dropdown-color>span').css('backgroundColor', bgColor);
            $(this).parents('.design-dropdown').find('.design-dropdown-menu').hide();
        });
    }

    $('#product_color_picket').find('.color-item').click(function(){
        $('.color-item').removeClass('active');
        $(this).addClass('active');
    });

    $('.more-color', '.product-color-picket').hover(function () {
        $(this).parents('.product-color-picket').find('.color-column').not('.quick-colors').show();
        var len = $(this).parents('.product-color-picket').find('.color-column').length;
        $(this).parents('.product-color-picket').width(len * 28);
    });

    $('.product-color-picket').mouseleave(function () {
        $(this).find('.color-column').not('.quick-colors').hide();
        $(this).width('auto');
    });

    function designToolsAppendToText(){
        $('#design_selected_tools').appendTo('.tab-content:eq(0)');
    }

    function designToolsAppendToImage(){
        $('#design_selected_tools').appendTo('.tab-content:eq(1)');
    }

    function enableDesignTools(){
        $('#design_selected_tools').show();
    }

    function disableDesignTools(){
        $('#design_selected_tools').hide();
    }

    designToolsAppendToText();
    enableDesignTools();

    //初始化设计工具数据
    initFontFamilies();
    initColorPicker();

    //初始化设计页高度
    setDsHeight();

    var ds;
    //模拟Ajax数据
    var categories = {
        1: {
            id: '1',
            name: '基础－T恤款',
            products: [
                {
                    id: '11',
                    name: '基础圆领T恤基础圆领T恤1',
                    sides: [{
                        id: 'front',
                        image: '/js/app/design/common/data/front1.png',
                        scale: 7.47,
                        printable: {
                            x: 149,
                            y: 100,
                            width: 150,
                            height: 200
                        }
                    },{
                        id: 'back',
                        image: '/js/app/design/common/data/back1.png',
                        scale: 7.47,
                        printable: {
                            x: 149,
                            y: 100,
                            width: 190,
                            height: 340
                        }
                    }]
                },
                {
                    id: '12',
                    name: '基础圆领T恤基础圆领T恤2',
                    sides: [{
                        id: 'front',
                        image: '/js/app/design/common/data/product_type_2_front.png',
                        scale: 7.47,
                        printable: {
                            x: 149,
                            y: 100,
                            width: 150,
                            height: 200
                        }
                    },{
                        id: 'back',
                        image: '/js/app/design/common/data/product_type_2_back.png',
                        scale: 7.47,
                        printable: {
                            x: 149,
                            y: 100,
                            width: 190,
                            height: 340
                        }
                    }]
                }
            ]
        },
        2: {
            id: '2',
            name: '基础－T恤款',
            products: [
                {
                    id: '21',
                    name: '2基础圆领T恤基础圆领T恤1',
                    sides: [{
                        id: 'front',
                        image: '/js/app/design/common/data/front1.png',
                        scale: 7.47,
                        printable: {
                            x: 149,
                            y: 100,
                            width: 150,
                            height: 200
                        }
                    },{
                        id: 'back',
                        image: '/js/app/design/common/data/back1.png',
                        scale: 7.47,
                        printable: {
                            x: 149,
                            y: 100,
                            width: 190,
                            height: 340
                        }
                    }]
                },
                {
                    id: '22',
                    name: '2基础圆领T恤基础圆领T恤2',
                    sides: [{
                        id: 'front',
                        image: '/js/app/design/common/data/product_type_2_front.png',
                        scale: 7.47,
                        printable: {
                            x: 149,
                            y: 100,
                            width: 150,
                            height: 200
                        }
                    },{
                        id: 'back',
                        image: '/js/app/design/common/data/product_type_2_back.png',
                        scale: 7.47,
                        printable: {
                            x: 149,
                            y: 100,
                            width: 190,
                            height: 340
                        }
                    }]
                }
            ]
        }
    };

    /*
     * 加载产品类型
     */
    function initProductCategories(list){
        var str = '';
        for(var o in list){
            var item = list[o];
            str += '<option value="'+item.id+'">'+item.name+'</option>';
        }
        $('#selectProductCategories').append(str);
        $('#selectProductCategories').change(function(){
            var categoryId = $(this).val();
            var products = categories[categoryId].products;
            initProductChoice(categoryId, products);
        });
        $('#selectProductCategories').change();
    }

    /*
     * 加载产品列表
     * 详情link
     * 选择产品事件
     */
    function initProductChoice(categoryId, list){
        var str = '';
        for(var o in list){
            var item = list[o];
            str += '<li class="product-item" data-id="'+item.id+'" tips="'+item.name+'">';
            str += '    <img src="'+item.sides[0].image+'"/>';
            str += '    <div>';
            str += '        <span class="name">'+item.name+'</span>';
            str += '        <span class="desc">成本优选</span>';
            str += '        <a href="#'+item.id+'" class="info">详情</a>';
            str += '    </div>';
            str += '</li>';
        }
        $('.product-list').empty().append(str);
        $('.product-item').click(function () {
            $('.product-item').removeClass('active');
            $(this).addClass('active');
            $('#product_color_picket').appendTo(this);

            var productId = $(this).attr('data-id');
            var products = categories[categoryId].products;
            var product;
            for(var o in products) {
                var _product = products[o];
                if(_product.id == productId){
                    product = _product;
                    break;
                }
            }

            if(!ds){
                /*
                 * 初始化DS
                 */
                ds = new Ds('#ds', product.sides);
            }else{
                ds.load(product);
            }
        });
        $('.product-item').eq(0).click();
    }

    //初始化产品类型
    initProductCategories(categories);

    /*
     * 上传图片
     */

    /*
     * 加载素材库图片
     */



    /*
     * 加载产品颜色列表
     * 选择产品颜色事件
     */

    /*
     * 添加文本事件
     */
    $('#addTextInput')[0].oninput=function(){
        var val = $(this).val();
        ds.call('text', val);
    };

    /*
     * 读取文本API
     */

    /*
     * 选择字体事件
     */

    /*
     * 读取字体API
     */

    /*
     * 选择字体颜色事件
     */

    /*
     * 读取字体颜色API
     */

    /*
     * 选择描边事件
     */

    /*
     * 读取描边API
     */

    /*
     * 选择描边颜色事件
     */

    /*
     * 读取描边颜色API
     */

    /*
     * 复制事件
     */

    /*
     * 垂直居中事件
     */

    /*
     * 移动到底层事件
     */

    /*
     * 水平翻转事件
     */

    /*
     * 垂直翻转事件
     */

    /*
     * 切换正面、反面、左袖、右袖事件
     */

});
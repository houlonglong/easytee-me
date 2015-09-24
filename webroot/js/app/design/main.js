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

    $('.product-item').click(function () {
        $('.product-item').removeClass('active');
        $(this).addClass('active');
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
        var choice = $('.product-choices');
        var design = $('.design-center');
        if (tools.outerHeight() > choice.outerHeight()) {
            design.height(tools.outerHeight() + parseInt(tools.css('marginTop')) + 20);
        } else {
            design.height(choice.outerHeight() + parseInt(choice.css('marginTop')) + 20);
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

    function initProductCategories() {
        var categories = [
            {
                id: 1,
                name: '款式类型1'
            },
            {
                id: 2,
                name: '款式类型2'
            },
            {
                id: 3,
                name: '款式类型3'
            }
        ];
        for (var o in categories) {
            var c = categories[o];

        }
        initProducts();
    }

    function initProducts(products) {

    }

    $('.more-color', '.product-color-picket').hover(function () {
        $(this).parents('.product-color-picket').find('.color-column').not('.quick-colors').show();
        var len = $(this).parents('.product-color-picket').find('.color-column').length;
        $(this).parents('.product-color-picket').width(len * 28);
    });
    $('.product-color-picket').mouseleave(function () {
        $(this).find('.color-column').not('.quick-colors').hide();
        $(this).width('auto');
    });

    //初始化设计工具数据
    initFontFamilies();
    initColorPicker();

    //初始化产品类型
    initProductCategories();
    //初始化设计页高度
    setDsHeight();
});
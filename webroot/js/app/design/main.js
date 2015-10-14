//Router
(function () {
    function _Router() {
    }

    _Router.prototype.setup = function (routemap) {
        var that = this;
        this.routemap = [];
        for (var rule in routemap) {
            if (!routemap.hasOwnProperty(rule)) continue;
            that.routemap.push({
                rule: new RegExp(rule, 'i'),
                func: routemap[rule]
            });
        }
    };
    _Router.prototype.start = function () {
        var hash = location.hash, route, matchResult;
        for (var routeIndex in this.routemap) {
            route = this.routemap[routeIndex];
            matchResult = hash.match(route.rule);
            if (matchResult) {
                route.func.apply(window, matchResult.slice(1));
                return;
            }
        }
    };
    window.Router = new _Router();
})();

//InitialFont
(function () {
    window.ET_DS_ALL_FONTS = {
        path: '/designer/fonts',
        types: ['popular'],
        popular: [
            'helvetica',
            'russian',
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
            'wasabi'
        ],
        list: {}
    };

    function createFont(type) {
        for (var o in ET_DS_ALL_FONTS[type]) {
            var name = ET_DS_ALL_FONTS[type][o];
            ET_DS_ALL_FONTS.list[name] = {
                type: type,
                name: name,
                image: ET_DS_ALL_FONTS.path + '/' + type + '/' + name + '.png'
            };
        }
    }

    for (var o in ET_DS_ALL_FONTS.types) {
        createFont(ET_DS_ALL_FONTS.types[o]);
    }
})();

//DsEventManager
(function () {

    /**
     * EventManager
     * @constructor
     */
    function EventManager() {
        this.element = $(window);
        this.trigger = function () {
            var params = [];
            for (var o in arguments) {
                if (o != 0) {
                    params.push(arguments[o]);
                }
            }
            this.element.trigger(arguments[0], params);
        };
        this.on = function (name, func) {
            var c = function () {
                var params = [];
                for (var o in arguments) {
                    if (o != 0) {
                        params.push(arguments[o]);
                    }
                }
                func.apply(this, params);
            };
            this.element.on(name, c);
            return function () {
                eventManager.element.off(name, c);
            };
        };
    };
    window.dsManager = new EventManager;
})();

$(function () {

    //--------------------router-------------------------------------------------

    var defaultStep = 0;

    function initRouter() {

        Router.setup({
            '#design': function () {
                defaultStep = 0;
                $('.step').eq(defaultStep).addClass('active');
            },
            '#pricing': function () {
                defaultStep = 1;
                $('.step').eq(defaultStep).addClass('active');
            },
            '#push': function () {
                defaultStep = 2;
                $('.step').eq(defaultStep).addClass('active');
            }
        });
        Router.start();

        $.slider({
            defaultStep: defaultStep,
            sliderAnimate: 600,
            sliderButton: 'a.step',
            sliderSelection: '.design-slider',
            sliderContainer: '.design-center',
            onclick: function (step) {
                $('a.step').removeClass('active');
                $('a.step').eq(step).addClass('active');
                if (step == 0) {
                    clearPricingDesignArea();
                }
                if (step == 1) {
                    cloneDesignArea();
                }
            }
        });

        function clearPricingDesignArea() {
            $('#ds_preview').empty();
        }

        function cloneDesignArea() {
            var clone_sides = $($('#ds').html());
            clone_sides.find('.html-surface').remove();
            $('#ds_preview').empty().append(clone_sides);

            var idx = $('.ds-pricing-products-side.active').index();
            showDsPricingProductSide(idx);
        }
    }

    initRouter();

    //----------------design-------------------------------------------------

    var ds;

    var ds_color_count = 0;

    var ds_cat_id;

    var ds_product_id;

    var ds_product_style_id;

    function colorUnique(arr){
        var n={}, r=[];
        for(var i = 0; i < arr.length; i++) {
            if (!n[arr[i]]) {
                n[arr[i].toLowerCase()] = true;
                r.push(arr[i]);
            }
        }
        return r;
    }

    function setCookie(name, value){
        $.cookie(name, value, {path: "/"});
    }

    function getCookie(name){
        return $.cookie(name);
    }

    function showTextLayer() {
        $('.tab:eq(0)').addClass('active');
        $('.tab:eq(1)').removeClass('active');
        $('.tab-content:eq(0)').addClass('active');
        $('.tab-content:eq(1)').removeClass('active');
    };

    function showImageLayer() {
        $('.tab:eq(0)').removeClass('active');
        $('.tab:eq(1)').addClass('active');
        $('.tab-content:eq(0)').removeClass('active');
        $('.tab-content:eq(1)').addClass('active');
    }

    function restoreTextLayer() {
        $('#addTextInput').val('');
    }

    function restoreImageLayer() {
        $('.tab-content-image-layout, .tab-content-image-layout-or').show();
        $('.image-editor').hide();
        $('.upload-location').hide();
        $('.image-store').hide();
    }

    function showImageUploadLayer() {
        $('.tab-content-image-layout, .tab-content-image-layout-or').hide();
        $('.image-editor').hide();
        $('.upload-location').show();
        $('.image-store').hide();
    }

    function showImageStoreLayer() {
        $('.tab-content-image-layout, .tab-content-image-layout-or').hide();
        $('.image-editor').hide();
        $('.upload-location').hide();
        $('.image-store').show();
    }

    function showImageEditorLayer() {
        $('.tab-content-image-layout, .tab-content-image-layout-or').hide();
        $('.image-editor').show();
        $('.upload-location').hide();
        $('.image-store').hide();
    }

    var CACHE = {};
    function initCache(productInfo){
        CACHE = productInfo;
    }

    var PRODUCTS_CACHE = {};

    function initProductCache(products) {
        for (var catId in products) {
            var productsOfCat = products[catId];
            for (var productId in productsOfCat) {
                var product = productsOfCat[productId];
                product.product_id = productId;//补充ID
                PRODUCTS_CACHE[productId] = product;
            }
        }
    }

    function getProductById(productId) {
        return PRODUCTS_CACHE[productId];
    }

    var PRODUCTS_STYLE_CACHE = {};
    function initProductStylesCache(styles) {
        PRODUCTS_STYLE_CACHE = styles;
        for(var productId in PRODUCTS_STYLE_CACHE){
            for(var styleId in PRODUCTS_STYLE_CACHE[productId]){
                PRODUCTS_STYLE_CACHE[productId][styleId]['id']=styleId;
            }
        }
    }

    function getStylesByProductId(productId) {
        return PRODUCTS_STYLE_CACHE[productId];
    }

    function getStyleByProductIdAndStyleId(productId, styleId) {
        return PRODUCTS_STYLE_CACHE[productId][styleId];
    }


    /**
     * 初始化设计工具设置面板数据及事件
     */
    function initDsLeftPanel() {
        /**
         * 初始化Tabs及事件
         */
        function initTabs() {
            $('.tabs>.tab').click(function () {
                var idx = $(this).index();
                $('.tabs>.tab').removeClass('active');
                $(this).addClass('active');
                if (idx == 0) {
                    showTextLayer();
                } else {
                    showImageLayer();
                }
            });
        }

        /**
         * 初始化展示本地上传及事件
         */
        function initShowLocationUploadLayer() {
            $('#upload_location_btn').click(function () {
                showImageUploadLayer();
            });
        }

        /**
         * 初始化展示图片商店及事件
         */
        function initShowImageStoreLayer() {
            $('#image_store_btn').click(function () {
                showImageStoreLayer();
            });
        }

        /**
         * 初始化下拉菜单及事件
         */
        function initDropdownMenu() {
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
        }

        /**
         * 初始化添加文本事件
         */
        function initTextInput() {
            $('#addTextInput')[0].oninput = function () {
                var val = $(this).val();
                ds.call('text', val);
            };
        }

        /**
         * 初始化字体列表及事件
         */
        function initFontFamilies() {
            var defaultFontType = 'popular';
            for (var o in ET_DS_ALL_FONTS[defaultFontType]) {
                var name = ET_DS_ALL_FONTS[defaultFontType][o];
                var image = ET_DS_ALL_FONTS.list[name].image;
                if (o == 0) {
                    $('img', '.design-dropdown-fontfamily').attr('src', image);
                }
                var item = $('<a class="font-families-item">').css('backgroundImage', 'url(' + image + ')').attr('data-font', name).attr('data-image', image);
                $('.font-families').append(item);
            }

            /*
             * 选择字体事件
             */
            $('.font-families-item').click(function () {
                var image = $(this).attr('data-image');
                var name = $(this).attr('data-font');
                $('img', '.design-dropdown-fontfamily').attr('src', image);
                $(this).parents('.design-dropdown').find('.design-dropdown-menu').hide();

                ds.call('textFontFamily', name);
            });
        }

        /**
         * 选择字体颜色事件
         */
        function initTextFill() {
            var colors = [
                '黑色,000000',
                '白色,FFFFFF',
                '浅粉色,DEB7CA',
                '栗色,582D40',
                '红色,B7312C',
                '橙色,DD4814',
                '雏菊色,FCD450',
                '爱尔兰绿,00985F',
                '森林绿,203731',
                '藏青色,21314D',
                '宝蓝色,1D4F91',
                '卡罗莱纳蓝,6F9AD3',
                '浅蓝色,A4B3C9',
                '深巧克力色,443135',
                '沙色,CAC0B6',
                'RS运动灰色,88898B',
                '炭色,4E4F53',
                '杜鹃花色,EB67B9',
                '海利康花色,E21776',
                '金色,FFB612',
                '浅绿色,76D750',
                '军绿色,6D6F64',
                '麻灰爱尔兰绿,00966C',
                '宝石蓝,0073B0',
                '紫色,412D5D',
                '麻灰紫,614D7D',
                '栗黄色,866761',
                '深麻灰色,404545',
                '深麻灰,666766',
                '浅麻灰,DCD7D4',
                '荧光黄色,C4D52A',
                '荧光绿色,98D55C',
                '麻灰色,8C8985',
                '紫红色,672E45',
                '深黄色,F6D400'
            ];
            for (var o in colors) {
                var name = colors[o].split(',')[0];
                var value = colors[o].split(',')[1];
                var item = $('<a class="color-picket-item" title="' + name + '"><span style="background: #' + value + ';"></span></a>').attr('data-color', value);
                $('#textFillColorPicket').append(item);
            }
            $('.color-picket-item', '#textFillColorPicket').click(function () {
                var dataColor = $(this).attr('data-color');
                $(this).parents('.design-dropdown').find('.design-dropdown-color>span').css('backgroundColor', '#' + dataColor);
                $(this).parents('.design-dropdown').find('.design-dropdown-menu').hide();

                ds.call('textFill', dataColor);
            });
        }

        /**
         * 选择描边事件
         */
        function initTextStrokeWidth() {
            $('#changeTextOutline').change(function () {
                var val = $(this).val();
                ds.call('textStrokeWidth', val);
            });
        }

        /**
         * 选择描边颜色事件
         */
        function initTextStrokeFill() {
            var colors = [
                '黑色,000000',
                '白色,FFFFFF',
                '浅粉色,DEB7CA',
                '栗色,582D40',
                '红色,B7312C',
                '橙色,DD4814',
                '雏菊色,FCD450',
                '爱尔兰绿,00985F',
                '森林绿,203731',
                '藏青色,21314D',
                '宝蓝色,1D4F91',
                '卡罗莱纳蓝,6F9AD3',
                '浅蓝色,A4B3C9',
                '深巧克力色,443135',
                '沙色,CAC0B6',
                'RS运动灰色,88898B',
                '炭色,4E4F53',
                '杜鹃花色,EB67B9',
                '海利康花色,E21776',
                '金色,FFB612',
                '浅绿色,76D750',
                '军绿色,6D6F64',
                '麻灰爱尔兰绿,00966C',
                '宝石蓝,0073B0',
                '紫色,412D5D',
                '麻灰紫,614D7D',
                '栗黄色,866761',
                '深麻灰色,404545',
                '深麻灰,666766',
                '浅麻灰,DCD7D4',
                '荧光黄色,C4D52A',
                '荧光绿色,98D55C',
                '麻灰色,8C8985',
                '紫红色,672E45',
                '深黄色,F6D400'
            ];
            for (var o in colors) {
                var name = colors[o].split(',')[0];
                var value = colors[o].split(',')[1];
                var item = $('<a class="color-picket-item" title="' + name + '"><span style="background: #' + value + ';"></span></a>').attr('data-color', value);
                $('#textStrokeColorPicket').append(item);
            }
            $('.color-picket-item', '#textStrokeColorPicket').click(function () {
                var dataColor = $(this).attr('data-color');
                $(this).parents('.design-dropdown').find('.design-dropdown-color>span').css('backgroundColor', '#' + dataColor);
                $(this).parents('.design-dropdown').find('.design-dropdown-menu').hide();

                ds.call('textStroke', dataColor);
            });
        }

        /**
         * 上传图片
         */
        function initUploadImage() {
            $('#upload_location_input').fileUploader({
                callback: function (file, dataUrl) {
                    ds.call('imageBase64', dataUrl);
                }
            });
        }

        /**
         * 加载素材库图片
         */
        function initArtModules() {
            $.get('/api', {
                "model": "design/tool/beta",
                "action": "get_templates",
                "json": 1
            }, function (data) {
                if (data.status == 0) {
                    var returnData = data.return;
                    var templates = returnData.templates;
                    var htmlStr = '';
                    for (var i = 0; i < templates.length; i++) {
                        var item = templates[i];
                        htmlStr += '<div class="image-list-item">';
                        htmlStr += '<a href="javascript:;" class="img-wrap">';
                        htmlStr += '<img src="' + item.img_url + '" alt="' + item.name + '">';
                        htmlStr += '</a>';
                        if (item.price == 0) {
                            htmlStr += '<span>免费</span>';
                        } else {
                            htmlStr += '<span>' + parseFloat(item.price).toFixed(2) + '元/件</span>';
                        }
                        htmlStr += '</div>';
                    }
                    $('#image_store_list').empty().append(htmlStr);
                } else {
                    console.log(data.message);
                }
            }, 'json');
        }

        /**
         * 自动居中
         */
        function initAutoAlign() {
            $('#snapCenter').click(function () {
                var status = $(this).prop('checked');
                ds.autoAlign(status);
            });
        }

        /**
         * 复制事件
         */
        function initDuplicate() {
            $('#duplicateBtn').click(function () {
                ds.call('duplicate');
            });
        }

        /**
         * 垂直居中事件
         */
        function initAlignToCenter() {
            $('#alignToCenterBtn').click(function () {
                ds.call('alignToCenter');
            });
        }

        /**
         * 移动到底层事件
         */
        function initMoveToBottom() {
            $('#moveToBottomBtn').click(function () {
                ds.call('moveToBottom');
            });
        }

        /**
         * 水平翻转事件
         */
        function initHorizontal() {
            $('#horizontalBtn').click(function () {
                ds.call('onFlipX');
            });
        }

        /**
         * 垂直翻转事件
         */
        function initVertical() {
            $('#verticalBtn').click(function () {
                ds.call('onFlipY');
            });
        }

        /**
         * 初始化设计工具容器高度
         */
        function initDsHeight() {
            var tools = $('.design-tools');
            var rTools = $('.design-right-tools');
            var design = $('.design-center');
            if (tools.outerHeight() > rTools.outerHeight()) {
                design.height(tools.outerHeight() + parseInt(tools.css('marginTop')) + 20);
            } else {
                design.height(rTools.outerHeight() + parseInt(rTools.css('marginTop')) + 20);
            }
        }

        initTabs();
        initShowLocationUploadLayer();
        initShowImageStoreLayer();
        initDropdownMenu();

        initTextInput();
        initFontFamilies();
        initTextFill();
        initTextStrokeWidth();
        initTextStrokeFill();

        initUploadImage();
        initArtModules();

        initAutoAlign();
        initDuplicate();
        initAlignToCenter();
        initMoveToBottom();
        initHorizontal();
        initVertical();

        initDsHeight();
    }

    /**
     * 初始化设计工具产品选择面板数据及事件
     */
    function initDsRightPanel() {

        /**
         * 请求初始化数据
         */
        var designInfo = {};//session中保存的
        var productInfo = {};
        $.get('/api', {
            "model": "design/tool/beta",
            "action": "design_init",
            "json": 1
        }, function (data) {
            if (data.status == 0) {
                var returnData = data.return;
                designInfo = returnData.design_info;//编辑用的
                productInfo = returnData.product_info;
                console.log(returnData);
                initCache(productInfo);
                initProductCache(productInfo.products);
                initProductStylesCache(productInfo.styles);
                initProductCategories();
                initPricingData();
            } else {
                console.log(data.message);
            }
        }, 'json');

        /*
         * 加载产品类型以及事件
         */
        function initProductCategories() {
            var str = '';
            for (var o in productInfo.cats) {
                var item = productInfo.cats[o];
                str += '<option value="' + o + '">' + item.cat_name + '</option>';
            }
            $('#selectProductCategories').append(str);
            $('#selectProductCategories').change(function () {
                var categoryId = $(this).val();
                ds_cat_id = categoryId;
                setCookie('ds_cat_id', ds_cat_id);
                var products = productInfo.products[categoryId];
                initProductChoice(products);
            });
            if(getCookie('ds_cat_id').length != 0){
                $('#selectProductCategories').val(getCookie('ds_cat_id'));
            }
            $('#selectProductCategories').change();
        }

        /*
         * 加载产品列表以及事件
         */
        function initProductChoice(products) {
            var str = '';
            for (var productId in products) {
                var product = products[productId];
                str += '<li class="product-item" data-id="' + productId + '" title="' + product.product_name + '">';
                str += '    <img src="' + product.product_design[0].img_url + '"/>';
                str += '    <div>';
                str += '        <span class="name">' + product.product_name + '</span>';
                str += '        <span class="desc">成本优选</span>';
                str += '        <a href="#' + productId + '" class="info">详情</a>';
                str += '    </div>';
                str += initProductStyles(productId);
                str += '</li>';
            }
            $('.product-list').empty().append(str);
            $('.product-item').click(function () {
                $('.product-item').removeClass('active');
                $(this).addClass('active');

                var productId = $(this).attr('data-id');
                ds_product_id = productId;//赋值全局变量
                setCookie('ds_product_id', ds_product_id);
                var product_design = products[productId].product_design;
                //拼装DS需要的初始化数据
                var sides = [];
                for (var o in product_design) {
                    var item = product_design[o];
                    sides.push({
                        width: 500,
                        height: 500,
                        id: item.side,
                        image: item.img_url,
                        scale: 7.47,
                        printable: {
                            x: parseFloat(item.x) / 2,
                            y: parseFloat(item.y) / 2,
                            width: parseFloat(item.w) / 2,
                            height: parseFloat(item.h) / 2
                        }
                    });
                }
                if (!ds && sides.length != 0) {
                    ds = new Ds('#ds', sides);
                    var zoomInL = '/js/app/design/vendor/etds/svg/zoom_in_light.svg';
                    var zoomOutL = '/js/app/design/vendor/etds/svg/zoom_out_light.svg';
                    var zoomIn = '/js/app/design/vendor/etds/svg/zoom_in.svg';
                    var zoomOut = '/js/app/design/vendor/etds/svg/zoom_out.svg';
                    ds.setSvgIcon(zoomInL, zoomOutL, zoomIn, zoomOut);
                    if(designInfo){
                        var canvases = ds.getCanvases();
                        var side_front_elems = $.parseJSON(designInfo.design_front);
                        var side_back_elems = $.parseJSON(designInfo.design_back);
                        var side_left_elems = $.parseJSON(designInfo.design_third);
                        var side_right_elems = $.parseJSON(designInfo.design_fourth);
                        if(side_front_elems.length != 0){
                            for(var o in side_front_elems){
                                var elem = side_front_elems[o];
                                if(elem.type == 'text'){
                                    canvases[0].loadText(elem.string, elem.lineHeight, elem.fontFamily, elem.fontSize, elem.fill, elem.stroke, elem.strokeWidth, elem.translateX, elem.translateY, elem.angle, elem.scaleX, elem.scaleY, elem.flipX, elem.flipY);
                                }
                                if(elem.type == 'bitmap'){
                                    canvases[0].imageBase64(elem.dataUrl, elem.translateX, elem.translateY, elem.angle, elem.scaleX, elem.scaleY, elem.flipX, elem.flipY);
                                }
                            }
                        }
                        if(side_back_elems.length != 0){
                            ds.active('back');
                            for(var o in side_back_elems){
                                var elem = side_back_elems[o];
                                if(elem.type == 'text'){
                                    canvases[1].loadText(elem.string, elem.lineHeight, elem.fontFamily, elem.fontSize, elem.fill, elem.stroke, elem.strokeWidth, elem.translateX, elem.translateY, elem.angle, elem.scaleX, elem.scaleY, elem.flipX, elem.flipY);
                                }
                                if(elem.type == 'bitmap'){
                                    canvases[1].imageBase64(elem.dataUrl, elem.translateX, elem.translateY, elem.angle, elem.scaleX, elem.scaleY, elem.flipX, elem.flipY);
                                }
                            }
                        }
                        if(side_left_elems.length != 0){
                            ds.active('third');
                            for(var o in side_left_elems){
                                var elem = side_left_elems[o];
                                if(elem.type == 'text'){
                                    canvases[2].loadText(elem.string, elem.lineHeight, elem.fontFamily, elem.fontSize, elem.fill, elem.stroke, elem.strokeWidth, elem.translateX, elem.translateY, elem.angle, elem.scaleX, elem.scaleY, elem.flipX, elem.flipY);
                                }
                                if(elem.type == 'bitmap'){
                                    canvases[2].imageBase64(elem.dataUrl, elem.translateX, elem.translateY, elem.angle, elem.scaleX, elem.scaleY, elem.flipX, elem.flipY);
                                }
                            }
                        }
                        if(side_right_elems.length != 0){
                            ds.active('fourth');
                            for(var o in side_right_elems){
                                var elem = side_right_elems[o];
                                if(elem.type == 'text'){
                                    canvases[3].loadText(elem.string, elem.lineHeight, elem.fontFamily, elem.fontSize, elem.fill, elem.stroke, elem.strokeWidth, elem.translateX, elem.translateY, elem.angle, elem.scaleX, elem.scaleY, elem.flipX, elem.flipY);
                                }
                                if(elem.type == 'bitmap'){
                                    canvases[3].imageBase64(elem.dataUrl, elem.translateX, elem.translateY, elem.angle, elem.scaleX, elem.scaleY, elem.flipX, elem.flipY);
                                }
                            }
                        }
                        var side = getCookie('ds_active_side');
                        switch (side){
                            case 'front':
                                $('.product-side:eq(0)').click();
                                break;
                            case 'back':
                                $('.product-side:eq(1)').click();
                                break;
                            case 'third':
                                $('.product-side:eq(2)').click();
                                break;
                            case 'fourth':
                                $('.product-side:eq(3)').click();
                                break;
                            default:
                                $('.product-side:eq(0)').click();
                        }
                    }
                } else {
                    ds.load(sides);
                }

                if(getCookie('ds_product_style_id').length != 0){
                    var styleId = getCookie('ds_product_style_id');
                    var style = getStyleByProductIdAndStyleId(productId, styleId);
                    if(style){
                        $('.color-item', this).removeClass('active');
                        $('.color-item[data-id=' + style.id + ']', this).addClass('active');
                        ds.call('productColor', '#' + style.color);
                        dsManager.trigger('dsProductAdded', getProductById(productId), style);
                    }else{
                        var styles = productInfo.styles[productId];
                        var style;
                        for (var o in styles) {
                            if (styles[o].is_default == 1) {
                                style = styles[o];
                                style.id = o;
                                break;
                            }
                        }
                        if (style) {
                            ds_product_style_id = style.id;//复制全局变量
                            setCookie('ds_product_style_id', ds_product_style_id);
                            $('.color-item', this).removeClass('active');
                            $('.color-item[data-id=' + style.id + ']', this).addClass('active');
                            ds.call('productColor', '#' + style.color);
                            dsManager.trigger('dsProductAdded', getProductById(productId), style);
                        }
                    }
                }else{
                    var styles = productInfo.styles[productId];
                    var style;
                    for (var o in styles) {
                        if (styles[o].is_default == 1) {
                            style = styles[o];
                            style.id = o;
                            break;
                        }
                    }
                    if (style) {
                        ds_product_style_id = style.id;//复制全局变量
                        setCookie('ds_product_style_id', ds_product_style_id);
                        $('.color-item', this).removeClass('active');
                        $('.color-item[data-id=' + style.id + ']', this).addClass('active');
                        ds.call('productColor', '#' + style.color);
                        dsManager.trigger('dsProductAdded', getProductById(productId), style);
                    }
                }

            });

            if(getCookie('ds_product_id').length != 0){
                if($('.product-item[data-id='+getCookie('ds_product_id')+']').length != 0){
                    $('.product-item[data-id='+getCookie('ds_product_id')+']').click();
                }else{
                    $('.product-item').eq(0).click();
                }
            }else{
                $('.product-item').eq(0).click();
            }

            $('.product-color-picket .color-item').hover(function (e) {
                var styleColor = $(this).attr('data-color');
                ds.call('productColor', styleColor);
            }, function () {
                var styleColor = $(this).parents('.product-color-picket').find('.color-item.active').attr('data-color');
                ds.call('productColor', styleColor);
            });

            $('.product-color-picket .color-item').click(function (e) {
                e.stopPropagation();
                $('.color-item').removeClass('active');
                $(this).addClass('active');
                var productId = $(this).attr('data-product-id');
                var styleId = $(this).attr('data-id');
                ds_product_style_id = styleId;//复制全局变量
                setCookie('ds_product_style_id', ds_product_style_id);
                var styleColor = $(this).attr('data-color');
                ds.call('productColor', styleColor);
                dsManager.trigger('dsProductPropertyChanged', getProductById(productId), getStyleByProductIdAndStyleId(productId, styleId));
            });

            $('.product-color-picket .more-color').hover(function () {
                $(this).parents('.product-color-picket').find('.color-column').not('.quick-colors').show();
                var len = $(this).parents('.product-color-picket').find('.color-column').length;
                $(this).parents('.product-color-picket').width(len * 28);
            });

            $('.product-color-picket').mouseleave(function () {
                $(this).find('.color-column').not('.quick-colors').hide();
                $(this).width('auto');
            });

            $('.product-color-picket').click(function (e) {
                e.stopPropagation();
            });
        }

        function initProductStyles(productId) {
            var styles = productInfo.styles[productId];
            var htmlStr = '<div class="product-color-picket">';
            htmlStr += '<span class="product-color-menu-arrow"></span>';
            htmlStr += '<ul class="color-column quick-colors">';
            var isQuickColumn = true, len = 0, i = 0;
            for (var o in styles) {
                len++;
            }
            for (var styleId in styles) {
                var style = styles[styleId];
                if (isQuickColumn) {
                    if (i == 7) {
                        isQuickColumn = false;
                        i = 0;
                        htmlStr += '<li class="more-color"><span></span></li>';
                        htmlStr += '</ul>';
                        htmlStr += '<ul class="color-column">';
                        htmlStr += '<li class="color-item" data-id="' + styleId + '" data-product-id="' + productId + '" data-color="#' + style.color + '" title="' + style.color_name + '">';
                        htmlStr += '<span style="background-color: #' + style.color + ';"></span>';
                        htmlStr += '</li>';
                    } else {
                        htmlStr += '<li class="color-item" data-id="' + styleId + '" data-product-id="' + productId + '" data-color="#' + style.color + '" title="' + style.color_name + '">';
                        htmlStr += '<span style="background-color: #' + style.color + ';"></span>';
                        htmlStr += '</li>';
                    }
                } else {
                    if (i == 8) {
                        i = 0;
                        htmlStr += '</ul>';
                        htmlStr += '<ul class="color-column">';
                    }
                    htmlStr += '<li class="color-item" data-id="' + styleId + '" data-color="#' + style.color + '" title="' + style.color_name + '">';
                    htmlStr += '<span style="background-color: #' + style.color + ';"></span>';
                    htmlStr += '</li>';
                }
                if (i > 9 && i == len - 1) {
                    htmlStr += '<li class="more-color"><span></span></li>';
                }
                i++;
            }

            htmlStr += '</ul>';
            htmlStr += '</div>';
            return htmlStr;
        }
    }

    /**
     * 初始化设计工具产品预览面板数据及事件
     */
    function initDsCenterPanel() {
        /*
         * 切换正面、反面、左袖、右袖事件
         */
        function initChangeSide() {
            $('.product-side').click(function () {
                $('.product-side').removeClass('active');
                $(this).addClass('active');

                var idx = $(this).index();
                switch (idx) {
                    case 0:
                        ds.active('front');
                        setCookie('ds_active_side', 'front');
                        break;
                    case 1:
                        ds.active('back');
                        setCookie('ds_active_side', 'back');
                        break;
                    case 2:
                        ds.active('third');
                        setCookie('ds_active_side', 'third');
                        break;
                    case 3:
                        ds.active('fourth');
                        setCookie('ds_active_side', 'fourth');
                        break;
                }
            });
        }

        initChangeSide();
    }

    /**
     * 初始化设计工具事件
     */
    function initDsEvents() {
        /*
         * 设置左侧操作面板文本
         */
        function setTextForLeftPanel(string) {
            $('#addTextInput').val(string);
        }

        /*
         * 设置左侧操作面板文本字体
         */
        function setTextFontFamilyForLeftPanel(fontFamily) {
            var image = ET_DS_ALL_FONTS.list[fontFamily.toLowerCase()].image;
            $('img', '.design-dropdown-fontfamily').attr('src', image);
        }

        /*
         * 设置左侧操作面板文本填充颜色
         */
        function setTextFillForLeftPanel(fillColor) {
            $('#textFillColor>span').css('backgroundColor', fillColor);
        }

        /*
         * 设置左侧操作面板文本描边粗细
         */
        function setTextStrokeWidthForLeftPanel(StrokeWidth) {
            $('#changeTextOutline').val(StrokeWidth);
        }

        /*
         * 设置左侧操作面板文本描边颜色
         */
        function setTextStrokeForLeftPanel(strokeColor) {
            $('#strokeColor>span').css('backgroundColor', strokeColor);
        }

        /*
         * 启用元素控制面板
         */
        function enableDesignTools() {
            $('#design_selected_tools').show();
        }

        /*
         * 禁用（隐藏）元素控制面板
         */
        function disableDesignTools() {
            $('#design_selected_tools').hide();
        }

        /*
         * 将元素控制面板移动到文字面板
         */
        function designToolsAppendToText() {
            enableDesignTools();
            $('#design_selected_tools').appendTo('.tab-content:eq(0)');
        }

        /*
         * 将元素控制面板移动到图片面板
         */
        function designToolsAppendToImage() {
            enableDesignTools();
            $('#design_selected_tools').appendTo('.tab-content:eq(1)');
        }

        eventManager.on('selectedBox', function (elem) {
            console.log(elem);
            if (elem.type == 'text') {
                showTextLayer();
                setTextForLeftPanel(elem.string.join('\n'));
                setTextFontFamilyForLeftPanel(elem.fontFamily);
                setTextFillForLeftPanel(elem.fill);
                setTextStrokeWidthForLeftPanel(elem.strokeWidth);
                setTextStrokeForLeftPanel(elem.stroke);
                designToolsAppendToText();
            } else if (elem.type == 'bitmap') {
                showImageLayer();
                showImageEditorLayer();
                designToolsAppendToImage();
            }
        });

        eventManager.on('unselectBox', function () {
            var idx = $('.tab.active').index();
            if (idx == 0) {
                showTextLayer();
            } else {
                showImageLayer();
            }
            restoreTextLayer();
            restoreImageLayer();
            disableDesignTools();
        });

        eventManager.on('tooManyColors', function (colors) {
            console.log(colors);
            alert('too many colors');
        });

        eventManager.on('colorsChanged', function(){
            var colorCount = 0;
            var sides = ds.getCanvases();
            for(var i=0; i<sides.length; i++){
                var side = sides[i];
                var elements = side.elements;
                var colors = [];
                for(var j=0; j<elements.length; j++){
                    var element = elements[j];
                    if(element instanceof TextElementEl){
                        if(element.strokeWidth != 0){
                            colors.push(element.stroke);
                        }
                        colors.push(element.fill);
                    }
                    if(element instanceof BitmapBase64ElementEl){
                        for(var n=0; n<element.colors.length; n++){
                            colors.push(element.colors[n]);
                        }
                    }
                }
                colorCount += colorUnique(colors).length;
            }
            ds_color_count = colorCount;
            setCookie('ds_color_count', ds_color_count);
        });

        function save() {
            var sides = [
                [],
                [],
                [],
                []
            ];
            var cs = ds.getCanvases();
            for (var o in cs) {
                var c = cs[o];
                for (var oo in c.elements) {
                    var elem = c.elements[oo];
                    var data = {
                        type: elem.type
                    };
                    if (elem.type == 'text') {
                        data.string = elem.string;
                        data.lineHeight = elem.lineHeight;
                        data.fontFamily = elem.fontFamily;
                        data.fontSize = elem.fontSize;
                        data.fill = elem.fill;
                        data.stroke = elem.stroke;
                        data.strokeWidth = elem.strokeWidth;
                    } else if (elem.type == 'bitmap') {
                        data.dataUrl = elem.url;
                    }
                    data.translateX = elem.translateX;
                    data.translateY = elem.translateY;
                    data.angle = elem.angle;
                    data.scaleX = elem.scaleX;
                    data.scaleY = elem.scaleY;
                    data.flipX = elem.flipX;
                    data.flipY = elem.flipY;
                    sides[o].push(data);
                }
            }

            console.log(ds_cat_id, ds_product_id, ds_product_style_id, sides);

            $.post('/api', {
                "model": "design/tool/beta",
                "action": "design_save",
                "color_count": ds_color_count,//颜色数量
                "default_side": "front",//默认面
                "design_front": JSON.stringify(sides[0]),//前胸设计
                "design_back": JSON.stringify(sides[1]),//后背设计
                "design_third": JSON.stringify(sides[2]),//左袖设计
                "design_fourth": JSON.stringify(sides[3]),//右袖设计
                "cat_id": ds_cat_id,//产品分类ID
                "product_id": ds_product_id,//产品ID
                "style_id": ds_product_style_id//产品款式ID
            }, function (data) {
                console.log(data);
            }, 'json');
        }

        $('#ds_save').click(function () {
            save();
        });

        $('#ds_next').click(function () {

        });
    }

    //init
    initDsLeftPanel();
    initDsCenterPanel();
    initDsRightPanel();
    initDsEvents();

    //------------pricing-------------------------------------------------

    function showDsPricingProductSide(idx) {
        $('#ds_preview').find('.new-editor').hide();
        $('#ds_preview').find('.new-editor').eq(idx).show();
    }

    //添加单个销售产品
    function addPricingProduct(product, style, isDefault) {
        var htmlStr = '';
        htmlStr += '<div class="ds-pricing-product-item ' + (isDefault ? 'ds-pricing-product-item-default' : '') + '" data-id="' + product.product_id + '">';
        htmlStr += '<div class="ds-pricing-product-item-icon">';
        htmlStr += product.product_name;
        htmlStr += '<div class="ds-pricing-product-item-icon-begin"></div>';
        htmlStr += '<div class="ds-pricing-product-item-icon-end"></div>';
        htmlStr += '</div>';
        htmlStr += '<div class="ds-pricing-product-item-left">';
        htmlStr += '<img class="ds-pricing-product-image" src="' + product.product_design[0].img_url + '" style="background-color:#' + style.color + '">';
        htmlStr += '</div>';
        htmlStr += '<div class="ds-pricing-product-item-right">';
        htmlStr += '<div class="ds-pricing-product-item-pricing-info">';
        htmlStr += '<div class="ds-pricing-product-item-right-column">';
        htmlStr += '<div class="ds-pricing-product-item-right-column-label">';
        htmlStr += '成本：';
        htmlStr += '</div>';
        htmlStr += '<div class="ds-pricing-product-item-right-column-info">';
        htmlStr += '¥';
        htmlStr += '<span class="ds-pricing-product-item-right-column-info-num">0</span>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '<div class="ds-pricing-product-item-right-column ds-pricing-product-item-right-column-sign">';
        htmlStr += '<span>+</span>';
        htmlStr += '</div>';
        htmlStr += '<div class="ds-pricing-product-item-right-column">';
        htmlStr += '<div class="ds-pricing-product-item-right-column-label">';
        htmlStr += '利润：';
        htmlStr += '</div>';
        htmlStr += '<div class="ds-pricing-product-item-right-column-info">';
        htmlStr += '¥';
        htmlStr += '<span class="ds-pricing-product-item-right-column-info-num">0</span>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '<div class="ds-pricing-product-item-right-column ds-pricing-product-item-right-column-sign">';
        htmlStr += '<span>=</span>';
        htmlStr += '</div>';
        htmlStr += '<div class="ds-pricing-product-item-right-column">';
        htmlStr += '<div class="ds-pricing-product-item-right-column-label" style="text-align: center;">';
        htmlStr += '售价：';
        htmlStr += '</div>';
        htmlStr += '<div class="ds-pricing-product-item-right-column-info">';
        htmlStr += '<span class="ds-pricing-product-item-right-column-money-unit">¥</span>';
        htmlStr += '<input type="text" class="ds-pricing-product-item-right-column-input">';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '<div class="ds-pricing-product-item-color-info">';
        htmlStr += '<span class="ds-pricing-product-item-color-info-label">已选颜色</span>';
        htmlStr += '<div class="ds-pricing-product-item-selected">';
        htmlStr += '<div class="ds-pricing-product-item-color ds-pricing-product-item-color-default" data-id="' + style.id + '" data-color="' + style.color + '">';
        htmlStr += '<span class="ds-pricing-product-item-color-inner" style="background-color: #' + style.color + '"></span>';
        htmlStr += '<span class="ds-pricing-product-item-color-delete"></span>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '<div class="ds-pricing-product-item-color-dropdown">';
        htmlStr += '<div class="ds-pricing-product-item-color-btn"></div>';
        htmlStr += '<div class="ds-pricing-product-item-color-menu">';
        htmlStr += '<div class="ds-pricing-product-item-color-menu-arrow"></div>';
        htmlStr += '<div class="ds-pricing-product-item-color-menu-color-list">';
        var styles = getStylesByProductId(product.product_id);
        for (var styleId in styles) {
            var _style = styles[styleId];
            var selected = (style.id == styleId ? 'selected' : '');
            htmlStr += '<a class="ds-pricing-product-item-color-menu-color-item ' + selected + '" title="' + _style.color_name + '" data-id="' + styleId + '" data-color="' + _style.color + '">' +
                '<span class="ds-pricing-product-item-color-selected">✓</span>' +
                '<span style="background: #' + _style.color + ';"></span>' +
                '</a>';
        }
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '</div>';
        htmlStr += '<div class="clearfix"></div>';
        htmlStr += '<a class="ds-pricing-product-item-delete" href="#"></a>';
        htmlStr += '</div>';
        var productItem = $(htmlStr);
        //从第一步过来的都是TRUE，替换第一个。
        if (isDefault) {
            if ($('.ds-pricing-product-item').length == 0) {
                $('.ds-pricing-product-list').append(productItem);
            } else {
                var firstItem = $('.ds-pricing-product-list').find('.ds-pricing-product-item').eq(0);
                firstItem.before(productItem);
                firstItem.remove();
            }
        } else {
            $('.ds-pricing-product-list').append(productItem);
        }

        $('.ds-pricing-product-item-color-btn', productItem).click(function (e) {
            e.stopPropagation();
            var menu = $(this).siblings('.ds-pricing-product-item-color-menu');
            $('.ds-pricing-product-item-color-menu').each(function (idx, obj) {
                if (obj != menu[0]) {
                    $(obj).hide();
                }
            });
            menu.toggle();
        });

        $('.ds-pricing-product-item-color-menu', productItem).click(function (e) {
            e.stopPropagation();
        });

        $('.ds-pricing-product-item-color-menu-color-item', productItem).click(function (e) {
            e.stopPropagation();
            var styleId = $(this).attr('data-id');
            var colorValue = $(this).attr('data-color');
            var productItem = $(this).parents('.ds-pricing-product-item');
            var selectItems = $('.ds-pricing-product-list').find('.selected');
            if ($(this).hasClass('selected')) {//样式删除事件
                if(selectItems.length == 1){
                    return;
                }
                productItem.find('.ds-pricing-product-item-color').each(function () {
                    var _styleId = $(this).attr('data-id');
                    if (_styleId == styleId) {
                        $(this).remove();
                        setLastColor(productItem, true);
                    }
                });
            } else {
                if(selectItems.length > 9){
                    return;
                }
                var htmlStr = '<div class="ds-pricing-product-item-color" data-id="' + styleId + '" data-color="'+colorValue+'">' +
                    '<span class="ds-pricing-product-item-color-inner" style="background-color: #' + colorValue + '"></span>' +
                    '<span class="ds-pricing-product-item-color-delete"></span>' +
                    '</div>';
                productItem.find('.ds-pricing-product-item-selected').append(htmlStr);
                productItem.find('.ds-pricing-product-image').css('backgroundColor', '#' + colorValue);
                $('#ds_preview').find('.product-color').css('backgroundColor', '#' + colorValue);
            }
            $(this).toggleClass('selected');

            addProductControlLimit();
        });

        addProductControlLimit();
    }

    function addProductControlLimit(){
        var selectItems = $('.ds-pricing-product-list').find('.ds-pricing-product-item-color-menu-color-item.selected');
        $('span', '.ds-pricing-product-add-total').text(10-selectItems.length);
        if(10-selectItems.length <= 0){
            $('.ds-pricing-product-add').hide();
        }else{
            $('.ds-pricing-product-add').show();
        }
    }

    function setLastColor(productItem, isDeleted){
        productItem.find('.ds-pricing-product-item-color').removeClass('ds-pricing-product-item-color-default');
        productItem.find('.ds-pricing-product-item-color').eq(0).addClass('ds-pricing-product-item-color-default');

        var len, colorValue;
        if(isDeleted){
            len = productItem.find('.ds-pricing-product-item-color').length;
            colorValue = productItem.find('.ds-pricing-product-item-color').eq(len-1).attr('data-color');
        }else{
            len = productItem.find('.ds-pricing-product-item-color').length-1;
            colorValue = productItem.find('.ds-pricing-product-item-color').eq(len-1).attr('data-color');
        }
        productItem.find('.ds-pricing-product-image').css('backgroundColor', '#' + colorValue);
        $('#ds_preview').find('.product-color').css('backgroundColor', '#' + colorValue);
    }

    //删除单个销售产品
    function deletePricingProduct(product) {

    }

    //更新单个销售产品信息(颜色/成本/利润/售价)
    function updatePricingProduct(product, style) {
        var item = $('.ds-pricing-product-item[data-id=' + product.product_id + ']');

        item.find('.ds-pricing-product-image').css('backgroundColor', '#' + style.color);

        //颜色选项
        item.find('.ds-pricing-product-item-color-menu-color-item').removeClass('selected');
        item.find('.ds-pricing-product-item-color').each(function (idx) {
            var htmlStr = '<div class="ds-pricing-product-item-color ds-pricing-product-item-color-default" data-id="' + style.id + '">' +
                '<span class="ds-pricing-product-item-color-inner" style="background-color: #' + style.color + '"></span>' +
                '<span class="ds-pricing-product-item-color-delete"></span>' +
                '</div>';
            if (idx == 0) {
                $(this).before(htmlStr);
                $(this).remove();
            }

            var styleId = $(this).attr('data-id');
            if (styleId == style.id) {
                $(this).remove();
            }
        });
        item.find('.ds-pricing-product-item-color').each(function () {
            var styleId = $(this).attr('data-id');
            item.find('.ds-pricing-product-item-color-menu-color-item[data-id=' + styleId + ']').addClass('selected');
        });
    }

    //更新所有销售产品信息(成本/利润/售价)
    function updatePricingProducts() {

    }

    //更新最低总利润
    function updateTotalProfit() {

    }

    /**
     * 初始化Pricing面板及事件
     */
    function initPricing() {

        function initSaleScroll() {
            $('#saleScroll').honest_slider({
                scales: [
                    [0, 10],
                    [0.05, 50],
                    [0.1, 100],
                    [0.3, 300],
                    [0.5, 500],
                    [0.7, 700],
                    [1, 1000]
                ],
                slider: function (value) {
                    $('#saleGoalInput').val(value);
                    $.get('/api', {
                        "model": "design/tool/beta",
                        "action": "product_pricing",
                        "sale_count": value, // 销售数量
                        "color_count": ds_color_count, // 颜色数量
                        "style_id": ds_product_style_id,   // 款式ID
                        "json": 1
                    }, function (data) {
                        var returnData = data.return;
                        if (returnData.status == 0) {
                            $('.money-num').text(returnData);
                        } else {
                            console.log(data.message);
                        }
                    });
                }
            });
        }

        function initSaleInput() {
            function saleGoalInputEvent() {
                var value = event.target.value;
                value = value.match(/[0-9]/g) != null ? value.match(/[0-9]/g).join('') : 10;
                if (value < 10) {
                    value = 10;
                }
                if (value > 1000) {
                    value = 1000;
                }
                event.target.value = value;
                $('#saleScroll').honest_slider('value', value);
            }

            $('#saleGoalInput').on('input blur', saleGoalInputEvent);
        }

        function initPricingSides() {
            $('.ds-pricing-products-side').click(function () {
                $('.ds-pricing-products-side').removeClass('active');
                $(this).addClass('active');
                var idx = $(this).index();
                showDsPricingProductSide(idx);
            });
        }

        function initPricingDropDownMenuEven() {
            $(window).click(function () {
                $('.ds-pricing-product-item-color-menu').hide();
            });
        }

        function initProductColorEvent() {
            $(document).on('click', '.ds-pricing-product-item-color', function () {
                var colorValue = $(this).find('.ds-pricing-product-item-color-inner').css('backgroundColor');
                $(this).parents('.ds-pricing-product-item').find('.ds-pricing-product-image').css('backgroundColor', colorValue);
                $('#ds_preview').find('.product-color').css('backgroundColor', colorValue);
            });
            //样式删除事件
            $(document).on('click', '.ds-pricing-product-item-color-delete', function () {
                var styleId = $(this).parents('.ds-pricing-product-item-color').attr('data-id');
                $(this).parents('.ds-pricing-product-item').find('.ds-pricing-product-item-color-menu-color-item[data-id=' + styleId + ']').removeClass('selected');

                setLastColor($(this).parents('.ds-pricing-product-item'), false);
                addProductControlLimit();
                $(this).parent().remove();
            });
        }

        function initUpdateProductEvent() {

            //新增单个产品
            dsManager.on('dsProductAdded', function (product, style) {
                //都是从第一步过来的
                addPricingProduct(product, style, true);
                updateTotalProfit();
            });

            //删除单个产品
            dsManager.on('dsProductDeleted', function (product) {
                deletePricingProduct(product);
                updateTotalProfit();
            });

            //修改产品属性(颜色、售价)后调整该产品利润与总利润
            dsManager.on('dsProductPropertyChanged', function (product, style) {
                updatePricingProduct(product, style);
                updateTotalProfit();
            });

            //设计元素颜色数量发生变化后调整所有产品利润与总利润
            dsManager.on('dsColorCountChanged', function () {
                updatePricingProducts();
                updateTotalProfit();
            });

            //销售目标发生变化
            dsManager.on('dsSaleGoalChanged', function () {
                updatePricingProducts();
                updateTotalProfit();
            });
        }

        function initProductAddEvent(){
            $('#ds_pricing_product_add_btn').click(function(){
                var productId = $('#ds_pricing_product_add_select_products').val();
                var product = getProductById(productId);
                var styles = getStylesByProductId(productId);
                var style;
                for(var o in styles){
                    var _style = styles[o];
                    if(_style.is_default == 1){
                        style = _style;
                        break;
                    }
                }
                addPricingProduct(product, style);
            });
        }

        initSaleScroll();
        initSaleInput();
        initPricingSides();
        initPricingDropDownMenuEven();
        initProductColorEvent();
        initUpdateProductEvent();
        initProductAddEvent();
    }

    function initPricingData(){
        /*
         * 加载产品类型以及事件
         */
        function initProductCategories() {
            var str = '';
            for (var o in CACHE.cats) {
                var item = CACHE.cats[o];
                str += '<option value="' + o + '">' + item.cat_name + '</option>';
            }
            $('#ds_pricing_product_add_select_cat').append(str);
            $('#ds_pricing_product_add_select_cat').change(function () {
                var categoryId = $(this).val();
                var products = CACHE.products[categoryId];
                initProductChoice(products);
            });
            $('#ds_pricing_product_add_select_cat').change();
        }

        /*
         * 加载产品列表以及事件
         */
        function initProductChoice(products) {
            var str = '';
            for (var o in products) {
                var item = products[o];
                str += '<option value="' + o + '">' + item.product_name + '</option>';
            }
            $('#ds_pricing_product_add_select_products').empty().append(str);
        }
        initProductCategories();
    }

    initPricing();
});
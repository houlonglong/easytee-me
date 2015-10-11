(function initAllFonts() {
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

$(function () {

    $.slider({
        defaultStep: 0,
        sliderAnimate: 600,
        sliderButton: 'a.step',
        sliderSelection: '.design-slider',
        sliderContainer: '.design-center',
        onclick: function(step){
            $('a.step').removeClass('active');
            $('a.step').eq(step).addClass('active');
        }
    });

    var ds;

    var ds_color_count = 0;

    var ds_cat_id;

    var ds_product_id;

    var ds_product_style_id;

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

    function showImageEditorLayer(){
        $('.tab-content-image-layout, .tab-content-image-layout-or').hide();
        $('.image-editor').show();
        $('.upload-location').hide();
        $('.image-store').hide();
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
                var item = $('<a class="color-picket-item" title="' + name + '"><span style="background: ' + value + ';"></span></a>').attr('data-color', value);
                $('#textFillColorPicket').append(item);
            }
            $('.color-picket-item', '#textFillColorPicket').click(function () {
                var dataColor = $(this).attr('data-color');
                $(this).parents('.design-dropdown').find('.design-dropdown-color>span').css('backgroundColor', dataColor);
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
                var item = $('<a class="color-picket-item" title="' + name + '"><span style="background: ' + value + ';"></span></a>').attr('data-color', value);
                $('#textStrokeColorPicket').append(item);
            }
            $('.color-picket-item', '#textStrokeColorPicket').click(function () {
                var dataColor = $(this).attr('data-color');
                $(this).parents('.design-dropdown').find('.design-dropdown-color>span').css('backgroundColor', dataColor);
                $(this).parents('.design-dropdown').find('.design-dropdown-menu').hide();

                ds.call('textStroke', dataColor);
            });
        }

        /**
         * 上传图片
         */
        function initUploadImage() {
            $('#upload_location_input').fileUploader({
                callback: function(file, dataUrl){
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
            }, function(data){
                if(data.status == 0){
                    var returnData = data.return;
                    var templates = returnData.templates;
                    var htmlStr = '';
                    for(var i=0; i<templates.length; i++){
                        var item = templates[i];
                        htmlStr += '<div class="image-list-item">';
                        htmlStr += '<a href="javascript:;" class="img-wrap">';
                        htmlStr += '<img src="'+item.img_url+'" alt="'+item.name+'">';
                        htmlStr += '</a>';
                        if(item.price == 0){
                            htmlStr += '<span>免费</span>';
                        }else{
                            htmlStr += '<span>'+parseFloat(item.price).toFixed(2)+'元/件</span>';
                        }
                        htmlStr += '</div>';
                    }
                    $('#image_store_list').empty().append(htmlStr);
                }else{
                    console.error(data.message);
                }
            }, 'json');
        }

        /**
         * 自动居中
         */
        function initAutoAlign() {
            $('#snapCenter').click(function(){
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
        var productInfo = {};
        $.get('/api', {
            "model": "design/tool/beta",
            "action": "design_init",
            "json": 1
        }, function(data){
            if(data.status == 0){
                var returnData = data.return;
                var designInfo = returnData.design_info;
                productInfo = returnData.product_info;
                initProductCategories();
            }else{
                console.error(data.message);
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
                var products = productInfo.products[categoryId];
                initProductChoice(products);
            });
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
                var product_design = products[productId].product_design;
                //拼装DS需要的初始化数据
                var sides = [];
                for(var o in product_design){
                    var item = product_design[o];
                    sides.push({
                        width: 500,
                        height: 500,
                        id: item.side,
                        image: item.img_url,
                        scale: 7.47,
                        printable: {
                            x: parseFloat(item.x)/2,
                            y: parseFloat(item.y)/2,
                            width: parseFloat(item.w)/2,
                            height: parseFloat(item.h)/2
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
                } else {
                    ds.load(sides);
                }

                var styles = productInfo.styles[productId];
                var style;
                for(var o in styles){
                    if(styles[o].is_default == 1){
                        style = styles[o];
                        style.id = o;
                        break;
                    }
                }
                if(style){
                    ds_product_style_id = style.id;//复制全局变量
                    $('.color-item[data-id='+style.id+']').addClass('active');
                    ds.call('productColor', '#'+style.color);
                }
            });
            $('.product-item').eq(0).click();

            $('.product-color-picket .color-item').hover(function (e) {
                var styleColor = $(this).attr('data-color');
                ds.call('productColor', styleColor);
            }, function(){
                var styleColor = $(this).parents('.product-color-picket').find('.color-item.active').attr('data-color');
                ds.call('productColor', styleColor);
            });

            $('.product-color-picket .color-item').click(function (e) {
                e.stopPropagation();
                $('.color-item').removeClass('active');
                $(this).addClass('active');

                var styleId = $(this).attr('data-id');
                ds_product_style_id = styleId;//复制全局变量
                var styleColor = $(this).attr('data-color');
                ds.call('productColor', styleColor);
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

            $('.product-color-picket').click(function(e){
                e.stopPropagation();
            });
        }

        function initProductStyles(productId){
            var styles = productInfo.styles[productId];
            var htmlStr = '<div class="product-color-picket">';
            htmlStr += '<span class="product-color-menu-arrow"></span>';
            htmlStr += '<ul class="color-column quick-colors">';
            var isQuickColumn = true, len=0, i = 0;
            for(var o in styles){
                len++;
            }
            for(var styleId in styles){
                var style = styles[styleId];
                if(isQuickColumn){
                    if(i==7){
                        isQuickColumn = false;
                        i=0;
                        htmlStr += '<li class="more-color"><span></span></li>';
                        htmlStr += '</ul>';
                        htmlStr += '<ul class="color-column">';
                        htmlStr += '<li class="color-item" data-id="'+styleId+'" data-color="#'+style.color+'" title="'+style.color_name+'">';
                        htmlStr += '<span style="background-color: #'+style.color+';"></span>';
                        htmlStr += '</li>';
                    }else{
                        htmlStr += '<li class="color-item" data-id="'+styleId+'" data-color="#'+style.color+'" title="'+style.color_name+'">';
                        htmlStr += '<span style="background-color: #'+style.color+';"></span>';
                        htmlStr += '</li>';
                    }
                }else{
                    if(i==8){
                        i=0;
                        htmlStr += '</ul>';
                        htmlStr += '<ul class="color-column">';
                    }
                    htmlStr += '<li class="color-item" data-id="'+styleId+'" data-color="#'+style.color+'" title="'+style.color_name+'">';
                    htmlStr += '<span style="background-color: #'+style.color+';"></span>';
                    htmlStr += '</li>';
                }
                if(i>9 && i == len-1){
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
                        break;
                    case 1:
                        ds.active('back');
                        break;
                    case 2:
                        ds.active('third');
                        break;
                    case 3:
                        ds.active('fourth');
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
            if(idx == 0){
                showTextLayer();
            }else{
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

        function save(){
            var sides = [[], [], [], []];
            var cs = ds.getCanvases();
            for(var o in cs){
                var c = cs[o];
                for(var oo in c.elements){
                    var elem = c.elements[oo];
                    var data = {
                        type : elem.type
                    };
                    if(elem.type == 'text'){
                        data.string = elem.string;
                        data.lineHeight = elem.lineHeight;
                        data.fontFamily = elem.fontFamily;
                        data.fontSize = elem.fontSize;
                        data.fill = elem.fill;
                        data.stroke = elem.stroke;
                        data.strokeWidth = elem.strokeWidth;
                    }else if(elem.type == 'bitmap'){
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
            }, function(data){
                console.log(data);
            },'json');
        }

        $('#ds_save').click(function(){
            save();
        });

        $('#ds_next').click(function(){

        });
    }

    //init
    initDsLeftPanel();
    initDsCenterPanel();
    initDsRightPanel();
    initDsEvents();
});
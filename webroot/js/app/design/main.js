$(function () {

    var ds;

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

    function showTextLayer() {
        $('.tab-content:eq(0)').addClass('active');
        $('.tab-content:eq(1)').removeClass('active');
    };

    function showImageLayer() {
        $('.tab-content:eq(0)').removeClass('active');
        $('.tab-content:eq(1)').addClass('active');
    }

    function restoreTextLayer() {
        $('#addTextInput').val('');
    }

    function restoreImageLayer() {
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

    /**
     * 初始化设计工具设置面板数据及事件
     */
    function initLeftPanel() {
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
        }

        /**
         * 加载素材库图片
         */
        function initArtModules() {
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
    function initRightPanel() {
        //模拟Ajax数据
        var categories = {
            1: {
                id: '1',
                name: '基础－T恤款',
                products: [
                    {
                        id: '11',
                        name: '基础圆领T恤基础圆领T恤1',
                        sides: [
                            {
                                id: 'front',
                                image: '/js/app/design/common/data/front1.png',
                                scale: 7.47,
                                printable: {
                                    x: 159,
                                    y: 100,
                                    width: 210,
                                    height: 260
                                }
                            },
                            {
                                id: 'back',
                                image: '/js/app/design/common/data/back1.png',
                                scale: 7.47,
                                printable: {
                                    x: 159,
                                    y: 100,
                                    width: 210,
                                    height: 260
                                }
                            }
                        ]
                    },
                    {
                        id: '12',
                        name: '基础圆领T恤基础圆领T恤2',
                        sides: [
                            {
                                id: 'front',
                                image: '/js/app/design/common/data/product_type_2_front.png',
                                scale: 7.47,
                                printable: {
                                    x: 169,
                                    y: 100,
                                    width: 190,
                                    height: 230
                                }
                            },
                            {
                                id: 'back',
                                image: '/js/app/design/common/data/product_type_2_back.png',
                                scale: 7.47,
                                printable: {
                                    x: 169,
                                    y: 100,
                                    width: 190,
                                    height: 230
                                }
                            }
                        ]
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
                        sides: [
                            {
                                id: 'front',
                                image: '/js/app/design/common/data/front1.png',
                                scale: 7.47,
                                printable: {
                                    x: 149,
                                    y: 100,
                                    width: 150,
                                    height: 200
                                }
                            },
                            {
                                id: 'back',
                                image: '/js/app/design/common/data/back1.png',
                                scale: 7.47,
                                printable: {
                                    x: 149,
                                    y: 100,
                                    width: 190,
                                    height: 340
                                }
                            }
                        ]
                    },
                    {
                        id: '22',
                        name: '2基础圆领T恤基础圆领T恤2',
                        sides: [
                            {
                                id: 'front',
                                image: '/js/app/design/common/data/product_type_2_front.png',
                                scale: 7.47,
                                printable: {
                                    x: 149,
                                    y: 100,
                                    width: 150,
                                    height: 200
                                }
                            },
                            {
                                id: 'back',
                                image: '/js/app/design/common/data/product_type_2_back.png',
                                scale: 7.47,
                                printable: {
                                    x: 149,
                                    y: 100,
                                    width: 190,
                                    height: 340
                                }
                            }
                        ]
                    }
                ]
            }
        };

        /*
         * 加载产品类型
         */
        function initProductCategories(list) {
            var str = '';
            for (var o in list) {
                var item = list[o];
                str += '<option value="' + item.id + '">' + item.name + '</option>';
            }
            $('#selectProductCategories').append(str);
            $('#selectProductCategories').change(function () {
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
        function initProductChoice(categoryId, list) {
            var str = '';
            for (var o in list) {
                var item = list[o];
                str += '<li class="product-item" data-id="' + item.id + '" tips="' + item.name + '">';
                str += '    <img src="' + item.sides[0].image + '"/>';
                str += '    <div>';
                str += '        <span class="name">' + item.name + '</span>';
                str += '        <span class="desc">成本优选</span>';
                str += '        <a href="#' + item.id + '" class="info">详情</a>';
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
                for (var o in products) {
                    var _product = products[o];
                    if (_product.id == productId) {
                        product = _product;
                        break;
                    }
                }
                if (!ds) {
                    ds = new Ds('#ds', product.sides);
                } else {
                    ds.load(product);
                }
            });
            $('.product-item').eq(0).click();
        }

        initProductCategories(categories);

        $('#product_color_picket').find('.color-item').click(function () {
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
    }

    /**
     * 初始化设计工具产品预览面板数据及事件
     */
    function initCenterPanel() {
        /*
         * 切换正面、反面、左袖、右袖事件
         */
        function initChangeSide() {
            $('.product-side').click(function () {
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
                        ds.active('forth');
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
                setTextForLeftPanel(elem.string.join('\n'));
                setTextFontFamilyForLeftPanel(elem.fontFamily);
                setTextFillForLeftPanel(elem.fill);
                setTextStrokeWidthForLeftPanel(elem.strokeWidth);
                setTextStrokeForLeftPanel(elem.stroke);
                designToolsAppendToText();
            } else if (elem.type == 'bitmap') {
                designToolsAppendToImage();
            }
        });

        eventManager.on('unselectBox', function () {
            var idx = $('.tab.active').index();
            if (idx == 0) {
                restoreTextLayer();
            } else {
                restoreImageLayer();
            }
            disableDesignTools();
        });

        eventManager.on('tooManyColors', function (colors) {
            console.log(colors);
            alert('too many colors');
        });
    }

    //init
    initLeftPanel();
    initCenterPanel();
    initRightPanel();
    initDsEvents();
});
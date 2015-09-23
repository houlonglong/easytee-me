$(function () {
    $('.tabs>.tab').click(function () {
        var idx = $(this).index();
        $('.tabs>.tab').removeClass('active');
        $(this).addClass('active');
        $('.tab-content').removeClass('active');
        $('.tab-content').eq(idx).addClass('active');
    });

    $('#upload_location_btn').click(function(){
        showImageUploadLayer();
    });

    $('#image_store_btn').click(function(){
        showImageStoreLayer();
    });

    $('.design-dropdown-btn').click(function(e){
        e.stopPropagation();
        var menu = $(this).siblings('.design-dropdown-menu');
        $('.design-dropdown-menu').each(function(idx, obj){
            if(obj != menu[0]){
                $(obj).hide();
            }
        });
        menu.toggle();
    });

    $('.design-dropdown-menu').click(function(e){
        e.stopPropagation();
    });

    $(window).click(function(){
        $('.design-dropdown-menu').hide();
    });

    $('.color-picket-item').click(function(){
        var bgColor = $('span', this).css('backgroundColor');
        $(this).parents('.design-dropdown').find('.design-dropdown-color>span').css('backgroundColor', bgColor);
        $(this).parents('.design-dropdown').find('.design-dropdown-menu').hide();
    });



    $('.product-item').click(function(){
        $('.product-item').removeClass('active');
        $(this).addClass('active');
    });

    function showImageLayer(){
        $('.tab-content-image-layout, .tab-content-image-layout-or').show();
        $('.upload-location').hide();
        $('.image-store').hide();
    }

    function showImageUploadLayer(){
        $('.tab-content-image-layout, .tab-content-image-layout-or').hide();
        $('.upload-location').show();
        $('.image-store').hide();
    }

    function showImageStoreLayer(){
        $('.tab-content-image-layout, .tab-content-image-layout-or').hide();
        $('.upload-location').hide();
        $('.image-store').show();
    }

    function setDsHeight(){
        var tools = $('.design-tools');
        var choice = $('.product-choices');
        var design = $('.design-center');
        if(tools.outerHeight()>choice.outerHeight()){
            design.height(tools.outerHeight() + parseInt(tools.css('marginTop')) + 20);
        }else{
            design.height(choice.outerHeight() + parseInt(choice.css('marginTop')) + 20);
        }
    }

    function initFontFamilies(){
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
        for(var o in fonts){
            var image = path + '/' + fontType + '/' + fonts[o] + '.png';
            var woff = path + '/' + fontType + '/' + fonts[o] + '.woff';
            if(o==0){
                $('img', '.design-dropdown-fontfamily').attr('src', image);
            }
            var item = $('<a class="font-families-item">').css('backgroundImage', 'url('+image+')').attr('data-image', image).attr('data-woff', woff);
            $('.font-families').append(item);
        }
        $('.font-families-item').click(function(){
            var image = $(this).attr('data-image');
            $('img', '.design-dropdown-fontfamily').attr('src', image);
            $(this).parents('.design-dropdown').find('.design-dropdown-menu').hide();
        });
    }

    initFontFamilies();

    function initColorPicker(){}

    setDsHeight();
});
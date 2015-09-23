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

    $('.font-families-item').click(function(){
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
});
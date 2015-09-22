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
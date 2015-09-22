$(function () {
    $('.tabs>.tab').click(function () {
        var idx = $(this).index();
        $('.tabs>.tab').removeClass('active');
        $(this).addClass('active');
        $('.tab-content').removeClass('active');
        $('.tab-content').eq(idx).addClass('active');
    });

});
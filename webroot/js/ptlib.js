(function($){
    var PtLib = function(){
        this.progress = NProgress;
        this.swal = swal;
        swal.doc = "http://t4t5.github.io/sweetalert/"
        this.notify = $.notify
        this.notify.doc = "http://notifyjs.com/"

    }
    $.pt = new PtLib();
})(jQuery);
$(function(){

        var wait = 5;

        function error() {
            if (wait == 0) {
                document.location.href = "http://2.dev.jzw.com/";
                wait = 5;
            } else {
                wait--;
                $("#return").html(wait+"秒后返回首页");

                setTimeout(function () {
                    error()
                }, 1000)
            }
        }
    error();
})
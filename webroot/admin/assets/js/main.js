function reload_js(){
    $("script.reload").each(function(){
        var $url = this.src;
        $.getScript($url,function(){
            console.log($url);
        });
    });
}
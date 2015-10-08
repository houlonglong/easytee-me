function isWechat() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}
function YFshare(config) {
    var share = $('#YF-share');
    if (share.length == 0)return;
    console.log(activity)
    config = config || {
            title: encodeURIComponent('很不错的T恤-“'+activity.name+'”,距离抢购结束仅剩' +activity.time+'天啦,喜欢的可要赶紧拉O(∩_∩)O@易衫网'),
            url: encodeURIComponent(window.location.href),
            pic: encodeURIComponent(img_url),
            pics:encodeURIComponent(img_url),
            description: encodeURIComponent(activity.description),
            appkey: {
                "weibo": 889544367
            }
        };

    var url = {
        "weibo": "http://v.t.sina.com.cn/share/share.php?title="+config.title+"&url="+config.url+"&pic="+config.pic+"&summary="+config.description,
        "qq": "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?desc="+config.description+"&title="+config.title+"&url="+config.url+"&pics="+config.pic+"&summary="+config.description,
        "wechat": "",
        "douban": "http://www.douban.com/share/service?image="+config.pic+"&href="+config.url+"&name="+config.title+"&text="+config.description,
        "renren":"http://widget.renren.com/dialog/share?title="+config.title+"&resourceUrl="+config.url+"&srcUrl="+config.url+"&thumbnail_url="+config.pic+"&pic="+config.pic+"&summary="+config.description
    };

    var callback = function () {

    };

    share.find('a').each(function () {
        var $this = $(this);
        var type = $this.attr('share');
        if(type=='wechat'){
            if(isWechat()){
                //微信环境下
                var div = $('<div id="qrcode" style="display:none;position: fixed;top:0;left:0;width:100%;height:100%;background-color: rgba(0,0,0,0.8);z-index:9999"><img src="/resources/public/image/wechat_tip.png" style="width:100%;"/></div>');
                div.click(function(){
                    $(this).hide();
                });
                $('body').append(div);
                $this.click(function(){
                    $('#qrcode').css({
                        display:'block'
                    });
                    return false;
                });
            }else{
                var div = $('<div id="qrcode" style="border: 15px solid #ccc;background-color: #fff;padding: 10px;position: fixed;top:50%;left:50%;margin-left:-153px;margin-top:-153px;display: none"></div>');
                $('body').append(div);
                $('#qrcode').qrcode(window.location.href);
                $this.on('mousedown',function(){
                    $('#qrcode').css({
                        display:'block'
                    });
                    return false;
                });
                $('body').on('touchstart mousedown',function(){
                    $('#qrcode').hide();
                });
            }
        }else{
            var u = url[type];
            if (config.appkey && config.appkey[type]) u += '&appkey=' + config.appkey[type];
            $this.attr({
                "target": "_blank",
                "href": u
            });
        }

    });

}
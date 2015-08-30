
/**
 * 检查是否是微信环境下
 * @returns {boolean}
 */
function isWechat() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

function greatSvgPreView(shirt,color,design){
    color?color = 'background-color:#'+color:'';
    var str = '<svg height="100%" width="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  style="overflow: hidden; position: relative;'+ color +'" viewBox="-145 -90 500 500" preserveAspectRatio="xMidYMid meet">' +
            '<rect></rect>'+
        '<image x="-145" y="-90" width="500" height="500" preserveAspectRatio="none" xlink:href="' + shirt + '" transform="matrix(1,0,0,1,0,0)"></image>';
    if(design){
        str +='<image x="0" y="0" width="202.5" height="270" preserveAspectRatio="none" xlink:href="' + design + '" transform="matrix(1,0,0,1,0,0)"></image>';
    }
    str +='</svg>';
    str = ''+str;
    return str;
}

/**
 * 倒计时，获取验证码
 * @param 需要禁用的对象
 */
function smsCountDown(el) {
    var time;
    if(!$.cookie("Captcha")){
        return false;
    }else{
        time = $.cookie("Captcha");
    }
    var getCaptcha = $(el);
    var conutDown = function () {
        time--;
        if (time > 0) {
            $.cookie("Captcha",time,{path:"/"});
            getCaptcha.attr('disabled', true).text('(' + time + '秒)后重新获取');
        } else {
            $.cookie("Captcha",'0',{path:"/"});
            clearInterval(timer);
            getCaptcha.attr('disabled', false).text('获取验证码');
        }

    };
    var timer = window.setInterval(conutDown, 1000);
}
/**
 *
 * @param title     可以传入html内容，为空则不显示title
 * @param content   可以传入http，或者html内容，为空则不显示body
 * @param footer    可以为空，为空则不显示弹层的footer。示例：{cancel:{show:false,callback:function(){}},ok:{show:false,callback:function(){}}}
 * @param callback  对话框显示之后调用。
 * @param option   newmodal表示创建一个新的模式对话框，传入的值作为对话框的ID。{newmodal:false,size:'modal-sm|modal-lg',autohide:2000}
 * @return  modal
 */
function popup(title, content, footer, option, onshow, onhide) {
    title = title || false,
            content = content || false,
            footer = footer;

    var modal;

    if (option && option.newmodal) {
        modal = $('#' + option.newmodal);
        if (modal.length == 0) {
            modal = $($('#modal').html());
            modal.attr('id', option.newmodal);
            modal.appendTo('body');
        }


    } else {
        modal = $('#publicmodal');
        if (modal.length == 0) {
            modal = $($('#modal').html());
            modal.attr('id', 'publicmodal').appendTo('body');
        }
    }
    if (option) {
        if (option.size) {
            modal.find('.modal-dialog').removeClass('modal-sm,modal-lg').addClass(option.size)
        }
        if (option.autohide) {
            window.setTimeout(function () {
                modal.modal('hide');
            }, option.autohide)
        }
        if (!option.backdrop) {
            modal.modal({backdrop: false})
        }

    }

    modal.find('.modal-title').hide();
    modal.find('.modal-body').hide();
    modal.find('.modal-footer').hide();
    modal.find('.modal-footer .btn').hide();
    if (title) {
        modal.find('.modal-title').text(title).show()
    }
    if (footer && footer.cancel) {
        if (footer.cancel.show) {
            modal.find('.modal-footer').show().find('.easytee-modal-cancel').show();
        }
        if (footer.cancel.text) {
            modal.find('.modal-footer').show().find('.easytee-modal-cancel').text(footer.cancel.text);
        } else {
            modal.find('.modal-footer').show().find('.easytee-modal-cancel').text('取消');
        }
        if (footer.cancel.className) {
            modal.find('.modal-footer').show().find('.easytee-modal-cancel').removeClass('btn-default').addClass(footer.cancel.className);
        }
            modal.find('.modal-footer .easytee-modal-cancel').off('click').click(function () {
                modal.find('.modal-footer .easytee-modal-ok').button('reset');
                typeof(footer.cancel.callback) == 'function'?footer.cancel.callback(modal, this):null;
            });
    }
    if (footer && footer.ok) {
        if (footer.ok.show) {
            modal.find('.modal-footer').show().find('.easytee-modal-ok').show();
        }
        if (footer.ok.text) {
            modal.find('.modal-footer').show().find('.easytee-modal-ok').text(footer.ok.text);
        } else {
            modal.find('.modal-footer').show().find('.easytee-modal-ok').text('确定');
        }
        if (footer.ok.className) {
            modal.find('.modal-footer').show().find('.easytee-modal-ok').removeClass('btn-primary').addClass(footer.ok.className);
        }
            modal.find('.modal-footer .easytee-modal-ok').off('click').click(function () {
                $(this).button('loading');
                typeof(footer.ok.callback) == 'function'?footer.ok.callback(modal, this):null;
            });
        
    }

    if (content) {
        var modalBody = modal.find('.modal-body');
        modalBody.show();
        if (content.toLowerCase().substring(0, 1) == '/' || content.toLowerCase().substring(0, 4) == 'http') {
            modalBody.addClass('ajax-loading');
            $.ajax({
                url: content,
                success: function (str) {
                    modalBody.removeClass('ajax-loading').html(str);
                },
                error: function () {
                    alert('因为网络问题登录失败，请重试！');
                    modalBody.removeClass('ajax-loading');
                    return false;
                }
            });
        } else {
            modal.find('.modal-body').html(content);
        }
    }
    modal.modal('show');
    if (onshow && typeof(onshow)=='function') {
        modal.find('.modal-footer .easytee-modal-ok').button('reset');
        onshow(modal);
    }
    if (onhide && typeof(onhide)=='function') {
        onhide(modal);
    }
    return modal;
}
/**
 * 第三方登录接口
 * @param type 登录类型
 * @param reurl  返回地址
 * @returns {boolean}
 */

function authLogin(type, reurl) {
    var location = window.location;
    reurl = reurl == '' ? location.href : reurl;
    if (window.parent) {
        location = window.parent.location;
    }
    if (type == 'wechat') {
        if (isWechat()) {
            location.href = "/auths/wechat/mobile?relurl=" + escape(reurl);
        } else {
            location.href = "/auths/wechat/web?relurl=" + escape(reurl);
        }
    }else{
        location.href = "/auths/" + type + "?relurl=" + escape(reurl);
    }



    return false;
}



/**
 * $.unserialize
 *
 * Takes a string in format "param1=value1&param2=value2" and returns an object { param1: 'value1', param2: 'value2' }. If the "param1" ends with "[]" the param is treated as an array.
 *
 * Example:
 *
 * Input:  param1=value1&param2=value2
 * Return: { param1 : value1, param2: value2 }
 *
 * Input:  param1[]=value1&param1[]=value2
 * Return: { param1: [ value1, value2 ] }
 *
 * @todo Support params like "param1[name]=value1" (should return { param1: { name: value1 } })
 */
(function ($) {
    $.unserialize = function (serializedString) {
        var str = decodeURI(serializedString);
        var pairs = str.split('&');
        var obj = {}, p, idx, val;
        for (var i = 0, n = pairs.length; i < n; i++) {
            p = pairs[i].split('=');
            idx = p[0];

            if (idx.indexOf("[]") == (idx.length - 2)) {
                // Eh um vetor
                var ind = idx.substring(0, idx.length - 2)
                if (obj[ind] === undefined) {
                    obj[ind] = [];
                }
                obj[ind].push(p[1]);
            }
            else {
                obj[idx] = p[1];
            }
        }
        return obj;
    };
})(jQuery);
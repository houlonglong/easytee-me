function showSizeChang($this) {
    var v = $this.value;
    $('.size-modal .tab-content .tab-pane').hide()
    $('.size-modal .tab-content #' + v).show();
}

function greatSvgPreViewNew(shirt,color,design,region){
    color?color = 'background-color:#'+color:'';
    var str = '<svg height="100%" width="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  ' +
        'style="overflow: hidden; position: relative;'+ color +'" ' +
        'viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet">' +
        '<rect></rect>'+
        '<image x="0" y="0" width="500" height="500" preserveAspectRatio="none" xlink:href="' + shirt + '" transform="matrix(1,0,0,1,0,0)"></image>';
    if(design){
        if(region){
            region = region.split(",");
            var x = region[0]/2;
            var y = region[1]/2;
            design = '<svg x="'+x+'" y="'+y+'" '+design.substring(4);
            //console.log(region, x,y);
        }
        //console.log(products.select,region);
        str += design;
    }
    str +='</svg>';
    str = ''+str;
    return str;
}

function showdetail(typ) {
    var nav = $('.activity-detail-nav');
    $('body').animate({
        scrollTop: nav.offset().top
    }, 200);
    nav.find('a[href=' + typ + ']').parents('li').addClass('active').siblings().removeClass('active');
    $(typ).show().siblings().hide();
}

/**
 * 活动支持者翻页
 * @returns {undefined}
 */
function activityPage(page, url) {
    url = url || '';
    if (url == '') {
        url = '/Activity/getSupporter/' + activity.id + '?page=' + page;
    }
    $.ajax({
        url: url,
        type: 'get',
        success: function (str) {
            $('#supporter').removeClass('ajax-loading').html(str);
        },
        error: function () {
            $('#supporter').removeClass('ajax-loading').html('因为网络问题登录失败，请重试！');
            return false;
        }
    });
}


//初始化产品下拉框
function initProductSelect() {
    var option = '';
    products && products.prductList && $.each(products.prductList, function (a, b) {
        option += '<option value="' + b.id + '" ' + (a == 0 ? 'selected' : '') + '>' + b.name + '</option>';
    });
    return option;
}
//初始化款式下拉框
function initStyleSelect(shirt_style) {
    var option = '';
    var proSelect = shirt_style.parents('tr').find('.shirt-pro'), pid = proSelect.val();
    products && products.prductList && $.each(products.prductList, function (a, b) {
        //console.log(b);
        if (b.id == pid) {
            $.each(b.style, function (c, d) {
                option += '<option value="' + d.id + '" ' + (c == 0 ? 'selected' : '') + ' data-size="' + d.size.join(";") + '" data-image="' + d.image.front + '" data-price="' + d.price + '" >' + (d.name ? d.name : d.color_name) + '</option>';
            });
            return false;
        }

    });
    return option;
}

//初始化尺码下拉框
function initSizeSelect(shirt_sizes) {
    var option = '<option value=""selected>请选择</option>', tr = shirt_sizes.parents('tr');
    var size = tr.find('.shirt-style option:selected').attr('data-size');
    var priceTD = tr.find('.shirt-price');
    size && $.each(size.split(";"), function (a, b) {
        option += '<option value="' + b + '" ' + (a == 0 ? '' : '') + '>' + b + '</option>';
    });
    priceTD.text(get_item_total_price(tr) + '元');
    return option;
}
function get_item_total_price(tr) {
    var price = tr.find('.shirt-style option:selected').attr('data-price');
    tr.attr("data-price", price);
    var nums = parseInt(tr.find('.shirt-nums').val());
    if (nums <= 0) {
        alert("数量至少为1件");
        tr.find('.shirt-nums').val(1);
        nums = 1;
    }
    return price * nums;
}
function get_color_name(obj) {
    return $("option:selected", obj).text();
}
function get_style_name(obj) {
    return $("option:selected", obj).text();
}
function get_image_url(obj) {
    return $("option:selected", obj).data("image");
}
function get_product_list(form) {
    var rows = [];
    var t = {};
    $("tbody>tr", form).each(function () {
        console.log($(this), $(this).data("price"));
        var row = {
            product_id: $(".shirt-pro", this).val(),
            style_id: $(".shirt-style", this).val(),
            style_name: get_style_name($(".shirt-pro", this)),
            size: $(".shirt-sizes", this).val(),
            price: $(this).data("price"),
            color_name: get_color_name($(".shirt-style", this)),
            image: get_image_url($(".shirt-style", this))
        };
        var nums = parseInt($(".shirt-nums", this).val());
        var key = row['product_id'] + "" + row['style_id'] + "" + row['size'];
        if (t[key] == undefined) {
            t[key] = {
                nums: nums,
                row: row
            };
        } else {
            t[key]['nums'] = t[key]['nums'] + nums;
        }
        //console.log(row);

    });
    for (key in t) {
        var row = t[key]['row'];
        row['nums'] = t[key]['nums'];
        rows.push(row);
    }
    //console.log(rows,t);
    return JSON.stringify(rows);
}

function callOrder() {
    var win = $($('#style-number-template').html());
    var shirt_pro = win.find(".shirt-pro"), shirt_style = win.find(".shirt-style"), shirt_sizes = win.find('.shirt-sizes');
    var option;
    option = initProductSelect(shirt_pro), shirt_pro.append(option);
    option = initStyleSelect(shirt_style), shirt_style.append(option);
    option = initSizeSelect(shirt_sizes), shirt_sizes.append(option);
    var content = win.html();
    //console.log(content);
    popup('选择尺码 & 款式', content, {
        cancel: {
            show: true,
            callback: function (modal, btn) {
                $(btn).button('reset');
            }
        }, ok: {
            show: true, callback: function (modal, btn) {
                btn = $(btn);
                btn.attr('data-loading-text', '正在处理...');
                var tip = $('#chang-style-number .alert');
                tip.empty();
                var error = 0;
                $('#chang-style-number tbody tr').each(function () {
                    var _this = $(this);

                    if (_this.find('.shirt-nums').val() < 1) {
                        tip.append('<p>数量不能小于1</p>').show();
                        _this.find('.shirt-nums').focus();
                        error++
                    }

                    if (_this.find('.shirt-sizes').val() == '') {
                        tip.append('<p>请选择尺码</p>').show();
                        _this.find('.shirt-sizes').focus();
                        error++
                    }
                });

                if (error == 0) {
                    btn.button('loading');
                    var form = modal.find('form');
                    var data = get_product_list(form);
                    $.cookie("act_order_form", data, {path: "/"});
                    window.location.href = "/order?act_id=" + activity.id;
                } else {
                    btn.button('reset');
                }
            }
        }
    }, {
        newmodal: 'chang-style-number',
        size: 'modal-lg',
        backdrop: true
    }, null, function (modal) {
        modal.find('.easytee-modal-ok').button('reset');
    });

    /**
     * @param title     可以传入html内容，为空则不显示title
     * @param content   可以传入http，或者html内容，为空则不显示body
     * @param footer    可以为空，为空则不显示弹层的footer。示例：{cancel:{show:false,callback:function(){}},ok:{show:false,callback:function(){}}}
     * @param callback  对话框显示之后调用。
     * @param option   newmodal表示创建一个新的模式对话框，传入的值作为对话框的ID。{newmodal:false,size:'modal-sm|modal-lg',autohide:2000}
     * @return  modal
     */

}


//活动初始化
function activityInit() {
    var sid = products.defaultProductStyleId, pid;
    $.each(products.prductList, function (index, item) {
        $.each(item.style, function (index, style) {
            if (sid && style.id == sid) {
                pid = item.id;
            }
        })
    });
    var product = getProductStyle(pid), sid = product.style[0].id, side = product.style[0].has_design ? product.style[0].has_design[0] : 'front';
    products.select = {
        pid: pid,
        sid: sid,
        side: side
    };
    var product = $('#chang-product');
    var ii = 0;
    products && products.prductList && $.each(products.prductList, function (index, item) {
        var li = $('<li data-id="' + item.id + '">' + item.name + '</li>');
        if (ii == 0) {
            li.addClass('active');
        }
        product.append(li);
        ii++;
    });
    initProductStyle(pid);
    setPreviewPhoto(pid, sid);
}


//初始化产品数据
function initProductStyle(pid) {
    var pro = getProductStyle(pid), styleList = $("#chang-style");

    styleList.empty();
    pro && $('#detail').html(pro.description) && pro.style && $.each(pro.style, function (index, item) {
        var li = $('<li data-id="' + item.id + '"></li>');
        $.each(item.colors, function () {
            li.append('<div title="'+item.color_name+'" style="position:relative;background-color:#' + this.name + ';width:' + this.accounting + '%">' +
                '' +
                '</div>');
        });

        if (index == 0) {
            li.addClass('active');
            $('.activity-price em').text(item.price);
        }
        styleList.append(li);
    });
}

//选择了产品款式
function changProduct(pid) {
    var product = getProductStyle(pid), sid = product.style[0].id, side = products.select.side || (product.style[0].has_design ? product.style[0].has_design[0] : 'front');
    products.select = {
        pid: pid,
        sid: sid,
        side: side
    }
    initProductStyle(pid);
    setPreviewPhoto(pid);

}


//选择了款式颜色
function changStyle(sid) {
    setPreviewPhoto(products.defaultProductId, sid);
}


//获取指定的产品和款式
function getProductStyle(pid, sid) {
    var pro = {}, sid = sid || null;
    $.each(products.prductList, function (index, item) {
        if (pid && item.id == pid) {
            pro.product = item;
            $.each(item.style, function (index, style) {
                if (sid == null && index == 0) {
                    sid = style.id
                }
                if (sid && style.id == sid) {
                    pro.style = style;
                }
            })
        };
    });
    if (pro.product) {
        pro = pro.product;
    }

    return pro;
}

//更新到产品橱窗
function setPreviewPhoto(pid, sid, side) {

    if (pid) {
        products.select.pid = pid;
    } else {
        pid = products.select.pid;
    }
    if (sid) {
        products.select.sid = sid;
    } else {
        sid = products.select.sid
    }
    if (side) {
        products.select.side = side;
    } else {
        side = products.select.side || 'front';
    }

    var product = getProductStyle(pid, sid);
    product && ($('#detail').html(product.description)) && product.style && $.each(product.style, function (index, style) {
        if (sid == style.id) {
            var image = style.image, colors = style.colors, bgColor;
            var photoSide = products.select.side || style.has_design[0];

            if (colors && colors.length == 1) {
                bgColor = colors[0].name;
            } else {
                bgColor = "FFFFFF";
            }
            if(photoSide != undefined){
                loadProductPhoto(image[photoSide], bgColor, activity.design[side])

            }
            var i = 0, li = '';
            for (side in image) {

                li += '<li ' + (photoSide == side ? ' class="active"' : '') + ' side="' + side + '">';
                li += (activity && activity.create_image && activity.create_image == '1') ? '<img class="img-responsive" src="' + image[side] + '"/>' : greatSvgPreViewNew(image[side], bgColor, activity.design[side],style.regions[side]);
                li += '</li>';
                i++;
            }
            $(".activity-showbox-imglist").html(li);
        }
    });
}

//载入产品图片时的效果
function loadProductPhoto(src, bgColor, design) {

    var img = new Image(), photoBox = $('.activity-showbox-photo');
    photoBox.find('.activity-loading').show();
    img.onload = function () {
        photoBox.find('.activity-loading').hide();
        if (activity && activity.create_image && activity.create_image == '1') {
            photoBox.find('svg,img').replaceWith('<img class="img-responsive" src="' + src + '"/>');
        } else {

            var styles = products.prductList[products.select.pid].style;

            var region = null;
            $.each(styles, function (index, style) {
                if(style.id == products.select.sid){
                    region = style.regions[products.select.side];
                }
            });

            photoBox.find('svg').replaceWith(greatSvgPreViewNew(src, bgColor, design,region));
        }

    };
    img.onerror = function () {
        img.src = '/resources/theme/activity/image/no-photo.png';
    };
    img.src = src;
}

function getPics(all){
    var pic;
    for(var i in products.prductList){
        pic = all?products.prductList[i].style[0].image.front +'||'+products.prductList[i].style[0].image.back:products.prductList[i].style[0].image.front;
        continue;
    }
    return pic
}

function YFshare(config) {
    var share = $('#YF-share');
    if (share.length == 0)return;
    config = config || {
        title: encodeURIComponent('很不错的T恤-“'+activity.title+'”,距离抢购结束仅剩' +activity.time+' 啦,喜欢的可要赶紧拉O(∩_∩)O@易衫网'),
        url: encodeURIComponent(window.location.href),
        pic: encodeURIComponent(getPics()),
        pics:encodeURIComponent(getPics(true)),
        description: encodeURIComponent(activity.abstract),
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

$(function () {
    $('#showsize').click(function () {
        popup('尺码表', '/Activity/sizes/?activityId=' + activity.id, {
            ok: {show: true,callback:function(a){
                a.modal('hide');
            }},
            cancel: {show: false}
        }, {newmodal: 'sizemodel', size: 'modal-lg', autohide: false, backdrop: true});
        return false;
    });
    activityInit();
    $(document).on('click', '.activity-showbox-imglist li', function () {
        $(this).addClass('active').siblings('li').removeClass('active');
        products.select.side = $(this).attr('side');
        setPreviewPhoto(products.select.pid, products.select.sid, products.select.side);
    }).on('click', '#chang-product li', function () {
        $(this).addClass('active').siblings('li').removeClass('active');
        var pid = $(this).attr('data-id');
        changProduct(pid);
    }).on('click', '#chang-style li', function () {
        $(this).addClass('active').siblings('li').removeClass('active');
        var sid = $(this).attr('data-id');
        changStyle(sid);
    }).on('change', '.shirt-pro', function () {
        var style = $(this).parents('tr').find('.shirt-style')
        var option = initStyleSelect(style);
        style.html(option);

        var sizes = $(this).parents('tr').find('.shirt-sizes');
        option = initSizeSelect(sizes);
        sizes.html(option);

    }).on('change', '.shirt-style', function () {
        var sizes = $(this).parents('tr').find('.shirt-sizes');
        var price = $(this).attr('.shirt-price'), priceTD = $(this).parents('tr').find('.shirt-price');
        var option = initSizeSelect(sizes);
        sizes.html(option);

    }).on('change', '.shirt-nums', function () {
        var tr = $(this).parents('tr');
        var priceTD = tr.find('.shirt-price');
        priceTD.text(get_item_total_price(tr));
    }).on('click', '.add-style', function () {
        var table = $('#chang-style-number-form table');
        var tr = table.find("tbody tr:first").clone();
        tr.find('.icon-delete').show();
        table.append(tr);
        return false;
    }).on('click', '.icon-delete', function () {
        $(this).parents('tr').animate({
            opacity: 'toggle'
        }, 300, function () {
            $(this).remove();
        });
        return false;
    });
    $(".activity-showbox-imglist").children().eq(0).click()
    $('#Preorder').click(function () {
        callOrder();
    });
    activityPage(1);//载入支持者

    window.setTimeout(function(){ YFshare();},1000)


});
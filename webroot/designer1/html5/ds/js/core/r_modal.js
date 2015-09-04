var modals = {
    landingPage: "/ds/html/modals/landingPage.html",
    addNote: "/ds/html/modals/addNote.html",
    browseProducts: "/ds/html/modals/browseProducts.html",
    browseProductsSingle: "/ds/html/modals/browseProductsSingle.html",
    clipArt: "/ds/html/modals/clipArt.html",
    designIdeas: "/ds/html/modals/designIdeas.html",
    designsAndClipArt: "/ds/html/modals/designsAndClipArt.html",
    getQuote: "/ds/html/modals/getQuote.html",
    login: "/ds/html/modals/login.html",
    namesAndNumbers: "/ds/html/modals/namesAndNumbers.html",
    productCategories: "/ds/html/modals/productCategories.html",
    saveAndShare: "/ds/html/modals/saveAndShare.html",
    saveAndShareEmail: "/ds/html/modals/saveAndShareEmail.html",
    myArt: "/ds/html/modals/myArt.html",
    saveAndNameDesign: "/ds/html/modals/saveAndNameDesign.html",
    cartLogin: "/ds/html/cart/cartLogin.html",
    cartRegister: "/ds/html/cart/cartRegister.html",
    emailDesign: "/ds/html/cart/emailDesign.html",
    enterAddresses: "/ds/html/cart/enterAddresses.html",
    enterPayment: "/ds/html/cart/enterPayment.html",
    shippingMethod: "/ds/html/cart/shippingMethod.html",
    reviewOrder: "/ds/html/cart/reviewOrder.html",
    saveDesign: "/ds/html/cart/saveDesign.html",
    selectSizes: "/ds/html/cart/selectSizes.html",
    shareDesign: "/ds/html/cart/shareDesign.html",
    viewCart: "/ds/html/cart/viewCart.html",
    printReceipt: "/ds/html/cart/printReceipt.html",
    viewTestCaseXml: "/ds/html/cart/viewTestCaseXml.html",
    colorPicker: "/ds/html/modals/colorPicker.html",
    video: "/ds/html/modals/video.html",
    chooseNumberOfColors: "/ds/html/modals/uploader/chooseNumberOfColors.html",
    embroideryMapColors: "/ds/html/modals/uploader/embroideryMapColors.html",
    matchAndCombineColors: "/ds/html/modals/uploader/matchAndCombineColors.html",
    mobileUploadFromDevice: "/ds/html/modals/uploader/mobileUpload.html",
    mobileUploadConfirm: "/ds/html/modals/uploader/mobileUploadConfirm.html",
    selectImageType: "/ds/html/modals/uploader/selectImageType.html",
    uploaderLanding: "/ds/html/modals/uploader/uploaderLanding.html",
    colorOrBW: "/ds/html/modals/uploader/colorOrBW.html",
    warningProduct: "/ds/html/modals/warningProduct.html",
    saveDesignTip: "/ds/html/modals/saveDesignTip.html",
    addressList: '/ds/html/modals/addressList.html',
    address: '/ds/html/modals/address.html',
    upImageLoading: "/ds/html/modals/uploader/upImageLoading.html"

};

function showModal(b, d, c, g) {
    d = state.theme.url(ezdVars.DesignerLocation + modals[b]);
    "colorPicker" != b && $(".isd-modalContainer").hide();
    (function() {
        for (var b = $("div.isd-modalContainer"), c = 0; c < b.length; c++) {
            var d = $(b[c]);
            if ("designIdeas" != d[0].id && "clipArt" != d[0].id) {
                for (var d = d.find("div[ng-controller]"), g = 0; g < d.length; g++) {
                    var k = $(d[g]).scope();
                    k && k.beforeClose && k.beforeClose();
                    k && k.close && k.close();
                }
            }
        }
    })();
    var k = $("#" + b);
    if (k.length) {
        if ("designIdeas" == b || "clipArt" == b || "colorOrBW" == b) {
            k.show();
            return;
        }
        k.remove();
    }
//    state.designer.hideBB();
    $.get(d, function(d) {
        var f = angular.element("#angularAppElement").scope().$new();
        if (g) {
            for (var k in g) {
                f[k] = g[k];
            }
        }
        f.close = function() {
            f.beforeClose && f.beforeClose();
            if ("designIdeas" == b || "clipArt" == b) {
                $("#" + b).modal('hide')
            } else {
                if (b == 'chooseNumberOfColors' || b == 'colorOrBW') b = "selectImageType";
                ($("#" + b).modal('hide'), $("#" + b).on('hidden.bs.modal', function(e) {
                    $("#" + b).remove()
                }), f.$destroy());
            }
        };
        f.sendEvent = function(b, c) {
            eventManager.trigger(b, c);
            f.close();
        };
        f.centerModal = function(c) {
            c || (c = $("#" + b + " .isd-light-container"));
            var d = $("#angularAppElement").height(),
                f = c.height();
            c.css("top", Math.max(2, d - f) / 2 + "px");
        };
        d = $(d)[0];
        c(d)(f);
        if (b == 'chooseNumberOfColors' || b == 'colorOrBW') {
            var $modeal = $('#selectImageType');
            $modeal.find('.modal-content').empty();
        } else {
            var $modeal = $('<div class="modal fade" tabindex="-1" data-backdrop="false" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" id="' + b + '"><div class="modal-dialog modal-lg"><div class="modal-content"></div> </div></div>');
        }
        f.$$destroyed || ($modeal.find('.modal-content').append(d), $modeal.appendTo('#dsContainer'), hideModalDrawer("#" + b), f.$apply());
        g && g.noCenter || setTimeout(function() {
            f.centerModal();
        }, 10);
    });
}

function hideModalDrawer(b) {
    if (!b) {
        b = '.modal';
    }

    if ($(b + ":visible").length) {
        $(b).modal('hide');
    } else {
        $(b).modal('show');
    }
}

function showModalDrawer(b, d, c, g, k, h, attr) {
    d = state.theme.url(ezdVars.DesignerLocation + modals[b]);
    var f = $("#drawersContainer");
    if (!$("#" + b + ":visible").length || g && g.noToggleOnClick) {
        hideModalDrawer("#" + b);
        var m = function(c) {
            hideModalDrawer("#" + b);
        };
//        state.designer.hideBB();
        k = $("#" + b);
        if (k.length) {
            for (d = k.find("div[ng-controller]"), k = 0; k < d.length; k++) {
                var q = $(d[k]).scope();
                if (q && q.onShow) {
                    if (g) {
                        for (var n in g) {
                            q[n] = g[n];
                        }
                    }
                    if ("clipArt" == b) {
                        $('.isd-clipart-category-list').removeClass('active')
                    }
                    q.onShow(g, attr);
                }
            }
        } else {
            $.get(d, function(d) {
                var f = angular.element("#angularAppElement").scope().$new();
                if (g) {
                    for (var k in g) {
                        f[k] = g[k];
                    }
                }
                f.close = function() {
                    f.beforeClose && f.beforeClose();
                    hideModalDrawer("#" + b);
                };
                f.centerModal = function(b) {};
                d = $(d)[0];
                c(d)(f);
                var $modeal = $('<div class="modal fade" tabindex="-1" data-backdrop="false" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" id="' + b + '"><div class="modal-dialog modal-lg"><div class="modal-content"></div> </div></div>');
                f.$$destroyed || ($modeal.find('.modal-content').append(d), $modeal.appendTo('#dsContainer'), f.$apply());
                m($("#" + b));
                h && h();
                //add by hl
                var modalElement = $('#'+b);
                if(modalElement.length>0){
                    var ngScope = modalElement.find('div[ng-controller]');
                    for(var i=0; i<ngScope.length; i++){
                        var ngScope = $(ngScope[i]).scope();
                        ngScope.onShow(null, attr);
                    }
                }
            });
        }
    } else {
        hideModalDrawer("#" + b);
    }
};

function showColorModal(b, d, c, g, event) {
    if($(".ds-colorPicker").length !=0){
        $(".ds-colorPicker").remove();
    }else{
        var k = g.currentColor,
            h = g.onSelect,
            f = g.allowTransparent,
            m = g.onlyNames,
            q = g.onlyNumbers,
            n = b.$new();
//        n.designColors = state.dsUtils.getColorsInUse(null, !1, !1);
//        g.embroidery ? (n.designColors = state.dsUtils.getColorsInUse(null, !1, !1), service.getStoreThreadChartColors(state.selectedThreadChartName || state.threadCharts[0].Name)) : (n.designColors = state.dsUtils.getColorsInUse(null, !1, !1), n.otherColors = angular.copy(state.storeInkColors));

        n.designColors = [];
        n.otherColors = angular.copy(state.storeInkColors);
        var sides = state.designer.sides;
        for(var i=0; i<sides.length; i++){
            var side = sides[i];
            var elements = side.elements;
            for(var j=0; j<elements.length; j++){
                var element = elements[j];
                if(element instanceof ui.text.TextElement){
                    if(element.stroke != 0){
                        n.designColors.push(element.strokeColor);
                    }
                    n.designColors.push(element.color);
                }
//                if(element instanceof ui.svg.SvgElement || element instanceof ui.bitmap.BitmapElement){
//                    for(var n=0; n<element.colors.length; n++){
//                        n.designColors.push(element.colors[n]);
//                    }
//                }
            }
        }
        n.designColors = n.designColors.unique();
        n.currentColor = k;
        n.currentColorName = c.getColorName(k);
        n.allowTransparent = f;
        n.otherColorCurrent = "-----";
        n.colorsInUseCurrent = "-----";
        normalizeColorStrings(n.designColors);
        n.currentColor = normalizeColorStrings(n.currentColor);
        if (m || q) {
            for (b = 0; b < n.otherColors.length; b++) {
                g = n.otherColors[b], m && "0" == g.name_color && (n.otherColors.splice(b, 1), b--), q && "0" == g.number_color && (n.otherColors.splice(b, 1), b--);
            }
            for (b = 0; b < n.designColors.length; b++) {
                var r = getColorString(n.designColors[b]);
                g = findMatch(n.otherColors, function(b) {
                    return r == getColorString(b.html_color);
                });
                g || (n.designColors.splice(b, 1), b--);
            }
        }
        n.selectColor = function(b) {
//            switch(state.designer.activeSide.name){
//                case 'third':
//                    sideName = 'left';
//                    break;
//                case 'fourth':
//                    sideName = 'right';
//                    break;
//                default:
//                    sideName = state.designer.activeSide.name;
//            }
//            var ColorData = state.dsUtils.getPricingColorData();
//            var activeRegionColors = ColorData.usrColors[sideName].length;
            if(getDesignColors() >= 10){
                n.close();
                alert("您添加的设计颜色数量超过了10种，为了保证印刷质量，请保证设计颜色数量不超过10种。\n或咨询客服：400-920-2085 协助您解决。");
                return false;
            }
            h && h(b);
            m || q || eventManager.trigger("designColorsChanged");
            n.close();
        };
        n.colorsInUseHover = function(b) {
            n.colorsInUseCurrent = c.getColorName(b);
        };
        n.colorsInUseLeave = function() {
            n.colorsInUseCurrent = "-----";
        };
        n.otherColorHover = function(b) {
            n.otherColorCurrent = c.getColorName(b);
        };
        n.otherColorLeave = function() {
            n.otherColorCurrent = "-----";
        };
        b = state.theme.url(ezdVars.DesignerLocation + "/ds/html/modals/colorPicker.html");
        $(".ds-colorPicker").length && $(".ds-colorPicker").remove();
        $.get(b, function(b) {
            n.close = function() {
                $(".ds-colorPicker").remove();
                n.$destroy();
            };
            b = $(b)[0];
            d(b)(n);

            $(event.currentTarget).parent().addClass('open').find('.ds-colorPicker').remove();
            $(event.currentTarget).parent().append(b);
            n.$apply();

        });
    }

}
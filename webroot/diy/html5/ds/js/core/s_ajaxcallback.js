var hideLoader = null;
var pendingAjaxCalls = [];
var excludedAjaxCalls = "LogOff CheckMobileUpload GetStoreDesignerToolTips GetFontList GetCartBillingCountryList GetCartShippingCountryList GetCartBillingStateList GetCartShippingStateList".split(" ");

function hideLoaderForNext() {
    hideLoader = {};
}

function ajaxCallStarted(b, d, c) {
//    console.debug('ajaxCallStarted ------> ', b, d, c);
    if (!(0 <= excludedAjaxCalls.indexOf(b))) {
        if (hideLoader && !hideLoader.methodName) {
            hideLoader.methodName = b;
        } else {
            d = d || "载入中，请稍等...";
            if(d == '载入中，请稍等...'){
                debugger;
            }
            pendingAjaxCalls.push(d);
            var g = $("#isd-LoaderContainer");
            b = $("#angularAppElement").height();
            var k = $("#angularAppElement").width();
            g.css("height", b + "px");
            g.css("width", k + "px");
            g.find(".loading-center-text").text(d);
            c || (c = 10);
            0 < c ? setTimeout(function() {
                pendingAjaxCalls.length && g.fadeIn();
            }, c) : g.show();
        }
    }
}
function ajaxCallEnded(b) {
//    console.debug('ajaxCallEnded ------> ', b);
    if(hideLoader && hideLoader.methodName == b){
        hideLoader = null
    }else{
        pendingAjaxCalls.pop();
        setTimeout(function() {
            if(pendingAjaxCalls.length == 0){
                $("#isd-LoaderContainer").fadeOut();
            }
        }, 100);
    }
}
service.ajaxCallStarted = ajaxCallStarted;
service.ajaxCallEnded = ajaxCallEnded;
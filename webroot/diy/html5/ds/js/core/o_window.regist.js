var numErrorsLogged = 0;
window.onerror = function(b, d, c) {
    console && console.log && console.log("错误: " + b + "\n" + d + ":" + c);
    10 > numErrorsLogged && (jQuery.post(service.adjustUrl("/" + (ezdVars && ezdVars.ApiDomain ? ezdVars.ApiDomain : "open.dev.jzw.la/clientapi") + "/DesignerInterface/LogJavascriptError"), {
        msg: b,
        jsUrl: d,
        line: c,
        pageUrl: window.location.href,
        UserToken: ezdVars ? ezdVars.UserToken : null,
        AppToken: ezdVars ? ezdVars.AppToken : null
    }), numErrorsLogged++);
    return !1;
};

var WINDOW_ONBEFOREUNLOAD = function() {
//    console.log('state.selectedDesign: '+ state.selectedDesign);
//    console.log('state.isInitialDesign: '+ state.isInitialDesign);
//    console.log('state.isChangedDesign: '+ state.isChangedDesign);
//    console.log('ezdVars.userToken:', ezdVars.userToken);
    if(ezdVars.UserToken == 0){
//        return "您暂时还未登录哦，系统将为您跳转到登录页面，是否继续？";
    }else{
        if(!state.isDone){
            if (state.selectedDesign) {
                if(state.isInitialDesign || state.isChangedDesign){
                    return "您的设计还没保存，为避免丢失，建议保存后再执行。";
                }
            }
        }
    }
};

window.onbeforeunload = WINDOW_ONBEFOREUNLOAD;

window.console || (window.console = {});
window.console.log || (window.console.log = function() {});
window.console.debug || (window.console.debug = function() {});

window.service = new EasyTeeService({
    domain: ezdVars.ApiDomain,
    sslDomain: ezdVars.SSLApiDomain,
    AppToken: ezdVars.AppToken,
    publisherID: ezdVars.PublisherID,
    AppURI: ezdVars.AppURI,
    addDomainToUrls: true
});
var dsLocation = ezdVars.DesignerLocation + "/ds";
if (!window.state || window.state.designer) {
    console.log('window.state init');
    window.state = {
        selectedDesignID: null,
        selectedDesign: null,
        selectedProductID: null,
        selectedProduct: null,
        selectedProductStyleID: null,
        selectedProductStyle: null,
        fontCategories: null,
        designer: null,
        storeInkColors: null,
        cart: {},
        namesNumbers: null,
        quoteInformation: null,
        currentUserToken: ezdVars.UserToken,
        activeUserToken: ezdVars.UserToken,
        currentSessionToken: ezdVars.SessionToken
    };
}
state.selectedProductID = ezdVars.ProductID;
state.selectedDesignID = ezdVars.DesignID;
state.selectedProductStyleID = ezdVars.ProductStyleID;
state.dsUtils = new ui.DSUtils;

var EasyTeeService = function(b) {

    function d(d) {
        var options = d;
        var e = options.methodName;
        var k = options.parameters;
        var s = options.queryStringParameters||{};
        //s.appKey=b.AppToken;
        var w = options.successRootTagName;
        var v = options.error;
        var x = options.postData;
        var t = options.useSSL;
        var y = options.useAppURI;
        var D = options.returnSync;
        var V;//useCache
        if(typeof b.useCache == 'undefined'){//若全局未设置，则默认开启全局useCache，只能设置true/false。
            b.useCache = true;
        }
        if(b.useCache && options.useCache){//若全局和内部同时开启，启用缓存。
            V = true;
        }else{
            V = false;
        }
        var reqUrl = "";
        switch(e){
            case "GetProduct":
                reqUrl = "api?model=design/tool/beta&action=product_get";
                break;
            case "GetProductCategoryList":
                reqUrl = "api?model=design/tool/beta&action=product_get_cat_list";
                break;
            case "GetProductList":
                reqUrl = "api?model=design/tool/beta&action=product_get_list";
                break;
            case "GetFontList":
                reqUrl = "api?model=design/tool/beta&action=font_get_list";
                break;
            case "GetDesign":
                reqUrl = "design/get";
                break;
            case "GetDesignCategoryList":
                reqUrl = "design/getCategoryList";
                break;
            case "GetDesignCategoryTexts":
                reqUrl = "design/getCategoryTexts";
                break;
            case "GetDesignList":
                reqUrl = "design/getList";
                break;
            case "GetArtList":
                reqUrl = "art/getList";
                break;
            case "GetArtCategoryList":
                reqUrl = "art/getCategoryList";
                break;
            case "GetUserDesignList":
                reqUrl = "user/getDesignList";
                break;
            default:
                reqUrl = e;
        }
        //设置默认错误处理方法
        v || (v = d.error = h);
        //添加appURI
        v = y ? "/" + b.AppURI + "/" : "/";
        t && b.sslDomain && (v = "https://" + b.sslDomain + v);
        //添加请求方法名
        v += reqUrl ;

        if(e =="GetProductList" || e =="GetProduct" || e == 'GetFontList' || e == 'GetProduct'){

        }else{
            //这一段可能和缓存有关
            t = -1;
            for (y = 0; y < k.length; y++) {
                "undefined" != typeof k[y] && k[y] && (t = y);
            }
            for (y = 0; y <= t; y++) {
                "undefined" !== k[y] && k[y] ? k[y] && (v += escape(k[y]) + "/") : v += "0/";
            }
        }

        //如果queryStringParameters不为空,将queryStringParameters的值放到Url参数里。
        var parameters = s;
        if (parameters) {
            var pArr = [];
            for (var pName in parameters) {
                //alert(pName);
                pArr.push(pName+'='+encodeURIComponent(parameters[pName]));
            }
            if(pArr.length > 0){
                if(v.indexOf("?")>0){
                    v += '&' + pArr.join('&');
                }else{
                    v += '?' + pArr.join('&');
                }
            }
        }

        //若使用本地消息
        b.enableLocalFeeds && (v = "../common/data/" + e + ".xml");

        console.log('%c methodName: '+e, 'color:green');
        console.log('%c reqUrl: '+v, 'color:green');

        //loading mask
        service.ajaxCallStarted && service.ajaxCallStarted(e, d.loadingMessage);

        //q默认true，n为缓存对象（请求名—参数名=key, xmlDoc=value）。
        var M = q ? n[f(e, k)] : false;

        //从缓存中找到xmlDocument
        if(V && M){
            //是否开启同步
            if(D){
                c(M, d);//从xmlDocument中获取数据
            }else{
                setTimeout(function() {
                    c(M, d);//从xmlDocument中获取数据
                }, 10)
            }
        }else{
            var dataType = 'xml';
            if(w == 'OK'){//successRootTagName
                dataType = null;
            }
            $.ajax({
                type: x ? 'POST' : 'GET',
                url: m.adjustUrl(v),
                xhrFields: r,
                dataType: dataType,
                data: x,
                success: function(xmlDoc) {
                    console.log('%c 首次请求 url->' + m.adjustUrl(v), 'color:green');
//                    printXmlDocument(xmlDoc);
                    c(xmlDoc, d);//从xmlDocument中获取数据
                },
                error: function(b, e, c) {
                    g(d, b, e, c);
                }
            });
        }
    }

    function printXmlDocument(node){
        if(node == null){
            return;
        }
        var html = $(node.documentElement).html() + '\n';
        console.log(html);
        for(var i=0; i<node.childNodes.length; i++){
            printXmlDocument(node.childNodes[i]);
        }
    }

    //processXmlDocument
    function c(b, e) {
        var c = e.methodName,
            d = e.successRootTagName,
            g = e.deserializationSettings,
            m = e.processResults,
            r = e.success,
            t = e.error;
        service.ajaxCallEnded && service.ajaxCallEnded(c, e.loadingMessage);

        if ("OK" == d && "string" == typeof b && 0 > b.indexOf("<")) {
            r && r(b);
        } else {
            if ("string" == typeof b) {
                if (!b || 0 == b.length) {
                    if (t) {
                        var y = "请求： " + c + " 时服务器返回了长度为 0 的数据，这是不应该的.";
                        t(y, y);
                    } else {
                        alert(y);
                    }
                }
                b = $.parseXML(b);
            }

            var xmlDocument = b;
            var successRootTagName = d;
            var nodeName = c;
            var successRootTagName = d;
            var success = r;
            var error = t;
            c = b.documentElement.nodeName;
            var defaultError = h;
            var nodeName = c;
            if(successRootTagName && successRootTagName != nodeName){
                if(nodeName.toLowerCase() == "error"){
                    if(error){
                        error($(xmlDocument.documentElement).text(), $(xmlDocument.documentElement).text(), null, true);
                    }else{
                        defaultError({}, $(xmlDocument.documentElement).text(), $(xmlDocument.documentElement).text(), true);
                    }
                }else{
                    if(nodeName.toLowerCase() == "errors"){
                        var errorObject = k($(xmlDocument).children()[0], {
                            Error: {
                                name: "errors",
                                mode: "array"
                            }
                        });
                        console.log("调用成功，但返回一个错误: ", errorObject);
                        if(error){
                            error(errorObject.errors, null, null, true);
                        }
                    }
                }
            }else{
                var processResults = m;
                var t = k($(xmlDocument).children()[0], g);
                if(processResults){
                    if(processResults = processResults(t)){
                        t = processResults;
                    }
                }
                if(success){
                    success(t);
                }
                var r = xmlDocument;
                if(q){
                    n[f(e.methodName,e.parameters)] = r;
                }
            }
        }
    }

    //
    function g(b, e, d, f) {
        service.ajaxCallEnded && service.ajaxCallEnded(b.methodName, b.loadingMessage);
        if ("OK" == b.successRootTagName && "parsererror" == d) {
            return c("OK", b);
        }
        b.error ? b.error(e, d, f, false) : h(e, d, f, null);
    }

    function k(b, e) {
        if (!b) {
            return null;
        }
        var c = $(b),
            d = null;
        if (b.attributes && 0 < b.attributes.length || 0 < c.children().length) {
            d = {};
            if (b.attributes) {
                for (var f = 0; f < b.attributes.length; f++) {
                    var g = b.attributes[f].name,
                        h = b.attributes[f].value;
                    if (0 <= h.indexOf("REPLACE_DOMAIN_WITH")) {
                        h = t(h);
                    } else {
                        if ("0" === h || "1" === h) {
                            h = parseInt(h);
                        } else {
                            if ("false" === h.toLowerCase() || "true" === h.toLowerCase()) {
                                h = "true" === h.toLowerCase();
                            }
                        }
                    }
                    d[g] = h;
                }
            }
            0 === c.children().length && c.text().trim() && (d.textValue = c.text());
            c = c.children();
            for (f = 0; f < c.length; f++) {
                var m = c[f];
                $(m);
                h = m.tagName;
                g = null == e || "undefined" == typeof e[h] ? {
                    mode: "array",
                    name: h
                } : e[h];
                "undefined" != typeof g.name && g.name ? h = g.name : h && g && !g.name && (g.name = h);
                m = k(m, e);
                if (d[h]) {
                    (h = d[g.name]) && "undefined" != typeof h.push ? h.push(m) : (d[g.name] = [], d[g.name].push(h), d[g.name].push(m));
                } else {
                    if ("single" == g.mode) {
                        d[g.name] = m;
                    } else {
                        if ("merge" == g.mode) {
                            for (var n in m) {
                                d[n] = m[n];
                            }
                        } else {
                            d[g.name] = [], d[g.name].push(m);
                        }
                    }
                }
            }
        } else {
            d = c.text();
        }
        return d;
    }

    //defualtError
    function h(b, e, c, d) {
        console.log("Ajax请求失败: " + e + "\r\n" + c);
        d && alert("错误: " + e);
        window.defaultAjaxErrorHandler && window.defaultAjaxErrorHandler(b, e, c, d);
    }

    //method_params1_params2_...paramsN
    function f(b, e) {
        var c = b;
        if (e) {
            for (var d = 0; d < e.length; d++) {
                c += "_" + e[d];
            }
        }
        return c;
    }
    var m = this,
        q = true,//缓存开关
        n = {};//缓存对象

    this.ajaxCallEnded = this.ajaxCallStarted = null;

    b || (b = {
        domain: window.ezdDomain,
        sslDomain: window.ezdSSLDomain,
        AppToken: window.ezdAppToken,
        publisherID: window.ezdPublisherID,
        AppURI: window.ezdAppURI,
        addDomainToUrls: true
    });

    var r = null,
        t = window.fixImageUrl || function(b) {
            return b;
        };
    this.getThemeInfo = function(b, e) {
        $.ajax({
            type: "GET",
            url: b,
            xhrFields: r,
            dataType: "text/xml",
            complete: function(b) {
                if (e) {
                    var c = b.responseXML;
                    !c && b.responseText && (c = $.parseXML(b.responseText));
                    (b = k(c, {
                        customization: {
                            mode: "single"
                        },
                        rule: {
                            name: "rules"
                        },
                        file: {
                            name: "files"
                        },
                        theme: {
                            mode: "single"
                        }
                    })) && b.theme && (b = b.theme);
                    e(b);
                }
            }
        });
    };
    this.saveThemeCustomizations = function() {};
    this.getThemeCustomizations = function() {};
    this.adjustUrl = function(c) {
        if (!c) {
            return c;
        }
        var e = b.addDomainToUrls;
        c = t(c);
        e && 0 != c.indexOf("http") && 0 != c.indexOf("//") && (c = "http://" + b.domain + c);
        document.location.href.startsWith("file") || (c = c.replace("http://", "//"));
        return c;
    };
    this.getStoreAddress = function(b, e) {
        return "undefined" !== typeof n.address && b ? (b(n.address), n.address) : d({
            methodName: "GetStoreAddress",
            parameters: [],
            successRootTagName: "StoreAddress",
            deserializationSettings: {
                stores: {
                    mode: "merge"
                },
                addresses: {
                    mode: "merge"
                },
                states: {
                    mode: "single",
                    name: "state"
                },
                countries: {
                    mode: "single",
                    name: "country"
                }
            },
            processResults: function(b) {},
            loadingMessage: "获取地址",
            useCache: !0,
            success: b,
            error: e
        });
    };
    this.getEmbroideryImageInfo = function(b, e, c) {
        $.ajax({
            type: "GET",
            headers: {
                Accept: "application/json; charset=utf-8",
                "Content-Type": "application/json; charset=utf-8"
            },
            url: b,
            xhrFields: r,
            success: function(c) {
                e({
                    url: b,
                    dataUrl: c.url,
                    stitchWidth: c.width,
                    stitchHeight: c.height
                });
            },
            error: c
        });
    };
    this.getSizeChartUrl = function(c, e, d) {
        c = encodeURIComponent(c.replace(/ /gi, ""));
        var f = "http://" + b.domain + "/images/publishers/" + b.publisherID + "/brands/" + c + "/SizeChart.jpg";
        e(f);

    };
    this.getInitialLoad = function(c, e, d, g, k) {
        service.ajaxCallStarted("InitialLoad", "初始化设计工具...");
        $.ajax({
            type: "POST",
            xhrFields: r,
            url: m.adjustUrl("/api?model=design/tool/beta&action=init&appKey=" + b.AppToken  +"&productId=" + c + "&embroideryMode=" + d),
            success: function(e) {
//                debugger;
                $('.design-tool, .design-product').fadeIn();
                service.ajaxCallEnded && service.ajaxCallEnded("InitialLoad");
                var m = {}, q = e.getElementsByTagName("error");
                if (q.length) {
                    k ? k($(q[0]).text()) : h(null, $(q[0]).text(), null, $(q[0]).text());
                } else {
                    var q = e.getElementsByTagName("FontList");
                    q.length && (m.fontCategoriesXml = $.parseXML(q[0].xml || (new XMLSerializer).serializeToString(q[0])));
                    q = e.getElementsByTagName("InkColorList");
                    q.length && (m.inkColorsXml = $.parseXML(q[0].xml || (new XMLSerializer).serializeToString(q[0])));
                    q = e.getElementsByTagName("ProductResult");
                    q.length ? m.productResultXml = $.parseXML(q[0].xml || (new XMLSerializer).serializeToString(q[0])) : 0 == c ? m.productResultXml = $.parseXML(service.createProductXml()) : (k = k || h, k(null, "Product not found or store suspended.", "Product not found or store suspended.", !0));
                    q = e.getElementsByTagName("DesignerToolTips");
                    q.length && (m.toolTipsXml = $.parseXML(q[0].xml || (new XMLSerializer).serializeToString(q[0])));
                    q = e.getElementsByTagName("ExcludedFontIDs");
                    q.length && (m.excludedFontsXml = $.parseXML(q[0].xml || (new XMLSerializer).serializeToString(q[0])));
                    q = e.getElementsByTagName("ThreadChartResult");
                    q.length && (m.threadChartsXml = $.parseXML(q[0].xml || (new XMLSerializer).serializeToString(q[0])));
                    q = e.getElementsByTagName("UploadImageTerms");
                    q.length && (m.uploadImageTerms = q[0].xml || (new XMLSerializer).serializeToString(q[0]), m.uploadImageTerms = htmlUnescape(m.uploadImageTerms.replace("<UploadImageTerms>", "").replace("</UploadImageTerms>", "")));
                    n[f("GetFontList", [d])] = m.fontCategoriesXml || $.parseXML("<FontList></FontList>");
                    n[f("GetInkColorList", [])] = m.inkColorsXml || $.parseXML("<InkColorList></InkColorList>");
                    n[f("GetProduct", [c, ""])] = m.productResultXml || $.parseXML("<ProductResult></ProductResult>");
                    n[f("GetStoreDesignerToolTips", [])] = m.toolTipsXml || $.parseXML("<DesignerToolTips></DesignerToolTips>");
                    n[f("GetExcludedFonts", [b.publisherID])] = m.excludedFontsXml || $.parseXML("<ExcludedFontIDs></ExcludedFontIDs>");
                    n[f("EmbroideryGetThreadChartList", [])] = m.threadChartsXml || $.parseXML("<ThreadChartResult></ThreadChartResult>");
                    console.debug('service.getFontCategories');
                    service.getFontCategories(d, function(b) {
                        m.fontCategories = b;
                    });
//                    console.debug('service.getStoreInkColors');
                    service.getStoreInkColors(function(b) {
                        m.inkColors = b;
                    });
//                    console.debug('service.getProductDetails');
                    service.getProductDetails(c, null, null, function(b) {
                        m.product = b;
                    });
//                    console.debug('service.getStoreDesignerToolTips');
                    service.getStoreDesignerToolTips(function(b) {
                        m.tooltips = b;
                    });
//                    console.debug('service.getExcludedFontIDs');
                    service.getExcludedFontIDs(function(b) {
                        m.excludedFontIDs = b;
                    });
//                    console.debug('service.getStoreThreadCharts');
                    service.getStoreThreadCharts(function(b) {
                        m.threadCharts = b;
                    });
                    m.hasGoogleFonts = !! findMatch(m.fontCategories, function(b) {
                        return 1E6 > b.font_style_id && 100 <= b.font_style_id;
                    });
                    ezdVars.HasGoogleFonts = m.hasGoogleFonts;
                    g && (m.hasGoogleFonts ? (e = ezdVars.DesignerLocation.replace("/designer/html5", "/designer/fonts/galleries/2/replacements.txt"), ".." === e && (e = "http://" + ezdVars.ApiDomain + "/designer/fonts/galleries/2/replacements.txt"), $.ajax({
                        type: "GET",
                        url: e,
                        success: function(b) {
                            state.fontReplacements = [];
                            b = b.split("\n");
                            for (var e = 0; e < b.length; e++) {
                                var c = b[e].split("\t"),
                                    c = {
                                        new_font_id: c[0],
                                        old_font_id: c[1],
                                        new_font_style_id: c[2],
                                        new_font_name: c[3],
                                        new_font_style_name: c[3].split(" ")[0]
                                    };
                                c.jspath = "REPLACE_DOMAIN_WITH/designer/fonts/galleries/2/" + c.new_font_style_name + "/" + c.new_font_name.replace(" ", "") + ".ttf.js";
                                c.gifpath = c.jspath.replace(".ttf.js", ".gif");
                                c.swfpath = c.jspath.replace(".ttf.js", ".swf");
                                state.fontReplacements.push(c);
                            }
                            g(m);
                        }
                    })) : g(m));
                }
            },
            error: function(b, e, c) {
                service.ajaxCallEnded && service.ajaxCallEnded("InitialLoad");
                k && k(null, b, e, c);
            }
        });
    };
    this.getStoreThreadCharts = function(b, e) {
        return d({
            methodName: "EmbroideryGetThreadChartList",
            parameters: [],
            successRootTagName: "ThreadChartList",
            deserializationSettings: {},
            processResults: function(b) {
                var e = [];
                if (!b || !b.ink_color_maps) {
                    return e;
                }
                for (var c = 0; c < b.ink_color_maps.length; c++) {
                    e = e.concat(b.ink_color_maps[c].ink_colors);
                }
                return e;
            },
            loadingMessage: "获取开发者颜色配置",
            useCache: !0,
            returnSync: !0,
            success: b,
            error: e
        });
    };
    this.getStoreThreadChartColors = function(b, e, c) {
        return d({
            methodName: "EmbroideryGetThreadColorList",
            parameters: [b],
            successRootTagName: "ThreadColorList",
            deserializationSettings: {},
            processResults: function(b) {
                return b;
            },
            loadingMessage: "获取开发者颜色配置",
            useCache: !0,
            returnSync: !0,
            success: e,
            error: c
        });
    };
    this.getStoreInkColors = function(b, e) {
        return d({
            methodName: "GetInkColorList",
            parameters: [],
            successRootTagName: "InkColorList",
            deserializationSettings: {
                ink_color_map_colors: {
                    mode: "merge"
                }
            },
            processResults: function(b) {
                var e = [];
                if (!b || !b.ink_color_maps) {
                    return e;
                }
                for (var c = 0; c < b.ink_color_maps.length; c++) {
                    if(b.ink_color_maps[c].ink_colors){
                        e = e.concat(b.ink_color_maps[c].ink_colors);
                    }
                }
                return e;
            },
            loadingMessage: "获取开发者颜色配置",
            useCache: !0,
            returnSync: !0,
            success: b,
            error: e
        });
    };
    this.getStoreToolTips = function(b, e) {
        return d({
            methodName: "GetStoreDesignerToolTips",
            parameters: [],
            successRootTagName: "DesignerToolTips",
            deserializationSettings: {},
            processResults: function(b) {
                return b.ToolTips;
            },
            loadingMessage: "获取工具提示",
            useCache: !0,
            returnSync: !0,
            success: b,
            error: e
        });
    };
    this.logIn = function(b, e, c, f, g) {
        return d({
            methodName: "LoginUser",
            parameters: [c],
            successRootTagName: "Login",
            deserializationSettings: {
                UserToken: {
                    mode: "single",
                    name: "UserToken"
                },
                SessionToken: {
                    mode: "single",
                    name: "sessionToken"
                },
                UserToken: {
                    mode: "single",
                    name: "UserToken"
                },
                UserName: {
                    mode: "single",
                    name: "userName"
                },
                UserRole: {
                    mode: "single",
                    name: "userRole"
                },
                Status: {
                    mode: "single",
                    name: "status"
                }
            },
            loadingMessage: "登录中",
            processResults: function(b) {
                window.eventManager && b.UserToken && (window.eventManager.trigger("gotSession", b), window.eventManager.trigger("userLoggedIn", b));
                return b;
            },
            success: f,
            error: g,
            postData: {
                Email: b,
                Password: e
            }
        });
    };
    this.createAccount = function(b, e, c, f, g, h, k, m) {
        return d({
            methodName: "RegisterUser",
            parameters: [h],
            successRootTagName: "Account",
            deserializationSettings: {
                UserToken: {
                    mode: "single",
                    name: "UserToken"
                },
                SessionToken: {
                    mode: "single",
                    name: "sessionToken"
                },
                UserToken: {
                    mode: "single",
                    name: "UserToken"
                },
                UserName: {
                    mode: "single",
                    name: "userName"
                },
                UserRole: {
                    mode: "single",
                    name: "userRole"
                },
                Status: {
                    mode: "single",
                    name: "status"
                }
            },
            loadingMessage: "注册中",
            processResults: function(b) {
                window.eventManager && b.UserToken && (window.eventManager.trigger("gotSession", b), window.eventManager.trigger("userLoggedIn", b));
                return b;
            },
            success: k,
            error: m,
            postData: {
                Email: c,
                Password: f,
                FirstName: b,
                LastName: e,
                ConfirmPassword: g
            }
        });
    };
    this.resetPassword = function(c, e, d) {
        var f = {
            methodName: "ResetPassword",
            loadingMessage: "重置密码",
            success: e,
            error: d,
            postData: {
                Email: c
            }
        };
        $.ajax({
            type: "POST",
            url: m.adjustUrl("/ResetPassword/" + b.AppToken),
            xhrFields: r,
            data: f.postData,
            success: function(b) {
                service.ajaxCallEnded && service.ajaxCallEnded("ResetPassword", f.loadingMessage);
                "OK" == b && e ? e() : ($(b), b = $(b).find("Error").text(), d(b));
            },
            error: function(b, e, c) {
                service.ajaxCallEnded && service.ajaxCallEnded("ResetPassword", f.loadingMessage);
                d && d(f, b, e, c);
            }
        });
    };
    this.logOff = function(c) {
        var e = "/" + b.AppURI + "/Account/LogOff/";
        service.ajaxCallStarted && service.ajaxCallStarted("LogOff", "注销...");
        $.ajax({
            type: "GET",
            url: m.adjustUrl(e),
            xhrFields: r,
            dataType: "text/html",
            complete: function(b) {
                service.ajaxCallEnded && service.ajaxCallEnded("LogOff");
                c && c(b);
            }
        });
    };
    this.createNewSession = function(c, e) {
        delete n.currentSessionInfo;
        $.ajax({
            type: "POST",
            url: m.adjustUrl("/" + b.AppURI + "/Cart/GetCartSession/"),
            xhrFields: r,
            data: {},
            dataType: "xml",
            success: function(b) {
                var e = parseInt($(b).find("UserToken").text()),
                    d = $(b).find("SessionToken").text();
                b = $(b).find("UserToken").text();
                e = {
                    UserToken: e,
                    UserToken: b,
                    sessionToken: d
                };
                n.currentSessionInfo = e;
                window.eventManager && window.eventManager.trigger("gotSession", e);
                c && c(e);
            },
            error: function(b, e, c) {
                handleError(b, e, c);
            }
        });
    };
    this.getOrCreateSession = function(c, e) {
        n.currentSessionInfo && c ? c(n.currentSessionInfo) : $.ajax({
            type: "POST",
            url: m.adjustUrl("/GetNewSession/" + b.AppToken),
            xhrFields: r,
            data: {},
            dataType: "xml",
            success: function(b) {
                var e = parseInt($(b).find("UserToken").text()),
                    d = $(b).find("SessionToken").text();
                b = $(b).find("UserToken").text();
                e = {
                    UserToken: e,
                    UserToken: b,
                    sessionToken: d
                };
                n.currentSessionInfo = e;
                window.eventManager && window.eventManager.trigger("gotSession", e);
                c && c(e);
            },
            error: function(b, e, c) {
                handleError(b, e, c);
            }
        });
    };
    this.getArtByID = function(b, e, c) {
        return d({
            methodName: "GetArtList",
            parameters: [0, b, 0, 0],
            queryStringParameters:{
                ArtId:b
            },
            successRootTagName: "ArtList",
            deserializationSettings: {},
            loadingMessage: "获取剪贴画",
            processResults: function(b) {
                return b = "" === b ? null : b.art[0];
            },
            success: e,
            error: c
        });
    };
    this.saveUserArt = function(d, e, f, k, n) {
        // debugger;
        var q = {
            methodName: "SaveArt",
            parameters: [d, e],
            successRootTagName: "Art",
            deserializationSettings: {
                ArtID: {
                    mode: "single"
                },
                UserToken: {
                    mode: "single"
                },
                SessionToken: {
                    mode: "single"
                },
                ArtName: {
                    mode: "single"
                }
            },
            loadingMessage: "保存剪贴画",
            processResults: function(b) {
                return b;
            },
            success: k,
            error: n
        };
        n || (n = h);
//        if(d){
            d = "/api?model=design/tool/beta&action=art_save&DesignID=" + ezdVars.DesignID;
            service.ajaxCallStarted && service.ajaxCallStarted("SaveArt", "处理图像中...");
            $.ajax({
                type: "POST",
                url: m.adjustUrl(d),
                xhrFields: r,
                dataType: "xml",
                data: f,
                cache: !1,
                contentType: !1,
                processData: !1,
                success: function(b) {
                    c(b, q);
                },
                error: function(b) {
                    service.ajaxCallEnded && service.ajaxCallEnded("SaveArt");
                    n && g(b);
                }
            });
//        }else{
//            service.getOrCreateSession(function(b) {
//                service.saveUserArt(b.UserToken, b.UserToken, f, k, n);
//            });
//        }
    };
    this.getArtInCategory = function(b, e, c, f, g) {
        return d({
            methodName: "GetArtList",
//            parameters: [b, 0, 0, 0, e ? e : "", c],
            parameters:[],
            successRootTagName: "ArtList",
            deserializationSettings: {},
            postData: {
                ArtCategoryId: b
            },
            loadingMessage: "获取剪贴画",
            processResults: function(b) {
                b = "" === b ? [] : b.art;
                for (var e = /.*\/images\/userart\/images\/(.*)\.[a-zA-Z0-9]{3}/, c = 0; c < b.length; c++) {
                    var d = b[c];
                    d.thumburl_large = changeJITImageSize(d.thumb_jit, 250, ".png");
                    if (d.art_path && e.test(d.art_path)) {
                        var f = e.exec(d.art_path);
                        f && 1 < f.length && (d.art_name_full = f[1]);
                    }
                }
                return b;
            },
            success: f,
            error: g
        });
    };
    this.getArtForUser = function(b, e, c) {
        return d({
            methodName: "GetArtList",
            parameters: [0, 0, b, ""],
            successRootTagName: "ArtList",
            deserializationSettings: {},
            loadingMessage: "获取剪贴画",
            processResults: function(b) {
                b = "" === b ? [] : b.art;
                for (var e = 0; e < b.length; e++) {
                    var c = b[e];
                    c.thumburl_large = changeJITImageSize(c.thumb_jit, 250, ".png");
                }
                return b;
            },
            success: e,
            error: c
        });
    };
    this.getArtCategoryList = function(b, e, c, f) {
        return d({
            methodName: "GetArtCategoryList",
            parameters: [b, e],
            queryStringParameters:{
                ArtCategoryId:b
            },
            successRootTagName: "ArtCategoryList",
            deserializationSettings: {},
            loadingMessage: "获取剪贴画分类",
            processResults: function(e) {
                e = "" === e ? [] : e.gallery_art_categories;
                if (b) {
                    for (var c = 0; c < e.length; c++) {
                        e[c].parent_id = b;
                    }
                }
                for (c = 0; c < e.length; c++) {
                    var d = e[c];
                    d.thumburl_large = changeJITImageSize(d.thumb_jit, 250, ".png");
                }
                return e;
            },
            success: c,
            error: f
        });
    };
    this.checkMobileUploads = function(b, e, c, f) {
        f || (f = h);
        return d({
            methodName: "CheckMobileUpload",
            parameters: [b],
            successRootTagName: "Art",
            deserializationSettings: {
                art_url: {
                    mode: "single"
                },
                art_id: {
                    mode: "single"
                },
                art_name: {
                    mode: "single"
                },
                width: {
                    mode: "single"
                },
                height: {
                    mode: "single"
                },
                Status: {
                    mode: "single"
                }
            },
            loadingMessage: "检查Email",
            processResults: function(b) {
                return b;
            },
            success: e,
            error: function(b, e, d, g) {
                if (g) {
                    var h = k($(b), {});
                    "PENDING" === h.status ? c(h) : f(b, e, d, g);
                } else {
                    f(b, e, d, g);
                }
            }
        });
    };
    this.getMobileUploadUserKey = function(c) {
        var e = "000" + parseInt(b.AppToken, 10).toString(36),
            e = e.substring(e.length - 3);
        c = parseInt(c, 10);
        return e += c.toString(36);
    };
    this.getProductCategories = function(b, e) {
        e || (e = h);
        return d({
            methodName: "GetProductCategoryList",
            parameters: [],
            successRootTagName: "ProductCategoryList",
            deserializationSettings: {
                vw_product_categories: {
                    name: "categories"
                }
            },
            loadingMessage: "获取产品分类",
            useCache: true,
            processResults: function(b) {
                b = b.categories;
                for (var e = 0; e < b.length; e++) {
                    var c = b[e],
                        d = c.thumburl;
                    "undefined" == typeof d && (d = c.thumburl_front);
                    c.thumburl = t(d);
                    c.thumburl_large = changeJITImageSize(c.thumburl, 150, ".png");
                }
                e = arrangeHierarchy(b, function(b) {
                    return b.product_category_id;
                }, function(b) {
                    return b.parent_id;
                });
                e.categoriesFlat = b;
                return e;
            },
            success: b,
            error: e
        });
    };
    this.findProductCategoryByID = function(b, e) {
        if (!b) {
            return null;
        }
        for (var c = 0; c < b.length; c++) {
            if (b[c].product_category_id == e) {
                return b[c];
            }
            if ("undefined" !== typeof b[c].children) {
                var d = m.findProductCategoryByID(b[c].children, e);
                if (d) {
                    return d;
                }
            }
        }
        return null;
    };
    this.getProductsByCategory = function(b, e, c, f, g) {
        var h = m.findProductCategoryByID(n.productCategories, b);
        var request = {};
        if(b){
            request.productCategoryId = b;
        }else{
            request.keyWord= e ;
        }
        return h && h.products && !e && c ? (f && f(h.products), h.products) : d({
            methodName: "GetProductList",
            parameters: [b, e ? e : "", c],
            queryStringParameters:request,
            successRootTagName: "ProductList",
            deserializationSettings: {
                products: {
                    name: "product",
                    mode: "merge"
                }
            },
            loadingMessage: "获取产品列表",
            useCache: !0,
            processResults: function(b) {
                b = b.CS;
                h && !e && c && (h.products = b);
                if (b && b.length) {
                    for (var d = 0; d < b.length; d++) {
                        var f = b[d];
                        f.thumburl_large = changeJITImageSize(t(f.thumburl_front), 150, ".png");
                    }
                }
                return b;
            },
            success: f,
            error: g
        });
    };
    this.getProductDetails = function(b, e, c, g, h) {
        var request = {}
        if(c){
            request.productId = c;
        }else{
            request.productId = b;
            request.productStyleId = e ||'';
        }
        var m = {
            methodName: c ? "GetProductFromBarCode" : "GetProduct",
            parameters: c ? [c] : [b, e ? e : ""],
            queryStringParameters: request,
            successRootTagName: "ProductResult",
            useCache: true,
            returnSync: true,
            deserializationSettings: {
                products: {
                    name: "product",
                    mode: "merge"
                }
            },
            loadingMessage: "获取产品详情",
            processResults: function(c) {
                c.product_styles && 1 === c.product_styles.length ? c.product_style = c.product_styles[0] : c.product_styles && e && (c.product_style = findMatch(c.product_styles, function(b) {
                    return b.product_style_id == e;
                }));
                for (var d = 0; d < c.product_styles.length; d++) {
                    var g = c.product_styles[d];
                    "GetProduct" != m.methodName || e || (n[f("GetProduct", [b, g.product_style_id])] = n[f("GetProduct", [b, ""])]);
                    if (g.is_default || !c.defaultStyle) {
                        c.defaultStyle = g;
                    }
                    g.product_regions && 1 == g.product_regions.length && "undefined" == typeof g.product_regions[0].is_default && (g.product_regions = []);
                    for (var h = 0; h < g.product_regions.length; h++) {
                        var k = g.product_regions[h];
                        1 != k.is_default || g.defaultRegion || (g.defaultRegion = k);
                        k.originalRegion = k.region;
                        k.region = k.region.split(",");
                        for (var q = 0; q < k.region.length; q++) {
                            k.region[q] *= 0.5;
                        }
                        k.region[0] += 0.5 * (500 - g["image_width_" + k.side]);
                    }!g.defaultRegion && c.regions && c.regions.length && (g.defaultRegion = c.regions[0]);
                    if (g.sizes && g.sizeids) {
                        for (k = g.sizes.split(","), q = g.sizeids.split(","), g.sizeData = [], h = 0; h < k.length; h++) {
                            g.sizeData.push({
                                name: k[h],
                                id: q[h]
                            });
                        }
                    }
                }
                return c;
            },
            success: g,
            error: h
        };
        return b || c ? d(m) : (c = $.parseXML(this.createProductXml()), c = k($(c).children()[0], m.deserializationSettings), h = m.processResults(c), g && g(h || c), h || c);
    };
    this.createProductXml = function() {
        return '<ProductResult><products product_id="0" manufacturer="Default" manufacturer_sku="0" sku="0" name="Placeholder Product" customizable="1" can_print="1" can_digital_print="1" can_screen_print="0" can_embroider="0" can_handle_sleeves="0" enable_team_name_numbers="1" has_back="0" has_third_side="0" has_fourth_side="0" third_side_name="Left Sleeve" fourth_side_name="Right Sleeve" is_static="0" long_description=" "><product_styles product_style_id="0" is_default="1" color="WHITE" html_color="FFFFFF" customizable="1" can_print="1" can_digital_print="1" can_screen_print="1" can_embroider="1" unit_price="0.00" canvas_price="0.00" name_price="0.00" number_price="0.00" sizes="11 Size" sizeids="0" image_width_front="500" image_height_front="500"><product_regions product_region_id="0" side="front" is_default="1" name="Full" region="80,30,840,830" render_width_inches="12.00" side_order="1" region_order="1" imgurl="REPLACE_DOMAIN_WITH/designer/html5/ds/images/productImage.png" thumburl="REPLACE_DOMAIN_WITH/designer/html5/ds/images/productImage.png"><print_mask/></product_regions></product_styles></products></ProductResult>';
    };
    this.getProductColors = function(b, e, c) {
        c = {
            methodName: "GetProduct",
            parameters: [b, ""],
            successRootTagName: "ProductResult",
            deserializationSettings: {
                products: {
                    name: "product",
                    mode: "merge"
                }
            },
            loadingMessage: "获取产品颜色（款式）",
            useCache: !0,
            processResults: function(b) {
                for (var e = 0; e < b.product_styles.length; e++) {
                    var c = b.product_styles[e];
                    if (c.sizes && c.sizeids) {
                        var d = c.sizes.split(","),
                            f = c.sizeids.split(",");
                        c.sizeData = [];
                        for (var g = 0; g < d.length; g++) {
                            c.sizeData.push({
                                name: d[g],
                                id: f[g]
                            });
                        }
                    }
                }
                return b.product_styles;
            },
            success: e,
            error: c
        };
        if (b) {
            return d(c);
        }
        b = $.parseXML(this.createBlankProductColors());
        b = k($(b).children()[0], c.deserializationSettings);
        c = c.processResults(b);
        e && e(c || b);
        return c || b;
    };
    this.createBlankProductColors = function() {
        var b;
        return b = '<ProductResult><products product_id="0"><product_styles product_style_id="-1" is_default="0" color="ASH" html_color="D1D4D3"></product_styles><product_styles product_style_id="-2" is_default="0" color="BLACK" html_color="000000"></product_styles><product_styles product_style_id="-3" is_default="0" color="CACTUS GREEN" html_color="939871"></product_styles><product_styles product_style_id="-4" is_default="0" color="CAROLINA BLUE" html_color="6299DD"></product_styles><product_styles product_style_id="-5" is_default="0" color="CHARITY PINK" html_color="F8B4BE"></product_styles><product_styles product_style_id="-6" is_default="0" color="CITY GREEN" html_color="3E4723"></product_styles><product_styles product_style_id="-7" is_default="0" color="HEATHER GREY" html_color="B7B7B7"></product_styles><product_styles product_style_id="-8" is_default="0" color="KELLY GREEN" html_color="009A63"></product_styles><product_styles product_style_id="-9" is_default="0" color="KEY LIME" html_color="BAD97E"></product_styles><product_styles product_style_id="-10" is_default="0" color="LIGHT BLUE" html_color="6AB2E7"></product_styles><product_styles product_style_id="-11" is_default="0" color="NEON YELLOW" html_color="EEEA84"></product_styles><product_styles product_style_id="-12" is_default="0" color="PURPLE" html_color="4D2379"></product_styles><product_styles product_style_id="-13" is_default="0" color="RED" html_color="C10435"></product_styles><product_styles product_style_id="-14" is_default="0" color="ROYAL BLUE" html_color="0079DB"></product_styles><product_styles product_style_id="-15" is_default="0" color="STORM GREY" html_color="326AAE"></product_styles><product_styles product_style_id="-16" is_default="0" color="TEXAS ORANGE" html_color="AE6134"></product_styles><product_styles product_style_id="0" is_default="1" color="WHITE" html_color="FFFFFF"></product_styles></products></ProductResult>'.replace(/\<\/product_styles/gi,
            '<product_regions product_region_id="0" side="front" is_default="1" name="Full" region="80,30,840,830" render_width_inches="12.00" side_order="1" region_order="1" imgurl="REPLACE_DOMAIN_WITH/designer/html5/ds/images/productImage.png" thumburl="REPLACE_DOMAIN_WITH/designer/html5/ds/images/productImage.png"><print_mask/></product_regions></product_styles');
    };
    this.getDistress = function(b, e, c) {
        this.getDistressList(function(d) {
            for (var f = 0; f < d.length; f++) {
                if (d[f].distress_id == b) {
                    e(d[f]);
                    return;
                }
            }
            c && c("Distress not found.");
        }, c);
    };
    this.getDistressList = function(b, e) {
        return d({
            methodName: "GetDistressList",
            parameters: [],
            successRootTagName: "DistressList",
            deserializationSettings: {},
            loadingMessage: "获取印刷特效",
            useCache: !0,
            processResults: function(b) {
                for (var e = 0; e < b.distresses.length; e++) {
                    var c = b.distresses[e];
                    c.distress_path = t(c.distress_path);
                    c.distress_small_path = t(c.distress_small_path);
                    c.distress_thumb_path = t(c.distress_thumb_path);
                    c.distress_path_jpg = c.distress_path.replace(".png", ".jpg");
                    c.distress_small_path_jpg = c.distress_small_path.replace(".png", ".jpg");
                    c.distress_thumb_path_jpg = c.distress_thumb_path.replace(".png", ".jpg");
                }
                return b.distresses;
            },
            success: b,
            error: e
        });
    };
    //callback2 add by hl
    this.loadFont = function(font, callback, text, errCallback, callback2) {
        // debugger;
        var tagId = font.font || font.fontFamily;
        var fontId = font.font_id || font.fontId;
        var src = "//" + b.domain + "/api?model=design/tool/beta&action=font_get_js_font&appKey=" + b.AppToken + "&fontid=" + fontId + "&text=" + encodeURIComponent(text);
        service.loadScript(src, tagId, callback, errCallback, callback2)
    };
    this.getExcludedFontIDs = function(c, e) {
        return d({
            methodName: "GetExcludedFonts",
            parameters: [b.publisherID],
            successRootTagName: "ExcludedFontIDs",
            deserializationSettings: {},
            loadingMessage: "获取字体信息",
            useCache: !0,
            returnSync: !0,
            processResults: function(b) {
                return b.Font;
            },
            success: c,
            error: e,
            noAppTokenInUrl: !0
        });
    };
    this.getFontCategories = function(b, e, c) {
        return d({
            methodName: "GetFontList",
            parameters: [b],
            successRootTagName: "FontList",
            deserializationSettings: {},
            loadingMessage: "获取字体信息",
            useCache: !0,
            returnSync: !0,
            processResults: function(b) {
                if (!b || !b.font_styles) {
                    return [];
                }
                for (var e = 0; e < b.font_styles.length; e++) {
                    var c = b.font_styles[e];
                    c.font_style = c.style;
                    0 == c.FontCount && (b.font_styles.splice(e, 1), e--);
                }
                return b.font_styles;
            },
            success: e,
            error: c
        });
    };
    this.getFontsByCategory = function(b, e, c) {
        return d({
            methodName: "GetFontList",
            queryStringParameters:{
                fontCategorieId:b
            },
            parameters: [b, "true"],
            successRootTagName: "FontList",
            deserializationSettings: {},
            loadingMessage: "获取字体信息",
            useCache: !0,
            processResults: function(b) {
                for (var e = 0; e < b.fonts.length; e++) {
                    var c = b.fonts[e],
                        d = c.jspath.split("/");
                    c.fontFamily = c.name; //d[d.length - 1].split(".")[0].replace("'", "");
                    c.font = c.name;
                }
                return b.fonts;
            },
            success: e,
            error: c
        });
    };
    this.getStoreDesignerToolTips = function(b, e) {
        return d({
            methodName: "GetStoreDesignerToolTips",
            parameters: [],
            successRootTagName: "DesignerToolTips",
            deserializationSettings: {},
            loadingMessage: "获取工具提示",
            useCache: !0,
            processResults: function(b) {
                return b;
            },
            success: b,
            error: e
        });
    };

    this.loadScript = function(src, e, c, d, callback) {
        // debugger;
        var f = document.getElementsByTagName("head")[0],
            g = document.createElement("script");
        var id = e.replace(/ /g,'');
        g.setAttribute('id', id);
        g.type = "text/javascript";

        g.src = src
        $('#' + e.replace(/ /g,'')).remove();

        f.appendChild(g);

        //callback add by hl
        // g.onload = c;
        g.onload = function(){
            c.call();
            if(callback)
                callback.call();
        }

        g.onerror = d;
        // g.src = "//" + b.domain + "/getClounFont/1/2/"+d;//b;
        // g.src="http://open.dev.jzw.la/cloud_font/MicrosoftJhengHei/Regular.js"
        // g.src="/Microsoft_JhengHei_400.font-2.js";
        // g.src = "/Regular.js";
        //g.src ="/Arial_400.font.js";
    };
    this.loadCss = function(b) {
        var e = document.createElement("link");
        e.setAttribute("rel", "stylesheet");
        e.setAttribute("type", "text/css");
        e.setAttribute("href", b);
        document.getElementsByTagName("head")[0].appendChild(e);
        return e;
    };
    this.getDesignCategoryList = function(b, e, c) {
        // debugger;
        return d({
            methodName: "GetDesignCategoryList",
            parameters: [b],
            successRootTagName: "StoreDesignCategoryList",
            deserializationSettings: {},
            loadingMessage: "获取模版市场素材分类",
            useCache: !0,
            processResults: function(b) {
                var e = "undefined" !== typeof kioskFlowType && "NAMEDROP" === kioskFlowType ? ["Bachelorette", "Choir", "Baseball Tournament", "Fashion"] : [],
                    c = b,
                    c = b && b.store_design_categories ? b.store_design_categories : [];
                for (b = 0; b < c.length; b++) {
                    var d = c[b];
                    searchInArray(e, d.name) && (d.enableKioskNameDrop = !0);
                    d.thumburl_large = changeJITImageSize(d.thumburl, 250, ".png");
                }
                return c;
            },
            success: e,
            error: c
        });
    };
    this.getDesignCategoryTexts = function(b, e, c) {
        // debugger;
        return d({
            methodName: "GetDesignCategoryTexts",
            parameters: [b],
            successRootTagName: "CategoryCanvasTexts",
            deserializationSettings: {},
            loadingMessage: "获取模版市场素材 Texts",
            useCache: !0,
            processResults: function(b) {
                var e = b;
                return e = b && b.canvas_text ? b.canvas_text : [];
            },
            success: e,
            error: c
        });
    };
    this.getDesignsByCategory = function(b, e, c, f) {
        // debugger;
        return d({
            methodName: "GetDesignList",
            parameters: [b, e ? e : ""],
            successRootTagName: "StoreDesignList",
            deserializationSettings: {},
            loadingMessage: "获取模版市场素材",
            useCache: !0,
            processResults: function(b) {
                var e = b,
                    e = b && 0 !== b.length ? b.designs : [];
                for (b = 0; b < e.length; b++) {
                    var c = e[b];
                    c.isFrame = 0 <= c.name.toUpperCase().indexOf("FRAME");
                    c.thumburl_large = changeJITImageSize(c.thumburl, 250, ".png");
                }
                return e;
            },
            success: c,
            error: f
        });
    };
    this.getDesignsByUser = function(b, e, c) {
        // debugger;
        return d({
            methodName: "GetUserDesignList",
            parameters: [b],
            successRootTagName: "UserDesignList",
            deserializationSettings: {},
            loadingMessage: "获取模版市场素材",
            processResults: function(b) {
                var e = b,
                    e = b && 0 !== b.length ? b.designs : [];
                for (b = 0; b < e.length; b++) {
                    var c = e[b];
                    c.thumburl_large = changeJITImageSize(c.imgurl, 250, ".png");
                }
                return e;
            },
            success: e,
            error: c
        });
    };
    this.createDesignXml = function() {
        return '<ThisDesign><designs table_name="design" name="未命名" can_customize="1" can_screen_print="1" is_embroidery="0" designer_version="" disable_product_update_front="0" disable_product_update_color="0" disable_product_update_back="0" disable_canvas_add="0"><product_styles /></designs><canvases table_name="canvas" location="Front"  width="500" height="500" bgcolor="ffffff" is_distressed="0" shadow="0" region_name="Full" disable_image_add="0" disable_text_add="0" disable_image_delete="0" disable_text_delete="0" imgurl=""><canvas_embroidery /></canvases></ThisDesign>';
    };
    this.getDesign = function(b, e, c) {
        // debugger;
        c = {
            methodName: "GetDesign",
            parameters: [b],
            successRootTagName: "ThisDesign",
            deserializationSettings: {
                font_styles: {
                    mode: "single",
                    name: "fontStyle"
                },
                designs: {
                    mode: "merge",
                    name: "designInfo"
                },
                art: {
                    mode: "single",
                    name: "art"
                },
                fonts: {
                    mode: "single",
                    name: "font"
                },
                canvas_text_embroidery: {
                    mode: "single"
                },
                product_styles: {
                    mode: "single",
                    name: "productStyle"
                }
            },
            loadingMessage: "获取模版市场素材",
            useCache: !0,
            processResults: function(b) {
                b.isFrame = 0 <= b.name.toUpperCase().indexOf("FRAME");
                if (b.canvas_text) {
                    for (var e = 0; e < b.canvas_text.length; e++) {
                        var c = b.canvas_text[e];
                        c.type = "text";
                        var d = c.font;
                        d.font_id = c.font_id;
                        var f = d.fontStyle.jspath.split("/");
                        if (d.fontStyle.canvas_text_embroidery) {
                            c.canvas_text_embroidery = d.fontStyle.canvas_text_embroidery;
                            delete d.fontStyle.canvas_text_embroidery;
                            for (var g in c.canvas_text_embroidery) {
                                c[g] = c.canvas_text_embroidery[g], c.isEmbroidery = !0;
                            }
                        }
                        f = f[f.length - 1].split(".")[0].replace("'", "");
                        d.fontStyle.font_family = d.font_family = d.fontFamily = f;
                        d.jspath = service.adjustUrl(d.fontStyle.jspath);
                        d.fontttfpath = service.adjustUrl(d.fontStyle.fontttfpath);
                        d.altfontttfpath = service.adjustUrl(d.fontStyle.altfontttfpath);
                        d.fontswfpath = service.adjustUrl(d.fontStyle.fontswfpath);
                        d.localswfpath = service.adjustUrl(d.fontStyle.localswfpath);
                        d.gifpath = service.adjustUrl(d.fontswfpath.replace(/swf/gi, "gif"));
                        c.shadow_color = "#000000";
                        c.shadow_value = 0;
                        c.wrap_amount && (c.wrap_amount = parseFloat(c.wrap_amount));
                        c.kerning && (c.kerning = parseFloat(c.kerning));
                        c.stroke_width && (c.stroke_width = parseFloat(c.stroke_width) / 2);
                    }
                } else {
                    b.canvas_text = [];
                }
                if (b.canvas_art) {
                    for (e = 0; e < b.canvas_art.length; e++) {
                        c = [];
                        d = b.canvas_art[e];
                        d.canvas_art_rendered && (d.canvas_art_rendered = d.canvas_art_rendered.replace("\\", "~"));
                        for (var h in d) {
                            "color" === h.substring(0, 5) && (g = getColorString(d[h], !0), c.push({
                                name: h,
                                value: g
                            }));
                        }
                        g = [];
                        for (d = 0; d < c.length; d++) {
                            if (f = c[d], -1 == f.name.search("_mapped")) {
                                var k = searchInArray(c, f.name + "_mapped", "name");
                                !1 !== k && (f.value = k.value);
                                "ffffffff" == f.value && (f.value = "ffffff");
                                g.push({
                                    name: f.name,
                                    value: f.value
                                });
                            }
                        }
                        c = g;
                        b.canvas_art[e].colors = c;
                    }
                } else {
                    b.canvas_art = [];
                }
                normalizeColorStrings(b);
                for (e = 0; e < b.canvases.length; e++) {
                    var m = b.canvases[e];
                    m.canvas_text = [];
                    m.canvas_art = [];
                    for (d = 0; d < b.canvas_text.length; d++) {
                        c = b.canvas_text[d], c.canvas_id == m.canvas_id && m.canvas_text.push(c);
                    }
                    for (d = 0; d < b.canvas_art.length; d++) {
                        h = b.canvas_art[d], h.canvas_id == m.canvas_id && m.canvas_art.push(h);
                    }
                    (function() {
                        var b = m;
                        b.isEmpty = function() {
                            return !(b.canvas_text && b.canvas_text.length) && !(b.canvas_art && b.canvas_art.length);
                        };
                    })();
                }
                delete b.canvas_text;
                delete b.canvas_art;
                b.currentCanvasIndex = 0;
                Object.defineProperty(b, "canvas", {
                    get: function() {
                        return b.canvases[b.currentCanvasIndex];
                    }
                });
                Object.defineProperty(b, "canvas_text", {
                    get: function() {
                        return b.canvas.canvas_text;
                    }
                });
                Object.defineProperty(b, "canvas_art", {
                    get: function() {
                        return b.canvas.canvas_art;
                    }
                });
                b.isEmpty = function() {
                    var c;
                    if (!b.canvases || !b.canvases.length) {
                        return !0;
                    }
                    for (var e = 0; e < b.canvases.length; e++) {
                        if (c = b.canvases[e], !c.isEmpty()) {
                            return !1;
                        }
                    }
                    return !0;
                };
            },
            success: e,
            error: c
        };
        return b ? d(c) : (b = $.parseXML(this.createDesignXml()), b = k($(b).children()[0], c.deserializationSettings), c = c.processResults(b), e && e(c || b), c || b);
    };
    this.getCartPaymentMethods = function(b, c, f) {
        return d({
            methodName: "GetCartPaymentMethods",
            parameters: [b],
            successRootTagName: "payment_methods",
            deserializationSettings: {},
            loadingMessage: "获取付款方式",
            processResults: function(b) {
                return b.payment_method;
            },
            useSSL: jQuery.support.cors,
            success: c,
            error: f
        });
    };
    this.getProductQuote = function(b, c, f, g, h, k, m, n, q, r) {
        b = {
            methodName: "GetProductQuote",
            parameters: [b, c, f],
            successRootTagName: "ProductPriceGrid",
            deserializationSettings: {
                Range: {
                    name: "ranges",
                    mode: "array"
                },
                Low: {
                    name: "low",
                    mode: "single"
                },
                High: {
                    name: "high",
                    mode: "single"
                },
                Price: {
                    name: "price",
                    mode: "single"
                },
                CombinePrintAndProduct: {
                    name: "combinePrintAndProduct",
                    mode: "single"
                },
                ApplyQtyDiscToPrinting: {
                    name: "applyQtyDiscToPrinting",
                    mode: "single"
                },
                Setup: {
                    name: "setup",
                    mode: "single"
                },
                NamePrice: {
                    name: "namePrice",
                    mode: "single"
                },
                NumberPrice: {
                    name: "numberPrice",
                    mode: "single"
                },
                QtyDiscPercent: {
                    name: "qtyDiscPercent",
                    mode: "single"
                },
                PriceDiscountable: {
                    name: "priceDiscountable",
                    mode: "single"
                }
            },
            loadingMessage: "获取报价",
            processResults: function(b) {
                for (var c = 0; c < b.ranges.length; c++) {
                    var e = b.ranges[c];
                    e.low = parseFloat(e.low);
                    e.high = parseFloat(e.high);
                    e.high < b.min_quantity ? (b.ranges.splice(c, 1), c--) : (e.low < b.min_quantity && (e.low = b.min_quantity), e.price = parseFloat(e.price), e.combinePrintAndProduct = "true" == e.combinePrintAndProduct.toLowerCase(), e.applyQtyDiscToPrinting = "true" == e.applyQtyDiscToPrinting.toLowerCase(), e.setup = e.setup ? parseFloat(e.setup) : 0, e.namePrice = e.namePrice ? parseFloat(e.namePrice) : 0, e.numberPrice = e.numberPrice ? parseFloat(e.numberPrice) : 0, e.qtyDiscPercent = e.qtyDiscPercent ?
                        parseFloat(e.qtyDiscPercent) : 0, e.priceDiscountable = e.priceDiscountable ? parseFloat(e.priceDiscountable) : 0);
                }
                b.ranges.sort(function(b, e) {
                    return b.low - e.low;
                });
                return b.ranges;
            },
            success: q,
            error: r
        };
        b.postData = {
            ColorsFront: g,
            ColorsSleeveRight: m,
            ColorsBack: h,
            ColorsSleeveLeft: k,
            AllVector: n
        };
        return d(b);
    };
    this.getQuote = function(b, e, c, f, g, h, k, m, n, q, r, t, M, A, G) {
        b = {
            methodName: "GetProductQuoteByQty",
            parameters: [b, e, c, f, g, h, k, m, n, q, t, M],
            successRootTagName: null,
            processResults: function(b) {
                if (b.ranges) {
                    for (var e = 0; e < b.ranges.length; e++) {
                        var c = b.ranges[e];
                        c.low = parseFloat(c.low);
                        c.high = parseFloat(c.high);
                        c.high < b.min_quantity ? (b.ranges.splice(e, 1), e--) : (c.low < b.min_quantity && (c.low = b.min_quantity), c.price = parseFloat(c.price), c.combinePrintAndProduct = "true" == c.combinePrintAndProduct.toLowerCase(), c.applyQtyDiscToPrinting = "true" == c.applyQtyDiscToPrinting.toLowerCase(), c.setup = c.setup ? parseFloat(c.setup) : 0, c.namePrice = c.namePrice ? parseFloat(c.namePrice) : 0, c.numberPrice = c.numberPrice ? parseFloat(c.numberPrice) : 0, c.qtyDiscPercent = c.qtyDiscPercent ?
                            parseFloat(c.qtyDiscPercent) : 0, c.priceDiscountable = c.priceDiscountable ? parseFloat(c.priceDiscountable) : 0);
                    }
                    b.ranges.sort(function(b, c) {
                        return b.low - c.low;
                    });
                    return b.ranges;
                }
                for (e in b) {
                    b[e] = parseFloat(b[e]);
                }
            },
            deserializationSettings: {
                Range: {
                    name: "ranges",
                    mode: "array"
                },
                Low: {
                    name: "low",
                    mode: "single"
                },
                High: {
                    name: "high",
                    mode: "single"
                },
                Price: {
                    name: "price",
                    mode: "single"
                },
                CombinePrintAndProduct: {
                    name: "combinePrintAndProduct",
                    mode: "single"
                },
                ApplyQtyDiscToPrinting: {
                    name: "applyQtyDiscToPrinting",
                    mode: "single"
                },
                Setup: {
                    name: "setup",
                    mode: "single"
                },
                NamePrice: {
                    name: "namePrice",
                    mode: "single"
                },
                NumberPrice: {
                    name: "numberPrice",
                    mode: "single"
                },
                QtyDiscPercent: {
                    name: "qtyDiscPercent",
                    mode: "single"
                },
                PriceDiscountable: {
                    name: "priceDiscountable",
                    mode: "single"
                },
                AppToken: {
                    name: "AppToken",
                    mode: "single"
                },
                ProductID: {
                    name: "productID",
                    mode: "single"
                },
                ProductStyleID: {
                    name: "productStyleID",
                    mode: "single"
                },
                ProductStyleSizeID: {
                    name: "productStyleSizeID",
                    mode: "single"
                },
                Qty: {
                    name: "qty",
                    mode: "single"
                },
                PrintPrice: {
                    name: "printPrice",
                    mode: "single"
                },
                SetupPrice: {
                    name: "setupPrice",
                    mode: "single"
                },
                EachProduct: {
                    name: "eachProduct",
                    mode: "single"
                },
                NameNumberPrice: {
                    name: "nameNumberPrice",
                    mode: "single"
                },
                EachTotal: {
                    name: "eachTotal",
                    mode: "single"
                },
                TotalPrice: {
                    name: "totalPrice",
                    mode: "single"
                },
                QuantityDiscount: {
                    name: "quantityDiscount",
                    mode: "single"
                }
            },
            loadingMessage: "获取报价",
            success: A,
            error: G
        };
        b.postData = {
            ColorsFront: k,
            ColorsSleeveRight: q,
            ColorsBack: m,
            ColorsSleeveLeft: n,
            AllVector: r
        };
        return d(b);
    };
    this.checkStyleInventory = function(b, c, f) {
        return d({
            methodName: "CheckStyleInventory",
            parameters: [b],
            successRootTagName: "Sizes",
            deserializationSettings: {
                Size: {
                    name: "sizes"
                }
            },
            loadingMessage: "检查库存",
            processResults: function(b) {
                return b;
            },
            success: c,
            error: f
        });
    };
    this.addItemToCart = function(c, e, d, f, g, k, n, q) {
        if (m.lockCart) {
            setTimeout(function() {
                m.addItemToCart(c, e, d, f, g, k, n, q);
            }, 100);
        } else {
            q || (q = h);
            var t = "/" + b.AppURI + "/Cart/Add/" + c + "/" + e + "/" + d + "/" + f + "/" + g + "/" + k;
            service.ajaxCallStarted && service.ajaxCallStarted("AddItemToCart", "保存到购物车...");
            m.lockCart = !0;
            $.ajax({
                type: "POST",
                url: m.adjustUrl(t),
                xhrFields: r,
                dataType: "text",
                data: {
                    Designer: 1
                },
                success: function(b) {
                    m.lockCart = !1;
                    service.ajaxCallEnded && service.ajaxCallEnded("AddItemToCart");
                    n && n(b);
                },
                error: function(b) {
                    m.lockCart = !1;
                    service.ajaxCallEnded && service.ajaxCallEnded("AddItemToCart");
                    q && q(b);
                }
            });
        }
    };
    this.addItemToCartWithName = function(c, e, d, f, g, k, n, q, t, D) {
        if (m.lockCart) {
            setTimeout(function() {
                m.addItemToCartWithName(c, e, d, f, g, k, n, q, t, D);
            }, 100);
        } else {
            D || (D = h);
            var V = "/" + b.AppURI + "/Cart/AddWithName/" + c + "/" + e + "/" + d + "/" + f + "/" + g + "/" + k,
                V = V + ("/" + (n.name || "-") + "/" + (q.number || "-") + "/" + n.color + "/" + n.size + "/" + n.font_id + "/" + q.size + "/" + q.font_id + "/" + q.color);
            service.ajaxCallStarted && service.ajaxCallStarted("AddItemToCart", "添加到购物车...");
            m.lockCart = !0;
            $.ajax({
                type: "POST",
                url: m.adjustUrl(V),
                xhrFields: r,
                dataType: "text",
                data: {
                    Designer: 1
                },
                success: function(b) {
                    m.lockCart = !1;
                    service.ajaxCallEnded && service.ajaxCallEnded("AddItemToCart");
                    t && t(b);
                },
                error: function(b) {
                    m.lockCart = !1;
                    service.ajaxCallEnded && service.ajaxCallEnded("AddItemToCart");
                    D && D(b);
                }
            });
        }
    };
    this.removeNameNumberFromCart = function(b, c, f, g, h) {
        if (m.lockCart) {
            setTimeout(function() {
                m.removeNameNumberFromCart(b, c, f, g, h);
            }, 100);
        } else {
            return d({
                methodName: "SaveCartItemNameNumberRemove",
                parameters: [b, c, f],
                successRootTagName: "OK",
                deserializationSettings: {},
                loadingMessage: "获取 球衣模式 子项",
                processResults: null,
                success: g,
                error: h,
                postData: {
                    designer: 1
                },
                lockCart: !0
            });
        }
    };
    this.updateNameNumberFont = function(b, c, f, g, h, k) {
        if (m.lockCart) {
            setTimeout(function() {
                m.updateNameNumberFont(b, c, f, g, h, k);
            }, 100);
        } else {
            var n = {
                methodName: "SaveCartItemNameNumberFont",
                parameters: [b, c],
                successRootTagName: "OK",
                deserializationSettings: {},
                loadingMessage: "更新 球衣模式 子项",
                processResults: null,
                success: h,
                error: k,
                postData: {
                    designer: 1
                },
                lockCart: !0
            }, q = n.postData;
            q.Color = f.color;
            q.NameSize = f.size;
            q.NameFontID = f.font_id;
            q.NumberColor = g.color;
            q.NumberSize = g.size;
            q.NumberFontID = g.font_id;
            return d(n);
        }
    };
    this.updateNameNumber = function(b, c, f, g, h, k, n, q) {
        if (m.lockCart) {
            setTimeout(function() {
                m.updateNameNumber(b, c, f, g, h, k, n, q);
            }, 100);
        } else {
            var r = {
                methodName: "SaveCartItemNameNumber",
                parameters: [b, c, f, g],
                successRootTagName: "OK",
                deserializationSettings: {},
                loadingMessage: "更新 球衣模式 子项",
                processResults: null,
                success: n,
                error: q,
                postData: {
                    designer: 1
                },
                lockCart: !0
            }, t = r.postData;
            t.Name = h;
            t.Number = k;
            return d(r);
        }
    };
    this.saveCartCouponCode = function(b, c, f, g) {
        if (m.lockCart) {
            setTimeout(function() {
                m.saveCartCouponCode(b, c, f, g);
            }, 100);
        } else {
            return d({
                methodName: "SaveCartCouponCode",
                parameters: [b, c],
                successRootTagName: "OK",
                deserializationSettings: {},
                loadingMessage: "检查优惠券",
                processResults: null,
                success: f,
                error: g,
                postData: {
                    designer: 1
                },
                lockCart: !0
            });
        }
    };
    this.removeCartItemSize = function(c, e, d, f) {
        if (m.lockCart) {
            setTimeout(function() {
                m.removeCartItemSize(c, e, d, f);
            }, 100);
        } else {
            f || (f = h);
            var g = "/" + b.AppURI + "/Cart/RemoveSize/" + c + "/" + e;
            service.ajaxCallStarted && service.ajaxCallStarted("RemoveCartItemSize", "删除尺码...");
            m.lockCart = !0;
            $.ajax({
                type: "POST",
                url: m.adjustUrl(g),
                xhrFields: r,
                dataType: "text",
                data: {
                    Designer: 1
                },
                success: function(b) {
                    m.lockCart = !1;
                    service.ajaxCallEnded && service.ajaxCallEnded("RemoveCartItemSize");
                    d && d(b);
                },
                error: function(b) {
                    m.lockCart = !1;
                    service.ajaxCallEnded && service.ajaxCallEnded("RemoveCartItemSize");
                    f && f(b);
                }
            });
        }
    };
    this.removeCartItem = function(c, e, d, f) {
        if (m.lockCart) {
            setTimeout(function() {
                m.removeCartItem(c, e, d, f);
            }, 100);
        } else {
            f || (f = h);
            var g = "/" + b.AppURI + "/Cart/Remove/" + c + "/" + e;
            service.ajaxCallStarted && service.ajaxCallStarted("RemoveCartItem", "删除购买项目...");
            m.lockCart = !0;
            $.ajax({
                type: "POST",
                url: m.adjustUrl(g),
                xhrFields: r,
                dataType: "text",
                data: {
                    Designer: 1
                },
                success: function(b) {
                    m.lockCart = !1;
                    service.ajaxCallEnded && service.ajaxCallEnded("RemoveCartItem");
                    d && d(b);
                },
                error: function(b) {
                    m.lockCart = !1;
                    service.ajaxCallEnded && service.ajaxCallEnded("RemoveCartItem");
                    f && f(b);
                }
            });
        }
    };
    this.updateCartItemQuantity = function(c, e, d, f, g, k) {
        if (m.lockCart) {
            setTimeout(function() {
                m.updateCartItemQuantity(c, e, d, f, g, k);
            }, 100);
        } else {
            k || (k = h);
            var n = "/" + b.AppURI + "/Cart/UpdateQty/" + c + "/" + e + "/" + d + "/" + f;
            service.ajaxCallStarted && service.ajaxCallStarted("UpdateCartItemQuantity", "更新数量...");
            m.lockCart = !0;
            $.ajax({
                type: "POST",
                url: m.adjustUrl(n),
                xhrFields: r,
                dataType: "text",
                data: {
                    Designer: 1
                },
                success: function(b) {
                    m.lockCart = !1;
                    service.ajaxCallEnded && service.ajaxCallEnded("UpdateCartItemQuantity");
                    g && g(b);
                },
                error: function(b) {
                    m.lockCart = !1;
                    service.ajaxCallEnded && service.ajaxCallEnded("UpdateCartItemQuantity");
                    k && k(b);
                }
            });
        }
    };
    this.saveCartItemNotes = function(b, c, f, g, h) {
        if (m.lockCart) {
            setTimeout(function() {
                m.saveCartItemNotes(b, c, f, g, h);
            }, 100);
        } else {
            return d({
                methodName: "SaveCartItemNotes",
                parameters: [b, c],
                successRootTagName: "OK",
                deserializationSettings: {},
                loadingMessage: "保存备注",
                processResults: null,
                success: g,
                error: h,
                postData: {
                    designer: 1,
                    Notes: f
                },
                lockCart: !0
            });
        }
    };
    this.clearCart = function(b, c, d, f) {
        service.getCart(b, !1, function(b) {
            for (var f = 0, g = 0; g < b.cart_retail_items.length; g++) {
                service.removeCartItem(c, b.cart_retail_items[g].cart_retail_item_id, function() {
                    f++;
                    f == b.cart_retail_items.length && d && d();
                });
            }
        }, function(b, c, e, d) {
            f && f(b, c, e, d);
        });
    };
    this.removeCartItem = function(c, e, d, f) {
        m.lockCart ? setTimeout(function() {
            m.removeCartItem(c, e, d, f);
        }, 100) : (service.ajaxCallStarted && service.ajaxCallStarted("RemoveCartItem", "从购物车中删除..."), m.lockCart = !0, $.ajax({
            type: "POST",
            url: m.adjustUrl("/" + b.AppURI + "/Cart/Remove/" + c + "/" + e),
            xhrFields: r,
            data: {
                Designer: 1
            },
            success: function(b) {
                m.lockCart = !1;
                service.ajaxCallEnded && service.ajaxCallEnded("RemoveCartItem");
                d && d(b);
            },
            error: function(b, c, e) {
                m.lockCart = !1;
                service.ajaxCallEnded && service.ajaxCallEnded("RemoveCartItem");
                f && f(b, c, e);
            }
        }));
    };
    this.saveCartEmail = function(b, c, f, g) {
        if (m.lockCart) {
            setTimeout(function() {
                m.saveCartEmail(b, c, f, g);
            }, 100);
        } else {
            var h = {
                methodName: "SaveCartEmail",
                parameters: [b],
                successRootTagName: "OK",
                loadingMessage: "保存 Cart E-mail",
                success: f,
                error: g,
                lockCart: !0
            };
            h.postData = {
                email: c
            };
            return d(h);
        }
    };
    this.getCart = function(b, c, f, g) {
        return d({
            methodName: "GetCart",
            parameters: [b],
            queryStringParameters: {
                ReadyToOrder: c
            },
            successRootTagName: "Cart",
            deserializationSettings: {
                carts: {
                    name: "cart",
                    mode: "single"
                },
                retail_products: {
                    mode: "merge"
                },
                cart_retail_item_sizes: {
                    name: "selectedSizes",
                    mode: "array"
                },
                validation_messages: {
                    mode: "single"
                }
            },
            loadingMessage: "获取购物车",
            processResults: function(b) {
                if ("" == b) {
                    return {};
                }
                var c = b.cart;
                if (c.validation_messages && c.validation_messages.validation_message) {
                    for (c.validation_messages = c.validation_messages.validation_message, b = c.validation_messages.length - 1; 0 <= b; b--) {
                        var e = c.validation_messages[b];
                        if (e.cart_retail_item_id) {
                            c.validation_messages.splice(b, 1);
                            var d = findMatch(c.cart_retail_items, function(b) {
                                return b.cart_retail_item_id === e.cart_retail_item_id;
                            });
                            e.cartRetailItem = d;
                            if (e.cart_retail_item_size_id) {
                                var f = findMatch(d.sizes, function(b) {
                                    return b.cart_retail_item_size_id === e.cart_retail_item_size_id;
                                });
                                e.cartRetailItemSize = f;
                                f.validation_messages || (f.validation_messages = []);
                                f.validation_messages.push(e);
                            }
                            d.validation_messages || (d.validation_messages = []);
                            d.validation_messages.push(e);
                        } else {
                            c.validation_messages[b] = e.replace("~", "");
                        }
                    }
                } else {
                    c.can_checkout = !0;
                }
                for (b = 0; b < c.cart_retail_items.length; b++) {
                    d = c.cart_retail_items[b];
                    "null" == d.note && (d.note = null);
                    d.original_note = d.note;
                    d.sidePreviews = [];
                    d.design_product_image_url_front && d.sidePreviews.push({
                        name: "Front",
                        imgUrl: d.design_product_image_url_front
                    });
                    d.design_product_image_url_back && d.sidePreviews.push({
                        name: "Back",
                        imgUrl: d.design_product_image_url_back
                    });
                    d.design_product_image_url_sleeveleft && d.sidePreviews.push({
                        name: "Left Sleeve",
                        imgUrl: d.design_product_image_url_sleeveleft
                    });
                    d.design_product_image_url_sleeveright && d.sidePreviews.push({
                        name: "Right Sleeve",
                        imgUrl: d.design_product_image_url_sleeveright
                    });
                    0 == d.sidePreviews.length && d.sidePreviews.push({
                        name: "Front",
                        imgUrl: d.design_product_image_url
                    });
                    if (d.sizes && d.sizeids) {
                        var f = d.sizes.split(","),
                            g = d.sizeids.split(",");
                        d.sizeData = [];
                        for (var h = 0; h < f.length; h++) {
                            d.sizeData.push({
                                name: f[h],
                                id: g[h]
                            });
                        }
                    }
                    for (f = 0; f < d.selectedSizes.length; f++) {
                        g = d.selectedSizes[f], g.quantity = parseInt(g.quantity || 0), 0 == g.quantity ? (d.selectedSizes.splice(f, 1), f--) : g.cart_retail_item_size_namenumbers && g.cart_retail_item_size_namenumbers.length ? g.cart_retail_item_size_namenumbers[0] ? d.hasNamesNumbers = !0 : (d.hasNamesNumbers = !1, g.cart_retail_item_size_namenumbers = null) : g.cart_retail_item_size_namenumbers = null, g.subtotal && g.quantity && (g.subtotal = parseFloat(g.subtotal) * parseFloat(g.quantity)), g.original_product_style_size_id =
                            g.product_style_size_id;
                    }
                    var k = "," + d.sizes + ",";
                    d.selectedSizes.sort(function(b, c) {
                        return k.indexOf("," + b.product_style_size_name + ",") - k.indexOf("," + c.product_style_size_name + ",");
                    });
                }
                c.getNameNumber = function(b) {
                    for (var e = 0; e < c.cart_retail_items.length; e++) {
                        var d = c.cart_retail_items[e];
                        if (d.hasNamesNumbers) {
                            for (var f = 0; f < d.selectedSizes.length; f++) {
                                var g = d.selectedSizes[f];
                                if (g.cart_retail_item_size_namenumbers && g.cart_retail_item_size_namenumbers.length) {
                                    for (var h = 0; h < g.cart_retail_item_size_namenumbers.length; h++) {
                                        var k = g.cart_retail_item_size_namenumbers[h];
                                        if (k.cart_retail_item_size_namenumber_id == b) {
                                            return k;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return null;
                };
                return c;
            },
            success: f,
            error: g
        });
    };
    this.getCartShippingCountryList = function(b, c, f) {
        return d({
            methodName: "GetCartShippingCountryList",
            parameters: [b],
            successRootTagName: "countries",
            deserializationSettings: {
                country: {
                    name: "countries",
                    mode: "array"
                }
            },
            loadingMessage: "获取列表-1",
            processResults: function(b) {
                for (var c = 0; c < b.countries.length; c++) {
                    var e = b.countries[c];
                    e.require_state = 1 == e.country_id || 2 == e.country_id ? !0 : !1;
                }
                return b.countries;
            },
            useCache: !0,
            success: c,
            error: f
        });
    };
    this.getCartBillingCountryList = function(b, c, f) {
        return d({
            methodName: "GetCartBillingCountryList",
            parameters: [b],
            successRootTagName: "countries",
            deserializationSettings: {
                country: {
                    name: "countries",
                    mode: "array"
                }
            },
            loadingMessage: "获取列表-2",
            processResults: function(b) {
                for (var c = 0; c < b.countries.length; c++) {
                    var e = b.countries[c];
                    e.require_state = 1 == e.country_id || 2 == e.country_id ? !0 : !1;
                }
                return b.countries;
            },
            useCache: !0,
            success: c,
            error: f
        });
    };
    this.getCartShippingStateList = function(b, c, f) {
        return d({
            methodName: "GetCartShippingStateList",
            parameters: [b],
            successRootTagName: "states",
            deserializationSettings: {
                state: {
                    name: "states",
                    mode: "array"
                }
            },
            loadingMessage: "获取列表-3",
            processResults: function(b) {
                return b.states;
            },
            useCache: !0,
            success: c,
            error: f
        });
    };
    this.getCartBillingStateList = function(b, c, f) {
        return d({
            methodName: "GetCartBillingStateList",
            parameters: [b],
            successRootTagName: "states",
            deserializationSettings: {
                state: {
                    name: "states",
                    mode: "array"
                }
            },
            loadingMessage: "获取列表-4",
            processResults: function(b) {
                return b.states;
            },
            useCache: !0,
            success: c,
            error: f
        });
    };
    this.getCartShippingAddresses = function(b, c, f) {
        return d({
            methodName: "GetCartShippingAddresses",
            parameters: [b],
            successRootTagName: "addresses",
            deserializationSettings: {
                address: {
                    name: "addresses",
                    mode: "array"
                }
            },
            loadingMessage: "获取以保存的地址",
            processResults: function(b) {
                return b.addresses;
            },
            success: c,
            error: f
        });
    };
    this.saveCartShippingAddress = function(b, c, f, g) {
        return d({
            methodName: "SaveCartShippingAddress",
            parameters: [b],
            successRootTagName: "address_id",
            deserializationSettings: {},
            loadingMessage: "保存地址",
            processResults: function(b) {},
            success: f,
            error: g,
            postData: c
        });
    };
    this.saveCartBillingAddress = function(b, c, f, g) {
        return d({
            methodName: "SaveCartBillingAddress",
            parameters: [b],
            successRootTagName: "address_id",
            deserializationSettings: {},
            loadingMessage: "保存地址",
            processResults: function(b) {},
            success: f,
            error: g,
            postData: c
        });
    };
    this.getCartShippingMethods = function(b, c, f) {
        return d({
            methodName: "GetCartShippingMethods",
            parameters: [b],
            successRootTagName: "shipping_methods",
            deserializationSettings: {},
            loadingMessage: "获取购物设置",
            processResults: function(b) {
                return b.shipping_method;
            },
            success: c,
            error: f
        });
    };
    this.saveCartShippingMethod = function(b, c, f, g) {
        return d({
            methodName: "SaveCartShippingMethod",
            parameters: [b],
            successRootTagName: "method_id",
            deserializationSettings: {},
            loadingMessage: "保存购物设置",
            processResults: function(b) {
                return b;
            },
            postData: {
                method_id: c
            },
            success: f,
            error: g
        });
    };
    this.saveCartOrder = function(c, e, f, g) {
        return d({
            methodName: "SaveCartOrder",
            parameters: [c],
            successRootTagName: "OrderNumber",
            deserializationSettings: {},
            loadingMessage: "保存订单",
            processResults: function(b) {},
            success: f,
            error: g,
            postData: e,
            useSSL: "Credit Card" == e.payment_method ? !0 : b.sslDomain && jQuery.support.cors ? !0 : !1
        });
    };
    this.getCartOrder = function(b, c, f) {
        return d({
            methodName: "GetCartOrder",
            parameters: [UserToken],
            successRootTagName: "OrderNumber",
            deserializationSettings: {},
            loadingMessage: "获取订单",
            processResults: function(b) {},
            success: c,
            error: f,
            postData: order
        });
    };
    this.sendDesignEmail = function(b, c, f, g, h, k, m, n, q, r) {
        g = '<?xml version="1.0"?><xml><designs><to_email>' + htmlEscape(g) + "</to_email><from_email>" + htmlEscape(h) + "</from_email><from_name>" + htmlEscape(k) + "</from_name><to_name>" + htmlEscape(m) + "</to_name><message>" + htmlEscape(n) + "</message></designs></xml>";
        return d({
            methodName: "SendDesignEmail",
            parameters: [b, c, f],
            successRootTagName: "Design",
            deserializationSettings: {},
            loadingMessage: "发送电子邮件",
            processResults: function(b) {},
            success: q,
            error: r,
            postData: {
                designer: 1,
                xmlTemplate: g
            }
        });
    };
    this.getAccountDetails = function(b, c) {
        return d({
            methodName: "Account/EditUserXml",
            parameters: [],
            successRootTagName: "User",
            deserializationSettings: {},
            loadingMessage: "检索帐户",
            processResults: function(b) {},
            success: b,
            error: c,
            noAppTokenInUrl: !0
        });
    };
    this.updateAccountDetails = function(b, c, f) {
        return d({
            methodName: "Account/EditUserXml",
            parameters: [],
            successRootTagName: "Success",
            deserializationSettings: {},
            loadingMessage: "更新账号",
            processResults: function() {},
            success: c,
            error: f,
            postData: b,
            noAppTokenInUrl: !0
        });
    };
    this.getOrderHistory = function(b, c) {
        return d({
            methodName: "Account/OrderHistoryXml",
            parameters: [],
            successRootTagName: "OrderSearchResult",
            deserializationSettings: {
                retail_products: {
                    mode: "merge"
                },
                addresses: {
                    mode: "merge"
                },
                billing_address: {
                    name: "billing_address",
                    mode: "single"
                },
                shipping_address: {
                    name: "shipping_address",
                    mode: "single"
                },
                order_retail_item_sizes: {
                    name: "selectedSizes",
                    mode: "array"
                }
            },
            loadingMessage: "获取订单",
            processResults: function(b) {
                return "" === b ? [] : b.orders;
            },
            success: b,
            error: c,
            noAppTokenInUrl: !0,
            useAppURI: !0
        });
    };
    this.deserializeCartTests = function(b) {
        return k($.parseXML(b).children[0], {
            tests: {
                mode: "merge"
            },
            billing_address: {
                mode: "single"
            },
            shipping_address: {
                mode: "single"
            },
            result: {
                mode: "single"
            },
            cart: {
                mode: "single"
            },
            cart_item: {
                name: "cart_items"
            },
            size: {
                name: "sizes"
            },
            name_number: {
                name: "names_numbers"
            }
        }).test;
    };
    this.resultCache = n;
};
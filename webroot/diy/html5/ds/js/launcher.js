//设计工具入口
//添加结构 "HTML5DS" 和 "EZD"
function launchDesigner(type, vars, target) {

    var setVars = function (success) {

        var getUrlParam = function (name) {
            if (!window.isUrlParams) {
                (window.onpopstate = function () {
                    var match,
                        pl = /\+/g,  // Regex for replacing addition symbol with a space
                        search = /([^&=]+)=?([^&]*)/g,
                        decode = function (s) {
                            return decodeURIComponent(s.replace(pl, " "));
                        },
                        query = window.location.search.substring(1);

                    window.isUrlParams = {};
                    while (match = search.exec(query)) {
                        window.isUrlParams[decode(match[1])] = decode(match[2]);
                    }
                })();
            }
            return window.isUrlParams[name];
        };
        var inIFrame = /dsFrame\.html/.test(location.href);

        window.ezdVars = vars;

        //使用全能的HTTP请求头
        if (vars.DesignerLocation && location.origin !== "file://") {
            vars.DesignerLocation = vars.DesignerLocation.replace("https://", "//").replace("http://", "//");
        }

        for (var key in vars) {
            if (!vars[key]) {
                continue;
            }
            var type = typeof vars[key];
            if (type == "string" && vars[key].toLowerCase() == "true") {
                vars[key] = true;
            } else if (type == "string" && vars[key].toLowerCase() == "false") {
                vars[key] = false;
            } else if (vars[key] == "0") {
                vars[key] = 0;
            }
        }
        if (!vars.ProductID) {
            vars.ProductID = 0;
        }
        if (!vars.ProductStyleID) {
            vars.ProductStyleID = 0;
        }
        if (!vars.DefaultProductID) {
            vars.DefaultProductID = 0;
        }
        if (!vars.DefaultProductStyleID) {
            vars.DefaultProductStyleID = 0;
        }
        if (getUrlParam("DesignID")) {
            vars.DesignID = getUrlParam("DesignID");
        }
        if (getUrlParam("ActivityID")) {
            vars.ActivityID = getUrlParam("ActivityID");
        }
        var themeName = getUrlParam("themeName");
        if (themeName) {
            ezdVars.ThemeName = themeName;
        }
        if (!ezdVars.ThemeName) {
            ezdVars.ThemeName = "flat";
        }
        if (success) {
            success();
        }
    };

    var loadScript = function (scriptPath, scriptTagID, success, error) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = success;
        if (navigator.userAgent.match(/(MSIE 8)/g)) {
            var done = false;
            script.onreadystatechange = function () {
                if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                    done = true;
                    if (success) {
                        success();
                    }

                    // Handle memory leak in IE
                    script.onload = script.onreadystatechange = null;
                    if (head && script.parentNode) {
                        head.removeChild(script);
                    }
                }
            };
        }

        try { //throws exception in IE8
            script.onerror = error;
        } catch (ex) {
        }
        script.src = addVersionToUrl(scriptPath);
        if (scriptTagID) {
            script.id = scriptTagID;
        }
        head.appendChild(script);
    };

    var loadCss = function (cssPath, id) {
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", addVersionToUrl(cssPath));
        if (id) {
            fileref.id = id;
        }
        document.getElementsByTagName("head")[0].appendChild(fileref);
        return fileref;
    };

    var addVersionToUrl = function (url) {
        if (!ezdVars.Version) {
            return url;
        }
        if (url.indexOf('?') >= 0) {
            url += "&version=" + ezdVars.Version;
        } else {
            url += "?version=" + ezdVars.Version;
        }
        return url;
    };

    var checkjQueryVersion = function () {
        if (!window.jQuery) {
            return false;
        }
        var version = window.jQuery.fn.version || window.jQuery.fn.jquery;
        if (!version) {
            return false;
        }
        var versionInts = version.split('.');
        //1.7 is when the on() functionality was added.  I think other than that we could support older versions.
        var isGood = versionInts[0] > 1 || (versionInts[0] == 1 && versionInts[1] >= 7);
        if (isGood && typeof window.$ == 'undefined') {
            window.$ = window.jQuery;
        }
        return isGood;
    };

    var loadDS = function () {
//        setTimeout(function () {
//            try {
//                var d = {};
//                d.Url = (document.referrer.toString().length > 0 ? document.referrer.toString() : document.location.toString());
//                d.StoreId = vars.StoreID;
//                $.ajax({
//                    type: 'POST',
//                    url: "//" + ezdVars.ApiDomain + "/init/etClient/?appKey="+ vars.AppToken,
//                    dataType: 'json',
//                    data: {'': JSON.stringify(d)}
//                });
//            } catch (ex) {
//            }
//        }, 5000);
        if (ezdVars.ThemeName) { //always true now.
            loadCss(ezdVars.DesignerLocation + "/ds/themes/" + ezdVars.ThemeName + "/css/style.css", 'defaultThemeStylesheet');
        }
        var releaseMode = false;
        var minMode = false;
        if(releaseMode && minMode){
            loadScript(ezdVars.DesignerLocation + "/ds/js/package.min.js", 'package_min');
        }else if(releaseMode && !minMode){
            loadScript(ezdVars.DesignerLocation + "/ds/js/package.js", 'package');
        }else{
            loadScript(ezdVars.DesignerLocation + "/ds/js/core/1_util.js", 'a1', function(){
                loadScript(ezdVars.DesignerLocation + "/ds/js/core/2_base.js", 'a2', function(){
                    loadScript(ezdVars.DesignerLocation + "/ds/js/core/4_vender.extand.js", 'a3', function(){
                        loadScript(ezdVars.DesignerLocation + "/ds/js/core/5_math.js", 'a4', function(){
                            loadScript(ezdVars.DesignerLocation + "/ds/js/core/6_ui.text.js", 'a5', function(){});
                            loadScript(ezdVars.DesignerLocation + "/ds/js/core/7_ui.element.js", 'a6', function(){});
                            loadScript(ezdVars.DesignerLocation + "/ds/js/core/8_ui.svg.js", 'a7', function(){});
                            loadScript(ezdVars.DesignerLocation + "/ds/js/core/9_ui.bitmap.js", 'a8', function(){});
                            loadScript(ezdVars.DesignerLocation + "/ds/js/core/a_container.js", 'a9', function(){});
                            loadScript(ezdVars.DesignerLocation + "/ds/js/core/b_container.snap.js", 'a10', function(){});
                            loadScript(ezdVars.DesignerLocation + "/ds/js/core/c_popupmenu.js", 'a11', function(){});
                            loadScript(ezdVars.DesignerLocation + "/ds/js/core/d_ui.resolution.js", 'a12', function(){});
                            loadScript(ezdVars.DesignerLocation + "/ds/js/core/e_historymanager.js", 'a13', function(){});
                            loadScript(ezdVars.DesignerLocation + "/ds/js/core/f_com.aq.bitmap.js", 'a14', function(){});
                            loadScript(ezdVars.DesignerLocation + "/ds/js/core/g_rapheal.js", 'a15', function(){});
                            loadScript(ezdVars.DesignerLocation + "/ds/js/core/h_baseEZD.js", 'a16', function(){});

                            loadScript(ezdVars.DesignerLocation + "/ds/js/core/j_directive.js", 'a18', function(){});
                            loadScript(ezdVars.DesignerLocation + "/ds/js/core/k_ui.directives.js", 'a19', function(){});
                            loadScript(ezdVars.DesignerLocation + "/ds/js/core/l_ui.common.js", 'a20', function(){});
                            loadScript(ezdVars.DesignerLocation + "/ds/js/core/m_ui.js", 'a21', function(){
                                loadScript(ezdVars.DesignerLocation + "/ds/js/core/n_parser.js", 'a22', function(){});
                                loadScript(ezdVars.DesignerLocation + "/ds/js/core/p_ui.controllers.js", 'a24', function(){
                                    loadScript(ezdVars.DesignerLocation + "/ds/js/core/controllers/ActionController.js", 'a29_1', function(){
                                        loadScript(ezdVars.DesignerLocation + "/ds/js/core/controllers/DesignerController.js", 'a29_2', function(){
                                            loadScript(ezdVars.DesignerLocation + "/ds/js/step2/controller/saleGoalController.js", 'a24_1', function(){
                                                loadScript(ezdVars.DesignerLocation + "/ds/js/step1/controller/step1Controller.js", 'a24_2', function(){
                                                    loadScript(ezdVars.DesignerLocation + "/ds/js/step2/controller/step2Controller.js", 'a24_3', function(){
                                                        loadScript(ezdVars.DesignerLocation + "/ds/js/step3/controller/step3Controller.js", 'a24_4', function(){
                                                            loadScript(ezdVars.DesignerLocation + "/ds/js/step3/controller/addressController.js", 'a24_5', function(){
                                                                loadScript(ezdVars.DesignerLocation + "/ds/js/step3/controller/addressListController.js", 'a24_6', function(){
                                                                    loadScript(ezdVars.DesignerLocation + "/ds/js/core/controllers/DesignColorsController.js", 'a24_7', function(){
                                                                        loadScript(ezdVars.DesignerLocation + "/ds/js/core/controllers/ProductColorsController.js", 'a24_71', function(){
                                                                            loadScript(ezdVars.DesignerLocation + "/ds/js/core/controllers/AddTextController.js", 'a24_72', function(){
                                                                                loadScript(ezdVars.DesignerLocation + "/ds/js/core/controllers/BrowseProductsController.js", 'a24_8', function(){
                                                                                    loadScript(ezdVars.DesignerLocation + "/ds/js/core/controllers/EditTextController.js", 'a24_9', function(){
                                                                                        loadScript(ezdVars.DesignerLocation + "/ds/js/core/controllers/ProductCategoriesController.js", 'a24_10', function(){

                                                                                            loadScript(ezdVars.DesignerLocation + "/ds/js/core/controllers/ProductRegionController.js", 'a24_101', function(){

                                                                                                loadScript(ezdVars.DesignerLocation + "/ds/js/core/q_startangularapp.js", 'a25', function(){});
                                                                                                loadScript(ezdVars.DesignerLocation + "/ds/js/core/r_modal.js", 'a26', function(){});
                                                                                                loadScript(ezdVars.DesignerLocation + "/ds/js/core/i_easyteeservice.js", 'a17', function(){
                                                                                                    loadScript(ezdVars.DesignerLocation + "/ds/js/core/o_window.regist.js", 'a23', function(){
                                                                                                        loadScript(ezdVars.DesignerLocation + "/ds/js/core/t_ready.js", 'a31', function(){
                                                                                                            loadScript(ezdVars.DesignerLocation + "/ds/js/core/s_ajaxcallback.js", 'a27', function(){});
                                                                                                        });
                                                                                                    });
                                                                                                });
                                                                                            });



                                                                                        });
                                                                                    });
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }
    };

    var loadPrereqs = function (success) {

        if (!checkjQueryVersion()) {
            if (!window.jQuery) {
                window.jQuery = {};
            }//hack to trick the main page into not downloading jquery and creating a race condition where the last one downloaded wins.
            loadScript(ezdVars.DesignerLocation + "/common/js/jquery-1.11.2.js", "jquery1.11.2", function () {

                if (!window.angular || !window.angular.bootstrap) //angularjs batarang extension defines window.angular but not window.angular.bootstrap.
                {
                    loadScript(ezdVars.DesignerLocation + "/common/js/angular.min.js", "angular", function () {
                        loadScript(ezdVars.DesignerLocation + "/common/js/angular-route.min.js", "angularRoute", success)
                    });
                } else {
                    success();
                }
                if(!window.bootstrap){
                    loadScript(ezdVars.DesignerLocation+"/common/js/bootstrap.min.js", "bootstrap");
                }
            });
        } else if (!window.angular || !window.angular.bootstrap) {
            loadScript(ezdVars.DesignerLocation + "/common/js/angular.min.js", "angular", function () {
                loadScript(ezdVars.DesignerLocation + "/common/js/angular-route.min.js", "angularRoute", success)
            });

            loadScript(ezdVars.DesignerLocation+"/common/js/jquery-ui.min.js", "jquery_ui", function(){
                loadScript(ezdVars.DesignerLocation+'/common/js/jquery-ui-slider.js', 'jquery_plugin_honest_slider_js');
                loadCss(ezdVars.DesignerLocation + "/common/js/jquery-ui-slider.css", "jquery_plugin_honest_slider_css");
                loadCss(ezdVars.DesignerLocation + "/common/js/jquery-ui.min.css", "jquery_ui_css");

                loadScript('/resources/plug/ueedit/ueditor.config.js', 'ueditor_config', function(){;
                    loadScript('/resources/plug/ueedit/ueditor.all.min.js', 'ueditor_all_min', function(){
                        loadScript(ezdVars.DesignerLocation+'/vendor/angular.ueditor.min.js', 'angular_ueditor');
                    });
                });
            });
        } else{
            success();
        }
    };

    var addContainer = function () {
        var containerElement = document.createElement("div");
        containerElement.id = "dsContainer";
        containerElement.setAttribute("class", "dsContainer");
        target.style.fontSize = "16px";
        target.appendChild(containerElement);
    };

    var getStarted = function () {
        if (vars.EmbedType == "iframe") {
            var themesInfo = {flat: {width: '100%', height: '100%'}, 'default': {width: '100%', height: '760px'}};
            var theme = themesInfo[vars.ThemeName || "flat"] || themesInfo['flat'];
            var iframe = document.createElement("iframe");
            var url = ezdVars.DesignerLocation + '/ds/dsFrame.html?';
            //pass flashvars in via url
            for (var fv in vars) {
                url += "&" + fv + "=" + encodeURIComponent(vars[fv]);
            }
            iframe.setAttribute("src", url);
            iframe.style.width = ezdVars.Width || theme.width;
            iframe.style.height = ezdVars.Height || theme.height;
            iframe.style.border = 0;
            target.appendChild(iframe);

        } else {
            addContainer();
            //enable cors.
            loadPrereqs(function () {
                loadDS()
            });
        }
    };

    function ajax(url, complete) {
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                complete(xmlhttp.responseText);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    setVars(function () {
        //if there's already a version, no need to go get it.  Otherwise, get it from the server and make sure it's never cached.
        if (ezdVars.Version) {
            getStarted();
        } else {
            try {
                ajax(ezdVars.DesignerLocation + "/ds/version.txt?v=" + (new Date()).getTime(), function (version) {
                    try {
                        ezdVars.Version = parseInt(version);
                    } catch (ex) {
                    }
                    getStarted();
                })
            }
            catch (ex) {
                getStarted();
            }
        }
    });
}

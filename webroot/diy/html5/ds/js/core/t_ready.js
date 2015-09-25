$(document).ready(function() {
    getUrlParam && getUrlParam("themeName") && (ezdVars.ThemeName = getUrlParam("themeName"));
    "default" == ezdVars.ThemeName && (ezdVars.ThemeName = null);
    var b = navigator.userAgent.match(/(MSIE 8)/g) || navigator.userAgent.match(/(MSIE 7)/g) || navigator.userAgent.match(/(MSIE 6)/g),
        d = navigator.userAgent.match(/(MSIE 9)/g);
    $.browser && (b = $.browser.msie && 9 > parseFloat($.browser.version, 10), d = $.browser.msie && 10 > parseFloat($.browser.version, 10));
    b ? getHtmlContent($("#dsContainer"), ezdVars.DesignerLocation + "/ds/html/modals/browserWarningIE8.html", function() {}) : (d && (b = $("<div></div>"), b.insertBefore($("#dsContainer")), getHtmlContent(b, ezdVars.DesignerLocation + "/ds/html/modals/browserWarningIE9.html", function() {})), ezdVars.ThemeName ? service.getThemeInfo(ezdVars.DesignerLocation + "/ds/themes/" + ezdVars.ThemeName + "/theme.xml", function(b) {
        state.theme = b;
        state.theme.hasFile = function(b) {
            if (!b) {
                return !1;
            }
            b = b.toLowerCase();
            for (var c = 0; c < state.theme.files.length; c++) {
                if (b.endsWith(state.theme.files[c].toLowerCase())) {
                    return !0;
                }
            }
        };
        state.theme.url = function(b) {
            if (!state.theme.hasFile(b)) {
                return b;
            }
            b = b.replace("/ds/html/", "/ds/themes/" + ezdVars.ThemeName + "/html/");
            b = b.replace("/ds/images/", "/ds/themes/" + ezdVars.ThemeName + "/images/");
            b = b.replace("/ds/css/", "/ds/themes/" + ezdVars.ThemeName + "/css/");
            ezdVars.Version && (b = 0 <= b.indexOf("?") ? b + ("&version=" + ezdVars.Version) : b + ("?version=" + ezdVars.Version));
            return b;
        };
        for (b = 0; b < state.theme.files.length; b++) {
            var d = state.theme.files[b];
            if (d.endsWith(".css")) {
                service.loadCss(ezdVars.DesignerLocation + "/ds/themes/" + ezdVars.ThemeName + "/" + d);
            } else {
                if (d.endsWith(".less") && window.less) {
                    var k = document.createElement("link");
                    k.setAttribute("rel", "stylesheet/less");
                    k.setAttribute("type", "text/css");
                    k.setAttribute("href", ezdVars.DesignerLocation + "/ds/themes/" + ezdVars.ThemeName + "/" + d);
                    document.getElementsByTagName("head")[0].appendChild(k);
                    less.sheets.push(k);
                    less.refresh();
                }
            }
        }
        getHtmlContent($("#dsContainer"), state.theme.url(ezdVars.DesignerLocation + "/ds/html/dsStructure.html"), function() {
            state.dsUtils.loadDesignInformation(function() {
                startAngularApp();
            });
            var b = document.getElementById("designerParentContainer");
            b && "iframe" == ezdVars.EmbedType || (b = document.getElementById("dsContainer"));
            ezdVars.BackgroundColor ? $(b).css("background-color", getColorString(ezdVars.BackgroundColor)) : ezdVars.Background && 0 == ezdVars.Background.indexOf("http") && $(b).css("background-image", "url(" + ezdVars.Background + ")");
        });
    }) : (state.theme = {
        url: function(b) {
            return b;
        }
    }, state.theme.hasFile = function(b) {
        return !1;
    }, getHtmlContent($("#dsContainer"), state.theme.url(ezdVars.DesignerLocation + "/ds/html/dsStructure.html"), function() {
        state.dsUtils.loadDesignInformation(function() {
            startAngularApp();
        });
    })));
});
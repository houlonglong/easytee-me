Namespace("ui.directives");
ui.directives.pagerDirective = ["$parse",
    function(b) {
        var d = function(b) {
            this.allData = null;
            this.pageSize = b;
            this.currentPageNum = 0;
            this.__defineGetter__("currentPage", function() {
                return this.allData ? this.allData.slice(this.currentPageNum * this.pageSize, this.currentPageNum * this.pageSize + this.pageSize) : [];
            });
            this.__defineGetter__("pageNumbers", function() {
                if (!this.allData) {
                    return [];
                }
                var b = [],
                    c = Math.ceil(this.allData.length / this.pageSize);
                if (1 >= c) {
                    return [];
                }
                for (var d = 0; d < c; d++) {
                    b.push(d);
                }
                return b;
            });
        };
        return {
            link: function(c, g, k) {
                c[k.isPager + "Pager"] = new d(parseInt(k.pageSize));
                c[k.isPager + "Pager"].allData = b(k.isPager)(c);
                c.$watch(k.isPager, function() {
                    c[k.isPager + "Pager"].allData = b(k.isPager)(c);
                });
            }
        };
    }
];
ui.directives.colorPickerDirective = ["$parse",
    function(b) {
        return {
            link: function(d, c, g) {
                c.spectrum({
                    flat: !0,
                    showInput: !0,
                    allowEmpty: !1,
                    preferredFormat: "hex",
                    showButtons: !1,
                    color: "#FFFFFF",
                    move: function(c) {
                        ezdVars.ArtToolsMode && (b(g.ngModel).assign(d, c.toHexString()), (c = b(g.ngChange)) && c(d));
                    }
                });
            }
        };
    }
];
ui.directives.errorSrcDirective = function() {
    return {
        link: function(b, d, c) {
            d.bind("error", function() {
                c.src != c.isErrorSrc && c.$set("src", c.isErrorSrc);
            });
        }
    };
};
ui.directives.imgLoadingOverlay = function() {
    return {
        link: function(b, d, c) {
            var g = $(c.isImgPreload);
            0 < !d.parent().has(g).length && (g = g.clone(), d.parent().append(g));
            g.show();
            d.load(function() {
                g.hide();
            });
            d.error(function() {
                g.hide();
            });
        }
    };
};
ui.directives.addThis = function() {
    return {
        link: function(b, d, c) {
            setTimeout(function() {
                if (0 != location.href.indexOf("file:")) {
                    var b = c.designId;
                    window.addthis_share = {
                        url: "http://" + ezdVars.ApiDomain + "/" + ezdVars.AppURI + "/Design/" + encodeURI(c.designName) + "_" + b
                    };
                    document.getElementById("addThisWidget") ? addthis.toolbox("#" + d[0].id) : service.loadScript("https://s7.addthis.com/js/250/addthis_widget.js#pubid=" + ezdVars.AddThisPublisherId, "addThisWidget", function() {
                        addthis.toolbox("#" + d[0].id);
                    });
                }
            }, 50);
        }
    };
};
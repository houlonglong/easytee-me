Namespace("ui");
ui.ThemeEditor = function(b) {
    var d = this;
    this.rules = b;
    this.makeUI = function() {
        for (var c = $("<form id='isd-themeEditor'><button type='button' id='isd-saveThemeButton'>Save</button><button type='button' id='isd-resetThemeButton'>Reset</button></form>").prependTo(document.body), g = {}, k = 0; k < b.length; k++) {
            var h = b[k];
            g[h.group] || (g[h.group] = []);
            g[h.group].push(h);
            "color" == h.type ? h.html = "<li><span>" + h.label + ':</span> <input type="color" name="' + h.id + '" id="' + h.id + '" class="themeControl" value= "' + h["default"] + '"/></li>' : "text" == h.type && (h.html = "<li><span>" + h.label + ':</span> <input type="text" name="' + h.id + '" id="' + h.id + '" class="themeControl" value= "' + h["default"] + '"/></li>');
        }
        for (var f in g) {
            c.append('<a class="groupLabel" href="#group' + f.replace(/ /gi, "") + '">' + f + "</a>");
        }
        for (f in g) {
            for (var m = '<ul id="group' + f.replace(/ /gi, "") + '" class="groupControls" style="display:none">', k = 0; k < g[f].length; k++) {
                h = g[f][k], m += h.html;
            }
            m += "</ul>";
            c.append(m);
        }
        $("a.groupLabel").click(function(b) {
            var c = $($(b.currentTarget).attr("href"));
            $(".groupLabel").removeClass("active");
            c.is(":visible") ? c.slideUp() : ($(".groupControls").hide(), c.slideDown(), $(b.currentTarget).addClass("active"));
        });
        $("#isd-saveThemeButton").click(function() {
            d.saveChanges();
        });
        $("#isd-resetThemeButton").click(function() {
            for (var c = 0; c < b.length; c++) {
                $("#" + b[c].id).val(b[c]["default"]);
            }
            d.applyChangesToDocument();
        });
        $(".themeControl").change(this.applyChangesToDocument);
        this.getChanges(function(b) {
            b && $(b).find("Setting").each(function() {
                var b = $("#" + $(this).attr("rule_id"));
                b && b.val($(this).attr("value"));
            });
        });
    };
    this.applyChangesToDocument = function() {
        $("#isd-themeCustomization").remove();
        for (var c = "<style id='isd-themeCustomization'>", d = 0; d < b.length; d++) {
            var k = b[d];
            if ("color" == k.type) {
                c += k.css[0].replace(/%%value%%/gi, $("#" + k.id).val());
            } else {
                if ("cssChoice" != k.type && "text" == k.type) {
                    var h = $(k.selector).text();
                    (ezdVars.EditTheme || h == k["default"]) && $(k.selector).text($("#" + k.id).val());
                }
            }
        }
        $("head").append(c + "</style>");
    };
    this.saveChanges = function() {
        var c = {};
        $("#isd-themeEditor input").each(function() {
            c[this.id] = $(this).val();
        });
        for (var d in c) {
            var k = findMatch(b, function(b) {
                return b.id == d;
            });
            c[d] == k["default"] && delete c[d];
        }
        $.ajax({
            type: "POST",
            url: "http://" + ezdVars.ApiDomain + "/" + ezdVars.AppURI + "/Config/UploadDesignerTheme/",
            data: c,
            dataType: "text/plain"
        });
    };
    this.getChanges = function(b) {
        $.ajax({
            type: "GET",
            url: "http://" + ezdVars.ApiDomain + "/images/publishers/" + ezdVars.PublisherID + "/stores/" + ezdVars.AppURI + "/dsTheme.xml",
            dataType: "xml",
            success: function(d) {
                b && b(d);
            },
            error: function() {
                b && b(null);
            }
        });
    };
    this.updateAtBeginning = function(c) {
        if (c) {
            this.currentSettings = {};
            $("#isd-themeCustomization").remove();
            var g = "<style id='isd-themeCustomization'>";
            $(c).find("Setting").each(function() {
                var c = $(this).attr("rule_id"),
                    h = findMatch(b, function(b) {
                        return b.id == c;
                    });
                h && (d.currentSettings[c] = {
                    rule: h,
                    value: $(this).attr("value")
                }, "color" == h.type && (g += h.css[0].replace(/%%value%%/gi, $(this).attr("value"))));
            });
            this.updateLabels();
            $("head").append(g + "</style>");
        }
    };
    this.updateLabels = function() {
        for (var b in this.currentSettings) {
            var d = this.currentSettings[b],
                k = d.rule;
            "text" == k.type && $(k.selector).text().toLowerCase() == k["default"].toLowerCase() && $(k.selector).text(d.value);
        }
    };
};
ui.FontManager = function(b) {
    var d = this,
        c = state.fontCategories.slice(0);
    b ? deleteMatches(c, function(b) {
        return "0" == b.IsEmbroidery;
    }) : deleteMatches(c, function(b) {
        return "1" == b.IsEmbroidery;
    });
    this.getCategories = function() {
        return c;
    };
    this.addMissingDesignFonts = function() {
        var b = c[0],
            d = !1;
        0 != b.font_style_id && (b = {
            font_style_id: 0,
            FontCount: 0
        }, b.IsEmbroidery = ezdVars.EmbroideryMode, b.font_style = b.style = "In Use", b.fonts = []);
        for (var h = 0; h < state.selectedDesign.canvas_text.length; h++) {
            var f = state.selectedDesign.canvas_text[h],
                m = findMatch(c, function(b) {
                    return b.font_style_id == f.fontStyleId;
                }),
                q = 0 <= state.excludedFontIDs.indexOf(f.fontId) || !m;
            m && m.fonts && (findMatch(m.fonts, function(b) {
                return b.font_id == f.fontId;
            }) || (q = !0));
            m = findMatch(b.fonts, function(b) {
                return b.font_id == f.fontId;
            });
            q && (f.fontObject.fontStyle = b, f.fontObject.old_font_style_id = f.fontObject.font_style_id, f.fontObject.font_style_id = 0, m || (d = d || 0 == b.FontCount, b.FontCount++, b.fonts.push(f.fontObject)));
        }
        d && c.unshift(b);
    };
    this.getFontsByCategory = function(b, k) {
        var h = findMatch(c, function(c) {
            return c.font_style_id == b;
        });
        h || (h = findMatch(c, function(b) {
            return 0 == b.font_style_id;
        }));
        h.fonts && h.fonts.length ? k(h.fonts) : service.getFontsByCategory(b, function(b) {
            h.fonts = b;
            for (var c = 0; c < b.length; c++) {
                b[c].fontStyle = h, b[c].font_style_id = h.font_style_id;
            }
            d.addMissingDesignFonts();
            k(b);
        });
    };
    this.getFontDefaults = function(b) {
        var d = "popups",
            h = "3D 03";
        ezdVars.HasGoogleFonts && (d = "Modern", h = "Modern 20");
        var f = searchInArray(c, d, "style");
        f || (f = c[c.length - 1]);
        this.getFontsByCategory(f.font_style_id, function(c) {
            var d = searchInArray(c, h, "name");
            d || (d = c[0]);
            d.font_style_id = f.font_style_id;
            b({
                category: f,
                font: d
            });
        });
    };
    this.addMissingDesignFonts();
};
ui.DSUtils = function() {
    console.log('DSUtils init');
    var b = this;
    this.syncDesignCanvasesWithProductRegions = function() {};
    this.loadDesignInformation = function(d, c, g) {
        state.selectedDesignID = state.selectedDesignID || 0;
        var k = function() {
            state.initData && (b.syncDesignCanvasesWithProductRegions(), state.designer ? (b.synchronizeElementIDs(), d && d()) : state.selectedProductStyle && state.selectedProductStyle.product_regions && state.selectedProductStyle.product_regions.length ? b.addDesigner(function() {
                b.synchronizeElementIDs();
                d && d();
            }) : (state.designer = {}, d && d()));
        }
        var h = function() {
            ezdVars.EmbroideryMode = ezdVars.EmbroideryMode || "embroidery_demo" == ezdVars.AppURI;
            service.getInitialLoad(ezdVars.ProductID, ezdVars.ProductStyleID, ezdVars.EmbroideryMode, function(b) {
//                debugger;
                state.selectedProduct = b.product;
                state.selectedProductStyle = findMatch(b.product.product_styles, function(b) {
                    return b.product_style_id == ezdVars.ProductStyleID;
                });
                null != state.selectedProduct && null != state.selectedProductStyle && null != state.selectedProductStyle.product_regions && 0 != state.selectedProductStyle.product_regions.length || alert("This product is not configured for use with the design studio.  Please select a different product.");
                state.selectedProductStyle.selectedRegion = state.selectedProductStyle.defaultRegion;
                state.storeInkColors = normalizeColorStrings(b.inkColors);
                state.fontCategories = b.fontCategories;
                state.excludedFontIDs = b.excludedFontIDs;
                for (var c = 0; c < state.excludedFontIDs.length; c++) {
                    state.excludedFontIDs[c] = parseInt(state.excludedFontIDs[c], 10);
                }
                state.threadCharts = b.threadCharts;
                state.productXml = b.productResultXml;
                eventManager.trigger("selectedProductLoaded", b.product);
                state.initData = b;
                k();
                console.debug('end...');
            }, function(b) {
                "Store is suspended" == b && $("#ink_overlayWrap").show();
            });
        };
        ezdVars.UseDesignProduct && service.getDesign(state.selectedDesignID, function(b) {
            state.initData || (b.productStyle && b.productStyle.product_id && (ezdVars.ProductID = window.ezdProductID = state.selectedProductID = b.productStyle.product_id, ezdVars.ProductStyleID = window.ezdProductStyleID = state.selectedProductStyleID = b.productStyle.product_style_id), h());
            k();
        });
        ezdVars.UseDesignProduct || state.initData || h();
        k();
    };
    this.getColorsForElement = function(b, c, g) {
        var k = [];
        if (b instanceof ui.text.TextElement) {
            if (b.isEmbroidery) {
                b = getColorString(b.color1), k.push(b);
            } else {
                c = getColorString(b.color);
                var h = getColorString(b.strokeColor);
                k.push(c);
                b.strokeColor && 1E-5 < b.stroke && k.push(h);
            }
        } else {
            if (h = b instanceof ui.svg.SvgElement ? "vector" : "raster", (b = b.colors || b.data.colors) && (!c || "vector" == h || "emb" == h)) {
                for (c = 0; c < b.length; c++) {
                    h = getColorString(b[c]), k.push(h);
                }
            }
        }
        g && deleteMatches(k, function(b) {
            return "none" == b;
        });
        return k;
    };
    this.getColorsInUse = function(b, c, g) {
        var k = state.selectedDesign.canvas;
        if (b && (k = findMatch(state.selectedDesign.canvases, function(c) {
            return c.name.toLowerCase() == b.toLowerCase();
        }), !k)) {
            return [];
        }
        for (var h = [], f = 0; f < k.elements.length; f++) {
            h = h.concat(this.getColorsForElement(k.elements[f], c, g));
        }
        c = [];
        for (f = 0; f < h.length; f++) {
            g = h[f], searchInArray(c, g) || c.push(g);
        }
        return c;
    };
    this.getPricingColorData = function() {
        var d = function(b) {
            var c = state.selectedDesign.canvas;
            if (b && (c = findMatch(state.selectedDesign.canvases, function(c) {
                return c.name.toLowerCase() == b.toLowerCase();
            }), !c)) {
                return !0;
            }
            if (c.is_distressed && "0" != c.is_distressed) {
                return !1;
            }
            for (var d = 0; d < c.elements.length; d++) {
                var f = c.elements[d];
                if (f instanceof ui.bitmap.BitmapElement && (f = f.data, !(f.colors && f.colors.length || f.art_colors && f.art_colors.length))) {
                    return !1;
                }
            }
            for (d = 0; d < state.designer.design.sides.length; d++) {
                if (c = state.designer.design.sides[d], c.is_distressed && 1 == c.is_distressed) {
                    return !1;
                }
            }
            return !0;
        }, c = {};
        c.usrColors = {
            front: b.getColorsInUse("front", !1, !0),
            back: b.getColorsInUse("back", !1, !0),
            left: b.getColorsInUse("third", !1, !0),
            right: b.getColorsInUse("fourth", !1, !0)
        };
        c.usrColors.all = c.usrColors.front.length + c.usrColors.back.length + c.usrColors.left.length +c.usrColors.right.length;
        c.numFrontColors = c.usrColors.front.length;
        c.isFrontVector = d("front");
        c.numSleeveLeftColors = c.usrColors.left.length;
        c.isSleeveLeftVector = d("sleeveleft");
        c.numSleeveRightColors = c.usrColors.right.length;
        c.isSleeveRightVector = d("sleeveright");
        c.numBackColors = c.usrColors.back.length;
        c.isBackVector = d("back");
        c.isFrontVector || (c.numFrontColors = 100);
        c.isSleeveLeftVector || (c.numSleeveLeftColors = 100);
        c.isSleeveRightVector || (c.numSleeveRightColors = 100);
        c.isBackVector || (c.numBackColors = 100);
        d = [];
        state.designer.getSideByName("front") && d.push("Front: " + (c.isFrontVector ? c.numFrontColors : "N/A - Digital Print"));
        state.designer.getSideByName("back") && d.push("Back: " + (c.isBackVector ? c.numBackColors : "N/A - Digital Print"));
        state.designer.getSideByName("sleeveleft") && d.push("Sleeve Left: " + (c.isSleeveLeftVector ? c.numSleeveLeftColors : "N/A - Digital Print"));
        state.designer.getSideByName("sleeveright") && d.push("Sleeve Right: " + (c.isSleeveRightVector ? c.numSleeveRightColors : "N/A - Digital Print"));
        c.sideColorString = d.join(", ");
        c.isAllVector = !1;
        c.isFrontVector && c.isSleeveLeftVector && c.isSleeveRightVector && c.isBackVector && (c.isAllVector = !0);
        return c;
    };
    this.addDesigner = function(d) {
        "undefined" != typeof Parser && (window.parser = new Parser);
        var c = {
            type: "ezd",
            width: 500,
            height: 500,
            container: $("#designerContainer"),
            ui: new EmptyUI,
            ajaxCallStarted: service.ajaxCallStarted,
            ajaxCallEnded: service.ajaxCallEnded,
            productXml: state.initData.productResultXml,
            designXml: state.initData.designXml
        }, g = eventManager.on("rendered", function() {
            state.selectedDesign = new ui.common.Design(state.designer);
            b.synchronizeElementIDs();
            d && d();
            g && g();
        });
        c.hideVisibleRegion = !ezdVars.ProductID && !ezdVars.DefaultProductID;
        window.ezd = state.designer = new BaseEZD(c);
    };
    this.addRenderedHandlerOneTime = function(b) {
        var c = eventManager.on("rendered", function() {
            b && b();
            c && c();
        });
    };
    this.selectNewDesign = function(d, c, g) {
        eventManager.trigger("designChanging", null);
        var k = eventManager.on("rendered", function() {
            b.synchronizeElementIDs();
            eventManager.trigger("designChanged", null);
            eventManager.trigger("layersChanged", null);
            k && k();
        });
        state.designer.getDesign(d);
    };
    this.goToDefaultRoute = function(b) {
//        var c = "addText",
//            g = ezd.activeSide.boundingBox.getSelections();
//        null != g ? angular.isArray(g) ? c = "editMultipleSelection" : g instanceof ui.text.TextElement ? c = "editText/" + g.id : g instanceof ui.bitmap.BitmapElement ? c = "editImage/" + g.id : g instanceof ui.svg.SvgElement && (c = "editSvg/" + g.id) : ezdVars.ArtToolsMode && (c = "layers");
//        b.path(c);
    };
    this.addClipArt = function(b, c) {
        var g = function() {
            var g = eventManager.on("rendered", function() {
                g && g();
                eventManager.trigger("designColorsChanged");

                c && c(h);
            });
            b.art_name_full && (b.art_name = b.art_name_full);
            b.art_jit && "raster" == b.art_type && (b.art_path = b.art_jit);
            "emb" == b.art_type && state.selectedProductStyle.selectedRegion && (b.percentOfRegion = b.width / 254 / state.selectedProductStyle.selectedRegion.render_width_inches);
            var h = state.designer.addClipArt(b);
            eventManager.trigger("designColorsChanged");
        };
        b.width && b.height ? g() : getImageData(b.thumburl_large, !1, function(c) {
            b.width = c.width;
            b.height = c.height;
            g();
        });
    };
    this.haveSameSides = function(b) {
        for (var c = 0, g = 0; g < state.designer.product.sides.length; g++) {
            searchInArray(b.defaultStyle.product_regions, state.designer.product.sides[g].name, "side") && c++;
        }
        return c === state.designer.product.sides.length ? !0 : !1;
    };
    this.saveStateToLocalStorage = function() {
        this.clearLocalStorage();
        state.selectedDesign && 0 < state.selectedDesign.design_id && (localStorage.design_id = state.selectedDesign.design_id);
        state.selectedProduct && 0 < state.selectedProduct.product_id && (localStorage.product_id = state.selectedProduct.product_id);
        state.selectedProductStyle && 0 < state.selectedProductStyle.product_style_id && (localStorage.product_style_id = state.selectedProductStyle.product_style_id);
        state.selectedProductStyle && state.selectedProductStyle.selectedRegion && state.selectedProductStyle.selectedRegion.regionIndex && (localStorage.region_index = state.selectedProductStyle.selectedRegion.regionIndex);
        state.activeUserToken && (localStorage.user_id = state.activeUserToken);
        state.currentUserToken && (localStorage.session_id = state.currentUserToken);
        state.currentSessionToken && (localStorage.session_token = state.currentSessionToken);
        state.userSelectedProduct && (localStorage.userSelectedProduct = state.userSelectedProduct);
        state.userSelectedDesign && (localStorage.userSelectedDesign = state.userSelectedDesign);
        localStorage.store_id = ezdVars.AppToken;
    };
    this.loadStateFromLocalStorage = function() {
        var b = {};
        if (localStorage.store_id != ezdVars.AppToken) {
            return this.clearLocalStorage(), {};
        }
        localStorage.design_id && (b.design_id = localStorage.design_id);
        b.design_id = localStorage.design_id;
        b.product_id = localStorage.product_id;
        b.product_style_id = localStorage.product_style_id;
        b.region_index = localStorage.region_index;
        b.user_id = localStorage.user_id;
        b.session_id = localStorage.session_id;
        b.session_token = localStorage.session_token;
        !state.activeUserToken && localStorage.user_id && (state.activeUserToken = localStorage.user_id);
        !state.currentUserToken && localStorage.session_id && (state.currentUserToken = localStorage.session_id);
        !state.currentSessionToken && localStorage.session_token && (state.currentSessionToken = localStorage.session_token);
        state.userSelectedProduct = localStorage.userSelectedProduct;
        state.userSelectedDesign = localStorage.userSelectedDesign;
        return b;
    };
    this.clearLocalStorage = function() {
        localStorage.removeItem("store_id");
        localStorage.removeItem("design_id");
        localStorage.removeItem("product_id");
        localStorage.removeItem("product_style_id");
        localStorage.removeItem("region_index");
        localStorage.removeItem("user_id");
        localStorage.removeItem("session_id");
        localStorage.removeItem("session_token");
        localStorage.removeItem("userSelectedProduct");
        localStorage.removeItem("userSelectedDesign");
    };
    this.canPrintDesign = function() {
        for (var b = 0; b < state.designer.sides.length; b++) {
            if (state.dsUtils.getColorsInUse(state.designer.sides[b].name).length > ezdVars.MaxScreenPrintColors) {
                return !1;
            }
        }
        return !0;
    };
    this.synchronizeElementIDs = function() {};
    this.getEmbroideryUrl = function(b, c, g) {
        var k = "";
        if ("embroideryText" === c) {
            k = "http://" + ezdVars.ApiDomain + "/" + ezdVars.AppURI + "/JITImage/EmbroideryTextFull/?textValue=" + escape(b.value) + "&fontName=" + escape(b.fontObject.font || b.fontObject.name);
            b.font_size = 240;
            for (var h in g) {
                if (b[h]) {
                    var f = escape(b[h]),
                        k = k + ("&" + g[h] + "=" + f)
                }
            }
            console.log('color1 color2 color3 color4');
            b.color1 && (k += "&rgb0=" + parseInt(getColorString(b.color1, !0), 16));
            b.color2 && (k += "&rgb1=" + parseInt(getColorString(b.color2, !0), 16));
            b.color3 && (k += "&rgb2=" + parseInt(getColorString(b.color3, !0), 16));
            b.color4 && (k += "&rgb3=" + parseInt(getColorString(b.color4, !0), 16));
        }
        if ("embroideryArt" === c && (k = "http://" + ezdVars.ApiDomain + "/" + ezdVars.AppURI + "/JITImage/EmbroideryClipArt/?ArtID=" + b.art_id, b.colors && b.colors.length)) {
            for (c = 0; c < b.colors.length; c++) {
                k += "&colors=" + getColorString(b.colors[c], !0);
            }
        }
        return k;
    };
};
ui.controllers.EditTextController = function(b, d, c, g, k) {
//    window.rightSideLoaded && rightSideLoaded(b);
    var h = null,
        f = null;
    $('.design-tool .nav-tabs li').removeClass('active');
    $('.design-tool .nav-tabs li:eq(0)').addClass('active');
    b.ThemeName = ezdVars.ThemeName;


    b.shapes = [
        {
            name: "none",
            id: 0,
            image: "/images/shape-none.png"
        }, {
            name: "curve",
            id: 7,
            image: "/images/shape-curve.png"
        }, {
            name: "arch",
            id: 3,
            image: "/images/shape-arch.png"
        }, {
            name: "archway",
            id: 2,
            image: "/images/shape-archway.png"
        }, {
            name: "bulge",
            id: 4,
            image: "/images/shape-bulge.png"
        }, {
            name: "bird's eye",
            id: 5,
            image: "/images/shape-birds-eye.png"
        }, {
            name: "pinch",
            id: 1,
            image: "/images/shape-pinch.png"
        }, {
            name: "slope",
            id: 6,
            image: "/images/shape-slope.png"
        }
    ];
    var m = function() {
        f = new ui.FontManager(!1);
        if (c.id || b.navigation && b.navigation.currentItem) {
            if (c.id) {
                if (h = searchInArray(state.selectedDesign.canvas_text, c.id, "id"), !h) {
                    g.path("/addText");
                    return;
                }
            } else {
                h = b.navigation.currentItem;
            }
            b.action = "Edit";
            b.$parent.selectedElement = h;
            b.elementOriginalRotation = h.rotation;
            eventManager.trigger("elementSelected", h.id);
        }
        if (h) {
            b.text = h;
            delete h.previewHtml;

            b.isMultiLine = h && h.text && 1 < h.text.split("\n").length;
            "undefined" === typeof h.lineHeight && (h.lineHeight = 0);
            "undefined" === typeof h.alignment && (h.alignment = 0);
            h.selectedShape = 0.01 < Math.abs(h.arching) ? b.shapes[1] : findMatch(b.shapes, function(b) {
                return b.id == h.wrap;
            });
            b.oldTextValue = h.text;
            var d = b.fontCategories = f.getCategories();
            h.fontId && h.fontStyleId ? searchInArray(d, h.fontStyleId, "font_style_id") && f.getFontsByCategory(h.fontStyleId, function(c) {
                b.fonts = c;
                if (c = searchInArray(c, h.fontId, "font_id")) {
                    h.fontObject = c;
                }
                b.$$phase || b.$apply();
            }) : console.log("错误:  无法找到对应的字体或字体样式.");
            b.$$phase || b.$apply();
        }



    };
    b.$on("sidePanelNavigation", function() {
        "editText" == b.navigation.sidePanel && m();
    });

    (c.id || "/addText" == g.$$path) && m();


    b.fontCategorySelected = function() {
        f.getFontsByCategory(b.text.fontStyleId, function(c) {
            b.fonts = c;
            var d = searchInArray(b.fontCategories, b.text.fontStyleId, "font_style_ID");
            d.fonts = c;
            for (c = 0; c < b.fonts.length; c++) {
                b.fonts[c].fontStyle = d;
            }
            b.$$phase || b.$apply();
        });
    };
    b.toggleFontList = function() {
        $('.ds-fonts .dropdown-menu').find('select').off('click').on('click', function(e) {
            e.stopPropagation();
        });
    };

    b.isEditText = function(){
        return b.text && b.text.text.trim().length == 0 ? true : false;
    }

    b.updateText = function(){
        b.updateTextFont(function(){
            b.updateTextValue();
        });
    };
    b.updateTextFont = function(callback) {
        var c = searchInArray(b.fonts, h.fontId, "font_id");
        h.fontObject = c;
        state.designer.updateTextFont(h.id, c, c.font_style_id || c.old_font_style_id, callback);
        state.designer.activeSide.boundingBox.checkElementSize(h);
    };
    b.updateTextValue = function() {
        b.isMultiLine = h.text && 1 < h.text.split("\n").length;//是否多行
        var c = 1 < (b.oldTextValue + "").split("\n").length;//oldText是否多行
        state.designer.updateTextValue(h.id, h.text);
        b.oldTextValue = h.text;
        c && !b.isMultiLine && b.changeTextShape(h.selectedShape);//如果新文本和老文本行数不一致，则调用b.changeTextShape(h.selectedShape)
        state.designer.activeSide.boundingBox.checkElementSize(h);
    };
    b.timerChange = function() {
        eventManager.trigger("textChanged");
        state.designer.chanPropertyEvent();
    };
    b.increaseStrokeWidth = function() {
        var b = 1E-8 >= Math.abs(h.stroke);
        h.stroke = Math.round(100 * Math.min(20, h.stroke + 0.2)) / 100;
        state.designer.updateTextStrokeWidth(h.id, h.stroke);
        h.stroke_old = h.stroke;
        b && eventManager.trigger("designColorsChanged");
    };
    b.decreaseStrokeWidth = function() {
        var b = 0.20000001 >= h.stroke;
        h.stroke = Math.round(100 * Math.max(0, h.stroke - 0.2)) / 100;
        state.designer.updateTextStrokeWidth(h.id, h.stroke);
        h.stroke_old = h.stroke;
        b && eventManager.trigger("designColorsChanged");
    };
    b.strokeWidthChanged = function() {
        if (null != h) {
            var b = 1E-7 >= Math.abs(h.stroke_old) || 1E-7 >= Math.abs(h.stroke);
            h.stroke = Math.round(10 * h.stroke) / 10;
            state.designer.updateTextStrokeWidth(h.id, h.stroke);
            h.stroke_old = h.stroke;
            b && eventManager.trigger("designColorsChanged");
        }
    };
    b.increaseShadowWidth = function() {
        var b = 0 == h.shadow_value;
        h.shadow_value = Math.min(20, h.shadow_value + 0.2);
        state.designer.updateShadowValue(h.id, h.shadow_value);
        b && eventManager.trigger("designColorsChanged");
    };
    b.decreaseShadowWidth = function() {
        var b = 1 == h.shadow_value;
        h.shadow_value = Math.max(0, h.shadow_value - 0.2);
        state.designer.updateShadowValue(h.id, h.shadow_value);
        b && eventManager.trigger("designColorsChanged");
    };
    b.increaseTextSpacing = function() {
        state.designer.startEvent("changeTextSpacing", []);
        h.letterSpacing = Math.round(100 * (h.letterSpacing + 0.05)) / 100;
        state.designer.activeSide.boundingBox.checkElementSize(h);
        state.designer.endEvent("changeTextSpacing", []);
    };
    b.decreaseTextSpacing = function() {
        state.designer.startEvent("changeTextSpacing", []);
        h.letterSpacing = Math.round(100 * (h.letterSpacing - 0.05)) / 100;
        state.designer.endEvent("changeTextSpacing", []);
    };
    b.increaseTextHeight = function() {
        var b = Math.min(20, h.lineHeight + 1);
        b != h.lineHeight && (h.lineHeight = b);
    };
    b.decreaseTextHeight = function() {
        var b = Math.max(0, h.lineHeight - 1);
        b != h.lineHeight && (h.lineHeight = b);
    };
    b.lineHeightChanged = function() {
        state.designer.setTextHeight(h.id, h.lineHeight);
    };
    b.nudge = function(b) {
        ezd.nudgeElement(h.id, b, 1);
    };
    b.increaseShapeSize = function() {
        h.selectedShape && "curve" == h.selectedShape.name ? h.arching = Math.round(Math.min(360, h.arching + 5)) : h.selectedShape && "none" != h.selectedShape.name && (h.wrapAmmount = Math.min(10, h.wrapAmmount + 1));
    };
    b.decreaseShapeSize = function() {
        h.selectedShape && "curve" == h.selectedShape.name ? h.arching = Math.round(Math.min(360, h.arching - 5)) : h.selectedShape && "none" != h.selectedShape.name && (h.wrapAmmount = Math.min(10, h.wrapAmmount - 1));
    };
    b.changeTextShape = function(c) {
        c || (c = h.selectedShape || b.shapes[0]);
        h.selectedShape = c;
        h.wrap = "curve" != c.name ? c.id : 0;
        "curve" == c.name ? 0 == h.arching && (h.arching = 45) : h.wrapAmmount || (h.wrapAmmount = 5);
    };
    b.changeAlignment = function(b) {
        state.designer.changeElementAlignment(h.id, b);
    };
    b.changeTextAlignment = function(b) {
        h.alignment = b;
    };
    b.showStrokeColorModal = function(event) {
        showColorModal(b, d, k, {
            currentColor: h.strokeColor,
            onSelect: function(c) {
                h.strokeColor = c;
                0 == h.stroke && b.increaseStrokeWidth();
                state.designer.updateTextStrokeColor(h.id, c);
                eventManager.trigger('updatePricePreview', true);
            },
            allowTransparent: !1
        }, event);
    };
    b.showShadowColorModal = function(event) {
        showColorModal(b, d, k, {
            currentColor: h.shadow_color,
            onSelect: function(c) {
                h.shadow_color = c;
                0 == h.shadow_value && b.increaseShadowWidth();
                state.designer.updateShadowColor(h.id, c);
                eventManager.trigger('updatePricePreview', true);
            },
            allowTransparent: !1
        }, event);
    };
    b.showFillColorModal = function(event) {
        showColorModal(b, d, k, {
            currentColor: h.color,
            onSelect: function(b) {
                h.color = b;
                state.designer.updateTextColor(h.id, b);
                eventManager.trigger('updatePricePreview', true);
            },
            allowTransparent: !0
        }, event);
    };
    var q = [];
    q.push(eventManager.on("undoRedo", function(c) {
        b && !b.$$destroyed && !b.$$phase && c.change && c.change.length && findMatch(c.change, function(b) {
            return b.id == canvasText.id;
        }) && (b.$$phase || b.$apply());
    }));
    q.push(eventManager.on("productChanged", function() {
        state.dsUtils.addRenderedHandlerOneTime(function() {
            m();
        });
    }));
    q.push(eventManager.on("elementDeleted", function(d) {
        !c.id || 0 > g.path().indexOf("editText") || (d = searchInArray(state.selectedDesign.canvas_text, c.id, "id"), !b || d || b.$$destroyed || (g.path("/addText"), b.$$phase || b.$apply()));
    }));
    b.$on("$destroy", function() {
        if (q) {
            for (var b = 0; b < q.length; b++) {
                q[b]();
            }
        }
    });
};
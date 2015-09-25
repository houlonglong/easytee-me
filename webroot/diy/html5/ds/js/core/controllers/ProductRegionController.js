ui.controllers.ProductRegionController = function(b, d, c) {

    b.showingInlineModal = true;
    b.loadPreview = function(c, d) {
        setTimeout(function() {
            if (null != document.getElementById("canvasPreview" + c)) {
                //state.designer.sides[d].boundingBox.hideRegion();
                state.designer.sides[d].boundingBox.selectElement(null);
                var g = state.designer.regions[c],
                    h = ("undefined" == typeof state.designer.sides[d].defaultRegion[2] ? state.designer.sides[d].defaultRegion.region : state.designer.sides[d].defaultRegion)[2] / g.region[2],
                    k = -g.region[0] * h,
                    t = -g.region[1] * h,
                    p = d + 1,
                    e = $("#side" + p).children().clone(!0, !0);
                $("#canvasPreview" + c).empty();
                for (var u = "previewSvg" + c, s = e[0].childNodes.length - 1; 0 <= s; s--) {
                    "g" == e[0].childNodes[s].tagName && "bbGroup" == e[0].childNodes[s].id || "rect" == e[0].childNodes[s].tagName || "desc" == e[0].childNodes[s].tagName || "text" == e[0].childNodes[s].tagName || "defs" == e[0].childNodes[s].tagName ? e[0].childNodes[s].parentNode.removeChild(e[0].childNodes[s]) : (e[0].childNodes[s].id == "designGroup" + p && (e[0].childNodes[s].id = "designGroupPreview" + c, -1 < navigator.userAgent.toLowerCase().indexOf("firefox") || e[0].childNodes[s].setAttribute("style",
                        "clip-path:url('#designMaskPreview" + c + "')"), "none" != $("#designGroup" + p).css("mask") && void 0 != $("#designGroup" + p).css("mask") && (1 < $("#designGroup" + p).css("mask").split("distress").length ? e[0].childNodes[s].setAttribute("mask", "url('#distressMaskPreview" + c + "')") : e[0].childNodes[s].setAttribute("mask", "url('#designMaskPreview" + c + "')"))), e[0].childNodes[s].id == "designMask" + p && (e[0].childNodes[s].id = "designMaskPreview" + c, e[0].childNodes[s].firstChild &&
                        1 >= $("#designMask" + p)[0].firstChild.id.split("Rect").length && (e[0].childNodes[s].firstChild.id = "coverMaskImagePreview" + c, e[0].childNodes[s].firstChild.setAttribute("filter", "url('#coverFilterPreview" + c + "')"))), e[0].childNodes[s].id == "distressMask" + p && (e[0].childNodes[s].id = "distressMaskPreview" + c, e[0].childNodes[s].firstChild && "image" == $("#designMask" + p)[0].firstChild.tagName && e[0].childNodes[s].firstChild.setAttribute("mask", "url('#designMaskPreview" +
                        c + "')")), e[0].childNodes[s].id == "coverFilter" + p && (e[0].childNodes[s].id = "coverFilterPreview" + c));
                }
                p = [k, t, state.designer.originalCanvasSize * h, state.designer.originalCanvasSize * h];
                s = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                s.setAttribute("id", "rectangle" + c);
                s.setAttributeNS(null, "x", g.region[0] * h + k + 1);
                s.setAttributeNS(null, "y", g.region[1] * h + t + 1);
                s.setAttributeNS(null, "height", g.region[3] * h - 2);
                s.setAttributeNS(null, "width", g.region[2] * h - 2);
                s.setAttributeNS(null, "stroke-width", 4 * h + "px");
                s.setAttributeNS(null, "stroke", "#fe199d");
                s.setAttributeNS(null, "fill", "transparent");
                e[0].appendChild(s);
                e[0].setAttributeNS(null, "viewBox", p.join(" "));
                e[0].setAttributeNS(null, "width", "80");
                e[0].setAttributeNS(null, "height", "80");
                e[0].setAttributeNS(null, "id", u);
                e[0].setAttributeNS(null, "preserveAspectRatio", "xMinYMin");
                e[0].setAttribute("viewBox", p.join(" "));
                e[0].setAttribute("width", "80");
                e[0].setAttribute("height", "80");
                e[0].setAttribute("id", u);
                e[0].setAttribute("preserveAspectRatio", "xMinYMin");
                $("#canvasPreview" + c).append(e);
                b.$$phase || b.$apply();
            }
        }, 1000);
    };
    b.changePrintRegion = function(b, c) {
        state.designer.activeSide.boundingBox.visibleRegion = !0;
        c || state.designer.selectRegion(b);
        console.log("选择了新的设计区域", state.designer.zoom);
        eventManager.trigger("designCanvasChanged");
        eventManager.trigger('toAddTextPath');//Allen
    };
    b.productStyle = state.selectedProductStyle;

    var g = function() {
        clearInterval(b._interval);
        b._interval = setInterval(function() {
            console.log('call k() ---- 2');
            k();
        }, 1E3);
    };

    var k = function() {
        clearInterval(b._interval);
        console.log("更行了图形位置");
        b.productSides = [];
        state.designer.previews || (state.designer.previews = []);
        b.numRegions = 0;
        b.current_view = state.selectedDesign.canvas.activeRegion.name.toLowerCase();
        b.current_side = state.selectedDesign.canvas.name.toLowerCase();
        b.current_sideID = state.selectedDesign.canvas.activeRegion.sideIndex - 1;
        var c = 0, d = '';
        if (state.selectedProductStyle) {
            b.html_color = getColorString(state.selectedProductStyle.html_color);
            for (var g = 0; g < state.selectedProductStyle.product_regions.length; g++) {
                b.numRegions++;
                var h = state.selectedProductStyle.product_regions[g];
                h.side = h.side.toLowerCase();
                h.name = h.name.toLowerCase();
                h.regionIndex = g;
                h.canvasId = "canvasPreview" + g;
                state.designer.previews[g] || state.designer.previews.push({});
                var k = findMatch(b.productSides, function(b) {
                    return b.name == h.side;
                });
                k || (k = {
                    name: h.side,
                    ui_name: h.side_name,
                    regions: []
                }, 3 == h.side_order && state.selectedProduct.third_side_name && (k.ui_name = state.selectedProduct.third_side_name), 4 == h.side_order && state.selectedProduct.fourth_side_name && (k.ui_name = state.selectedProduct.fourth_side_name), b.productSides.push(k));
                d != k.name && c++;
                d = k.name;
                h.description = String(k.ui_name).charAt(0).toLocaleUpperCase() + String(k.ui_name).substr(1) + "-" + String(h.name).charAt(0).toLocaleUpperCase() + String(h.name).substr(1);
                h.sideIndex = c - 1;
                k.regions.push(h);
                k.showName = k.ui_name;
                k.tabName = k.showName + "(" + k.regions.length + ")";
                for (var t = 0; t < state.designer.sides.length; t++) {
                    state.designer.sides[t].activeRegion.side == d && h.name == state.designer.sides[t].activeRegion.name.toLocaleLowerCase() && (k.activeRegion = h);
                }
            }
        }
        b.$$phase || b.$apply();
    };

    k();

    b.showArtLocations = function() {
        b.showingInlineModal = true;
    };

    b.selectFirstPrintRegionWithDesign = function() {
        for (var c = 0; c < state.selectedProductStyle.product_regions.length; c++) {
            var d = state.selectedProductStyle.product_regions[c];
            if (d.hasLayers) {
                console.log('call changePrintRegion 1');
                b.changePrintRegion(d.regionIndex);
                break;
            }
        }
    };

    if(state.selectedProductStyle){
        if("undefined" == typeof state.selectedDesign.currentCanvasIndex){
            b.selectFirstPrintRegionWithDesign();
        }
    }

    var h = [];

    h.push(eventManager.on("elementsAdded", function() {
        console.debug('event', 'elementsAdded');
        k();
    }));

    h.push(eventManager.on("designCanvasChanged", function() {
        console.debug('event','designCanvasChanged');
        k();
    }));

    h.push(eventManager.on("designLiveEdition", function() {
        console.debug('event','designLiveEdition');
        g();
    }));

    h.push(eventManager.on("productRegionsChanged", function() {
        console.debug('event','productRegionsChanged');
        for (var i = 0; i < state.selectedProductStyle.product_regions.length; i++) {
            var region = state.selectedProductStyle.product_regions[i];
            var g = searchInArray(state.designer.regions, region.product_region_id, "product_region_id");
            if(g){
                region.region = g.region;
                b.loadPreview(region.regionIndex, region.sideIndex);
            }
        }
        k();
    }));

    h.push(eventManager.on("productColorChanged", function() {
        console.debug('event','productColorChanged');
        k();
    }));

    h.push(eventManager.on("productChanged", function() {
        console.debug('event','productChanged');
        b.productStyle = state.selectedProductStyle;
        b.changePrintRegion(state.selectedProductStyle.product_regions.indexOf(state.selectedProductStyle.selectedRegion), true);
        k();
        b.$$phase || b.$apply();
    }));

    h.push(eventManager.on("selectedProductLoaded", function() {
        console.debug('event','selectedProductLoaded');
        b.productStyle = state.selectedProductStyle;
        k();
        b.selectFirstPrintRegionWithDesign();
        b.$$phase || b.$apply();
    }));

    b.$on("$destroy", function() {
        if (h) {
            for (var i = 0; i < h.length; i++) {
                h[i]();
            }
        }
    });
};
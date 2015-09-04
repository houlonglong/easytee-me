function EmptyUI() {}
EmptyUI.prototype.setEZD = function(b) {};
EmptyUI.prototype.addText = function(b) {};
EmptyUI.prototype.addSvg = function(b) {};
EmptyUI.prototype.addImage = function(b) {};
EmptyUI.prototype.updateLayers = function() {};
EmptyUI.prototype.updateProduct = function() {};
EmptyUI.prototype.updateLayers = function() {};

function BaseEZD(b) {
    console.log('baseEZD init')
    function d() {
        "undefined" != typeof oa && oa.start();
    }

    function c(b, e) {
        (function(b, e) {
            service.getDistress(e, function(e) {
                var c = O(b);
                V(c, e);
            });
        })(b, e);
    }

    function g(b) {
        $("#designerContainer").css("width", b.width);
        $("#designerContainer").css("height", b.height);
        $("#designerContainer").css("margin-top", "-10px");
        $("#raphael").css("width", b.width);
        $("#raphael").css("height", b.height);
        R.setSize(b.width, b.height);
        S.width = b.width;
        S.height = b.height;
        if (z) {
            F(z);
            for (var e = 0; e < J.sides.length; e++) {
                J.sides[e].workArea.setSize(b.width, b.height);
            }
            P(z, z.activeRegion);
        }
    }

    function k(b) {
        // debugger;
        wa = 0;
        1 != ma && L.doZoom();
//        S.ajaxCallStarted();
//        console.debug('ajaxCallStarted', '载入中，请稍等');
        qa = eventManager.on("elementRendered", s);
        eventManager.trigger("needDesign", b);
    }

    function h(b, e) {
        for (var c = 0; c < b.sides.length; c++) {
            var d = b.sides[c];
            if (d = searchString(e.sides, d.location, "location")) {
                for (d = d.elements; d.length;) {
                    p(d[0]);
                }
            }
        }
        for (c = 0; c < e.sides.length; c++) {
            if (d = e.sides[c], !searchString(b.sides, d.location, "location")) {
                var f = searchString(J.sides, d.location, "name");
                f ? (f.canvas = d, b.sides.push(d)) : b.noSides.push(d);
            }
        }
        return b;
    }

    function f(b, e) {
        if (1 == e.canvases.length) {
            for (var c = b.name.charAt(0).toUpperCase() + b.name.slice(1), d = e.canvases[0], f = 0; f < e.elements.length; f++) {
                e.elements[f].location = c;
            }
            d.location = c;
            d.region_name = b.activeRegion.name;
            d.side = b;
        }
    }

    function m(b) {
        f(z, b);
        q(b.elements);
        for (var e = {
            noSides: [],
            sides: [],
            information: b.information,
            rendered: 0,
            product: b.product
        }, c = b.canvases, d = 0; d < c.length; d++) {
            var g = {
                location: c[d].location,
                canvas: c[d],
                rendered: 0,
                elements: getElementsInArray(b.elements, c[d].location, "location").sort(function(b, e) {
                    return b.z < e.z ? -1 : b.z > e.z ? 1 : 0;
                }),
                needRender: !0
            }, k = searchInArray(J.sides, c[d].location.toLowerCase(), "name");
            k ? (k.canvas = g, g.side = k, e.sides.push(g), "undefined" != typeof oa && oa.resetSide(k.name)) : e.noSides.push(g);
        }
        E = h(e, E);
        for (d = 0; d < E.sides.length; d++) {
            b = O(E.sides[d].location), b.elements.length || D(b);
        }
        n(z);
    }

    function q(b) {
        for (var e = 0; e < b.length; e++) {
            var c = b[e],
                d = 436 / z.boundingBox.region.width,
                f = 2 * c.width,
                g = 2 * c.height,
                f = f / d,
                g = g / d,
                h = 2 * c.y / d;
            c.x = 2 * c.x / d;
            c.y = h;
            c.width = f;
            c.height = g;
        }
    }

    function n(b) {
        X = {
            width: 2 * b.defaultRegion.region[2],
            height: 2 * b.defaultRegion.region[3]
        };
    }

    function r() {
        return E.product.product_id != J.description.product_id ? !0 : !1;
    }

    function t(b, e) {
        for (var c = 0, d = 0, f = function(b) {
            var e = atob(b.split(",")[1]);
            b = b.split(",")[0].split(":")[1].split(";")[0];
            for (var c = new ArrayBuffer(e.length), d = new Uint8Array(c), f = 0; f < e.length; f++) {
                d[f] = e.charCodeAt(f);
            }
            return new Blob([c], {
                type: b
            });
        }, g = 0; g < la.length; g++) {
            (function() {
                var h = la[g];
                if (!h.artID && !h.art_id) {
                    c++;
                    formData = new FormData;
                    formData.append("file", f(h.original_art_path));
                    if (h.colors && h.colors.length) {
                        for (var k = "", p = 0, m = 0; m < h.colors.length; m++) {
                            var n = getColorString(h.colors[m], !0);
                            0 > k.indexOf(n) && (p++, k += "," + n);
                        }
                        0 < k.length && (k = k.substring(1));
                        formData.append("colorLength", p);
                        formData.append("colors", k);
                    }
                    service.saveUserArt(state.currentUserToken, state.activeUserToken, formData, function(e) {
                        h.artID = h.art_id = e.ArtID;
                        h.art_name = e.ArtName;
                        h.art || (h.art = {});
                        h.art.art_name = e.ArtName;
                        h.type = "image";
                        d++;
                        d == la.length && (la = [], b());
                    }, e);
                }
            })();
        }
        0 == c && b && b();
    }

    function p(b) {
        var e;
        a: {
            for (e = 0; e < E.sides.length; e++) {
                if (E.sides[e].location.toUpperCase() == b.location.toUpperCase()) {
                    e = E.sides[e];
                    break a;
                }
            }
            e = !1;
        }
        if (!e) {
            return console.error("Canvas don't exist!"), !1;
        }
        e.side.boundingBox.removeChild(b.object);
        for (var c = 0; c < e.elements.length; c++) {
            var d = e.elements[c];
            d.id == b.id && e.elements.splice(c, 1);
        }
        for (c = 0; c < e.side.elements.length; c++) {
            d = e.side.elements[c], d.id == b.id && e.side.elements.splice(c, 1);
        }
        eventManager.trigger("elementDeleted", b.id);
        e.side.boundingBox.elements = searchInArray(J.sides, e.side.sideId, "sideId").elements;
    }

    function e(b, e) {
        // debugger;
        var c;
        "undefined" == typeof e.id && (e.id = K++);
        if ("text" === e.type) {
            var d = X.width / (2 * b.defaultRegion.region[2]);
            c = e.width / d;
            var f = e.height / d,
                g = e.x / d + c / 2,
                d = e.y / d + f / 2,
                h = 0;
            e.rotate && (h = parseInt(e.rotate));
            var k = parseInt(e.sweep);
            0 < k && "arcdown" == e.shape && (k *= -1);
            e.x = g;
            e.y = d;
            e.width = c;
            e.height = f;
            e.rotation = h;
            e.lines || (e.lines = 1);
            // debugger;

//            var ColorData = state.dsUtils.getPricingColorData();
//            var sideName;
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
//            var activeRegionColors = ColorData.usrColors[sideName].length;

            if(getDesignColors() + 1 > 10){
                alert("您添加的设计颜色数量超过了10种，为了保证印刷质量，请保证设计颜色数量不超过10种。\n或咨询客服：400-920-2085 协助您解决。");
                return false;
            }
            e.object = new ui.text.TextElement(e, b.workArea, e.value, g, d, c, f, h, parseFloat(e.kerning), e.fill_color, parseFloat(e.stroke_width), e.stroke_color, parseInt(e.wrap_mode), parseInt(e.wrap_amount), k, parseInt(e.z), parseInt(e.fliph), parseInt(e.flipv), e.fontObject, e.lines);
            e.isNew && (e.object.isNew = e.isNew);
            e.alignment && (e.object.alignment = parseInt(e.alignment));
            e.line_height && (e.object.lineHeight = parseInt(e.line_height));
            e.object.width = e.width;
            e.object.height = e.height;
            e.object.id = e.id;
            c = e;
        } else {
            if ("image" === e.type) {
                d = X.width / (2 * b.defaultRegion.region[2]);
                c = e.width / d;
                f = e.height / d;
                g = e.x / d + c / 2;
                d = e.y / d + f / 2;
                h = 0;
                e.rotate && (h = parseInt(e.rotate));
                e.object = new ui.bitmap.BitmapElement(e, b.workArea, e.image.src, g, d, c, f, h, parseInt(e.z), parseInt(e.fliph), parseInt(e.flipv));
                if (e.colors) {
                    c = [];
                    for (f = 0; f < e.colors.length; f++) {
                        c.push(getColorString(e.colors[f]));
                    }
                    e.object.colors = c;

//                    var ColorData = state.dsUtils.getPricingColorData();
//                    switch(state.designer.activeSide.name){
//                        case 'third':
//                            sideName = 'left';
//                            break;
//                        case 'fourth':
//                            sideName = 'right';
//                            break;
//                        default:
//                            sideName = state.designer.activeSide.name;
//                    }
//                    var activeRegionColors = ColorData.usrColors[sideName].length;

                    if(getDesignColors() + c.length > 10){
                        return 'ColorOverflowError';
                    }
                }
                e.object.id = e.id;
                0 == e.art_id && la.push(e);
                c = e;
            } else {
                "vector" === e.type ? (d = X.width / (2 * b.defaultRegion.region[2]), c = e.width / d, f = e.height / d, g = e.x / d + c / 2, d = e.y / d + f / 2, h = 0, k = e.canvas_art_rendered, e.rotate && (h = parseInt(e.rotate)), e.x = g, e.y = d, e.width = c, e.height = f, e.rotation = h, e.object = {}, e.canvas_art_rendered = k, c = document.getElementById("designGroup" + b.sideId), e.object = new ui.svg.SvgElement(e.svg, c, e), c = e) : "embroideryText" === e.type ? c = w(b, e, Ja) : "embroideryArt" ===
                    e.type && (c = v(b, e));
            }
        }
        eventManager.trigger("designLiveEdition");
        return c;
    }

    function u(b) {
        qa();
        Q(b);
        na = 0;
        aa = [];
        eventManager.trigger("elementAdded", b);
        z.boundingBox.selectElement(b);
        eventManager.trigger("designColorsChanged");
//        debugger;
        U(0, E);
    }

    function s(b) {
        na++;
        Q(b);
        if (na == aa.length) {
            qa();
            S.ajaxCallEnded();
            S.ajaxCallEnded();
            E.state = "ready";
            E.elements = [];
            aa = [];
            for (b = na = 0; b < J.sides.length; b++) {
                J.sides[b].canvas.needRender && (J.sides[b].canvas.needRender = !1, r() && M(J.sides[b]));
            }
            E.product = {
                product_id: J.description.product_id,
                product_style_id: J.information.product_style_id
            };
//            debugger;
            console.debug('trigger rendered 2');
            U(0, E);
            oa.enable = !0;
            L.addSnapshotEvent("designRenderedComplete", []);
            na = 0;
            aa = [];
        }

    }

    function w(b, e) {
        getImageData(state.dsUtils.getEmbroideryUrl(e, "embroideryText", Ja), !1, function(c) {
            var d = X.width / (2 * b.defaultRegion.region[2]),
                f, g, h;
            f = e.width / d;
            g = e.height / d;
            h = e.x / d + f / 2;
            var d = e.y / d + g / 2,
                k = 0;
            e.rotate && (k = parseInt(e.rotate));
            e.object = new ui.text.EmbroideryTextElement(e, b.workArea, c.url, h, d, f, g, k, parseInt(e.z), parseInt(e.fliph), parseInt(e.flipv));
            e.object.id = e.id;
            e.object.sleep = !0;
            e.object.color1 = e.color1;
            e.object.color2 = e.color2;
            e.object.color3 = e.color3;
            e.object.color4 = e.color4;
            e.object.slant = e.slant;
            e.object.sequence = e.sequence;
            e.object.shape = e.shape;
            e.object.circle_radius = e.circle_radius;
            e.object.bottom_curve_type = e.bottom_curve_type;
            e.object.top_curve_type = e.top_curve_type;
            e.object.bottom_curve = e.bottom_curve;
            e.object.top_curve = e.top_curve;
            e.object.word_spacing = e.word_spacing;
            e.object.line_spacing = e.line_spacing;
            e.object.letter_spacing = e.letter_spacing;
            e.object.alignment = e.alignment;
            e.object.font = e.fontObject.font;
            e.object.font_id = e.fontObject.font_id;
            e.object.fontSize = e.fontSize;
            e.object.value = e.value;
            e.object.sleep = !1;
        });
        return e;
    }

    function v(b, e) {
        getImageData(state.dsUtils.getEmbroideryUrl(e, "embroideryArt"), !1, function(c) {
            var d = X.width / (2 * b.defaultRegion.region[2]),
                f, g, h;
            f = e.width / d;
            g = e.height / d;
            h = e.x / d + f / 2;
            var d = e.y / d + g / 2,
                k = 0;
            e.rotate && (k = parseInt(e.rotate));
            e.object = new ui.bitmap.EmbroideryArtElement(e, b.workArea, c.url, h, d, f, g, k, parseInt(e.z), parseInt(e.fliph), parseInt(e.flipv));
            e.object.id = e.id;
            c = [];
            for (f = 0; f < e.colors.length; f++) {
                c.push(e.colors[f].value);
            }
            e.object.colors = c;
        });
        return e;
    }

    function x(b, e, c) {//...............
//        debugger;
        1 != ma && L.doZoom();
        b = {
            productId: b,
            productStyleId: e,
            styles: []
        };
        c && (b.data = state.productXml);
        eventManager.trigger("needProduct", b);
    }

    function B(b) {
        J.regions = clone(b.regions);
        J.information = clone(b.information);

        ca(b);
        z = O(z.name);
        var e = new Image;

        e.onload = function() {
            R.clear();
            z.imageLoaded = !0;
            J.information["image_width_" + z.name] = e.width;
            J.information["image_height_" + z.name] = e.height;
            var b = S.width / sa * J.information["image_width_" + z.name],
                c = S.height / sa * J.information["image_height_" + z.name];
            R.image(fixImageUrl(z.defaultRegion.imgurl), 0.5 * (S.width - b), 0.5 * (S.height - c), b, c);

            eventManager.trigger("productColorChanged");
        };
        e.src = fixImageUrl(z.defaultRegion.imgurl);
    }

    function y(b) {
        var e;
        if (!(e = O(b.side))) {
            return !1;
        }
        var c = document.getElementById("svg" + e.sideId),
            d = c.getElementsByTagName("g")[0];
        d.setAttribute("id", "designGroup" + e.sideId);
        var f, g = g = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
        e.boundingBox.visibleRegion = !1;
        f = document.createElementNS("http://www.w3.org/2000/svg", "filter");
        f.setAttribute("id", "coverFilter" + e.sideId);
        f.setAttribute("filterUnits", "objectBoundingBox");
        f.setAttribute("x", "0%");
        f.setAttribute("y", "0%");
        f.setAttribute("width", "100%");
        f.setAttribute("height", "100%");
        g = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
        g.setAttribute("in", "SourceGraphic");
        g.setAttribute("type", "matrix");
        g.setAttribute("values", "-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1 0");
        f.appendChild(g);
        c.appendChild(f);
        g = document.createElementNS("http://www.w3.org/2000/svg", "mask");
        g.setAttribute("maskUnits", "userSpaceOnUse");
        g.setAttribute("id", "designMask" + e.sideId);
        var h = "-" + b.region[0] + "px",
            k = "-" + b.region[1] + "px";
        g.setAttribute("x", 0);
        g.setAttribute("y", 0);
        g.setAttribute("width", S.width);
        g.setAttribute("height", S.height);
        f = document.createElementNS("http://www.w3.org/2000/svg", "image");
        f.setAttribute("id", "coverMaskImage" + e.sideId);
        f.setAttribute("x", h);
        f.setAttribute("y", k);
        f.setAttribute("filter", "url('#coverFilter" + e.sideId + "')");
        f.setAttribute("width", S.width);
        f.setAttribute("height", S.height);
        var p = new Image;
        p.onload = function() {
            var b = $("<canvas/>")[0],
                e = b.getContext("2d");
            b.width = p.width;
            b.height = p.height;
            b.getContext("2d").drawImage(p, 0, 0, p.width, p.height);
            e.getImageData(0, 0, p.width, p.height);
        };
        f.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", b.mask.value);
        d.setAttribute("mask", "url('#designMask" + e.sideId + "')");
        c.appendChild(g);
        g.appendChild(f);
    }

    function D(b) {
        var e = "shape" == b.activeRegion.mask.type ? 0 : 1,
            c = b.workArea.canvas.getElementById("designGroup" + b.sideId);
        1 == e ? c.setAttribute("mask", "url('#designMask" + b.sideId + "')") : c.removeAttribute("mask");
        delete b.distressObj;
    }

    function V(b, e) {
        b.distressObj = e;
        var c = document.getElementById("svg" + b.sideId),
            d = b.activeRegion.region[3] > b.activeRegion.region[2] ? b.activeRegion.region[3] : b.activeRegion.region[2],
            f = S.width,
            d = d * b.boundingBox.zoomScale * ma * (1 != ma ? b.defaultRegion.region[2] / b.activeRegion.region[2] : 1);
        S.width > sa && (d *= S.width / sa);
        var g = "shape" == b.activeRegion.mask.type ? 0 : 1;
        if (b.workArea.canvas.getElementsByTagName("mask").length == g) {
            c.getElementsByTagName("g")[0].setAttribute("id", "designGroup" + b.sideId);
            var h = document.createElementNS("http://www.w3.org/2000/svg", "mask");
            h.setAttribute("maskUnits", "userSpaceOnUse");
            h.setAttribute("id", "distressMask" + b.sideId);
            h.setAttribute("x", "0");
            h.setAttribute("y", "0");
            h.setAttribute("width", f);
            h.setAttribute("height", f);
            f = document.createElementNS("http://www.w3.org/2000/svg", "image");
            f.setAttribute("id", "distressImage" + b.sideId);
            1 == g && f.setAttribute("mask", "url('#designMask" + b.sideId + "')");
            f.setAttribute("x", "0");
            f.setAttribute("y", "0");
            c.appendChild(h);
            h.appendChild(f);
        }
        c = b.workArea.canvas.getElementById("distressImage" + b.sideId);
        c.setAttribute("height", d);
        c.setAttribute("width", d);
        d = b.workArea.canvas.getElementById("designGroup" + b.sideId);
        14 == b.distressObj.distress_id ? (1 == g && d.setAttribute("mask", "url('#designMask" + b.sideId + "')"), document.getElementById("distressMask" + b.sideId).remove()) : (c.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", b.distressObj.distress_small_path_jpg), d.setAttribute("mask", "url('#distressMask" + b.sideId + "')"));
    }

    function ca(b) {
        if ("undefined" != typeof J.sides) {
            for (var e = 0; e < b.sides.length; e++) {
                var c = b.sides[e],
                    d = O(c.name);
                "undefined" != typeof d.distressObj && (c.distressObj = clone(d.distressObj));
            }
        }
        J = b;
        b = {};
        for (e = 0; e < J.regions.length; e++) {
            d = J.regions[e], d.regionId = e, d.regionIndex = e, c = O(d.side), d.sideIndex = c.sideId, !0 != b[c.name] && (b[c.name] = !1), 1 == d.is_default && (b[c.name] = !0, c.defaultRegion = d, 1 != d.side_order && J.defaultRegion || (J.defaultRegion = d));
        }
        for (e = 0; e < J.regions.length; e++) {
            d = J.regions[e], c = O(d.side), b[c.name] || (c.defaultRegion = d);
        }
        J.defaultRegion || (J.defaultRegion = J.regions[0]);
    }

    function M(b, e) {
        var c = "undefined" == typeof b ? z : b;
        c.boundingBox.hide();
        var d = c.boundingBox.getDesignRectangle(!1, 0, !1),
            f;
        if ("undefined" == typeof d) {
            return !1;
        }
        f = c.boundingBox.zoomScale;
        S.width > sa && (f /= sa / S.width);
        d.w /= f;
        d.h /= f;
        d.w > c.activeRegion.region[2] && (f = (c.activeRegion.region[2] * c.boundingBox.zoomScale / (sa / S.width) - 5) / d.w, c.boundingBox.resizeTo(d.w * f, d.h * f), d = c.boundingBox.getDesignRectangle(!1, 0, !1), d.w /= c.boundingBox.zoomScale, d.h /= c.boundingBox.zoomScale, e = !1);
        d.h > c.activeRegion.region[3] && (f = (c.activeRegion.region[3] * c.boundingBox.zoomScale - 5) / d.h, c.boundingBox.resizeTo(d.w * f, d.h * f), e = !1);
        d = c.boundingBox.getDesignRectangle(!1, 0, !1);
        d.y + d.h > c.boundingBox.region.height && (e = !1);
        !0 != e && (d = c.boundingBox.getDesignRectangle(!1, 0, !1), c.boundingBox.translateTo(c.boundingBox.zoomScale / (sa / S.width) * ((c.activeRegion.region[2] - d.w) / 2 + 0.5 * d.w), c.boundingBox.zoomScale / (sa / S.width) * ((c.activeRegion.region[3] - d.h) / 2 + 0.5 * d.h)));
        z.boundingBox.hide();
    }

    function A(b) {
        if (b.length) {
            for (var e = z.boundingBox.getDesignRectangle(!1, 0, !1, b), c = -e.x + z.activeRegion.region[2] / 2 - e.w / 2, e = -e.y + z.activeRegion.region[3] / 2 - e.h / 2, d = 0; d < b.length; d++) {
                b[d].x += c * z.boundingBox.zoomScale, b[d].y += e * z.boundingBox.zoomScale;
            }
        }
    }

    function G(b) {
        for (var e, c = 0; c < J.sides.length; c++) {
            fixImageUrl(J.sides[c].defaultRegion.imgurl) === b.url && (e = J.sides[c]);
        }
        if (e && (e.imageLoaded = !0, !e.offsetFixed)) {
            var c = e.name,
                d = 0.5 * (sa - b.width);
            b = 0.5 * (sa - b.height);
            for (var f = 0; f < J.regions.length; f++) {
                var g = J.regions[f];
                c.toLowerCase() === g.side.toLowerCase() && (g.region[0] += d, g.region[1] += b, eventManager.trigger("productRegionsChanged"));
            }
            e.offsetFixed = !0;
            e.boundingBox && P(e, e.activeRegion);
        }
    }

    function H() {
        for (var b = 0; b < J.sides.length; b++) {
            getImageData(fixImageUrl(J.sides[b].defaultRegion.imgurl), !1, G);
        }
    }

    function Q(b) {
        var e = O(b.data.location);
        e ? (e.elements.push(b), e.canvas.elements.push(b.data), b = searchInArray(J.sides, e.sideId, "sideId").elements, e.boundingBox.elements = b) : console.debug("OMG esto no puede pasar");
    }

    function da(b) {
        na++;
        Q(b);
        if (na === aa.length) {
            qa();
            b = [];
            for (var e = 0; e < aa.length; e++) {
                eventManager.trigger("elementsAdded", [aa[e].element]), b.push(aa[e].element.object);
            }
//            debugger;
            U(0, E);
            A(b);
            z.boundingBox.selectElement(b);
            na = 0;
            aa = [];
            setTimeout(function() {
                oa.enable = !0;
                L.addSnapshotEvent("copySelectionElementRenderedComplete", []);
            }, 100);
        }
    }

    function W(b) {
        na++;
        Q(b);
        if (na == aa.length) {
            qa();
            for (b = 0; b < aa.length; b++) {
                eventManager.trigger("elementsAdded", [aa[b].element]);
            }
            na = 0;
            aa = [];
            L.addSnapshotEvent("renderFromChangeProductComplete", []);
            eventManager.trigger("renderFromRedoComplete", []);
            U(5, E);
        }
    }

    function fa(b) {
        na++;
        Q(b);
        if (na == aa.length) {
            qa();
            for (b = 0; b < J.sides.length; b++) {
                M(J.sides[b]);
            }
            na = 0;
            aa = [];
            L.addSnapshotEvent("renderFromChangeProductComplete", []);
            d();
//            debugger;
            U(0, E);
        }
    }

    function ja() {
        for (var b = na = 0; b < aa.length; b++) {
            e(aa[b].side, aa[b].element);
        }
    }

    function F(b) {
        null != z && (I(z, "hidden"), z.boundingBox.hide());
        z = b;
        var e = new Image;

        e.onload = function() {
            R.clear();
            b.imageLoaded = !0;
            J.information["image_width_" + b.name] = e.width;
            J.information["image_height_" + b.name] = e.height;
            var c = S.width / sa * J.information["image_width_" + b.name],
                d = S.height / sa * J.information["image_height_" + b.name];
            R.clear();
            R.image(fixImageUrl(b.defaultRegion.imgurl), 0.5 * (S.width - c), 0.5 * (S.height - d), c, d);
            L.keepOriginalZoom();

        };
        e.src = fixImageUrl(b.defaultRegion.imgurl);
        ezdVars.ArtToolsMode || ($("#raphael").css("background-color", ""));
        I(b, "visible");
        eventManager.trigger("undoStackChanged");
    }

    function I(b, e) {
        b.div.show();
        b.div.css("top", "visible" === e ? "0px" : "-1000px");
    }

    function P(b, e) {
        var c = b.defaultRegion.region[2] / e.region[2],
            d = [e.region[0], e.region[1], e.region[2], e.region[3]],
            f = -d[0] * c,
            g = -d[1] * c;
        b.boundingBox.xOffset = f;
        b.boundingBox.yOffset = g;
        b.boundingBox.zoomScale = c / (S.width / sa);
        b.boundingBox.region = {
            x: 0,
            y: 0,
            width: d[2] * c,
            height: d[3] * c
        };
        //b.boundingBox.hideRegion();
        c *= sa;
        b.workArea.setViewBox(f, g, c, c);
        b.boundingBox.updateScale();
        b.activeRegion = e;
        if (f = O(e.side)) {
            $("#designMask" + f.sideId).remove(), f = document.getElementById("svg" + f.sideId).getElementsByTagName("g")[0], f.removeAttribute("style"), f.removeAttribute("mask");
        }
        if ("shape" == e.mask.type) {
            if (f = O(e.side)) {
                g = document.getElementById("svg" + f.sideId);
                c = ma;
                d = g.getElementsByTagName("g")[0];
                d.setAttribute("id", "designGroup" + f.sideId);
                var h, k = ezdVars.DemoOval ? "OVAL" : "RECT",
                    p = ezdVars.RegionAngle || 0,
                    m = f.defaultRegion.region[2] / e.region[2],
                    n = n = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
                "RECT" == k ? (h = document.createElementNS("http://www.w3.org/2000/svg", "rect"), h.setAttribute("id", "designRectMask" + f.sideId), h.setAttributeNS(null, "x", 0), h.setAttributeNS(null, "y", 0), h.setAttributeNS(null, "height", e.region[3] * c * m), h.setAttributeNS(null, "width", e.region[2] * c * m), h.setAttributeNS(null, "transform", "rotate(" + p + " " + e.region[2] * c * m * 0.5 + " " + e.region[3] * c * m * 0.5 + ")"), h.setAttributeNS(null, "fill", "#FFFFFF")) : "ROUND" == k ?
                    (h = document.createElementNS("http://www.w3.org/2000/svg", "rect"), h.setAttribute("id", "designRectMask" + e.sideId), h.setAttributeNS(null, "x", 0), h.setAttributeNS(null, "y", 0), h.setAttributeNS(null, "height", e.region[3] * c * m), h.setAttributeNS(null, "width", e.region[2] * c * m), h.setAttributeNS(null, "ry", 50 * c * m), h.setAttributeNS(null, "rx", 50 * c * m), h.setAttributeNS(null, "transform", "rotate(" + p + " " + e.region[2] * c * m * 0.5 + " " + e.region[3] * c * m * 0.5 +
                        ")"), h.setAttributeNS(null, "fill", "#FFFFFF")) : "OVAL" == k && (h = document.createElementNS("http://www.w3.org/2000/svg", "ellipse"), h.setAttribute("id", "designRectMask" + f.sideId), h.setAttributeNS(null, "cx", e.region[2] * c * m * 0.5), h.setAttributeNS(null, "cy", e.region[3] * c * m * 0.5), h.setAttributeNS(null, "ry", e.region[3] * c * m * 0.5), h.setAttributeNS(null, "rx", e.region[2] * c * m * 0.5), h.setAttributeNS(null, "transform", "rotate(" + p + " " + e.region[2] * c *
                    m * 0.5 + " " + e.region[3] * c * m * 0.5 + ")"), h.setAttributeNS(null, "fill", "#FFFFFF"));
                d.setAttribute("style", "clip-path:url('#designMask" + f.sideId + "')");
                n.setAttribute("id", "designMask" + f.sideId);
                g.appendChild(n);
                n.appendChild(h);
            }
        } else {
            y(e);
        }
        "undefined" != typeof b.distressObj && V(b, b.distressObj);
        b.boundingBox.enforceBoundaries && M(b, !0);
    }

    function O(b) {
        for (var e = 0; e < J.sides.length; e++) {
            if (J.sides[e].name.toUpperCase() == b.toUpperCase()) {
                return J.sides[e];
            }
        }
        return !1;
    }

    function N(b) {
        var e, c;
        if (!(e = searchInArray(J.regions, b, "regionId")) || !(c = O(e.side))) {
            return !1;
        }
        H();
        F(c);
        var d;
        (d = O(e.side)) && e.name != ("undefined" == typeof d.activeRegion ? "NOTSET" : d.activeRegion.name) && (ka = e, P(z, e));
        n(c);
        return ka;
    }

    function U(b, e) {
//        debugger;
        console.debug("************** Event事件 **************");
        console.debug("事件： ", va[b]);
        console.debug("数据 = ", e);
        eventManager.trigger(va[b], e);

        if(va[b] == 'DESIGN_UPDATED' || va[b] == 'rendered'){
            eventManager.trigger('updatePricePreview', true);
        }
    }

    function Z() {
        for (var b = 0; b < E.sides.length; b++) {
            var e = E.sides[0];
            e.elements = e.elements.sort(function(b, e) {
                return b.z < e.z ? -1 : b.z > e.z ? 1 : 0;
            });
            for (var c = 0; c < e.elements.length; c++) {
                e.elements[c].z = c;
            }
        }
    }
    var L = this,
        K = 1,
        T = {}, J = {}, E, S = b,
        ea = {}, oa, z, ka, R, X = {
            width: 500,
            height: 500
        }, la = [],
        ma = 1,
        aa = [],
        na = 0,
        va = "rendered DESIGN_READY PRODUCT_READY ELEMENT_READY DESIGN_UPDATED designChanged productColorChanged".split(" "),
        wa = 0,
        xa = !1,
        ta = 0,
        qa, sa = 500,
        Ja = {
            slant: "slant",
            sequence: "sequence",
            shape: "shape",
            circle_radius: "circleRadius",
            bottom_curve_type: "bottomCurveType",
            top_curve_type: "topCurveType",
            bottom_curve: "bottomCurve",
            top_curve: "topCurve",
            word_spacing: "wordSpace",
            line_spacing: "lineSpace",
            letter_spacing: "letterSpace",
            alignment: "alignment",
            font_size: "fontSize"
        };
    Object.defineProperties(this, {
        width: {
            get: function() {
                return S.width;
            }
        },
        height: {
            get: function() {
                return S.height;
            }
        },
        store: {
            get: function() {
                return ea;
            }
        },
        setCanvasSize: {
            set: function(b) {
                g(b);
            }
        },
        originalCanvasSize: {
            get: function() {
                return sa;
            }
        },
        zoom: {
            get: function() {
                return ma;
            }
        },
        product: {
            get: function() {
                return J;
            }
        },
        sides: {
            get: function() {
                return J.sides;
            }
        },
        regions: {
            get: function() {
                return J.regions;
            }
        },
        canvas: {
            get: function() {
                return _canvas;
            }
        },
        canvasProduct: {
            get: function() {
                return R;
            }
        },
        design: {
            set: function(b) {
                k(b);
            },
            get: function() {
                return E;
            }
        },
        scale: {
            set: function(b) {
                (r = b) && M();
            },
            get: function() {
                return r;
            }
        },
        activeSide: {
            get: function() {
                return z;
            }
        },
        proportion: {
            get: function() {
                return X;
            }
        },
        hm: {
            get: function() {
                return oa;
            }
        },
        activeRegion: {
            get: function() {
                return ka;
            }
        },
        initObject: {
            get: function() {
                return {
                    container: S.container
                };
            }
        },
        config: {
            get: function() {
                return S;
            }
        }
    });
    this.updateLayers = function() {};
    this.renderElements = function(b) {
        aa = b;
        na = 0;
        qa = eventManager.on("elementRendered", W);
        ja();
    };
    this.deleteElements = function(b) {
        b = "undefined" == typeof b.length ? [b] : b;
        for (var e = [], c = 0; c < b.length; c++) {
            e.push(b[c].id);
        }
        for (c = 0; c < e.length; c++) {
            p(L.getElementById(e[c]));
        }
        eventManager.trigger("undoSnapshotDone");
        eventManager.trigger("elementsDeleted");
        U(4, E);
    };
    this.getElementById = function(b) {
        for (var e = 0; e < E.sides.length; e++) {
            var c = searchInArray(E.sides[e].elements, b, "id");
            if (c) {
                return c;
            }
        }
        return !1;
    };
    this.getElementID = function(b, e) {
        for (var c = 0; c < E.sides.length; c++) {
            for (var d = E.sides[c], f = 0; f < d.elements.length; f++) {
                var g = d.elements[f];
                if (g.table_name == e && (g.canvas_text_id == b || g.canvas_art_id == b)) {
                    return g.id;
                }
            }
        }
    };
    this.addEmbroideryText = function(b) {
        var c = X.width / (2 * z.defaultRegion.region[2]),
            d = 125 / z.defaultRegion.region[2],
            f = 100 / d,
            d = 20 / d,
            g = c * z.boundingBox.getRegionCenter().x - 0.5 * f,
            c = c * (z.boundingBox.getRegionCenter().y + wa) - 0.5 * d,
            f = {
                x: g,
                y: c,
                z: z.boundingBox.elements.length,
                width: f,
                location: z.name,
                height: d,
                type: "embroideryText",
                table_name: "canvas_text",
                id: K++
            }, h;
        for (h in b) {
            f[h] || (f[h] = b[h]);
        }
        qa = eventManager.on("elementRendered", u);
        b = e(z, f);
        f.element = b;
        return f;
    };
    this.addNewText = function(b, c, text) {
        var d = X.width / (2 * z.defaultRegion.region[2]),
            f = 125 / z.defaultRegion.region[2],
            g = 100 / f,
            f = 20 / f,
            h = d * z.boundingBox.getRegionCenter().x - 0.5 * g,
            d = d * (z.boundingBox.getRegionCenter().y + wa) - 0.5 * f;
        wa += 5;
        g = {
            type: "text",
            kerning: 0,
            lineHeight: 0,
            rotation: 0,
            x: h,
            y: d,
            sweep: 0,
            width: g,
            height: f,
            location: z.name,
            value: text || "文字",
            fill_color: "#000000",
            stroke_width: 0,
            stroke_color: "#000000",
            shadow_color: "#000000",
            shadow_value: 0,
            fontObject: b,
            wrap_mode: 0,
            sweep: 0,
            wrap_amount: 0,
            fliph: 0,
            flipv: 0,
            table_name: "canvas_text",
            isNew: !0,
            z: z.boundingBox.elements.length,
            id: K++
        };
        if (c) {
            for (var k in c) {
                g[k] = c[k];
            }
        }
        b.font_family = b.fontFamily;
        qa = eventManager.on("elementRendered", u);
        k = e(z, g);
        k.isNew = !0;
        k.fontId = 820;
        k.fontStyleId = 6;
        g.element = k;

        return g;
    };
    this.deleteElement = function(b) {
        b = this.getElementById(b);
        if (!b) {
            return !1;
        }
        p(b);
    };
    this.addClipArt = function(b) {
        b.width || (b.width = 200);
        b.height || (b.height = 200);
        b.width /= ma;
        b.height /= ma;
        var c = {
            x: 0,
            y: 0,
            width: b.width,
            height: b.height,
            rotation: 0
        };
        c.x = z.boundingBox.region.x + z.boundingBox.region.width / 2;
        c.y = z.boundingBox.region.y + z.boundingBox.region.height / 2;
        z.boundingBox.checkElementSize(c, !0);
        c.width *= 0.8;
        c.height *= 0.8;
        c.x -= c.width / 2;
        c.y -= c.height / 2;
        var d = "needSvg",
            f = b.art_id,
            g = [];
        if ("raster" == b.art_type) {
            b.art_type = "image", d = "needImage";
        } else {
            for (var h = 0; h < b.art_colors.length; h++) {
                g.push(getColorString(b.art_colors[h], !0));
            }
        }
        c = {
            art_id: f,
            x: c.x,
            y: c.y,
            z: z.boundingBox.elements.length,
            width: c.width,
            height: c.height,
            type: "emb" == b.art_type ? "embroideryArt" : b.art_type,
            art_path: b.art_path,
            original_art_path: b.art_path,
            table_name: "canvas_art",
            resizeBox: !0,
            location: z.name,
            art: {
                art_name: b.art_name,
                width: b.width,
                height: b.height
            },
            canvas_art_rendered: b.thumb_jit,
            colors: b.forceColors ? b.art_colors : [],
            id: K++
        };
        "embroideryArt" == c.type && (c.colors = b.art_colors);
        qa = eventManager.on("elementRendered", u);
        "needImage" == d ? (c.image = {
            url: c.art_path,
            src: c.art_path
        }, e(z, c)) : eventManager.trigger(d, c);

        return c;
    };
    this.selectRegion = function(b) {
        if (b != this.activeSide.activeRegion.regionId) {
            return N(b);
        }
    };
    this.loadLocalImage = function(b, c, d) {
        for (var f = 0, g = 0; g < ezd.activeSide.elements.length; g++) {
            var h = ezd.activeSide.elements[g],
                f = f > h.z ? f : h.z + 1
        }
        var g = z.activeRegion.region[2] < z.activeRegion.region[3] ? z.activeRegion.region[2] : z.activeRegion.region[3],
            k = d.width > d.height ? g / d.width : g / d.height,
            g = 0.5 * (z.activeRegion.region[2] - d.width * k * 0.7),
            h = 0.5 * (z.activeRegion.region[3] - d.height * k * 0.7),
            p = d.width * k * 0.7,
            k = d.height * k * 0.7,
            m = 0;
        d.artID && (m = d.artID);
        b = {
            art_id: m,
            x: g,
            y: h,
            z: f,
            width: p,
            height: k,
            art_width: d.art_width,
            art_height: d.art_height,
            type: "image",
            art_path: b,
            original_art_path: b,
            resizeBox: !1,
            input: c,
            colors: d.colors,
            location: ezd.activeSide.name,
            table_name: "canvas_art",
            is_user: !0,
            art_type: "raster",
            image: {
                url: b,
                src: b
            },
            art: {
                art_name: d.artName
            }
        };
        qa = eventManager.on("elementRendered", u);
        var rsl =  e(z, b);
        if(rsl == 'ColorOverflowError'){
            setTimeout(function(){
                alert("您上传的图片颜色数量超过了10种，为了保证印刷质量，请上传小于10种颜色的图片。\n或咨询客服：400-920-2085 协助您解决。");
                state.designer.activeSide.boundingBox.removeSelection();
            }, 1000);

        }else{
            return rsl;
        }
    };
    this.getDesign = function(b) {
        k(b);
    };
    this.hideBB = function() {};
    (function(b) {
        ea = {
            domain: b.ApiDomain || "open.dev.jzw.la",
            publisherId: b.PublisherID || 3,
            AppToken: b.AppToken || 306,
            ezdPath: b.DesignerLocation || "/designer/html5"
        };
        S.productId = b.ProductID;
        S.productStyleId = b.ProductStyleID;
    })(ezdVars);
    x(S.productId, S.productStyleId, !0);
    parseInt(1 * ezdVars.DesignID) && (xa = !0, ta = ezdVars.DesignID);
    "undefined" != typeof HistoryManager && (oa = new HistoryManager(L));
    R = new Raphael(S.container[0], S.width, S.height);
    g(S);
    eventManager.on("productLoaded", function(b) {
        if ("undefined" == typeof J.description || b.description.product_id != J.description.product_id) {
            $("#raphael").empty();
            ca(b);
            for (b = 0; b < J.sides.length; b++) {
                var e = J.sides[b];
                $("#raphael").append('<div id="side' + e.sideId + '" class="raphaelSide"></div>');
                var f = new Raphael(document.getElementById("side" + e.sideId), S.width, S.height);
                e.workArea = f;
                f.canvas.setAttribute("id", "svg" + e.sideId);
                e.div = $("#side" + e.sideId);
                e.elements = [];
                e.imageLoaded = !1;
                f = new container.BoundingContainer(e.workArea, [], "side" + e.sideId);
                e.boundingBox = f;
                e.boundingBox.hide();
                I(e, "hidden");
                P(e, e.defaultRegion);
            }
            N(J.defaultRegion.regionId); //设置画布内容
            b = {
                noSides: [],
                sides: [],
                information: {
                    width: S.width,
                    height: S.height
                },
                rendered: 0,
                state: "new",
                product: {
                    product_id: J.description.product_id,
                    product_style_id: J.information.product_style_id
                }
            };
            for (e = 0; e < J.sides.length; e++) {
                var f = J.sides[e],
                    g = {
                        location: f.name.charAt(0).toUpperCase() + f.name.slice(1),
                        canvas: f.defaultRegion,
                        rendered: 0,
                        elements: [],
                        side: f
                    };
                f.canvas = g;
                g.canvas.location = g.location;
                b.sides.push(g);
            }
            if (null == E) {
                E = b;
            } else {
                g = [];
                e = [];
                for (f = 0; f < E.sides.length; f++) {
                    var h = E.sides[f];
                    g.push(h.canvas);
                    e = e.concat(h.elements);
                }
                for (var p, f = 0; f < e.length; f++) {
                    var g = e[f],
                        h = L.getElementById(g.id),
                        m = X.width / (0.25 * z.defaultRegion.region[2]);
                    if ("text" == h.type) {
                        h.table_name = "canvas_text", p = {
                            rotation: "rotate",
                            text: "value",
                            color: "fill_color",
                            strokeColor: "stroke_color",
                            stroke: "stroke_width",
                            wrap: "wrap_mode",
                            wrapAmmount: "wrap_amount",
                            letterSpacing: "kerning"
                        };
                    } else {
                        if ("vector" == h.type || "image" == h.type) {
                            if ("vector" == h.type && (h.table_name = "canvas_art", h.stroke_color = h.object.stroke, h.stroke_width = h.object.strokeColor), h.colors && h.colors.length) {
                                for (var n = 0; n < h.colors.length; n++) {
                                    g["color" + (n + 1)] = h.object.colors[n];
                                }
                                for (n = 0; n < h.colors.length; n++) {
                                    "none" == h.object.colors[n].toLocaleLowerCase() ? h.object.colors[n] = "none" : h.object.colors[n] = h.object.colors[n].split("#")[1];
                                }
                                g.colors = h.object.colors;
                            }
                        }
                    }
                    for (var s in p) {
                        g[p[s]] = h.object[s];
                    }
                    "text" == h.type && (g.letterSpacing *= 50, g.kerning *= 50);
                    var n = g.object.width * m,
                        q = g.object.height * m,
                        r = g.object.x * m - n / 2,
                        m = g.object.y * m - q / 2;
                    g.width = n;
                    g.flipv = h.object.flipV;
                    g.fliph = h.object.flipH;
                    g.height = q;
                    g.x = r;
                    g.rotate = h.object.rotation;
                    g.y = m;
                }
                aa = [];
                for (p = 0; p < J.sides.length; p++) {
                    s = J.sides[p];
                    for (f = 0; f < e.length; f++) {
                        g = e[f], s.name.toUpperCase() == g.location.toUpperCase() && aa.push({
                            side: s,
                            element: g
                        });
                    }
                    "undefined" != typeof s.distressObj && c(s.name, s.distressObj.distress_id);
                }
                E = b;
                aa.length && (qa(), qa = eventManager.on("elementRendered", fa), ja());
            }
            d();
//            debugger;
            console.debug('trigger rendered 1');
            U(0);
            U(6);
        } else {
            for (p = 0; p < J.sides.length; p++) {
                b.sides[p] = J.sides[p], b.sides[p].offsetFixed = !1;
            }
            B(b);
            H();
        }
        $("#designerContainer").find('svg').css("background-color", "#" + J.information.html_color);

        xa && (xa = !1, k(ta), ta = 0);
    });
    eventManager.on("elementLoaded", function(b) {
        e(z, b);
    });
    eventManager.on("designLoaded", function(b) {
//        S.ajaxCallStarted();
        m(b);
        oa.enable = !1;
        if (z.activeRegion.name != E.information.region_name) {
            a: {
                b = E.information.region_name;
                for (var e = E.information.location, d = 0; d < J.regions.length; d++) {
                    if (J.regions[d].name == b && J.regions[d].side == e) {
                        b = J.regions[d];
                        break a;
                    }
                }
                b = !1;
            }
            b && N(b.regionId);
        }
        aa = [];
        for (b = na = 0; b < E.sides.length; b++) {
            e = E.sides[b];
            if (e.needRender) {
                for (d = 0; d < e.elements.length; d++) {
                    aa.push({
                        side: e.side,
                        element: e.elements[d]
                    });
                }
                e.elements = [];
            }
            1 == e.canvas.is_distressed && c(e.location, e.canvas.distress_id);
        }
        ja();
    });
    eventManager.on("elementSelected", function(b) {
        z.boundingBox.selectElement(z.boundingBox.getChildrenById(b));
    });
    this.parseProduct = function(b, e) {
        x(b, e);
    };
    this.addSnapshotEvent = function(b, e) {
        "undefined" != typeof oa && oa.addSnapshot(b);
    };
    this.startEvent = function(b) {};
    this.chanPropertyEvent = function() {};
    this.resetEvent = function() {
        "undefined" != typeof oa && oa.start();
    };
    this.endEvent = function() {};
    this.zoomIn = function() {
        this.zoom && 1 != this.zoom || this.doZoom();
    };
    this.zoomOut = function() {
        this.zoom && 1 == this.zoom || this.doZoom();
    };
    this.getDesignDimensions = function(b) {
        // debugger;
        for (var e = [], c = 0; c < b.elements.length; c++) {
            if ("text" == b.elements[c].type) {
                if (b.elements[c].object) {
                    var d = b.elements[c].object.element.getBBox();
                    e.push(d);
                }
            } else {
                b.elements[c].raphael && (d = b.elements[c].raphael.getBBox(), e.push(d));
            }
        }
        for (var d = b = 1E3, f = 0, g = 0, c = 0; c < e.length; c++) {
            e[c].x < b && (b = e[c].x), e[c].y < d && (d = e[c].y), e[c].x + e[c].width > f && (f = e[c].x + e[c].width), e[c].y + e[c].height > g && (g = e[c].y + e[c].height);
        }
        return {
            x: b,
            y: d,
            w: f - b,
            h: g - d
        };
    };
    this.getSVG = function(b, e, c) {
        var d = b.side;
        d.boundingBox.hide();
        var f = d.boundingBox.getDesignRectangle(!1, 0, !1);
        d.boundingBox.hideRegion();
        if (0 < b.elements.length) {
            !0 != c && (f.w = d.boundingBox.region.width, f.x = 0, f.h += f.y, f.y = 0);

            b = 1;//f.w > f.h ? e / (2 * f.w) : e / (2 * f.h);
            try {
                var g = $("#side" + d.sideId + " svg")[0],
                    h = $($.parseXML((new XMLSerializer).serializeToString($("#svg" + d.sideId)[0]))),
                    g = $(h[0].documentElement);
            } catch (k) {
                g = h = $("#side" + d.sideId + " svg").clone();
            }
            f.x *= b;
            f.y *= b;
            f.w *= b;
            f.h *= b;
            c = -f.x;
            var p = -f.y,
                m = 1 * b,
                n = 1 * b;
            h.find("#bbGroup").remove();
            h.find("desc").remove();
            h.find("defs").remove();
            b = h.find("#designGroup" + d.sideId);
            g.attr("width", d.boundingBox.region.width);
            g.attr("height", d.boundingBox.region.height);
            g[0].style.height = d.boundingBox.region.height + "px";
            b.attr("transform", "translate(" + c + "," + p + ") scale(" + m + "," + n + ")");
            f = d.distressObj && "0" != d.distressObj.distress_uri;
            c = d.activeRegion.mask;
            f && (p = h.find("#distressMask" + d.sideId), p.attr("width", e), p.attr("height", e));
            c && (g[0].removeAttribute("mask"), g.find("#designMask" + d.sideId).remove(), g.find("#coverFilter" + d.sideId).remove());
            f || c || (h.find("#designMask" + d.sideId).remove(), h.find("#distressImage" + d.sideId).remove(), b.css("clip-path", ""));
            g.attr("viewBox", null);
            g[0].removeAttribute("viewBox");
        }
        e = $(h[0].getElementsByTagName("style"));
        if (e.length) {
            d = "";
            for (g = 0; g < e.length; g++) {
                d += $(e[g]).html() + "\n", 0 < g && e[g].parentNode.removeChild(e[g]);
            }
            e[0].textContent = d;
        }
        return h[0];
    };
    this.isEmbroidery = function() {
        for (var b = 0; b < this.sides.length; b++) {
            if (this.sides[b].boundingBox.elements.length) {
                for (var e = 0; e < this.sides[b].boundingBox.elements.length; e++) {
                    var c = this.sides[b].boundingBox.elements[e];
                    if ("embroideryText" == c.type || "embroideryArt" == c.type) {
                        return !0;
                    }
                }
            }
        }
        return !1;
    };
    this.saveDesign = function(b) {
        var e = this.zoom;
        1 != this.zoom && this.doZoom();
        la = [];
        for (var c = 0; c < E.sides.length; c++) {
            for (var d = 0; d < E.sides[c].elements.length; d++) {
                var f = E.sides[c].elements[d].object;
                "image" != f.data.type && "bitmap" != f.data.type || 0 != f.data.art_id || la.push(f.data);
            }
        }
        if (la.length) {
            t(function() {
                L.saveDesign(b);
            });
        } else {
            Z();
            for (var g = [], d = 0; d < E.sides.length; d++) {
                g.push(E.sides[d].side.activeRegion);
            }
            var h = null,
                k = null,
                p = d = null,
                m = null,
                c = "未命名",
                n = f = "",
                s = this.isEmbroidery() ? 1 : 0;
            "undefined" != typeof b && b && (h = b.success,
                k = b.error, b.productStyleId && (d = b.productStyleId), b.UserToken && (p = b.UserToken),
                b.UserToken && (m = b.UserToken), b.notes && (f = htmlEscape(b.notes)),
                b.name && (c = htmlEscape(b.name.replace("&", "And"))), b.designId && (n = b.designId));
            !d && J && J.information && (d = J.information.product_style_id);
            !p && T && (p = T.UserToken);
            !m && T && (m = T.UserToken);
            var q = "<UserDesign>",
                r = {}, u = "",
                q = q + ('<designs designer_version="HTML5DS" admin="' + (ezdVars.Admin || "None") + '" is_embroidery="' + s + '" design_id="' + n + '" name="' + c + '" product_style_id="' + d + '" notes="' + f + '"/>');
            console.debug(q);
            for (d = 0; d < E.sides.length; d++) {
                if (E.sides[d].elements.length) {
                    f = this.getSideByName(E.sides[d].location);
                    c = ' distress_id="" is_distressed="0" ';
                    f.distressObj && "0" != f.distressObj.distress_uri && (c = ' distress_id="' + f.distressObj.distress_id + '" is_distressed="1" ');
                    f = g[d];
                    n = this.getDesignDimensions(E.sides[d]);
                    E.sides[d].boundingBox && (n = E.sides[d].boundingBox.getDesignRectangle());
                    var x = 436,
                        n = parseInt(n.h / (n.w / 436)),
                        v = "";
                    s && (v = ' embroidery_region_align="tl" height_cm="1" width_cm="1" justify_type="Left" envelope_type="Rectangle" width_compression="100" percent_pull_compression="100"');
                    q += '<canvases canvas_id="-1"  ' + c + ' region="' + f.name + '" region_id="' + f.product_region_id + '" location="' + E.sides[d].side.name + '" width="' + x + '" height="' + n + '" bgcolor="' + getColorString(ezd.product.information.html_color, !0) + '" shadow="false"' + v + " />";
                    for (c = 0; c < E.sides[d].elements.length; c++) {
                        n = E.sides[d].elements[c];
                        f = E.sides[d].elements[c].object;
                        v = {};
                        x = 436;
                        x /= E.sides[d].side.boundingBox.region.width;
                        v.x = f.x;
                        v.y = f.y;
                        v.width = f.width;
                        v.height = f.height;
                        v.x -= f.width / 2 + E.sides[d].side.boundingBox.region.x;
                        v.y -= f.height / 2 + E.sides[d].side.boundingBox.region.y;
                        v.x *= x;
                        v.y *= x;
                        v.width *= x;
                        v.height *= x;
                        v.z = f.z;
                        v.x = parseInt(v.x);
                        v.y = parseInt(v.y);
                        v.width = parseInt(v.width);
                        v.height = parseInt(v.height);
                        v.fliph = f.flipH;
                        v.flipv = f.flipV;
                        v.rotate = f.rotation;
                        var x = "",
                            w = f.type;
                        "bitmap" != w || "embroideryArt" != n.type && "embroideryText" != n.type || (w = n.type);
                        if ("text" == w || "embroideryText" == w) {
                            var B = "",
                                B = 0 > f.arching ? "arcdown" : "arcup";
                            v.kerning = 50 * f.letterSpacing;
                            v.wrap_amount = f.wrapAmmount;
                            v.wrap_mode = f.wrap;
                            v.value = f.text;
                            v.fill_color = getColorString(f.color, !0);
                            v.stroke_width = 2 * f.stroke;
                            f.strokeColor && (v.stroke_color = getColorString(f.strokeColor, !0));
                            v.shape = B;
                            v.sweep = Math.abs(f.arching);
                            v.font_id = f.fontId ? f.fontId : f.font_id;
                            v.alignment = f.alignment;
                            v.line_height = f.lineHeight;
                        }
                        if ("vector" == w) {
                            for (B = 0; B < f.colors.length; B++) {
                                var y = f.colors[B],
                                    D = f.colorsMapped[B];
                                v["color" + (B + 1)] = getColorString(y, !0);
                                v["color" + (B + 1) + "_mapped"] = getColorString(D, !0);
                            }
                            f.stroke && (v.stroke_width = f.stroke);
                            f.strokeColor && (v.stroke_color = getColorString(f.strokeColor, !0));
                            v.art_id = n.art_id;
                        }
                        if ("image" == w || "bitmap" == w) {
                            if (v.art_id = n.object.data.art_id, f.colors) {
                                D = [];
                                for (B = 0; B < f.colors.length; B++) {
                                    y = getColorString(f.colors[B], !0), findMatch(D, function(b) {
                                        return b == y;
                                    }) || D.push(y);
                                }
                                for (B = 0; B < D.length; B++) {
                                    v["color" + (B + 1)] = D[B];
                                }
                            }
                        }
                        if ("embroideryText" === w) {
                            v.value = f.value;
                            v.font_id = f.font_id;
                            for (var A in Ja) {
                                f[A] && (B = escape(f[A]), v[A] = B);
                            }
                            v.color1 = f.color1;
                            v.color2 = f.color2;
                            v.color3 = f.color3;
                            v.color4 = f.color4;
                        }
                        if ("embroideryArt" === w) {
                            for (B = 0; B < f.colors.length; B++) {
                                y = f.colors[B], v["color" + (B + 1)] = getColorString(y, !0);
                            }
                            v.art_id = n.art_id;
                        }
                        for (var z in v) {
                            v[z] && (x += " " + z + ' = "' + htmlEscape(v[z]) + '"');
                        }
                        x += ' location = "' + E.sides[d].side.name.toUpperCase() + '"';
                        "text" == w || "embroideryText" == w ? x = "<canvas_text " + x + "/>" : "image" == w || "bitmap" == w || "embroideryArt" == w ? x = "<canvas_art " + x + "/>" : "vector" == w && (x = "<canvas_art " + x + "  />");
                        u += "" + x;
                    }
                }
            }
            q += u;
            q += "</UserDesign>";
            g = "//" + ea.domain + "/api?model=design&action=save";
            r.xmlDesign = q;
            for (d = 0; d < E.sides.length; d++) {
                0 < E.sides[d].elements.length && (r["svg" + E.sides[d].side.name] = this.fixLinkedImagesInSVG(this.getSVG(E.sides[d], 4500), E.sides[d]));
            }
            this.checkDesignSave(r) ? "undefined" != typeof h && h && setTimeout(function() {
                h(q, ezd.lastSaveData.result);
            }, 10) : (this.lastSaveData = {
                postData: r,
                success: !1
            }, this.zoom != e && this.doZoom(), $.ajax({
                type: "POST",
                url: g,
                data: r,
                complete: function(b) {
                    b = b.responseText;
                    b = b.replace(/&amp;/gi, "TTTTT").replace(/&/gi, "&amp;").replace(/TTTTT/gi, "&amp;");
                    b = $($.parseXML(b));
                    var e = b.find("Error");
                    "" != e.text() ? (b = e.text(), "undefined" != typeof k && k && k(b)) : (b = {
                        designID: b.find("DesignID").text(),
                        image: b.find("image").text(),
                        designURI: b.find("DesignURI").text(),
                        UserToken: b.find("UserToken").text(),
                        sessionToken: b.find("SessionToken").text(),
                        UserToken: b.find("UserToken").text(),
                        title: b.find("title").text(),
                        description: b.find("description").text(),
                        type: b.find("type").text(),
                        url: b.find("url").text(),
                        sitename: b.find("sitename").text(),
                        brand: b.find("brand").text(),
                        sku: b.find("sku").text(),
                        color: b.find("color").text(),
                        activityId: b.find("ActivityId").text()
                    }, "undefined" != typeof h && h && h(q, b), window.eventManager && window.eventManager.trigger("designSaved", b), "undefined" !== typeof ezd && (ezd.designId = b.designId));
                }
            }));
        }
    };
    this.checkDesignSave = function(b) {
        if (this.lastSaveData && this.lastSaveData.success) {
            for (var e in b) {
                var c = b[e],
                    d = this.lastSaveData.postData[e];
                if (c && d && c != d) {
                    return !1;
                }
            }
            return !0;
        }
        return !1;
    };
    this.fixLinkedImagesInSVG = function(b, e) {
        for (var c = $(b), d = 0; d < e.elements.length; d++) {
            var f = e.elements[d].object;
            if (f instanceof ui.bitmap.BitmapElement) {
                var g = c.find("#DsElement" + f.id);
                if (!g || !g.length) {
                    console.log("Error: 不能找到图片 " + f.id + " 的 BitmapElement");
                    continue;
                }
//                g[0].setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", f.data.art_id);
            }
            if (f instanceof ui.bitmap.EmbroideryArtElement || f instanceof ui.text.EmbroideryTextElement) {
                g = c.find("#DsElement" + f.id), g[0].setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", f.dataUrl);
            }
        }
        "undefined" != typeof e.side.distressObj && (d = c.find("#distressImage" + e.side.sideId)) && d.length && d[0].setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", e.side.distressObj.name);
        return c[0].xml || (new XMLSerializer).serializeToString(c[0]).replace('xmlns=""', "").replace('type="css/text"', "");
    };
    this.updateTextFont = function(b, e, c, callback) {
        b = this.getElementById(b);
        if (!b) {
            return !1;
        }
        b = b.object;
        b.fontId = e.font_id;
        b.fontObject = e;

        service.loadFont(e, function(){
            b.fontFamily = e.fontFamily;
            b.fontId = e.font_id;
            b.fontStyleId = c;
            callback && callback();
        }, b.text);
        this.addSnapshotEvent("changeProperty", []);
    };
    this.updateTextWrapMode = function(b, e) {
        var c = L.getElementById(b).object;
        c.sleep = !0;
        0 != e && (c.arching = 0);
        c.wrap = parseInt(e);
        c.wrapAmmount = 0;
        c.forceUpdate();
    };
    this.updateTextWrapAmount = function(b, e) {
        e = 0 > e ? Math.max(-15, e) : Math.min(15, e);
        L.getElementById(b).object.wrapAmmount = parseInt(e);
    };
    this.updateShadowColor = function(b, e) {
        var c = L.getElementById(b);
        c && c.object && (c.shadow_color = e, c.object.setShadow(c.shadow_value, c.shadow_color, null), this.chanPropertyEvent());
        L.updateInkColors();
    };
    this.updateInkColors = function() {};
    this.updateTextColor = function(b, e) {
        L.getElementById(b).object.color = e;
        L.chanPropertyEvent();
        L.updateInkColors();
    };
    this.updateTextStrokeColor = function(b, e) {
        L.getElementById(b).object.strokeColor = e;
        L.chanPropertyEvent();
        L.updateInkColors();
    };
    this.updateTextStrokeWidth = function(b, e) {};
    this.updateTextArching = function(b, e, c) {
        b = L.getElementById(b).object;
        "arcdown" == c && (e = -Math.abs(e));
        b.arching = e;
        L.chanPropertyEvent();
    };
    this.updateTextValue = function(b, e) {};
    this.increaseTextSpacing = function(b) {
        L.getElementById(b).object.letterSpacing += 0.02;
        L.chanPropertyEvent();
    };
    this.decreaseTextSpacing = function(b) {
        L.getElementById(b).object.letterSpacing -= 0.02;
        L.chanPropertyEvent();
    };
    this.setTextSpacing = function(b, e) {
        L.getElementById(b).object.letterSpacing = e / 50;
        L.chanPropertyEvent();
    };
    this.increaseTextHeight = function(b) {
        L.getElementById(b).object.lineHeight += 1;
        L.chanPropertyEvent();
    };
    this.decreaseTextHeight = function(b) {
        L.getElementById(b).object.lineHeight -= 1;
        L.chanPropertyEvent();
    };
    this.setTextHeight = function(b, e) {
        L.getElementById(b).object.lineHeight = e;
        L.chanPropertyEvent();
    };
    this.centerElement = function(b, e) {
        var c = this.getElementById(b);
        if (!c) {
            return !1;
        }
        var d = this.activeSide.activeRegion.region;
        "h" == e && (c.object.x = 0.5 * (d[2] - c.object.width) + 0.5 * c.object.width);
        "v" == e && (c.object.y = 0.5 * (d[3] - c.object.height) + 0.5 * c.object.height);
        this.activeSide.boundingBox.selectElement(this.activeSide.boundingBox.getSelections());
    };
    this.changeElementFlip = function(b, e) {
        var c = ezd.getElementById(b);
        if (!c) {
            return !1;
        }
        this.updateElementFlip(b, e, !("v" == e ? c.object.flipV : c.object.flipH));
    };
    this.updateElementFlip = function(b, e, c) {
        b = ezd.getElementById(b);
        if (!b) {
            return !1;
        }
        "v" == e ? b.object.flipV = c : b.object.flipH = c;
    };
    this.nudgeElement = function(b, e, c, d) {
        var f = "left" == e ? -1 * c : "right" == e ? c : 0;
        e = "up" == e ? -1 * c : "down" == e ? c : 0;
        if (b) {
            L.getElementById(b).object.x += f, L.getElementById(b).object.y += e;
        } else {
            if (d) {
                if (1 < d.length) {
                    for (c = 0; c < d.length; c++) {
                        d[c].x += f, d[c].y += e;
                    }
                } else {
                    d.x += f, d.y += e;
                }
            }
        }
        d ? z.boundingBox.selectElement(d) : z.boundingBox.selectElement(L.getElementById(b).object);
        z.boundingBox.checkBoundaries();
        L.chanPropertyEvent();
    };
    this.nudgeDesign = function(b, e) {
        for (var c = "left" == b ? -1 * e : "right" == b ? e : 0, d = "up" == b ? -1 * e : "down" == b ? e : 0, f = 0; f < z.elements.length; f++) {
            var g = z.elements[f];
            g.x += c;
            g.y += d;
        }
        z.boundingBox.mouseEnabled = !0;
        z.boundingBox.selectAll();
        z.boundingBox.checkBoundaries();
        z.boundingBox.hideRegion();
        z.boundingBox.mouseEnabled = !1;
        z.boundingBox.selectElement(z.boundingBox.getSelections());
    };
    this.updateArtColor = function(b, e, c) {
        for (var d = 0; d < z.elements.length; d++) {
            var f = z.elements[d];
            if (f.id && f.id == b) {
                f.id == b && ("undefined" != typeof f.setColor ? f.setColor(e, c) : f.colors = {
                    index: e,
                    color: c
                });
                L.updateInkColors();
                L.addSnapshotEvent("changeProperty", []);
                break;
            }
        }
    };
    this.changeLayer = function(b, e) {
        for (var c = z.elements, d = 0; d < c.length; d++) {
            if (c[d].id == b) {
                return c = z.boundingBox.getChildrenById(b), "up" == e ? z.boundingBox.setChildIndex(c, z.boundingBox.getChildIndex(c) + 1) : z.boundingBox.setChildIndex(c, z.boundingBox.getChildIndex(c) - 1);
            }
        }
    };
    this.getSideByName = function(b) {
        return O(b);
    };
    this.copySelection = function(b, e) {
        var d = e ? e : z.boundingBox.getSelections();
        if (d) {
            if (d.length || (d = [d]), !1 === b) {
                if (aa.length) {
                    oa.enable = !1;
                    for (var d = searchInArray(J.sides, aa[0].side.sideId, "sideId"), f = 0; f < aa.length; f++) {
                        var g = aa[f];
                        if (g.side != z) {
                            g.element.id = K++;
                            var h = z.activeRegion.region[2] / d.activeRegion.region[2];
                            g.element.x *= h;
                            g.element.y *= h;
                            g.element.width *= h;
                            g.element.height *= h;
                        }
                        g.side = z;
                        g.element.location = z.name;
                    }
                    d.elements.length == aa.length && "undefined" == typeof z.distressObj && "undefined" != typeof d.distressObj && c(z.name, d.distressObj.distress_id);
                    ja();
                }
            } else {
                f = b ? !1 : !0;
                qa = eventManager.on("elementRendered", da);
                aa = [];
                for (g = na = 0; g < d.length; g++) {
                    var h = d[g],
                        k = clone(h.data),
                        p = X.width / (2 * z.defaultRegion.region[2]);
                    k.width = h.width * p;
                    k.height = h.height * p;
                    k.x = h.x * p - 0.5 * k.width;
                    k.y = 10 + h.y * p - 0.5 * k.height;
                    k.rotate = h.rotation;
                    k.value = h.text;
                    k.fliph = h.flipH;
                    k.flipv = h.flipV;
                    k.id = K++;
                    h.constructor === ui.text.TextElement ? (k.isNew = !0, k.fontFamily = h.fontFamily, k.fontId = h.fontId, k.fontStyleId = h.fontStyleId, k.shape = 0 > h.arching ? "arcdown" : "arcup", k.sweep = Math.abs(h.arching), k.strokeScale = h.strokeScale, k.alignment = h.alignment, k.line_height = h.lineHeight, k.kerning = 50 * h.letterSpacing, k.wrap_mode = h.wrap, k.wrap_amount = h.wrapAmmount) : h.constructor === ui.svg.SvgElement ? k.colors = h.colors : h.constructor === ui.bitmap.BitmapElement &&
                        (k.image.url = h.url, k.colors = h.colors);
                    aa.push({
                        side: z,
                        element: k
                    });
                }
                f && ja();
            }
        }
    };
    this.keepOriginalZoom = function() {
        ma = 1 == ma ? 0 : 1;
        L.doZoom();
    };
    this.doZoom = function() {
        var Loadimage = S.container.find('image');
        if (z.elements.length) {
            if (1 == ma) {
                z.boundingBox.visibleRegion = !1;
                "undefined" != typeof changeZoomIcon && changeZoomIcon("less");
                var b = z.boundingBox.getDesignRectangle(!1, 0, !0),
                    e = z.workArea,
                    c, d, f = 0;
                b.w > b.h ? (c = 500 / b.w, z.boundingBox.zoomScale = b.w / 500, d = 98 / c) : (c = 460 / b.h, d = f = 61 / c, z.boundingBox.zoomScale = b.h / 460);
                var g = 0.5 * (500 - b.w * c) / c,
                    h = 46 / c;
                e.setViewBox(b.x - g - 0.5 * d, b.y - h, b.w + d, b.h + f);
                z.boundingBox.zoomScale = b.w > b.h ? (b.w + d) / sa / (S.width / sa) : (b.h + f) / 460 / (S.width / sa);
                z.boundingBox.xOffset = b.x - g - 0.5 * d;
                z.boundingBox.yOffset = b.y - h;
                ma = c;

                $("#raphael").css("background-color", "#" + J.information.html_color);
            } else {
                ezdVars.ArtToolsMode || ($("#raphael").css("background-color", "")), z.boundingBox.zoomScale = 1, "undefined" !== typeof changeZoomIcon && changeZoomIcon("more"), ma = 1, P(z, z.activeRegion);
            }
            z.boundingBox.hideRegion();
            eventManager.trigger("zoomChanged", {
                isZoomedIn: 1 < ma
            });
        } else {
            ma = 1, P(z, z.activeRegion), $("#raphael").css("background-color", ""), eventManager.trigger("zoomChanged", {
                isZoomedIn: !1
            });
        }
    };
    this.getElementPreview = function(b, e, c) {
        b = L.getElementById(b);
        if (!b) {
            return "<div></div>";
        }
        var d = "",
            d = $(document.createElement("svg")),
            f;
        if ("vector" == b.type) {
            f = b.object.getNode().g.cloneNode(!0), d.append(f);
        } else {
            if (f = b.object.getNode().clone(), "undefined" === typeof f.length) {
                var g = f[0];
                g.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", $(g).attr("href"));
                d.append(g);
            } else {
                for (g = 0; g < f.length; g++) {
                    d.append(f[g][0]);
                }
            }
        }
        var h = b.object.width / b.object.height;
        b.object.height > b.object.width ? (g = e / b.object.width * h, h = c / b.object.height) : (h = b.object.height / b.object.width, g = e / b.object.width, h *= c / b.object.height);
        var k = Math.min(e / b.object.width, c / b.object.height),
            p = -b.object.x + b.object.width / 2,
            m = -b.object.y + b.object.height / 2;
        e = 0.5 * (e - b.object.width * k) / k;
        m += 0.5 * (c - b.object.height * k) / k;
        d = '<g transform="scale(' + g + "," + h + ") translate(" + (p + e) + "," + m + ') ">' + d[0].innerHTML.replace("NS1:href", "xlink:href") + "</g>";
        d = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + d + "</svg>";
        "undefined" != typeof f.remove ? f.remove() : "undefined" != typeof f.parentNode && f.parentNode.removeChild(f);
        return d;
    };
    this.changeDistress = function(b) {
        V(z, b);
    };
    this.selectAll = function() {
        z.boundingBox.selectAll();
    };
    this.moveDesignToRegion = function(b) {
        z.boundingBox.selectAll();
        var e = state.designer.activeSide.boundingBox.getSelections();
        if (e && e.length) {
            z.boundingBox.copyElement();
            this.deleteElements(e);
            this.selectRegion(b);
            this.activeSide.boundingBox.pasteElement();
            var c = eventManager.on("rendered", function() {
                ezd.scale = !0;
                c();
            });
        }
    };
}
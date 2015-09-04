function Parser() {
    function b() {
        s == u && (r.push(n), eventManager.trigger("designLoaded", n));
    }

    function d(d) {
        n = {
            elements: [],
            canvases: [],
            information: {},
            product: {}
        };
        s = u = 0;
        t.toLoad = [];
        t.loaded = 0;
        t.index = 0;
        e.toLoad = [];
        e.loaded = 0;
        e.index = 0;
        p.toLoad = [];
        p.loaded = 0;
        p.index = 0;
        $(d).find("canvases").each(function() {
            var b = {};
            $.each(this.attributes, function(c, e) {
                var d = e.name,
                    f = e.value;
                n.information[d] || (n.information[d] = f);
                b[d] = f;
            });
            n.canvases.push(b);
        });
        $(d).find("designs").each(function() {
            $.each(this.attributes, function(b, c) {
                n.information[c.name] = c.value;
            });
        });
        $(d).find("product_styles").each(function() {
            $.each(this.attributes, function(b, c) {
                n.product[c.name] = c.value;
            });
        });
        $(d).find("canvas_text").each(function() {
            var b = {
                type: "text"
            };
            $.each(this.attributes, function(c, e) {
                b[e.name] = e.value;
            });
            var c = {};
            c.font_id = b.font_id;
            $(this).find("fonts").each(function() {
                $.each(this.attributes, function(b, e) {
                    c[e.name] = e.value;
                });
                $(this).find("font_styles").each(function() {
                    $.each(this.attributes, function(b, e) {
                        c[e.name] = e.value;
                    });
                });
                $(this).find("canvas_text_embroidery").each(function() {
                    $.each(this.attributes, function(c, e) {
                        b[e.name] = e.value;
                        b.type = "embroideryText";
                    });
                });
            });
            if (state.fontReplacements) {
                var e = findMatch(state.fontReplacements, function(b) {
                    return b.old_font_id == c.font_id;
                });
                e && (c.font = e.new_font_name, c.font_style = e.new_font_style_name, c.font_id = b.font_id = e.new_font_id, c.font_style_id = b.font_style_id = e.new_font_style_id, c.jspath = e.jspath, c.fontttfpath = c.jspath.replace(".ttf.js", ".ttf"), c.altfontttfpath = c.jspath.replace(".ttf.js", ".ttf"));
            }
            "embroideryText" != b.type,
                c.font_family = c.fontFamily = e,
                c.gifpath = service.adjustUrl(c.gifpath);

            b.fontObject = c;
            b.fontObject.font_id = b.font_id;
            b.x *= 0.5;
            b.y *= 0.5;
            b.width *= 0.5;
            b.height *= 0.5;
            b.fill_color = getColorString(b.fill_color);
            b.stroke_color = getColorString(b.stroke_color);
            b.stroke_width = b.stroke_width;
            0 != parseFloat(b.stroke_width) ? (b.stroke_width = parseFloat(b.stroke_width) / 2, b.original_stroke = b.stroke_width) : b.stroke_width = 0;
            b.fontObject.font_id = b.font_id;
            n.elements.push(b);
            searchInArray(t.elements, b.fontObject.font_id, "font_id") || "embroideryText" == b.type || (u++, t.elements.push(b.fontObject), t.toLoad.push(b.fontObject));
        });
        $(d).find("canvas_art").each(function() {
            var b = {}, c = [];
            $.each(this.attributes, function(e, d) {
                var f = d.name;
                b[f] = d.value;
                "color" == f.substring(0, 5) && 8 > f.length && (b[f] = getColorString(b[f], !0), c.push({
                    name: f,
                    value: b[f]
                }));
            });
            c.sort(function(b, c) {
                return parseInt(b.name.replace("color", "")) - parseInt(c.name.replace("color", ""));
            });
            for (var d = 0; d < c.length; d++) {}
            $(this).find("art").each(function() {
                $.each(this.attributes, function(c, e) {
                    b[e.name] = e.value;
                });
            });
            b.x *= 0.5;
            b.y *= 0.5;
            b.width *= 0.5;
            b.height *= 0.5;
            b.type = "vector" == b.art_type ? "vector" : "emb" == b.art_type ? "embroideryArt" : "image";
            "vector" == b.type ? (b.colors = c, b.stroke_color && b.stroke_width && (b.stroke_color = getColorString(b.stroke_color), b.stroke_width = b.stroke_width, 0 != parseFloat(b.stroke_width) ? (b.stroke_width = parseFloat(b.stroke_width) / 2, b.original_stroke = b.stroke_width) : b.stroke_width = 0), u++, e.elements.push(b), e.toLoad.push(b)) : "image" == b.type ? (b.colors = c, u++, p.elements.push(b), p.toLoad.push(b)) : "embroideryArt" == b.type && (b.colors = c);
            n.elements.push(b);
        });
        n.designId = n.information.design_id;
        t.toLoad.length && k();
        e.toLoad.length && g();
        p.toLoad.length && c();
        0 === u && b();
    }

    function c() {
        var c = 0,
            e = function() {
                var d = p.toLoad[c],
                    f = new Image,
                    g = d.original_art_path ? d.original_art_path : d.art_path;
                f.onload = function(f) {
                    d.image = this;
                    c++;
                    s++;
                    b();
                    c < p.toLoad.length && e();
                };
                f.src = fixImageUrl(g);
            };
        e();
    }

    function g() {
        var c = 0,
            d = function() {
                var f = e.toLoad[c];
                $.ajax({
                    type: "GET",
                    url: fixImageUrl(f.original_art_path),
                    dataType: "xml",
                    success: function(g) {
                        f.svg = g;
                        s++;
                        b();
                        c++;
                        c < e.toLoad.length && d();
                    },
                    error: this.defaultError
                });
            };
        d();
    }

    function k() {
        var c = 0,
            e = function() {
                var dd = t.toLoad[c];
                null == t.categories[dd.font_style_id] && (t.categories[dd.font_style_id] = []);
                var f = t.categories[dd.font_style_id];
                findMatch(f, function(b) {
                    return b.font_id == dd.font_id;
                }) || f.push(d);
                if (!dd.font_id) {
                    dd.font_id = 1
                }
                var text = '';
                for (var i = 0; i < n.elements.length; i++) {
                    if (n.elements[i].type != 'text') break;
                    text = text + n.elements[i].value;
                };

                service.loadFont(dd, function() {
                    c++;
                    s++;
                    b();
                    c < t.toLoad.length && e();
                }, text);

                console.info('载入字体');
            };
        e();
    }

    function h(b) {
        var c = {
            regions: [],
            sides: []
        }, e = {};
        $(b).find("products").each(function() {
            e = {};
            $.each(this.attributes, function(b, c) {
                e[c.name] = c.value;
            });
        });
        c.description = e;
        var d = $(b).find("product_styles");
        d.each(function() {
            c.information = {};
            $.each(this.attributes, function(b, e) {
                c.information[e.name] = e.value;
            });
        });
        for (var f = 0; f < d.length; f++) {
            var g = d[f];
            g.attributes.product_style_id.value === state.selectedProductStyleID && (c.information.html_color = g.attributes.html_color.value);
        }
        $(b).find("print_mask").each(function() {
            this.attributes.length && (c.mask = {}, $.each(this.attributes, function(b, e) {
                c.mask[e.name] = e.value;
            }), c.mask.art_path = fixImageUrl(c.mask.art_path));
        });
        d.find("product_regions").each(function() {
            if (this.parentNode.getAttribute("product_style_id") == w) {
                var b = {};
                $.each(this.attributes, function(c, e) {
                    b[e.name] = e.value;
                });
                b.originalRegion = b.region.split(",");
                b.region = b.region.split(",");
                for (var e = 0; e < b.region.length; e++) {
                    b.region[e] = q / 500 * b.region[e] * 0.5;
                }
                e = this.getElementsByTagName("print_mask");
                e = null != e[0].getAttribute("art_path") ? {
                    type: "image",
                    value: fixImageUrl(e[0].getAttribute("art_path"))
                } : {
                    type: "shape",
                    value: b.region
                };
                b.mask = e;
                isSideDefined(b.side, c.sides) || (e = {
                    zoom: 1,
                    resize: 1
                }, e.name = b.side, e.sideId = c.sides.length + 1, e.defaultRegion = {}, c.sides.push(e));
                c.regions.push(b);
            }
        });
        b = [];
        for (f = 0; f < c.regions.length; f++) {
            "undefined" == typeof c.information["image_width_" + c.regions[f].side] && b.push({
                region: c.regions[f].name,
                side: c.regions[f].side,
                image: c.regions[f].imgurl,
                index: f
            });
        }
        eventManager.trigger("productLoaded", c);
    }
    var f = ezdVars.ApiDomain || "open.dev.jzw.la",
        m = ezdVars.AppToken || 306,
        q = 500,
        n, r = [],
        t = {
            categories: {},
            elements: []
        }, p = {
            elements: []
        }, e = {
            elements: []
        }, u = 0,
        s = 0,
        w;
    eventManager.on("needProduct", function(b) {
        w = b.productStyleId;
        b.data ? setTimeout(function() {
            h(b.data);
        }, 50) : b.productId ? $.ajax({
            type: "GET",
            url: "//" + f + "/api?model=design/tool/beta&action=product_get&appKey=" + m + "&productId=" + b.productId + "&productStyleId=" + b.productStyleId,
            dataType: "xml",
            success: h
        }) : setTimeout(function() {
            h(service.createProductXml());
        }, 50);
    });
    eventManager.on("needSvg", function(b) {
        $.ajax({
            type: "GET",
            url: fixImageUrl(b.original_art_path),
            dataType: "xml",
            success: function(c) {
                b.svg = c;
                eventManager.trigger("elementLoaded", b);
            },
            error: this.defaultError
        });
    });
    eventManager.on("needDesign", function(b) {
        // debugger;
        $.ajax({
            type: "GET",
            url: "//" + f + "/api?model=design/tool/beta&action=design_get&appKey=" + m + "&designId=" + b + '&userToken=' + ezdVars.UserToken,
            dataType: "xml",
            success: d
        });
    });
}
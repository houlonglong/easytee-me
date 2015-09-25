Namespace("ui.element");
ui.element.BaseElement = function(b, d, c, g, k, h, f, m, q, n, r, t) {
    var p = this,
        e = d,
        u = c,
        s, w, v = g,
        x = f,
        B = k,
        y = h,
        D = m,
        V = q,
        ca = n,
        M = t,
        A, G, H, Q = !1,
        da = !1;
    this.scaleY = this.scaleX = 1;
    this.reportChange = function() {
        console.log("SVG－设计内容发生变化 ", ca, da);
        da && !ca && (da = !1, setTimeout(function() {
            console.debug("***更行了对象***");
            state.isChangedDesign = true;
            eventManager.trigger("elementEdited", b);
            eventManager.trigger('updatePricePreview');
            da = !0;
        }, 100));
    };
    this.reportInitiated = function() {
        Q || (setTimeout(function() {
            console.debug("***初始化了对象***");
            state.isInitialDesign = true;
            eventManager.trigger("elementRendered", b);
            eventManager.trigger('updatePricePreview');
            eventManager.trigger('updateStep2View');
            da = !0;
        }, 10), Q = !0);
    };
    this.setSize = function(b, c) {
        B = b;
        y = c;
    };
    this.setPosition = function(b, c) {
        e = b;
        u = c;
    };
    this.baseSetPositionAndSize = function(b, c, d, f, h, g, k, p, m, n, q) {
        "move" == q ? (d = b - s, f = c - w, s = e, w = u, p.transform("t" + d + "," + f + "..."), n && n.transform("t" + d + "," + f + "...")) : (g && (d = -Math.abs(d)), k && (f = -Math.abs(f)), p.transform("R0"), n && n.transform("R0"), g = d / m.width, k = f / m.height, d = b - m.x * g - d / 2, f = c - m.y * k - f / 2, s = e, w = u, p.transform("r" + h + "," + b + "," + c + "t" + d + "," + f + "...s" + g + "," + k + ",0,0"), n && n.transform("r" + h + "," + b + "," + c + "t" + d + "," + f + "...s" +
            g + "," + k + ",0,0"));
    };
    this.updateDataUrl = function() {
        getImageData(b.url, !0, function(b) {
            H = b.dataUrl;
        });
    };
    Object.defineProperty(b, "dataUrl", {
        get: function() {
            return H;
        },
        set: function(b) {
            H = b;
        }
    });
    Object.defineProperty(b, "x", {
        set: function(c) {
            e = c;
            b.basicPropertyUpdated("move");
            p.reportChange();
        },
        get: function() {
            return e;
        }
    });
    Object.defineProperty(b, "y", {
        set: function(c) {
            u = c;
            b.basicPropertyUpdated("move");
            p.reportChange();
        },
        get: function() {
            return u;
        }
    });
    Object.defineProperty(b, "z", {
        set: function(b) {
            v = b;
            p.reportChange();
        },
        get: function() {
            return v;
        }
    });
    Object.defineProperty(b, "width", {
        set: function(c) {
            B = c;
            b.basicPropertyUpdated();
            p.reportChange();
        },
        get: function() {
            return B;
        }
    });
    Object.defineProperty(b, "height", {
        set: function(c) {
            y = c;
            b.basicPropertyUpdated();
            p.reportChange();
        },
        get: function() {
            return y;
        }
    });
    Object.defineProperty(b, "rotation", {
        set: function(c) {
            x = c;
            b.basicPropertyUpdated();
            p.reportChange();
        },
        get: function() {
            return x;
        }
    });
    Object.defineProperty(b, "flipH", {
        set: function(c) {
            D = c;
            b.basicPropertyUpdated();
            p.reportChange();
        },
        get: function() {
            return D;
        }
    });
    Object.defineProperty(b, "flipV", {
        set: function(c) {
            V = c;
            b.basicPropertyUpdated();
            p.reportChange();
        },
        get: function() {
            return V;
        }
    });
    Object.defineProperty(b, "sleep", {
        set: function(b) {
            ca = b;
        },
        get: function() {
            return ca;
        }
    });
    Object.defineProperty(b, "data", {
        set: function(b) {},
        get: function() {
            r.height = y;
            r.width = B;
            r.x = e;
            r.y = u;
            r.rotation = x;
            r.rotate = x;
            r.fliph = D;
            r.flipV = V;
            r.z = v;
            r.id = G;
            r.table_name = A;
            r.type = M;
            b.constructor === ui.text.TextElement && (r.shape = 0 > b.arching ? "arcdown" : "arcup", r.sweep = String(Math.abs(parseInt(b.arching, 10))), 0 != Math.abs(parseInt(b.arching, 10)) && (r.wrap_mode = b.wrap, r.wrap_amount = b.wrapAmmount), r.fontObject = b.fontObject, r.fill_color = b.color, r.stroke_color = b.strokeColor, r.stroke_width = b.stroke, r.letterSpacing = 50 * b.letterSpacing, r.kerning = 50 * b.letterSpacing, r.alignment = b.alignment, r.line_height = b.lineHeight, r.lines = b.lines,
                r.isNew = b.isNew);
            b.constructor === ui.svg.SvgElement && (r.colors = clone(b.colors));
            if (b.constructor === ui.bitmap.BitmapElement) {
                b.colors && (r.colors = clone(b.colors));
                var c = b.url;
                r.art_path = c;
                r.original_art_path = c;
                r.image = {
                    src: c,
                    url: c
                };
            }
            b.constructor === ui.text.EmbroideryTextElement && (r.slant = b.slant, r.sequence = b.sequence, r.shape = b.shape, r.circle_radius = b.circle_radius, r.bottom_curve_type = b.bottom_curve_type, r.top_curve_type = b.top_curve_type, r.bottom_curve = b.bottom_curve, r.top_curve = b.top_curve, r.word_spacing = b.word_spacing, r.line_spacing = b.line_spacing, r.letter_spacing = b.letter_spacing, r.alignment = b.alignment, r.font = b.font, r.fontSize = b.fontSize, r.color1 = b.color1, r.value = b.value,
                r.fontObject = {
                    font: b.font
                }, r.art_id = r.canvas_text_id);
            b.constructor === ui.bitmap.EmbroideryArtElement && (r.colors = clone(b.colors));
            return r;
        }
    });
    Object.defineProperty(b, "type", {
        get: function() {
            return M;
        },
        set: function(b) {
            M = b;
        }
    });
    Object.defineProperty(b, "id", {
        get: function() {
            return G;
        },
        set: function(b) {
            G = b;
        }
    });
    Object.defineProperty(b, "tableName", {
        get: function() {
            var b = "";
            "text" == M && (b = "canvas_text");
            if ("vector" == M || "image" == M) {
                b = "canvas_art";
            }
            return b;
        },
        set: function(b) {
            A = b;
        }
    });
    Object.defineProperty(b, "canReportEdition", {
        get: function() {
            return da;
        },
        set: function(b) {
            da = b;
        }
    });
};
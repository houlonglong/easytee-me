Namespace("ui.text");
ui.text.TextMetrics = function(b, d, c, g, k) {
    var h = [];
    this.init = function() {
        for (var f = 0; f < d.length; f++) {
            var m = b.print(0, 0, d.slice(0, f + 1), c, g, "middle", k),
                q = m.getBBox(!0);
            m.remove();
            var m = b.print(0, 0, d.slice(f, f + 1), c, g, "middle", k),
                n = m.getBBox(!0);
            m.remove();
            q.x = q.x + q.width - n.width;
            q.width = n.width;
            q.y = n.y;
            q.height = n.height;
            h.push(q);
        }
        m = h[0].x;
        for (f = 0; f < h.length; f++) {
            h[f].x -= m;
        }
    };
    this.getMetrics = function() {
        return h;
    };
    this.init();
};

ui.text.EmbroideryTextElement = function(b, d, c, g, k, h, f, m, q, n, r) {};

ui.text.TextElement = function(b, d, c, g, k, h, f, m, q, n, r, t, p, e, u, s, w, v, x, B) {

    function y(b) {
        for (var c = "", e = 0; e < b.length; e++) {
            127 != b.charCodeAt(e) && (c += b.charAt(e));
        }
        return c;
    }

    function D(b) {
        if (Z && !A.sleep) {
            A.prototype.baseSetPositionAndSize(A.x, A.y, A.width, A.height, A.rotation, A.flipH, A.flipV, Z, T, L, b);
            b = A.width / T.width;
            var c = A.height / T.height,
                e = A.width / (T.width - 2 * W),
                d = A.height / (T.height - 2 * W);
            E ? (E.sx = b, E.sy = c, G.length >= H.length ? (E.w = A.width, E.h = A.height) : (E.ox = b, E.oy = c)) : E = {
                sx: b,
                sy: c,
                w: A.width,
                h: A.height,
                x: A.x,
                y: k,
                yo: 0
            };
            F = b;
            I = c;
            na = e / d;
            L.attr({
                fill: "none",
                stroke: fa,
                "stroke-width": V(),
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
            });
            0 == W && (L.attr({
                fill: "none",
                stroke: "none",
                "stroke-width": 2 * W
            }), Z.attr({
                fill: da,
                "stroke-width": 0,
                stroke: "none"
            }));
            A.prototype.reportInitiated();
        }
    }

    function V() {
        // debugger;
        return 0 == W ? 0 : W / ja * Math.max(Math.abs(F), Math.abs(I)) * 1.4;
    }

    function ca() {
        E = J = null;
        H = G;
        clearInterval(ka);
    }

    function M() {
        clearInterval(ka);
        Z.remove();
        L.remove();
        A.init();
        ezd.activeSide.boundingBox.getSelections() == A && ezd.activeSide.boundingBox.selectElement(A);
        D();
    }

    var A = this,
        G = y(c),
        H = y(c),
        Q = x.font_family ? x.font_family : x.font;
    parseInt(x.font_id, 10);
    parseInt(x.font_style_id, 10);
    var da = n,
        W = r,
        fa = t,
        ja = 1,
        F = 1,
        I = 1,
        P = p,
        O = e,
        N = q / 50,
        U = u,
        Z, L, K = "arcup",
        T, J, E, S, ea = !1,
        oa = f / B,
        z = {}, ka, R = 0,
        X = B,
        la = 1,
        ma = 0,
        aa = 1 < c.split("\n").length ? !0 : !1,
        na = 1,
        va = x,
        wa = !1,
        xa = !1,
        K = 0 > U ? "arcdown" : "arcup";
    this.props = "letterSpacing wrapAmmount arching wrap stroke fontFamily rotation fontSize color strokeColor flipH flipV x y width height".split(" ");
    this.historyProps = "data id type text wrapAmmount arching wrap stroke fontFamily rotation fontSize color strokeColor flipH flipV x y width height z".split(" ");
    this.getNode = function() {
        return S;
    };
    this.forceUpdate = function(b) {
        // debugger;
        A.sleep = !1;
        D(b);
    };
    this.remove = function() {
        L.remove();
        Z.remove();
    };
    this.setShadow = function(b, c, e) {
        "undefined" !== typeof this.shadow && this.shadow.remove();
        this.shadow = this.element.glow({
            color: c,
            offsety: b,
            offsetx: b,
            fill: e
        });
    };
    this.removeShadow = function() {
        "undefined" !== typeof this.shadow && this.shadow.remove();
    };
    this.init = function() {
        var b = true;
        var c = d.print(A.x, A.y, H || "Test", Q, 20, "middle", N).attr({
            fill: da,
            stroke: fa,
            "stroke-width": W,
            "stroke-linecap": "square",
            "text-anchor": "end"
        });
        e = c.getBBox(false);
        c.remove();
        if (0 == e.width || 0 == e.height) {
            b = false;
        }
        b || (Q = "Microsoft YaHei");
        b = !1;
        "" == G && (b = true, G = H);
        (aa = 1 < G.split("\n").length ? !0 : !1) || (X = 1);
        !aa && 1 < la && (c = d.print(0, 0, "W", Q, 20, "middle", N).attr({
            fill: da,
            stroke: fa,
            "stroke-width": W,
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
        }), c.getBBox(true), c.remove(), A.height = oa * X * A.prototype.scaleY);
        A.sleep = !0;
        S = d.set();
        c = d.print(A.x, A.y, G, Q, 20, "middle", N).attr({
            fill: da,
            stroke: fa,
            "stroke-width": W,
            "stroke-linecap": "square",
            "text-anchor": "end"
        });
        c.scale(1, 1);
        T = c.getBBox(!1);
        J || (J = T);
        e = Raphael.transformPath(c.attr("path"), "S1,1");
        var a = state;
//        ea ? 0 == U && 0 == O && 0 == P && (aa || xa ? (xa = !1, A.width > A.height ? aa || A.prototype.setSize(A.width, A.width / (T.width / T.height)) : aa || A.prototype.setSize(A.height / (T.height / T.width) * na, A.height)) : A.prototype.setSize(A.height / (T.height / T.width) * na, A.height)) : (console.log("文字 初始化"), 0 == P && 0 == P && 0 == U && !1 === aa && (G.length > H.length && 0 === u && !1 === xa ? A.prototype.setSize(A.width, oa * A.prototype.scaleY) : G.length < H.length ? A.prototype.setSize(A.height / (T.height / T.width) * na, A.height) : G.length == H.length && wa && A.prototype.setSize(h * A.prototype.scaleX, oa * A.prototype.scaleY)));
        var f;
        if (0 != O && 0 != P && 0 == U && !1 == aa) {
            f = Math.getPathOffSet(e), e = Math.getWrappedPath(e, T, f, 1E5, P, O);
        } else {
            if (0 != U && !1 == aa) {
                var g = U,
                    k = T,
                    e = 1,
                    p = !1;
                0 > g && (p = !0, e = -1);
                g = Math.abs(g);
                f = "";
                var m = G,
                    s = G;
                G.length < H.length && !1 == ea && (k = J, s = H);
                var s = d.print(0, 0, s, Q, 20, "middle", N),
                    n = s.getBBox(!0),
                    q = d.print(0, 0, m, Q, 20, "middle", N),
                    r = q.getBBox(!0),
                    k = Math.getRadious(k.width, k.height, g),
                    g = d.path(Math.arc([n.width / 2, n.y2 + k], k, -90 - g / 2, g - 90 - g / 2)).attr({
                        stroke: "#0000ff"
                    }),
                    v = g.getTotalLength();
                z[m + Q + "SP" + N] ? k = z[m + Q + "SP" + N] : (k = (new ui.text.TextMetrics(d, m, Q, 20, N)).getMetrics(), z[m + Q + "SP" + N] = k);
                s.remove();
                q.remove();
                s = Math.abs(n.width - r.width) / 2;
                n = v / (n.width - n.x);
                for (q = 0; q < m.length; q++) {
                    if (" " != G[q]) {
                        var x = k[q].y,
                            v = k[q].width,
                            w = k[q].height,
                            y = (s + k[q].x + v / 2) / n,
                            r = d.print(0, 0, m[q], Q, 20, "middle", N).attr({
                                fill: da,
                                stroke: fa,
                                "stroke-width": W,
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round"
                            }),
                            w = d.rect(0, 0, v, w),
                            B = g.getPointAtLength(y).x,
                            t = g.getPointAtLength(y).y * e;
                        w.transform("T" + (B - v / 2) + "," + (x + t) + "");
                        B = w.getBBox(!1);
                        t = r.getBBox(!0);
                        x = B.x - t.x;
                        B = B.y - t.y;
                        t = g.getPointAtLength(y);
                        y = g.getPointAtLength(y + 1);
                        y = 180 * Math.atan2(y.y - t.y, y.x - t.x) / Math.PI;
                        p && (y = 360 - y);
                        r.transform("r" + y + "," + v / 2 + ",0");
                        r.transform("t" + x + "," + B + "...");
                        v = Raphael.transformPath(r.attr("path"), r.transform());
                        f += v;
                        r.remove();
                        w.remove();
                    }
                }
                g.remove();
                E && (p = d.path(f), g = p.getBBox(!0), m = g.width * E.sx, g = g.height * E.sy, E.yo = -(E.h / 2) + g / 2, k = A.height, A.prototype.setSize(m, g), G.length < H.length && !1 == ea || !0 == ea || A.prototype.setSize(E.w, g / (m / E.w)), A.prototype.setPosition(A.x, A.y + (k - A.height) / 2 * e), p.remove());
                e = f;
            } else {
                if (aa) {
                    xa = !0;
                    e = G.split("\n");
                    f = "";
                    p = d.print(0, 0, "W", Q, 20, "middle", N).attr({
                        fill: da,
                        stroke: fa,
                        "stroke-width": W,
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round"
                    });
                    k = p.getBBox(!0);
                    m = k.height;
                    p.remove();
                    la = X;
                    X = e.length;
                    for (g = 0; g < e.length; g++) {
                        p = d.print(0, g * (m + (ma + 2) / 2), e[g], Q, 20, "middle", N).attr({
                            fill: da,
                            stroke: fa,
                            "stroke-width": W,
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round"
                        }), k = p.getBBox(!0), s = 0, 0 == R ? s = 0 : 1 == R ? s = (A.width - k.width) / 2 : 2 == R && (s = A.width - k.width), p.transform("t" + s + ",0r0..."), k = Raphael.transformPath(p.attr("path"), p.transform()), f += k, p.remove(), la != X && (X > la ? ea && (A.y += m / 2) : ea && (A.y -= m / 2), la = X);
                    }
                    e = f;
                    A.prototype.setSize(A.width, oa * A.prototype.scaleY * X);
                }
            }
        }
        c.remove();
        L = d.path(e);
        L.attr({
            fill: "none",
            stroke: fa,
            "stroke-width": V(),
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
        });
        Z = d.path(e);
        Z.attr({
            fill: da,
            "stroke-width": 0
        });
        0 == W && (L.attr({
            fill: "none",
            stroke: "none",
            "stroke-width": 2 * W
        }), Z.attr({
            fill: da,
            "stroke-width": 0,
            stroke: "none"
        }));
        0 > U && (K = "arcdown");
        S.push(L);
        S.push(Z);
        T = Z.getBBox(!0);
        0 == U && (T.width += 2 * W, T.height += 2 * W, T.x -= W, T.y -= W);
        A.forceUpdate();
        eventManager.trigger("checkBoundaries");
        b && (G = "");
    };
    this.basicPropertyUpdated = function(b) {
        // debugger;
        D(b);
    };
    A.prototype = new ui.element.BaseElement(A, g, k, s, h, f, m, w, v, !0, b, "text");
    A.init();
    this.strokeForSvg = function() {
        L.attr({
            fill: "none",
            stroke: fa,
            "stroke-width": 2 * W,
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
        });
    };
    this.getFinalStrokeScaleSave = function() {
        return W;
    };
    this.getStrokeScaleX = function() {
        return W / ja * Math.max(F, F) * 2;
    };
    this.getStrokeScaleY = function() {
        return W / ja * Math.max(I, I) * 2;
    };
    Object.defineProperty(this, "text", {
        set: function(b) {
            // debugger;
            //实时更新文字
            //modify by hl
            // service.loadFont(d, function() {
            //     G = y(b);
            //     A.data.value = G;
            //     if (aa = 1 < G.split("\n").length ? !0 : !1) {
            //         O = P = U = 0;
            //     }
            //     "none" == da ? (Z.remove(), L.remove(), A.init(), ezd.activeSide.boundingBox.selectElement(A)) : (M(), clearInterval(ka), ka = setInterval(function() {}, 0));
            //     A.prototype.reportChange();
            //     wa = !0;
            // }, b);
            G = b;
        },
        get: function() {
            return G;
        }
    });
    //add by hl
    var _self = this;
    this.loadFont = function(callback, font){
        // debugger;
        console.log('实时更新文字');
        var b = _self.text;
        service.loadFont(font, function() {
            G = y(b);
            A.data.value = G;
            if (aa = 1 < G.split("\n").length ? !0 : !1) {
                O = P = U = 0;
            }
            "none" == da ? (Z.remove(), L.remove(), A.init(), ezd.activeSide.boundingBox.selectElement(A)) : (M(), clearInterval(ka), ka = setInterval(function() {}, 0));
            A.prototype.reportChange();
            wa = !0;
        }, b, null, callback);
    }
    Object.defineProperty(this, "fontObject", {
        set: function(b) {
            va = clone(b);
        },
        get: function() {
            return va;
        }
    });
    Object.defineProperty(this, "color", {
        set: function(b) {
            var c = da;
            da = b;
            Z.attr({
                fill: b,
                stroke: "none",
                "stroke-width": 0
            });
            "None" === c ? (Z.remove(), L.remove(), A.init()) : A.prototype.reportChange();
        },
        get: function() {
            return da;
        }
    });
    Object.defineProperty(this, "strokeColor", {
        set: function(b) {
            fa = b;
            L.attr({
                fill: "none",
                stroke: fa,
                "stroke-width": V(),
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
            });
            0 == W && L.attr({
                fill: "none",
                stroke: "none",
                "stroke-width": 2 * W
            });
            A.prototype.reportChange();
        },
        get: function() {
            return fa;
        }
    });
    Object.defineProperty(this, "stroke", {
        set: function(b) {
            W = b;
            b = A.width;
            var c = A.height;
            Z.remove();
            L.remove();
            A.init();
            aa && (A.width = b, A.height = c);
            A.prototype.reportChange();
        },
        get: function() {
            return W;
        }
    });
    Object.defineProperty(this, "strokeScale", {
        set: function(b) {
            ja = b;
            L.attr({
                fill: "none",
                stroke: fa,
                "stroke-width": V(),
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
            });
        },
        get: function() {
            return ja;
        }
    });
    Object.defineProperty(this, "wrap", {
        set: function(b) {
            U = 0;
            P = b;
            Z.remove();
            L.remove();
            A.init();
            A.prototype.reportChange();
        },
        get: function() {
            return P;
        }
    });
    Object.defineProperty(this, "letterSpacing", {
        set: function(b) {
            N = b;
            ca();
            M();
            ka = setInterval(function() {}, 0);
            A.prototype.reportChange();
        },
        get: function() {
            return N;
        }
    });
    Object.defineProperty(this, "wrapAmmount", {
        set: function(b) {
            O = b;
            Z.remove();
            L.remove();
            A.init();
            A.prototype.reportChange();
        },
        get: function() {
            return O;
        }
    });
    Object.defineProperty(this, "arching", {
        set: function(b) {
            U = b;
            clearInterval(ka);
            M();
            ka = setInterval(function() {}, 0);
            A.prototype.reportChange();
        },
        get: function() {
            return U;
        }
    });
    Object.defineProperty(this, "fontFamily", {
        set: function(b) {
            Q = b;
            va.font_family = b;
            ca();
            Z.remove();
            L.remove();
            A.init();
            A.prototype.reportChange();
        },
        get: function() {
            return Q;
        }
    });
    Object.defineProperty(this, "fontId", {
        set: function(b) {
            va.font_id = b;
        },
        get: function() {
            return va.font_id;
        }
    });
    Object.defineProperty(this, "fontStyleId", {
        set: function(b) {
            va.font_style_id = b;
        },
        get: function() {
            return va.font_style_id;
        }
    });
    Object.defineProperty(this, "element", {
        get: function() {
            return Z;
        }
    });
    Object.defineProperty(this, "shape", {
        get: function() {
            return K;
        }
    });
    Object.defineProperty(this, "isNew", {
        get: function() {
            return ea;
        },
        set: function(b) {
            ea = b;
        }
    });
    Object.defineProperty(this, "oText", {
        get: function() {
            return H;
        }
    });
    Object.defineProperty(this, "dText", {
        get: function() {
            return "";
        }
    });
    Object.defineProperty(this, "multiline", {
        get: function() {
            return aa;
        },
        set: function(b) {
            aa = b;
        }
    });
    Object.defineProperty(this, "alignment", {
        get: function() {
            return R;
        },
        set: function(b) {
            R = b;
            ca();
            b = A.width;
            var c = A.height;
            clearInterval(ka);
            Z.remove();
            L.remove();
            A.init();
            A.prototype.setSize(b, c);
            A.prototype.reportChange();
        }
    });
    Object.defineProperty(this, "lineHeight", {
        get: function() {
            return ma;
        },
        set: function(b) {
            ma = b;
            ca();
            M();
            A.prototype.reportChange();
        }
    });
    Object.defineProperty(this, "lines", {
        get: function() {
            return X;
        },
        set: function(b) {
            X = b;
        }
    });
};
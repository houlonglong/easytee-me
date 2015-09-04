(function(b) {
    var d = /[\.\/]/,
        c = function() {}, g = function(b, c) {
            return b - c;
        }, k, h, f = {
            n: {}
        }, m = function(b, c) {
            b = String(b);
            var d = h,
                f = Array.prototype.slice.call(arguments, 2),
                p = m.listeners(b),
                e = 0,
                u, s = [],
                w = {}, v = [],
                x = k;
            k = b;
            for (var B = h = 0, y = p.length; B < y; B++) {
                "zIndex" in p[B] && (s.push(p[B].zIndex), 0 > p[B].zIndex && (w[p[B].zIndex] = p[B]));
            }
            for (s.sort(g); 0 > s[e];) {
                if (u = w[s[e++]], v.push(u.apply(c, f)), h) {
                    return h = d, v;
                }
            }
            for (B = 0; B < y; B++) {
                if (u = p[B], "zIndex" in u) {
                    if (u.zIndex == s[e]) {
                        v.push(u.apply(c, f));
                        if (h) {
                            break;
                        }
                        do {
                            if (e++, (u = w[s[e]]) && v.push(u.apply(c, f)), h) {
                                break;
                            }
                        } while (u);
                    } else {
                        w[u.zIndex] = u;
                    }
                } else {
                    if (v.push(u.apply(c, f)), h) {
                        break;
                    }
                }
            }
            h = d;
            k = x;
            return v.length ? v : null;
        };
    m._events = f;
    m.listeners = function(b) {
        b = b.split(d);
        var c = f,
            g, h, k, e, m, s, w, v = [c],
            x = [];
        k = 0;
        for (e = b.length; k < e; k++) {
            w = [];
            m = 0;
            for (s = v.length; m < s; m++) {
                for (c = v[m].n, g = [c[b[k]], c["*"]], h = 2; h--;) {
                    if (c = g[h]) {
                        w.push(c), x = x.concat(c.f || []);
                    }
                }
            }
            v = w;
        }
        return x;
    };
    m.on = function(b, g) {
        b = String(b);
        if ("function" != typeof g) {
            return function() {};
        }
        for (var h = b.split(d), k = f, p = 0, e = h.length; p < e; p++) {
            k = k.n, k = k.hasOwnProperty(h[p]) && k[h[p]] || (k[h[p]] = {
                n: {}
            });
        }
        k.f = k.f || [];
        p = 0;
        for (e = k.f.length; p < e; p++) {
            if (k.f[p] == g) {
                return c;
            }
        }
        k.f.push(g);
        return function(b) {
            +b == +b && (g.zIndex = +b);
        };
    };
    m.f = function(b) {
        var c = [].slice.call(arguments, 1);
        return function() {
            m.apply(null, [b, null].concat(c).concat([].slice.call(arguments, 0)));
        };
    };
    m.stop = function() {
        h = 1;
    };
    m.nt = function(b) {
        return b ? RegExp("(?:\\.|\\/|^)" + b + "(?:\\.|\\/|$)").test(k) : k;
    };
    m.nts = function() {
        return k.split(d);
    };
    m.off = m.unbind = function(b, c) {
        if (b) {
            var g = b.split(d),
                h, k, e, u, s, w, v = [f];
            u = 0;
            for (s = g.length; u < s; u++) {
                for (w = 0; w < v.length; w += e.length - 2) {
                    e = [w, 1];
                    h = v[w].n;
                    if ("*" != g[u]) {
                        h[g[u]] && e.push(h[g[u]]);
                    } else {
                        for (k in h) {
                            h.hasOwnProperty(k) && e.push(h[k]);
                        }
                    }
                    v.splice.apply(v, e);
                }
            }
            u = 0;
            for (s = v.length; u < s; u++) {
                for (h = v[u]; h.n;) {
                    if (c) {
                        if (h.f) {
                            w = 0;
                            for (g = h.f.length; w < g; w++) {
                                if (h.f[w] == c) {
                                    h.f.splice(w, 1);
                                    break;
                                }
                            }!h.f.length && delete h.f;
                        }
                        for (k in h.n) {
                            if (h.n.hasOwnProperty(k) && h.n[k].f) {
                                e = h.n[k].f;
                                w = 0;
                                for (g = e.length; w < g; w++) {
                                    if (e[w] == c) {
                                        e.splice(w, 1);
                                        break;
                                    }
                                }!e.length && delete h.n[k].f;
                            }
                        }
                    } else {
                        for (k in delete h.f, h.n) {
                            h.n.hasOwnProperty(k) && h.n[k].f && delete h.n[k].f;
                        }
                    }
                    h = h.n;
                }
            }
        } else {
            m._events = f = {
                n: {}
            };
        }
    };
    m.once = function(b, c) {
        var d = function() {
            m.unbind(b, d);
            return c.apply(this, arguments);
        };
        return m.on(b, d);
    };
    m.version = "0.4.2";
    m.toString = function() {
        return "您正在使用易衫设计工具 ";
    };
    "undefined" != typeof module && module.exports ? module.exports = m : "undefined" != typeof define ? define("eve", [], function() {
        return m;
    }) : b.eve = m;
})(this);
(function(b, d) {
    "function" === typeof define && define.amd ? define(["eve"], function(c) {
        return d(b, c);
    }) : d(b, b.eve);
})(this, function(b, d) {
    function c(b) {
        if (c.is(b, "function")) {
            return w ? b() : d.on("raphael.DOMload", b);
        }
        if (c.is(b, T)) {
            return c._engine.create[G](c, b.splice(0, 3 + c.is(b[0], K))).add(b);
        }
        var e = Array.prototype.slice.call(arguments, 0);
        if (c.is(e[e.length - 1], "function")) {
            var f = e.pop();
            return w ? f.call(c._engine.create[G](c, e)) : d.on("raphael.DOMload", function() {
                f.call(c._engine.create[G](c, e));
            });
        }
        return c._engine.create[G](c, arguments);
    }

    function g(b) {
        if (Object(b) !== b) {
            return b;
        }
        var c = new b.constructor,
            e;
        for (e in b) {
            b[y](e) && (c[e] = g(b[e]));
        }
        return c;
    }

    function k(b, c, e) {
        function d() {
            var f = Array.prototype.slice.call(arguments, 0),
                g = f.join("\u2400"),
                h = d.cache = d.cache || {}, k = d.count = d.count || [];
            if (h[y](g)) {
                a: {
                    for (var f = k, k = g, p = 0, m = f.length; p < m; p++) {
                        if (f[p] === k) {
                            f.push(f.splice(p, 1)[0]);
                            break a;
                        }
                    }
                }
                return e ? e(h[g]) : h[g];
            }
            1E3 <= k.length && delete h[k.shift()];
            k.push(g);
            h[g] = b[G](c, f);
            return e ? e(h[g]) : h[g];
        }
        return d;
    }

    function h() {
        return this.hex;
    }

    function f(b, c) {
        for (var e = [], d = 0, f = b.length; f - 2 * !c > d; d += 2) {
            var g = [{
                x: +b[d - 2],
                y: +b[d - 1]
            }, {
                x: +b[d],
                y: +b[d + 1]
            }, {
                x: +b[d + 2],
                y: +b[d + 3]
            }, {
                x: +b[d + 4],
                y: +b[d + 5]
            }];
            c ? d ? f - 4 == d ? g[3] = {
                x: +b[0],
                y: +b[1]
            } : f - 2 == d && (g[2] = {
                x: +b[0],
                y: +b[1]
            }, g[3] = {
                x: +b[2],
                y: +b[3]
            }) : g[0] = {
                x: +b[f - 2],
                y: +b[f - 1]
            } : f - 4 == d ? g[3] = g[2] : d || (g[0] = {
                x: +b[d],
                y: +b[d + 1]
            });
            e.push(["C", (-g[0].x + 6 * g[1].x + g[2].x) / 6, (-g[0].y + 6 * g[1].y + g[2].y) / 6, (g[1].x + 6 * g[2].x - g[3].x) / 6, (g[1].y + 6 * g[2].y - g[3].y) / 6, g[2].x, g[2].y]);
        }
        return e;
    }

    function m(b, c, e, d, f, g, h, k, p) {
        null == p && (p = 1);
        p = (1 < p ? 1 : 0 > p ? 0 : p) / 2;
        for (var m = [-0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699, 0.7699, -0.9041, 0.9041, -0.9816, 0.9816], s = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472], n = 0, q = 0; 12 > q; q++) {
            var u = p * m[q] + p,
                r = u * (u * (-3 * b + 9 * e - 9 * f + 3 * h) + 6 * b - 12 * e + 6 * f) - 3 * b + 3 * e,
                u = u * (u * (-3 * c + 9 * d - 9 * g + 3 * k) + 6 * c - 12 * d + 6 * g) - 3 * c + 3 * d,
                n = n + s[q] * P.sqrt(r * r + u * u)
        }
        return p * n;
    }

    function q(b, c, e, d, f, g, h, k, p) {
        if (!(0 > p || m(b, c, e, d, f, g, h, k) < p)) {
            var s = 0.5,
                n = 1 - s,
                q;
            for (q = m(b, c, e, d, f, g, h, k, n); 0.01 < U(q - p);) {
                s /= 2, n += (q < p ? 1 : -1) * s, q = m(b, c, e, d, f, g, h, k, n);
            }
            return n;
        }
    }

    function n(b, e, d) {
        b = c._path2curve(b);
        e = c._path2curve(e);
        for (var f, g, h, k, p, s, n, q, u, r, C = d ? 0 : [], x = 0, v = b.length; x < v; x++) {
            if (u = b[x], "M" == u[0]) {
                f = p = u[1], g = s = u[2];
            } else {
                "C" == u[0] ? (u = [f, g].concat(u.slice(1)), f = u[6], g = u[7]) : (u = [f, g, f, g, p, s, p, s], f = p, g = s);
                for (var w = 0, ba = e.length; w < ba; w++) {
                    if (r = e[w], "M" == r[0]) {
                        h = n = r[1], k = q = r[2];
                    } else {
                        "C" == r[0] ? (r = [h, k].concat(r.slice(1)), h = r[6], k = r[7]) : (r = [h, k, h, k, n, q, n, q], h = n, k = q);
                        var y;
                        var ga = u,
                            B = r;
                        y = d;
                        var Y = c.bezierBBox(ga),
                            t = c.bezierBBox(B);
                        if (c.isBBoxIntersect(Y, t)) {
                            for (var Y = m.apply(0, ga), t = m.apply(0, B), Y = ~~ (Y / 5), t = ~~ (t / 5), mb = [], ua = [], D = {}, nb = y ? 0 : [], Ca = 0; Ca < Y + 1; Ca++) {
                                var Ha = c.findDotsAtSegment.apply(c, ga.concat(Ca / Y));
                                mb.push({
                                    x: Ha.x,
                                    y: Ha.y,
                                    t: Ca / Y
                                });
                            }
                            for (Ca = 0; Ca < t + 1; Ca++) {
                                Ha = c.findDotsAtSegment.apply(c, B.concat(Ca / t)), ua.push({
                                    x: Ha.x,
                                    y: Ha.y,
                                    t: Ca / t
                                });
                            }
                            for (Ca = 0; Ca < Y; Ca++) {
                                for (ga = 0; ga < t; ga++) {
                                    var Ia = mb[Ca],
                                        fb = mb[Ca + 1],
                                        B = ua[ga],
                                        Ha = ua[ga + 1],
                                        A = 0.001 > U(fb.x - Ia.x) ? "y" : "x",
                                        z = 0.001 > U(Ha.x - B.x) ? "y" : "x",
                                        ha;
                                    ha = Ia.x;
                                    var V = Ia.y,
                                        M = fb.x,
                                        ya = fb.y,
                                        G = B.x,
                                        H = B.y,
                                        ca = Ha.x,
                                        E = Ha.y;
                                    if (O(ha, M) < N(G, ca) || N(ha, M) > O(G, ca) || O(V, ya) < N(H, E) || N(V, ya) > O(H, E)) {
                                        ha = void 0;
                                    } else {
                                        var F = (ha * ya - V * M) * (G - ca) - (ha - M) * (G * E - H * ca),
                                            I = (ha * ya - V * M) * (H - E) - (V - ya) * (G * E - H * ca),
                                            J = (ha - M) * (H - E) - (V - ya) * (G - ca);
                                        if (J) {
                                            var F = F / J,
                                                I = I / J,
                                                J = +F.toFixed(2),
                                                Q = +I.toFixed(2);
                                            ha = J < +N(ha, M).toFixed(2) || J > +O(ha, M).toFixed(2) || J < +N(G, ca).toFixed(2) || J > +O(G, ca).toFixed(2) || Q < +N(V, ya).toFixed(2) || Q > +O(V, ya).toFixed(2) || Q < +N(H, E).toFixed(2) || Q > +O(H, E).toFixed(2) ? void 0 : {
                                                x: F,
                                                y: I
                                            };
                                        } else {
                                            ha = void 0;
                                        }
                                    }
                                    ha && D[ha.x.toFixed(4)] != ha.y.toFixed(4) && (D[ha.x.toFixed(4)] = ha.y.toFixed(4), Ia = Ia.t + U((ha[A] - Ia[A]) / (fb[A] - Ia[A])) * (fb.t - Ia.t), B = B.t + U((ha[z] - B[z]) / (Ha[z] - B[z])) * (Ha.t - B.t), 0 <= Ia && 1 >= Ia && 0 <= B && 1 >= B && (y ? nb++ : nb.push({
                                        x: ha.x,
                                        y: ha.y,
                                        t1: Ia,
                                        t2: B
                                    })));
                                }
                            }
                            y = nb;
                        } else {
                            y = y ? 0 : [];
                        }
                        if (d) {
                            C += y;
                        } else {
                            Y = 0;
                            for (t = y.length; Y < t; Y++) {
                                y[Y].segment1 = x, y[Y].segment2 = w, y[Y].bez1 = u, y[Y].bez2 = r;
                            }
                            C = C.concat(y);
                        }
                    }
                }
            }
        }
        return C;
    }

    function r(b, c, e, d, f, g) {
        null != b ? (this.a = +b, this.b = +c, this.c = +e, this.d = +d, this.e = +f, this.f = +g) : (this.a = 1, this.c = this.b = 0, this.d = 1, this.f = this.e = 0);
    }

    function t() {
        return this.x + da + this.y + da + this.width + " \u00d7 " + this.height;
    }

    function p(b, c, e, d, f, g) {
        function h(b, c) {
            var e, d, f, g;
            f = b;
            for (d = 0; 8 > d; d++) {
                g = ((m * f + p) * f + k) * f - b;
                if (U(g) < c) {
                    return f;
                }
                e = (3 * m * f + 2 * p) * f + k;
                if (1E-6 > U(e)) {
                    break;
                }
                f -= g / e;
            }
            e = 0;
            d = 1;
            f = b;
            if (f < e) {
                return e;
            }
            if (f > d) {
                return d;
            }
            for (; e < d;) {
                g = ((m * f + p) * f + k) * f;
                if (U(g - b) < c) {
                    break;
                }
                b > g ? e = f : d = f;
                f = (d - e) / 2 + e;
            }
            return f;
        }
        var k = 3 * c,
            p = 3 * (d - c) - k,
            m = 1 - k - p,
            s = 3 * e,
            n = 3 * (f - e) - s,
            q = 1 - s - n;
        return function(b, c) {
            var e = h(b, c);
            return ((q * e + n) * e + s) * e;
        }(b, 1 / (200 * g));
    }

    function e(b, c) {
        var e = [],
            d = {};
        this.ms = c;
        this.times = 1;
        if (b) {
            for (var f in b) {
                b[y](f) && (d[z(f)] = b[f], e.push(z(f)));
            }
            e.sort(qa);
        }
        this.anim = d;
        this.top = e[e.length - 1];
        this.percents = e;
    }

    function u(b, e, f, g, h, k) {
        f = z(f);
        var m, s, n, q, u, C, x = b.ms,
            w = {}, ba = {}, ga = {};
        if (g) {
            for (C = 0, Y = pa.length; C < Y; C++) {
                var B = pa[C];
                if (B.el.id == e.id && B.anim == b) {
                    B.percent != f ? (pa.splice(C, 1), n = 1) : s = B;
                    e.attr(B.totalOrigin);
                    break;
                }
            }
        } else {
            g = +ba;
        }
        C = 0;
        for (var Y = b.percents.length; C < Y; C++) {
            if (b.percents[C] == f || b.percents[C] > g * b.top) {
                f = b.percents[C];
                u = b.percents[C - 1] || 0;
                x = x / b.top * (f - u);
                q = b.percents[C + 1];
                m = b.anim[f];
                break;
            } else {
                g && e.attr(b.anim[b.percents[C]]);
            }
        }
        if (m) {
            if (s) {
                s.initstatus = g, s.start = new Date - s.ms * g;
            } else {
                for (var t in m) {
                    if (m[y](t) && (la[y](t) || e.paper.customAttributes[y](t))) {
                        switch (w[t] = e.attr(t), null == w[t] && (w[t] = X[t]), ba[t] = m[t], la[t]) {
                            case K:
                                ga[t] = (ba[t] - w[t]) / x;
                                break;
                            case "colour":
                                w[t] = c.getRGB(w[t]);
                                C = c.getRGB(ba[t]);
                                ga[t] = {
                                    r: (C.r - w[t].r) / x,
                                    g: (C.g - w[t].g) / x,
                                    b: (C.b - w[t].b) / x
                                };
                                break;
                            case "path":
                                C = Ra(w[t], ba[t]);
                                B = C[1];
                                w[t] = C[0];
                                ga[t] = [];
                                C = 0;
                                for (Y = w[t].length; C < Y; C++) {
                                    ga[t][C] = [0];
                                    for (var ua = 1, D = w[t][C].length; ua < D; ua++) {
                                        ga[t][C][ua] = (B[C][ua] - w[t][C][ua]) / x;
                                    }
                                }
                                break;
                            case "transform":
                                C = e._;
                                if (Y = Oa(C[t], ba[t])) {
                                    for (w[t] = Y.from, ba[t] = Y.to, ga[t] = [], ga[t].real = !0, C = 0, Y = w[t].length; C < Y; C++) {
                                        for (ga[t][C] = [w[t][C][0]], ua = 1, D = w[t][C].length; ua < D; ua++) {
                                            ga[t][C][ua] = (ba[t][C][ua] - w[t][C][ua]) / x;
                                        }
                                    }
                                } else {
                                    Y = e.matrix || new r, C = {
                                        _: {
                                            transform: C.transform
                                        },
                                        getBBox: function() {
                                            return e.getBBox(1);
                                        }
                                    }, w[t] = [Y.a, Y.b, Y.c, Y.d, Y.e, Y.f], hb(C, ba[t]), ba[t] = C._.transform, ga[t] = [(C.matrix.a - Y.a) / x, (C.matrix.b - Y.b) / x, (C.matrix.c - Y.c) / x, (C.matrix.d - Y.d) / x, (C.matrix.e - Y.e) / x, (C.matrix.f - Y.f) / x];
                                }
                                break;
                            case "csv":
                                Y = W(m[t])[fa](v);
                                B = W(w[t])[fa](v);
                                if ("clip-rect" == t) {
                                    for (w[t] = B, ga[t] = [], C = B.length; C--;) {
                                        ga[t][C] = (Y[C] - w[t][C]) / x;
                                    }
                                }
                                ba[t] = Y;
                                break;
                            default:
                                for (Y = [][H](m[t]), B = [][H](w[t]), ga[t] = [], C = e.paper.customAttributes[t].length; C--;) {
                                    ga[t][C] = ((Y[C] || 0) - (B[C] || 0)) / x;
                                };
                        }
                    }
                }
                C = m.easing;
                t = c.easing_formulas[C];
                if (!t) {
                    if ((t = W(C).match(ea)) && 5 == t.length) {
                        var A = t;
                        t = function(b) {
                            return p(b, +A[1], +A[2], +A[3], +A[4], x);
                        };
                    } else {
                        t = Ja;
                    }
                }
                C = m.start || b.start || +new Date;
                B = {
                    anim: b,
                    percent: f,
                    timestamp: C,
                    start: C + (b.del || 0),
                    status: 0,
                    initstatus: g || 0,
                    stop: !1,
                    ms: x,
                    easing: t,
                    from: w,
                    diff: ga,
                    to: ba,
                    el: e,
                    callback: m.callback,
                    prev: u,
                    next: q,
                    repeat: k || b.times,
                    origin: e.attr(),
                    totalOrigin: h
                };
                pa.push(B);
                if (g && !s && !n && (B.stop = !0, B.start = new Date - x * g, 1 == pa.length)) {
                    return ob();
                }
                n && (B.start = new Date - B.ms * g);
                1 == pa.length && tb(ob);
            }
            d("raphael.anim.start." + e.id, e, b);
        }
    }

    function s(b) {
        for (var c = 0; c < pa.length; c++) {
            pa[c].el.paper == b && pa.splice(c--, 1);
        }
    }
    c.version = "2.1.0";
    c.eve = d;
    var w, v = /[, ]+/,
        x = {
            circle: 1,
            rect: 1,
            path: 1,
            ellipse: 1,
            text: 1,
            image: 1
        }, B = /\{(\d+)\}/g,
        y = "hasOwnProperty",
        D = {
            doc: document,
            win: b
        }, V = Object.prototype[y].call(D.win, "Raphael"),
        ca = D.win.Raphael,
        M = function() {
            this.ca = this.customAttributes = {};
        }, A, G = "apply",
        H = "concat",
        Q = "ontouchstart" in D.win || D.win.DocumentTouch && D.doc instanceof DocumentTouch,
        da = " ",
        W = String,
        fa = "split",
        ja = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel" [fa](da),
        F = {
            mousedown: "touchstart",
            mousemove: "touchmove",
            mouseup: "touchend"
        }, I = W.prototype.toLowerCase,
        P = Math,
        O = P.max,
        N = P.min,
        U = P.abs,
        Z = P.pow,
        L = P.PI,
        K = "number",
        T = "array",
        J = Object.prototype.toString;
    c._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i;
    var E = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
        S = {
            NaN: 1,
            Infinity: 1,
            "-Infinity": 1
        }, ea = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
        oa = P.round,
        z = parseFloat,
        ka = parseInt,
        R = W.prototype.toUpperCase,
        X = c._availableAttrs = {
            "arrow-end": "none",
            "arrow-start": "none",
            blur: 0,
            "clip-rect": "0 0 1e9 1e9",
            cursor: "default",
            cx: 0,
            cy: 0,
            fill: "#fff",
            "fill-opacity": 1,
            font: '10px "Microsoft JhengHei"',
            "font-family": '"Microsoft JhengHei"',
            "font-size": "10",
            "font-style": "normal",
            "font-weight": 400,
            gradient: 0,
            height: 0,
            href: "http://raphaeljs.com/",
            "letter-spacing": 0,
            opacity: 1,
            path: "M0,0",
            r: 0,
            rx: 0,
            ry: 0,
            src: "",
            stroke: "#000",
            "stroke-dasharray": "",
            "stroke-linecap": "butt",
            "stroke-linejoin": "butt",
            "stroke-miterlimit": 0,
            "stroke-opacity": 1,
            "stroke-width": 1,
            target: "_blank",
            "text-anchor": "middle",
            title: "Raphael",
            transform: "",
            width: 0,
            x: 0,
            y: 0
        }, la = c._availableAnimAttrs = {
            blur: K,
            "clip-rect": "csv",
            cx: K,
            cy: K,
            fill: "colour",
            "fill-opacity": K,
            "font-size": K,
            height: K,
            opacity: K,
            path: "path",
            r: K,
            rx: K,
            ry: K,
            stroke: "colour",
            "stroke-opacity": K,
            "stroke-width": K,
            transform: "transform",
            width: K,
            x: K,
            y: K
        }, ma = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
        aa = {
            hs: 1,
            rg: 1
        }, na = /,?([achlmqrstvxz]),?/gi,
        va = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
        wa = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
        xa = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig;
    c._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/;
    var ta = {}, qa = function(b, c) {
        return z(b) - z(c);
    }, sa = function() {}, Ja = function(b) {
        return b;
    }, ba = c._rectPath = function(b, c, e, d, f) {
        return f ? [
            ["M", b + f, c],
            ["l", e - 2 * f, 0],
            ["a", f, f, 0, 0, 1, f, f],
            ["l", 0, d - 2 * f],
            ["a", f, f, 0, 0, 1, -f, f],
            ["l", 2 * f - e, 0],
            ["a", f, f, 0, 0, 1, -f, -f],
            ["l", 0, 2 * f - d],
            ["a", f, f, 0, 0, 1, f, -f],
            ["z"]
        ] : [
            ["M", b, c],
            ["l", e, 0],
            ["l", 0, d],
            ["l", -e, 0],
            ["z"]
        ];
    }, C = function(b, c, e, d) {
        null == d && (d = e);
        return [["M", b, c], ["m", 0, -d], ["a", e, d, 0, 1, 1, 0, 2 * d], ["a", e, d, 0, 1, 1, 0, -2 * d], ["z"]];
    }, ga = c._getPath = {
        path: function(b) {
            return b.attr("path");
        },
        circle: function(b) {
            b = b.attrs;
            return C(b.cx, b.cy, b.r);
        },
        ellipse: function(b) {
            b = b.attrs;
            return C(b.cx, b.cy, b.rx, b.ry);
        },
        rect: function(b) {
            b = b.attrs;
            return ba(b.x, b.y, b.width, b.height, b.r);
        },
        image: function(b) {
            b = b.attrs;
            return ba(b.x, b.y, b.width, b.height);
        },
        text: function(b) {
            b = b._getBBox();
            return ba(b.x, b.y, b.width, b.height);
        },
        set: function(b) {
            b = b._getBBox();
            return ba(b.x, b.y, b.width, b.height);
        }
    }, Y = c.mapPath = function(b, c) {
        if (!c) {
            return b;
        }
        var e, d, f, g, h, k, p;
        b = Ra(b);
        f = 0;
        for (h = b.length; f < h; f++) {
            for (p = b[f], g = 1, k = p.length; g < k; g += 2) {
                e = c.x(p[g], p[g + 1]), d = c.y(p[g], p[g + 1]), p[g] = e, p[g + 1] = d;
            }
        }
        return b;
    };
    c._g = D;
    c.type = D.win.SVGAngle || D.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML";
    if ("VML" == c.type) {
        var ua = D.doc.createElement("div"),
            ha;
        ua.innerHTML = '<v:shape adj="1"/>';
        ha = ua.firstChild;
        ha.style.behavior = "url(#default#VML)";
        if (!ha || "object" != typeof ha.adj) {
            return c.type = "";
        }
        ua = null;
    }
    c.svg = !(c.vml = "VML" == c.type);
    c._Paper = M;
    c.fn = A = M.prototype = c.prototype;
    c._id = 0;
    c._oid = 0;
    c.is = function(b, c) {
        c = I.call(c);
        return "finite" == c ? !S[y](+b) : "array" == c ? b instanceof Array : "null" == c && null === b || c == typeof b && null !== b || "object" == c && b === Object(b) || "array" == c && Array.isArray && Array.isArray(b) || J.call(b).slice(8, -1).toLowerCase() == c;
    };
    c.angle = function(b, e, d, f, g, h) {
        return null == g ? (b -= d, e -= f, b || e ? (180 * P.atan2(-e, -b) / L + 540) % 360 : 0) : c.angle(b, e, g, h) - c.angle(d, f, g, h);
    };
    c.rad = function(b) {
        return b % 360 * L / 180;
    };
    c.deg = function(b) {
        return 180 * b / L % 360;
    };
    c.snapTo = function(b, e, d) {
        d = c.is(d, "finite") ? d : 10;
        if (c.is(b, T)) {
            for (var f = b.length; f--;) {
                if (U(b[f] - e) <= d) {
                    return b[f];
                }
            }
        } else {
            b = +b;
            f = e % b;
            if (f < d) {
                return e - f;
            }
            if (f > b - d) {
                return e - f + b;
            }
        }
        return e;
    };
    c.createUUID = function(b, c) {
        return function() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(b, c).toUpperCase();
        };
    }(/[xy]/g, function(b) {
        var c = 16 * P.random() | 0;
        return ("x" == b ? c : c & 3 | 8).toString(16);
    });
    c.setWindow = function(b) {
        d("raphael.setWindow", c, D.win, b);
        D.win = b;
        D.doc = D.win.document;
        c._engine.initWin && c._engine.initWin(D.win);
    };
    var ya = function(b) {
        if (c.vml) {
            var e = /^\s+|\s+$/g,
                d;
            try {
                var f = new ActiveXObject("htmlfile");
                f.write("<body>");
                f.close();
                d = f.body;
            } catch (g) {
                d = createPopup().document.body;
            }
            var h = d.createTextRange();
            ya = k(function(b) {
                try {
                    d.style.color = W(b).replace(e, "");
                    var c = h.queryCommandValue("ForeColor");
                    return "#" + ("000000" + ((c & 255) << 16 | c & 65280 | (c & 16711680) >>> 16).toString(16)).slice(-6);
                } catch (f) {
                    return "none";
                }
            });
        } else {
            var p = D.doc.createElement("i");
            p.title = "Rapha\u00ebl Colour Picker";
            p.style.display = "none";
            D.doc.body.appendChild(p);
            ya = k(function(b) {
                p.style.color = b;
                return D.doc.defaultView.getComputedStyle(p, "").getPropertyValue("color");
            });
        }
        return ya(b);
    }, ia = function() {
        return "hsb(" + [this.h, this.s, this.b] + ")";
    }, lb = function() {
        return "hsl(" + [this.h, this.s, this.l] + ")";
    }, Ta = function() {
        return this.hex;
    }, Ua = function(b, e, d) {
        null == e && c.is(b, "object") && "r" in b && "g" in b && "b" in b && (d = b.b, e = b.g, b = b.r);
        null == e && c.is(b, "string") && (d = c.getRGB(b), b = d.r, e = d.g, d = d.b);
        if (1 < b || 1 < e || 1 < d) {
            b /= 255, e /= 255, d /= 255;
        }
        return [b, e, d];
    }, $a = function(b, e, d, f) {
        b *= 255;
        e *= 255;
        d *= 255;
        b = {
            r: b,
            g: e,
            b: d,
            hex: c.rgb(b, e, d),
            toString: Ta
        };
        c.is(f, "finite") && (b.opacity = f);
        return b;
    };
    c.color = function(b) {
        var e;
        c.is(b, "object") && "h" in b && "s" in b && "b" in b ? (e = c.hsb2rgb(b), b.r = e.r, b.g = e.g, b.b = e.b, b.hex = e.hex) : c.is(b, "object") && "h" in b && "s" in b && "l" in b ? (e = c.hsl2rgb(b), b.r = e.r, b.g = e.g, b.b = e.b, b.hex = e.hex) : (c.is(b, "string") && (b = c.getRGB(b)), c.is(b, "object") && "r" in b && "g" in b && "b" in b ? (e = c.rgb2hsl(b), b.h = e.h, b.s = e.s, b.l = e.l, e = c.rgb2hsb(b), b.v = e.b) : (b = {
            hex: "none"
        }, b.r = b.g = b.b = b.h = b.s = b.v = b.l = -1));
        b.toString = Ta;
        return b;
    };
    c.hsb2rgb = function(b, c, e, d) {
        this.is(b, "object") && "h" in b && "s" in b && "b" in b && (e = b.b, c = b.s, b = b.h, d = b.o);
        var f, g, h;
        b = 360 * b % 360 / 60;
        h = e * c;
        c = h * (1 - U(b % 2 - 1));
        e = f = g = e - h;
        b = ~~b;
        e += [h, c, 0, 0, c, h][b];
        f += [c, h, h, c, 0, 0][b];
        g += [0, 0, c, h, h, c][b];
        return $a(e, f, g, d);
    };
    c.hsl2rgb = function(b, c, e, d) {
        this.is(b, "object") && "h" in b && "s" in b && "l" in b && (e = b.l, c = b.s, b = b.h);
        if (1 < b || 1 < c || 1 < e) {
            b /= 360, c /= 100, e /= 100;
        }
        var f, g, h;
        b = 360 * b % 360 / 60;
        h = 2 * c * (0.5 > e ? e : 1 - e);
        c = h * (1 - U(b % 2 - 1));
        e = f = g = e - h / 2;
        b = ~~b;
        e += [h, c, 0, 0, c, h][b];
        f += [c, h, h, c, 0, 0][b];
        g += [0, 0, c, h, h, c][b];
        return $a(e, f, g, d);
    };
    c.rgb2hsb = function(b, c, e) {
        e = Ua(b, c, e);
        b = e[0];
        c = e[1];
        e = e[2];
        var d, f;
        d = O(b, c, e);
        f = d - N(b, c, e);
        b = ((0 == f ? 0 : d == b ? (c - e) / f : d == c ? (e - b) / f + 2 : (b - c) / f + 4) + 360) % 6 * 60 / 360;
        return {
            h: b,
            s: 0 == f ? 0 : f / d,
            b: d,
            toString: ia
        };
    };
    c.rgb2hsl = function(b, c, e) {
        e = Ua(b, c, e);
        b = e[0];
        c = e[1];
        e = e[2];
        var d, f, g;
        d = O(b, c, e);
        f = N(b, c, e);
        g = d - f;
        b = ((0 == g ? 0 : d == b ? (c - e) / g : d == c ? (e - b) / g + 2 : (b - c) / g + 4) + 360) % 6 * 60 / 360;
        d = (d + f) / 2;
        return {
            h: b,
            s: 0 == g ? 0 : 0.5 > d ? g / (2 * d) : g / (2 - 2 * d),
            l: d,
            toString: lb
        };
    };
    c._path2string = function() {
        "undefined" == typeof this.path2stringCached && (this.path2stringCached = this.join(",").replace(na, "$1"));
        return this.path2stringCached;
    };
    c._preload = function(b, c) {
        var e = D.doc.createElement("img");
        e.style.cssText = "position:absolute;left:-9999em;top:-9999em";
        e.onload = function() {
            c.call(this);
            this.onload = null;
            D.doc.body.removeChild(this);
        };
        e.onerror = function() {
            D.doc.body.removeChild(this);
        };
        D.doc.body.appendChild(e);
        e.src = b;
    };
    c.getRGB = k(function(b) {
        if (!b || (b = W(b)).indexOf("-") + 1) {
            return {
                r: -1,
                g: -1,
                b: -1,
                hex: "none",
                error: 1,
                toString: h
            };
        }
        if ("none" == b) {
            return {
                r: -1,
                g: -1,
                b: -1,
                hex: "none",
                toString: h
            };
        }!aa[y](b.toLowerCase().substring(0, 2)) && "#" != b.charAt() && (b = ya(b));
        var e, d, f, g, k;
        if (b = b.match(E)) {
            b[2] && (f = ka(b[2].substring(5), 16), d = ka(b[2].substring(3, 5), 16), e = ka(b[2].substring(1, 3), 16));
            b[3] && (f = ka((k = b[3].charAt(3)) + k, 16), d = ka((k = b[3].charAt(2)) + k, 16), e = ka((k = b[3].charAt(1)) + k, 16));
            b[4] && (k = b[4][fa](ma), e = z(k[0]), "%" == k[0].slice(-1) && (e *= 2.55), d = z(k[1]), "%" == k[1].slice(-1) && (d *= 2.55), f = z(k[2]), "%" == k[2].slice(-1) && (f *= 2.55), "rgba" == b[1].toLowerCase().slice(0, 4) && (g = z(k[3])), k[3] && "%" == k[3].slice(-1) && (g /= 100));
            if (b[5]) {
                return k = b[5][fa](ma), e = z(k[0]), "%" == k[0].slice(-1) && (e *= 2.55), d = z(k[1]), "%" == k[1].slice(-1) && (d *= 2.55), f = z(k[2]), "%" == k[2].slice(-1) && (f *= 2.55), "deg" != k[0].slice(-3) && "\u00b0" != k[0].slice(-1) || (e /= 360), "hsba" == b[1].toLowerCase().slice(0, 4) && (g = z(k[3])), k[3] && "%" == k[3].slice(-1) && (g /= 100), c.hsb2rgb(e, d, f, g);
            }
            if (b[6]) {
                return k = b[6][fa](ma), e = z(k[0]), "%" == k[0].slice(-1) && (e *= 2.55), d = z(k[1]), "%" == k[1].slice(-1) && (d *= 2.55), f = z(k[2]), "%" == k[2].slice(-1) && (f *= 2.55), "deg" != k[0].slice(-3) && "\u00b0" != k[0].slice(-1) || (e /= 360), "hsla" == b[1].toLowerCase().slice(0, 4) && (g = z(k[3])), k[3] && "%" == k[3].slice(-1) && (g /= 100), c.hsl2rgb(e, d, f, g);
            }
            b = {
                r: e,
                g: d,
                b: f,
                toString: h
            };
            b.hex = "#" + (16777216 | f | d << 8 | e << 16).toString(16).slice(1);
            c.is(g, "finite") && (b.opacity = g);
            return b;
        }
        return {
            r: -1,
            g: -1,
            b: -1,
            hex: "none",
            error: 1,
            toString: h
        };
    }, c);
    c.hsb = k(function(b, e, d) {
        return c.hsb2rgb(b, e, d).hex;
    });
    c.hsl = k(function(b, e, d) {
        return c.hsl2rgb(b, e, d).hex;
    });
    c.rgb = k(function(b, c, e) {
        return "#" + (16777216 | e | c << 8 | b << 16).toString(16).slice(1);
    });
    c.getColor = function(b) {
        b = this.getColor.start = this.getColor.start || {
            h: 0,
            s: 1,
            b: b || 0.75
        };
        var c = this.hsb2rgb(b.h, b.s, b.b);
        b.h += 0.075;
        1 < b.h && (b.h = 0, b.s -= 0.2, 0 >= b.s && (this.getColor.start = {
            h: 0,
            s: 1,
            b: b.b
        }));
        return c.hex;
    };
    c.getColor.reset = function() {
        delete this.start;
    };
    c.parsePathString = function(b) {
        if (!b) {
            return null;
        }
        var e = Ea(b);
        if (e.arr) {
            return Ba(e.arr);
        }
        var d = {
            a: 7,
            c: 6,
            h: 1,
            l: 2,
            m: 2,
            r: 4,
            q: 4,
            s: 4,
            t: 2,
            v: 1,
            z: 0
        }, f = [];
        c.is(b, T) && c.is(b[0], T) && (f = Ba(b));
        f.length || W(b).replace(va, function(b, c, e) {
            var g = [];
            b = c.toLowerCase();
            e.replace(xa, function(b, c) {
                c && g.push(+c);
            });
            "m" == b && 2 < g.length && (f.push([c][H](g.splice(0, 2))), b = "l", c = "m" == c ? "l" : "L");
            if ("r" == b) {
                f.push([c][H](g));
            } else {
                for (; g.length >= d[b] && (f.push([c][H](g.splice(0, d[b]))), d[b]);) {}
            }
        });
        f.toString = c._path2string;
        e.arr = Ba(f);
        return f;
    };
    c.parseTransformString = k(function(b) {
        if (!b) {
            return null;
        }
        var e = [];
        c.is(b, T) && c.is(b[0], T) && (e = Ba(b));
        e.length || W(b).replace(wa, function(b, c, d) {
            var f = [];
            I.call(c);
            d.replace(xa, function(b, c) {
                c && f.push(+c);
            });
            e.push([c][H](f));
        });
        e.toString = c._path2string;
        return e;
    });
    var Ea = function(b) {
        var c = Ea.ps = Ea.ps || {};
        c[b] ? c[b].sleep = 100 : c[b] = {
            sleep: 100
        };
        setTimeout(function() {
            for (var e in c) {
                c[y](e) && e != b && (c[e].sleep--, !c[e].sleep && delete c[e]);
            }
        });
        return c[b];
    };
    c.findDotsAtSegment = function(b, c, e, d, f, g, h, k, p) {
        var m = 1 - p,
            s = Z(m, 3),
            n = Z(m, 2),
            q = p * p,
            u = q * p,
            r = s * b + 3 * n * p * e + 3 * m * p * p * f + u * h,
            s = s * c + 3 * n * p * d + 3 * m * p * p * g + u * k,
            n = b + 2 * p * (e - b) + q * (f - 2 * e + b),
            u = c + 2 * p * (d - c) + q * (g - 2 * d + c),
            C = e + 2 * p * (f - e) + q * (h - 2 * f + e),
            q = d + 2 * p * (g - d) + q * (k - 2 * g + d);
        b = m * b + p * e;
        c = m * c + p * d;
        f = m * f + p * h;
        g = m * g + p * k;
        k = 90 - 180 * P.atan2(n - C, u - q) / L;
        (n > C || u < q) && (k += 180);
        return {
            x: r,
            y: s,
            m: {
                x: n,
                y: u
            },
            n: {
                x: C,
                y: q
            },
            start: {
                x: b,
                y: c
            },
            end: {
                x: f,
                y: g
            },
            alpha: k
        };
    };
    c.bezierBBox = function(b, e, d, f, g, h, k, p) {
        c.is(b, "array") || (b = [b, e, d, f, g, h, k, p]);
        b = ab.apply(null, b);
        return {
            x: b.min.x,
            y: b.min.y,
            x2: b.max.x,
            y2: b.max.y,
            width: b.max.x - b.min.x,
            height: b.max.y - b.min.y
        };
    };
    c.isPointInsideBBox = function(b, c, e) {
        return c >= b.x && c <= b.x2 && e >= b.y && e <= b.y2;
    };
    c.isBBoxIntersect = function(b, e) {
        var d = c.isPointInsideBBox;
        return d(e, b.x, b.y) || d(e, b.x2, b.y) || d(e, b.x, b.y2) || d(e, b.x2, b.y2) || d(b, e.x, e.y) || d(b, e.x2, e.y) || d(b, e.x, e.y2) || d(b, e.x2, e.y2) || (b.x < e.x2 && b.x > e.x || e.x < b.x2 && e.x > b.x) && (b.y < e.y2 && b.y > e.y || e.y < b.y2 && e.y > b.y);
    };
    c.pathIntersection = function(b, c) {
        return n(b, c);
    };
    c.pathIntersectionNumber = function(b, c) {
        return n(b, c, 1);
    };
    c.isPointInsidePath = function(b, e, d) {
        var f = c.pathBBox(b);
        return c.isPointInsideBBox(f, e, d) && 1 == n(b, [
            ["M", e, d],
            ["H", f.x2 + 10]
        ], 1) % 2;
    };
    c._removedFactory = function(b) {
        return function() {
            d("raphael.log", null, "Raphael: 您正使用方法： \u201c" + b + "\u201d 来删除对象", b);
        };
    };
    var La = c.pathBBox = function(b) {
            var c = Ea(b);
            if (c.bbox) {
                return g(c.bbox);
            }
            if (!b) {
                return {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    x2: 0,
                    y2: 0
                };
            }
            b = Ra(b);
            for (var e = 0, d = 0, f = [], h = [], k, p = 0, m = b.length; p < m; p++) {
                k = b[p], "M" == k[0] ? (e = k[1], d = k[2], f.push(e), h.push(d)) : (e = ab(e, d, k[1], k[2], k[3], k[4], k[5], k[6]), f = f[H](e.min.x, e.max.x), h = h[H](e.min.y, e.max.y), e = k[5], d = k[6]);
            }
            b = N[G](0, f);
            k = N[G](0, h);
            f = O[G](0, f);
            h = O[G](0, h);
            p = f - b;
            m = h - k;
            h = {
                x: b,
                y: k,
                x2: f,
                y2: h,
                width: p,
                height: m,
                cx: b + p / 2,
                cy: k + m / 2
            };
            c.bbox = g(h);
            return h;
        }, Ba = function(b) {
            b = g(b);
            b.toString = c._path2string;
            return b;
        }, Ya = c._pathToRelative = function(b) {
            var e = Ea(b);
            if (e.rel) {
                return Ba(e.rel);
            }
            c.is(b, T) && c.is(b && b[0], T) || (b = c.parsePathString(b));
            var d = [],
                f = 0,
                g = 0,
                h = 0,
                k = 0,
                p = 0;
            "M" == b[0][0] && (f = b[0][1], g = b[0][2], h = f, k = g, p++, d.push(["M", f, g]));
            for (var m = b.length; p < m; p++) {
                var s = d[p] = [],
                    n = b[p];
                if (n[0] != I.call(n[0])) {
                    switch (s[0] = I.call(n[0]), s[0]) {
                        case "a":
                            s[1] = n[1];
                            s[2] = n[2];
                            s[3] = n[3];
                            s[4] = n[4];
                            s[5] = n[5];
                            s[6] = +(n[6] - f).toFixed(3);
                            s[7] = +(n[7] - g).toFixed(3);
                            break;
                        case "v":
                            s[1] = +(n[1] - g).toFixed(3);
                            break;
                        case "m":
                            h = n[1], k = n[2];
                        default:
                            for (var q = 1, u = n.length; q < u; q++) {
                                s[q] = +(n[q] - (q % 2 ? f : g)).toFixed(3);
                            };
                    }
                } else {
                    for (d[p] = [], "m" == n[0] && (h = n[1] + f, k = n[2] + g), s = 0, q = n.length; s < q; s++) {
                        d[p][s] = n[s];
                    }
                }
                n = d[p].length;
                switch (d[p][0]) {
                    case "z":
                        f = h;
                        g = k;
                        break;
                    case "h":
                        f += +d[p][n - 1];
                        break;
                    case "v":
                        g += +d[p][n - 1];
                        break;
                    default:
                        f += +d[p][n - 2], g += +d[p][n - 1];
                }
            }
            d.toString = c._path2string;
            e.rel = Ba(d);
            return d;
        }, Ga = c._pathToAbsolute = function(b) {
            var e = Ea(b);
            if (e.abs) {
                return Ba(e.abs);
            }
            c.is(b, T) && c.is(b && b[0], T) || (b = c.parsePathString(b));
            if (!b || !b.length) {
                return [["M", 0, 0]];
            }
            var d = [],
                g = 0,
                h = 0,
                k = 0,
                p = 0,
                m = 0;
            "M" == b[0][0] && (g = +b[0][1], h = +b[0][2], k = g, p = h, m++, d[0] = ["M", g, h]);
            for (var s = 3 == b.length && "M" == b[0][0] && "R" == b[1][0].toUpperCase() && "Z" == b[2][0].toUpperCase(), n, q = m, u = b.length; q < u; q++) {
                d.push(m = []);
                n = b[q];
                if (n[0] != R.call(n[0])) {
                    switch (m[0] = R.call(n[0]), m[0]) {
                        case "A":
                            m[1] = n[1];
                            m[2] = n[2];
                            m[3] = n[3];
                            m[4] = n[4];
                            m[5] = n[5];
                            m[6] = +(n[6] + g);
                            m[7] = +(n[7] + h);
                            break;
                        case "V":
                            m[1] = +n[1] + h;
                            break;
                        case "H":
                            m[1] = +n[1] + g;
                            break;
                        case "R":
                            for (var r = [g, h][H](n.slice(1)), C = 2, x = r.length; C < x; C++) {
                                r[C] = +r[C] + g, r[++C] = +r[C] + h;
                            }
                            d.pop();
                            d = d[H](f(r, s));
                            break;
                        case "M":
                            k = +n[1] + g, p = +n[2] + h;
                        default:
                            for (C = 1, x = n.length; C < x; C++) {
                                m[C] = +n[C] + (C % 2 ? g : h);
                            };
                    }
                } else {
                    if ("R" == n[0]) {
                        r = [g, h][H](n.slice(1)), d.pop(), d = d[H](f(r, s)), m = ["R"][H](n.slice(-2));
                    } else {
                        for (r = 0, C = n.length; r < C; r++) {
                            m[r] = n[r];
                        }
                    }
                }
                switch (m[0]) {
                    case "Z":
                        g = k;
                        h = p;
                        break;
                    case "H":
                        g = m[1];
                        break;
                    case "V":
                        h = m[1];
                        break;
                    case "M":
                        k = m[m.length - 2], p = m[m.length - 1];
                    default:
                        g = m[m.length - 2], h = m[m.length - 1];
                }
            }
            d.toString = c._path2string;
            e.abs = Ba(d);
            return d;
        }, cb = function(b, c, e, d, f, g) {
            var h = 1 / 3,
                k = 2 / 3;
            return [h * b + k * e, h * c + k * d, h * f + k * e, h * g + k * d, f, g];
        }, db = function(b, c, e, d, f, g, h, p, m, s) {
            var n = 120 * L / 180,
                q = L / 180 * (+f || 0),
                u = [],
                r, C = k(function(b, c, e) {
                    var d = b * P.cos(e) - c * P.sin(e);
                    b = b * P.sin(e) + c * P.cos(e);
                    return {
                        x: d,
                        y: b
                    };
                });
            if (s) {
                v = s[0], r = s[1], g = s[2], x = s[3];
            } else {
                r = C(b, c, -q);
                b = r.x;
                c = r.y;
                r = C(p, m, -q);
                p = r.x;
                m = r.y;
                P.cos(L / 180 * f);
                P.sin(L / 180 * f);
                r = (b - p) / 2;
                v = (c - m) / 2;
                x = r * r / (e * e) + v * v / (d * d);
                1 < x && (x = P.sqrt(x), e *= x, d *= x);
                var x = e * e,
                    w = d * d,
                    x = (g == h ? -1 : 1) * P.sqrt(U((x * w - x * v * v - w * r * r) / (x * v * v + w * r * r)));
                g = x * e * v / d + (b + p) / 2;
                var x = x * -d * r / e + (c + m) / 2,
                    v = P.asin(((c - x) / d).toFixed(9));
                r = P.asin(((m - x) / d).toFixed(9));
                v = b < g ? L - v : v;
                r = p < g ? L - r : r;
                0 > v && (v = 2 * L + v);
                0 > r && (r = 2 * L + r);
                h && v > r && (v -= 2 * L);
                !h && r > v && (r -= 2 * L);
            }
            if (U(r - v) > n) {
                var u = r,
                    w = p,
                    ba = m;
                r = v + n * (h && r > v ? 1 : -1);
                p = g + e * P.cos(r);
                m = x + d * P.sin(r);
                u = db(p, m, e, d, f, 0, h, w, ba, [r, u, g, x]);
            }
            g = r - v;
            f = P.cos(v);
            n = P.sin(v);
            h = P.cos(r);
            r = P.sin(r);
            g = P.tan(g / 4);
            e = 4 / 3 * e * g;
            g *= 4 / 3 * d;
            d = [b, c];
            b = [b + e * n, c - g * f];
            c = [p + e * r, m - g * h];
            p = [p, m];
            b[0] = 2 * d[0] - b[0];
            b[1] = 2 * d[1] - b[1];
            if (s) {
                return [b, c, p][H](u);
            }
            u = [b, c, p][H](u).join()[fa](",");
            s = [];
            p = 0;
            for (m = u.length; p < m; p++) {
                s[p] = p % 2 ? C(u[p - 1], u[p], q).y : C(u[p], u[p + 1], q).x;
            }
            return s;
        }, Va = function(b, c, e, d, f, g, h, k, p) {
            var m = 1 - p;
            return {
                x: Z(m, 3) * b + 3 * Z(m, 2) * p * e + 3 * m * p * p * f + Z(p, 3) * h,
                y: Z(m, 3) * c + 3 * Z(m, 2) * p * d + 3 * m * p * p * g + Z(p, 3) * k
            };
        }, ab = k(function(b, c, e, d, f, g, h, k) {
            var p = f - 2 * e + b - (h - 2 * f + e),
                m = 2 * (e - b) - 2 * (f - e),
                s = b - e,
                n = (-m + P.sqrt(m * m - 4 * p * s)) / 2 / p,
                p = (-m - P.sqrt(m * m - 4 * p * s)) / 2 / p,
                r = [c, k],
                q = [b, h];
            "1e12" < U(n) && (n = 0.5);
            "1e12" < U(p) && (p = 0.5);
            0 < n && 1 > n && (n = Va(b, c, e, d, f, g, h, k, n), q.push(n.x), r.push(n.y));
            0 < p && 1 > p && (n = Va(b, c, e, d, f, g, h, k, p), q.push(n.x), r.push(n.y));
            p = g - 2 * d + c - (k - 2 * g + d);
            m = 2 * (d - c) - 2 * (g - d);
            s = c - d;
            n = (-m + P.sqrt(m * m - 4 * p * s)) / 2 / p;
            p = (-m - P.sqrt(m * m - 4 * p * s)) / 2 / p;
            "1e12" < U(n) && (n = 0.5);
            "1e12" < U(p) && (p = 0.5);
            0 < n && 1 > n && (n = Va(b, c, e, d, f, g, h, k, n), q.push(n.x), r.push(n.y));
            0 < p && 1 > p && (n = Va(b, c, e, d, f, g, h, k, p), q.push(n.x), r.push(n.y));
            return {
                min: {
                    x: N[G](0, q),
                    y: N[G](0, r)
                },
                max: {
                    x: O[G](0, q),
                    y: O[G](0, r)
                }
            };
        }),
        Ra = c._path2curve = k(function(b, c) {
            var e = !c && Ea(b);
            if (!c && e.curve) {
                return Ba(e.curve);
            }
            var d = Ga(b),
                f = c && Ga(c),
                g = {
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0,
                    X: 0,
                    Y: 0,
                    qx: null,
                    qy: null
                }, h = {
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0,
                    X: 0,
                    Y: 0,
                    qx: null,
                    qy: null
                }, k = function(b, c) {
                    var e, d;
                    if (!b) {
                        return ["C", c.x, c.y, c.x, c.y, c.x, c.y];
                    }
                    b[0] in {
                        T: 1,
                        Q: 1
                    } || (c.qx = c.qy = null);
                    switch (b[0]) {
                        case "M":
                            c.X = b[1];
                            c.Y = b[2];
                            break;
                        case "A":
                            b = ["C"][H](db[G](0, [c.x, c.y][H](b.slice(1))));
                            break;
                        case "S":
                            e = c.x + (c.x - (c.bx || c.x));
                            d = c.y + (c.y - (c.by || c.y));
                            b = ["C", e, d][H](b.slice(1));
                            break;
                        case "T":
                            c.qx = c.x + (c.x - (c.qx || c.x));
                            c.qy = c.y + (c.y - (c.qy || c.y));
                            b = ["C"][H](cb(c.x, c.y, c.qx, c.qy, b[1], b[2]));
                            break;
                        case "Q":
                            c.qx = b[1];
                            c.qy = b[2];
                            b = ["C"][H](cb(c.x, c.y, b[1], b[2], b[3], b[4]));
                            break;
                        case "L":
                            b = ["C"][H]([c.x, c.y, b[1], b[2], b[1], b[2]]);
                            break;
                        case "H":
                            b = ["C"][H]([c.x, c.y, b[1], c.y, b[1], c.y]);
                            break;
                        case "V":
                            b = ["C"][H]([c.x, c.y, c.x, b[1], c.x, b[1]]);
                            break;
                        case "Z":
                            b = ["C"][H]([c.x, c.y, c.X, c.Y, c.X, c.Y]);
                    }
                    return b;
                }, p = function(b, c) {
                    if (7 < b[c].length) {
                        b[c].shift();
                        for (var e = b[c]; e.length;) {
                            b.splice(c++, 0, ["C"][H](e.splice(0, 6)));
                        }
                        b.splice(c, 1);
                        n = O(d.length, f && f.length || 0);
                    }
                }, m = function(b, c, e, g, h) {
                    b && c && "M" == b[h][0] && "M" != c[h][0] && (c.splice(h, 0, ["M", g.x, g.y]), e.bx = 0, e.by = 0, e.x = b[h][1], e.y = b[h][2], n = O(d.length, f && f.length || 0));
                }, s = 0,
                n = O(d.length, f && f.length || 0);
            for (; s < n; s++) {
                d[s] = k(d[s], g);
                p(d, s);
                f && (f[s] = k(f[s], h));
                f && p(f, s);
                m(d, f, g, h, s);
                m(f, d, h, g, s);
                var r = d[s],
                    q = f && f[s],
                    u = r.length,
                    C = f && q.length;
                g.x = r[u - 2];
                g.y = r[u - 1];
                g.bx = z(r[u - 4]) || g.x;
                g.by = z(r[u - 3]) || g.y;
                h.bx = f && (z(q[C - 4]) || h.x);
                h.by = f && (z(q[C - 3]) || h.y);
                h.x = f && q[C - 2];
                h.y = f && q[C - 1];
            }
            f || (e.curve = Ba(d));
            return f ? [d, f] : d;
        }, null, Ba);
    c._parseDots = k(function(b) {
        for (var e = [], d = 0, f = b.length; d < f; d++) {
            var g = {}, h = b[d].match(/^([^:]*):?([\d\.]*)/);
            g.color = c.getRGB(h[1]);
            if (g.color.error) {
                return null;
            }
            g.color = g.color.hex;
            h[2] && (g.offset = h[2] + "%");
            e.push(g);
        }
        d = 1;
        for (f = e.length - 1; d < f; d++) {
            if (!e[d].offset) {
                b = z(e[d - 1].offset || 0);
                h = 0;
                for (g = d + 1; g < f; g++) {
                    if (e[g].offset) {
                        h = e[g].offset;
                        break;
                    }
                }
                h || (h = 100, g = f);
                h = z(h);
                for (h = (h - b) / (g - d + 1); d < g; d++) {
                    b += h, e[d].offset = b + "%";
                }
            }
        }
        return e;
    });
    var Ma = c._tear = function(b, c) {
        b == c.top && (c.top = b.prev);
        b == c.bottom && (c.bottom = b.next);
        b.next && (b.next.prev = b.prev);
        b.prev && (b.prev.next = b.next);
    };
    c._tofront = function(b, c) {
        c.top !== b && (Ma(b, c), b.next = null, b.prev = c.top, c.top.next = b, c.top = b);
    };
    c._toback = function(b, c) {
        c.bottom !== b && (Ma(b, c), b.next = c.bottom, b.prev = null, c.bottom.prev = b, c.bottom = b);
    };
    c._insertafter = function(b, c, e) {
        Ma(b, e);
        c == e.top && (e.top = b);
        c.next && (c.next.prev = b);
        b.next = c.next;
        b.prev = c;
        c.next = b;
    };
    c._insertbefore = function(b, c, e) {
        Ma(b, e);
        c == e.bottom && (e.bottom = b);
        c.prev && (c.prev.next = b);
        b.prev = c.prev;
        c.prev = b;
        b.next = c;
    };
    var Za = c.toMatrix = function(b, c) {
        var e = La(b),
            d = {
                _: {
                    transform: ""
                },
                getBBox: function() {
                    return e;
                }
            };
        hb(d, c);
        return d.matrix;
    };
    c.transformPath = function(b, c) {
        return Y(b, Za(b, c));
    };
    var hb = c._extractTransform = function(b, e) {
        if (null == e) {
            return b._.transform;
        }
        e = W(e).replace(/\.{3}|\u2026/g, b._.transform || "");
        var d = c.parseTransformString(e),
            f = 0,
            g = 0,
            h = 0,
            k = 1,
            p = 1,
            m = b._,
            h = new r;
        m.transform = d || [];
        if (d) {
            for (var g = 0, s = d.length; g < s; g++) {
                var n = d[g],
                    q = n.length,
                    u = W(n[0]).toLowerCase(),
                    C = n[0] != u,
                    x = C ? h.invert() : 0,
                    v;
                "t" == u && 3 == q ? C ? (q = x.x(0, 0), u = x.y(0, 0), C = x.x(n[1], n[2]), x = x.y(n[1], n[2]), h.translate(C - q, x - u)) : h.translate(n[1], n[2]) : "r" == u ? 2 == q ? (v = v || b.getBBox(1), h.rotate(n[1], v.x + v.width / 2, v.y + v.height / 2), f += n[1]) : 4 == q && (C ? (C = x.x(n[2], n[3]), x = x.y(n[2], n[3]), h.rotate(n[1], C, x)) : h.rotate(n[1], n[2], n[3]), f += n[1]) : "s" == u ? 2 == q || 3 == q ? (v = v || b.getBBox(1), h.scale(n[1], n[q - 1], v.x + v.width / 2, v.y + v.height /
                    2), k *= n[1], p *= n[q - 1]) : 5 == q && (C ? (C = x.x(n[3], n[4]), x = x.y(n[3], n[4]), h.scale(n[1], n[2], C, x)) : h.scale(n[1], n[2], n[3], n[4]), k *= n[1], p *= n[2]) : "m" == u && 7 == q && h.add(n[1], n[2], n[3], n[4], n[5], n[6]);
                m.dirtyT = 1;
                b.matrix = h;
            }
        }
        b.matrix = h;
        m.sx = k;
        m.sy = p;
        m.deg = f;
        m.dx = g = h.e;
        m.dy = h = h.f;
        1 == k && 1 == p && !f && m.bbox ? (m.bbox.x += +g, m.bbox.y += +h) : m.dirtyT = 1;
    }, bb = function(b) {
        var c = b[0];
        switch (c.toLowerCase()) {
            case "t":
                return [c, 0, 0];
            case "m":
                return [c, 1, 0, 0, 1, 0, 0];
            case "r":
                return 4 == b.length ? [c, 0, b[2], b[3]] : [c, 0];
            case "s":
                return 5 == b.length ? [c, 1, 1, b[3], b[4]] : 3 == b.length ? [c, 1, 1] : [c, 1];
        }
    }, Oa = c._equaliseTransform = function(b, e) {
        e = W(e).replace(/\.{3}|\u2026/g, b);
        b = c.parseTransformString(b) || [];
        e = c.parseTransformString(e) || [];
        for (var d = O(b.length, e.length), f = [], g = [], h = 0, k, p, m, s; h < d; h++) {
            m = b[h] || bb(e[h]);
            s = e[h] || bb(m);
            if (m[0] != s[0] || "r" == m[0].toLowerCase() && (m[2] != s[2] || m[3] != s[3]) || "s" == m[0].toLowerCase() && (m[3] != s[3] || m[4] != s[4])) {
                return;
            }
            f[h] = [];
            g[h] = [];
            k = 0;
            for (p = O(m.length, s.length); k < p; k++) {
                k in m && (f[h][k] = m[k]), k in s && (g[h][k] = s[k]);
            }
        }
        return {
            from: f,
            to: g
        };
    };
    c._getContainer = function(b, e, d, f) {
        var g;
        g = null != f || c.is(b, "object") ? b : D.doc.getElementById(b);
        if (null != g) {
            return g.tagName ? null == e ? {
                container: g,
                width: g.style.pixelWidth || g.offsetWidth,
                height: g.style.pixelHeight || g.offsetHeight
            } : {
                container: g,
                width: e,
                height: d
            } : {
                container: 1,
                x: b,
                y: e,
                width: d,
                height: f
            };
        }
    };
    c.pathToRelative = Ya;
    c._engine = {};
    c.path2curve = Ra;
    c.matrix = function(b, c, e, d, f, g) {
        return new r(b, c, e, d, f, g);
    };
    (function(b) {
        function e(b) {
            return b[0] * b[0] + b[1] * b[1];
        }

        function d(b) {
            var c = P.sqrt(e(b));
            b[0] && (b[0] /= c);
            b[1] && (b[1] /= c);
        }
        b.add = function(b, c, e, d, f, g) {
            var h = [
                    [],
                    [],
                    []
                ],
                k = [
                    [this.a, this.c, this.e],
                    [this.b, this.d, this.f],
                    [0, 0, 1]
                ];
            c = [
                [b, e, f],
                [c, d, g],
                [0, 0, 1]
            ];
            b && b instanceof r && (c = [
                [b.a, b.c, b.e],
                [b.b, b.d, b.f],
                [0, 0, 1]
            ]);
            for (b = 0; 3 > b; b++) {
                for (e = 0; 3 > e; e++) {
                    for (d = f = 0; 3 > d; d++) {
                        f += k[b][d] * c[d][e];
                    }
                    h[b][e] = f;
                }
            }
            this.a = h[0][0];
            this.b = h[1][0];
            this.c = h[0][1];
            this.d = h[1][1];
            this.e = h[0][2];
            this.f = h[1][2];
        };
        b.invert = function() {
            var b = this.a * this.d - this.b * this.c;
            return new r(this.d / b, -this.b / b, -this.c / b, this.a / b, (this.c * this.f - this.d * this.e) / b, (this.b * this.e - this.a * this.f) / b);
        };
        b.clone = function() {
            return new r(this.a, this.b, this.c, this.d, this.e, this.f);
        };
        b.translate = function(b, c) {
            this.add(1, 0, 0, 1, b, c);
        };
        b.scale = function(b, c, e, d) {
            null == c && (c = b);
            (e || d) && this.add(1, 0, 0, 1, e, d);
            this.add(b, 0, 0, c, 0, 0);
            (e || d) && this.add(1, 0, 0, 1, -e, -d);
        };
        b.rotate = function(b, e, d) {
            b = c.rad(b);
            e = e || 0;
            d = d || 0;
            var f = +P.cos(b).toFixed(9);
            b = +P.sin(b).toFixed(9);
            this.add(f, b, -b, f, e, d);
            this.add(1, 0, 0, 1, -e, -d);
        };
        b.x = function(b, c) {
            return b * this.a + c * this.c + this.e;
        };
        b.y = function(b, c) {
            return b * this.b + c * this.d + this.f;
        };
        b.get = function(b) {
            return +this[W.fromCharCode(97 + b)].toFixed(4);
        };
        b.toString = function() {
            return c.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join();
        };
        b.toFilter = function() {
            return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')";
        };
        b.offset = function() {
            return [this.e.toFixed(4), this.f.toFixed(4)];
        };
        b.split = function() {
            var b = {};
            b.dx = this.e;
            b.dy = this.f;
            var f = [
                [this.a, this.c],
                [this.b, this.d]
            ];
            b.scalex = P.sqrt(e(f[0]));
            d(f[0]);
            b.shear = f[0][0] * f[1][0] + f[0][1] * f[1][1];
            f[1] = [f[1][0] - f[0][0] * b.shear, f[1][1] - f[0][1] * b.shear];
            b.scaley = P.sqrt(e(f[1]));
            d(f[1]);
            b.shear /= b.scaley;
            var g = -f[0][1],
                f = f[1][1];
            0 > f ? (b.rotate = c.deg(P.acos(f)), 0 > g && (b.rotate = 360 - b.rotate)) : b.rotate = c.deg(P.asin(g));
            b.isSimple = !+b.shear.toFixed(9) && (b.scalex.toFixed(9) == b.scaley.toFixed(9) || !b.rotate);
            b.isSuperSimple = !+b.shear.toFixed(9) && b.scalex.toFixed(9) == b.scaley.toFixed(9) && !b.rotate;
            b.noRotation = !+b.shear.toFixed(9) && !b.rotate;
            return b;
        };
        b.toTransformString = function(b) {
            b = b || this[fa]();
            return b.isSimple ? (b.scalex = +b.scalex.toFixed(4), b.scaley = +b.scaley.toFixed(4), b.rotate = +b.rotate.toFixed(4), (b.dx || b.dy ? "t" + [b.dx, b.dy] : "") + (1 != b.scalex || 1 != b.scaley ? "s" + [b.scalex, b.scaley, 0, 0] : "") + (b.rotate ? "r" + [b.rotate, 0, 0] : "")) : "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)];
        };
    })(r.prototype);
    var Ka = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
    "Apple Computer, Inc." == navigator.vendor && (Ka && 4 > Ka[1] || "iP" == navigator.platform.slice(0, 2)) || "Google Inc." == navigator.vendor && Ka && 8 > Ka[1] ? A.safari = function() {
        var b = this.rect(-99, -99, this.width + 99, this.height + 99).attr({
            stroke: "none"
        });
        setTimeout(function() {
            b.remove();
        });
    } : A.safari = sa;
    for (var Qa = function() {
        this.returnValue = !1;
    }, Wa = function() {
        return this.originalEvent.preventDefault();
    }, Na = function() {
        this.cancelBubble = !0;
    }, eb = function() {
        return this.originalEvent.stopPropagation();
    }, Pa = function(b) {
        return {
            x: b.clientX + (D.doc.documentElement.scrollLeft || D.doc.body.scrollLeft),
            y: b.clientY + (D.doc.documentElement.scrollTop || D.doc.body.scrollTop)
        };
    }, kb = function() {
        if (D.doc.addEventListener) {
            return function(b, c, e, d) {
                var f = function(b) {
                    var c = Pa(b);
                    return e.call(d, b, c.x, c.y);
                };
                b.addEventListener(c, f, !1);
                Q && F[c] && b.addEventListener(F[c], function(c) {
                    for (var f = Pa(c), g = c, h = 0, k = c.targetTouches && c.targetTouches.length; h < k; h++) {
                        if (c.targetTouches[h].target == b) {
                            c = c.targetTouches[h];
                            c.originalEvent = g;
                            c.preventDefault = Wa;
                            c.stopPropagation = eb;
                            break;
                        }
                    }
                    return e.call(d, c, f.x, f.y);
                }, !1);
                return function() {
                    b.removeEventListener(c, f, !1);
                    Q && F[c] && b.removeEventListener(F[c], f, !1);
                    return !0;
                };
            };
        }
        if (D.doc.attachEvent) {
            return function(b, c, e, d) {
                var f = function(b) {
                    b = b || D.win.event;
                    var c = b.clientX + (D.doc.documentElement.scrollLeft || D.doc.body.scrollLeft),
                        f = b.clientY + (D.doc.documentElement.scrollTop || D.doc.body.scrollTop);
                    b.preventDefault = b.preventDefault || Qa;
                    b.stopPropagation = b.stopPropagation || Na;
                    return e.call(d, b, c, f);
                };
                b.attachEvent("on" + c, f);
                return function() {
                    b.detachEvent("on" + c, f);
                    return !0;
                };
            };
        }
    }(), za = [], Fa = function(b) {
        for (var c = b.clientX, e = b.clientY, f = D.doc.documentElement.scrollTop || D.doc.body.scrollTop, g = D.doc.documentElement.scrollLeft || D.doc.body.scrollLeft, h, k = za.length; k--;) {
            h = za[k];
            if (Q && b.touches) {
                for (var p = b.touches.length, m; p--;) {
                    if (m = b.touches[p], m.identifier == h.el._drag.id) {
                        c = m.clientX;
                        e = m.clientY;
                        (b.originalEvent ? b.originalEvent : b).preventDefault();
                        break;
                    }
                }
            } else {
                b.preventDefault();
            }
            var p = h.el.node,
                s = p.nextSibling,
                n = p.parentNode,
                r = p.style.display;
            D.win.opera && n.removeChild(p);
            p.style.display = "none";
            m = h.el.paper.getElementByPoint(c, e);
            p.style.display = r;
            D.win.opera && (s ? n.insertBefore(p, s) : n.appendChild(p));
            m && d("raphael.drag.over." + h.el.id, h.el, m);
            c += g;
            e += f;
            d("raphael.drag.move." + h.el.id, h.move_scope || h.el, c - h.el._drag.x, e - h.el._drag.y, c, e, b);
        }
    }, Sa = function(b) {
        c.unmousemove(Fa).unmouseup(Sa);
        for (var e = za.length, f; e--;) {
            f = za[e], f.el._drag = {}, d("raphael.drag.end." + f.el.id, f.end_scope || f.start_scope || f.move_scope || f.el, b);
        }
        za = [];
    }, ra = c.el = {}, sb = ja.length; sb--;) {
        (function(b) {
            c[b] = ra[b] = function(e, d) {
                c.is(e, "function") && (this.events = this.events || [], this.events.push({
                    name: b,
                    f: e,
                    unbind: kb(this.shape || this.node || D.doc, b, e, d || this)
                }));
                return this;
            };
            c["un" + b] = ra["un" + b] = function(e) {
                for (var d = this.events || [], f = d.length; f--;) {
                    d[f].name != b || !c.is(e, "undefined") && d[f].f != e || (d[f].unbind(), d.splice(f, 1), !d.length && delete this.events);
                }
                return this;
            };
        })(ja[sb]);
    }
    ra.data = function(b, e) {
        var f = ta[this.id] = ta[this.id] || {};
        if (1 == arguments.length) {
            if (c.is(b, "object")) {
                for (var g in b) {
                    b[y](g) && this.data(g, b[g]);
                }
                return this;
            }
            d("raphael.data.get." + this.id, this, f[b], b);
            return f[b];
        }
        f[b] = e;
        d("raphael.data.set." + this.id, this, e, b);
        return this;
    };
    ra.removeData = function(b) {
        null == b ? ta[this.id] = {} : ta[this.id] && delete ta[this.id][b];
        return this;
    };
    ra.getData = function() {
        return g(ta[this.id] || {});
    };
    ra.hover = function(b, c, e, d) {
        return this.mouseover(b, e).mouseout(c, d || e);
    };
    ra.unhover = function(b, c) {
        return this.unmouseover(b).unmouseout(c);
    };
    var Xa = [];
    ra.drag = function(b, e, f, g, h, k) {
        function p(m) {
            (m.originalEvent || m).preventDefault();
            var s = D.doc.documentElement.scrollTop || D.doc.body.scrollTop,
                n = D.doc.documentElement.scrollLeft || D.doc.body.scrollLeft;
            this._drag.x = m.clientX + n;
            this._drag.y = m.clientY + s;
            this._drag.id = m.identifier;
            !za.length && c.mousemove(Fa).mouseup(Sa);
            za.push({
                el: this,
                move_scope: g,
                start_scope: h,
                end_scope: k
            });
            e && d.on("raphael.drag.start." + this.id, e);
            b && d.on("raphael.drag.move." + this.id, b);
            f && d.on("raphael.drag.end." + this.id, f);
            d("raphael.drag.start." + this.id, h || g || this, m.clientX + n, m.clientY + s, m);
        }
        this._drag = {};
        Xa.push({
            el: this,
            start: p
        });
        this.mousedown(p);
        return this;
    };
    ra.onDragOver = function(b) {
        b ? d.on("raphael.drag.over." + this.id, b) : d.unbind("raphael.drag.over." + this.id);
    };
    ra.undrag = function() {
        for (var b = Xa.length; b--;) {
            Xa[b].el == this && (this.unmousedown(Xa[b].start), Xa.splice(b, 1), d.unbind("raphael.drag.*." + this.id));
        }!Xa.length && c.unmousemove(Fa).unmouseup(Sa);
    };
    A.circle = function(b, e, d) {
        b = c._engine.circle(this, b || 0, e || 0, d || 0);
        this.__set__ && this.__set__.push(b);
        return b;
    };
    A.rect = function(b, e, d, f, g) {
        b = c._engine.rect(this, b || 0, e || 0, d || 0, f || 0, g || 0);
        this.__set__ && this.__set__.push(b);
        return b;
    };
    A.rectBb = function(b, e, d, f, g) {
        b = c._engine.rect(this, b || 0, e || 0, d || 0, f || 0, g || 0);
        this.__set__ && this.__set__.push(b);
        return b;
    };
    A.ellipse = function(b, e, d, f) {
        b = c._engine.ellipse(this, b || 0, e || 0, d || 0, f || 0);
        this.__set__ && this.__set__.push(b);
        return b;
    };
    A.path = function(b) {
        b && !c.is(b, "string") && !c.is(b[0], T) && (b += "");
        var e = c._engine.path(c.format[G](c, arguments), this);
        this.__set__ && this.__set__.push(e);
        return e;
    };
    A.pathBb = function(b) {
        b && !c.is(b, "string") && !c.is(b[0], T) && (b += "");
        var e = c._engine.path(c.format[G](c, arguments), this, !0);
        this.__set__ && this.__set__.push(e);
        return e;
    };
    A.image = function(b, e, d, f, g) {
        b = c._engine.image(this, b || "about:blank", e || 0, d || 0, f || 0, g || 0);
        this.__set__ && this.__set__.push(b);
        return b;
    };
    A.imageBb = function(b, e, d, f, g) {
        b = c._engine.imageBb(this, b || "about:blank", e || 0, d || 0, f || 0, g || 0);
        this.__set__ && this.__set__.push(b);
        return b;
    };
    A.text = function(b, e, d) {
        b = c._engine.text(this, b || 0, e || 0, W(d));
        this.__set__ && this.__set__.push(b);
        return b;
    };
    A.set = function(b) {
        !c.is(b, "array") && (b = Array.prototype.splice.call(arguments, 0, arguments.length));
        var e = new gb(b);
        this.__set__ && this.__set__.push(e);
        e.paper = this;
        e.type = "set";
        return e;
    };
    A.setStart = function(b) {
        this.__set__ = b || this.set();
    };
    A.setFinish = function(b) {
        b = this.__set__;
        delete this.__set__;
        return b;
    };
    A.setSize = function(b, e) {
        return c._engine.setSize.call(this, b, e);
    };
    A.setViewBox = function(b, e, d, f, g) {
        return c._engine.setViewBox.call(this, b, e, d, f, g);
    };
    A.top = A.bottom = null;
    A.raphael = c;
    A.getElementByPoint = function(b, c) {
        var e, d, f = this.canvas,
            g = D.doc.elementFromPoint(b, c);
        if (D.win.opera && "svg" == g.tagName) {
            d = f.getBoundingClientRect();
            e = f.ownerDocument;
            var h = e.body,
                k = e.documentElement;
            e = d.top + (D.win.pageYOffset || k.scrollTop || h.scrollTop) - (k.clientTop || h.clientTop || 0);
            d = d.left + (D.win.pageXOffset || k.scrollLeft || h.scrollLeft) - (k.clientLeft || h.clientLeft || 0);
            h = f.createSVGRect();
            h.x = b - d;
            h.y = c - e;
            h.width = h.height = 1;
            e = f.getIntersectionList(h, null);
            e.length && (g = e[e.length - 1]);
        }
        if (!g) {
            return null;
        }
        for (; g.parentNode && g != f.parentNode && !g.raphael;) {
            g = g.parentNode;
        }
        g == this.canvas.parentNode && (g = f);
        return g = g && g.raphael ? this.getById(g.raphaelid) : null;
    };
    A.getElementsByBBox = function(b) {
        var e = this.set();
        this.forEach(function(d) {
            c.isBBoxIntersect(d.getBBox(), b) && e.push(d);
        });
        return e;
    };
    A.getById = function(b) {
        for (var c = this.bottom; c;) {
            if (c.id == b) {
                return c;
            }
            c = c.next;
        }
        return null;
    };
    A.forEach = function(b, c) {
        for (var e = this.bottom; e && !1 !== b.call(c, e);) {
            e = e.next;
        }
        return this;
    };
    A.getElementsByPoint = function(b, c) {
        var e = this.set();
        this.forEach(function(d) {
            d.isPointInside(b, c) && e.push(d);
        });
        return e;
    };
    ra.isPointInside = function(b, e) {
        var d = this.realPath = this.realPath || ga[this.type](this);
        return c.isPointInsidePath(d, b, e);
    };
    ra.getBBox = function(b) {
        if (this.removed) {
            return {};
        }
        var c = this._;
        if (b) {
            if (c.dirty || !c.bboxwt) {
                this.realPath = ga[this.type](this), c.bboxwt = La(this.realPath), c.bboxwt.toString = t, c.dirty = 0;
            }
            return c.bboxwt;
        }
        if (c.dirty || c.dirtyT || !c.bbox) {
            if (c.dirty || !this.realPath) {
                c.bboxwt = 0, this.realPath = ga[this.type](this);
            }
            c.bbox = La(Y(this.realPath, this.matrix));
            c.bbox.toString = t;
            c.dirty = c.dirtyT = 0;
        }
        return c.bbox;
    };
    ra.clone = function() {
        if (this.removed) {
            return null;
        }
        var b = this.paper[this.type]().attr(this.attr());
        this.__set__ && this.__set__.push(b);
        return b;
    };
    ra.glow = function(b) {
        if ("text" == this.type) {
            return null;
        }
        b = b || {};
        var c = (b.width || 10) + (+this.attr("stroke-width") || 1),
            e = b.fill || !1,
            d = b.opacity || 0.5,
            f = b.offsetx || 0,
            g = b.offsety || 0;
        b = b.color || "#000";
        for (var h = c / 2, k = this.paper, p = k.set(), m = this.realPath || ga[this.type](this), m = this.matrix ? Y(m, this.matrix) : m, s = 1; s < h + 1; s++) {
            p.push(k.path(m).attr({
                stroke: b,
                fill: e ? b : "none",
                "stroke-linejoin": "round",
                "stroke-linecap": "round",
                "stroke-width": +(c / h * s).toFixed(3),
                opacity: +(d / h).toFixed(3)
            }));
        }
        return p.insertBefore(this).translate(f, g);
    };
    var ib = function(b, e, d, f, g, h, k, p, s) {
            return null == s ? m(b, e, d, f, g, h, k, p) : c.findDotsAtSegment(b, e, d, f, g, h, k, p, q(b, e, d, f, g, h, k, p, s));
        }, jb = function(b, e) {
            return function(d, f, g) {
                d = Ra(d);
                for (var h, k, p, m, s = "", n = {}, r = 0, q = 0, u = d.length; q < u; q++) {
                    p = d[q];
                    if ("M" == p[0]) {
                        h = +p[1], k = +p[2];
                    } else {
                        m = ib(h, k, p[1], p[2], p[3], p[4], p[5], p[6]);
                        if (r + m > f) {
                            if (e && !n.start) {
                                h = ib(h, k, p[1], p[2], p[3], p[4], p[5], p[6], f - r);
                                s += ["C" + h.start.x, h.start.y, h.m.x, h.m.y, h.x, h.y];
                                if (g) {
                                    return s;
                                }
                                n.start = s;
                                s = ["M" + h.x, h.y + "C" + h.n.x, h.n.y, h.end.x, h.end.y, p[5], p[6]].join();
                                r += m;
                                h = +p[5];
                                k = +p[6];
                                continue;
                            }
                            if (!b && !e) {
                                return h = ib(h, k, p[1], p[2], p[3], p[4], p[5], p[6], f - r), {
                                    x: h.x,
                                    y: h.y,
                                    alpha: h.alpha
                                };
                            }
                        }
                        r += m;
                        h = +p[5];
                        k = +p[6];
                    }
                    s += p.shift() + p;
                }
                n.end = s;
                h = b ? r : e ? n : c.findDotsAtSegment(h, k, p[0], p[1], p[2], p[3], p[4], p[5], 1);
                h.alpha && (h = {
                    x: h.x,
                    y: h.y,
                    alpha: h.alpha
                });
                return h;
            };
        }, ub = jb(1),
        vb = jb(),
        pb = jb(0, 1);
    c.getTotalLength = ub;
    c.getPointAtLength = vb;
    c.getSubpath = function(b, c, e) {
        if (1E-6 > this.getTotalLength(b) - e) {
            return pb(b, c).end;
        }
        b = pb(b, e, 1);
        return c ? pb(b, c).end : b;
    };
    ra.getTotalLength = function() {
        if ("path" == this.type) {
            return this.node.getTotalLength ? this.node.getTotalLength() : ub(this.attrs.path);
        }
    };
    ra.getPointAtLength = function(b) {
        if ("path" == this.type) {
            return vb(this.attrs.path, b);
        }
    };
    ra.getSubpath = function(b, e) {
        if ("path" == this.type) {
            return c.getSubpath(this.attrs.path, b, e);
        }
    };
    var Da = c.easing_formulas = {
        linear: function(b) {
            return b;
        },
        "<": function(b) {
            return Z(b, 1.7);
        },
        ">": function(b) {
            return Z(b, 0.48);
        },
        "<>": function(b) {
            var c = 0.48 - b / 1.04,
                e = P.sqrt(0.1734 + c * c);
            b = e - c;
            b = Z(U(b), 1 / 3) * (0 > b ? -1 : 1);
            c = -e - c;
            c = Z(U(c), 1 / 3) * (0 > c ? -1 : 1);
            b = b + c + 0.5;
            return 3 * (1 - b) * b * b + b * b * b;
        },
        backIn: function(b) {
            return b * b * (2.70158 * b - 1.70158);
        },
        backOut: function(b) {
            b -= 1;
            return b * b * (2.70158 * b + 1.70158) + 1;
        },
        elastic: function(b) {
            return b == !! b ? b : Z(2, -10 * b) * P.sin(2 * (b - 0.075) * L / 0.3) + 1;
        },
        bounce: function(b) {
            b < 1 / 2.75 ? b *= 7.5625 * b : b < 2 / 2.75 ? (b -= 1.5 / 2.75, b = 7.5625 * b * b + 0.75) : b < 2.5 / 2.75 ? (b -= 2.25 / 2.75, b = 7.5625 * b * b + 0.9375) : (b -= 2.625 / 2.75, b = 7.5625 * b * b + 0.984375);
            return b;
        }
    };
    Da.easeIn = Da["ease-in"] = Da["<"];
    Da.easeOut = Da["ease-out"] = Da[">"];
    Da.easeInOut = Da["ease-in-out"] = Da["<>"];
    Da["back-in"] = Da.backIn;
    Da["back-out"] = Da.backOut;
    var pa = [],
        tb = b.requestAnimationFrame || b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame || b.oRequestAnimationFrame || b.msRequestAnimationFrame || function(b) {
            setTimeout(b, 16);
        }, ob = function() {
            for (var b = +new Date, e = 0; e < pa.length; e++) {
                var f = pa[e];
                if (!f.el.removed && !f.paused) {
                    var g = b - f.start,
                        h = f.ms,
                        k = f.easing,
                        p = f.from,
                        m = f.diff,
                        s = f.to,
                        n = f.el,
                        r = {}, q, C = {}, x;
                    f.initstatus ? (g = (f.initstatus * f.anim.top - f.prev) / (f.percent - f.prev) * h, f.status = f.initstatus, delete f.initstatus, f.stop && pa.splice(e--, 1)) : f.status = (f.prev + g / h * (f.percent - f.prev)) / f.anim.top;
                    if (!(0 > g)) {
                        if (g < h) {
                            var v = k(g / h),
                                w;
                            for (w in p) {
                                if (p[y](w)) {
                                    switch (la[w]) {
                                        case K:
                                            q = +p[w] + v * h * m[w];
                                            break;
                                        case "colour":
                                            q = "rgb(" + [qb(oa(p[w].r + v * h * m[w].r)), qb(oa(p[w].g + v * h * m[w].g)), qb(oa(p[w].b + v * h * m[w].b))].join() + ")";
                                            break;
                                        case "path":
                                            q = [];
                                            g = 0;
                                            for (k = p[w].length; g < k; g++) {
                                                q[g] = [p[w][g][0]];
                                                s = 1;
                                                for (C = p[w][g].length; s < C; s++) {
                                                    q[g][s] = +p[w][g][s] + v * h * m[w][g][s];
                                                }
                                                q[g] = q[g].join(da);
                                            }
                                            q = q.join(da);
                                            break;
                                        case "transform":
                                            if (m[w].real) {
                                                for (q = [], g = 0, k = p[w].length; g < k; g++) {
                                                    for (q[g] = [p[w][g][0]], s = 1, C = p[w][g].length; s < C; s++) {
                                                        q[g][s] = p[w][g][s] + v * h * m[w][g][s];
                                                    }
                                                }
                                            } else {
                                                q = function(b) {
                                                    return +p[w][b] + v * h * m[w][b];
                                                }, q = [
                                                    ["m", q(0), q(1), q(2), q(3), q(4), q(5)]
                                                ];
                                            }
                                            break;
                                        case "csv":
                                            if ("clip-rect" == w) {
                                                for (q = [], g = 4; g--;) {
                                                    q[g] = +p[w][g] + v * h * m[w][g];
                                                }
                                            }
                                            break;
                                        default:
                                            for (k = [][H](p[w]), q = [], g = n.paper.customAttributes[w].length; g--;) {
                                                q[g] = +k[g] + v * h * m[w][g];
                                            };
                                    }
                                    r[w] = q;
                                }
                            }
                            n.attr(r);
                            (function(b, c, e) {
                                setTimeout(function() {
                                    d("raphael.anim.frame." + b, c, e);
                                });
                            })(n.id, n, f.anim);
                        } else {
                            (function(b, e, f) {
                                setTimeout(function() {
                                    d("raphael.anim.frame." + e.id, e, f);
                                    d("raphael.anim.finish." + e.id, e, f);
                                    c.is(b, "function") && b.call(e);
                                });
                            })(f.callback, n, f.anim);
                            n.attr(s);
                            pa.splice(e--, 1);
                            if (1 < f.repeat && !f.next) {
                                for (x in s) {
                                    s[y](x) && (C[x] = f.totalOrigin[x]);
                                }
                                f.el.attr(C);
                                u(f.anim, f.el, f.anim.percents[0], null, f.totalOrigin, f.repeat - 1);
                            }
                            f.next && !f.stop && u(f.anim, f.el, f.next, null, f.totalOrigin, f.repeat);
                        }
                    }
                }
            }
            c.svg && n && n.paper && n.paper.safari();
            pa.length && tb(ob);
        }, qb = function(b) {
            return 255 < b ? 255 : 0 > b ? 0 : b;
        };
    ra.animateWith = function(b, d, f, g, h, k) {
        if (this.removed) {
            return k && k.call(this), this;
        }
        f = f instanceof e ? f : c.animation(f, g, h, k);
        u(f, this, f.percents[0], null, this.attr());
        f = 0;
        for (g = pa.length; f < g; f++) {
            if (pa[f].anim == d && pa[f].el == b) {
                pa[g - 1].start = pa[f].start;
                break;
            }
        }
        return this;
    };
    ra.onAnimation = function(b) {
        b ? d.on("raphael.anim.frame." + this.id, b) : d.unbind("raphael.anim.frame." + this.id);
        return this;
    };
    e.prototype.delay = function(b) {
        var c = new e(this.anim, this.ms);
        c.times = this.times;
        c.del = +b || 0;
        return c;
    };
    e.prototype.repeat = function(b) {
        var c = new e(this.anim, this.ms);
        c.del = this.del;
        c.times = P.floor(O(b, 0)) || 1;
        return c;
    };
    c.animation = function(b, d, f, g) {
        if (b instanceof e) {
            return b;
        }
        if (c.is(f, "function") || !f) {
            g = g || f || null, f = null;
        }
        b = Object(b);
        d = +d || 0;
        var h = {}, k, p;
        for (p in b) {
            b[y](p) && z(p) != p && z(p) + "%" != p && (k = !0, h[p] = b[p]);
        }
        return k ? (f && (h.easing = f), g && (h.callback = g), new e({
            100: h
        }, d)) : new e(b, d);
    };
    ra.animate = function(b, d, f, g) {
        if (this.removed) {
            return g && g.call(this), this;
        }
        b = b instanceof e ? b : c.animation(b, d, f, g);
        u(b, this, b.percents[0], null, this.attr());
        return this;
    };
    ra.setTime = function(b, c) {
        b && null != c && this.status(b, N(c, b.ms) / b.ms);
        return this;
    };
    ra.status = function(b, c) {
        var e = [],
            d = 0,
            f, g;
        if (null != c) {
            return u(b, this, -1, N(c, 1)), this;
        }
        for (f = pa.length; d < f; d++) {
            if (g = pa[d], g.el.id == this.id && (!b || g.anim == b)) {
                if (b) {
                    return g.status;
                }
                e.push({
                    anim: g.anim,
                    status: g.status
                });
            }
        }
        return b ? 0 : e;
    };
    ra.pause = function(b) {
        for (var c = 0; c < pa.length; c++) {
            pa[c].el.id != this.id || b && pa[c].anim != b || !1 === d("raphael.anim.pause." + this.id, this, pa[c].anim) || (pa[c].paused = !0);
        }
        return this;
    };
    ra.resume = function(b) {
        for (var c = 0; c < pa.length; c++) {
            if (pa[c].el.id == this.id && (!b || pa[c].anim == b)) {
                var e = pa[c];
                !1 !== d("raphael.anim.resume." + this.id, this, e.anim) && (delete e.paused, this.status(e.anim, e.status));
            }
        }
        return this;
    };
    ra.stop = function(b) {
        for (var c = 0; c < pa.length; c++) {
            pa[c].el.id != this.id || b && pa[c].anim != b || !1 !== d("raphael.anim.stop." + this.id, this, pa[c].anim) && pa.splice(c--, 1);
        }
        return this;
    };
    d.on("raphael.remove", s);
    d.on("raphael.clear", s);
    ra.toString = function() {
        return "Rapha\u00ebl\u2019s object";
    };
    var gb = function(b) {
        this.items = [];
        this.length = 0;
        this.type = "set";
        if (b) {
            for (var c = 0, e = b.length; c < e; c++) {
                !b[c] || b[c].constructor != ra.constructor && b[c].constructor != gb || (this[this.items.length] = this.items[this.items.length] = b[c], this.length++);
            }
        }
    }, Aa = gb.prototype;
    Aa.push = function() {
        for (var b, c, e = 0, d = arguments.length; e < d; e++) {
            !(b = arguments[e]) || b.constructor != ra.constructor && b.constructor != gb || (c = this.items.length, this[c] = this.items[c] = b, this.length++);
        }
        return this;
    };
    Aa.pop = function() {
        this.length && delete this[this.length--];
        return this.items.pop();
    };
    Aa.forEach = function(b, c) {
        for (var e = 0, d = this.items.length; e < d && !1 !== b.call(c, this.items[e], e); e++) {}
        return this;
    };
    for (var rb in ra) {
        ra[y](rb) && (Aa[rb] = function(b) {
            return function() {
                var c = arguments;
                return this.forEach(function(e) {
                    e[b][G](e, c);
                });
            };
        }(rb));
    }
    Aa.attr = function(b, e) {
        if (b && c.is(b, T) && c.is(b[0], "object")) {
            for (var d = 0, f = b.length; d < f; d++) {
                this.items[d].attr(b[d]);
            }
        } else {
            for (d = 0, f = this.items.length; d < f; d++) {
                this.items[d].attr(b, e);
            }
        }
        return this;
    };
    Aa.clear = function() {
        for (; this.length;) {
            this.pop();
        }
    };
    Aa.splice = function(b, c, e) {
        b = 0 > b ? O(this.length + b, 0) : b;
        c = O(0, N(this.length - b, c));
        var d = [],
            f = [],
            g = [],
            h;
        for (h = 2; h < arguments.length; h++) {
            g.push(arguments[h]);
        }
        for (h = 0; h < c; h++) {
            f.push(this[b + h]);
        }
        for (; h < this.length - b; h++) {
            d.push(this[b + h]);
        }
        var k = g.length;
        for (h = 0; h < k + d.length; h++) {
            this.items[b + h] = this[b + h] = h < k ? g[h] : d[h - k];
        }
        for (h = this.items.length = this.length -= c - k; this[h];) {
            delete this[h++];
        }
        return new gb(f);
    };
    Aa.exclude = function(b) {
        for (var c = 0, e = this.length; c < e; c++) {
            if (this[c] == b) {
                return this.splice(c, 1), !0;
            }
        }
    };
    Aa.animate = function(b, e, d, f) {
        !c.is(d, "function") && d || (f = d || null);
        var g = this.items.length,
            h = g,
            k = this,
            p;
        if (!g) {
            return this;
        }
        f && (p = function() {
            !--g && f.call(k);
        });
        d = c.is(d, "string") ? d : p;
        e = c.animation(b, e, d, p);
        for (b = this.items[--h].animate(e); h--;) {
            this.items[h] && !this.items[h].removed && this.items[h].animateWith(b, e, e);
        }
        return this;
    };
    Aa.insertAfter = function(b) {
        for (var c = this.items.length; c--;) {
            this.items[c].insertAfter(b);
        }
        return this;
    };
    Aa.getBBox = function() {
        for (var b = [], c = [], e = [], d = [], f = this.items.length; f--;) {
            if (!this.items[f].removed) {
                var g = this.items[f].getBBox();
                b.push(g.x);
                c.push(g.y);
                e.push(g.x + g.width);
                d.push(g.y + g.height);
            }
        }
        b = N[G](0, b);
        c = N[G](0, c);
        e = O[G](0, e);
        d = O[G](0, d);
        return {
            x: b,
            y: c,
            x2: e,
            y2: d,
            width: e - b,
            height: d - c
        };
    };
    Aa.clone = function(b) {
        b = this.paper.set();
        for (var c = 0, e = this.items.length; c < e; c++) {
            b.push(this.items[c].clone());
        }
        return b;
    };
    Aa.toString = function() {
        return "Rapha\u00ebl\u2018s set";
    };
    Aa.glow = function(b) {
        var c = this.paper.set();
        this.forEach(function(e, d) {
            var f = e.glow(b);
            null != f && f.forEach(function(b, e) {
                c.push(b);
            });
        });
        return c;
    };
    c.registerFont = function(b) {
        // debugger;
        if (!b.face) {
            return b;
        }
        this.fonts = this.fonts || {};
        var c = {
                w: b.w,
                face: {},
                glyphs: {}
            }, e = b.face["font-family"],
            d;
        for (d in b.face) {
            b.face[y](d) && (c.face[d] = b.face[d]);
        }
        //ZYF
//        this.fonts[e] ? this.fonts[e].push(c) : this.fonts[e] = [c];
        this.fonts[e] = [c];

        if (!b.svg) {
            c.face["units-per-em"] = ka(b.face["units-per-em"], 10);
            for (var f in b.glyphs) {
                if (b.glyphs[y](f) && (e = b.glyphs[f], c.glyphs[f] = {
                    w: e.w,
                    k: {},
                    d: e.d && "M" + e.d.replace(/[mlcxtrv]/g, function(b) {
                        return {
                            l: "L",
                            c: "C",
                            x: "z",
                            t: "m",
                            r: "l",
                            v: "c"
                        }[b] || "M";
                    }) + "z"
                }, e.k)) {
                    for (var g in e.k) {
                        e[y](g) && (c.glyphs[f].k[g] = e.k[g]);
                    }
                }
            }
        }
        return b;
    };
    A.getFont = function(b, e, d, f) {
        f = f || "normal";
        d = d || "normal";
        e = +e || {
            normal: 400,
            bold: 700,
            lighter: 300,
            bolder: 800
        }[e] || 400;
        if (c.fonts) {
            var g = c.fonts[b];
            if (!g) {
                b = RegExp("(^|\\s)" + b.replace(/[^\w\d\s+!~.:_-]/g, "") + "(\\s|$)", "i");
                for (var h in c.fonts) {
                    if (c.fonts[y](h) && b.test(h)) {
                        g = c.fonts[h];
                        break;
                    }
                }
            }
            var k;
            if (g) {
                for (h = 0, b = g.length; h < b && (k = g[h], k.face["font-weight"] != e || k.face["font-style"] != d && k.face["font-style"] || k.face["font-stretch"] != f); h++) {}
                g.splice(0, g.length-1);
                k = g[0];
            }
            return k;
        }
    };
    A.print = function(b, e, d, f, g, h, k, p) {
        h = h || "middle";
        k = O(N(k || 0, 1), -1);
        p = O(N(p || 1, 3), 1);
        d = W(d)[fa]("");
        var m = 0,
            s = 0,
            n = "";
        c.is(f, "string") && (f = this.getFont(f));
        if (f) {
            g = (g || 16) / f.face["units-per-em"];
            var q = f.face.bbox[fa](v),
                r = +q[0],
                u = q[3] - q[1],
                C = 0;
            h = +q[1] + ("baseline" == h ? u + +f.face.descent : u / 2);
            for (var q = 0, x = d.length; q < x; q++) {
                if ("\n" == d[q]) {
                    s = ba = m = 0, C += u * p;
                } else {
                    var w = s && f.glyphs[d[q - 1]] || {}, ba = f.glyphs[d[q]],
                        m = m + (s ? (w.w || f.w) + (w.k && w.k[d[q]] || 0) + f.w * k : 0),
                        s = 1
                }
                ba && ba.d && (n += c.transformPath(ba.d, ["t", m * g, C * g, "s", g, g, r, h, "t", (b - r) / g, (e - h) / g]));
            }
        }
        return this.path(n).attr({
            fill: "#000",
            stroke: "none"
        });
    };
    A.printBb = function(b, e, d, f, g, h, k, p) {
        h = h || "middle";
        k = O(N(k || 0, 1), -1);
        p = O(N(p || 1, 3), 1);
        d = W(d)[fa]("");
        var m = 0,
            s = 0,
            n = "";
        c.is(f, "string") && (f = this.getFont(f));
        if (f) {
            g = (g || 16) / f.face["units-per-em"];
            var q = f.face.bbox[fa](v),
                r = +q[0],
                u = q[3] - q[1],
                C = 0;
            h = +q[1] + ("baseline" == h ? u + +f.face.descent : u / 2);
            for (var q = 0, x = d.length; q < x; q++) {
                if ("\n" == d[q]) {
                    s = ba = m = 0, C += u * p;
                } else {
                    var w = s && f.glyphs[d[q - 1]] || {}, ba = f.glyphs[d[q]],
                        m = m + (s ? (w.w || f.w) + (w.k && w.k[d[q]] || 0) + f.w * k : 0),
                        s = 1
                }
                ba && ba.d && (n += c.transformPath(ba.d, ["t", m * g, C * g, "s", g, g, r, h, "t", (b - r) / g, (e - h) / g]));
            }
        }
        return this.pathBb(n).attr({
            fill: "#000",
            stroke: "none"
        });
    };
    A.add = function(b) {
        if (c.is(b, "array")) {
            for (var e = this.set(), d = 0, f = b.length, g; d < f; d++) {
                g = b[d] || {}, x[y](g.type) && e.push(this[g.type]().attr(g));
            }
        }
        return e;
    };
    c.format = function(b, e) {
        var d = c.is(e, T) ? [0][H](e) : arguments;
        b && c.is(b, "string") && d.length - 1 && (b = b.replace(B, function(b, c) {
            return null == d[++c] ? "" : d[c];
        }));
        return b || "";
    };
    c.fullfill = function() {
        var b = /\{([^\}]+)\}/g,
            c = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
            e = function(b, e, d) {
                var f = d;
                e.replace(c, function(b, c, e, d, g) {
                    c = c || d;
                    f && (c in f && (f = f[c]), "function" == typeof f && g && (f = f()));
                });
                return f = (null == f || f == d ? b : f) + "";
            };
        return function(c, d) {
            return String(c).replace(b, function(b, c) {
                return e(b, c, d);
            });
        };
    }();
    c.ninja = function() {
        V ? D.win.Raphael = ca : delete Raphael;
        return c;
    };
    c.st = Aa;
    (function(b, e, d) {
        function f() {
            /in/.test(b.readyState) ? setTimeout(f, 9) : c.eve("raphael.DOMload");
        }
        null == b.readyState && b.addEventListener && (b.addEventListener(e, d = function() {
            b.removeEventListener(e, d, !1);
            b.readyState = "complete";
        }, !1), b.readyState = "loading");
        f();
    })(document, "DOMContentLoaded");
    d.on("raphael.DOMload", function() {
        w = !0;
    });
    (function() {
        if (c.svg) {
            var b = String,
                e = parseFloat,
                d = parseInt,
                f = Math,
                g = f.max,
                h = f.abs,
                k = f.pow,
                p = /[, ]+/,
                m = c.eve,
                s = {
                    block: "M5,0 0,2.5 5,5z",
                    classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
                    diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
                    open: "M6,1 1,3.5 6,6",
                    oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
                }, n = {};
            c.toString = function() {
                return "您的浏览器支持 SVG.\n可以运行 Raphael " + this.version;
            };
            var q = function(e, d) {
                if (d) {
                    "string" == typeof e && (e = q(e));
                    for (var f in d) {

                        d.hasOwnProperty(f) && ("xlink:" == f.substring(0, 6) ? e.setAttributeNS("http://www.w3.org/1999/xlink", f.substring(6), b(d[f])) : "xmlns" == f ? e.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg") : "xmlns:xlink" == f ? e.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink") : e.setAttribute(f, b(d[f])));
                    }
                } else {
                    e = c._g.doc.createElementNS("http://www.w3.org/2000/svg", e), e.style && (e.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
                }
                return e;
            }, r = function(d, p) {
                var m = "linear",
                    s = d.id + p,
                    n = 0.5,
                    r = 0.5,
                    u = d.node,
                    C = d.paper,
                    x = u.style,
                    w = c._g.doc.getElementById(s);
                if (!w) {
                    p = b(p).replace(c._radial_gradient, function(b, c, d) {
                        m = "radial";
                        c && d && (n = e(c), r = e(d), b = 2 * (0.5 < r) - 1, 0.25 < k(n - 0.5, 2) + k(r - 0.5, 2) && (r = f.sqrt(0.25 - k(n - 0.5, 2)) * b + 0.5) && 0.5 != r && (r = r.toFixed(5) - 1E-5 * b));
                        return "";
                    });
                    p = p.split(/\s*\-\s*/);
                    if ("linear" == m) {
                        w = p.shift();
                        w = -e(w);
                        if (isNaN(w)) {
                            return null;
                        }
                        var v = [0, 0, f.cos(c.rad(w)), f.sin(c.rad(w))],
                            w = 1 / (g(h(v[2]), h(v[3])) || 1);
                        v[2] *= w;
                        v[3] *= w;
                        0 > v[2] && (v[0] = -v[2], v[2] = 0);
                        0 > v[3] && (v[1] = -v[3], v[3] = 0);
                    }
                    var ba = c._parseDots(p);
                    if (!ba) {
                        return null;
                    }
                    s = s.replace(/[\(\)\s,\xb0#]/g, "_");
                    d.gradient && s != d.gradient.id && (C.defs.removeChild(d.gradient), delete d.gradient);
                    if (!d.gradient) {
                        for (w = q(m + "Gradient", {
                            id: s
                        }), d.gradient = w, q(w, "radial" == m ? {
                            fx: n,
                            fy: r
                        } : {
                            x1: v[0],
                            y1: v[1],
                            x2: v[2],
                            y2: v[3],
                            gradientTransform: d.matrix.invert()
                        }), C.defs.appendChild(w), C = 0, v = ba.length; C < v; C++) {
                            w.appendChild(q("stop", {
                                offset: ba[C].offset ? ba[C].offset : C ? "100%" : "0%",
                                "stop-color": ba[C].color || "#fff"
                            }));
                        }
                    }
                }
                q(u, {
                    fill: "url(#" + s + ")",
                    opacity: 1,
                    "fill-opacity": 1
                });
                x.fill = "";
                x.opacity = 1;
                return x.fillOpacity = 1;
            }, u = function(b) {
                var c = b.getBBox(1);
                q(b.pattern, {
                    patternTransform: b.matrix.invert() + " translate(" + c.x + "," + c.y + ")"
                });
            }, C = function(e, d, f) {
                if ("path" == e.type) {
                    for (var g = b(d).toLowerCase().split("-"), h = e.paper, k = f ? "end" : "start", p = e.node, m = e.attrs, r = m["stroke-width"], u = g.length, C = "classic", w, x, v = 3, ba = 3, y = 5; u--;) {
                        switch (g[u]) {
                            case "block":
                                ;
                            case "classic":
                                ;
                            case "oval":
                                ;
                            case "diamond":
                                ;
                            case "open":
                                ;
                            case "none":
                                C = g[u];
                                break;
                            case "wide":
                                ba = 5;
                                break;
                            case "narrow":
                                ba = 2;
                                break;
                            case "long":
                                v = 5;
                                break;
                            case "short":
                                v = 2;
                        }
                    }
                    "open" == C ? (v += 2, ba += 2, y += 2, w = 1, x = f ? 4 : 1, g = {
                        fill: "none",
                        stroke: m.stroke
                    }) : (x = w = v / 2, g = {
                        fill: m.stroke,
                        stroke: "none"
                    });
                    e._.arrows ? f ? (e._.arrows.endPath && n[e._.arrows.endPath]--, e._.arrows.endMarker && n[e._.arrows.endMarker]--) : (e._.arrows.startPath && n[e._.arrows.startPath]--, e._.arrows.startMarker && n[e._.arrows.startMarker]--) : e._.arrows = {};
                    if ("none" != C) {
                        var u = "raphael-marker-" + C,
                            t = "raphael-marker-" + k + C + v + ba;
                        c._g.doc.getElementById(u) ? n[u]++ : (h.defs.appendChild(q(q("path"), {
                            "stroke-linecap": "round",
                            d: s[C],
                            id: u
                        })), n[u] = 1);
                        var ga = c._g.doc.getElementById(t);
                        ga ? (n[t]++, v = ga.getElementsByTagName("use")[0]) : (ga = q(q("marker"), {
                            id: t,
                            markerHeight: ba,
                            markerWidth: v,
                            orient: "auto",
                            refX: x,
                            refY: ba / 2
                        }), v = q(q("use"), {
                            "xlink:href": "#" + u,
                            transform: (f ? "rotate(180 " + v / 2 + " " + ba / 2 + ") " : "") + "scale(" + v / y + "," + ba / y + ")",
                            "stroke-width": (1 / ((v / y + ba / y) / 2)).toFixed(4)
                        }), ga.appendChild(v), h.defs.appendChild(ga), n[t] = 1);
                        q(v, g);
                        h = w * ("diamond" != C && "oval" != C);
                        f ? (f = e._.arrows.startdx * r || 0, r = c.getTotalLength(m.path) - h * r) : (f = h * r, r = c.getTotalLength(m.path) - (e._.arrows.enddx * r || 0));
                        g = {};
                        g["marker-" + k] = "url(#" + t + ")";
                        if (r || f) {
                            g.d = c.getSubpath(m.path, f, r);
                        }
                        q(p, g);
                        e._.arrows[k + "Path"] = u;
                        e._.arrows[k + "Marker"] = t;
                        e._.arrows[k + "dx"] = h;
                        e._.arrows[k + "Type"] = C;
                        e._.arrows[k + "String"] = d;
                    } else {
                        f ? (f = e._.arrows.startdx * r || 0, r = c.getTotalLength(m.path) - f) : (f = 0, r = c.getTotalLength(m.path) - (e._.arrows.enddx * r || 0)), e._.arrows[k + "Path"] && q(p, {
                            d: c.getSubpath(m.path, f, r)
                        }), delete e._.arrows[k + "Path"], delete e._.arrows[k + "Marker"], delete e._.arrows[k + "dx"], delete e._.arrows[k + "Type"], delete e._.arrows[k + "String"];
                    }
                    for (g in n) {
                        n.hasOwnProperty(g) && !n[g] && (e = c._g.doc.getElementById(g)) && e.parentNode.removeChild(e);
                    }
                }
            }, x = {
                "": [0],
                none: [0],
                "-": [3, 1],
                ".": [1, 1],
                "-.": [3, 1, 1, 1],
                "-..": [3, 1, 1, 1, 1, 1],
                ". ": [1, 3],
                "- ": [4, 3],
                "--": [8, 3],
                "- .": [4, 3, 1, 3],
                "--.": [8, 3, 1, 3],
                "--..": [8, 3, 1, 3, 1, 3]
            }, w = function(c, e, d) {
                if (e = x[b(e).toLowerCase()]) {
                    var f = c.attrs["stroke-width"] || "1";
                    d = {
                        round: f,
                        square: f,
                        butt: 0
                    }[c.attrs["stroke-linecap"] || d["stroke-linecap"]] || 0;
                    for (var g = [], h = e.length; h--;) {
                        g[h] = e[h] * f + (h % 2 ? 1 : -1) * d;
                    }
                    q(c.node, {
                        "stroke-dasharray": g.join(",")
                    });
                }
            }, v = function(e, f) {
                var k = e.node,
                    m = e.attrs,
                    s = k.style.visibility;
                k.style.visibility = "hidden";
                for (var n in f) {
                    if (f.hasOwnProperty(n) && c._availableAttrs.hasOwnProperty(n)) {
                        var v = f[n];
                        m[n] = v;
                        switch (n) {
                            case "blur":
                                e.blur(v);
                                break;
                            case "href":
                                ;
                            case "title":
                                ;
                            case "target":
                                var x = k.parentNode;
                                if ("a" != x.tagName.toLowerCase()) {
                                    var y = q("a");
                                    x.insertBefore(y, k);
                                    y.appendChild(k);
                                    x = y;
                                }
                                "target" == n ? x.setAttributeNS("http://www.w3.org/1999/xlink", "show", "blank" == v ? "new" : v) : x.setAttributeNS("http://www.w3.org/1999/xlink", n, v);
                                break;
                            case "cursor":
                                k.style.cursor = v;
                                break;
                            case "transform":
                                e.transform(v);
                                break;
                            case "arrow-start":
                                C(e, v);
                                break;
                            case "arrow-end":
                                C(e, v, 1);
                                break;
                            case "clip-rect":
                                x = b(v).split(p);
                                if (4 == x.length) {
                                    e.clip && e.clip.parentNode.parentNode.removeChild(e.clip.parentNode);
                                    var y = q("clipPath"),
                                        t = q("rect");
                                    y.id = c.createUUID();
                                    q(t, {
                                        x: x[0],
                                        y: x[1],
                                        width: x[2],
                                        height: x[3]
                                    });
                                    y.appendChild(t);
                                    e.paper.defs.appendChild(y);
                                    q(k, {
                                        "clip-path": "url(#" + y.id + ")"
                                    });
                                    e.clip = t;
                                }!v && (v = k.getAttribute("clip-path")) && ((v = c._g.doc.getElementById(v.replace(/(^url\(#|\)$)/g, ""))) && v.parentNode.removeChild(v), q(k, {
                                "clip-path": ""
                            }), delete e.clip);
                                break;
                            case "path":
                                "path" == e.type && (q(k, {
                                    d: v ? m.path = c._pathToAbsolute(v) : "M0,0"
                                }), e._.dirty = 1, e._.arrows && ("startString" in e._.arrows && C(e, e._.arrows.startString), "endString" in e._.arrows && C(e, e._.arrows.endString, 1)));
                                break;
                            case "width":
                                if (k.setAttribute(n, v), e._.dirty = 1, m.fx) {
                                    n = "x", v = m.x;
                                } else {
                                    break;
                                };
                            case "x":
                                m.fx && (v = -m.x - (m.width || 0));
                            case "rx":
                                if ("rx" == n && "rect" == e.type) {
                                    break;
                                };
                            case "cx":
                                k.setAttribute(n, v);
                                e.pattern && u(e);
                                e._.dirty = 1;
                                break;
                            case "height":
                                if (k.setAttribute(n, v), e._.dirty = 1, m.fy) {
                                    n = "y", v = m.y;
                                } else {
                                    break;
                                };
                            case "y":
                                m.fy && (v = -m.y - (m.height || 0));
                            case "ry":
                                if ("ry" == n && "rect" == e.type) {
                                    break;
                                };
                            case "cy":
                                k.setAttribute(n, v);
                                e.pattern && u(e);
                                e._.dirty = 1;
                                break;
                            case "r":
                                "rect" == e.type ? q(k, {
                                    rx: v,
                                    ry: v
                                }) : k.setAttribute(n, v);
                                e._.dirty = 1;
                                break;
                            case "src":
                                "image" == e.type && k.setAttributeNS("http://www.w3.org/1999/xlink", "href", v);
                                break;
                            case "stroke-width":
                                if (1 != e._.sx || 1 != e._.sy) {
                                    v /= g(h(e._.sx), h(e._.sy)) || 1;
                                }
                                e.paper._vbSize && (v *= e.paper._vbSize);
                                k.setAttribute(n, v);
                                m["stroke-dasharray"] && w(e, m["stroke-dasharray"], f);
                                e._.arrows && ("startString" in e._.arrows && C(e, e._.arrows.startString), "endString" in e._.arrows && C(e, e._.arrows.endString, 1));
                                break;
                            case "stroke-dasharray":
                                w(e, v, f);
                                break;
                            case "fill":
                                var ga = b(v).match(c._ISURL);
                                if (ga) {
                                    var y = q("pattern"),
                                        B = q("image");
                                    y.id = c.createUUID();
                                    q(y, {
                                        x: 0,
                                        y: 0,
                                        patternUnits: "userSpaceOnUse",
                                        height: 1,
                                        width: 1
                                    });
                                    q(B, {
                                        x: 0,
                                        y: 0,
                                        "xlink:href": ga[1]
                                    });
                                    y.appendChild(B);
                                    (function(b) {
                                        c._preload(ga[1], function() {
                                            var c = this.offsetWidth,
                                                d = this.offsetHeight;
                                            q(b, {
                                                width: c,
                                                height: d
                                            });
                                            q(B, {
                                                width: c,
                                                height: d
                                            });
                                            e.paper.safari();
                                        });
                                    })(y);
                                    e.paper.defs.appendChild(y);
                                    q(k, {
                                        fill: "url(#" + y.id + ")"
                                    });
                                    e.pattern = y;
                                    e.pattern && u(e);
                                    break;
                                }
                                x = c.getRGB(v);
                                if (!x.error) {
                                    delete f.gradient, delete m.gradient, !c.is(m.opacity, "undefined") && c.is(f.opacity, "undefined") && q(k, {
                                        opacity: m.opacity
                                    }), !c.is(m["fill-opacity"], "undefined") && c.is(f["fill-opacity"], "undefined") && q(k, {
                                        "fill-opacity": m["fill-opacity"]
                                    });
                                } else {
                                    if (("circle" == e.type || "ellipse" == e.type || "r" != b(v).charAt()) && r(e, v)) {
                                        if ("opacity" in m || "fill-opacity" in m) {
                                            if (x = c._g.doc.getElementById(k.getAttribute("fill").replace(/^url\(#|\)$/g, ""))) {
                                                x = x.getElementsByTagName("stop"), q(x[x.length - 1], {
                                                    "stop-opacity": ("opacity" in m ? m.opacity : 1) * ("fill-opacity" in m ? m["fill-opacity"] : 1)
                                                });
                                            }
                                        }
                                        m.gradient = v;
                                        m.fill = "none";
                                        break;
                                    }
                                }
                                x.hasOwnProperty("opacity") && q(k, {
                                    "fill-opacity": 1 < x.opacity ? x.opacity / 100 : x.opacity
                                });
                            case "stroke":
                                x = c.getRGB(v);
                                k.setAttribute(n, x.hex);
                                "stroke" == n && x.hasOwnProperty("opacity") && q(k, {
                                    "stroke-opacity": 1 < x.opacity ? x.opacity / 100 : x.opacity
                                });
                                "stroke" == n && e._.arrows && ("startString" in e._.arrows && C(e, e._.arrows.startString), "endString" in e._.arrows && C(e, e._.arrows.endString, 1));
                                break;
                            case "gradient":
                                "circle" != e.type && "ellipse" != e.type && "r" == b(v).charAt() || r(e, v);
                                break;
                            case "opacity":
                                m.gradient && !m.hasOwnProperty("stroke-opacity") && q(k, {
                                    "stroke-opacity": 1 < v ? v / 100 : v
                                });
                            case "fill-opacity":
                                if (m.gradient) {
                                    if (x = c._g.doc.getElementById(k.getAttribute("fill").replace(/^url\(#|\)$/g, ""))) {
                                        x = x.getElementsByTagName("stop"), q(x[x.length - 1], {
                                            "stop-opacity": v
                                        });
                                    }
                                    break;
                                };
                            default:
                                "font-size" == n && (v = d(v, 10) + "px"), x = n.replace(/(\-.)/g, function(b) {
                                    return b.substring(1).toUpperCase();
                                }), k.style[x] = v, e._.dirty = 1, k.setAttribute(n, v);
                        }
                    }
                }
                ba(e, f);
                k.style.visibility = s;
            }, ba = function(e, f) {
                if ("text" == e.type && (f.hasOwnProperty("text") || f.hasOwnProperty("font") || f.hasOwnProperty("font-size") || f.hasOwnProperty("x") || f.hasOwnProperty("y"))) {
                    var g = e.attrs,
                        h = e.node,
                        k = h.firstChild ? d(c._g.doc.defaultView.getComputedStyle(h.firstChild, "").getPropertyValue("font-size"), 10) : 10;
                    if (f.hasOwnProperty("text")) {
                        for (g.text = f.text; h.firstChild;) {
                            h.removeChild(h.firstChild);
                        }
                        for (var p = b(f.text).split("\n"), m = [], s, n = 0, r = p.length; n < r; n++) {
                            s = q("tspan"), n && q(s, {
                                dy: 1.2 * k,
                                x: g.x
                            }), s.appendChild(c._g.doc.createTextNode(p[n])), h.appendChild(s), m[n] = s;
                        }
                    } else {
                        for (m = h.getElementsByTagName("tspan"), n = 0, r = m.length; n < r; n++) {
                            n ? q(m[n], {
                                dy: 1.2 * k,
                                x: g.x
                            }) : q(m[0], {
                                dy: 0
                            });
                        }
                    }
                    q(h, {
                        x: g.x,
                        y: g.y
                    });
                    e._.dirty = 1;
                    h = e._getBBox();
                    (g = g.y - (h.y + h.height / 2)) && c.is(g, "finite") && q(m[0], {
                        dy: g
                    });
                }
            }, y = function(b, e) {
                this[0] = this.node = b;
                b.raphael = !0;
                this.id = c._oid++;
                b.raphaelid = this.id;
                this.matrix = c.matrix();
                this.realPath = null;
                this.paper = e;
                this.attrs = this.attrs || {};
                this._ = {
                    transform: [],
                    sx: 1,
                    sy: 1,
                    deg: 0,
                    dx: 0,
                    dy: 0,
                    dirty: 1
                };
                !e.bottom && (e.bottom = this);
                (this.prev = e.top) && (e.top.next = this);
                e.top = this;
                this.next = null;
            }, t = c.el;
            y.prototype = t;
            t.constructor = y;
            c._engine.path = function(b, e, c) {
                var d = q("path"),
                    f = e.canvas.getElementsByTagName("g");
                2 <= f.length && "undefined" == typeof c ? e.canvas && f[0].appendChild(d) : e.canvas && e.canvas.appendChild(d);
                e = new y(d, e);
                e.type = "path";
                v(e, {
                    fill: "none",
                    stroke: "#000",
                    path: b
                });
                return e;
            };
            t.rotate = function(c, d, f) {
                if (this.removed) {
                    return this;
                }
                c = b(c).split(p);
                c.length - 1 && (d = e(c[1]), f = e(c[2]));
                c = e(c[0]);
                null == f && (d = f);
                if (null == d || null == f) {
                    f = this.getBBox(1), d = f.x + f.width / 2, f = f.y + f.height / 2;
                }
                this.transform(this._.transform.concat([
                    ["r", c, d, f]
                ]));
                return this;
            };
            t.scale = function(c, d, f, g) {
                if (this.removed) {
                    return this;
                }
                c = b(c).split(p);
                c.length - 1 && (d = e(c[1]), f = e(c[2]), g = e(c[3]));
                c = e(c[0]);
                null == d && (d = c);
                null == g && (f = g);
                if (null == f || null == g) {
                    var h = this.getBBox(1)
                }
                f = null == f ? h.x + h.width / 2 : f;
                g = null == g ? h.y + h.height / 2 : g;
                this.transform(this._.transform.concat([
                    ["s", c, d, f, g]
                ]));
                return this;
            };
            t.translate = function(c, d) {
                if (this.removed) {
                    return this;
                }
                c = b(c).split(p);
                c.length - 1 && (d = e(c[1]));
                c = e(c[0]) || 0;
                this.transform(this._.transform.concat([
                    ["t", c, +d || 0]
                ]));
                return this;
            };
            t.transform = function(b) {
                var e = this._;
                if (null == b) {
                    return e.transform;
                }
                c._extractTransform(this, b);
                this.clip && q(this.clip, {
                    transform: this.matrix.invert()
                });
                this.pattern && u(this);
                this.node && q(this.node, {
                    transform: this.matrix
                });
                if (1 != e.sx || 1 != e.sy) {
                    b = this.attrs.hasOwnProperty("stroke-width") ? this.attrs["stroke-width"] : 1, this.attr({
                        "stroke-width": b
                    });
                }
                return this;
            };
            t.hide = function() {
                !this.removed && this.paper.safari(this.node.style.display = "none");
                return this;
            };
            t.show = function() {
                !this.removed && this.paper.safari(this.node.style.display = "");
                return this;
            };
            t.remove = function() {
                if (!this.removed && this.node.parentNode) {
                    var b = this.paper;
                    b.__set__ && b.__set__.exclude(this);
                    m.unbind("raphael.*.*." + this.id);
                    this.gradient && b.defs.removeChild(this.gradient);
                    c._tear(this, b);
                    "a" == this.node.parentNode.tagName.toLowerCase() ? this.node.parentNode.parentNode.removeChild(this.node.parentNode) : this.node.parentNode.removeChild(this.node);
                    for (var e in this) {
                        this[e] = "function" == typeof this[e] ? c._removedFactory(e) : null;
                    }
                    this.removed = !0;
                }
            };
            t._getBBox = function() {
                if ("none" == this.node.style.display) {
                    this.show();
                    var b = !0;
                }
                var e = {};
                try {
                    e = this.node.getBBox();
                } catch (c) {} finally {
                    e = e || {};
                }
                b && this.hide();
                return e;
            };
            t.attr = function(b, e) {
                if (this.removed) {
                    return this;
                }
                if (null == b) {
                    var d = {}, f;
                    for (f in this.attrs) {
                        this.attrs.hasOwnProperty(f) && (d[f] = this.attrs[f]);
                    }
                    d.gradient && "none" == d.fill && (d.fill = d.gradient) && delete d.gradient;
                    d.transform = this._.transform;
                    return d;
                }
                if (null == e && c.is(b, "string")) {
                    if ("fill" == b && "none" == this.attrs.fill && this.attrs.gradient) {
                        return this.attrs.gradient;
                    }
                    if ("transform" == b) {
                        return this._.transform;
                    }
                    f = b.split(p);
                    for (var d = {}, g = 0, h = f.length; g < h; g++) {
                        b = f[g], b in this.attrs ? d[b] = this.attrs[b] : c.is(this.paper.customAttributes[b], "function") ? d[b] = this.paper.customAttributes[b].def : d[b] = c._availableAttrs[b];
                    }
                    return h - 1 ? d : d[f[0]];
                }
                if (null == e && c.is(b, "array")) {
                    d = {};
                    g = 0;
                    for (h = b.length; g < h; g++) {
                        d[b[g]] = this.attr(b[g]);
                    }
                    return d;
                }
                null != e ? (d = {}, d[b] = e) : null != b && c.is(b, "object") && (d = b);
                for (g in d) {
                    m("raphael.attr." + g + "." + this.id, this, d[g]);
                }
                for (g in this.paper.customAttributes) {
                    if (this.paper.customAttributes.hasOwnProperty(g) && d.hasOwnProperty(g) && c.is(this.paper.customAttributes[g], "function")) {
                        for (h in f = this.paper.customAttributes[g].apply(this, [].concat(d[g])), this.attrs[g] = d[g], f) {
                            f.hasOwnProperty(h) && (d[h] = f[h]);
                        }
                    }
                }
                v(this, d);
                return this;
            };
            t.toFront = function() {
                if (this.removed) {
                    return this;
                }
                "a" == this.node.parentNode.tagName.toLowerCase() ? this.node.parentNode.parentNode.appendChild(this.node.parentNode) : this.node.parentNode.appendChild(this.node);
                var b = this.paper;
                b.top != this && c._tofront(this, b);
                return this;
            };
            t.toBack = function() {
                if (this.removed) {
                    return this;
                }
                var b = this.node.parentNode;
                "a" == b.tagName.toLowerCase() ? b.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild) : b.firstChild != this.node && b.insertBefore(this.node, this.node.parentNode.firstChild);
                c._toback(this, this.paper);
                return this;
            };
            t.insertAfter = function(b) {
                if (this.removed) {
                    return this;
                }
                var e = b.node || b[b.length - 1].node;
                e.nextSibling ? e.parentNode.insertBefore(this.node, e.nextSibling) : e.parentNode.appendChild(this.node);
                c._insertafter(this, b, this.paper);
                return this;
            };
            t.insertBefore = function(b) {
                if (this.removed) {
                    return this;
                }
                var e = b.node || b[0].node;
                e.parentNode.insertBefore(this.node, e);
                c._insertbefore(this, b, this.paper);
                return this;
            };
            t.blur = function(b) {
                if (0 !== +b) {
                    var e = q("filter"),
                        d = q("feGaussianBlur");
                    this.attrs.blur = b;
                    e.id = c.createUUID();
                    q(d, {
                        stdDeviation: +b || 1.5
                    });
                    e.appendChild(d);
                    this.paper.defs.appendChild(e);
                    this._blur = e;
                    q(this.node, {
                        filter: "url(#" + e.id + ")"
                    });
                } else {
                    this._blur && (this._blur.parentNode.removeChild(this._blur), delete this._blur, delete this.attrs.blur), this.node.removeAttribute("filter");
                }
            };
            c._engine.circle = function(b, e, c, d) {
                var f = q("circle");
                b.canvas && b.canvas.appendChild(f);
                b = new y(f, b);
                b.attrs = {
                    cx: e,
                    cy: c,
                    r: d,
                    fill: "none",
                    stroke: "#000"
                };
                b.type = "circle";
                q(f, b.attrs);
                return b;
            };
            c._engine.rectBb = function(b, e, c, d, f, g) {
                var h = q("rect"),
                    k = b.canvas.getElementsByTagName("g");
                2 == k.length && b.canvas && k[1].appendChild(h);
                b = new y(h, b);
                b.attrs = {
                    x: e,
                    y: c,
                    width: d,
                    height: f,
                    r: g || 0,
                    rx: g || 0,
                    ry: g || 0,
                    fill: "none",
                    stroke: "#000"
                };
                b.type = "rect";
                q(h, b.attrs);
                return b;
            };
            c._engine.rect = function(b, e, c, d, f, g) {
                var h = q("rect");
                b.canvas && b.canvas.appendChild(h);
                b = new y(h, b);
                b.attrs = {
                    x: e,
                    y: c,
                    width: d,
                    height: f,
                    r: g || 0,
                    rx: g || 0,
                    ry: g || 0,
                    fill: "none",
                    stroke: "#000"
                };
                b.type = "rect";
                q(h, b.attrs);
                return b;
            };
            c._engine.ellipse = function(b, e, c, d, f) {
                var g = q("ellipse");
                b.canvas && b.canvas.appendChild(g);
                b = new y(g, b);
                b.attrs = {
                    cx: e,
                    cy: c,
                    rx: d,
                    ry: f,
                    fill: "none",
                    stroke: "#000"
                };
                b.type = "ellipse";
                q(g, b.attrs);
                return b;
            };
            c._engine.imageBb = function(b, e, c, d, f, g) {
                var h = q("image");
                q(h, {
                    x: c,
                    y: d,
                    width: f,
                    height: g,
                    preserveAspectRatio: "none"
                });
                h.setAttributeNS("http://www.w3.org/1999/xlink", "href", e);
                b.canvas.getElementById("bbGroup").appendChild(h);
                b = new y(h, b);
                b.attrs = {
                    x: c,
                    y: d,
                    width: f,
                    height: g,
                    src: e
                };
                b.type = "image";
                return b;
            };
            c._engine.image = function(b, e, c, d, f, g) {
                var h = q("image");
                q(h, {
                    x: c,
                    y: d,
                    width: f,
                    height: g,
                    preserveAspectRatio: "none"
                });
                h.setAttributeNS("http://www.w3.org/1999/xlink", "href", e);
                var k = b.canvas.getElementsByTagName("g");
                2 <= k.length ? b.canvas && k[0].appendChild(h) : b.canvas && b.canvas.appendChild(h);
                b = new y(h, b);
                b.attrs = {
                    x: c,
                    y: d,
                    width: f,
                    height: g,
                    src: e
                };
                b.type = "image";
                return b;
            };
            c._engine.text = function(b, e, d, f) {
                var g = q("text");
                b.canvas && b.canvas.appendChild(g);
                b = new y(g, b);
                b.attrs = {
                    x: e,
                    y: d,
                    "text-anchor": "middle",
                    text: f,
                    font: c._availableAttrs.font,
                    stroke: "none",
                    fill: "#000"
                };
                b.type = "text";
                v(b, b.attrs);
                return b;
            };
            c._engine.setSize = function(b, e) {
                this.width = b || this.width;
                this.height = e || this.height;
                this.canvas.setAttribute("width", this.width);
                this.canvas.setAttribute("height", this.height);
                this._viewBox && this.setViewBox.apply(this, this._viewBox);
                return this;
            };
            c._engine.create = function() {
                var b = c._getContainer.apply(0, arguments),
                    e = b && b.container,
                    d = b.x,
                    f = b.y,
                    g = b.width,
                    b = b.height;
                if (!e) {
                    throw Error("没有找到画布对象.");
                }
                var h = q("svg"),
                    k, d = d || 0,
                    f = f || 0,
                    g = g || 512,
                    b = b || 342;
                q(h, {
                    height: b,
                    version: 1.1,
                    width: g,
                    xmlns: "http://www.w3.org/2000/svg",
                    "xmlns:xlink": "http://www.w3.org/1999/xlink"
                });
                1 == e ? (h.style.cssText = "overflow:hidden;position:absolute;left:" + d + "px;top:" + f + "px", c._g.doc.body.appendChild(h), k = 1) : (h.style.cssText = "overflow:hidden;position:relative", e.firstChild ? e.insertBefore(h, e.firstChild) : e.appendChild(h));
                e = new c._Paper;
                e.width = g;
                e.height = b;
                e.canvas = h;
                e.clear();
                e._left = e._top = 0;
                k && (e.renderfix = function() {});
                e.renderfix();
                return e;
            };
            c._engine.setViewBox = function(b, e, c, d, f) {
                m("raphael.setViewBox", this, this._viewBox, [b, e, c, d, f]);
                var h = g(c / this.width, d / this.height),
                    k = this.top,
                    p = f ? "meet" : "xMinYMin",
                    n;
                null == b ? (this._vbSize && (h = 1), delete this._vbSize, n = "0 0 " + this.width + " " + this.height) : (this._vbSize = h, n = b + " " + e + " " + c + " " + d);
                for (q(this.canvas, {
                    viewBox: n,
                    preserveAspectRatio: p
                }); h && k;) {
                    p = "stroke-width" in k.attrs ? k.attrs["stroke-width"] : 1, k.attr({
                        "stroke-width": p
                    }), k._.dirty = 1, k._.dirtyT = 1, k = k.prev;
                }
                this._viewBox = [b, e, c, d, !! f];
                return this;
            };
            c.prototype.renderfix = function() {
                var b = this.canvas,
                    e = b.style,
                    c;
                try {
                    c = b.getScreenCTM() || b.createSVGMatrix();
                } catch (d) {
                    c = b.createSVGMatrix();
                }
                b = -c.e % 1;
                c = -c.f % 1;
                if (b || c) {
                    b && (this._left = (this._left + b) % 1, e.left = this._left + "px"), c && (this._top = (this._top + c) % 1, e.top = this._top + "px");
                }
            };
            c.prototype.clear = function() {
                c.eve("raphael.clear", this);
                for (var b = this.canvas; b.firstChild;) {
                    b.removeChild(b.firstChild);
                }
                this.bottom = this.top = null;
                (this.desc = q("desc")).appendChild(c._g.doc.createTextNode("by EasyTee Design Tool " + c.version));
                b.appendChild(this.desc);
                b.appendChild(this.defs = q("defs"));
                var e = document.createElementNS("http://www.w3.org/2000/svg", "g");
                b.appendChild(e);
                e = document.createElementNS("http://www.w3.org/2000/svg", "g");
                e.setAttribute("id", "bbGroup");
                b.appendChild(e);
            };
            c.prototype.remove = function() {
                m("raphael.remove", this);
                this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
                for (var b in this) {
                    this[b] = "function" == typeof this[b] ? c._removedFactory(b) : null;
                }
            };
            var ga = c.st,
                B;
            for (B in t) {
                t.hasOwnProperty(B) && !ga.hasOwnProperty(B) && (ga[B] = function(b) {
                    return function() {
                        var e = arguments;
                        return this.forEach(function(c) {
                            c[b].apply(c, e);
                        });
                    };
                }(B));
            }
        }
    })();
    (function() {
        if (c.vml) {
            var b = String,
                e = parseFloat,
                d = Math,
                f = d.round,
                g = d.max,
                h = d.min,
                k = d.abs,
                p = /[, ]+/,
                m = c.eve,
                n = {
                    M: "m",
                    L: "l",
                    C: "c",
                    Z: "x",
                    m: "t",
                    l: "r",
                    c: "v",
                    z: "x"
                }, s = /([clmz]),?([^clmz]*)/gi,
                q = / progid:\S+Blur\([^\)]+\)/g,
                r = /-?[^,\s-]+/g,
                u = {
                    path: 1,
                    rect: 1,
                    image: 1
                }, C = {
                    circle: 1,
                    ellipse: 1
                }, v = function(e) {
                    var d = /[ahqstv]/ig,
                        g = c._pathToAbsolute;
                    b(e).match(d) && (g = c._path2curve);
                    d = /[clmz]/g;
                    if (g == c._pathToAbsolute && !b(e).match(d)) {
                        return e = b(e).replace(s, function(b, e, c) {
                            var d = [],
                                g = "m" == e.toLowerCase(),
                                h = n[e];
                            c.replace(r, function(b) {
                                g && 2 == d.length && (h += d + n["m" == e ? "l" : "L"], d = []);
                                d.push(f(21600 * b));
                            });
                            return h + d;
                        });
                    }
                    var d = g(e),
                        h;
                    e = [];
                    for (var k = 0, p = d.length; k < p; k++) {
                        g = d[k];
                        h = d[k][0].toLowerCase();
                        "z" == h && (h = "x");
                        for (var m = 1, q = g.length; m < q; m++) {
                            h += f(21600 * g[m]) + (m != q - 1 ? "," : "");
                        }
                        e.push(h);
                    }
                    return e.join(" ");
                }, x = function(b, e, d) {
                    var f = c.matrix();
                    f.rotate(-b, 0.5, 0.5);
                    return {
                        dx: f.x(e, d),
                        dy: f.y(e, d)
                    };
                }, w = function(b, e, c, d, f, g) {
                    var h = b._,
                        p = b.matrix,
                        m = h.fillpos;
                    b = b.node;
                    var n = b.style,
                        s = 1,
                        q = "",
                        r = 21600 / e,
                        u = 21600 / c;
                    n.visibility = "hidden";
                    if (e && c) {
                        b.coordsize = k(r) + " " + k(u);
                        n.rotation = g * (0 > e * c ? -1 : 1);
                        g && (f = x(g, d, f), d = f.dx, f = f.dy);
                        0 > e && (q += "x");
                        0 > c && (q += " y") && (s = -1);
                        n.flip = q;
                        b.coordorigin = d * -r + " " + f * -u;
                        if (m || h.fillsize) {
                            d = (d = b.getElementsByTagName("fill")) && d[0], b.removeChild(d), m && (f = x(g, p.x(m[0], m[1]), p.y(m[0], m[1])), d.position = f.dx * s + " " + f.dy * s), h.fillsize && (d.size = h.fillsize[0] * k(e) + " " + h.fillsize[1] * k(c)), b.appendChild(d);
                        }
                        n.visibility = "visible";
                    }
                };
            c.toString = function() {
                return "您的浏览器不支持 SVG. 但支持 VML.\n可以运行 Raphael " + this.version;
            };
            var ba = function(e, c, d) {
                c = b(c).toLowerCase().split("-");
                d = d ? "end" : "start";
                for (var f = c.length, g = "classic", h = "medium", k = "medium"; f--;) {
                    switch (c[f]) {
                        case "block":
                            ;
                        case "classic":
                            ;
                        case "oval":
                            ;
                        case "diamond":
                            ;
                        case "open":
                            ;
                        case "none":
                            g = c[f];
                            break;
                        case "wide":
                            ;
                        case "narrow":
                            k = c[f];
                            break;
                        case "long":
                            ;
                        case "short":
                            h = c[f];
                    }
                }
                e = e.node.getElementsByTagName("stroke")[0];
                e[d + "arrow"] = g;
                e[d + "arrowlength"] = h;
                e[d + "arrowwidth"] = k;
            }, y = function(d, k) {
                d.attrs = d.attrs || {};
                var m = d.node,
                    n = d.attrs,
                    s = m.style,
                    q = u[d.type] && (k.x != n.x || k.y != n.y || k.width != n.width || k.height != n.height || k.cx != n.cx || k.cy != n.cy || k.rx != n.rx || k.ry != n.ry || k.r != n.r),
                    r = C[d.type] && (n.cx != k.cx || n.cy != k.cy || n.r != k.r || n.rx != k.rx || n.ry != k.ry),
                    x;
                for (x in k) {
                    k.hasOwnProperty(x) && (n[x] = k[x]);
                }
                q && (n.path = c._getPath[d.type](d), d._.dirty = 1);
                k.href && (m.href = k.href);
                k.title && (m.title = k.title);
                k.target && (m.target = k.target);
                k.cursor && (s.cursor = k.cursor);
                "blur" in k && d.blur(k.blur);
                if (k.path && "path" == d.type || q) {
                    m.path = v(~b(n.path).toLowerCase().indexOf("r") ? c._pathToAbsolute(n.path) : n.path), "image" == d.type && (d._.fillpos = [n.x, n.y], d._.fillsize = [n.width, n.height], w(d, 1, 1, 0, 0, 0));
                }
                "transform" in k && d.transform(k.transform);
                r && (s = +n.cx, q = +n.cy, r = +n.rx || +n.r || 0, x = +n.ry || +n.r || 0, m.path = c.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", f(21600 * (s - r)), f(21600 * (q - x)), f(21600 * (s + r)), f(21600 * (q + x)), f(21600 * s)));
                "clip-rect" in k && (s = b(k["clip-rect"]).split(p), 4 == s.length && (s[2] = +s[2] + +s[0], s[3] = +s[3] + +s[1], q = m.clipRect || c._g.doc.createElement("div"), r = q.style, r.clip = c.format("rect({1}px {2}px {3}px {0}px)", s), m.clipRect || (r.position = "absolute", r.top = 0, r.left = 0, r.width = d.paper.width + "px", r.height = d.paper.height + "px", m.parentNode.insertBefore(q, m), q.appendChild(m), m.clipRect = q)), k["clip-rect"] || m.clipRect && (m.clipRect.style.clip = "auto"));
                d.textpath && (s = d.textpath.style, k.font && (s.font = k.font), k["font-family"] && (s.fontFamily = '"' + k["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, "") + '"'), k["font-size"] && (s.fontSize = k["font-size"]), k["font-weight"] && (s.fontWeight = k["font-weight"]), k["font-style"] && (s.fontStyle = k["font-style"]));
                "arrow-start" in k && ba(d, k["arrow-start"]);
                "arrow-end" in k && ba(d, k["arrow-end"], 1);
                if (null != k.opacity || null != k["stroke-width"] || null != k.fill || null != k.src || null != k.stroke || null != k["stroke-width"] || null != k["stroke-opacity"] || null != k["fill-opacity"] || null != k["stroke-dasharray"] || null != k["stroke-miterlimit"] || null != k["stroke-linejoin"] || null != k["stroke-linecap"]) {
                    s = (s = m.getElementsByTagName("fill")) && s[0];
                    !s && (s = Y("fill"));
                    "image" == d.type && k.src && (s.src = k.src);
                    k.fill && (s.on = !0);
                    if (null == s.on || "none" == k.fill || null === k.fill) {
                        s.on = !1;
                    }
                    s.on && k.fill && ((q = b(k.fill).match(c._ISURL)) ? (s.parentNode == m && m.removeChild(s), s.rotate = !0, s.src = q[1], s.type = "tile", r = d.getBBox(1), s.position = r.x + " " + r.y, d._.fillpos = [r.x, r.y], c._preload(q[1], function() {
                        d._.fillsize = [this.offsetWidth, this.offsetHeight];
                    })) : (s.color = c.getRGB(k.fill).hex, s.src = "", s.type = "solid", c.getRGB(k.fill).error && (d.type in {
                        circle: 1,
                        ellipse: 1
                    } || "r" != b(k.fill).charAt()) && t(d, k.fill, s) && (n.fill = "none", n.gradient = k.fill, s.rotate = !1)));
                    if ("fill-opacity" in k || "opacity" in k) {
                        r = ((+n["fill-opacity"] + 1 || 2) - 1) * ((+n.opacity + 1 || 2) - 1) * ((+c.getRGB(k.fill).o + 1 || 2) - 1), r = h(g(r, 0), 1), s.opacity = r, s.src && (s.color = "none");
                    }
                    m.appendChild(s);
                    s = m.getElementsByTagName("stroke") && m.getElementsByTagName("stroke")[0];
                    q = !1;
                    !s && (q = s = Y("stroke"));
                    if (k.stroke && "none" != k.stroke || k["stroke-width"] || null != k["stroke-opacity"] || k["stroke-dasharray"] || k["stroke-miterlimit"] || k["stroke-linejoin"] || k["stroke-linecap"]) {
                        s.on = !0;
                    }
                    "none" != k.stroke && null !== k.stroke && null != s.on && 0 != k.stroke && 0 != k["stroke-width"] || (s.on = !1);
                    r = c.getRGB(k.stroke);
                    s.on && k.stroke && (s.color = r.hex);
                    r = ((+n["stroke-opacity"] + 1 || 2) - 1) * ((+n.opacity + 1 || 2) - 1) * ((+r.o + 1 || 2) - 1);
                    x = 0.75 * (e(k["stroke-width"]) || 1);
                    r = h(g(r, 0), 1);
                    null == k["stroke-width"] && (x = n["stroke-width"]);
                    k["stroke-width"] && (s.weight = x);
                    x && 1 > x && (r *= x) && (s.weight = 1);
                    s.opacity = r;
                    k["stroke-linejoin"] && (s.joinstyle = k["stroke-linejoin"] || "miter");
                    s.miterlimit = k["stroke-miterlimit"] || 8;
                    k["stroke-linecap"] && (s.endcap = "butt" == k["stroke-linecap"] ? "flat" : "square" == k["stroke-linecap"] ? "square" : "round");
                    k["stroke-dasharray"] && (r = {
                        "-": "shortdash",
                        ".": "shortdot",
                        "-.": "shortdashdot",
                        "-..": "shortdashdotdot",
                        ". ": "dot",
                        "- ": "dash",
                        "--": "longdash",
                        "- .": "dashdot",
                        "--.": "longdashdot",
                        "--..": "longdashdotdot"
                    }, s.dashstyle = r.hasOwnProperty(k["stroke-dasharray"]) ? r[k["stroke-dasharray"]] : "");
                    q && m.appendChild(s);
                }
                if ("text" == d.type) {
                    d.paper.canvas.style.display = "";
                    m = d.paper.span;
                    q = n.font && n.font.match(/\d+(?:\.\d*)?(?=px)/);
                    s = m.style;
                    n.font && (s.font = n.font);
                    n["font-family"] && (s.fontFamily = n["font-family"]);
                    n["font-weight"] && (s.fontWeight = n["font-weight"]);
                    n["font-style"] && (s.fontStyle = n["font-style"]);
                    q = e(n["font-size"] || q && q[0]) || 10;
                    s.fontSize = 100 * q + "px";
                    d.textpath.string && (m.innerHTML = b(d.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
                    m = m.getBoundingClientRect();
                    d.W = n.w = (m.right - m.left) / 100;
                    d.H = n.h = (m.bottom - m.top) / 100;
                    d.X = n.x;
                    d.Y = n.y + d.H / 2;
                    ("x" in k || "y" in k) && (d.path.v = c.format("m{0},{1}l{2},{1}", f(21600 * n.x), f(21600 * n.y), f(21600 * n.x) + 1));
                    m = "x y text font font-family font-weight font-style font-size".split(" ");
                    s = 0;
                    for (q = m.length; s < q; s++) {
                        if (m[s] in k) {
                            d._.dirty = 1;
                            break;
                        }
                    }
                    switch (n["text-anchor"]) {
                        case "start":
                            d.textpath.style["v-text-align"] = "left";
                            d.bbx = d.W / 2;
                            break;
                        case "end":
                            d.textpath.style["v-text-align"] = "right";
                            d.bbx = -d.W / 2;
                            break;
                        default:
                            d.textpath.style["v-text-align"] = "center", d.bbx = 0;
                    }
                    d.textpath.style["v-text-kern"] = !0;
                }
            }, t = function(f, g, h) {
                f.attrs = f.attrs || {};
                var k = Math.pow,
                    p = "linear",
                    m = ".5 .5";
                f.attrs.gradient = g;
                g = b(g).replace(c._radial_gradient, function(b, c, f) {
                    p = "radial";
                    c && f && (c = e(c), f = e(f), 0.25 < k(c - 0.5, 2) + k(f - 0.5, 2) && (f = d.sqrt(0.25 - k(c - 0.5, 2)) * (2 * (0.5 < f) - 1) + 0.5), m = c + " " + f);
                    return "";
                });
                g = g.split(/\s*\-\s*/);
                if ("linear" == p) {
                    var s = g.shift(),
                        s = -e(s);
                    if (isNaN(s)) {
                        return null;
                    }
                }
                g = c._parseDots(g);
                if (!g) {
                    return null;
                }
                f = f.shape || f.node;
                if (g.length) {
                    f.removeChild(h);
                    h.on = !0;
                    h.method = "none";
                    h.color = g[0].color;
                    h.color2 = g[g.length - 1].color;
                    for (var n = [], q = 0, r = g.length; q < r; q++) {
                        g[q].offset && n.push(g[q].offset + " " + g[q].color);
                    }
                    h.colors = n.length ? n.join() : "0% " + h.color;
                    "radial" == p ? (h.type = "gradientTitle", h.focus = "100%", h.focussize = "0 0", h.focusposition = m, h.angle = 0) : (h.type = "gradient", h.angle = (270 - s) % 360);
                    f.appendChild(h);
                }
                return 1;
            }, ga = function(b, e) {
                this[0] = this.node = b;
                b.raphael = !0;
                this.id = c._oid++;
                b.raphaelid = this.id;
                this.Y = this.X = 0;
                this.attrs = {};
                this.paper = e;
                this.matrix = c.matrix();
                this._ = {
                    transform: [],
                    sx: 1,
                    sy: 1,
                    dx: 0,
                    dy: 0,
                    deg: 0,
                    dirty: 1,
                    dirtyT: 1
                };
                !e.bottom && (e.bottom = this);
                (this.prev = e.top) && (e.top.next = this);
                e.top = this;
                this.next = null;
            }, B = c.el;
            ga.prototype = B;
            B.constructor = ga;
            B.transform = function(e) {
                if (null == e) {
                    return this._.transform;
                }
                var d = this.paper._viewBoxShift,
                    f = d ? "s" + [d.scale, d.scale] + "-1-1t" + [d.dx, d.dy] : "",
                    g;
                d && (g = e = b(e).replace(/\.{3}|\u2026/g, this._.transform || ""));
                c._extractTransform(this, f + e);
                var d = this.matrix.clone(),
                    h = this.skew;
                e = this.node;
                var f = ~b(this.attrs.fill).indexOf("-"),
                    k = !b(this.attrs.fill).indexOf("url(");
                d.translate(-0.5, -0.5);
                k || f || "image" == this.type ? (h.matrix = "1 0 0 1", h.offset = "0 0", h = d.split(), f && h.noRotation || !h.isSimple ? (e.style.filter = d.toFilter(), f = this.getBBox(), h = this.getBBox(1), d = f.x - h.x, f = f.y - h.y, e.coordorigin = -21600 * d + " " + -21600 * f, w(this, 1, 1, d, f, 0)) : (e.style.filter = "", w(this, h.scalex, h.scaley, h.dx, h.dy, h.rotate))) : (e.style.filter = "", h.matrix = b(d), h.offset = d.offset());
                g && (this._.transform = g);
                return this;
            };
            B.rotate = function(c, d, f) {
                if (this.removed) {
                    return this;
                }
                if (null != c) {
                    c = b(c).split(p);
                    c.length - 1 && (d = e(c[1]), f = e(c[2]));
                    c = e(c[0]);
                    null == f && (d = f);
                    if (null == d || null == f) {
                        f = this.getBBox(1), d = f.x + f.width / 2, f = f.y + f.height / 2;
                    }
                    this._.dirtyT = 1;
                    this.transform(this._.transform.concat([
                        ["r", c, d, f]
                    ]));
                    return this;
                }
            };
            B.translate = function(c, d) {
                if (this.removed) {
                    return this;
                }
                c = b(c).split(p);
                c.length - 1 && (d = e(c[1]));
                c = e(c[0]) || 0;
                d = +d || 0;
                this._.bbox && (this._.bbox.x += c, this._.bbox.y += d);
                this.transform(this._.transform.concat([
                    ["t", c, d]
                ]));
                return this;
            };
            B.scale = function(c, d, f, g) {
                if (this.removed) {
                    return this;
                }
                c = b(c).split(p);
                c.length - 1 && (d = e(c[1]), f = e(c[2]), g = e(c[3]), isNaN(f) && (f = null), isNaN(g) && (g = null));
                c = e(c[0]);
                null == d && (d = c);
                null == g && (f = g);
                if (null == f || null == g) {
                    var h = this.getBBox(1)
                }
                f = null == f ? h.x + h.width / 2 : f;
                g = null == g ? h.y + h.height / 2 : g;
                this.transform(this._.transform.concat([
                    ["s", c, d, f, g]
                ]));
                this._.dirtyT = 1;
                return this;
            };
            B.hide = function() {
                !this.removed && (this.node.style.display = "none");
                return this;
            };
            B.show = function() {
                !this.removed && (this.node.style.display = "");
                return this;
            };
            B._getBBox = function() {
                return this.removed ? {} : {
                    x: this.X + (this.bbx || 0) - this.W / 2,
                    y: this.Y - this.H,
                    width: this.W,
                    height: this.H
                };
            };
            B.remove = function() {
                if (!this.removed && this.node.parentNode) {
                    this.paper.__set__ && this.paper.__set__.exclude(this);
                    c.eve.unbind("raphael.*.*." + this.id);
                    c._tear(this, this.paper);
                    this.node.parentNode.removeChild(this.node);
                    this.shape && this.shape.parentNode.removeChild(this.shape);
                    for (var b in this) {
                        this[b] = "function" == typeof this[b] ? c._removedFactory(b) : null;
                    }
                    this.removed = !0;
                }
            };
            B.attr = function(b, e) {
                if (this.removed) {
                    return this;
                }
                if (null == b) {
                    var d = {}, f;
                    for (f in this.attrs) {
                        this.attrs.hasOwnProperty(f) && (d[f] = this.attrs[f]);
                    }
                    d.gradient && "none" == d.fill && (d.fill = d.gradient) && delete d.gradient;
                    d.transform = this._.transform;
                    return d;
                }
                if (null == e && c.is(b, "string")) {
                    if ("fill" == b && "none" == this.attrs.fill && this.attrs.gradient) {
                        return this.attrs.gradient;
                    }
                    f = b.split(p);
                    for (var d = {}, g = 0, h = f.length; g < h; g++) {
                        b = f[g], b in this.attrs ? d[b] = this.attrs[b] : c.is(this.paper.customAttributes[b], "function") ? d[b] = this.paper.customAttributes[b].def : d[b] = c._availableAttrs[b];
                    }
                    return h - 1 ? d : d[f[0]];
                }
                if (this.attrs && null == e && c.is(b, "array")) {
                    d = {};
                    g = 0;
                    for (h = b.length; g < h; g++) {
                        d[b[g]] = this.attr(b[g]);
                    }
                    return d;
                }
                null != e && (d = {}, d[b] = e);
                null == e && c.is(b, "object") && (d = b);
                for (g in d) {
                    m("raphael.attr." + g + "." + this.id, this, d[g]);
                }
                if (d) {
                    for (g in this.paper.customAttributes) {
                        if (this.paper.customAttributes.hasOwnProperty(g) && d.hasOwnProperty(g) && c.is(this.paper.customAttributes[g], "function")) {
                            for (h in f = this.paper.customAttributes[g].apply(this, [].concat(d[g])), this.attrs[g] = d[g], f) {
                                f.hasOwnProperty(h) && (d[h] = f[h]);
                            }
                        }
                    }
                    d.text && "text" == this.type && (this.textpath.string = d.text);
                    y(this, d);
                }
                return this;
            };
            B.toFront = function() {
                !this.removed && this.node.parentNode.appendChild(this.node);
                this.paper && this.paper.top != this && c._tofront(this, this.paper);
                return this;
            };
            B.toBack = function() {
                if (this.removed) {
                    return this;
                }
                this.node.parentNode.firstChild != this.node && (this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild), c._toback(this, this.paper));
                return this;
            };
            B.insertAfter = function(b) {
                if (this.removed) {
                    return this;
                }
                b.constructor == c.st.constructor && (b = b[b.length - 1]);
                b.node.nextSibling ? b.node.parentNode.insertBefore(this.node, b.node.nextSibling) : b.node.parentNode.appendChild(this.node);
                c._insertafter(this, b, this.paper);
                return this;
            };
            B.insertBefore = function(b) {
                if (this.removed) {
                    return this;
                }
                b.constructor == c.st.constructor && (b = b[0]);
                b.node.parentNode.insertBefore(this.node, b.node);
                c._insertbefore(this, b, this.paper);
                return this;
            };
            B.blur = function(b) {
                var e = this.node.runtimeStyle,
                    d = e.filter,
                    d = d.replace(q, "");
                0 !== +b ? (this.attrs.blur = b, e.filter = d + "  progid:DXImageTransform.Microsoft.Blur(pixelradius=" + (+b || 1.5) + ")", e.margin = c.format("-{0}px 0 0 -{0}px", f(+b || 1.5))) : (e.filter = d, e.margin = 0, delete this.attrs.blur);
            };
            c._engine.path = function(b, e) {
                var c = Y("shape");
                c.style.cssText = "position:absolute;left:0;top:0;width:1px;height:1px";
                c.coordsize = "21600 21600";
                c.coordorigin = e.coordorigin;
                var d = new ga(c, e),
                    f = {
                        fill: "none",
                        stroke: "#000"
                    };
                b && (f.path = b);
                d.type = "path";
                d.path = [];
                d.Path = "";
                y(d, f);
                e.canvas.appendChild(c);
                f = Y("skew");
                f.on = !0;
                c.appendChild(f);
                d.skew = f;
                d.transform("");
                return d;
            };
            c._engine.rect = function(b, e, d, f, g, h) {
                var k = c._rectPath(e, d, f, g, h);
                b = b.path(k);
                var p = b.attrs;
                b.X = p.x = e;
                b.Y = p.y = d;
                b.W = p.width = f;
                b.H = p.height = g;
                p.r = h;
                p.path = k;
                b.type = "rect";
                return b;
            };
            c._engine.ellipse = function(b, e, c, d, f) {
                b = b.path();
                b.X = e - d;
                b.Y = c - f;
                b.W = 2 * d;
                b.H = 2 * f;
                b.type = "ellipse";
                y(b, {
                    cx: e,
                    cy: c,
                    rx: d,
                    ry: f
                });
                return b;
            };
            c._engine.circle = function(b, e, c, d) {
                b = b.path();
                b.X = e - d;
                b.Y = c - d;
                b.W = b.H = 2 * d;
                b.type = "circle";
                y(b, {
                    cx: e,
                    cy: c,
                    r: d
                });
                return b;
            };
            c._engine.image = function(b, e, d, f, g, h) {
                var k = c._rectPath(d, f, g, h);
                b = b.path(k).attr({
                    stroke: "none"
                });
                var p = b.attrs,
                    m = b.node,
                    s = m.getElementsByTagName("fill")[0];
                p.src = e;
                b.X = p.x = d;
                b.Y = p.y = f;
                b.W = p.width = g;
                b.H = p.height = h;
                p.path = k;
                b.type = "image";
                s.parentNode == m && m.removeChild(s);
                s.rotate = !0;
                s.src = e;
                s.type = "tile";
                b._.fillpos = [d, f];
                b._.fillsize = [g, h];
                m.appendChild(s);
                w(b, 1, 1, 0, 0, 0);
                return b;
            };
            c._engine.text = function(e, d, g, h) {
                var k = Y("shape"),
                    p = Y("path"),
                    m = Y("textpath");
                d = d || 0;
                g = g || 0;
                h = h || "";
                p.v = c.format("m{0},{1}l{2},{1}", f(21600 * d), f(21600 * g), f(21600 * d) + 1);
                p.textpathok = !0;
                m.string = b(h);
                m.on = !0;
                k.style.cssText = "position:absolute;left:0;top:0;width:1px;height:1px";
                k.coordsize = "21600 21600";
                k.coordorigin = "0 0";
                var s = new ga(k, e),
                    n = {
                        fill: "#000",
                        stroke: "none",
                        font: c._availableAttrs.font,
                        text: h
                    };
                s.shape = k;
                s.path = p;
                s.textpath = m;
                s.type = "text";
                s.attrs.text = b(h);
                s.attrs.x = d;
                s.attrs.y = g;
                s.attrs.w = 1;
                s.attrs.h = 1;
                y(s, n);
                k.appendChild(m);
                k.appendChild(p);
                e.canvas.appendChild(k);
                e = Y("skew");
                e.on = !0;
                k.appendChild(e);
                s.skew = e;
                s.transform("");
                return s;
            };
            c._engine.setSize = function(b, e) {
                var d = this.canvas.style;
                this.width = b;
                this.height = e;
                b == +b && (b += "px");
                e == +e && (e += "px");
                d.width = b;
                d.height = e;
                d.clip = "rect(0 " + b + " " + e + " 0)";
                this._viewBox && c._engine.setViewBox.apply(this, this._viewBox);
                return this;
            };
            c._engine.setViewBox = function(b, e, d, f, h) {
                c.eve("raphael.setViewBox", this, this._viewBox, [b, e, d, f, h]);
                var k = this.width,
                    p = this.height,
                    m = 1 / g(d / k, f / p),
                    s, n;
                h && (s = p / f, n = k / d, d * s < k && (b -= (k - d * s) / 2 / s), f * n < p && (e -= (p - f * n) / 2 / n));
                this._viewBox = [b, e, d, f, !! h];
                this._viewBoxShift = {
                    dx: -b,
                    dy: -e,
                    scale: m
                };
                this.forEach(function(b) {
                    b.transform("...");
                });
                return this;
            };
            var Y;
            c._engine.initWin = function(b) {
                var e = b.document;
                e.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
                try {
                    !e.namespaces.rvml && e.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), Y = function(b) {
                        return e.createElement("<rvml:" + b + ' class="rvml">');
                    };
                } catch (c) {
                    Y = function(b) {
                        return e.createElement("<" + b + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
                    };
                }
            };
            c._engine.initWin(c._g.win);
            c._engine.create = function() {
                var b = c._getContainer.apply(0, arguments),
                    e = b.container,
                    d = b.height,
                    f = b.width,
                    g = b.x,
                    b = b.y;
                if (!e) {
                    throw Error("VML container not found.");
                }
                var h = new c._Paper,
                    k = h.canvas = c._g.doc.createElement("div"),
                    p = k.style,
                    g = g || 0,
                    b = b || 0,
                    f = f || 512,
                    d = d || 342;
                h.width = f;
                h.height = d;
                f == +f && (f += "px");
                d == +d && (d += "px");
                h.coordsize = "21600000 21600000";
                h.coordorigin = "0 0";
                h.span = c._g.doc.createElement("span");
                h.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;";
                k.appendChild(h.span);
                p.cssText = c.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", f, d);
                1 == e ? (c._g.doc.body.appendChild(k), p.left = g + "px", p.top = b + "px", p.position = "absolute") : e.firstChild ? e.insertBefore(k, e.firstChild) : e.appendChild(k);
                h.renderfix = function() {};
                return h;
            };
            c.prototype.clear = function() {
                c.eve("raphael.clear", this);
                this.canvas.innerHTML = "";
                this.span = c._g.doc.createElement("span");
                this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
                this.canvas.appendChild(this.span);
                this.bottom = this.top = null;
            };
            c.prototype.remove = function() {
                c.eve("raphael.remove", this);
                this.canvas.parentNode.removeChild(this.canvas);
                for (var b in this) {
                    this[b] = "function" == typeof this[b] ? c._removedFactory(b) : null;
                }
                return !0;
            };
            var ua = c.st,
                D;
            for (D in B) {
                B.hasOwnProperty(D) && !ua.hasOwnProperty(D) && (ua[D] = function(b) {
                    return function() {
                        var e = arguments;
                        return this.forEach(function(c) {
                            c[b].apply(c, e);
                        });
                    };
                }(D));
            }
        }
    })();
    V ? D.win.Raphael = c : Raphael = c;
    return c;
});
(function(b) {
    function d(b) {
        if ("number" === typeof b) {
            return b.toString();
        }
        var c = {
            "&": "amp",
            "<": "lt",
            ">": "gt",
            '"': "quot",
            "'": "apos"
        }, d;
        for (d in c) {
            b = b.replace(RegExp(d, "g"), "&" + c[d] + ";");
        }
        return b;
    }

    function c(b, c) {
        var d = [],
            f;
        for (f in b) {
            if (b.hasOwnProperty(f)) {
                var g = c.call(this, b[f], f);
                null !== g && d.push(g);
            }
        }
        return d;
    }

    function g(b, c, d) {
        for (var f in b) {
            b.hasOwnProperty(f) && (d = c.call(this, d, b[f], f));
        }
        return d;
    }

    function k(b, f, g, h) {
        if ("undefined" === typeof h || null === h) {
            h = "";
        }
        "object" === typeof f && (f = c(f, function(b, c) {
            if ("transform" !== c) {
                return c + '="' + d(b) + '"';
            }
        }).join(" "));
        return "<" + b + (g ? ' transform="matrix(' + g.toString().replace(/^matrix\(|\)$/g, "") + ')" ' : " ") + f + ">" + h + "</" + b + ">";
    }

    function h(b, c, d) {
        null === b && (b = 10);
        console.log("KSKKS");
        return 4.5 * b / 13 * (c - 0.2 - d / 2) * 3.5;
    }
    var f = {
        text: function(b) {
            style = {
                font: {
                    family: b.attrs.font.replace(/^.*?"(\w+)".*$/, "$1"),
                    size: "undefined" === typeof b.attrs["font-size"] ? null : b.attrs["font-size"]
                }
            };
            var f = [];
            c(b.attrs.text.split("\n"), function(c, r, t) {
                t = t || 0;
                f.push(k("text", g(b.attrs, function(b, e, c) {
                    "text" !== c && "w" !== c && "h" !== c && ("font-size" === c && (e += "px"), b[c] = d(e.toString()));
                    return b;
                }, {
                    style: "text-anchor: middle; " + ("font: normal normal normal 10px/normal " + style.font.family + (null === style.font.size ? "" : "; font-size: " + style.font.size + "px")) + ";"
                }), b.matrix, k("tspan", {
                    dy: h(style.font.size, t + 1, b.attrs.text.split("\n").length)
                }, null, c)));
            });
            return f;
        },
        path: function(b) {
            return k("path", g(b.attrs, function(c, d, f) {
                "path" === f && (f = "d");
                if ("undefined" == typeof d || null == d) {
                    return c;
                }
                c[f] = d.toString();
                "stroke-width" == f && (console.log("STw", d, c, b), c[f] = d.toString());
                return c;
            }, {}), b.matrix);
        }
    };
    b.fn.toSVG = function() {
        var c = b.svg,
            g = b.vml,
            h = '<svg style="overflow: hidden; position: relative;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + this.width + '" height="' + this.height + '" version="1.1">';
        b.svg = !0;
        b.vml = !1;
        for (var k = this.bottom; null != k; k = k.next) {
            if ("none" !== k.node.style.display) {
                var t = "";
                if ("function" === typeof f[k.type]) {
                    h += f[k.type](k);
                } else {
                    switch (k.type) {
                        case "image":
                            t += ' preserveAspectRatio="none"';
                    }
                    for (i in k.attrs) {
                        var p = i;
                        switch (i) {
                            case "src":
                                p = "xlink:href";
                                break;
                            case "transform":
                                p = "";
                        }
                        p && (t += " " + p + '="' + d(k.attrs[i].toString()) + '"');
                    }
                    h += "<" + k.type + ' transform="matrix(' + k.matrix.toString().replace(/^matrix\(|\)$/g, "") + ')"' + t + "></" + k.type + ">";
                }
            }
        }
        b.svg = c;
        b.vml = g;
        return h + "</svg>";
    };
})(window.Raphael);
Raphael.fn.freeTransform = function(b, d, c) {
    function g(b) {
        ("set" === b.type ? b.items : [b]).map(function(b) {
            "set" === b.type ? g(b) : e.items.push({
                el: b,
                attrs: {
                    rotate: 0,
                    scale: {
                        x: 1,
                        y: 1
                    },
                    translate: {
                        x: 0,
                        y: 0
                    }
                },
                transformString: b.matrix.toTransformString()
            });
        });
    }

    function k() {
        var b = e.attrs.rotate * Math.PI / 180,
            c = (e.attrs.rotate + 90) * Math.PI / 180,
            d = e.attrs.size.x / 2 * e.attrs.scale.x,
            f = e.attrs.size.y / 2 * e.attrs.scale.y,
            g = [];
        [{
            x: -1,
            y: -1
        }, {
            x: 1,
            y: -1
        }, {
            x: 1,
            y: 1
        }, {
            x: -1,
            y: 1
        }].map(function(h) {
                g.push({
                    x: e.attrs.center.x + e.attrs.translate.x + h.x * d * Math.cos(b) + h.y * f * Math.cos(c),
                    y: e.attrs.center.y + e.attrs.translate.y + h.x * d * Math.sin(b) + h.y * f * Math.sin(c)
                });
            });
        return g;
    }

    function h(b) {
        if (b && e.opts.snap.drag) {
            var c = b.x,
                d = b.y,
                f = {
                    x: 0,
                    y: 0
                }, g = 0,
                h = 0;
            [0, 1].map(function() {
                f.x = c - Math.round(c / e.opts.snap.drag) * e.opts.snap.drag;
                f.y = d - Math.round(d / e.opts.snap.drag) * e.opts.snap.drag;
                Math.abs(f.x) <= e.opts.snapDist.drag && (g = f.x);
                Math.abs(f.y) <= e.opts.snapDist.drag && (h = f.y);
                c += b.width - g;
                d += b.height - h;
            });
            e.attrs.translate.x -= g;
            e.attrs.translate.y -= h;
        }
        if (e.opts.boundary) {
            var k = e.opts.boundary;
            e.attrs.center.x + e.attrs.translate.x < k.x && (e.attrs.translate.x += k.x - (e.attrs.center.x + e.attrs.translate.x));
            e.attrs.center.y + e.attrs.translate.y < k.y && (e.attrs.translate.y += k.y - (e.attrs.center.y + e.attrs.translate.y));
            e.attrs.center.x + e.attrs.translate.x > k.x + k.width && (e.attrs.translate.x += k.x + k.width - (e.attrs.center.x + e.attrs.translate.x));
            e.attrs.center.y + e.attrs.translate.y > k.y + k.height && (e.attrs.translate.y += k.y + k.height - (e.attrs.center.y + e.attrs.translate.y));
        }
        f = Math.abs(e.attrs.rotate % e.opts.snap.rotate);
        f = Math.min(f, e.opts.snap.rotate - f);
        f < e.opts.snapDist.rotate && (e.attrs.rotate = Math.round(e.attrs.rotate / e.opts.snap.rotate) * e.opts.snap.rotate);
        f = {
            x: Math.abs(e.attrs.scale.x * e.attrs.size.x % e.opts.snap.scale),
            y: Math.abs(e.attrs.scale.y * e.attrs.size.x % e.opts.snap.scale)
        };
        f = {
            x: Math.min(f.x, e.opts.snap.scale - f.x),
            y: Math.min(f.y, e.opts.snap.scale - f.y)
        };
        f.x < e.opts.snapDist.scale && (e.attrs.scale.x = Math.round(e.attrs.scale.x * e.attrs.size.x / e.opts.snap.scale) * e.opts.snap.scale / e.attrs.size.x);
        f.y < e.opts.snapDist.scale && (e.attrs.scale.y = Math.round(e.attrs.scale.y * e.attrs.size.y / e.opts.snap.scale) * e.opts.snap.scale / e.attrs.size.y);
        e.opts.range.rotate && (k = (360 + e.attrs.rotate) % 360, 180 < k && (k -= 360), k < e.opts.range.rotate[0] && (e.attrs.rotate += e.opts.range.rotate[0] - k), k > e.opts.range.rotate[1] && (e.attrs.rotate += e.opts.range.rotate[1] - k));
        e.opts.range.scale && (e.attrs.scale.x * e.attrs.size.x < e.opts.range.scale[0] && (e.attrs.scale.x = e.opts.range.scale[0] / e.attrs.size.x), e.attrs.scale.y * e.attrs.size.y < e.opts.range.scale[0] && (e.attrs.scale.y = e.opts.range.scale[0] / e.attrs.size.y), e.attrs.scale.x * e.attrs.size.x > e.opts.range.scale[1] && (e.attrs.scale.x = e.opts.range.scale[1] / e.attrs.size.x), e.attrs.scale.y * e.attrs.size.y > e.opts.range.scale[1] && (e.attrs.scale.y = e.opts.range.scale[1] / e.attrs.size.y));
    }

    function f() {
        return {
            x: e.attrs.scale.x * e.attrs.size.x >= e.opts.range.scale[0] && e.attrs.scale.x * e.attrs.size.x <= e.opts.range.scale[1],
            y: e.attrs.scale.y * e.attrs.size.y >= e.opts.range.scale[0] && e.attrs.scale.y * e.attrs.size.y <= e.opts.range.scale[1]
        };
    }

    function m(b) {
        "x" === b ? e.attrs.scale.y = e.attrs.scale.x / e.attrs.ratio : e.attrs.scale.x = e.attrs.scale.y * e.attrs.ratio;
    }

    function q(b) {
        var e, c = {};
        for (e in b) {
            c[e] = "object" === typeof b[e] ? q(b[e]) : b[e];
        }
        return c;
    }

    function n(b) {
        if (e.callback) {
            var c = [];
            b.map(function(b, e) {
                b && c.push(b);
            });
            clearTimeout(u);
            setTimeout(function() {
                e.callback && e.callback(e, c);
            }, 1);
        }
    }
    if (b.freeTransform) {
        return b.freeTransform;
    }
    Array.prototype.hasOwnProperty("map") || (Array.prototype.map = function(b, e) {
        var c, d = [];
        for (c in this) {
            this.hasOwnProperty(c) && (d[c] = b.call(e, this[c], c, this));
        }
        return d;
    });
    Array.prototype.hasOwnProperty("indexOf") || (Array.prototype.indexOf = function(b, e) {
        for (var c = e || 0, d = this.length; c < d; c++) {
            if (this[c] === b) {
                return c;
            }
        }
        return -1;
    });
    var r = this,
        t = b.getBBox(!0),
        p = parent.zoom,
        e = b.freeTransform = {
            attrs: {
                x: t.x,
                y: t.y,
                size: {
                    x: t.width,
                    y: t.height
                },
                center: {
                    x: t.x + t.width / 2,
                    y: t.y + t.height / 2
                },
                rotate: 0,
                scale: {
                    x: 1,
                    y: 1
                },
                translate: {
                    x: 0,
                    y: 0
                },
                ratio: 1
            },
            axes: null,
            bbox: null,
            callback: null,
            items: [],
            handles: {
                center: null,
                x: null,
                y: null,
                del: null,
                lock: null
            },
            offset: {
                rotate: 0,
                scale: {
                    x: 1,
                    y: 1
                },
                translate: {
                    x: 0,
                    y: 0
                }
            },
            opts: {
                animate: !1,
                attrs: {
                    fill: "#fff",
                    stroke: "#000"
                },
                boundary: {
                    x: r._left || 0,
                    y: r._top || 0,
                    width: r.width,
                    height: r.height
                },
                distance: 1.3,
                drag: !0,
                draw: !1,
                keepRatio: !1,
                range: {
                    rotate: [-180, 180],
                    scale: [-99999, 99999]
                },
                rotate: !0,
                scale: !0,
                snap: {
                    rotate: 0,
                    scale: 0,
                    drag: 0
                },
                snapDist: {
                    rotate: 0,
                    scale: 0,
                    drag: 7
                },
                size: 5
            },
            subject: b
        };
    e.updateHandles = function() {
        if (e.handles.bbox || 0 <= e.opts.rotate.indexOf("self")) {
            var b = k()
        }
        k();
        var c = {
            x: (e.attrs.rotate + 45) * Math.PI / 180,
            y: (e.attrs.rotate + 225) * Math.PI / 180
        }, d = {
            x: e.attrs.size.x / 2 * e.attrs.scale.x,
            y: e.attrs.size.y / 2 * e.attrs.scale.y
        };
        e.axes.map(function(b) {
            if (e.handles[b]) {
                var f = e.attrs.center.x + e.attrs.translate.x + d[b] * e.opts.distance * Math.cos(c[b]),
                    g = e.attrs.center.y + e.attrs.translate.y + d[b] * e.opts.distance * Math.sin(c[b]);
                e.opts.boundary && (f = Math.max(Math.min(f, e.opts.boundary.x + e.opts.boundary.width), e.opts.boundary.x), g = Math.max(Math.min(g, e.opts.boundary.y + e.opts.boundary.height), e.opts.boundary.y));
                e.handles[b].disc.attr({
                    cx: f,
                    cy: g
                });
                e.handles[b].disc.toFront();
            }
        });
        if (e.bbox) {
            e.bbox.toFront().attr({
                path: [
                    ["M", b[0].x, b[0].y],
                    ["L", b[1].x, b[1].y],
                    ["L", b[2].x, b[2].y],
                    ["L", b[3].x, b[3].y],
                    ["L", b[0].x, b[0].y]
                ]
            });
            var f = [
                [-1, -1],
                [1, -1],
                [1, 1],
                [-1, 1],
                [0, -1],
                [1, 0],
                [0, 1],
                [-1, 0]
            ];
            e.handles.bbox && e.handles.bbox.map(function(c, d) {
                var g, h, k;
                c.isCorner ? (g = b[d].x, h = b[d].y) : (h = d % 4, k = (h + 1) % b.length, g = (b[h].x + b[k].x) / 2, h = (b[h].y + b[k].y) / 2);
                c.element.toFront().attr({
                    x: g - (c.isCorner ? e.opts.size.bboxCorners : e.opts.size.bboxSides),
                    y: h - (c.isCorner ? e.opts.size.bboxCorners : e.opts.size.bboxSides)
                }).transform("R" + e.attrs.rotate);
                c.x = f[d][0];
                c.y = f[d][1];
            });
        }
        var g = 13;
        p = parent.zoom;
        1 != parent.zoom && (p = 0.5, g = 6);
        e.handles.x.disc.transform("S" + p + "," + p);
        e.handles.y.disc.transform("S" + p + "," + p);
        e.handles.del.disc.transform("S" + p + "," + p);
        e.handles.center.disc.transform("S" + p + "," + p);
        e.handles.lock.disc.transform("S" + p + "," + p);
        e.circle && e.circle.attr({
            cx: e.attrs.center.x + e.attrs.translate.x,
            cy: e.attrs.center.y + e.attrs.translate.y,
            r: Math.max(d.x, d.y) * e.opts.distance
        });
        if (e.handles.center) {
            e.handles.center.disc.toFront();
            var h = -g - e.attrs.size.x * e.attrs.scale.x * 0.5,
                m = g + e.attrs.size.y * e.attrs.scale.y * 0.5,
                n = (360 - e.attrs.rotate) / 180 * Math.PI,
                q = Math.cos(n),
                r = Math.sin(n),
                n = e.attrs.translate.x + (h * q + m * r),
                h = e.attrs.translate.y + (-(h * r) + m * q);
            e.handles.center.disc.transform("...T" + n + "," + h);
            e.handles.center.disc.transform("...R" + e.attrs.rotate);
        }
        e.handles.del && (e.handles.del.disc.toFront(), h = g + e.attrs.size.x * e.attrs.scale.x * 0.5, m = -g - e.attrs.size.y * e.attrs.scale.y * 0.5, n = (360 - e.attrs.rotate) / 180 * Math.PI, q = Math.cos(n), r = Math.sin(n), n = e.attrs.translate.x + (h * q + m * r), h = e.attrs.translate.y + (-(h * r) + m * q), e.handles.del.disc.transform("...T" + n + "," + h), e.handles.del.disc.transform("...R" + e.attrs.rotate));
        e.handles.lock && (e.handles.lock.disc.toFront(), h = -g - e.attrs.size.x * e.attrs.scale.x * 0.5, m = g + e.attrs.size.y * e.attrs.scale.y * 0.5, n = (360 - e.attrs.rotate) / 180 * Math.PI, q = Math.cos(n), r = Math.sin(n), n = e.attrs.translate.x + (h * q + m * r), h = e.attrs.translate.y + (-(h * r) + m * q), e.handles.lock.disc.transform("...T" + n + "," + h), e.handles.lock.disc.transform("...R" + e.attrs.rotate));
        0 <= e.opts.rotate.indexOf("self") && (d = Math.max(Math.sqrt(Math.pow(b[1].x - b[0].x, 2) + Math.pow(b[1].y - b[0].y, 2)), Math.sqrt(Math.pow(b[2].x - b[1].x, 2) + Math.pow(b[2].y - b[1].y, 2))) / 2);
        e.handles.x.disc.toFront();
        h = g + e.attrs.size.x * e.attrs.scale.x * 0.5;
        m = g + e.attrs.size.y * e.attrs.scale.y * 0.5;
        n = (360 - e.attrs.rotate) / 180 * Math.PI;
        q = Math.cos(n);
        r = Math.sin(n);
        n = e.attrs.translate.x + (h * q + m * r);
        h = e.attrs.translate.y + (-(h * r) + m * q);
        e.handles.x.disc.transform("...T" + n + "," + h);
        e.handles.x.disc.transform("...R" + e.attrs.rotate);
        e.handles.y.disc.toFront();
        h = -g - e.attrs.size.x * e.attrs.scale.x * 0.5;
        m = -g - e.attrs.size.y * e.attrs.scale.y * 0.5;
        n = (360 - e.attrs.rotate) / 180 * Math.PI;
        q = Math.cos(n);
        r = Math.sin(n);
        n = e.attrs.translate.x + (h * q + m * r);
        h = e.attrs.translate.y + (-(h * r) + m * q);
        e.handles.y.disc.transform("...T" + n + "," + h);
        e.handles.y.disc.transform("...R" + e.attrs.rotate);
        return e;
    };
    e.showHandles = function() {
        var c = ["x", "y", "center", "del", "lock"];
        e.hideHandles();
        e.axes.map(function(b) {
            e.handles[b] = {};
            k();
            "x" == b ? e.handles.x.disc = r.image("http://open.dev.jzw.la/designer/html5/ezd/images/bbResize.png", e.attrs.center.x - 15, e.attrs.center.y - 15, 30, 30).attr(e.opts.attrs) : e.handles.y.disc = r.image("http://open.dev.jzw.la/designer/html5/ezd/images/bbRotate.png", e.attrs.center.x - 15, e.attrs.center.y - 15, 30, 30).attr(e.opts.attrs);
        });
        if (0 <= e.opts.draw.indexOf("bbox")) {
            e.bbox = r.path("").attr({
                stroke: e.opts.attrs.stroke,
                "stroke-dasharray": "- ",
                opacity: 0.5
            });
            e.handles.bbox = [];
            var d, g;
            for (d = 0 <= e.opts.scale.indexOf("bboxCorners") ? 0 : 4; d < (-1 === e.opts.scale.indexOf("bboxSides") ? 4 : 8); d++) {
                g = {}, g.axis = d % 2 ? "x" : "y", g.isCorner = 4 > d, g.element = r.rect(e.attrs.center.x, e.attrs.center.y, 2 * e.opts.size[g.isCorner ? "bboxCorners" : "bboxSides"], 2 * e.opts.size[g.isCorner ? "bboxCorners" : "bboxSides"]).attr(e.opts.attrs), e.handles.bbox[d] = g;
            }
        } - 1 !== e.opts.draw.indexOf("circle") && (e.circle = r.circle(0, 0, 0).attr({
            stroke: e.opts.attrs.stroke,
            "stroke-dasharray": "- ",
            opacity: 0.3
        })); - 1 !== e.opts.drag.indexOf("center") && (e.handles.center = {}, e.handles.center.disc = r.image("http://open.dev.jzw.la/designer/html5/ezd/images/tp.png", e.attrs.center.x - 15, e.attrs.center.y - 15, 30, 30).attr(e.opts.attrs)); - 1 !== e.opts.lock.indexOf("lock") && (e.handles.lock = {}, e.handles.lock.disc = r.image("http://open.dev.jzw.la/designer/html5/ezd/images/bbLock.png", e.attrs.center.x - 15, e.attrs.center.y - 15, 30, 30).attr(e.opts.attrs), e.handles.lock.disc.node.onclick = function() {
            console.debug(e.handles.lock); - 1 !== e.opts.keepRatio.indexOf("axisX") ? (e.opts.keepRatio = [], e.handles.lock.disc.node.src = "http://open.dev.jzw.la/designer/html5/ezd/images/bbUnLock.png") : (e.opts.keepRatio = ["axisX", "axisY"], e.handles.lock.disc.node.src = "http://open.dev.jzw.la/designer/html5/ezd/images/bbLock.png");
        }); - 1 !== e.opts.del.indexOf("del") && (e.handles.del = {}, e.handles.del.disc = r.image("http://open.dev.jzw.la/designer/html5/ezd/images/bbClose.png", e.attrs.center.x - 15, e.attrs.center.y - 15, 30, 30).attr(e.opts.attrs), e.handles.del.disc.node.onclick = deleteUserImage);
        for (d = 0; d < c.length; d++) {}
        e.axes.map(function(b) {
            if (e.handles[b]) {
                var c = -1 !== e.opts.rotate.indexOf("axis" + b.toUpperCase()),
                    d = -1 !== e.opts.scale.indexOf("axis" + b.toUpperCase());
                e.handles[b].disc.drag(function(f, g) {
                    e.o.viewBoxRatio && (f *= e.o.viewBoxRatio.x, g *= e.o.viewBoxRatio.y);
                    var k = f + e.handles[b].disc.ox,
                        p = g + e.handles[b].disc.oy;
                    console.debug(e.handles[b].disc.ox);
                    var s = {
                        x: 0 > e.o.scale.x,
                        y: 0 > e.o.scale.y
                    };
                    if (c) {
                        var q = Math.atan2(p - e.o.center.y - e.o.translate.y, k - e.o.center.x - e.o.translate.x);
                        e.attrs.rotate = 180 * q / Math.PI - ("y" === b ? 225 : 45);
                        s[b] && (e.attrs.rotate -= 180);
                    }
                    e.opts.boundary && (k = Math.max(Math.min(k, e.opts.boundary.x + e.opts.boundary.width), e.opts.boundary.x), p = Math.max(Math.min(p, e.opts.boundary.y + e.opts.boundary.height), e.opts.boundary.y));
                    k = Math.sqrt(Math.pow(k - e.o.center.x - e.o.translate.x, 2) + Math.pow(p - e.o.center.y - e.o.translate.y, 2));
                    d && (e.attrs.scale[b] = k / (e.o.size[b] / 2 * e.opts.distance), s[b] && (e.attrs.scale[b] *= -1));
                    h(); - 1 !== e.opts.keepRatio.indexOf("axis" + b.toUpperCase()) ? m(b) : e.attrs.ratio = e.attrs.scale.x / e.attrs.scale.y;
                    e.attrs.scale.x && e.attrs.scale.y && e.apply();
                    n([c ? "rotate" : null, d ? "scale" : null]);
                }, function() {
                    e.o = q(e.attrs);
                    r._viewBox && (e.o.viewBoxRatio = {
                        x: r._viewBox[2] / r.width,
                        y: r._viewBox[3] / r.height
                    });
                    e.handles[b].disc.ox = this.attrs.cx;
                    e.handles[b].disc.oy = this.attrs.cy;
                    n([c ? "rotate start" : null, d ? "scale start" : null]);
                }, function() {
                    n([c ? "rotate end" : null, d ? "scale end" : null]);
                });
            }
        });
        0 <= e.opts.draw.indexOf("bbox") && (-1 !== e.opts.scale.indexOf("bboxCorners") || -1 !== e.opts.scale.indexOf("bboxSides")) && e.handles.bbox.map(function(b) {
            b.element.drag(function(c, d) {
                e.o.viewBoxRatio && (c *= e.o.viewBoxRatio.x, d *= e.o.viewBoxRatio.y);
                var g, k, p, s, r, u = q(e.attrs);
                g = e.o.rotate.sin;
                k = e.o.rotate.cos;
                s = c * g + d * k;
                p = (c * k - d * g) * Math.abs(b.x);
                s *= Math.abs(b.y);
                e.attrs.translate = {
                    x: e.o.translate.x + (p * k + s * g) / 2,
                    y: e.o.translate.y + (p * -g + s * k) / 2
                };
                s = e.o.handlePos.cx + c - e.attrs.center.x - e.attrs.translate.x;
                r = e.o.handlePos.cy + d - e.attrs.center.y - e.attrs.translate.y;
                p = s * k - r * g;
                s = s * g + r * k;
                if (b.isCorner && -1 !== e.opts.keepRatio.indexOf("bboxCorners")) {
                    r = e.attrs.size.x * e.attrs.scale.x / (e.attrs.size.y * e.attrs.scale.y);
                    var v = 1 / r * b.x * p,
                        x = s * b.y * r;
                    x > v * r ? p = x * b.x : s = v * b.y;
                }
                e.attrs.scale = {
                    x: 2 * p * b.x / e.o.size.x || e.attrs.scale.x,
                    y: 2 * s * b.y / e.o.size.y || e.attrs.scale.y
                };
                f().x && f().y || (e.attrs = u);
                h();
                if (b.isCorner && -1 !== e.opts.keepRatio.indexOf("bboxCorners") || !b.isCorner && -1 !== e.opts.keepRatio.indexOf("bboxSides")) {
                    m(b.axis), p = (e.attrs.scale.x - e.o.scale.x) * e.o.size.x * b.x, u = (e.attrs.scale.y - e.o.scale.y) * e.o.size.y * b.y, e.attrs.translate.x = e.o.translate.x + (p * k + u * g) / 2, e.attrs.translate.y = e.o.translate.y + (-p * g + u * k) / 2;
                }
                e.attrs.ratio = e.attrs.scale.x / e.attrs.scale.y;
                n(["scale"]);
                e.apply();
            }, function() {
                var c = (360 - e.attrs.rotate) % 360 / 180 * Math.PI,
                    d = b.element.attr(["x", "y"]);
                e.o = q(e.attrs);
                e.o.handlePos = {
                    cx: d.x + e.opts.size[b.isCorner ? "bboxCorners" : "bboxSides"],
                    cy: d.y + e.opts.size[b.isCorner ? "bboxCorners" : "bboxSides"]
                };
                e.o.rotate = {
                    sin: Math.sin(c),
                    cos: Math.cos(c)
                };
                r._viewBox && (e.o.viewBoxRatio = {
                    x: r._viewBox[2] / r.width,
                    y: r._viewBox[3] / r.height
                });
                n(["scale start"]);
            }, function() {
                n(["scale end"]);
            });
        });
        c = [];
        0 <= e.opts.drag.indexOf("self") && -1 === e.opts.scale.indexOf("self") && -1 === e.opts.rotate.indexOf("self") && c.push(b);
        0 <= e.opts.drag.indexOf("center") && c.push(e.handles.center.disc);
        c.map(function(c) {
            c.drag(function(b, c) {
                e.o.viewBoxRatio && (b *= e.o.viewBoxRatio.x, c *= e.o.viewBoxRatio.y);
                e.attrs.translate.x = e.o.translate.x + b;
                e.attrs.translate.y = e.o.translate.y + c;
                var d = q(e.o.bbox);
                d.x += b;
                d.y += c;
                h(d);
                n(["drag"]);
                e.apply();
            }, function() {
                e.o = q(e.attrs);
                e.opts.snap.drag && (e.o.bbox = b.getBBox());
                r._viewBox && (e.o.viewBoxRatio = {
                    x: r._viewBox[2] / r.width,
                    y: r._viewBox[3] / r.height
                });
                e.axes.map(function(b) {
                    e.handles[b] && (e.handles[b].disc.ox = e.handles[b].disc.attrs.cx, e.handles[b].disc.oy = e.handles[b].disc.attrs.cy);
                });
                n(["drag start"]);
            }, function() {
                n(["drag end"]);
            });
        });
        var p = 0 <= e.opts.rotate.indexOf("self"),
            u = 0 <= e.opts.scale.indexOf("self");
        (p || u) && b.drag(function(b, c, d, f) {
            p && (console.debug(d), b = Math.atan2(f - e.o.center.y - e.o.translate.y, d - e.o.center.x - e.o.translate.x), e.attrs.rotate = e.o.rotate + 180 * b / Math.PI - e.o.deg);
            b = 0 > e.o.scale.x;
            c = 0 > e.o.scale.y;
            u && (d = Math.sqrt(Math.pow(d - e.o.center.x - e.o.translate.x, 2) + Math.pow(f - e.o.center.y - e.o.translate.y, 2)), e.attrs.scale.x = e.attrs.scale.y = (b ? -1 : 1) * e.o.scale.x + (d - e.o.radius) / (e.o.size.x / 2), b && (e.attrs.scale.x *= -1), c && (e.attrs.scale.y *= -1));
            h();
            e.apply();
            n([p ? "rotate" : null, u ? "scale" : null]);
        }, function(b, c) {
            e.o = q(e.attrs);
            e.o.deg = 180 * Math.atan2(c - e.o.center.y - e.o.translate.y, b - e.o.center.x - e.o.translate.x) / Math.PI;
            e.o.radius = Math.sqrt(Math.pow(b - e.o.center.x - e.o.translate.x, 2) + Math.pow(c - e.o.center.y - e.o.translate.y, 2));
            r._viewBox && (e.o.viewBoxRatio = {
                x: r._viewBox[2] / r.width,
                y: r._viewBox[3] / r.height
            });
            n([p ? "rotate start" : null, u ? "scale start" : null]);
        }, function() {
            n([p ? "rotate end" : null, u ? "scale end" : null]);
        });
        e.updateHandles();
        return e;
    };
    e.hideHandles = function(b) {
        b = b || {};
        "undefined" === typeof b.undrag && (b.undrag = !0);
        b.undrag && e.items.map(function(b) {
            b.el.undrag();
        });
        e.handles.center && (e.handles.center.disc.remove(), e.handles.center = null);
        ["x", "y"].map(function(b) {
            e.handles[b] && (e.handles[b].disc.remove(), e.handles[b] = null);
        });
        e.bbox && (e.bbox.remove(), e.bbox = null, e.handles.bbox && (e.handles.bbox.map(function(b) {
            b.element.remove();
        }), e.handles.bbox = null));
        e.circle && (e.circle.remove(), e.circle = null);
        e.handles.del && (e.handles.del.disc.remove(), e.handles.del = null);
        e.handles.lock && (e.handles.lock.disc.remove(), e.handles.lock = null);
        return e;
    };
    e.setOpts = function(b, c) {
        e.callback = "function" === typeof c ? c : !1;
        var d, f;
        for (d in b) {
            if (b[d] && b[d].constructor === Object) {
                for (f in b[d]) {
                    b[d].hasOwnProperty(f) && (e.opts[d][f] = b[d][f]);
                }
            } else {
                e.opts[d] = b[d];
            }
        }!0 === e.opts.animate && (e.opts.animate = {
            delay: 700,
            easing: "linear"
        });
        !0 === e.opts.drag && (e.opts.drag = ["center", "self"]);
        !0 === e.opts.keepRatio && (e.opts.keepRatio = ["bboxCorners", "bboxSides"]);
        !0 === e.opts.rotate && (e.opts.rotate = ["axisY"]);
        !0 === e.opts.scale && (e.opts.scale = ["axisX", "bboxCorners", "bboxSides"]);
        e.opts.del = ["del"];
        e.opts.lock = ["lock"];
        ["drag", "draw", "keepRatio", "rotate", "scale"].map(function(b) {
            !1 === e.opts[b] && (e.opts[b] = []);
        });
        e.axes = [];
        (0 <= e.opts.rotate.indexOf("axisX") || 0 <= e.opts.scale.indexOf("axisX")) && e.axes.push("x");
        (0 <= e.opts.rotate.indexOf("axisY") || 0 <= e.opts.scale.indexOf("axisY")) && e.axes.push("y");
        ["drag", "rotate", "scale"].map(function(b) {
            e.opts.snapDist[b] || (e.opts.snapDist[b] = e.opts.snap[b]);
        });
        e.opts.range = {
            rotate: [parseFloat(e.opts.range.rotate[0]), parseFloat(e.opts.range.rotate[1])],
            scale: [parseFloat(e.opts.range.scale[0]), parseFloat(e.opts.range.scale[1])]
        };
        e.opts.snap = {
            drag: parseFloat(e.opts.snap.drag),
            rotate: parseFloat(e.opts.snap.rotate),
            scale: parseFloat(e.opts.snap.scale)
        };
        e.opts.snapDist = {
            drag: parseFloat(e.opts.snapDist.drag),
            rotate: parseFloat(e.opts.snapDist.rotate),
            scale: parseFloat(e.opts.snapDist.scale)
        };
        "string" === typeof e.opts.size && (e.opts.size = parseFloat(e.opts.size));
        isNaN(e.opts.size) || (e.opts.size = {
            axes: e.opts.size,
            bboxCorners: e.opts.size,
            bboxSides: e.opts.size,
            center: e.opts.size
        });
        e.showHandles();
        n(["init"]);
        return e;
    };
    e.setOpts(d, c);
    e.apply = function() {
        e.items.map(function(b, c) {
            var d = e.attrs.center.x + e.offset.translate.x,
                f = e.attrs.center.y + e.offset.translate.y,
                g = e.attrs.rotate - e.offset.rotate,
                h = e.attrs.scale.x / e.offset.scale.x,
                k = e.attrs.scale.y / e.offset.scale.y,
                p = e.attrs.translate.x - e.offset.translate.x,
                m = e.attrs.translate.y - e.offset.translate.y;
            e.opts.animate ? (n(["animate start"]), b.el.animate({
                transform: ["R", g, d, f, "S", h, k, d, f, "T", p, m] + e.items[c].transformString
            }, e.opts.animate.delay, e.opts.animate.easing, function() {
                n(["animate end"]);
                e.updateHandles();
            })) : (b.el.transform(["R", g, d, f, "S", h, k, d, f, "T", p, m] + e.items[c].transformString), n(["apply"]), e.updateHandles());
        });
        return e;
    };
    e.unplug = function() {
        var c = e.attrs;
        e.hideHandles();
        delete b.freeTransform;
        return c;
    };
    g(b);
    e.items.map(function(b, c) {
        b.el._ && b.el._.transform && "object" === typeof b.el._.transform && b.el._.transform.map(function(b) {
            if (b[0]) {
                switch (b[0].toUpperCase()) {
                    case "T":
                        e.items[c].attrs.translate.x += b[1];
                        e.items[c].attrs.translate.y += b[2];
                        break;
                    case "S":
                        e.items[c].attrs.scale.x *= b[1];
                        e.items[c].attrs.scale.y *= b[2];
                        break;
                    case "R":
                        e.items[c].attrs.rotate += b[1];
                }
            }
        });
    });
    "set" !== b.type && (e.attrs.rotate = e.items[0].attrs.rotate, e.attrs.scale = e.items[0].attrs.scale, e.attrs.translate = e.items[0].attrs.translate, e.items[0].attrs = {
        rotate: 0,
        scale: {
            x: 1,
            y: 1
        },
        translate: {
            x: 0,
            y: 0
        }
    }, e.items[0].transformString = "");
    e.attrs.ratio = e.attrs.scale.x / e.attrs.scale.y;
    var u = !1;
    e.updateHandles();
    return e;
};

(function(b) {
    b.el.cloneToPaper = function(b) {
        return !this.removed && b[this.type]().attr(this.attr());
    };
    b.st.cloneToPaper = function(b) {
        console.log("ID", b.canvas.id);
        b.setStart();
        this.forEach(function(c) {
            c.cloneToPaper(b);
        });
        return b.setFinish();
    };
})(window.Raphael);
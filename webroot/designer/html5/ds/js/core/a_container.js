Namespace("container");
container.BoundingContainer = function(b, d, c) {
    function g() {
        ezd.hm.enable = !1;
    }

    function k() {
        eventManager.trigger("elementEdited", null);
        console.debug("***Multiple Elements was updated***");
        ezd.hm.enable = !0;
    }

    function h(b, c) {
        if (aa) {
            for (var d = Math.getElementPolygon(da.x, da.y, da.width, da.height, da.rotation), f = [], g = 0; g < s.length; g++) {
                var h = Math.getElementPolygon(s[g].x, s[g].y, s[g].width, s[g].height, s[g].rotation);
                if (Math.doPolygonsIntersect(h, d)) {
                    if (h = s[g].getNode().items, b && h) {
                        for (var k = 0; k < h.length; k++) {
                            c.target === h[k].node && f.push(s[g]);
                        }
                    } else {
                        f.push(s[g]);
                    }
                }
            }
            0 < f.length ? b ? p.selectElement(f[f.length - 1]) : (p.selectElement(f), eventManager.trigger("elementsSelected", f)) : (e.hide() ,p.hideRegion() , y = null);
            da = null;
        }
    }

    function f() {
        if (0 != s.length) {
            for (var b = 0; b < s.length; b++) {
                for (var c = s[b].getNode(), e = 0; e < c.length; e++) {
                    null == c[e].next && (c[e].next = c[e + 1]);
                }
                try {
                    s[b].getNode().toFront();
                } catch (d) {}
            }
        }
    }

    function m(b) {
        p._popup = new PopupMenu;
        p._popup.setContainer(b);
        p._popup.add("删除 ", function(c) {
            b.removeSelection();
        }, "copy");
        p._popup.add("复制 ", function(c) {
            b.copyElement();
        }, "copy");
        p._popup.add("粘贴 ", function(c) {
            b.pasteElement();
            fa = !1;
            W && W.remove();
            da && h();
        }, "paste");
        p._popup.addSeparator();
        p._popup.add("移到顶层", function(c) {
            b.setChildIndex(b.getSelections(), b.getChildIndex(b.getSelections()) + 1);
        }, "bringtofront");
        p._popup.add("移到底层", function(c) {
            b.setChildIndex(b.getSelections(), b.getChildIndex(b.getSelections()) - 1);
        }, "sendtoback");
        p._popup.addSeparator();
        p._popup.add("上移一层", function(c) {
            b.setChildIndex(b.getSelections(), b.elements.length - 1);
        }, "bringaboveobjects");
        p._popup.add("下移一层", function(c) {
            b.setChildIndex(b.getSelections(), 0);
        }, "sendunderobjects");
        p._popup.addSeparator();
        p._popup.add("水平翻转", function(c) {
            b.isMultiple() ? b.flipHMultiple() : (b.getSelections().flipH ? b.getSelections().flipH = 0 : b.getSelections().flipH = 1, b.reportEditionForLayers());
        }, "fliphorizontal");
        p._popup.add("垂直翻转", function(c) {
            b.isMultiple() ? b.flipVMultiple() : (b.getSelections().flipV ? b.getSelections().flipV = 0 : b.getSelections().flipV = 1, b.reportEditionForLayers());
        }, "flipvertical");
        p._popup.addSeparator();
        p._popup.add("对齐到中心", function(c) {
            y && (b.isMultiple() ? b.snapToCenterMultiple() : b.getSelections().x = R.x + R.width / 2, p.selectElement(y));
        }, "center");
        p._popup.setSize(200, 0);
        p._popup.bind(u);
    }

    function q() {

        if (X) {
            for (var b = 0; b < X.length; b++) {
                X[b].remove();
            }
            X.remove();
            X.length = 0;
            X = null;
        }

    }

    function n() {
        if (!X) {
            X = w.set();
            var b = w.text(R.x + R.width / 2, R.height + 10, "设计区域").attr({
                fill: "#ffffff",
                "font-size": 12,
                "font-weight": "bold"
            });
            if (!wa && !xa) {
                var c = p.getNormalSquare(R, ta, 0, 0, qa, "UI"),
                    e = w.rect(R.x, R.height, R.width, 20).attr({
                        stroke: "#fe199d",
                        fill: "#fe199d"
                    })
            }
            wa && (c = p.getEllipse(R, 0, 0, qa, "UI"), e = p.getEllipse(R, 0, 0, qa, "UI"));
            xa && (c = p.getRoundedSquare(R, ta, 0, 0, qa, "UI"), e = p.getRoundedSquare(R, ta, 0, 0, qa, "UI"));
            b.getBBox();
            var d = "r" + qa + "",
                f = d + "-" + R.width / 2 + ",-10";
            c.transform(d);
            e.transform(f);
            X.push(c);
            X.push(e);
            X.push(b);
            b.toFront();
            b.toBack();
            if (80 > R.width || wa || xa || 0 != qa) {
                b.remove(), e.remove();
            }
            c.toBack();
            e.toBack();
        }
    }

    function r(b) {
        ea = b;
    }

    function t() {
        return ea;
    }

    function t() {
        return ea;
    }

    function r(b) {
        (ea = b) ? p._popup.bind(u) : p._popup.unbind(u);
    }
    var p = this,
        e, u = c,
        s = d,
        w = b,
        v = 0,
        x = 0,
        B = 1,
        y, D = {
            x: 0,
            y: 0,
            width: 1,
            height: 1
        }, V = [],
        ca, M, A, G, H, Q, da, W, fa = !1,
        ja = !1,
        F = null,
        I = !1,
        P = !0,
        O = !1,
        N = !0,
        U = !0,
        Z = 4,
        L = 3,
        K = 3,
        T = !0,
        J = !0,
        E = !0,
        S = !1,
        ea = !0,
        oa = 0,
        z = 20,
        ka, R, X, la = ea = !0,
        ma = !0,
        aa = !0,
        na, va = !0,
        wa = ezdVars.DemoOval || !1,
        xa = !1,
        ta = 50,
        qa = ezdVars.RegionAngle || 0;
    this.clear = function() {
        e.reset();
    };
    this.updateScale = function() {
        e.updateUIScale();
    };
    this.getEllipse = function(b, c, e, d, f, g, h, k) {
        var p = b.x + b.width / 2,
            m = b.y + b.height / 2,
            s = b.width / 2;
        b = b.height / 2;
        var u = {}, n = {};
        s >= b ? (n = Math.sqrt(Math.pow(s, 2) - Math.pow(b, 2)), u = {
            x: p + n,
            y: m
        }, n = {
            x: p - n,
            y: m
        }) : (n = Math.sqrt(Math.pow(b, 2) - Math.pow(s, 2)), u = {
            x: p,
            y: m + n
        }, n = {
            x: p,
            y: m - n
        });
        u = Math.getRotatedPoint(u.x, u.y, d, p, m);
        n = Math.getRotatedPoint(n.x, n.y, d, p, m);
        if ("INSIDE" == f) {
            c = Math.getElementPolygon(c, e, g, h, k);
            e = {
                value: !0,
                nodesOutside: [0, 0, 0, 0]
            };
            for (f = 0; f < c.length; f++) {
                if (g = c[f], h = Math.sqrt(Math.pow(u.x - g.x, 2) + Math.pow(u.y - g.y, 2)), k = Math.sqrt(Math.pow(n.x - g.x, 2) + Math.pow(n.y - g.y, 2)), s >= b ? h + k > 2 * s && (e.value = !1, e.nodesOutside[f] = {
                    x: g.x,
                    y: g.y,
                    index: f
                }) : h + k > 2 * b && (e.value = !1, e.nodesOutside[f] = {
                    x: g.x,
                    y: g.y,
                    index: f
                }), !e.value) {
                    g = [];
                    for (h = 0; 360 > h; h += 3) {
                        var q = h / 180 * Math.PI;
                        k = s * Math.cos(q);
                        q = b * Math.sin(q);
                        k = Math.getRotatedPoint(k + p, q + m, d, p, m);
                        g.push(k);
                    }
                    k = [];
                    for (h = 0; h < g.length - 1; h++) {
                        var q = (g[h].y - g[h + 1].y) / (g[h].x - g[h + 1].x),
                            r = 1 / -q;
                        k.push({
                            p1: g[h],
                            p2: g[h + 1],
                            m: q,
                            invM: r
                        });
                    }
                    q = (g[0].y - g[g.length - 1].y) / (g[0].x - g[g.length - 1].x);
                    r = 1 / -q;
                    k.push({
                        p1: g[0],
                        p2: g[g.length - 1],
                        m: q,
                        invM: r
                    });
                    e.lines = k;
                }
            }
            return e;
        }
        if ("UI" == f) {
            return p = w.ellipse(p, m, s, b).attr({
                fill: "transparent",
                stroke: "#fe199d"
            }), p.transform("r" + d + "..."), p;
        }
    };
    this.getRoundedSquare = function(b, c, d, f, g, h) {
        if ("INSIDE" == h) {
            var k = Math.getElementPolygon(b.x + b.width / 2, b.y + b.height / 2, b.width, b.height, g);
            h = k[3];
            for (var p = k[2], m = k[1], k = k[0], s = e.getDimensions(), s = Math.getElementPolygon(s.x, s.y, s.width, s.height, s.rotation), u = !0, u = 0; u < s.length; u++) {
                var n = s[u];
                0 < Math.triangleArea(h, p, n) || 0 < Math.triangleArea(p, m, n) || 0 < Math.triangleArea(m, k, n) || 0 < Math.triangleArea(k, h, n) || Math.distance(h, n) < c || Math.distance(p, n) < c || Math.distance(m, n) < c || Math.distance(k, n);
            }
            b = w.rect(b.x, b.y, b.width, b.height, c).attr({
                fill: "transparent",
                stroke: "#fe199d"
            });
            b.transform("r" + g + "...");
            u = b.isPointInside(d, f);
            b.remove();
            return u;
        }
        if ("UI" == h) {
            return b = w.rect(b.x, b.y, b.width, b.height, c).attr({
                fill: "transparent",
                stroke: "#fe199d"
            }), b.transform("r" + g + "..."), b;
        }
    };
    this.rotateDesign = function(b) {
        g();
        p.selectAll();
        p.getSelections().length || (b = p.getSelections().rotation + b);
        this.updateElement(D.x, D.y, b, D.width, D.height, "rotate");
        e.hide();
        p.hide();
        k();
    };
    this.getNormalSquare = function(b, c, e, d, f, g, h, k, p) {
        if ("INSIDE" == g) {
            var m = Math.getElementPolygon(b.x + b.width / 2, b.y + b.height / 2, b.width, b.height, f);
            f = m[3];
            c = m[2];
            g = m[1];
            m = m[0];
            d = Math.getElementPolygon(e, d, h, k, p);
            e = {
                value: !0,
                nodesOutside: [0, 0, 0, 0],
                nodesinside: [0, 0, 0, 0]
            };
            for (h = 0; h < d.length; h++) {
                if (k = d[h], 0 < Math.triangleArea(f, c, k) || 0 < Math.triangleArea(c, g, k) || 0 < Math.triangleArea(g, m, k) || 0 < Math.triangleArea(m, f, k)) {
                    e.value = !1, e.nodesOutside[h] = {
                        x: k.x,
                        y: k.y,
                        index: h
                    };
                }
            }
            if (!e.value) {
                d = Math.getElementPolygon(b.x + b.width / 2, b.y + b.height / 2, b.width, b.height, qa + 1E-5);
                b = [];
                for (f = 0; 4 > f; f += 1) {
                    b.push(d[f]);
                }
                c = [];
                for (f = 0; f < b.length - 1; f++) {
                    g = (b[f].y - b[f + 1].y) / (b[f].x - b[f + 1].x), d = 1 / -g, c.push({
                        p1: b[f],
                        p2: b[f + 1],
                        m: g,
                        invM: d
                    });
                }
                g = (b[0].y - b[b.length - 1].y) / (b[0].x - b[b.length - 1].x);
                c.push({
                    p1: b[0],
                    p2: b[b.length - 1],
                    m: g,
                    invM: 1 / -g
                });
                e.lines = c;
            }
            return e;
        }
        if ("UI" == g) {
            return b = w.rect(b.x, b.y, b.width, b.height).attr({
                fill: "transparent",
                stroke: "#fe199d"
            }), b.transform("r" + f + "..."), b;
        }
    };
    this.reportEditionForLayers = function() {
        var b = this.getSelections();
        !b || 0 == b.length || 1 < b.length || (delete b.previewHtml, eventManager.trigger("elementsSelected", b), eventManager.trigger("layersChanged"));
    };
    this.checkIsInside = function(b, c, e, d, f, g, h) {
        var k;
        wa && (k = p.getEllipse(b, c, e, d, "INSIDE", f, g, h));
        xa && (k = p.getRoundedSquare(b, ta, c, e, d, "INSIDE", f, g, h));
        wa || xa || (k = p.getNormalSquare(b, ta, c, e, d, "INSIDE", f, g, h));
        return k;
    };
    this.selectElement = function(b) {
        if (b && 0 != b.length) {
            if (1 < b.length) {
                var c = w.set();
                V = [];
                for (var d = 0; d < b.length; d++) {
                    var f = w.rect(b[d].x - b[d].width / 2, b[d].y - b[d].height / 2, b[d].width, b[d].height);
                    f.rotate(b[d].rotation);
                    c.push(f);
                    V.push({
                        x: b[d].x,
                        y: b[d].y,
                        rotation: b[d].rotation,
                        width: b[d].width,
                        height: b[d].height
                    });
                }
                d = c.getBBox(!1);
                c.remove();
                D = {
                    x: d.x + d.width / 2,
                    y: d.y + d.height / 2,
                    width: d.width,
                    height: d.height
                };
                e.update(d.x + d.width / 2, d.y + d.height / 2, d.width, d.height, 0);
            } else {
                b.length && (b = b[0]), e.update(b.x, b.y, b.width, b.height, b.rotation), eventManager.trigger("elementsSelected", b), eventManager.trigger("rasterQualityChanged", b);
            }
            y = b;
            ma && (clearInterval(na), na = setInterval(function() {
                clearInterval(na);
                aa && e.show();
            }, 20), clearInterval(na), aa && e.show());
            eventManager.trigger("elementsSelected", b);
        }
    };
    this.fireClick = function() {};
    this.translateTo = function(b, c) {
        //debugger;
        D && (p.selectAll(), this.updateElement(b, c, 0, D.width, D.height, "move"), e.hide(), p.hide());
    };
    this.translateToRelative = function(b, c) {
        p.selectAll();
        this.updateElement(D.x + b, D.y + c, 0, D.width, D.height, "");
        e.hide();
        p.hide();
    };
    this.checkBoundaries = function() {
        e.dragManual();
    };
    this.checkElementSize = function(b, c) {
        if (I || c) {
            for (var e = p.checkIsInside(R, b.x, b.y, qa + 1E-5, b.width, b.height, b.rotation); !e.value;) {
                b.prototype && (b.prototype.scaleX *= 0.99, b.prototype.scaleY *= 0.99), b.width *= 0.99, b.height *= 0.99, e = p.checkIsInside(R, b.x, b.y, qa + 1E-5, b.width, b.height, b.rotation);
            }
            y && p.selectElement(p.getSelections());
        }
    };
    this.resizeToRelative = function(b) {
        p.selectAll();
        this.updateElement(D.x, D.y, 0, D.width * b, D.height * b, "");
        e.hide();
        p.hide();
    };
    this.resizeToFixedWH = function(b, c) {
        g();
        p.selectAll();
        this.updateElement(D.x, D.y, 0, b, c, "scale");
        e.hide();
        p.hide();
        k();
    };
    this.resizeTo = function(b, c) {
        if (1 == s.length) {
            var d = b / s[0].width;
            p.selectAll();
            this.updateElement(s[0].x, s[0].y, s[0].rotation, b, s[0].height * d, "scale");
            e.hide();
        } else {
            p.selectAll(), d = D.height / c, d = D.width / d, d > b ? (e.hide(), p.resizeToWidth(b)) : (this.updateElement(D.x, D.y, 0, d, c, "scale"), e.hide()), p.hide();
        }
    };
    this.resizeToWidth = function(b) {
        p.selectAll();
        this.updateElement(D.x, D.y, 0, b, D.height / (D.width / b), "scale");
        e.hide();
        p.hide();
    };
    this.resizeToHeight = function(b) {
        p.selectAll();
        this.updateElement(D.x, D.y, 0, D.width / (D.height / b), b, "scale");
        e.hide();
    };
    this.getDesignRectangle = function(b, c, e, d) {
        var f = d ? d : s;
        if (f.length) {
            d = w.set();
            for (var g = 0; g < f.length; g++) {
                var h = {
                    x: f[g].x - f[g].width / 2,
                    y: f[g].y - f[g].height / 2,
                    width: f[g].width,
                    height: f[g].height
                };
                f[g].constructor === ui.text.TextElement && 0 != f[g].arching && (h.width += 2 * f[g].stroke * f[g].strokeScale, h.height += 2 * f[g].stroke * f[g].strokeScale, h.x -= f[g].stroke, h.y -= f[g].stroke);
                if (f[g].constructor === ui.text.TextElement || f[g].constructor === ui.svg.SvgElement) {
                    f[g].getStrokeScaleX(), f[g].getStrokeScaleY();
                }
                var k = Math.getElementPolygon(s[g].x, s[g].y, s[g].width, s[g].height, s[g].rotation),
                    p = Math.getElementPolygon(R.x + R.width / 2, R.y + R.height / 2, R.width, R.height, 0);
                e && !Math.doPolygonsIntersect(k, p) || null == h || (h = w.rect(h.x, h.y, h.width, h.height), h.rotate(s[g].rotation), d.push(h));
            }
            f = d.getBBox(!1);
            e && (f.x < R.x && (f.width -= R.x - f.x, f.x = R.x, f.x1 = R.x), f.y < R.y && (f.height -= R.y - f.y, f.y = R.y), f.width > R.width && (f.width -= f.x + f.width - (R.x + R.width)), f.height > R.height && (f.height -= f.y + f.height - (R.y + R.height)));
            b && (b = Math.max(f.width, f.height) + c, c = w.rect(f.x, f.y, b, b), c.translate((f.width - b) / 2, (f.height - b) / 2), f = c.getBBox(!1), c.remove());
            d.remove();
            return {
                x: f.x,
                y: f.y,
                w: f.width,
                h: f.height
            };
        }
    };
    this.getSelections = function() {
        return y;
    };
    this.isSelected = function(b) {
        var c = !1;
        if (y && (b == y && (c = !0), 0 < y.length)) {
            for (var e = 0; e < y.length; e++) {
                y[e] == b && (c = !0);
            }
        }
        return c;
    };
    this.isMultiple = function() {
        return y && 0 < y.length ? !0 : !1;
    };
    this.selectAll = function() {
//        debugger;
        e.hide();
        y = null;
        p.selectElement(s);
    };
    this.canUpdate = function() {
        return !0;
    };
    this.reportUndo = function() {
        y && (y.length ? (console.debug(ezd.hm.enable), k()) : (console.debug(ezd.hm.enable), y.prototype.reportChange()), console.debug(ezd.hm.enable));
    };
    this.updateElement = function(b, c, e, d, f, g) {
        if (y) {
            if (0 < y.length) {
                for (f = 0; f < y.length; f++) {
                    J && (y[f].sleep = !0);
                    var h = D.width / d;
                    y[f].prototype.scaleX /= y[f].width / (V[f].width / h);
                    y[f].prototype.scaleY /= y[f].height / (V[f].height / h);
                    y[f].width = V[f].width / h;
                    y[f].height = V[f].height / h;
                    g = Math.angleTo360(V[f].rotation + e);
                    y[f].rotation = g;
                    g = -(D.x - V[f].x) / h;
                    var k = -(D.y - V[f].y) / h,
                        p = (360 - e) / 180 * Math.PI,
                        h = b + (g * Math.cos(p) + k * Math.sin(p));
                    g = c + (-(g * Math.sin(p)) + k * Math.cos(p));
                    y[f].x = h;
                    y[f].y = g;
                    J && y[f].forceUpdate();
                }
            } else {
                J && (y.sleep = !0), "rotate" == g && (y.rotation = e), "move" == g && (y.x = b, y.y = c), "scale" == g && (y.prototype.scaleX /= y.width / d, y.prototype.scaleY /= y.height / f, y.width = d, y.height = f), J && (y.sleep = !1, y.forceUpdate(g));
            }
            eventManager.trigger("designLiveEdition");
        }
    };
    this.removeChildAt = function(b) {
        -1 != b && b < s.length && 0 <= b && (s[b].remove(), s.splice(b, 1));
        f();
    };
    this.removeChild = function(b) {
        console.log("删除子节点");
        for (var c = 0; c < s.length; c++) {
            b.id == s[c].id && (s[c].remove(), s.splice(c, 1));
        }
        f();
    };
    this.removeSelection = function() {
        ezd.deleteElements(y);
    };
    this.setChildIndex = function(b, c) {
        for (var e = !1, d = -1, g = 0; g < s.length; g++) {
            b.getNode() == s[g].getNode() && (d = g);
        } - 1 != d && c < s.length && 0 <= c && (e = s[d], s.splice(d, 1), s.splice(c, 0, e), e = !0, s[c].z = c);
        f();
        eventManager.trigger("stackingOrderChanged");
        return e;
    };
    this.getChildIndex = function(b) {
        for (var c = -1, e = 0; e < s.length; e++) {
            b.getNode() == s[e].getNode() && (c = e);
        }
        return c;
    };
    this.getChildrenById = function(b) {
        for (var c = null, e = 0; e < s.length; e++) {
            b == s[e].id && (c = s[e]);
        }
        return c;
    };
    this.swapChildIndex = function(b, c) {
        for (var e = -1, d = -1, g = 0; g < s.length; g++) {
            b.getNode() == s[g].getNode() && (e = g), c.getNode() == s[g].getNode() && (d = g);
        } - 1 != e && -1 != d && (g = s[e], s[e] = s[d], s[d] = g, f());
    };
    this.removeSnapScreen = function() {
        ka && ka.remove();
    };
    this.snapToCenterMultiple = function() {
        if (0 < y.length) {
            g();
            p.selectElement(y);
            for (var b = D.x - (R.x + R.width / 2), c = 0; c < y.length; c++) {
                y[c].x -= b;
            }
            k();
        }
    };
    this.flipHMultiple = function() {
        if (0 < y.length) {
            g();
            p.selectElement(y);
            for (var b = 0; b < y.length; b++) {
                y[b].flipH = y[b].flipH ? 0 : 1, y[b].x = y[b].x > D.x ? D.x - (y[b].x - D.x) : D.x + (D.x - y[b].x), V[b].x = y[b].x;
            }
            k();
        }
    };
    this.flipVMultiple = function() {
        if (0 < y.length) {
            g();
            p.selectElement(y);
            for (var b = 0; b < y.length; b++) {
                y[b].flipV = y[b].flipV ? 0 : 1, y[b].y = y[b].y > D.y ? D.y - (y[b].y - D.y) : D.y + (D.y - y[b].y), V[b].y = y[b].y;
            }
            k();
        }
    };
    this.copyElement = function() {
        ezd._copiedElements = ezd.copySelection(!0);
        ezd._forCopySelection = y;
    };
    this.pasteElement = function() {
        ezd.copySelection(!1, ezd._forCopySelection);
    };
    this.showRegion = function() {
        va && (1 == ezd.zoom ? (la = !0, p.region = p.region) : (la = !1, p.hideRegion()));
    };
    this.hideRegion = function() {
        X && q();
    };
    this.getRegionCenter = function() {
        return R ? {
            x: R.x + R.width / 2,
            y: R.y + R.height / 2
        } : {
            x: 0,
            y: 0
        };
    };
    this.hide = function() {
//        debugger;
        e.hide();
        y = null;
    };
    this.showPopup = function() {
        p._popup.show({
            pageX: A,
            pageY: G
        });
    };
    this.init = function() {
        e || (e = new container.BoundingBox(w, p, c));
        I = ezdVars.EnforceBoundaries;
        $("#" + u).mousemove(function(b, c, e) {
            oa++;
            ca = (-1 + b.pageX - $("#" + u).offset().left) * B + v;
            M = (-1 + b.pageY - $("#" + u).offset().top) * B + x;
            A = b.pageX;
            G = b.pageY;
            ja = !0;
            W && W.remove();
            fa && (b = Math.sortedRectangle(H, Q, ca, M), W = w.rect(b.x1, b.y1, b.x2, b.y2).attr({
                "stroke-width": Math.min(1, 1 * B)
            }), da = {
                x: b.x1 + b.x2 / 2,
                y: b.y1 + b.y2 / 2,
                width: b.x2,
                height: b.y2,
                rotation: 0
            });
        });
        $("#" + u).mousedown(function(b, c, d) {
            if (aa) {
                ja = !1;
                F = b.target;
                p._popup.hide();
                c = b.target.parentNode;
                for (console.log("0", c.localName);
                     "g" == c.localName;) {
                    c = c.parentNode, console.log("1", c.localName);
                }
                "svg" != c.localName || "vml" == c.localName ? (console.log("2", c.localName), e.hide(), y = null, H = ca, Q = M, fa = !1, W && W.remove(), fa = !0) : "BoundingBox" != b.target.id && "BoundingBoxRect" != b.target.id && "designGroup1" != b.target.id && (console.log("3", c.localName), p.removeSnapScreen(), fa = !1, da = {
                    x: ca,
                    y: M,
                    width: 1,
                    height: 1,
                    rotation: 0
                }, h(!0, b));
            }
        });
        $("#" + u).mouseup(function(b, c, d) {
            aa && (e && e.stopDragEvent(), 3 != b.which && (c = b.target.parentNode, "BoundingBoxRect" != b.target.id || b.target != F || ja || (e.hide(), setTimeout(function() {
                $(document.elementFromPoint(b.clientX, b.clientY)).mousedown();
                $(document.elementFromPoint(b.clientX, b.clientY)).mouseup();
            }, 20)), "g" == c.localName && (c = c.parentNode), fa = !1, da && h()));
        });

        ka = new container.snap.SnapScreen(w, p);
        m(p);
        eventManager.on("checkInsideRegion", p.checkElementSize);
    };
    p.init();
    this.getElementUnderMouse = function() {};
    Object.defineProperty(this, "showBB", {
        set: function(b) {
            (ma = b) || e.hide();
        },
        get: function() {
            return ma;
        }
    });
    Object.defineProperty(this, "visibleRegion", {
        set: function(b) {
            (la = b) ? X || (X && q(), R && n()) : X && q();
        },
        get: function() {
            return la;
        }
    });
    Object.defineProperty(this, "elements", {
        set: function(b) {
            s = b;
            for (b = 0; b < s.length; b++) {}
            s.sort(function(b, c) {
                return b.z - c.z;
            });
            for (b = 0; b < s.length; b++) {}
            f();
            e.hide();
            y = null;
        },
        get: function() {
            return s;
        }
    });
    Object.defineProperty(this, "region", {
        set: function(b) {
            R = b;
            la && (X && q(), R && n());
        },
        get: function() {
            return R;
        }
    });
    Object.defineProperty(this, "mouseX", {
        set: function(b) {
            ca = b;
        },
        get: function() {
            return ca;
        }
    });
    Object.defineProperty(this, "mouseY", {
        set: function(b) {
            M = b;
        },
        get: function() {
            return M;
        }
    });
    Object.defineProperty(this, "enforceBoundaries", {
        set: function(b) {
            I = b;
        },
        get: function() {
            return I;
        }
    });
    Object.defineProperty(this, "snapToAngle", {
        set: function(b) {
            P = b;
        },
        get: function() {
            return P;
        }
    });
    Object.defineProperty(this, "snapAngleTolerance", {
        set: function(b) {
            Z = b;
        },
        get: function() {
            return Z;
        }
    });
    Object.defineProperty(this, "snapToMidPoint", {
        set: function(b) {
            O = b;
        },
        get: function() {
            return O;
        }
    });
    Object.defineProperty(this, "snapMidPointTolerance", {
        set: function(b) {
            L = b;
        },
        get: function() {
            return L;
        }
    });
    Object.defineProperty(this, "snapToObject", {
        set: function(b) {
            N = b;
        },
        get: function() {
            return N;
        }
    });
    Object.defineProperty(this, "snapObjectTolerance", {
        set: function(b) {
            L = b;
        },
        get: function() {
            return 3;
        }
    });
    Object.defineProperty(this, "snapScreen", {
        get: function() {
            return ka;
        }
    });
    Object.defineProperty(this, "checkNonVisibleElements", {
        set: function(b) {
            T = b;
        },
        get: function() {
            return T;
        }
    });
    Object.defineProperty(this, "snapToRegion", {
        set: function(b) {
            U = b;
        },
        get: function() {
            return U;
        }
    });
    Object.defineProperty(this, "snapRegionTolerance", {
        set: function(b) {
            K = b;
        },
        get: function() {
            return K;
        }
    });
    Object.defineProperty(this, "performance", {
        set: function(b) {
            J = b;
        },
        get: function() {
            return J;
        }
    });
    Object.defineProperty(this, "showElementsWhileTransform", {
        set: function(b) {
            E = b;
        },
        get: function() {
            return E;
        }
    });
    Object.defineProperty(this, "skipFramesPerformance", {
        set: function(b) {
            S = b;
        },
        get: function() {
            return S;
        }
    });
    Object.defineProperty(this, "updateMaxDelay", {
        set: function(b) {
            z = b;
        },
        get: function() {
            return z;
        }
    });
    Object.defineProperty(this, "contextMenu", {
        set: r,
        get: t
    });
    Object.defineProperty(this, "xOffset", {
        set: function(b) {
            v = b;
        },
        get: function() {
            return v;
        }
    });
    Object.defineProperty(this, "popup", {
        get: function() {}
    });
    Object.defineProperty(this, "yOffset", {
        set: function(b) {
            x = b;
        },
        get: function() {
            return x;
        }
    });
    Object.defineProperty(this, "zoomScale", {
        set: function(b) {
            B = b;
            for (b = 0; b < s.length; b++) {
                s[b].strokeScale = B;
            }
            p.getSelections() && p.selectElement(p.getSelections());
        },
        get: function() {
            return B;
        }
    });
    Object.defineProperty(this, "contextMenu", {
        get: t,
        set: r
    });
    Object.defineProperty(this, "regionAngle", {
        get: function() {
            return qa;
        },
        set: function(b) {
            qa = b;
        }
    });
    Object.defineProperty(this, "oval", {
        get: function() {
            return wa;
        },
        set: function(b) {
            wa = b;
        }
    });
    Object.defineProperty(this, "mouseEnabled", {
        get: function() {
            return aa;
        },
        set: function(b) {
            aa = b;
            e.hide();
        }
    });
    Object.defineProperty(this, "enableRegionBorder", {
        get: function() {
            return va;
        },
        set: function(b) {
            va = b;
            X && !1 == b && q();
        }
    });
};

container.BoundingBox = function(b, d, c) {
    function g(b) {
        clearInterval(va);
        va = setInterval(function() {}, 30);
    }

    function k(b) {
        clearInterval(va);
    }

    function h(b) {}

    function f() {
        F.removeSelection();
    }

    function m() {
        F.showPopup();
    }

    function q(b, c, e) {
        b *= F.zoomScale;
        c *= F.zoomScale;
        b = I.x + G / 2 + b;
        c = I.y + H / 2 + c;
        var d = {
            x: b,
            y: c
        };
        !0 != e && (e = {
            x: b,
            y: c
        }, F.snapToRegion && (e = Math.checkSnapToRegion({
            x: b,
            y: c
        }, F.region, G, H, Q, F.zoomScale, F.snapRegionTolerance), 0 < e.lines.length && F.snapScreen.drawRegionLines(e.lines, "#0000FF")), F.snapToMidPoint && (e = Math.checkSnapToMidPoint({
            x: e.x,
            y: e.y
        }, F, G, H, Q, F.zoomScale, F.snapMidPointTolerance), 0 < e.lines.length && F.snapScreen.drawLines(e.lines)), F.snapToObject && (e = Math.checkSnapToObject({
            x: e.x,
            y: e.y
        }, F, G, H, Q, F.zoomScale, F.snapMidPointTolerance),
            0 < e.lines.length && F.snapScreen.drawLines(e.lines)), d = e);
        b == d.x && c == d.y && F.snapScreen.removeLines();
        F.enforceBoundaries && (d = n(d.x, d.y));
        M = d.x;
        A = d.y;
        I.rotate(-Q);
        I.attr({
            x: M - G / 2,
            y: A - H / 2
        });
        !0 == F.showElementsWhileTransform && F.canUpdate() && F.updateElement(M, A, Q, G, H, "move");
        I.rotate(Q);
        D();
        V("drag");
        F.showRegion();
    }

    function n(b, c) {
        for (var e = {
            x: b,
            y: c
        }, d = Math.getElementPolygon(e.x, e.y, G, H, Q), f = [0, 0, 0, 0], g = 0; g < d.length; g++) {
            var h = d[g].x,
                k = d[g].y,
                p = (d[0].x + d[2].x) / 2,
                m = (d[0].y + d[2].y) / 2;
            h > F.region.width && F.region.width - (-p + h) < e.x && (e.x = F.region.width - (-p + h), f[g] = 1);
            0 > h && 0 - (-p + h) > e.x && (e.x = 0 - (-p + h), f[g] = 1);
            k > F.region.height && F.region.height - (-m + k) < e.y && (e.y = F.region.height - (-m + k), f[g] = 1);
            0 > k && 0 - (-m + k) > e.y && (e.y = 0 - (-m + k), f[g] = 1);
        }
        e.s = f;
        return e;
    }

    function r(b) {
        F.showRegion();
        F.getElementUnderMouse();
        I.x = I[0].attr("x");
        I.y = I[0].attr("y");
        V("drag");
        B(!1);
    }

    function t() {
        !1 != F.showElementsWhileTransform && !0 != F.skipFramesPerformance || F.updateElement(M, A, Q, G, H, "move");
        F.reportUndo();
        //F.hideRegion();
        F.removeSnapScreen();
        y(F.isMultiple());
        D();
        V("normal");
    }

    function p(b, c) {
        F.showRegion();
        var e = -oa + Math.round(Math.angleBetweenPoints(F.mouseX, F.mouseY, M, A)),
            e = Math.angleTo360(e);
        F.snapToAngle && (e = Math.snapAngle(e, 1 * F.snapAngleTolerance));
        Q = e;
        I.transform("R0");
        !0 == F.showElementsWhileTransform && F.canUpdate() && F.updateElement(M, A, Q, G, H, "rotate");
        I.transform("r" + Q + "," + M + "," + A + "...");
        F.enforceBoundaries && (e = n(M, A), e.x != M || e.y != A) && (M = e.x, A = e.y, I.rotate(-Q), I.attr({
            x: M - G / 2,
            y: A - H / 2
        }), I[0].attr({
            x: M - G / 2,
            y: A - H / 2
        }), I[1].attr({
            x: M - G / 2,
            y: A - H / 2
        }), !0 == F.showElementsWhileTransform && F.canUpdate() && F.updateElement(M, A, Q, G, H, "move"), I.rotate(Q), D(), V("normal"), 1 == e.s[0] && 1 == e.s[2] || 1 == e.s[1] && 1 == e.s[3]) && (G *= 0.9, H *= 0.9, I.transform("R0"), I.attr({
            width: G,
            height: H
        }), I.attr({
            x: M - G / 2,
            y: A - H / 2
        }), !0 == F.showElementsWhileTransform && F.canUpdate() && F.updateElement(M, A, Q, G, H, "scale"), I.transform("r" + Q + "," + M + "," + A + "t0,0..."));
        D();
    }

    function e() {
        var b = Q / 180 * Math.PI,
            c = M + (0 * Math.cos(b) + 0 * Math.sin(b)),
            b = A - (-(0 * Math.sin(b)) + 0 * Math.cos(b));
        oa = Math.abs(360 - Q) + 180 * Math.atan2(F.mouseY - b, F.mouseX - c) / Math.PI;
        D();
    }

    function u() {
        F.hideRegion();
        (!1 == F.showElementsWhileTransform || F.skipFramesPerformance) && F.updateElement(M, A, Q, G, H, "rotate");
        F.reportUndo();
        F.reportEditionForLayers();
    }

    function s(b, c) {
        if (ka) {
            F.showRegion();
            b *= F.zoomScale;
            c *= F.zoomScale;
            var e = Math.getRotatedPoint(b, c, Q, 0, 0),
                d = e.x,
                f = -e.y;
            if (this == N || this == U) {
                d = -e.x, f = e.y;
            }
            this == T && (f = -f);
            this == K && (d = -d);
            z && (f = d * na);
            if (da + 2 * d < 2 * F.zoomScale || W + 2 * f < 2 * F.zoomScale) {
                return;
            }
            G = da + 2 * d;
            H = W + 2 * f;
            if (this == L || this == T) {
                G = da, d = 0;
            }
            if (this == K || this == J) {
                H = W, f = 0;
            }
            I.transform("R0");
            I.attr({
                width: G,
                height: H
            });
            I.attr({
                x: fa - da / 2 - d,
                y: ja - W / 2 - f
            });
            !0 == F.showElementsWhileTransform && F.canUpdate() && F.updateElement(fa, ja, Q, G, H, "scale");
            I.transform("r" + Q + "," + M + "," + A + "t0,0...");
        }
        if (F.enforceBoundaries) {
            e = n(M, A);
            if (1 == e.s[0] && 1 == e.s[2] || 1 == e.s[1] && 1 == e.s[3]) {
                for (e = n(M, A); 1 == e.s[0] && 1 == e.s[2] || 1 == e.s[1] && 1 == e.s[3];) {
                    G *= 0.99, H *= 0.99, e = n(M, A);
                }
                fa = M;
                ja = A;
                _nDy = _nDx = 0;
                I.transform("R0");
                I.attr({
                    width: G,
                    height: H
                });
                I.attr({
                    x: M - G / 2,
                    y: A - H / 2
                });
                !0 == F.showElementsWhileTransform && F.canUpdate() && F.updateElement(M, A, Q, G, H, "scale");
                I.transform("r" + Q + "," + M + "," + A + "t0,0...");
                ka = !1;
                I.rotate(-Q);
                I.attr({
                    x: M - G / 2,
                    y: A - H / 2
                });
                !0 == F.showElementsWhileTransform && F.canUpdate() && F.updateElement(M, A, Q, G, H, "move");
                I.rotate(Q);
                return;
            }
            ka = !0;
            if (e.x != M || e.y != A) {
                M = e.x, A = e.y, fa = M, ja = A, _nDy = _nDx = 0, I.transform("R0"), I.attr({
                    width: G,
                    height: H
                }), I.attr({
                    x: M - G / 2,
                    y: A - H / 2
                }), I.transform("r" + Q + "," + M + "," + A + "t0,0..."), !0 == F.showElementsWhileTransform && F.canUpdate() && F.updateElement(M, A, Q, G, H, "move");
            }
        }
        D();
    }

    function w() {
        this == O || this == N || this == U || this == Z ? (z = !0, na = H / G) : z = !1;
        this.x = this.attr("x");
        this.y = this.attr("y");
        da = G;
        W = H;
        fa = M;
        ja = A;
    }

    function v() {
        F.hideRegion();
        (!1 == F.showElementsWhileTransform || F.skipFramesPerformance) && F.updateElement(fa, ja, Q, G, H, "scale");
        F.reportUndo();
        F.reportEditionForLayers();
    }

    function x(b) {
        return state && state.theme ? state.theme.url(b) : b;
    }

    function B(b) {
        !1 != b && I && I.hide();
        P && P.hide();
        O && (O.hide(), N.hide(), U.hide(), Z.hide());
        L && (L.hide(), K.hide(), T.hide(), J.hide());
        E && E.hide();
        ea && ea.hide();
    }

    function y(b) {
        P && (P.show(), P.toFront());
        O && (O.show(), N.show(), U.show(), Z.show(), O.toFront(), N.toFront(), U.toFront(), Z.toFront());
        L && !1 == b && (L.show(), K.show(), T.show(), J.show(), L.toFront(), K.toFront(), T.toFront(), J.toFront());
        E && (E.show(), E.toFront());
        ea && (ea.show(), ea.toFront());
    }

    function D(b) {
        b = R * F.zoomScale;
        var c = X * F.zoomScale,
            e = c / 3,
            d = la * F.zoomScale,
            f = ma * F.zoomScale;
        b = [{
            btn: ea,
            x: G / 2 + b / 2,
            y: -(H / 2) - 1.5 * b
        }, {
            btn: E,
            x: -(G / 2) - 1.5 * b,
            y: -(H / 2) - 1.5 * b
        }, {
            btn: O,
            x: G / 2 - c / 2 + e,
            y: H / 2 - c / 2 + e
        }, {
            btn: N,
            x: -(G / 2) - c / 2 - e,
            y: H / 2 - c / 2 + e
        }, {
            btn: U,
            x: -(G / 2) - c / 2 - e,
            y: -(H / 2) - c / 2 - e
        }, {
            btn: Z,
            x: G / 2 - c / 2 + e,
            y: -(H / 2) - c / 2 - e
        }, {
            btn: L,
            x: 0 - d / 2,
            y: H / 2
        }, {
            btn: K,
            x: -(G / 2) - d,
            y: 0 - d / 2
        }, {
            btn: T,
            x: 0 - d / 2,
            y: -(H / 2) - d
        }, {
            btn: J,
            x: G / 2,
            y: 0 - d / 2
        }, {
            btn: P,
            x: -(f / 2),
            y: -(H / 2) - 1.8 *
                f
        }, {
            btn: S,
            x: -(G / 2) - b,
            y: H / 2
        }];
        for (c = 0; c < b.length; c++) {
            var e = b[c].btn,
                d = M + b[c].x,
                f = A + b[c].y,
                g = F.zoomScale;
            e && (e.transform("R0"), e.transform("r" + Q + "," + M + "," + A + "t" + d + "," + f + "...s" + g + "," + g + ",0,0"));
        }
    }

    function V(b) {
        if (I) {
            I[0].attr({
                fill: "#000000",
                "fill-opacity": 0
            });
            I[1].attr({
                fill: "#000000",
                "fill-opacity": 0
            });
            var c = I[0].node,
                e = I[1].node;
            c.setAttribute("class", "whiteLineClass");
            e.setAttribute("class", "dashedLineClass");
            void 0 === document.documentElement.style.vectorEffect ? (c = 2 * F.zoomScale, e = 5 * F.zoomScale) : (c.setAttribute("vector-effect", "non-scaling-stroke"), e.setAttribute("vector-effect", "non-scaling-stroke"), c = 2, e = 5);
            $(".whiteLineClass").attr("stroke", "#ffffff");
            $(".whiteLineClass").attr("stroke-width", c);
            $(".dashedLineClass").attr("stroke", "#000000");
            $(".dashedLineClass").attr("stroke-width", c / 2);
            c = e + "," + e;
            $(".dashedLineClass").attr("stroke-dasharray", c);
            "drag" === b && ($(".whiteLineClass").attr("stroke", "none"), $(".dashedLineClass").attr("stroke", "#4267c7"));
        }
    }
    var ca = this,
        M, A, G, H, Q, da, W, fa, ja, F, I, P, O, N, U, Z, L, K, T, J, E, S, ea, oa, z = !0,
        ka = !0,
        R = 24,
        X = 15,
        la = 9,
        ma = 26,
        aa = b.set(),
        na, va;
    this.init = function() {
        F = d;
        eventManager.on("checkBoundaries", ca.forceBoundaries);
    };
    this.update = function(b, c, e, d, f) {
        M = b;
        A = c;
        G = e;
        H = d;
        Q = f;
    };
    this.updateUIScale = function() {
        V("normal");
    };
    this.hide = function() {
        console.log("调用 this.hide()");
        if(I){
            B(!0);
            if(F.snapScreen){
                console.log(1);
                d.snapScreen.remove();
            }
        }else{
            B(!1)
        };
    };
    this.getDimensions = function() {
        return {
            x: M,
            y: A,
            width: G,
            height: H,
            rotation: Q
        };
    };
    this.reset = function() {
        I && (console.log("删除正方形"), I.undrag(), I.remove(), I = null);
        P && (P.undrag(), P.remove(), P = null);
        O && (O.undrag(), N.undrag(), U.undrag(), Z.undrag(), O.remove(), N.remove(), U.remove(), Z.remove(), Z = U = N = O = null);
        L && (L.undrag(), K.undrag(), T.undrag(), J.undrag(), L.remove(), K.remove(), T.remove(), J.remove(), J = T = K = L = null);
        O && (O.remove(), N.remove(), U.remove(), Z.remove(), Z = U = N = O = null);
        L && (L.remove(), K.remove(), T.remove(), J.remove(), J = T = K = L = null);
        E && (E.unclick(f), E.remove(), E = null);
        ea && (ea.unclick(m), ea.remove(), ea = null);
    };
    this.show = function() {
        z = !0;
        if (!I) {
            aa = b.set();
            var c = b.rectBb(M - G / 2, A - H / 2, G, H),
                d = b.rectBb(M - G / 2, A - H / 2, G, H);
            aa.push(c);
            aa.push(d);
            aa[0].node.id = "BoundingBoxRect";
            aa[1].node.id = "BoundingBoxRect";
            I = aa;
            c = F.isMultiple();
            O = b.imageBb(x(ezdVars.DesignerLocation + "/ds/images/grasp_11px.png"), 0, 0, X, X);
            N = b.imageBb(x(ezdVars.DesignerLocation + "/ds/images/grasp_11px.png"), 0, 0, X, X);
            U = b.imageBb(x(ezdVars.DesignerLocation + "/ds/images/grasp_11px.png"), 0, 0, X, X);
            Z = b.imageBb(x(ezdVars.DesignerLocation + "/ds/images/grasp_11px.png"), 0, 0, X, X);
            O.node.id = "BoundingBox";
            N.node.id = "BoundingBox";
            U.node.id = "BoundingBox";
            Z.node.id = "BoundingBox";
            L = b.imageBb(x(ezdVars.DesignerLocation + "/ds/images/grasp_8.5px.png"), 0, 0, la, la);
            K = b.imageBb(x(ezdVars.DesignerLocation + "/ds/images/grasp_8.5px.png"), 0, 0, la, la);
            T = b.imageBb(x(ezdVars.DesignerLocation + "/ds/images/grasp_8.5px.png"), 0, 0, la, la);
            J = b.imageBb(x(ezdVars.DesignerLocation + "/ds/images/grasp_8.5px.png"), 0, 0, la, la);
            L.node.id = "BoundingBox";
            K.node.id = "BoundingBox";
            T.node.id = "BoundingBox";
            J.node.id = "BoundingBox";
            c || (L.hide(), K.hide(), T.hide(), J.hide());
            O && (O.drag(s, w, v), N.drag(s, w, v), U.drag(s, w, v), Z.drag(s, w, v));
            L && (L.drag(s, w, v), K.drag(s, w, v), T.drag(s, w, v), J.drag(s, w, v));
            E = b.imageBb(x(ezdVars.DesignerLocation + "/ds/images/delete.png"), 0, 0, R, R);
            E.node.id = "BoundingBox";
            E.click(f);
            ea = b.imageBb(x(ezdVars.DesignerLocation + "/ds/images/tools.png"), 0, 0, R, R);
            ea.node.id = "BoundingBox";
            ea.click(m);
            P = b.imageBb(x(ezdVars.DesignerLocation + "/ds/images/rotate-tall.png"), 0, 0, ma, 1.5 * ma);
            P.node.id = "BoundingBox";
            P.drag(p, e, u);
            I.drag(q, r, t);
            I.mousedown(g);
            I.mouseup(k);
            I.mousemove(h);
        }
        I.show();
        I.x = I[0].attr("x");
        I.y = I[0].attr("y");
        I.rotate(Q);
        y(F.isMultiple());
        D();
        V("normal");
        I.transform("R0");
        I.attr({
            width: G,
            height: H
        });
        I.attr({
            x: M - G / 2,
            y: A - H / 2
        });
        I.transform("r" + Q + "," + M + "," + A + "t0,0...");
        I.toFront();
    };
    this.stopDragEvent = function() {};
    this.dragManual = function() {
        I && (F.getElementUnderMouse(), I.x = I[0].attr("x"), I.y = I[0].attr("y"));
        q(0, 0, !0);
    };
    this.forceBoundaries = function() {
        if (F.enforceBoundaries && I) {
            F.getElementUnderMouse();
            I.x = I[0].attr("x");
            I.y = I[0].attr("y");
            V("normal");
            z = !0;
            na = H / G;
            da = G;
            W = H;
            fa = M;
            ja = A;
            for (var b = I.getBBox(); b.width - b.x > F.region.width || b.height - b.y > F.region.height;) {
                b = I.getBBox(), G *= 0.98, H *= 0.98, I.transform("R0"), I.attr({
                    width: G,
                    height: H
                }), I.attr({
                    x: M - G / 2,
                    y: A - H / 2
                }), !0 == F.showElementsWhileTransform && F.canUpdate() && F.updateElement(M, A, Q, G, H, "scale"), I.transform("r" + Q + "," + M + "," + A + "t0,0...");
            }
            ca.dragManual();
            I.attr({
                width: G,
                height: H
            });
        }
    };
    ca.init();
};
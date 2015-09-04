Namespace("ui.svg");
ui.svg.SvgElement = function(b, d, c) {
    function g() {
        if (w) {
            for (var b = "", c = w.textContent.split("}"), e = 0; e < c.length; e++) {
                var d = c[e].trim() + "}",
                    d = d.replace("{}", "{fill:#000000}"),
                    f = d.match(/\.(fil|st)(\d+){(fill|stroke):([^;]+);*}/);
                if (f && !(5 > f.length)) {
                    for (var h = f[4], d = f[3], g = f[1], k = g + f[2], f = parseInt(f[2], 10), p = k + "_" + r, m = s.getElementsByClassName(k), u = [], n = 0; n < m.length; n++) {
                        u.push(m[n]);
                    }
                    for (n = 0; n < u.length; n++) {
                        u[n].setAttribute("class", u[n].getAttribute("class").replace(k, p));
                    }
                    b += "." + p + "{" + d + ":" + h + "}";
                    k = y[f];
                    k || (k = p, p = h.substring(h.lastIndexOf("(") + 1, h.lastIndexOf(")")), p.length && (p = p.split(","), h = rgbToHex(1 * p[0], 1 * p[1], 1 * p[2])), k = {
                        style: k,
                        color: h,
                        is_stroke: "stroke" == d,
                        is_fill: "fill" == d
                    });
                    k.prefix = g;
                    "stroke" === d ? k.prefixStroke = g : k.prefixFill = g;
                    k.is_stroke = k.is_stroke || "stroke" == d;
                    k.is_fill = k.is_fill || "fill" == d;
                    y[f] = k;
                }
            }
            w.textContent = b;
            eventManager.trigger("designColorsChanged");
        }
    }

    function k(b) {
        console.debug(b);
    }

    function h() {
        u.appendChild(w);
        u.appendChild(s);
        for (var b in x) {
            "undefined" != typeof n[b] && (n[b] = x[b]);
        }
        setTimeout(function() {
            console.debug("***element完成初始化***");
            state.isInitialDesign = true;
            eventManager.trigger("elementRendered", n);
        }, 10);
    }

    function f() {
        s.removeAttribute("transform");
        s.parentNode.removeAttribute("transform");
        M.removeAttribute("viewBox");
        var b = s.getBBox(),
            b = {
                x: b.x,
                y: b.y,
                width: b.width,
                height: b.height,
                x: 0,
                y: 0
            }, c = ca,
            e = A / b.width,
            d = G / b.height;
        I && (e *= -1);
        P && (d *= -1);
        s.setAttribute("transform", " rotate(" + W + " " + H + " " + Q + ") scale(" + e + " " + d + ") translate(" + ((b.x + H - 0.5 * A) / e - (I ? b.width : 0) - c.x) + "," + ((b.y + Q - 0.5 * G) / d - (P ? b.height : 0) - c.y) + ") ");
        M.setAttribute("viewBox", c.x + " " + c.y + " " + D + " " + V);
        n.prototype.reportChange();
        b = s.getBBox();
        b = {
            x: b.x,
            y: b.y,
            width: b.width,
            height: b.height
        };
        e = s.ownerSVGElement;
        c = s.getTransformToElement(s.parentNode);
        e = [e.createSVGPoint(), e.createSVGPoint(), e.createSVGPoint(), e.createSVGPoint()];
        e[0].x = b.x;
        e[0].y = b.y;
        e[1].x = b.x + b.width;
        e[1].y = b.y;
        e[2].x = b.x + b.width;
        e[2].y = b.y + b.height;
        e[3].x = b.x;
        e[3].y = b.y + b.height;
        for (var d = Infinity, f = -Infinity, h = Infinity, g = -Infinity, k = 0; k < e.length; k++) {
            if (c) {
                var p = e[k].matrixTransform(c),
                    d = Math.min(d, p.x),
                    f = Math.max(f, p.x),
                    h = Math.min(h, p.y),
                    g = Math.max(g, p.y)
            }
        }
        try {
            b.x = d, b.y = h, b.width = f - d, b.height = g - h;
        } catch (m) {}
        B = b;
    }

    function m() {
        for (var b = [], c = 0; c < y.length; c++) {
            y[c] && b.push(y[c].color);
        }
        return b;
    }

    function q() {
        s = document.createElementNS("http://www.w3.org/2000/svg", "g");
        var b = e.getElementsByTagName("svg")[0],
            c = b;
        try {
            c = u.ownerDocument.importNode(b, !0);
        } catch (d) {}
        if(u==null){
            u = $('#designGroup1')[0]
        }
        u.appendChild(c);
        ca = c.getBBox();
        u.removeChild(c);
        M = document.createElementNS("http://www.w3.org/2000/svg", "g");
        M.setAttribute("width", D);
        M.setAttribute("height", V);
        for (var f = 0; f < b.childNodes.length; f++) {
            c = b.childNodes[f], c.tagName && "style" !== c.tagName && (c = s.ownerDocument.importNode(c, !0), M.appendChild(c));
        }
        s.appendChild(M);
        if (!s.getElementsByClassName) {
            var h = function(b, c) {
                for (var e = [], d = 0; d < b.childNodes.length; d++) {
                    var f = b.childNodes[d];
                    if (f.tagName) {
                        var g = b.childNodes[d].getAttribute("class");
                        g && 0 <= g.indexOf(c) && e.push(b.childNodes[d]);
                        e = e.concat(h(f, c));
                    }
                }
                return e;
            };
            s.getElementsByClassName = function(b) {
                return h(s, b);
            };
        }
    }
    var n = this,
        r = c.id;
    c.flipH = parseInt(c.fliph, 10);
    c.flipV = parseInt(c.flipv, 10);
    c.svg = b.implementation.createDocument(b.namespaceURI, null, null);
    var t = c.svg.importNode(b.documentElement, !0);
    c.svg.appendChild(t);
    var p = [{
            event: "click",
            fnc: k
        }, {
            event: "mousedown",
            fnc: k
        }, {
            event: "mouseup",
            fnc: k
        }, {
            event: "mousemove",
            fnc: k
        }],
        e = b.cloneNode(!0);
    e || (e = $.parseXML((new XMLSerializer).serializeToString(b)));
    var u = d,
        s;
    d = b.getElementsByTagName("style");
    0 === d.length ? (d = document.createElement("style"), d.setAttribute("type", "text/css"), d.textContent = ".fil0{fill:#000000;}", d = b.importNode(d, !0), b.documentElement.appendChild(d), d = b.getElementsByTagName("style"), t = function(b) {
        b = e.getElementsByTagName(b);
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.getAttribute("class") || d.getAttribute("fill") || d.setAttribute("class", "fil0");
        }
    }, t("path"), t("polygon")) : "g" === e.getElementsByTagName("style")[0].parentNode.tagName && (t = e.getElementsByTagName("style")[0].parentNode.removeChild(e.getElementsByTagName("style")[0]), e.getElementsByTagName("svg")[0].appendChild(t));
    var w = d[0].cloneNode(!0);
    d = e.getElementsByTagName("g");
    for (t = 0; t < d.length; t++) {
        var v = d[t];
        v.style.clipPath = "";
        v.id = "";
    }
    var x = c,
        B, y = [],
        D, V, ca, M = null,
        A = D = parseInt(b.documentElement.getAttribute("width"), 10) || 500,
        G = V = parseInt(b.documentElement.getAttribute("height"), 10) || 500,
        H = parseInt(b.documentElement.getAttribute("x"), 10) || 0,
        Q = parseInt(b.documentElement.getAttribute("y"), 10) || 0,
        da = c.z,
        W = 0,
        fa = "front",
        ja = "location id x y width height rotation colors flipH flipV".split(" "),
        F = "data id type x y width height rotation colors flipH flipV z".split(" "),
        I = !1,
        P = !1,
        O = !0,
        N = !1;
    Object.defineProperties(this, {
        id: {
            get: function() {
                return r;
            }
        },
        colorsMapped: {
            get: function() {
                return m;
            }
        },
        style: {
            get: function() {
                return w;
            }
        },
        svg: {
            get: function() {
                return e;
            }
        },
        historyProps: {
            get: function() {
                return F;
            }
        },
        g: {
            get: function() {
                return s;
            }
        },
        viewBoxGroup: {
            get: function() {
                return M;
            }
        },
        originalBBox: {
            get: function() {
                return ca;
            }
        },
        bb: {
            get: function() {
                return B;
            }
        },
        colors: {
            get: function() {
                return m();
            },
            set: function(b) {
                if (b.length) {
                    for (var c = 0; c < b.length; c++) {
                        n.setColor(c, getColorString(b[c])), console.debug("culo de mandril plus = ", b[c].value);
                    }
                }
            }
        },
        width: {
            get: function() {
                return A;
            },
            set: function(b) {
                A = b;
                console.debug("WIDTH = ", b);
                f();
            }
        },
        height: {
            get: function() {
                return G;
            },
            set: function(b) {
                G = b;
                f();
            }
        },
        x: {
            get: function() {
                return H;
            },
            set: function(b) {
                H = b;
                f();
            }
        },
        y: {
            get: function() {
                return Q;
            },
            set: function(b) {
                Q = b;
                f();
            }
        },
        z: {
            get: function() {
                return da;
            },
            set: function(b) {
                da = b;
                f();
            }
        },
        rotation: {
            get: function() {
                return W;
            },
            set: function(b) {
                W = b;
                f();
            }
        },
        location: {
            get: function() {
                return fa;
            },
            set: function(b) {
                fa = b;
            }
        },
        flipH: {
            get: function() {
                return I;
            },
            set: function(b) {
                b != I && (I = b, f());
            }
        },
        flipV: {
            get: function() {
                return P;
            },
            set: function(b) {
                b != P && (P = b, f());
            }
        },
        data: {
            get: function() {
                for (var b = clone(x), c = 0; c < ja.length; c++) {
                    b[ja[c]] = n[ja[c]];
                }
                b.object = n;
                return b;
            },
            set: function(b) {}
        },
        canReportEdition: {
            get: function() {
                return O;
            },
            set: function(b) {
                O = b;
            }
        },
        sleep: {
            get: function() {
                return N;
            },
            set: function(b) {
                N = b;
            }
        }
    });
    this.type = "vector";
    this.setColor = function(b, c) {
        if (y.length <= b || !y[b]) {
            return !1;
        }
        y[b].color = c;
        for (var e = "", d = 0; d < y.length; d++) {
            y[d] && (y[d].is_fill && (e += "." + y[d].prefixFill + d + "_" + r + "{fill:" + y[d].color + "}"), y[d].is_stroke && (e += "." + y[d].prefixStroke + d + "_" + r + "{stroke:" + y[d].color + "}"));
        }
        w.textContent = e;
        eventManager.trigger("designColorsChanged");
        O && eventManager.trigger("elementEdited", n);
    };
    this.remove = function() {
        for (var b = 0; b < p.length; b++) {
            s.removeEventListener(p[b].event, p[b].fnc);
        }
        u.removeChild(s);
        u.removeChild(w);
        w = s = null;
    };
    this.getNode = function() {
        n.node || (n.node = {
            g: s,
            toFront: function() {
                s.parentNode.appendChild(s);
            }
        });
        return n.node;
    };
    this.forceUpdate = function() {};
    this.getStrokeScaleX = function() {};
    this.getStrokeScaleY = function() {};
    this.prototype = {
        reportChange: function() {
            console.log("SVG内容发生了变化", N, O);
            O && !N && (O = !1, setTimeout(function() {
                state.isChangedDesign = true;
                eventManager.trigger("elementEdited", n);
                console.debug("***Element 完成更新***");
                O = !0;
            }, 100));
        }
    };
    window.neverTrue && (q(), g(), h());
    q();
    g();
    h();
};
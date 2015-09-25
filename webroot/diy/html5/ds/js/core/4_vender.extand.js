(function(b) {
    if (!b.support.cors && b.ajaxTransport && window.XDomainRequest) {
        var d = /^https?:\/\//i,
            c = /^get|post$/i,
            g = RegExp("^" + location.protocol, "i"),
            k = /text\/html/i,
            h = /\/json/i,
            f = /\/xml/i;
        b.ajaxTransport("* text html xml json", function(m, q, n) {
            if (m.crossDomain && m.async && c.test(m.type) && d.test(m.url) && g.test(m.url)) {
                var r = null,
                    t = (q.dataType || "").toLowerCase();
                return {
                    send: function(c, e) {
                        r = new XDomainRequest;
                        /^\d+$/.test(q.timeout) && (r.timeout = q.timeout);
                        r.ontimeout = function() {
                            e(500, "timeout");
                        };
                        r.onload = function() {
                            var c = "Content-Length: " + r.responseText.length + "\r\nContent-Type: " + r.contentType,
                                d = 200,
                                g = "success",
                                p = {
                                    text: r.responseText
                                };
                            try {
                                if ("html" === t || k.test(r.contentType)) {
                                    p.html = r.responseText;
                                } else {
                                    if ("json" === t || "text" !== t && h.test(r.contentType)) {
                                        try {
                                            p.json = b.parseJSON(r.responseText);
                                        } catch (m) {
                                            d = 500, g = "parseerror";
                                        }
                                    } else {
                                        if ("xml" === t || "text" !== t && f.test(r.contentType)) {
                                            var u = new ActiveXObject("Microsoft.XMLDOM");
                                            u.async = !1;
                                            try {
                                                u.loadXML(r.responseText);
                                            } catch (n) {
                                                u = void 0;
                                            }
                                            if (!u || !u.documentElement || u.getElementsByTagName("parsererror").length) {
                                                throw "Invalid XML: " + r.responseText;
                                            }
                                            p.xml = u;
                                        }
                                    }
                                }
                            } catch (q) {
                                throw q;
                            } finally {
                                e(d, g, p, c);
                            }
                        };
                        r.onprogress = function() {};
                        r.onerror = function() {
                            e(500, "error", {
                                text: r.responseText
                            });
                        };
                        var d = "";
                        q.data && (d = "string" === b.type(q.data) ? q.data : b.param(q.data));
                        r.open(m.type, m.url);
                        r.send(d);
                    },
                    abort: function() {
                        r && r.abort();
                    }
                };
            }
        });
    }
})(jQuery);
(function(b) {
    "function" === typeof define && define.amd ? define(["jquery"], b) : "object" == typeof exports && "object" == typeof module ? module.exports = b : b(jQuery);
})
(function(b, d) {
    function c(c, e, d, f) {
        for (var g = [], h = 0; h < c.length; h++) {
            var k = c[h];
            if (k) {
                var p = tinycolor(k),
                    m = 0.5 > p.toHsl().l ? "sp-thumb-el sp-thumb-dark" : "sp-thumb-el sp-thumb-light",
                    m = m + (tinycolor.equals(e, k) ? " sp-thumb-active" : ""),
                    k = p.toString(f.preferredFormat || "rgb"),
                    s = u ? "background-color:" + p.toRgbString() : "filter:" + p.toFilter();
                g.push('<span title="' + k + '" data-color="' + p.toRgbString() + '" class="' + m + '"><span class="sp-thumb-inner" style="' + s + ';" /></span>');
            } else {
                g.push(b("<div />").append(b('<span data-color="" style="background-color:transparent;" class="sp-clear-display"></span>').attr("title", f.noColorSelectedText)).html());
            }
        }
        return "<div class='sp-cf " + d + "'>" + g.join("") + "</div>";
    }

    function g(c, e) {
        var d = b.extend({}, t, c);
        d.callbacks = {
            move: q(d.move, e),
            change: q(d.change, e),
            show: q(d.show, e),
            hide: q(d.hide, e),
            beforeShow: q(d.beforeShow, e)
        };
        return d;
    }

    function k(f, k) {
        function q() {
            K.showPaletteOnly && (K.showPalette = !0);
            Ma.text(K.showPaletteOnly ? K.togglePaletteMoreText : K.togglePaletteLessText);
            if (K.palette) {
                qa = K.palette.slice(0);
                sa = b.isArray(qa[0]) ? qa : [qa];
                Ja = {};
                for (var c = 0; c < sa.length; c++) {
                    for (var e = 0; e < sa[c].length; e++) {
                        var d = tinycolor(sa[c][e]).toRgbString();
                        Ja[d] = !0;
                    }
                }
            }
            ia.toggleClass("sp-flat", T);
            ia.toggleClass("sp-input-disabled", !K.showInput);
            ia.toggleClass("sp-alpha-enabled", K.showAlpha);
            ia.toggleClass("sp-clear-enabled", Fa);
            ia.toggleClass("sp-buttons-disabled", !K.showButtons);
            ia.toggleClass("sp-palette-buttons-disabled", !K.togglePaletteOnly);
            ia.toggleClass("sp-palette-disabled", !K.showPalette);
            ia.toggleClass("sp-palette-only", K.showPaletteOnly);
            ia.toggleClass("sp-initial-disabled", !K.showInitial);
            ia.addClass(K.className).addClass(K.containerClassName);
            Z();
        }

        function D() {
            if (E && window.localStorage) {
                try {
                    var c = window.localStorage[E].split(",#");
                    1 < c.length && (delete window.localStorage[E], b.each(c, function(b, c) {
                        t(c);
                    }));
                } catch (e) {}
                try {
                    ba = window.localStorage[E].split(";");
                } catch (d) {}
            }
        }

        function t(c) {
            if (J) {
                c = tinycolor(c).toRgbString();
                if (!Ja[c] && -1 === b.inArray(c, ba)) {
                    for (ba.push(c); ba.length > C;) {
                        ba.shift();
                    }
                }
                if (E && window.localStorage) {
                    try {
                        window.localStorage[E] = ba.join(";");
                    } catch (e) {}
                }
            }
        }

        function ca() {
            var b = [];
            if (K.showPalette) {
                for (var c = 0; c < ba.length; c++) {
                    var e = tinycolor(ba[c]).toRgbString();
                    Ja[e] || b.push(ba[c]);
                }
            }
            return b.reverse().slice(0, K.maxSelectionSize);
        }

        function M() {
            var e = I(),
                d = b.map(sa, function(b, d) {
                    return c(b, e, "sp-palette-row sp-palette-row-" + d, K);
                });
            D();
            ba && d.push(c(ca(), e, "sp-palette-row sp-palette-row-selection", K));
            cb.html(d.join(""));
        }

        function A() {
            if (K.showInitial) {
                var b = Na,
                    e = I();
                db.html(c([b, e], e, "sp-palette-row-initial", K));
            }
        }

        function G() {
            (0 >= R || 0 >= ka || 0 >= la) && Z();
            ia.addClass(ga);
            Y = null;
            ha.trigger("dragstart.spectrum", [I()]);
        }

        function H() {
            ia.removeClass(ga);
            ha.trigger("dragstop.spectrum", [I()]);
        }

        function Q() {
            var b = Ga.val();
            null !== b && "" !== b || !Fa ? (b = tinycolor(b), b.isValid() ? (F(b), U(!0)) : Ga.addClass("sp-validation-error")) : (F(null), U(!0));
        }

        function da() {
            z ? ja() : W();
        }

        function W() {
            var c = b.Event("beforeShow.spectrum");
            if (z) {
                Z();
            } else {
                if (ha.trigger(c, [I()]), !1 !== ea.beforeShow(I()) && !c.isDefaultPrevented()) {
                    for (c = 0; c < p.length; c++) {
                        p[c] && p[c].hide();
                    }
                    z = !0;
                    b(ua).bind("click.spectrum", fa);
                    b(window).bind("resize.spectrum", oa);
                    Oa.addClass("sp-active");
                    ia.removeClass("sp-hidden");
                    Z();
                    O();
                    Na = I();
                    A();
                    ea.show(Na);
                    ha.trigger("show.spectrum", [Na]);
                }
            }
        }

        function fa(b) {
            2 != b.button && (kb ? U(!0) : F(Na, !0), ja());
        }

        function ja() {
            z && !T && (z = !1, b(ua).unbind("click.spectrum", fa), b(window).unbind("resize.spectrum", oa), Oa.removeClass("sp-active"), ia.addClass("sp-hidden"), ea.hide(I()), ha.trigger("hide.spectrum", [I()]));
        }

        function F(b, c) {
            if (tinycolor.equals(b, I())) {
                O();
            } else {
                var e, d;
                !b && Fa ? za = !0 : (za = !1, e = tinycolor(b), d = e.toHsv(), va = d.h % 360 / 360, wa = d.s, xa = d.v, ta = d.a);
                O();
                e && e.isValid() && !c && (Pa = eb || e.getFormat());
            }
        }

        function I(b) {
            b = b || {};
            return Fa && za ? null : tinycolor.fromRatio({
                h: va,
                s: wa,
                v: xa,
                a: Math.round(100 * ta) / 100
            }, {
                format: b.format || Pa
            });
        }

        function P() {
            O();
            ea.move(I());
            ha.trigger("move.spectrum", [I()]);
        }

        function O() {
            Ga.removeClass("sp-validation-error");
            N();
            var b = tinycolor.fromRatio({
                h: va,
                s: 1,
                v: 1
            });
            Ta.css("background-color", b.toHexString());
            b = Pa;
            !(1 > ta) || 0 === ta && "name" === b || "hex" !== b && "hex3" !== b && "hex6" !== b && "name" !== b || (b = "rgb");
            var c = I({
                    format: b
                }),
                d = "";
            Qa.removeClass("sp-clear-display");
            Qa.css("background-color", "transparent");
            if (!c && Fa) {
                Qa.addClass("sp-clear-display");
            } else {
                var d = c.toHexString(),
                    f = c.toRgbString();
                u || 1 === c.alpha ? Qa.css("background-color", f) : (Qa.css("background-color", "transparent"), Qa.css("filter", c.toFilter()));
                if (K.showAlpha) {
                    f = c.toRgb();
                    f.a = 0;
                    var f = tinycolor(f).toRgbString(),
                        g = "linear-gradient(left, " + f + ", " + d + ")";
                    e ? La.css("filter", tinycolor(f).toFilter({
                        gradientType: 1
                    }, d)) : (La.css("background", "-webkit-" + g), La.css("background", "-moz-" + g), La.css("background", "-ms-" + g), La.css("background", "linear-gradient(to right, " + f + ", " + d + ")"));
                }
                d = c.toString(b);
            }
            K.showInput && Ga.val(d);
            K.showPalette && M();
            A();
        }

        function N() {
            var b = wa,
                c = xa;
            Fa && za ? (Ya.hide(), Ea.hide(), Ua.hide()) : (Ya.show(), Ea.show(), Ua.show(), b *= ka, c = R - c * R, b = Math.max(-X, Math.min(ka - X, b - X)), c = Math.max(-X, Math.min(R - X, c - X)), Ua.css({
                top: c + "px",
                left: b + "px"
            }), Ya.css({
                left: ta * ma - aa / 2 + "px"
            }), Ea.css({
                top: va * la - na + "px"
            }));
        }

        function U(b) {
            var c = I(),
                e = "";
            c && (e = c.toString(Pa), t(c));
            Za && ha.val(e);
            b && (ea.change(c), ha.trigger("change", [c]));
        }

        function Z() {
            ka = Ta.width();
            R = Ta.height();
            X = Ua.height();
            $a.width();
            la = $a.height();
            na = Ea.height();
            ma = Ba.width();
            aa = Ya.width();
            T || (ia.css("position", "absolute"), ia.offset(h(ia, Ka)));
            N();
            K.showPalette && M();
            ha.trigger("reflow.spectrum");
        }

        function L() {
            ja();
            ya = !0;
            ha.attr("disabled", !0);
            Ka.addClass("sp-disabled");
        }
        var K = g(k, f),
            T = K.flat,
            J = K.showSelectionPalette,
            E = K.localStorageKey,
            S = K.theme,
            ea = K.callbacks,
            oa = r(Z, 10),
            z = !1,
            ka = 0,
            R = 0,
            X = 0,
            la = 0,
            ma = 0,
            aa = 0,
            na = 0,
            va = 0,
            wa = 0,
            xa = 0,
            ta = 1,
            qa = [],
            sa = [],
            Ja = {}, ba = K.selectionPalette.slice(0),
            C = K.maxSelectionSize,
            ga = "sp-dragging",
            Y = null,
            ua = f.ownerDocument,
            ha = b(f),
            ya = !1,
            ia = b(v, ua).addClass(S),
            lb = ia.find(".sp-picker-container"),
            Ta = ia.find(".sp-color"),
            Ua = ia.find(".sp-dragger"),
            $a = ia.find(".sp-hue"),
            Ea = ia.find(".sp-slider"),
            La = ia.find(".sp-alpha-inner"),
            Ba = ia.find(".sp-alpha"),
            Ya = ia.find(".sp-alpha-handle"),
            Ga = ia.find(".sp-input"),
            cb = ia.find(".sp-palette"),
            db = ia.find(".sp-initial"),
            Va = ia.find(".sp-cancel"),
            ab = ia.find(".sp-clear"),
            Ra = ia.find(".sp-choose"),
            Ma = ia.find(".sp-palette-toggle"),
            Za = ha.is("input"),
            hb = Za && s && "color" === ha.attr("type"),
            bb = Za && !T,
            Oa = bb ? b(w).addClass(S).addClass(K.className).addClass(K.replacerClassName) :
                b([]),
            Ka = bb ? Oa : ha,
            Qa = Oa.find(".sp-preview-inner"),
            Wa = K.color || Za && ha.val(),
            Na = !1,
            eb = K.preferredFormat,
            Pa = eb,
            kb = !K.showButtons || K.clickoutFiresChange,
            za = !Wa,
            Fa = K.allowEmpty && !hb;
        (function() {
            function c(e) {
                e.data && e.data.ignore ? (F(b(e.target).closest(".sp-thumb-el").data("color")), P()) : (F(b(e.target).closest(".sp-thumb-el").data("color")), P(), U(!0), K.hideAfterPaletteSelect && ja());
                return !1;
            }
            e && ia.find("*:not(input)").attr("unselectable", "on");
            q();
            bb && ha.after(Oa).hide();
            Fa || ab.hide();
            if (T) {
                ha.after(ia).hide();
            } else {
                var d = "parent" === K.appendTo ? ha.parent() : b(K.appendTo);
                1 !== d.length && (d = b("body"));
                d.append(ia);
            }
            D();
            Ka.bind("click.spectrum touchstart.spectrum", function(c) {
                ya || da();
                c.stopPropagation();
                b(c.target).is("input") || c.preventDefault();
            });
            (ha.is(":disabled") || !0 === K.disabled) && L();
            ia.click(m);
            Ga.change(Q);
            Ga.bind("paste", function() {
                setTimeout(Q, 1);
            });
            Ga.keydown(function(b) {
                13 == b.keyCode && Q();
            });
            Va.text(K.cancelText);
            Va.bind("click.spectrum", function(b) {
                b.stopPropagation();
                b.preventDefault();
                F(Na, !0);
                ja();
            });
            ab.attr("title", K.clearText);
            ab.bind("click.spectrum", function(b) {
                b.stopPropagation();
                b.preventDefault();
                za = !0;
                P();
                T && U(!0);
            });
            Ra.text(K.chooseText);
            Ra.bind("click.spectrum", function(b) {
                b.stopPropagation();
                b.preventDefault();
                Ga.hasClass("sp-validation-error") || (U(!0), ja());
            });
            Ma.text(K.showPaletteOnly ? K.togglePaletteMoreText : K.togglePaletteLessText);
            Ma.bind("click.spectrum", function(b) {
                b.stopPropagation();
                b.preventDefault();
                K.showPaletteOnly = !K.showPaletteOnly;
                K.showPaletteOnly || T || ia.css("left", "-=" + (lb.outerWidth(!0) + 5));
                q();
            });
            n(Ba, function(b, c, e) {
                ta = b / ma;
                za = !1;
                e.shiftKey && (ta = Math.round(10 * ta) / 10);
                P();
            }, G, H);
            n($a, function(b, c) {
                va = parseFloat(c / la);
                za = !1;
                K.showAlpha || (ta = 1);
                P();
            }, G, H);
            n(Ta, function(b, c, e) {
                e.shiftKey ? Y || (e = R - xa * R, Y = Math.abs(b - wa * ka) > Math.abs(c - e) ? "x" : "y") : Y = null;
                e = !Y || "y" === Y;
                Y && "x" !== Y || (wa = parseFloat(b / ka));
                e && (xa = parseFloat((R - c) / R));
                za = !1;
                K.showAlpha || (ta = 1);
                P();
            }, G, H);
            Wa ? (F(Wa), O(), Pa = eb || tinycolor(Wa).format, t(Wa)) : O();
            T && W();
            d = e ? "mousedown.spectrum" : "click.spectrum touchstart.spectrum";
            cb.delegate(".sp-thumb-el", d, c);
            db.delegate(".sp-thumb-el:nth-child(1)", d, {
                ignore: !0
            }, c);
        })();
        var Sa = {
            show: W,
            hide: ja,
            toggle: da,
            reflow: Z,
            option: function(c, e) {
                if (c === d) {
                    return b.extend({}, K);
                }
                if (e === d) {
                    return K[c];
                }
                K[c] = e;
                q();
            },
            enable: function() {
                ya = !1;
                ha.attr("disabled", !1);
                Ka.removeClass("sp-disabled");
            },
            disable: L,
            set: function(b) {
                F(b);
                U();
            },
            get: I,
            destroy: function() {
                ha.show();
                Ka.unbind("click.spectrum touchstart.spectrum");
                ia.remove();
                Oa.remove();
                p[Sa.id] = null;
            },
            container: ia
        };
        Sa.id = p.push(Sa) - 1;
        return Sa;
    }

    function h(c, e) {
        var d = c.outerWidth(),
            f = c.outerHeight(),
            g = e.outerHeight(),
            h = c[0].ownerDocument,
            k = h.documentElement,
            p = k.clientWidth + b(h).scrollLeft(),
            h = k.clientHeight + b(h).scrollTop(),
            k = e.offset();
        k.top += g;
        k.left -= Math.min(k.left, k.left + d > p && p > d ? Math.abs(k.left + d - p) : 0);
        k.top -= Math.min(k.top, k.top + f > h && h > f ? Math.abs(f + g - 0) : 0);
        return k;
    }

    function f() {}

    function m(b) {
        b.stopPropagation();
    }

    function q(b, c) {
        var e = Array.prototype.slice,
            d = e.call(arguments, 2);
        return function() {
            return b.apply(c, d.concat(e.call(arguments)));
        };
    }

    function n(c, d, f, g) {
        function h(b) {
            b.stopPropagation && b.stopPropagation();
            b.preventDefault && b.preventDefault();
            b.returnValue = !1;
        }

        function k(b) {
            if (s) {
                if (e && 9 > m.documentMode && !b.button) {
                    return p();
                }
                var f = b.originalEvent.touches,
                    g = f ? f[0].pageY : b.pageY,
                    f = Math.max(0, Math.min((f ? f[0].pageX : b.pageX) - u.left, q)),
                    g = Math.max(0, Math.min(g - u.top, n));
                r && h(b);
                d.apply(c, [f, g, b]);
            }
        }

        function p() {
            s && (b(m).unbind(v), b(m.body).removeClass("sp-dragging"), g.apply(c, arguments));
            s = !1;
        }
        d = d || function() {};
        f = f || function() {};
        g = g || function() {};
        var m = document,
            s = !1,
            u = {}, n = 0,
            q = 0,
            r = "ontouchstart" in window,
            v = {};
        v.selectstart = h;
        v.dragstart = h;
        v["touchmove mousemove"] = k;
        v["touchend mouseup"] = p;
        b(c).bind("touchstart mousedown", function(e) {
            (e.which ? 3 == e.which : 2 == e.button) || s || !1 === f.apply(c, arguments) || (s = !0, n = b(c).height(), q = b(c).width(), u = b(c).offset(), b(m).bind(v), b(m.body).addClass("sp-dragging"), r || k(e), h(e));
        });
    }

    function r(b, c, e) {
        var d;
        return function() {
            var f = this,
                g = arguments,
                h = function() {
                    d = null;
                    b.apply(f, g);
                };
            e && clearTimeout(d);
            if (e || !d) {
                d = setTimeout(h, c);
            }
        };
    }
    var t = {
            beforeShow: f,
            move: f,
            change: f,
            show: f,
            hide: f,
            color: !1,
            flat: !1,
            showInput: !1,
            allowEmpty: !1,
            showButtons: !0,
            clickoutFiresChange: !1,
            showInitial: !1,
            showPalette: !1,
            showPaletteOnly: !1,
            hideAfterPaletteSelect: !1,
            togglePaletteOnly: !1,
            showSelectionPalette: !0,
            localStorageKey: !1,
            appendTo: "body",
            maxSelectionSize: 7,
            cancelText: "cancel",
            chooseText: "choose",
            togglePaletteMoreText: "more",
            togglePaletteLessText: "less",
            clearText: "Clear Color Selection",
            noColorSelectedText: "No Color Selected",
            preferredFormat: !1,
            className: "",
            containerClassName: "",
            replacerClassName: "",
            showAlpha: !1,
            theme: "sp-light",
            palette: ["#ffffff #000000 #ff0000 #ff8000 #ffff00 #008000 #0000ff #4b0082 #9400d3".split(" ")],
            selectionPalette: [],
            disabled: !1
        }, p = [],
        e = !! /msie/i.exec(window.navigator.userAgent),
        u = function() {
            var b = document.createElement("div").style;
            b.cssText = "background-color:rgba(0,0,0,.5)";
            return !!~("" + b.backgroundColor).indexOf("rgba") || !! ~("" + b.backgroundColor).indexOf("hsla");
        }(),
        s = function() {
            var c = b("<input type='color' value='!' />")[0];
            return "color" === c.type && "!" !== c.value;
        }(),
        w = "<div class='sp-replacer'><div class='sp-preview'><div class='sp-preview-inner'></div></div><div class='sp-dd'>&#9660;</div></div>",
        v = function() {
            var b = "";
            if (e) {
                for (var c = 1; 6 >= c; c++) {
                    b += "<div class='sp-" + c + "'></div>";
                }
            }
            return ["<div class='sp-container sp-hidden'><div class='sp-palette-container'><div class='sp-palette sp-thumb sp-cf'></div><div class='sp-palette-button-container sp-cf'><button type='button' class='sp-palette-toggle'></button></div></div><div class='sp-picker-container'><div class='sp-top sp-cf'><div class='sp-fill'></div><div class='sp-top-inner'><div class='sp-color'><div class='sp-sat'><div class='sp-val'><div class='sp-dragger'></div></div></div></div><div class='sp-clear sp-clear-display'></div><div class='sp-hue'><div class='sp-slider'></div>",
                b, "</div></div><div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div></div><div class='sp-input-container sp-cf'><input class='sp-input' type='text' spellcheck='false'  /></div><div class='sp-initial sp-thumb sp-cf'></div><div class='sp-button-container sp-cf'><a class='sp-cancel' href='#'></a><button type='button' class='sp-choose'></button></div></div></div>"].join("");
        }();
    b.fn.spectrum = function(c, e) {
        if ("string" == typeof c) {
            var d = this,
                f = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                var e = p[b(this).data("spectrum.id")];
                if (e) {
                    var g = e[c];
                    if (!g) {
                        throw Error("Spectrum: 没有找到方法: '" + c + "'");
                    }
                    "get" == c ? d = e.get() : "container" == c ? d = e.container : "option" == c ? d = e.option.apply(e, f) : "destroy" == c ? (e.destroy(), b(this).removeData("spectrum.id")) : g.apply(e, f);
                }
            });
            return d;
        }
        return this.spectrum("destroy").each(function() {
            var e = b.extend({}, c, b(this).data()),
                e = k(this, e);
            b(this).data("spectrum.id", e.id);
        });
    };
    b.fn.spectrum.load = !0;
    b.fn.spectrum.loadOpts = {};
    b.fn.spectrum.draggable = n;
    b.fn.spectrum.defaults = t;
    b.spectrum = {};
    b.spectrum.localization = {};
    b.spectrum.palettes = {};
    b.fn.spectrum.processNativeColorInputs = function() {
        s || b("input[type=color]").spectrum({
            preferredFormat: "hex6"
        });
    };
    (function() {
        function b(c, e, d) {
            c = N(c, 255);
            e = N(e, 255);
            d = N(d, 255);
            var f = ea(c, e, d),
                g = S(c, e, d),
                h, k = (f + g) / 2;
            if (f == g) {
                h = g = 0;
            } else {
                var p = f - g,
                    g = 0.5 < k ? p / (2 - f - g) : p / (f + g);
                switch (f) {
                    case c:
                        h = (e - d) / p + (e < d ? 6 : 0);
                        break;
                    case e:
                        h = (d - c) / p + 2;
                        break;
                    case d:
                        h = (c - e) / p + 4;
                }
                h /= 6;
            }
            return {
                h: h,
                s: g,
                l: k
            };
        }

        function c(b, e, d) {
            function f(b, c, e) {
                0 > e && (e += 1);
                1 < e && (e -= 1);
                return e < 1 / 6 ? b + 6 * (c - b) * e : 0.5 > e ? c : e < 2 / 3 ? b + (c - b) * (2 / 3 - e) * 6 : b;
            }
            b = N(b, 360);
            e = N(e, 100);
            d = N(d, 100);
            if (0 === e) {
                d = e = b = d;
            } else {
                var g = 0.5 > d ? d * (1 + e) : d + e - d * e,
                    h = 2 * d - g;
                d = f(h, g, b + 1 / 3);
                e = f(h, g, b);
                b = f(h, g, b - 1 / 3);
            }
            return {
                r: 255 * d,
                g: 255 * e,
                b: 255 * b
            };
        }

        function e(b, c, d) {
            b = N(b, 255);
            c = N(c, 255);
            d = N(d, 255);
            var f = ea(b, c, d),
                g = S(b, c, d),
                h, k = f - g;
            if (f == g) {
                h = 0;
            } else {
                switch (f) {
                    case b:
                        h = (c - d) / k + (c < d ? 6 : 0);
                        break;
                    case c:
                        h = (d - b) / k + 2;
                        break;
                    case d:
                        h = (b - c) / k + 4;
                }
                h /= 6;
            }
            return {
                h: h,
                s: 0 === f ? 0 : k / f,
                v: f
            };
        }

        function d(b, c, e, f) {
            b = [U(E(b).toString(16)), U(E(c).toString(16)), U(E(e).toString(16))];
            return f && b[0].charAt(0) == b[0].charAt(1) && b[1].charAt(0) == b[1].charAt(1) && b[2].charAt(0) == b[2].charAt(1) ? b[0].charAt(0) + b[1].charAt(0) + b[2].charAt(0) : b.join("");
        }

        function f(b, c, e, d) {
            return [U(Math.round(255 * parseFloat(d)).toString(16)), U(E(b).toString(16)), U(E(c).toString(16)), U(E(e).toString(16))].join("");
        }

        function g(b, c) {
            c = 0 === c ? 0 : c || 10;
            var e = z(b).toHsl();
            e.s -= c / 100;
            e.s = S(1, ea(0, e.s));
            return z(e);
        }

        function h(b, c) {
            c = 0 === c ? 0 : c || 10;
            var e = z(b).toHsl();
            e.s += c / 100;
            e.s = S(1, ea(0, e.s));
            return z(e);
        }

        function k(b) {
            return z(b).desaturate(100);
        }

        function p(b, c) {
            c = 0 === c ? 0 : c || 10;
            var e = z(b).toHsl();
            e.l += c / 100;
            e.l = S(1, ea(0, e.l));
            return z(e);
        }

        function m(b, c) {
            c = 0 === c ? 0 : c || 10;
            var e = z(b).toRgb();
            e.r = ea(0, S(255, e.r - E(255 * -(c / 100))));
            e.g = ea(0, S(255, e.g - E(255 * -(c / 100))));
            e.b = ea(0, S(255, e.b - E(255 * -(c / 100))));
            return z(e);
        }

        function s(b, c) {
            c = 0 === c ? 0 : c || 10;
            var e = z(b).toHsl();
            e.l -= c / 100;
            e.l = S(1, ea(0, e.l));
            return z(e);
        }

        function u(b, c) {
            var e = z(b).toHsl(),
                d = (E(e.h) + c) % 360;
            e.h = 0 > d ? 360 + d : d;
            return z(e);
        }

        function n(b) {
            b = z(b).toHsl();
            b.h = (b.h + 180) % 360;
            return z(b);
        }

        function q(b) {
            var c = z(b).toHsl(),
                e = c.h;
            return [z(b), z({
                h: (e + 120) % 360,
                s: c.s,
                l: c.l
            }), z({
                h: (e + 240) % 360,
                s: c.s,
                l: c.l
            })];
        }

        function r(b) {
            var c = z(b).toHsl(),
                e = c.h;
            return [z(b), z({
                h: (e + 90) % 360,
                s: c.s,
                l: c.l
            }), z({
                h: (e + 180) % 360,
                s: c.s,
                l: c.l
            }), z({
                h: (e + 270) % 360,
                s: c.s,
                l: c.l
            })];
        }

        function v(b) {
            var c = z(b).toHsl(),
                e = c.h;
            return [z(b), z({
                h: (e + 72) % 360,
                s: c.s,
                l: c.l
            }), z({
                h: (e + 216) % 360,
                s: c.s,
                l: c.l
            })];
        }

        function w(b, c, e) {
            c = c || 6;
            e = e || 30;
            var d = z(b).toHsl();
            e = 360 / e;
            b = [z(b)];
            for (d.h = (d.h - (e * c >> 1) + 720) % 360; --c;) {
                d.h = (d.h + e) % 360, b.push(z(d));
            }
            return b;
        }

        function t(b, c) {
            c = c || 6;
            for (var e = z(b).toHsv(), d = e.h, f = e.s, e = e.v, g = [], h = 1 / c; c--;) {
                g.push(z({
                    h: d,
                    s: f,
                    v: e
                })), e = (e + h) % 1;
            }
            return g;
        }

        function O(b) {
            b = parseFloat(b);
            if (isNaN(b) || 0 > b || 1 < b) {
                b = 1;
            }
            return b;
        }

        function N(b, c) {
            "string" == typeof b && -1 != b.indexOf(".") && 1 === parseFloat(b) && (b = "100%");
            var e = "string" === typeof b && -1 != b.indexOf("%");
            b = S(c, ea(0, parseFloat(b)));
            e && (b = parseInt(b * c, 10) / 100);
            return 1E-6 > J.abs(b - c) ? 1 : b % c / parseFloat(c);
        }

        function U(b) {
            return 1 == b.length ? "0" + b : "" + b;
        }

        function Z(b) {
            1 >= b && (b = 100 * b + "%");
            return b;
        }
        var L = /^[\s,#]+/,
            K = /\s+$/,
            T = 0,
            J = Math,
            E = J.round,
            S = J.min,
            ea = J.max,
            oa = J.random,
            z = function ma(b, e) {
                var d, f, g, h, k;
                b = b ? b : "";
                e = e || {};
                if (b instanceof ma) {
                    return b;
                }
                if (!(this instanceof ma)) {
                    return new ma(b, e);
                }
                f = b;
                k = {
                    r: 0,
                    g: 0,
                    b: 0
                };
                var p = 1;
                g = d = !1;
                if ("string" == typeof f) {
                    a: {
                        f = f.replace(L, "").replace(K, "").toLowerCase();
                        var m = !1;
                        if (ka[f]) {
                            f = ka[f], m = !0;
                        } else {
                            if ("transparent" == f) {
                                f = {
                                    r: 0,
                                    g: 0,
                                    b: 0,
                                    a: 0,
                                    format: "name"
                                };
                                break a;
                            }
                        }
                        f = (h = X.rgb.exec(f)) ? {
                            r: h[1],
                            g: h[2],
                            b: h[3]
                        } : (h = X.rgba.exec(f)) ? {
                            r: h[1],
                            g: h[2],
                            b: h[3],
                            a: h[4]
                        } : (h = X.hsl.exec(f)) ? {
                            h: h[1],
                            s: h[2],
                            l: h[3]
                        } : (h = X.hsla.exec(f)) ? {
                            h: h[1],
                            s: h[2],
                            l: h[3],
                            a: h[4]
                        } : (h = X.hsv.exec(f)) ? {
                            h: h[1],
                            s: h[2],
                            v: h[3]
                        } : (h = X.hex8.exec(f)) ? {
                            a: parseInt(h[1], 16) / 255,
                            r: parseInt(h[2], 16),
                            g: parseInt(h[3], 16),
                            b: parseInt(h[4], 16),
                            format: m ? "name" : "hex8"
                        } : (h = X.hex6.exec(f)) ? {
                            r: parseInt(h[1], 16),
                            g: parseInt(h[2], 16),
                            b: parseInt(h[3],
                                16),
                            format: m ? "name" : "hex"
                        } : (h = X.hex3.exec(f)) ? {
                            r: parseInt(h[1] + "" + h[1], 16),
                            g: parseInt(h[2] + "" + h[2], 16),
                            b: parseInt(h[3] + "" + h[3], 16),
                            format: m ? "name" : "hex"
                        } : !1;
                    }
                }
                if ("object" == typeof f) {
                    if (f.hasOwnProperty("r") && f.hasOwnProperty("g") && f.hasOwnProperty("b")) {
                        k = {
                            r: 255 * N(f.r, 255),
                            g: 255 * N(f.g, 255),
                            b: 255 * N(f.b, 255)
                        }, d = !0, g = "%" === String(f.r).substr(-1) ? "prgb" : "rgb";
                    } else {
                        if (f.hasOwnProperty("h") && f.hasOwnProperty("s") && f.hasOwnProperty("v")) {
                            f.s = Z(f.s);
                            f.v = Z(f.v);
                            g = f.h;
                            m = f.s;
                            k = f.v;
                            g = 6 * N(g, 360);
                            m = N(m, 100);
                            k = N(k, 100);
                            d = J.floor(g);
                            var s = g - d;
                            g = k * (1 - m);
                            h = k * (1 - s * m);
                            m = k * (1 - (1 - s) * m);
                            d %= 6;
                            k = {
                                r: 255 * [k, h, g, g, m, k][d],
                                g: 255 * [m, k, k, h, g, g][d],
                                b: 255 * [g, g, m, k, k, h][d]
                            };
                            d = !0;
                            g = "hsv";
                        } else {
                            f.hasOwnProperty("h") && f.hasOwnProperty("s") && f.hasOwnProperty("l") && (f.s = Z(f.s), f.l = Z(f.l), k = c(f.h, f.s, f.l), d = !0, g = "hsl");
                        }
                    }
                    f.hasOwnProperty("a") && (p = f.a);
                }
                p = O(p);
                f = f.format || g;
                g = S(255, ea(k.r, 0));
                h = S(255, ea(k.g, 0));
                k = S(255, ea(k.b, 0));
                this._r = g;
                this._g = h;
                this._b = k;
                this._a = p;
                this._roundA = E(100 * this._a) / 100;
                this._format = e.format || f;
                this._gradientType = e.gradientType;
                1 > this._r && (this._r = E(this._r));
                1 > this._g && (this._g = E(this._g));
                1 > this._b && (this._b = E(this._b));
                this._ok = d;
                this._tc_id = T++;
            };
        z.prototype = {
            isDark: function() {
                return 128 > this.getBrightness();
            },
            isLight: function() {
                return !this.isDark();
            },
            isValid: function() {
                return this._ok;
            },
            getFormat: function() {
                return this._format;
            },
            getAlpha: function() {
                return this._a;
            },
            getBrightness: function() {
                var b = this.toRgb();
                return (299 * b.r + 587 * b.g + 114 * b.b) / 1E3;
            },
            setAlpha: function(b) {
                this._a = O(b);
                this._roundA = E(100 * this._a) / 100;
                return this;
            },
            toHsv: function() {
                var b = e(this._r, this._g, this._b);
                return {
                    h: 360 * b.h,
                    s: b.s,
                    v: b.v,
                    a: this._a
                };
            },
            toHsvString: function() {
                var b = e(this._r, this._g, this._b),
                    c = E(360 * b.h),
                    d = E(100 * b.s),
                    b = E(100 * b.v);
                return 1 == this._a ? "hsv(" + c + ", " + d + "%, " + b + "%)" : "hsva(" + c + ", " + d + "%, " + b + "%, " + this._roundA + ")";
            },
            toHsl: function() {
                var c = b(this._r, this._g, this._b);
                return {
                    h: 360 * c.h,
                    s: c.s,
                    l: c.l,
                    a: this._a
                };
            },
            toHslString: function() {
                var c = b(this._r, this._g, this._b),
                    e = E(360 * c.h),
                    d = E(100 * c.s),
                    c = E(100 * c.l);
                return 1 == this._a ? "hsl(" + e + ", " + d + "%, " + c + "%)" : "hsla(" + e + ", " + d + "%, " + c + "%, " + this._roundA + ")";
            },
            toHex: function(b) {
                return d(this._r, this._g, this._b, b);
            },
            toHexString: function(b) {
                return "#" + this.toHex(b);
            },
            toHex8: function() {
                return f(this._r, this._g, this._b, this._a);
            },
            toHex8String: function() {
                return "#" + this.toHex8();
            },
            toRgb: function() {
                return {
                    r: E(this._r),
                    g: E(this._g),
                    b: E(this._b),
                    a: this._a
                };
            },
            toRgbString: function() {
                return 1 == this._a ? "rgb(" + E(this._r) + ", " + E(this._g) + ", " + E(this._b) + ")" : "rgba(" + E(this._r) + ", " + E(this._g) + ", " + E(this._b) + ", " + this._roundA + ")";
            },
            toPercentageRgb: function() {
                return {
                    r: E(100 * N(this._r, 255)) + "%",
                    g: E(100 * N(this._g, 255)) + "%",
                    b: E(100 * N(this._b, 255)) + "%",
                    a: this._a
                };
            },
            toPercentageRgbString: function() {
                return 1 == this._a ? "rgb(" + E(100 * N(this._r, 255)) + "%, " + E(100 * N(this._g, 255)) + "%, " + E(100 * N(this._b, 255)) + "%)" : "rgba(" + E(100 * N(this._r, 255)) + "%, " + E(100 * N(this._g, 255)) + "%, " + E(100 * N(this._b, 255)) + "%, " + this._roundA + ")";
            },
            toName: function() {
                return 0 === this._a ? "transparent" : 1 > this._a ? !1 : R[d(this._r, this._g, this._b, !0)] || !1;
            },
            toFilter: function(b) {
                var c = "#" + f(this._r, this._g, this._b, this._a),
                    e = c,
                    d = this._gradientType ? "GradientType = 1, " : "";
                b && (e = z(b).toHex8String());
                return "progid:DXImageTransform.Microsoft.gradient(" + d + "startColorstr=" + c + ",endColorstr=" + e + ")";
            },
            toString: function(b) {
                var c = !! b;
                b = b || this._format;
                var e = !1,
                    d = 1 > this._a && 0 <= this._a;
                if (!c && d && ("hex" === b || "hex6" === b || "hex3" === b || "name" === b)) {
                    return "name" === b && 0 === this._a ? this.toName() : this.toRgbString();
                }
                "rgb" === b && (e = this.toRgbString());
                "prgb" === b && (e = this.toPercentageRgbString());
                if ("hex" === b || "hex6" === b) {
                    e = this.toHexString();
                }
                "hex3" === b && (e = this.toHexString(!0));
                "hex8" === b && (e = this.toHex8String());
                "name" === b && (e = this.toName());
                "hsl" === b && (e = this.toHslString());
                "hsv" === b && (e = this.toHsvString());
                return e || this.toHexString();
            },
            _applyModification: function(b, c) {
                var e = b.apply(null, [this].concat([].slice.call(c)));
                this._r = e._r;
                this._g = e._g;
                this._b = e._b;
                this.setAlpha(e._a);
                return this;
            },
            lighten: function() {
                return this._applyModification(p, arguments);
            },
            brighten: function() {
                return this._applyModification(m, arguments);
            },
            darken: function() {
                return this._applyModification(s, arguments);
            },
            desaturate: function() {
                return this._applyModification(g, arguments);
            },
            saturate: function() {
                return this._applyModification(h, arguments);
            },
            greyscale: function() {
                return this._applyModification(k, arguments);
            },
            spin: function() {
                return this._applyModification(u, arguments);
            },
            _applyCombination: function(b, c) {
                return b.apply(null, [this].concat([].slice.call(c)));
            },
            analogous: function() {
                return this._applyCombination(w, arguments);
            },
            complement: function() {
                return this._applyCombination(n, arguments);
            },
            monochromatic: function() {
                return this._applyCombination(t, arguments);
            },
            splitcomplement: function() {
                return this._applyCombination(v, arguments);
            },
            triad: function() {
                return this._applyCombination(q, arguments);
            },
            tetrad: function() {
                return this._applyCombination(r, arguments);
            }
        };
        z.fromRatio = function(b, c) {
            if ("object" == typeof b) {
                var e = {}, d;
                for (d in b) {
                    b.hasOwnProperty(d) && (e[d] = "a" === d ? b[d] : Z(b[d]));
                }
                b = e;
            }
            return z(b, c);
        };
        z.equals = function(b, c) {
            return b && c ? z(b).toRgbString() == z(c).toRgbString() : !1;
        };
        z.random = function() {
            return z.fromRatio({
                r: oa(),
                g: oa(),
                b: oa()
            });
        };
        z.mix = function(b, c, e) {
            e = 0 === e ? 0 : e || 50;
            b = z(b).toRgb();
            c = z(c).toRgb();
            e /= 100;
            var d = 2 * e - 1,
                f = c.a - b.a,
                d = ((-1 == d * f ? d : (d + f) / (1 + d * f)) + 1) / 2,
                f = 1 - d;
            return z({
                r: c.r * d + b.r * f,
                g: c.g * d + b.g * f,
                b: c.b * d + b.b * f,
                a: c.a * e + b.a * (1 - e)
            });
        };
        z.readability = function(b, c) {
            var e = z(b),
                d = z(c),
                f = e.toRgb(),
                g = d.toRgb(),
                e = e.getBrightness(),
                d = d.getBrightness(),
                f = Math.max(f.r, g.r) - Math.min(f.r, g.r) + Math.max(f.g, g.g) - Math.min(f.g, g.g) + Math.max(f.b, g.b) - Math.min(f.b, g.b);
            return {
                brightness: Math.abs(e - d),
                color: f
            };
        };
        z.isReadable = function(b, c) {
            var e = z.readability(b, c);
            return 125 < e.brightness && 500 < e.color;
        };
        z.mostReadable = function(b, c) {
            for (var e = null, d = 0, f = !1, g = 0; g < c.length; g++) {
                var h = z.readability(b, c[g]),
                    k = 125 < h.brightness && 500 < h.color,
                    h = h.brightness / 125 * 3 + h.color / 500;
                if (k && !f || k && f && h > d || !k && !f && h > d) {
                    f = k, d = h, e = z(c[g]);
                }
            }
            return e;
        };
        var ka = z.names = {
                aliceblue: "f0f8ff",
                antiquewhite: "faebd7",
                aqua: "0ff",
                aquamarine: "7fffd4",
                azure: "f0ffff",
                beige: "f5f5dc",
                bisque: "ffe4c4",
                black: "000",
                blanchedalmond: "ffebcd",
                blue: "00f",
                blueviolet: "8a2be2",
                brown: "a52a2a",
                burlywood: "deb887",
                burntsienna: "ea7e5d",
                cadetblue: "5f9ea0",
                chartreuse: "7fff00",
                chocolate: "d2691e",
                coral: "ff7f50",
                cornflowerblue: "6495ed",
                cornsilk: "fff8dc",
                crimson: "dc143c",
                cyan: "0ff",
                darkblue: "00008b",
                darkcyan: "008b8b",
                darkgoldenrod: "b8860b",
                darkgray: "a9a9a9",
                darkgreen: "006400",
                darkgrey: "a9a9a9",
                darkkhaki: "bdb76b",
                darkmagenta: "8b008b",
                darkolivegreen: "556b2f",
                darkorange: "ff8c00",
                darkorchid: "9932cc",
                darkred: "8b0000",
                darksalmon: "e9967a",
                darkseagreen: "8fbc8f",
                darkslateblue: "483d8b",
                darkslategray: "2f4f4f",
                darkslategrey: "2f4f4f",
                darkturquoise: "00ced1",
                darkviolet: "9400d3",
                deeppink: "ff1493",
                deepskyblue: "00bfff",
                dimgray: "696969",
                dimgrey: "696969",
                dodgerblue: "1e90ff",
                firebrick: "b22222",
                floralwhite: "fffaf0",
                forestgreen: "228b22",
                fuchsia: "f0f",
                gainsboro: "dcdcdc",
                ghostwhite: "f8f8ff",
                gold: "ffd700",
                goldenrod: "daa520",
                gray: "808080",
                green: "008000",
                greenyellow: "adff2f",
                grey: "808080",
                honeydew: "f0fff0",
                hotpink: "ff69b4",
                indianred: "cd5c5c",
                indigo: "4b0082",
                ivory: "fffff0",
                khaki: "f0e68c",
                lavender: "e6e6fa",
                lavenderblush: "fff0f5",
                lawngreen: "7cfc00",
                lemonchiffon: "fffacd",
                lightblue: "add8e6",
                lightcoral: "f08080",
                lightcyan: "e0ffff",
                lightgoldenrodyellow: "fafad2",
                lightgray: "d3d3d3",
                lightgreen: "90ee90",
                lightgrey: "d3d3d3",
                lightpink: "ffb6c1",
                lightsalmon: "ffa07a",
                lightseagreen: "20b2aa",
                lightskyblue: "87cefa",
                lightslategray: "789",
                lightslategrey: "789",
                lightsteelblue: "b0c4de",
                lightyellow: "ffffe0",
                lime: "0f0",
                limegreen: "32cd32",
                linen: "faf0e6",
                magenta: "f0f",
                maroon: "800000",
                mediumaquamarine: "66cdaa",
                mediumblue: "0000cd",
                mediumorchid: "ba55d3",
                mediumpurple: "9370db",
                mediumseagreen: "3cb371",
                mediumslateblue: "7b68ee",
                mediumspringgreen: "00fa9a",
                mediumturquoise: "48d1cc",
                mediumvioletred: "c71585",
                midnightblue: "191970",
                mintcream: "f5fffa",
                mistyrose: "ffe4e1",
                moccasin: "ffe4b5",
                navajowhite: "ffdead",
                navy: "000080",
                oldlace: "fdf5e6",
                olive: "808000",
                olivedrab: "6b8e23",
                orange: "ffa500",
                orangered: "ff4500",
                orchid: "da70d6",
                palegoldenrod: "eee8aa",
                palegreen: "98fb98",
                paleturquoise: "afeeee",
                palevioletred: "db7093",
                papayawhip: "ffefd5",
                peachpuff: "ffdab9",
                peru: "cd853f",
                pink: "ffc0cb",
                plum: "dda0dd",
                powderblue: "b0e0e6",
                purple: "800080",
                red: "f00",
                rosybrown: "bc8f8f",
                royalblue: "4169e1",
                saddlebrown: "8b4513",
                salmon: "fa8072",
                sandybrown: "f4a460",
                seagreen: "2e8b57",
                seashell: "fff5ee",
                sienna: "a0522d",
                silver: "c0c0c0",
                skyblue: "87ceeb",
                slateblue: "6a5acd",
                slategray: "708090",
                slategrey: "708090",
                snow: "fffafa",
                springgreen: "00ff7f",
                steelblue: "4682b4",
                tan: "d2b48c",
                teal: "008080",
                thistle: "d8bfd8",
                tomato: "ff6347",
                turquoise: "40e0d0",
                violet: "ee82ee",
                wheat: "f5deb3",
                white: "fff",
                whitesmoke: "f5f5f5",
                yellow: "ff0",
                yellowgreen: "9acd32"
            }, R = z.hexNames = function(b) {
                var c = {}, e;
                for (e in b) {
                    b.hasOwnProperty(e) && (c[b[e]] = e);
                }
                return c;
            }(ka),
            X = {
                rgb: RegExp("rgb[\\s|\\(]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))\\s*\\)?"),
                rgba: RegExp("rgba[\\s|\\(]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))\\s*\\)?"),
                hsl: RegExp("hsl[\\s|\\(]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))\\s*\\)?"),
                hsla: RegExp("hsla[\\s|\\(]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))\\s*\\)?"),
                hsv: RegExp("hsv[\\s|\\(]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))[,|\\s]+((?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?))\\s*\\)?"),
                hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
                hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
                hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
            };
        window.tinycolor = z;
    })();
    b(function() {
        b.fn.spectrum.load && b.fn.spectrum.processNativeColorInputs();
    });
});
(function() {
    var b, d;
    jQuery.uaMatch = function(b) {
        b = b.toLowerCase();
        b = /(chrome)[ \/]([\w.]+)/.exec(b) || /(webkit)[ \/]([\w.]+)/.exec(b) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(b) || /(msie) ([\w.]+)/.exec(b) || 0 > b.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(b) || [];
        return {
            browser: b[1] || "",
            version: b[2] || "0"
        };
    };
    b = jQuery.uaMatch(navigator.userAgent);
    d = {};
    b.browser && (d[b.browser] = !0, d.version = b.version);
    d.chrome ? d.webkit = !0 : d.webkit && (d.safari = !0);
    jQuery.browser = d;
    jQuery.sub = function() {
        function b(d, g) {
            return new b.fn.init(d, g);
        }
        jQuery.extend(!0, b, this);
        b.superclass = this;
        b.fn = b.prototype = this();
        b.fn.constructor = b;
        b.sub = this.sub;
        b.fn.init = function(k, h) {
            h && h instanceof jQuery && !(h instanceof b) && (h = b(h));
            return jQuery.fn.init.call(this, k, h, d);
        };
        b.fn.init.prototype = b.fn;
        var d = b(document);
        return b;
    };
})();
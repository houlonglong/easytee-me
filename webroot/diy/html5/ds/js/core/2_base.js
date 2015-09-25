Namespace("base");
base.EventManager = function() {
    this.element = $(window);
    this.trigger = function(b, d) {
        this.element.trigger(b, [d]);
        this.enableLogging && console.log("event:" + b);
    };
    this.on = function(b, d) {
        var c = function(b, c) {
            d(c);
        };
        this.element.on(b, c);
        return function() {
            eventManager.element.off(b, c);
        };
    };
};
window.eventManager = new base.EventManager;

base.addStyleElement = function(b) {
    var d = document.head || document.getElementsByTagName("head")[0],
        c = document.createElement("style");
    c.type = "text/css";
    c.styleSheet ? c.styleSheet.cssText = b : c.appendChild(document.createTextNode(b));
    d.appendChild(c);
};

base.ColorUtils = function() {
    function b(b) {
        var c = {
            r: 0,
            g: 0,
            b: 0,
            a: 1
        };
        b = getColorString(b, !0);
        "none" === b ? c.a = 0 : b.match(/[0-9A-F]{6}/) && (c.r = parseInt("0x" + b.substring(0, 2)), c.g = parseInt("0x" + b.substring(2, 4)), c.b = parseInt("0x" + b.substring(4, 6)));
        return c;
    }
    this.rgbToXyz = function(b) {
        var c = b[0] / 255,
            g = b[1] / 255;
        b = b[2] / 255;
        c = 0.04045 < c ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92;
        g = 0.04045 < g ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
        b = 0.04045 < b ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
        c *= 100;
        g *= 100;
        b *= 100;
        return [0.4124 * c + 0.3576 * g + 0.1805 * b, 0.2126 * c + 0.7152 * g + 0.0722 * b, 0.0193 * c + 0.1192 * g + 0.9505 * b];
    };
    this.xyzToLab = function(b) {
        var c = b[0] / 95.047,
            g = b[1] / 100;
        b = b[2] / 108.883;
        c = 0.008856 < c ? Math.pow(c, 1 / 3) : 7.787 * c + 16 / 116;
        g = 0.008856 < g ? Math.pow(g, 1 / 3) : 7.787 * g + 16 / 116;
        b = 0.008856 < b ? Math.pow(b, 1 / 3) : 7.787 * b + 16 / 116;
        return [116 * g - 16, 500 * (c - g), 200 * (g - b)];
    };
    this.labToXyz = function(b) {
        var c = (b[0] + 16) / 116,
            g = b[1] / 500 + c;
        b = c - b[2] / 200;
        var k = Math.pow(c, 3),
            h = Math.pow(g, 3),
            f = Math.pow(b, 3);
        return [95.047 * (0.008856 < h ? h : (g - 16 / 116) / 7.787), 100 * (0.008856 < k ? k : (c - 16 / 116) / 7.787), 108.883 * (0.008856 < f ? f : (b - 16 / 116) / 7.787)];
    };
    this.xyzToRgb = function(b) {
        var c = b[0] / 100,
            g = b[1] / 100,
            k = b[2] / 100;
        b = 3.2406 * c + -1.5372 * g + -0.4986 * k;
        var h = -0.9689 * c + 1.8758 * g + 0.0415 * k,
            c = 0.0557 * c + -0.204 * g + 1.057 * k;
        b = 0.0031308 < b ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : 12.92 * b;
        h = 0.0031308 < h ? 1.055 * Math.pow(h, 1 / 2.4) - 0.055 : 12.92 * h;
        c = 0.0031308 < c ? 1.055 * Math.pow(c, 1 / 2.4) - 0.055 : 12.92 * c;
        return [Math.round(255 * b), Math.round(255 * h), Math.round(255 * c)];
    };
    this.labToRgb = function(b) {
        b = this.labToXyz(b);
        return this.xyzToRgb(b);
    };
    this.rgbToLab = function(b) {
        b = this.rgbToXyz(b);
        return this.xyzToLab(b);
    };
    this.cie1994 = function(b, c, g) {
        var k = b[0],
            h = b[1],
            f = b[2];
        b = c[0];
        var m = c[1],
            q = c[2],
            n;
        g ? (c = 0.014, n = 0.048, g = 2) : (c = 0.015, n = 0.045, g = 1);
        var r = Math.sqrt(h * h + f * f),
            t = Math.sqrt(m * m + q * q);
        c = 1 + c * r;
        n = 1 + n * r;
        h -= m;
        f -= q;
        m = r - t;
        k -= b;
        b = Math.abs(h * h + f * f - m * m);
        b = Math.sqrt(b);
        return Math.sqrt(Math.pow(k / (1 * g), 2) + Math.pow(m / (1 * n), 2) + Math.pow(b / (1 * c), 2));
    };
    this.ciede2000 = function(b, c) {
        var g = Math.sqrt,
            k = Math.pow,
            h = Math.cos,
            f = Math.atan2,
            m = Math.sin,
            q = Math.abs,
            n = Math.exp,
            r = Math.PI,
            t = b[0],
            p = b[1],
            e = b[2],
            u = c[0],
            s = c[1],
            w = c[2],
            v = g(k(p, 2) + k(e, 2)),
            x = g(k(s, 2) + k(w, 2)),
            B = (v + x) / 2,
            B = 0.5 * (1 - g(k(B, 7) / (k(B, 7) + k(25, 7)))),
            p = (1 + B) * p,
            y = (1 + B) * s,
            s = g(k(p, 2) + k(e, 2)),
            B = g(k(y, 2) + k(w, 2)),
            D = function(b, c) {
                if (0 === b && 0 === c) {
                    return 0;
                }
                var e;
                e = f(b, c) * (180 / r);
                return 0 <= e ? e : e + 360;
            }, V = D(e, p),
            y = D(w, y),
            w = u - t,
            e = B - s,
            p = function(b, c, e, f) {
                if (0 === b * c) {
                    return 0;
                }
                if (180 >= q(f - e)) {
                    return f - e;
                }
                if (180 < f - e) {
                    return f - e - 360;
                }
                if (-180 > f - e) {
                    return f - e + 360;
                }
                throw Error();
            }(v, x, V, y),
            p = 2 * g(s * B) * m(r / 180 * p / 2),
            t = (t + u) / 2,
            u = (s + B) / 2,
            v = function(b, c, e, f) {
                if (0 === b * c) {
                    return e + f;
                }
                if (180 >= q(e - f)) {
                    return (e + f) / 2;
                }
                if (180 < q(e - f) && 360 > e + f) {
                    return (e + f + 360) / 2;
                }
                if (180 < q(e - f) && 360 <= e + f) {
                    return (e + f - 360) / 2;
                }
                throw Error();
            }(v, x, V, y),
            h = 1 - 0.17 * h(r / 180 * (v - 30)) + 0.24 * h(r / 180 * v * 2) + 0.32 * h(r / 180 * (3 * v + 6)) - 0.2 * h(r / 180 * (4 * v - 63)),
            n = 30 * n(-k((v - 275) / 25, 2)),
            v = g(k(u, 7) / (k(u, 7) + k(25, 7))),
            x = 1 + 0.015 * k(t - 50, 2) / g(20 + k(t - 50, 2)),
            t = 1 + 0.045 * u,
            h = 1 + 0.015 * u * h,
            m = -2 * v * m(r / 180 * n * 2);
        return g(k(w / (1 * x), 2) + k(e / (1 * t), 2) + k(p / (1 * h), 2) + e / (1 * t) * m * (p / (1 * h)));
    };
    this.compareColors = function(d, c) {
        var g = b(d),
            k = b(c),
            g = this.rgbToXyz([g.r, g.g, g.b]),
            k = this.rgbToXyz([k.r, k.g, k.b]),
            g = this.xyzToLab(g),
            k = this.xyzToLab(k);
        return this.cie1994(g, k, !1).toFixed(2) / 100;
    };
    this.compareCiedeColors = function(b, c) {
        var g = this.rgbToXyz([b[0], b[1], b[2]]),
            k = this.rgbToXyz([c[0], c[1], c[2]]),
            g = this.xyzToLab(g),
            k = this.xyzToLab(k);
        return this.cie1994(g, k, !1) / 100;
    };
};
base.colorUtils = new base.ColorUtils;

(function(b) {
    base.validators = {
        text: function(b, c) {
            var g = !0;
            1 > b.trim().length && (c.value = "", g = !1);
            return g;
        },
        required: function(d, c) {
            var g = !0,
                k = b(c).parent().find(".isd-invalid-msg");
            0 == d.trim().length && (k.text("这是一个必填项").show(), c.value = "", g = !1);
            g && k.text("").hide();
            return g;
        },
        name: function(d, c) {
            var g = !0,
                k = b(c).parent().find(".isd-invalid-msg");
            0 < d.trim().length ? d.match(/\d+/g) && (k.text("名称不能包含数字").show(), g = !1) : (k.text("这是一个必填项").show(), c.value = "", g = !1);
            g && k.text("").hide();
            return g;
        },
        email: function(d, c) {
            var g = !0,
                k = b(c).parent().find(".isd-invalid-msg");
            0 < d.length ? d.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) || (k.text("邮箱格式错误").show(), g = !1) : (k.text("这是一个必填项").show(), g = !1);
            console.log("isValid = ", g);
            g && k.text("").hide();
            return g;
        },
        multipleEmail: function(d, c) {
            var g = !0,
                k = b(c).parent().find(".isd-invalid-msg");
            d.split(",").forEach(function(b) {
                0 < b.length ? (b = b.trim().replace(",", ""), b.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) || (k.text("邮箱格式错误").show(), g = !1)) : (k.text("这是一个必填项").show(), g = !1);
            });
            console.log("isValid = ", g);
            g && k.text("").hide();
            return g;
        },
        phone: function(d, c) {
            var g = !0,
                k = b(c).parent().find(".isd-invalid-msg");
            0 < d.length ? d.match(/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i) ? k.text("这是一个必填项").show() : (k.text("电话号码格式错误").show(), g = !1) : (k.text("这是一个必填项").show(), g = !1);
            g && k.text("").hide();
            return g;
        },
        taxID: function(d, c) {
            var g = !0,
                k = b(c).parent().find(".isd-invalid-msg");
            0 < d.trim().length ? d.match(/^([07][1-7]|1[0-6]|2[0-7]|[35][0-9]|[468][0-8]|9[0-589])-?\d{7}$/) || (k.text("传真格式错误").show(), g = !1) : (k.text("这是一个必填项").show(), g = !1);
            g && k.text("").hide();
            return g;
        },
        creditCardNumber: function(d, c) {
            var g = b(c).parent().find(".isd-invalid-msg");
            isValid = !1;
            value = d.replace(/\D+/g, "");
            len = value.length;
            mul = 0;
            prodArr = [
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
            ];
            for (sum = 0; len--;) {
                sum += prodArr[mul][parseInt(value.charAt(len), 10)], mul ^= 1;
            }
            0 < d.length ? 0 === sum % 10 && 0 < sum ? (g.text("这是一个必填项").show(), isValid = !0) : g.text("证件格式错误").show() : g.text("这是一个必填项").show();
            isValid && g.text("").hide();
            return isValid;
        },
        zipCode: function(d, c) {
            var g = b(c).attr("data-mode") || "US",
                k = b(c).parent().find(".isd-invalid-msg"),
                h = !1;
            (h = "1" == g ? d.match(/^\d{5}$/) || d.match(/^\d{5}\-\d{4}$/) || d.match(/^\d{9}$/) : "2" == g ? d.match(/^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/) : !0) ? k.text("").hide() : k.text("邮编格式错误").show();
            return h;
        },
        password: function(d, c) {
            var g = !0,
                k = b(c).parent().find(".isd-invalid-msg");
            0 < d.length ? 6 > d.length && (k.text("密码至少需要6位").show(), g = !1) : (k.text("这是一个必填项").show(), g = !1);
            g && k.text("").hide();
            return g;
        },
        confirmPassword: function(d, c) {
            var g = b(c),
                k = !0,
                h = g.parent().find(".isd-invalid-msg"),
                f = g.val(),
                g = b("#" + g.attr("data-password-field")).val();
            0 < d.length ? f !== g ? (h.text("两次输入的密码不一致").show(), k = !1) : h.text("这是一个必填项").show() : (h.text("这是一个必填项").show(), k = !1);
            k && h.text("").hide();
            return k;
        }
    };
})(jQuery);
(function(b) {
    var d = {
        init: function(b) {
            return this.each(function() {});
        },
        destroy: function() {
            return this.each(function() {
                var c = b(this);
                1 == c.find(".ls_outer").length && c.find(".ls_outer").remove();
                1 == c.next(".ls_main").length && c.next(".ls_main").remove();
            });
        },
        method_1: function(c) {
            var d = {
                color_option_1: "#f9f9f9",
                color_option_2: "#000",
                main_width: 70,
                main_height: 12,
                inner_width: 10,
                animation_speed: 10,
                additional_style: "",
                after_element: !1
            };
            return this.each(function() {
                function k() {
                    f.find(".ls_inner").css({
                        "margin-left": u
                    });
                    setTimeout(k, p);
                    u++;
                    u == n && (u = -t);
                }

                function h() {
                    f.next(".ls_main").find(".ls_inner").css({
                        "margin-left": s
                    });
                    setTimeout(h, p);
                    s++;
                    s == n && (s = 0);
                }
                c && b.extend(d, c);
                var f = b(this),
                    m = d.color_option_1,
                    q = d.color_option_2,
                    n = d.main_width,
                    r = d.main_height,
                    t = d.inner_width,
                    p = d.animation_speed,
                    e = d.additional_style;
                d.after_element ? (f.after('<div class="ls_main" style="overflow:hidden; background-color:' + m + "; width:" + n + "px; height:" + r + "px; " + e + '"><span class="ls_inner" style="display:inline-block; width:' + t + "px; height:" + r + 'px;"></span></div>'), setTimeout(h, p), f.next(".ls_main").find(".ls_inner").css({
                    "background-color": q
                })) : (f.prepend('<div class="ls_outer" style="position:absolute; z-index:99999; width:' + f.width() + "px; height:" + f.height() + 'px;"><div class="ls_main" style="overflow:hidden; margin-left:auto; margin-right:auto; background-color:' +
                    m + "; width:" + n + "px; height:" + r + "px; " + e + '"><span class="ls_inner" style="display:inline-block; width:' + t + "px; height:" + r + 'px;"></span></div></div>'), f.find(".ls_main").css({
                    "margin-top": (f.find(".ls_outer").height() - f.find(".ls_main").outerHeight()) / 2
                }), setTimeout(k, p), f.find(".ls_inner").css({
                    "background-color": q
                }));
                var u = 0,
                    s = 0;
            });
        },
        method_2: function(c) {
            var d = {
                color_option_1: "#aaa",
                color_option_2: "#000",
                main_width: 15,
                main_height: 15,
                animation_speed: 200,
                number_of_box: 3,
                margin_left_right: 2,
                additional_style: "",
                circle_shape: !0,
                zoom_effect: !1,
                after_element: !1
            };
            return this.each(function() {
                function k() {
                    u[0] ? (f.find(".ls_inner").css({
                        "background-color": m,
                        height: r
                    }), f.find(".ls_inner").eq(x).css({
                        "background-color": q,
                        height: r + u[1]
                    })) : (f.find(".ls_inner").css({
                        "background-color": m
                    }), f.find(".ls_inner").eq(x).css({
                        "background-color": q
                    }));
                    setTimeout(k, t);
                    x++;
                    x == p && (x = 0);
                }

                function h() {
                    u[0] ? (f.next(".ls_main").find(".ls_inner").css({
                        "background-color": m,
                        height: r
                    }), f.next(".ls_main").find(".ls_inner").eq(B).css({
                        "background-color": q,
                        height: r + u[1]
                    })) : (f.next(".ls_main").find(".ls_inner").css({
                        "background-color": m
                    }), f.next(".ls_main").find(".ls_inner").eq(B).css({
                        "background-color": q
                    }));
                    setTimeout(h, t);
                    B++;
                    B == p && (B = 0);
                }
                c && b.extend(d, c);
                var f = b(this),
                    m = d.color_option_1,
                    q = d.color_option_2,
                    n = d.main_width,
                    r = d.main_height,
                    t = d.animation_speed,
                    p = d.number_of_box,
                    e = d.margin_left_right,
                    u = d.zoom_effect,
                    s = d.additional_style,
                    w = d.after_element,
                    v = 0;
                d.circle_shape && (v = 80);
                if (w) {
                    f.after('<div class="ls_main" style="text-align:center; ' + s + '"></div>');
                    for (a = 0; a < p; a++) {
                        f.next(".ls_main").append('<span class="ls_inner" style="display:inline-block; border-radius:' + v + "px; -moz-border-radius:" + v + "px; -webkit-border-radius:" + v + "px; margin:0 " + e + "px; width:" + n + "px; height:" + r + 'px;"></span>');
                    }
                    setTimeout(h, t);
                } else {
                    f.prepend('<div class="ls_outer" style="position:absolute; z-index:99999; width:' + f.width() + "px; height:" + f.height() + 'px;"><div class="ls_main" style="text-align:center;"></div></div>');
                    for (a = 0; a < p; a++) {
                        f.find(".ls_main").append('<span class="ls_inner" style="display:inline-block; border-radius:' + v + "px; -moz-border-radius:" + v + "px; -webkit-border-radius:" + v + "px; margin:0 " + e + "px; width:" + n + "px; height:" + r + 'px;"></span>');
                    }
                    f.find(".ls_main").css({
                        "margin-top": (f.find(".ls_outer").height() - f.find(".ls_main").outerHeight()) / 2
                    });
                    setTimeout(k, t);
                }
                var x = 0,
                    B = 0;
            });
        },
        method_3: function(c) {
            var d = {
                color_option_1: "#aaa",
                color_option_2: "#000",
                animation_speed: 100,
                animation_text: "载入中。。。",
                space_between_text: 10,
                additional_style: "font-family:arial; font-size:12px;",
                zoom_effect: !1,
                after_element: !1
            };
            return this.each(function() {
                function k() {
                    e[0] ? (f.find(".ls_inner").css({
                        color: m,
                        "font-size": e[1]
                    }), f.find(".ls_inner").eq(u).css({
                        color: q,
                        "font-size": e[2]
                    })) : (f.find(".ls_inner").css({
                        color: m
                    }), f.find(".ls_inner").eq(u).css({
                        color: q
                    }));
                    setTimeout(k, n);
                    u++;
                    u == r.length && (u = 0);
                }

                function h() {
                    e[0] ? (f.next(".ls_main").find(".ls_inner").css({
                        color: m,
                        "font-size": e[1]
                    }), f.next(".ls_main").find(".ls_inner").eq(s).css({
                        color: q,
                        "font-size": e[2]
                    })) : (f.next(".ls_main").find(".ls_inner").css({
                        color: m
                    }), f.next(".ls_main").find(".ls_inner").eq(s).css({
                        color: q
                    }));
                    setTimeout(h, n);
                    s++;
                    s == r.length && (s = 0);
                }
                c && b.extend(d, c);
                var f = b(this),
                    m = d.color_option_1,
                    q = d.color_option_2,
                    n = d.animation_speed,
                    r = d.animation_text,
                    t = d.space_between_text,
                    r = r.split(""),
                    p = d.additional_style,
                    e = d.zoom_effect;
                if (d.after_element) {
                    f.after('<div class="ls_main" style="overflow:hidden; text-align:center; ' + p + '"></div>');
                    for (a = 0; a < r.length; a++) {
                        f.next(".ls_main").append('<span class="ls_inner" style="display:inline-block; text-align:center; width:' + t + 'px;">' + r[a] + "</span>");
                    }
                    setTimeout(h, n);
                } else {
                    f.prepend('<div class="ls_outer" style="position:absolute; z-index:99999; width:' + f.width() + "px; height:" + f.height() + 'px;"><div class="ls_main" style="overflow:hidden; margin-left:auto; margin-right:auto; text-align:center; ' + p + '"></div></div>');
                    for (a = 0; a < r.length; a++) {
                        f.find(".ls_main").append('<span class="ls_inner" style="display:inline-block; text-align:center; width:' + t + 'px;">' + r[a] + "</span>");
                    }
                    f.find(".ls_main").css({
                        "margin-top": (f.find(".ls_outer").height() - f.find(".ls_main").outerHeight()) / 2
                    });
                    setTimeout(k, n);
                }
                var u = 0,
                    s = 0;
            });
        },
        method_4: function(c) {
            var d = {
                color_option_1: "#fff",
                color_option_2: "#000",
                main_width: 30,
                main_height: 30,
                animation_speed: 100,
                additional_style: "font-family:arial;",
                after_element: !1
            };
            return this.each(function() {
                function k() {
                    f.find(".ls_main").html(e);
                    setTimeout(k, t);
                    e++;
                }

                function h() {
                    f.next(".ls_main").html(u);
                    setTimeout(h, t);
                    u++;
                }
                c && b.extend(d, c);
                var f = b(this),
                    m = d.color_option_1,
                    q = d.color_option_2,
                    n = d.main_width,
                    r = d.main_height,
                    t = d.animation_speed,
                    p = d.additional_style;
                d.after_element ? (f.after('<div class="ls_main" style="overflow:hidden; text-align:center; border-radius:80px; -moz-border-radius:80px; -webkit-border-radius:80px; width:' + n + "px; height:" + r + "px; line-height:" + r + "px; background-color:" + m + "; color:" + q + "; " + p + '">0</div>'), setTimeout(h, t)) : (f.prepend('<div class="ls_outer" style="position:absolute; z-index:99999; width:' + f.width() + "px; height:" + f.height() + 'px;"><div class="ls_main" style="overflow:hidden; text-align:center; border-radius:80px; -moz-border-radius:80px; -webkit-border-radius:80px; margin-left:auto; margin-right:auto; width:' +
                    n + "px; height:" + r + "px; line-height:" + r + "px; background-color:" + m + "; color:" + q + "; " + p + '">0</div></div>'), f.find(".ls_main").css({
                    "margin-top": (f.find(".ls_outer").height() - f.find(".ls_main").outerHeight()) / 2
                }), setTimeout(k, t));
                var e = 1,
                    u = 1;
            });
        },
        method_5: function(c) {
            var d = {
                color_option_1: "#eee",
                color_option_2: "#000",
                main_width: 25,
                animation_speed: 200,
                additional_style: "",
                after_element: !1
            };
            return this.each(function() {
                function k() {
                    f.find(".ls_inner").css({
                        "background-color": m
                    });
                    f.find(".ls_inner").eq(e).css({
                        "background-color": q
                    });
                    setTimeout(k, t);
                    e++;
                    4 == e && (e = 0);
                }

                function h() {
                    f.next(".ls_main").find(".ls_inner").css({
                        "background-color": m
                    });
                    f.next(".ls_main").find(".ls_inner").eq(u).css({
                        "background-color": q
                    });
                    setTimeout(h, t);
                    u++;
                    4 == u && (u = 0);
                }
                c && b.extend(d, c);
                var f = b(this),
                    m = d.color_option_1,
                    q = d.color_option_2,
                    n = d.main_width,
                    r = n / 2,
                    t = d.animation_speed,
                    p = d.additional_style;
                d.after_element ? (f.after('<div class="ls_main" style="overflow:hidden; vertical-align:center; width:' + n + "px; height:" + n + "px; " + p + '"><span class="ls_inner" style="display:block; float:left; width:' + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; width:' + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; width:' + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; width:' +
                    r + "px; height:" + r + 'px;"></span></div>'), setTimeout(h, t)) : (f.prepend('<div class="ls_outer" style="position:absolute; z-index:99999; width:' + f.width() + "px; height:" + f.height() + 'px;"><div class="ls_main" style="overflow:hidden; margin-left:auto; margin-right:auto; vertical-align:center; width:' + n + "px; height:" + n + "px; " + p + '"><span class="ls_inner" style="display:block; float:left; width:' + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; width:' +
                    r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; width:' + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; width:' + r + "px; height:" + r + 'px;"></span></div></div>'), f.find(".ls_main").css({
                    "margin-top": (f.find(".ls_outer").height() - f.find(".ls_main").outerHeight()) / 2
                }), setTimeout(k, t));
                var e = 0,
                    u = 0;
            });
        },
        method_6: function(c) {
            var d = {
                color_option_1: "#f9f9f9",
                color_option_2: "#333",
                main_width: 30,
                animation_speed: 100,
                additional_style: "",
                reverse_animation: !1,
                circle_shape: !1,
                after_element: !1
            };
            return this.each(function() {
                function k() {
                    p ? (f.find(".ls_inner").css({
                        "background-color": m
                    }), f.find(".ls_inner." + s + "").css({
                        "background-color": q
                    })) : (f.find(".ls_inner").css({
                        "background-color": m
                    }), f.find(".ls_inner." + w + "").css({
                        "background-color": q
                    }));
                    setTimeout(k, r);
                    s++;
                    w--;
                    6 == s && (s = 1);
                    0 == w && (w = 6);
                }

                function h() {
                    p ? (f.next(".ls_main").find(".ls_inner").css({
                        "background-color": m
                    }), f.next(".ls_main").find(".ls_inner." + v + "").css({
                        "background-color": q
                    })) : (f.next(".ls_main").find(".ls_inner").css({
                        "background-color": m
                    }), f.next(".ls_main").find(".ls_inner." + x + "").css({
                        "background-color": q
                    }));
                    setTimeout(h, r);
                    v++;
                    x--;
                    6 == v && (v = 1);
                    0 == x && (x = 6);
                }
                c && b.extend(d, c);
                var f = b(this),
                    m = d.color_option_1,
                    q = d.color_option_2,
                    n = d.main_width,
                    r = d.animation_speed,
                    t = d.additional_style,
                    p = d.reverse_animation,
                    e = d.after_element,
                    u = 0;
                d.circle_shape && (u = 80);
                e ? (f.after('<div class="ls_main" style="overflow:hidden; border-radius:' + u + "px; -moz-border-radius:" + u + "px; -webkit-border-radius:" + u + "px; width:" + n + "px; height:" + n + "px; " + t + '"><span class="ls_inner 1" style="display:block; border-radius:' + u + "px; -moz-border-radius:" + u + "px; -webkit-border-radius:" + u + "px; background-color:" + m + '; width:100%; height:100%; margin-left:0%; margin-top:0%; float:left;"><span class="ls_inner 2" style="display:block; border-radius:' +
                    u + "px; -moz-border-radius:" + u + "px; -webkit-border-radius:" + u + "px; background-color:" + m + '; width:80%; height:80%; margin-left:10%; margin-top:10%; float:left;"><span class="ls_inner 3" style="display:block; border-radius:' + u + "px; -moz-border-radius:" + u + "px; -webkit-border-radius:" + u + "px; background-color:" + m + '; width:80%; height:80%; margin-left:10%; margin-top:10%; float:left;"><span class="ls_inner 4" style="display:block; border-radius:' + u + "px; -moz-border-radius:" +
                    u + "px; -webkit-border-radius:" + u + "px; background-color:" + m + '; width:80%; height:80%; margin-left:10%; margin-top:10%; float:left;"><span class="ls_inner 5" style="display:block; border-radius:' + u + "px; -moz-border-radius:" + u + "px; -webkit-border-radius:" + u + "px; background-color:" + m + '; width:80%; height:80%; margin-left:10%; margin-top:10%; float:left;"><span class="ls_inner 6" style="display:block; border-radius:' + u + "px; -moz-border-radius:" + u + "px; -webkit-border-radius:" +
                    u + "px; background-color:" + m + '; width:60%; height:60%; margin-left:20%; margin-top:20%; float:left;"></span></span></span></span></span></span></div>'), setTimeout(h, r)) : (f.prepend('<div class="ls_outer" style="position:absolute; z-index:99999; width:' + f.width() + "px; height:" + f.height() + 'px;"><div class="ls_main" style="overflow:hidden; border-radius:' + u + "px; -moz-border-radius:" + u + "px; -webkit-border-radius:" + u + "px; margin-left:auto; margin-right:auto; width:" +
                    n + "px; height:" + n + "px; " + t + '"><span class="ls_inner 1" style="display:block; border-radius:' + u + "px; -moz-border-radius:" + u + "px; -webkit-border-radius:" + u + "px; background-color:" + m + '; width:100%; height:100%; margin-left:0%; margin-top:0%; float:left;"><span class="ls_inner 2" style="display:block; border-radius:' + u + "px; -moz-border-radius:" + u + "px; -webkit-border-radius:" + u + "px; background-color:" + m + '; width:80%; height:80%; margin-left:10%; margin-top:10%; float:left;"><span class="ls_inner 3" style="display:block; border-radius:' +
                    u + "px; -moz-border-radius:" + u + "px; -webkit-border-radius:" + u + "px; background-color:" + m + '; width:80%; height:80%; margin-left:10%; margin-top:10%; float:left;"><span class="ls_inner 4" style="display:block; border-radius:' + u + "px; -moz-border-radius:" + u + "px; -webkit-border-radius:" + u + "px; background-color:" + m + '; width:80%; height:80%; margin-left:10%; margin-top:10%; float:left;"><span class="ls_inner 5" style="display:block; border-radius:' + u + "px; -moz-border-radius:" +
                    u + "px; -webkit-border-radius:" + u + "px; background-color:" + m + '; width:80%; height:80%; margin-left:10%; margin-top:10%; float:left;"><span class="ls_inner 6" style="display:block; border-radius:' + u + "px; -moz-border-radius:" + u + "px; -webkit-border-radius:" + u + "px; background-color:" + m + '; width:60%; height:60%; margin-left:20%; margin-top:20%; float:left;"></span></span></span></span></span></span></div></div>'), f.find(".ls_main").css({
                    "margin-top": (f.find(".ls_outer").height() -
                        f.find(".ls_main").outerHeight()) / 2
                }), setTimeout(k, r));
                var s = 1,
                    w = 1,
                    v = 1,
                    x = 1;
            });
        },
        method_7: function(c) {
            var d = {
                color_option_1: "#fff",
                color_option_2: "#333",
                main_width: "25",
                animation_speed: 1,
                additional_style: "",
                reverse_animation: !1,
                gradient_setting: !1,
                circle_shape: !1,
                after_element: !1
            };
            return this.each(function() {
                function k() {
                    e[0] && (f.find(".ls_main").css({
                        transform: "rotate(" + v + "deg)",
                        "-moz-transform": "rotate(" + v + "deg)",
                        "-o-transform": "rotate(" + v + "deg)",
                        "-ms-transform": "rotate(" + v + "deg)",
                        "-webkit-transform": "rotate(" + v + "deg)"
                    }), v += e[3]);
                    p ? f.find(".ls_inner").css({
                        height: "" + w + "%",
                        width: "" + w + "%",
                        "margin-left": "" + s / 2 + "%",
                        "margin-top": "" + s / 2 + "%"
                    }) : f.find(".ls_inner").css({
                        height: "" + s + "%",
                        width: "" + s + "%",
                        "margin-left": "" + w / 2 + "%",
                        "margin-top": "" + w / 2 + "%"
                    });
                    setTimeout(k, r);
                    s--;
                    w++;
                    0 == s && (s = 100);
                    100 == w && (w = 0);
                }

                function h() {
                    e[0] && (f.next(".ls_main").css({
                        transform: "rotate(" + y + "deg)",
                        "-moz-transform": "rotate(" + y + "deg)",
                        "-o-transform": "rotate(" + y + "deg)",
                        "-ms-transform": "rotate(" + y + "deg)",
                        "-webkit-transform": "rotate(" + y + "deg)"
                    }), y += e[3]);
                    p ? f.next(".ls_main").find(".ls_inner").css({
                        height: "" + B + "%",
                        width: "" + B + "%",
                        "margin-left": "" + x / 2 + "%",
                        "margin-top": "" + x / 2 + "%"
                    }) : f.next(".ls_main").find(".ls_inner").css({
                        height: "" + x + "%",
                        width: "" + x + "%",
                        "margin-left": "" + B / 2 + "%",
                        "margin-top": "" + B / 2 + "%"
                    });
                    setTimeout(h, r);
                    x--;
                    B++;
                    0 == x && (x = 100);
                    100 == B && (B = 0);
                }
                c && b.extend(d, c);
                var f = b(this),
                    m = d.color_option_1,
                    q = d.color_option_2,
                    n = d.main_width,
                    r = d.animation_speed,
                    t = d.additional_style,
                    p = d.reverse_animation,
                    e = d.gradient_setting,
                    u = 0;
                d.circle_shape && (u = 80);
                d.after_element ? (e[0] ? f.after('<div class="ls_main" style="overflow:hidden; border-radius:' + u + "px; -moz-border-radius:" + u + "px; -webkit-border-radius:" + u + "px; background-color:" + m + "; width:" + n + "px; height:" + n + "px; " + t + '"><span class="ls_inner" style="display:block; border-radius:' + u + "px; -moz-border-radius:" + u + "px; -webkit-border-radius:" + u + "px; background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(" + e[1] + "), to(" + e[2] + ")); background: -webkit-linear-gradient(top, " +
                    e[1] + ", " + e[2] + "); background: -moz-linear-gradient(left, " + e[1] + ", " + e[2] + "); background: -ms-linear-gradient(top, " + e[1] + ", " + e[2] + "); background: -o-linear-gradient(top, " + e[1] + ", " + e[2] + '); width:100%; height:100%; margin-left:0; margin-top:0;"></span></div>') : f.after('<div class="ls_main" style="overflow:hidden; border-radius:' + u + "px; -moz-border-radius:" + u + "px; -webkit-border-radius:" + u + "px; background-color:" + m + "; margin-left:auto; margin-right:auto; width:" +
                    n + "px; height:" + n + "px; " + t + '"><span class="ls_inner" style="display:block; border-radius:' + u + "px; -moz-border-radius:" + u + "px; -webkit-border-radius:" + u + "px; background-color:" + q + '; width:100%; height:100%; margin-left:0; margin-top:0;"></span></div>'), setTimeout(h, r)) : (e[0] ? f.prepend('<div class="ls_outer" style="position:absolute; z-index:99999; width:' + f.width() + "px; height:" + f.height() + 'px;"><div class="ls_main" style="overflow:hidden; border-radius:' +
                    u + "px; -moz-border-radius:" + u + "px; -webkit-border-radius:" + u + "px; background-color:" + m + "; margin-left:auto; margin-right:auto; width:" + n + "px; height:" + n + "px; " + t + '"><span class="ls_inner" style="display:block; border-radius:' + u + "px; -moz-border-radius:" + u + "px; -webkit-border-radius:" + u + "px; background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(" + e[1] + "), to(" + e[2] + ")); background: -webkit-linear-gradient(top, " + e[1] + ", " + e[2] + "); background: -moz-linear-gradient(left, " +
                    e[1] + ", " + e[2] + "); background: -ms-linear-gradient(top, " + e[1] + ", " + e[2] + "); background: -o-linear-gradient(top, " + e[1] + ", " + e[2] + '); width:100%; height:100%; margin-left:0; margin-top:0;"></span></div></div>') : f.prepend('<div class="ls_outer" style="position:absolute; z-index:99999; width:' + f.width() + "px; height:" + f.height() + 'px;"><div class="ls_main" style="overflow:hidden; border-radius:' + u + "px; -moz-border-radius:" + u + "px; -webkit-border-radius:" +
                    u + "px; background-color:" + m + "; margin-left:auto; margin-right:auto; width:" + n + "px; height:" + n + "px; " + t + '"><span class="ls_inner" style="display:block; border-radius:' + u + "px; -moz-border-radius:" + u + "px; -webkit-border-radius:" + u + "px; background-color:" + q + '; width:100%; height:100%; margin-left:0; margin-top:0;"></span></div></div>'), f.find(".ls_main").css({
                    "margin-top": (f.find(".ls_outer").height() - f.find(".ls_main").outerHeight()) / 2
                }), setTimeout(k, r));
                var s = 100,
                    w = 0,
                    v = 0,
                    x = 100,
                    B = 0,
                    y = 0;
            });
        },
        method_8: function(c) {
            var d = {
                color_option_1: "#333",
                color_option_2: "#fff",
                main_width: 30,
                animation_speed: 200,
                additional_style: "",
                circle_shape: !1,
                animation_effect: "",
                after_element: !1
            };
            return this.each(function() {
                function k() {
                    "rotate" == e ? f.find(".ls_main").css({
                        transform: "rotate(" + w + "deg)",
                        "-moz-transform": "rotate(" + w + "deg)",
                        "-o-transform": "rotate(" + w + "deg)",
                        "-ms-transform": "rotate(" + w + "deg)",
                        "-webkit-transform": "rotate(" + w + "deg)"
                    }) : 0 == w % 2 ? "round" == e ? (f.find(".ls_inner").eq(0).css({
                        "background-color": q
                    }), f.find(".ls_inner").eq(1).css({
                        "background-color": q
                    }), f.find(".ls_inner").eq(2).css({
                        "background-color": q
                    }), f.find(".ls_inner").eq(3).css({
                        "background-color": m
                    }), f.find(".ls_inner").eq(5).css({
                        "background-color": q
                    }),
                        f.find(".ls_inner").eq(6).css({
                            "background-color": m
                        }), f.find(".ls_inner").eq(7).css({
                        "background-color": m
                    }), f.find(".ls_inner").eq(8).css({
                        "background-color": m
                    })) : "cross" == e ? (f.find(".ls_inner").eq(4).css({
                        "background-color": q
                    }), f.find(".ls_inner").eq(0).css({
                        "background-color": m
                    }), f.find(".ls_inner").eq(2).css({
                        "background-color": q
                    }), f.find(".ls_inner").eq(6).css({
                        "background-color": q
                    }), f.find(".ls_inner").eq(8).css({
                        "background-color": m
                    })) : (f.find(".ls_inner:even").css({
                        "background-color": m
                    }),
                        f.find(".ls_inner:odd").css({
                            "background-color": q
                        })) : "round" == e ? (f.find(".ls_inner").eq(0).css({
                        "background-color": m
                    }), f.find(".ls_inner").eq(1).css({
                        "background-color": m
                    }), f.find(".ls_inner").eq(2).css({
                        "background-color": m
                    }), f.find(".ls_inner").eq(3).css({
                        "background-color": q
                    }), f.find(".ls_inner").eq(5).css({
                        "background-color": m
                    }), f.find(".ls_inner").eq(6).css({
                        "background-color": q
                    }), f.find(".ls_inner").eq(7).css({
                        "background-color": q
                    }), f.find(".ls_inner").eq(8).css({
                        "background-color": q
                    })) :
                        "cross" == e ? (f.find(".ls_inner").eq(4).css({
                            "background-color": q
                        }), f.find(".ls_inner").eq(0).css({
                            "background-color": q
                        }), f.find(".ls_inner").eq(2).css({
                            "background-color": m
                        }), f.find(".ls_inner").eq(6).css({
                            "background-color": m
                        }), f.find(".ls_inner").eq(8).css({
                            "background-color": q
                        })) : (f.find(".ls_inner:odd").css({
                            "background-color": m
                        }), f.find(".ls_inner:even").css({
                            "background-color": q
                        }));
                    setTimeout(k, t);
                    w++;
                }

                function h() {
                    "rotate" == e ? f.next(".ls_main").css({
                        transform: "rotate(" + v + "deg)",
                        "-moz-transform": "rotate(" + v + "deg)",
                        "-o-transform": "rotate(" + v + "deg)",
                        "-ms-transform": "rotate(" + v + "deg)",
                        "-webkit-transform": "rotate(" + v + "deg)"
                    }) : 0 == v % 2 ? "round" == e ? (f.next(".ls_main").find(".ls_inner").eq(0).css({
                        "background-color": q
                    }), f.next(".ls_main").find(".ls_inner").eq(1).css({
                        "background-color": q
                    }), f.next(".ls_main").find(".ls_inner").eq(2).css({
                        "background-color": q
                    }), f.next(".ls_main").find(".ls_inner").eq(3).css({
                        "background-color": m
                    }),
                        f.next(".ls_main").find(".ls_inner").eq(5).css({
                            "background-color": q
                        }), f.next(".ls_main").find(".ls_inner").eq(6).css({
                        "background-color": m
                    }), f.next(".ls_main").find(".ls_inner").eq(7).css({
                        "background-color": m
                    }), f.next(".ls_main").find(".ls_inner").eq(8).css({
                        "background-color": m
                    })) : "cross" == e ? (f.next(".ls_main").find(".ls_inner").eq(4).css({
                        "background-color": q
                    }), f.next(".ls_main").find(".ls_inner").eq(0).css({
                        "background-color": m
                    }), f.next(".ls_main").find(".ls_inner").eq(2).css({
                        "background-color": q
                    }),
                        f.next(".ls_main").find(".ls_inner").eq(6).css({
                            "background-color": q
                        }), f.next(".ls_main").find(".ls_inner").eq(8).css({
                        "background-color": m
                    })) : (f.next(".ls_main").find(".ls_inner:even").css({
                        "background-color": m
                    }), f.next(".ls_main").find(".ls_inner:odd").css({
                        "background-color": q
                    })) : "round" == e ? (f.next(".ls_main").find(".ls_inner").eq(0).css({
                        "background-color": m
                    }), f.next(".ls_main").find(".ls_inner").eq(1).css({
                        "background-color": m
                    }), f.next(".ls_main").find(".ls_inner").eq(2).css({
                        "background-color": m
                    }),
                        f.next(".ls_main").find(".ls_inner").eq(3).css({
                            "background-color": q
                        }), f.next(".ls_main").find(".ls_inner").eq(5).css({
                        "background-color": m
                    }), f.next(".ls_main").find(".ls_inner").eq(6).css({
                        "background-color": q
                    }), f.next(".ls_main").find(".ls_inner").eq(7).css({
                        "background-color": q
                    }), f.next(".ls_main").find(".ls_inner").eq(8).css({
                        "background-color": q
                    })) : "cross" == e ? (f.next(".ls_main").find(".ls_inner").eq(4).css({
                        "background-color": q
                    }), f.next(".ls_main").find(".ls_inner").eq(0).css({
                        "background-color": q
                    }),
                        f.next(".ls_main").find(".ls_inner").eq(2).css({
                            "background-color": m
                        }), f.next(".ls_main").find(".ls_inner").eq(6).css({
                        "background-color": m
                    }), f.next(".ls_main").find(".ls_inner").eq(8).css({
                        "background-color": q
                    })) : (f.next(".ls_main").find(".ls_inner:odd").css({
                        "background-color": m
                    }), f.next(".ls_main").find(".ls_inner:even").css({
                        "background-color": q
                    }));
                    setTimeout(h, t);
                    v++;
                }
                c && b.extend(d, c);
                var f = b(this),
                    m = d.color_option_1,
                    q = d.color_option_2,
                    n = d.main_width,
                    r = n / 3,
                    t = d.animation_speed,
                    p = d.additional_style,
                    e = d.animation_effect,
                    u = d.after_element,
                    s = 0;
                d.circle_shape && (s = 80);
                u ? ("rotate" == e ? f.after('<div class="ls_main" style="overflow:hidden; border-radius:' + s + "px; -moz-border-radius:" + s + "px; -webkit-border-radius:" + s + "px; vertical-align:center; width:" + n + "px; height:" + n + "px; " + p + '"><span class="ls_inner" style="display:block; float:left; background-color:' + m + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + q + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' +
                    m + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + q + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + m + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + q + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' +
                    m + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + q + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + m + "; width:" + r + "px; height:" + r + 'px;"></span></div>') : f.after('<div class="ls_main" style="overflow:hidden; border-radius:' + s + "px; -moz-border-radius:" + s + "px; -webkit-border-radius:" + s + "px; vertical-align:center; width:" +
                    n + "px; height:" + n + "px; " + p + '"><span class="ls_inner" style="display:block; float:left; width:' + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; width:' + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; width:' + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; width:' + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; width:' +
                    r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; width:' + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; width:' + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; width:' + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; width:' + r + "px; height:" + r + 'px;"></span></div>'), setTimeout(h, t)) : ("rotate" ==
                    e ? f.prepend('<div class="ls_outer" style="position:absolute; z-index:99999; width:' + f.width() + "px; height:" + f.height() + 'px;"><div class="ls_main" style="overflow:hidden; border-radius:' + s + "px; -moz-border-radius:" + s + "px; -webkit-border-radius:" + s + "px; margin-left:auto; margin-right:auto; vertical-align:center; width:" + n + "px; height:" + n + "px; " + p + '"><span class="ls_inner" style="display:block; float:left; background-color:' + m + "; width:" + r + "px; height:" +
                    r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + q + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + m + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + q + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + m +
                    "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + q + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + m + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + q + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' +
                    m + "; width:" + r + "px; height:" + r + 'px;"></span></div></div>') : f.prepend('<div class="ls_outer" style="position:absolute; z-index:99999; width:' + f.width() + "px; height:" + f.height() + 'px;"><div class="ls_main" style="overflow:hidden; border-radius:' + s + "px; -moz-border-radius:" + s + "px; -webkit-border-radius:" + s + "px; margin-left:auto; margin-right:auto; vertical-align:center; width:" + n + "px; height:" + n + "px; " + p + '"><span class="ls_inner" style="display:block; float:left; width:' +
                    r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; width:' + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; width:' + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; width:' + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; width:' + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; width:' +
                    r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; width:' + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; width:' + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; width:' + r + "px; height:" + r + 'px;"></span></div></div>'), f.find(".ls_main").css({
                    "margin-top": (f.find(".ls_outer").height() - f.find(".ls_main").outerHeight()) / 2
                }), setTimeout(k, t));
                var w = 0,
                    v = 0;
            });
        },
        method_9: function(c) {
            var d = {
                color_option_1: "#333",
                color_option_2: "#ddd",
                main_width: 25,
                animation_speed: 5,
                additional_style: "",
                after_element: !1
            };
            return this.each(function() {
                function k() {
                    f.find(".ls_main").css({
                        transform: "rotate(" + e + "deg)",
                        "-moz-transform": "rotate(" + e + "deg)",
                        "-o-transform": "rotate(" + e + "deg)",
                        "-ms-transform": "rotate(" + e + "deg)",
                        "-webkit-transform": "rotate(" + e + "deg)"
                    });
                    setTimeout(k, t);
                    e += 2;
                }

                function h() {
                    f.next(".ls_main").css({
                        transform: "rotate(" + u + "deg)",
                        "-moz-transform": "rotate(" + u + "deg)",
                        "-o-transform": "rotate(" + u + "deg)",
                        "-ms-transform": "rotate(" + u + "deg)",
                        "-webkit-transform": "rotate(" + u + "deg)"
                    });
                    setTimeout(h, t);
                    u += 2;
                }
                c && b.extend(d, c);
                var f = b(this),
                    m = d.color_option_1,
                    q = d.color_option_2,
                    n = d.main_width,
                    r = n / 3,
                    t = d.animation_speed,
                    p = d.additional_style;
                d.after_element ? (f.after('<div class="ls_main" style="overflow:hidden; border-radius:80px; -moz-border-radius:80px; -webkit-border-radius:80px; vertical-align:center; width:' + n + "px; height:" + n + "px; " + p + '"><span class="ls_inner" style="display:block; float:left; background-color:' + m + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + q + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' +
                    m + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + m + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + q + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + m + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' +
                    m + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + q + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + m + "; width:" + r + "px; height:" + r + 'px;"></span></div>'), setTimeout(h, t)) : (f.prepend('<div class="ls_outer" style="position:absolute; z-index:99999; width:' + f.width() + "px; height:" + f.height() + 'px;"><div class="ls_main" style="overflow:hidden; border-radius:80px; -moz-border-radius:80px; -webkit-border-radius:80px; margin-left:auto; margin-right:auto; vertical-align:center; width:' +
                    n + "px; height:" + n + "px; " + p + '"><span class="ls_inner" style="display:block; float:left; background-color:' + m + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + q + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + m + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' +
                    m + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + q + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + m + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + m + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' +
                    q + "; width:" + r + "px; height:" + r + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + m + "; width:" + r + "px; height:" + r + 'px;"></span></div></div>'), f.find(".ls_main").css({
                    "margin-top": (f.find(".ls_outer").height() - f.find(".ls_main").outerHeight()) / 2
                }), setTimeout(k, t));
                var e = 0,
                    u = 0;
            });
        },
        method_10: function(c) {
            var d = {
                color_option: ["#eee", "#333", "#eee", "#333"],
                main_width: 25,
                animation_speed: 1,
                additional_style: "",
                after_element: !1
            };
            return this.each(function() {
                function k() {
                    f.find(".ls_main").css({
                        transform: "rotate(" + p + "deg)",
                        "-moz-transform": "rotate(" + p + "deg)",
                        "-o-transform": "rotate(" + p + "deg)",
                        "-ms-transform": "rotate(" + p + "deg)",
                        "-webkit-transform": "rotate(" + p + "deg)"
                    });
                    setTimeout(k, r);
                    p += 2;
                }

                function h() {
                    f.next(".ls_main").css({
                        transform: "rotate(" + e + "deg)",
                        "-moz-transform": "rotate(" + e + "deg)",
                        "-o-transform": "rotate(" + e + "deg)",
                        "-ms-transform": "rotate(" + e + "deg)",
                        "-webkit-transform": "rotate(" + e + "deg)"
                    });
                    setTimeout(h, r);
                    e -= 2;
                }
                c && b.extend(d, c);
                var f = b(this),
                    m = d.color_option,
                    q = d.main_width,
                    n = q / 2,
                    r = d.animation_speed,
                    t = d.additional_style;
                d.after_element ? (f.after('<div class="ls_main" style="overflow:hidden; border-radius:80px; -moz-border-radius:80px; -webkit-border-radius:80px; vertical-align:center; width:' + q + "px; height:" + q + "px; " + t + '"><span class="ls_inner" style="display:block; float:left; background-color:' + m[0] + "; width:" + n + "px; height:" + n + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + m[1] + "; width:" + n + "px; height:" + n + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' +
                    m[2] + "; width:" + n + "px; height:" + n + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + m[3] + "; width:" + n + "px; height:" + n + 'px;"></span></div>'), setTimeout(h, r)) : (f.prepend('<div class="ls_outer" style="position:absolute; z-index:99999; width:' + f.width() + "px; height:" + f.height() + 'px;"><div class="ls_main" style="overflow:hidden; border-radius:80px; -moz-border-radius:80px; -webkit-border-radius:80px; margin-left:auto; margin-right:auto; vertical-align:center; width:' +
                    q + "px; height:" + q + "px; " + t + '"><span class="ls_inner" style="display:block; float:left; background-color:' + m[0] + "; width:" + n + "px; height:" + n + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + m[1] + "; width:" + n + "px; height:" + n + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' + m[2] + "; width:" + n + "px; height:" + n + 'px;"></span><span class="ls_inner" style="display:block; float:left; background-color:' +
                    m[3] + "; width:" + n + "px; height:" + n + 'px;"></span></div></div>'), f.find(".ls_main").css({
                    "margin-top": (f.find(".ls_outer").height() - f.find(".ls_main").outerHeight()) / 2
                }), setTimeout(k, r));
                var p = 0,
                    e = 0;
            });
        },
        method_11: function(c) {
            var d = {
                color_option_1: "#aaa",
                color_option_2: "#333",
                color_option_3: "#fff",
                main_width: 30,
                animation_speed: 1,
                additional_style: "",
                animation_effect: "option_1",
                after_element: !1
            };
            return this.each(function() {
                function k() {
                    "option_3" == e ? (f.find(".ls_main").css({
                        transform: "rotate(" + w + "deg)",
                        "-moz-transform": "rotate(" + w + "deg)",
                        "-o-transform": "rotate(" + w + "deg)",
                        "-ms-transform": "rotate(" + w + "deg)",
                        "-webkit-transform": "rotate(" + w + "deg)"
                    }), f.find(".ls_inner").css({
                        height: "" + w + "%",
                        width: "" + w + "%"
                    })) : f.find(".ls_main").css({
                        transform: "rotate(" + s + "deg)",
                        "-moz-transform": "rotate(" + s + "deg)",
                        "-o-transform": "rotate(" + s + "deg)",
                        "-ms-transform": "rotate(" + s + "deg)",
                        "-webkit-transform": "rotate(" +
                            s + "deg)"
                    });
                    setTimeout(k, t);
                    s += 5;
                    w -= 5;
                    0 == w && (w = 100);
                }

                function h() {
                    "option_3" == e ? (f.next(".ls_main").css({
                        transform: "rotate(" + x + "deg)",
                        "-moz-transform": "rotate(" + x + "deg)",
                        "-o-transform": "rotate(" + x + "deg)",
                        "-ms-transform": "rotate(" + x + "deg)",
                        "-webkit-transform": "rotate(" + x + "deg)"
                    }), f.next(".ls_main").find(".ls_inner").css({
                        height: "" + x + "%",
                        width: "" + x + "%"
                    })) : f.next(".ls_main").css({
                        transform: "rotate(" + v + "deg)",
                        "-moz-transform": "rotate(" + v + "deg)",
                        "-o-transform": "rotate(" + v + "deg)",
                        "-ms-transform": "rotate(" +
                            v + "deg)",
                        "-webkit-transform": "rotate(" + v + "deg)"
                    });
                    setTimeout(h, t);
                    v += 5;
                    x -= 5;
                    0 == x && (x = 100);
                }
                c && b.extend(d, c);
                var f = b(this),
                    m = d.color_option_1,
                    q = d.color_option_2,
                    n = d.color_option_3,
                    r = d.main_width,
                    t = d.animation_speed,
                    p = d.additional_style,
                    e = d.animation_effect,
                    u = r / 1.7;
                d.after_element ? ("option_1" == e ? f.after('<div class="ls_main" style="overflow:hidden; border-radius:80px; -moz-border-radius:80px; -webkit-border-radius:80px; background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(' + m + "), to(" + q + ")); background: -webkit-linear-gradient(top, " + m + ", " + q + "); background: -moz-linear-gradient(left, " + m + ", " + q + "); background: -ms-linear-gradient(top, " + m + ", " + q + "); background: -o-linear-gradient(top, " + m + ", " + q + "); margin-left:auto; margin-right:auto; vertical-align:center; width:" +
                    r + "px; height:" + r + "px; " + p + '"><span class="ls_load_span" style="display:block; margin:auto; border-radius:80px; -moz-border-radius:80px; -webkit-border-radius:80px; background-color:' + n + "; width:" + u + "px; height:" + u + 'px;"></span></div>') : "option_2" == e ? f.after('<div class="ls_main" style="overflow:hidden; border-radius:80px; -moz-border-radius:80px; -webkit-border-radius:80px; background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(' + m + "), to(" + q + ")); background: -webkit-linear-gradient(top, " +
                    m + ", " + q + "); background: -moz-linear-gradient(left, " + m + ", " + q + "); background: -ms-linear-gradient(top, " + m + ", " + q + "); background: -o-linear-gradient(top, " + m + ", " + q + "); margin-left:auto; margin-right:auto; vertical-align:center; width:" + r + "px; height:" + r + "px; " + p + '"><span class="ls_load_span" style="display:block; margin:15% 0 0 15%; border-radius:80px; background-color:' + n + '; width:70%; height:70%;"></span></div>') : "option_3" == e && f.after('<div class="ls_main" style="overflow:hidden; border-radius:80px; -moz-border-radius:80px; -webkit-border-radius:80px; background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(' +
                    m + "), to(" + q + ")); background: -webkit-linear-gradient(top, " + m + ", " + q + "); background: -moz-linear-gradient(left, " + m + ", " + q + "); background: -ms-linear-gradient(top, " + m + ", " + q + "); background: -o-linear-gradient(top, " + m + ", " + q + "); margin-left:auto; margin-right:auto; width:" + r + "px; height:" + r + "px; " + p + '"><span class="ls_inner" style="display:block; border-radius:80px; -moz-border-radius:80px; -webkit-border-radius:80px; background-color:' +
                    n + '; width:100%; height:100%; margin-left:0; margin-top:0;"></span></div>'), setTimeout(h, t)) : ("option_1" == e ? f.prepend('<div class="ls_outer" style="position:absolute; z-index:99999; width:' + f.width() + "px; height:" + f.height() + 'px;"><div class="ls_main" style="overflow:hidden; border-radius:80px; -moz-border-radius:80px; -webkit-border-radius:80px; background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(' + m + "), to(" + q + ")); background: -webkit-linear-gradient(top, " +
                    m + ", " + q + "); background: -moz-linear-gradient(left, " + m + ", " + q + "); background: -ms-linear-gradient(top, " + m + ", " + q + "); background: -o-linear-gradient(top, " + m + ", " + q + "); margin-left:auto; margin-right:auto; vertical-align:center; width:" + r + "px; height:" + r + "px; " + p + '"><span class="ls_load_span" style="display:block; margin:auto; border-radius:80px; -moz-border-radius:80px; -webkit-border-radius:80px; background-color:' + n + "; width:" + u + "px; height:" +
                    u + 'px;"></span></div></div>') : "option_2" == e ? f.prepend('<div class="ls_outer" style="position:absolute; z-index:99999; width:' + f.width() + "px; height:" + f.height() + 'px;"><div class="ls_main" style="overflow:hidden; border-radius:80px; -moz-border-radius:80px; -webkit-border-radius:80px; background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(' + m + "), to(" + q + ")); background: -webkit-linear-gradient(top, " + m + ", " + q + "); background: -moz-linear-gradient(left, " + m +
                    ", " + q + "); background: -ms-linear-gradient(top, " + m + ", " + q + "); background: -o-linear-gradient(top, " + m + ", " + q + "); margin-left:auto; margin-right:auto; vertical-align:center; width:" + r + "px; height:" + r + "px; " + p + '"><span class="ls_load_span" style="display:block; margin:15% 0 0 15%; border-radius:80px; background-color:' + n + '; width:70%; height:70%;"></span></div></div>') : "option_3" == e && f.prepend('<div class="ls_outer" style="position:absolute; z-index:99999; width:' +
                    f.width() + "px; height:" + f.height() + 'px;"><div class="ls_main" style="overflow:hidden; border-radius:80px; -moz-border-radius:80px; -webkit-border-radius:80px; background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(' + m + "), to(" + q + ")); background: -webkit-linear-gradient(top, " + m + ", " + q + "); background: -moz-linear-gradient(left, " + m + ", " + q + "); background: -ms-linear-gradient(top, " + m + ", " + q + "); background: -o-linear-gradient(top, " + m + ", " + q + "); margin-left:auto; margin-right:auto; width:" +
                    r + "px; height:" + r + "px; " + p + '"><span class="ls_inner" style="display:block; border-radius:80px; -moz-border-radius:80px; -webkit-border-radius:80px; background-color:' + n + '; width:100%; height:100%; margin-left:0; margin-top:0;"></span></div></div>'), f.find(".ls_main").css({
                    "margin-top": (f.find(".ls_outer").height() - f.find(".ls_main").outerHeight()) / 2
                }), setTimeout(k, t));
                var s = 0,
                    w = 100,
                    v = 0,
                    x = 100;
            });
        },
        method_12: function(c) {
            var d = {
                background_image: "img/loading.png",
                main_width: 32,
                animation_speed: 1,
                additional_style: "",
                after_element: !1
            };
            return this.each(function() {
                function k() {
                    f.find(".ls_main").css({
                        transform: "rotate(" + t + "deg)",
                        "-moz-transform": "rotate(" + t + "deg)",
                        "-o-transform": "rotate(" + t + "deg)",
                        "-ms-transform": "rotate(" + t + "deg)",
                        "-webkit-transform": "rotate(" + t + "deg)"
                    });
                    setTimeout(k, n);
                    t += 5;
                }

                function h() {
                    f.next(".ls_main").css({
                        transform: "rotate(" + p + "deg)",
                        "-moz-transform": "rotate(" + p + "deg)",
                        "-o-transform": "rotate(" + p + "deg)",
                        "-ms-transform": "rotate(" + p + "deg)",
                        "-webkit-transform": "rotate(" + p + "deg)"
                    });
                    setTimeout(h, n);
                    p += 5;
                }
                c && b.extend(d, c);
                var f = b(this),
                    m = d.background_image,
                    q = d.main_width,
                    n = d.animation_speed,
                    r = d.additional_style;
                d.after_element ? (f.after('<div class="ls_main" style="overflow:hidden; width:' + q + "px; height:" + q + "px; background-image:url(" + m + "); background-repeat:no-repeat; background-position:center center; " + r + '"></div>'), setTimeout(h, n)) : (f.prepend('<div class="ls_outer" style="position:absolute; z-index:99999; width:' + f.width() + "px; height:" + f.height() + 'px;"><div class="ls_main" style="overflow:hidden; margin-left:auto; margin-right:auto; width:' + q + "px; height:" + q +
                    "px; background-image:url(" + m + "); background-repeat:no-repeat; background-position:center center; " + r + '"></div></div>'), f.find(".ls_main").css({
                    "margin-top": (f.find(".ls_outer").height() - f.find(".ls_main").outerHeight()) / 2
                }), setTimeout(k, n));
                var t = 0,
                    p = 0;
            });
        }
    };
    b.fn.LoadingScript = function(c) {
        if (d[c]) {
            return d[c].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        if ("object" !== typeof c && c) {
            b.error("jQuery 载入Script中不存在方法 ：" + c);
        } else {
            return d.init.apply(this, arguments);
        }
    };
})(jQuery);
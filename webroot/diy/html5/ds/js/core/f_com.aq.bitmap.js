Namespace("com.aq.bitmap");
com.aq.bitmap.AQBitmapPalettes = function(b, d, c) {
    function g(b, c, e) {
        var d = 0;
        w && (d = 1.8);
        e = e.getContext("2d");
        var f = e.canvas.width,
            g = e.canvas.height,
            p = e.getImageData(0, 0, f, g),
            m = p.data,
            s = 4 * (c * f + b);
        floodFillScanline(b, c, f, g, h, k, [0, 0, 0, 0], [m[s], m[s + 1], m[s + 2], m[s + 3]], m, d);
        e.putImageData(p, 0, 0);
    }

    function k(b, c, e, d, f, g) {
        b = 4 * (c * e + b);
        g[b + 0] = f[0];
        g[b + 1] = f[1];
        g[b + 2] = f[2];
        g[b + 3] = f[3];
    }

    function h(b, c, e, d, f, g, h, k) {
        b = 4 * (c * e + b);
        h = [h[b], h[b + 1], h[b + 2], h[b + 3]];
        if (0 === h[3]) {
            return !1;
        }
        base.colorUtils.rgbToLab(h);
        base.colorUtils.rgbToLab(g);
        g = base.colorUtils.cie1994(h, g, !1) / 100 <= k / 100 ? !0 : !1;
        return g;
    }

    function f(b, c) {
        return {
            x: Math.round(c.offsetX * b.width / b.clientWidth),
            y: Math.round(c.offsetY * b.height / b.clientHeight)
        };
    }

    function m(b) {
        if ("HTMLCanvasElement" === p.toString().slice(8, -1)) {
            var c = !1,
                e = new Image;
            e.onload = function() {
                b && !c && (b(), c = !0);
            };
            e.src = p.toDataURL();
            e.naturalWidth && b && !c && (setTimeout(b), c = !0);
            p = e;
        }
    }

    function q(b) {
        for (var c = [], e = 0; e < b.length; e++) {
            var d = base.colorUtils.labToRgb(b[e].lab);
            c.push(d);
        }
        return c;
    }

    function n(b) {
        return 2 == b.length ? b : "0" + b;
    }

    function r(b) {
        for (var c = [], e = 0; e < b.length; e++) {
            var d = n(b[e][0].toString(16)),
                d = d + n(b[e][1].toString(16)),
                d = d + n(b[e][2].toString(16)),
                d = b[e][3] ? d + n(b[e][3].toString(16)) : d + "ff";
            c.push(d);
        }
        return c;
    }

    function t(b) {
        var c = {}, c = parseInt(b.substring(0, 2), 16),
            e = parseInt(b.substring(2, 4), 16),
            d = parseInt(b.substring(4, 6), 16);
        a = parseInt(b.substring(6, 8), 16);
        return c = {
            r: c,
            g: e,
            b: d,
            a: a
        };
    }
    var p = b,
        e = {}, u = [],
        s = !0,
        w = !0;
    this.init = function() {
        m(d);
    };
    this.getPicture = function(b) {
        var d = document.createElement("canvas");
        d.width = p.naturalWidth;
        d.height = p.naturalHeight;
        var h = d.getContext("2d"),
            k = this.getQuantizedImage(b, !0);
        h.drawImage(k.img, 0, 0);
        c && (e[b] ? d = e[b] : (this.removeBackground(d, !0), e[b] = d));
        d.addEventListener("click", function(b) {
            b = f(d, b);
            g(b.x, b.y, this);
        }, !1);
        return d;
    };
    this.replaceColor = function(b, c, e, d) {
        console.log(b, c, e);
        var f = t(c).r,
            g = t(c).g,
            h = t(c).b,
            k = t(c).a,
            p = t(e).r,
            m = t(e).g,
            s = t(e).b,
            n = t(e).a;
        ctx = b.getContext("2d");
        ctx.globalCompositeOperation = "source-out";
        var q = d ? d.getContext("2d") : ctx,
            r = ctx.getImageData(0, 0, b.width, b.height),
            w = d ? q.getImageData(0, 0, d.width, d.height) : r;
        console.log(r);
        d = 0;
        for (q = w.data.length; d < q; d += 4) {
            w.data[d] == f && w.data[d + 1] == g && w.data[d + 2] == h && w.data[d + 3] == k && (r.data[d] = p, r.data[d + 1] = m, r.data[d + 2] = s, r.data[d + 3] = n);
        }
        ctx.putImageData(r, 0, 0);
        d = 0;
        for (q = u.length; d < q; d++) {
            if (u[d].img == b) {
                for (f = 0, g = u[d].colors.length; f < g; f++) {
                    u[d].colors[f] == c && (u[d].colors[f] = e);
                }
            }
        }
    };
    this.removeBackground = function(b, c) {
        var e = b.getContext("2d"),
            d = e.canvas.width,
            f = e.canvas.height,
            g = e.getImageData(0, 0, d, f);
        if (c) {
            for (var p = g.data, m = 0; m < d; m++) {
                k(m, 0, d, f, [255, 255, 255, 255], p), k(m, f - 1, d, f, [255, 255, 255, 255], p);
            }
            for (m = 0; m < f; m++) {
                k(0, m, d, f, [255, 255, 255, 255], p), k(d - 1, m, d, f, [255, 255, 255, 255], p);
            }
            floodFillScanline(0, 0, d, f, h, k, [0, 0, 0, 0], [255, 255, 255], p, 15);
        } else {
            for (var d = {}, s, n, q, f = g.data, p = f.length, r = base.colorUtils.rgbToLab([255, 255, 255]), m = 0; m < p; m += 4) {
                n = f[m], s = f[m + 1], q = f[m + 2], n = [n, s, q], d[n] ? s = d[n] : (s = base.colorUtils.rgbToLab(n), s = base.colorUtils.cie1994(s, r, !1) / 100, 0 === s && (s = 0.001), d[n] = s), 0.1 >= s && (f[m + 3] = 0);
            }
        }
        e.putImageData(g, 0, 0);
    };
    this.getQuantizedImage = function(b) {
        b = parseInt(b);
        var c = findMatch(u, function(c) {
            return c.colors.length == b;
        });
        if (c) {
            return c;
        }
        var c = new ui.bitmap.SimpleQuant(p);
        var e = c.getPalette(9); //获取图片颜色
        var e = c.reducePaletteForced(e, b); //去掉类似颜色
        var c = c.reduceToPalette(e);//
        var e = q(e);
        c.id = "canvas_bmp" + b;
        c = {
            img: c,
            colors: r(e),
            oColors: r(e)
        };
        u.push(c);
        return c;
    };
    this.init();
    Object.defineProperty(this, "bitmaps", {
        set: function(b) {
            u = b;
        },
        get: function() {
            return u;
        }
    });
    Object.defineProperty(this, "canClick", {
        set: function(b) {
            s = b;
        },
        get: function() {
            return s;
        }
    });
    Object.defineProperty(this, "fullColor", {
        set: function(b) {
            w = b;
        },
        get: function() {
            return w;
        }
    });
    Object.defineProperty(this, "bW", {
        get: function() {
            if (document.getElementById("canvasRasterColors")) {
                var b = document.getElementById("canvasRasterColors");
                b.parentNode.removeChild(b);
            }
            var d = document.createElement("canvas");
            d.id = "canvasRasterColors";
            d.width = p.naturalWidth;
            d.height = p.naturalHeight;
            ctx = d.getContext("2d");
            ctx.drawImage(p, 0, 0);
            for (var b = ctx.getImageData(0, 0, d.width, d.height), h = b.data, k = 0, m = h.length; k < m; k += 4) {
                var s = 0.3 * h[k] + 0.59 * h[k + 1] + 0.11 * h[k + 2];
                h[k] = s;
                h[k + 1] = s;
                h[k + 2] = s;
            }
            ctx.putImageData(b, 0, 0);
            d.addEventListener("click", function(b) {
                b = f(d, b);
                g(b.x, b.y, this);
            }, !1);
            c && (e.blackAndWhite ? d = e.blackAndWhite : (this.removeBackground(d, !0), e.blackAndWhite = d));
            return d;
        }
    });
    Object.defineProperty(this, "original", {
        get: function() {
            if (document.getElementById("canvasRasterColors")) {
                var b = document.getElementById("canvasRasterColors");
                b.parentNode.removeChild(b);
            }
            var d = document.createElement("canvas");
            d.width = p.naturalWidth;
            d.height = p.naturalHeight;
            ctx = d.getContext("2d");
            ctx.imageSmoothingEnabled = ctx.mozImageSmoothingEnabled = ctx.webkitImageSmoothingEnabled = !1;
            ctx.drawImage(p, 0, 0);
            d.addEventListener("click", function(b) {
                b = f(d, b);
                g(b.x, b.y, this);
            }, !1);
            c && (e.fullColor ? d = e.fullColor : (this.removeBackground(d, !0), e.fullColor = d));
            return d;
        }
    });
};
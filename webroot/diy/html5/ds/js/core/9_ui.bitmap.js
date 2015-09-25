Namespace("ui.bitmap");
ui.bitmap.BitmapElement = function(b, d, c, g, k, h, f, m, q, n, r) {
    function t(b) {
        u && !e.sleep && (e.prototype.baseSetPositionAndSize(e.x, e.y, e.width, e.height, e.rotation, e.flipH, e.flipV, u, w, null, b), eventManager.trigger("rasterQualityChanged", this), e.prototype.reportInitiated());
    }

    function p(b) {
        if ("none" == b) {
            return {
                r: 255,
                g: 255,
                b: 255,
                a: 0
            };
        }
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
    var e = this,
        u, s = c,
        w, v, x, B = 100,
        y;
    this.props = "x y width height rotation flipH flipV url colors".split(" ");
    this.historyProps = "data id type x y width height rotation flipH flipV z colors url".split(" ");
    this.getNode = function() {
        return u;
    };
    this.forceUpdate = function(b) {
        e.sleep = !1;
        t(b);
    };
    this.remove = function() {
        u.remove();
    };
    this.init = function() {
        e.sleep = !1;
        v = d.set();
        u = d.image(s, e.x, e.y, e.width, e.height);
        u.node.setAttribute("id", "DsElement" + b.id);
        u.attr("src");
        v.push(u);
        w = u.getBBox(!0);
        e.forceUpdate();
        var c = new Image;
        c.src = u.attr("src");
        y = new ui.resolution.ResolutionMeter(c.width, c.height);
    };
    e.prototype = new ui.element.BaseElement(e, g, k, q, h, f, m, n, r, !0, b, "image");
    e.init();
    this.basicPropertyUpdated = function(b) {
        t(b);
    };
    this.replaceColor = function(b, c) {
        var d = new Image;
        d.src = u.attr("src");
        var f = document.createElement("canvas");
        f.width = d.width;
        f.height = d.height;
        var d = p(b).r,
            h = p(b).g,
            g = p(b).b,
            k = p(b).a,
            m = p(c).r,
            n = p(c).g,
            q = p(c).b,
            x = p(c).a,
            r = f.getContext("2d");
        r.globalCompositeOperation = "source-out";
        var v = new Image;
        v.src = u.attr("src");
        r.drawImage(v, 0, 0);
        v = r.getImageData(0, 0, f.width, f.height);
        console.log(v);
        for (var w = 0, y = v.data.length; w < y; w += 4) {
            var B = v.data[w + 3] == k;
            if (v.data[w] == d && v.data[w + 1] == h && v.data[w + 2] == g && B || B && 0 === k) {
                v.data[w] = m, v.data[w + 1] = n, v.data[w + 2] = q, v.data[w + 3] = x;
            }
        }
        r.putImageData(v, 0, 0);
        s = f.toDataURL();
        u.attr("src", s);
        e.data.art_id = 0;
        e.data.artID = 0;
    };
    Object.defineProperty(this, "url", {
        set: function(b) {
            s = b;
            e.remove();
            e.init();
        },
        get: function() {
            return s = u.attr("src");
        }
    });
    Object.defineProperty(this, "element", {
        get: function() {
            return u;
        }
    });
    Object.defineProperty(this, "quality", {
        get: function() {
            return y.getQuality(2 * e.width, 2 * e.height);
        }
    });
    Object.defineProperty(this, "colors", {
        set: function(b) {
            console.debug("colors", b);
            if (0 < b.length) {
                x = [];
                for (var c = 0; c < Math.min(b.length, B); c++) {
                    x[c] = b[c];
                }
            } else {
                if (!x) {
                    x = [];
                    return;
                }
                if ("undefined" !== typeof b.index) {
                    var c = x[b.index],
                        c = "none" == c ? "none" : c.split("#")[1] + "ff",
                        d = "none" == b.color ? "none" : b.color.split("#")[1] + "ff";
                    e.replaceColor(c, d);
                    x[b.index] = b.color;
                    b = [];
                    for (c = 0; c < x.length; c++) {
                        for (var d = !0, f = 0; f < b.length; f++) {
                            x[c] == b[f] && (d = !1);
                        }
                        d && b.push(x[c]);
                    }
                    x = clone(b);
                }
            }
            x && e.prototype.reportChange();
        },
        get: function() {
            return x;
        }
    });
    Object.defineProperty(this, "maxColors", {
        set: function(b) {
            B = b;
            x && (x = x.slice(0, B));
        },
        get: function() {
            return B;
        }
    });
};

ui.bitmap.EmbroideryArtElement = function(b, d, c, g, k, h, f, m, q, n, r) {
    function t(b) {
        e && !p.sleep && (p.prototype.baseSetPositionAndSize(p.x, p.y, p.width, p.height, p.rotation, p.flipH, p.flipV, e, s, null, b), p.prototype.reportInitiated());
    }
    var p = this,
        e, u = c,
        s, w, v;
    this.props = "x y width height rotation flipH flipV url colors".split(" ");
    this.historyProps = "data id type x y width height rotation flipH flipV z colors url".split(" ");
    this.getNode = function() {
        return e;
    };
    this.forceUpdate = function(b) {
        p.sleep = !1;
        t(b);
    };
    this.remove = function() {
        e.remove();
    };
    this.init = function() {
        p.sleep = !1;
        w = d.set();
        e = d.image(u, p.x, p.y, p.width, p.height);
        e.node.setAttribute("id", "DsElement" + b.id);
        e.attr("src");
        w.push(e);
        s = e.getBBox(!0);
        p.forceUpdate();
        p.prototype.updateDataUrl();
    };
    this.basicPropertyUpdated = function(b) {
        t(b);
    };
    Object.defineProperty(this, "url", {
        set: function(b) {
            u = b;
            p.remove();
            p.init();
            p.prototype.updateDataUrl();
        },
        get: function() {
            return u = e.attr("src");
        }
    });
    Object.defineProperty(this, "element", {
        get: function() {
            return e;
        }
    });
    Object.defineProperty(this, "colors", {
        set: function(c) {
            if (0 < c.length) {
                v = [];
                for (var e = 0; e < c.length; e++) {
                    v[e] = c[e];
                }
            } else {
                if (!v) {
                    v = [];
                    return;
                }
                "undefined" !== typeof c.index && (e = v[c.index], "none" == e || e.split("#"), "none" == c.color || c.color.split("#"), v[c.index] = c.color, p.url = state.dsUtils.getEmbroideryUrl({
                    art_id: b.art_id,
                    colors: v
                }, "embroideryArt"));
            }
            v && p.prototype.reportChange();
        },
        get: function() {
            return v;
        }
    });
    p.prototype = new ui.element.BaseElement(p, g, k, q, h, f, m, n, r, !0, b, "embroideryArt");
    p.init();
};

ui.bitmap.SimpleQuant = function(b) {
    function d(b, c) {
        var d, f, m, q, n, r;
        switch (Object.prototype.toString.call(b).slice(8, -1)) {
            case "HTMLImageElement":
                d = document.createElement("canvas"), d.width = b.naturalWidth, d.height = b.naturalHeight, f = d.getContext("2d"), f.drawImage(b, 0, 0);
            case "HTMLCanvasElement":
                d = d || b, f = f || d.getContext("2d");
            case "CanvasRenderingContext2D":
                f = f || b, d = d || f.canvas, m = f.getImageData(0, 0, d.width, d.height);
            case "ImageData":
                m = m || b, c = m.width, q = "CanvasPixelArray" === Object.prototype.toString.call(m.data).slice(8, -1) ? new Uint8Array(m.data) : m.data;
            case "Array":
                q = q || new Uint8Array(b);
            case "Uint8Array":
                ;
            case "Uint8ClampedArray":
                q = q || b, n = new Uint32Array(q.buffer);
            case "Uint32Array":
                n = n || b, q = q || new Uint8Array(n.buffer), c = c || n.length, r = n.length / c;
        }
        return {
            can: d,
            ctx: f,
            imgd: m,
            buf8: q,
            buf32: n,
            width: c,
            height: r
        };
    }
    var c = base.colorUtils.ciede2000;
    this.getPalette = function(g) {
        c = base.colorUtils.ciede2000;
        var k = document.createElement("canvas");
        k.width = 128;
        k.height = b.naturalHeight * k.width / b.naturalWidth;
        k.getContext("2d").drawImage(b, 0, 0, k.width, k.height);
        for (var k = d(k).buf32, h = k.length, f = {
            colors: []
        }, m = 0; m < h; m++) {
            var q = k[m],
                q = [q & 255, (q & 65280) >> 8, (q & 16711680) >> 16, (q & 4278190080) >> 24];
            if (0 !== q[3]) {
                if(q[0]==0&&q[1]==0){
                    var a;
                }
                var q = base.colorUtils.rgbToLab(q),
                    n = this.getNearest(f.colors, q),
                    r = null;

                if(n.difference > g) {
                    r = {
                        colors: [q]
                    };
                        this.getRepresentativeColor(r);
                        f.colors.push(r)
                }else {
                    r = f.colors[n.index];
                        r.colors.push(q);
                        this.getRepresentativeColor(r)
                };

            }
        }
        return f;
    };
    this.getRepresentativeColor = function(b) {
        var c = b.colors[b.colors.length - 1];
        b.labInfo || (b.labInfo = {}, b.lab = c);
        b.labInfo[c] || (b.labInfo[c] = 0);
        b.labInfo[c]++;
        b.labInfo[c] > b.labInfo[b.lab] && (b.lab = c);
    };
    this.reducePaletteForced = function(b, c) {
        c = c || 50;
        b.colors.sort(function(a,b){
           return b.colors.length - a.colors.length;
        });
        for (var d = 0, f = b.colors.slice(0), m = 0; m < f.length; m++) {
            d += f[m].colors.length;
        }
        for (; f.length > c;) {
            for (var q = [], m = 0; m < f.length; m++) {

                var n = f[m],
                    r = n.colors.length / d;

                    n = this.getNearest(f, n.lab, m);
                q[m] = {
                    index: m,
                    closest: n,
                    value: r * n.difference
                };
            }
            q.sort(function(b, c) {
                return b.value - c.value;
            });
            m = q[0];
            this.mergePaletteColors(m.closest.value, f[m.index]);
            f.splice(m.index, 1);
        }
        var ff = [];
        for(var i=0;i< b.colors.length;i++){
            if(f[i] && (f[i].colors.length / d) > 0.012){//TODO 值越大丢弃的颜色越多
                ff.push(f[i]);
            }

        }
        return ff;
    };
    this.reducePaletteNatural = function(b, d, h) {
        var f = 0;
        b = b.colors.slice(0);
        for (var m = 0; m < b.length; m++) {
            f += b[m].colors.length;
        }
        m = f * d / 100;
        do {
            b.sort(function(b, c) {
                return b.colors.length - c.colors.length;
            }), b[0].colors.length < m && (d = this.getNearest(b, b[0].lab, 0), this.mergePaletteColors(d.value, b[0]), b.splice(0, 1));
        } while (b[0].colors.length < m);
        for (m = 0; m < b.length; m++) {
            for (d = m + 1; d < b.length; d++) {
                if (d !== m) {
                    var f = b[m],
                        q = b[d];
                    c(f.lab, q.lab) < h && (this.mergePaletteColors(f, q), b.splice(d, 1), d = m = 0);
                }
            }
        }
        return b;
    };
    this.mergePaletteColors = function(b, c) {
        for (var d = 0; d < c.colors.length; d++) {
            b.colors.push(c.colors[d]), this.getRepresentativeColor(b);
        }
    };
    this.reduceToPalette = function(c) {
        var k = document.createElement("canvas");
        k.width = b.naturalWidth;
        k.height = b.naturalHeight;
        var h = k.width/10,
            f = k.height/10,
            m = k.getContext("2d");
        m.drawImage(b, 0, 0, h, f);
        m.imageSmoothingEnabled = m.mozImageSmoothingEnabled = m.webkitImageSmoothingEnabled = !1;
        for (var q = m.getImageData(0, 0, h, f), n = d(k).buf32, r = new ArrayBuffer(q.data.length), t = new Uint8ClampedArray(r), r = new Uint32Array(r), p = {}, e = 0; e < f; ++e) {
            for (var u = 0; u < h; ++u) {
                var s = e * h + u,
                    w = n[s];
                if (p[w]) {
                    r[s] = p[w];
                } else {
                    var v = (w & 4278190080) >> 24,
                        x = base.colorUtils.rgbToXyz([w & 255, (w & 65280) >> 8, (w & 16711680) >> 16]),
                        x = base.colorUtils.xyzToLab(x),
                        x = this.getNearest(c, x).value.lab,
                        x = base.colorUtils.labToXyz(x),
                        x = base.colorUtils.xyzToRgb(x),
                        v = v << 24 | x[2] << 16 | x[1] << 8 | x[0];
                    p[w] = v;
                    r[s] = v;
                }
            }
        }
        q.data.set(t);
        m.putImageData(q, 0, 0);
        return k;
    };
    this.getNearest = function(b, d, h) {
        for (var f = 1E5, m = -1, q = null, n = 0; n < b.length; n++) {
            if (n !== h) {
                var r = c(b[n].lab, d);
                r < f && (f = r, m = n, q = b[n]);
                if (0 === r) {
                    break;
                }
            }
        }
        return {
            difference: f,
            index: m,
            value: q
        };
    };
};
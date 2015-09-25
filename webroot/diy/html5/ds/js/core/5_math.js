Math.isInsideSegment = function(b, d, c) {
    return 0.01 > Math.abs(Math.distance(b, d) + Math.distance(b, c) - Math.distance(d, c)) ? !0 : !1;
};
Math.distancePointSegment = function(b, d, c) {
    return Math.abs(Math.distance(b, d) + Math.distance(b, c) - Math.distance(d, c));
};
Math.distPointToRect = function(b, d) {
    var c = d.m,
        g = d.invM,
        k = b.y,
        h = b.x,
        c = (k - d.p1.y - g * h + c * d.p1.x) / (c - g),
        g = g * (c - h) + k,
        k = b.x,
        h = b.y;
    console.log("对齐测量点", k, h, c, g, b, d);
    return Math.distance({
        x: k,
        y: h
    }, {
        x: c,
        y: g
    });
};
Math.nearestPointAtRect = function(b, d) {
    var c = d.m,
        g = d.invM,
        k = b.y,
        h = b.x,
        c = (k - d.p1.y - g * h + c * d.p1.x) / (c - g);
    return {
        x: c,
        y: g * (c - h) + k
    };
};
Math.pointIsInPoly = function(b, d) {
    for (var c = !1, g = d[0].x, k = d[0].x, h = d[0].y, f = d[0].y, m = 1; m < d.length; m++) {
        var q = d[m],
            g = Math.min(q.x, g),
            k = Math.max(q.x, k),
            h = Math.min(q.y, h),
            f = Math.max(q.y, f)
    }
    if (b.x < g || b.x > k || b.y < h || b.y > f) {
        return !1;
    }
    g = 0;
    k = d.length - 1;
    g;
    for (k; g < d.length; k = g++) {
        d[g].y > b.y != d[k].y > b.y && b.x < (d[k].x - d[g].x) * (b.y - d[g].y) / (d[k].y - d[g].y) + d[g].x && (c = !c);
    }
    return c;
};
Math.getTforEllipseToPoint = function(b, d, c, g) {
    var k = Math.pow(b, 2),
        h = Math.pow(b, 4),
        f = Math.pow(b, 6);
    b = Math.pow(b, 8);
    c = Math.pow(c, 2);
    var m = Math.pow(g, 2);
    g = Math.pow(d, 2);
    var q = Math.pow(d, 4),
        n = Math.pow(d, 6),
        r = Math.pow(d, 8);
    d = Math.sqrt(-(Math.sqrt(-(16 * g * m) - 16 * k * c + r - 4 * k * n + 6 * h * q - 4 * f * g + b) + q + 2 * k * g + h) / 2 + q + h) / 2;
    h = Math.sqrt(Math.sqrt(-(16 * g * m) - 16 * k * c + r - 4 * k * n + 6 * h * q - 4 * f * g + b) + q - 2 * k * g + h) / Math.pow(2, 1.5);
    return d + h + (g + k) / 2;
};
Math.distance = function(b, d) {
    return Math.sqrt(Math.pow(b.x - d.x, 2) + Math.pow(b.y - d.y, 2));
};
Math.triangleArea = function(b, d, c) {
    return c.x * d.y - d.x * c.y - (c.x * b.y - b.x * c.y) + (d.x * b.y - b.x * d.y);
};
Math.getRotatedPoint = function(b, d, c, g, k) {
    c = c / 180 * Math.PI;
    b -= g;
    d -= k;
    g += b * Math.cos(c) + d * Math.sin(c);
    k -= -(b * Math.sin(c)) + d * Math.cos(c);
    return {
        x: g,
        y: k
    };
};
Math.doPolygonsIntersect = function(b, d) {
    var c = [b, d],
        g, k, h, f, m, q, n, r;
    for (f = 0; f < c.length; f++) {
        var t = c[f];
        for (m = 0; m < t.length; m++) {
            g = t[m];
            k = t[(m + 1) % t.length];
            var p = k.y - g.y,
                e = g.x - k.x;
            g = k = void 0;
            for (q = 0; q < b.length; q++) {
                h = p * b[q].x + e * b[q].y;
                if (void 0 == g || h < g) {
                    g = h;
                }
                if (void 0 == k || h > k) {
                    k = h;
                }
            }
            n = r = void 0;
            for (q = 0; q < d.length; q++) {
                h = p * d[q].x + e * d[q].y;
                if (void 0 == n || h < n) {
                    n = h;
                }
                if (void 0 == r || h > r) {
                    r = h;
                }
            }
            if (k < n || r < g) {
                return !1;
            }
        }
    }
    return !0;
};
Math.getElementPolygon = function(b, d, c, g, k) {
    var h = [],
        f = [];
    f.push({
        x: b - c / 2,
        y: d - g / 2
    });
    f.push({
        x: b + c / 2,
        y: d - g / 2
    });
    f.push({
        x: b + c / 2,
        y: d + g / 2
    });
    f.push({
        x: b - c / 2,
        y: d + g / 2
    });
    for (c = 0; c < f.length; c++) {
        g = Math.getRotatedPoint(f[c].x, f[c].y, k, b, d), h.push(g);
    }
    return h;
};
Math.rectIntersection = function(b, d, c, g) {
    var k = (d.y - b.y) / (d.x - b.x);
    g = (g.y - c.y) / (g.x - c.x);
    px = (k * b.x - g * c.x + c.y - b.y) / (k - g);
    py = (d.y - b.y) / (d.x - b.x) * (px - b.x) + b.y;
    return {
        x: px,
        y: py
    };
};
Math.getPosFromTranslatedPoly = function(b, d, c) {
    var g = b[c].x - d.x;
    d = b[c].y - d.y;
    b = Math.rectIntersection({
        x: b[0].x,
        y: b[0].y
    }, {
        x: b[2].x,
        y: b[2].y
    }, {
        x: b[1].x,
        y: b[1].y
    }, {
        x: b[3].x,
        y: b[3].y
    });
    c = {};
    c.x = b.x - g;
    c.y = b.y - d;
    return c;
};
Math.snapAngle = function(b, d) {
    var c, g = [0, 45, 90, 135, 180, 225, 270, 315, 360],
        k = !1;
    for (i = 0; i < g.length; i++) {
        k || (Math.sqrt(Math.pow(b - g[i], 2)) < d ? (k = !0, c = g[i]) : c = b);
    }
    return c;
};
Math.angleBetweenPoints = function(b, d, c, g) {
    return 180 * Math.atan2(d - g, b - c) / Math.PI;
};
Math.angleTo360 = function(b) {
    for (; - 360 > b;) {
        b += 360;
    }
    for (b += 360; 360 < b;) {
        b -= 360;
    }
    return b;
};
Math.sortedRectangle = function(b, d, c, g) {
    var k;
    b < c ? (c -= b, k = b) : (k = c, c = b - c);
    d < g ? (g -= d, b = d) : (b = g, g = d - g);
    return {
        x1: k,
        y1: b,
        x2: c,
        y2: g
    };
};
Math.sumRect = function(b, d) {
    return {
        x: Math.min(b.x, d.x),
        y: Math.min(b.y, d.y),
        width: Math.max(b.x, d.x + d.width),
        height: Math.max(b.y, d.y + d.height)
    };
};
Math.getWrappedPath = function(b, d, c, g, k, h) {
    for (var f = 0; f < b.length; f++) {
        for (var m = 1; m < b[f].length - 1; m += 2) {
            var q = m + 1,
                n = Math.floor(parseFloat(b[f][m] - c.x) / d.width * g),
                r = Math.ceil(parseFloat(b[f][q] - c.y) / d.height * g),
                n = Math.getWrappedPoint(n, r, k, h, d.height, d.width, g);
            b[f][m] = n.x + 0;
            b[f][q] = n.y + 0;
        }
    }
    return b;
};
Math.getWrappedPoint = function(b, d, c, g, k, h, f) {
    var m = {
        x: 0,
        y: 0
    };
    m.x = h / (f - 1) * b;
    switch (c) {
        case 1:
            m.x = h / (f - 1) * b;
            m.y = 0 <= g ? k / f * d * (f - g / 10 * b) / f + b / f * (k / 2) * (g / 10) : k / f * d * (f - (f - b) * (Math.abs(g) / 10)) / f + (f - b) / f * (k / 2) * (Math.abs(g) / 10);
            break;
        case 2:
            m.x = h / (f - 1) * b;
            m.y = -(k / 2) + k / f * d;
            0 <= g ? (m.y += k / 5 * Math.pow((-1 + f - 2 * b) / f, 2) * g * (d / f), m.y -= d / f * (k / 40) * g) : (m.y -= k / 5 * Math.pow((-1 + f - 2 * b) / f, 2) * Math.abs(g) * ((f - d) / f), m.y -= (f - d) / f * (k / 40) * g);
            m.y += k / 2;
            break;
        case 3:
            m.x = h / (f - 1) * b;
            m.y = k / (f - 1) * d;
            m.y = 0 <= g ? m.y + k / 5 * Math.pow((-1 + f - 2 * b) / f, 2) * g : m.y - k / 5 * Math.pow((-1 + f - 2 * b) / f, 2) * Math.abs(g);
            break;
        case 4:
            m.x = h / (f - 1) * b;
            m.y = -(k / 2) + k / f * d;
            m.y = 0 <= g ? b < f / 2 ? m.y * Math.sqrt(1 - (f / 2 - 4 * b) / (f / 2) * (g / 10)) : m.y * Math.sqrt(Math.max(0, 1 - (f / 2 - 4 * (f - 1 - b)) / (f / 2) * (g / 10))) : b < f / 2 ? m.y * Math.pow(-1 + (f / 2 - 2 * b) / (f / 2) * (g / 10), 2) : m.y * Math.pow(-1 + (f / 2 - 2 * (f - 1 - b)) / (f / 2) * (g / 10), 2);
            break;
        case 5:
            m.y = k / f * d;
            0 <= g ? (m.x = -(h / 2) + h / f * b, m.x *= (1 + (f - 2 * d) / f * (g / 10)) / 2) : (m.x = -(h / 2) + h / f * b, m.x *= (1 + (2 * d - f) / f * (Math.abs(g) / 10)) / 2);
            m.x += h / 2;
            break;
        case 6:
            m.x = h / (f - 1) * b;
            m.y = 0 <= g ? k / f * d * ((f - g / 10 * b) / f) + b / f * (g / 10) * k : k / f * d * (f - (f - b) * (Math.abs(g) / 10)) / f + (f - b) / f * k * (Math.abs(g) / 10);
            break;
        case 7:
            m.x = h / (f - 1) * b;
            m.y = 0 <= g ? k / f * d * (f - g / 10 * b) / f : k / f * d * (f - (f - b) * (Math.abs(g) / 10)) / f;
            break;
        case 8:
            m.x = h / (f - 1) * b, m.y = k / (f - 1) * d, m.y = 0 <= g ? m.y + k / 15 * Math.pow((-1 + f - 2 * b) / f, 3) * g : m.y - k / 15 * Math.pow((-1 + f - 2 * b) / f, 3) * Math.abs(g);
    }
    return m;
};
Math.getPathOffSet = function(b) {
    for (var d = 1E4, c = 1E4, g = {
        x: 0,
        y: 0
    }, k = 0; k < b.length; k++) {
        for (var h = 1; h < b[k].length - 1; h += 2) {
            var f = h + 1,
                m = parseInt(parseFloat(b[k][h])),
                f = parseInt(parseFloat(b[k][f]));
            m < d && (d = m);
            f < c && (c = f);
        }
    }
    g.x = d;
    g.y = c;
    return g;
};
Math.getRadious = function(b, d, c) {
    var g = b = b / 2 - d / 2,
        k = b * (2 * Math.abs(c) * Math.PI / 360);
    k < 2 * (g + d / 2) && (b = 2 * (g + d / 2) / (2 * Math.abs(c) * Math.PI / 360), k = 2 * c * Math.PI / 360 * b);
    k > 2 * (g + d / 2) && (b = 2 * (g + d / 2) / (2 * Math.abs(c) * Math.PI / 360));
    return b;
};
Math.getArc = function(b, d, c, g, k, h) {
    var f = d + g * Math.cos(-k * Math.PI / 180),
        m = c - g * Math.sin(-k * Math.PI / 180);
    d += g * Math.cos(-h * Math.PI / 180);
    c -= g * Math.sin(-h * Math.PI / 180);
    var q = 0;
    k > h ? q = 1 : 180 > k && 180 > h ? q = 0 : 180 < k && 180 < h ? q = 0 : 180 > k && 180 < h ? q = 0 : 180 < k && 180 > h && (q = 1);
    return b.path([
        ["M", f, m],
        ["A", g, g, 0, q, 1, d, c]
    ]);
};
Math.arc = function(b, d, c, g) {
    b[0] = parseFloat(b[0]);
    b[1] = parseFloat(b[1]);
    angle = c;
    coords = Math.toCoords(b, d, angle);
    for (path = "M " + coords[0] + " " + coords[1]; angle <= g;) {
        coords = Math.toCoords(b, d, angle), path += " L " + coords[0] + " " + coords[1], angle += 1;
    }
    return path;
};
Math.toCoords = function(b, d, c) {
    var g = c / 180 * Math.PI;
    c = b[0] + Math.cos(g) * d;
    b = b[1] + Math.sin(g) * d;
    return [c, b];
};
Math.colorLuminance = function(b, d) {
    b = String(b).replace(/[^0-9a-f]/gi, "");
    6 > b.length && (b = b[0] + b[0] + b[1] + b[1] + b[2] + b[2]);
    d = d || 0;
    var c = "#",
        g, k;
    for (k = 0; 3 > k; k++) {
        g = parseInt(b.substr(2 * k, 2), 16), g = Math.round(Math.min(Math.max(0, g + g * d), 255)).toString(16), c += ("00" + g).substr(g.length);
    }
    return c;
};
Math.decimalToHex = function(b) {
    b = b.toString(16);
    1 == b.length && (b = "0" + b);
    return b;
};
Math.hexToDecimal = function(b) {
    return parseInt(b, 16);
};
Math.returnOpposite = function(b) {
    var d = Math.decimalToHex(255 - Math.hexToDecimal(b.substr(0, 2))),
        c = Math.decimalToHex(255 - Math.hexToDecimal(b.substr(2, 2)));
    b = Math.decimalToHex(255 - Math.hexToDecimal(b.substr(4, 2)));
    d == b && d == c && (c = d = "00", b = "FF");
    return d + c + b;
};
Math.checkSnapToRegion = function(b, d, c, g, k, h, f) {
    c = {
        x: b.x,
        y: b.y
    };
    g = [];
    k = {
        x: d.x + d.width / 2,
        y: d.y + d.height / 2,
        dist: Math.sqrt(Math.pow(b.x - d.x, 2) + Math.pow(b.y - d.y, 2))
    };
    g.push(k);
    var m = k = !1,
        q = [0, 0];
    for (i = 0; i < g.length; i++) {
        if (!1 == k || !1 == m) {
            if (Math.sqrt(Math.pow(b.x - g[i].x, 2)) < f * h || Math.sqrt(Math.pow(b.y - g[i].y, 2)) < f * h) {
                !k && Math.sqrt(Math.pow(b.x - g[i].x, 2)) < f * h && (k = !0, c.x = g[i].x, q[0] = {
                    x1: g[i].x,
                    x2: g[i].x,
                    y1: 0,
                    y2: d.height,
                    dist: g[i].dist,
                    element: g[i]
                }), !m && Math.sqrt(Math.pow(b.y - g[i].y, 2)) < f * h && (m = !0, c.y = g[i].y, q[1] = {
                    x1: 0,
                    x2: d.width,
                    y1: g[i].y,
                    y2: g[i].y,
                    dist: g[i].dist,
                    element: g[i]
                });
            }
        }
    }
    c.lines = q;
    return c;
};
Math.checkSnapToMidPoint = function(b, d, c, g, k, h, f) {
    c = {
        x: b.x,
        y: b.y
    };
    g = [];
    for (k = 0; k < d.elements.length; k++) {
        if (!d.isSelected(d.elements[k])) {
            var m = {
                x: d.elements[k].x,
                y: d.elements[k].y,
                dist: Math.sqrt(Math.pow(b.x - d.elements[k].x, 2) + Math.pow(b.y - d.elements[k].y, 2)),
                element: d.elements[k]
            };
            g.push(m);
        }
    }
    g.sort(Math.elementDistance);
    var q = m = !1,
        n = [0, 0];
    for (k = 0; k < g.length; k++) {
        if (!1 == m || !1 == q) {
            if (Math.sqrt(Math.pow(b.x - g[k].x, 2)) < f * h || Math.sqrt(Math.pow(b.y - g[k].y, 2)) < f * h) {
                !m && Math.sqrt(Math.pow(b.x - g[k].x, 2)) < f * h && (m = !0, c.x = g[k].x, n[0] = {
                    x1: g[k].x,
                    x2: g[k].x,
                    y1: b.y,
                    y2: g[k].y,
                    dist: g[k].dist,
                    element: g[k].element
                }), !q && Math.sqrt(Math.pow(b.y - g[k].y, 2)) < d.snapMidPointTolerance * d.zoomScale && (q = !0, c.y = g[k].y, n[1] = {
                    x1: b.x,
                    x2: g[k].x,
                    y1: g[k].y,
                    y2: g[k].y,
                    dist: g[k].dist,
                    element: g[k].element
                });
            }
        }
    }
    c.lines = n;
    return c;
};
Math.checkSnapToObject = function(b, d, c, g, k, h, f) {
    for (var m = {
        x: b.x,
        y: b.y
    }, q = [], n = 0; n < d.elements.length; n++) {
        if (!d.isSelected(d.elements[n])) {
            for (var r = Math.getElementPolygon(d.elements[n].x, d.elements[n].y, d.elements[n].width, d.elements[n].height, d.elements[n].rotation), t = 0; t < r.length; t++) {
                var p = {
                    x: r[t].x,
                    y: r[t].y,
                    dist: Math.sqrt(Math.pow(b.x - r[t].x, 2) + Math.pow(b.y - r[t].y, 2)),
                    element: d.elements[n]
                };
                q.push(p);
            }
            Math.sqrt(Math.pow(b.x - d.elements[n].x, 2) + Math.pow(b.y - d.elements[n].y, 2));
        }
    }
    b = Math.getElementPolygon(b.x, b.y, c, g, k);
    b.push(m);
    q.sort(Math.elementDistance);
    g = c = !1;
    k = [0, 0];
    for (t = 0; t < b.length; t++) {
        for (n = 0; n < q.length; n++) {
            if (!1 == c || !1 == g) {
                if (Math.sqrt(Math.pow(b[t].x - q[n].x, 2)) < f * h || Math.sqrt(Math.pow(b[t].y - q[n].y, 2)) < f * h) {
                    !c && Math.sqrt(Math.pow(b[t].x - q[n].x, 2)) < f * h && (c = !0, m.x = Math.getPosFromTranslatedPoly(b, q[n], t).x, k[0] = {
                        x1: q[n].x,
                        x2: q[n].x,
                        y1: d.region.height,
                        y2: 0,
                        dist: q[n].dist,
                        element: q[n].element
                    }), !g && Math.sqrt(Math.pow(b[t].y - q[n].y, 2)) < d.snapMidPointTolerance * d.zoomScale && (g = !0, m.y = Math.getPosFromTranslatedPoly(b, q[n], t).y, k[1] = {
                        x1: 0,
                        x2: d.region.width,
                        y1: q[n].y,
                        y2: q[n].y,
                        dist: q[n].dist,
                        element: q[n].element
                    });
                }
            }
        }
    }
    m.lines = k;
    return m;
};
Math.elementDistance = function(b, d) {
    return b.dist < d.dist ? -1 : b.dist > d.dist ? 1 : 0;
};
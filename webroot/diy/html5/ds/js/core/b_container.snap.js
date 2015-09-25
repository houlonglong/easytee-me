Namespace("container.snap");
container.snap.SnapScreen = function(b, d) {
    var c, g, k = b.set();
    _groupR = b.set();
    this.drawLines = function(c, f) {
        if (k) {
            for (var g = 0; g < k.items.length; g++) {
                k.items[g].remove();
            }
        }
        var q;
        q = f ? "#ffff00" : "#4245cc";
        for (g = 0; g < c.length; g++) {
            if (0 != c[g]) {
                var n = b.pathBb("M" + c[g].x1 + " " + c[g].y1 + " L" + c[g].x2 + " " + c[g].y2).attr({
                    stroke: q,
                    "stroke-width": Math.max(1 * d.zoomScale, 1),
                    "stroke-dasharray": ""
                });
                k.push(n);
                n = b.rectBb(c[g].element.x - c[g].element.width / 2, c[g].element.y - c[g].element.height / 2, c[g].element.width, c[g].element.height).attr({
                    stroke: "#4245cc",
                    "stroke-dasharray": "",
                    "stroke-width": Math.max(1, 1 * d.zoomScale)
                }).rotate(c[g].element.rotation);
                k.push(n);
            }
        }
    };
    this.removeLines = function() {
        if (k) {
            for (var b = 0; b < k.items.length; b++) {
                k.items[b].remove();
            }
        }
        if (_groupR) {
            for (b = 0; b < _groupR.items.length; b++) {
                _groupR.items[b].remove();
            }
        }
    };
    this.drawRegionLines = function(c, d) {
        if (_groupR) {
            for (var g = 0; g < _groupR.items.length; g++) {
                _groupR.items[g].remove();
            }
        }
        if (d) {
            var k = "#4245cc"
        }
        k = "#fe199d";
        for (g = 0; g < c.length; g++) {
            if (0 != c[g]) {
                var n = b.path("M" + c[g].x1 + " " + c[g].y1 + " L" + c[g].x2 + " " + c[g].y2).attr({
                    stroke: k,
                    "stroke-width": 2,
                    "stroke-dasharray": ""
                });
                _groupR.push(n);
            }
        }
    };
    this.drawNonVisibleElements = function(b) {
        console.debug("OUTSIDE CHECK LATER");
    };
    this.remove = function() {
        k && k.remove();
        _groupR && _groupR.remove();
    };
    this.init = function() {};
    this.init();
    Object.defineProperty(this, "x", {
        set: function(b) {
            c = b;
            setPositionAndSize();
        },
        get: function() {
            return c;
        }
    });
    Object.defineProperty(this, "y", {
        set: function(b) {
            g = b;
            setPositionAndSize();
        },
        get: function() {
            return g;
        }
    });
};
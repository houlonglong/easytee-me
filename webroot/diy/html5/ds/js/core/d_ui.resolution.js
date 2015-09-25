Namespace("ui.resolution");
ui.resolution.ResolutionMeter = function(b, d) {
    function c(c, g) {
        if ("w" == g) {
            var k = parseFloat(ezd.activeSide.activeRegion.render_width_inches),
                n = parseFloat(ezd.activeSide.activeRegion.region[2]),
                r = b,
                t = c
        } else {
            k = parseFloat(ezd.activeSide.activeRegion.render_width_inches), n = parseFloat(ezd.activeSide.activeRegion.region[3]), r = d, t = c;
        }
        return t / (t / (n / (k * h)) / (k * h) * k * 100 / 100) / (100 * t / r) * 100;
    }
    var g = b,
        k = d,
        h = 300;
    this.getQuality = function(b, d) {
        var g = Math.max(Math.min(c(b, "w"), h), 75),
            k = Math.max(Math.min(c(d, "h"), h), 75);
        return (Math.min(g, k) - 75) / (h - 75);
    };
    this.init = function() {};
    this.init();
    Object.defineProperty(this, "originalWidth", {
        set: function(b) {
            g = b;
        },
        get: function() {
            return g;
        }
    });
    Object.defineProperty(this, "originalHeight", {
        set: function(b) {
            k = b;
        },
        get: function() {
            return k;
        }
    });
};
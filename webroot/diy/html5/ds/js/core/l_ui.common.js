Namespace("ui.common");
ui.common.Design = function(b) {
    Object.defineProperty(this, "design_id", {
        get: function() {
            b.design.information || (b.design.information = {});
            return b.design.information.design_id;
        },
        set: function(d) {
            b.design.information || (b.design.information = {});
            b.design.information.design_id = d;
        }
    });
    Object.defineProperty(this, "canvas", {
        get: function() {
            return b.activeSide;
        }
    });
    Object.defineProperty(this, "canvases", {
        get: function() {
            return b.product.sides;
        }
    });
    Object.defineProperty(this, "canvas_text", {
        get: function() {
            var d = [];
            for (var c = 0; c < b.activeSide.elements.length; c++) {
                var g = b.activeSide.elements[c];
                g instanceof ui.text.TextElement && d.push(g);
            }
            return d;
        }
    });
    Object.defineProperty(this, "canvas_art", {
        get: function() {
            var d = [];
            for (var c = 0; c < b.activeSide.elements.length; c++) {
                var g = b.activeSide.elements[c];
                g instanceof ui.text.TextElement || d.push(g);
            }
            return d;
        }
    });
    this.isEmpty = function(d) {
        if (!b.product.sides || !b.product.sides.length) {
            return !0;
        }
        if (d) {
            return !b.activeSide.elements || !b.activeSide.elements.length;
        }
        for (d = 0; d < b.product.sides.length; d++) {
            var c = b.product.sides[d];
            if (c.elements && c.elements.length) {
                return !1;
            }
        }
        return !0;
    };
};
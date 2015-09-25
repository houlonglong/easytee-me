var listener, PopupMenu = function() {
    this.init();
};
PopupMenu.SEPARATOR = "PopupMenu.SEPARATOR";
PopupMenu.current = null;
PopupMenu.addEventListener = function(b, d, c, g) {
    "string" == typeof b && (b = document.getElementById(b));
    b.addEventListener ? b.addEventListener(d, c, g) : b.attachEvent && b.attachEvent("on" + d, c);
};
PopupMenu.removeEventListener = function(b, d, c, g) {
    "string" == typeof b && (b = document.getElementById(b));
    b.removeEventListener ? b.removeEventListener(d, c, g) : b.attachEvent && b.detachEvent("on" + d, c);
};
PopupMenu.prototype = {
    init: function() {
        this.items = [];
        this.height = this.width = 0;
    },
    setContainer: function(b) {
        this.container = b;
    },
    setSize: function(b, d) {
        this.width = b;
        this.height = d;
        if (this.element) {
            with(this.element.style) {}
        }
    },
    unbind: function(b) {
        var d = this;
        b ? "string" == typeof b && (b = document.getElementById(b)) : b = document;
        this.target = b;
        this.target.oncontextmenu = function(b) {
            d.hide.call(d, b);
            return !1;
        };
        PopupMenu.removeEventListener(b, "click", listener, !0);
        PopupMenu.addEventListener(b, "contextmenu", function() {
            return !0;
        }, !0);
    },
    bind: function(b) {
        var d = this;
        b ? "string" == typeof b && (b = document.getElementById(b)) : b = document;
        this.target = b;
        this.target.oncontextmenu = function(b) {
            d.show.call(d, b);
            return !1;
        };
        listener = function() {
            d.hide.call(d);
        };
        PopupMenu.addEventListener(b, "click", listener, !0);
    },
    add: function(b, d, c) {
        this.items.push({
            text: b,
            class: c,
            callback: d
        });
    },
    addSeparator: function() {
        this.items.push(PopupMenu.SEPARATOR);
    },
    setPos: function(b) {
        if (this.element) {
            b || (b = window.event);
            var d, c;
            if (window.opera) {
                d = b.clientX, c = b.clientY;
            } else {
                if (document.all) {
                    d = document.body.scrollLeft + event.clientX, c = document.body.scrollTop + event.clientY;
                } else {
                    if (document.layers || document.getElementById) {
                        d = b.pageX, c = b.pageY;
                    }
                }
            }
            this.element.style.top = c + -25 + "px";
            this.element.style.left = d + 25 + "px";
            console.log(d, c);
        }
    },
    show: function(b) {
        PopupMenu.current && PopupMenu.current != this || (PopupMenu.current = this, this.element ? (this.setPos(b), this.element.style.display = "") : (this.element = this.createMenu(this.items), this.setPos(b), document.body.appendChild(this.element), this.element.style.zIndex = "10004"));
    },
    hide: function() {
        PopupMenu.current = null;
        this.element && (this.element.style.display = "none");
    },
    createMenu: function(b) {
        var d = document.createElement("div");
        d.id = "isd-rightClickMenu";
        with(d.style) {
            this.width && (width = this.width + "px"), this.height && (height = this.height + "px");
        }
        for (var c = 0; c < b.length; c++) {
            var g;
            g = b[c] == PopupMenu.SEPARATOR ? this.createSeparator() : this.createItem(b[c]);
            d.appendChild(g);
        }
        return d;
    },
    createItem: function(b) {
        var d = this,
            c = document.createElement("div");
        c.setAttribute("class", "rightClickMenuOption");
        PopupMenu.addEventListener(c, "click", function(b) {
            return function() {
                d.hide();
                b(d.target);
            };
        }(b.callback), !0);
        var g = document.createElement("div");
        g.setAttribute("class", b.class);
        c.appendChild(g);
        g.appendChild(document.createTextNode(b.text));
        return c;
    },
    createSeparator: function() {
        var b = document.createElement("div");
        b.setAttribute("class", "popupSeparator");
        return b;
    }
};

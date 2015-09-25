function HistoryManager(b) {
    function d(b) {
        t.debug("function HistoryManager.addEvent");
        if (!r) {
            return !1;
        }
        var c = b.side.snapshot,
            e = b.side.snapshots;
        c < e.length - 1 && (e = e.splice(0, c + 1), b.side.snapshots = e);
        e.push(b);
        b.side.snapshot = e.length - 1;
        eventManager.trigger("undoStackChanged");
        return c;
    }

    function c() {
        var b = k();
        return clone(b.data.distressObj);
    }

    function g(b) {
        for (var c = [], e = 0; e < b.length; e++) {
            for (var d = b[e], f = {}, g = 0; g < d.historyProps.length; g++) {
                f[d.historyProps[g]] = clone(d[d.historyProps[g]]);
            }
            c.push(f);
        }
        return c;
    }

    function k() {
        var b = m(q.activeSide.name);
        if (b) {
            return b;
        }
        console.log("历史纪录管理: 找不到Side " + q.activeSide.name);
        return !1;
    }

    function h(b, c) {
        var e = {
            del: [],
            add: [],
            change: [],
            distress: {
                needChange: !1
            }
        };
        typeof c.distress != typeof b.distress ? e.distress.needChange = !0 : "undefined" != typeof c.distress && c.distress.distress_id != b.distress.distress_id && (e.distress.needChange = !0);
        e.distress.needChange && (e.distress.obj = c.distress);
        for (var d, f = 0; f < b.side.data.canvas.elements.length; f++) {
            (d = searchInArray(c.elements, b.side.data.canvas.elements[f].id, "id")) ? e.change.push(d) : e.del.push(b.side.data.canvas.elements[f].id);
        }
        for (f = 0; f < c.elements.length; f++) {
            searchInArray(b.side.data.canvas.elements, c.elements[f].id, "id") || e.add.push(c.elements[f].data);
        }
        return e;
    }

    function f(b) {
        if (!r) {
            return !1;
        }
        t.addSnapshot("elementEdited");
    }

    function m(b) {
        for (var c = 0; c < n.length; c++) {
            if (n[c].name.toUpperCase() == b.toUpperCase()) {
                return n[c];
            }
        }
        return !1;
    }
    var q = b,
        n = [],
        r = !0,
        t = this,
        p = !1,
        e = {};
    this.canUndo = function() {
        var b = k();
        return b.snapshots && b.snapshots.length && 0 < b.snapshot;
    };
    this.canRedo = function() {
        var b = k();
        return b.snapshots && b.snapshots.length && b.snapshot < b.snapshots.length - 1;
    };
    this.resetSide = function(b) {
        if (b = m(b)) {
            b.snapshots = [], b.snashot = 0;
        }
    };
    this.start = function() {
        for (var b = [], c = 0; c < q.product.sides.length; c++) {
            b.push({
                name: q.sides[c].name,
                index: c,
                data: q.sides[c],
                snapshots: [],
                snapshot: 0
            });
        }
        n = b;
        for (b = 0; b < n.length; b++) {
            n[b].snapshots.push({
                elements: g(n[b].data.boundingBox.elements),
                event: "init",
                side: n[b]
            });
        }
        p = !1;
        e = {};
        eventManager.trigger("undoStackChanged");
    };
    this.goToSnapshot = function(b) {
        this.debug("function HistoryManager.goToSnapshot");
        t.enable = !1;
        var c = k(),
            e = c.snapshot,
            d = c.snapshots;
        if (b == e) {
            console.log("历史记录管理: 没有操作快照 " + b);
        } else {
            if ("undefined" == typeof d[b]) {
                console.log("历史记录管理: " + b + " 是无效的");
            } else {
                e = h(d[e], d[b]);
                for (d = 0; d < e.change.length; d++) {
                    var f = e.change[d],
                        g = q.getElementById(f.id),
                        p;
                    for (p in f) {
                        g.object.canReportEdition = !1, g.object[p] != f[p] && (g.object[p] = f[p]), g.object.canReportEdition = !0, delete g.object.previewHtml;
                    }
                    eventManager.trigger("layersChanged");
                    eventManager.trigger("rendered", []);
                }
                for (d = 0; d < e.del.length; d++) {
                    f = q.getElementById(e.del[d]), "undefined" != typeof f && q.deleteElements(f.object);
                }
                if (e.add.length) {
                    p = [];
                    for (var m = eventManager.on("renderFromRedoComplete", function() {
                        t.enable = !0;
                        m();
                    }), d = 0; d < e.add.length; d++) {
                        p.push({
                            side: c.data,
                            element: e.add[d]
                        }), e.add[d].width = e.add[d].object.width, e.add[d].height = e.add[d].object.height, e.add[d].x = e.add[d].object.x - e.add[d].object.width / 2, e.add[d].y = e.add[d].object.y - e.add[d].object.height / 2, e.add[d].rotate = e.add[d].object.rotation, e.add[d].z = e.add[d].object.z, e.add[d].colors && (e.add[d].colors = e.add[d].object.colors), e.add[d].url && (e.add[d].image.url = e.add[d].object.url);
                    }
                    q.renderElements(p);
                } else {
                    t.enable = !0;
                }
                e.distress.needChange && q.distressProxy(c.data, e.distress.obj);
                c.snapshot = b;
                q.activeSide.boundingBox.hide();
                eventManager.trigger("undoStackChanged");
                eventManager.trigger("undoSnapshotDone");
                return e;
            }
        }
    };
    this.addSnapshot = function(b) {
        r && (b = {
            side: k(),
            distress: c(),
            elements: g(q.activeSide.boundingBox.elements),
            event: b
        }, d(b));
    };
    this.startEvent = function(b) {
        if (r) {
            if (p) {
                return !1;
            }
            p = !0;
            e = {
                side: k(),
                distress: c(),
                event: b,
                elements: []
            };
        }
    };
    this.endEvent = function() {
        r && (e.elements = clone(g(q.activeSide.boundingBox.elements)), d(e), e = null, p = !1);
    };
    this.debug = function(b) {};
    Object.defineProperties(this, {
        history: {
            get: function() {
                return n;
            }
        },
        back: {
            get: function() {
                var b = k();
                0 < b.snapshot && (b = this.goToSnapshot(b.snapshot - 1), eventManager.trigger("undoRedo", b));
            }
        },
        next: {
            get: function() {
                var b = k();
                b.snapshot < b.snapshots.length && (b = this.goToSnapshot(b.snapshot + 1), eventManager.trigger("undoRedo", b));
            }
        },
        enable: {
            get: function() {
                return r;
            },
            set: function(b) {
                r = b;
            }
        }
    });
    eventManager.on("elementEdited", f);
    eventManager.on("elementsDeleted", f);
    eventManager.on("elementAdded", f);
};
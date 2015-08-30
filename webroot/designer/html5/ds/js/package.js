function Namespace(b) {
    b = b.split(".");
    for (var d = window, c = 0; c < b.length; c++) {
        "undefined" == typeof d[b[c]] && (d[b[c]] = {}), d = d[b[c]];
    }
}

Object.defineProperty(SVGElement.prototype, "innerHTML", {
    get: function() {
        for (var b = "", d = new XMLSerializer, c = 0; c < this.childNodes.length; c++) {
            b += d.serializeToString(this.childNodes[c]);
        }
        return b;
    },
    set: function(b) {
        alert("不允许设置SVG对象的innerHTML");
    },
    enumerable: !1,
    configurable: !0
});

Math.formatFloat = function(f, digit) {
    var m = Math.pow(10, digit);
    return parseInt(f * m, 10) / m;
};

Array.prototype.unique = function() {
    var n={}, r=[];
    for(var i = 0; i < this.length; i++) {
        if (!n[this[i]]) {
            n[this[i]] = true;
            r.push(this[i]);
        }
    }
    return r;
};

//每个面单独计算颜色，每个面的颜色去重复
function getDesignColors(){
    var colorCount = 0;
    var sides = state.designer.sides;
    for(var i=0; i<sides.length; i++){
        var side = sides[i];
        var elements = side.elements;
        var colors = [];
        for(var j=0; j<elements.length; j++){
            var element = elements[j];
            if(element instanceof ui.text.TextElement){
                if(element.stroke != 0){
                    colors.push(element.strokeColor);
                }
                colors.push(element.color);
            }
            if(element instanceof ui.svg.SvgElement || element instanceof ui.bitmap.BitmapElement){
                for(var n=0; n<element.colors.length; n++){
                    colors.push(element.colors[n]);
                }
            }
        }
        colorCount += colors.unique().length;
    }
    return colorCount;
}

function completeZeros(b) {
    var d = b;
    if ("none" == d || "-1" == d) {
        return b;
    }
    for (; 6 > d.length;) {
        d = "0" + d;
    }
    return d;
}

function getUrlParam(b) {
    window.isUrlParams || (window.onpopstate = function() {
        var b, c = /\+/g,
            g = /([^&=]+)=?([^&]*)/g,
            k = window.location.search.substring(1);
        for (window.isUrlParams = {}; b = g.exec(k);) {
            window.isUrlParams[decodeURIComponent(b[1].replace(c, " "))] = decodeURIComponent(b[2].replace(c, " "));
        }
    })();
    return window.isUrlParams[b];
}

function normalizeColorStrings(b) {
    var d = ["name_color", "number_color"];
    if (b) {
        if ("string" == typeof b) {
            b = getColorString(b);
        } else {
            if (b.length) {
                for (d = 0; d < b.length; d++) {
                    b[d] = normalizeColorStrings(b[d]);
                }
            } else {
                for (var c in b) {
                    0 <= c.indexOf("color") && 0 > d.indexOf(c) ? "string" == typeof b[c] ? b[c] = getColorString(b[c]) : normalizeColorStrings(b[c]) : "object" == typeof b[c] && normalizeColorStrings(b[c]);
                }
            }
        }
        return b;
    }
}

function getColorString(b, d) {
    if (!b || "-1" == b) {
        return d ? "000000" : "#000000";
    }
    var c = b.color || b.html_color || b.value || b;
    if (!c || "string" !== typeof c) {
        return d ? "000000" : "#000000";
    }
    if ("none" == c.toLowerCase()) {
        return "none";
    }
    "0" == c && (c = "000000");
    "1" == c && (c = "000000");
    if ("ffffffff" == c.toLowerCase()) {
        return "none";
    }
    if (!c.match(/^#?[0-9a-f]{3,6}$/i)) {
        return b;
    }
    "#" == c.charAt(0) && (c = c.substring(1));
    3 == c.length && (c = c.charAt(0) + c.charAt(0) + c.charAt(1) + c.charAt(1) + c.charAt(2) + c.charAt(2));
    c = completeZeros(c);
    d || (c = "#" + c);
    return c.toUpperCase();
}

function colorsAreClose(b, d, c) {
    c || (c = 0.05);
    return base.colorUtils.compareColors(b, d) < c;
}

function isHexColorString(b) {
    return b.match(/^#[0-9a-f]{3,6}$/i);
}

function htmlEscape(b) {
    return b ? String(b).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : b;
}

function htmlUnescape(b) {
    var d = document.createElement("div");
    d.innerHTML = b;
    return 0 === d.childNodes.length ? "" : d.childNodes[0].nodeValue;
}

function textToHtml(b) {
    return b ? b.replace(/\n/g, "<br />") : b;
}

function findMatch(b, d) {
    for (var c = 0; c < b.length; c++) {
        if (d(b[c])) {
            return b[c];
        }
    }
    return null;
}

function deleteMatches(b, d) {
    for (var c = 0; c < b.length; c++) {
        d(b[c]) && (b.splice(c, 1), c--);
    }
    return b;
}

function findMatchIndex(b, d) {
    for (var c = 0; c < b.length; c++) {
        if (d(b[c])) {
            return c;
        }
    }
    return -1;
}

function arrangeHierarchy(b, d, c) {
    for (var g = [], k = 0; k < b.length; k++) {
        var h = c(b[k]);
        d(b[k]);
        if (h) {
            for (var f = 0; f < b.length; f++) {
                d(b[f]) == h && ("undefined" == typeof b[f].children && (b[f].children = []), b[f].children.push(b[k]), b[k].parent = b[f]);
            }
        } else {
            g.push(b[k]);
        }
    }
    return g;
}

function changeJITImageSize(b, d, c) {
    if (!b) {
        return b;
    }
    var g = b.substring(0, b.lastIndexOf("/")) + "/";
    c || (c = b.substring(b.lastIndexOf(".")));
    return b.match(/\/\d+\.\w+$/) ? g + d + c : b.match(/\/\d+\.\d+\.\w+$/) ? g + (d + "." + d) + c : b;
}

function fixImageUrl(b) {
    if (!b || 0 > b.toUpperCase().indexOf("REPLACE_DOMAIN_WITH")) {
        return b;
    }
    var d = ezdVars.CdnDomain,
        c = ezdVars.SSLCdnDomain;
    b = b.replace("http://REPLACE_DOMAIN_WITH", "http://" + d);
    b = b.replace("https://REPLACE_DOMAIN_WITH", "https://" + (c ? c : d));
    return b = document.location.href.startsWith("file") ? b.replace("REPLACE_DOMAIN_WITH", "http://" + d) : b.replace("REPLACE_DOMAIN_WITH", "//" + d);
}

function getHtmlContent(b, d, c) {
    var g = ezdVars.DesignerLocation;
    g || (g = "..");
    var k = RegExp("{ezdLocation}", "gi"),
        h = RegExp("{kioskLocation}", "gi");
    $.get(d, function(f) {
        f = f.replace(k, ezdVars.DesignerLocation);
        f = f.replace(h, ezdVars.KioskLocation || "");
        b.html(f);
        c && (console.log("载入了编辑器模版： " + d), c());
    });
}

var taskQueue = [];

function setUpTaskQueue() {
    window.taskQueueInterval = setInterval(executeNextTask, 20);
}
function addTaskToQueue(b) {
    taskQueue.push(b);
};

function executeNextTask() {
    if (0 < taskQueue.length) {
        var b = taskQueue.shift();
        b.parameter ? b.functionCall(b.parameter) : b.functionCall();
    }
}

function stopTaskQueue() {
    clearInterval(window.taskQueueInterval);
}
setUpTaskQueue();

function setUpPrefills() {
    var b = $(".prefill");
    b.on("focus", prefillFocus);
    b.on("blur", prefillBlur);
    b.each(function() {
        $(this).val($(this).attr("data-prefill"));
    });
}

function prefillFocus(b) {
    b = $(b.currentTarget);
    var d = b.attr("data-prefill");
    b.val() == d && b.val("");
}

function prefillBlur(b) {
    b = $(b.currentTarget);
    var d = b.attr("data-prefill");
    b.val() && 0 != b.val().length || b.val(d);
}

function searchInArray(b, d, c) {
    if (null == b) {
        return !1;
    }
    for (var g = 0; g < b.length; g++) {
        if (null != c) {
            if (b[g][c] == d) {
                return b[g];
            }
        } else {
            if (b[g] == d) {
                return b[g];
            }
        }
    }
    return !1;
}

function deleteInArray(arr, val){
    if(null == arr) {
        return false;
    }
    var idx = null;
    for(var i=0; i<arr.length; i++) {
        if(arr[i] == val){
            idx = i;
            break;
        }
    }
    if(null != idx) {
        arr.splice(idx, 1);
    }
}

function searchString(b, d, c) {
    if (null == b) {
        return !1;
    }
    for (var g = 0; g < b.length; g++) {
        if (null != c) {
            if (b[g][c] && b[g][c].toLowerCase() == d.toLowerCase()) {
                return b[g];
            }
        } else {
            if (b[g] && b[g].toLowerCase() == d.toLowerCase()) {
                return b[g];
            }
        }
    }
    return !1;
}

function getElementsInArray(b, d, c) {
    if (null == b) {
        return !1;
    }
    for (var g = [], k = 0; k < b.length; k++) {
        null != c ? b[k][c] && b[k][c].toLowerCase() == d.toLowerCase() && g.push(b[k]) : b[k] == d && g.push(b[k]);
    }
    return g;
}
String.prototype.hashCode = function() {
    var b = 0,
        d, c;
    if (0 == this.length) {
        return b;
    }
    d = 0;
    for (l = this.length; d < l; d++) {
        c = this.charCodeAt(d), b = (b << 5) - b + c, b |= 0;
    }
    return b;
};
String.prototype.toBool = function() {
    return "0" == this || "false" == this.toLowerCase() || 0 == this.length ? !1 : !0;
};
String.prototype.endsWith = function(b) {
    return -1 !== this.indexOf(b, this.length - b.length);
};
String.prototype.startsWith = function(b) {
    return 0 == this.indexOf(b);
};
Array.prototype.clone = function() {
    return this.slice(0);
};
Object.size = function(b) {
    var d = 0,
        c;
    for (c in b) {
        b.hasOwnProperty(c) && d++;
    }
    return d;
};

function deserializeXmlToArray(b, d) {
    values = [];
    b.find(d).each(function() {
        var b = {};
        $.each(this.attributes, function(d, k) {
            b[k.name] = k.value;
        });
        values.push(b);
    });
    return values;
}
var tasks = [],
    startTime = Date();

function addTask(b) {
    var d = {
        name: b
    };
    d.startTime = new Date;
    d.id = Math.floor(1E4 * Math.random());
    d.backgroundColor = "#" + ("000000" + (16777215 * Math.random() << 0).toString(16)).slice(-6);
    $("#tasksContainer").append('<div class="taskStart" id="task' + d.id + '" style="background-color: ' + d.backgroundColor + '">' + b + "</div>");
    tasks.push(d);
    return d.id;
}

function taskComplete(b, d) {
    var c = findMatch(tasks, function(c) {
            return c.id == b;
        }),
        g = new Date - c.startTime,
        k = Math.round(g / 10) / 100 + "s",
        h = $("#task" + c.id);
    d || (d = 0);
    g > d && ($("#tasksContainer").append('<div class="taskStart" id="task' + c.id + '" style="background-color: ' + c.backgroundColor + '">' + c.name + " completed in " + k + "</div>"), h.text(c.name + " completed in " + k), h.removeClass("taskStart"), h.addClass("taskComplete"));
}
var numOverlays = 0;

function ajaxShowOverlay() {
    var b = ezdVars.DesignerLocation;
    b || (b = "..");
    numOverlays++;
    var d = $("#ajaxOverlay"),
        c = Math.max($(document).height(), $(window).height());
    d.css("height", c + "px");
    0 == $("#overlaySpinner").length && d.append("<img id='overlaySpinner' src='" + (b + "/common/js/fb/fancybox_loading.gif") + "' style='position:relative;top:45%;left:" + ((window.innerWidth ? window.innerWidth : document.body.clientWidth) / 2 + "px") + "' />");
    d.fadeIn("fast");
}

function ajaxHideOverlay() {
    numOverlays--;
    0 === numOverlays && $("#ajaxOverlay").fadeOut("fast");
}

function isImageLoaded(b) {
    return !b.complete || "undefined" != typeof b.naturalWidth && 0 == b.naturalWidth ? !1 : !0;
}

function getImageData(b, d, c, g) {
    var k = new Image;
    k.setAttribute("crossOrigin", "anonymous");
    k.src = b;
    k.onload = function() {
        if (c) {
            try {
                if (d) {
                    var g = document.createElement("canvas");
                    if (g.getContext && g.getContext("2d")) {
                        g.width = k.width;
                        g.height = k.height;
                        g.getContext("2d").drawImage(k, 0, 0);
                        var f = g.toDataURL("image/png");
                    }
                }
            } catch (m) {}
            g = {
                width: k.naturalWidth,
                height: k.naturalHeight,
                url: b
            };
            f && (g.dataUrl = f);
            c(g);
        }
    };
    k.onerror = g;
}

function areImagesLoaded(b) {
    if (!b || 0 == b.length) {
        return !0;
    }
    for (var d = 0; d < b.length; d++) {
        if (!isImageLoaded(b[d])) {
            return !1;
        }
    }
    return !0;
}

function OnPreviewPicLoad(b, d, c) {
    b = $(b.currentTarget);
    var g = b.width() || b[0].width,
        k = b.height() || b[0].height;
    d = d || b.parent().width();
    c = c || b.parent().height();
    c = ScaleImage(g, k, d, c, !0);
    c.width && b.width(c.width);
    c.height && b.height(c.height);
    b.css("left", c.targetleft);
    b.css("top", c.targettop);
}


function ScaleImage(b, d, c, g, k) {
    var h = {
        width: 0,
        height: 0,
        fScaleToTargetWidth: !0
    };
    if (0 >= b || 0 >= d || 0 >= c || 0 >= g) {
        return h;
    }
    var f = b * g / d;
    (k = f > c ? k : !k) ? (h.width = Math.floor(c), h.height = Math.floor(d * c / b), h.fScaleToTargetWidth = !0) : (h.width = Math.floor(f), h.height = Math.floor(g), h.fScaleToTargetWidth = !1);
    h.targetleft = Math.floor((c - h.width) / 2);
    h.targettop = Math.floor((g - h.height) / 2);
    return h;
}

function ScaleImageFloat(b, d, c, g, k) {
    var h = {
        width: 0,
        height: 0,
        fScaleToTargetWidth: !0
    };
    if (0 >= b || 0 >= d || 0 >= c || 0 >= g) {
        return h;
    }
    var f = b * g / d;
    (k = f > c ? k : !k) ? (h.width = c, h.height = d * c / b, h.fScaleToTargetWidth = !0) : (h.width = f, h.height = g, h.fScaleToTargetWidth = !1);
    h.targetleft = (c - h.width) / 2;
    h.targettop = (g - h.height) / 2;
    return h;
}

function componentToHex(b) {
    b = b.toString(16).trim();
    return 1 == b.length ? "0" + b : b;
}

function rgbToHex(b, d, c) {
    return "#" + componentToHex(b) + componentToHex(d) + componentToHex(c);
}

function floodFillScanline(b, d, c, g, k, h, f, m, q, n) {
    var r = [
        [b, b, d, null, !0, !0]
    ];
    h(b, d, c, g, f, q);
    for (var t, p, e, u; r.length;) {
        t = r.pop();
        b = !0 === t[3];
        p = !1 === t[3];
        e = t[0];
        d = t[2];
        if (t[4]) {
            for (; 0 < e && k(e - 1, d, c, g, f, m, q, n);) {
                e--, h(e, d, c, g, f, q);
            }
        }
        u = t[1];
        if (t[5]) {
            for (; u < c - 1 && k(u + 1, d, c, g, f, m, q, n);) {
                u++, h(u, d, c, g, f, q);
            }
        }
        t[0]--;
        t[1]++;
        var s = function(b, d, p) {
            for (var s = e, y = !1, D, V = e; V <= u; V++) {
                D = (d || V < t[0] || V > t[1]) && k(V, b, c, g, f, m, q, n), !y && D ? (s = V, y = !0) : y && !D && (r.push([s, V - 1, b, p, s == e, !1]), y = !1), y && h(V, b, c, g, f, q), d || V != t[0] || (V = t[1]);
            }
            y && r.push([s, V - 1, b, p, s == e, !0]);
        };
        d < g && s(d + 1, !p, !0);
        0 < d && s(d - 1, !b, !1);
    }
};

function clone(b) {
    if (null == b || "object" != typeof b) {
        return b;
    }
    var d = b.constructor(),
        c;
    for (c in b) {
        b.hasOwnProperty(c) && (d[c] = b[c]);
    }
    return d;
};

function isSideDefined(b, d) {
    for (var c = 0; c < d.length; c++) {
        if (d[c].name === b) {
            return !0;
        }
    }
    return !1;
};

function desaturatePicture(b) {
    var d = document.createElement("canvas");
    d.id = "desaturared";
    ctx = d.getContext("2d");
    ctx.drawImage(b, 2, 2);
    d.width = b.naturalWidth;
    d.height = b.naturalHeight;
    ctx.drawImage(b, 0, 0);
    b = ctx.getImageData(0, 0, d.width, d.height);
    for (var c = b.data, g = 0, k = c.length; g < k; g += 4) {
        var h = 0.3 * c[g] + 0.59 * c[g + 1] + 0.11 * c[g + 2];
        c[g] = h;
        c[g + 1] = h;
        c[g + 2] = h;
    }
    ctx.putImageData(b, 0, 0);
    return d.toDataURL();
}

function swap(items, firstIndex, secondIndex){
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

function partition(items, left, right) {
    var pivot   = items[Math.floor((right + left) / 2)],
        i       = left,
        j       = right;
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right);
        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }
        if (index < right) {
            quickSort(items, index, right);
        }

    }
    return items;
}

function getUrlHashParameterStr(){
    var url = window.location.href;
    if(url.indexOf('#')>0){
        var str = url.substr(url.indexOf('#'), url.length-1);
        return str;
    }
}

function PCA(){
    var PCAD = "北京市$市辖区,东城区,西城区,崇文区,宣武区,朝阳区,丰台区,石景山区,海淀区,门头沟区,房山区,通州区,顺义区,昌平区,大兴区,怀柔区,平谷区|市辖县,密云县,延庆县#天津市$市辖区,和平区,河东区,河西区,南开区,河北区,红桥区,塘沽区,汉沽区,大港区,东丽区,西青区,津南区,北辰区,武清区,宝坻区|市辖县,宁河县,静海县,蓟县#河北省$石家庄市,市辖区,长安区,桥东区,桥西区,新华区,井陉矿区,裕华区,井陉县,正定县,栾城县,行唐县,灵寿县,高邑县,深泽县,赞皇县,无极县,平山县,元氏县,赵县,辛集市,藁城市,晋州市,新乐市,鹿泉市|唐山市,市辖区,路南区,路北区,古冶区,开平区,丰南区,丰润区,滦县,滦南县,乐亭县,迁西县,玉田县,唐海县,遵化市,迁安市|秦皇岛市,市辖区,海港区,山海关区,北戴河区,青龙满族自治县,昌黎县,抚宁县,卢龙县|邯郸市,市辖区,邯山区,丛台区,复兴区,峰峰矿区,邯郸县,临漳县,成安县,大名县,涉县,磁县,肥乡县,永年县,邱县,鸡泽县,广平县,馆陶县,魏县,曲周县,武安市|邢台市,市辖区,桥东区,桥西区,邢台县,临城县,内丘县,柏乡县,隆尧县,任县,南和县,宁晋县,巨鹿县,新河县,广宗县,平乡县,威县,清河县,临西县,南宫市,沙河市|保定市,市辖区,新市区,北市区,南市区,满城县,清苑县,涞水县,阜平县,徐水县,定兴县,唐县,高阳县,容城县,涞源县,望都县,安新县,易县,曲阳县,蠡县,顺平县,博野县,雄县,涿州市,定州市,安国市,高碑店市|张家口市,市辖区,桥东区,桥西区,宣化区,下花园区,宣化县,张北县,康保县,沽源县,尚义县,蔚县,阳原县,怀安县,万全县,怀来县,涿鹿县,赤城县,崇礼县|承德市,市辖区,双桥区,双滦区,鹰手营子矿区,承德县,兴隆县,平泉县,滦平县,隆化县,丰宁满族自治县,宽城满族自治县,围场满族蒙古族自治县|沧州市,市辖区,新华区,运河区,沧县,青县,东光县,海兴县,盐山县,肃宁县,南皮县,吴桥县,献县,孟村回族自治县,泊头市,任丘市,黄骅市,河间市|廊坊市,市辖区,安次区,广阳区,固安县,永清县,香河县,大城县,文安县,大厂回族自治县,霸州市,三河市|衡水市,市辖区,桃城区,枣强县,武邑县,武强县,饶阳县,安平县,故城县,景县,阜城县,冀州市,深州市#山西省$太原市,市辖区,小店区,迎泽区,杏花岭区,尖草坪区,万柏林区,晋源区,清徐县,阳曲县,娄烦县,古交市|大同市,市辖区,城区,矿区,南郊区,新荣区,阳高县,天镇县,广灵县,灵丘县,浑源县,左云县,大同县|阳泉市,市辖区,城区,矿区,郊区,平定县,盂县|长治市,市辖区,城区,郊区,长治县,襄垣县,屯留县,平顺县,黎城县,壶关县,长子县,武乡县,沁县,沁源县,潞城市|晋城市,市辖区,城区,沁水县,阳城县,陵川县,泽州县,高平市|朔州市,市辖区,朔城区,平鲁区,山阴县,应县,右玉县,怀仁县|晋中市,市辖区,榆次区,榆社县,左权县,和顺县,昔阳县,寿阳县,太谷县,祁县,平遥县,灵石县,介休市|运城市,市辖区,盐湖区,临猗县,万荣县,闻喜县,稷山县,新绛县,绛县,垣曲县,夏县,平陆县,芮城县,永济市,河津市|忻州市,市辖区,忻府区,定襄县,五台县,代县,繁峙县,宁武县,静乐县,神池县,五寨县,岢岚县,河曲县,保德县,偏关县,原平市|临汾市,市辖区,尧都区,曲沃县,翼城县,襄汾县,洪洞县,古县,安泽县,浮山县,吉县,乡宁县,大宁县,隰县,永和县,蒲县,汾西县,侯马市,霍州市|吕梁市,市辖区,离石区,文水县,交城县,兴县,临县,柳林县,石楼县,岚县,方山县,中阳县,交口县,孝义市,汾阳市#内蒙古自治区$呼和浩特市,市辖区,新城区,回民区,玉泉区,赛罕区,土默特左旗,托克托县,和林格尔县,清水河县,武川县|包头市,市辖区,东河区,昆都仑区,青山区,石拐区,白云矿区,九原区,土默特右旗,固阳县,达尔罕茂明安联合旗|乌海市,市辖区,海勃湾区,海南区,乌达区|赤峰市,市辖区,红山区,元宝山区,松山区,阿鲁科尔沁旗,巴林左旗,巴林右旗,林西县,克什克腾旗,翁牛特旗,喀喇沁旗,宁城县,敖汉旗|通辽市,市辖区,科尔沁区,科尔沁左翼中旗,科尔沁左翼后旗,开鲁县,库伦旗,奈曼旗,扎鲁特旗,霍林郭勒市|鄂尔多斯市,东胜区,达拉特旗,准格尔旗,鄂托克前旗,鄂托克旗,杭锦旗,乌审旗,伊金霍洛旗|呼伦贝尔市,市辖区,海拉尔区,阿荣旗,莫力达瓦达斡尔族自治旗,鄂伦春自治旗,鄂温克族自治旗,陈巴尔虎旗,新巴尔虎左旗,新巴尔虎右旗,满洲里市,牙克石市,扎兰屯市,额尔古纳市,根河市|巴彦淖尔市,市辖区,临河区,五原县,磴口县,乌拉特前旗,乌拉特中旗,乌拉特后旗,杭锦后旗|乌兰察布市,市辖区,集宁区,卓资县,化德县,商都县,兴和县,凉城县,察哈尔右翼前旗,察哈尔右翼中旗,察哈尔右翼后旗,四子王旗,丰镇市|兴安盟,乌兰浩特市,阿尔山市,科尔沁右翼前旗,科尔沁右翼中旗,扎赉特旗,突泉县|锡林郭勒盟,二连浩特市,锡林浩特市,阿巴嘎旗,苏尼特左旗,苏尼特右旗,东乌珠穆沁旗,西乌珠穆沁旗,太仆寺旗,镶黄旗,正镶白旗,正蓝旗,多伦县|阿拉善盟,阿拉善左旗,阿拉善右旗,额济纳旗#辽宁省$沈阳市,市辖区,和平区,沈河区,大东区,皇姑区,铁西区,苏家屯区,东陵区,新城子区,于洪区,辽中县,康平县,法库县,新民市|大连市,市辖区,中山区,西岗区,沙河口区,甘井子区,旅顺口区,金州区,长海县,瓦房店市,普兰店市,庄河市|鞍山市,市辖区,铁东区,铁西区,立山区,千山区,台安县,岫岩满族自治县,海城市|抚顺市,市辖区,新抚区,东洲区,望花区,顺城区,抚顺县,新宾满族自治县,清原满族自治县|本溪市,市辖区,平山区,溪湖区,明山区,南芬区,本溪满族自治县,桓仁满族自治县|丹东市,市辖区,元宝区,振兴区,振安区,宽甸满族自治县,东港市,凤城市|锦州市,市辖区,古塔区,凌河区,太和区,黑山县,义县,凌海市,北宁市|营口市,市辖区,站前区,西市区,鲅鱼圈区,老边区,盖州市,大石桥市|阜新市,市辖区,海州区,新邱区,太平区,清河门区,细河区,阜新蒙古族自治县,彰武县|辽阳市,市辖区,白塔区,文圣区,宏伟区,弓长岭区,太子河区,辽阳县,灯塔市|盘锦市,市辖区,双台子区,兴隆台区,大洼县,盘山县|铁岭市,市辖区,银州区,清河区,铁岭县,西丰县,昌图县,调兵山市,开原市|朝阳市,市辖区,双塔区,龙城区,朝阳县,建平县,喀喇沁左翼蒙古族自治县,北票市,凌源市|葫芦岛市,市辖区,连山区,龙港区,南票区,绥中县,建昌县,兴城市#吉林省$长春市,市辖区,南关区,宽城区,朝阳区,二道区,绿园区,双阳区,农安县,九台市,榆树市,德惠市|吉林市,市辖区,昌邑区,龙潭区,船营区,丰满区,永吉县,蛟河市,桦甸市,舒兰市,磐石市|四平市,市辖区,铁西区,铁东区,梨树县,伊通满族自治县,公主岭市,双辽市|辽源市,市辖区,龙山区,西安区,东丰县,东辽县|通化市,市辖区,东昌区,二道江区,通化县,辉南县,柳河县,梅河口市,集安市|白山市,市辖区,八道江区,抚松县,靖宇县,长白朝鲜族自治县,江源县,临江市|松原市,市辖区,宁江区,前郭尔罗斯蒙古族自治县,长岭县,乾安县,扶余县|白城市,市辖区,洮北区,镇赉县,通榆县,洮南市,大安市|延边朝鲜族自治州,延吉市,图们市,敦化市,珲春市,龙井市,和龙市,汪清县,安图县#黑龙江省$哈尔滨市,市辖区,道里区,南岗区,道外区,香坊区,动力区,平房区,松北区,呼兰区,依兰县,方正县,宾县,巴彦县,木兰县,通河县,延寿县,阿城市,双城市,尚志市,五常市|齐齐哈尔市,市辖区,龙沙区,建华区,铁锋区,昂昂溪区,富拉尔基区,碾子山区,梅里斯达斡尔族区,龙江县,依安县,泰来县,甘南县,富裕县,克山县,克东县,拜泉县,讷河市|鸡西市,市辖区,鸡冠区,恒山区,滴道区,梨树区,城子河区,麻山区,鸡东县,虎林市,密山市|鹤岗市,市辖区,向阳区,工农区,南山区,兴安区,东山区,兴山区,萝北县,绥滨县|双鸭山市,市辖区,尖山区,岭东区,四方台区,宝山区,集贤县,友谊县,宝清县,饶河县|大庆市,市辖区,萨尔图区,龙凤区,让胡路区,红岗区,大同区,肇州县,肇源县,林甸县,杜尔伯特蒙古族自治县|伊春市,市辖区,伊春区,南岔区,友好区,西林区,翠峦区,新青区,美溪区,金山屯区,五营区,乌马河区,汤旺河区,带岭区,乌伊岭区,红星区,上甘岭区,嘉荫县,铁力市|佳木斯市,市辖区,永红区,向阳区,前进区,东风区,郊区,桦南县,桦川县,汤原县,抚远县,同江市,富锦市|七台河市,市辖区,新兴区,桃山区,茄子河区,勃利县|牡丹江市,市辖区,东安区,阳明区,爱民区,西安区,东宁县,林口县,绥芬河市,海林市,宁安市,穆棱市|黑河市,市辖区,爱辉区,嫩江县,逊克县,孙吴县,北安市,五大连池市|绥化市,市辖区,北林区,望奎县,兰西县,青冈县,庆安县,明水县,绥棱县,安达市,肇东市,海伦市|大兴安岭地区,呼玛县,塔河县,漠河县#上海市$市辖区,黄浦区,卢湾区,徐汇区,长宁区,静安区,普陀区,闸北区,虹口区,杨浦区,闵行区,宝山区,嘉定区,浦东新区,金山区,松江区,青浦区,南汇区,奉贤区|市辖县,崇明县#江苏省$南京市,市辖区,玄武区,白下区,秦淮区,建邺区,鼓楼区,下关区,浦口区,栖霞区,雨花台区,江宁区,六合区,溧水县,高淳县|无锡市,市辖区,崇安区,南长区,北塘区,锡山区,惠山区,滨湖区,江阴市,宜兴市|徐州市,市辖区,鼓楼区,云龙区,九里区,贾汪区,泉山区,丰县,沛县,铜山县,睢宁县,新沂市,邳州市|常州市,市辖区,天宁区,钟楼区,戚墅堰区,新北区,武进区,溧阳市,金坛市|苏州市,市辖区,沧浪区,平江区,金阊区,虎丘区,吴中区,相城区,常熟市,张家港市,昆山市,吴江市,太仓市|南通市,市辖区,崇川区,港闸区,海安县,如东县,启东市,如皋市,通州市,海门市|连云港市,市辖区,连云区,新浦区,海州区,赣榆县,东海县,灌云县,灌南县|淮安市,市辖区,清河区,楚州区,淮阴区,清浦区,涟水县,洪泽县,盱眙县,金湖县|盐城市,市辖区,亭湖区,盐都区,响水县,滨海县,阜宁县,射阳县,建湖县,东台市,大丰市|扬州市,市辖区,广陵区,邗江区,维扬区,宝应县,仪征市,高邮市,江都市|镇江市,市辖区,京口区,润州区,丹徒区,丹阳市,扬中市,句容市|泰州市,市辖区,海陵区,高港区,兴化市,靖江市,泰兴市,姜堰市|宿迁市,市辖区,宿城区,宿豫区,沭阳县,泗阳县,泗洪县#浙江省$杭州市,市辖区,上城区,下城区,江干区,拱墅区,西湖区,滨江区,萧山区,余杭区,桐庐县,淳安县,建德市,富阳市,临安市|宁波市,市辖区,海曙区,江东区,江北区,北仑区,镇海区,鄞州区,象山县,宁海县,余姚市,慈溪市,奉化市|温州市,市辖区,鹿城区,龙湾区,瓯海区,洞头县,永嘉县,平阳县,苍南县,文成县,泰顺县,瑞安市,乐清市|嘉兴市,市辖区,秀城区,秀洲区,嘉善县,海盐县,海宁市,平湖市,桐乡市|湖州市,市辖区,吴兴区,南浔区,德清县,长兴县,安吉县|绍兴市,市辖区,越城区,绍兴县,新昌县,诸暨市,上虞市,嵊州市|金华市,市辖区,婺城区,金东区,武义县,浦江县,磐安县,兰溪市,义乌市,东阳市,永康市|衢州市,市辖区,柯城区,衢江区,常山县,开化县,龙游县,江山市|舟山市,市辖区,定海区,普陀区,岱山县,嵊泗县|台州市,市辖区,椒江区,黄岩区,路桥区,玉环县,三门县,天台县,仙居县,温岭市,临海市|丽水市,市辖区,莲都区,青田县,缙云县,遂昌县,松阳县,云和县,庆元县,景宁畲族自治县,龙泉市#安徽省$合肥市,市辖区,瑶海区,庐阳区,蜀山区,包河区,长丰县,肥东县,肥西县|芜湖市,市辖区,镜湖区,弋江区,鸠江区,三山区,芜湖县,繁昌县,南陵县|蚌埠市,市辖区,龙子湖区,蚌山区,禹会区,淮上区,怀远县,五河县,固镇县|淮南市,市辖区,大通区,田家庵区,谢家集区,八公山区,潘集区,凤台县|马鞍山市,市辖区,金家庄区,花山区,雨山区,当涂县|淮北市,市辖区,杜集区,相山区,烈山区,濉溪县|铜陵市,市辖区,铜官山区,狮子山区,郊区,铜陵县|安庆市,市辖区,迎江区,大观区,宜秀区,怀宁县,枞阳县,潜山县,太湖县,宿松县,望江县,岳西县,桐城市|黄山市,市辖区,屯溪区,黄山区,徽州区,歙县,休宁县,黟县,祁门县|滁州市,市辖区,琅琊区,南谯区,来安县,全椒县,定远县,凤阳县,天长市,明光市|阜阳市,市辖区,颍州区,颍东区,颍泉区,临泉县,太和县,阜南县,颍上县,界首市|宿州市,市辖区,埇桥区,砀山县,萧县,灵璧县,泗县|巢湖市,市辖区,居巢区,庐江县,无为县,含山县,和县|六安市,市辖区,金安区,裕安区,寿县,霍邱县,舒城县,金寨县,霍山县|亳州市,市辖区,谯城区,涡阳县,蒙城县,利辛县|池州市,市辖区,贵池区,东至县,石台县,青阳县|宣城市,市辖区,宣州区,郎溪县,广德县,泾县,绩溪县,旌德县,宁国市#福建省$福州市,市辖区,鼓楼区,台江区,仓山区,马尾区,晋安区,闽侯县,连江县,罗源县,闽清县,永泰县,平潭县,福清市,长乐市|厦门市,市辖区,思明区,海沧区,湖里区,集美区,同安区,翔安区|莆田市,市辖区,城厢区,涵江区,荔城区,秀屿区,仙游县|三明市,市辖区,梅列区,三元区,明溪县,清流县,宁化县,大田县,尤溪县,沙县,将乐县,泰宁县,建宁县,永安市|泉州市,市辖区,鲤城区,丰泽区,洛江区,泉港区,惠安县,安溪县,永春县,德化县,金门县,石狮市,晋江市,南安市|漳州市,市辖区,芗城区,龙文区,云霄县,漳浦县,诏安县,长泰县,东山县,南靖县,平和县,华安县,龙海市|南平市,市辖区,延平区,顺昌县,浦城县,光泽县,松溪县,政和县,邵武市,武夷山市,建瓯市,建阳市|龙岩市,市辖区,新罗区,长汀县,永定县,上杭县,武平县,连城县,漳平市|宁德市,市辖区,蕉城区,霞浦县,古田县,屏南县,寿宁县,周宁县,柘荣县,福安市,福鼎市#江西省$南昌市,市辖区,东湖区,西湖区,青云谱区,湾里区,青山湖区,南昌县,新建县,安义县,进贤县|景德镇市,市辖区,昌江区,珠山区,浮梁县,乐平市|萍乡市,市辖区,安源区,湘东区,莲花县,上栗县,芦溪县|九江市,市辖区,庐山区,浔阳区,九江县,武宁县,修水县,永修县,德安县,星子县,都昌县,湖口县,彭泽县,瑞昌市|新余市,市辖区,渝水区,分宜县|鹰潭市,市辖区,月湖区,余江县,贵溪市|赣州市,市辖区,章贡区,赣县,信丰县,大余县,上犹县,崇义县,安远县,龙南县,定南县,全南县,宁都县,于都县,兴国县,会昌县,寻乌县,石城县,瑞金市,南康市|吉安市,市辖区,吉州区,青原区,吉安县,吉水县,峡江县,新干县,永丰县,泰和县,遂川县,万安县,安福县,永新县,井冈山市|宜春市,市辖区,袁州区,奉新县,万载县,上高县,宜丰县,靖安县,铜鼓县,丰城市,樟树市,高安市|抚州市,市辖区,临川区,南城县,黎川县,南丰县,崇仁县,乐安县,宜黄县,金溪县,资溪县,东乡县,广昌县|上饶市,市辖区,信州区,上饶县,广丰县,玉山县,铅山县,横峰县,弋阳县,余干县,鄱阳县,万年县,婺源县,德兴市#山东省$济南市,市辖区,历下区,市中区,槐荫区,天桥区,历城区,长清区,平阴县,济阳县,商河县,章丘市|青岛市,市辖区,市南区,市北区,四方区,黄岛区,崂山区,李沧区,城阳区,胶州市,即墨市,平度市,胶南市,莱西市|淄博市,市辖区,淄川区,张店区,博山区,临淄区,周村区,桓台县,高青县,沂源县|枣庄市,市辖区,市中区,薛城区,峄城区,台儿庄区,山亭区,滕州市|东营市,市辖区,东营区,河口区,垦利县,利津县,广饶县|烟台市,市辖区,芝罘区,福山区,牟平区,莱山区,长岛县,龙口市,莱阳市,莱州市,蓬莱市,招远市,栖霞市,海阳市|潍坊市,市辖区,潍城区,寒亭区,坊子区,奎文区,临朐县,昌乐县,青州市,诸城市,寿光市,安丘市,高密市,昌邑市|济宁市,市辖区,市中区,任城区,微山县,鱼台县,金乡县,嘉祥县,汶上县,泗水县,梁山县,曲阜市,兖州市,邹城市|泰安市,市辖区,泰山区,岱岳区,宁阳县,东平县,新泰市,肥城市|威海市,市辖区,环翠区,文登市,荣成市,乳山市|日照市,市辖区,东港区,岚山区,五莲县,莒县|莱芜市,市辖区,莱城区,钢城区|临沂市,市辖区,兰山区,罗庄区,河东区,沂南县,郯城县,沂水县,苍山县,费县,平邑县,莒南县,蒙阴县,临沭县|德州市,市辖区,德城区,陵县,宁津县,庆云县,临邑县,齐河县,平原县,夏津县,武城县,乐陵市,禹城市|聊城市,市辖区,东昌府区,阳谷县,莘县,茌平县,东阿县,冠县,高唐县,临清市|滨州市,市辖区,滨城区,惠民县,阳信县,无棣县,沾化县,博兴县,邹平县|菏泽市,市辖区,牡丹区,曹县,单县,成武县,巨野县,郓城县,鄄城县,定陶县,东明县#河南省$郑州市,市辖区,中原区,二七区,管城回族区,金水区,上街区,惠济区,中牟县,巩义市,荥阳市,新密市,新郑市,登封市|开封市,市辖区,龙亭区,顺河回族区,鼓楼区,禹王台区,金明区,杞县,通许县,尉氏县,开封县,兰考县|洛阳市,市辖区,老城区,西工区,廛河回族区,涧西区,吉利区,洛龙区,孟津县,新安县,栾川县,嵩县,汝阳县,宜阳县,洛宁县,伊川县,偃师市|平顶山市,市辖区,新华区,卫东区,石龙区,湛河区,宝丰县,叶县,鲁山县,郏县,舞钢市,汝州市|安阳市,市辖区,文峰区,北关区,殷都区,龙安区,安阳县,汤阴县,滑县,内黄县,林州市|鹤壁市,市辖区,鹤山区,山城区,淇滨区,浚县,淇县|新乡市,市辖区,红旗区,卫滨区,凤泉区,牧野区,新乡县,获嘉县,原阳县,延津县,封丘县,长垣县,卫辉市,辉县市|焦作市,市辖区,解放区,中站区,马村区,山阳区,修武县,博爱县,武陟县,温县,济源市,沁阳市,孟州市|濮阳市,市辖区,华龙区,清丰县,南乐县,范县,台前县,濮阳县|许昌市,市辖区,魏都区,许昌县,鄢陵县,襄城县,禹州市,长葛市|漯河市,市辖区,源汇区,郾城区,召陵区,舞阳县,临颍县|三门峡市,市辖区,湖滨区,渑池县,陕县,卢氏县,义马市,灵宝市|南阳市,市辖区,宛城区,卧龙区,南召县,方城县,西峡县,镇平县,内乡县,淅川县,社旗县,唐河县,新野县,桐柏县,邓州市|商丘市,市辖区,梁园区,睢阳区,民权县,睢县,宁陵县,柘城县,虞城县,夏邑县,永城市|信阳市,市辖区,浉河区,平桥区,罗山县,光山县,新县,商城县,固始县,潢川县,淮滨县,息县|周口市,市辖区,川汇区,扶沟县,西华县,商水县,沈丘县,郸城县,淮阳县,太康县,鹿邑县,项城市|驻马店市,市辖区,驿城区,西平县,上蔡县,平舆县,正阳县,确山县,泌阳县,汝南县,遂平县,新蔡县#湖北省$武汉市,市辖区,江岸区,江汉区,硚口区,汉阳区,武昌区,青山区,洪山区,东西湖区,汉南区,蔡甸区,江夏区,黄陂区,新洲区|黄石市,市辖区,黄石港区,西塞山区,下陆区,铁山区,阳新县,大冶市|十堰市,市辖区,茅箭区,张湾区,郧县,郧西县,竹山县,竹溪县,房县,丹江口市|宜昌市,市辖区,西陵区,伍家岗区,点军区,猇亭区,夷陵区,远安县,兴山县,秭归县,长阳土家族自治县,五峰土家族自治县,宜都市,当阳市,枝江市|襄樊市,市辖区,襄城区,樊城区,襄阳区,南漳县,谷城县,保康县,老河口市,枣阳市,宜城市|鄂州市,市辖区,梁子湖区,华容区,鄂城区|荆门市,市辖区,东宝区,掇刀区,京山县,沙洋县,钟祥市|孝感市,市辖区,孝南区,孝昌县,大悟县,云梦县,应城市,安陆市,汉川市|荆州市,市辖区,沙市区,荆州区,公安县,监利县,江陵县,石首市,洪湖市,松滋市|黄冈市,市辖区,黄州区,团风县,红安县,罗田县,英山县,浠水县,蕲春县,黄梅县,麻城市,武穴市|咸宁市,市辖区,咸安区,嘉鱼县,通城县,崇阳县,通山县,赤壁市|随州市,市辖区,曾都区,广水市|恩施土家族苗族自治州,恩施市,利川市,建始县,巴东县,宣恩县,咸丰县,来凤县,鹤峰县|省直辖行政单位,仙桃市,潜江市,天门市,神农架林区#湖南省$长沙市,市辖区,芙蓉区,天心区,岳麓区,开福区,雨花区,长沙县,望城县,宁乡县,浏阳市|株洲市,市辖区,荷塘区,芦淞区,石峰区,天元区,株洲县,攸县,茶陵县,炎陵县,醴陵市|湘潭市,市辖区,雨湖区,岳塘区,湘潭县,湘乡市,韶山市|衡阳市,市辖区,珠晖区,雁峰区,石鼓区,蒸湘区,南岳区,衡阳县,衡南县,衡山县,衡东县,祁东县,耒阳市,常宁市|邵阳市,市辖区,双清区,大祥区,北塔区,邵东县,新邵县,邵阳县,隆回县,洞口县,绥宁县,新宁县,城步苗族自治县,武冈市|岳阳市,市辖区,岳阳楼区,云溪区,君山区,岳阳县,华容县,湘阴县,平江县,汨罗市,临湘市|常德市,市辖区,武陵区,鼎城区,安乡县,汉寿县,澧县,临澧县,桃源县,石门县,津市市|张家界市,市辖区,永定区,武陵源区,慈利县,桑植县|益阳市,市辖区,资阳区,赫山区,南县,桃江县,安化县,沅江市|郴州市,市辖区,北湖区,苏仙区,桂阳县,宜章县,永兴县,嘉禾县,临武县,汝城县,桂东县,安仁县,资兴市|永州市,市辖区,零陵区,冷水滩区,祁阳县,东安县,双牌县,道县,江永县,宁远县,蓝山县,新田县,江华瑶族自治县|怀化市,市辖区,鹤城区,中方县,沅陵县,辰溪县,溆浦县,会同县,麻阳苗族自治县,新晃侗族自治县,芷江侗族自治县,靖州苗族侗族自治县,通道侗族自治县,洪江市|娄底市,市辖区,娄星区,双峰县,新化县,冷水江市,涟源市|湘西土家族苗族自治州,吉首市,泸溪县,凤凰县,花垣县,保靖县,古丈县,永顺县,龙山县#广东省$广州市,市辖区,荔湾区,越秀区,海珠区,天河区,白云区,黄埔区,番禺区,花都区,南沙区,萝岗区,增城市,从化市|韶关市,市辖区,武江区,浈江区,曲江区,始兴县,仁化县,翁源县,乳源瑶族自治县,新丰县,乐昌市,南雄市|深圳市,市辖区,罗湖区,福田区,南山区,宝安区,龙岗区,盐田区|珠海市,市辖区,香洲区,斗门区,金湾区|汕头市,市辖区,龙湖区,金平区,濠江区,潮阳区,潮南区,澄海区,南澳县|佛山市,市辖区,禅城区,南海区,顺德区,三水区,高明区|江门市,市辖区,蓬江区,江海区,新会区,台山市,开平市,鹤山市,恩平市|湛江市,市辖区,赤坎区,霞山区,坡头区,麻章区,遂溪县,徐闻县,廉江市,雷州市,吴川市|茂名市,市辖区,茂南区,茂港区,电白县,高州市,化州市,信宜市|肇庆市,市辖区,端州区,鼎湖区,广宁县,怀集县,封开县,德庆县,高要市,四会市|惠州市,市辖区,惠城区,惠阳区,博罗县,惠东县,龙门县|梅州市,市辖区,梅江区,梅县,大埔县,丰顺县,五华县,平远县,蕉岭县,兴宁市|汕尾市,市辖区,城区,海丰县,陆河县,陆丰市|河源市,市辖区,源城区,紫金县,龙川县,连平县,和平县,东源县|阳江市,市辖区,江城区,阳西县,阳东县,阳春市|清远市,市辖区,清城区,佛冈县,阳山县,连山壮族瑶族自治县,连南瑶族自治县,清新县,英德市,连州市|东莞市|中山市|潮州市,市辖区,湘桥区,潮安县,饶平县|揭阳市,市辖区,榕城区,揭东县,揭西县,惠来县,普宁市|云浮市,市辖区,云城区,新兴县,郁南县,云安县,罗定市#广西壮族自治区$南宁市,市辖区,兴宁区,青秀区,江南区,西乡塘区,良庆区,邕宁区,武鸣县,隆安县,马山县,上林县,宾阳县,横县|柳州市,市辖区,城中区,鱼峰区,柳南区,柳北区,柳江县,柳城县,鹿寨县,融安县,融水苗族自治县,三江侗族自治县|桂林市,市辖区,秀峰区,叠彩区,象山区,七星区,雁山区,阳朔县,临桂县,灵川县,全州县,兴安县,永福县,灌阳县,龙胜各族自治县,资源县,平乐县,荔蒲县,恭城瑶族自治县|梧州市,市辖区,万秀区,蝶山区,长洲区,苍梧县,藤县,蒙山县,岑溪市|北海市,市辖区,海城区,银海区,铁山港区,合浦县|防城港市,市辖区,港口区,防城区,上思县,东兴市|钦州市,市辖区,钦南区,钦北区,灵山县,浦北县|贵港市,市辖区,港北区,港南区,覃塘区,平南县,桂平市|玉林市,市辖区,玉州区,容县,陆川县,博白县,兴业县,北流市|百色市,市辖区,右江区,田阳县,田东县,平果县,德保县,靖西县,那坡县,凌云县,乐业县,田林县,西林县,隆林各族自治县|贺州市,市辖区,八步区,昭平县,钟山县,富川瑶族自治县|河池市,市辖区,金城江区,南丹县,天峨县,凤山县,东兰县,罗城仫佬族自治县,环江毛南族自治县,巴马瑶族自治县,都安瑶族自治县,大化瑶族自治县,宜州市|来宾市,市辖区,兴宾区,忻城县,象州县,武宣县,金秀瑶族自治县,合山市|崇左市,市辖区,江洲区,扶绥县,宁明县,龙州县,大新县,天等县,凭祥市#海南省$海口市,市辖区,秀英区,龙华区,琼山区,美兰区|三亚市,市辖区|省直辖县级行政单位,五指山市,琼海市,儋州市,文昌市,万宁市,东方市,定安县,屯昌县,澄迈县,临高县,白沙黎族自治县,昌江黎族自治县,乐东黎族自治县,陵水黎族自治县,保亭黎族苗族自治县,琼中黎族苗族自治县,西沙群岛,南沙群岛,中沙群岛的岛礁及其海域#重庆市$市辖区,万州区,涪陵区,渝中区,大渡口区,江北区,沙坪坝区,九龙坡区,南岸区,北碚区,万盛区,双桥区,渝北区,巴南区,黔江区,长寿区|市辖县,綦江县,潼南县,铜梁县,大足县,荣昌县,璧山县,梁平县,城口县,丰都县,垫江县,武隆县,忠县,开县,云阳县,奉节县,巫山县,巫溪县,石柱土家族自治县,秀山土家族苗族自治县,酉阳土家族苗族自治县,彭水苗族土家族自治县|县级市,江津市,合川市,永川市,南川市#四川省$成都市,市辖区,锦江区,青羊区,金牛区,武侯区,成华区,龙泉驿区,青白江区,新都区,温江区,金堂县,双流县,郫县,大邑县,蒲江县,新津县,都江堰市,彭州市,邛崃市,崇州市|自贡市,市辖区,自流井区,贡井区,大安区,沿滩区,荣县,富顺县|攀枝花市,市辖区,东区,西区,仁和区,米易县,盐边县|泸州市,市辖区,江阳区,纳溪区,龙马潭区,泸县,合江县,叙永县,古蔺县|德阳市,市辖区,旌阳区,中江县,罗江县,广汉市,什邡市,绵竹市|绵阳市,市辖区,涪城区,游仙区,三台县,盐亭县,安县,梓潼县,北川羌族自治县,平武县,江油市|广元市,市辖区,市中区,元坝区,朝天区,旺苍县,青川县,剑阁县,苍溪县|遂宁市,市辖区,船山区,安居区,蓬溪县,射洪县,大英县|内江市,市辖区,市中区,东兴区,威远县,资中县,隆昌县|乐山市,市辖区,市中区,沙湾区,五通桥区,金口河区,犍为县,井研县,夹江县,沐川县,峨边彝族自治县,马边彝族自治县,峨眉山市|南充市,市辖区,顺庆区,高坪区,嘉陵区,南部县,营山县,蓬安县,仪陇县,西充县,阆中市|眉山市,市辖区,东坡区,仁寿县,彭山县,洪雅县,丹棱县,青神县|宜宾市,市辖区,翠屏区,宜宾县,南溪县,江安县,长宁县,高县,珙县,筠连县,兴文县,屏山县|广安市,市辖区,广安区,岳池县,武胜县,邻水县,华蓥市|达州市,市辖区,通川区,达县,宣汉县,开江县,大竹县,渠县,万源市|雅安市,市辖区,雨城区,名山县,荥经县,汉源县,石棉县,天全县,芦山县,宝兴县|巴中市,市辖区,巴州区,通江县,南江县,平昌县|资阳市,市辖区,雁江区,安岳县,乐至县,简阳市|阿坝藏族羌族自治州,汶川县,理县,茂县,松潘县,九寨沟县,金川县,小金县,黑水县,马尔康县,壤塘县,阿坝县,若尔盖县,红原县|甘孜藏族自治州,康定县,泸定县,丹巴县,九龙县,雅江县,道孚县,炉霍县,甘孜县,新龙县,德格县,白玉县,石渠县,色达县,理塘县,巴塘县,乡城县,稻城县,得荣县|凉山彝族自治州,西昌市,木里藏族自治县,盐源县,德昌县,会理县,会东县,宁南县,普格县,布拖县,金阳县,昭觉县,喜德县,冕宁县,越西县,甘洛县,美姑县,雷波县#贵州省$贵阳市,市辖区,南明区,云岩区,花溪区,乌当区,白云区,小河区,开阳县,息烽县,修文县,清镇市|六盘水市,钟山区,六枝特区,水城县,盘县|遵义市,市辖区,红花岗区,汇川区,遵义县,桐梓县,绥阳县,正安县,道真仡佬族苗族自治县,务川仡佬族苗族自治县,凤冈县,湄潭县,余庆县,习水县,赤水市,仁怀市|安顺市,市辖区,西秀区,平坝县,普定县,镇宁布依族苗族自治县,关岭布依族苗族自治县,紫云苗族布依族自治县|铜仁地区,铜仁市,江口县,玉屏侗族自治县,石阡县,思南县,印江土家族苗族自治县,德江县,沿河土家族自治县,松桃苗族自治县,万山特区|黔西南布依族苗族自治州,兴义市,兴仁县,普安县,晴隆县,贞丰县,望谟县,册亨县,安龙县|毕节地区,毕节市,大方县,黔西县,金沙县,织金县,纳雍县,威宁彝族回族苗族自治县,赫章县|黔东南苗族侗族自治州,凯里市,黄平县,施秉县,三穗县,镇远县,岑巩县,天柱县,锦屏县,剑河县,台江县,黎平县,榕江县,从江县,雷山县,麻江县,丹寨县|黔南布依族苗族自治州,都匀市,福泉市,荔波县,贵定县,瓮安县,独山县,平塘县,罗甸县,长顺县,龙里县,惠水县,三都水族自治县#云南省$昆明市,市辖区,五华区,盘龙区,官渡区,西山区,东川区,呈贡县,晋宁县,富民县,宜良县,石林彝族自治县,嵩明县,禄劝彝族苗族自治县,寻甸回族彝族自治县,安宁市|曲靖市,市辖区,麒麟区,马龙县,陆良县,师宗县,罗平县,富源县,会泽县,沾益县,宣威市|玉溪市,市辖区,红塔区,江川县,澄江县,通海县,华宁县,易门县,峨山彝族自治县,新平彝族傣族自治县,元江哈尼族彝族傣族自治县|保山市,市辖区,隆阳区,施甸县,腾冲县,龙陵县,昌宁县|昭通市,市辖区,昭阳区,鲁甸县,巧家县,盐津县,大关县,永善县,绥江县,镇雄县,彝良县,威信县,水富县|丽江市,市辖区,古城区,玉龙纳西族自治县,永胜县,华坪县,宁蒗彝族自治县|思茅市,市辖区,翠云区,普洱哈尼族彝族自治县,墨江哈尼族自治县,景东彝族自治县,景谷傣族彝族自治县,镇沅彝族哈尼族拉祜族自治县,江城哈尼族彝族自治县,孟连傣族拉祜族佤族自治县,澜沧拉祜族自治县,西盟佤族自治县|临沧市,市辖区,临翔区,凤庆县,云县,永德县,镇康县,双江拉祜族佤族布朗族傣族自治县,耿马傣族佤族自治县,沧源佤族自治县|楚雄彝族自治州,楚雄市,双柏县,牟定县,南华县,姚安县,大姚县,永仁县,元谋县,武定县,禄丰县|红河哈尼族彝族自治州,个旧市,开远市,蒙自县,屏边苗族自治县,建水县,石屏县,弥勒县,泸西县,元阳县,红河县,金平苗族瑶族傣族自治县,绿春县,河口瑶族自治县|文山壮族苗族自治州,文山县,砚山县,西畴县,麻栗坡县,马关县,丘北县,广南县,富宁县|西双版纳傣族自治州,景洪市,勐海县,勐腊县|大理白族自治州,大理市,漾濞彝族自治县,祥云县,宾川县,弥渡县,南涧彝族自治县,巍山彝族回族自治县,永平县,云龙县,洱源县,剑川县,鹤庆县|德宏傣族景颇族自治州,瑞丽市,潞西市,梁河县,盈江县,陇川县|怒江傈僳族自治州,泸水县,福贡县,贡山独龙族怒族自治县,兰坪白族普米族自治县|迪庆藏族自治州,香格里拉县,德钦县,维西傈僳族自治县#西藏自治区$拉萨市,市辖区,城关区,林周县,当雄县,尼木县,曲水县,堆龙德庆县,达孜县,墨竹工卡县|昌都地区,昌都县,江达县,贡觉县,类乌齐县,丁青县,察雅县,八宿县,左贡县,芒康县,洛隆县,边坝县|山南地区,乃东县,扎囊县,贡嘎县,桑日县,琼结县,曲松县,措美县,洛扎县,加查县,隆子县,错那县,浪卡子县|日喀则地区,日喀则市,南木林县,江孜县,定日县,萨迦县,拉孜县,昂仁县,谢通门县,白朗县,仁布县,康马县,定结县,仲巴县,亚东县,吉隆县,聂拉木县,萨嘎县,岗巴县|那曲地区,那曲县,嘉黎县,比如县,聂荣县,安多县,申扎县,索县,班戈县,巴青县,尼玛县|阿里地区,普兰县,札达县,噶尔县,日土县,革吉县,改则县,措勤县|林芝地区,林芝县,工布江达县,米林县,墨脱县,波密县,察隅县,朗县#陕西省$西安市,市辖区,新城区,碑林区,莲湖区,灞桥区,未央区,雁塔区,阎良区,临潼区,长安区,蓝田县,周至县,户县,高陵县|铜川市,市辖区,王益区,印台区,耀州区,宜君县|宝鸡市,市辖区,渭滨区,金台区,陈仓区,凤翔县,岐山县,扶风县,眉县,陇县,千阳县,麟游县,凤县,太白县|咸阳市,市辖区,秦都区,杨凌区,渭城区,三原县,泾阳县,乾县,礼泉县,永寿县,彬县,长武县,旬邑县,淳化县,武功县,兴平市|渭南市,市辖区,临渭区,华县,潼关县,大荔县,合阳县,澄城县,蒲城县,白水县,富平县,韩城市,华阴市|延安市,市辖区,宝塔区,延长县,延川县,子长县,安塞县,志丹县,吴起县,甘泉县,富县,洛川县,宜川县,黄龙县,黄陵县|汉中市,市辖区,汉台区,南郑县,城固县,洋县,西乡县,勉县,宁强县,略阳县,镇巴县,留坝县,佛坪县|榆林市,市辖区,榆阳区,神木县,府谷县,横山县,靖边县,定边县,绥德县,米脂县,佳县,吴堡县,清涧县,子洲县|安康市,市辖区,汉滨区,汉阴县,石泉县,宁陕县,紫阳县,岚皋县,平利县,镇坪县,旬阳县,白河县|商洛市,市辖区,商州区,洛南县,丹凤县,商南县,山阳县,镇安县,柞水县#甘肃省$兰州市,市辖区,城关区,七里河区,西固区,安宁区,红古区,永登县,皋兰县,榆中县|嘉峪关市,市辖区|金昌市,市辖区,金川区,永昌县|白银市,市辖区,白银区,平川区,靖远县,会宁县,景泰县|天水市,市辖区,秦城区,北道区,清水县,秦安县,甘谷县,武山县,张家川回族自治县|武威市,市辖区,凉州区,民勤县,古浪县,天祝藏族自治县|张掖市,市辖区,甘州区,肃南裕固族自治县,民乐县,临泽县,高台县,山丹县|平凉市,市辖区,崆峒区,泾川县,灵台县,崇信县,华亭县,庄浪县,静宁县|酒泉市,市辖区,肃州区,金塔县,安西县,肃北蒙古族自治县,阿克塞哈萨克族自治县,玉门市,敦煌市|庆阳市,市辖区,西峰区,庆城县,环县,华池县,合水县,正宁县,宁县,镇原县|定西市,市辖区,安定区,通渭县,陇西县,渭源县,临洮县,漳县,岷县|陇南市,市辖区,武都区,成县,文县,宕昌县,康县,西和县,礼县,徽县,两当县|临夏回族自治州,临夏市,临夏县,康乐县,永靖县,广河县,和政县,东乡族自治县,积石山保安族东乡族撒拉族自治县|甘南藏族自治州,合作市,临潭县,卓尼县,舟曲县,迭部县,玛曲县,碌曲县,夏河县#青海省$西宁市,市辖区,城东区,城中区,城西区,城北区,大通回族土族自治县,湟中县,湟源县|海东地区,平安县,民和回族土族自治县,乐都县,互助土族自治县,化隆回族自治县,循化撒拉族自治县|海北藏族自治州,门源回族自治县,祁连县,海晏县,刚察县|黄南藏族自治州,同仁县,尖扎县,泽库县,河南蒙古族自治县|海南藏族自治州,共和县,同德县,贵德县,兴海县,贵南县|果洛藏族自治州,玛沁县,班玛县,甘德县,达日县,久治县,玛多县|玉树藏族自治州,玉树县,杂多县,称多县,治多县,囊谦县,曲麻莱县|海西蒙古族藏族自治州,格尔木市,德令哈市,乌兰县,都兰县,天峻县#宁夏回族自治区$银川市,市辖区,兴庆区,西夏区,金凤区,永宁县,贺兰县,灵武市|石嘴山市,市辖区,大武口区,惠农区,平罗县|吴忠市,市辖区,利通区,盐池县,同心县,青铜峡市|固原市,市辖区,原州区,西吉县,隆德县,泾源县,彭阳县|中卫市,市辖区,沙坡头区,中宁县,海原县#新疆维吾尔自治区$乌鲁木齐市,市辖区,天山区,沙依巴克区,新市区,水磨沟区,头屯河区,达坂城区,东山区,乌鲁木齐县|克拉玛依市,市辖区,独山子区,克拉玛依区,白碱滩区,乌尔禾区|吐鲁番地区,吐鲁番市,鄯善县,托克逊县|哈密地区,哈密市,巴里坤哈萨克自治县,伊吾县|昌吉回族自治州,昌吉市,阜康市,米泉市,呼图壁县,玛纳斯县,奇台县,吉木萨尔县,木垒哈萨克自治县|博尔塔拉蒙古自治州,博乐市,精河县,温泉县|巴音郭楞蒙古自治州,库尔勒市,轮台县,尉犁县,若羌县,且末县,焉耆回族自治县,和静县,和硕县,博湖县|阿克苏地区,阿克苏市,温宿县,库车县,沙雅县,新和县,拜城县,乌什县,阿瓦提县,柯坪县|克孜勒苏柯尔克孜自治州,阿图什市,阿克陶县,阿合奇县,乌恰县|喀什地区,喀什市,疏附县,疏勒县,英吉沙县,泽普县,莎车县,叶城县,麦盖提县,岳普湖县,伽师县,巴楚县,塔什库尔干塔吉克自治县|和田地区,和田市,和田县,墨玉县,皮山县,洛浦县,策勒县,于田县,民丰县|伊犁哈萨克自治州,伊宁市,奎屯市,伊宁县,察布查尔锡伯自治县,霍城县,巩留县,新源县,昭苏县,特克斯县,尼勒克县|塔城地区,塔城市,乌苏市,额敏县,沙湾县,托里县,裕民县,和布克赛尔蒙古自治县|阿勒泰地区,阿勒泰市,布尔津县,富蕴县,福海县,哈巴河县,青河县,吉木乃县|省直辖行政单位,石河子市,阿拉尔市,图木舒克市,五家渠市#香港特别行政区$香港,香港特别行政区#澳门特别行政区$澳门,澳门特别行政区#台湾省$台北市,中正区,大同区,中山区,松山区,大安区,万华区,信义区,士林区,北投区,内湖区,南港区,文山区|高雄市,新兴区,前金区,芩雅区,盐埕区,鼓山区,旗津区,前镇区,三民区,左营区,楠梓区,小港区|基隆市,仁爱区,信义区,中正区,中山区,安乐区,暖暖区,七堵区|台中市,中区,东区,南区,西区,北区,北屯区,西屯区,南屯区|台南市,中西区,东区,南区,北区,安平区,安南区|新竹市,东区,北区,香山区|嘉义市,东区,西区|县,台北县(板桥市),宜兰县(宜兰市),新竹县(竹北市),桃园县(桃园市),苗栗县(苗栗市),台中县(丰原市),彰化县(彰化市),南投县(南投市),嘉义县(太保市),云林县(斗六市),台南县(新营市),高雄县(凤山市),屏东县(屏东市),台东县(台东市),花莲县(花莲市),澎湖县(马公市)#其它$亚洲,阿富汗,巴林,孟加拉国,不丹,文莱,缅甸,塞浦路斯,印度,印度尼西亚,伊朗,伊拉克,日本,约旦,朝鲜,科威特,老挝,马尔代夫,黎巴嫩,马来西亚,以色列,蒙古,尼泊尔,阿曼,巴基斯坦,巴勒斯坦,菲律宾,沙特阿拉伯,新加坡,斯里兰卡,叙利亚,泰国,柬埔寨,土耳其,阿联酋,越南,也门,韩国,中国,中国香港,中国澳门,中国台湾|非洲,阿尔及利亚,安哥拉,厄里特里亚,法罗群鸟,加那利群岛(西)(拉斯帕尔马斯),贝宁,博茨瓦纳,布基纳法索,布隆迪,喀麦隆,加那利群岛(西)(圣克鲁斯),佛得角,中非,乍得,科摩罗,刚果,吉布提,埃及,埃塞俄比亚,赤道几内亚,加蓬,冈比亚,加纳,几内亚,南非,几内亚比绍,科特迪瓦,肯尼亚,莱索托,利比里亚,利比亚,马达加斯加,马拉维,马里,毛里塔尼亚,毛里求斯,摩洛哥,莫桑比克,尼日尔,尼日利亚,留尼旺岛,卢旺达,塞内加尔,塞舌尔,塞拉利昂,索马里,苏丹,斯威士兰,坦桑尼亚,圣赤勒拿,多哥,突尼斯,乌干达,扎伊尔,赞比亚,津巴布韦,纳米比亚,迪戈加西亚,桑给巴尔,马约特岛,圣多美和普林西比|欧洲,阿尔巴尼亚,安道尔,奥地利,比利时,保加利亚,捷克,丹麦,芬兰,法国,德国,直布罗陀(英),希腊,匈牙利,冰岛,爱尔兰,意大利,列支敦士登,斯洛伐克,卢森堡,马耳他,摩纳哥,荷兰,挪威,波兰,葡萄牙,马其顿,罗马尼亚,南斯拉夫,圣马力诺,西班牙,瑞典,瑞士,英国,科罗地亚,斯洛文尼亚,梵蒂冈,波斯尼亚和塞哥维那,俄罗斯联邦,亚美尼亚共和国,白俄罗斯共和国,格鲁吉亚共和国,哈萨克斯坦共和国,吉尔吉斯坦共和国,乌兹别克斯坦共和国,塔吉克斯坦共和国,土库曼斯坦共和国,乌克兰,立陶宛,拉脱维亚,爱沙尼亚,摩尔多瓦,阿塞拜疆|美洲,安圭拉岛,安提瓜和巴布达,阿根廷,阿鲁巴岛,阿森松,巴哈马,巴巴多斯,伯利兹,百慕大群岛,玻利维亚,巴西,加拿大,开曼群岛,智利,哥伦比亚,多米尼加联邦,哥斯达黎加,古巴,多米尼加共和国,厄瓜多尔,萨尔瓦多,法属圭亚那,格林纳达,危地马拉,圭亚那,海地,洪都拉斯,牙买加,马提尼克(法),墨西哥,蒙特塞拉特岛,荷属安的列斯群岛,尼加拉瓜,巴拿马,巴拉圭,秘鲁,波多黎哥,圣皮埃尔岛密克隆岛(法),圣克里斯托弗和尼维斯,圣卢西亚,福克兰群岛,维尔京群岛(英),圣文森特岛(英),维尔京群岛(美),苏里南,特立尼达和多巴哥,乌拉圭,美国,委内瑞拉,格陵兰岛,特克斯和凯科斯群岛,瓜多罗普|大洋洲,澳大利亚,科克群岛,斐济,法属波里尼西亚、塔希提,瓦努阿图,关岛,基里巴斯,马里亚纳群岛,中途岛,瑙鲁,新咯里多尼亚群岛,新西兰,巴布亚新几内亚,东萨摩亚,西萨摩亚,所罗门群岛,汤加,对诞岛,威克岛,科科斯岛,夏威夷,诺福克岛,帕劳,纽埃岛,图瓦卢,托克鲁,密克罗尼西亚,马绍尔群岛,瓦里斯加富士那群岛";
    var HASH = {};
    var provinces = [];
    var pca__parts = PCAD.split("#");
    for (var i = 0; i < pca__parts.length; i++) {
        var pca__part = pca__parts[i];
        var p_ca__parts = pca__part.split('$');
        var p = p_ca__parts[0];//省
        provinces.push(p);
        HASH[p] = {};
        var ca = p_ca__parts[1];
        var c_a__parts = ca.split('|');
        for(var j=0; j<c_a__parts.length; j++){
            var c_a__part = c_a__parts[j];
            var ca__parts = c_a__part.split(',');
            var c, a = [];
            for(var n=0; n<ca__parts.length; n++){
                if(n==0){
                    c = ca__parts[n];//市县
                }else{
                    a.push(ca__parts[n]);//地区
                }
            }
            HASH[p][c]=a;
        }
    }
    this.provinces = provinces;
    this.hashData = HASH;
}
PCA.prototype.getProvinces = function(){
    return this.provinces;
};
PCA.prototype.getCities = function(province){
    var arr = [];
    for(var o in this.hashData[province]){
        arr.push(o);
    }
    return arr;
};
PCA.prototype.getAreas = function(province, city){
    return this.hashData[province][city];
};
window.pca = new PCA();
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
Namespace("ui.text");
ui.text.TextMetrics = function(b, d, c, g, k) {
    var h = [];
    this.init = function() {
        for (var f = 0; f < d.length; f++) {
            var m = b.print(0, 0, d.slice(0, f + 1), c, g, "middle", k),
                q = m.getBBox(!0);
            m.remove();
            var m = b.print(0, 0, d.slice(f, f + 1), c, g, "middle", k),
                n = m.getBBox(!0);
            m.remove();
            q.x = q.x + q.width - n.width;
            q.width = n.width;
            q.y = n.y;
            q.height = n.height;
            h.push(q);
        }
        m = h[0].x;
        for (f = 0; f < h.length; f++) {
            h[f].x -= m;
        }
    };
    this.getMetrics = function() {
        return h;
    };
    this.init();
};

ui.text.EmbroideryTextElement = function(b, d, c, g, k, h, f, m, q, n, r) {};

ui.text.TextElement = function(b, d, c, g, k, h, f, m, q, n, r, t, p, e, u, s, w, v, x, B) {

    function y(b) {
        for (var c = "", e = 0; e < b.length; e++) {
            127 != b.charCodeAt(e) && (c += b.charAt(e));
        }
        return c;
    }

    function D(b) {
        if (Z && !A.sleep) {
            A.prototype.baseSetPositionAndSize(A.x, A.y, A.width, A.height, A.rotation, A.flipH, A.flipV, Z, T, L, b);
            b = A.width / T.width;
            var c = A.height / T.height,
                e = A.width / (T.width - 2 * W),
                d = A.height / (T.height - 2 * W);
            E ? (E.sx = b, E.sy = c, G.length >= H.length ? (E.w = A.width, E.h = A.height) : (E.ox = b, E.oy = c)) : E = {
                sx: b,
                sy: c,
                w: A.width,
                h: A.height,
                x: A.x,
                y: k,
                yo: 0
            };
            F = b;
            I = c;
            na = e / d;
            L.attr({
                fill: "none",
                stroke: fa,
                "stroke-width": V(),
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
            });
            0 == W && (L.attr({
                fill: "none",
                stroke: "none",
                "stroke-width": 2 * W
            }), Z.attr({
                fill: da,
                "stroke-width": 0,
                stroke: "none"
            }));
            A.prototype.reportInitiated();
        }
    }

    function V() {
        // debugger;
        return 0 == W ? 0 : W / ja * Math.max(Math.abs(F), Math.abs(I)) * 1.4;
    }

    function ca() {
        E = J = null;
        H = G;
        clearInterval(ka);
    }

    function M() {
        clearInterval(ka);
        Z.remove();
        L.remove();
        A.init();
        ezd.activeSide.boundingBox.getSelections() == A && ezd.activeSide.boundingBox.selectElement(A);
        D();
    }

    var A = this,
        G = y(c),
        H = y(c),
        Q = x.font_family ? x.font_family : x.font;
    parseInt(x.font_id, 10);
    parseInt(x.font_style_id, 10);
    var da = n,
        W = r,
        fa = t,
        ja = 1,
        F = 1,
        I = 1,
        P = p,
        O = e,
        N = q / 50,
        U = u,
        Z, L, K = "arcup",
        T, J, E, S, ea = !1,
        oa = f / B,
        z = {}, ka, R = 0,
        X = B,
        la = 1,
        ma = 0,
        aa = 1 < c.split("\n").length ? !0 : !1,
        na = 1,
        va = x,
        wa = !1,
        xa = !1,
        K = 0 > U ? "arcdown" : "arcup";
    this.props = "letterSpacing wrapAmmount arching wrap stroke fontFamily rotation fontSize color strokeColor flipH flipV x y width height".split(" ");
    this.historyProps = "data id type text wrapAmmount arching wrap stroke fontFamily rotation fontSize color strokeColor flipH flipV x y width height z".split(" ");
    this.getNode = function() {
        return S;
    };
    this.forceUpdate = function(b) {
        // debugger;
        A.sleep = !1;
        D(b);
    };
    this.remove = function() {
        L.remove();
        Z.remove();
    };
    this.setShadow = function(b, c, e) {
        "undefined" !== typeof this.shadow && this.shadow.remove();
        this.shadow = this.element.glow({
            color: c,
            offsety: b,
            offsetx: b,
            fill: e
        });
    };
    this.removeShadow = function() {
        "undefined" !== typeof this.shadow && this.shadow.remove();
    };
    this.init = function() {
        var b = true;
        var c = d.print(A.x, A.y, H || "Test", Q, 20, "middle", N).attr({
            fill: da,
            stroke: fa,
            "stroke-width": W,
            "stroke-linecap": "square",
            "text-anchor": "end"
        });
        e = c.getBBox(false);
        c.remove();
        if (0 == e.width || 0 == e.height) {
            b = false;
        }
        b || (Q = "Microsoft YaHei");
        b = !1;
        "" == G && (b = true, G = H);
        (aa = 1 < G.split("\n").length ? !0 : !1) || (X = 1);
        !aa && 1 < la && (c = d.print(0, 0, "W", Q, 20, "middle", N).attr({
            fill: da,
            stroke: fa,
            "stroke-width": W,
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
        }), c.getBBox(true), c.remove(), A.height = oa * X * A.prototype.scaleY);
        A.sleep = !0;
        S = d.set();
        c = d.print(A.x, A.y, G, Q, 20, "middle", N).attr({
            fill: da,
            stroke: fa,
            "stroke-width": W,
            "stroke-linecap": "square",
            "text-anchor": "end"
        });
        c.scale(1, 1);
        T = c.getBBox(!1);
        J || (J = T);
        e = Raphael.transformPath(c.attr("path"), "S1,1");
        var a = state;
//        ea ? 0 == U && 0 == O && 0 == P && (aa || xa ? (xa = !1, A.width > A.height ? aa || A.prototype.setSize(A.width, A.width / (T.width / T.height)) : aa || A.prototype.setSize(A.height / (T.height / T.width) * na, A.height)) : A.prototype.setSize(A.height / (T.height / T.width) * na, A.height)) : (console.log("文字 初始化"), 0 == P && 0 == P && 0 == U && !1 === aa && (G.length > H.length && 0 === u && !1 === xa ? A.prototype.setSize(A.width, oa * A.prototype.scaleY) : G.length < H.length ? A.prototype.setSize(A.height / (T.height / T.width) * na, A.height) : G.length == H.length && wa && A.prototype.setSize(h * A.prototype.scaleX, oa * A.prototype.scaleY)));
        var f;
        if (0 != O && 0 != P && 0 == U && !1 == aa) {
            f = Math.getPathOffSet(e), e = Math.getWrappedPath(e, T, f, 1E5, P, O);
        } else {
            if (0 != U && !1 == aa) {
                var g = U,
                    k = T,
                    e = 1,
                    p = !1;
                0 > g && (p = !0, e = -1);
                g = Math.abs(g);
                f = "";
                var m = G,
                    s = G;
                G.length < H.length && !1 == ea && (k = J, s = H);
                var s = d.print(0, 0, s, Q, 20, "middle", N),
                    n = s.getBBox(!0),
                    q = d.print(0, 0, m, Q, 20, "middle", N),
                    r = q.getBBox(!0),
                    k = Math.getRadious(k.width, k.height, g),
                    g = d.path(Math.arc([n.width / 2, n.y2 + k], k, -90 - g / 2, g - 90 - g / 2)).attr({
                        stroke: "#0000ff"
                    }),
                    v = g.getTotalLength();
                z[m + Q + "SP" + N] ? k = z[m + Q + "SP" + N] : (k = (new ui.text.TextMetrics(d, m, Q, 20, N)).getMetrics(), z[m + Q + "SP" + N] = k);
                s.remove();
                q.remove();
                s = Math.abs(n.width - r.width) / 2;
                n = v / (n.width - n.x);
                for (q = 0; q < m.length; q++) {
                    if (" " != G[q]) {
                        var x = k[q].y,
                            v = k[q].width,
                            w = k[q].height,
                            y = (s + k[q].x + v / 2) / n,
                            r = d.print(0, 0, m[q], Q, 20, "middle", N).attr({
                                fill: da,
                                stroke: fa,
                                "stroke-width": W,
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round"
                            }),
                            w = d.rect(0, 0, v, w),
                            B = g.getPointAtLength(y).x,
                            t = g.getPointAtLength(y).y * e;
                        w.transform("T" + (B - v / 2) + "," + (x + t) + "");
                        B = w.getBBox(!1);
                        t = r.getBBox(!0);
                        x = B.x - t.x;
                        B = B.y - t.y;
                        t = g.getPointAtLength(y);
                        y = g.getPointAtLength(y + 1);
                        y = 180 * Math.atan2(y.y - t.y, y.x - t.x) / Math.PI;
                        p && (y = 360 - y);
                        r.transform("r" + y + "," + v / 2 + ",0");
                        r.transform("t" + x + "," + B + "...");
                        v = Raphael.transformPath(r.attr("path"), r.transform());
                        f += v;
                        r.remove();
                        w.remove();
                    }
                }
                g.remove();
                E && (p = d.path(f), g = p.getBBox(!0), m = g.width * E.sx, g = g.height * E.sy, E.yo = -(E.h / 2) + g / 2, k = A.height, A.prototype.setSize(m, g), G.length < H.length && !1 == ea || !0 == ea || A.prototype.setSize(E.w, g / (m / E.w)), A.prototype.setPosition(A.x, A.y + (k - A.height) / 2 * e), p.remove());
                e = f;
            } else {
                if (aa) {
                    xa = !0;
                    e = G.split("\n");
                    f = "";
                    p = d.print(0, 0, "W", Q, 20, "middle", N).attr({
                        fill: da,
                        stroke: fa,
                        "stroke-width": W,
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round"
                    });
                    k = p.getBBox(!0);
                    m = k.height;
                    p.remove();
                    la = X;
                    X = e.length;
                    for (g = 0; g < e.length; g++) {
                        p = d.print(0, g * (m + (ma + 2) / 2), e[g], Q, 20, "middle", N).attr({
                            fill: da,
                            stroke: fa,
                            "stroke-width": W,
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round"
                        }), k = p.getBBox(!0), s = 0, 0 == R ? s = 0 : 1 == R ? s = (A.width - k.width) / 2 : 2 == R && (s = A.width - k.width), p.transform("t" + s + ",0r0..."), k = Raphael.transformPath(p.attr("path"), p.transform()), f += k, p.remove(), la != X && (X > la ? ea && (A.y += m / 2) : ea && (A.y -= m / 2), la = X);
                    }
                    e = f;
                    A.prototype.setSize(A.width, oa * A.prototype.scaleY * X);
                }
            }
        }
        c.remove();
        L = d.path(e);
        L.attr({
            fill: "none",
            stroke: fa,
            "stroke-width": V(),
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
        });
        Z = d.path(e);
        Z.attr({
            fill: da,
            "stroke-width": 0
        });
        0 == W && (L.attr({
            fill: "none",
            stroke: "none",
            "stroke-width": 2 * W
        }), Z.attr({
            fill: da,
            "stroke-width": 0,
            stroke: "none"
        }));
        0 > U && (K = "arcdown");
        S.push(L);
        S.push(Z);
        T = Z.getBBox(!0);
        0 == U && (T.width += 2 * W, T.height += 2 * W, T.x -= W, T.y -= W);
        A.forceUpdate();
        eventManager.trigger("checkBoundaries");
        b && (G = "");
    };
    this.basicPropertyUpdated = function(b) {
        // debugger;
        D(b);
    };
    A.prototype = new ui.element.BaseElement(A, g, k, s, h, f, m, w, v, !0, b, "text");
    A.init();
    this.strokeForSvg = function() {
        L.attr({
            fill: "none",
            stroke: fa,
            "stroke-width": 2 * W,
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
        });
    };
    this.getFinalStrokeScaleSave = function() {
        return W;
    };
    this.getStrokeScaleX = function() {
        return W / ja * Math.max(F, F) * 2;
    };
    this.getStrokeScaleY = function() {
        return W / ja * Math.max(I, I) * 2;
    };
    Object.defineProperty(this, "text", {
        set: function(b) {
            // debugger;
            //实时更新文字
            //modify by hl
            // service.loadFont(d, function() {
            //     G = y(b);
            //     A.data.value = G;
            //     if (aa = 1 < G.split("\n").length ? !0 : !1) {
            //         O = P = U = 0;
            //     }
            //     "none" == da ? (Z.remove(), L.remove(), A.init(), ezd.activeSide.boundingBox.selectElement(A)) : (M(), clearInterval(ka), ka = setInterval(function() {}, 0));
            //     A.prototype.reportChange();
            //     wa = !0;
            // }, b);
            G = b;
        },
        get: function() {
            return G;
        }
    });
    //add by hl
    var _self = this;
    this.loadFont = function(callback, font){
        // debugger;
        console.log('实时更新文字');
        var b = _self.text;
        service.loadFont(font, function() {
            G = y(b);
            A.data.value = G;
            if (aa = 1 < G.split("\n").length ? !0 : !1) {
                O = P = U = 0;
            }
            "none" == da ? (Z.remove(), L.remove(), A.init(), ezd.activeSide.boundingBox.selectElement(A)) : (M(), clearInterval(ka), ka = setInterval(function() {}, 0));
            A.prototype.reportChange();
            wa = !0;
        }, b, null, callback);
    }
    Object.defineProperty(this, "fontObject", {
        set: function(b) {
            va = clone(b);
        },
        get: function() {
            return va;
        }
    });
    Object.defineProperty(this, "color", {
        set: function(b) {
            var c = da;
            da = b;
            Z.attr({
                fill: b,
                stroke: "none",
                "stroke-width": 0
            });
            "None" === c ? (Z.remove(), L.remove(), A.init()) : A.prototype.reportChange();
        },
        get: function() {
            return da;
        }
    });
    Object.defineProperty(this, "strokeColor", {
        set: function(b) {
            fa = b;
            L.attr({
                fill: "none",
                stroke: fa,
                "stroke-width": V(),
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
            });
            0 == W && L.attr({
                fill: "none",
                stroke: "none",
                "stroke-width": 2 * W
            });
            A.prototype.reportChange();
        },
        get: function() {
            return fa;
        }
    });
    Object.defineProperty(this, "stroke", {
        set: function(b) {
            W = b;
            b = A.width;
            var c = A.height;
            Z.remove();
            L.remove();
            A.init();
            aa && (A.width = b, A.height = c);
            A.prototype.reportChange();
        },
        get: function() {
            return W;
        }
    });
    Object.defineProperty(this, "strokeScale", {
        set: function(b) {
            ja = b;
            L.attr({
                fill: "none",
                stroke: fa,
                "stroke-width": V(),
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
            });
        },
        get: function() {
            return ja;
        }
    });
    Object.defineProperty(this, "wrap", {
        set: function(b) {
            U = 0;
            P = b;
            Z.remove();
            L.remove();
            A.init();
            A.prototype.reportChange();
        },
        get: function() {
            return P;
        }
    });
    Object.defineProperty(this, "letterSpacing", {
        set: function(b) {
            N = b;
            ca();
            M();
            ka = setInterval(function() {}, 0);
            A.prototype.reportChange();
        },
        get: function() {
            return N;
        }
    });
    Object.defineProperty(this, "wrapAmmount", {
        set: function(b) {
            O = b;
            Z.remove();
            L.remove();
            A.init();
            A.prototype.reportChange();
        },
        get: function() {
            return O;
        }
    });
    Object.defineProperty(this, "arching", {
        set: function(b) {
            U = b;
            clearInterval(ka);
            M();
            ka = setInterval(function() {}, 0);
            A.prototype.reportChange();
        },
        get: function() {
            return U;
        }
    });
    Object.defineProperty(this, "fontFamily", {
        set: function(b) {
            Q = b;
            va.font_family = b;
            ca();
            Z.remove();
            L.remove();
            A.init();
            A.prototype.reportChange();
        },
        get: function() {
            return Q;
        }
    });
    Object.defineProperty(this, "fontId", {
        set: function(b) {
            va.font_id = b;
        },
        get: function() {
            return va.font_id;
        }
    });
    Object.defineProperty(this, "fontStyleId", {
        set: function(b) {
            va.font_style_id = b;
        },
        get: function() {
            return va.font_style_id;
        }
    });
    Object.defineProperty(this, "element", {
        get: function() {
            return Z;
        }
    });
    Object.defineProperty(this, "shape", {
        get: function() {
            return K;
        }
    });
    Object.defineProperty(this, "isNew", {
        get: function() {
            return ea;
        },
        set: function(b) {
            ea = b;
        }
    });
    Object.defineProperty(this, "oText", {
        get: function() {
            return H;
        }
    });
    Object.defineProperty(this, "dText", {
        get: function() {
            return "";
        }
    });
    Object.defineProperty(this, "multiline", {
        get: function() {
            return aa;
        },
        set: function(b) {
            aa = b;
        }
    });
    Object.defineProperty(this, "alignment", {
        get: function() {
            return R;
        },
        set: function(b) {
            R = b;
            ca();
            b = A.width;
            var c = A.height;
            clearInterval(ka);
            Z.remove();
            L.remove();
            A.init();
            A.prototype.setSize(b, c);
            A.prototype.reportChange();
        }
    });
    Object.defineProperty(this, "lineHeight", {
        get: function() {
            return ma;
        },
        set: function(b) {
            ma = b;
            ca();
            M();
            A.prototype.reportChange();
        }
    });
    Object.defineProperty(this, "lines", {
        get: function() {
            return X;
        },
        set: function(b) {
            X = b;
        }
    });
};
Namespace("ui.element");
ui.element.BaseElement = function(b, d, c, g, k, h, f, m, q, n, r, t) {
    var p = this,
        e = d,
        u = c,
        s, w, v = g,
        x = f,
        B = k,
        y = h,
        D = m,
        V = q,
        ca = n,
        M = t,
        A, G, H, Q = !1,
        da = !1;
    this.scaleY = this.scaleX = 1;
    this.reportChange = function() {
        console.log("SVG－设计内容发生变化 ", ca, da);
        da && !ca && (da = !1, setTimeout(function() {
            console.debug("***更行了对象***");
            state.isChangedDesign = true;
            eventManager.trigger("elementEdited", b);
            eventManager.trigger('updatePricePreview');
            da = !0;
        }, 100));
    };
    this.reportInitiated = function() {
        Q || (setTimeout(function() {
            console.debug("***初始化了对象***");
            state.isInitialDesign = true;
            eventManager.trigger("elementRendered", b);
            eventManager.trigger('updatePricePreview');
            eventManager.trigger('updateStep2View');
            da = !0;
        }, 10), Q = !0);
    };
    this.setSize = function(b, c) {
        B = b;
        y = c;
    };
    this.setPosition = function(b, c) {
        e = b;
        u = c;
    };
    this.baseSetPositionAndSize = function(b, c, d, f, h, g, k, p, m, n, q) {
        "move" == q ? (d = b - s, f = c - w, s = e, w = u, p.transform("t" + d + "," + f + "..."), n && n.transform("t" + d + "," + f + "...")) : (g && (d = -Math.abs(d)), k && (f = -Math.abs(f)), p.transform("R0"), n && n.transform("R0"), g = d / m.width, k = f / m.height, d = b - m.x * g - d / 2, f = c - m.y * k - f / 2, s = e, w = u, p.transform("r" + h + "," + b + "," + c + "t" + d + "," + f + "...s" + g + "," + k + ",0,0"), n && n.transform("r" + h + "," + b + "," + c + "t" + d + "," + f + "...s" +
            g + "," + k + ",0,0"));
    };
    this.updateDataUrl = function() {
        getImageData(b.url, !0, function(b) {
            H = b.dataUrl;
        });
    };
    Object.defineProperty(b, "dataUrl", {
        get: function() {
            return H;
        },
        set: function(b) {
            H = b;
        }
    });
    Object.defineProperty(b, "x", {
        set: function(c) {
            e = c;
            b.basicPropertyUpdated("move");
            p.reportChange();
        },
        get: function() {
            return e;
        }
    });
    Object.defineProperty(b, "y", {
        set: function(c) {
            u = c;
            b.basicPropertyUpdated("move");
            p.reportChange();
        },
        get: function() {
            return u;
        }
    });
    Object.defineProperty(b, "z", {
        set: function(b) {
            v = b;
            p.reportChange();
        },
        get: function() {
            return v;
        }
    });
    Object.defineProperty(b, "width", {
        set: function(c) {
            B = c;
            b.basicPropertyUpdated();
            p.reportChange();
        },
        get: function() {
            return B;
        }
    });
    Object.defineProperty(b, "height", {
        set: function(c) {
            y = c;
            b.basicPropertyUpdated();
            p.reportChange();
        },
        get: function() {
            return y;
        }
    });
    Object.defineProperty(b, "rotation", {
        set: function(c) {
            x = c;
            b.basicPropertyUpdated();
            p.reportChange();
        },
        get: function() {
            return x;
        }
    });
    Object.defineProperty(b, "flipH", {
        set: function(c) {
            D = c;
            b.basicPropertyUpdated();
            p.reportChange();
        },
        get: function() {
            return D;
        }
    });
    Object.defineProperty(b, "flipV", {
        set: function(c) {
            V = c;
            b.basicPropertyUpdated();
            p.reportChange();
        },
        get: function() {
            return V;
        }
    });
    Object.defineProperty(b, "sleep", {
        set: function(b) {
            ca = b;
        },
        get: function() {
            return ca;
        }
    });
    Object.defineProperty(b, "data", {
        set: function(b) {},
        get: function() {
            r.height = y;
            r.width = B;
            r.x = e;
            r.y = u;
            r.rotation = x;
            r.rotate = x;
            r.fliph = D;
            r.flipV = V;
            r.z = v;
            r.id = G;
            r.table_name = A;
            r.type = M;
            b.constructor === ui.text.TextElement && (r.shape = 0 > b.arching ? "arcdown" : "arcup", r.sweep = String(Math.abs(parseInt(b.arching, 10))), 0 != Math.abs(parseInt(b.arching, 10)) && (r.wrap_mode = b.wrap, r.wrap_amount = b.wrapAmmount), r.fontObject = b.fontObject, r.fill_color = b.color, r.stroke_color = b.strokeColor, r.stroke_width = b.stroke, r.letterSpacing = 50 * b.letterSpacing, r.kerning = 50 * b.letterSpacing, r.alignment = b.alignment, r.line_height = b.lineHeight, r.lines = b.lines,
                r.isNew = b.isNew);
            b.constructor === ui.svg.SvgElement && (r.colors = clone(b.colors));
            if (b.constructor === ui.bitmap.BitmapElement) {
                b.colors && (r.colors = clone(b.colors));
                var c = b.url;
                r.art_path = c;
                r.original_art_path = c;
                r.image = {
                    src: c,
                    url: c
                };
            }
            b.constructor === ui.text.EmbroideryTextElement && (r.slant = b.slant, r.sequence = b.sequence, r.shape = b.shape, r.circle_radius = b.circle_radius, r.bottom_curve_type = b.bottom_curve_type, r.top_curve_type = b.top_curve_type, r.bottom_curve = b.bottom_curve, r.top_curve = b.top_curve, r.word_spacing = b.word_spacing, r.line_spacing = b.line_spacing, r.letter_spacing = b.letter_spacing, r.alignment = b.alignment, r.font = b.font, r.fontSize = b.fontSize, r.color1 = b.color1, r.value = b.value,
                r.fontObject = {
                    font: b.font
                }, r.art_id = r.canvas_text_id);
            b.constructor === ui.bitmap.EmbroideryArtElement && (r.colors = clone(b.colors));
            return r;
        }
    });
    Object.defineProperty(b, "type", {
        get: function() {
            return M;
        },
        set: function(b) {
            M = b;
        }
    });
    Object.defineProperty(b, "id", {
        get: function() {
            return G;
        },
        set: function(b) {
            G = b;
        }
    });
    Object.defineProperty(b, "tableName", {
        get: function() {
            var b = "";
            "text" == M && (b = "canvas_text");
            if ("vector" == M || "image" == M) {
                b = "canvas_art";
            }
            return b;
        },
        set: function(b) {
            A = b;
        }
    });
    Object.defineProperty(b, "canReportEdition", {
        get: function() {
            return da;
        },
        set: function(b) {
            da = b;
        }
    });
};
Namespace("ui.svg");
ui.svg.SvgElement = function(b, d, c) {
    function g() {
        if (w) {
            for (var b = "", c = w.textContent.split("}"), e = 0; e < c.length; e++) {
                var d = c[e].trim() + "}",
                    d = d.replace("{}", "{fill:#000000}"),
                    f = d.match(/\.(fil|st)(\d+){(fill|stroke):([^;]+);*}/);
                if (f && !(5 > f.length)) {
                    for (var h = f[4], d = f[3], g = f[1], k = g + f[2], f = parseInt(f[2], 10), p = k + "_" + r, m = s.getElementsByClassName(k), u = [], n = 0; n < m.length; n++) {
                        u.push(m[n]);
                    }
                    for (n = 0; n < u.length; n++) {
                        u[n].setAttribute("class", u[n].getAttribute("class").replace(k, p));
                    }
                    b += "." + p + "{" + d + ":" + h + "}";
                    k = y[f];
                    k || (k = p, p = h.substring(h.lastIndexOf("(") + 1, h.lastIndexOf(")")), p.length && (p = p.split(","), h = rgbToHex(1 * p[0], 1 * p[1], 1 * p[2])), k = {
                        style: k,
                        color: h,
                        is_stroke: "stroke" == d,
                        is_fill: "fill" == d
                    });
                    k.prefix = g;
                    "stroke" === d ? k.prefixStroke = g : k.prefixFill = g;
                    k.is_stroke = k.is_stroke || "stroke" == d;
                    k.is_fill = k.is_fill || "fill" == d;
                    y[f] = k;
                }
            }
            w.textContent = b;
            eventManager.trigger("designColorsChanged");
        }
    }

    function k(b) {
        console.debug(b);
    }

    function h() {
        u.appendChild(w);
        u.appendChild(s);
        for (var b in x) {
            "undefined" != typeof n[b] && (n[b] = x[b]);
        }
        setTimeout(function() {
            console.debug("***element完成初始化***");
            state.isInitialDesign = true;
            eventManager.trigger("elementRendered", n);
        }, 10);
    }

    function f() {
        s.removeAttribute("transform");
        s.parentNode.removeAttribute("transform");
        M.removeAttribute("viewBox");
        var b = s.getBBox(),
            b = {
                x: b.x,
                y: b.y,
                width: b.width,
                height: b.height,
                x: 0,
                y: 0
            }, c = ca,
            e = A / b.width,
            d = G / b.height;
        I && (e *= -1);
        P && (d *= -1);
        s.setAttribute("transform", " rotate(" + W + " " + H + " " + Q + ") scale(" + e + " " + d + ") translate(" + ((b.x + H - 0.5 * A) / e - (I ? b.width : 0) - c.x) + "," + ((b.y + Q - 0.5 * G) / d - (P ? b.height : 0) - c.y) + ") ");
        M.setAttribute("viewBox", c.x + " " + c.y + " " + D + " " + V);
        n.prototype.reportChange();
        b = s.getBBox();
        b = {
            x: b.x,
            y: b.y,
            width: b.width,
            height: b.height
        };
        e = s.ownerSVGElement;
        c = s.getTransformToElement(s.parentNode);
        e = [e.createSVGPoint(), e.createSVGPoint(), e.createSVGPoint(), e.createSVGPoint()];
        e[0].x = b.x;
        e[0].y = b.y;
        e[1].x = b.x + b.width;
        e[1].y = b.y;
        e[2].x = b.x + b.width;
        e[2].y = b.y + b.height;
        e[3].x = b.x;
        e[3].y = b.y + b.height;
        for (var d = Infinity, f = -Infinity, h = Infinity, g = -Infinity, k = 0; k < e.length; k++) {
            if (c) {
                var p = e[k].matrixTransform(c),
                    d = Math.min(d, p.x),
                    f = Math.max(f, p.x),
                    h = Math.min(h, p.y),
                    g = Math.max(g, p.y)
            }
        }
        try {
            b.x = d, b.y = h, b.width = f - d, b.height = g - h;
        } catch (m) {}
        B = b;
    }

    function m() {
        for (var b = [], c = 0; c < y.length; c++) {
            y[c] && b.push(y[c].color);
        }
        return b;
    }

    function q() {
        s = document.createElementNS("http://www.w3.org/2000/svg", "g");
        var b = e.getElementsByTagName("svg")[0],
            c = b;
        try {
            c = u.ownerDocument.importNode(b, !0);
        } catch (d) {}
        if(u==null){
            u = $('#designGroup1')[0]
        }
        u.appendChild(c);
        ca = c.getBBox();
        u.removeChild(c);
        M = document.createElementNS("http://www.w3.org/2000/svg", "g");
        M.setAttribute("width", D);
        M.setAttribute("height", V);
        for (var f = 0; f < b.childNodes.length; f++) {
            c = b.childNodes[f], c.tagName && "style" !== c.tagName && (c = s.ownerDocument.importNode(c, !0), M.appendChild(c));
        }
        s.appendChild(M);
        if (!s.getElementsByClassName) {
            var h = function(b, c) {
                for (var e = [], d = 0; d < b.childNodes.length; d++) {
                    var f = b.childNodes[d];
                    if (f.tagName) {
                        var g = b.childNodes[d].getAttribute("class");
                        g && 0 <= g.indexOf(c) && e.push(b.childNodes[d]);
                        e = e.concat(h(f, c));
                    }
                }
                return e;
            };
            s.getElementsByClassName = function(b) {
                return h(s, b);
            };
        }
    }
    var n = this,
        r = c.id;
    c.flipH = parseInt(c.fliph, 10);
    c.flipV = parseInt(c.flipv, 10);
    c.svg = b.implementation.createDocument(b.namespaceURI, null, null);
    var t = c.svg.importNode(b.documentElement, !0);
    c.svg.appendChild(t);
    var p = [{
            event: "click",
            fnc: k
        }, {
            event: "mousedown",
            fnc: k
        }, {
            event: "mouseup",
            fnc: k
        }, {
            event: "mousemove",
            fnc: k
        }],
        e = b.cloneNode(!0);
    e || (e = $.parseXML((new XMLSerializer).serializeToString(b)));
    var u = d,
        s;
    d = b.getElementsByTagName("style");
    0 === d.length ? (d = document.createElement("style"), d.setAttribute("type", "text/css"), d.textContent = ".fil0{fill:#000000;}", d = b.importNode(d, !0), b.documentElement.appendChild(d), d = b.getElementsByTagName("style"), t = function(b) {
        b = e.getElementsByTagName(b);
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d.getAttribute("class") || d.getAttribute("fill") || d.setAttribute("class", "fil0");
        }
    }, t("path"), t("polygon")) : "g" === e.getElementsByTagName("style")[0].parentNode.tagName && (t = e.getElementsByTagName("style")[0].parentNode.removeChild(e.getElementsByTagName("style")[0]), e.getElementsByTagName("svg")[0].appendChild(t));
    var w = d[0].cloneNode(!0);
    d = e.getElementsByTagName("g");
    for (t = 0; t < d.length; t++) {
        var v = d[t];
        v.style.clipPath = "";
        v.id = "";
    }
    var x = c,
        B, y = [],
        D, V, ca, M = null,
        A = D = parseInt(b.documentElement.getAttribute("width"), 10) || 500,
        G = V = parseInt(b.documentElement.getAttribute("height"), 10) || 500,
        H = parseInt(b.documentElement.getAttribute("x"), 10) || 0,
        Q = parseInt(b.documentElement.getAttribute("y"), 10) || 0,
        da = c.z,
        W = 0,
        fa = "front",
        ja = "location id x y width height rotation colors flipH flipV".split(" "),
        F = "data id type x y width height rotation colors flipH flipV z".split(" "),
        I = !1,
        P = !1,
        O = !0,
        N = !1;
    Object.defineProperties(this, {
        id: {
            get: function() {
                return r;
            }
        },
        colorsMapped: {
            get: function() {
                return m;
            }
        },
        style: {
            get: function() {
                return w;
            }
        },
        svg: {
            get: function() {
                return e;
            }
        },
        historyProps: {
            get: function() {
                return F;
            }
        },
        g: {
            get: function() {
                return s;
            }
        },
        viewBoxGroup: {
            get: function() {
                return M;
            }
        },
        originalBBox: {
            get: function() {
                return ca;
            }
        },
        bb: {
            get: function() {
                return B;
            }
        },
        colors: {
            get: function() {
                return m();
            },
            set: function(b) {
                if (b.length) {
                    for (var c = 0; c < b.length; c++) {
                        n.setColor(c, getColorString(b[c])), console.debug("culo de mandril plus = ", b[c].value);
                    }
                }
            }
        },
        width: {
            get: function() {
                return A;
            },
            set: function(b) {
                A = b;
                console.debug("WIDTH = ", b);
                f();
            }
        },
        height: {
            get: function() {
                return G;
            },
            set: function(b) {
                G = b;
                f();
            }
        },
        x: {
            get: function() {
                return H;
            },
            set: function(b) {
                H = b;
                f();
            }
        },
        y: {
            get: function() {
                return Q;
            },
            set: function(b) {
                Q = b;
                f();
            }
        },
        z: {
            get: function() {
                return da;
            },
            set: function(b) {
                da = b;
                f();
            }
        },
        rotation: {
            get: function() {
                return W;
            },
            set: function(b) {
                W = b;
                f();
            }
        },
        location: {
            get: function() {
                return fa;
            },
            set: function(b) {
                fa = b;
            }
        },
        flipH: {
            get: function() {
                return I;
            },
            set: function(b) {
                b != I && (I = b, f());
            }
        },
        flipV: {
            get: function() {
                return P;
            },
            set: function(b) {
                b != P && (P = b, f());
            }
        },
        data: {
            get: function() {
                for (var b = clone(x), c = 0; c < ja.length; c++) {
                    b[ja[c]] = n[ja[c]];
                }
                b.object = n;
                return b;
            },
            set: function(b) {}
        },
        canReportEdition: {
            get: function() {
                return O;
            },
            set: function(b) {
                O = b;
            }
        },
        sleep: {
            get: function() {
                return N;
            },
            set: function(b) {
                N = b;
            }
        }
    });
    this.type = "vector";
    this.setColor = function(b, c) {
        if (y.length <= b || !y[b]) {
            return !1;
        }
        y[b].color = c;
        for (var e = "", d = 0; d < y.length; d++) {
            y[d] && (y[d].is_fill && (e += "." + y[d].prefixFill + d + "_" + r + "{fill:" + y[d].color + "}"), y[d].is_stroke && (e += "." + y[d].prefixStroke + d + "_" + r + "{stroke:" + y[d].color + "}"));
        }
        w.textContent = e;
        eventManager.trigger("designColorsChanged");
        O && eventManager.trigger("elementEdited", n);
    };
    this.remove = function() {
        for (var b = 0; b < p.length; b++) {
            s.removeEventListener(p[b].event, p[b].fnc);
        }
        u.removeChild(s);
        u.removeChild(w);
        w = s = null;
    };
    this.getNode = function() {
        n.node || (n.node = {
            g: s,
            toFront: function() {
                s.parentNode.appendChild(s);
            }
        });
        return n.node;
    };
    this.forceUpdate = function() {};
    this.getStrokeScaleX = function() {};
    this.getStrokeScaleY = function() {};
    this.prototype = {
        reportChange: function() {
            console.log("SVG内容发生了变化", N, O);
            O && !N && (O = !1, setTimeout(function() {
                state.isChangedDesign = true;
                eventManager.trigger("elementEdited", n);
                console.debug("***Element 完成更新***");
                O = !0;
            }, 100));
        }
    };
    window.neverTrue && (q(), g(), h());
    q();
    g();
    h();
};
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
Namespace("container");
container.BoundingContainer = function(b, d, c) {
    function g() {
        ezd.hm.enable = !1;
    }

    function k() {
        eventManager.trigger("elementEdited", null);
        console.debug("***Multiple Elements was updated***");
        ezd.hm.enable = !0;
    }

    function h(b, c) {
        if (aa) {
            for (var d = Math.getElementPolygon(da.x, da.y, da.width, da.height, da.rotation), f = [], g = 0; g < s.length; g++) {
                var h = Math.getElementPolygon(s[g].x, s[g].y, s[g].width, s[g].height, s[g].rotation);
                if (Math.doPolygonsIntersect(h, d)) {
                    if (h = s[g].getNode().items, b && h) {
                        for (var k = 0; k < h.length; k++) {
                            c.target === h[k].node && f.push(s[g]);
                        }
                    } else {
                        f.push(s[g]);
                    }
                }
            }
            0 < f.length ? b ? p.selectElement(f[f.length - 1]) : (p.selectElement(f), eventManager.trigger("elementsSelected", f)) : (e.hide() ,p.hideRegion() , y = null);
            da = null;
        }
    }

    function f() {
        if (0 != s.length) {
            for (var b = 0; b < s.length; b++) {
                for (var c = s[b].getNode(), e = 0; e < c.length; e++) {
                    null == c[e].next && (c[e].next = c[e + 1]);
                }
                try {
                    s[b].getNode().toFront();
                } catch (d) {}
            }
        }
    }

    function m(b) {
        p._popup = new PopupMenu;
        p._popup.setContainer(b);
        p._popup.add("删除 ", function(c) {
            b.removeSelection();
        }, "copy");
        p._popup.add("复制 ", function(c) {
            b.copyElement();
        }, "copy");
        p._popup.add("粘贴 ", function(c) {
            b.pasteElement();
            fa = !1;
            W && W.remove();
            da && h();
        }, "paste");
        p._popup.addSeparator();
        p._popup.add("移到顶层", function(c) {
            b.setChildIndex(b.getSelections(), b.getChildIndex(b.getSelections()) + 1);
        }, "bringtofront");
        p._popup.add("移到底层", function(c) {
            b.setChildIndex(b.getSelections(), b.getChildIndex(b.getSelections()) - 1);
        }, "sendtoback");
        p._popup.addSeparator();
        p._popup.add("上移一层", function(c) {
            b.setChildIndex(b.getSelections(), b.elements.length - 1);
        }, "bringaboveobjects");
        p._popup.add("下移一层", function(c) {
            b.setChildIndex(b.getSelections(), 0);
        }, "sendunderobjects");
        p._popup.addSeparator();
        p._popup.add("水平翻转", function(c) {
            b.isMultiple() ? b.flipHMultiple() : (b.getSelections().flipH ? b.getSelections().flipH = 0 : b.getSelections().flipH = 1, b.reportEditionForLayers());
        }, "fliphorizontal");
        p._popup.add("垂直翻转", function(c) {
            b.isMultiple() ? b.flipVMultiple() : (b.getSelections().flipV ? b.getSelections().flipV = 0 : b.getSelections().flipV = 1, b.reportEditionForLayers());
        }, "flipvertical");
        p._popup.addSeparator();
        p._popup.add("对齐到中心", function(c) {
            y && (b.isMultiple() ? b.snapToCenterMultiple() : b.getSelections().x = R.x + R.width / 2, p.selectElement(y));
        }, "center");
        p._popup.setSize(200, 0);
        p._popup.bind(u);
    }

    function q() {

        if (X) {
            for (var b = 0; b < X.length; b++) {
                X[b].remove();
            }
            X.remove();
            X.length = 0;
            X = null;
        }

    }

    function n() {
        if (!X) {
            X = w.set();
            var b = w.text(R.x + R.width / 2, R.height + 10, "设计区域").attr({
                fill: "#ffffff",
                "font-size": 12,
                "font-weight": "bold"
            });
            if (!wa && !xa) {
                var c = p.getNormalSquare(R, ta, 0, 0, qa, "UI"),
                    e = w.rect(R.x, R.height, R.width, 20).attr({
                        stroke: "#fe199d",
                        fill: "#fe199d"
                    })
            }
            wa && (c = p.getEllipse(R, 0, 0, qa, "UI"), e = p.getEllipse(R, 0, 0, qa, "UI"));
            xa && (c = p.getRoundedSquare(R, ta, 0, 0, qa, "UI"), e = p.getRoundedSquare(R, ta, 0, 0, qa, "UI"));
            b.getBBox();
            var d = "r" + qa + "",
                f = d + "-" + R.width / 2 + ",-10";
            c.transform(d);
            e.transform(f);
            X.push(c);
            X.push(e);
            X.push(b);
            b.toFront();
            b.toBack();
            if (80 > R.width || wa || xa || 0 != qa) {
                b.remove(), e.remove();
            }
            c.toBack();
            e.toBack();
        }
    }

    function r(b) {
        ea = b;
    }

    function t() {
        return ea;
    }

    function t() {
        return ea;
    }

    function r(b) {
        (ea = b) ? p._popup.bind(u) : p._popup.unbind(u);
    }
    var p = this,
        e, u = c,
        s = d,
        w = b,
        v = 0,
        x = 0,
        B = 1,
        y, D = {
            x: 0,
            y: 0,
            width: 1,
            height: 1
        }, V = [],
        ca, M, A, G, H, Q, da, W, fa = !1,
        ja = !1,
        F = null,
        I = !1,
        P = !0,
        O = !1,
        N = !0,
        U = !0,
        Z = 4,
        L = 3,
        K = 3,
        T = !0,
        J = !0,
        E = !0,
        S = !1,
        ea = !0,
        oa = 0,
        z = 20,
        ka, R, X, la = ea = !0,
        ma = !0,
        aa = !0,
        na, va = !0,
        wa = ezdVars.DemoOval || !1,
        xa = !1,
        ta = 50,
        qa = ezdVars.RegionAngle || 0;
    this.clear = function() {
        e.reset();
    };
    this.updateScale = function() {
        e.updateUIScale();
    };
    this.getEllipse = function(b, c, e, d, f, g, h, k) {
        var p = b.x + b.width / 2,
            m = b.y + b.height / 2,
            s = b.width / 2;
        b = b.height / 2;
        var u = {}, n = {};
        s >= b ? (n = Math.sqrt(Math.pow(s, 2) - Math.pow(b, 2)), u = {
            x: p + n,
            y: m
        }, n = {
            x: p - n,
            y: m
        }) : (n = Math.sqrt(Math.pow(b, 2) - Math.pow(s, 2)), u = {
            x: p,
            y: m + n
        }, n = {
            x: p,
            y: m - n
        });
        u = Math.getRotatedPoint(u.x, u.y, d, p, m);
        n = Math.getRotatedPoint(n.x, n.y, d, p, m);
        if ("INSIDE" == f) {
            c = Math.getElementPolygon(c, e, g, h, k);
            e = {
                value: !0,
                nodesOutside: [0, 0, 0, 0]
            };
            for (f = 0; f < c.length; f++) {
                if (g = c[f], h = Math.sqrt(Math.pow(u.x - g.x, 2) + Math.pow(u.y - g.y, 2)), k = Math.sqrt(Math.pow(n.x - g.x, 2) + Math.pow(n.y - g.y, 2)), s >= b ? h + k > 2 * s && (e.value = !1, e.nodesOutside[f] = {
                    x: g.x,
                    y: g.y,
                    index: f
                }) : h + k > 2 * b && (e.value = !1, e.nodesOutside[f] = {
                    x: g.x,
                    y: g.y,
                    index: f
                }), !e.value) {
                    g = [];
                    for (h = 0; 360 > h; h += 3) {
                        var q = h / 180 * Math.PI;
                        k = s * Math.cos(q);
                        q = b * Math.sin(q);
                        k = Math.getRotatedPoint(k + p, q + m, d, p, m);
                        g.push(k);
                    }
                    k = [];
                    for (h = 0; h < g.length - 1; h++) {
                        var q = (g[h].y - g[h + 1].y) / (g[h].x - g[h + 1].x),
                            r = 1 / -q;
                        k.push({
                            p1: g[h],
                            p2: g[h + 1],
                            m: q,
                            invM: r
                        });
                    }
                    q = (g[0].y - g[g.length - 1].y) / (g[0].x - g[g.length - 1].x);
                    r = 1 / -q;
                    k.push({
                        p1: g[0],
                        p2: g[g.length - 1],
                        m: q,
                        invM: r
                    });
                    e.lines = k;
                }
            }
            return e;
        }
        if ("UI" == f) {
            return p = w.ellipse(p, m, s, b).attr({
                fill: "transparent",
                stroke: "#fe199d"
            }), p.transform("r" + d + "..."), p;
        }
    };
    this.getRoundedSquare = function(b, c, d, f, g, h) {
        if ("INSIDE" == h) {
            var k = Math.getElementPolygon(b.x + b.width / 2, b.y + b.height / 2, b.width, b.height, g);
            h = k[3];
            for (var p = k[2], m = k[1], k = k[0], s = e.getDimensions(), s = Math.getElementPolygon(s.x, s.y, s.width, s.height, s.rotation), u = !0, u = 0; u < s.length; u++) {
                var n = s[u];
                0 < Math.triangleArea(h, p, n) || 0 < Math.triangleArea(p, m, n) || 0 < Math.triangleArea(m, k, n) || 0 < Math.triangleArea(k, h, n) || Math.distance(h, n) < c || Math.distance(p, n) < c || Math.distance(m, n) < c || Math.distance(k, n);
            }
            b = w.rect(b.x, b.y, b.width, b.height, c).attr({
                fill: "transparent",
                stroke: "#fe199d"
            });
            b.transform("r" + g + "...");
            u = b.isPointInside(d, f);
            b.remove();
            return u;
        }
        if ("UI" == h) {
            return b = w.rect(b.x, b.y, b.width, b.height, c).attr({
                fill: "transparent",
                stroke: "#fe199d"
            }), b.transform("r" + g + "..."), b;
        }
    };
    this.rotateDesign = function(b) {
        g();
        p.selectAll();
        p.getSelections().length || (b = p.getSelections().rotation + b);
        this.updateElement(D.x, D.y, b, D.width, D.height, "rotate");
        e.hide();
        p.hide();
        k();
    };
    this.getNormalSquare = function(b, c, e, d, f, g, h, k, p) {
        if ("INSIDE" == g) {
            var m = Math.getElementPolygon(b.x + b.width / 2, b.y + b.height / 2, b.width, b.height, f);
            f = m[3];
            c = m[2];
            g = m[1];
            m = m[0];
            d = Math.getElementPolygon(e, d, h, k, p);
            e = {
                value: !0,
                nodesOutside: [0, 0, 0, 0],
                nodesinside: [0, 0, 0, 0]
            };
            for (h = 0; h < d.length; h++) {
                if (k = d[h], 0 < Math.triangleArea(f, c, k) || 0 < Math.triangleArea(c, g, k) || 0 < Math.triangleArea(g, m, k) || 0 < Math.triangleArea(m, f, k)) {
                    e.value = !1, e.nodesOutside[h] = {
                        x: k.x,
                        y: k.y,
                        index: h
                    };
                }
            }
            if (!e.value) {
                d = Math.getElementPolygon(b.x + b.width / 2, b.y + b.height / 2, b.width, b.height, qa + 1E-5);
                b = [];
                for (f = 0; 4 > f; f += 1) {
                    b.push(d[f]);
                }
                c = [];
                for (f = 0; f < b.length - 1; f++) {
                    g = (b[f].y - b[f + 1].y) / (b[f].x - b[f + 1].x), d = 1 / -g, c.push({
                        p1: b[f],
                        p2: b[f + 1],
                        m: g,
                        invM: d
                    });
                }
                g = (b[0].y - b[b.length - 1].y) / (b[0].x - b[b.length - 1].x);
                c.push({
                    p1: b[0],
                    p2: b[b.length - 1],
                    m: g,
                    invM: 1 / -g
                });
                e.lines = c;
            }
            return e;
        }
        if ("UI" == g) {
            return b = w.rect(b.x, b.y, b.width, b.height).attr({
                fill: "transparent",
                stroke: "#fe199d"
            }), b.transform("r" + f + "..."), b;
        }
    };
    this.reportEditionForLayers = function() {
        var b = this.getSelections();
        !b || 0 == b.length || 1 < b.length || (delete b.previewHtml, eventManager.trigger("elementsSelected", b), eventManager.trigger("layersChanged"));
    };
    this.checkIsInside = function(b, c, e, d, f, g, h) {
        var k;
        wa && (k = p.getEllipse(b, c, e, d, "INSIDE", f, g, h));
        xa && (k = p.getRoundedSquare(b, ta, c, e, d, "INSIDE", f, g, h));
        wa || xa || (k = p.getNormalSquare(b, ta, c, e, d, "INSIDE", f, g, h));
        return k;
    };
    this.selectElement = function(b) {
        if (b && 0 != b.length) {
            if (1 < b.length) {
                var c = w.set();
                V = [];
                for (var d = 0; d < b.length; d++) {
                    var f = w.rect(b[d].x - b[d].width / 2, b[d].y - b[d].height / 2, b[d].width, b[d].height);
                    f.rotate(b[d].rotation);
                    c.push(f);
                    V.push({
                        x: b[d].x,
                        y: b[d].y,
                        rotation: b[d].rotation,
                        width: b[d].width,
                        height: b[d].height
                    });
                }
                d = c.getBBox(!1);
                c.remove();
                D = {
                    x: d.x + d.width / 2,
                    y: d.y + d.height / 2,
                    width: d.width,
                    height: d.height
                };
                e.update(d.x + d.width / 2, d.y + d.height / 2, d.width, d.height, 0);
            } else {
                b.length && (b = b[0]), e.update(b.x, b.y, b.width, b.height, b.rotation), eventManager.trigger("elementsSelected", b), eventManager.trigger("rasterQualityChanged", b);
            }
            y = b;
            ma && (clearInterval(na), na = setInterval(function() {
                clearInterval(na);
                aa && e.show();
            }, 20), clearInterval(na), aa && e.show());
            eventManager.trigger("elementsSelected", b);
        }
    };
    this.fireClick = function() {};
    this.translateTo = function(b, c) {
        //debugger;
        D && (p.selectAll(), this.updateElement(b, c, 0, D.width, D.height, "move"), e.hide(), p.hide());
    };
    this.translateToRelative = function(b, c) {
        p.selectAll();
        this.updateElement(D.x + b, D.y + c, 0, D.width, D.height, "");
        e.hide();
        p.hide();
    };
    this.checkBoundaries = function() {
        e.dragManual();
    };
    this.checkElementSize = function(b, c) {
        if (I || c) {
            for (var e = p.checkIsInside(R, b.x, b.y, qa + 1E-5, b.width, b.height, b.rotation); !e.value;) {
                b.prototype && (b.prototype.scaleX *= 0.99, b.prototype.scaleY *= 0.99), b.width *= 0.99, b.height *= 0.99, e = p.checkIsInside(R, b.x, b.y, qa + 1E-5, b.width, b.height, b.rotation);
            }
            y && p.selectElement(p.getSelections());
        }
    };
    this.resizeToRelative = function(b) {
        p.selectAll();
        this.updateElement(D.x, D.y, 0, D.width * b, D.height * b, "");
        e.hide();
        p.hide();
    };
    this.resizeToFixedWH = function(b, c) {
        g();
        p.selectAll();
        this.updateElement(D.x, D.y, 0, b, c, "scale");
        e.hide();
        p.hide();
        k();
    };
    this.resizeTo = function(b, c) {
        if (1 == s.length) {
            var d = b / s[0].width;
            p.selectAll();
            this.updateElement(s[0].x, s[0].y, s[0].rotation, b, s[0].height * d, "scale");
            e.hide();
        } else {
            p.selectAll(), d = D.height / c, d = D.width / d, d > b ? (e.hide(), p.resizeToWidth(b)) : (this.updateElement(D.x, D.y, 0, d, c, "scale"), e.hide()), p.hide();
        }
    };
    this.resizeToWidth = function(b) {
        p.selectAll();
        this.updateElement(D.x, D.y, 0, b, D.height / (D.width / b), "scale");
        e.hide();
        p.hide();
    };
    this.resizeToHeight = function(b) {
        p.selectAll();
        this.updateElement(D.x, D.y, 0, D.width / (D.height / b), b, "scale");
        e.hide();
    };
    this.getDesignRectangle = function(b, c, e, d) {
        var f = d ? d : s;
        if (f.length) {
            d = w.set();
            for (var g = 0; g < f.length; g++) {
                var h = {
                    x: f[g].x - f[g].width / 2,
                    y: f[g].y - f[g].height / 2,
                    width: f[g].width,
                    height: f[g].height
                };
                f[g].constructor === ui.text.TextElement && 0 != f[g].arching && (h.width += 2 * f[g].stroke * f[g].strokeScale, h.height += 2 * f[g].stroke * f[g].strokeScale, h.x -= f[g].stroke, h.y -= f[g].stroke);
                if (f[g].constructor === ui.text.TextElement || f[g].constructor === ui.svg.SvgElement) {
                    f[g].getStrokeScaleX(), f[g].getStrokeScaleY();
                }
                var k = Math.getElementPolygon(s[g].x, s[g].y, s[g].width, s[g].height, s[g].rotation),
                    p = Math.getElementPolygon(R.x + R.width / 2, R.y + R.height / 2, R.width, R.height, 0);
                e && !Math.doPolygonsIntersect(k, p) || null == h || (h = w.rect(h.x, h.y, h.width, h.height), h.rotate(s[g].rotation), d.push(h));
            }
            f = d.getBBox(!1);
            e && (f.x < R.x && (f.width -= R.x - f.x, f.x = R.x, f.x1 = R.x), f.y < R.y && (f.height -= R.y - f.y, f.y = R.y), f.width > R.width && (f.width -= f.x + f.width - (R.x + R.width)), f.height > R.height && (f.height -= f.y + f.height - (R.y + R.height)));
            b && (b = Math.max(f.width, f.height) + c, c = w.rect(f.x, f.y, b, b), c.translate((f.width - b) / 2, (f.height - b) / 2), f = c.getBBox(!1), c.remove());
            d.remove();
            return {
                x: f.x,
                y: f.y,
                w: f.width,
                h: f.height
            };
        }
    };
    this.getSelections = function() {
        return y;
    };
    this.isSelected = function(b) {
        var c = !1;
        if (y && (b == y && (c = !0), 0 < y.length)) {
            for (var e = 0; e < y.length; e++) {
                y[e] == b && (c = !0);
            }
        }
        return c;
    };
    this.isMultiple = function() {
        return y && 0 < y.length ? !0 : !1;
    };
    this.selectAll = function() {
//        debugger;
        e.hide();
        y = null;
        p.selectElement(s);
    };
    this.canUpdate = function() {
        return !0;
    };
    this.reportUndo = function() {
        y && (y.length ? (console.debug(ezd.hm.enable), k()) : (console.debug(ezd.hm.enable), y.prototype.reportChange()), console.debug(ezd.hm.enable));
    };
    this.updateElement = function(b, c, e, d, f, g) {
        if (y) {
            if (0 < y.length) {
                for (f = 0; f < y.length; f++) {
                    J && (y[f].sleep = !0);
                    var h = D.width / d;
                    y[f].prototype.scaleX /= y[f].width / (V[f].width / h);
                    y[f].prototype.scaleY /= y[f].height / (V[f].height / h);
                    y[f].width = V[f].width / h;
                    y[f].height = V[f].height / h;
                    g = Math.angleTo360(V[f].rotation + e);
                    y[f].rotation = g;
                    g = -(D.x - V[f].x) / h;
                    var k = -(D.y - V[f].y) / h,
                        p = (360 - e) / 180 * Math.PI,
                        h = b + (g * Math.cos(p) + k * Math.sin(p));
                    g = c + (-(g * Math.sin(p)) + k * Math.cos(p));
                    y[f].x = h;
                    y[f].y = g;
                    J && y[f].forceUpdate();
                }
            } else {
                J && (y.sleep = !0), "rotate" == g && (y.rotation = e), "move" == g && (y.x = b, y.y = c), "scale" == g && (y.prototype.scaleX /= y.width / d, y.prototype.scaleY /= y.height / f, y.width = d, y.height = f), J && (y.sleep = !1, y.forceUpdate(g));
            }
            eventManager.trigger("designLiveEdition");
        }
    };
    this.removeChildAt = function(b) {
        -1 != b && b < s.length && 0 <= b && (s[b].remove(), s.splice(b, 1));
        f();
    };
    this.removeChild = function(b) {
        console.log("删除子节点");
        for (var c = 0; c < s.length; c++) {
            b.id == s[c].id && (s[c].remove(), s.splice(c, 1));
        }
        f();
    };
    this.removeSelection = function() {
        ezd.deleteElements(y);
    };
    this.setChildIndex = function(b, c) {
        for (var e = !1, d = -1, g = 0; g < s.length; g++) {
            b.getNode() == s[g].getNode() && (d = g);
        } - 1 != d && c < s.length && 0 <= c && (e = s[d], s.splice(d, 1), s.splice(c, 0, e), e = !0, s[c].z = c);
        f();
        eventManager.trigger("stackingOrderChanged");
        return e;
    };
    this.getChildIndex = function(b) {
        for (var c = -1, e = 0; e < s.length; e++) {
            b.getNode() == s[e].getNode() && (c = e);
        }
        return c;
    };
    this.getChildrenById = function(b) {
        for (var c = null, e = 0; e < s.length; e++) {
            b == s[e].id && (c = s[e]);
        }
        return c;
    };
    this.swapChildIndex = function(b, c) {
        for (var e = -1, d = -1, g = 0; g < s.length; g++) {
            b.getNode() == s[g].getNode() && (e = g), c.getNode() == s[g].getNode() && (d = g);
        } - 1 != e && -1 != d && (g = s[e], s[e] = s[d], s[d] = g, f());
    };
    this.removeSnapScreen = function() {
        ka && ka.remove();
    };
    this.snapToCenterMultiple = function() {
        if (0 < y.length) {
            g();
            p.selectElement(y);
            for (var b = D.x - (R.x + R.width / 2), c = 0; c < y.length; c++) {
                y[c].x -= b;
            }
            k();
        }
    };
    this.flipHMultiple = function() {
        if (0 < y.length) {
            g();
            p.selectElement(y);
            for (var b = 0; b < y.length; b++) {
                y[b].flipH = y[b].flipH ? 0 : 1, y[b].x = y[b].x > D.x ? D.x - (y[b].x - D.x) : D.x + (D.x - y[b].x), V[b].x = y[b].x;
            }
            k();
        }
    };
    this.flipVMultiple = function() {
        if (0 < y.length) {
            g();
            p.selectElement(y);
            for (var b = 0; b < y.length; b++) {
                y[b].flipV = y[b].flipV ? 0 : 1, y[b].y = y[b].y > D.y ? D.y - (y[b].y - D.y) : D.y + (D.y - y[b].y), V[b].y = y[b].y;
            }
            k();
        }
    };
    this.copyElement = function() {
        ezd._copiedElements = ezd.copySelection(!0);
        ezd._forCopySelection = y;
    };
    this.pasteElement = function() {
        ezd.copySelection(!1, ezd._forCopySelection);
    };
    this.showRegion = function() {
        va && (1 == ezd.zoom ? (la = !0, p.region = p.region) : (la = !1, p.hideRegion()));
    };
    this.hideRegion = function() {
        X && q();
    };
    this.getRegionCenter = function() {
        return R ? {
            x: R.x + R.width / 2,
            y: R.y + R.height / 2
        } : {
            x: 0,
            y: 0
        };
    };
    this.hide = function() {
//        debugger;
        e.hide();
        y = null;
    };
    this.showPopup = function() {
        p._popup.show({
            pageX: A,
            pageY: G
        });
    };
    this.init = function() {
        e || (e = new container.BoundingBox(w, p, c));
        I = ezdVars.EnforceBoundaries;
        $("#" + u).mousemove(function(b, c, e) {
            oa++;
            ca = (-1 + b.pageX - $("#" + u).offset().left) * B + v;
            M = (-1 + b.pageY - $("#" + u).offset().top) * B + x;
            A = b.pageX;
            G = b.pageY;
            ja = !0;
            W && W.remove();
            fa && (b = Math.sortedRectangle(H, Q, ca, M), W = w.rect(b.x1, b.y1, b.x2, b.y2).attr({
                "stroke-width": Math.min(1, 1 * B)
            }), da = {
                x: b.x1 + b.x2 / 2,
                y: b.y1 + b.y2 / 2,
                width: b.x2,
                height: b.y2,
                rotation: 0
            });
        });
        $("#" + u).mousedown(function(b, c, d) {
            if (aa) {
                ja = !1;
                F = b.target;
                p._popup.hide();
                c = b.target.parentNode;
                for (console.log("0", c.localName);
                     "g" == c.localName;) {
                    c = c.parentNode, console.log("1", c.localName);
                }
                "svg" != c.localName || "vml" == c.localName ? (console.log("2", c.localName), e.hide(), y = null, H = ca, Q = M, fa = !1, W && W.remove(), fa = !0) : "BoundingBox" != b.target.id && "BoundingBoxRect" != b.target.id && "designGroup1" != b.target.id && (console.log("3", c.localName), p.removeSnapScreen(), fa = !1, da = {
                    x: ca,
                    y: M,
                    width: 1,
                    height: 1,
                    rotation: 0
                }, h(!0, b));
            }
        });
        $("#" + u).mouseup(function(b, c, d) {
            aa && (e && e.stopDragEvent(), 3 != b.which && (c = b.target.parentNode, "BoundingBoxRect" != b.target.id || b.target != F || ja || (e.hide(), setTimeout(function() {
                $(document.elementFromPoint(b.clientX, b.clientY)).mousedown();
                $(document.elementFromPoint(b.clientX, b.clientY)).mouseup();
            }, 20)), "g" == c.localName && (c = c.parentNode), fa = !1, da && h()));
        });

        ka = new container.snap.SnapScreen(w, p);
        m(p);
        eventManager.on("checkInsideRegion", p.checkElementSize);
    };
    p.init();
    this.getElementUnderMouse = function() {};
    Object.defineProperty(this, "showBB", {
        set: function(b) {
            (ma = b) || e.hide();
        },
        get: function() {
            return ma;
        }
    });
    Object.defineProperty(this, "visibleRegion", {
        set: function(b) {
            (la = b) ? X || (X && q(), R && n()) : X && q();
        },
        get: function() {
            return la;
        }
    });
    Object.defineProperty(this, "elements", {
        set: function(b) {
            s = b;
            for (b = 0; b < s.length; b++) {}
            s.sort(function(b, c) {
                return b.z - c.z;
            });
            for (b = 0; b < s.length; b++) {}
            f();
            e.hide();
            y = null;
        },
        get: function() {
            return s;
        }
    });
    Object.defineProperty(this, "region", {
        set: function(b) {
            R = b;
            la && (X && q(), R && n());
        },
        get: function() {
            return R;
        }
    });
    Object.defineProperty(this, "mouseX", {
        set: function(b) {
            ca = b;
        },
        get: function() {
            return ca;
        }
    });
    Object.defineProperty(this, "mouseY", {
        set: function(b) {
            M = b;
        },
        get: function() {
            return M;
        }
    });
    Object.defineProperty(this, "enforceBoundaries", {
        set: function(b) {
            I = b;
        },
        get: function() {
            return I;
        }
    });
    Object.defineProperty(this, "snapToAngle", {
        set: function(b) {
            P = b;
        },
        get: function() {
            return P;
        }
    });
    Object.defineProperty(this, "snapAngleTolerance", {
        set: function(b) {
            Z = b;
        },
        get: function() {
            return Z;
        }
    });
    Object.defineProperty(this, "snapToMidPoint", {
        set: function(b) {
            O = b;
        },
        get: function() {
            return O;
        }
    });
    Object.defineProperty(this, "snapMidPointTolerance", {
        set: function(b) {
            L = b;
        },
        get: function() {
            return L;
        }
    });
    Object.defineProperty(this, "snapToObject", {
        set: function(b) {
            N = b;
        },
        get: function() {
            return N;
        }
    });
    Object.defineProperty(this, "snapObjectTolerance", {
        set: function(b) {
            L = b;
        },
        get: function() {
            return 3;
        }
    });
    Object.defineProperty(this, "snapScreen", {
        get: function() {
            return ka;
        }
    });
    Object.defineProperty(this, "checkNonVisibleElements", {
        set: function(b) {
            T = b;
        },
        get: function() {
            return T;
        }
    });
    Object.defineProperty(this, "snapToRegion", {
        set: function(b) {
            U = b;
        },
        get: function() {
            return U;
        }
    });
    Object.defineProperty(this, "snapRegionTolerance", {
        set: function(b) {
            K = b;
        },
        get: function() {
            return K;
        }
    });
    Object.defineProperty(this, "performance", {
        set: function(b) {
            J = b;
        },
        get: function() {
            return J;
        }
    });
    Object.defineProperty(this, "showElementsWhileTransform", {
        set: function(b) {
            E = b;
        },
        get: function() {
            return E;
        }
    });
    Object.defineProperty(this, "skipFramesPerformance", {
        set: function(b) {
            S = b;
        },
        get: function() {
            return S;
        }
    });
    Object.defineProperty(this, "updateMaxDelay", {
        set: function(b) {
            z = b;
        },
        get: function() {
            return z;
        }
    });
    Object.defineProperty(this, "contextMenu", {
        set: r,
        get: t
    });
    Object.defineProperty(this, "xOffset", {
        set: function(b) {
            v = b;
        },
        get: function() {
            return v;
        }
    });
    Object.defineProperty(this, "popup", {
        get: function() {}
    });
    Object.defineProperty(this, "yOffset", {
        set: function(b) {
            x = b;
        },
        get: function() {
            return x;
        }
    });
    Object.defineProperty(this, "zoomScale", {
        set: function(b) {
            B = b;
            for (b = 0; b < s.length; b++) {
                s[b].strokeScale = B;
            }
            p.getSelections() && p.selectElement(p.getSelections());
        },
        get: function() {
            return B;
        }
    });
    Object.defineProperty(this, "contextMenu", {
        get: t,
        set: r
    });
    Object.defineProperty(this, "regionAngle", {
        get: function() {
            return qa;
        },
        set: function(b) {
            qa = b;
        }
    });
    Object.defineProperty(this, "oval", {
        get: function() {
            return wa;
        },
        set: function(b) {
            wa = b;
        }
    });
    Object.defineProperty(this, "mouseEnabled", {
        get: function() {
            return aa;
        },
        set: function(b) {
            aa = b;
            e.hide();
        }
    });
    Object.defineProperty(this, "enableRegionBorder", {
        get: function() {
            return va;
        },
        set: function(b) {
            va = b;
            X && !1 == b && q();
        }
    });
};

container.BoundingBox = function(b, d, c) {
    function g(b) {
        clearInterval(va);
        va = setInterval(function() {}, 30);
    }

    function k(b) {
        clearInterval(va);
    }

    function h(b) {}

    function f() {
        F.removeSelection();
    }

    function m() {
        F.showPopup();
    }

    function q(b, c, e) {
        b *= F.zoomScale;
        c *= F.zoomScale;
        b = I.x + G / 2 + b;
        c = I.y + H / 2 + c;
        var d = {
            x: b,
            y: c
        };
        !0 != e && (e = {
            x: b,
            y: c
        }, F.snapToRegion && (e = Math.checkSnapToRegion({
            x: b,
            y: c
        }, F.region, G, H, Q, F.zoomScale, F.snapRegionTolerance), 0 < e.lines.length && F.snapScreen.drawRegionLines(e.lines, "#0000FF")), F.snapToMidPoint && (e = Math.checkSnapToMidPoint({
            x: e.x,
            y: e.y
        }, F, G, H, Q, F.zoomScale, F.snapMidPointTolerance), 0 < e.lines.length && F.snapScreen.drawLines(e.lines)), F.snapToObject && (e = Math.checkSnapToObject({
            x: e.x,
            y: e.y
        }, F, G, H, Q, F.zoomScale, F.snapMidPointTolerance),
            0 < e.lines.length && F.snapScreen.drawLines(e.lines)), d = e);
        b == d.x && c == d.y && F.snapScreen.removeLines();
        F.enforceBoundaries && (d = n(d.x, d.y));
        M = d.x;
        A = d.y;
        I.rotate(-Q);
        I.attr({
            x: M - G / 2,
            y: A - H / 2
        });
        !0 == F.showElementsWhileTransform && F.canUpdate() && F.updateElement(M, A, Q, G, H, "move");
        I.rotate(Q);
        D();
        V("drag");
        F.showRegion();
    }

    function n(b, c) {
        for (var e = {
            x: b,
            y: c
        }, d = Math.getElementPolygon(e.x, e.y, G, H, Q), f = [0, 0, 0, 0], g = 0; g < d.length; g++) {
            var h = d[g].x,
                k = d[g].y,
                p = (d[0].x + d[2].x) / 2,
                m = (d[0].y + d[2].y) / 2;
            h > F.region.width && F.region.width - (-p + h) < e.x && (e.x = F.region.width - (-p + h), f[g] = 1);
            0 > h && 0 - (-p + h) > e.x && (e.x = 0 - (-p + h), f[g] = 1);
            k > F.region.height && F.region.height - (-m + k) < e.y && (e.y = F.region.height - (-m + k), f[g] = 1);
            0 > k && 0 - (-m + k) > e.y && (e.y = 0 - (-m + k), f[g] = 1);
        }
        e.s = f;
        return e;
    }

    function r(b) {
        F.showRegion();
        F.getElementUnderMouse();
        I.x = I[0].attr("x");
        I.y = I[0].attr("y");
        V("drag");
        B(!1);
    }

    function t() {
        !1 != F.showElementsWhileTransform && !0 != F.skipFramesPerformance || F.updateElement(M, A, Q, G, H, "move");
        F.reportUndo();
        //F.hideRegion();
        F.removeSnapScreen();
        y(F.isMultiple());
        D();
        V("normal");
    }

    function p(b, c) {
        F.showRegion();
        var e = -oa + Math.round(Math.angleBetweenPoints(F.mouseX, F.mouseY, M, A)),
            e = Math.angleTo360(e);
        F.snapToAngle && (e = Math.snapAngle(e, 1 * F.snapAngleTolerance));
        Q = e;
        I.transform("R0");
        !0 == F.showElementsWhileTransform && F.canUpdate() && F.updateElement(M, A, Q, G, H, "rotate");
        I.transform("r" + Q + "," + M + "," + A + "...");
        F.enforceBoundaries && (e = n(M, A), e.x != M || e.y != A) && (M = e.x, A = e.y, I.rotate(-Q), I.attr({
            x: M - G / 2,
            y: A - H / 2
        }), I[0].attr({
            x: M - G / 2,
            y: A - H / 2
        }), I[1].attr({
            x: M - G / 2,
            y: A - H / 2
        }), !0 == F.showElementsWhileTransform && F.canUpdate() && F.updateElement(M, A, Q, G, H, "move"), I.rotate(Q), D(), V("normal"), 1 == e.s[0] && 1 == e.s[2] || 1 == e.s[1] && 1 == e.s[3]) && (G *= 0.9, H *= 0.9, I.transform("R0"), I.attr({
            width: G,
            height: H
        }), I.attr({
            x: M - G / 2,
            y: A - H / 2
        }), !0 == F.showElementsWhileTransform && F.canUpdate() && F.updateElement(M, A, Q, G, H, "scale"), I.transform("r" + Q + "," + M + "," + A + "t0,0..."));
        D();
    }

    function e() {
        var b = Q / 180 * Math.PI,
            c = M + (0 * Math.cos(b) + 0 * Math.sin(b)),
            b = A - (-(0 * Math.sin(b)) + 0 * Math.cos(b));
        oa = Math.abs(360 - Q) + 180 * Math.atan2(F.mouseY - b, F.mouseX - c) / Math.PI;
        D();
    }

    function u() {
        F.hideRegion();
        (!1 == F.showElementsWhileTransform || F.skipFramesPerformance) && F.updateElement(M, A, Q, G, H, "rotate");
        F.reportUndo();
        F.reportEditionForLayers();
    }

    function s(b, c) {
        if (ka) {
            F.showRegion();
            b *= F.zoomScale;
            c *= F.zoomScale;
            var e = Math.getRotatedPoint(b, c, Q, 0, 0),
                d = e.x,
                f = -e.y;
            if (this == N || this == U) {
                d = -e.x, f = e.y;
            }
            this == T && (f = -f);
            this == K && (d = -d);
            z && (f = d * na);
            if (da + 2 * d < 2 * F.zoomScale || W + 2 * f < 2 * F.zoomScale) {
                return;
            }
            G = da + 2 * d;
            H = W + 2 * f;
            if (this == L || this == T) {
                G = da, d = 0;
            }
            if (this == K || this == J) {
                H = W, f = 0;
            }
            I.transform("R0");
            I.attr({
                width: G,
                height: H
            });
            I.attr({
                x: fa - da / 2 - d,
                y: ja - W / 2 - f
            });
            !0 == F.showElementsWhileTransform && F.canUpdate() && F.updateElement(fa, ja, Q, G, H, "scale");
            I.transform("r" + Q + "," + M + "," + A + "t0,0...");
        }
        if (F.enforceBoundaries) {
            e = n(M, A);
            if (1 == e.s[0] && 1 == e.s[2] || 1 == e.s[1] && 1 == e.s[3]) {
                for (e = n(M, A); 1 == e.s[0] && 1 == e.s[2] || 1 == e.s[1] && 1 == e.s[3];) {
                    G *= 0.99, H *= 0.99, e = n(M, A);
                }
                fa = M;
                ja = A;
                _nDy = _nDx = 0;
                I.transform("R0");
                I.attr({
                    width: G,
                    height: H
                });
                I.attr({
                    x: M - G / 2,
                    y: A - H / 2
                });
                !0 == F.showElementsWhileTransform && F.canUpdate() && F.updateElement(M, A, Q, G, H, "scale");
                I.transform("r" + Q + "," + M + "," + A + "t0,0...");
                ka = !1;
                I.rotate(-Q);
                I.attr({
                    x: M - G / 2,
                    y: A - H / 2
                });
                !0 == F.showElementsWhileTransform && F.canUpdate() && F.updateElement(M, A, Q, G, H, "move");
                I.rotate(Q);
                return;
            }
            ka = !0;
            if (e.x != M || e.y != A) {
                M = e.x, A = e.y, fa = M, ja = A, _nDy = _nDx = 0, I.transform("R0"), I.attr({
                    width: G,
                    height: H
                }), I.attr({
                    x: M - G / 2,
                    y: A - H / 2
                }), I.transform("r" + Q + "," + M + "," + A + "t0,0..."), !0 == F.showElementsWhileTransform && F.canUpdate() && F.updateElement(M, A, Q, G, H, "move");
            }
        }
        D();
    }

    function w() {
        this == O || this == N || this == U || this == Z ? (z = !0, na = H / G) : z = !1;
        this.x = this.attr("x");
        this.y = this.attr("y");
        da = G;
        W = H;
        fa = M;
        ja = A;
    }

    function v() {
        F.hideRegion();
        (!1 == F.showElementsWhileTransform || F.skipFramesPerformance) && F.updateElement(fa, ja, Q, G, H, "scale");
        F.reportUndo();
        F.reportEditionForLayers();
    }

    function x(b) {
        return state && state.theme ? state.theme.url(b) : b;
    }

    function B(b) {
        !1 != b && I && I.hide();
        P && P.hide();
        O && (O.hide(), N.hide(), U.hide(), Z.hide());
        L && (L.hide(), K.hide(), T.hide(), J.hide());
        E && E.hide();
        ea && ea.hide();
    }

    function y(b) {
        P && (P.show(), P.toFront());
        O && (O.show(), N.show(), U.show(), Z.show(), O.toFront(), N.toFront(), U.toFront(), Z.toFront());
        L && !1 == b && (L.show(), K.show(), T.show(), J.show(), L.toFront(), K.toFront(), T.toFront(), J.toFront());
        E && (E.show(), E.toFront());
        ea && (ea.show(), ea.toFront());
    }

    function D(b) {
        b = R * F.zoomScale;
        var c = X * F.zoomScale,
            e = c / 3,
            d = la * F.zoomScale,
            f = ma * F.zoomScale;
        b = [{
            btn: ea,
            x: G / 2 + b / 2,
            y: -(H / 2) - 1.5 * b
        }, {
            btn: E,
            x: -(G / 2) - 1.5 * b,
            y: -(H / 2) - 1.5 * b
        }, {
            btn: O,
            x: G / 2 - c / 2 + e,
            y: H / 2 - c / 2 + e
        }, {
            btn: N,
            x: -(G / 2) - c / 2 - e,
            y: H / 2 - c / 2 + e
        }, {
            btn: U,
            x: -(G / 2) - c / 2 - e,
            y: -(H / 2) - c / 2 - e
        }, {
            btn: Z,
            x: G / 2 - c / 2 + e,
            y: -(H / 2) - c / 2 - e
        }, {
            btn: L,
            x: 0 - d / 2,
            y: H / 2
        }, {
            btn: K,
            x: -(G / 2) - d,
            y: 0 - d / 2
        }, {
            btn: T,
            x: 0 - d / 2,
            y: -(H / 2) - d
        }, {
            btn: J,
            x: G / 2,
            y: 0 - d / 2
        }, {
            btn: P,
            x: -(f / 2),
            y: -(H / 2) - 1.8 *
                f
        }, {
            btn: S,
            x: -(G / 2) - b,
            y: H / 2
        }];
        for (c = 0; c < b.length; c++) {
            var e = b[c].btn,
                d = M + b[c].x,
                f = A + b[c].y,
                g = F.zoomScale;
            e && (e.transform("R0"), e.transform("r" + Q + "," + M + "," + A + "t" + d + "," + f + "...s" + g + "," + g + ",0,0"));
        }
    }

    function V(b) {
        if (I) {
            I[0].attr({
                fill: "#000000",
                "fill-opacity": 0
            });
            I[1].attr({
                fill: "#000000",
                "fill-opacity": 0
            });
            var c = I[0].node,
                e = I[1].node;
            c.setAttribute("class", "whiteLineClass");
            e.setAttribute("class", "dashedLineClass");
            void 0 === document.documentElement.style.vectorEffect ? (c = 2 * F.zoomScale, e = 5 * F.zoomScale) : (c.setAttribute("vector-effect", "non-scaling-stroke"), e.setAttribute("vector-effect", "non-scaling-stroke"), c = 2, e = 5);
            $(".whiteLineClass").attr("stroke", "#ffffff");
            $(".whiteLineClass").attr("stroke-width", c);
            $(".dashedLineClass").attr("stroke", "#000000");
            $(".dashedLineClass").attr("stroke-width", c / 2);
            c = e + "," + e;
            $(".dashedLineClass").attr("stroke-dasharray", c);
            "drag" === b && ($(".whiteLineClass").attr("stroke", "none"), $(".dashedLineClass").attr("stroke", "#4267c7"));
        }
    }
    var ca = this,
        M, A, G, H, Q, da, W, fa, ja, F, I, P, O, N, U, Z, L, K, T, J, E, S, ea, oa, z = !0,
        ka = !0,
        R = 24,
        X = 15,
        la = 9,
        ma = 26,
        aa = b.set(),
        na, va;
    this.init = function() {
        F = d;
        eventManager.on("checkBoundaries", ca.forceBoundaries);
    };
    this.update = function(b, c, e, d, f) {
        M = b;
        A = c;
        G = e;
        H = d;
        Q = f;
    };
    this.updateUIScale = function() {
        V("normal");
    };
    this.hide = function() {
        console.log("调用 this.hide()");
        if(I){
            B(!0);
            if(F.snapScreen){
                console.log(1);
                d.snapScreen.remove();
            }
        }else{
            B(!1)
        };
    };
    this.getDimensions = function() {
        return {
            x: M,
            y: A,
            width: G,
            height: H,
            rotation: Q
        };
    };
    this.reset = function() {
        I && (console.log("删除正方形"), I.undrag(), I.remove(), I = null);
        P && (P.undrag(), P.remove(), P = null);
        O && (O.undrag(), N.undrag(), U.undrag(), Z.undrag(), O.remove(), N.remove(), U.remove(), Z.remove(), Z = U = N = O = null);
        L && (L.undrag(), K.undrag(), T.undrag(), J.undrag(), L.remove(), K.remove(), T.remove(), J.remove(), J = T = K = L = null);
        O && (O.remove(), N.remove(), U.remove(), Z.remove(), Z = U = N = O = null);
        L && (L.remove(), K.remove(), T.remove(), J.remove(), J = T = K = L = null);
        E && (E.unclick(f), E.remove(), E = null);
        ea && (ea.unclick(m), ea.remove(), ea = null);
    };
    this.show = function() {
        z = !0;
        if (!I) {
            aa = b.set();
            var c = b.rectBb(M - G / 2, A - H / 2, G, H),
                d = b.rectBb(M - G / 2, A - H / 2, G, H);
            aa.push(c);
            aa.push(d);
            aa[0].node.id = "BoundingBoxRect";
            aa[1].node.id = "BoundingBoxRect";
            I = aa;
            c = F.isMultiple();
            O = b.imageBb(x(ezdVars.DesignerLocation + "/ds/images/grasp_11px.png"), 0, 0, X, X);
            N = b.imageBb(x(ezdVars.DesignerLocation + "/ds/images/grasp_11px.png"), 0, 0, X, X);
            U = b.imageBb(x(ezdVars.DesignerLocation + "/ds/images/grasp_11px.png"), 0, 0, X, X);
            Z = b.imageBb(x(ezdVars.DesignerLocation + "/ds/images/grasp_11px.png"), 0, 0, X, X);
            O.node.id = "BoundingBox";
            N.node.id = "BoundingBox";
            U.node.id = "BoundingBox";
            Z.node.id = "BoundingBox";
            L = b.imageBb(x(ezdVars.DesignerLocation + "/ds/images/grasp_8.5px.png"), 0, 0, la, la);
            K = b.imageBb(x(ezdVars.DesignerLocation + "/ds/images/grasp_8.5px.png"), 0, 0, la, la);
            T = b.imageBb(x(ezdVars.DesignerLocation + "/ds/images/grasp_8.5px.png"), 0, 0, la, la);
            J = b.imageBb(x(ezdVars.DesignerLocation + "/ds/images/grasp_8.5px.png"), 0, 0, la, la);
            L.node.id = "BoundingBox";
            K.node.id = "BoundingBox";
            T.node.id = "BoundingBox";
            J.node.id = "BoundingBox";
            c || (L.hide(), K.hide(), T.hide(), J.hide());
            O && (O.drag(s, w, v), N.drag(s, w, v), U.drag(s, w, v), Z.drag(s, w, v));
            L && (L.drag(s, w, v), K.drag(s, w, v), T.drag(s, w, v), J.drag(s, w, v));
            E = b.imageBb(x(ezdVars.DesignerLocation + "/ds/images/delete.png"), 0, 0, R, R);
            E.node.id = "BoundingBox";
            E.click(f);
            ea = b.imageBb(x(ezdVars.DesignerLocation + "/ds/images/tools.png"), 0, 0, R, R);
            ea.node.id = "BoundingBox";
            ea.click(m);
            P = b.imageBb(x(ezdVars.DesignerLocation + "/ds/images/rotate-tall.png"), 0, 0, ma, 1.5 * ma);
            P.node.id = "BoundingBox";
            P.drag(p, e, u);
            I.drag(q, r, t);
            I.mousedown(g);
            I.mouseup(k);
            I.mousemove(h);
        }
        I.show();
        I.x = I[0].attr("x");
        I.y = I[0].attr("y");
        I.rotate(Q);
        y(F.isMultiple());
        D();
        V("normal");
        I.transform("R0");
        I.attr({
            width: G,
            height: H
        });
        I.attr({
            x: M - G / 2,
            y: A - H / 2
        });
        I.transform("r" + Q + "," + M + "," + A + "t0,0...");
        I.toFront();
    };
    this.stopDragEvent = function() {};
    this.dragManual = function() {
        I && (F.getElementUnderMouse(), I.x = I[0].attr("x"), I.y = I[0].attr("y"));
        q(0, 0, !0);
    };
    this.forceBoundaries = function() {
        if (F.enforceBoundaries && I) {
            F.getElementUnderMouse();
            I.x = I[0].attr("x");
            I.y = I[0].attr("y");
            V("normal");
            z = !0;
            na = H / G;
            da = G;
            W = H;
            fa = M;
            ja = A;
            for (var b = I.getBBox(); b.width - b.x > F.region.width || b.height - b.y > F.region.height;) {
                b = I.getBBox(), G *= 0.98, H *= 0.98, I.transform("R0"), I.attr({
                    width: G,
                    height: H
                }), I.attr({
                    x: M - G / 2,
                    y: A - H / 2
                }), !0 == F.showElementsWhileTransform && F.canUpdate() && F.updateElement(M, A, Q, G, H, "scale"), I.transform("r" + Q + "," + M + "," + A + "t0,0...");
            }
            ca.dragManual();
            I.attr({
                width: G,
                height: H
            });
        }
    };
    ca.init();
};
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
(function(b) {
    var d = /[\.\/]/,
        c = function() {}, g = function(b, c) {
            return b - c;
        }, k, h, f = {
            n: {}
        }, m = function(b, c) {
            b = String(b);
            var d = h,
                f = Array.prototype.slice.call(arguments, 2),
                p = m.listeners(b),
                e = 0,
                u, s = [],
                w = {}, v = [],
                x = k;
            k = b;
            for (var B = h = 0, y = p.length; B < y; B++) {
                "zIndex" in p[B] && (s.push(p[B].zIndex), 0 > p[B].zIndex && (w[p[B].zIndex] = p[B]));
            }
            for (s.sort(g); 0 > s[e];) {
                if (u = w[s[e++]], v.push(u.apply(c, f)), h) {
                    return h = d, v;
                }
            }
            for (B = 0; B < y; B++) {
                if (u = p[B], "zIndex" in u) {
                    if (u.zIndex == s[e]) {
                        v.push(u.apply(c, f));
                        if (h) {
                            break;
                        }
                        do {
                            if (e++, (u = w[s[e]]) && v.push(u.apply(c, f)), h) {
                                break;
                            }
                        } while (u);
                    } else {
                        w[u.zIndex] = u;
                    }
                } else {
                    if (v.push(u.apply(c, f)), h) {
                        break;
                    }
                }
            }
            h = d;
            k = x;
            return v.length ? v : null;
        };
    m._events = f;
    m.listeners = function(b) {
        b = b.split(d);
        var c = f,
            g, h, k, e, m, s, w, v = [c],
            x = [];
        k = 0;
        for (e = b.length; k < e; k++) {
            w = [];
            m = 0;
            for (s = v.length; m < s; m++) {
                for (c = v[m].n, g = [c[b[k]], c["*"]], h = 2; h--;) {
                    if (c = g[h]) {
                        w.push(c), x = x.concat(c.f || []);
                    }
                }
            }
            v = w;
        }
        return x;
    };
    m.on = function(b, g) {
        b = String(b);
        if ("function" != typeof g) {
            return function() {};
        }
        for (var h = b.split(d), k = f, p = 0, e = h.length; p < e; p++) {
            k = k.n, k = k.hasOwnProperty(h[p]) && k[h[p]] || (k[h[p]] = {
                n: {}
            });
        }
        k.f = k.f || [];
        p = 0;
        for (e = k.f.length; p < e; p++) {
            if (k.f[p] == g) {
                return c;
            }
        }
        k.f.push(g);
        return function(b) {
            +b == +b && (g.zIndex = +b);
        };
    };
    m.f = function(b) {
        var c = [].slice.call(arguments, 1);
        return function() {
            m.apply(null, [b, null].concat(c).concat([].slice.call(arguments, 0)));
        };
    };
    m.stop = function() {
        h = 1;
    };
    m.nt = function(b) {
        return b ? RegExp("(?:\\.|\\/|^)" + b + "(?:\\.|\\/|$)").test(k) : k;
    };
    m.nts = function() {
        return k.split(d);
    };
    m.off = m.unbind = function(b, c) {
        if (b) {
            var g = b.split(d),
                h, k, e, u, s, w, v = [f];
            u = 0;
            for (s = g.length; u < s; u++) {
                for (w = 0; w < v.length; w += e.length - 2) {
                    e = [w, 1];
                    h = v[w].n;
                    if ("*" != g[u]) {
                        h[g[u]] && e.push(h[g[u]]);
                    } else {
                        for (k in h) {
                            h.hasOwnProperty(k) && e.push(h[k]);
                        }
                    }
                    v.splice.apply(v, e);
                }
            }
            u = 0;
            for (s = v.length; u < s; u++) {
                for (h = v[u]; h.n;) {
                    if (c) {
                        if (h.f) {
                            w = 0;
                            for (g = h.f.length; w < g; w++) {
                                if (h.f[w] == c) {
                                    h.f.splice(w, 1);
                                    break;
                                }
                            }!h.f.length && delete h.f;
                        }
                        for (k in h.n) {
                            if (h.n.hasOwnProperty(k) && h.n[k].f) {
                                e = h.n[k].f;
                                w = 0;
                                for (g = e.length; w < g; w++) {
                                    if (e[w] == c) {
                                        e.splice(w, 1);
                                        break;
                                    }
                                }!e.length && delete h.n[k].f;
                            }
                        }
                    } else {
                        for (k in delete h.f, h.n) {
                            h.n.hasOwnProperty(k) && h.n[k].f && delete h.n[k].f;
                        }
                    }
                    h = h.n;
                }
            }
        } else {
            m._events = f = {
                n: {}
            };
        }
    };
    m.once = function(b, c) {
        var d = function() {
            m.unbind(b, d);
            return c.apply(this, arguments);
        };
        return m.on(b, d);
    };
    m.version = "0.4.2";
    m.toString = function() {
        return "您正在使用易衫设计工具 ";
    };
    "undefined" != typeof module && module.exports ? module.exports = m : "undefined" != typeof define ? define("eve", [], function() {
        return m;
    }) : b.eve = m;
})(this);
(function(b, d) {
    "function" === typeof define && define.amd ? define(["eve"], function(c) {
        return d(b, c);
    }) : d(b, b.eve);
})(this, function(b, d) {
    function c(b) {
        if (c.is(b, "function")) {
            return w ? b() : d.on("raphael.DOMload", b);
        }
        if (c.is(b, T)) {
            return c._engine.create[G](c, b.splice(0, 3 + c.is(b[0], K))).add(b);
        }
        var e = Array.prototype.slice.call(arguments, 0);
        if (c.is(e[e.length - 1], "function")) {
            var f = e.pop();
            return w ? f.call(c._engine.create[G](c, e)) : d.on("raphael.DOMload", function() {
                f.call(c._engine.create[G](c, e));
            });
        }
        return c._engine.create[G](c, arguments);
    }

    function g(b) {
        if (Object(b) !== b) {
            return b;
        }
        var c = new b.constructor,
            e;
        for (e in b) {
            b[y](e) && (c[e] = g(b[e]));
        }
        return c;
    }

    function k(b, c, e) {
        function d() {
            var f = Array.prototype.slice.call(arguments, 0),
                g = f.join("\u2400"),
                h = d.cache = d.cache || {}, k = d.count = d.count || [];
            if (h[y](g)) {
                a: {
                    for (var f = k, k = g, p = 0, m = f.length; p < m; p++) {
                        if (f[p] === k) {
                            f.push(f.splice(p, 1)[0]);
                            break a;
                        }
                    }
                }
                return e ? e(h[g]) : h[g];
            }
            1E3 <= k.length && delete h[k.shift()];
            k.push(g);
            h[g] = b[G](c, f);
            return e ? e(h[g]) : h[g];
        }
        return d;
    }

    function h() {
        return this.hex;
    }

    function f(b, c) {
        for (var e = [], d = 0, f = b.length; f - 2 * !c > d; d += 2) {
            var g = [{
                x: +b[d - 2],
                y: +b[d - 1]
            }, {
                x: +b[d],
                y: +b[d + 1]
            }, {
                x: +b[d + 2],
                y: +b[d + 3]
            }, {
                x: +b[d + 4],
                y: +b[d + 5]
            }];
            c ? d ? f - 4 == d ? g[3] = {
                x: +b[0],
                y: +b[1]
            } : f - 2 == d && (g[2] = {
                x: +b[0],
                y: +b[1]
            }, g[3] = {
                x: +b[2],
                y: +b[3]
            }) : g[0] = {
                x: +b[f - 2],
                y: +b[f - 1]
            } : f - 4 == d ? g[3] = g[2] : d || (g[0] = {
                x: +b[d],
                y: +b[d + 1]
            });
            e.push(["C", (-g[0].x + 6 * g[1].x + g[2].x) / 6, (-g[0].y + 6 * g[1].y + g[2].y) / 6, (g[1].x + 6 * g[2].x - g[3].x) / 6, (g[1].y + 6 * g[2].y - g[3].y) / 6, g[2].x, g[2].y]);
        }
        return e;
    }

    function m(b, c, e, d, f, g, h, k, p) {
        null == p && (p = 1);
        p = (1 < p ? 1 : 0 > p ? 0 : p) / 2;
        for (var m = [-0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699, 0.7699, -0.9041, 0.9041, -0.9816, 0.9816], s = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472], n = 0, q = 0; 12 > q; q++) {
            var u = p * m[q] + p,
                r = u * (u * (-3 * b + 9 * e - 9 * f + 3 * h) + 6 * b - 12 * e + 6 * f) - 3 * b + 3 * e,
                u = u * (u * (-3 * c + 9 * d - 9 * g + 3 * k) + 6 * c - 12 * d + 6 * g) - 3 * c + 3 * d,
                n = n + s[q] * P.sqrt(r * r + u * u)
        }
        return p * n;
    }

    function q(b, c, e, d, f, g, h, k, p) {
        if (!(0 > p || m(b, c, e, d, f, g, h, k) < p)) {
            var s = 0.5,
                n = 1 - s,
                q;
            for (q = m(b, c, e, d, f, g, h, k, n); 0.01 < U(q - p);) {
                s /= 2, n += (q < p ? 1 : -1) * s, q = m(b, c, e, d, f, g, h, k, n);
            }
            return n;
        }
    }

    function n(b, e, d) {
        b = c._path2curve(b);
        e = c._path2curve(e);
        for (var f, g, h, k, p, s, n, q, u, r, C = d ? 0 : [], x = 0, v = b.length; x < v; x++) {
            if (u = b[x], "M" == u[0]) {
                f = p = u[1], g = s = u[2];
            } else {
                "C" == u[0] ? (u = [f, g].concat(u.slice(1)), f = u[6], g = u[7]) : (u = [f, g, f, g, p, s, p, s], f = p, g = s);
                for (var w = 0, ba = e.length; w < ba; w++) {
                    if (r = e[w], "M" == r[0]) {
                        h = n = r[1], k = q = r[2];
                    } else {
                        "C" == r[0] ? (r = [h, k].concat(r.slice(1)), h = r[6], k = r[7]) : (r = [h, k, h, k, n, q, n, q], h = n, k = q);
                        var y;
                        var ga = u,
                            B = r;
                        y = d;
                        var Y = c.bezierBBox(ga),
                            t = c.bezierBBox(B);
                        if (c.isBBoxIntersect(Y, t)) {
                            for (var Y = m.apply(0, ga), t = m.apply(0, B), Y = ~~ (Y / 5), t = ~~ (t / 5), mb = [], ua = [], D = {}, nb = y ? 0 : [], Ca = 0; Ca < Y + 1; Ca++) {
                                var Ha = c.findDotsAtSegment.apply(c, ga.concat(Ca / Y));
                                mb.push({
                                    x: Ha.x,
                                    y: Ha.y,
                                    t: Ca / Y
                                });
                            }
                            for (Ca = 0; Ca < t + 1; Ca++) {
                                Ha = c.findDotsAtSegment.apply(c, B.concat(Ca / t)), ua.push({
                                    x: Ha.x,
                                    y: Ha.y,
                                    t: Ca / t
                                });
                            }
                            for (Ca = 0; Ca < Y; Ca++) {
                                for (ga = 0; ga < t; ga++) {
                                    var Ia = mb[Ca],
                                        fb = mb[Ca + 1],
                                        B = ua[ga],
                                        Ha = ua[ga + 1],
                                        A = 0.001 > U(fb.x - Ia.x) ? "y" : "x",
                                        z = 0.001 > U(Ha.x - B.x) ? "y" : "x",
                                        ha;
                                    ha = Ia.x;
                                    var V = Ia.y,
                                        M = fb.x,
                                        ya = fb.y,
                                        G = B.x,
                                        H = B.y,
                                        ca = Ha.x,
                                        E = Ha.y;
                                    if (O(ha, M) < N(G, ca) || N(ha, M) > O(G, ca) || O(V, ya) < N(H, E) || N(V, ya) > O(H, E)) {
                                        ha = void 0;
                                    } else {
                                        var F = (ha * ya - V * M) * (G - ca) - (ha - M) * (G * E - H * ca),
                                            I = (ha * ya - V * M) * (H - E) - (V - ya) * (G * E - H * ca),
                                            J = (ha - M) * (H - E) - (V - ya) * (G - ca);
                                        if (J) {
                                            var F = F / J,
                                                I = I / J,
                                                J = +F.toFixed(2),
                                                Q = +I.toFixed(2);
                                            ha = J < +N(ha, M).toFixed(2) || J > +O(ha, M).toFixed(2) || J < +N(G, ca).toFixed(2) || J > +O(G, ca).toFixed(2) || Q < +N(V, ya).toFixed(2) || Q > +O(V, ya).toFixed(2) || Q < +N(H, E).toFixed(2) || Q > +O(H, E).toFixed(2) ? void 0 : {
                                                x: F,
                                                y: I
                                            };
                                        } else {
                                            ha = void 0;
                                        }
                                    }
                                    ha && D[ha.x.toFixed(4)] != ha.y.toFixed(4) && (D[ha.x.toFixed(4)] = ha.y.toFixed(4), Ia = Ia.t + U((ha[A] - Ia[A]) / (fb[A] - Ia[A])) * (fb.t - Ia.t), B = B.t + U((ha[z] - B[z]) / (Ha[z] - B[z])) * (Ha.t - B.t), 0 <= Ia && 1 >= Ia && 0 <= B && 1 >= B && (y ? nb++ : nb.push({
                                        x: ha.x,
                                        y: ha.y,
                                        t1: Ia,
                                        t2: B
                                    })));
                                }
                            }
                            y = nb;
                        } else {
                            y = y ? 0 : [];
                        }
                        if (d) {
                            C += y;
                        } else {
                            Y = 0;
                            for (t = y.length; Y < t; Y++) {
                                y[Y].segment1 = x, y[Y].segment2 = w, y[Y].bez1 = u, y[Y].bez2 = r;
                            }
                            C = C.concat(y);
                        }
                    }
                }
            }
        }
        return C;
    }

    function r(b, c, e, d, f, g) {
        null != b ? (this.a = +b, this.b = +c, this.c = +e, this.d = +d, this.e = +f, this.f = +g) : (this.a = 1, this.c = this.b = 0, this.d = 1, this.f = this.e = 0);
    }

    function t() {
        return this.x + da + this.y + da + this.width + " \u00d7 " + this.height;
    }

    function p(b, c, e, d, f, g) {
        function h(b, c) {
            var e, d, f, g;
            f = b;
            for (d = 0; 8 > d; d++) {
                g = ((m * f + p) * f + k) * f - b;
                if (U(g) < c) {
                    return f;
                }
                e = (3 * m * f + 2 * p) * f + k;
                if (1E-6 > U(e)) {
                    break;
                }
                f -= g / e;
            }
            e = 0;
            d = 1;
            f = b;
            if (f < e) {
                return e;
            }
            if (f > d) {
                return d;
            }
            for (; e < d;) {
                g = ((m * f + p) * f + k) * f;
                if (U(g - b) < c) {
                    break;
                }
                b > g ? e = f : d = f;
                f = (d - e) / 2 + e;
            }
            return f;
        }
        var k = 3 * c,
            p = 3 * (d - c) - k,
            m = 1 - k - p,
            s = 3 * e,
            n = 3 * (f - e) - s,
            q = 1 - s - n;
        return function(b, c) {
            var e = h(b, c);
            return ((q * e + n) * e + s) * e;
        }(b, 1 / (200 * g));
    }

    function e(b, c) {
        var e = [],
            d = {};
        this.ms = c;
        this.times = 1;
        if (b) {
            for (var f in b) {
                b[y](f) && (d[z(f)] = b[f], e.push(z(f)));
            }
            e.sort(qa);
        }
        this.anim = d;
        this.top = e[e.length - 1];
        this.percents = e;
    }

    function u(b, e, f, g, h, k) {
        f = z(f);
        var m, s, n, q, u, C, x = b.ms,
            w = {}, ba = {}, ga = {};
        if (g) {
            for (C = 0, Y = pa.length; C < Y; C++) {
                var B = pa[C];
                if (B.el.id == e.id && B.anim == b) {
                    B.percent != f ? (pa.splice(C, 1), n = 1) : s = B;
                    e.attr(B.totalOrigin);
                    break;
                }
            }
        } else {
            g = +ba;
        }
        C = 0;
        for (var Y = b.percents.length; C < Y; C++) {
            if (b.percents[C] == f || b.percents[C] > g * b.top) {
                f = b.percents[C];
                u = b.percents[C - 1] || 0;
                x = x / b.top * (f - u);
                q = b.percents[C + 1];
                m = b.anim[f];
                break;
            } else {
                g && e.attr(b.anim[b.percents[C]]);
            }
        }
        if (m) {
            if (s) {
                s.initstatus = g, s.start = new Date - s.ms * g;
            } else {
                for (var t in m) {
                    if (m[y](t) && (la[y](t) || e.paper.customAttributes[y](t))) {
                        switch (w[t] = e.attr(t), null == w[t] && (w[t] = X[t]), ba[t] = m[t], la[t]) {
                            case K:
                                ga[t] = (ba[t] - w[t]) / x;
                                break;
                            case "colour":
                                w[t] = c.getRGB(w[t]);
                                C = c.getRGB(ba[t]);
                                ga[t] = {
                                    r: (C.r - w[t].r) / x,
                                    g: (C.g - w[t].g) / x,
                                    b: (C.b - w[t].b) / x
                                };
                                break;
                            case "path":
                                C = Ra(w[t], ba[t]);
                                B = C[1];
                                w[t] = C[0];
                                ga[t] = [];
                                C = 0;
                                for (Y = w[t].length; C < Y; C++) {
                                    ga[t][C] = [0];
                                    for (var ua = 1, D = w[t][C].length; ua < D; ua++) {
                                        ga[t][C][ua] = (B[C][ua] - w[t][C][ua]) / x;
                                    }
                                }
                                break;
                            case "transform":
                                C = e._;
                                if (Y = Oa(C[t], ba[t])) {
                                    for (w[t] = Y.from, ba[t] = Y.to, ga[t] = [], ga[t].real = !0, C = 0, Y = w[t].length; C < Y; C++) {
                                        for (ga[t][C] = [w[t][C][0]], ua = 1, D = w[t][C].length; ua < D; ua++) {
                                            ga[t][C][ua] = (ba[t][C][ua] - w[t][C][ua]) / x;
                                        }
                                    }
                                } else {
                                    Y = e.matrix || new r, C = {
                                        _: {
                                            transform: C.transform
                                        },
                                        getBBox: function() {
                                            return e.getBBox(1);
                                        }
                                    }, w[t] = [Y.a, Y.b, Y.c, Y.d, Y.e, Y.f], hb(C, ba[t]), ba[t] = C._.transform, ga[t] = [(C.matrix.a - Y.a) / x, (C.matrix.b - Y.b) / x, (C.matrix.c - Y.c) / x, (C.matrix.d - Y.d) / x, (C.matrix.e - Y.e) / x, (C.matrix.f - Y.f) / x];
                                }
                                break;
                            case "csv":
                                Y = W(m[t])[fa](v);
                                B = W(w[t])[fa](v);
                                if ("clip-rect" == t) {
                                    for (w[t] = B, ga[t] = [], C = B.length; C--;) {
                                        ga[t][C] = (Y[C] - w[t][C]) / x;
                                    }
                                }
                                ba[t] = Y;
                                break;
                            default:
                                for (Y = [][H](m[t]), B = [][H](w[t]), ga[t] = [], C = e.paper.customAttributes[t].length; C--;) {
                                    ga[t][C] = ((Y[C] || 0) - (B[C] || 0)) / x;
                                };
                        }
                    }
                }
                C = m.easing;
                t = c.easing_formulas[C];
                if (!t) {
                    if ((t = W(C).match(ea)) && 5 == t.length) {
                        var A = t;
                        t = function(b) {
                            return p(b, +A[1], +A[2], +A[3], +A[4], x);
                        };
                    } else {
                        t = Ja;
                    }
                }
                C = m.start || b.start || +new Date;
                B = {
                    anim: b,
                    percent: f,
                    timestamp: C,
                    start: C + (b.del || 0),
                    status: 0,
                    initstatus: g || 0,
                    stop: !1,
                    ms: x,
                    easing: t,
                    from: w,
                    diff: ga,
                    to: ba,
                    el: e,
                    callback: m.callback,
                    prev: u,
                    next: q,
                    repeat: k || b.times,
                    origin: e.attr(),
                    totalOrigin: h
                };
                pa.push(B);
                if (g && !s && !n && (B.stop = !0, B.start = new Date - x * g, 1 == pa.length)) {
                    return ob();
                }
                n && (B.start = new Date - B.ms * g);
                1 == pa.length && tb(ob);
            }
            d("raphael.anim.start." + e.id, e, b);
        }
    }

    function s(b) {
        for (var c = 0; c < pa.length; c++) {
            pa[c].el.paper == b && pa.splice(c--, 1);
        }
    }
    c.version = "2.1.0";
    c.eve = d;
    var w, v = /[, ]+/,
        x = {
            circle: 1,
            rect: 1,
            path: 1,
            ellipse: 1,
            text: 1,
            image: 1
        }, B = /\{(\d+)\}/g,
        y = "hasOwnProperty",
        D = {
            doc: document,
            win: b
        }, V = Object.prototype[y].call(D.win, "Raphael"),
        ca = D.win.Raphael,
        M = function() {
            this.ca = this.customAttributes = {};
        }, A, G = "apply",
        H = "concat",
        Q = "ontouchstart" in D.win || D.win.DocumentTouch && D.doc instanceof DocumentTouch,
        da = " ",
        W = String,
        fa = "split",
        ja = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel" [fa](da),
        F = {
            mousedown: "touchstart",
            mousemove: "touchmove",
            mouseup: "touchend"
        }, I = W.prototype.toLowerCase,
        P = Math,
        O = P.max,
        N = P.min,
        U = P.abs,
        Z = P.pow,
        L = P.PI,
        K = "number",
        T = "array",
        J = Object.prototype.toString;
    c._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i;
    var E = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
        S = {
            NaN: 1,
            Infinity: 1,
            "-Infinity": 1
        }, ea = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
        oa = P.round,
        z = parseFloat,
        ka = parseInt,
        R = W.prototype.toUpperCase,
        X = c._availableAttrs = {
            "arrow-end": "none",
            "arrow-start": "none",
            blur: 0,
            "clip-rect": "0 0 1e9 1e9",
            cursor: "default",
            cx: 0,
            cy: 0,
            fill: "#fff",
            "fill-opacity": 1,
            font: '10px "Microsoft JhengHei"',
            "font-family": '"Microsoft JhengHei"',
            "font-size": "10",
            "font-style": "normal",
            "font-weight": 400,
            gradient: 0,
            height: 0,
            href: "http://raphaeljs.com/",
            "letter-spacing": 0,
            opacity: 1,
            path: "M0,0",
            r: 0,
            rx: 0,
            ry: 0,
            src: "",
            stroke: "#000",
            "stroke-dasharray": "",
            "stroke-linecap": "butt",
            "stroke-linejoin": "butt",
            "stroke-miterlimit": 0,
            "stroke-opacity": 1,
            "stroke-width": 1,
            target: "_blank",
            "text-anchor": "middle",
            title: "Raphael",
            transform: "",
            width: 0,
            x: 0,
            y: 0
        }, la = c._availableAnimAttrs = {
            blur: K,
            "clip-rect": "csv",
            cx: K,
            cy: K,
            fill: "colour",
            "fill-opacity": K,
            "font-size": K,
            height: K,
            opacity: K,
            path: "path",
            r: K,
            rx: K,
            ry: K,
            stroke: "colour",
            "stroke-opacity": K,
            "stroke-width": K,
            transform: "transform",
            width: K,
            x: K,
            y: K
        }, ma = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
        aa = {
            hs: 1,
            rg: 1
        }, na = /,?([achlmqrstvxz]),?/gi,
        va = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
        wa = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
        xa = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig;
    c._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/;
    var ta = {}, qa = function(b, c) {
        return z(b) - z(c);
    }, sa = function() {}, Ja = function(b) {
        return b;
    }, ba = c._rectPath = function(b, c, e, d, f) {
        return f ? [
            ["M", b + f, c],
            ["l", e - 2 * f, 0],
            ["a", f, f, 0, 0, 1, f, f],
            ["l", 0, d - 2 * f],
            ["a", f, f, 0, 0, 1, -f, f],
            ["l", 2 * f - e, 0],
            ["a", f, f, 0, 0, 1, -f, -f],
            ["l", 0, 2 * f - d],
            ["a", f, f, 0, 0, 1, f, -f],
            ["z"]
        ] : [
            ["M", b, c],
            ["l", e, 0],
            ["l", 0, d],
            ["l", -e, 0],
            ["z"]
        ];
    }, C = function(b, c, e, d) {
        null == d && (d = e);
        return [["M", b, c], ["m", 0, -d], ["a", e, d, 0, 1, 1, 0, 2 * d], ["a", e, d, 0, 1, 1, 0, -2 * d], ["z"]];
    }, ga = c._getPath = {
        path: function(b) {
            return b.attr("path");
        },
        circle: function(b) {
            b = b.attrs;
            return C(b.cx, b.cy, b.r);
        },
        ellipse: function(b) {
            b = b.attrs;
            return C(b.cx, b.cy, b.rx, b.ry);
        },
        rect: function(b) {
            b = b.attrs;
            return ba(b.x, b.y, b.width, b.height, b.r);
        },
        image: function(b) {
            b = b.attrs;
            return ba(b.x, b.y, b.width, b.height);
        },
        text: function(b) {
            b = b._getBBox();
            return ba(b.x, b.y, b.width, b.height);
        },
        set: function(b) {
            b = b._getBBox();
            return ba(b.x, b.y, b.width, b.height);
        }
    }, Y = c.mapPath = function(b, c) {
        if (!c) {
            return b;
        }
        var e, d, f, g, h, k, p;
        b = Ra(b);
        f = 0;
        for (h = b.length; f < h; f++) {
            for (p = b[f], g = 1, k = p.length; g < k; g += 2) {
                e = c.x(p[g], p[g + 1]), d = c.y(p[g], p[g + 1]), p[g] = e, p[g + 1] = d;
            }
        }
        return b;
    };
    c._g = D;
    c.type = D.win.SVGAngle || D.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML";
    if ("VML" == c.type) {
        var ua = D.doc.createElement("div"),
            ha;
        ua.innerHTML = '<v:shape adj="1"/>';
        ha = ua.firstChild;
        ha.style.behavior = "url(#default#VML)";
        if (!ha || "object" != typeof ha.adj) {
            return c.type = "";
        }
        ua = null;
    }
    c.svg = !(c.vml = "VML" == c.type);
    c._Paper = M;
    c.fn = A = M.prototype = c.prototype;
    c._id = 0;
    c._oid = 0;
    c.is = function(b, c) {
        c = I.call(c);
        return "finite" == c ? !S[y](+b) : "array" == c ? b instanceof Array : "null" == c && null === b || c == typeof b && null !== b || "object" == c && b === Object(b) || "array" == c && Array.isArray && Array.isArray(b) || J.call(b).slice(8, -1).toLowerCase() == c;
    };
    c.angle = function(b, e, d, f, g, h) {
        return null == g ? (b -= d, e -= f, b || e ? (180 * P.atan2(-e, -b) / L + 540) % 360 : 0) : c.angle(b, e, g, h) - c.angle(d, f, g, h);
    };
    c.rad = function(b) {
        return b % 360 * L / 180;
    };
    c.deg = function(b) {
        return 180 * b / L % 360;
    };
    c.snapTo = function(b, e, d) {
        d = c.is(d, "finite") ? d : 10;
        if (c.is(b, T)) {
            for (var f = b.length; f--;) {
                if (U(b[f] - e) <= d) {
                    return b[f];
                }
            }
        } else {
            b = +b;
            f = e % b;
            if (f < d) {
                return e - f;
            }
            if (f > b - d) {
                return e - f + b;
            }
        }
        return e;
    };
    c.createUUID = function(b, c) {
        return function() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(b, c).toUpperCase();
        };
    }(/[xy]/g, function(b) {
        var c = 16 * P.random() | 0;
        return ("x" == b ? c : c & 3 | 8).toString(16);
    });
    c.setWindow = function(b) {
        d("raphael.setWindow", c, D.win, b);
        D.win = b;
        D.doc = D.win.document;
        c._engine.initWin && c._engine.initWin(D.win);
    };
    var ya = function(b) {
        if (c.vml) {
            var e = /^\s+|\s+$/g,
                d;
            try {
                var f = new ActiveXObject("htmlfile");
                f.write("<body>");
                f.close();
                d = f.body;
            } catch (g) {
                d = createPopup().document.body;
            }
            var h = d.createTextRange();
            ya = k(function(b) {
                try {
                    d.style.color = W(b).replace(e, "");
                    var c = h.queryCommandValue("ForeColor");
                    return "#" + ("000000" + ((c & 255) << 16 | c & 65280 | (c & 16711680) >>> 16).toString(16)).slice(-6);
                } catch (f) {
                    return "none";
                }
            });
        } else {
            var p = D.doc.createElement("i");
            p.title = "Rapha\u00ebl Colour Picker";
            p.style.display = "none";
            D.doc.body.appendChild(p);
            ya = k(function(b) {
                p.style.color = b;
                return D.doc.defaultView.getComputedStyle(p, "").getPropertyValue("color");
            });
        }
        return ya(b);
    }, ia = function() {
        return "hsb(" + [this.h, this.s, this.b] + ")";
    }, lb = function() {
        return "hsl(" + [this.h, this.s, this.l] + ")";
    }, Ta = function() {
        return this.hex;
    }, Ua = function(b, e, d) {
        null == e && c.is(b, "object") && "r" in b && "g" in b && "b" in b && (d = b.b, e = b.g, b = b.r);
        null == e && c.is(b, "string") && (d = c.getRGB(b), b = d.r, e = d.g, d = d.b);
        if (1 < b || 1 < e || 1 < d) {
            b /= 255, e /= 255, d /= 255;
        }
        return [b, e, d];
    }, $a = function(b, e, d, f) {
        b *= 255;
        e *= 255;
        d *= 255;
        b = {
            r: b,
            g: e,
            b: d,
            hex: c.rgb(b, e, d),
            toString: Ta
        };
        c.is(f, "finite") && (b.opacity = f);
        return b;
    };
    c.color = function(b) {
        var e;
        c.is(b, "object") && "h" in b && "s" in b && "b" in b ? (e = c.hsb2rgb(b), b.r = e.r, b.g = e.g, b.b = e.b, b.hex = e.hex) : c.is(b, "object") && "h" in b && "s" in b && "l" in b ? (e = c.hsl2rgb(b), b.r = e.r, b.g = e.g, b.b = e.b, b.hex = e.hex) : (c.is(b, "string") && (b = c.getRGB(b)), c.is(b, "object") && "r" in b && "g" in b && "b" in b ? (e = c.rgb2hsl(b), b.h = e.h, b.s = e.s, b.l = e.l, e = c.rgb2hsb(b), b.v = e.b) : (b = {
            hex: "none"
        }, b.r = b.g = b.b = b.h = b.s = b.v = b.l = -1));
        b.toString = Ta;
        return b;
    };
    c.hsb2rgb = function(b, c, e, d) {
        this.is(b, "object") && "h" in b && "s" in b && "b" in b && (e = b.b, c = b.s, b = b.h, d = b.o);
        var f, g, h;
        b = 360 * b % 360 / 60;
        h = e * c;
        c = h * (1 - U(b % 2 - 1));
        e = f = g = e - h;
        b = ~~b;
        e += [h, c, 0, 0, c, h][b];
        f += [c, h, h, c, 0, 0][b];
        g += [0, 0, c, h, h, c][b];
        return $a(e, f, g, d);
    };
    c.hsl2rgb = function(b, c, e, d) {
        this.is(b, "object") && "h" in b && "s" in b && "l" in b && (e = b.l, c = b.s, b = b.h);
        if (1 < b || 1 < c || 1 < e) {
            b /= 360, c /= 100, e /= 100;
        }
        var f, g, h;
        b = 360 * b % 360 / 60;
        h = 2 * c * (0.5 > e ? e : 1 - e);
        c = h * (1 - U(b % 2 - 1));
        e = f = g = e - h / 2;
        b = ~~b;
        e += [h, c, 0, 0, c, h][b];
        f += [c, h, h, c, 0, 0][b];
        g += [0, 0, c, h, h, c][b];
        return $a(e, f, g, d);
    };
    c.rgb2hsb = function(b, c, e) {
        e = Ua(b, c, e);
        b = e[0];
        c = e[1];
        e = e[2];
        var d, f;
        d = O(b, c, e);
        f = d - N(b, c, e);
        b = ((0 == f ? 0 : d == b ? (c - e) / f : d == c ? (e - b) / f + 2 : (b - c) / f + 4) + 360) % 6 * 60 / 360;
        return {
            h: b,
            s: 0 == f ? 0 : f / d,
            b: d,
            toString: ia
        };
    };
    c.rgb2hsl = function(b, c, e) {
        e = Ua(b, c, e);
        b = e[0];
        c = e[1];
        e = e[2];
        var d, f, g;
        d = O(b, c, e);
        f = N(b, c, e);
        g = d - f;
        b = ((0 == g ? 0 : d == b ? (c - e) / g : d == c ? (e - b) / g + 2 : (b - c) / g + 4) + 360) % 6 * 60 / 360;
        d = (d + f) / 2;
        return {
            h: b,
            s: 0 == g ? 0 : 0.5 > d ? g / (2 * d) : g / (2 - 2 * d),
            l: d,
            toString: lb
        };
    };
    c._path2string = function() {
        "undefined" == typeof this.path2stringCached && (this.path2stringCached = this.join(",").replace(na, "$1"));
        return this.path2stringCached;
    };
    c._preload = function(b, c) {
        var e = D.doc.createElement("img");
        e.style.cssText = "position:absolute;left:-9999em;top:-9999em";
        e.onload = function() {
            c.call(this);
            this.onload = null;
            D.doc.body.removeChild(this);
        };
        e.onerror = function() {
            D.doc.body.removeChild(this);
        };
        D.doc.body.appendChild(e);
        e.src = b;
    };
    c.getRGB = k(function(b) {
        if (!b || (b = W(b)).indexOf("-") + 1) {
            return {
                r: -1,
                g: -1,
                b: -1,
                hex: "none",
                error: 1,
                toString: h
            };
        }
        if ("none" == b) {
            return {
                r: -1,
                g: -1,
                b: -1,
                hex: "none",
                toString: h
            };
        }!aa[y](b.toLowerCase().substring(0, 2)) && "#" != b.charAt() && (b = ya(b));
        var e, d, f, g, k;
        if (b = b.match(E)) {
            b[2] && (f = ka(b[2].substring(5), 16), d = ka(b[2].substring(3, 5), 16), e = ka(b[2].substring(1, 3), 16));
            b[3] && (f = ka((k = b[3].charAt(3)) + k, 16), d = ka((k = b[3].charAt(2)) + k, 16), e = ka((k = b[3].charAt(1)) + k, 16));
            b[4] && (k = b[4][fa](ma), e = z(k[0]), "%" == k[0].slice(-1) && (e *= 2.55), d = z(k[1]), "%" == k[1].slice(-1) && (d *= 2.55), f = z(k[2]), "%" == k[2].slice(-1) && (f *= 2.55), "rgba" == b[1].toLowerCase().slice(0, 4) && (g = z(k[3])), k[3] && "%" == k[3].slice(-1) && (g /= 100));
            if (b[5]) {
                return k = b[5][fa](ma), e = z(k[0]), "%" == k[0].slice(-1) && (e *= 2.55), d = z(k[1]), "%" == k[1].slice(-1) && (d *= 2.55), f = z(k[2]), "%" == k[2].slice(-1) && (f *= 2.55), "deg" != k[0].slice(-3) && "\u00b0" != k[0].slice(-1) || (e /= 360), "hsba" == b[1].toLowerCase().slice(0, 4) && (g = z(k[3])), k[3] && "%" == k[3].slice(-1) && (g /= 100), c.hsb2rgb(e, d, f, g);
            }
            if (b[6]) {
                return k = b[6][fa](ma), e = z(k[0]), "%" == k[0].slice(-1) && (e *= 2.55), d = z(k[1]), "%" == k[1].slice(-1) && (d *= 2.55), f = z(k[2]), "%" == k[2].slice(-1) && (f *= 2.55), "deg" != k[0].slice(-3) && "\u00b0" != k[0].slice(-1) || (e /= 360), "hsla" == b[1].toLowerCase().slice(0, 4) && (g = z(k[3])), k[3] && "%" == k[3].slice(-1) && (g /= 100), c.hsl2rgb(e, d, f, g);
            }
            b = {
                r: e,
                g: d,
                b: f,
                toString: h
            };
            b.hex = "#" + (16777216 | f | d << 8 | e << 16).toString(16).slice(1);
            c.is(g, "finite") && (b.opacity = g);
            return b;
        }
        return {
            r: -1,
            g: -1,
            b: -1,
            hex: "none",
            error: 1,
            toString: h
        };
    }, c);
    c.hsb = k(function(b, e, d) {
        return c.hsb2rgb(b, e, d).hex;
    });
    c.hsl = k(function(b, e, d) {
        return c.hsl2rgb(b, e, d).hex;
    });
    c.rgb = k(function(b, c, e) {
        return "#" + (16777216 | e | c << 8 | b << 16).toString(16).slice(1);
    });
    c.getColor = function(b) {
        b = this.getColor.start = this.getColor.start || {
            h: 0,
            s: 1,
            b: b || 0.75
        };
        var c = this.hsb2rgb(b.h, b.s, b.b);
        b.h += 0.075;
        1 < b.h && (b.h = 0, b.s -= 0.2, 0 >= b.s && (this.getColor.start = {
            h: 0,
            s: 1,
            b: b.b
        }));
        return c.hex;
    };
    c.getColor.reset = function() {
        delete this.start;
    };
    c.parsePathString = function(b) {
        if (!b) {
            return null;
        }
        var e = Ea(b);
        if (e.arr) {
            return Ba(e.arr);
        }
        var d = {
            a: 7,
            c: 6,
            h: 1,
            l: 2,
            m: 2,
            r: 4,
            q: 4,
            s: 4,
            t: 2,
            v: 1,
            z: 0
        }, f = [];
        c.is(b, T) && c.is(b[0], T) && (f = Ba(b));
        f.length || W(b).replace(va, function(b, c, e) {
            var g = [];
            b = c.toLowerCase();
            e.replace(xa, function(b, c) {
                c && g.push(+c);
            });
            "m" == b && 2 < g.length && (f.push([c][H](g.splice(0, 2))), b = "l", c = "m" == c ? "l" : "L");
            if ("r" == b) {
                f.push([c][H](g));
            } else {
                for (; g.length >= d[b] && (f.push([c][H](g.splice(0, d[b]))), d[b]);) {}
            }
        });
        f.toString = c._path2string;
        e.arr = Ba(f);
        return f;
    };
    c.parseTransformString = k(function(b) {
        if (!b) {
            return null;
        }
        var e = [];
        c.is(b, T) && c.is(b[0], T) && (e = Ba(b));
        e.length || W(b).replace(wa, function(b, c, d) {
            var f = [];
            I.call(c);
            d.replace(xa, function(b, c) {
                c && f.push(+c);
            });
            e.push([c][H](f));
        });
        e.toString = c._path2string;
        return e;
    });
    var Ea = function(b) {
        var c = Ea.ps = Ea.ps || {};
        c[b] ? c[b].sleep = 100 : c[b] = {
            sleep: 100
        };
        setTimeout(function() {
            for (var e in c) {
                c[y](e) && e != b && (c[e].sleep--, !c[e].sleep && delete c[e]);
            }
        });
        return c[b];
    };
    c.findDotsAtSegment = function(b, c, e, d, f, g, h, k, p) {
        var m = 1 - p,
            s = Z(m, 3),
            n = Z(m, 2),
            q = p * p,
            u = q * p,
            r = s * b + 3 * n * p * e + 3 * m * p * p * f + u * h,
            s = s * c + 3 * n * p * d + 3 * m * p * p * g + u * k,
            n = b + 2 * p * (e - b) + q * (f - 2 * e + b),
            u = c + 2 * p * (d - c) + q * (g - 2 * d + c),
            C = e + 2 * p * (f - e) + q * (h - 2 * f + e),
            q = d + 2 * p * (g - d) + q * (k - 2 * g + d);
        b = m * b + p * e;
        c = m * c + p * d;
        f = m * f + p * h;
        g = m * g + p * k;
        k = 90 - 180 * P.atan2(n - C, u - q) / L;
        (n > C || u < q) && (k += 180);
        return {
            x: r,
            y: s,
            m: {
                x: n,
                y: u
            },
            n: {
                x: C,
                y: q
            },
            start: {
                x: b,
                y: c
            },
            end: {
                x: f,
                y: g
            },
            alpha: k
        };
    };
    c.bezierBBox = function(b, e, d, f, g, h, k, p) {
        c.is(b, "array") || (b = [b, e, d, f, g, h, k, p]);
        b = ab.apply(null, b);
        return {
            x: b.min.x,
            y: b.min.y,
            x2: b.max.x,
            y2: b.max.y,
            width: b.max.x - b.min.x,
            height: b.max.y - b.min.y
        };
    };
    c.isPointInsideBBox = function(b, c, e) {
        return c >= b.x && c <= b.x2 && e >= b.y && e <= b.y2;
    };
    c.isBBoxIntersect = function(b, e) {
        var d = c.isPointInsideBBox;
        return d(e, b.x, b.y) || d(e, b.x2, b.y) || d(e, b.x, b.y2) || d(e, b.x2, b.y2) || d(b, e.x, e.y) || d(b, e.x2, e.y) || d(b, e.x, e.y2) || d(b, e.x2, e.y2) || (b.x < e.x2 && b.x > e.x || e.x < b.x2 && e.x > b.x) && (b.y < e.y2 && b.y > e.y || e.y < b.y2 && e.y > b.y);
    };
    c.pathIntersection = function(b, c) {
        return n(b, c);
    };
    c.pathIntersectionNumber = function(b, c) {
        return n(b, c, 1);
    };
    c.isPointInsidePath = function(b, e, d) {
        var f = c.pathBBox(b);
        return c.isPointInsideBBox(f, e, d) && 1 == n(b, [
            ["M", e, d],
            ["H", f.x2 + 10]
        ], 1) % 2;
    };
    c._removedFactory = function(b) {
        return function() {
            d("raphael.log", null, "Raphael: 您正使用方法： \u201c" + b + "\u201d 来删除对象", b);
        };
    };
    var La = c.pathBBox = function(b) {
            var c = Ea(b);
            if (c.bbox) {
                return g(c.bbox);
            }
            if (!b) {
                return {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    x2: 0,
                    y2: 0
                };
            }
            b = Ra(b);
            for (var e = 0, d = 0, f = [], h = [], k, p = 0, m = b.length; p < m; p++) {
                k = b[p], "M" == k[0] ? (e = k[1], d = k[2], f.push(e), h.push(d)) : (e = ab(e, d, k[1], k[2], k[3], k[4], k[5], k[6]), f = f[H](e.min.x, e.max.x), h = h[H](e.min.y, e.max.y), e = k[5], d = k[6]);
            }
            b = N[G](0, f);
            k = N[G](0, h);
            f = O[G](0, f);
            h = O[G](0, h);
            p = f - b;
            m = h - k;
            h = {
                x: b,
                y: k,
                x2: f,
                y2: h,
                width: p,
                height: m,
                cx: b + p / 2,
                cy: k + m / 2
            };
            c.bbox = g(h);
            return h;
        }, Ba = function(b) {
            b = g(b);
            b.toString = c._path2string;
            return b;
        }, Ya = c._pathToRelative = function(b) {
            var e = Ea(b);
            if (e.rel) {
                return Ba(e.rel);
            }
            c.is(b, T) && c.is(b && b[0], T) || (b = c.parsePathString(b));
            var d = [],
                f = 0,
                g = 0,
                h = 0,
                k = 0,
                p = 0;
            "M" == b[0][0] && (f = b[0][1], g = b[0][2], h = f, k = g, p++, d.push(["M", f, g]));
            for (var m = b.length; p < m; p++) {
                var s = d[p] = [],
                    n = b[p];
                if (n[0] != I.call(n[0])) {
                    switch (s[0] = I.call(n[0]), s[0]) {
                        case "a":
                            s[1] = n[1];
                            s[2] = n[2];
                            s[3] = n[3];
                            s[4] = n[4];
                            s[5] = n[5];
                            s[6] = +(n[6] - f).toFixed(3);
                            s[7] = +(n[7] - g).toFixed(3);
                            break;
                        case "v":
                            s[1] = +(n[1] - g).toFixed(3);
                            break;
                        case "m":
                            h = n[1], k = n[2];
                        default:
                            for (var q = 1, u = n.length; q < u; q++) {
                                s[q] = +(n[q] - (q % 2 ? f : g)).toFixed(3);
                            };
                    }
                } else {
                    for (d[p] = [], "m" == n[0] && (h = n[1] + f, k = n[2] + g), s = 0, q = n.length; s < q; s++) {
                        d[p][s] = n[s];
                    }
                }
                n = d[p].length;
                switch (d[p][0]) {
                    case "z":
                        f = h;
                        g = k;
                        break;
                    case "h":
                        f += +d[p][n - 1];
                        break;
                    case "v":
                        g += +d[p][n - 1];
                        break;
                    default:
                        f += +d[p][n - 2], g += +d[p][n - 1];
                }
            }
            d.toString = c._path2string;
            e.rel = Ba(d);
            return d;
        }, Ga = c._pathToAbsolute = function(b) {
            var e = Ea(b);
            if (e.abs) {
                return Ba(e.abs);
            }
            c.is(b, T) && c.is(b && b[0], T) || (b = c.parsePathString(b));
            if (!b || !b.length) {
                return [["M", 0, 0]];
            }
            var d = [],
                g = 0,
                h = 0,
                k = 0,
                p = 0,
                m = 0;
            "M" == b[0][0] && (g = +b[0][1], h = +b[0][2], k = g, p = h, m++, d[0] = ["M", g, h]);
            for (var s = 3 == b.length && "M" == b[0][0] && "R" == b[1][0].toUpperCase() && "Z" == b[2][0].toUpperCase(), n, q = m, u = b.length; q < u; q++) {
                d.push(m = []);
                n = b[q];
                if (n[0] != R.call(n[0])) {
                    switch (m[0] = R.call(n[0]), m[0]) {
                        case "A":
                            m[1] = n[1];
                            m[2] = n[2];
                            m[3] = n[3];
                            m[4] = n[4];
                            m[5] = n[5];
                            m[6] = +(n[6] + g);
                            m[7] = +(n[7] + h);
                            break;
                        case "V":
                            m[1] = +n[1] + h;
                            break;
                        case "H":
                            m[1] = +n[1] + g;
                            break;
                        case "R":
                            for (var r = [g, h][H](n.slice(1)), C = 2, x = r.length; C < x; C++) {
                                r[C] = +r[C] + g, r[++C] = +r[C] + h;
                            }
                            d.pop();
                            d = d[H](f(r, s));
                            break;
                        case "M":
                            k = +n[1] + g, p = +n[2] + h;
                        default:
                            for (C = 1, x = n.length; C < x; C++) {
                                m[C] = +n[C] + (C % 2 ? g : h);
                            };
                    }
                } else {
                    if ("R" == n[0]) {
                        r = [g, h][H](n.slice(1)), d.pop(), d = d[H](f(r, s)), m = ["R"][H](n.slice(-2));
                    } else {
                        for (r = 0, C = n.length; r < C; r++) {
                            m[r] = n[r];
                        }
                    }
                }
                switch (m[0]) {
                    case "Z":
                        g = k;
                        h = p;
                        break;
                    case "H":
                        g = m[1];
                        break;
                    case "V":
                        h = m[1];
                        break;
                    case "M":
                        k = m[m.length - 2], p = m[m.length - 1];
                    default:
                        g = m[m.length - 2], h = m[m.length - 1];
                }
            }
            d.toString = c._path2string;
            e.abs = Ba(d);
            return d;
        }, cb = function(b, c, e, d, f, g) {
            var h = 1 / 3,
                k = 2 / 3;
            return [h * b + k * e, h * c + k * d, h * f + k * e, h * g + k * d, f, g];
        }, db = function(b, c, e, d, f, g, h, p, m, s) {
            var n = 120 * L / 180,
                q = L / 180 * (+f || 0),
                u = [],
                r, C = k(function(b, c, e) {
                    var d = b * P.cos(e) - c * P.sin(e);
                    b = b * P.sin(e) + c * P.cos(e);
                    return {
                        x: d,
                        y: b
                    };
                });
            if (s) {
                v = s[0], r = s[1], g = s[2], x = s[3];
            } else {
                r = C(b, c, -q);
                b = r.x;
                c = r.y;
                r = C(p, m, -q);
                p = r.x;
                m = r.y;
                P.cos(L / 180 * f);
                P.sin(L / 180 * f);
                r = (b - p) / 2;
                v = (c - m) / 2;
                x = r * r / (e * e) + v * v / (d * d);
                1 < x && (x = P.sqrt(x), e *= x, d *= x);
                var x = e * e,
                    w = d * d,
                    x = (g == h ? -1 : 1) * P.sqrt(U((x * w - x * v * v - w * r * r) / (x * v * v + w * r * r)));
                g = x * e * v / d + (b + p) / 2;
                var x = x * -d * r / e + (c + m) / 2,
                    v = P.asin(((c - x) / d).toFixed(9));
                r = P.asin(((m - x) / d).toFixed(9));
                v = b < g ? L - v : v;
                r = p < g ? L - r : r;
                0 > v && (v = 2 * L + v);
                0 > r && (r = 2 * L + r);
                h && v > r && (v -= 2 * L);
                !h && r > v && (r -= 2 * L);
            }
            if (U(r - v) > n) {
                var u = r,
                    w = p,
                    ba = m;
                r = v + n * (h && r > v ? 1 : -1);
                p = g + e * P.cos(r);
                m = x + d * P.sin(r);
                u = db(p, m, e, d, f, 0, h, w, ba, [r, u, g, x]);
            }
            g = r - v;
            f = P.cos(v);
            n = P.sin(v);
            h = P.cos(r);
            r = P.sin(r);
            g = P.tan(g / 4);
            e = 4 / 3 * e * g;
            g *= 4 / 3 * d;
            d = [b, c];
            b = [b + e * n, c - g * f];
            c = [p + e * r, m - g * h];
            p = [p, m];
            b[0] = 2 * d[0] - b[0];
            b[1] = 2 * d[1] - b[1];
            if (s) {
                return [b, c, p][H](u);
            }
            u = [b, c, p][H](u).join()[fa](",");
            s = [];
            p = 0;
            for (m = u.length; p < m; p++) {
                s[p] = p % 2 ? C(u[p - 1], u[p], q).y : C(u[p], u[p + 1], q).x;
            }
            return s;
        }, Va = function(b, c, e, d, f, g, h, k, p) {
            var m = 1 - p;
            return {
                x: Z(m, 3) * b + 3 * Z(m, 2) * p * e + 3 * m * p * p * f + Z(p, 3) * h,
                y: Z(m, 3) * c + 3 * Z(m, 2) * p * d + 3 * m * p * p * g + Z(p, 3) * k
            };
        }, ab = k(function(b, c, e, d, f, g, h, k) {
            var p = f - 2 * e + b - (h - 2 * f + e),
                m = 2 * (e - b) - 2 * (f - e),
                s = b - e,
                n = (-m + P.sqrt(m * m - 4 * p * s)) / 2 / p,
                p = (-m - P.sqrt(m * m - 4 * p * s)) / 2 / p,
                r = [c, k],
                q = [b, h];
            "1e12" < U(n) && (n = 0.5);
            "1e12" < U(p) && (p = 0.5);
            0 < n && 1 > n && (n = Va(b, c, e, d, f, g, h, k, n), q.push(n.x), r.push(n.y));
            0 < p && 1 > p && (n = Va(b, c, e, d, f, g, h, k, p), q.push(n.x), r.push(n.y));
            p = g - 2 * d + c - (k - 2 * g + d);
            m = 2 * (d - c) - 2 * (g - d);
            s = c - d;
            n = (-m + P.sqrt(m * m - 4 * p * s)) / 2 / p;
            p = (-m - P.sqrt(m * m - 4 * p * s)) / 2 / p;
            "1e12" < U(n) && (n = 0.5);
            "1e12" < U(p) && (p = 0.5);
            0 < n && 1 > n && (n = Va(b, c, e, d, f, g, h, k, n), q.push(n.x), r.push(n.y));
            0 < p && 1 > p && (n = Va(b, c, e, d, f, g, h, k, p), q.push(n.x), r.push(n.y));
            return {
                min: {
                    x: N[G](0, q),
                    y: N[G](0, r)
                },
                max: {
                    x: O[G](0, q),
                    y: O[G](0, r)
                }
            };
        }),
        Ra = c._path2curve = k(function(b, c) {
            var e = !c && Ea(b);
            if (!c && e.curve) {
                return Ba(e.curve);
            }
            var d = Ga(b),
                f = c && Ga(c),
                g = {
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0,
                    X: 0,
                    Y: 0,
                    qx: null,
                    qy: null
                }, h = {
                    x: 0,
                    y: 0,
                    bx: 0,
                    by: 0,
                    X: 0,
                    Y: 0,
                    qx: null,
                    qy: null
                }, k = function(b, c) {
                    var e, d;
                    if (!b) {
                        return ["C", c.x, c.y, c.x, c.y, c.x, c.y];
                    }
                    b[0] in {
                        T: 1,
                        Q: 1
                    } || (c.qx = c.qy = null);
                    switch (b[0]) {
                        case "M":
                            c.X = b[1];
                            c.Y = b[2];
                            break;
                        case "A":
                            b = ["C"][H](db[G](0, [c.x, c.y][H](b.slice(1))));
                            break;
                        case "S":
                            e = c.x + (c.x - (c.bx || c.x));
                            d = c.y + (c.y - (c.by || c.y));
                            b = ["C", e, d][H](b.slice(1));
                            break;
                        case "T":
                            c.qx = c.x + (c.x - (c.qx || c.x));
                            c.qy = c.y + (c.y - (c.qy || c.y));
                            b = ["C"][H](cb(c.x, c.y, c.qx, c.qy, b[1], b[2]));
                            break;
                        case "Q":
                            c.qx = b[1];
                            c.qy = b[2];
                            b = ["C"][H](cb(c.x, c.y, b[1], b[2], b[3], b[4]));
                            break;
                        case "L":
                            b = ["C"][H]([c.x, c.y, b[1], b[2], b[1], b[2]]);
                            break;
                        case "H":
                            b = ["C"][H]([c.x, c.y, b[1], c.y, b[1], c.y]);
                            break;
                        case "V":
                            b = ["C"][H]([c.x, c.y, c.x, b[1], c.x, b[1]]);
                            break;
                        case "Z":
                            b = ["C"][H]([c.x, c.y, c.X, c.Y, c.X, c.Y]);
                    }
                    return b;
                }, p = function(b, c) {
                    if (7 < b[c].length) {
                        b[c].shift();
                        for (var e = b[c]; e.length;) {
                            b.splice(c++, 0, ["C"][H](e.splice(0, 6)));
                        }
                        b.splice(c, 1);
                        n = O(d.length, f && f.length || 0);
                    }
                }, m = function(b, c, e, g, h) {
                    b && c && "M" == b[h][0] && "M" != c[h][0] && (c.splice(h, 0, ["M", g.x, g.y]), e.bx = 0, e.by = 0, e.x = b[h][1], e.y = b[h][2], n = O(d.length, f && f.length || 0));
                }, s = 0,
                n = O(d.length, f && f.length || 0);
            for (; s < n; s++) {
                d[s] = k(d[s], g);
                p(d, s);
                f && (f[s] = k(f[s], h));
                f && p(f, s);
                m(d, f, g, h, s);
                m(f, d, h, g, s);
                var r = d[s],
                    q = f && f[s],
                    u = r.length,
                    C = f && q.length;
                g.x = r[u - 2];
                g.y = r[u - 1];
                g.bx = z(r[u - 4]) || g.x;
                g.by = z(r[u - 3]) || g.y;
                h.bx = f && (z(q[C - 4]) || h.x);
                h.by = f && (z(q[C - 3]) || h.y);
                h.x = f && q[C - 2];
                h.y = f && q[C - 1];
            }
            f || (e.curve = Ba(d));
            return f ? [d, f] : d;
        }, null, Ba);
    c._parseDots = k(function(b) {
        for (var e = [], d = 0, f = b.length; d < f; d++) {
            var g = {}, h = b[d].match(/^([^:]*):?([\d\.]*)/);
            g.color = c.getRGB(h[1]);
            if (g.color.error) {
                return null;
            }
            g.color = g.color.hex;
            h[2] && (g.offset = h[2] + "%");
            e.push(g);
        }
        d = 1;
        for (f = e.length - 1; d < f; d++) {
            if (!e[d].offset) {
                b = z(e[d - 1].offset || 0);
                h = 0;
                for (g = d + 1; g < f; g++) {
                    if (e[g].offset) {
                        h = e[g].offset;
                        break;
                    }
                }
                h || (h = 100, g = f);
                h = z(h);
                for (h = (h - b) / (g - d + 1); d < g; d++) {
                    b += h, e[d].offset = b + "%";
                }
            }
        }
        return e;
    });
    var Ma = c._tear = function(b, c) {
        b == c.top && (c.top = b.prev);
        b == c.bottom && (c.bottom = b.next);
        b.next && (b.next.prev = b.prev);
        b.prev && (b.prev.next = b.next);
    };
    c._tofront = function(b, c) {
        c.top !== b && (Ma(b, c), b.next = null, b.prev = c.top, c.top.next = b, c.top = b);
    };
    c._toback = function(b, c) {
        c.bottom !== b && (Ma(b, c), b.next = c.bottom, b.prev = null, c.bottom.prev = b, c.bottom = b);
    };
    c._insertafter = function(b, c, e) {
        Ma(b, e);
        c == e.top && (e.top = b);
        c.next && (c.next.prev = b);
        b.next = c.next;
        b.prev = c;
        c.next = b;
    };
    c._insertbefore = function(b, c, e) {
        Ma(b, e);
        c == e.bottom && (e.bottom = b);
        c.prev && (c.prev.next = b);
        b.prev = c.prev;
        c.prev = b;
        b.next = c;
    };
    var Za = c.toMatrix = function(b, c) {
        var e = La(b),
            d = {
                _: {
                    transform: ""
                },
                getBBox: function() {
                    return e;
                }
            };
        hb(d, c);
        return d.matrix;
    };
    c.transformPath = function(b, c) {
        return Y(b, Za(b, c));
    };
    var hb = c._extractTransform = function(b, e) {
        if (null == e) {
            return b._.transform;
        }
        e = W(e).replace(/\.{3}|\u2026/g, b._.transform || "");
        var d = c.parseTransformString(e),
            f = 0,
            g = 0,
            h = 0,
            k = 1,
            p = 1,
            m = b._,
            h = new r;
        m.transform = d || [];
        if (d) {
            for (var g = 0, s = d.length; g < s; g++) {
                var n = d[g],
                    q = n.length,
                    u = W(n[0]).toLowerCase(),
                    C = n[0] != u,
                    x = C ? h.invert() : 0,
                    v;
                "t" == u && 3 == q ? C ? (q = x.x(0, 0), u = x.y(0, 0), C = x.x(n[1], n[2]), x = x.y(n[1], n[2]), h.translate(C - q, x - u)) : h.translate(n[1], n[2]) : "r" == u ? 2 == q ? (v = v || b.getBBox(1), h.rotate(n[1], v.x + v.width / 2, v.y + v.height / 2), f += n[1]) : 4 == q && (C ? (C = x.x(n[2], n[3]), x = x.y(n[2], n[3]), h.rotate(n[1], C, x)) : h.rotate(n[1], n[2], n[3]), f += n[1]) : "s" == u ? 2 == q || 3 == q ? (v = v || b.getBBox(1), h.scale(n[1], n[q - 1], v.x + v.width / 2, v.y + v.height /
                    2), k *= n[1], p *= n[q - 1]) : 5 == q && (C ? (C = x.x(n[3], n[4]), x = x.y(n[3], n[4]), h.scale(n[1], n[2], C, x)) : h.scale(n[1], n[2], n[3], n[4]), k *= n[1], p *= n[2]) : "m" == u && 7 == q && h.add(n[1], n[2], n[3], n[4], n[5], n[6]);
                m.dirtyT = 1;
                b.matrix = h;
            }
        }
        b.matrix = h;
        m.sx = k;
        m.sy = p;
        m.deg = f;
        m.dx = g = h.e;
        m.dy = h = h.f;
        1 == k && 1 == p && !f && m.bbox ? (m.bbox.x += +g, m.bbox.y += +h) : m.dirtyT = 1;
    }, bb = function(b) {
        var c = b[0];
        switch (c.toLowerCase()) {
            case "t":
                return [c, 0, 0];
            case "m":
                return [c, 1, 0, 0, 1, 0, 0];
            case "r":
                return 4 == b.length ? [c, 0, b[2], b[3]] : [c, 0];
            case "s":
                return 5 == b.length ? [c, 1, 1, b[3], b[4]] : 3 == b.length ? [c, 1, 1] : [c, 1];
        }
    }, Oa = c._equaliseTransform = function(b, e) {
        e = W(e).replace(/\.{3}|\u2026/g, b);
        b = c.parseTransformString(b) || [];
        e = c.parseTransformString(e) || [];
        for (var d = O(b.length, e.length), f = [], g = [], h = 0, k, p, m, s; h < d; h++) {
            m = b[h] || bb(e[h]);
            s = e[h] || bb(m);
            if (m[0] != s[0] || "r" == m[0].toLowerCase() && (m[2] != s[2] || m[3] != s[3]) || "s" == m[0].toLowerCase() && (m[3] != s[3] || m[4] != s[4])) {
                return;
            }
            f[h] = [];
            g[h] = [];
            k = 0;
            for (p = O(m.length, s.length); k < p; k++) {
                k in m && (f[h][k] = m[k]), k in s && (g[h][k] = s[k]);
            }
        }
        return {
            from: f,
            to: g
        };
    };
    c._getContainer = function(b, e, d, f) {
        var g;
        g = null != f || c.is(b, "object") ? b : D.doc.getElementById(b);
        if (null != g) {
            return g.tagName ? null == e ? {
                container: g,
                width: g.style.pixelWidth || g.offsetWidth,
                height: g.style.pixelHeight || g.offsetHeight
            } : {
                container: g,
                width: e,
                height: d
            } : {
                container: 1,
                x: b,
                y: e,
                width: d,
                height: f
            };
        }
    };
    c.pathToRelative = Ya;
    c._engine = {};
    c.path2curve = Ra;
    c.matrix = function(b, c, e, d, f, g) {
        return new r(b, c, e, d, f, g);
    };
    (function(b) {
        function e(b) {
            return b[0] * b[0] + b[1] * b[1];
        }

        function d(b) {
            var c = P.sqrt(e(b));
            b[0] && (b[0] /= c);
            b[1] && (b[1] /= c);
        }
        b.add = function(b, c, e, d, f, g) {
            var h = [
                    [],
                    [],
                    []
                ],
                k = [
                    [this.a, this.c, this.e],
                    [this.b, this.d, this.f],
                    [0, 0, 1]
                ];
            c = [
                [b, e, f],
                [c, d, g],
                [0, 0, 1]
            ];
            b && b instanceof r && (c = [
                [b.a, b.c, b.e],
                [b.b, b.d, b.f],
                [0, 0, 1]
            ]);
            for (b = 0; 3 > b; b++) {
                for (e = 0; 3 > e; e++) {
                    for (d = f = 0; 3 > d; d++) {
                        f += k[b][d] * c[d][e];
                    }
                    h[b][e] = f;
                }
            }
            this.a = h[0][0];
            this.b = h[1][0];
            this.c = h[0][1];
            this.d = h[1][1];
            this.e = h[0][2];
            this.f = h[1][2];
        };
        b.invert = function() {
            var b = this.a * this.d - this.b * this.c;
            return new r(this.d / b, -this.b / b, -this.c / b, this.a / b, (this.c * this.f - this.d * this.e) / b, (this.b * this.e - this.a * this.f) / b);
        };
        b.clone = function() {
            return new r(this.a, this.b, this.c, this.d, this.e, this.f);
        };
        b.translate = function(b, c) {
            this.add(1, 0, 0, 1, b, c);
        };
        b.scale = function(b, c, e, d) {
            null == c && (c = b);
            (e || d) && this.add(1, 0, 0, 1, e, d);
            this.add(b, 0, 0, c, 0, 0);
            (e || d) && this.add(1, 0, 0, 1, -e, -d);
        };
        b.rotate = function(b, e, d) {
            b = c.rad(b);
            e = e || 0;
            d = d || 0;
            var f = +P.cos(b).toFixed(9);
            b = +P.sin(b).toFixed(9);
            this.add(f, b, -b, f, e, d);
            this.add(1, 0, 0, 1, -e, -d);
        };
        b.x = function(b, c) {
            return b * this.a + c * this.c + this.e;
        };
        b.y = function(b, c) {
            return b * this.b + c * this.d + this.f;
        };
        b.get = function(b) {
            return +this[W.fromCharCode(97 + b)].toFixed(4);
        };
        b.toString = function() {
            return c.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join();
        };
        b.toFilter = function() {
            return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')";
        };
        b.offset = function() {
            return [this.e.toFixed(4), this.f.toFixed(4)];
        };
        b.split = function() {
            var b = {};
            b.dx = this.e;
            b.dy = this.f;
            var f = [
                [this.a, this.c],
                [this.b, this.d]
            ];
            b.scalex = P.sqrt(e(f[0]));
            d(f[0]);
            b.shear = f[0][0] * f[1][0] + f[0][1] * f[1][1];
            f[1] = [f[1][0] - f[0][0] * b.shear, f[1][1] - f[0][1] * b.shear];
            b.scaley = P.sqrt(e(f[1]));
            d(f[1]);
            b.shear /= b.scaley;
            var g = -f[0][1],
                f = f[1][1];
            0 > f ? (b.rotate = c.deg(P.acos(f)), 0 > g && (b.rotate = 360 - b.rotate)) : b.rotate = c.deg(P.asin(g));
            b.isSimple = !+b.shear.toFixed(9) && (b.scalex.toFixed(9) == b.scaley.toFixed(9) || !b.rotate);
            b.isSuperSimple = !+b.shear.toFixed(9) && b.scalex.toFixed(9) == b.scaley.toFixed(9) && !b.rotate;
            b.noRotation = !+b.shear.toFixed(9) && !b.rotate;
            return b;
        };
        b.toTransformString = function(b) {
            b = b || this[fa]();
            return b.isSimple ? (b.scalex = +b.scalex.toFixed(4), b.scaley = +b.scaley.toFixed(4), b.rotate = +b.rotate.toFixed(4), (b.dx || b.dy ? "t" + [b.dx, b.dy] : "") + (1 != b.scalex || 1 != b.scaley ? "s" + [b.scalex, b.scaley, 0, 0] : "") + (b.rotate ? "r" + [b.rotate, 0, 0] : "")) : "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)];
        };
    })(r.prototype);
    var Ka = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
    "Apple Computer, Inc." == navigator.vendor && (Ka && 4 > Ka[1] || "iP" == navigator.platform.slice(0, 2)) || "Google Inc." == navigator.vendor && Ka && 8 > Ka[1] ? A.safari = function() {
        var b = this.rect(-99, -99, this.width + 99, this.height + 99).attr({
            stroke: "none"
        });
        setTimeout(function() {
            b.remove();
        });
    } : A.safari = sa;
    for (var Qa = function() {
        this.returnValue = !1;
    }, Wa = function() {
        return this.originalEvent.preventDefault();
    }, Na = function() {
        this.cancelBubble = !0;
    }, eb = function() {
        return this.originalEvent.stopPropagation();
    }, Pa = function(b) {
        return {
            x: b.clientX + (D.doc.documentElement.scrollLeft || D.doc.body.scrollLeft),
            y: b.clientY + (D.doc.documentElement.scrollTop || D.doc.body.scrollTop)
        };
    }, kb = function() {
        if (D.doc.addEventListener) {
            return function(b, c, e, d) {
                var f = function(b) {
                    var c = Pa(b);
                    return e.call(d, b, c.x, c.y);
                };
                b.addEventListener(c, f, !1);
                Q && F[c] && b.addEventListener(F[c], function(c) {
                    for (var f = Pa(c), g = c, h = 0, k = c.targetTouches && c.targetTouches.length; h < k; h++) {
                        if (c.targetTouches[h].target == b) {
                            c = c.targetTouches[h];
                            c.originalEvent = g;
                            c.preventDefault = Wa;
                            c.stopPropagation = eb;
                            break;
                        }
                    }
                    return e.call(d, c, f.x, f.y);
                }, !1);
                return function() {
                    b.removeEventListener(c, f, !1);
                    Q && F[c] && b.removeEventListener(F[c], f, !1);
                    return !0;
                };
            };
        }
        if (D.doc.attachEvent) {
            return function(b, c, e, d) {
                var f = function(b) {
                    b = b || D.win.event;
                    var c = b.clientX + (D.doc.documentElement.scrollLeft || D.doc.body.scrollLeft),
                        f = b.clientY + (D.doc.documentElement.scrollTop || D.doc.body.scrollTop);
                    b.preventDefault = b.preventDefault || Qa;
                    b.stopPropagation = b.stopPropagation || Na;
                    return e.call(d, b, c, f);
                };
                b.attachEvent("on" + c, f);
                return function() {
                    b.detachEvent("on" + c, f);
                    return !0;
                };
            };
        }
    }(), za = [], Fa = function(b) {
        for (var c = b.clientX, e = b.clientY, f = D.doc.documentElement.scrollTop || D.doc.body.scrollTop, g = D.doc.documentElement.scrollLeft || D.doc.body.scrollLeft, h, k = za.length; k--;) {
            h = za[k];
            if (Q && b.touches) {
                for (var p = b.touches.length, m; p--;) {
                    if (m = b.touches[p], m.identifier == h.el._drag.id) {
                        c = m.clientX;
                        e = m.clientY;
                        (b.originalEvent ? b.originalEvent : b).preventDefault();
                        break;
                    }
                }
            } else {
                b.preventDefault();
            }
            var p = h.el.node,
                s = p.nextSibling,
                n = p.parentNode,
                r = p.style.display;
            D.win.opera && n.removeChild(p);
            p.style.display = "none";
            m = h.el.paper.getElementByPoint(c, e);
            p.style.display = r;
            D.win.opera && (s ? n.insertBefore(p, s) : n.appendChild(p));
            m && d("raphael.drag.over." + h.el.id, h.el, m);
            c += g;
            e += f;
            d("raphael.drag.move." + h.el.id, h.move_scope || h.el, c - h.el._drag.x, e - h.el._drag.y, c, e, b);
        }
    }, Sa = function(b) {
        c.unmousemove(Fa).unmouseup(Sa);
        for (var e = za.length, f; e--;) {
            f = za[e], f.el._drag = {}, d("raphael.drag.end." + f.el.id, f.end_scope || f.start_scope || f.move_scope || f.el, b);
        }
        za = [];
    }, ra = c.el = {}, sb = ja.length; sb--;) {
        (function(b) {
            c[b] = ra[b] = function(e, d) {
                c.is(e, "function") && (this.events = this.events || [], this.events.push({
                    name: b,
                    f: e,
                    unbind: kb(this.shape || this.node || D.doc, b, e, d || this)
                }));
                return this;
            };
            c["un" + b] = ra["un" + b] = function(e) {
                for (var d = this.events || [], f = d.length; f--;) {
                    d[f].name != b || !c.is(e, "undefined") && d[f].f != e || (d[f].unbind(), d.splice(f, 1), !d.length && delete this.events);
                }
                return this;
            };
        })(ja[sb]);
    }
    ra.data = function(b, e) {
        var f = ta[this.id] = ta[this.id] || {};
        if (1 == arguments.length) {
            if (c.is(b, "object")) {
                for (var g in b) {
                    b[y](g) && this.data(g, b[g]);
                }
                return this;
            }
            d("raphael.data.get." + this.id, this, f[b], b);
            return f[b];
        }
        f[b] = e;
        d("raphael.data.set." + this.id, this, e, b);
        return this;
    };
    ra.removeData = function(b) {
        null == b ? ta[this.id] = {} : ta[this.id] && delete ta[this.id][b];
        return this;
    };
    ra.getData = function() {
        return g(ta[this.id] || {});
    };
    ra.hover = function(b, c, e, d) {
        return this.mouseover(b, e).mouseout(c, d || e);
    };
    ra.unhover = function(b, c) {
        return this.unmouseover(b).unmouseout(c);
    };
    var Xa = [];
    ra.drag = function(b, e, f, g, h, k) {
        function p(m) {
            (m.originalEvent || m).preventDefault();
            var s = D.doc.documentElement.scrollTop || D.doc.body.scrollTop,
                n = D.doc.documentElement.scrollLeft || D.doc.body.scrollLeft;
            this._drag.x = m.clientX + n;
            this._drag.y = m.clientY + s;
            this._drag.id = m.identifier;
            !za.length && c.mousemove(Fa).mouseup(Sa);
            za.push({
                el: this,
                move_scope: g,
                start_scope: h,
                end_scope: k
            });
            e && d.on("raphael.drag.start." + this.id, e);
            b && d.on("raphael.drag.move." + this.id, b);
            f && d.on("raphael.drag.end." + this.id, f);
            d("raphael.drag.start." + this.id, h || g || this, m.clientX + n, m.clientY + s, m);
        }
        this._drag = {};
        Xa.push({
            el: this,
            start: p
        });
        this.mousedown(p);
        return this;
    };
    ra.onDragOver = function(b) {
        b ? d.on("raphael.drag.over." + this.id, b) : d.unbind("raphael.drag.over." + this.id);
    };
    ra.undrag = function() {
        for (var b = Xa.length; b--;) {
            Xa[b].el == this && (this.unmousedown(Xa[b].start), Xa.splice(b, 1), d.unbind("raphael.drag.*." + this.id));
        }!Xa.length && c.unmousemove(Fa).unmouseup(Sa);
    };
    A.circle = function(b, e, d) {
        b = c._engine.circle(this, b || 0, e || 0, d || 0);
        this.__set__ && this.__set__.push(b);
        return b;
    };
    A.rect = function(b, e, d, f, g) {
        b = c._engine.rect(this, b || 0, e || 0, d || 0, f || 0, g || 0);
        this.__set__ && this.__set__.push(b);
        return b;
    };
    A.rectBb = function(b, e, d, f, g) {
        b = c._engine.rect(this, b || 0, e || 0, d || 0, f || 0, g || 0);
        this.__set__ && this.__set__.push(b);
        return b;
    };
    A.ellipse = function(b, e, d, f) {
        b = c._engine.ellipse(this, b || 0, e || 0, d || 0, f || 0);
        this.__set__ && this.__set__.push(b);
        return b;
    };
    A.path = function(b) {
        b && !c.is(b, "string") && !c.is(b[0], T) && (b += "");
        var e = c._engine.path(c.format[G](c, arguments), this);
        this.__set__ && this.__set__.push(e);
        return e;
    };
    A.pathBb = function(b) {
        b && !c.is(b, "string") && !c.is(b[0], T) && (b += "");
        var e = c._engine.path(c.format[G](c, arguments), this, !0);
        this.__set__ && this.__set__.push(e);
        return e;
    };
    A.image = function(b, e, d, f, g) {
        b = c._engine.image(this, b || "about:blank", e || 0, d || 0, f || 0, g || 0);
        this.__set__ && this.__set__.push(b);
        return b;
    };
    A.imageBb = function(b, e, d, f, g) {
        b = c._engine.imageBb(this, b || "about:blank", e || 0, d || 0, f || 0, g || 0);
        this.__set__ && this.__set__.push(b);
        return b;
    };
    A.text = function(b, e, d) {
        b = c._engine.text(this, b || 0, e || 0, W(d));
        this.__set__ && this.__set__.push(b);
        return b;
    };
    A.set = function(b) {
        !c.is(b, "array") && (b = Array.prototype.splice.call(arguments, 0, arguments.length));
        var e = new gb(b);
        this.__set__ && this.__set__.push(e);
        e.paper = this;
        e.type = "set";
        return e;
    };
    A.setStart = function(b) {
        this.__set__ = b || this.set();
    };
    A.setFinish = function(b) {
        b = this.__set__;
        delete this.__set__;
        return b;
    };
    A.setSize = function(b, e) {
        return c._engine.setSize.call(this, b, e);
    };
    A.setViewBox = function(b, e, d, f, g) {
        return c._engine.setViewBox.call(this, b, e, d, f, g);
    };
    A.top = A.bottom = null;
    A.raphael = c;
    A.getElementByPoint = function(b, c) {
        var e, d, f = this.canvas,
            g = D.doc.elementFromPoint(b, c);
        if (D.win.opera && "svg" == g.tagName) {
            d = f.getBoundingClientRect();
            e = f.ownerDocument;
            var h = e.body,
                k = e.documentElement;
            e = d.top + (D.win.pageYOffset || k.scrollTop || h.scrollTop) - (k.clientTop || h.clientTop || 0);
            d = d.left + (D.win.pageXOffset || k.scrollLeft || h.scrollLeft) - (k.clientLeft || h.clientLeft || 0);
            h = f.createSVGRect();
            h.x = b - d;
            h.y = c - e;
            h.width = h.height = 1;
            e = f.getIntersectionList(h, null);
            e.length && (g = e[e.length - 1]);
        }
        if (!g) {
            return null;
        }
        for (; g.parentNode && g != f.parentNode && !g.raphael;) {
            g = g.parentNode;
        }
        g == this.canvas.parentNode && (g = f);
        return g = g && g.raphael ? this.getById(g.raphaelid) : null;
    };
    A.getElementsByBBox = function(b) {
        var e = this.set();
        this.forEach(function(d) {
            c.isBBoxIntersect(d.getBBox(), b) && e.push(d);
        });
        return e;
    };
    A.getById = function(b) {
        for (var c = this.bottom; c;) {
            if (c.id == b) {
                return c;
            }
            c = c.next;
        }
        return null;
    };
    A.forEach = function(b, c) {
        for (var e = this.bottom; e && !1 !== b.call(c, e);) {
            e = e.next;
        }
        return this;
    };
    A.getElementsByPoint = function(b, c) {
        var e = this.set();
        this.forEach(function(d) {
            d.isPointInside(b, c) && e.push(d);
        });
        return e;
    };
    ra.isPointInside = function(b, e) {
        var d = this.realPath = this.realPath || ga[this.type](this);
        return c.isPointInsidePath(d, b, e);
    };
    ra.getBBox = function(b) {
        if (this.removed) {
            return {};
        }
        var c = this._;
        if (b) {
            if (c.dirty || !c.bboxwt) {
                this.realPath = ga[this.type](this), c.bboxwt = La(this.realPath), c.bboxwt.toString = t, c.dirty = 0;
            }
            return c.bboxwt;
        }
        if (c.dirty || c.dirtyT || !c.bbox) {
            if (c.dirty || !this.realPath) {
                c.bboxwt = 0, this.realPath = ga[this.type](this);
            }
            c.bbox = La(Y(this.realPath, this.matrix));
            c.bbox.toString = t;
            c.dirty = c.dirtyT = 0;
        }
        return c.bbox;
    };
    ra.clone = function() {
        if (this.removed) {
            return null;
        }
        var b = this.paper[this.type]().attr(this.attr());
        this.__set__ && this.__set__.push(b);
        return b;
    };
    ra.glow = function(b) {
        if ("text" == this.type) {
            return null;
        }
        b = b || {};
        var c = (b.width || 10) + (+this.attr("stroke-width") || 1),
            e = b.fill || !1,
            d = b.opacity || 0.5,
            f = b.offsetx || 0,
            g = b.offsety || 0;
        b = b.color || "#000";
        for (var h = c / 2, k = this.paper, p = k.set(), m = this.realPath || ga[this.type](this), m = this.matrix ? Y(m, this.matrix) : m, s = 1; s < h + 1; s++) {
            p.push(k.path(m).attr({
                stroke: b,
                fill: e ? b : "none",
                "stroke-linejoin": "round",
                "stroke-linecap": "round",
                "stroke-width": +(c / h * s).toFixed(3),
                opacity: +(d / h).toFixed(3)
            }));
        }
        return p.insertBefore(this).translate(f, g);
    };
    var ib = function(b, e, d, f, g, h, k, p, s) {
            return null == s ? m(b, e, d, f, g, h, k, p) : c.findDotsAtSegment(b, e, d, f, g, h, k, p, q(b, e, d, f, g, h, k, p, s));
        }, jb = function(b, e) {
            return function(d, f, g) {
                d = Ra(d);
                for (var h, k, p, m, s = "", n = {}, r = 0, q = 0, u = d.length; q < u; q++) {
                    p = d[q];
                    if ("M" == p[0]) {
                        h = +p[1], k = +p[2];
                    } else {
                        m = ib(h, k, p[1], p[2], p[3], p[4], p[5], p[6]);
                        if (r + m > f) {
                            if (e && !n.start) {
                                h = ib(h, k, p[1], p[2], p[3], p[4], p[5], p[6], f - r);
                                s += ["C" + h.start.x, h.start.y, h.m.x, h.m.y, h.x, h.y];
                                if (g) {
                                    return s;
                                }
                                n.start = s;
                                s = ["M" + h.x, h.y + "C" + h.n.x, h.n.y, h.end.x, h.end.y, p[5], p[6]].join();
                                r += m;
                                h = +p[5];
                                k = +p[6];
                                continue;
                            }
                            if (!b && !e) {
                                return h = ib(h, k, p[1], p[2], p[3], p[4], p[5], p[6], f - r), {
                                    x: h.x,
                                    y: h.y,
                                    alpha: h.alpha
                                };
                            }
                        }
                        r += m;
                        h = +p[5];
                        k = +p[6];
                    }
                    s += p.shift() + p;
                }
                n.end = s;
                h = b ? r : e ? n : c.findDotsAtSegment(h, k, p[0], p[1], p[2], p[3], p[4], p[5], 1);
                h.alpha && (h = {
                    x: h.x,
                    y: h.y,
                    alpha: h.alpha
                });
                return h;
            };
        }, ub = jb(1),
        vb = jb(),
        pb = jb(0, 1);
    c.getTotalLength = ub;
    c.getPointAtLength = vb;
    c.getSubpath = function(b, c, e) {
        if (1E-6 > this.getTotalLength(b) - e) {
            return pb(b, c).end;
        }
        b = pb(b, e, 1);
        return c ? pb(b, c).end : b;
    };
    ra.getTotalLength = function() {
        if ("path" == this.type) {
            return this.node.getTotalLength ? this.node.getTotalLength() : ub(this.attrs.path);
        }
    };
    ra.getPointAtLength = function(b) {
        if ("path" == this.type) {
            return vb(this.attrs.path, b);
        }
    };
    ra.getSubpath = function(b, e) {
        if ("path" == this.type) {
            return c.getSubpath(this.attrs.path, b, e);
        }
    };
    var Da = c.easing_formulas = {
        linear: function(b) {
            return b;
        },
        "<": function(b) {
            return Z(b, 1.7);
        },
        ">": function(b) {
            return Z(b, 0.48);
        },
        "<>": function(b) {
            var c = 0.48 - b / 1.04,
                e = P.sqrt(0.1734 + c * c);
            b = e - c;
            b = Z(U(b), 1 / 3) * (0 > b ? -1 : 1);
            c = -e - c;
            c = Z(U(c), 1 / 3) * (0 > c ? -1 : 1);
            b = b + c + 0.5;
            return 3 * (1 - b) * b * b + b * b * b;
        },
        backIn: function(b) {
            return b * b * (2.70158 * b - 1.70158);
        },
        backOut: function(b) {
            b -= 1;
            return b * b * (2.70158 * b + 1.70158) + 1;
        },
        elastic: function(b) {
            return b == !! b ? b : Z(2, -10 * b) * P.sin(2 * (b - 0.075) * L / 0.3) + 1;
        },
        bounce: function(b) {
            b < 1 / 2.75 ? b *= 7.5625 * b : b < 2 / 2.75 ? (b -= 1.5 / 2.75, b = 7.5625 * b * b + 0.75) : b < 2.5 / 2.75 ? (b -= 2.25 / 2.75, b = 7.5625 * b * b + 0.9375) : (b -= 2.625 / 2.75, b = 7.5625 * b * b + 0.984375);
            return b;
        }
    };
    Da.easeIn = Da["ease-in"] = Da["<"];
    Da.easeOut = Da["ease-out"] = Da[">"];
    Da.easeInOut = Da["ease-in-out"] = Da["<>"];
    Da["back-in"] = Da.backIn;
    Da["back-out"] = Da.backOut;
    var pa = [],
        tb = b.requestAnimationFrame || b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame || b.oRequestAnimationFrame || b.msRequestAnimationFrame || function(b) {
            setTimeout(b, 16);
        }, ob = function() {
            for (var b = +new Date, e = 0; e < pa.length; e++) {
                var f = pa[e];
                if (!f.el.removed && !f.paused) {
                    var g = b - f.start,
                        h = f.ms,
                        k = f.easing,
                        p = f.from,
                        m = f.diff,
                        s = f.to,
                        n = f.el,
                        r = {}, q, C = {}, x;
                    f.initstatus ? (g = (f.initstatus * f.anim.top - f.prev) / (f.percent - f.prev) * h, f.status = f.initstatus, delete f.initstatus, f.stop && pa.splice(e--, 1)) : f.status = (f.prev + g / h * (f.percent - f.prev)) / f.anim.top;
                    if (!(0 > g)) {
                        if (g < h) {
                            var v = k(g / h),
                                w;
                            for (w in p) {
                                if (p[y](w)) {
                                    switch (la[w]) {
                                        case K:
                                            q = +p[w] + v * h * m[w];
                                            break;
                                        case "colour":
                                            q = "rgb(" + [qb(oa(p[w].r + v * h * m[w].r)), qb(oa(p[w].g + v * h * m[w].g)), qb(oa(p[w].b + v * h * m[w].b))].join() + ")";
                                            break;
                                        case "path":
                                            q = [];
                                            g = 0;
                                            for (k = p[w].length; g < k; g++) {
                                                q[g] = [p[w][g][0]];
                                                s = 1;
                                                for (C = p[w][g].length; s < C; s++) {
                                                    q[g][s] = +p[w][g][s] + v * h * m[w][g][s];
                                                }
                                                q[g] = q[g].join(da);
                                            }
                                            q = q.join(da);
                                            break;
                                        case "transform":
                                            if (m[w].real) {
                                                for (q = [], g = 0, k = p[w].length; g < k; g++) {
                                                    for (q[g] = [p[w][g][0]], s = 1, C = p[w][g].length; s < C; s++) {
                                                        q[g][s] = p[w][g][s] + v * h * m[w][g][s];
                                                    }
                                                }
                                            } else {
                                                q = function(b) {
                                                    return +p[w][b] + v * h * m[w][b];
                                                }, q = [
                                                    ["m", q(0), q(1), q(2), q(3), q(4), q(5)]
                                                ];
                                            }
                                            break;
                                        case "csv":
                                            if ("clip-rect" == w) {
                                                for (q = [], g = 4; g--;) {
                                                    q[g] = +p[w][g] + v * h * m[w][g];
                                                }
                                            }
                                            break;
                                        default:
                                            for (k = [][H](p[w]), q = [], g = n.paper.customAttributes[w].length; g--;) {
                                                q[g] = +k[g] + v * h * m[w][g];
                                            };
                                    }
                                    r[w] = q;
                                }
                            }
                            n.attr(r);
                            (function(b, c, e) {
                                setTimeout(function() {
                                    d("raphael.anim.frame." + b, c, e);
                                });
                            })(n.id, n, f.anim);
                        } else {
                            (function(b, e, f) {
                                setTimeout(function() {
                                    d("raphael.anim.frame." + e.id, e, f);
                                    d("raphael.anim.finish." + e.id, e, f);
                                    c.is(b, "function") && b.call(e);
                                });
                            })(f.callback, n, f.anim);
                            n.attr(s);
                            pa.splice(e--, 1);
                            if (1 < f.repeat && !f.next) {
                                for (x in s) {
                                    s[y](x) && (C[x] = f.totalOrigin[x]);
                                }
                                f.el.attr(C);
                                u(f.anim, f.el, f.anim.percents[0], null, f.totalOrigin, f.repeat - 1);
                            }
                            f.next && !f.stop && u(f.anim, f.el, f.next, null, f.totalOrigin, f.repeat);
                        }
                    }
                }
            }
            c.svg && n && n.paper && n.paper.safari();
            pa.length && tb(ob);
        }, qb = function(b) {
            return 255 < b ? 255 : 0 > b ? 0 : b;
        };
    ra.animateWith = function(b, d, f, g, h, k) {
        if (this.removed) {
            return k && k.call(this), this;
        }
        f = f instanceof e ? f : c.animation(f, g, h, k);
        u(f, this, f.percents[0], null, this.attr());
        f = 0;
        for (g = pa.length; f < g; f++) {
            if (pa[f].anim == d && pa[f].el == b) {
                pa[g - 1].start = pa[f].start;
                break;
            }
        }
        return this;
    };
    ra.onAnimation = function(b) {
        b ? d.on("raphael.anim.frame." + this.id, b) : d.unbind("raphael.anim.frame." + this.id);
        return this;
    };
    e.prototype.delay = function(b) {
        var c = new e(this.anim, this.ms);
        c.times = this.times;
        c.del = +b || 0;
        return c;
    };
    e.prototype.repeat = function(b) {
        var c = new e(this.anim, this.ms);
        c.del = this.del;
        c.times = P.floor(O(b, 0)) || 1;
        return c;
    };
    c.animation = function(b, d, f, g) {
        if (b instanceof e) {
            return b;
        }
        if (c.is(f, "function") || !f) {
            g = g || f || null, f = null;
        }
        b = Object(b);
        d = +d || 0;
        var h = {}, k, p;
        for (p in b) {
            b[y](p) && z(p) != p && z(p) + "%" != p && (k = !0, h[p] = b[p]);
        }
        return k ? (f && (h.easing = f), g && (h.callback = g), new e({
            100: h
        }, d)) : new e(b, d);
    };
    ra.animate = function(b, d, f, g) {
        if (this.removed) {
            return g && g.call(this), this;
        }
        b = b instanceof e ? b : c.animation(b, d, f, g);
        u(b, this, b.percents[0], null, this.attr());
        return this;
    };
    ra.setTime = function(b, c) {
        b && null != c && this.status(b, N(c, b.ms) / b.ms);
        return this;
    };
    ra.status = function(b, c) {
        var e = [],
            d = 0,
            f, g;
        if (null != c) {
            return u(b, this, -1, N(c, 1)), this;
        }
        for (f = pa.length; d < f; d++) {
            if (g = pa[d], g.el.id == this.id && (!b || g.anim == b)) {
                if (b) {
                    return g.status;
                }
                e.push({
                    anim: g.anim,
                    status: g.status
                });
            }
        }
        return b ? 0 : e;
    };
    ra.pause = function(b) {
        for (var c = 0; c < pa.length; c++) {
            pa[c].el.id != this.id || b && pa[c].anim != b || !1 === d("raphael.anim.pause." + this.id, this, pa[c].anim) || (pa[c].paused = !0);
        }
        return this;
    };
    ra.resume = function(b) {
        for (var c = 0; c < pa.length; c++) {
            if (pa[c].el.id == this.id && (!b || pa[c].anim == b)) {
                var e = pa[c];
                !1 !== d("raphael.anim.resume." + this.id, this, e.anim) && (delete e.paused, this.status(e.anim, e.status));
            }
        }
        return this;
    };
    ra.stop = function(b) {
        for (var c = 0; c < pa.length; c++) {
            pa[c].el.id != this.id || b && pa[c].anim != b || !1 !== d("raphael.anim.stop." + this.id, this, pa[c].anim) && pa.splice(c--, 1);
        }
        return this;
    };
    d.on("raphael.remove", s);
    d.on("raphael.clear", s);
    ra.toString = function() {
        return "Rapha\u00ebl\u2019s object";
    };
    var gb = function(b) {
        this.items = [];
        this.length = 0;
        this.type = "set";
        if (b) {
            for (var c = 0, e = b.length; c < e; c++) {
                !b[c] || b[c].constructor != ra.constructor && b[c].constructor != gb || (this[this.items.length] = this.items[this.items.length] = b[c], this.length++);
            }
        }
    }, Aa = gb.prototype;
    Aa.push = function() {
        for (var b, c, e = 0, d = arguments.length; e < d; e++) {
            !(b = arguments[e]) || b.constructor != ra.constructor && b.constructor != gb || (c = this.items.length, this[c] = this.items[c] = b, this.length++);
        }
        return this;
    };
    Aa.pop = function() {
        this.length && delete this[this.length--];
        return this.items.pop();
    };
    Aa.forEach = function(b, c) {
        for (var e = 0, d = this.items.length; e < d && !1 !== b.call(c, this.items[e], e); e++) {}
        return this;
    };
    for (var rb in ra) {
        ra[y](rb) && (Aa[rb] = function(b) {
            return function() {
                var c = arguments;
                return this.forEach(function(e) {
                    e[b][G](e, c);
                });
            };
        }(rb));
    }
    Aa.attr = function(b, e) {
        if (b && c.is(b, T) && c.is(b[0], "object")) {
            for (var d = 0, f = b.length; d < f; d++) {
                this.items[d].attr(b[d]);
            }
        } else {
            for (d = 0, f = this.items.length; d < f; d++) {
                this.items[d].attr(b, e);
            }
        }
        return this;
    };
    Aa.clear = function() {
        for (; this.length;) {
            this.pop();
        }
    };
    Aa.splice = function(b, c, e) {
        b = 0 > b ? O(this.length + b, 0) : b;
        c = O(0, N(this.length - b, c));
        var d = [],
            f = [],
            g = [],
            h;
        for (h = 2; h < arguments.length; h++) {
            g.push(arguments[h]);
        }
        for (h = 0; h < c; h++) {
            f.push(this[b + h]);
        }
        for (; h < this.length - b; h++) {
            d.push(this[b + h]);
        }
        var k = g.length;
        for (h = 0; h < k + d.length; h++) {
            this.items[b + h] = this[b + h] = h < k ? g[h] : d[h - k];
        }
        for (h = this.items.length = this.length -= c - k; this[h];) {
            delete this[h++];
        }
        return new gb(f);
    };
    Aa.exclude = function(b) {
        for (var c = 0, e = this.length; c < e; c++) {
            if (this[c] == b) {
                return this.splice(c, 1), !0;
            }
        }
    };
    Aa.animate = function(b, e, d, f) {
        !c.is(d, "function") && d || (f = d || null);
        var g = this.items.length,
            h = g,
            k = this,
            p;
        if (!g) {
            return this;
        }
        f && (p = function() {
            !--g && f.call(k);
        });
        d = c.is(d, "string") ? d : p;
        e = c.animation(b, e, d, p);
        for (b = this.items[--h].animate(e); h--;) {
            this.items[h] && !this.items[h].removed && this.items[h].animateWith(b, e, e);
        }
        return this;
    };
    Aa.insertAfter = function(b) {
        for (var c = this.items.length; c--;) {
            this.items[c].insertAfter(b);
        }
        return this;
    };
    Aa.getBBox = function() {
        for (var b = [], c = [], e = [], d = [], f = this.items.length; f--;) {
            if (!this.items[f].removed) {
                var g = this.items[f].getBBox();
                b.push(g.x);
                c.push(g.y);
                e.push(g.x + g.width);
                d.push(g.y + g.height);
            }
        }
        b = N[G](0, b);
        c = N[G](0, c);
        e = O[G](0, e);
        d = O[G](0, d);
        return {
            x: b,
            y: c,
            x2: e,
            y2: d,
            width: e - b,
            height: d - c
        };
    };
    Aa.clone = function(b) {
        b = this.paper.set();
        for (var c = 0, e = this.items.length; c < e; c++) {
            b.push(this.items[c].clone());
        }
        return b;
    };
    Aa.toString = function() {
        return "Rapha\u00ebl\u2018s set";
    };
    Aa.glow = function(b) {
        var c = this.paper.set();
        this.forEach(function(e, d) {
            var f = e.glow(b);
            null != f && f.forEach(function(b, e) {
                c.push(b);
            });
        });
        return c;
    };
    c.registerFont = function(b) {
        // debugger;
        if (!b.face) {
            return b;
        }
        this.fonts = this.fonts || {};
        var c = {
                w: b.w,
                face: {},
                glyphs: {}
            }, e = b.face["font-family"],
            d;
        for (d in b.face) {
            b.face[y](d) && (c.face[d] = b.face[d]);
        }
        //ZYF
//        this.fonts[e] ? this.fonts[e].push(c) : this.fonts[e] = [c];
        this.fonts[e] = [c];

        if (!b.svg) {
            c.face["units-per-em"] = ka(b.face["units-per-em"], 10);
            for (var f in b.glyphs) {
                if (b.glyphs[y](f) && (e = b.glyphs[f], c.glyphs[f] = {
                    w: e.w,
                    k: {},
                    d: e.d && "M" + e.d.replace(/[mlcxtrv]/g, function(b) {
                        return {
                            l: "L",
                            c: "C",
                            x: "z",
                            t: "m",
                            r: "l",
                            v: "c"
                        }[b] || "M";
                    }) + "z"
                }, e.k)) {
                    for (var g in e.k) {
                        e[y](g) && (c.glyphs[f].k[g] = e.k[g]);
                    }
                }
            }
        }
        return b;
    };
    A.getFont = function(b, e, d, f) {
        f = f || "normal";
        d = d || "normal";
        e = +e || {
            normal: 400,
            bold: 700,
            lighter: 300,
            bolder: 800
        }[e] || 400;
        if (c.fonts) {
            var g = c.fonts[b];
            if (!g) {
                b = RegExp("(^|\\s)" + b.replace(/[^\w\d\s+!~.:_-]/g, "") + "(\\s|$)", "i");
                for (var h in c.fonts) {
                    if (c.fonts[y](h) && b.test(h)) {
                        g = c.fonts[h];
                        break;
                    }
                }
            }
            var k;
            if (g) {
                for (h = 0, b = g.length; h < b && (k = g[h], k.face["font-weight"] != e || k.face["font-style"] != d && k.face["font-style"] || k.face["font-stretch"] != f); h++) {}
                g.splice(0, g.length-1);
                k = g[0];
            }
            return k;
        }
    };
    A.print = function(b, e, d, f, g, h, k, p) {
        h = h || "middle";
        k = O(N(k || 0, 1), -1);
        p = O(N(p || 1, 3), 1);
        d = W(d)[fa]("");
        var m = 0,
            s = 0,
            n = "";
        c.is(f, "string") && (f = this.getFont(f));
        if (f) {
            g = (g || 16) / f.face["units-per-em"];
            var q = f.face.bbox[fa](v),
                r = +q[0],
                u = q[3] - q[1],
                C = 0;
            h = +q[1] + ("baseline" == h ? u + +f.face.descent : u / 2);
            for (var q = 0, x = d.length; q < x; q++) {
                if ("\n" == d[q]) {
                    s = ba = m = 0, C += u * p;
                } else {
                    var w = s && f.glyphs[d[q - 1]] || {}, ba = f.glyphs[d[q]],
                        m = m + (s ? (w.w || f.w) + (w.k && w.k[d[q]] || 0) + f.w * k : 0),
                        s = 1
                }
                ba && ba.d && (n += c.transformPath(ba.d, ["t", m * g, C * g, "s", g, g, r, h, "t", (b - r) / g, (e - h) / g]));
            }
        }
        return this.path(n).attr({
            fill: "#000",
            stroke: "none"
        });
    };
    A.printBb = function(b, e, d, f, g, h, k, p) {
        h = h || "middle";
        k = O(N(k || 0, 1), -1);
        p = O(N(p || 1, 3), 1);
        d = W(d)[fa]("");
        var m = 0,
            s = 0,
            n = "";
        c.is(f, "string") && (f = this.getFont(f));
        if (f) {
            g = (g || 16) / f.face["units-per-em"];
            var q = f.face.bbox[fa](v),
                r = +q[0],
                u = q[3] - q[1],
                C = 0;
            h = +q[1] + ("baseline" == h ? u + +f.face.descent : u / 2);
            for (var q = 0, x = d.length; q < x; q++) {
                if ("\n" == d[q]) {
                    s = ba = m = 0, C += u * p;
                } else {
                    var w = s && f.glyphs[d[q - 1]] || {}, ba = f.glyphs[d[q]],
                        m = m + (s ? (w.w || f.w) + (w.k && w.k[d[q]] || 0) + f.w * k : 0),
                        s = 1
                }
                ba && ba.d && (n += c.transformPath(ba.d, ["t", m * g, C * g, "s", g, g, r, h, "t", (b - r) / g, (e - h) / g]));
            }
        }
        return this.pathBb(n).attr({
            fill: "#000",
            stroke: "none"
        });
    };
    A.add = function(b) {
        if (c.is(b, "array")) {
            for (var e = this.set(), d = 0, f = b.length, g; d < f; d++) {
                g = b[d] || {}, x[y](g.type) && e.push(this[g.type]().attr(g));
            }
        }
        return e;
    };
    c.format = function(b, e) {
        var d = c.is(e, T) ? [0][H](e) : arguments;
        b && c.is(b, "string") && d.length - 1 && (b = b.replace(B, function(b, c) {
            return null == d[++c] ? "" : d[c];
        }));
        return b || "";
    };
    c.fullfill = function() {
        var b = /\{([^\}]+)\}/g,
            c = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
            e = function(b, e, d) {
                var f = d;
                e.replace(c, function(b, c, e, d, g) {
                    c = c || d;
                    f && (c in f && (f = f[c]), "function" == typeof f && g && (f = f()));
                });
                return f = (null == f || f == d ? b : f) + "";
            };
        return function(c, d) {
            return String(c).replace(b, function(b, c) {
                return e(b, c, d);
            });
        };
    }();
    c.ninja = function() {
        V ? D.win.Raphael = ca : delete Raphael;
        return c;
    };
    c.st = Aa;
    (function(b, e, d) {
        function f() {
            /in/.test(b.readyState) ? setTimeout(f, 9) : c.eve("raphael.DOMload");
        }
        null == b.readyState && b.addEventListener && (b.addEventListener(e, d = function() {
            b.removeEventListener(e, d, !1);
            b.readyState = "complete";
        }, !1), b.readyState = "loading");
        f();
    })(document, "DOMContentLoaded");
    d.on("raphael.DOMload", function() {
        w = !0;
    });
    (function() {
        if (c.svg) {
            var b = String,
                e = parseFloat,
                d = parseInt,
                f = Math,
                g = f.max,
                h = f.abs,
                k = f.pow,
                p = /[, ]+/,
                m = c.eve,
                s = {
                    block: "M5,0 0,2.5 5,5z",
                    classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
                    diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
                    open: "M6,1 1,3.5 6,6",
                    oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
                }, n = {};
            c.toString = function() {
                return "您的浏览器支持 SVG.\n可以运行 Raphael " + this.version;
            };
            var q = function(e, d) {
                if (d) {
                    "string" == typeof e && (e = q(e));
                    for (var f in d) {

                        d.hasOwnProperty(f) && ("xlink:" == f.substring(0, 6) ? e.setAttributeNS("http://www.w3.org/1999/xlink", f.substring(6), b(d[f])) : "xmlns" == f ? e.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg") : "xmlns:xlink" == f ? e.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink") : e.setAttribute(f, b(d[f])));
                    }
                } else {
                    e = c._g.doc.createElementNS("http://www.w3.org/2000/svg", e), e.style && (e.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
                }
                return e;
            }, r = function(d, p) {
                var m = "linear",
                    s = d.id + p,
                    n = 0.5,
                    r = 0.5,
                    u = d.node,
                    C = d.paper,
                    x = u.style,
                    w = c._g.doc.getElementById(s);
                if (!w) {
                    p = b(p).replace(c._radial_gradient, function(b, c, d) {
                        m = "radial";
                        c && d && (n = e(c), r = e(d), b = 2 * (0.5 < r) - 1, 0.25 < k(n - 0.5, 2) + k(r - 0.5, 2) && (r = f.sqrt(0.25 - k(n - 0.5, 2)) * b + 0.5) && 0.5 != r && (r = r.toFixed(5) - 1E-5 * b));
                        return "";
                    });
                    p = p.split(/\s*\-\s*/);
                    if ("linear" == m) {
                        w = p.shift();
                        w = -e(w);
                        if (isNaN(w)) {
                            return null;
                        }
                        var v = [0, 0, f.cos(c.rad(w)), f.sin(c.rad(w))],
                            w = 1 / (g(h(v[2]), h(v[3])) || 1);
                        v[2] *= w;
                        v[3] *= w;
                        0 > v[2] && (v[0] = -v[2], v[2] = 0);
                        0 > v[3] && (v[1] = -v[3], v[3] = 0);
                    }
                    var ba = c._parseDots(p);
                    if (!ba) {
                        return null;
                    }
                    s = s.replace(/[\(\)\s,\xb0#]/g, "_");
                    d.gradient && s != d.gradient.id && (C.defs.removeChild(d.gradient), delete d.gradient);
                    if (!d.gradient) {
                        for (w = q(m + "Gradient", {
                            id: s
                        }), d.gradient = w, q(w, "radial" == m ? {
                            fx: n,
                            fy: r
                        } : {
                            x1: v[0],
                            y1: v[1],
                            x2: v[2],
                            y2: v[3],
                            gradientTransform: d.matrix.invert()
                        }), C.defs.appendChild(w), C = 0, v = ba.length; C < v; C++) {
                            w.appendChild(q("stop", {
                                offset: ba[C].offset ? ba[C].offset : C ? "100%" : "0%",
                                "stop-color": ba[C].color || "#fff"
                            }));
                        }
                    }
                }
                q(u, {
                    fill: "url(#" + s + ")",
                    opacity: 1,
                    "fill-opacity": 1
                });
                x.fill = "";
                x.opacity = 1;
                return x.fillOpacity = 1;
            }, u = function(b) {
                var c = b.getBBox(1);
                q(b.pattern, {
                    patternTransform: b.matrix.invert() + " translate(" + c.x + "," + c.y + ")"
                });
            }, C = function(e, d, f) {
                if ("path" == e.type) {
                    for (var g = b(d).toLowerCase().split("-"), h = e.paper, k = f ? "end" : "start", p = e.node, m = e.attrs, r = m["stroke-width"], u = g.length, C = "classic", w, x, v = 3, ba = 3, y = 5; u--;) {
                        switch (g[u]) {
                            case "block":
                                ;
                            case "classic":
                                ;
                            case "oval":
                                ;
                            case "diamond":
                                ;
                            case "open":
                                ;
                            case "none":
                                C = g[u];
                                break;
                            case "wide":
                                ba = 5;
                                break;
                            case "narrow":
                                ba = 2;
                                break;
                            case "long":
                                v = 5;
                                break;
                            case "short":
                                v = 2;
                        }
                    }
                    "open" == C ? (v += 2, ba += 2, y += 2, w = 1, x = f ? 4 : 1, g = {
                        fill: "none",
                        stroke: m.stroke
                    }) : (x = w = v / 2, g = {
                        fill: m.stroke,
                        stroke: "none"
                    });
                    e._.arrows ? f ? (e._.arrows.endPath && n[e._.arrows.endPath]--, e._.arrows.endMarker && n[e._.arrows.endMarker]--) : (e._.arrows.startPath && n[e._.arrows.startPath]--, e._.arrows.startMarker && n[e._.arrows.startMarker]--) : e._.arrows = {};
                    if ("none" != C) {
                        var u = "raphael-marker-" + C,
                            t = "raphael-marker-" + k + C + v + ba;
                        c._g.doc.getElementById(u) ? n[u]++ : (h.defs.appendChild(q(q("path"), {
                            "stroke-linecap": "round",
                            d: s[C],
                            id: u
                        })), n[u] = 1);
                        var ga = c._g.doc.getElementById(t);
                        ga ? (n[t]++, v = ga.getElementsByTagName("use")[0]) : (ga = q(q("marker"), {
                            id: t,
                            markerHeight: ba,
                            markerWidth: v,
                            orient: "auto",
                            refX: x,
                            refY: ba / 2
                        }), v = q(q("use"), {
                            "xlink:href": "#" + u,
                            transform: (f ? "rotate(180 " + v / 2 + " " + ba / 2 + ") " : "") + "scale(" + v / y + "," + ba / y + ")",
                            "stroke-width": (1 / ((v / y + ba / y) / 2)).toFixed(4)
                        }), ga.appendChild(v), h.defs.appendChild(ga), n[t] = 1);
                        q(v, g);
                        h = w * ("diamond" != C && "oval" != C);
                        f ? (f = e._.arrows.startdx * r || 0, r = c.getTotalLength(m.path) - h * r) : (f = h * r, r = c.getTotalLength(m.path) - (e._.arrows.enddx * r || 0));
                        g = {};
                        g["marker-" + k] = "url(#" + t + ")";
                        if (r || f) {
                            g.d = c.getSubpath(m.path, f, r);
                        }
                        q(p, g);
                        e._.arrows[k + "Path"] = u;
                        e._.arrows[k + "Marker"] = t;
                        e._.arrows[k + "dx"] = h;
                        e._.arrows[k + "Type"] = C;
                        e._.arrows[k + "String"] = d;
                    } else {
                        f ? (f = e._.arrows.startdx * r || 0, r = c.getTotalLength(m.path) - f) : (f = 0, r = c.getTotalLength(m.path) - (e._.arrows.enddx * r || 0)), e._.arrows[k + "Path"] && q(p, {
                            d: c.getSubpath(m.path, f, r)
                        }), delete e._.arrows[k + "Path"], delete e._.arrows[k + "Marker"], delete e._.arrows[k + "dx"], delete e._.arrows[k + "Type"], delete e._.arrows[k + "String"];
                    }
                    for (g in n) {
                        n.hasOwnProperty(g) && !n[g] && (e = c._g.doc.getElementById(g)) && e.parentNode.removeChild(e);
                    }
                }
            }, x = {
                "": [0],
                none: [0],
                "-": [3, 1],
                ".": [1, 1],
                "-.": [3, 1, 1, 1],
                "-..": [3, 1, 1, 1, 1, 1],
                ". ": [1, 3],
                "- ": [4, 3],
                "--": [8, 3],
                "- .": [4, 3, 1, 3],
                "--.": [8, 3, 1, 3],
                "--..": [8, 3, 1, 3, 1, 3]
            }, w = function(c, e, d) {
                if (e = x[b(e).toLowerCase()]) {
                    var f = c.attrs["stroke-width"] || "1";
                    d = {
                        round: f,
                        square: f,
                        butt: 0
                    }[c.attrs["stroke-linecap"] || d["stroke-linecap"]] || 0;
                    for (var g = [], h = e.length; h--;) {
                        g[h] = e[h] * f + (h % 2 ? 1 : -1) * d;
                    }
                    q(c.node, {
                        "stroke-dasharray": g.join(",")
                    });
                }
            }, v = function(e, f) {
                var k = e.node,
                    m = e.attrs,
                    s = k.style.visibility;
                k.style.visibility = "hidden";
                for (var n in f) {
                    if (f.hasOwnProperty(n) && c._availableAttrs.hasOwnProperty(n)) {
                        var v = f[n];
                        m[n] = v;
                        switch (n) {
                            case "blur":
                                e.blur(v);
                                break;
                            case "href":
                                ;
                            case "title":
                                ;
                            case "target":
                                var x = k.parentNode;
                                if ("a" != x.tagName.toLowerCase()) {
                                    var y = q("a");
                                    x.insertBefore(y, k);
                                    y.appendChild(k);
                                    x = y;
                                }
                                "target" == n ? x.setAttributeNS("http://www.w3.org/1999/xlink", "show", "blank" == v ? "new" : v) : x.setAttributeNS("http://www.w3.org/1999/xlink", n, v);
                                break;
                            case "cursor":
                                k.style.cursor = v;
                                break;
                            case "transform":
                                e.transform(v);
                                break;
                            case "arrow-start":
                                C(e, v);
                                break;
                            case "arrow-end":
                                C(e, v, 1);
                                break;
                            case "clip-rect":
                                x = b(v).split(p);
                                if (4 == x.length) {
                                    e.clip && e.clip.parentNode.parentNode.removeChild(e.clip.parentNode);
                                    var y = q("clipPath"),
                                        t = q("rect");
                                    y.id = c.createUUID();
                                    q(t, {
                                        x: x[0],
                                        y: x[1],
                                        width: x[2],
                                        height: x[3]
                                    });
                                    y.appendChild(t);
                                    e.paper.defs.appendChild(y);
                                    q(k, {
                                        "clip-path": "url(#" + y.id + ")"
                                    });
                                    e.clip = t;
                                }!v && (v = k.getAttribute("clip-path")) && ((v = c._g.doc.getElementById(v.replace(/(^url\(#|\)$)/g, ""))) && v.parentNode.removeChild(v), q(k, {
                                "clip-path": ""
                            }), delete e.clip);
                                break;
                            case "path":
                                "path" == e.type && (q(k, {
                                    d: v ? m.path = c._pathToAbsolute(v) : "M0,0"
                                }), e._.dirty = 1, e._.arrows && ("startString" in e._.arrows && C(e, e._.arrows.startString), "endString" in e._.arrows && C(e, e._.arrows.endString, 1)));
                                break;
                            case "width":
                                if (k.setAttribute(n, v), e._.dirty = 1, m.fx) {
                                    n = "x", v = m.x;
                                } else {
                                    break;
                                };
                            case "x":
                                m.fx && (v = -m.x - (m.width || 0));
                            case "rx":
                                if ("rx" == n && "rect" == e.type) {
                                    break;
                                };
                            case "cx":
                                k.setAttribute(n, v);
                                e.pattern && u(e);
                                e._.dirty = 1;
                                break;
                            case "height":
                                if (k.setAttribute(n, v), e._.dirty = 1, m.fy) {
                                    n = "y", v = m.y;
                                } else {
                                    break;
                                };
                            case "y":
                                m.fy && (v = -m.y - (m.height || 0));
                            case "ry":
                                if ("ry" == n && "rect" == e.type) {
                                    break;
                                };
                            case "cy":
                                k.setAttribute(n, v);
                                e.pattern && u(e);
                                e._.dirty = 1;
                                break;
                            case "r":
                                "rect" == e.type ? q(k, {
                                    rx: v,
                                    ry: v
                                }) : k.setAttribute(n, v);
                                e._.dirty = 1;
                                break;
                            case "src":
                                "image" == e.type && k.setAttributeNS("http://www.w3.org/1999/xlink", "href", v);
                                break;
                            case "stroke-width":
                                if (1 != e._.sx || 1 != e._.sy) {
                                    v /= g(h(e._.sx), h(e._.sy)) || 1;
                                }
                                e.paper._vbSize && (v *= e.paper._vbSize);
                                k.setAttribute(n, v);
                                m["stroke-dasharray"] && w(e, m["stroke-dasharray"], f);
                                e._.arrows && ("startString" in e._.arrows && C(e, e._.arrows.startString), "endString" in e._.arrows && C(e, e._.arrows.endString, 1));
                                break;
                            case "stroke-dasharray":
                                w(e, v, f);
                                break;
                            case "fill":
                                var ga = b(v).match(c._ISURL);
                                if (ga) {
                                    var y = q("pattern"),
                                        B = q("image");
                                    y.id = c.createUUID();
                                    q(y, {
                                        x: 0,
                                        y: 0,
                                        patternUnits: "userSpaceOnUse",
                                        height: 1,
                                        width: 1
                                    });
                                    q(B, {
                                        x: 0,
                                        y: 0,
                                        "xlink:href": ga[1]
                                    });
                                    y.appendChild(B);
                                    (function(b) {
                                        c._preload(ga[1], function() {
                                            var c = this.offsetWidth,
                                                d = this.offsetHeight;
                                            q(b, {
                                                width: c,
                                                height: d
                                            });
                                            q(B, {
                                                width: c,
                                                height: d
                                            });
                                            e.paper.safari();
                                        });
                                    })(y);
                                    e.paper.defs.appendChild(y);
                                    q(k, {
                                        fill: "url(#" + y.id + ")"
                                    });
                                    e.pattern = y;
                                    e.pattern && u(e);
                                    break;
                                }
                                x = c.getRGB(v);
                                if (!x.error) {
                                    delete f.gradient, delete m.gradient, !c.is(m.opacity, "undefined") && c.is(f.opacity, "undefined") && q(k, {
                                        opacity: m.opacity
                                    }), !c.is(m["fill-opacity"], "undefined") && c.is(f["fill-opacity"], "undefined") && q(k, {
                                        "fill-opacity": m["fill-opacity"]
                                    });
                                } else {
                                    if (("circle" == e.type || "ellipse" == e.type || "r" != b(v).charAt()) && r(e, v)) {
                                        if ("opacity" in m || "fill-opacity" in m) {
                                            if (x = c._g.doc.getElementById(k.getAttribute("fill").replace(/^url\(#|\)$/g, ""))) {
                                                x = x.getElementsByTagName("stop"), q(x[x.length - 1], {
                                                    "stop-opacity": ("opacity" in m ? m.opacity : 1) * ("fill-opacity" in m ? m["fill-opacity"] : 1)
                                                });
                                            }
                                        }
                                        m.gradient = v;
                                        m.fill = "none";
                                        break;
                                    }
                                }
                                x.hasOwnProperty("opacity") && q(k, {
                                    "fill-opacity": 1 < x.opacity ? x.opacity / 100 : x.opacity
                                });
                            case "stroke":
                                x = c.getRGB(v);
                                k.setAttribute(n, x.hex);
                                "stroke" == n && x.hasOwnProperty("opacity") && q(k, {
                                    "stroke-opacity": 1 < x.opacity ? x.opacity / 100 : x.opacity
                                });
                                "stroke" == n && e._.arrows && ("startString" in e._.arrows && C(e, e._.arrows.startString), "endString" in e._.arrows && C(e, e._.arrows.endString, 1));
                                break;
                            case "gradient":
                                "circle" != e.type && "ellipse" != e.type && "r" == b(v).charAt() || r(e, v);
                                break;
                            case "opacity":
                                m.gradient && !m.hasOwnProperty("stroke-opacity") && q(k, {
                                    "stroke-opacity": 1 < v ? v / 100 : v
                                });
                            case "fill-opacity":
                                if (m.gradient) {
                                    if (x = c._g.doc.getElementById(k.getAttribute("fill").replace(/^url\(#|\)$/g, ""))) {
                                        x = x.getElementsByTagName("stop"), q(x[x.length - 1], {
                                            "stop-opacity": v
                                        });
                                    }
                                    break;
                                };
                            default:
                                "font-size" == n && (v = d(v, 10) + "px"), x = n.replace(/(\-.)/g, function(b) {
                                    return b.substring(1).toUpperCase();
                                }), k.style[x] = v, e._.dirty = 1, k.setAttribute(n, v);
                        }
                    }
                }
                ba(e, f);
                k.style.visibility = s;
            }, ba = function(e, f) {
                if ("text" == e.type && (f.hasOwnProperty("text") || f.hasOwnProperty("font") || f.hasOwnProperty("font-size") || f.hasOwnProperty("x") || f.hasOwnProperty("y"))) {
                    var g = e.attrs,
                        h = e.node,
                        k = h.firstChild ? d(c._g.doc.defaultView.getComputedStyle(h.firstChild, "").getPropertyValue("font-size"), 10) : 10;
                    if (f.hasOwnProperty("text")) {
                        for (g.text = f.text; h.firstChild;) {
                            h.removeChild(h.firstChild);
                        }
                        for (var p = b(f.text).split("\n"), m = [], s, n = 0, r = p.length; n < r; n++) {
                            s = q("tspan"), n && q(s, {
                                dy: 1.2 * k,
                                x: g.x
                            }), s.appendChild(c._g.doc.createTextNode(p[n])), h.appendChild(s), m[n] = s;
                        }
                    } else {
                        for (m = h.getElementsByTagName("tspan"), n = 0, r = m.length; n < r; n++) {
                            n ? q(m[n], {
                                dy: 1.2 * k,
                                x: g.x
                            }) : q(m[0], {
                                dy: 0
                            });
                        }
                    }
                    q(h, {
                        x: g.x,
                        y: g.y
                    });
                    e._.dirty = 1;
                    h = e._getBBox();
                    (g = g.y - (h.y + h.height / 2)) && c.is(g, "finite") && q(m[0], {
                        dy: g
                    });
                }
            }, y = function(b, e) {
                this[0] = this.node = b;
                b.raphael = !0;
                this.id = c._oid++;
                b.raphaelid = this.id;
                this.matrix = c.matrix();
                this.realPath = null;
                this.paper = e;
                this.attrs = this.attrs || {};
                this._ = {
                    transform: [],
                    sx: 1,
                    sy: 1,
                    deg: 0,
                    dx: 0,
                    dy: 0,
                    dirty: 1
                };
                !e.bottom && (e.bottom = this);
                (this.prev = e.top) && (e.top.next = this);
                e.top = this;
                this.next = null;
            }, t = c.el;
            y.prototype = t;
            t.constructor = y;
            c._engine.path = function(b, e, c) {
                var d = q("path"),
                    f = e.canvas.getElementsByTagName("g");
                2 <= f.length && "undefined" == typeof c ? e.canvas && f[0].appendChild(d) : e.canvas && e.canvas.appendChild(d);
                e = new y(d, e);
                e.type = "path";
                v(e, {
                    fill: "none",
                    stroke: "#000",
                    path: b
                });
                return e;
            };
            t.rotate = function(c, d, f) {
                if (this.removed) {
                    return this;
                }
                c = b(c).split(p);
                c.length - 1 && (d = e(c[1]), f = e(c[2]));
                c = e(c[0]);
                null == f && (d = f);
                if (null == d || null == f) {
                    f = this.getBBox(1), d = f.x + f.width / 2, f = f.y + f.height / 2;
                }
                this.transform(this._.transform.concat([
                    ["r", c, d, f]
                ]));
                return this;
            };
            t.scale = function(c, d, f, g) {
                if (this.removed) {
                    return this;
                }
                c = b(c).split(p);
                c.length - 1 && (d = e(c[1]), f = e(c[2]), g = e(c[3]));
                c = e(c[0]);
                null == d && (d = c);
                null == g && (f = g);
                if (null == f || null == g) {
                    var h = this.getBBox(1)
                }
                f = null == f ? h.x + h.width / 2 : f;
                g = null == g ? h.y + h.height / 2 : g;
                this.transform(this._.transform.concat([
                    ["s", c, d, f, g]
                ]));
                return this;
            };
            t.translate = function(c, d) {
                if (this.removed) {
                    return this;
                }
                c = b(c).split(p);
                c.length - 1 && (d = e(c[1]));
                c = e(c[0]) || 0;
                this.transform(this._.transform.concat([
                    ["t", c, +d || 0]
                ]));
                return this;
            };
            t.transform = function(b) {
                var e = this._;
                if (null == b) {
                    return e.transform;
                }
                c._extractTransform(this, b);
                this.clip && q(this.clip, {
                    transform: this.matrix.invert()
                });
                this.pattern && u(this);
                this.node && q(this.node, {
                    transform: this.matrix
                });
                if (1 != e.sx || 1 != e.sy) {
                    b = this.attrs.hasOwnProperty("stroke-width") ? this.attrs["stroke-width"] : 1, this.attr({
                        "stroke-width": b
                    });
                }
                return this;
            };
            t.hide = function() {
                !this.removed && this.paper.safari(this.node.style.display = "none");
                return this;
            };
            t.show = function() {
                !this.removed && this.paper.safari(this.node.style.display = "");
                return this;
            };
            t.remove = function() {
                if (!this.removed && this.node.parentNode) {
                    var b = this.paper;
                    b.__set__ && b.__set__.exclude(this);
                    m.unbind("raphael.*.*." + this.id);
                    this.gradient && b.defs.removeChild(this.gradient);
                    c._tear(this, b);
                    "a" == this.node.parentNode.tagName.toLowerCase() ? this.node.parentNode.parentNode.removeChild(this.node.parentNode) : this.node.parentNode.removeChild(this.node);
                    for (var e in this) {
                        this[e] = "function" == typeof this[e] ? c._removedFactory(e) : null;
                    }
                    this.removed = !0;
                }
            };
            t._getBBox = function() {
                if ("none" == this.node.style.display) {
                    this.show();
                    var b = !0;
                }
                var e = {};
                try {
                    e = this.node.getBBox();
                } catch (c) {} finally {
                    e = e || {};
                }
                b && this.hide();
                return e;
            };
            t.attr = function(b, e) {
                if (this.removed) {
                    return this;
                }
                if (null == b) {
                    var d = {}, f;
                    for (f in this.attrs) {
                        this.attrs.hasOwnProperty(f) && (d[f] = this.attrs[f]);
                    }
                    d.gradient && "none" == d.fill && (d.fill = d.gradient) && delete d.gradient;
                    d.transform = this._.transform;
                    return d;
                }
                if (null == e && c.is(b, "string")) {
                    if ("fill" == b && "none" == this.attrs.fill && this.attrs.gradient) {
                        return this.attrs.gradient;
                    }
                    if ("transform" == b) {
                        return this._.transform;
                    }
                    f = b.split(p);
                    for (var d = {}, g = 0, h = f.length; g < h; g++) {
                        b = f[g], b in this.attrs ? d[b] = this.attrs[b] : c.is(this.paper.customAttributes[b], "function") ? d[b] = this.paper.customAttributes[b].def : d[b] = c._availableAttrs[b];
                    }
                    return h - 1 ? d : d[f[0]];
                }
                if (null == e && c.is(b, "array")) {
                    d = {};
                    g = 0;
                    for (h = b.length; g < h; g++) {
                        d[b[g]] = this.attr(b[g]);
                    }
                    return d;
                }
                null != e ? (d = {}, d[b] = e) : null != b && c.is(b, "object") && (d = b);
                for (g in d) {
                    m("raphael.attr." + g + "." + this.id, this, d[g]);
                }
                for (g in this.paper.customAttributes) {
                    if (this.paper.customAttributes.hasOwnProperty(g) && d.hasOwnProperty(g) && c.is(this.paper.customAttributes[g], "function")) {
                        for (h in f = this.paper.customAttributes[g].apply(this, [].concat(d[g])), this.attrs[g] = d[g], f) {
                            f.hasOwnProperty(h) && (d[h] = f[h]);
                        }
                    }
                }
                v(this, d);
                return this;
            };
            t.toFront = function() {
                if (this.removed) {
                    return this;
                }
                "a" == this.node.parentNode.tagName.toLowerCase() ? this.node.parentNode.parentNode.appendChild(this.node.parentNode) : this.node.parentNode.appendChild(this.node);
                var b = this.paper;
                b.top != this && c._tofront(this, b);
                return this;
            };
            t.toBack = function() {
                if (this.removed) {
                    return this;
                }
                var b = this.node.parentNode;
                "a" == b.tagName.toLowerCase() ? b.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild) : b.firstChild != this.node && b.insertBefore(this.node, this.node.parentNode.firstChild);
                c._toback(this, this.paper);
                return this;
            };
            t.insertAfter = function(b) {
                if (this.removed) {
                    return this;
                }
                var e = b.node || b[b.length - 1].node;
                e.nextSibling ? e.parentNode.insertBefore(this.node, e.nextSibling) : e.parentNode.appendChild(this.node);
                c._insertafter(this, b, this.paper);
                return this;
            };
            t.insertBefore = function(b) {
                if (this.removed) {
                    return this;
                }
                var e = b.node || b[0].node;
                e.parentNode.insertBefore(this.node, e);
                c._insertbefore(this, b, this.paper);
                return this;
            };
            t.blur = function(b) {
                if (0 !== +b) {
                    var e = q("filter"),
                        d = q("feGaussianBlur");
                    this.attrs.blur = b;
                    e.id = c.createUUID();
                    q(d, {
                        stdDeviation: +b || 1.5
                    });
                    e.appendChild(d);
                    this.paper.defs.appendChild(e);
                    this._blur = e;
                    q(this.node, {
                        filter: "url(#" + e.id + ")"
                    });
                } else {
                    this._blur && (this._blur.parentNode.removeChild(this._blur), delete this._blur, delete this.attrs.blur), this.node.removeAttribute("filter");
                }
            };
            c._engine.circle = function(b, e, c, d) {
                var f = q("circle");
                b.canvas && b.canvas.appendChild(f);
                b = new y(f, b);
                b.attrs = {
                    cx: e,
                    cy: c,
                    r: d,
                    fill: "none",
                    stroke: "#000"
                };
                b.type = "circle";
                q(f, b.attrs);
                return b;
            };
            c._engine.rectBb = function(b, e, c, d, f, g) {
                var h = q("rect"),
                    k = b.canvas.getElementsByTagName("g");
                2 == k.length && b.canvas && k[1].appendChild(h);
                b = new y(h, b);
                b.attrs = {
                    x: e,
                    y: c,
                    width: d,
                    height: f,
                    r: g || 0,
                    rx: g || 0,
                    ry: g || 0,
                    fill: "none",
                    stroke: "#000"
                };
                b.type = "rect";
                q(h, b.attrs);
                return b;
            };
            c._engine.rect = function(b, e, c, d, f, g) {
                var h = q("rect");
                b.canvas && b.canvas.appendChild(h);
                b = new y(h, b);
                b.attrs = {
                    x: e,
                    y: c,
                    width: d,
                    height: f,
                    r: g || 0,
                    rx: g || 0,
                    ry: g || 0,
                    fill: "none",
                    stroke: "#000"
                };
                b.type = "rect";
                q(h, b.attrs);
                return b;
            };
            c._engine.ellipse = function(b, e, c, d, f) {
                var g = q("ellipse");
                b.canvas && b.canvas.appendChild(g);
                b = new y(g, b);
                b.attrs = {
                    cx: e,
                    cy: c,
                    rx: d,
                    ry: f,
                    fill: "none",
                    stroke: "#000"
                };
                b.type = "ellipse";
                q(g, b.attrs);
                return b;
            };
            c._engine.imageBb = function(b, e, c, d, f, g) {
                var h = q("image");
                q(h, {
                    x: c,
                    y: d,
                    width: f,
                    height: g,
                    preserveAspectRatio: "none"
                });
                h.setAttributeNS("http://www.w3.org/1999/xlink", "href", e);
                b.canvas.getElementById("bbGroup").appendChild(h);
                b = new y(h, b);
                b.attrs = {
                    x: c,
                    y: d,
                    width: f,
                    height: g,
                    src: e
                };
                b.type = "image";
                return b;
            };
            c._engine.image = function(b, e, c, d, f, g) {
                var h = q("image");
                q(h, {
                    x: c,
                    y: d,
                    width: f,
                    height: g,
                    preserveAspectRatio: "none"
                });
                h.setAttributeNS("http://www.w3.org/1999/xlink", "href", e);
                var k = b.canvas.getElementsByTagName("g");
                2 <= k.length ? b.canvas && k[0].appendChild(h) : b.canvas && b.canvas.appendChild(h);
                b = new y(h, b);
                b.attrs = {
                    x: c,
                    y: d,
                    width: f,
                    height: g,
                    src: e
                };
                b.type = "image";
                return b;
            };
            c._engine.text = function(b, e, d, f) {
                var g = q("text");
                b.canvas && b.canvas.appendChild(g);
                b = new y(g, b);
                b.attrs = {
                    x: e,
                    y: d,
                    "text-anchor": "middle",
                    text: f,
                    font: c._availableAttrs.font,
                    stroke: "none",
                    fill: "#000"
                };
                b.type = "text";
                v(b, b.attrs);
                return b;
            };
            c._engine.setSize = function(b, e) {
                this.width = b || this.width;
                this.height = e || this.height;
                this.canvas.setAttribute("width", this.width);
                this.canvas.setAttribute("height", this.height);
                this._viewBox && this.setViewBox.apply(this, this._viewBox);
                return this;
            };
            c._engine.create = function() {
                var b = c._getContainer.apply(0, arguments),
                    e = b && b.container,
                    d = b.x,
                    f = b.y,
                    g = b.width,
                    b = b.height;
                if (!e) {
                    throw Error("没有找到画布对象.");
                }
                var h = q("svg"),
                    k, d = d || 0,
                    f = f || 0,
                    g = g || 512,
                    b = b || 342;
                q(h, {
                    height: b,
                    version: 1.1,
                    width: g,
                    xmlns: "http://www.w3.org/2000/svg",
                    "xmlns:xlink": "http://www.w3.org/1999/xlink"
                });
                1 == e ? (h.style.cssText = "overflow:hidden;position:absolute;left:" + d + "px;top:" + f + "px", c._g.doc.body.appendChild(h), k = 1) : (h.style.cssText = "overflow:hidden;position:relative", e.firstChild ? e.insertBefore(h, e.firstChild) : e.appendChild(h));
                e = new c._Paper;
                e.width = g;
                e.height = b;
                e.canvas = h;
                e.clear();
                e._left = e._top = 0;
                k && (e.renderfix = function() {});
                e.renderfix();
                return e;
            };
            c._engine.setViewBox = function(b, e, c, d, f) {
                m("raphael.setViewBox", this, this._viewBox, [b, e, c, d, f]);
                var h = g(c / this.width, d / this.height),
                    k = this.top,
                    p = f ? "meet" : "xMinYMin",
                    n;
                null == b ? (this._vbSize && (h = 1), delete this._vbSize, n = "0 0 " + this.width + " " + this.height) : (this._vbSize = h, n = b + " " + e + " " + c + " " + d);
                for (q(this.canvas, {
                    viewBox: n,
                    preserveAspectRatio: p
                }); h && k;) {
                    p = "stroke-width" in k.attrs ? k.attrs["stroke-width"] : 1, k.attr({
                        "stroke-width": p
                    }), k._.dirty = 1, k._.dirtyT = 1, k = k.prev;
                }
                this._viewBox = [b, e, c, d, !! f];
                return this;
            };
            c.prototype.renderfix = function() {
                var b = this.canvas,
                    e = b.style,
                    c;
                try {
                    c = b.getScreenCTM() || b.createSVGMatrix();
                } catch (d) {
                    c = b.createSVGMatrix();
                }
                b = -c.e % 1;
                c = -c.f % 1;
                if (b || c) {
                    b && (this._left = (this._left + b) % 1, e.left = this._left + "px"), c && (this._top = (this._top + c) % 1, e.top = this._top + "px");
                }
            };
            c.prototype.clear = function() {
                c.eve("raphael.clear", this);
                for (var b = this.canvas; b.firstChild;) {
                    b.removeChild(b.firstChild);
                }
                this.bottom = this.top = null;
                (this.desc = q("desc")).appendChild(c._g.doc.createTextNode("by EasyTee Design Tool " + c.version));
                b.appendChild(this.desc);
                b.appendChild(this.defs = q("defs"));
                var e = document.createElementNS("http://www.w3.org/2000/svg", "g");
                b.appendChild(e);
                e = document.createElementNS("http://www.w3.org/2000/svg", "g");
                e.setAttribute("id", "bbGroup");
                b.appendChild(e);
            };
            c.prototype.remove = function() {
                m("raphael.remove", this);
                this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
                for (var b in this) {
                    this[b] = "function" == typeof this[b] ? c._removedFactory(b) : null;
                }
            };
            var ga = c.st,
                B;
            for (B in t) {
                t.hasOwnProperty(B) && !ga.hasOwnProperty(B) && (ga[B] = function(b) {
                    return function() {
                        var e = arguments;
                        return this.forEach(function(c) {
                            c[b].apply(c, e);
                        });
                    };
                }(B));
            }
        }
    })();
    (function() {
        if (c.vml) {
            var b = String,
                e = parseFloat,
                d = Math,
                f = d.round,
                g = d.max,
                h = d.min,
                k = d.abs,
                p = /[, ]+/,
                m = c.eve,
                n = {
                    M: "m",
                    L: "l",
                    C: "c",
                    Z: "x",
                    m: "t",
                    l: "r",
                    c: "v",
                    z: "x"
                }, s = /([clmz]),?([^clmz]*)/gi,
                q = / progid:\S+Blur\([^\)]+\)/g,
                r = /-?[^,\s-]+/g,
                u = {
                    path: 1,
                    rect: 1,
                    image: 1
                }, C = {
                    circle: 1,
                    ellipse: 1
                }, v = function(e) {
                    var d = /[ahqstv]/ig,
                        g = c._pathToAbsolute;
                    b(e).match(d) && (g = c._path2curve);
                    d = /[clmz]/g;
                    if (g == c._pathToAbsolute && !b(e).match(d)) {
                        return e = b(e).replace(s, function(b, e, c) {
                            var d = [],
                                g = "m" == e.toLowerCase(),
                                h = n[e];
                            c.replace(r, function(b) {
                                g && 2 == d.length && (h += d + n["m" == e ? "l" : "L"], d = []);
                                d.push(f(21600 * b));
                            });
                            return h + d;
                        });
                    }
                    var d = g(e),
                        h;
                    e = [];
                    for (var k = 0, p = d.length; k < p; k++) {
                        g = d[k];
                        h = d[k][0].toLowerCase();
                        "z" == h && (h = "x");
                        for (var m = 1, q = g.length; m < q; m++) {
                            h += f(21600 * g[m]) + (m != q - 1 ? "," : "");
                        }
                        e.push(h);
                    }
                    return e.join(" ");
                }, x = function(b, e, d) {
                    var f = c.matrix();
                    f.rotate(-b, 0.5, 0.5);
                    return {
                        dx: f.x(e, d),
                        dy: f.y(e, d)
                    };
                }, w = function(b, e, c, d, f, g) {
                    var h = b._,
                        p = b.matrix,
                        m = h.fillpos;
                    b = b.node;
                    var n = b.style,
                        s = 1,
                        q = "",
                        r = 21600 / e,
                        u = 21600 / c;
                    n.visibility = "hidden";
                    if (e && c) {
                        b.coordsize = k(r) + " " + k(u);
                        n.rotation = g * (0 > e * c ? -1 : 1);
                        g && (f = x(g, d, f), d = f.dx, f = f.dy);
                        0 > e && (q += "x");
                        0 > c && (q += " y") && (s = -1);
                        n.flip = q;
                        b.coordorigin = d * -r + " " + f * -u;
                        if (m || h.fillsize) {
                            d = (d = b.getElementsByTagName("fill")) && d[0], b.removeChild(d), m && (f = x(g, p.x(m[0], m[1]), p.y(m[0], m[1])), d.position = f.dx * s + " " + f.dy * s), h.fillsize && (d.size = h.fillsize[0] * k(e) + " " + h.fillsize[1] * k(c)), b.appendChild(d);
                        }
                        n.visibility = "visible";
                    }
                };
            c.toString = function() {
                return "您的浏览器不支持 SVG. 但支持 VML.\n可以运行 Raphael " + this.version;
            };
            var ba = function(e, c, d) {
                c = b(c).toLowerCase().split("-");
                d = d ? "end" : "start";
                for (var f = c.length, g = "classic", h = "medium", k = "medium"; f--;) {
                    switch (c[f]) {
                        case "block":
                            ;
                        case "classic":
                            ;
                        case "oval":
                            ;
                        case "diamond":
                            ;
                        case "open":
                            ;
                        case "none":
                            g = c[f];
                            break;
                        case "wide":
                            ;
                        case "narrow":
                            k = c[f];
                            break;
                        case "long":
                            ;
                        case "short":
                            h = c[f];
                    }
                }
                e = e.node.getElementsByTagName("stroke")[0];
                e[d + "arrow"] = g;
                e[d + "arrowlength"] = h;
                e[d + "arrowwidth"] = k;
            }, y = function(d, k) {
                d.attrs = d.attrs || {};
                var m = d.node,
                    n = d.attrs,
                    s = m.style,
                    q = u[d.type] && (k.x != n.x || k.y != n.y || k.width != n.width || k.height != n.height || k.cx != n.cx || k.cy != n.cy || k.rx != n.rx || k.ry != n.ry || k.r != n.r),
                    r = C[d.type] && (n.cx != k.cx || n.cy != k.cy || n.r != k.r || n.rx != k.rx || n.ry != k.ry),
                    x;
                for (x in k) {
                    k.hasOwnProperty(x) && (n[x] = k[x]);
                }
                q && (n.path = c._getPath[d.type](d), d._.dirty = 1);
                k.href && (m.href = k.href);
                k.title && (m.title = k.title);
                k.target && (m.target = k.target);
                k.cursor && (s.cursor = k.cursor);
                "blur" in k && d.blur(k.blur);
                if (k.path && "path" == d.type || q) {
                    m.path = v(~b(n.path).toLowerCase().indexOf("r") ? c._pathToAbsolute(n.path) : n.path), "image" == d.type && (d._.fillpos = [n.x, n.y], d._.fillsize = [n.width, n.height], w(d, 1, 1, 0, 0, 0));
                }
                "transform" in k && d.transform(k.transform);
                r && (s = +n.cx, q = +n.cy, r = +n.rx || +n.r || 0, x = +n.ry || +n.r || 0, m.path = c.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", f(21600 * (s - r)), f(21600 * (q - x)), f(21600 * (s + r)), f(21600 * (q + x)), f(21600 * s)));
                "clip-rect" in k && (s = b(k["clip-rect"]).split(p), 4 == s.length && (s[2] = +s[2] + +s[0], s[3] = +s[3] + +s[1], q = m.clipRect || c._g.doc.createElement("div"), r = q.style, r.clip = c.format("rect({1}px {2}px {3}px {0}px)", s), m.clipRect || (r.position = "absolute", r.top = 0, r.left = 0, r.width = d.paper.width + "px", r.height = d.paper.height + "px", m.parentNode.insertBefore(q, m), q.appendChild(m), m.clipRect = q)), k["clip-rect"] || m.clipRect && (m.clipRect.style.clip = "auto"));
                d.textpath && (s = d.textpath.style, k.font && (s.font = k.font), k["font-family"] && (s.fontFamily = '"' + k["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, "") + '"'), k["font-size"] && (s.fontSize = k["font-size"]), k["font-weight"] && (s.fontWeight = k["font-weight"]), k["font-style"] && (s.fontStyle = k["font-style"]));
                "arrow-start" in k && ba(d, k["arrow-start"]);
                "arrow-end" in k && ba(d, k["arrow-end"], 1);
                if (null != k.opacity || null != k["stroke-width"] || null != k.fill || null != k.src || null != k.stroke || null != k["stroke-width"] || null != k["stroke-opacity"] || null != k["fill-opacity"] || null != k["stroke-dasharray"] || null != k["stroke-miterlimit"] || null != k["stroke-linejoin"] || null != k["stroke-linecap"]) {
                    s = (s = m.getElementsByTagName("fill")) && s[0];
                    !s && (s = Y("fill"));
                    "image" == d.type && k.src && (s.src = k.src);
                    k.fill && (s.on = !0);
                    if (null == s.on || "none" == k.fill || null === k.fill) {
                        s.on = !1;
                    }
                    s.on && k.fill && ((q = b(k.fill).match(c._ISURL)) ? (s.parentNode == m && m.removeChild(s), s.rotate = !0, s.src = q[1], s.type = "tile", r = d.getBBox(1), s.position = r.x + " " + r.y, d._.fillpos = [r.x, r.y], c._preload(q[1], function() {
                        d._.fillsize = [this.offsetWidth, this.offsetHeight];
                    })) : (s.color = c.getRGB(k.fill).hex, s.src = "", s.type = "solid", c.getRGB(k.fill).error && (d.type in {
                        circle: 1,
                        ellipse: 1
                    } || "r" != b(k.fill).charAt()) && t(d, k.fill, s) && (n.fill = "none", n.gradient = k.fill, s.rotate = !1)));
                    if ("fill-opacity" in k || "opacity" in k) {
                        r = ((+n["fill-opacity"] + 1 || 2) - 1) * ((+n.opacity + 1 || 2) - 1) * ((+c.getRGB(k.fill).o + 1 || 2) - 1), r = h(g(r, 0), 1), s.opacity = r, s.src && (s.color = "none");
                    }
                    m.appendChild(s);
                    s = m.getElementsByTagName("stroke") && m.getElementsByTagName("stroke")[0];
                    q = !1;
                    !s && (q = s = Y("stroke"));
                    if (k.stroke && "none" != k.stroke || k["stroke-width"] || null != k["stroke-opacity"] || k["stroke-dasharray"] || k["stroke-miterlimit"] || k["stroke-linejoin"] || k["stroke-linecap"]) {
                        s.on = !0;
                    }
                    "none" != k.stroke && null !== k.stroke && null != s.on && 0 != k.stroke && 0 != k["stroke-width"] || (s.on = !1);
                    r = c.getRGB(k.stroke);
                    s.on && k.stroke && (s.color = r.hex);
                    r = ((+n["stroke-opacity"] + 1 || 2) - 1) * ((+n.opacity + 1 || 2) - 1) * ((+r.o + 1 || 2) - 1);
                    x = 0.75 * (e(k["stroke-width"]) || 1);
                    r = h(g(r, 0), 1);
                    null == k["stroke-width"] && (x = n["stroke-width"]);
                    k["stroke-width"] && (s.weight = x);
                    x && 1 > x && (r *= x) && (s.weight = 1);
                    s.opacity = r;
                    k["stroke-linejoin"] && (s.joinstyle = k["stroke-linejoin"] || "miter");
                    s.miterlimit = k["stroke-miterlimit"] || 8;
                    k["stroke-linecap"] && (s.endcap = "butt" == k["stroke-linecap"] ? "flat" : "square" == k["stroke-linecap"] ? "square" : "round");
                    k["stroke-dasharray"] && (r = {
                        "-": "shortdash",
                        ".": "shortdot",
                        "-.": "shortdashdot",
                        "-..": "shortdashdotdot",
                        ". ": "dot",
                        "- ": "dash",
                        "--": "longdash",
                        "- .": "dashdot",
                        "--.": "longdashdot",
                        "--..": "longdashdotdot"
                    }, s.dashstyle = r.hasOwnProperty(k["stroke-dasharray"]) ? r[k["stroke-dasharray"]] : "");
                    q && m.appendChild(s);
                }
                if ("text" == d.type) {
                    d.paper.canvas.style.display = "";
                    m = d.paper.span;
                    q = n.font && n.font.match(/\d+(?:\.\d*)?(?=px)/);
                    s = m.style;
                    n.font && (s.font = n.font);
                    n["font-family"] && (s.fontFamily = n["font-family"]);
                    n["font-weight"] && (s.fontWeight = n["font-weight"]);
                    n["font-style"] && (s.fontStyle = n["font-style"]);
                    q = e(n["font-size"] || q && q[0]) || 10;
                    s.fontSize = 100 * q + "px";
                    d.textpath.string && (m.innerHTML = b(d.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
                    m = m.getBoundingClientRect();
                    d.W = n.w = (m.right - m.left) / 100;
                    d.H = n.h = (m.bottom - m.top) / 100;
                    d.X = n.x;
                    d.Y = n.y + d.H / 2;
                    ("x" in k || "y" in k) && (d.path.v = c.format("m{0},{1}l{2},{1}", f(21600 * n.x), f(21600 * n.y), f(21600 * n.x) + 1));
                    m = "x y text font font-family font-weight font-style font-size".split(" ");
                    s = 0;
                    for (q = m.length; s < q; s++) {
                        if (m[s] in k) {
                            d._.dirty = 1;
                            break;
                        }
                    }
                    switch (n["text-anchor"]) {
                        case "start":
                            d.textpath.style["v-text-align"] = "left";
                            d.bbx = d.W / 2;
                            break;
                        case "end":
                            d.textpath.style["v-text-align"] = "right";
                            d.bbx = -d.W / 2;
                            break;
                        default:
                            d.textpath.style["v-text-align"] = "center", d.bbx = 0;
                    }
                    d.textpath.style["v-text-kern"] = !0;
                }
            }, t = function(f, g, h) {
                f.attrs = f.attrs || {};
                var k = Math.pow,
                    p = "linear",
                    m = ".5 .5";
                f.attrs.gradient = g;
                g = b(g).replace(c._radial_gradient, function(b, c, f) {
                    p = "radial";
                    c && f && (c = e(c), f = e(f), 0.25 < k(c - 0.5, 2) + k(f - 0.5, 2) && (f = d.sqrt(0.25 - k(c - 0.5, 2)) * (2 * (0.5 < f) - 1) + 0.5), m = c + " " + f);
                    return "";
                });
                g = g.split(/\s*\-\s*/);
                if ("linear" == p) {
                    var s = g.shift(),
                        s = -e(s);
                    if (isNaN(s)) {
                        return null;
                    }
                }
                g = c._parseDots(g);
                if (!g) {
                    return null;
                }
                f = f.shape || f.node;
                if (g.length) {
                    f.removeChild(h);
                    h.on = !0;
                    h.method = "none";
                    h.color = g[0].color;
                    h.color2 = g[g.length - 1].color;
                    for (var n = [], q = 0, r = g.length; q < r; q++) {
                        g[q].offset && n.push(g[q].offset + " " + g[q].color);
                    }
                    h.colors = n.length ? n.join() : "0% " + h.color;
                    "radial" == p ? (h.type = "gradientTitle", h.focus = "100%", h.focussize = "0 0", h.focusposition = m, h.angle = 0) : (h.type = "gradient", h.angle = (270 - s) % 360);
                    f.appendChild(h);
                }
                return 1;
            }, ga = function(b, e) {
                this[0] = this.node = b;
                b.raphael = !0;
                this.id = c._oid++;
                b.raphaelid = this.id;
                this.Y = this.X = 0;
                this.attrs = {};
                this.paper = e;
                this.matrix = c.matrix();
                this._ = {
                    transform: [],
                    sx: 1,
                    sy: 1,
                    dx: 0,
                    dy: 0,
                    deg: 0,
                    dirty: 1,
                    dirtyT: 1
                };
                !e.bottom && (e.bottom = this);
                (this.prev = e.top) && (e.top.next = this);
                e.top = this;
                this.next = null;
            }, B = c.el;
            ga.prototype = B;
            B.constructor = ga;
            B.transform = function(e) {
                if (null == e) {
                    return this._.transform;
                }
                var d = this.paper._viewBoxShift,
                    f = d ? "s" + [d.scale, d.scale] + "-1-1t" + [d.dx, d.dy] : "",
                    g;
                d && (g = e = b(e).replace(/\.{3}|\u2026/g, this._.transform || ""));
                c._extractTransform(this, f + e);
                var d = this.matrix.clone(),
                    h = this.skew;
                e = this.node;
                var f = ~b(this.attrs.fill).indexOf("-"),
                    k = !b(this.attrs.fill).indexOf("url(");
                d.translate(-0.5, -0.5);
                k || f || "image" == this.type ? (h.matrix = "1 0 0 1", h.offset = "0 0", h = d.split(), f && h.noRotation || !h.isSimple ? (e.style.filter = d.toFilter(), f = this.getBBox(), h = this.getBBox(1), d = f.x - h.x, f = f.y - h.y, e.coordorigin = -21600 * d + " " + -21600 * f, w(this, 1, 1, d, f, 0)) : (e.style.filter = "", w(this, h.scalex, h.scaley, h.dx, h.dy, h.rotate))) : (e.style.filter = "", h.matrix = b(d), h.offset = d.offset());
                g && (this._.transform = g);
                return this;
            };
            B.rotate = function(c, d, f) {
                if (this.removed) {
                    return this;
                }
                if (null != c) {
                    c = b(c).split(p);
                    c.length - 1 && (d = e(c[1]), f = e(c[2]));
                    c = e(c[0]);
                    null == f && (d = f);
                    if (null == d || null == f) {
                        f = this.getBBox(1), d = f.x + f.width / 2, f = f.y + f.height / 2;
                    }
                    this._.dirtyT = 1;
                    this.transform(this._.transform.concat([
                        ["r", c, d, f]
                    ]));
                    return this;
                }
            };
            B.translate = function(c, d) {
                if (this.removed) {
                    return this;
                }
                c = b(c).split(p);
                c.length - 1 && (d = e(c[1]));
                c = e(c[0]) || 0;
                d = +d || 0;
                this._.bbox && (this._.bbox.x += c, this._.bbox.y += d);
                this.transform(this._.transform.concat([
                    ["t", c, d]
                ]));
                return this;
            };
            B.scale = function(c, d, f, g) {
                if (this.removed) {
                    return this;
                }
                c = b(c).split(p);
                c.length - 1 && (d = e(c[1]), f = e(c[2]), g = e(c[3]), isNaN(f) && (f = null), isNaN(g) && (g = null));
                c = e(c[0]);
                null == d && (d = c);
                null == g && (f = g);
                if (null == f || null == g) {
                    var h = this.getBBox(1)
                }
                f = null == f ? h.x + h.width / 2 : f;
                g = null == g ? h.y + h.height / 2 : g;
                this.transform(this._.transform.concat([
                    ["s", c, d, f, g]
                ]));
                this._.dirtyT = 1;
                return this;
            };
            B.hide = function() {
                !this.removed && (this.node.style.display = "none");
                return this;
            };
            B.show = function() {
                !this.removed && (this.node.style.display = "");
                return this;
            };
            B._getBBox = function() {
                return this.removed ? {} : {
                    x: this.X + (this.bbx || 0) - this.W / 2,
                    y: this.Y - this.H,
                    width: this.W,
                    height: this.H
                };
            };
            B.remove = function() {
                if (!this.removed && this.node.parentNode) {
                    this.paper.__set__ && this.paper.__set__.exclude(this);
                    c.eve.unbind("raphael.*.*." + this.id);
                    c._tear(this, this.paper);
                    this.node.parentNode.removeChild(this.node);
                    this.shape && this.shape.parentNode.removeChild(this.shape);
                    for (var b in this) {
                        this[b] = "function" == typeof this[b] ? c._removedFactory(b) : null;
                    }
                    this.removed = !0;
                }
            };
            B.attr = function(b, e) {
                if (this.removed) {
                    return this;
                }
                if (null == b) {
                    var d = {}, f;
                    for (f in this.attrs) {
                        this.attrs.hasOwnProperty(f) && (d[f] = this.attrs[f]);
                    }
                    d.gradient && "none" == d.fill && (d.fill = d.gradient) && delete d.gradient;
                    d.transform = this._.transform;
                    return d;
                }
                if (null == e && c.is(b, "string")) {
                    if ("fill" == b && "none" == this.attrs.fill && this.attrs.gradient) {
                        return this.attrs.gradient;
                    }
                    f = b.split(p);
                    for (var d = {}, g = 0, h = f.length; g < h; g++) {
                        b = f[g], b in this.attrs ? d[b] = this.attrs[b] : c.is(this.paper.customAttributes[b], "function") ? d[b] = this.paper.customAttributes[b].def : d[b] = c._availableAttrs[b];
                    }
                    return h - 1 ? d : d[f[0]];
                }
                if (this.attrs && null == e && c.is(b, "array")) {
                    d = {};
                    g = 0;
                    for (h = b.length; g < h; g++) {
                        d[b[g]] = this.attr(b[g]);
                    }
                    return d;
                }
                null != e && (d = {}, d[b] = e);
                null == e && c.is(b, "object") && (d = b);
                for (g in d) {
                    m("raphael.attr." + g + "." + this.id, this, d[g]);
                }
                if (d) {
                    for (g in this.paper.customAttributes) {
                        if (this.paper.customAttributes.hasOwnProperty(g) && d.hasOwnProperty(g) && c.is(this.paper.customAttributes[g], "function")) {
                            for (h in f = this.paper.customAttributes[g].apply(this, [].concat(d[g])), this.attrs[g] = d[g], f) {
                                f.hasOwnProperty(h) && (d[h] = f[h]);
                            }
                        }
                    }
                    d.text && "text" == this.type && (this.textpath.string = d.text);
                    y(this, d);
                }
                return this;
            };
            B.toFront = function() {
                !this.removed && this.node.parentNode.appendChild(this.node);
                this.paper && this.paper.top != this && c._tofront(this, this.paper);
                return this;
            };
            B.toBack = function() {
                if (this.removed) {
                    return this;
                }
                this.node.parentNode.firstChild != this.node && (this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild), c._toback(this, this.paper));
                return this;
            };
            B.insertAfter = function(b) {
                if (this.removed) {
                    return this;
                }
                b.constructor == c.st.constructor && (b = b[b.length - 1]);
                b.node.nextSibling ? b.node.parentNode.insertBefore(this.node, b.node.nextSibling) : b.node.parentNode.appendChild(this.node);
                c._insertafter(this, b, this.paper);
                return this;
            };
            B.insertBefore = function(b) {
                if (this.removed) {
                    return this;
                }
                b.constructor == c.st.constructor && (b = b[0]);
                b.node.parentNode.insertBefore(this.node, b.node);
                c._insertbefore(this, b, this.paper);
                return this;
            };
            B.blur = function(b) {
                var e = this.node.runtimeStyle,
                    d = e.filter,
                    d = d.replace(q, "");
                0 !== +b ? (this.attrs.blur = b, e.filter = d + "  progid:DXImageTransform.Microsoft.Blur(pixelradius=" + (+b || 1.5) + ")", e.margin = c.format("-{0}px 0 0 -{0}px", f(+b || 1.5))) : (e.filter = d, e.margin = 0, delete this.attrs.blur);
            };
            c._engine.path = function(b, e) {
                var c = Y("shape");
                c.style.cssText = "position:absolute;left:0;top:0;width:1px;height:1px";
                c.coordsize = "21600 21600";
                c.coordorigin = e.coordorigin;
                var d = new ga(c, e),
                    f = {
                        fill: "none",
                        stroke: "#000"
                    };
                b && (f.path = b);
                d.type = "path";
                d.path = [];
                d.Path = "";
                y(d, f);
                e.canvas.appendChild(c);
                f = Y("skew");
                f.on = !0;
                c.appendChild(f);
                d.skew = f;
                d.transform("");
                return d;
            };
            c._engine.rect = function(b, e, d, f, g, h) {
                var k = c._rectPath(e, d, f, g, h);
                b = b.path(k);
                var p = b.attrs;
                b.X = p.x = e;
                b.Y = p.y = d;
                b.W = p.width = f;
                b.H = p.height = g;
                p.r = h;
                p.path = k;
                b.type = "rect";
                return b;
            };
            c._engine.ellipse = function(b, e, c, d, f) {
                b = b.path();
                b.X = e - d;
                b.Y = c - f;
                b.W = 2 * d;
                b.H = 2 * f;
                b.type = "ellipse";
                y(b, {
                    cx: e,
                    cy: c,
                    rx: d,
                    ry: f
                });
                return b;
            };
            c._engine.circle = function(b, e, c, d) {
                b = b.path();
                b.X = e - d;
                b.Y = c - d;
                b.W = b.H = 2 * d;
                b.type = "circle";
                y(b, {
                    cx: e,
                    cy: c,
                    r: d
                });
                return b;
            };
            c._engine.image = function(b, e, d, f, g, h) {
                var k = c._rectPath(d, f, g, h);
                b = b.path(k).attr({
                    stroke: "none"
                });
                var p = b.attrs,
                    m = b.node,
                    s = m.getElementsByTagName("fill")[0];
                p.src = e;
                b.X = p.x = d;
                b.Y = p.y = f;
                b.W = p.width = g;
                b.H = p.height = h;
                p.path = k;
                b.type = "image";
                s.parentNode == m && m.removeChild(s);
                s.rotate = !0;
                s.src = e;
                s.type = "tile";
                b._.fillpos = [d, f];
                b._.fillsize = [g, h];
                m.appendChild(s);
                w(b, 1, 1, 0, 0, 0);
                return b;
            };
            c._engine.text = function(e, d, g, h) {
                var k = Y("shape"),
                    p = Y("path"),
                    m = Y("textpath");
                d = d || 0;
                g = g || 0;
                h = h || "";
                p.v = c.format("m{0},{1}l{2},{1}", f(21600 * d), f(21600 * g), f(21600 * d) + 1);
                p.textpathok = !0;
                m.string = b(h);
                m.on = !0;
                k.style.cssText = "position:absolute;left:0;top:0;width:1px;height:1px";
                k.coordsize = "21600 21600";
                k.coordorigin = "0 0";
                var s = new ga(k, e),
                    n = {
                        fill: "#000",
                        stroke: "none",
                        font: c._availableAttrs.font,
                        text: h
                    };
                s.shape = k;
                s.path = p;
                s.textpath = m;
                s.type = "text";
                s.attrs.text = b(h);
                s.attrs.x = d;
                s.attrs.y = g;
                s.attrs.w = 1;
                s.attrs.h = 1;
                y(s, n);
                k.appendChild(m);
                k.appendChild(p);
                e.canvas.appendChild(k);
                e = Y("skew");
                e.on = !0;
                k.appendChild(e);
                s.skew = e;
                s.transform("");
                return s;
            };
            c._engine.setSize = function(b, e) {
                var d = this.canvas.style;
                this.width = b;
                this.height = e;
                b == +b && (b += "px");
                e == +e && (e += "px");
                d.width = b;
                d.height = e;
                d.clip = "rect(0 " + b + " " + e + " 0)";
                this._viewBox && c._engine.setViewBox.apply(this, this._viewBox);
                return this;
            };
            c._engine.setViewBox = function(b, e, d, f, h) {
                c.eve("raphael.setViewBox", this, this._viewBox, [b, e, d, f, h]);
                var k = this.width,
                    p = this.height,
                    m = 1 / g(d / k, f / p),
                    s, n;
                h && (s = p / f, n = k / d, d * s < k && (b -= (k - d * s) / 2 / s), f * n < p && (e -= (p - f * n) / 2 / n));
                this._viewBox = [b, e, d, f, !! h];
                this._viewBoxShift = {
                    dx: -b,
                    dy: -e,
                    scale: m
                };
                this.forEach(function(b) {
                    b.transform("...");
                });
                return this;
            };
            var Y;
            c._engine.initWin = function(b) {
                var e = b.document;
                e.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
                try {
                    !e.namespaces.rvml && e.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), Y = function(b) {
                        return e.createElement("<rvml:" + b + ' class="rvml">');
                    };
                } catch (c) {
                    Y = function(b) {
                        return e.createElement("<" + b + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
                    };
                }
            };
            c._engine.initWin(c._g.win);
            c._engine.create = function() {
                var b = c._getContainer.apply(0, arguments),
                    e = b.container,
                    d = b.height,
                    f = b.width,
                    g = b.x,
                    b = b.y;
                if (!e) {
                    throw Error("VML container not found.");
                }
                var h = new c._Paper,
                    k = h.canvas = c._g.doc.createElement("div"),
                    p = k.style,
                    g = g || 0,
                    b = b || 0,
                    f = f || 512,
                    d = d || 342;
                h.width = f;
                h.height = d;
                f == +f && (f += "px");
                d == +d && (d += "px");
                h.coordsize = "21600000 21600000";
                h.coordorigin = "0 0";
                h.span = c._g.doc.createElement("span");
                h.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;";
                k.appendChild(h.span);
                p.cssText = c.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", f, d);
                1 == e ? (c._g.doc.body.appendChild(k), p.left = g + "px", p.top = b + "px", p.position = "absolute") : e.firstChild ? e.insertBefore(k, e.firstChild) : e.appendChild(k);
                h.renderfix = function() {};
                return h;
            };
            c.prototype.clear = function() {
                c.eve("raphael.clear", this);
                this.canvas.innerHTML = "";
                this.span = c._g.doc.createElement("span");
                this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
                this.canvas.appendChild(this.span);
                this.bottom = this.top = null;
            };
            c.prototype.remove = function() {
                c.eve("raphael.remove", this);
                this.canvas.parentNode.removeChild(this.canvas);
                for (var b in this) {
                    this[b] = "function" == typeof this[b] ? c._removedFactory(b) : null;
                }
                return !0;
            };
            var ua = c.st,
                D;
            for (D in B) {
                B.hasOwnProperty(D) && !ua.hasOwnProperty(D) && (ua[D] = function(b) {
                    return function() {
                        var e = arguments;
                        return this.forEach(function(c) {
                            c[b].apply(c, e);
                        });
                    };
                }(D));
            }
        }
    })();
    V ? D.win.Raphael = c : Raphael = c;
    return c;
});
(function(b) {
    function d(b) {
        if ("number" === typeof b) {
            return b.toString();
        }
        var c = {
            "&": "amp",
            "<": "lt",
            ">": "gt",
            '"': "quot",
            "'": "apos"
        }, d;
        for (d in c) {
            b = b.replace(RegExp(d, "g"), "&" + c[d] + ";");
        }
        return b;
    }

    function c(b, c) {
        var d = [],
            f;
        for (f in b) {
            if (b.hasOwnProperty(f)) {
                var g = c.call(this, b[f], f);
                null !== g && d.push(g);
            }
        }
        return d;
    }

    function g(b, c, d) {
        for (var f in b) {
            b.hasOwnProperty(f) && (d = c.call(this, d, b[f], f));
        }
        return d;
    }

    function k(b, f, g, h) {
        if ("undefined" === typeof h || null === h) {
            h = "";
        }
        "object" === typeof f && (f = c(f, function(b, c) {
            if ("transform" !== c) {
                return c + '="' + d(b) + '"';
            }
        }).join(" "));
        return "<" + b + (g ? ' transform="matrix(' + g.toString().replace(/^matrix\(|\)$/g, "") + ')" ' : " ") + f + ">" + h + "</" + b + ">";
    }

    function h(b, c, d) {
        null === b && (b = 10);
        console.log("KSKKS");
        return 4.5 * b / 13 * (c - 0.2 - d / 2) * 3.5;
    }
    var f = {
        text: function(b) {
            style = {
                font: {
                    family: b.attrs.font.replace(/^.*?"(\w+)".*$/, "$1"),
                    size: "undefined" === typeof b.attrs["font-size"] ? null : b.attrs["font-size"]
                }
            };
            var f = [];
            c(b.attrs.text.split("\n"), function(c, r, t) {
                t = t || 0;
                f.push(k("text", g(b.attrs, function(b, e, c) {
                    "text" !== c && "w" !== c && "h" !== c && ("font-size" === c && (e += "px"), b[c] = d(e.toString()));
                    return b;
                }, {
                    style: "text-anchor: middle; " + ("font: normal normal normal 10px/normal " + style.font.family + (null === style.font.size ? "" : "; font-size: " + style.font.size + "px")) + ";"
                }), b.matrix, k("tspan", {
                    dy: h(style.font.size, t + 1, b.attrs.text.split("\n").length)
                }, null, c)));
            });
            return f;
        },
        path: function(b) {
            return k("path", g(b.attrs, function(c, d, f) {
                "path" === f && (f = "d");
                if ("undefined" == typeof d || null == d) {
                    return c;
                }
                c[f] = d.toString();
                "stroke-width" == f && (console.log("STw", d, c, b), c[f] = d.toString());
                return c;
            }, {}), b.matrix);
        }
    };
    b.fn.toSVG = function() {
        var c = b.svg,
            g = b.vml,
            h = '<svg style="overflow: hidden; position: relative;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + this.width + '" height="' + this.height + '" version="1.1">';
        b.svg = !0;
        b.vml = !1;
        for (var k = this.bottom; null != k; k = k.next) {
            if ("none" !== k.node.style.display) {
                var t = "";
                if ("function" === typeof f[k.type]) {
                    h += f[k.type](k);
                } else {
                    switch (k.type) {
                        case "image":
                            t += ' preserveAspectRatio="none"';
                    }
                    for (i in k.attrs) {
                        var p = i;
                        switch (i) {
                            case "src":
                                p = "xlink:href";
                                break;
                            case "transform":
                                p = "";
                        }
                        p && (t += " " + p + '="' + d(k.attrs[i].toString()) + '"');
                    }
                    h += "<" + k.type + ' transform="matrix(' + k.matrix.toString().replace(/^matrix\(|\)$/g, "") + ')"' + t + "></" + k.type + ">";
                }
            }
        }
        b.svg = c;
        b.vml = g;
        return h + "</svg>";
    };
})(window.Raphael);
Raphael.fn.freeTransform = function(b, d, c) {
    function g(b) {
        ("set" === b.type ? b.items : [b]).map(function(b) {
            "set" === b.type ? g(b) : e.items.push({
                el: b,
                attrs: {
                    rotate: 0,
                    scale: {
                        x: 1,
                        y: 1
                    },
                    translate: {
                        x: 0,
                        y: 0
                    }
                },
                transformString: b.matrix.toTransformString()
            });
        });
    }

    function k() {
        var b = e.attrs.rotate * Math.PI / 180,
            c = (e.attrs.rotate + 90) * Math.PI / 180,
            d = e.attrs.size.x / 2 * e.attrs.scale.x,
            f = e.attrs.size.y / 2 * e.attrs.scale.y,
            g = [];
        [{
            x: -1,
            y: -1
        }, {
            x: 1,
            y: -1
        }, {
            x: 1,
            y: 1
        }, {
            x: -1,
            y: 1
        }].map(function(h) {
                g.push({
                    x: e.attrs.center.x + e.attrs.translate.x + h.x * d * Math.cos(b) + h.y * f * Math.cos(c),
                    y: e.attrs.center.y + e.attrs.translate.y + h.x * d * Math.sin(b) + h.y * f * Math.sin(c)
                });
            });
        return g;
    }

    function h(b) {
        if (b && e.opts.snap.drag) {
            var c = b.x,
                d = b.y,
                f = {
                    x: 0,
                    y: 0
                }, g = 0,
                h = 0;
            [0, 1].map(function() {
                f.x = c - Math.round(c / e.opts.snap.drag) * e.opts.snap.drag;
                f.y = d - Math.round(d / e.opts.snap.drag) * e.opts.snap.drag;
                Math.abs(f.x) <= e.opts.snapDist.drag && (g = f.x);
                Math.abs(f.y) <= e.opts.snapDist.drag && (h = f.y);
                c += b.width - g;
                d += b.height - h;
            });
            e.attrs.translate.x -= g;
            e.attrs.translate.y -= h;
        }
        if (e.opts.boundary) {
            var k = e.opts.boundary;
            e.attrs.center.x + e.attrs.translate.x < k.x && (e.attrs.translate.x += k.x - (e.attrs.center.x + e.attrs.translate.x));
            e.attrs.center.y + e.attrs.translate.y < k.y && (e.attrs.translate.y += k.y - (e.attrs.center.y + e.attrs.translate.y));
            e.attrs.center.x + e.attrs.translate.x > k.x + k.width && (e.attrs.translate.x += k.x + k.width - (e.attrs.center.x + e.attrs.translate.x));
            e.attrs.center.y + e.attrs.translate.y > k.y + k.height && (e.attrs.translate.y += k.y + k.height - (e.attrs.center.y + e.attrs.translate.y));
        }
        f = Math.abs(e.attrs.rotate % e.opts.snap.rotate);
        f = Math.min(f, e.opts.snap.rotate - f);
        f < e.opts.snapDist.rotate && (e.attrs.rotate = Math.round(e.attrs.rotate / e.opts.snap.rotate) * e.opts.snap.rotate);
        f = {
            x: Math.abs(e.attrs.scale.x * e.attrs.size.x % e.opts.snap.scale),
            y: Math.abs(e.attrs.scale.y * e.attrs.size.x % e.opts.snap.scale)
        };
        f = {
            x: Math.min(f.x, e.opts.snap.scale - f.x),
            y: Math.min(f.y, e.opts.snap.scale - f.y)
        };
        f.x < e.opts.snapDist.scale && (e.attrs.scale.x = Math.round(e.attrs.scale.x * e.attrs.size.x / e.opts.snap.scale) * e.opts.snap.scale / e.attrs.size.x);
        f.y < e.opts.snapDist.scale && (e.attrs.scale.y = Math.round(e.attrs.scale.y * e.attrs.size.y / e.opts.snap.scale) * e.opts.snap.scale / e.attrs.size.y);
        e.opts.range.rotate && (k = (360 + e.attrs.rotate) % 360, 180 < k && (k -= 360), k < e.opts.range.rotate[0] && (e.attrs.rotate += e.opts.range.rotate[0] - k), k > e.opts.range.rotate[1] && (e.attrs.rotate += e.opts.range.rotate[1] - k));
        e.opts.range.scale && (e.attrs.scale.x * e.attrs.size.x < e.opts.range.scale[0] && (e.attrs.scale.x = e.opts.range.scale[0] / e.attrs.size.x), e.attrs.scale.y * e.attrs.size.y < e.opts.range.scale[0] && (e.attrs.scale.y = e.opts.range.scale[0] / e.attrs.size.y), e.attrs.scale.x * e.attrs.size.x > e.opts.range.scale[1] && (e.attrs.scale.x = e.opts.range.scale[1] / e.attrs.size.x), e.attrs.scale.y * e.attrs.size.y > e.opts.range.scale[1] && (e.attrs.scale.y = e.opts.range.scale[1] / e.attrs.size.y));
    }

    function f() {
        return {
            x: e.attrs.scale.x * e.attrs.size.x >= e.opts.range.scale[0] && e.attrs.scale.x * e.attrs.size.x <= e.opts.range.scale[1],
            y: e.attrs.scale.y * e.attrs.size.y >= e.opts.range.scale[0] && e.attrs.scale.y * e.attrs.size.y <= e.opts.range.scale[1]
        };
    }

    function m(b) {
        "x" === b ? e.attrs.scale.y = e.attrs.scale.x / e.attrs.ratio : e.attrs.scale.x = e.attrs.scale.y * e.attrs.ratio;
    }

    function q(b) {
        var e, c = {};
        for (e in b) {
            c[e] = "object" === typeof b[e] ? q(b[e]) : b[e];
        }
        return c;
    }

    function n(b) {
        if (e.callback) {
            var c = [];
            b.map(function(b, e) {
                b && c.push(b);
            });
            clearTimeout(u);
            setTimeout(function() {
                e.callback && e.callback(e, c);
            }, 1);
        }
    }
    if (b.freeTransform) {
        return b.freeTransform;
    }
    Array.prototype.hasOwnProperty("map") || (Array.prototype.map = function(b, e) {
        var c, d = [];
        for (c in this) {
            this.hasOwnProperty(c) && (d[c] = b.call(e, this[c], c, this));
        }
        return d;
    });
    Array.prototype.hasOwnProperty("indexOf") || (Array.prototype.indexOf = function(b, e) {
        for (var c = e || 0, d = this.length; c < d; c++) {
            if (this[c] === b) {
                return c;
            }
        }
        return -1;
    });
    var r = this,
        t = b.getBBox(!0),
        p = parent.zoom,
        e = b.freeTransform = {
            attrs: {
                x: t.x,
                y: t.y,
                size: {
                    x: t.width,
                    y: t.height
                },
                center: {
                    x: t.x + t.width / 2,
                    y: t.y + t.height / 2
                },
                rotate: 0,
                scale: {
                    x: 1,
                    y: 1
                },
                translate: {
                    x: 0,
                    y: 0
                },
                ratio: 1
            },
            axes: null,
            bbox: null,
            callback: null,
            items: [],
            handles: {
                center: null,
                x: null,
                y: null,
                del: null,
                lock: null
            },
            offset: {
                rotate: 0,
                scale: {
                    x: 1,
                    y: 1
                },
                translate: {
                    x: 0,
                    y: 0
                }
            },
            opts: {
                animate: !1,
                attrs: {
                    fill: "#fff",
                    stroke: "#000"
                },
                boundary: {
                    x: r._left || 0,
                    y: r._top || 0,
                    width: r.width,
                    height: r.height
                },
                distance: 1.3,
                drag: !0,
                draw: !1,
                keepRatio: !1,
                range: {
                    rotate: [-180, 180],
                    scale: [-99999, 99999]
                },
                rotate: !0,
                scale: !0,
                snap: {
                    rotate: 0,
                    scale: 0,
                    drag: 0
                },
                snapDist: {
                    rotate: 0,
                    scale: 0,
                    drag: 7
                },
                size: 5
            },
            subject: b
        };
    e.updateHandles = function() {
        if (e.handles.bbox || 0 <= e.opts.rotate.indexOf("self")) {
            var b = k()
        }
        k();
        var c = {
            x: (e.attrs.rotate + 45) * Math.PI / 180,
            y: (e.attrs.rotate + 225) * Math.PI / 180
        }, d = {
            x: e.attrs.size.x / 2 * e.attrs.scale.x,
            y: e.attrs.size.y / 2 * e.attrs.scale.y
        };
        e.axes.map(function(b) {
            if (e.handles[b]) {
                var f = e.attrs.center.x + e.attrs.translate.x + d[b] * e.opts.distance * Math.cos(c[b]),
                    g = e.attrs.center.y + e.attrs.translate.y + d[b] * e.opts.distance * Math.sin(c[b]);
                e.opts.boundary && (f = Math.max(Math.min(f, e.opts.boundary.x + e.opts.boundary.width), e.opts.boundary.x), g = Math.max(Math.min(g, e.opts.boundary.y + e.opts.boundary.height), e.opts.boundary.y));
                e.handles[b].disc.attr({
                    cx: f,
                    cy: g
                });
                e.handles[b].disc.toFront();
            }
        });
        if (e.bbox) {
            e.bbox.toFront().attr({
                path: [
                    ["M", b[0].x, b[0].y],
                    ["L", b[1].x, b[1].y],
                    ["L", b[2].x, b[2].y],
                    ["L", b[3].x, b[3].y],
                    ["L", b[0].x, b[0].y]
                ]
            });
            var f = [
                [-1, -1],
                [1, -1],
                [1, 1],
                [-1, 1],
                [0, -1],
                [1, 0],
                [0, 1],
                [-1, 0]
            ];
            e.handles.bbox && e.handles.bbox.map(function(c, d) {
                var g, h, k;
                c.isCorner ? (g = b[d].x, h = b[d].y) : (h = d % 4, k = (h + 1) % b.length, g = (b[h].x + b[k].x) / 2, h = (b[h].y + b[k].y) / 2);
                c.element.toFront().attr({
                    x: g - (c.isCorner ? e.opts.size.bboxCorners : e.opts.size.bboxSides),
                    y: h - (c.isCorner ? e.opts.size.bboxCorners : e.opts.size.bboxSides)
                }).transform("R" + e.attrs.rotate);
                c.x = f[d][0];
                c.y = f[d][1];
            });
        }
        var g = 13;
        p = parent.zoom;
        1 != parent.zoom && (p = 0.5, g = 6);
        e.handles.x.disc.transform("S" + p + "," + p);
        e.handles.y.disc.transform("S" + p + "," + p);
        e.handles.del.disc.transform("S" + p + "," + p);
        e.handles.center.disc.transform("S" + p + "," + p);
        e.handles.lock.disc.transform("S" + p + "," + p);
        e.circle && e.circle.attr({
            cx: e.attrs.center.x + e.attrs.translate.x,
            cy: e.attrs.center.y + e.attrs.translate.y,
            r: Math.max(d.x, d.y) * e.opts.distance
        });
        if (e.handles.center) {
            e.handles.center.disc.toFront();
            var h = -g - e.attrs.size.x * e.attrs.scale.x * 0.5,
                m = g + e.attrs.size.y * e.attrs.scale.y * 0.5,
                n = (360 - e.attrs.rotate) / 180 * Math.PI,
                q = Math.cos(n),
                r = Math.sin(n),
                n = e.attrs.translate.x + (h * q + m * r),
                h = e.attrs.translate.y + (-(h * r) + m * q);
            e.handles.center.disc.transform("...T" + n + "," + h);
            e.handles.center.disc.transform("...R" + e.attrs.rotate);
        }
        e.handles.del && (e.handles.del.disc.toFront(), h = g + e.attrs.size.x * e.attrs.scale.x * 0.5, m = -g - e.attrs.size.y * e.attrs.scale.y * 0.5, n = (360 - e.attrs.rotate) / 180 * Math.PI, q = Math.cos(n), r = Math.sin(n), n = e.attrs.translate.x + (h * q + m * r), h = e.attrs.translate.y + (-(h * r) + m * q), e.handles.del.disc.transform("...T" + n + "," + h), e.handles.del.disc.transform("...R" + e.attrs.rotate));
        e.handles.lock && (e.handles.lock.disc.toFront(), h = -g - e.attrs.size.x * e.attrs.scale.x * 0.5, m = g + e.attrs.size.y * e.attrs.scale.y * 0.5, n = (360 - e.attrs.rotate) / 180 * Math.PI, q = Math.cos(n), r = Math.sin(n), n = e.attrs.translate.x + (h * q + m * r), h = e.attrs.translate.y + (-(h * r) + m * q), e.handles.lock.disc.transform("...T" + n + "," + h), e.handles.lock.disc.transform("...R" + e.attrs.rotate));
        0 <= e.opts.rotate.indexOf("self") && (d = Math.max(Math.sqrt(Math.pow(b[1].x - b[0].x, 2) + Math.pow(b[1].y - b[0].y, 2)), Math.sqrt(Math.pow(b[2].x - b[1].x, 2) + Math.pow(b[2].y - b[1].y, 2))) / 2);
        e.handles.x.disc.toFront();
        h = g + e.attrs.size.x * e.attrs.scale.x * 0.5;
        m = g + e.attrs.size.y * e.attrs.scale.y * 0.5;
        n = (360 - e.attrs.rotate) / 180 * Math.PI;
        q = Math.cos(n);
        r = Math.sin(n);
        n = e.attrs.translate.x + (h * q + m * r);
        h = e.attrs.translate.y + (-(h * r) + m * q);
        e.handles.x.disc.transform("...T" + n + "," + h);
        e.handles.x.disc.transform("...R" + e.attrs.rotate);
        e.handles.y.disc.toFront();
        h = -g - e.attrs.size.x * e.attrs.scale.x * 0.5;
        m = -g - e.attrs.size.y * e.attrs.scale.y * 0.5;
        n = (360 - e.attrs.rotate) / 180 * Math.PI;
        q = Math.cos(n);
        r = Math.sin(n);
        n = e.attrs.translate.x + (h * q + m * r);
        h = e.attrs.translate.y + (-(h * r) + m * q);
        e.handles.y.disc.transform("...T" + n + "," + h);
        e.handles.y.disc.transform("...R" + e.attrs.rotate);
        return e;
    };
    e.showHandles = function() {
        var c = ["x", "y", "center", "del", "lock"];
        e.hideHandles();
        e.axes.map(function(b) {
            e.handles[b] = {};
            k();
            "x" == b ? e.handles.x.disc = r.image("http://open.dev.jzw.la/designer/html5/ezd/images/bbResize.png", e.attrs.center.x - 15, e.attrs.center.y - 15, 30, 30).attr(e.opts.attrs) : e.handles.y.disc = r.image("http://open.dev.jzw.la/designer/html5/ezd/images/bbRotate.png", e.attrs.center.x - 15, e.attrs.center.y - 15, 30, 30).attr(e.opts.attrs);
        });
        if (0 <= e.opts.draw.indexOf("bbox")) {
            e.bbox = r.path("").attr({
                stroke: e.opts.attrs.stroke,
                "stroke-dasharray": "- ",
                opacity: 0.5
            });
            e.handles.bbox = [];
            var d, g;
            for (d = 0 <= e.opts.scale.indexOf("bboxCorners") ? 0 : 4; d < (-1 === e.opts.scale.indexOf("bboxSides") ? 4 : 8); d++) {
                g = {}, g.axis = d % 2 ? "x" : "y", g.isCorner = 4 > d, g.element = r.rect(e.attrs.center.x, e.attrs.center.y, 2 * e.opts.size[g.isCorner ? "bboxCorners" : "bboxSides"], 2 * e.opts.size[g.isCorner ? "bboxCorners" : "bboxSides"]).attr(e.opts.attrs), e.handles.bbox[d] = g;
            }
        } - 1 !== e.opts.draw.indexOf("circle") && (e.circle = r.circle(0, 0, 0).attr({
            stroke: e.opts.attrs.stroke,
            "stroke-dasharray": "- ",
            opacity: 0.3
        })); - 1 !== e.opts.drag.indexOf("center") && (e.handles.center = {}, e.handles.center.disc = r.image("http://open.dev.jzw.la/designer/html5/ezd/images/tp.png", e.attrs.center.x - 15, e.attrs.center.y - 15, 30, 30).attr(e.opts.attrs)); - 1 !== e.opts.lock.indexOf("lock") && (e.handles.lock = {}, e.handles.lock.disc = r.image("http://open.dev.jzw.la/designer/html5/ezd/images/bbLock.png", e.attrs.center.x - 15, e.attrs.center.y - 15, 30, 30).attr(e.opts.attrs), e.handles.lock.disc.node.onclick = function() {
            console.debug(e.handles.lock); - 1 !== e.opts.keepRatio.indexOf("axisX") ? (e.opts.keepRatio = [], e.handles.lock.disc.node.src = "http://open.dev.jzw.la/designer/html5/ezd/images/bbUnLock.png") : (e.opts.keepRatio = ["axisX", "axisY"], e.handles.lock.disc.node.src = "http://open.dev.jzw.la/designer/html5/ezd/images/bbLock.png");
        }); - 1 !== e.opts.del.indexOf("del") && (e.handles.del = {}, e.handles.del.disc = r.image("http://open.dev.jzw.la/designer/html5/ezd/images/bbClose.png", e.attrs.center.x - 15, e.attrs.center.y - 15, 30, 30).attr(e.opts.attrs), e.handles.del.disc.node.onclick = deleteUserImage);
        for (d = 0; d < c.length; d++) {}
        e.axes.map(function(b) {
            if (e.handles[b]) {
                var c = -1 !== e.opts.rotate.indexOf("axis" + b.toUpperCase()),
                    d = -1 !== e.opts.scale.indexOf("axis" + b.toUpperCase());
                e.handles[b].disc.drag(function(f, g) {
                    e.o.viewBoxRatio && (f *= e.o.viewBoxRatio.x, g *= e.o.viewBoxRatio.y);
                    var k = f + e.handles[b].disc.ox,
                        p = g + e.handles[b].disc.oy;
                    console.debug(e.handles[b].disc.ox);
                    var s = {
                        x: 0 > e.o.scale.x,
                        y: 0 > e.o.scale.y
                    };
                    if (c) {
                        var q = Math.atan2(p - e.o.center.y - e.o.translate.y, k - e.o.center.x - e.o.translate.x);
                        e.attrs.rotate = 180 * q / Math.PI - ("y" === b ? 225 : 45);
                        s[b] && (e.attrs.rotate -= 180);
                    }
                    e.opts.boundary && (k = Math.max(Math.min(k, e.opts.boundary.x + e.opts.boundary.width), e.opts.boundary.x), p = Math.max(Math.min(p, e.opts.boundary.y + e.opts.boundary.height), e.opts.boundary.y));
                    k = Math.sqrt(Math.pow(k - e.o.center.x - e.o.translate.x, 2) + Math.pow(p - e.o.center.y - e.o.translate.y, 2));
                    d && (e.attrs.scale[b] = k / (e.o.size[b] / 2 * e.opts.distance), s[b] && (e.attrs.scale[b] *= -1));
                    h(); - 1 !== e.opts.keepRatio.indexOf("axis" + b.toUpperCase()) ? m(b) : e.attrs.ratio = e.attrs.scale.x / e.attrs.scale.y;
                    e.attrs.scale.x && e.attrs.scale.y && e.apply();
                    n([c ? "rotate" : null, d ? "scale" : null]);
                }, function() {
                    e.o = q(e.attrs);
                    r._viewBox && (e.o.viewBoxRatio = {
                        x: r._viewBox[2] / r.width,
                        y: r._viewBox[3] / r.height
                    });
                    e.handles[b].disc.ox = this.attrs.cx;
                    e.handles[b].disc.oy = this.attrs.cy;
                    n([c ? "rotate start" : null, d ? "scale start" : null]);
                }, function() {
                    n([c ? "rotate end" : null, d ? "scale end" : null]);
                });
            }
        });
        0 <= e.opts.draw.indexOf("bbox") && (-1 !== e.opts.scale.indexOf("bboxCorners") || -1 !== e.opts.scale.indexOf("bboxSides")) && e.handles.bbox.map(function(b) {
            b.element.drag(function(c, d) {
                e.o.viewBoxRatio && (c *= e.o.viewBoxRatio.x, d *= e.o.viewBoxRatio.y);
                var g, k, p, s, r, u = q(e.attrs);
                g = e.o.rotate.sin;
                k = e.o.rotate.cos;
                s = c * g + d * k;
                p = (c * k - d * g) * Math.abs(b.x);
                s *= Math.abs(b.y);
                e.attrs.translate = {
                    x: e.o.translate.x + (p * k + s * g) / 2,
                    y: e.o.translate.y + (p * -g + s * k) / 2
                };
                s = e.o.handlePos.cx + c - e.attrs.center.x - e.attrs.translate.x;
                r = e.o.handlePos.cy + d - e.attrs.center.y - e.attrs.translate.y;
                p = s * k - r * g;
                s = s * g + r * k;
                if (b.isCorner && -1 !== e.opts.keepRatio.indexOf("bboxCorners")) {
                    r = e.attrs.size.x * e.attrs.scale.x / (e.attrs.size.y * e.attrs.scale.y);
                    var v = 1 / r * b.x * p,
                        x = s * b.y * r;
                    x > v * r ? p = x * b.x : s = v * b.y;
                }
                e.attrs.scale = {
                    x: 2 * p * b.x / e.o.size.x || e.attrs.scale.x,
                    y: 2 * s * b.y / e.o.size.y || e.attrs.scale.y
                };
                f().x && f().y || (e.attrs = u);
                h();
                if (b.isCorner && -1 !== e.opts.keepRatio.indexOf("bboxCorners") || !b.isCorner && -1 !== e.opts.keepRatio.indexOf("bboxSides")) {
                    m(b.axis), p = (e.attrs.scale.x - e.o.scale.x) * e.o.size.x * b.x, u = (e.attrs.scale.y - e.o.scale.y) * e.o.size.y * b.y, e.attrs.translate.x = e.o.translate.x + (p * k + u * g) / 2, e.attrs.translate.y = e.o.translate.y + (-p * g + u * k) / 2;
                }
                e.attrs.ratio = e.attrs.scale.x / e.attrs.scale.y;
                n(["scale"]);
                e.apply();
            }, function() {
                var c = (360 - e.attrs.rotate) % 360 / 180 * Math.PI,
                    d = b.element.attr(["x", "y"]);
                e.o = q(e.attrs);
                e.o.handlePos = {
                    cx: d.x + e.opts.size[b.isCorner ? "bboxCorners" : "bboxSides"],
                    cy: d.y + e.opts.size[b.isCorner ? "bboxCorners" : "bboxSides"]
                };
                e.o.rotate = {
                    sin: Math.sin(c),
                    cos: Math.cos(c)
                };
                r._viewBox && (e.o.viewBoxRatio = {
                    x: r._viewBox[2] / r.width,
                    y: r._viewBox[3] / r.height
                });
                n(["scale start"]);
            }, function() {
                n(["scale end"]);
            });
        });
        c = [];
        0 <= e.opts.drag.indexOf("self") && -1 === e.opts.scale.indexOf("self") && -1 === e.opts.rotate.indexOf("self") && c.push(b);
        0 <= e.opts.drag.indexOf("center") && c.push(e.handles.center.disc);
        c.map(function(c) {
            c.drag(function(b, c) {
                e.o.viewBoxRatio && (b *= e.o.viewBoxRatio.x, c *= e.o.viewBoxRatio.y);
                e.attrs.translate.x = e.o.translate.x + b;
                e.attrs.translate.y = e.o.translate.y + c;
                var d = q(e.o.bbox);
                d.x += b;
                d.y += c;
                h(d);
                n(["drag"]);
                e.apply();
            }, function() {
                e.o = q(e.attrs);
                e.opts.snap.drag && (e.o.bbox = b.getBBox());
                r._viewBox && (e.o.viewBoxRatio = {
                    x: r._viewBox[2] / r.width,
                    y: r._viewBox[3] / r.height
                });
                e.axes.map(function(b) {
                    e.handles[b] && (e.handles[b].disc.ox = e.handles[b].disc.attrs.cx, e.handles[b].disc.oy = e.handles[b].disc.attrs.cy);
                });
                n(["drag start"]);
            }, function() {
                n(["drag end"]);
            });
        });
        var p = 0 <= e.opts.rotate.indexOf("self"),
            u = 0 <= e.opts.scale.indexOf("self");
        (p || u) && b.drag(function(b, c, d, f) {
            p && (console.debug(d), b = Math.atan2(f - e.o.center.y - e.o.translate.y, d - e.o.center.x - e.o.translate.x), e.attrs.rotate = e.o.rotate + 180 * b / Math.PI - e.o.deg);
            b = 0 > e.o.scale.x;
            c = 0 > e.o.scale.y;
            u && (d = Math.sqrt(Math.pow(d - e.o.center.x - e.o.translate.x, 2) + Math.pow(f - e.o.center.y - e.o.translate.y, 2)), e.attrs.scale.x = e.attrs.scale.y = (b ? -1 : 1) * e.o.scale.x + (d - e.o.radius) / (e.o.size.x / 2), b && (e.attrs.scale.x *= -1), c && (e.attrs.scale.y *= -1));
            h();
            e.apply();
            n([p ? "rotate" : null, u ? "scale" : null]);
        }, function(b, c) {
            e.o = q(e.attrs);
            e.o.deg = 180 * Math.atan2(c - e.o.center.y - e.o.translate.y, b - e.o.center.x - e.o.translate.x) / Math.PI;
            e.o.radius = Math.sqrt(Math.pow(b - e.o.center.x - e.o.translate.x, 2) + Math.pow(c - e.o.center.y - e.o.translate.y, 2));
            r._viewBox && (e.o.viewBoxRatio = {
                x: r._viewBox[2] / r.width,
                y: r._viewBox[3] / r.height
            });
            n([p ? "rotate start" : null, u ? "scale start" : null]);
        }, function() {
            n([p ? "rotate end" : null, u ? "scale end" : null]);
        });
        e.updateHandles();
        return e;
    };
    e.hideHandles = function(b) {
        b = b || {};
        "undefined" === typeof b.undrag && (b.undrag = !0);
        b.undrag && e.items.map(function(b) {
            b.el.undrag();
        });
        e.handles.center && (e.handles.center.disc.remove(), e.handles.center = null);
        ["x", "y"].map(function(b) {
            e.handles[b] && (e.handles[b].disc.remove(), e.handles[b] = null);
        });
        e.bbox && (e.bbox.remove(), e.bbox = null, e.handles.bbox && (e.handles.bbox.map(function(b) {
            b.element.remove();
        }), e.handles.bbox = null));
        e.circle && (e.circle.remove(), e.circle = null);
        e.handles.del && (e.handles.del.disc.remove(), e.handles.del = null);
        e.handles.lock && (e.handles.lock.disc.remove(), e.handles.lock = null);
        return e;
    };
    e.setOpts = function(b, c) {
        e.callback = "function" === typeof c ? c : !1;
        var d, f;
        for (d in b) {
            if (b[d] && b[d].constructor === Object) {
                for (f in b[d]) {
                    b[d].hasOwnProperty(f) && (e.opts[d][f] = b[d][f]);
                }
            } else {
                e.opts[d] = b[d];
            }
        }!0 === e.opts.animate && (e.opts.animate = {
            delay: 700,
            easing: "linear"
        });
        !0 === e.opts.drag && (e.opts.drag = ["center", "self"]);
        !0 === e.opts.keepRatio && (e.opts.keepRatio = ["bboxCorners", "bboxSides"]);
        !0 === e.opts.rotate && (e.opts.rotate = ["axisY"]);
        !0 === e.opts.scale && (e.opts.scale = ["axisX", "bboxCorners", "bboxSides"]);
        e.opts.del = ["del"];
        e.opts.lock = ["lock"];
        ["drag", "draw", "keepRatio", "rotate", "scale"].map(function(b) {
            !1 === e.opts[b] && (e.opts[b] = []);
        });
        e.axes = [];
        (0 <= e.opts.rotate.indexOf("axisX") || 0 <= e.opts.scale.indexOf("axisX")) && e.axes.push("x");
        (0 <= e.opts.rotate.indexOf("axisY") || 0 <= e.opts.scale.indexOf("axisY")) && e.axes.push("y");
        ["drag", "rotate", "scale"].map(function(b) {
            e.opts.snapDist[b] || (e.opts.snapDist[b] = e.opts.snap[b]);
        });
        e.opts.range = {
            rotate: [parseFloat(e.opts.range.rotate[0]), parseFloat(e.opts.range.rotate[1])],
            scale: [parseFloat(e.opts.range.scale[0]), parseFloat(e.opts.range.scale[1])]
        };
        e.opts.snap = {
            drag: parseFloat(e.opts.snap.drag),
            rotate: parseFloat(e.opts.snap.rotate),
            scale: parseFloat(e.opts.snap.scale)
        };
        e.opts.snapDist = {
            drag: parseFloat(e.opts.snapDist.drag),
            rotate: parseFloat(e.opts.snapDist.rotate),
            scale: parseFloat(e.opts.snapDist.scale)
        };
        "string" === typeof e.opts.size && (e.opts.size = parseFloat(e.opts.size));
        isNaN(e.opts.size) || (e.opts.size = {
            axes: e.opts.size,
            bboxCorners: e.opts.size,
            bboxSides: e.opts.size,
            center: e.opts.size
        });
        e.showHandles();
        n(["init"]);
        return e;
    };
    e.setOpts(d, c);
    e.apply = function() {
        e.items.map(function(b, c) {
            var d = e.attrs.center.x + e.offset.translate.x,
                f = e.attrs.center.y + e.offset.translate.y,
                g = e.attrs.rotate - e.offset.rotate,
                h = e.attrs.scale.x / e.offset.scale.x,
                k = e.attrs.scale.y / e.offset.scale.y,
                p = e.attrs.translate.x - e.offset.translate.x,
                m = e.attrs.translate.y - e.offset.translate.y;
            e.opts.animate ? (n(["animate start"]), b.el.animate({
                transform: ["R", g, d, f, "S", h, k, d, f, "T", p, m] + e.items[c].transformString
            }, e.opts.animate.delay, e.opts.animate.easing, function() {
                n(["animate end"]);
                e.updateHandles();
            })) : (b.el.transform(["R", g, d, f, "S", h, k, d, f, "T", p, m] + e.items[c].transformString), n(["apply"]), e.updateHandles());
        });
        return e;
    };
    e.unplug = function() {
        var c = e.attrs;
        e.hideHandles();
        delete b.freeTransform;
        return c;
    };
    g(b);
    e.items.map(function(b, c) {
        b.el._ && b.el._.transform && "object" === typeof b.el._.transform && b.el._.transform.map(function(b) {
            if (b[0]) {
                switch (b[0].toUpperCase()) {
                    case "T":
                        e.items[c].attrs.translate.x += b[1];
                        e.items[c].attrs.translate.y += b[2];
                        break;
                    case "S":
                        e.items[c].attrs.scale.x *= b[1];
                        e.items[c].attrs.scale.y *= b[2];
                        break;
                    case "R":
                        e.items[c].attrs.rotate += b[1];
                }
            }
        });
    });
    "set" !== b.type && (e.attrs.rotate = e.items[0].attrs.rotate, e.attrs.scale = e.items[0].attrs.scale, e.attrs.translate = e.items[0].attrs.translate, e.items[0].attrs = {
        rotate: 0,
        scale: {
            x: 1,
            y: 1
        },
        translate: {
            x: 0,
            y: 0
        }
    }, e.items[0].transformString = "");
    e.attrs.ratio = e.attrs.scale.x / e.attrs.scale.y;
    var u = !1;
    e.updateHandles();
    return e;
};

(function(b) {
    b.el.cloneToPaper = function(b) {
        return !this.removed && b[this.type]().attr(this.attr());
    };
    b.st.cloneToPaper = function(b) {
        console.log("ID", b.canvas.id);
        b.setStart();
        this.forEach(function(c) {
            c.cloneToPaper(b);
        });
        return b.setFinish();
    };
})(window.Raphael);
function EmptyUI() {}
EmptyUI.prototype.setEZD = function(b) {};
EmptyUI.prototype.addText = function(b) {};
EmptyUI.prototype.addSvg = function(b) {};
EmptyUI.prototype.addImage = function(b) {};
EmptyUI.prototype.updateLayers = function() {};
EmptyUI.prototype.updateProduct = function() {};
EmptyUI.prototype.updateLayers = function() {};

function BaseEZD(b) {
    console.log('baseEZD init')
    function d() {
        "undefined" != typeof oa && oa.start();
    }

    function c(b, e) {
        (function(b, e) {
            service.getDistress(e, function(e) {
                var c = O(b);
                V(c, e);
            });
        })(b, e);
    }

    function g(b) {
        $("#designerContainer").css("width", b.width);
        $("#designerContainer").css("height", b.height);
        $("#designerContainer").css("margin-top", "-10px");
        $("#raphael").css("width", b.width);
        $("#raphael").css("height", b.height);
        R.setSize(b.width, b.height);
        S.width = b.width;
        S.height = b.height;
        if (z) {
            F(z);
            for (var e = 0; e < J.sides.length; e++) {
                J.sides[e].workArea.setSize(b.width, b.height);
            }
            P(z, z.activeRegion);
        }
    }

    function k(b) {
        // debugger;
        wa = 0;
        1 != ma && L.doZoom();
//        S.ajaxCallStarted();
//        console.debug('ajaxCallStarted', '载入中，请稍等');
        qa = eventManager.on("elementRendered", s);
        eventManager.trigger("needDesign", b);
    }

    function h(b, e) {
        for (var c = 0; c < b.sides.length; c++) {
            var d = b.sides[c];
            if (d = searchString(e.sides, d.location, "location")) {
                for (d = d.elements; d.length;) {
                    p(d[0]);
                }
            }
        }
        for (c = 0; c < e.sides.length; c++) {
            if (d = e.sides[c], !searchString(b.sides, d.location, "location")) {
                var f = searchString(J.sides, d.location, "name");
                f ? (f.canvas = d, b.sides.push(d)) : b.noSides.push(d);
            }
        }
        return b;
    }

    function f(b, e) {
        if (1 == e.canvases.length) {
            for (var c = b.name.charAt(0).toUpperCase() + b.name.slice(1), d = e.canvases[0], f = 0; f < e.elements.length; f++) {
                e.elements[f].location = c;
            }
            d.location = c;
            d.region_name = b.activeRegion.name;
            d.side = b;
        }
    }

    function m(b) {
        f(z, b);
        q(b.elements);
        for (var e = {
            noSides: [],
            sides: [],
            information: b.information,
            rendered: 0,
            product: b.product
        }, c = b.canvases, d = 0; d < c.length; d++) {
            var g = {
                location: c[d].location,
                canvas: c[d],
                rendered: 0,
                elements: getElementsInArray(b.elements, c[d].location, "location").sort(function(b, e) {
                    return b.z < e.z ? -1 : b.z > e.z ? 1 : 0;
                }),
                needRender: !0
            }, k = searchInArray(J.sides, c[d].location.toLowerCase(), "name");
            k ? (k.canvas = g, g.side = k, e.sides.push(g), "undefined" != typeof oa && oa.resetSide(k.name)) : e.noSides.push(g);
        }
        E = h(e, E);
        for (d = 0; d < E.sides.length; d++) {
            b = O(E.sides[d].location), b.elements.length || D(b);
        }
        n(z);
    }

    function q(b) {
        for (var e = 0; e < b.length; e++) {
            var c = b[e],
                d = 436 / z.boundingBox.region.width,
                f = 2 * c.width,
                g = 2 * c.height,
                f = f / d,
                g = g / d,
                h = 2 * c.y / d;
            c.x = 2 * c.x / d;
            c.y = h;
            c.width = f;
            c.height = g;
        }
    }

    function n(b) {
        X = {
            width: 2 * b.defaultRegion.region[2],
            height: 2 * b.defaultRegion.region[3]
        };
    }

    function r() {
        return E.product.product_id != J.description.product_id ? !0 : !1;
    }

    function t(b, e) {
        for (var c = 0, d = 0, f = function(b) {
            var e = atob(b.split(",")[1]);
            b = b.split(",")[0].split(":")[1].split(";")[0];
            for (var c = new ArrayBuffer(e.length), d = new Uint8Array(c), f = 0; f < e.length; f++) {
                d[f] = e.charCodeAt(f);
            }
            return new Blob([c], {
                type: b
            });
        }, g = 0; g < la.length; g++) {
            (function() {
                var h = la[g];
                if (!h.artID && !h.art_id) {
                    c++;
                    formData = new FormData;
                    formData.append("file", f(h.original_art_path));
                    if (h.colors && h.colors.length) {
                        for (var k = "", p = 0, m = 0; m < h.colors.length; m++) {
                            var n = getColorString(h.colors[m], !0);
                            0 > k.indexOf(n) && (p++, k += "," + n);
                        }
                        0 < k.length && (k = k.substring(1));
                        formData.append("colorLength", p);
                        formData.append("colors", k);
                    }
                    service.saveUserArt(state.currentUserToken, state.activeUserToken, formData, function(e) {
                        h.artID = h.art_id = e.ArtID;
                        h.art_name = e.ArtName;
                        h.art || (h.art = {});
                        h.art.art_name = e.ArtName;
                        h.type = "image";
                        d++;
                        d == la.length && (la = [], b());
                    }, e);
                }
            })();
        }
        0 == c && b && b();
    }

    function p(b) {
        var e;
        a: {
            for (e = 0; e < E.sides.length; e++) {
                if (E.sides[e].location.toUpperCase() == b.location.toUpperCase()) {
                    e = E.sides[e];
                    break a;
                }
            }
            e = !1;
        }
        if (!e) {
            return console.error("Canvas don't exist!"), !1;
        }
        e.side.boundingBox.removeChild(b.object);
        for (var c = 0; c < e.elements.length; c++) {
            var d = e.elements[c];
            d.id == b.id && e.elements.splice(c, 1);
        }
        for (c = 0; c < e.side.elements.length; c++) {
            d = e.side.elements[c], d.id == b.id && e.side.elements.splice(c, 1);
        }
        eventManager.trigger("elementDeleted", b.id);
        e.side.boundingBox.elements = searchInArray(J.sides, e.side.sideId, "sideId").elements;
    }

    function e(b, e) {
        // debugger;
        var c;
        "undefined" == typeof e.id && (e.id = K++);
        if ("text" === e.type) {
            var d = X.width / (2 * b.defaultRegion.region[2]);
            c = e.width / d;
            var f = e.height / d,
                g = e.x / d + c / 2,
                d = e.y / d + f / 2,
                h = 0;
            e.rotate && (h = parseInt(e.rotate));
            var k = parseInt(e.sweep);
            0 < k && "arcdown" == e.shape && (k *= -1);
            e.x = g;
            e.y = d;
            e.width = c;
            e.height = f;
            e.rotation = h;
            e.lines || (e.lines = 1);
            // debugger;

//            var ColorData = state.dsUtils.getPricingColorData();
//            var sideName;
//            switch(state.designer.activeSide.name){
//                case 'third':
//                    sideName = 'left';
//                    break;
//                case 'fourth':
//                    sideName = 'right';
//                    break;
//                default:
//                    sideName = state.designer.activeSide.name;
//            }
//            var activeRegionColors = ColorData.usrColors[sideName].length;

            if(getDesignColors() + 1 > 10){
                alert("您添加的设计颜色数量超过了10种，为了保证印刷质量，请保证设计颜色数量不超过10种。\n或咨询客服：400-920-2085 协助您解决。");
                return false;
            }
            e.object = new ui.text.TextElement(e, b.workArea, e.value, g, d, c, f, h, parseFloat(e.kerning), e.fill_color, parseFloat(e.stroke_width), e.stroke_color, parseInt(e.wrap_mode), parseInt(e.wrap_amount), k, parseInt(e.z), parseInt(e.fliph), parseInt(e.flipv), e.fontObject, e.lines);
            e.isNew && (e.object.isNew = e.isNew);
            e.alignment && (e.object.alignment = parseInt(e.alignment));
            e.line_height && (e.object.lineHeight = parseInt(e.line_height));
            e.object.width = e.width;
            e.object.height = e.height;
            e.object.id = e.id;
            c = e;
        } else {
            if ("image" === e.type) {
                d = X.width / (2 * b.defaultRegion.region[2]);
                c = e.width / d;
                f = e.height / d;
                g = e.x / d + c / 2;
                d = e.y / d + f / 2;
                h = 0;
                e.rotate && (h = parseInt(e.rotate));
                e.object = new ui.bitmap.BitmapElement(e, b.workArea, e.image.src, g, d, c, f, h, parseInt(e.z), parseInt(e.fliph), parseInt(e.flipv));
                if (e.colors) {
                    c = [];
                    for (f = 0; f < e.colors.length; f++) {
                        c.push(getColorString(e.colors[f]));
                    }
                    e.object.colors = c;

//                    var ColorData = state.dsUtils.getPricingColorData();
//                    switch(state.designer.activeSide.name){
//                        case 'third':
//                            sideName = 'left';
//                            break;
//                        case 'fourth':
//                            sideName = 'right';
//                            break;
//                        default:
//                            sideName = state.designer.activeSide.name;
//                    }
//                    var activeRegionColors = ColorData.usrColors[sideName].length;

                    if(getDesignColors() + c.length > 10){
                        return 'ColorOverflowError';
                    }
                }
                e.object.id = e.id;
                0 == e.art_id && la.push(e);
                c = e;
            } else {
                "vector" === e.type ? (d = X.width / (2 * b.defaultRegion.region[2]), c = e.width / d, f = e.height / d, g = e.x / d + c / 2, d = e.y / d + f / 2, h = 0, k = e.canvas_art_rendered, e.rotate && (h = parseInt(e.rotate)), e.x = g, e.y = d, e.width = c, e.height = f, e.rotation = h, e.object = {}, e.canvas_art_rendered = k, c = document.getElementById("designGroup" + b.sideId), e.object = new ui.svg.SvgElement(e.svg, c, e), c = e) : "embroideryText" === e.type ? c = w(b, e, Ja) : "embroideryArt" ===
                    e.type && (c = v(b, e));
            }
        }
        eventManager.trigger("designLiveEdition");
        return c;
    }

    function u(b) {
        qa();
        Q(b);
        na = 0;
        aa = [];
        eventManager.trigger("elementAdded", b);
        z.boundingBox.selectElement(b);
        eventManager.trigger("designColorsChanged");
//        debugger;
        U(0, E);
    }

    function s(b) {
        na++;
        Q(b);
        if (na == aa.length) {
            qa();
            S.ajaxCallEnded();
            S.ajaxCallEnded();
            E.state = "ready";
            E.elements = [];
            aa = [];
            for (b = na = 0; b < J.sides.length; b++) {
                J.sides[b].canvas.needRender && (J.sides[b].canvas.needRender = !1, r() && M(J.sides[b]));
            }
            E.product = {
                product_id: J.description.product_id,
                product_style_id: J.information.product_style_id
            };
//            debugger;
            console.debug('trigger rendered 2');
            U(0, E);
            oa.enable = !0;
            L.addSnapshotEvent("designRenderedComplete", []);
            na = 0;
            aa = [];
        }

    }

    function w(b, e) {
        getImageData(state.dsUtils.getEmbroideryUrl(e, "embroideryText", Ja), !1, function(c) {
            var d = X.width / (2 * b.defaultRegion.region[2]),
                f, g, h;
            f = e.width / d;
            g = e.height / d;
            h = e.x / d + f / 2;
            var d = e.y / d + g / 2,
                k = 0;
            e.rotate && (k = parseInt(e.rotate));
            e.object = new ui.text.EmbroideryTextElement(e, b.workArea, c.url, h, d, f, g, k, parseInt(e.z), parseInt(e.fliph), parseInt(e.flipv));
            e.object.id = e.id;
            e.object.sleep = !0;
            e.object.color1 = e.color1;
            e.object.color2 = e.color2;
            e.object.color3 = e.color3;
            e.object.color4 = e.color4;
            e.object.slant = e.slant;
            e.object.sequence = e.sequence;
            e.object.shape = e.shape;
            e.object.circle_radius = e.circle_radius;
            e.object.bottom_curve_type = e.bottom_curve_type;
            e.object.top_curve_type = e.top_curve_type;
            e.object.bottom_curve = e.bottom_curve;
            e.object.top_curve = e.top_curve;
            e.object.word_spacing = e.word_spacing;
            e.object.line_spacing = e.line_spacing;
            e.object.letter_spacing = e.letter_spacing;
            e.object.alignment = e.alignment;
            e.object.font = e.fontObject.font;
            e.object.font_id = e.fontObject.font_id;
            e.object.fontSize = e.fontSize;
            e.object.value = e.value;
            e.object.sleep = !1;
        });
        return e;
    }

    function v(b, e) {
        getImageData(state.dsUtils.getEmbroideryUrl(e, "embroideryArt"), !1, function(c) {
            var d = X.width / (2 * b.defaultRegion.region[2]),
                f, g, h;
            f = e.width / d;
            g = e.height / d;
            h = e.x / d + f / 2;
            var d = e.y / d + g / 2,
                k = 0;
            e.rotate && (k = parseInt(e.rotate));
            e.object = new ui.bitmap.EmbroideryArtElement(e, b.workArea, c.url, h, d, f, g, k, parseInt(e.z), parseInt(e.fliph), parseInt(e.flipv));
            e.object.id = e.id;
            c = [];
            for (f = 0; f < e.colors.length; f++) {
                c.push(e.colors[f].value);
            }
            e.object.colors = c;
        });
        return e;
    }

    function x(b, e, c) {//...............
//        debugger;
        1 != ma && L.doZoom();
        b = {
            productId: b,
            productStyleId: e,
            styles: []
        };
        c && (b.data = state.productXml);
        eventManager.trigger("needProduct", b);
    }

    function B(b) {
        J.regions = clone(b.regions);
        J.information = clone(b.information);

        ca(b);
        z = O(z.name);
        var e = new Image;

        e.onload = function() {
            R.clear();
            z.imageLoaded = !0;
            J.information["image_width_" + z.name] = e.width;
            J.information["image_height_" + z.name] = e.height;
            var b = S.width / sa * J.information["image_width_" + z.name],
                c = S.height / sa * J.information["image_height_" + z.name];
            R.image(fixImageUrl(z.defaultRegion.imgurl), 0.5 * (S.width - b), 0.5 * (S.height - c), b, c);

            eventManager.trigger("productColorChanged");
        };
        e.src = fixImageUrl(z.defaultRegion.imgurl);
    }

    function y(b) {
        var e;
        if (!(e = O(b.side))) {
            return !1;
        }
        var c = document.getElementById("svg" + e.sideId),
            d = c.getElementsByTagName("g")[0];
        d.setAttribute("id", "designGroup" + e.sideId);
        var f, g = g = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
        e.boundingBox.visibleRegion = !1;
        f = document.createElementNS("http://www.w3.org/2000/svg", "filter");
        f.setAttribute("id", "coverFilter" + e.sideId);
        f.setAttribute("filterUnits", "objectBoundingBox");
        f.setAttribute("x", "0%");
        f.setAttribute("y", "0%");
        f.setAttribute("width", "100%");
        f.setAttribute("height", "100%");
        g = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
        g.setAttribute("in", "SourceGraphic");
        g.setAttribute("type", "matrix");
        g.setAttribute("values", "-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1 0");
        f.appendChild(g);
        c.appendChild(f);
        g = document.createElementNS("http://www.w3.org/2000/svg", "mask");
        g.setAttribute("maskUnits", "userSpaceOnUse");
        g.setAttribute("id", "designMask" + e.sideId);
        var h = "-" + b.region[0] + "px",
            k = "-" + b.region[1] + "px";
        g.setAttribute("x", 0);
        g.setAttribute("y", 0);
        g.setAttribute("width", S.width);
        g.setAttribute("height", S.height);
        f = document.createElementNS("http://www.w3.org/2000/svg", "image");
        f.setAttribute("id", "coverMaskImage" + e.sideId);
        f.setAttribute("x", h);
        f.setAttribute("y", k);
        f.setAttribute("filter", "url('#coverFilter" + e.sideId + "')");
        f.setAttribute("width", S.width);
        f.setAttribute("height", S.height);
        var p = new Image;
        p.onload = function() {
            var b = $("<canvas/>")[0],
                e = b.getContext("2d");
            b.width = p.width;
            b.height = p.height;
            b.getContext("2d").drawImage(p, 0, 0, p.width, p.height);
            e.getImageData(0, 0, p.width, p.height);
        };
        f.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", b.mask.value);
        d.setAttribute("mask", "url('#designMask" + e.sideId + "')");
        c.appendChild(g);
        g.appendChild(f);
    }

    function D(b) {
        var e = "shape" == b.activeRegion.mask.type ? 0 : 1,
            c = b.workArea.canvas.getElementById("designGroup" + b.sideId);
        1 == e ? c.setAttribute("mask", "url('#designMask" + b.sideId + "')") : c.removeAttribute("mask");
        delete b.distressObj;
    }

    function V(b, e) {
        b.distressObj = e;
        var c = document.getElementById("svg" + b.sideId),
            d = b.activeRegion.region[3] > b.activeRegion.region[2] ? b.activeRegion.region[3] : b.activeRegion.region[2],
            f = S.width,
            d = d * b.boundingBox.zoomScale * ma * (1 != ma ? b.defaultRegion.region[2] / b.activeRegion.region[2] : 1);
        S.width > sa && (d *= S.width / sa);
        var g = "shape" == b.activeRegion.mask.type ? 0 : 1;
        if (b.workArea.canvas.getElementsByTagName("mask").length == g) {
            c.getElementsByTagName("g")[0].setAttribute("id", "designGroup" + b.sideId);
            var h = document.createElementNS("http://www.w3.org/2000/svg", "mask");
            h.setAttribute("maskUnits", "userSpaceOnUse");
            h.setAttribute("id", "distressMask" + b.sideId);
            h.setAttribute("x", "0");
            h.setAttribute("y", "0");
            h.setAttribute("width", f);
            h.setAttribute("height", f);
            f = document.createElementNS("http://www.w3.org/2000/svg", "image");
            f.setAttribute("id", "distressImage" + b.sideId);
            1 == g && f.setAttribute("mask", "url('#designMask" + b.sideId + "')");
            f.setAttribute("x", "0");
            f.setAttribute("y", "0");
            c.appendChild(h);
            h.appendChild(f);
        }
        c = b.workArea.canvas.getElementById("distressImage" + b.sideId);
        c.setAttribute("height", d);
        c.setAttribute("width", d);
        d = b.workArea.canvas.getElementById("designGroup" + b.sideId);
        14 == b.distressObj.distress_id ? (1 == g && d.setAttribute("mask", "url('#designMask" + b.sideId + "')"), document.getElementById("distressMask" + b.sideId).remove()) : (c.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", b.distressObj.distress_small_path_jpg), d.setAttribute("mask", "url('#distressMask" + b.sideId + "')"));
    }

    function ca(b) {
        if ("undefined" != typeof J.sides) {
            for (var e = 0; e < b.sides.length; e++) {
                var c = b.sides[e],
                    d = O(c.name);
                "undefined" != typeof d.distressObj && (c.distressObj = clone(d.distressObj));
            }
        }
        J = b;
        b = {};
        for (e = 0; e < J.regions.length; e++) {
            d = J.regions[e], d.regionId = e, d.regionIndex = e, c = O(d.side), d.sideIndex = c.sideId, !0 != b[c.name] && (b[c.name] = !1), 1 == d.is_default && (b[c.name] = !0, c.defaultRegion = d, 1 != d.side_order && J.defaultRegion || (J.defaultRegion = d));
        }
        for (e = 0; e < J.regions.length; e++) {
            d = J.regions[e], c = O(d.side), b[c.name] || (c.defaultRegion = d);
        }
        J.defaultRegion || (J.defaultRegion = J.regions[0]);
    }

    function M(b, e) {
        var c = "undefined" == typeof b ? z : b;
        c.boundingBox.hide();
        var d = c.boundingBox.getDesignRectangle(!1, 0, !1),
            f;
        if ("undefined" == typeof d) {
            return !1;
        }
        f = c.boundingBox.zoomScale;
        S.width > sa && (f /= sa / S.width);
        d.w /= f;
        d.h /= f;
        d.w > c.activeRegion.region[2] && (f = (c.activeRegion.region[2] * c.boundingBox.zoomScale / (sa / S.width) - 5) / d.w, c.boundingBox.resizeTo(d.w * f, d.h * f), d = c.boundingBox.getDesignRectangle(!1, 0, !1), d.w /= c.boundingBox.zoomScale, d.h /= c.boundingBox.zoomScale, e = !1);
        d.h > c.activeRegion.region[3] && (f = (c.activeRegion.region[3] * c.boundingBox.zoomScale - 5) / d.h, c.boundingBox.resizeTo(d.w * f, d.h * f), e = !1);
        d = c.boundingBox.getDesignRectangle(!1, 0, !1);
        d.y + d.h > c.boundingBox.region.height && (e = !1);
        !0 != e && (d = c.boundingBox.getDesignRectangle(!1, 0, !1), c.boundingBox.translateTo(c.boundingBox.zoomScale / (sa / S.width) * ((c.activeRegion.region[2] - d.w) / 2 + 0.5 * d.w), c.boundingBox.zoomScale / (sa / S.width) * ((c.activeRegion.region[3] - d.h) / 2 + 0.5 * d.h)));
        z.boundingBox.hide();
    }

    function A(b) {
        if (b.length) {
            for (var e = z.boundingBox.getDesignRectangle(!1, 0, !1, b), c = -e.x + z.activeRegion.region[2] / 2 - e.w / 2, e = -e.y + z.activeRegion.region[3] / 2 - e.h / 2, d = 0; d < b.length; d++) {
                b[d].x += c * z.boundingBox.zoomScale, b[d].y += e * z.boundingBox.zoomScale;
            }
        }
    }

    function G(b) {
        for (var e, c = 0; c < J.sides.length; c++) {
            fixImageUrl(J.sides[c].defaultRegion.imgurl) === b.url && (e = J.sides[c]);
        }
        if (e && (e.imageLoaded = !0, !e.offsetFixed)) {
            var c = e.name,
                d = 0.5 * (sa - b.width);
            b = 0.5 * (sa - b.height);
            for (var f = 0; f < J.regions.length; f++) {
                var g = J.regions[f];
                c.toLowerCase() === g.side.toLowerCase() && (g.region[0] += d, g.region[1] += b, eventManager.trigger("productRegionsChanged"));
            }
            e.offsetFixed = !0;
            e.boundingBox && P(e, e.activeRegion);
        }
    }

    function H() {
        for (var b = 0; b < J.sides.length; b++) {
            getImageData(fixImageUrl(J.sides[b].defaultRegion.imgurl), !1, G);
        }
    }

    function Q(b) {
        var e = O(b.data.location);
        e ? (e.elements.push(b), e.canvas.elements.push(b.data), b = searchInArray(J.sides, e.sideId, "sideId").elements, e.boundingBox.elements = b) : console.debug("OMG esto no puede pasar");
    }

    function da(b) {
        na++;
        Q(b);
        if (na === aa.length) {
            qa();
            b = [];
            for (var e = 0; e < aa.length; e++) {
                eventManager.trigger("elementsAdded", [aa[e].element]), b.push(aa[e].element.object);
            }
//            debugger;
            U(0, E);
            A(b);
            z.boundingBox.selectElement(b);
            na = 0;
            aa = [];
            setTimeout(function() {
                oa.enable = !0;
                L.addSnapshotEvent("copySelectionElementRenderedComplete", []);
            }, 100);
        }
    }

    function W(b) {
        na++;
        Q(b);
        if (na == aa.length) {
            qa();
            for (b = 0; b < aa.length; b++) {
                eventManager.trigger("elementsAdded", [aa[b].element]);
            }
            na = 0;
            aa = [];
            L.addSnapshotEvent("renderFromChangeProductComplete", []);
            eventManager.trigger("renderFromRedoComplete", []);
            U(5, E);
        }
    }

    function fa(b) {
        na++;
        Q(b);
        if (na == aa.length) {
            qa();
            for (b = 0; b < J.sides.length; b++) {
                M(J.sides[b]);
            }
            na = 0;
            aa = [];
            L.addSnapshotEvent("renderFromChangeProductComplete", []);
            d();
//            debugger;
            U(0, E);
        }
    }

    function ja() {
        for (var b = na = 0; b < aa.length; b++) {
            e(aa[b].side, aa[b].element);
        }
    }

    function F(b) {
        null != z && (I(z, "hidden"), z.boundingBox.hide());
        z = b;
        var e = new Image;

        e.onload = function() {
            R.clear();
            b.imageLoaded = !0;
            J.information["image_width_" + b.name] = e.width;
            J.information["image_height_" + b.name] = e.height;
            var c = S.width / sa * J.information["image_width_" + b.name],
                d = S.height / sa * J.information["image_height_" + b.name];
            R.clear();
            R.image(fixImageUrl(b.defaultRegion.imgurl), 0.5 * (S.width - c), 0.5 * (S.height - d), c, d);
            L.keepOriginalZoom();

        };
        e.src = fixImageUrl(b.defaultRegion.imgurl);
        ezdVars.ArtToolsMode || ($("#raphael").css("background-color", ""));
        I(b, "visible");
        eventManager.trigger("undoStackChanged");
    }

    function I(b, e) {
        b.div.show();
        b.div.css("top", "visible" === e ? "0px" : "-1000px");
    }

    function P(b, e) {
        var c = b.defaultRegion.region[2] / e.region[2],
            d = [e.region[0], e.region[1], e.region[2], e.region[3]],
            f = -d[0] * c,
            g = -d[1] * c;
        b.boundingBox.xOffset = f;
        b.boundingBox.yOffset = g;
        b.boundingBox.zoomScale = c / (S.width / sa);
        b.boundingBox.region = {
            x: 0,
            y: 0,
            width: d[2] * c,
            height: d[3] * c
        };
        //b.boundingBox.hideRegion();
        c *= sa;
        b.workArea.setViewBox(f, g, c, c);
        b.boundingBox.updateScale();
        b.activeRegion = e;
        if (f = O(e.side)) {
            $("#designMask" + f.sideId).remove(), f = document.getElementById("svg" + f.sideId).getElementsByTagName("g")[0], f.removeAttribute("style"), f.removeAttribute("mask");
        }
        if ("shape" == e.mask.type) {
            if (f = O(e.side)) {
                g = document.getElementById("svg" + f.sideId);
                c = ma;
                d = g.getElementsByTagName("g")[0];
                d.setAttribute("id", "designGroup" + f.sideId);
                var h, k = ezdVars.DemoOval ? "OVAL" : "RECT",
                    p = ezdVars.RegionAngle || 0,
                    m = f.defaultRegion.region[2] / e.region[2],
                    n = n = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
                "RECT" == k ? (h = document.createElementNS("http://www.w3.org/2000/svg", "rect"), h.setAttribute("id", "designRectMask" + f.sideId), h.setAttributeNS(null, "x", 0), h.setAttributeNS(null, "y", 0), h.setAttributeNS(null, "height", e.region[3] * c * m), h.setAttributeNS(null, "width", e.region[2] * c * m), h.setAttributeNS(null, "transform", "rotate(" + p + " " + e.region[2] * c * m * 0.5 + " " + e.region[3] * c * m * 0.5 + ")"), h.setAttributeNS(null, "fill", "#FFFFFF")) : "ROUND" == k ?
                    (h = document.createElementNS("http://www.w3.org/2000/svg", "rect"), h.setAttribute("id", "designRectMask" + e.sideId), h.setAttributeNS(null, "x", 0), h.setAttributeNS(null, "y", 0), h.setAttributeNS(null, "height", e.region[3] * c * m), h.setAttributeNS(null, "width", e.region[2] * c * m), h.setAttributeNS(null, "ry", 50 * c * m), h.setAttributeNS(null, "rx", 50 * c * m), h.setAttributeNS(null, "transform", "rotate(" + p + " " + e.region[2] * c * m * 0.5 + " " + e.region[3] * c * m * 0.5 +
                        ")"), h.setAttributeNS(null, "fill", "#FFFFFF")) : "OVAL" == k && (h = document.createElementNS("http://www.w3.org/2000/svg", "ellipse"), h.setAttribute("id", "designRectMask" + f.sideId), h.setAttributeNS(null, "cx", e.region[2] * c * m * 0.5), h.setAttributeNS(null, "cy", e.region[3] * c * m * 0.5), h.setAttributeNS(null, "ry", e.region[3] * c * m * 0.5), h.setAttributeNS(null, "rx", e.region[2] * c * m * 0.5), h.setAttributeNS(null, "transform", "rotate(" + p + " " + e.region[2] * c *
                    m * 0.5 + " " + e.region[3] * c * m * 0.5 + ")"), h.setAttributeNS(null, "fill", "#FFFFFF"));
                d.setAttribute("style", "clip-path:url('#designMask" + f.sideId + "')");
                n.setAttribute("id", "designMask" + f.sideId);
                g.appendChild(n);
                n.appendChild(h);
            }
        } else {
            y(e);
        }
        "undefined" != typeof b.distressObj && V(b, b.distressObj);
        b.boundingBox.enforceBoundaries && M(b, !0);
    }

    function O(b) {
        for (var e = 0; e < J.sides.length; e++) {
            if (J.sides[e].name.toUpperCase() == b.toUpperCase()) {
                return J.sides[e];
            }
        }
        return !1;
    }

    function N(b) {
        var e, c;
        if (!(e = searchInArray(J.regions, b, "regionId")) || !(c = O(e.side))) {
            return !1;
        }
        H();
        F(c);
        var d;
        (d = O(e.side)) && e.name != ("undefined" == typeof d.activeRegion ? "NOTSET" : d.activeRegion.name) && (ka = e, P(z, e));
        n(c);
        return ka;
    }

    function U(b, e) {
//        debugger;
        console.debug("************** Event事件 **************");
        console.debug("事件： ", va[b]);
        console.debug("数据 = ", e);
        eventManager.trigger(va[b], e);

        if(va[b] == 'DESIGN_UPDATED' || va[b] == 'rendered'){
            eventManager.trigger('updatePricePreview', true);
        }
    }

    function Z() {
        for (var b = 0; b < E.sides.length; b++) {
            var e = E.sides[0];
            e.elements = e.elements.sort(function(b, e) {
                return b.z < e.z ? -1 : b.z > e.z ? 1 : 0;
            });
            for (var c = 0; c < e.elements.length; c++) {
                e.elements[c].z = c;
            }
        }
    }
    var L = this,
        K = 1,
        T = {}, J = {}, E, S = b,
        ea = {}, oa, z, ka, R, X = {
            width: 500,
            height: 500
        }, la = [],
        ma = 1,
        aa = [],
        na = 0,
        va = "rendered DESIGN_READY PRODUCT_READY ELEMENT_READY DESIGN_UPDATED designChanged productColorChanged".split(" "),
        wa = 0,
        xa = !1,
        ta = 0,
        qa, sa = 500,
        Ja = {
            slant: "slant",
            sequence: "sequence",
            shape: "shape",
            circle_radius: "circleRadius",
            bottom_curve_type: "bottomCurveType",
            top_curve_type: "topCurveType",
            bottom_curve: "bottomCurve",
            top_curve: "topCurve",
            word_spacing: "wordSpace",
            line_spacing: "lineSpace",
            letter_spacing: "letterSpace",
            alignment: "alignment",
            font_size: "fontSize"
        };
    Object.defineProperties(this, {
        width: {
            get: function() {
                return S.width;
            }
        },
        height: {
            get: function() {
                return S.height;
            }
        },
        store: {
            get: function() {
                return ea;
            }
        },
        setCanvasSize: {
            set: function(b) {
                g(b);
            }
        },
        originalCanvasSize: {
            get: function() {
                return sa;
            }
        },
        zoom: {
            get: function() {
                return ma;
            }
        },
        product: {
            get: function() {
                return J;
            }
        },
        sides: {
            get: function() {
                return J.sides;
            }
        },
        regions: {
            get: function() {
                return J.regions;
            }
        },
        canvas: {
            get: function() {
                return _canvas;
            }
        },
        canvasProduct: {
            get: function() {
                return R;
            }
        },
        design: {
            set: function(b) {
                k(b);
            },
            get: function() {
                return E;
            }
        },
        scale: {
            set: function(b) {
                (r = b) && M();
            },
            get: function() {
                return r;
            }
        },
        activeSide: {
            get: function() {
                return z;
            }
        },
        proportion: {
            get: function() {
                return X;
            }
        },
        hm: {
            get: function() {
                return oa;
            }
        },
        activeRegion: {
            get: function() {
                return ka;
            }
        },
        initObject: {
            get: function() {
                return {
                    container: S.container
                };
            }
        },
        config: {
            get: function() {
                return S;
            }
        }
    });
    this.updateLayers = function() {};
    this.renderElements = function(b) {
        aa = b;
        na = 0;
        qa = eventManager.on("elementRendered", W);
        ja();
    };
    this.deleteElements = function(b) {
        b = "undefined" == typeof b.length ? [b] : b;
        for (var e = [], c = 0; c < b.length; c++) {
            e.push(b[c].id);
        }
        for (c = 0; c < e.length; c++) {
            p(L.getElementById(e[c]));
        }
        eventManager.trigger("undoSnapshotDone");
        eventManager.trigger("elementsDeleted");
        U(4, E);
    };
    this.getElementById = function(b) {
        for (var e = 0; e < E.sides.length; e++) {
            var c = searchInArray(E.sides[e].elements, b, "id");
            if (c) {
                return c;
            }
        }
        return !1;
    };
    this.getElementID = function(b, e) {
        for (var c = 0; c < E.sides.length; c++) {
            for (var d = E.sides[c], f = 0; f < d.elements.length; f++) {
                var g = d.elements[f];
                if (g.table_name == e && (g.canvas_text_id == b || g.canvas_art_id == b)) {
                    return g.id;
                }
            }
        }
    };
    this.addEmbroideryText = function(b) {
        var c = X.width / (2 * z.defaultRegion.region[2]),
            d = 125 / z.defaultRegion.region[2],
            f = 100 / d,
            d = 20 / d,
            g = c * z.boundingBox.getRegionCenter().x - 0.5 * f,
            c = c * (z.boundingBox.getRegionCenter().y + wa) - 0.5 * d,
            f = {
                x: g,
                y: c,
                z: z.boundingBox.elements.length,
                width: f,
                location: z.name,
                height: d,
                type: "embroideryText",
                table_name: "canvas_text",
                id: K++
            }, h;
        for (h in b) {
            f[h] || (f[h] = b[h]);
        }
        qa = eventManager.on("elementRendered", u);
        b = e(z, f);
        f.element = b;
        return f;
    };
    this.addNewText = function(b, c, text) {
        var d = X.width / (2 * z.defaultRegion.region[2]),
            f = 125 / z.defaultRegion.region[2],
            g = 100 / f,
            f = 20 / f,
            h = d * z.boundingBox.getRegionCenter().x - 0.5 * g,
            d = d * (z.boundingBox.getRegionCenter().y + wa) - 0.5 * f;
        wa += 5;
        g = {
            type: "text",
            kerning: 0,
            lineHeight: 0,
            rotation: 0,
            x: h,
            y: d,
            sweep: 0,
            width: g,
            height: f,
            location: z.name,
            value: text || "文字",
            fill_color: "#000000",
            stroke_width: 0,
            stroke_color: "#000000",
            shadow_color: "#000000",
            shadow_value: 0,
            fontObject: b,
            wrap_mode: 0,
            sweep: 0,
            wrap_amount: 0,
            fliph: 0,
            flipv: 0,
            table_name: "canvas_text",
            isNew: !0,
            z: z.boundingBox.elements.length,
            id: K++
        };
        if (c) {
            for (var k in c) {
                g[k] = c[k];
            }
        }
        b.font_family = b.fontFamily;
        qa = eventManager.on("elementRendered", u);
        k = e(z, g);
        k.isNew = !0;
        k.fontId = 820;
        k.fontStyleId = 6;
        g.element = k;

        return g;
    };
    this.deleteElement = function(b) {
        b = this.getElementById(b);
        if (!b) {
            return !1;
        }
        p(b);
    };
    this.addClipArt = function(b) {
        b.width || (b.width = 200);
        b.height || (b.height = 200);
        b.width /= ma;
        b.height /= ma;
        var c = {
            x: 0,
            y: 0,
            width: b.width,
            height: b.height,
            rotation: 0
        };
        c.x = z.boundingBox.region.x + z.boundingBox.region.width / 2;
        c.y = z.boundingBox.region.y + z.boundingBox.region.height / 2;
        z.boundingBox.checkElementSize(c, !0);
        c.width *= 0.8;
        c.height *= 0.8;
        c.x -= c.width / 2;
        c.y -= c.height / 2;
        var d = "needSvg",
            f = b.art_id,
            g = [];
        if ("raster" == b.art_type) {
            b.art_type = "image", d = "needImage";
        } else {
            for (var h = 0; h < b.art_colors.length; h++) {
                g.push(getColorString(b.art_colors[h], !0));
            }
        }
        c = {
            art_id: f,
            x: c.x,
            y: c.y,
            z: z.boundingBox.elements.length,
            width: c.width,
            height: c.height,
            type: "emb" == b.art_type ? "embroideryArt" : b.art_type,
            art_path: b.art_path,
            original_art_path: b.art_path,
            table_name: "canvas_art",
            resizeBox: !0,
            location: z.name,
            art: {
                art_name: b.art_name,
                width: b.width,
                height: b.height
            },
            canvas_art_rendered: b.thumb_jit,
            colors: b.forceColors ? b.art_colors : [],
            id: K++
        };
        "embroideryArt" == c.type && (c.colors = b.art_colors);
        qa = eventManager.on("elementRendered", u);
        "needImage" == d ? (c.image = {
            url: c.art_path,
            src: c.art_path
        }, e(z, c)) : eventManager.trigger(d, c);

        return c;
    };
    this.selectRegion = function(b) {
        if (b != this.activeSide.activeRegion.regionId) {
            return N(b);
        }
    };
    this.loadLocalImage = function(b, c, d) {
        for (var f = 0, g = 0; g < ezd.activeSide.elements.length; g++) {
            var h = ezd.activeSide.elements[g],
                f = f > h.z ? f : h.z + 1
        }
        var g = z.activeRegion.region[2] < z.activeRegion.region[3] ? z.activeRegion.region[2] : z.activeRegion.region[3],
            k = d.width > d.height ? g / d.width : g / d.height,
            g = 0.5 * (z.activeRegion.region[2] - d.width * k * 0.7),
            h = 0.5 * (z.activeRegion.region[3] - d.height * k * 0.7),
            p = d.width * k * 0.7,
            k = d.height * k * 0.7,
            m = 0;
        d.artID && (m = d.artID);
        b = {
            art_id: m,
            x: g,
            y: h,
            z: f,
            width: p,
            height: k,
            art_width: d.art_width,
            art_height: d.art_height,
            type: "image",
            art_path: b,
            original_art_path: b,
            resizeBox: !1,
            input: c,
            colors: d.colors,
            location: ezd.activeSide.name,
            table_name: "canvas_art",
            is_user: !0,
            art_type: "raster",
            image: {
                url: b,
                src: b
            },
            art: {
                art_name: d.artName
            }
        };
        qa = eventManager.on("elementRendered", u);
        var rsl =  e(z, b);
        if(rsl == 'ColorOverflowError'){
            setTimeout(function(){
                alert("您上传的图片颜色数量超过了10种，为了保证印刷质量，请上传小于10种颜色的图片。\n或咨询客服：400-920-2085 协助您解决。");
                state.designer.activeSide.boundingBox.removeSelection();
            }, 1000);

        }else{
            return rsl;
        }
    };
    this.getDesign = function(b) {
        k(b);
    };
    this.hideBB = function() {};
    (function(b) {
        ea = {
            domain: b.ApiDomain || "open.dev.jzw.la",
            publisherId: b.PublisherID || 3,
            AppToken: b.AppToken || 306,
            ezdPath: b.DesignerLocation || "/designer/html5"
        };
        S.productId = b.ProductID;
        S.productStyleId = b.ProductStyleID;
    })(ezdVars);
    x(S.productId, S.productStyleId, !0);
    parseInt(1 * ezdVars.DesignID) && (xa = !0, ta = ezdVars.DesignID);
    "undefined" != typeof HistoryManager && (oa = new HistoryManager(L));
    R = new Raphael(S.container[0], S.width, S.height);
    g(S);
    eventManager.on("productLoaded", function(b) {
        if ("undefined" == typeof J.description || b.description.product_id != J.description.product_id) {
            $("#raphael").empty();
            ca(b);
            for (b = 0; b < J.sides.length; b++) {
                var e = J.sides[b];
                $("#raphael").append('<div id="side' + e.sideId + '" class="raphaelSide"></div>');
                var f = new Raphael(document.getElementById("side" + e.sideId), S.width, S.height);
                e.workArea = f;
                f.canvas.setAttribute("id", "svg" + e.sideId);
                e.div = $("#side" + e.sideId);
                e.elements = [];
                e.imageLoaded = !1;
                f = new container.BoundingContainer(e.workArea, [], "side" + e.sideId);
                e.boundingBox = f;
                e.boundingBox.hide();
                I(e, "hidden");
                P(e, e.defaultRegion);
            }
            N(J.defaultRegion.regionId); //设置画布内容
            b = {
                noSides: [],
                sides: [],
                information: {
                    width: S.width,
                    height: S.height
                },
                rendered: 0,
                state: "new",
                product: {
                    product_id: J.description.product_id,
                    product_style_id: J.information.product_style_id
                }
            };
            for (e = 0; e < J.sides.length; e++) {
                var f = J.sides[e],
                    g = {
                        location: f.name.charAt(0).toUpperCase() + f.name.slice(1),
                        canvas: f.defaultRegion,
                        rendered: 0,
                        elements: [],
                        side: f
                    };
                f.canvas = g;
                g.canvas.location = g.location;
                b.sides.push(g);
            }
            if (null == E) {
                E = b;
            } else {
                g = [];
                e = [];
                for (f = 0; f < E.sides.length; f++) {
                    var h = E.sides[f];
                    g.push(h.canvas);
                    e = e.concat(h.elements);
                }
                for (var p, f = 0; f < e.length; f++) {
                    var g = e[f],
                        h = L.getElementById(g.id),
                        m = X.width / (0.25 * z.defaultRegion.region[2]);
                    if ("text" == h.type) {
                        h.table_name = "canvas_text", p = {
                            rotation: "rotate",
                            text: "value",
                            color: "fill_color",
                            strokeColor: "stroke_color",
                            stroke: "stroke_width",
                            wrap: "wrap_mode",
                            wrapAmmount: "wrap_amount",
                            letterSpacing: "kerning"
                        };
                    } else {
                        if ("vector" == h.type || "image" == h.type) {
                            if ("vector" == h.type && (h.table_name = "canvas_art", h.stroke_color = h.object.stroke, h.stroke_width = h.object.strokeColor), h.colors && h.colors.length) {
                                for (var n = 0; n < h.colors.length; n++) {
                                    g["color" + (n + 1)] = h.object.colors[n];
                                }
                                for (n = 0; n < h.colors.length; n++) {
                                    "none" == h.object.colors[n].toLocaleLowerCase() ? h.object.colors[n] = "none" : h.object.colors[n] = h.object.colors[n].split("#")[1];
                                }
                                g.colors = h.object.colors;
                            }
                        }
                    }
                    for (var s in p) {
                        g[p[s]] = h.object[s];
                    }
                    "text" == h.type && (g.letterSpacing *= 50, g.kerning *= 50);
                    var n = g.object.width * m,
                        q = g.object.height * m,
                        r = g.object.x * m - n / 2,
                        m = g.object.y * m - q / 2;
                    g.width = n;
                    g.flipv = h.object.flipV;
                    g.fliph = h.object.flipH;
                    g.height = q;
                    g.x = r;
                    g.rotate = h.object.rotation;
                    g.y = m;
                }
                aa = [];
                for (p = 0; p < J.sides.length; p++) {
                    s = J.sides[p];
                    for (f = 0; f < e.length; f++) {
                        g = e[f], s.name.toUpperCase() == g.location.toUpperCase() && aa.push({
                            side: s,
                            element: g
                        });
                    }
                    "undefined" != typeof s.distressObj && c(s.name, s.distressObj.distress_id);
                }
                E = b;
                aa.length && (qa(), qa = eventManager.on("elementRendered", fa), ja());
            }
            d();
//            debugger;
            console.debug('trigger rendered 1');
            U(0);
            U(6);
        } else {
            for (p = 0; p < J.sides.length; p++) {
                b.sides[p] = J.sides[p], b.sides[p].offsetFixed = !1;
            }
            B(b);
            H();
        }
        $("#designerContainer").find('svg').css("background-color", "#" + J.information.html_color);

        xa && (xa = !1, k(ta), ta = 0);
    });
    eventManager.on("elementLoaded", function(b) {
        e(z, b);
    });
    eventManager.on("designLoaded", function(b) {
//        S.ajaxCallStarted();
        m(b);
        oa.enable = !1;
        if (z.activeRegion.name != E.information.region_name) {
            a: {
                b = E.information.region_name;
                for (var e = E.information.location, d = 0; d < J.regions.length; d++) {
                    if (J.regions[d].name == b && J.regions[d].side == e) {
                        b = J.regions[d];
                        break a;
                    }
                }
                b = !1;
            }
            b && N(b.regionId);
        }
        aa = [];
        for (b = na = 0; b < E.sides.length; b++) {
            e = E.sides[b];
            if (e.needRender) {
                for (d = 0; d < e.elements.length; d++) {
                    aa.push({
                        side: e.side,
                        element: e.elements[d]
                    });
                }
                e.elements = [];
            }
            1 == e.canvas.is_distressed && c(e.location, e.canvas.distress_id);
        }
        ja();
    });
    eventManager.on("elementSelected", function(b) {
        z.boundingBox.selectElement(z.boundingBox.getChildrenById(b));
    });
    this.parseProduct = function(b, e) {
        x(b, e);
    };
    this.addSnapshotEvent = function(b, e) {
        "undefined" != typeof oa && oa.addSnapshot(b);
    };
    this.startEvent = function(b) {};
    this.chanPropertyEvent = function() {};
    this.resetEvent = function() {
        "undefined" != typeof oa && oa.start();
    };
    this.endEvent = function() {};
    this.zoomIn = function() {
        this.zoom && 1 != this.zoom || this.doZoom();
    };
    this.zoomOut = function() {
        this.zoom && 1 == this.zoom || this.doZoom();
    };
    this.getDesignDimensions = function(b) {
        // debugger;
        for (var e = [], c = 0; c < b.elements.length; c++) {
            if ("text" == b.elements[c].type) {
                if (b.elements[c].object) {
                    var d = b.elements[c].object.element.getBBox();
                    e.push(d);
                }
            } else {
                b.elements[c].raphael && (d = b.elements[c].raphael.getBBox(), e.push(d));
            }
        }
        for (var d = b = 1E3, f = 0, g = 0, c = 0; c < e.length; c++) {
            e[c].x < b && (b = e[c].x), e[c].y < d && (d = e[c].y), e[c].x + e[c].width > f && (f = e[c].x + e[c].width), e[c].y + e[c].height > g && (g = e[c].y + e[c].height);
        }
        return {
            x: b,
            y: d,
            w: f - b,
            h: g - d
        };
    };
    this.getSVG = function(b, e, c) {
        var d = b.side;
        d.boundingBox.hide();
        var f = d.boundingBox.getDesignRectangle(!1, 0, !1);
        d.boundingBox.hideRegion();
        if (0 < b.elements.length) {
            !0 != c && (f.w = d.boundingBox.region.width, f.x = 0, f.h += f.y, f.y = 0);

            b = 1;//f.w > f.h ? e / (2 * f.w) : e / (2 * f.h);
            try {
                var g = $("#side" + d.sideId + " svg")[0],
                    h = $($.parseXML((new XMLSerializer).serializeToString($("#svg" + d.sideId)[0]))),
                    g = $(h[0].documentElement);
            } catch (k) {
                g = h = $("#side" + d.sideId + " svg").clone();
            }
            f.x *= b;
            f.y *= b;
            f.w *= b;
            f.h *= b;
            c = -f.x;
            var p = -f.y,
                m = 1 * b,
                n = 1 * b;
            h.find("#bbGroup").remove();
            h.find("desc").remove();
            h.find("defs").remove();
            b = h.find("#designGroup" + d.sideId);
            g.attr("width", d.boundingBox.region.width);
            g.attr("height", d.boundingBox.region.height);
            g[0].style.height = d.boundingBox.region.height + "px";
            b.attr("transform", "translate(" + c + "," + p + ") scale(" + m + "," + n + ")");
            f = d.distressObj && "0" != d.distressObj.distress_uri;
            c = d.activeRegion.mask;
            f && (p = h.find("#distressMask" + d.sideId), p.attr("width", e), p.attr("height", e));
            c && (g[0].removeAttribute("mask"), g.find("#designMask" + d.sideId).remove(), g.find("#coverFilter" + d.sideId).remove());
            f || c || (h.find("#designMask" + d.sideId).remove(), h.find("#distressImage" + d.sideId).remove(), b.css("clip-path", ""));
            g.attr("viewBox", null);
            g[0].removeAttribute("viewBox");
        }
        e = $(h[0].getElementsByTagName("style"));
        if (e.length) {
            d = "";
            for (g = 0; g < e.length; g++) {
                d += $(e[g]).html() + "\n", 0 < g && e[g].parentNode.removeChild(e[g]);
            }
            e[0].textContent = d;
        }
        return h[0];
    };
    this.isEmbroidery = function() {
        for (var b = 0; b < this.sides.length; b++) {
            if (this.sides[b].boundingBox.elements.length) {
                for (var e = 0; e < this.sides[b].boundingBox.elements.length; e++) {
                    var c = this.sides[b].boundingBox.elements[e];
                    if ("embroideryText" == c.type || "embroideryArt" == c.type) {
                        return !0;
                    }
                }
            }
        }
        return !1;
    };
    this.saveDesign = function(b) {
        var e = this.zoom;
        1 != this.zoom && this.doZoom();
        la = [];
        for (var c = 0; c < E.sides.length; c++) {
            for (var d = 0; d < E.sides[c].elements.length; d++) {
                var f = E.sides[c].elements[d].object;
                "image" != f.data.type && "bitmap" != f.data.type || 0 != f.data.art_id || la.push(f.data);
            }
        }
        if (la.length) {
            t(function() {
                L.saveDesign(b);
            });
        } else {
            Z();
            for (var g = [], d = 0; d < E.sides.length; d++) {
                g.push(E.sides[d].side.activeRegion);
            }
            var h = null,
                k = null,
                p = d = null,
                m = null,
                c = "未命名",
                n = f = "",
                s = this.isEmbroidery() ? 1 : 0;
            "undefined" != typeof b && b && (h = b.success,
                k = b.error, b.productStyleId && (d = b.productStyleId), b.UserToken && (p = b.UserToken),
                b.UserToken && (m = b.UserToken), b.notes && (f = htmlEscape(b.notes)),
                b.name && (c = htmlEscape(b.name.replace("&", "And"))), b.designId && (n = b.designId));
            !d && J && J.information && (d = J.information.product_style_id);
            !p && T && (p = T.UserToken);
            !m && T && (m = T.UserToken);
            var q = "<UserDesign>",
                r = {}, u = "",
                q = q + ('<designs designer_version="HTML5DS" admin="' + (ezdVars.Admin || "None") + '" is_embroidery="' + s + '" design_id="' + n + '" name="' + c + '" product_style_id="' + d + '" notes="' + f + '"/>');
            console.debug(q);
            for (d = 0; d < E.sides.length; d++) {
                if (E.sides[d].elements.length) {
                    f = this.getSideByName(E.sides[d].location);
                    c = ' distress_id="" is_distressed="0" ';
                    f.distressObj && "0" != f.distressObj.distress_uri && (c = ' distress_id="' + f.distressObj.distress_id + '" is_distressed="1" ');
                    f = g[d];
                    n = this.getDesignDimensions(E.sides[d]);
                    E.sides[d].boundingBox && (n = E.sides[d].boundingBox.getDesignRectangle());
                    var x = 436,
                        n = parseInt(n.h / (n.w / 436)),
                        v = "";
                    s && (v = ' embroidery_region_align="tl" height_cm="1" width_cm="1" justify_type="Left" envelope_type="Rectangle" width_compression="100" percent_pull_compression="100"');
                    q += '<canvases canvas_id="-1"  ' + c + ' region="' + f.name + '" region_id="' + f.product_region_id + '" location="' + E.sides[d].side.name + '" width="' + x + '" height="' + n + '" bgcolor="' + getColorString(ezd.product.information.html_color, !0) + '" shadow="false"' + v + " />";
                    for (c = 0; c < E.sides[d].elements.length; c++) {
                        n = E.sides[d].elements[c];
                        f = E.sides[d].elements[c].object;
                        v = {};
                        x = 436;
                        x /= E.sides[d].side.boundingBox.region.width;
                        v.x = f.x;
                        v.y = f.y;
                        v.width = f.width;
                        v.height = f.height;
                        v.x -= f.width / 2 + E.sides[d].side.boundingBox.region.x;
                        v.y -= f.height / 2 + E.sides[d].side.boundingBox.region.y;
                        v.x *= x;
                        v.y *= x;
                        v.width *= x;
                        v.height *= x;
                        v.z = f.z;
                        v.x = parseInt(v.x);
                        v.y = parseInt(v.y);
                        v.width = parseInt(v.width);
                        v.height = parseInt(v.height);
                        v.fliph = f.flipH;
                        v.flipv = f.flipV;
                        v.rotate = f.rotation;
                        var x = "",
                            w = f.type;
                        "bitmap" != w || "embroideryArt" != n.type && "embroideryText" != n.type || (w = n.type);
                        if ("text" == w || "embroideryText" == w) {
                            var B = "",
                                B = 0 > f.arching ? "arcdown" : "arcup";
                            v.kerning = 50 * f.letterSpacing;
                            v.wrap_amount = f.wrapAmmount;
                            v.wrap_mode = f.wrap;
                            v.value = f.text;
                            v.fill_color = getColorString(f.color, !0);
                            v.stroke_width = 2 * f.stroke;
                            f.strokeColor && (v.stroke_color = getColorString(f.strokeColor, !0));
                            v.shape = B;
                            v.sweep = Math.abs(f.arching);
                            v.font_id = f.fontId ? f.fontId : f.font_id;
                            v.alignment = f.alignment;
                            v.line_height = f.lineHeight;
                        }
                        if ("vector" == w) {
                            for (B = 0; B < f.colors.length; B++) {
                                var y = f.colors[B],
                                    D = f.colorsMapped[B];
                                v["color" + (B + 1)] = getColorString(y, !0);
                                v["color" + (B + 1) + "_mapped"] = getColorString(D, !0);
                            }
                            f.stroke && (v.stroke_width = f.stroke);
                            f.strokeColor && (v.stroke_color = getColorString(f.strokeColor, !0));
                            v.art_id = n.art_id;
                        }
                        if ("image" == w || "bitmap" == w) {
                            if (v.art_id = n.object.data.art_id, f.colors) {
                                D = [];
                                for (B = 0; B < f.colors.length; B++) {
                                    y = getColorString(f.colors[B], !0), findMatch(D, function(b) {
                                        return b == y;
                                    }) || D.push(y);
                                }
                                for (B = 0; B < D.length; B++) {
                                    v["color" + (B + 1)] = D[B];
                                }
                            }
                        }
                        if ("embroideryText" === w) {
                            v.value = f.value;
                            v.font_id = f.font_id;
                            for (var A in Ja) {
                                f[A] && (B = escape(f[A]), v[A] = B);
                            }
                            v.color1 = f.color1;
                            v.color2 = f.color2;
                            v.color3 = f.color3;
                            v.color4 = f.color4;
                        }
                        if ("embroideryArt" === w) {
                            for (B = 0; B < f.colors.length; B++) {
                                y = f.colors[B], v["color" + (B + 1)] = getColorString(y, !0);
                            }
                            v.art_id = n.art_id;
                        }
                        for (var z in v) {
                            v[z] && (x += " " + z + ' = "' + htmlEscape(v[z]) + '"');
                        }
                        x += ' location = "' + E.sides[d].side.name.toUpperCase() + '"';
                        "text" == w || "embroideryText" == w ? x = "<canvas_text " + x + "/>" : "image" == w || "bitmap" == w || "embroideryArt" == w ? x = "<canvas_art " + x + "/>" : "vector" == w && (x = "<canvas_art " + x + "  />");
                        u += "" + x;
                    }
                }
            }
            q += u;
            q += "</UserDesign>";
            g = "//" + ea.domain + "/design/save?appKey=" + ea.AppToken + "&userToken=" + (p ? p : "");
            r.xmlDesign = q;
            for (d = 0; d < E.sides.length; d++) {
                0 < E.sides[d].elements.length && (r["svg" + E.sides[d].side.name] = this.fixLinkedImagesInSVG(this.getSVG(E.sides[d], 4500), E.sides[d]));
            }
            this.checkDesignSave(r) ? "undefined" != typeof h && h && setTimeout(function() {
                h(q, ezd.lastSaveData.result);
            }, 10) : (this.lastSaveData = {
                postData: r,
                success: !1
            }, this.zoom != e && this.doZoom(), $.ajax({
                type: "POST",
                url: g,
                data: r,
                complete: function(b) {
                    b = b.responseText;
                    b = b.replace(/&amp;/gi, "TTTTT").replace(/&/gi, "&amp;").replace(/TTTTT/gi, "&amp;");
                    b = $($.parseXML(b));
                    var e = b.find("Error");
                    "" != e.text() ? (b = e.text(), "undefined" != typeof k && k && k(b)) : (b = {
                        designID: b.find("DesignID").text(),
                        image: b.find("image").text(),
                        designURI: b.find("DesignURI").text(),
                        UserToken: b.find("UserToken").text(),
                        sessionToken: b.find("SessionToken").text(),
                        UserToken: b.find("UserToken").text(),
                        title: b.find("title").text(),
                        description: b.find("description").text(),
                        type: b.find("type").text(),
                        url: b.find("url").text(),
                        sitename: b.find("sitename").text(),
                        brand: b.find("brand").text(),
                        sku: b.find("sku").text(),
                        color: b.find("color").text(),
                        activityId: b.find("ActivityId").text()
                    }, "undefined" != typeof h && h && h(q, b), window.eventManager && window.eventManager.trigger("designSaved", b), "undefined" !== typeof ezd && (ezd.designId = b.designId));
                }
            }));
        }
    };
    this.checkDesignSave = function(b) {
        if (this.lastSaveData && this.lastSaveData.success) {
            for (var e in b) {
                var c = b[e],
                    d = this.lastSaveData.postData[e];
                if (c && d && c != d) {
                    return !1;
                }
            }
            return !0;
        }
        return !1;
    };
    this.fixLinkedImagesInSVG = function(b, e) {
        for (var c = $(b), d = 0; d < e.elements.length; d++) {
            var f = e.elements[d].object;
            if (f instanceof ui.bitmap.BitmapElement) {
                var g = c.find("#DsElement" + f.id);
                if (!g || !g.length) {
                    console.log("Error: 不能找到图片 " + f.id + " 的 BitmapElement");
                    continue;
                }
//                g[0].setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", f.data.art_id);
            }
            if (f instanceof ui.bitmap.EmbroideryArtElement || f instanceof ui.text.EmbroideryTextElement) {
                g = c.find("#DsElement" + f.id), g[0].setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", f.dataUrl);
            }
        }
        "undefined" != typeof e.side.distressObj && (d = c.find("#distressImage" + e.side.sideId)) && d.length && d[0].setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", e.side.distressObj.name);
        return c[0].xml || (new XMLSerializer).serializeToString(c[0]).replace('xmlns=""', "").replace('type="css/text"', "");
    };
    this.updateTextFont = function(b, e, c, callback) {
        b = this.getElementById(b);
        if (!b) {
            return !1;
        }
        b = b.object;
        b.fontId = e.font_id;
        b.fontObject = e;

        service.loadFont(e, function(){
            b.fontFamily = e.fontFamily;
            b.fontId = e.font_id;
            b.fontStyleId = c;
            callback && callback();
        }, b.text);
        this.addSnapshotEvent("changeProperty", []);
    };
    this.updateTextWrapMode = function(b, e) {
        var c = L.getElementById(b).object;
        c.sleep = !0;
        0 != e && (c.arching = 0);
        c.wrap = parseInt(e);
        c.wrapAmmount = 0;
        c.forceUpdate();
    };
    this.updateTextWrapAmount = function(b, e) {
        e = 0 > e ? Math.max(-15, e) : Math.min(15, e);
        L.getElementById(b).object.wrapAmmount = parseInt(e);
    };
    this.updateShadowColor = function(b, e) {
        var c = L.getElementById(b);
        c && c.object && (c.shadow_color = e, c.object.setShadow(c.shadow_value, c.shadow_color, null), this.chanPropertyEvent());
        L.updateInkColors();
    };
    this.updateInkColors = function() {};
    this.updateTextColor = function(b, e) {
        L.getElementById(b).object.color = e;
        L.chanPropertyEvent();
        L.updateInkColors();
    };
    this.updateTextStrokeColor = function(b, e) {
        L.getElementById(b).object.strokeColor = e;
        L.chanPropertyEvent();
        L.updateInkColors();
    };
    this.updateTextStrokeWidth = function(b, e) {};
    this.updateTextArching = function(b, e, c) {
        b = L.getElementById(b).object;
        "arcdown" == c && (e = -Math.abs(e));
        b.arching = e;
        L.chanPropertyEvent();
    };
    this.updateTextValue = function(b, e) {};
    this.increaseTextSpacing = function(b) {
        L.getElementById(b).object.letterSpacing += 0.02;
        L.chanPropertyEvent();
    };
    this.decreaseTextSpacing = function(b) {
        L.getElementById(b).object.letterSpacing -= 0.02;
        L.chanPropertyEvent();
    };
    this.setTextSpacing = function(b, e) {
        L.getElementById(b).object.letterSpacing = e / 50;
        L.chanPropertyEvent();
    };
    this.increaseTextHeight = function(b) {
        L.getElementById(b).object.lineHeight += 1;
        L.chanPropertyEvent();
    };
    this.decreaseTextHeight = function(b) {
        L.getElementById(b).object.lineHeight -= 1;
        L.chanPropertyEvent();
    };
    this.setTextHeight = function(b, e) {
        L.getElementById(b).object.lineHeight = e;
        L.chanPropertyEvent();
    };
    this.centerElement = function(b, e) {
        var c = this.getElementById(b);
        if (!c) {
            return !1;
        }
        var d = this.activeSide.activeRegion.region;
        "h" == e && (c.object.x = 0.5 * (d[2] - c.object.width) + 0.5 * c.object.width);
        "v" == e && (c.object.y = 0.5 * (d[3] - c.object.height) + 0.5 * c.object.height);
        this.activeSide.boundingBox.selectElement(this.activeSide.boundingBox.getSelections());
    };
    this.changeElementFlip = function(b, e) {
        var c = ezd.getElementById(b);
        if (!c) {
            return !1;
        }
        this.updateElementFlip(b, e, !("v" == e ? c.object.flipV : c.object.flipH));
    };
    this.updateElementFlip = function(b, e, c) {
        b = ezd.getElementById(b);
        if (!b) {
            return !1;
        }
        "v" == e ? b.object.flipV = c : b.object.flipH = c;
    };
    this.nudgeElement = function(b, e, c, d) {
        var f = "left" == e ? -1 * c : "right" == e ? c : 0;
        e = "up" == e ? -1 * c : "down" == e ? c : 0;
        if (b) {
            L.getElementById(b).object.x += f, L.getElementById(b).object.y += e;
        } else {
            if (d) {
                if (1 < d.length) {
                    for (c = 0; c < d.length; c++) {
                        d[c].x += f, d[c].y += e;
                    }
                } else {
                    d.x += f, d.y += e;
                }
            }
        }
        d ? z.boundingBox.selectElement(d) : z.boundingBox.selectElement(L.getElementById(b).object);
        z.boundingBox.checkBoundaries();
        L.chanPropertyEvent();
    };
    this.nudgeDesign = function(b, e) {
        for (var c = "left" == b ? -1 * e : "right" == b ? e : 0, d = "up" == b ? -1 * e : "down" == b ? e : 0, f = 0; f < z.elements.length; f++) {
            var g = z.elements[f];
            g.x += c;
            g.y += d;
        }
        z.boundingBox.mouseEnabled = !0;
        z.boundingBox.selectAll();
        z.boundingBox.checkBoundaries();
        z.boundingBox.hideRegion();
        z.boundingBox.mouseEnabled = !1;
        z.boundingBox.selectElement(z.boundingBox.getSelections());
    };
    this.updateArtColor = function(b, e, c) {
        for (var d = 0; d < z.elements.length; d++) {
            var f = z.elements[d];
            if (f.id && f.id == b) {
                f.id == b && ("undefined" != typeof f.setColor ? f.setColor(e, c) : f.colors = {
                    index: e,
                    color: c
                });
                L.updateInkColors();
                L.addSnapshotEvent("changeProperty", []);
                break;
            }
        }
    };
    this.changeLayer = function(b, e) {
        for (var c = z.elements, d = 0; d < c.length; d++) {
            if (c[d].id == b) {
                return c = z.boundingBox.getChildrenById(b), "up" == e ? z.boundingBox.setChildIndex(c, z.boundingBox.getChildIndex(c) + 1) : z.boundingBox.setChildIndex(c, z.boundingBox.getChildIndex(c) - 1);
            }
        }
    };
    this.getSideByName = function(b) {
        return O(b);
    };
    this.copySelection = function(b, e) {
        var d = e ? e : z.boundingBox.getSelections();
        if (d) {
            if (d.length || (d = [d]), !1 === b) {
                if (aa.length) {
                    oa.enable = !1;
                    for (var d = searchInArray(J.sides, aa[0].side.sideId, "sideId"), f = 0; f < aa.length; f++) {
                        var g = aa[f];
                        if (g.side != z) {
                            g.element.id = K++;
                            var h = z.activeRegion.region[2] / d.activeRegion.region[2];
                            g.element.x *= h;
                            g.element.y *= h;
                            g.element.width *= h;
                            g.element.height *= h;
                        }
                        g.side = z;
                        g.element.location = z.name;
                    }
                    d.elements.length == aa.length && "undefined" == typeof z.distressObj && "undefined" != typeof d.distressObj && c(z.name, d.distressObj.distress_id);
                    ja();
                }
            } else {
                f = b ? !1 : !0;
                qa = eventManager.on("elementRendered", da);
                aa = [];
                for (g = na = 0; g < d.length; g++) {
                    var h = d[g],
                        k = clone(h.data),
                        p = X.width / (2 * z.defaultRegion.region[2]);
                    k.width = h.width * p;
                    k.height = h.height * p;
                    k.x = h.x * p - 0.5 * k.width;
                    k.y = 10 + h.y * p - 0.5 * k.height;
                    k.rotate = h.rotation;
                    k.value = h.text;
                    k.fliph = h.flipH;
                    k.flipv = h.flipV;
                    k.id = K++;
                    h.constructor === ui.text.TextElement ? (k.isNew = !0, k.fontFamily = h.fontFamily, k.fontId = h.fontId, k.fontStyleId = h.fontStyleId, k.shape = 0 > h.arching ? "arcdown" : "arcup", k.sweep = Math.abs(h.arching), k.strokeScale = h.strokeScale, k.alignment = h.alignment, k.line_height = h.lineHeight, k.kerning = 50 * h.letterSpacing, k.wrap_mode = h.wrap, k.wrap_amount = h.wrapAmmount) : h.constructor === ui.svg.SvgElement ? k.colors = h.colors : h.constructor === ui.bitmap.BitmapElement &&
                        (k.image.url = h.url, k.colors = h.colors);
                    aa.push({
                        side: z,
                        element: k
                    });
                }
                f && ja();
            }
        }
    };
    this.keepOriginalZoom = function() {
        ma = 1 == ma ? 0 : 1;
        L.doZoom();
    };
    this.doZoom = function() {
        var Loadimage = S.container.find('image');
        if (z.elements.length) {
            if (1 == ma) {
                z.boundingBox.visibleRegion = !1;
                "undefined" != typeof changeZoomIcon && changeZoomIcon("less");
                var b = z.boundingBox.getDesignRectangle(!1, 0, !0),
                    e = z.workArea,
                    c, d, f = 0;
                b.w > b.h ? (c = 500 / b.w, z.boundingBox.zoomScale = b.w / 500, d = 98 / c) : (c = 460 / b.h, d = f = 61 / c, z.boundingBox.zoomScale = b.h / 460);
                var g = 0.5 * (500 - b.w * c) / c,
                    h = 46 / c;
                e.setViewBox(b.x - g - 0.5 * d, b.y - h, b.w + d, b.h + f);
                z.boundingBox.zoomScale = b.w > b.h ? (b.w + d) / sa / (S.width / sa) : (b.h + f) / 460 / (S.width / sa);
                z.boundingBox.xOffset = b.x - g - 0.5 * d;
                z.boundingBox.yOffset = b.y - h;
                ma = c;

                $("#raphael").css("background-color", "#" + J.information.html_color);
            } else {
                ezdVars.ArtToolsMode || ($("#raphael").css("background-color", "")), z.boundingBox.zoomScale = 1, "undefined" !== typeof changeZoomIcon && changeZoomIcon("more"), ma = 1, P(z, z.activeRegion);
            }
            z.boundingBox.hideRegion();
            eventManager.trigger("zoomChanged", {
                isZoomedIn: 1 < ma
            });
        } else {
            ma = 1, P(z, z.activeRegion), $("#raphael").css("background-color", ""), eventManager.trigger("zoomChanged", {
                isZoomedIn: !1
            });
        }
    };
    this.getElementPreview = function(b, e, c) {
        b = L.getElementById(b);
        if (!b) {
            return "<div></div>";
        }
        var d = "",
            d = $(document.createElement("svg")),
            f;
        if ("vector" == b.type) {
            f = b.object.getNode().g.cloneNode(!0), d.append(f);
        } else {
            if (f = b.object.getNode().clone(), "undefined" === typeof f.length) {
                var g = f[0];
                g.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", $(g).attr("href"));
                d.append(g);
            } else {
                for (g = 0; g < f.length; g++) {
                    d.append(f[g][0]);
                }
            }
        }
        var h = b.object.width / b.object.height;
        b.object.height > b.object.width ? (g = e / b.object.width * h, h = c / b.object.height) : (h = b.object.height / b.object.width, g = e / b.object.width, h *= c / b.object.height);
        var k = Math.min(e / b.object.width, c / b.object.height),
            p = -b.object.x + b.object.width / 2,
            m = -b.object.y + b.object.height / 2;
        e = 0.5 * (e - b.object.width * k) / k;
        m += 0.5 * (c - b.object.height * k) / k;
        d = '<g transform="scale(' + g + "," + h + ") translate(" + (p + e) + "," + m + ') ">' + d[0].innerHTML.replace("NS1:href", "xlink:href") + "</g>";
        d = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + d + "</svg>";
        "undefined" != typeof f.remove ? f.remove() : "undefined" != typeof f.parentNode && f.parentNode.removeChild(f);
        return d;
    };
    this.changeDistress = function(b) {
        V(z, b);
    };
    this.selectAll = function() {
        z.boundingBox.selectAll();
    };
    this.moveDesignToRegion = function(b) {
        z.boundingBox.selectAll();
        var e = state.designer.activeSide.boundingBox.getSelections();
        if (e && e.length) {
            z.boundingBox.copyElement();
            this.deleteElements(e);
            this.selectRegion(b);
            this.activeSide.boundingBox.pasteElement();
            var c = eventManager.on("rendered", function() {
                ezd.scale = !0;
                c();
            });
        }
    };
}
var pcaDirective = function() {
    var directive = {};
    directive.restrict = 'E';
    directive.replace = true;
    directive.compile = function(element, attributes) {
        var linkFunc = function($scope, element, attributes) {
            $scope.province = '北京市';
            $scope.city = '市辖区';
            $scope.area = '东城区';

            $scope.provinces = pca.getProvinces();
            $scope.cities = pca.getCities($scope.province);
            $scope.areas = pca.getAreas($scope.province, $scope.city);

            $scope.changeProvince = function(){
                $scope.cities = pca.getCities($scope.province);
                $scope.city = $scope.cities[0];
                $scope.changeCity();
            };
            $scope.changeCity = function(){
                $scope.areas = pca.getAreas($scope.province, $scope.city);
                $scope.area = $scope.areas[0];
            };
        }
        return linkFunc;
    }
    return directive;
};

var showModalDirective = ["$compile", function(b) {
    return function(d, c, g) {
        c.click(function() {
            showModal(g.ngShowModal, d, b);
        });
    };
}];
var visibleDirective = function() {
    return function(b, d, c) {
        b.$watch(c.ngVisible, function(b) {
            d.css("visibility", b ? "visible" : "hidden");
        });
    };
};
var showDrawerDirective = ["$compile", function(b) {
    return {
        link: function(d, c, g) {
            var k = g.isDrawerWidth,
                h = g.isShowDrawer,
                f = function() {};;
            c.click(function() {
                showModalDrawer(h, d, b, k, f, null, g);
            });
        }
    };
}];
var selectOnEnterTextboxDirective = function() {
        return {
            link: function(b, d, c) {
                d.focus(function() {
                    function b() {
                        d.off("mouseup", b);
                        return !1;
                    }
                    d.select();
                    window.setTimeout(function() {
                        d.select();
                    }, 1);
                    d.mouseup(b);
                });
            }
        };
    },
    hideDrawersDirective = function() {
        return {
            link: function(b, d, c) {
                d.click(function() {
                    0 < $("#drawersContainer").width() && ($("#drawersContainer:animated").length || hideModalDrawer("animate"));
                });
            }
        };
    },
    showFontsDirective = function() {
        return {
            link: function(b, d, c) {
                b.showFonts || d.click(function() {
                    b.showFonts = 1;
                    b.showClose = 1;
                    b.$apply();
                });
            }
        };
    },
    hideFontsDirective = function() {
        return {
            link: function(b, d, c) {
                d.click(function() {
                    b.showFonts = 0;
                    b.showClose = 0;
                    b.$apply();
                });
            }
        };
    },
    autoFocusDirective = function() {
        return function(b, d, c) {
            setTimeout(function() {
                d.focus();
            }, 50);
        };
    },
    autoSelect = function() {
        return function(b, d, c) {
            d.focus(function() {
                setTimeout(function() {
                    d[0].select();
                }, 10);
            });
        };
    },
    closeWhenClickOutside = ["$parse",
        function(b) {
            return function(d, c, g) {
                var k = g.isInlineModal;
                $(document).mousedown(function(g) {
                    var f = g.target;
                    if (f === document || "HTML" === f.tagName) {
                        f = g.currentTarget.activeElement;
                    }!c.is(f) && 0 === c.has(f).length && c.is(":visible") && (d.$eval(k) ? (b(k).assign(d, !1), d.$$phase || d.$apply()) : c.hide());
                });
            };
        }
    ],
    closeWhenClickOutsideDropDown = function() {
        return function(b, d, c) {
            $(document).mouseup(function(c) {
                var k = c.target;
                if (k === document || "HTML" === k.tagName) {
                    k = c.currentTarget.activeElement;
                }!d.is(k) && 0 === d.has(k).length && d.is(":visible") && (b.showingInlineModal ? (b.showingInlineModal = !1, b.$$phase || b.$apply()) : (d.slideUp(300), $("#" + d.attr("id") + "-close-btn").hide(), $("#" + d.attr("id") + "-select-arrow").show()));
            });
        };
    },
    closeWhenClickOutsideDropDownShow = function() {
        return function(b, d, c) {
            d.click(function(b) {
                "block" != $("#" + d.data("dropdownid")).css("display") && (b = d.data("dropdownid"), $("#" + b).slideDown(300), $("#" + b + "-select-arrow").hide(), $("#" + b + "-close-btn").show());
            });
        };
    },
    closeWhenClickOutsideDropDownHide = function() {
        return function(b, d, c) {
            d.click(function(b) {
                "block" == $("#" + d.data("dropdownid")).css("display") && (b = d.data("dropdownid"), $("#" + b).slideUp(300), $("#" + b + "-select-arrow").show(), $("#" + b + "-close-btn").hide());
            });
        };
    },
    autoLoadFileInput = function() {
        return function(b, d, c) {
            var g = function() {
                var c = d[0];
                if (c.files && c.files[0]) {
                    var h = new FileReader;
                    h.onload = function(f) {
                        b.fileDataReady && b.fileDataReady(f.target.result, c.files[0]);
                        var h = $("<input type='file' name='" + d[0].name + "' id='" + d[0].id + "' />");
                        $.each(d[0].attributes, function(b, c) {
                            var d = c.name,
                                f = c.value;
                            "type" != d && h.attr(d, f);
                        });
                        d.replaceWith(h);
                        h.change(g);
                        d = h;
                    };
                    h.readAsDataURL(c.files[0]);
                }
            };
            d.change(g);
        };
    },
    textboxTimerChangeDirective = ["$parse",
        function(b) {
            return {
                link: function(d, c, g) {
                    var k = null;
                    c.on("input paste", function(c) {
                        k && clearTimeout(k);
                        k = setTimeout(function() {
                            var f = b(g.isTimerChange);
                            f && f(d, {
                                $event: c
                            });
                        }, parseInt(g.interval));
                    });
                }
            };
        }
    ],
    formSubmitDirective = ["$parse",
        function(b) {
            return {
                restrict: "A",
                require: "form",
                link: function(d, c, g, k) {
                    setTimeout(function() {
                        c.find("input, textarea, select").trigger("input").trigger("change").trigger("keydown");
                    }, 0);
                    var h = g.validClass || "isd-valid",
                        f = g.invalidClass || "isd-invalid",
                        m = function(b) {
                            var c = !0;
                            b.find("[data-input-type]").each(function() {
                                if ($(this).is(":visible")) {
                                    var b;
                                    if (b = c) {
                                        b = this.value;
                                        var d = $(this).data("input-type"),
                                            d = base.validators[d];
                                        b = "function" === typeof d ? d(b, this) : d.test(b);
                                        d = $(this).closest(".isd-form-group");
                                        d.length || (d = $(this).parent());
                                        b ? (d.addClass(h), d.removeClass(f)) : (d.addClass(f), d.removeClass(h));
                                    }
                                    c = b;
                                }
                            });
                            return c;
                        };
                    c.on("submit", function(f) {
                        if (!m(c)) {
                            return f.preventDefault(), !1;
                        }
                        b(g.isSubmit)(d, {
                            $event: f
                        });
                        d.$$phase || d.$apply();
                    });
                }
            };
        }
    ],
    colorsTooltipDirective = function() {
        return function(b, d, c) {
            d.bind("mouseover", function() {
                var c = d.attr("data-color"),
                    c = b.getColorName(c),
                    k = $("#dsContainer"),
                    h = -k.offset().top + d.offset().top - d.height() - 20,
                    f = -k.offset().left + d.offset().left - d.width() / 2 + 32;
                k.append('<div class="isd-tooltip-color"><span class="isd-color-name">' + c + '</span><span class="isd-color-tool-tip-arrow-down"></span></div>');
                $(".isd-tooltip-color").css("top", h).css("left", f - $(".isd-tooltip-color").outerWidth(!1) / 2).css("z-index", 1009);
            });
            d.on("mouseleave", function() {
                $(".isd-tooltip-color").remove();
            });
            d.bind("click", function() {
                $(".isd-tooltip-color").remove();
            });
        };
    },
    tooltipDirective = function() {
        return function(b, d, c) {
            b = $("#tooltipsContainer");
            b.length || ($(document.body).append("<div id='tooltipsContainer'></div>"), b = $("#tooltipsContainer"));
            b.append('<div id="tooltip' + c.isTooltip + '" class="isd-buttonTooltip"></div>');
            d.on("mouseenter", function() {
                if (state.tooltips) {
                    var b = c.isTooltip;
                    if (state.tooltips[b]) {
                        var k = $("#tooltip" + c.isTooltip),
                            h = d.offset(),
                            f = d[0].clientWidth,
                            m = d[0].clientHeight,
                            q = $(document.body).height(),
                            n = $(document.body).width();
                        k.css("visibility", "hidden");
                        k.show();
                        var r = k[0].clientHeight,
                            t = k[0].clientWidth;
                        k.css("visibility", "visible");
                        k.hide();
                        f = h.left + f + 0;
                        m = h.top + m + 0;
                        h.left > 0.6 * n && (f = h.left - t - 0);
                        h.top > 0.6 * q && (m = h.top - r - 0);
                        k.css("left", f);
                        k.css("top", m);
                        $("#tooltip" + b).fadeIn("fast");
                    }
                }
            });
            d.on("mouseleave", function() {
                $("#tooltip" + c.isTooltip).fadeOut("fast");
            });
        };
    },
    disabledDirective = function() {
        function b(b) {
            b.preventDefault();
        }
        return {
            link: function(d, c, g) {
                d.$watch(g.isDisabled, function(d) {
                    c.removeClass("isd-disabled");
                    d && c.addClass("isd-disabled");
                    var g = c.prop("tagName").toUpperCase();
                    if ("A" == g) {
                        if (d) {
                            c.on("click", b);
                        } else {
                            c.off("click", b);
                        }
                    } else {
                        if ("INPUT" == g || "SELECT" == g || "TEXTAREA" == g || "BUTTON" == g) {
                            d ? c.prop("disabled", !0) : c.prop("disabled", !1);
                        }
                    }
                });
            }
        };
    },
    requiredDirective = function() {
        return {
            link: function(b, d, c) {
                b.$watch(c.isRequired, function(b) {
                    d.removeClass("isd-required");
                    b && d.addClass("isd-required");
                    var c = d.prop("tagName").toUpperCase();
                    if ("INPUT" == c || "SELECT" == c || "TEXTAREA" == c || "BUTTON" == c) {
                        b ? d.prop("required", !0) : d.prop("required", !1);
                    }
                });
            }
        };
    },
    printElementDirective = function() {
        return {
            link: function(b, d, c) {
                b.$watch(function() {
                    return c.isPrintElement;
                }, function(b) {
                    b && "false" != b && (document.getElementById("isdPrintElement") || $(document.body).prepend("<div id='isdPrintElement'></div>"), b = $("#isdPrintElement"), b.html(d.html()), window.print());
                });
            }
        };
    },
    scrollPagerDirective = ["$timeout",
        function(b) {
            return {
                restrict: "A",
                transclude: !0,
                template: '<div class="isd-scrollPagerContainer"><div ng-transclude></div><div class="isd-direction-arrow"><a class="isd-direction-up"><i>&nbsp;</i></a><a class="isd-direction-down"><i>&nbsp;</i></a></div>',
                scope: {
                    pageSize: "@",
                    itemHeight: "@"
                },
                link: function(d, c, g) {
                    c.css("overflow", "hidden");
                    c.css("height", "100%");
                    var k = function() {
                        var b = c.find("a.isd-direction-up"),
                            f = c.find("a.isd-direction-down");
                        d.scrollPosition >= c[0].scrollHeight - c[0].offsetHeight ? f.hide() : f.show();
                        0 >= d.scrollPosition ? b.hide() : b.show();
                    };
                    d.scrollPosition = 0;
                    b(k, 10);
                    g = c.find("a.isd-direction-up");
                    c.find("a.isd-direction-down").click(function() {
                        d.scrollPosition += 0.75 * c[0].offsetHeight;
                        c[0].scrollTop = d.scrollPosition;
                        k();
                    });
                    g.click(function() {
                        d.scrollPosition = Math.max(0, d.scrollPosition - 0.75 * c[0].offsetHeight);
                        c[0].scrollTop = d.scrollPosition;
                        k();
                    });
                    c.click(function() {
                        b(k, 10);
                    });
                    d.$watch(function() {
                        return c[0].scrollHeight + ":" + c[0].offsetHeight;
                    }, function() {
                        k(c);
                    });
                }
            };
        }
    ],
    verticallyCenteredDirective = function() {
        return {
            restrict: "A",
            transclude: !0,
            template: '<div ng-transclude class="isd-verticallyCentered"></div>',
            scope: {},
            link: function(b, d, c) {
                d.parent();
                c = d.find("img");
                var g = function(b) {
                    if (!b.centered && b.is(":visible")) {
                        var c = b.parent(),
                            d = b.find("img");
                        if (areImagesLoaded(d)) {
                            if (d.show(), d = b[0].offsetHeight) {
                                c.height() > d ? (c = (c.height() - b[0].offsetHeight) / 2, b.css("margin-top", c + "px")) : b.css("margin-top", "0px"), b.centered = !0;
                            }
                        } else {
                            d.load(function() {
                                g(b);
                            });
                        }
                    }
                };
                areImagesLoaded(c) ? g(d) : (c.load(function() {
                    g(d);
                }), c.hide());
                b.$watch(function() {
                    return d.is(":visible");
                }, function() {
                    g(d);
                });
            }
        };
    },
    loadingDirective = function() {
        return function(b, d, c) {
            b.$watch(c.isLoading, function(b) {
                $(d).LoadingScript("method_12", {
                    background_image: ezdVars.DesignerLocation + "/common/images/loading20.png",
                    main_width: 32,
                    animation_speed: 10,
                    additional_style: "",
                    after_element: !1
                });
            });
        };
    },
    cartNavigationDirective = function() {
        var b = [];
        b.push({
            description: "Select Sizes, Colors and Quantities",
            modalName: "selectSizes",
            index: 0,
            isDisabled: function() {
                return !1;
            }
        });
        b.push({
            description: "Login",
            modalName: "cartLogin",
            index: 1,
            isDisabled: function() {
                return state.activeUserToken && state.currentUserToken;
            }
        });
        b.push({
            description: "Save Design",
            modalName: "saveDesign",
            index: 2,
            isDisabled: function() {
                return state.designSaveResult || !state.selectedDesign || state.selectedDesign.isEmpty();
            }
        });
        b.push({
            description: "View Cart",
            modalName: "viewCart",
            index: 3,
            isDisabled: function() {
                return !1;
            }
        });
        b.push({
            description: "Payment Options",
            modalName: "enterPayment",
            index: 4,
            isDisabled: function() {
                return !ezdVars.EnableCartCheckout || ezdVars.PaymentDisabled;
            }
        });
        b.push({
            description: "Billing Address",
            modalName: "enterAddresses",
            index: 5,
            isDisabled: function() {
                return !ezdVars.EnableCartCheckout;
            }
        });
        b.push({
            description: "Shipping Method",
            modalName: "shippingMethod",
            index: 6,
            isDisabled: function() {
                return !ezdVars.EnableCartCheckout || !ezdVars.EnableCartShipping;
            }
        });
        b.push({
            description: "Review Order",
            modalName: "reviewOrder",
            index: 7,
            isDisabled: function() {
                return !ezdVars.EnableCartCheckout;
            }
        });
        return {
            restrict: "E",
            transclude: !0,
            templateUrl: state.theme.url(ezdVars.DesignerLocation + "/ds/html/cart/cartNavigation.html"),
            scope: {},
            link: function(d, c, g) {
                c = parseInt(g.stepNumber);
                if (0 == c) {
                    for (g = 0; g < b.length; g++) {
                        var k = b[g];
                        "undefined" === typeof k.isDisabledValue && (k.isDisabledValue = k.isDisabled());
                    }
                }
                d.previousSteps = [];
                var h = 0;
                for (g = 0; g <= c; g++) {
                    k = b[g], k.isDisabledValue || (k.number = h, h++, d.previousSteps.push(k));
                }
                d.nextSteps = [];
                for (g = c + 1; 8 > g; g++) {
                    k = b[g], k.isDisabledValue || (k.number = h, h++, d.nextSteps.push(k));
                }
            }
        };
    };

function attrDirective(b, d) {
    b = "isAttr" + b;
    return function() {
        var c = /\s*([^=]+)(=\s*(\S+))?/;
        return {
            restrict: "A",
            link: function(g, k, h) {
                function f(b) {
                    if (!0 === d || g.$index % 2 === d) {
                        t && !angular.equals(b, t) && r(t, n), r(b, q);
                    }
                    t = angular.copy(b);
                }

                function m(b) {
                    return (b = c.exec(b)) && [b[1].replace(/\s+$/, ""), b[3]];
                }

                function q(b) {
                    b && "undefined" !== b[0] && "null" !== b[0] && k.attr(b[0], angular.isDefined(b[1]) ? b[1] : "");
                }

                function n(b) {
                    b && k.removeAttr(b[0]);
                }

                function r(b, c, d) {
                    angular.isString(b) && (b = b.split(/\s+/));
                    angular.isArray(b) ? angular.forEach(b, function(b) {
                        b = m(b);
                        c(b);
                    }) : angular.isObject(b) && angular.forEach(b, function(b, d) {
                        d = m(d);
                        b && (d[1] = b, c(d));
                    });
                }
                var t;
                g.$watch(h[b], function(c) {
                    f(g.$eval(h[b]));
                }, !0);
                h.$observe(b, function() {
                    f(g.$eval(h[b]));
                });
            }
        };
    };
}
var ngAttrDirective = attrDirective("", !0);
Namespace("ui.directives");
ui.directives.pagerDirective = ["$parse",
    function(b) {
        var d = function(b) {
            this.allData = null;
            this.pageSize = b;
            this.currentPageNum = 0;
            this.__defineGetter__("currentPage", function() {
                return this.allData ? this.allData.slice(this.currentPageNum * this.pageSize, this.currentPageNum * this.pageSize + this.pageSize) : [];
            });
            this.__defineGetter__("pageNumbers", function() {
                if (!this.allData) {
                    return [];
                }
                var b = [],
                    c = Math.ceil(this.allData.length / this.pageSize);
                if (1 >= c) {
                    return [];
                }
                for (var d = 0; d < c; d++) {
                    b.push(d);
                }
                return b;
            });
        };
        return {
            link: function(c, g, k) {
                c[k.isPager + "Pager"] = new d(parseInt(k.pageSize));
                c[k.isPager + "Pager"].allData = b(k.isPager)(c);
                c.$watch(k.isPager, function() {
                    c[k.isPager + "Pager"].allData = b(k.isPager)(c);
                });
            }
        };
    }
];
ui.directives.colorPickerDirective = ["$parse",
    function(b) {
        return {
            link: function(d, c, g) {
                c.spectrum({
                    flat: !0,
                    showInput: !0,
                    allowEmpty: !1,
                    preferredFormat: "hex",
                    showButtons: !1,
                    color: "#FFFFFF",
                    move: function(c) {
                        ezdVars.ArtToolsMode && (b(g.ngModel).assign(d, c.toHexString()), (c = b(g.ngChange)) && c(d));
                    }
                });
            }
        };
    }
];
ui.directives.errorSrcDirective = function() {
    return {
        link: function(b, d, c) {
            d.bind("error", function() {
                c.src != c.isErrorSrc && c.$set("src", c.isErrorSrc);
            });
        }
    };
};
ui.directives.imgLoadingOverlay = function() {
    return {
        link: function(b, d, c) {
            var g = $(c.isImgPreload);
            0 < !d.parent().has(g).length && (g = g.clone(), d.parent().append(g));
            g.show();
            d.load(function() {
                g.hide();
            });
            d.error(function() {
                g.hide();
            });
        }
    };
};
ui.directives.addThis = function() {
    return {
        link: function(b, d, c) {
            setTimeout(function() {
                if (0 != location.href.indexOf("file:")) {
                    var b = c.designId;
                    window.addthis_share = {
                        url: "http://" + ezdVars.ApiDomain + "/" + ezdVars.AppURI + "/Design/" + encodeURI(c.designName) + "_" + b
                    };
                    document.getElementById("addThisWidget") ? addthis.toolbox("#" + d[0].id) : service.loadScript("https://s7.addthis.com/js/250/addthis_widget.js#pubid=" + ezdVars.AddThisPublisherId, "addThisWidget", function() {
                        addthis.toolbox("#" + d[0].id);
                    });
                }
            }, 50);
        }
    };
};
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
Namespace("ui");
ui.ThemeEditor = function(b) {
    var d = this;
    this.rules = b;
    this.makeUI = function() {
        for (var c = $("<form id='isd-themeEditor'><button type='button' id='isd-saveThemeButton'>Save</button><button type='button' id='isd-resetThemeButton'>Reset</button></form>").prependTo(document.body), g = {}, k = 0; k < b.length; k++) {
            var h = b[k];
            g[h.group] || (g[h.group] = []);
            g[h.group].push(h);
            "color" == h.type ? h.html = "<li><span>" + h.label + ':</span> <input type="color" name="' + h.id + '" id="' + h.id + '" class="themeControl" value= "' + h["default"] + '"/></li>' : "text" == h.type && (h.html = "<li><span>" + h.label + ':</span> <input type="text" name="' + h.id + '" id="' + h.id + '" class="themeControl" value= "' + h["default"] + '"/></li>');
        }
        for (var f in g) {
            c.append('<a class="groupLabel" href="#group' + f.replace(/ /gi, "") + '">' + f + "</a>");
        }
        for (f in g) {
            for (var m = '<ul id="group' + f.replace(/ /gi, "") + '" class="groupControls" style="display:none">', k = 0; k < g[f].length; k++) {
                h = g[f][k], m += h.html;
            }
            m += "</ul>";
            c.append(m);
        }
        $("a.groupLabel").click(function(b) {
            var c = $($(b.currentTarget).attr("href"));
            $(".groupLabel").removeClass("active");
            c.is(":visible") ? c.slideUp() : ($(".groupControls").hide(), c.slideDown(), $(b.currentTarget).addClass("active"));
        });
        $("#isd-saveThemeButton").click(function() {
            d.saveChanges();
        });
        $("#isd-resetThemeButton").click(function() {
            for (var c = 0; c < b.length; c++) {
                $("#" + b[c].id).val(b[c]["default"]);
            }
            d.applyChangesToDocument();
        });
        $(".themeControl").change(this.applyChangesToDocument);
        this.getChanges(function(b) {
            b && $(b).find("Setting").each(function() {
                var b = $("#" + $(this).attr("rule_id"));
                b && b.val($(this).attr("value"));
            });
        });
    };
    this.applyChangesToDocument = function() {
        $("#isd-themeCustomization").remove();
        for (var c = "<style id='isd-themeCustomization'>", d = 0; d < b.length; d++) {
            var k = b[d];
            if ("color" == k.type) {
                c += k.css[0].replace(/%%value%%/gi, $("#" + k.id).val());
            } else {
                if ("cssChoice" != k.type && "text" == k.type) {
                    var h = $(k.selector).text();
                    (ezdVars.EditTheme || h == k["default"]) && $(k.selector).text($("#" + k.id).val());
                }
            }
        }
        $("head").append(c + "</style>");
    };
    this.saveChanges = function() {
        var c = {};
        $("#isd-themeEditor input").each(function() {
            c[this.id] = $(this).val();
        });
        for (var d in c) {
            var k = findMatch(b, function(b) {
                return b.id == d;
            });
            c[d] == k["default"] && delete c[d];
        }
        $.ajax({
            type: "POST",
            url: "http://" + ezdVars.ApiDomain + "/" + ezdVars.AppURI + "/Config/UploadDesignerTheme/",
            data: c,
            dataType: "text/plain"
        });
    };
    this.getChanges = function(b) {
        $.ajax({
            type: "GET",
            url: "http://" + ezdVars.ApiDomain + "/images/publishers/" + ezdVars.PublisherID + "/stores/" + ezdVars.AppURI + "/dsTheme.xml",
            dataType: "xml",
            success: function(d) {
                b && b(d);
            },
            error: function() {
                b && b(null);
            }
        });
    };
    this.updateAtBeginning = function(c) {
        if (c) {
            this.currentSettings = {};
            $("#isd-themeCustomization").remove();
            var g = "<style id='isd-themeCustomization'>";
            $(c).find("Setting").each(function() {
                var c = $(this).attr("rule_id"),
                    h = findMatch(b, function(b) {
                        return b.id == c;
                    });
                h && (d.currentSettings[c] = {
                    rule: h,
                    value: $(this).attr("value")
                }, "color" == h.type && (g += h.css[0].replace(/%%value%%/gi, $(this).attr("value"))));
            });
            this.updateLabels();
            $("head").append(g + "</style>");
        }
    };
    this.updateLabels = function() {
        for (var b in this.currentSettings) {
            var d = this.currentSettings[b],
                k = d.rule;
            "text" == k.type && $(k.selector).text().toLowerCase() == k["default"].toLowerCase() && $(k.selector).text(d.value);
        }
    };
};
ui.FontManager = function(b) {
    var d = this,
        c = state.fontCategories.slice(0);
    b ? deleteMatches(c, function(b) {
        return "0" == b.IsEmbroidery;
    }) : deleteMatches(c, function(b) {
        return "1" == b.IsEmbroidery;
    });
    this.getCategories = function() {
        return c;
    };
    this.addMissingDesignFonts = function() {
        var b = c[0],
            d = !1;
        0 != b.font_style_id && (b = {
            font_style_id: 0,
            FontCount: 0
        }, b.IsEmbroidery = ezdVars.EmbroideryMode, b.font_style = b.style = "In Use", b.fonts = []);
        for (var h = 0; h < state.selectedDesign.canvas_text.length; h++) {
            var f = state.selectedDesign.canvas_text[h],
                m = findMatch(c, function(b) {
                    return b.font_style_id == f.fontStyleId;
                }),
                q = 0 <= state.excludedFontIDs.indexOf(f.fontId) || !m;
            m && m.fonts && (findMatch(m.fonts, function(b) {
                return b.font_id == f.fontId;
            }) || (q = !0));
            m = findMatch(b.fonts, function(b) {
                return b.font_id == f.fontId;
            });
            q && (f.fontObject.fontStyle = b, f.fontObject.old_font_style_id = f.fontObject.font_style_id, f.fontObject.font_style_id = 0, m || (d = d || 0 == b.FontCount, b.FontCount++, b.fonts.push(f.fontObject)));
        }
        d && c.unshift(b);
    };
    this.getFontsByCategory = function(b, k) {
        var h = findMatch(c, function(c) {
            return c.font_style_id == b;
        });
        h || (h = findMatch(c, function(b) {
            return 0 == b.font_style_id;
        }));
        h.fonts && h.fonts.length ? k(h.fonts) : service.getFontsByCategory(b, function(b) {
            h.fonts = b;
            for (var c = 0; c < b.length; c++) {
                b[c].fontStyle = h, b[c].font_style_id = h.font_style_id;
            }
            d.addMissingDesignFonts();
            k(b);
        });
    };
    this.getFontDefaults = function(b) {
        var d = "popups",
            h = "3D 03";
        ezdVars.HasGoogleFonts && (d = "Modern", h = "Modern 20");
        var f = searchInArray(c, d, "style");
        f || (f = c[c.length - 1]);
        this.getFontsByCategory(f.font_style_id, function(c) {
            var d = searchInArray(c, h, "name");
            d || (d = c[0]);
            d.font_style_id = f.font_style_id;
            b({
                category: f,
                font: d
            });
        });
    };
    this.addMissingDesignFonts();
};
ui.DSUtils = function() {
    console.log('DSUtils init');
    var b = this;
    this.syncDesignCanvasesWithProductRegions = function() {};
    this.loadDesignInformation = function(d, c, g) {
        state.selectedDesignID = state.selectedDesignID || 0;
        var k = function() {
            state.initData && (b.syncDesignCanvasesWithProductRegions(), state.designer ? (b.synchronizeElementIDs(), d && d()) : state.selectedProductStyle && state.selectedProductStyle.product_regions && state.selectedProductStyle.product_regions.length ? b.addDesigner(function() {
                b.synchronizeElementIDs();
                d && d();
            }) : (state.designer = {}, d && d()));
        }
        var h = function() {
            ezdVars.EmbroideryMode = ezdVars.EmbroideryMode || "embroidery_demo" == ezdVars.AppURI;
            service.getInitialLoad(ezdVars.ProductID, ezdVars.ProductStyleID, ezdVars.EmbroideryMode, function(b) {
//                debugger;
                state.selectedProduct = b.product;
                state.selectedProductStyle = findMatch(b.product.product_styles, function(b) {
                    return b.product_style_id == ezdVars.ProductStyleID;
                });
                null != state.selectedProduct && null != state.selectedProductStyle && null != state.selectedProductStyle.product_regions && 0 != state.selectedProductStyle.product_regions.length || alert("This product is not configured for use with the design studio.  Please select a different product.");
                state.selectedProductStyle.selectedRegion = state.selectedProductStyle.defaultRegion;
                state.storeInkColors = normalizeColorStrings(b.inkColors);
                state.fontCategories = b.fontCategories;
                state.excludedFontIDs = b.excludedFontIDs;
                for (var c = 0; c < state.excludedFontIDs.length; c++) {
                    state.excludedFontIDs[c] = parseInt(state.excludedFontIDs[c], 10);
                }
                state.threadCharts = b.threadCharts;
                state.productXml = b.productResultXml;
                eventManager.trigger("selectedProductLoaded", b.product);
                state.initData = b;
                k();
                console.debug('end...');
            }, function(b) {
                "Store is suspended" == b && $("#ink_overlayWrap").show();
            });
        };
        ezdVars.UseDesignProduct && service.getDesign(state.selectedDesignID, function(b) {
            state.initData || (b.productStyle && b.productStyle.product_id && (ezdVars.ProductID = window.ezdProductID = state.selectedProductID = b.productStyle.product_id, ezdVars.ProductStyleID = window.ezdProductStyleID = state.selectedProductStyleID = b.productStyle.product_style_id), h());
            k();
        });
        ezdVars.UseDesignProduct || state.initData || h();
        k();
    };
    this.getColorsForElement = function(b, c, g) {
        var k = [];
        if (b instanceof ui.text.TextElement) {
            if (b.isEmbroidery) {
                b = getColorString(b.color1), k.push(b);
            } else {
                c = getColorString(b.color);
                var h = getColorString(b.strokeColor);
                k.push(c);
                b.strokeColor && 1E-5 < b.stroke && k.push(h);
            }
        } else {
            if (h = b instanceof ui.svg.SvgElement ? "vector" : "raster", (b = b.colors || b.data.colors) && (!c || "vector" == h || "emb" == h)) {
                for (c = 0; c < b.length; c++) {
                    h = getColorString(b[c]), k.push(h);
                }
            }
        }
        g && deleteMatches(k, function(b) {
            return "none" == b;
        });
        return k;
    };
    this.getColorsInUse = function(b, c, g) {
        var k = state.selectedDesign.canvas;
        if (b && (k = findMatch(state.selectedDesign.canvases, function(c) {
            return c.name.toLowerCase() == b.toLowerCase();
        }), !k)) {
            return [];
        }
        for (var h = [], f = 0; f < k.elements.length; f++) {
            h = h.concat(this.getColorsForElement(k.elements[f], c, g));
        }
        c = [];
        for (f = 0; f < h.length; f++) {
            g = h[f], searchInArray(c, g) || c.push(g);
        }
        return c;
    };
    this.getPricingColorData = function() {
        var d = function(b) {
            var c = state.selectedDesign.canvas;
            if (b && (c = findMatch(state.selectedDesign.canvases, function(c) {
                return c.name.toLowerCase() == b.toLowerCase();
            }), !c)) {
                return !0;
            }
            if (c.is_distressed && "0" != c.is_distressed) {
                return !1;
            }
            for (var d = 0; d < c.elements.length; d++) {
                var f = c.elements[d];
                if (f instanceof ui.bitmap.BitmapElement && (f = f.data, !(f.colors && f.colors.length || f.art_colors && f.art_colors.length))) {
                    return !1;
                }
            }
            for (d = 0; d < state.designer.design.sides.length; d++) {
                if (c = state.designer.design.sides[d], c.is_distressed && 1 == c.is_distressed) {
                    return !1;
                }
            }
            return !0;
        }, c = {};
        c.usrColors = {
            front: b.getColorsInUse("front", !1, !0),
            back: b.getColorsInUse("back", !1, !0),
            left: b.getColorsInUse("third", !1, !0),
            right: b.getColorsInUse("fourth", !1, !0)
        };
        c.usrColors.all = c.usrColors.front.length + c.usrColors.back.length + c.usrColors.left.length +c.usrColors.right.length;
        c.numFrontColors = c.usrColors.front.length;
        c.isFrontVector = d("front");
        c.numSleeveLeftColors = c.usrColors.left.length;
        c.isSleeveLeftVector = d("sleeveleft");
        c.numSleeveRightColors = c.usrColors.right.length;
        c.isSleeveRightVector = d("sleeveright");
        c.numBackColors = c.usrColors.back.length;
        c.isBackVector = d("back");
        c.isFrontVector || (c.numFrontColors = 100);
        c.isSleeveLeftVector || (c.numSleeveLeftColors = 100);
        c.isSleeveRightVector || (c.numSleeveRightColors = 100);
        c.isBackVector || (c.numBackColors = 100);
        d = [];
        state.designer.getSideByName("front") && d.push("Front: " + (c.isFrontVector ? c.numFrontColors : "N/A - Digital Print"));
        state.designer.getSideByName("back") && d.push("Back: " + (c.isBackVector ? c.numBackColors : "N/A - Digital Print"));
        state.designer.getSideByName("sleeveleft") && d.push("Sleeve Left: " + (c.isSleeveLeftVector ? c.numSleeveLeftColors : "N/A - Digital Print"));
        state.designer.getSideByName("sleeveright") && d.push("Sleeve Right: " + (c.isSleeveRightVector ? c.numSleeveRightColors : "N/A - Digital Print"));
        c.sideColorString = d.join(", ");
        c.isAllVector = !1;
        c.isFrontVector && c.isSleeveLeftVector && c.isSleeveRightVector && c.isBackVector && (c.isAllVector = !0);
        return c;
    };
    this.addDesigner = function(d) {
        "undefined" != typeof Parser && (window.parser = new Parser);
        var c = {
            type: "ezd",
            width: 500,
            height: 500,
            container: $("#designerContainer"),
            ui: new EmptyUI,
            ajaxCallStarted: service.ajaxCallStarted,
            ajaxCallEnded: service.ajaxCallEnded,
            productXml: state.initData.productResultXml,
            designXml: state.initData.designXml
        }, g = eventManager.on("rendered", function() {
            state.selectedDesign = new ui.common.Design(state.designer);
            b.synchronizeElementIDs();
            d && d();
            g && g();
        });
        c.hideVisibleRegion = !ezdVars.ProductID && !ezdVars.DefaultProductID;
        window.ezd = state.designer = new BaseEZD(c);
    };
    this.addRenderedHandlerOneTime = function(b) {
        var c = eventManager.on("rendered", function() {
            b && b();
            c && c();
        });
    };
    this.selectNewDesign = function(d, c, g) {
        eventManager.trigger("designChanging", null);
        var k = eventManager.on("rendered", function() {
            b.synchronizeElementIDs();
            eventManager.trigger("designChanged", null);
            eventManager.trigger("layersChanged", null);
            k && k();
        });
        state.designer.getDesign(d);
    };
    this.goToDefaultRoute = function(b) {
//        var c = "addText",
//            g = ezd.activeSide.boundingBox.getSelections();
//        null != g ? angular.isArray(g) ? c = "editMultipleSelection" : g instanceof ui.text.TextElement ? c = "editText/" + g.id : g instanceof ui.bitmap.BitmapElement ? c = "editImage/" + g.id : g instanceof ui.svg.SvgElement && (c = "editSvg/" + g.id) : ezdVars.ArtToolsMode && (c = "layers");
//        b.path(c);
    };
    this.addClipArt = function(b, c) {
        var g = function() {
            var g = eventManager.on("rendered", function() {
                g && g();
                eventManager.trigger("designColorsChanged");

                c && c(h);
            });
            b.art_name_full && (b.art_name = b.art_name_full);
            b.art_jit && "raster" == b.art_type && (b.art_path = b.art_jit);
            "emb" == b.art_type && state.selectedProductStyle.selectedRegion && (b.percentOfRegion = b.width / 254 / state.selectedProductStyle.selectedRegion.render_width_inches);
            var h = state.designer.addClipArt(b);
            eventManager.trigger("designColorsChanged");
        };
        b.width && b.height ? g() : getImageData(b.thumburl_large, !1, function(c) {
            b.width = c.width;
            b.height = c.height;
            g();
        });
    };
    this.haveSameSides = function(b) {
        for (var c = 0, g = 0; g < state.designer.product.sides.length; g++) {
            searchInArray(b.defaultStyle.product_regions, state.designer.product.sides[g].name, "side") && c++;
        }
        return c === state.designer.product.sides.length ? !0 : !1;
    };
    this.saveStateToLocalStorage = function() {
        this.clearLocalStorage();
        state.selectedDesign && 0 < state.selectedDesign.design_id && (localStorage.design_id = state.selectedDesign.design_id);
        state.selectedProduct && 0 < state.selectedProduct.product_id && (localStorage.product_id = state.selectedProduct.product_id);
        state.selectedProductStyle && 0 < state.selectedProductStyle.product_style_id && (localStorage.product_style_id = state.selectedProductStyle.product_style_id);
        state.selectedProductStyle && state.selectedProductStyle.selectedRegion && state.selectedProductStyle.selectedRegion.regionIndex && (localStorage.region_index = state.selectedProductStyle.selectedRegion.regionIndex);
        state.activeUserToken && (localStorage.user_id = state.activeUserToken);
        state.currentUserToken && (localStorage.session_id = state.currentUserToken);
        state.currentSessionToken && (localStorage.session_token = state.currentSessionToken);
        state.userSelectedProduct && (localStorage.userSelectedProduct = state.userSelectedProduct);
        state.userSelectedDesign && (localStorage.userSelectedDesign = state.userSelectedDesign);
        localStorage.store_id = ezdVars.AppToken;
    };
    this.loadStateFromLocalStorage = function() {
        var b = {};
        if (localStorage.store_id != ezdVars.AppToken) {
            return this.clearLocalStorage(), {};
        }
        localStorage.design_id && (b.design_id = localStorage.design_id);
        b.design_id = localStorage.design_id;
        b.product_id = localStorage.product_id;
        b.product_style_id = localStorage.product_style_id;
        b.region_index = localStorage.region_index;
        b.user_id = localStorage.user_id;
        b.session_id = localStorage.session_id;
        b.session_token = localStorage.session_token;
        !state.activeUserToken && localStorage.user_id && (state.activeUserToken = localStorage.user_id);
        !state.currentUserToken && localStorage.session_id && (state.currentUserToken = localStorage.session_id);
        !state.currentSessionToken && localStorage.session_token && (state.currentSessionToken = localStorage.session_token);
        state.userSelectedProduct = localStorage.userSelectedProduct;
        state.userSelectedDesign = localStorage.userSelectedDesign;
        return b;
    };
    this.clearLocalStorage = function() {
        localStorage.removeItem("store_id");
        localStorage.removeItem("design_id");
        localStorage.removeItem("product_id");
        localStorage.removeItem("product_style_id");
        localStorage.removeItem("region_index");
        localStorage.removeItem("user_id");
        localStorage.removeItem("session_id");
        localStorage.removeItem("session_token");
        localStorage.removeItem("userSelectedProduct");
        localStorage.removeItem("userSelectedDesign");
    };
    this.canPrintDesign = function() {
        for (var b = 0; b < state.designer.sides.length; b++) {
            if (state.dsUtils.getColorsInUse(state.designer.sides[b].name).length > ezdVars.MaxScreenPrintColors) {
                return !1;
            }
        }
        return !0;
    };
    this.synchronizeElementIDs = function() {};
    this.getEmbroideryUrl = function(b, c, g) {
        var k = "";
        if ("embroideryText" === c) {
            k = "http://" + ezdVars.ApiDomain + "/" + ezdVars.AppURI + "/JITImage/EmbroideryTextFull/?textValue=" + escape(b.value) + "&fontName=" + escape(b.fontObject.font || b.fontObject.name);
            b.font_size = 240;
            for (var h in g) {
                if (b[h]) {
                    var f = escape(b[h]),
                        k = k + ("&" + g[h] + "=" + f)
                }
            }
            console.log('color1 color2 color3 color4');
            b.color1 && (k += "&rgb0=" + parseInt(getColorString(b.color1, !0), 16));
            b.color2 && (k += "&rgb1=" + parseInt(getColorString(b.color2, !0), 16));
            b.color3 && (k += "&rgb2=" + parseInt(getColorString(b.color3, !0), 16));
            b.color4 && (k += "&rgb3=" + parseInt(getColorString(b.color4, !0), 16));
        }
        if ("embroideryArt" === c && (k = "http://" + ezdVars.ApiDomain + "/" + ezdVars.AppURI + "/JITImage/EmbroideryClipArt/?ArtID=" + b.art_id, b.colors && b.colors.length)) {
            for (c = 0; c < b.colors.length; c++) {
                k += "&colors=" + getColorString(b.colors[c], !0);
            }
        }
        return k;
    };
};
function Parser() {
    function b() {
        s == u && (r.push(n), eventManager.trigger("designLoaded", n));
    }

    function d(d) {
        n = {
            elements: [],
            canvases: [],
            information: {},
            product: {}
        };
        s = u = 0;
        t.toLoad = [];
        t.loaded = 0;
        t.index = 0;
        e.toLoad = [];
        e.loaded = 0;
        e.index = 0;
        p.toLoad = [];
        p.loaded = 0;
        p.index = 0;
        $(d).find("canvases").each(function() {
            var b = {};
            $.each(this.attributes, function(c, e) {
                var d = e.name,
                    f = e.value;
                n.information[d] || (n.information[d] = f);
                b[d] = f;
            });
            n.canvases.push(b);
        });
        $(d).find("designs").each(function() {
            $.each(this.attributes, function(b, c) {
                n.information[c.name] = c.value;
            });
        });
        $(d).find("product_styles").each(function() {
            $.each(this.attributes, function(b, c) {
                n.product[c.name] = c.value;
            });
        });
        $(d).find("canvas_text").each(function() {
            var b = {
                type: "text"
            };
            $.each(this.attributes, function(c, e) {
                b[e.name] = e.value;
            });
            var c = {};
            c.font_id = b.font_id;
            $(this).find("fonts").each(function() {
                $.each(this.attributes, function(b, e) {
                    c[e.name] = e.value;
                });
                $(this).find("font_styles").each(function() {
                    $.each(this.attributes, function(b, e) {
                        c[e.name] = e.value;
                    });
                });
                $(this).find("canvas_text_embroidery").each(function() {
                    $.each(this.attributes, function(c, e) {
                        b[e.name] = e.value;
                        b.type = "embroideryText";
                    });
                });
            });
            if (state.fontReplacements) {
                var e = findMatch(state.fontReplacements, function(b) {
                    return b.old_font_id == c.font_id;
                });
                e && (c.font = e.new_font_name, c.font_style = e.new_font_style_name, c.font_id = b.font_id = e.new_font_id, c.font_style_id = b.font_style_id = e.new_font_style_id, c.jspath = e.jspath, c.fontttfpath = c.jspath.replace(".ttf.js", ".ttf"), c.altfontttfpath = c.jspath.replace(".ttf.js", ".ttf"));
            }
            "embroideryText" != b.type,
                c.font_family = c.fontFamily = e,
                c.gifpath = service.adjustUrl(c.gifpath);

            b.fontObject = c;
            b.fontObject.font_id = b.font_id;
            b.x *= 0.5;
            b.y *= 0.5;
            b.width *= 0.5;
            b.height *= 0.5;
            b.fill_color = getColorString(b.fill_color);
            b.stroke_color = getColorString(b.stroke_color);
            b.stroke_width = b.stroke_width;
            0 != parseFloat(b.stroke_width) ? (b.stroke_width = parseFloat(b.stroke_width) / 2, b.original_stroke = b.stroke_width) : b.stroke_width = 0;
            b.fontObject.font_id = b.font_id;
            n.elements.push(b);
            searchInArray(t.elements, b.fontObject.font_id, "font_id") || "embroideryText" == b.type || (u++, t.elements.push(b.fontObject), t.toLoad.push(b.fontObject));
        });
        $(d).find("canvas_art").each(function() {
            var b = {}, c = [];
            $.each(this.attributes, function(e, d) {
                var f = d.name;
                b[f] = d.value;
                "color" == f.substring(0, 5) && 8 > f.length && (b[f] = getColorString(b[f], !0), c.push({
                    name: f,
                    value: b[f]
                }));
            });
            c.sort(function(b, c) {
                return parseInt(b.name.replace("color", "")) - parseInt(c.name.replace("color", ""));
            });
            for (var d = 0; d < c.length; d++) {}
            $(this).find("art").each(function() {
                $.each(this.attributes, function(c, e) {
                    b[e.name] = e.value;
                });
            });
            b.x *= 0.5;
            b.y *= 0.5;
            b.width *= 0.5;
            b.height *= 0.5;
            b.type = "vector" == b.art_type ? "vector" : "emb" == b.art_type ? "embroideryArt" : "image";
            "vector" == b.type ? (b.colors = c, b.stroke_color && b.stroke_width && (b.stroke_color = getColorString(b.stroke_color), b.stroke_width = b.stroke_width, 0 != parseFloat(b.stroke_width) ? (b.stroke_width = parseFloat(b.stroke_width) / 2, b.original_stroke = b.stroke_width) : b.stroke_width = 0), u++, e.elements.push(b), e.toLoad.push(b)) : "image" == b.type ? (b.colors = c, u++, p.elements.push(b), p.toLoad.push(b)) : "embroideryArt" == b.type && (b.colors = c);
            n.elements.push(b);
        });
        n.designId = n.information.design_id;
        t.toLoad.length && k();
        e.toLoad.length && g();
        p.toLoad.length && c();
        0 === u && b();
    }

    function c() {
        var c = 0,
            e = function() {
                var d = p.toLoad[c],
                    f = new Image,
                    g = d.original_art_path ? d.original_art_path : d.art_path;
                f.onload = function(f) {
                    d.image = this;
                    c++;
                    s++;
                    b();
                    c < p.toLoad.length && e();
                };
                f.src = fixImageUrl(g);
            };
        e();
    }

    function g() {
        var c = 0,
            d = function() {
                var f = e.toLoad[c];
                $.ajax({
                    type: "GET",
                    url: fixImageUrl(f.original_art_path),
                    dataType: "xml",
                    success: function(g) {
                        f.svg = g;
                        s++;
                        b();
                        c++;
                        c < e.toLoad.length && d();
                    },
                    error: this.defaultError
                });
            };
        d();
    }

    function k() {
        var c = 0,
            e = function() {
                var dd = t.toLoad[c];
                null == t.categories[dd.font_style_id] && (t.categories[dd.font_style_id] = []);
                var f = t.categories[dd.font_style_id];
                findMatch(f, function(b) {
                    return b.font_id == dd.font_id;
                }) || f.push(d);
                if (!dd.font_id) {
                    dd.font_id = 1
                }
                var text = '';
                for (var i = 0; i < n.elements.length; i++) {
                    if (n.elements[i].type != 'text') break;
                    text = text + n.elements[i].value;
                };

                service.loadFont(dd, function() {
                    c++;
                    s++;
                    b();
                    c < t.toLoad.length && e();
                }, text);

                console.info('载入字体');
            };
        e();
    }

    function h(b) {
        var c = {
            regions: [],
            sides: []
        }, e = {};
        $(b).find("products").each(function() {
            e = {};
            $.each(this.attributes, function(b, c) {
                e[c.name] = c.value;
            });
        });
        c.description = e;
        var d = $(b).find("product_styles");
        d.each(function() {
            c.information = {};
            $.each(this.attributes, function(b, e) {
                c.information[e.name] = e.value;
            });
        });
        for (var f = 0; f < d.length; f++) {
            var g = d[f];
            g.attributes.product_style_id.value === state.selectedProductStyleID && (c.information.html_color = g.attributes.html_color.value);
        }
        $(b).find("print_mask").each(function() {
            this.attributes.length && (c.mask = {}, $.each(this.attributes, function(b, e) {
                c.mask[e.name] = e.value;
            }), c.mask.art_path = fixImageUrl(c.mask.art_path));
        });
        d.find("product_regions").each(function() {
            if (this.parentNode.getAttribute("product_style_id") == w) {
                var b = {};
                $.each(this.attributes, function(c, e) {
                    b[e.name] = e.value;
                });
                b.originalRegion = b.region.split(",");
                b.region = b.region.split(",");
                for (var e = 0; e < b.region.length; e++) {
                    b.region[e] = q / 500 * b.region[e] * 0.5;
                }
                e = this.getElementsByTagName("print_mask");
                e = null != e[0].getAttribute("art_path") ? {
                    type: "image",
                    value: fixImageUrl(e[0].getAttribute("art_path"))
                } : {
                    type: "shape",
                    value: b.region
                };
                b.mask = e;
                isSideDefined(b.side, c.sides) || (e = {
                    zoom: 1,
                    resize: 1
                }, e.name = b.side, e.sideId = c.sides.length + 1, e.defaultRegion = {}, c.sides.push(e));
                c.regions.push(b);
            }
        });
        b = [];
        for (f = 0; f < c.regions.length; f++) {
            "undefined" == typeof c.information["image_width_" + c.regions[f].side] && b.push({
                region: c.regions[f].name,
                side: c.regions[f].side,
                image: c.regions[f].imgurl,
                index: f
            });
        }
        eventManager.trigger("productLoaded", c);
    }
    var f = ezdVars.ApiDomain || "open.dev.jzw.la",
        m = ezdVars.AppToken || 306,
        q = 500,
        n, r = [],
        t = {
            categories: {},
            elements: []
        }, p = {
            elements: []
        }, e = {
            elements: []
        }, u = 0,
        s = 0,
        w;
    eventManager.on("needProduct", function(b) {
        w = b.productStyleId;
        b.data ? setTimeout(function() {
            h(b.data);
        }, 50) : b.productId ? $.ajax({
            type: "GET",
            url: "//" + f + "/Product/Get/?appKey=" + m + "&productId=" + b.productId + "&productStyleId=" + b.productStyleId,
            dataType: "xml",
            success: h
        }) : setTimeout(function() {
            h(service.createProductXml());
        }, 50);
    });
    eventManager.on("needSvg", function(b) {
        $.ajax({
            type: "GET",
            url: fixImageUrl(b.original_art_path),
            dataType: "xml",
            success: function(c) {
                b.svg = c;
                eventManager.trigger("elementLoaded", b);
            },
            error: this.defaultError
        });
    });
    eventManager.on("needDesign", function(b) {
        // debugger;
        $.ajax({
            type: "GET",
            url: "//" + f + "/Design/Get/?appKey=" + m + "&designId=" + b + '&userToken=' + ezdVars.UserToken,
            dataType: "xml",
            success: d
        });
    });
}
Namespace("ui.controllers");
ui.controllers.ColorPickerController = function(b) {};
ui.controllers.AddNoteController = function(b) {
    b.note = state.designer.design.information.notes;
    b.saveNote = function() {
        b.showingInlineModal = 0;
        state.designer.design.information.notes = b.note;
    };
};
ui.controllers.LandingPageController = function(b, d) {
    b.showDesignsModal = function() {
        showModalDrawer("designIdeas", b, d);
        b.close();
    };
    b.showMyArtModal = function() {
        showModalDrawer("myArt", b, d);
        b.close();
    };
    eventManager.on("punchIn", function(c) {
        b.close();
    });
};
ui.controllers.LogInOrCreateAccountController = function(b, d, c) {
    b.login = {};
    b.create = {};
    b.showForgotPasswordForm = !1;
    b.login.email = ezdVars.UserEmail;
    b.logInExisting = function() {
        ezdVars.UserEmail || (ezdVars.UserEmail = b.login.email);
        service.logIn(b.login.email, b.login.password, state.currentUserToken, function(c) {
            b.$emit("loggedIn", c);
            b.loggedIn && b.loggedIn(c);
        }, function(c) {
            b.login.error = c;
            b.$apply();
        });
    };
    b.createAccount = function() {
        service.createAccount(b.create.firstName, b.create.lastName, b.create.email, b.create.password, b.create.passwordConfirm, state.currentUserToken, function(c) {
            ezdVars.UserName = b.create.firstName + " " + b.create.lastName;
            ezdVars.UserEmail = b.create.email;
            b.$emit("loggedIn", c);
            b.loggedIn && b.loggedIn(c);
        }, function(c) {
            b.create.error = c;
            b.$apply();
        });
    };
    b.submitForgotPassword = function() {
        b.forgotPasswordSuccess = !1;
        b.forgotPasswordError = !1;
        service.resetPassword(b.login.email, function() {
            b.forgotPasswordSuccess = !0;
            b.$apply();
        }, function(c) {
            b.forgotPasswordError = !0;
            b.$apply();
        });
    };
};
ui.controllers.VideoController = function(b) {};

ui.controllers.UploaderLandingController = function(b, d, c) {
    b.showUploadImageScreen = !1;
    eventManager.on("punchIn", function(c) {
        c && "uploadArt" == c.screenName && (b.showUploadImageScreen = !0, b.$$phase || b.$apply());
    });
    state.imageUploadData = {};
    b.fileTypes = "";
    ezdVars.DisableUploadRasterArt || (b.fileTypes += ".png,.bmp,.jpg,.jpeg,.tif,.gif,");
    ezdVars.DisableUploadVectorArt || (b.fileTypes += "");
    ezdVars.Embroidery && !ezdVars.DisableUploadEmbroideryArt && (b.fileTypes += ".be,.pes,.pec,.phc,.art,.exp,.exp+,.emd,.hus,.shv,.sew,.jef,.jef+,.jan,.pcs,.pcm,.pcsmac,.vip,.vp3,.xxx,.csd,.dst,.tap,.gnc,.cnd,.emb,");
    b.fileTypes = b.fileTypes.substring(0, b.fileTypes.length - 1);
    b.allowedFileTypes = b.fileTypes.split(",");
    b.uploadImageTermsData = {
        terms: c.trustAsHtml(state.initData.uploadImageTerms),
        accepted: !state.initData.uploadImageTerms,
        showing: !1
    };
    b.showUploadImageTerms = function() {
        b.uploadImageTermsData.showing = !0;
    };
    b.acceptedUploadImageTermsChanged = function() {
        b.uploadImageTermsData.accepted && (b.uploadImageTermsData.showing = !1);
    };
    b.fileDataReady = function(c, k) {
        state.imageUploadData.isVector = !1;
        if (15E6 < k.size) {
            alert("您上传的图片太大了！\n目前设计工具支持上传不超过15M的图片。\n或咨询客服：400-920-2085 协助您解决。");
        } else {
            var h = k.name.substring(k.name.lastIndexOf(".")).toLowerCase();
            if (15E6 < c.length || 0 <= ",.pdf,.eps,.svg,.be,.pes,.pec,.phc,.art,.exp,.exp+,.emd,.hus,.shv,.sew,.jef,.jef+,.jan,.pcs,.pcm,.pcsmac,.vip,.vp3,.xxx,.csd,.dst,.tap,.gnc,.cnd,.emb,.tif,.tiff,".indexOf("," + h + ",")) {
                if (0 < k.name.toLowerCase().indexOf(".tif")) {
                    if (ezdVars.DisableUploadRasterArt) {
                        alert("很抱歉，我们目前不支持TIF格式的图片文件。");
                        return;
                    }
                } else {
                    if (ezdVars.DisableUploadVectorArt) {
                        alert("不支持该文件类型。");
                        return;
                    }
                }
                service.saveUserArt(state.currentUserToken, state.activeUserToken, new FormData(document.getElementById("uploadForm")), function(c) {
                    service.getArtByID(c.ArtID, function(c) {
                        state.imageUploadData.imageUrl = service.adjustUrl(c.art_path);
                        state.imageUploadData.name = c.art_name;
                        state.imageUploadData.isVector = "vector" == c.art_type;
                        state.imageUploadData.isEmbroidery = "emb" == c.art_type;
                        state.imageUploadData.artData = c;
                        state.imageUploadData.art_width = parseInt(c.width, 10);
                        state.imageUploadData.art_height = parseInt(c.height, 10);
                        state.imageUploadData.isVector ? showModal("upImageLoading", b, d) :
                            state.imageUploadData.isEmbroidery ?
                                showModal("upImageLoading", b, d) :
                                (state.imageUploadData.imageUrl = c.art_path, state.imageUploadData.name = c.name, showModal("upImageLoading", b, d));
                        b.$apply();
                    });
                });
            } else {
                if (ezdVars.DisableUploadRasterArt) {
                    alert("不支持的文件类型。");
                } else {
                    delete state.imageUploadData.artData;
                    var f = new Image;
                    f.onload = function() {
                        var w  = parseInt($(f).context.width, 10),h= parseInt($(f).context.height, 10);
                        if(w*h<(1024*1024)){
                            alert("您上传的作品至少需要达到100万像素(当前像素："+w*h+")。\n如有问题请咨询客服：400-920-2085 协助您解决。");
                            return;
                        }
                        if(w*h > 36000000){
                            alert("您上传的图片太大了！\n过大的尺寸会导致整个设计体验急剧变差。\n请适当缩小图片的宽高（3600万像数以内）或咨询客服：400-920-2085 协助您解决。");
                            return;
                        }
                        state.imageUploadData.art_width = w;
                        state.imageUploadData.art_height = h;
                        state.imageUploadData.imageUrl = c;
                        state.imageUploadData.name = k.name;
                        showModal("upImageLoading", b, d);
                    };
                    f.src = c;
                    f.name = k.name

                }
            }
        }
    };
    b.mobileUpload = function(c) {
        var k = c ? showModalDrawer : k;
        k("mobileUploadFromDevice", b, d);
        var h = eventManager.on("imageUploaded", function(c) {
            state.imageUploadData.imageUrl = service.adjustUrl(c.url);
            state.imageUploadData.artData = c;
            state.imageUploadData.art_width = parseInt(c.width, 10);
            state.imageUploadData.art_height = parseInt(c.height, 10);
            k("mobileUploadConfirm", b, d);
            h();
        });
    };
    b.disableUploadRasterArt = ezdVars.DisableUploadRasterArt;
};
ui.controllers.MobileUploadConfirmController = function(b, d) {
    var c = function() {
        b.originalSource = state.imageUploadData.artData.url;
        b.nextStep = function() {
            state.uploadedImage = state.imageUploadData.artData;
            state.designer.loadLocalImage(b.originalSource, null, state.imageUploadData.artData);
            eventManager.trigger("layersChanged");
            b.close();
        };
    };
    c();
    b.onShow = c;
};
ui.controllers.EmbroideryMapColorsController = function(b, d) {
    b.storeColors = state.storeInkColors;
    var c = function(b) {
        var c = "http://" + ezdVars.ApiDomain + "/" + ezdVars.AppURI + "/JITImage/EmbroideryClipArt/?ArtID=" + b.art_id;
        if (b.art_colors && b.art_colors.length) {
            for (var d = 0; d < b.art_colors.length; d++) {
                c += "&colors=" + getColorString(b.art_colors[d], !0);
            }
        }
        return c;
    };
    b.addImageToDesigner = function() {
        state.dsUtils.addClipArt(state.imageUploadData.artData, function() {});
        b.close();
    };
    b.embroiderySource = c(state.imageUploadData.artData);
    b.showColorOptions = function(c, d, h) {
        b.showingInlineModal = !0;
        b.color = c;
        b.parentIndex = d;
        c = $(event.target).position();
        b.colorOptionsX = c.left;
        b.colorOptionsY = c.top + 30;
        $("#uploaderColorOptions").show();
    };
    b.mapColor = function(d, k, h) {
        k || (k = {
            html_color: "#000000"
        });
        "none" == k && (k = {
            html_color: "none"
        });
        state.imageUploadData.artData.art_colors[h].color = k.html_color;
        d.matchedColor = k.html_color;
        b.showingInlineModal = !1;
        b.embroiderySource = c(state.imageUploadData.artData);
    };
    (function() {
        for (var c = [], d = state.imageUploadData.artData.art_colors, h = 0; h < d.length; h++) {
            var f = getColorString(d[h], !0),
                m = b.currentColors ? findMatch(b.currentColors, function(b) {
                    return b.originalColor == f;
                }) : null;
            m && (m = m.matchedColor);
            c[h] = {
                originalColor: getColorString(f),
                matchedColor: m ? getColorString(m) : null
            };
        }
        b.currentColors = c;
        b.$$phase || b.$apply();
    })();
};
ui.controllers.upImageLoadingController = function(b,d){
    var c = parseInt(ezdVars.MaxScreenPrintColors, 10);
    b.colorSettings = {};
    b.colorSettings.numColors = state.imageUploadData.numColors = c;
    b.showMatchColors = state.imageUploadData.isVector;
    b.vectorOnly = ezdVars.VectorOnly;
    b.loadingImage = true;
    b.maxcolors = false;
    var g = {};
    ezdVars.VectorOnly && (state.imageUploadData.numColors = c);
    b.numColorChoicesLeft = Array(c);
    //Todo yfzhu changer
    //    4 < c && (b.numColorChoicesLeft = Array(Math.round(c / 2 + 1)), b.numColorChoicesRight = Array(c - b.numColorChoicesLeft.length));
    4 < c && (b.numColorChoicesLeft = Array(c), b.numColorChoicesRight = Array(c));
    b.storeColors = state.storeInkColors;

    //
    state.imageUploadData.reduceOrder = "dependentSlow";
    state.imageUploadData.minHueCols = "256";
    b.speedSettings = state.imageUploadData;
    b.disableUploadRasterArt = ezdVars.DisableUploadRasterArt || ezdVars.VectorOnly;
    state.imageUploadData.imageType = "multiColor";




    b.changeNumColors = function() {
        state.uploader.canClick = !0;
        var c = b.colorSettings.numColors;
        "blackAndWhite" == c ? (f(state.uploader.bW), state.uploader.fullColor = !0, b.loadingImage = !1) : "fullColor" == c ? (f(state.uploader.original), state.uploader.fullColor = !0, b.loadingImage = !1) : (b.loadingImage = !0, setTimeout(function() {
            f(state.uploader.getPicture(c));
            state.uploader.fullColor = !1;
            b.loadingImage = !1;
            b.$$phase || b.$apply();
        }, 25));
        state.imageUploadData.numColors = c;
        setTimeout(h, 75);
    };
    b.removeBackground = function(c) {
        b.loadingImage = !0;
        setTimeout(k, 75, c);
    };
    var k = function(c) {
        b.backgroundRemoved = !0;
        b.preservedFigure = c;
        var d = "noBackground" + c.toString();
        if (g[d]) {
            state.uploader = g[d];
        } else {
            var f = new Image;
            f.src = $("#sourceImage")[0].src;
            !1 === c && (f = g.standard.original, state.uploader.removeBackground(f, c));
            g[d] = state.uploader = new com.aq.bitmap.AQBitmapPalettes(f, function() {
                b.changeNumColors();
            }, c);
        }
        b.changeNumColors();
        b.$$phase || b.$apply();
    };
    b.restoreBackground = function() {
        state.uploader = g.standard;
        b.changeNumColors();
        b.backgroundRemoved = !1;
    };
    var h = function() {
        var c = [];
        if (state.imageUploadData.isVector) {
            for (var d = state.imageUploadData.svgElement.colors, f = 0; f < d.length; f++) {
                var g = getColorString(d[f], !0),
                    h = b.currentColors ? findMatch(b.currentColors, function(b) {
                        return b.originalColor == g;
                    }) : null;
                h && (h = h.matchedColor);
                c[f] = {
                    originalColor: getColorString(g),
                    matchedColor: h ? getColorString(h) : null
                };
            }
        } else {
            var ff = new Image;
            ff.src =state.imageUploadData.imageUrl;

            state.uploader = new com.aq.bitmap.AQBitmapPalettes(ff);
            //如果选得是 黑白或者全彩  则不返回颜色， TODO 这里需要做修改
            if ("blackAndWhite" == state.imageUploadData.numColors || "fullColor" == state.imageUploadData.numColors) {
                d = state.uploader.getQuantizedImage().colors;
            }else{
                d = state.uploader.getQuantizedImage(state.imageUploadData.numColors).colors;
            }
            for (f = 0; f < d.length; f++) {
                g = d[f].substring(0, 6);
                if (h = b.currentColors ? findMatch(b.currentColors, function(b) {
                        return b.originalColor == g;
                    }) : null) {
                    h = h.matchedColor;
                }
                c[f] = {
                    originalColor: getColorString(g),
                    matchedColor: h ? getColorString(h) : null
                };
            }
        }
        b.currentColors = c;
    };
    setTimeout(function() {
        b.isRaster = !state.imageUploadData.isVector;
        if (state.imageUploadData.isVector) {
            getImageData(state.imageUploadData.artData.thumb_jit, !1, function(c) {
                var d = ScaleImage(c.width, c.height, 300, 300, !0);
                state.imageUploadData.isVector && $("#targetImageContainer").css("cursor", "default");
                c = {
                    object: {}
                };
                $.ajax({
                    type: "GET",
                    url: state.imageUploadData.imageUrl,
                    dataType: "xml",
                    success: function(f) {
                        $("#targetImageContainer").append("<svg id='targetImageContainerSVG' style='height:100%;'></svg>");
                        $("#targetImageContainer").css("height", "100%");
                        $("#targetImageContainer").css("width", "100%");
                        var g = document.getElementById("targetImageContainerSVG");
                        $("#targetImageContainerSVG").show();
                        c.width = d.width;
                        c.height = d.height;
                        c.x = 150;
                        c.y = 150;
                        c.id = 1E5;
                        state.imageUploadData.svgElement = new ui.svg.SvgElement(f, g, c);
                        d = ScaleImage(state.imageUploadData.svgElement.originalBBox.width, state.imageUploadData.svgElement.originalBBox.height, 300, 300, !0);
                        state.imageUploadData.svgElement.width = d.width;
                        state.imageUploadData.svgElement.height = d.height;
                        h();
                        b.updateNumColors();
                        b.$$phase || b.$apply();
                    }
                });
            });
        } else {
            var c = $("#sourceImage")[0];
            b.loadingImage = !0;
            $(c).load(function() {
                b.$apply();
                setTimeout(function() {
                    state.uploader = new com.aq.bitmap.AQBitmapPalettes(c);
                    g.standard = state.uploader;
                    ezdVars.VectorOnly ? (f(state.uploader.getPicture(ezdVars.MaxScreenPrintColors)), state.uploader.fullColor = !1, b.colorSettings.numColors = ezdVars.MaxScreenPrintColors) : (f(state.uploader.original), state.uploader.fullColor = !0);
                    state.uploader.canClick = !1;
                    b.loadingImage = !1;
                    b.updateNumColors();
                    b.$apply();
                }, 100);
            });
            b.originalSource = state.imageUploadData.imageUrl;
            b.$apply();
        }
    }, 10);
    var f = function(b) {
        var c = $("#targetImageContainer");
        c.empty();
        c.append(b);
        $(b).css("margin-top", (330 - b.clientHeight) / 2 + "px");
    };
    b.showColorMatchingScreen = function() {
        "fullColor" != b.colorSettings.numColors && "blackAndWhite" != b.colorSettings.numColors || b.addImageToDesigner();
//        if("fullColor" != b.colorSettings.numColors){
//            if("blackAndWhite" == b.colorSettings.numColors){
//                b.addImageToDesigner();
//            }
//        }
        b.showMatchColors = !0;
        h();
        b.updateNumColors();
    };
    b.deleteColor = function(c, d) {
        b.mapColor(c, "none", d);
        b.updateNumColors();
    };
    b.showColorOptions = function(c, d, f) {
        b.showingInlineModal = !0;
        b.color = c;
        b.parentIndex = d;
        c = $(event.target).position();
        b.colorOptionsX = c.left;
        b.colorOptionsY = c.top + 30;
        $("#uploaderColorOptions").show();
    };
    b.mapColor = function(c, d, f) {
        d || (d = {
            html_color: "#000000"
        });
        "none" == d && (d = {
            html_color: "none"
        });
        if (state.imageUploadData.isVector) {
            for (var g = [], h = 0; h < state.imageUploadData.svgElement.colors.length; h++) {
                g.push(state.imageUploadData.svgElement.colors[h]);
            }
            g[f] = d.html_color;
            state.imageUploadData.svgElement.colors = g;
            state.imageUploadData.artData.art_colors[f].color = d.html_color;
        } else {
            f = c.originalColor, 8 > f.length && (f += "ff"), g = getColorString(d.html_color), 8 > g.length && (g += "ff"), state.uploader.replaceColor($("#targetImageContainer").children()[0], f.substring(1), g.substring(1), state.uploader.getPicture(b.colorSettings.numColors));
        }
        c.matchedColor = d.html_color;
        b.updateNumColors();
        b.showingInlineModal = !1;
    };
    b.updateNumColors = function() {
        b.maxColors = c;
        for (var d = b.currentColors || [], f = 0, g = [], h = 0; h < d.length; h++) {
            var k = d[h].matchedColor || d[h].originalColor;
            findMatch(g, function(b) {
                return (b.matchedColor || b.originalColor) == k;
            }) || "#00000000" == k.toLowerCase() || (g.push(d[h]), "none" != k && f++);
        }
        b.numImageColors = f;
    };
    b.addImageToDesigner = function() {
        h();

//        if(b.currentColors.length > 10){
//            b.maxcolors = true;
//            b.loadingImage = false;
//            b.$$phase || b.$apply();
//
//        }else{

            if (state.imageUploadData.isVector) {
                var c = state.imageUploadData.artData;
                c.width = state.imageUploadData.svgElement.width;
                c.height = state.imageUploadData.svgElement.height;
                for (var d = eventManager.on("rendered", function() {
                    state.designer.getElementById(k.id);
                    b.$$phase || b.$apply();
                    d && d();
                }), f = [], g = 0; g < b.currentColors.length; g++) {
                    var hh = b.currentColors[g],
                        hh = getColorString(h.matchedColor || h.originalColor);
                    f.push(getColorString(hh, !0));
                }
                c.art_colors = f;
                c.forceColors = !0;
                var k = state.designer.addClipArt(c),
                    k = {
                        table_name: "canvas_art",
                        location: "Front",
                        canvas_art_id: 0,
                        canvas_art_rendered: c.thumb_jit,
                        colors: f,
                        art: c,
                        id: k.id,
                        z: 1E6
                    };
            } else {
                f = [];
                if (b.currentColors) {
                    for (g = 0; g < b.currentColors.length; g++) {
                        f[g] = {
                            value: getColorString(b.currentColors[g].matchedColor || b.currentColors[g].originalColor)
                        };
                    }
                }
                f = {
                    width: state.imageUploadData.art_width,
                    height: state.imageUploadData.art_height,
                    artID: 0,
                    artName: state.imageUploadData.name,
                    colors: f,
                    art_width: state.imageUploadData.art_width,
                    art_height: state.imageUploadData.art_height
                };
                k = state.designer.loadLocalImage(state.imageUploadData.imageUrl, null, f);
            }
            eventManager.trigger("layersChanged", k);


            b.close();
//        }

    };
    window.setTimeout(function(){
        b.addImageToDesigner();
    },300);

}
ui.controllers.ChooseNumberOfColorsController = function(b, d) {
    var c = parseInt(ezdVars.MaxScreenPrintColors, 10);
    b.colorSettings = {};
    b.colorSettings.numColors = state.imageUploadData.numColors = c;
    b.showMatchColors = state.imageUploadData.isVector;
    b.vectorOnly = ezdVars.VectorOnly;
    var g = {};
    ezdVars.VectorOnly && (state.imageUploadData.numColors = c);
    b.numColorChoicesLeft = Array(c);
    //Todo yfzhu changer
    //    4 < c && (b.numColorChoicesLeft = Array(Math.round(c / 2 + 1)), b.numColorChoicesRight = Array(c - b.numColorChoicesLeft.length));
    4 < c && (b.numColorChoicesLeft = Array(c), b.numColorChoicesRight = Array(c));
    b.storeColors = state.storeInkColors;
    b.changeNumColors = function() {
        state.uploader.canClick = !0;
        var c = b.colorSettings.numColors;
        "blackAndWhite" == c ? (f(state.uploader.bW), state.uploader.fullColor = !0, b.loadingImage = !1) : "fullColor" == c ? (f(state.uploader.original), state.uploader.fullColor = !0, b.loadingImage = !1) : (b.loadingImage = !0, setTimeout(function() {
            f(state.uploader.getPicture(c));
            state.uploader.fullColor = !1;
            b.loadingImage = !1;
            b.$$phase || b.$apply();
        }, 25));
        state.imageUploadData.numColors = c;
        setTimeout(h, 75);
    };
    b.removeBackground = function(c) {
        b.loadingImage = !0;
        setTimeout(k, 75, c);
    };
    var k = function(c) {
        b.backgroundRemoved = !0;
        b.preservedFigure = c;
        var d = "noBackground" + c.toString();
        if (g[d]) {
            state.uploader = g[d];
        } else {
            var f = new Image;
            f.src = $("#sourceImage")[0].src;
            !1 === c && (f = g.standard.original, state.uploader.removeBackground(f, c));
            g[d] = state.uploader = new com.aq.bitmap.AQBitmapPalettes(f, function() {
                b.changeNumColors();
            }, c);
        }
        b.changeNumColors();
        b.$$phase || b.$apply();
    };
    b.restoreBackground = function() {
        state.uploader = g.standard;
        b.changeNumColors();
        b.backgroundRemoved = !1;
    };
    var h = function() {
        var c = [];
        if (state.imageUploadData.isVector) {
            for (var d = state.imageUploadData.svgElement.colors, f = 0; f < d.length; f++) {
                var g = getColorString(d[f], !0),
                    h = b.currentColors ? findMatch(b.currentColors, function(b) {
                        return b.originalColor == g;
                    }) : null;
                h && (h = h.matchedColor);
                c[f] = {
                    originalColor: getColorString(g),
                    matchedColor: h ? getColorString(h) : null
                };
            }
        } else {
            //如果选得是 黑白或者全彩  则不返回颜色， TODO 这里需要做修改
            if ("blackAndWhite" == state.imageUploadData.numColors || "fullColor" == state.imageUploadData.numColors) {
                d = state.uploader.getQuantizedImage().colors;
            }else{
                d = state.uploader.getQuantizedImage(state.imageUploadData.numColors).colors;
            }
            for (f = 0; f < d.length; f++) {
                g = d[f].substring(0, 6);
                if (h = b.currentColors ? findMatch(b.currentColors, function(b) {
                    return b.originalColor == g;
                }) : null) {
                    h = h.matchedColor;
                }
                c[f] = {
                    originalColor: getColorString(g),
                    matchedColor: h ? getColorString(h) : null
                };
            }
        }
        b.currentColors = c;
        b.$$phase || b.$apply();
    };
    setTimeout(function() {
        b.isRaster = !state.imageUploadData.isVector;
        if (state.imageUploadData.isVector) {
            getImageData(state.imageUploadData.artData.thumb_jit, !1, function(c) {
                var d = ScaleImage(c.width, c.height, 300, 300, !0);
                state.imageUploadData.isVector && $("#targetImageContainer").css("cursor", "default");
                c = {
                    object: {}
                };
                $.ajax({
                    type: "GET",
                    url: state.imageUploadData.imageUrl,
                    dataType: "xml",
                    success: function(f) {
                        $("#targetImageContainer").append("<svg id='targetImageContainerSVG' style='height:100%;'></svg>");
                        $("#targetImageContainer").css("height", "100%");
                        $("#targetImageContainer").css("width", "100%");
                        var g = document.getElementById("targetImageContainerSVG");
                        $("#targetImageContainerSVG").show();
                        c.width = d.width;
                        c.height = d.height;
                        c.x = 150;
                        c.y = 150;
                        c.id = 1E5;
                        state.imageUploadData.svgElement = new ui.svg.SvgElement(f, g, c);
                        d = ScaleImage(state.imageUploadData.svgElement.originalBBox.width, state.imageUploadData.svgElement.originalBBox.height, 300, 300, !0);
                        state.imageUploadData.svgElement.width = d.width;
                        state.imageUploadData.svgElement.height = d.height;
                        h();
                        b.updateNumColors();
                        b.$$phase || b.$apply();
                    }
                });
            });
        } else {
            var c = $("#sourceImage")[0];
            b.loadingImage = !0;
            $(c).load(function() {
                b.$apply();
                setTimeout(function() {
                    state.uploader = new com.aq.bitmap.AQBitmapPalettes(c);
                    g.standard = state.uploader;
                    ezdVars.VectorOnly ? (f(state.uploader.getPicture(ezdVars.MaxScreenPrintColors)), state.uploader.fullColor = !1, b.colorSettings.numColors = ezdVars.MaxScreenPrintColors) : (f(state.uploader.original), state.uploader.fullColor = !0);
                    state.uploader.canClick = !1;
                    b.loadingImage = !1;
                    b.updateNumColors();
                    b.$apply();
                }, 100);
            });
            b.originalSource = state.imageUploadData.imageUrl;
            b.$apply();
        }
    }, 10);
    var f = function(b) {
        var c = $("#targetImageContainer");
        c.empty();
        c.append(b);
        $(b).css("margin-top", (330 - b.clientHeight) / 2 + "px");
    };
    b.showColorMatchingScreen = function() {
        "fullColor" != b.colorSettings.numColors && "blackAndWhite" != b.colorSettings.numColors || b.addImageToDesigner();
//        if("fullColor" != b.colorSettings.numColors){
//            if("blackAndWhite" == b.colorSettings.numColors){
//                b.addImageToDesigner();
//            }
//        }
        b.showMatchColors = !0;
        h();
        b.updateNumColors();
    };
    b.deleteColor = function(c, d) {
        b.mapColor(c, "none", d);
        b.updateNumColors();
    };
    b.showColorOptions = function(c, d, f) {
        b.showingInlineModal = !0;
        b.color = c;
        b.parentIndex = d;
        c = $(event.target).position();
        b.colorOptionsX = c.left;
        b.colorOptionsY = c.top + 30;
        $("#uploaderColorOptions").show();
    };
    b.mapColor = function(c, d, f) {
        d || (d = {
            html_color: "#000000"
        });
        "none" == d && (d = {
            html_color: "none"
        });
        if (state.imageUploadData.isVector) {
            for (var g = [], h = 0; h < state.imageUploadData.svgElement.colors.length; h++) {
                g.push(state.imageUploadData.svgElement.colors[h]);
            }
            g[f] = d.html_color;
            state.imageUploadData.svgElement.colors = g;
            state.imageUploadData.artData.art_colors[f].color = d.html_color;
        } else {
            f = c.originalColor, 8 > f.length && (f += "ff"), g = getColorString(d.html_color), 8 > g.length && (g += "ff"), state.uploader.replaceColor($("#targetImageContainer").children()[0], f.substring(1), g.substring(1), state.uploader.getPicture(b.colorSettings.numColors));
        }
        c.matchedColor = d.html_color;
        b.updateNumColors();
        b.showingInlineModal = !1;
    };
    b.updateNumColors = function() {
        b.maxColors = c;
        for (var d = b.currentColors || [], f = 0, g = [], h = 0; h < d.length; h++) {
            var k = d[h].matchedColor || d[h].originalColor;
            findMatch(g, function(b) {
                return (b.matchedColor || b.originalColor) == k;
            }) || "#00000000" == k.toLowerCase() || (g.push(d[h]), "none" != k && f++);
        }
        b.numImageColors = f;
    };
    b.addImageToDesigner = function() {
        if (state.imageUploadData.isVector) {
            var c = state.imageUploadData.artData;
            c.width = state.imageUploadData.svgElement.width;
            c.height = state.imageUploadData.svgElement.height;
            for (var d = eventManager.on("rendered", function() {
                state.designer.getElementById(k.id);
                b.$$phase || b.$apply();
                d && d();
            }), f = [], g = 0; g < b.currentColors.length; g++) {
                var h = b.currentColors[g],
                    h = getColorString(h.matchedColor || h.originalColor);
                f.push(getColorString(h, !0));
            }
            c.art_colors = f;
            c.forceColors = !0;
            var k = state.designer.addClipArt(c),
                k = {
                    table_name: "canvas_art",
                    location: "Front",
                    canvas_art_id: 0,
                    canvas_art_rendered: c.thumb_jit,
                    colors: f,
                    art: c,
                    id: k.id,
                    z: 1E6
                };
        } else {
            c = $("#targetImageContainer").children()[0];
            f = [];
            if (b.currentColors) {
                for (g = 0; g < b.currentColors.length; g++) {
                    f[g] = {
                        value: getColorString(b.currentColors[g].matchedColor || b.currentColors[g].originalColor)
                    };
                }
            }
            f = {
                width: c.width,
                height: c.height,
                artID: 0,
                artName: state.imageUploadData.name,
                colors: f,
                art_width: state.imageUploadData.art_width,
                art_height: state.imageUploadData.art_height
            };
            k = state.designer.loadLocalImage(c.toDataURL(), null, f);
        }
        eventManager.trigger("layersChanged", k);
        b.close();
    };
};
ui.controllers.SelectImageTypeController = function(b, d) {
    state.imageUploadData.reduceOrder = "dependentSlow";
    state.imageUploadData.minHueCols = "256";
    b.speedSettings = state.imageUploadData;
    b.disableUploadRasterArt = ezdVars.DisableUploadRasterArt || ezdVars.VectorOnly;
    b.selectLogo = function() {
        state.imageUploadData.imageType = "multiColor";
        showModal("chooseNumberOfColors", b, d);
    };
    b.selectPhoto = function() {
        state.imageUploadData.imageType = "fullColor";
        showModal("colorOrBW", b, d);
    };
};

ui.controllers.ColorOrBWController = function(b, d) {
    b.originalSource = state.imageUploadData.imageUrl;
    b.loadingImage = !0;
    setTimeout(function() {
        var c = new Image;
        c.onload = function() {
            b.originalSourceBW = desaturatePicture(c);
            b.loadingImage = !1;
            b.$apply();
        };
        c.src = state.imageUploadData.imageUrl;
    }, 25);
    b.addImageToDesigner = function(c) {
        var d = $("#isd-originalImage").width(),
            k = $("#isd-originalImage").height();

        c = state.designer.loadLocalImage(c ? b.originalSourceBW : state.imageUploadData.imageUrl, null, {
            width: d,
            height: k,
            artID: state.imageUploadData.artData ? state.imageUploadData.artData.art_id : 0,
            artName: null,
            art_width: state.imageUploadData.art_width,
            art_height: state.imageUploadData.art_height
        });





        eventManager.trigger("layersChanged", c);
        b.close();
    };
};
ui.controllers.MobileUploadController = function(b, d) {
    function c(c, d, g, h, k) {
        var t = {
            width: d,
            height: g,
            artID: h,
            artName: k,
            url: c
        };
        state.imageUploadData ? eventManager.trigger("imageUploaded", t) : (state.uploadedImage = t, state.designer.loadLocalImage(c, null, {
            width: d,
            height: g,
            artID: h,
            artName: k
        }), state.dsUtils.addRenderedHandlerOneTime(function() {
            eventManager.trigger("layersChanged");
        }), b.close ? b.close() : b.toSidePanelDefault && b.toSidePanelDefault());
    }
    b.userKey = "";
    var g;
    window.deleteUserImage = function() {};
    b.onShow = function() {
        b.foundEmail = !1;
    };
    b.startCheckUploads = function() {
        b.foundEmail = !1;
        b.checkingUploads = !0;
        h();
        g = setInterval(h, 5E3);
    };
    var k = function(c) {
        b.userKey = service.getMobileUploadUserKey(c);
        b.$$phase || b.$apply();
    };
    (function() {
        state.currentUserToken ? k(state.currentUserToken) : service.getOrCreateSession(function(b) {
            k(b.UserToken);
        });
    })();
    var h = function() {
        service.checkMobileUploads(state.currentUserToken, function(d) {
            b.foundEmail || (b.foundEmail = !0, c(service.adjustUrl(d.art_url), d.width, d.height, d.art_id, d.art_name));
            clearInterval(g);
            b.checkingUploads = !1;
            b.checkingUploads = !1;
            b.foundEmail = !0;
            b.showMobileUpload = b.$parent.showMobileUpload = !1;
            b.$$phase || b.$apply();
        }, function(b) {
            console.log(b.result);
        }, function(b) {
            console.log("发生未知错误.");
        });
    };
    b.stopCheckingUploads = function() {
        clearInterval(g);
        b.checkingUploads = !1;
        b.toSidePanelDefault && b.toSidePanelDefault();
    };
};

ui.controllers.EditArtEmbroideryController = function(b, d, c, g, k) {
//    rightSideLoaded(b);
    var h = searchInArray(state.selectedDesign.canvas_art, c.id, "id");
    if (h) {
        eventManager.trigger("elementSelected", h.id);
        b.canvasArt = h;
        var f = function() {
            if (h && h.colors) {
                b.colors = [];
                for (var c = 0; c < h.colors.length; c++) {
                    var d = getColorString(h.colors[c]);
                    b.colors.push(d);
                }
            }
        };
        f();
        b.showChangeColorModal = function(c, event) {
            var g = {
                currentColor: getColorString(h.colors[c]),
                onSelect: function(b) {
                    h.colors[c] = "string" == typeof h.colors[c] ? b : getColorString(b, !0);
                    h.colors = {
                        index: c,
                        color: b
                    };
                    f();
                },
                allowTransparent: !0
            };
            showColorModal(b, d, k, g, event);
        };
        b.replaceClipArt = function() {
            var c = state.designer.getElementById(h.id);
            showModalDrawer("clipArt", b, d, {
                embroideryOnly: !0,
                clipArtToReplace: h,
                clipArtAdded: function(d) {
                    b.canvasArt = d;
                    b.$$phase || b.$apply();
                    d = state.designer.getElementById(d.id);
                    var f = ScaleImageFloat(d.object.width, d.object.height, c.object.width, c.object.height, !0);
                    d.object.width = f.width;
                    d.object.height = f.height;
                    d.object.x = c.object.x;
                    d.object.y = c.object.y;
                    state.designer.deleteElements(c.object);
                    g.path("/editArtEmbroidery/" + d.id);
                }
            });
        };
        b.changeAlignment = function(b) {
            state.designer.changeElementAlignment(h.id, b);
        };
        b.nudge = function(b) {
            ezd.nudgeElement(h.id, b, 1);
        };
        eventManager.on("designColorsChanged", f);
        eventManager.on("elementDeleted", function(d) {
            searchInArray(state.selectedDesign.canvas_art, c.id, "id") || (g.path("/layers"), b.$$phase || b.$apply());
        });
    } else {
        g.path("/layers");
    }
};
ui.controllers.EditTextEmbroideryController = function(b, d, c, g, k) {
//    rightSideLoaded(b);
    b.shapes = [{
        label: "Normal",
        value: "Normal",
        presets: {
            bottom_curve_type: "Curve",
            top_curve_type: "Curve",
            top_curve: 0,
            bottom_curve: 0
        }
    }, {
        label: "Circle",
        value: "Circle",
        presets: {
            bottom_curve_type: "Curve",
            top_curve_type: "Curve",
            top_curve: 0,
            bottom_curve: 0
        }
    }, {
        label: "Vertical",
        value: "Vertical",
        presets: {
            bottom_curve_type: "Curve",
            top_curve_type: "Curve",
            top_curve: 0,
            bottom_curve: 0
        }
    }, {
        label: "Square Left",
        value: "Square Left",
        presets: {
            bottom_curve_type: "Curve",
            top_curve_type: "Curve",
            top_curve: 0,
            bottom_curve: 0
        }
    }, {
        label: "Square Right",
        value: "Square Right",
        presets: {
            bottom_curve_type: "Curve",
            top_curve_type: "Curve",
            top_curve: 0,
            bottom_curve: 0
        }
    }, {
        label: "Oval",
        value: "Oval",
        presets: {
            bottom_curve_type: "Curve",
            top_curve_type: "Curve",
            top_curve: 12,
            bottom_curve: 12
        }
    }, {
        label: "Bridge Top",
        value: "Bridge Top",
        presets: {
            bottom_curve_type: "Curve",
            top_curve_type: "Curve",
            top_curve: 15,
            bottom_curve: 10
        }
    }, {
        label: "Bridge Bottom",
        value: "Bridge Bottom",
        presets: {
            bottom_curve_type: "Curve",
            top_curve_type: "Curve",
            top_curve: 10,
            bottom_curve: 15
        }
    }, {
        label: "Bridge Up",
        value: "Bridge Up",
        presets: {
            bottom_curve_type: "Curve",
            top_curve_type: "Curve",
            top_curve: 14,
            bottom_curve: 6
        }
    }, {
        label: "Bridge Down",
        value: "Bridge Down",
        presets: {
            bottom_curve_type: "Curve",
            top_curve_type: "Curve",
            top_curve: 6,
            bottom_curve: 14
        }
    }, {
        label: "Diamond",
        value: "Diamond",
        presets: {
            bottom_curve_type: "Peak",
            top_curve_type: "Peak",
            top_curve: 15,
            bottom_curve: 15
        }
    }, {
        label: "Pennant Up",
        value: "Pennant Up",
        presets: {
            bottom_curve_type: "Peak",
            top_curve_type: "Peak",
            top_curve: 15,
            bottom_curve: 10
        }
    }, {
        label: "Pennant Down",
        value: "Pennant Down",
        presets: {
            bottom_curve_type: "Peak",
            top_curve_type: "Peak",
            top_curve: 10,
            bottom_curve: 15
        }
    }, {
        label: "Ascending",
        value: "Ascending",
        presets: {
            bottom_curve_type: "Grow",
            top_curve_type: "Shrink",
            top_curve: 14,
            bottom_curve: 14
        }
    }, {
        label: "Descending",
        value: "Descending",
        presets: {
            bottom_curve_type: "Shrink",
            top_curve_type: "Grow",
            top_curve: 14,
            bottom_curve: 14
        }
    }];
    var h = {
        slant: 50,
        sequence: "A-B-C",
        shape: "Normal",
        circle_radius: 100,
        bottom_curve_type: "Curve",
        top_curve_type: "Curve",
        bottom_curve: 10,
        top_curve: 10,
        word_spacing: 100,
        line_spacing: 100,
        letter_spacing: 100,
        alignment: 0,
        font: {
            font: "University",
            is_embroidery: 1
        },
        font_id: "1759",
        fontSize: 240,
        color1: "A8A8A8",
        value: "Text",
        isEmbroidery: !0
    };
    h.fontObject = h.font;
    if (c.id) {
        if (c = searchInArray(state.selectedDesign.canvas_text, c.id, "id")) {
            var f = b.text = c;
            eventManager.trigger("elementSelected", f.id);
            f.sleep = !0;
            for (var m in h) {
                f[m] || (f[m] = "object" == typeof h[m] ? angular.copy(h[m]) : h[m]);
            }
            f.slant = parseInt(f.slant, 10);
            f.bottom_curve = parseInt(f.bottom_curve, 10);
            f.top_curve = parseInt(f.top_curve, 10);
            f.word_spacing = parseInt(f.word_spacing, 10);
            f.line_spacing = parseInt(f.line_spacing, 10);
            f.letter_spacing = parseInt(f.letter_spacing, 10);
            f.alignment = parseInt(f.alignment, 10);
            f.fontSize = parseInt(f.fontSize, 10);
            f.circle_radius = parseInt(f.circle_radius, 10);
            f.sleep = !1;
            var q = findMatch(state.fontCategories, function(b) {
                return "1" == b.IsEmbroidery;
            });
            service.getFontsByCategory(q.font_style_id, function(c) {
                b.fonts = c;
                q.fonts = c;
                for (var d = 0; d < c.length; d++) {
                    var f = c[d];
                    f.font == b.text.font.font && (b.text.font = f, b.text.font_id = f.font_id);
                }
                b.$$phase || b.$apply();
            });
            b.showfontList = 0;
            b.fontCategories = state.fontCategories.slice(0);
            deleteMatches(b.fontCategories, function(b) {
                return "0" == b.IsEmbroidery;
            });
            b.updateTextValue = function() {};
            b.updateFontName = function() {
                var c = searchInArray(b.fonts, f.font_id, "font_id");
                c && (f.font = c.name);
            };
            b.showFillColorModal = function(event) {
                showColorModal(b, d, k, {
                    currentColor: f.color1,
                    onSelect: function(b) {
                        "none" != b && (f.color1 = getColorString(b, !0));
                    },
                    allowTransparent: !0
                }, event);
            };
            var n = f.shape;
            b.updateTextShape = function() {
                if ("Vertical" == f.shape || "Vertical" == n) {
                    var c = state.designer.getElementById(f.id).object,
                        d = c.height;
                    c.height = c.width;
                    c.width = d;
                }
                n = f.shape;
                c = findMatch(b.shapes, function(b) {
                    return b.label == f.shape;
                });
                f.sleep = !0;
                for (var g in c.presets) {
                    f[g] = c.presets[g];
                }
                f.sleep = !1;
            };
            b.increaseLetterSpacing = function() {
                f.letter_spacing = Math.min(200, parseInt(f.letter_spacing, 10) + 20);
            };
            b.decreaseLetterSpacing = function() {
                f.letter_spacing = Math.max(0, parseInt(f.letter_spacing, 10) - 20);
            };
            b.increaseWordSpacing = function() {
                f.word_spacing = Math.min(200, parseInt(f.word_spacing, 10) + 10);
            };
            b.decreaseWordSpacing = function() {
                f.word_spacing = Math.max(0, parseInt(f.word_spacing, 10) - 10);
            };
            b.updateTopCurveType = function() {};
            b.increaseTopCurve = function() {
                f.top_curve = Math.min(15, parseInt(f.top_curve, 10) + 1);
            };
            b.decreaseTopCurve = function() {
                f.top_curve = Math.max(5, parseInt(f.top_curve, 10) - 1);
            };
            b.updateBottomCurveType = function() {};
            b.increaseBottomCurve = function() {
                f.bottom_curve = Math.min(15, parseInt(f.bottom_curve, 10) + 1);
            };
            b.decreaseBottomCurve = function() {
                f.bottom_curve = Math.max(5, parseInt(f.bottom_curve, 10) - 1);
            };
            b.increaseTextRadius = function() {
                f.circle_radius = Math.min(300, f.circle_radius + 5);
            };
            b.decreaseTextRadius = function() {
                f.circle_radius = Math.max(10, f.circle_radius - 5);
            };
            b.increaseTextSlant = function() {
                f.slant = Math.min(100, parseInt(f.slant, 10) + 5);
            };
            b.decreaseTextSlant = function() {
                f.slant = Math.max(0, parseInt(f.slant, 10) - 5);
            };
            b.updateSequence = function() {};
            b.nudge = function(b) {
                ezd.nudgeElement(f.id, b, 1);
            };
            b.changeAlignment = function(b) {
                f.alignment = b;
            };
        } else {
            g.path("/layers");
        }
    } else {
        b.action = "Add", b.text = angular.copy(h), h = state.selectedDesign.isEmpty(!0) && ezdVars.AutoZoom, c = state.designer.addEmbroideryText(b.text), state.selectedDesign.canvas_text.push(c), eventManager.trigger("layersChanged"), eventManager.trigger("designColorsChanged"), g.path("/editTextEmbroidery/" + c.id), h && setTimeout(function() {
            state.designer.zoomIn();
        }, 2E3);
    }
};
ui.controllers.SelectSizesController = function(b, d, c) {
    b.nextStep = function() {
        b.validateWithInventory(function() {
            b.inventoryErrors && b.inventoryErrors.length || (b.close(), showModal("cartLogin", b, d));
        });
    };
    b.validateWithInventory = function(c) {
        for (var d = !0, h = 0; h < state.quoteInformation.sizeStyles.length; h++) {
            var f = state.quoteInformation.sizeStyles[h];
            f.style.inventory ? "LOADING" == f.style.inventory && (d = !1) : (d = !1, f.style.inventory = "LOADING", function() {
                var d = f;
                service.checkStyleInventory(f.style.product_style_id, function(f) {
                    d.style.inventory = f;
                    b.validateWithInventory(c);
                }, function() {
                    b.inventoryErrors = [];
                    c();
                });
            }());
        }
        if (d) {
            b.inventoryErrors = [];
            for (h = 0; h < state.quoteInformation.sizeStyles.length; h++) {
                for (f = state.quoteInformation.sizeStyles[h], d = 0; d < f.sizes.length; d++) {
                    var m = f.sizes[d];
                    if (!(0 >= m.quantity)) {
                        var q = findMatch(f.style.inventory.sizes, function(b) {
                            return b.id == m.size_id;
                        });
                        q && q.available_quantity < m.quantity && (0 == q.available_quantity ? b.inventoryErrors.push(f.style.color + " " + m.name + " is out of stock.") : b.inventoryErrors.push("Only " + q.available_quantity + " of " + f.style.color + " " + m.name + (1 == q.available_quantity ? " is" : " are") + " available for purchase at this time."));
                    }
                }
            }
            b.$$phase || b.$apply();
            c && c();
        }
    };
    state.namesNumbers && 0 < state.namesNumbers.countTotals().numItems && (delete state.quoteInformation, b.readOnly = !0);
};
ui.controllers.CartLoginController = function(b, d, c) {
    b.login = state.cartLoginInfo = {};
    b.showForgotPasswordForm = !1;
    var g = function() {
        b.close();
        showModal("saveDesign", b, d);
    };
    state.activeUserToken && state.currentUserToken ? g() : (b.login.mode = "guest", b.logInExisting = function() {
        service.logIn(b.login.email, b.login.password, state.currentUserToken, function(b) {
            g();
        }, function(c) {
            b.login.error = c;
            b.$apply();
        });
    }, b.logInNew = function() {
        "guest" == b.login.mode ? state.currentUserToken ? g() : service.getOrCreateSession(function(b) {
            state.currentUserToken = b.UserToken;
            state.activeUserToken = b.UserToken;
            state.currentSessionToken = b.sessionToken;
            g();
        }) : "register" == b.login.mode && (b.close(), showModal("cartRegister", b, d));
    }, b.submitForgotPassword = function() {
        b.forgotPasswordSuccess = !1;
        b.forgotPasswordError = !1;
        service.resetPassword(b.login.email, function() {
            b.forgotPasswordSuccess = !0;
            b.$apply();
        }, function(c) {
            b.forgotPasswordError = !0;
            b.$apply();
        });
    });
};
ui.controllers.CartRegisterController = function(b, d, c) {
    b.register = {};
    b.createAccount = function() {
        service.createAccount(b.register.firstName, b.register.lastName, b.register.email, b.register.password, b.register.passwordConfirm, state.currentUserToken, function(c) {
            state.currentUserToken = c.UserToken;
            state.activeUserToken = c.UserToken;
            state.currentSessionToken = c.sessionToken;
            b.close();
            showModal("saveDesign", b, d);
        }, function(c) {
            b.register.error = c;
            b.$apply();
        });
    };
};
ui.controllers.SaveDesignController = function(b, d, c) {
    b.saveInfo = {
        designName: state.designer.design.information.name
    };
    var g = function() {
        b.close();
        showModal("viewCart", b, d);
    };
    state.designSaveResult || !state.selectedDesign || state.selectedDesign.isEmpty() ? g() : b.saveDesign = function() {
        ajaxCallStarted("SaveDesignTemplate", "保存设计...");
//        debugger;
        state.designer.saveDesign({
            designId: state.selectedDesign.design_id,
            productStyleId: state.selectedProductStyle.product_style_id,
            UserToken: state.currentUserToken,
            UserToken: state.activeUserToken,
            name: b.saveInfo.designName,
            notes: state.designer.design.information.notes,
            success: function(b, c) {
                state.selectedDesignID = state.selectedDesign.design_id = c.designID;
                ajaxCallEnded("SaveDesignTemplate");
                state.designSaveResult = c;
                c.UserToken && (state.currentUserToken = parseInt(c.UserToken.trim(), 10));
                c.UserToken && (state.activeUserToken = parseInt(c.UserToken, 10));
                c.sessionToken && (state.currentSessionToken = c.sessionToken.trim());
                g();
            },
            error: function(b) {
                ajaxCallEnded("SaveDesignTemplate");
                alert("保存设计时发生错误：: " + b);
            }
        });
    };
};
ui.controllers.EnterPaymentController = function(b, d) {
    state.order || (state.order = {});
    state.order.payment || (state.order.payment = {
        paymentType: null,
        cardNumber: null,
        expirationMonth: null,
        expirationYear: null,
        ccvCode: null,
        poNumber: null
    });
    b.nextStep = function() {
        b.close();
        showModal("enterAddresses", b, d);
    };
    ezdVars.PaymentDisabled && (state.order.payment.paymentType = "Arrange Payment Later", b.nextStep());
    state.cart.paymentMethods ? (1 == paymentMethods.length && "Arrange Payment Later" == paymentMethods[0] && (state.order.payment.paymentType = "Arrange Payment Later", b.nextStep()), b.paymentMethods = state.cart.paymentMethods) : service.getCartPaymentMethods(state.currentUserToken, function(c) {
        b.paymentMethods = c;
        b.$apply();
        1 == c.length && "Arrange Payment Later" == c[0] && (state.order.payment.paymentType = "Arrange Payment Later", b.nextStep());
    });
    b.payment = state.order.payment;
    b.todayYear = (new Date).getFullYear();
};
ui.controllers.ShippingMethodController = function(b, d) {
    ezdVars.EnableCartShipping || (b.close(), showModal("reviewOrder", b, d));
    service.getCartShippingMethods(state.currentUserToken, function(c) {
        for (var d = 0; d < c.length; d++) {
            state.order.shippingMethods = c;
            var k = c[d];
            k.text = "Delivery usually within " + k.min_days + " business days.";
        }
        b.methods = c;
        b.$apply();
    });
    b.hidePricing = !ezdVars.EnableCartPricing;
    b.order = state.order;
    b.nextStep = function() {
        state.order.shippingMethod = searchInArray(state.order.shippingMethods, state.order.shippingMethodID, "shipping_method_id");
        service.saveCartShippingMethod(state.currentUserToken, state.order.shippingMethodID, function() {
            b.close();
            showModal("reviewOrder", b, d);
        });
    };
};
ui.controllers.ReviewOrderController = function(b, d) {
    function c(b) {
        for (var c = [], d = 0; d < b.selectedSizes.length; d++) {
            for (var g = b.selectedSizes[d], q = 0; q < g.cart_retail_item_size_namenumbers.length; q++) {
                var n = g.cart_retail_item_size_namenumbers[q];
                c.push({
                    name: n.name,
                    number: n.number,
                    size: findMatch(b.sizeData, function(b) {
                        return b.id == g.product_style_size_id;
                    }),
                    cart_retail_item_id: b.cart_retail_item_id,
                    cart_retail_item_size_namenumber_id: n.cart_retail_item_size_namenumber_id
                });
            }
        }
        return c;
    }
    b.hidePricing = !ezdVars.EnableCartPricing;
    b.placeOrderText = ezdVars.PaymentDisabled ? "Submit Now" : "Place Order Now";
    service.getCart(state.currentUserToken, !0, function(c) {
        b.cart = state.cart = c;
        b.centerModal();
        b.$apply();
    });
    b.pageOffset = 0;
    b.pageSize = 2;
    b.previousPage = function() {
        b.pageOffset = Math.max(0, b.pageOffset - b.pageSize);
    };
    var g = function(b) {
        for (var c = 0, d = function() {
            c--;
            0 == c && b && b();
        }, g = 0; g < state.cart.cart_retail_items.length; g++) {
            var q = state.cart.cart_retail_items[g];
            q.updateNote && (c++, q.updateNote = !1, service.saveCartItemNotes(state.currentUserToken, q.cart_retail_item_id, q.note, d));
        }
        0 == c && b && b();
    };
    b.beforeClose = function() {
        g();
    };
    b.nextStep = function() {
        g(function() {
            var c = {}, g = state.order.payment;
            state.order.payment_type = c.payment_method = g.paymentType;
            "Credit Card" == g.paymentType ? (c.cc_num = g.cardNumber, 1 == g.expirationMonth.toString().length && (g.expirationMonth = "0" + g.expirationMonth.toString()), c.cc_exp = g.expirationMonth + "-" + g.expirationYear, c.cc_cvv = g.ccvCode) : "Purchase Order" == g.paymentType && (c.po_number = g.poNumber);
            c.amount_due = state.cart.total_due;
            service.saveCartOrder(state.currentUserToken, c, function(c) {
                state.cart.orderID = c;
                b.close();
                showModal("emailDesign", b, d);
            });
        });
    };
    b.showNamesNumbers = function(g) {
        $.get(state.theme.url(dsLocation + "/html/modals/namesAndNumbersCommon.html"), function(h) {
            var f = angular.element("#angularAppElement").scope().$new();
            f.sizeData = g.sizeData;
            f.namesNumbers = c(g);
            f.close = function() {
                $(".isd-nncContainer").remove();
                f.$destroy();
                b.showingNamesNumbers = !1;
                b.$$phase || b.$apply();
                b.centerModal();
            };
            h = $(h)[0];
            d(h)(f);
            $("<div class='isd-nncContainer'>").appendTo(".isd-cart-namesNumbers").append(h);
            b.showingNamesNumbers = !0;
            f.noAddingAllowed = !0;
            f.inCart = !0;
            f.readOnly = !0;
            f.$apply();
            setTimeout(function() {
                b.centerModal();
            }, 10);
        });
    };
    b.editCart = function(c) {
        b.close();
        showModal("viewCart", b, d, {
            editCartRetailItemID: c.cart_retail_item_id
        });
    };
};
ui.controllers.ViewTestCaseXmlController = function(b, d) {
    var c = {};
    c.cart = state.cart;
    c.billing_address = state.billingAddress;
    c.shipping_address = state.shipToAddress;
    c.name = "Test Case";
    c.store_id = ezdVars.AppToken;
    c.publisher_id = ezdVars.PublisherID;
    c.domain = ezdVars.ApiDomain;
    c.store_uri = ezdVars.AppURI;
    c.coupon_code = state.cart.coupon_code;
    c.shipping_method_id = state.order.shippingMethodID;
    c.guest_email = state.cartLoginInfo.guestEmail;
    c.payment_type = state.order.payment.paymentType;
    c.po_number = state.order.payment.poNumber;
    b.testCase = c;
    b.refreshXml = function() {
        setTimeout(function() {
            var c = $("#testCaseXml").html(),
                c = c.replace(/\x3c!--[\s\S]*?--\x3e/g, ""),
                c = c.replace(/ng-\w+?=".*?"/g, ""),
                c = c.replace(/class=".*?"/g, ""),
                c = c.replace("  ", " ");
            b.testCase.xml = c;
            b.$apply();
        }, 50);
    };
    b.refreshXml();
};
ui.controllers.PrintReceiptController = function(b, d) {
    b.sendToPrinter = function() {
        b.startPrint = !0;
    };
    b.cart = state.cart;
    b.order = state.order;
    b.shipping = state.shipToAddress;
    b.billing = state.billingAddress;
    b.contact = {};
    state.shipToAddress && (b.contact.name = state.shipToAddress.first_name + " " + state.shipToAddress.last_name, b.shipping.name = state.shipToAddress.first_name + " " + state.shipToAddress.last_name);
    state.billingAddress && (b.billing.name = state.billingAddress.first_name + " " + state.billingAddress.last_name);
    b.contact.email = state.cartLoginInfo.guestEmail || ezdVars.UserEmail;
    b.shippingMethod = state.order.shippingMethod;
    b.paymentMethod = state.order.payment_type;
    b.orderNumber = state.cart.orderID;
    service.getStoreAddress(function(c) {
        b.store = c;
        c.web_address = "http://" + ezdVars.ApiDomain;
        b.$apply();
    });
    b.beforeClose = function() {
        delete state.cart;
        delete state.quoteInformation;
        delete state.namesNumbers;
    };
    "Purchase Order" == state.order.payment.paymentType && (b.paymentMethod = "Purchase Order: " + state.order.payment.poNumber);
    b.shippingMethod = state.order.shippingMethod;
};
ui.controllers.ViewCartController = function(b, d, c) {
    function g(b) {
        for (var c = [], d = 0; d < b.selectedSizes.length; d++) {
            for (var f = b.selectedSizes[d], g = 0; g < f.cart_retail_item_size_namenumbers.length; g++) {
                var h = f.cart_retail_item_size_namenumbers[g];
                c.push({
                    name: h.name,
                    number: h.number,
                    size: findMatch(b.sizeData, function(b) {
                        return b.id == f.product_style_size_id;
                    }),
                    cart_retail_item_id: b.cart_retail_item_id,
                    cart_retail_item_size_namenumber_id: h.cart_retail_item_size_namenumber_id
                });
            }
        }
        return c;
    }
    b.enableCartCheckout = ezdVars.EnableCartCheckout;
    b.hidePricing = !ezdVars.EnableCartPricing;
    var k = ezdVars.CartURL;
    0 > k.indexOf("{{") && (k += "/{{SessionToken}}");
    k = k.replace("{{SessionToken}}", state.currentSessionToken);
    k = k.replace("{{UserToken}}", state.currentUserToken);
    k = k.replace("{{UserToken}}", state.activeUserToken);
    b.cartURL = k;
    b.sessionToken = state.currentSessionToken;
    var h = function(c, e) {
        b.cart || (b.cart = {});
        b.cart.sub_total = "Calculating...";
        b.cart.tax_amount = "Calculating...";
        b.cart.discount = "Calculating...";
        b.cart.grand_total = "Calculating...";
        service.getCart(state.currentUserToken, !1, function(e) {
            b.centerModal();
            b.cart = state.cart = e;
            f();
            if (b.editCartRetailItemID) {
                var d = findMatch(state.cart.cart_retail_items, function(c) {
                    return c.cart_retail_item_id == b.editCartRetailItemID;
                });
                d && (d.editMode = !0);
            }
            for (d = 0; d < e.cart_retail_items.length; d++) {
                e.cart_retail_items[d].selectedPreview = e.cart_retail_items[d].sidePreviews[0];
            }
            b.$apply();
            c && c();
        }, e);
    };
    b.selectedPreviewChanged = function(b) {};
    b.beforeClose = function() {
        r();
    };
    var f = function() {
        var b = state.cart,
            c = state.quoteInformation;
        if (b && b.cart_retail_items) {
            for (var d = 0; d < b.cart_retail_items.length; d++) {
                var f = b.cart_retail_items[d];
                if (!(f.design_id && f.design_id != state.selectedDesign.design_id || !f.design_id && state.selectedDesign.design_id)) {
                    var g = findMatch(c.sizeStyles, function(b) {
                        return b.style.product_style_id == f.product_style_id;
                    });
                    if (g) {
                        g.cart_retail_item_id = f.cart_retail_item_id;
                        g.cart_retail_item = f;
                        state.designer.design.information.notes && !f.note && (f.note = state.designer.design.information.notes);
                        for (var h = 0; h < f.selectedSizes.length; h++) {
                            var k = f.selectedSizes[h],
                                m = findMatch(g.sizes, function(b) {
                                    return b.size_id == k.product_style_size_id;
                                });
                            m || (m = {
                                name: product_style_size_name,
                                size_id: k.product_style_size_id,
                                quantity: k.quantity
                            }, sizeStyle.sizes.push(m));
                            m.cart_retail_item_size_id = k.cart_retail_item_size_id;
                            m.cart_retail_item_size = k;
                            if (m.namesNumbers && k.cart_retail_item_size_namenumbers) {
                                for (var n = 0; n < k.cart_retail_item_size_namenumbers.length; n++) {
                                    var q = k.cart_retail_item_size_namenumbers[n],
                                        r = findMatch(m.namesNumbers, function(b) {
                                            return b.name == q.name && b.number == q.number;
                                        });
                                    r || (r = {
                                        name: q.name,
                                        number: q.number,
                                        size: m.name
                                    }, m.namesNumbers.push(r));
                                    r.cart_retail_item_size_namenumber_id = q.cart_retail_item_size_namenumber_id;
                                    r.cart_retail_item_id = f.cart_retail_item_id;
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    b.pageOffset = 0;
    b.pageSize = 2;
    b.previousPage = function() {
        b.pageOffset = Math.max(0, b.pageOffset - b.pageSize);
    };
    var m = 0,
        q = 0,
        n = function(c) {
            q++;
            q == m && (ajaxCallEnded("AddItemsToCart"), ezdVars.EnableCartCheckout ? h(function() {
                !state.activeUserToken && state.cartLoginInfo && state.cartLoginInfo.guestEmail && service.saveCartEmail(state.currentUserToken, state.cartLoginInfo.guestEmail);
            }, function(c) {
                "Empty Cart!" == c && (b.close(), showModal("selectSizes", b, d));
            }) : (window.onbeforeunload = function() {
                return null;
            }, top.location.href = k));
        };
    b.editCart = function(b) {
        b.editMode = !0;
    };
    c.$on("updateNamesAndNumbersQuote", function() {
        h(function() {
            t();
        }, function() {
            t();
        });
    });
    b.sizeChanged = function(b, c) {
        c.updateSize = !0;
        var d = c.cart_retail_item_size_id;
        d && (d = state.quoteInformation.getCartItemByID(d)) && (d.quantity = 0);
        state.quoteInformation.getProductStyleSizeByID(c.product_style_size_id).quantity += c.quantity;
    };
    b.quantityChanged = function(b, c) {
        parseInt(c.quantity, 10) ? 0 > c.quantity && (c.quantity *= -1) : c.quantity = 0;
        c.updateQuantity = !0;
        var d = c.cart_retail_item_size_id;
        d && (d = state.quoteInformation.getCartItemByID(d)) && (d.quantity = c.quantity);
    };
    b.updateCart = function(c) {
        delete b.editCartRetailItemID;
        for (var e = q = m = 0; e < c.selectedSizes.length; e++) {
            var d = c.selectedSizes[e];
            d.updateSize ? (m++, service.updateCartItemQuantity(state.currentSessionToken, c.cart_retail_item_id, d.original_product_style_size_id, 0, n), m++, service.addItemToCart(state.currentSessionToken, c.product_id, c.product_style_id, d.product_style_size_id, c.design_id || "0", d.quantity, n), d.updateSize = !1) : d.updateQuantity && (m++, service.updateCartItemQuantity(state.currentSessionToken, c.cart_retail_item_id, d.product_style_size_id, d.quantity, n), d.updateQuantity = !1);
        }
        0 == m && (c.editMode = !1);
    };
    var r = function(b) {
        for (var c = 0, d = function() {
            c--;
            0 == c && b && b();
        }, f = 0; f < state.cart.cart_retail_items.length; f++) {
            var g = state.cart.cart_retail_items[f];
            g.original_note != g.note && (c++, g.original_note = g.note, service.saveCartItemNotes(state.currentUserToken, g.cart_retail_item_id, g.note, d));
        }
        0 == c && b && b();
    };
    b.nextStep = function() {
        r(function() {
            b.close();
            showModal("enterPayment", b, d);
        });
    };
    b.deleteCartItem = function(c) {
        service.removeCartItem(state.currentSessionToken, c.cart_retail_item_id, function() {
            var e = b.cart.cart_retail_items.indexOf(c);
            b.cart.cart_retail_items.splice(e, 1);
            e = findMatchIndex(state.quoteInformation.sizeStyles, function(b) {
                return b.cart_retail_item_id == c.cart_retail_item_id;
            });
            0 <= e && state.quoteInformation.sizeStyles.splice(e, 1);
            hideLoaderForNext();
            h(null, function(c) {
                "Empty Cart!" == c && (b.close(), showModal("selectSizes", b, d));
            });
            b.$apply();
        });
    };
    b.applyCouponCode = function() {
        service.saveCartCouponCode(state.currentUserToken, state.cart.couponCode, function() {
            h();
        }, function(b) {
            alert(b);
        });
    };
    var t = function() {
        ajaxCallStarted("AddItemsToCart", "添加到购物车...");
        for (var c = q = m = 0; c < state.quoteInformation.sizeStyles.length; c++) {
            for (var e = state.quoteInformation.sizeStyles[c], f = 0; f < e.sizes.length; f++) {
                var g = e.sizes[f];
                if (g.cart_retail_item_size_id) {
                    var k = g.cart_retail_item_size.cart_retail_item_size_namenumbers && g.cart_retail_item_size.cart_retail_item_size_namenumbers.length;
                    g.quantity == g.cart_retail_item_size.quantity || k || (m++, service.updateCartItemQuantity(state.currentSessionToken, e.cart_retail_item_id, g.size_id, g.quantity, n));
                } else {
                    if (0 < g.quantity) {
                        if (g.namesNumbers) {
                            for (k = 0; k < g.namesNumbers.length; k++) {
                                var r = g.namesNumbers[k];
                                if (!r.cart_retail_item_size_namenumber_id) {
                                    var t = {
                                        name: r.name,
                                        size: state.namesNumbers.names.textSize.size,
                                        font_id: state.namesNumbers.names.font.fontID,
                                        color: getColorString(state.namesNumbers.names.color, !0)
                                    }, r = {
                                        number: r.number,
                                        size: state.namesNumbers.numbers.textSize.size,
                                        font_id: state.namesNumbers.numbers.font.fontID,
                                        color: getColorString(state.namesNumbers.numbers.color, !0)
                                    };
                                    m++;
                                    service.addItemToCartWithName(state.currentSessionToken, state.selectedProduct.product_id, e.style.product_style_id, g.size_id, state.selectedDesign.design_id, 1, t, r, n);
                                }
                            }
                        } else {
                            m++, service.addItemToCart(state.currentSessionToken, state.selectedProduct.product_id, e.style.product_style_id, g.size_id, state.selectedDesign.design_id, g.quantity, n);
                        }
                    }
                }
            }
        }
        0 == m && (ajaxCallEnded("AddItemsToCart"), h(function() {
            !state.activeUserToken && state.cartLoginInfo && state.cartLoginInfo.guestEmail && service.saveCartEmail(state.currentUserToken, state.cartLoginInfo.guestEmail);
        }, function(c) {
            "Empty Cart!" == c && (b.close(), showModal("selectSizes", b, d));
        }));
    };
    b.showNamesNumbers = function(c) {
        $.get(state.theme.url(dsLocation + "/html/modals/namesAndNumbersCommon.html"), function(e) {
            var f = angular.element("#angularAppElement").scope().$new();
            f.sizeData = c.sizeData;
            f.namesNumbers = g(c);
            f.cartItem = c;
            f.close = function() {
                $(".isd-nncContainer").remove();
                f.$destroy();
                b.showingNamesNumbers = !1;
                b.$$phase || b.$apply();
            };
            e = $(e)[0];
            d(e)(f);
            $("<div class='isd-nncContainer'>").appendTo(".isd-cart-namesNumbers").append(e);
            b.showingNamesNumbers = !0;
            f.noAddingAllowed = !0;
            f.inCart = !0;
            f.$apply();
            setTimeout(function() {
                b.centerModal();
            }, 10);
        });
    };
    h(function() {
        t();
    }, function() {
        t();
    });
};
ui.controllers.EnterAddressesController = function(b, d) {
    state.order && state.order.payment ? (b.editableAddressType = "SHIPPING", b.nonEditableAddressType = "BILLING", b.allowOnlyOneAddress = !1, ezdVars.EnableCartShipping || (b.nonEditableAddressType = "SHIPPING", b.editableAddressType = "BILLING", b.allowOnlyOneAddress = !0), b.billingAddressRequired = ezdVars.BillingAddressRequired || "Credit Card" == state.order.payment.paymentType || !ezdVars.EnableCartShipping, b.allowOnlyOneAddress && (b.billingAddressDisabled = !0, b.addressesSame = !0), state.shipToAddress ||
        (state.shipToAddress = {
            country_id: "1",
            business: "False",
            pobox: "False"
        }), b.shipToAddress = state.shipToAddress, state.billingAddress || (state.billingAddress = {
        country_id: "1",
        business: "True",
        pobox: "True"
    }), b.billingAddress = state.billingAddress, b.shippingCountries = [{
        country_id: 1,
        code: "US",
        name: "United States",
        require_state: !0
    }, {
        country_id: 0,
        code: "",
        name: "--Loading Country list--",
        require_state: !0
    }], b.billingCountries = angular.copy(b.shippingCountries), b.shippingStates = b.allShippingStates =
        [{
            country_id: 1,
            code: null,
            name: "--Loading State List--",
            state_id: 0
        }], b.billingStates = b.allBillingStates = angular.copy(b.billingStates), "SHIPPING" == b.editableAddressType && (service.getCartShippingCountryList(state.currentUserToken, function(c) {
        b.shippingCountries = c;
        b.shipToCountryChanged();
        b.$$phase || b.$apply();
    }), service.getCartShippingStateList(state.currentUserToken, function(c) {
        b.allShippingStates = c;
        b.shipToCountryChanged();
        b.$$phase || b.$apply();
    })), service.getCartBillingCountryList(state.currentUserToken, function(c) {
        b.billingCountries = c;
        b.billingCountryChanged();
        "BILLING" == b.editableAddressType && (b.shippingCountries = c);
        b.$$phase || b.$apply();
    }), service.getCartBillingStateList(state.currentUserToken, function(c) {
        b.allBillingStates = c;
        b.billingCountryChanged();
        "BILLING" == b.editableAddressType && (b.allShippingStates = c, b.shipToCountryChanged());
        b.$$phase || b.$apply();
    }), state.activeUserToken && "SHIPPING" == b.editableAddressType ? service.getCartShippingAddresses(state.currentUserToken, function(c) {
        b.accountAddresses = c;
        for (var d = 0; d < c.length; d++) {
            var k = c[d];
            k.description = k.first_name + " " + k.last_name + "     " + k.street1;
        }
        b.$$phase || b.$apply();
    }) : b.$$phase || b.$apply(), b.billingAddressChanged = function() {
        var c = b.billingAddress.first_name || b.billingAddress.first_name || b.billingAddress.last_name || b.billingAddress.street1 || b.billingAddress.city || b.billingAddress.postcode || b.billingAddress.phone;
        b.billingAddressRequired = ezdVars.BillingAddressRequired || "Credit Card" == state.order.payment.paymentType || !ezdVars.EnableCartShipping || c;
    }, b.savedAddressChanged = function() {
        var c = b.shipToAddress.address_id;
        if (c) {
            for (var d = 0; d < b.accountAddresses.length; d++) {
                var k = b.accountAddresses[d];
                k.address_id == c && (b.shipToAddress = state.shipToAddress = angular.copy(k), b.shipToCountryChanged(), b.billingCountryChanged(), b.billingAddressDisabled && (b.billingAddress = state.billingAddress = angular.copy(k)));
            }
        }
    }, b.savedBillingAddressChanged = function() {
        var c = b.billingAddress.address_id;
        if (c) {
            for (var d = 0; d < b.accountAddresses.length; d++) {
                var k = b.accountAddresses[d];
                k.address_id == c && (b.billingAddress = state.billingAddress = angular.copy(k), b.shipToCountryChanged(), b.billingCountryChanged(), b.billingAddressDisabled && (b.billingAddress = state.billingAddress = angular.copy(k)));
            }
        }
    }, b.changeAddressesSame = function() {
        b.billingAddressDisabled = b.addressesSame;
        b.billingAddress = b.billingAddressDisabled ? state.billingAddress = b.shipToAddress : state.billingAddress = angular.copy(b.shipToAddress);
        b.billingCountryChanged();
        b.billingAddressChanged();
    }, b.shipToCountryChanged = function() {
        var c = [];
        if (b.shipToAddress.country_id) {
            b.shippingStates = c;
            b.shipToAddress.country = findMatch(b.shippingCountries, function(c) {
                return c.country_id == b.shipToAddress.country_id;
            });
            var d = "SHIPPING" == b.editableAddressType ? b.allShippingStates : b.allBillingStates;
            if (d) {
                for (var k = 0; k < d.length; k++) {
                    var h = d[k];
                    h.country_id == b.shipToAddress.country_id && c.push(h);
                }
                c.length || (b.shipToAddress.state_id = null);
            }
        }
    }, b.billingCountryChanged = function() {
        var c = [];
        if (b.billingAddress.country_id && (b.billingStates = c, b.billingAddress.country = findMatch(b.billingCountries, function(c) {
            return c.country_id == b.billingAddress.country_id;
        }), b.allBillingStates)) {
            for (var d = 0; d < b.allBillingStates.length; d++) {
                var k = b.allBillingStates[d];
                k.country_id == b.billingAddress.country_id && c.push(k);
            }
            c.length || (b.billingAddress.state_id = null);
        }
    }, b.nextStep = function() {
        b.shippingErrors = [];
        b.billingErrors = [];
        var c = ezdVars.EnableCartShipping ? "shippingMethod" : "reviewOrder";
        ezdVars.EnableCartShipping || (b.billingAddress = state.billingAddress = b.shipToAddress);
        var g = ezdVars.EnableCartShipping,
            k = (b.billingAddress.first_name || b.billingAddress.first_name || b.billingAddress.last_name || b.billingAddress.street1 || b.billingAddress.city || b.billingAddress.postcode || b.billingAddress.phone) && (!b.addressesSame || !g),
            h = function(c, d) {
                var g = c.trim().split("\n");
                "shipping" == d || b.allowOnlyOneAddress ? b.shippingErrors = g : b.billingErrors = g;
                b.$apply();
            };
        g ? service.saveCartShippingAddress(state.currentUserToken, b.shipToAddress, function(f) {
            b.shipToAddress.address_id = f;
            k ? service.saveCartBillingAddress(state.currentUserToken, b.billingAddress, function(f) {
                b.billingAddress.address_id = f;
                b.close();
                showModal(c, b, d);
            }, function(b) {
                h(b, "billing");
            }) : (b.billingAddress = b.shipToAddress, b.close(), showModal(c, b, d));
        }, function(b) {
            h(b, "shipping");
        }) : k && service.saveCartBillingAddress(state.currentUserToken, b.billingAddress, function(f) {
            b.billingAddress.address_id = f;
            b.close();
            showModal(c, b, d);
        }, function(b) {
            h(b, "billing");
        });
    }) : (b.close(), showModal("enterPayment", b, d));
};


ui.controllers.EditImageController = function(b, d, c, g, k) {
//    rightSideLoaded(b);
    var h = searchInArray(state.selectedDesign.canvas_art, c.id, "id");
    if (h) {
        b.imageName = (h.data.art && h.data.art.art_name)?h.data.art.art_name : h.data.art_name;
        b.disableResolutionMeter = ezdVars.DisableResolutionMeter;
        eventManager.trigger("elementSelected", h.id);
        b.canvasArt = h;
        var f = function() {
            if (h.colors) {
                b.colors = [];
                for (var c = 0; c < h.colors.length; c++) {
                    var d = getColorString(h.colors[c]);
                    b.colors.push(d);
                }
            }
        };
        f();
        b.showChangeColorModal = function(c, event) {
            var f = {
                currentColor: getColorString(h.colors[c]),
                onSelect: function(b) {
                    b = getColorString(b);
                    "undefined" != typeof h.setColor ? h.setColor(c, b) : h.colors = "string" == typeof h.colors[c] ? {
                        index: c,
                        color: b
                    } : {
                        index: c,
                        color: getColorString(b, !0)
                    };
                    delete h.previewHtml;
                    eventManager.trigger("designColorsChanged");
                },
                allowTransparent: !0
            };
            showColorModal(b, d, k, f, event);
        };
        b.changeAlignment = function(b) {
            state.designer.changeElementAlignment(h.id, b);
        };
        b.delobj = function(){
            ezd.deleteElements(h);
        }
        b.align_horizontal =function(){
            ezd.centerElement(h.id,'h');
        }
        b.align_vertical =function(){
            ezd.centerElement(h.id,'v');
        }
        b.resize_vertical =function(){
            ezd.changeElementFlip(h.id,'v');
        }
        b.resize_horizontal =function(){
            ezd.changeElementFlip(h.id,'h');
        }
        b.nudge = function(b) {
            ezd.nudgeElement(h.id, b, 1);
        };
        var m = function() {
            var d = state.designer.getElementById(c.id);
            !b.$$destroyed && d && d.object && "undefined" != typeof d.object.quality && (b.quality = d.object.quality, b.qualityWidth = (215-10) * d.object.quality + "px", b.$$phase || b.$apply());
        }, q = [];
        q.push(eventManager.on("designColorsChanged", f));
        q.push(eventManager.on("rasterQualityChanged", m));
        q.push(eventManager.on("elementDeleted", function(d) {
            b.$$destroyed || searchInArray(state.selectedDesign.canvas_art, c.id, "id") || (g.path("/editImagePane"), b.$$phase || b.$apply());
        }));
        q.push(eventManager.on("undoRedo", function(c) {
            b && !b.$$destroyed && c.change && c.change.length && findMatch(c.change, function(b) {
                return b.id == h.id;
            }) && (f(), b.$$phase || b.$apply());
        }));
        m();
        b.$on("$destroy", function() {
            if (q) {
                for (var b = 0; b < q.length; b++) {
                    q[b]();
                }
            }
        });
    } else {
        g.path("/editImagePane");
    }
};
ui.controllers.EditSvgController = function(b, d, c, g, k) {
//    rightSideLoaded(b);
    var h = searchInArray(state.selectedDesign.canvas_art, c.id, "id");
    if (h) {
        eventManager.trigger("elementSelected", h.id);
        b.imageSrc = h.data.canvas_art_rendered;
        b.canvasArt = h;
        var f = function() {
            if (h.colors) {
                b.colors = [];
                for (var c = 0; c < h.colors.length; c++) {
                    var d = getColorString(h.colors[c]);
                    b.colors.push(d);
                }
            }
        };
        f();
        b.showChangeColorModal = function(c, event) {
            var g = {
                currentColor: getColorString(h.colors[c]),
                onSelect: function(b) {
                    b = getColorString(b);
                    "string" == typeof h.colors[c] ? h.colors[c] = b : h.colors[c].value = getColorString(b, !0);
                    state.designer.updateArtColor(h.id, c, b);
                    delete h.previewHtml;
                    f();
                },
                allowTransparent: !0
            };
            showColorModal(b, d, k, g, event);
        };
        b.changeAlignment = function(b) {
            state.designer.changeElementAlignment(h.id, b);
        };
        b.delobj = function(){
            ezd.deleteElements(h);
        }
        b.align_horizontal =function(){
            ezd.centerElement(h.id,'h');
        }
        b.align_vertical =function(){
            ezd.centerElement(h.id,'v');
        }
        b.resize_vertical =function(){
            ezd.changeElementFlip(h.id,'v');
        }
        b.resize_horizontal =function(){
            ezd.changeElementFlip(h.id,'h');
        }

        b.nudge = function(b) {
            ezd.nudgeElement(h.id, b, 1);
        };
        var m = [];
        m.push(eventManager.on("designColorsChanged", f));
        m.push(eventManager.on("elementDeleted", function(d) {
            searchInArray(state.selectedDesign.canvas_art, c.id, "id") || (g.path("/editImagePane"), b.$$phase || b.$apply());
        }));
        m.push(eventManager.on("undoRedo", function(c) {
            f();
            b && !b.$$destroyed && !b.$$phase && c.change && c.change.length && findMatch(c.change, function(b) {
                return b.id == h.id;
            }) && b.$apply();
        }));
        b.$on("$destroy", function() {
            if (m) {
                for (var b = 0; b < m.length; b++) {
                    m[b]();
                }
            }
        });
    } else {
        g.path("/editImagePane");
    }
};


ui.controllers.EditImagePane = function(b, d, c, h, k) {
    $('.design-tool .nav-tabs li').removeClass('active');
    $('.design-tool .nav-tabs li:eq(1)').addClass('active');
}
ui.controllers.EditMultipleController = function(b, d, c, g, k) {
//    rightSideLoaded(b);
    b.$$phase || b.$apply();
    b.nudge = function(b) {
        ezd.nudgeElement(null, b, 1, state.designer.activeSide.boundingBox.getSelections());
    };
    eventManager.on("elementPropertyChanged", function(b) {});
    eventManager.on("elementDeleted", function(d) {
        d = searchInArray(state.selectedDesign.canvas_text, c.id, "id");
        !b || d || b.$$destroyed || (g.path("/layers"), b.$$phase || b.$apply());
    });
};
ui.controllers.GetQuoteController = function(b, d, c) {
    if (state.quoteInformation && state.quoteInformation.sizeStyles) {
        for (c = 0; c < state.quoteInformation.sizeStyles.length; c++) {
            var g = state.quoteInformation.sizeStyles[c];
            if (g.sizes) {
                for (var k = 0; k < g.sizes.length; k++) {
                    delete g.sizes[k].priceGrid, delete g.sizes[k].priceData;
                }
            }
        }
    }
    var h = function(b) {
        for (var c = {
            style: b,
            sizes: []
        }, d = b.sizes.split(","), f = b.sizeids.split(","), g = 0; g < d.length; g++) {
            var h = d[g],
                k = f[g],
                m = findMatch(b.sizeData, function(b) {
                    return b.name == h;
                });
            c.sizes.push({
                name: h,
                size_id: m ? m.id || m.size_id : k,
                quantity: 0
            });
        }
        return c;
    };
    b.pageOffset = 0;
    b.pageSize = 5;
    b.previousPage = function() {
        b.pageOffset = Math.max(0, b.pageOffset - b.pageSize);
    };
    if (state.selectedProductStyle && state.selectedProductStyle.sizes) {
        for (g = state.selectedProductStyle.sizes.split(","), k = state.selectedProductStyle.sizeids.split(","), b.productStyleSizes = [], c = 0; c < k.length; c++) {
            b.productStyleSizes.push({
                name: g[c],
                size_id: k[c]
            });
        }
    }
    if (!state.quoteInformation || state.quoteInformation.isEmpty()) {
        if (state.quoteInformation = {
            sizeStyles: [],
            isEmpty: function() {
                if (!this.sizeStyles || !this.sizeStyles.length) {
                    return !0;
                }
                for (var b = 0; b < this.sizeStyles.length; b++) {
                    for (var c = this.sizeStyles[b], d = 0; d < c.sizes.length; d++) {
                        if (0 < c.sizes[d].quantity) {
                            return !1;
                        }
                    }
                }
                return !0;
            },
            getCartItemByID: function(b) {
                for (var c = state.quoteInformation, d = 0; d < c.sizeStyles.length; d++) {
                    for (var f = c.sizeStyles[d], g = 0; g < f.sizes.length; g++) {
                        var h = f.sizes[g];
                        if (h.cart_retail_item_size_id == b) {
                            return h;
                        }
                    }
                }
                return null;
            },
            getProductStyleSizeByID: function(b) {
                for (var c = state.quoteInformation, d = 0; d < c.sizeStyles.length; d++) {
                    for (var f = c.sizeStyles[d], g = 0; g < f.sizes.length; g++) {
                        var h = f.sizes[g];
                        if (h.size_id == b) {
                            return h;
                        }
                    }
                }
                return null;
            }
        }, state.quoteInformation.sizeStyles.push(h(state.selectedProductStyle)), state.namesNumbers && state.namesNumbers.items) {
            for (c = 0; c < state.namesNumbers.items.length; c++) {
                var f = state.namesNumbers.items[c];
                f.size && (f.name || f.number) && (g = state.quoteInformation.sizeStyles[0], g = findMatch(g.sizes, function(b) {
                    return b.name == f.size.name;
                })) && (g.quantity++, g.namesNumbers || (g.namesNumbers = []), g.namesNumbers.push(f));
            }
        }
    }
    b.sizeStyles = state.quoteInformation.sizeStyles;
    service.getProductColors(state.selectedProductID, function(c) {
        b.allProductStyles = c;
        b.$$phase || b.$apply();
    });
    b.updateProductColorDescription = function() {
        for (var c = "", e = 0; e < state.quoteInformation.sizeStyles.length; e++) {
            c += ", " + state.quoteInformation.sizeStyles[e].style.color;
        }
        b.productColor = c.substring(2);
    };
    b.showStyleModal = function(c, e) {
        b.readOnly || (b.styleModalVisible = !0, b.styleModalIndex = e, b.selectStyle = function(c) {
            var d = state.quoteInformation.sizeStyles[e + b.pageOffset];
            d.style = c;
            c.sizeids.split(",").length != d.sizes.length && console.log("改变产品款式时，尺寸不匹配，这不应该发生.");
            for (var f = c.sizes.split(","), g = c.sizeids.split(","), k = 0; k < f.length; k++) {
                var m = f[k];
                m.size_id = g[k];
                delete m.priceGrid;
                delete m.priceData;
                delete m.cart_retail_item_size_id;
            }
            f = {};
            for (k = 0; k < d.sizes.length; k++) {
                f[d.sizes[k].name] = d.sizes[k].quantity;
            }
            state.quoteInformation.sizeStyles[e + b.pageOffset] = h(c);
            d = state.quoteInformation.sizeStyles[e + b.pageOffset];
            for (k = 0; k < d.sizes.length; k++) {
                f[d.sizes[k].name] && (d.sizes[k].quantity = f[d.sizes[k].name]);
            }
            d.cart_retail_item_id && (service.removeCartItem(state.currentSessionToken, d.cart_retail_item_id), delete d.cart_retail_item_id);
            b.styleModalVisible = !1;
            b.updateProductColorDescription();
        });
    };
    b.quantityChanged = function(c) {
        c || (c = this.size);
        parseInt(c.quantity, 10) ? 0 > c.quantity && (c.quantity *= -1) : c.quantity = 0;
        b.quantity = m();
    };
    b.changeQuantity = function(c, e) {
        c.quantity = parseInt(c.quantity, 10);
        c.quantity = Math.max(0, c.quantity + e);
        b.quantityChanged(c);
    };
    b.removeStyle = function(c, e) {
        state.quoteInformation.sizeStyles.splice(e + b.pageOffset, 1);
        e == b.pageOffset && (b.pageOffset = Math.max(0, b.pageOffset - 1));
        state.quoteInformation.sizeStyles.length || state.quoteInformation.sizeStyles.push(h(state.selectedProductStyle));
        b.pageOffset = Math.max(0, state.quoteInformation.sizeStyles.length - b.pageSize);
        b.styleModalVisible = !1;
        b.updateProductColorDescription();
    };
    b.addProductStyle = function() {
        var c = null;
        b.allProductStyles && b.allProductStyles.length && (c = b.allProductStyles[0]);
        state.quoteInformation.sizeStyles.push(h(c));
        b.pageOffset = Math.max(0, state.quoteInformation.sizeStyles.length - b.pageSize);
        b.updateProductColorDescription();
    };
    var m = function() {
        for (var b = 0, c = 0; c < state.quoteInformation.sizeStyles.length; c++) {
            for (var d = state.quoteInformation.sizeStyles[c], f = 0; f < d.sizes.length; f++) {
                d.sizes[f].quantity.toString().match(/\d+/) && (d.sizes[f].quantity = parseInt(d.sizes[f].quantity, 10), b += parseInt(d.sizes[f].quantity, 10));
            }
        }
        return b;
    };
    b.getColorString = getColorString;
    b.productColor = state.selectedProductStyle.color;
    b.productDescription = state.selectedProduct.name;
    b.quantity = m();
    var q = state.dsUtils.getPricingColorData();
    b.numFrontColors = q.isFrontVector ? q.numFrontColors : "N/A - Digital Print";
    b.numSleeveLeftColors = q.isSleeveLeftVector ? q.numSleeveLeftColors : "N/A - Digital Print";
    b.numSleeveRightColors = q.isSleeveRightVector ? q.numSleeveRightColors : "N/A - Digital Print";
    b.numBackColors = q.isBackVector ? q.numBackColors : "N/A - Digital Print";
    b.numColorsString = q.sideColorString;
    state.namesNumbers && state.namesNumbers.totals && (b.numNames = state.namesNumbers.totals.numNames, b.numNumbers = state.namesNumbers.totals.numNumbers, b.numNameNumberItems = state.namesNumbers.totals.numItems);
    b.checkout = function() {
        delete state.designSaveResult;
        showModal("selectSizes", b, d);
    };
    var n = function() {
        var c = {
            total: 0,
            complete: !0
        }, e = m();
        if (0 == e) {
            alert("Please add at least one size to get a quote.");
        } else {
            if (e < b.minimumQuantity) {
                return b.minimumNotMet = !0, b.$$phase || b.$apply(), c;
            }
            b.minimumNotMet = !1;
            for (var d = 0; d < state.quoteInformation.sizeStyles.length; d++) {
                for (var f = state.quoteInformation.sizeStyles[d], g = 0; g < f.sizes.length; g++) {
                    var h = f.sizes[g];
                    0 < h.quantity && (h.priceData ? c.total += h.priceData.totalPrice : h.priceGrid ? c.total += t(h.priceGrid, h.quantity, e) : c.complete = !1);
                }
            }
            c.total = parseFloat(c.total);
            state.namesNumbers && state.namesNumbers.totals.totalPrice && (c.total += parseFloat(state.namesNumbers.totals.totalPrice));
            c.total = r(c.total).toFixed(2);
            c.averagePer = r(c.total / e).toFixed(2);
            c.complete ? (c.total = ezdVars.CurrencySymbol + c.total, c.averagePer = ezdVars.CurrencySymbol + c.averagePer) : c.total = c.averagePer = "Calculating...";
            b.priceTotals = c;
            b.$$phase || b.$apply();
        }
    }, r = function(b) {
        var c = b - Math.floor(b),
            d = Math.round(100 * c) / 100;
        return b - c + d;
    }, t = function(c, e, d) {
        var f = findMatch(c, function(b) {
            return b.low <= d && b.high >= d;
        });
        f || (f = c[0]);
        b.minimumNotMet = !1;
        c = 0;
        var g = f.price || 0,
            h = f.setup || 0,
            k = f.priceDiscountable || 0,
            m = f.printSetup || 0,
            n = f.qtyDiscPercent / 100,
            q = f.combinePrintAndProduct,
            t = f.applyQtyDiscToPrinting,
            ca = 0;
        f.qtyDiscPercent ? ca = 0 : (ca = f.priceDiscountable, n = 0);
        !0 == q && !1 == t && (console.log("Calculating price with formula -(quoteQtyDiscAmount * sizeStyleQuantity) + (round(quotePrice + (quoteSetup / totalQuantity)) * sizeStyleQuantity) - (((quotePriceDiscountable) * sizeStyleQuantity) * quoteQtyDiscPercent)"), console.log("feed data: "), console.log(f), console.log("formula data: quoteQtyDiscAmount: " + ca + " sizeStyleQuantity: " + e + " quotePrice: " + g + " quoteSetup: " + h + " totalQuantity: " + d + " quotePriceDiscountable: " + k + " quoteQtyDiscPercent: " +
            n + " "), c = -(ca * e) + r(g + h / d) * e - k * e * n);
        !0 == q && !0 == t && (console.log("Calculating price with formula -(quoteQtyDiscAmount * sizeStyleQuantity) + ((quotePrice + round(quoteSetup / totalQuantity)) * sizeStyleQuantity) - round(((quotePriceDiscountable + (quotePrintSetup / sizeStyleQuantity)) * sizeStyleQuantity) * quoteQtyDiscPercent);"), console.log("feed data: "), console.log(f), console.log("formula data: quoteQtyDiscAmount: " + ca + " sizeStyleQuantity: " + e + " quotePrice: " + g + " quoteSetup: " + h + " totalQuantity: " +
            d + " quotePriceDiscountable: " + k + " quoteQtyDiscPercent: " + n + " quotePrintSetup: " + m + " "), c = -(ca * e) + (g + r(h / d)) * e - r((k + m / e) * e * n));
        !1 == q && !0 == t && (console.log("Calculating price with formula -(quoteQtyDiscAmount * sizeStyleQuantity) + (quotePrice * sizeStyleQuantity) + quoteSetup - round(((quotePriceDiscountable * sizeStyleQuantity)) * quoteQtyDiscPercent)"), console.log("feed data: "), console.log(f), console.log("formula data: quoteQtyDiscAmount: " + ca + " sizeStyleQuantity: " + e + " quotePrice: " + g + " quoteSetup: " + h + " quotePriceDiscountable: " + k + " quoteQtyDiscPercent: " + n + " "), c = -(ca * e) +
            g * e + h - r(k * e * n));
        !1 == q && !1 == t && (console.log("Calculating price with formula -(quoteQtyDiscAmount * sizeStyleQuantity) + (round(quotePrice + (quoteSetup / totalQuantity)) * sizeStyleQuantity) - round(((quotePriceDiscountable * sizeStyleQuantity)) * quoteQtyDiscPercent)"), console.log("feed data: "), console.log(f), console.log("formula data: quoteQtyDiscAmount: " + ca + " sizeStyleQuantity: " + e + " quotePrice: " + g + " quoteSetup: " + h + " quotePriceDiscountable: " + k + " quoteQtyDiscPercent: " +
            n + " totalQuantity: " + d), c = -(ca * e) + r(g + h / d) * e - r(k * e * n));
        return c;
    };
    b.updateQuote = function() {
        for (var c = 0, e = 0; e < state.quoteInformation.sizeStyles.length; e++) {
            for (var d = state.quoteInformation.sizeStyles[e], f = 0; f < d.sizes.length; f++) {
                var g = d.sizes[f];
                g.quantity && (c += g.quantity);
            }
        }
        for (e = 0; e < state.quoteInformation.sizeStyles.length; e++) {
            for (d = state.quoteInformation.sizeStyles[e], f = 0; f < d.sizes.length; f++) {
                g = d.sizes[f], 0 < g.quantity && !g.priceGrid && function() {
                    var e = g;
                    service.getQuote(state.selectedProductID, d.style.product_style_id, e.size_id, e.quantity, c, e.quantity, q.numFrontColors, q.numBackColors, q.numSleeveLeftColors, q.numSleeveRightColors, q.isAllVector, 0, 0, function(c) {
                        c.totalPrice ? (b.minimumQuantity = 0, e.priceData = c) : (e.priceGrid = c, b.minimumQuantity = c[0].low);
                        n();
                    }, function(b) {
                        alert(b);
                    });
                }();
            }
        }
        n();
    };
    b.maxScreenPrintColors = ezdVars.MaxScreenPrintColors;
    b.canPrintDesign = state.dsUtils.canPrintDesign();
    setTimeout(function() {
        b.centerModal();
    }, 10);
};
ui.controllers.DistressController = function(b, d, c) {
//    rightSideLoaded(b);
//    state.designer.hideBB();
    b.showingInlineModal = true;
    b.loadedDistressList = true;
    b.showDistressList = function() {
        b.hasDesign(!0) && (b.distress_id = null, state.designer.activeSide.distressObj && (b.distress_id = state.designer.activeSide.distressObj.distress_id), b.showingInlineModal = !0, service.getDistressList(function(c) {
            for (var d = 0; d < c.length; d++) {
                var h = c[d];
                "0" == h.distress_uri && (h.distress_thumb_path = state.theme.url(ezdVars.DesignerLocation + "/ds/images/blankDistress.png"), b.distress_id || (b.distress_id = h.distress_id));
            }
            b.distressEffects = c;
            b.$$phase || b.$apply();
        }));
    };
    b.selectDistress = function(c) {
        b.distress_id = c.distress_id;
        state.designer.changeDistress(c);
        state.designer.addSnapshotEvent("changeDistress", c);
    };
};

ui.controllers.BackgroundColorController = function(b, d, c) {
    b.backgroundColor = {
        color: state.designer.product.information.html_color
    };
    b.backgroundColorChanged = function() {
        ezdVars.ArtToolsMode && (state.designer.product.information.html_color = b.backgroundColor.color, $("#raphael").css("background-color", getColorString(b.backgroundColor.color)));
    };
};


ui.controllers.AdminController = function(b) {
    b.skin = {};
    b.skin.name = $("#minimalSkin").length && !$("#minimalSkin").prop("disabled") ? "minimal" : "standard";
    b.skinChanged = function() {
        "minimal" == b.skin.name ? (document.getElementById("minimalSkin") || $('<link rel="stylesheet" href="' + ezdVars.DesignerLocation + '/ds/css/minimal.css" type="text/css" id="minimalSkin" />').appendTo("head"), $("#minimalSkin").prop("disabled", !1)) : $("#minimalSkin").prop("disabled", !0);
    };
};
ui.controllers.PunchInController = function(b, d, c, g) {
    "/designs" == c.path() ? showModalDrawer("designIdeas", b, g) : "/login" == c.path() ? showModal("saveAndShare", b, g, {
        loginOnly: !0
    }) : "/savedArt" == c.path() ? showModalDrawer("myArt", b, g) : c.path();
    eventManager.trigger("punchIn", {
        screenName: c.path().replace(/\//gi, "")
    });
    c.path("/layers");
};

ui.controllers.LayersController = function(b, d, c, g, k, h) {
//    rightSideLoaded(b);
    var f = function() {
        if (b.$$destroyed) {
            console.log("$scope销毁之后，调用updateLayers");
        } else {
            0 == state.designer.activeSide.elements.length && state.dsUtils.addRenderedHandlerOneTime(f);
            b.layers = [];
            for (var d = 0; d < state.designer.activeSide.elements.length; d++) {
                var g = state.designer.activeSide.elements[d];
                g.layerBackgroundColor = state.selectedProductStyle ? getColorString(state.selectedProductStyle.html_color) : "#FFFFFF";
                g.previewHtml || (b.svgPreviewSize || (b.svgPreviewSize = {
                    width: 90,
                    height: 90
                }, 0 <= c.path().indexOf("edit-design") && (b.svgPreviewSize = {
                    width: 45,
                    height: 45
                })), g.previewHtml = h.trustAsHtml(state.designer.getElementPreview(g.id, b.svgPreviewSize.width, b.svgPreviewSize.height)), console.log("调用代价极大的 getElementPreview -值得吗？值得吗？"));
                if (g.colors) {
                    var k = g.colors,
                        m = !0;
                    if (k && k.length) {
                        for (var p = 0; p < k.length; p++) {
                            if (!colorsAreClose(k[p].value, g.layerBackgroundColor, 0.1)) {
                                m = !1;
                                break;
                            }
                        }
                    }
                    m && (g.layerBackgroundColor = "#aaaaaa");
                } else {
                    colorsAreClose(g.layerBackgroundColor, 0.001 < g.stroke ? g.strokeColor : g.color, 0.1) && (g.layerBackgroundColor = "#aaaaaa");
                }
                b.layers.push(g);
            }
            b.layers.sort(function(b, c) {
                return -1 * (parseFloat(b.z) - parseFloat(c.z));
            });
            b.$$phase || b.$apply();
        }
    };
    f();
    b.updateLayers = f;
    b.moveLayerUp = function(c) {
        if (0 !== $.inArray(c, b.layers)) {
            c.z++;
            for (var d = 0; d < b.layers.length; d++) {
                var f = b.layers[d];
                f.id != c.id && f.z == c.z && f.z--;
            }
            state.designer.changeLayer(c.id, "up");
            b.layers.sort(function(b, c) {
                return -1 * (parseFloat(b.z) - parseFloat(c.z));
            });
        }
    };
    b.moveLayerDown = function(c) {
        if ($.inArray(c, b.layers) !== b.layers.length - 1) {
            c.z--;
            for (var d = 0; d < b.layers.length; d++) {
                var f = b.layers[d];
                f.id != c.id && f.z == c.z && f.z++;
            }
            state.designer.changeLayer(c.id, "down");
            b.layers.sort(function(b, c) {
                return -1 * (parseFloat(b.z) - parseFloat(c.z));
            });
        }
    };
    b.selectLayer = function(b) {
        eventManager.trigger("elementSelected", b.id);
        var c = state.designer.getElementById(b.id);
        console.log("检查元素对象", c, c.object, b.id, b);
        eventManager.trigger("elementsSelected", [c.object]);
    };
    b.deleteLayer = function(b) {
        state.designer.getElementById(b.id) && state.designer.deleteElements(b);
        eventManager.trigger("designColorsChanged");
    };
    var m = [];
    m.push(eventManager.on("designChanged", f));
    m.push(eventManager.on("designColorsChanged", f));
    m.push(eventManager.on("designCanvasChanged", f));
    m.push(eventManager.on("layersChanged", f));
    m.push(eventManager.on("productChanged", f));
    m.push(eventManager.on("productColorChanged", f));
    m.push(eventManager.on("selectedProductLoaded", f));
    m.push(eventManager.on("stackingOrderChanged", function() {
        f();
    }));
    m.push(eventManager.on("designChanging", function() {
        b.layers = [];
        b.$$phase || b.$apply();
    }));
    m.push(eventManager.on("undoRedo", function(b) {}));
    m.push(eventManager.on("elementDeleted", function(b) {
        f();
    }));
    b.$on("$destroy", function() {
        if (m) {
            for (var b = 0; b < m.length; b++) {
                m[b]();
            }
        }
    });
};
ui.controllers.NamesAndNumbersController = function(b, d, c) {
    b.onShow = function() {
        var d = b.selectedProductID || state.selectedProductID,
            f = b.selectedProductStyleID || state.selectedProductStyleID,
            g = b.sizeData || state.selectedProductStyle.sizeData;
        b.productStyleSizes = g;
        if (!state.namesNumbers) {
            state.namesNumbers = {};
            state.namesNumbers.namesFontOptions = [{
                label: "1 inch",
                fontSize: "60px",
                size: 1
            }, {
                label: "2 inches",
                fontSize: "60px",
                size: 2
            }];
            state.namesNumbers.numbersFontOptions = [{
                label: "6 inches",
                fontSize: "155px",
                size: 6
            }, {
                label: "8 inches",
                fontSize: "155px",
                size: 8
            }];
            state.namesNumbers.fonts = [{
                fontFamily: "Varsity",
                fontID: 1660,
                cssFontFamily: "Varsity"
            }, {
                fontFamily: "Academy",
                fontID: 1659,
                cssFontFamily: "Academy"
            }, {
                fontFamily: "Yearbook",
                fontID: 1662,
                cssFontFamily: "Yearbook"
            }, {
                fontFamily: "College02",
                fontID: 70,
                cssFontFamily: "College02"
            }];
            ezdVars.HasGoogleFonts && (state.namesNumbers.fonts = [{
                fontFamily: "Collegiate 05",
                fontID: 2349,
                cssFontFamily: "collegiate05"
            }, {
                fontFamily: "Modern 12",
                fontID: 2034,
                cssFontFamily: "modern12"
            }, {
                fontFamily: "Modern 20",
                fontID: 2339,
                cssFontFamily: "modern20"
            }, {
                fontFamily: "Modern 21",
                fontID: 2347,
                cssFontFamily: "modern21"
            }, {
                fontFamily: "Modern 22",
                fontID: 2348,
                cssFontFamily: "modern22"
            }, {
                fontFamily: "Western 12",
                fontID: 2376,
                cssFontFamily: "western12"
            }]);
            if (state.excludedFontIDs && state.excludedFontIDs.length) {
                for (var k = 0; k < state.namesNumbers.fonts.length; k++) {
                    findMatch(state.excludedFontIDs, function(b) {
                        return b === state.namesNumbers.fonts[k].fontID;
                    }) && (state.namesNumbers.fonts.splice(k, 1), k--);
                }
            }
            state.namesNumbers.names = {};
            state.namesNumbers.names.font = state.namesNumbers.fonts[0];
            state.namesNumbers.names.textSize = state.namesNumbers.namesFontOptions[1];
            state.namesNumbers.names.color = "#000000";
            state.namesNumbers.names.quantity = 0;
            state.namesNumbers.numbers = {};
            state.namesNumbers.numbers.font = state.namesNumbers.fonts[0];
            state.namesNumbers.numbers.textSize = state.namesNumbers.numbersFontOptions[1];
            state.namesNumbers.numbers.color = "#000000";
            state.namesNumbers.numbers.quantity = 0;
            g = g[0];
            b.namesNumbers || (state.namesNumbers.items = [{
                name: "",
                number: "",
                size: g
            }, {
                name: "",
                number: "",
                size: g
            }, {
                name: "",
                number: "",
                size: g
            }]);
            service.loadCss(ezdVars.DesignerLocation + "/common/css/namesNumbersFonts.css");
        }
        b.namesFontOptions = state.namesNumbers.namesFontOptions;
        b.numbersFontOptions = state.namesNumbers.numbersFontOptions;
        b.fonts = state.namesNumbers.fonts;
        g = state.dsUtils.getPricingColorData();
        hideLoaderForNext();
        b.namesPrice = "Calculating...";
        b.numbersPrice = "Calculating...";
        service.getProductQuote(d, f, null, g.numFrontColors, g.numBackColors, g.numSleeveLeftColors, g.numSleeveRightColors, g.isAllVector, function(d) {
            var f = d[0];
            state.namesNumbers.priceGrid = d;
            b.namesPriceFloat = f.namePrice;
            b.numbersPriceFloat = f.numberPrice;
            b.namesPrice = c.formatPrice(f.namePrice) + " Each";
            b.numbersPrice = c.formatPrice(f.numberPrice) + " Each";
            b.totals = state.namesNumbers.totals = b.countTotals();
            b.$$phase || b.$apply();
            setTimeout(function() {
                b.centerModal && b.centerModal();
            }, 10);
        });
        b.pageOffset = 0;
        b.pageSize = 5;
        b.names = state.namesNumbers.names;
        b.numbers = state.namesNumbers.numbers;
        b.namesNumbers || (b.namesNumbers = state.namesNumbers.items);
        b.cartItem && (state.namesNumbers.names.font = findMatch(state.namesNumbers.fonts, function(c) {
            return c.fontID === parseInt(b.cartItem.name_font_id, 10);
        }), state.namesNumbers.names.textSize = findMatch(state.namesNumbers.namesFontOptions, function(c) {
            return c.size === parseInt(b.cartItem.name_size, 10);
        }), state.namesNumbers.names.color = getColorString(b.cartItem.name_number_color), state.namesNumbers.numbers.font = findMatch(state.namesNumbers.fonts, function(c) {
            return c.fontID === parseInt(b.cartItem.number_font_id, 10);
        }), state.namesNumbers.numbers.textSize = findMatch(state.namesNumbers.numbersFontOptions, function(c) {
            return c.size === parseInt(b.cartItem.number_size, 10);
        }), state.namesNumbers.numbers.color = getColorString(b.cartItem.number_color));
        b.previewData = {
            name: "Name",
            number: "10",
            nameFontFamily: state.namesNumbers.names.font.cssFontFamily,
            numberFontFamily: state.namesNumbers.numbers.font.cssFontFamily,
            nameFontSize: state.namesNumbers.names.textSize.fontSize,
            numberFontSize: state.namesNumbers.numbers.textSize.fontSize
        };
        state.namesNumbers.countTotals = b.countTotals;
        b.totals = state.namesNumbers.totals = b.countTotals();
    };
    b.countTotals = function() {
        for (var c = {
            numNames: 0,
            numNumbers: 0,
            numItems: 0,
            totalPrice: 0
        }, d = 0; d < b.namesNumbers.length; d++) {
            var g = b.namesNumbers[d];
            if (g.name || g.number) {
                c.numItems++, g.name && c.numNames++, g.number && c.numNumbers++;
            }
        }
        c.totalPrice = c.numNames * b.namesPriceFloat + c.numNumbers * b.numbersPriceFloat;
        c.totalPrice || (c.totalPrice = 0);
        c.totalPrice = c.totalPrice.toFixed(2);
        return c;
    };
    b.namesFontSizeChanged = function() {
        b.previewData.nameFontSize = state.namesNumbers.names.textSize.fontSize;
        console.log('call k() ---- 10');
        k();
    };
    b.numbersFontSizeChanged = function() {
        b.previewData.numberFontSize = state.namesNumbers.numbers.textSize.fontSize;
        console.log('call k() ---- 11');
        k();
    };
    b.chooseNamesColor = function(event) {
        if (!b.readOnly) {
            var g = {
                currentColor: state.namesNumbers.names.color,
                onSelect: function(b) {
                    state.namesNumbers.names.color = b;
                    console.log('call k() ---- 12');
                    k();
                },
                allowTransparent: !1,
                onlyNames: !0
            };
            showColorModal(b.$new(), d, c, g, event);
        }
    };
    b.chooseNumbersColor = function(event) {
        if (!b.readOnly) {
            var g = {
                currentColor: state.namesNumbers.numbers.color,
                onSelect: function(b) {
                    state.namesNumbers.numbers.color = b;
                    console.log('call k() ---- 13');
                    k();
                },
                allowTransparent: !1,
                onlyNumbers: !0
            };
            showColorModal(b.$new(), d, c, g, event);
        }
    };
    b.namesFontChanged = function() {
        b.previewData.nameFontFamily = state.namesNumbers.names.font.cssFontFamily;
        console.log('call k() ---- 15');
        k();
    };
    b.numbersFontChanged = function() {
        b.previewData.numberFontFamily = state.namesNumbers.numbers.font.cssFontFamily;
        console.log('call k() ---- 16');
        k();
    };
    b.nameChanged = function(c) {
        b.totals = state.namesNumbers.totals = b.countTotals();
        g(c);
    };
    b.numberChanged = function(c) {
        b.totals = state.namesNumbers.totals = b.countTotals();
        g(c);
    };
    b.sizeChanged = function(c) {
        b.totals = state.namesNumbers.totals = b.countTotals();
        c.changedSize = !0;
        g(c);
    };
    var g = function(b) {
        if (b.cart_retail_item_size_namenumber_id) {
            var c = !1;
            if (state.cart) {
                var d = state.cart.getNameNumber(b.cart_retail_item_size_namenumber_id);
                d && (c = d.name != b.name || d.number != b.number || b.changedSize, d.name = b.name, d.number = b.number, delete b.changedSize);
            }
            c && service.updateNameNumber(state.currentUserToken, b.cart_retail_item_id, b.size.id, b.cart_retail_item_size_namenumber_id, b.name, b.number, function() {});
        }
    }, k = function() {
        for (var c = !1, d = 0; d < b.namesNumbers.length; d++) {
            var g = b.namesNumbers[d];
            if (g.cart_retail_item_size_namenumber_id) {
                c = !0;
                break;
            }
        }
        c && (c = {
            color: getColorString(state.namesNumbers.names.color, !0),
            size: state.namesNumbers.names.textSize.size,
            font_id: state.namesNumbers.names.font.fontID
        }, d = {
            color: getColorString(state.namesNumbers.numbers.color, !0),
            size: state.namesNumbers.numbers.textSize.size,
            font_id: state.namesNumbers.numbers.font.fontID
        }, service.updateNameNumberFont(state.currentUserToken, g.cart_retail_item_id, c, d, function() {}, function() {}));
    };
    b.addNameNumber = function() {
        b.namesNumbers.push({
            name: "",
            number: "",
            size: b.productStyleSizes[0]
        });
        b.pageOffset = Math.max(0, b.namesNumbers.length - b.pageSize);
    };
    b.deleteNameNumber = function(c, d) {
        b.namesNumbers.splice(c + b.pageOffset, 1);
        c == b.pageOffset && (b.pageOffset = Math.max(0, b.pageOffset - 1));
        b.pageOffset = Math.max(0, b.namesNumbers.length - b.pageSize);
        d == b.previewData.nn && (b.previewData.number = "10", b.previewData.name = "Name", delete b.previewData.nn);
        d.cart_retail_item_size_namenumber_id && service.removeNameNumberFromCart(state.currentUserToken, d.cart_retail_item_id, d.cart_retail_item_size_namenumber_id);
    };
    b.previewNameNumber = function(c, d) {
        b.previewData.name = d.name;
        b.previewData.number = d.number;
        b.previewData.nn = d;
    };
    b.addToOrder = function() {
        for (var d = 0, f = 0, g = function() {
            f++;
            f !== d || b.readOnly || c.$emit("updateNamesAndNumbersQuote");
        }, k = 0; k < b.namesNumbers.length; k++) {
            var n = b.namesNumbers[k];
            n.name || n.number || (b.namesNumbers.splice(k, 1), k--);
            if (b.inCart && !n.cart_retail_item_size_namenumber_id) {
                var r = {
                    color: getColorString(state.namesNumbers.names.color, !0),
                    size: state.namesNumbers.names.textSize.size,
                    font_id: state.namesNumbers.names.font.fontID,
                    name: n.name
                }, t = {
                    color: getColorString(state.namesNumbers.numbers.color, !0),
                    size: state.namesNumbers.numbers.textSize.size,
                    font_id: state.namesNumbers.numbers.font.fontID,
                    number: n.number
                };
                d++;
                service.addItemToCartWithName(state.currentSessionToken, b.cartItem.product_id, b.cartItem.product_style_id, n.size.id, b.cartItem.design_id, 1, r, t, g);
            }
        }
        0 !== d || b.readOnly || c.$emit("updateNamesAndNumbersQuote");
        b.close();
    };
    b.onShow();
};

ui.controllers.SaveAndShareController = function(b, d, c, g) {
    var k = function() {
        b.close();
        b.loginOnly || showModal("saveAndNameDesign", b, g);
    };
    console.log('call k() ---- 19');
    state.activeUserToken ? k() : (ui.controllers.LogInOrCreateAccountController(b, d, c), b.loggedIn = function(b) {
        console.log('call k() ---- 20');
        k();
    });
};
ui.controllers.SaveAndNameDesignController = function(b, d, c) {
    b.designName = state.designer.design.information.name;
    b.note = state.designer.design.information.notes;
    b.hideNote = ezdVars.EmbeddedPartner;
    b.saveDesign = function() {
        state.designer.design.information.notes = b.note;
        ajaxCallStarted("SaveDesignTemplate", "保存设计...");
        state.designer.saveDesign({
            designId: state.selectedDesignID,
            productStyleId: state.selectedProductStyle.product_style_id,
            UserToken: state.currentUserToken,
            UserToken: state.activeUserToken,
            name: b.designName,
            notes: state.designer.design.information.notes || "",
            success: function(g, k) {
                state.designer.design.information.name = b.designName;
                state.selectedDesignID = state.selectedDesign.design_id = k.designID;
                ajaxCallEnded("SaveDesignTemplate");
                state.designSaveResult = k;
                k.UserToken && (state.currentUserToken = parseInt(k.UserToken.trim(), 10));
                k.UserToken && (state.activeUserToken = parseInt(k.UserToken, 10));
                k.sessionToken && (state.currentSessionToken = k.sessionToken.trim());
                if (ezdVars.NextURL) {
                    var h = ezdVars.NextURL.replace("designID=0", "designID=" + state.selectedDesignID);
                    try {
                        window.onbeforeunload = null, window.top.onbeforeunload = null, window.top.location.href = h;
                    } catch (f) {
                        location.href = h;
                    }
                }
                b.close();
                d.isAdmin || d.disableShareDesign || showModal("saveAndShareEmail", b, c);
            },
            error: function(b) {
                ajaxCallEnded("SaveDesignTemplate");
                alert("There was an unexpected error saving this design.  The error returned was: " + b);
            }
        });
    };
};
ui.controllers.SaveAndShareEmailController = function(b, d) {
    b.startPrint = !1;
    b.emailChanged = function() {
        "autotest" == b.emailDesignInfo.emailTo && showModal("autotest", b, $compile);
    };
    state.cart && state.cart.orderID && (b.orderNumber = state.cart.orderID, b.$parent.beforeClose = function() {
        delete state.cart;
        delete state.quoteInformation;
        delete state.namesNumbers;
    });
    b.sendToPrinter = function() {
        b.startPrint = !0;
        setTimeout(function() {
            b.startPrint = !1;
            b.$apply();
        }, 100);
    };
    b.hideSocialMedia = ezdVars.EmbeddedPartner;
};
ui.controllers.ShareWithSocialMediaController = function(b, d, c, g) {
    b.designID = state.selectedDesign.design_id;
    b.designName = state.designer.design.information.name;
};
ui.controllers.EmailDesignController = function(b, d) {
    b.emailDesignInfo = {
        emailTo: "",
        emailFrom: ezdVars.UserEmail,
        nameFrom: ezdVars.UserName,
        message: "Check out the design I just created!"
    };
    b.emailSent = !1;
    b.emailDesign = function() {
        service.sendDesignEmail(state.currentUserToken, state.activeUserToken, state.selectedDesign.design_id, b.emailDesignInfo.emailTo, b.emailDesignInfo.emailFrom, b.emailDesignInfo.nameFrom, b.emailDesignInfo.nameTo, b.emailDesignInfo.message, function() {
            b.emailSent = !0;
            b.$apply();
        });
    };
    b.emailChanged = function() {
        "autotest" == b.emailDesignInfo.emailTo && showModal("viewTestCaseXml", b, d);
    };
};
ui.controllers.DesignsAndClipArtController = function(b, d, c) {
    b.disableUserArt = ezdVars.DisableUserArt;
    b.disableClipArt = ezdVars.DisableClipArt;
    b.disableDesigns = ezdVars.DisableDesigns;
};
ui.controllers.MyArtController = function(b, d, c) {
    b.searching = 0;
    b.offset = 0;
    b.pageSize = 8;
    var g = function() {
        b.searching++;
        service.getDesignsByUser(state.activeUserToken, function(c) {
            b.searching--;
            b.offset = 0;
            b.artItems = c;
            b.$apply();
        });
        service.getArtForUser(state.activeUserToken, function(c) {
            b.searching--;
            b.clipArtItems = c;
            b.$apply();
        });
    };
    b.onShow = function() {
        state.activeUserToken ? (b.isLoggedIn = !0, g()) : b.isLoggedIn = !1;
    };
    b.onShow();
    b.$on("loggedIn", function() {
        b.isLoggedIn = !0;
        g();
    });
    b.selectClipArt = function(c) {
        state.dsUtils.addClipArt(c, function() {
            b.$$phase || b.$apply();
        });
        b.close();
    };
    b.beforeSelect = function() {
        "undefined" !== typeof window.stop ? window.stop() : void 0 !== document.execCommand && document.execCommand("Stop", !1);
        b.artItems = [];
        b.$$phase || b.$apply();
    };
    b.selectArt = function(c) {
        b.beforeSelect();
        state.dsUtils.selectNewDesign(c.design_id, b, d);
        d.path("/layers");
        b.close();
    };
};
ui.controllers.DesignIdeasController = function(b, d, c) {
    b.searching = 0;
    b.searching++;
    service.getDesignCategoryList(null, function(c) {
        b.searching--;
        b.topCategories = b.categories = c;
        b.selectedCategoryID && (c = findMatch(c, function(c) {
            return c.design_category_id == b.selectedCategoryID;
        }), delete b.selectedCategoryID, c && b.selectCategory(c));
        b.$$phase || b.$apply();
    });
    b.searchTerm = "";
    b.offset = 0;
    b.pageSize = 6;
    b.selectCategory = function(c) {
        b.selectedCategory = c;
        k(!1);
        b.searching++;
        service.getDesignCategoryList(c.design_category_id, function(d) {
            b.searching--;
            b.offset = 0;
            b.categories = d;
            c.subcategories = d;
            for (var g = 0; g < d.length; g++) {
                d[g].parentCategory = c;
            }
            b.categoryOffset = 0;
            b.$$phase || b.$apply();
        });
        b.searching++;
        service.getDesignsByCategory(c.design_category_id, null, function(c) {
            b.searching--;
            b.offset = 0;
            b.artItems = c;
            b.$$phase || b.$apply();
        });
    };
    var g = function(c) {
        if (c == b.selectedCategory) {
            return !0;
        }
        if (!c.subcategories) {
            return !1;
        }
        for (var d = 0; d < c.subcategories.length; d++) {
            if (c.subcategories[d] == b.selectedCategory || g(c.subcategories[d])) {
                return !0;
            }
        }
        return !1;
    };
    b.showSubcategories = function(b) {
        return b.subcategories && b.subcategories.length ? g(b) : !1;
    };
    var k = function(c) {
        b.crumbs = [{
            label: "Design Ideas",
            click: function() {
                b.categories = b.topCategories;
                delete b.selectedCategory;
                b.artItems = [];
                k();
            }
        }];
        if (c) {
            b.crumbs.push({
                label: "Search:" + b.searchTerm,
                click: function() {}
            });
        } else {
            for (var d = b.selectedCategory, g = []; d;) {
                (function(c) {
                    g.push({
                        label: d.name,
                        click: function() {
                            b.selectCategory(c);
                        }
                    });
                })(d), d = d.parentCategory;
            }
            g.reverse();
            b.crumbs = b.crumbs.concat(g);
        }
    };
    b.searchDesigns = function() {
        b.searching++;
        service.getDesignsByCategory(null, b.searchTerm, function(c) {
            b.searching--;
            k(!0);
            b.artItems = c;
            b.categories = null;
            b.$$phase || b.$apply();
        });
    };
    b.beforeSelect = function() {
        "undefined" !== typeof window.stop ? window.stop() : void 0 !== document.execCommand && document.execCommand("Stop", !1);
        b.artItems = [];
        b.$$phase || b.$apply();
    };
    b.onShow = function() {
        b.selectedCategory && b.selectCategory(b.selectedCategory);
    };
    b.selectArt = function(c) {
        b.beforeSelect();
        state.dsUtils.selectNewDesign(c.design_id, b, d);
        d.path("/layers");
        b.close();
    };
    console.log('call k() ---- 1');
    k();
};
ui.controllers.ClipArtController = function(b, d, c) {
    d = function() {
        b.searching = 0;
        b.searching++;
        b.artItems = [];
        b.categories = b.topCategories = [];
        service.getArtCategoryList(null, ezdVars.EmbroideryMode, function(c) {
            b.searching--;
            b.embroideryOnly && deleteMatches(c, function(b) {
                return "0" == b.can_embroider;
            });
            b.topCategories = b.categories = c;
            b.$$phase || b.$apply();
        });
        service.getArtInCategory(null, null, null, function(c) {
            b.searching--;
            b.offset = 0;
            b.artItems = c;
            b.$$phase || b.$apply();
        });
        b.searchTerm = "";
        b.offset = 0;
        b.pageSize = 6;
        b.selectCategory = function(d, event) {
            b.selectedCategory = d;
            b.searching++;
            service.getArtCategoryList(d.art_category_id, ezdVars.EmbroideryMode, function(c) {
                b.searching--;
                b.offset = 0;
                b.embroideryOnly && deleteMatches(c, function(b) {
                    return "0" == b.can_embroider;
                });
                b.categories = c;
                d.subcategories = c;
                for (var f = 0; f < c.length; f++) {
                    c[f].parentCategory = d;
                }
                if (d.subcategories.length > 0) {
                    $('.isd-clipart-category-list').addClass('active');
                    b.$$phase || b.$apply();
                } else {
                    b.$$phase || b.$apply();
                }
            });
            b.searching++;
            service.getArtInCategory(d.art_category_id, null, null, function(c) {
                b.searching--;
                b.offset = 0;
                b.artItems = c;
                b.$$phase || b.$apply();
            });
            $(event.currentTarget).addClass('active').parent().siblings().find('a').removeClass('active');
            c(!1);
        };
        b.searchArt = function() {
            b.searching++;
            service.getArtInCategory(null, b.searchTerm, null, function(d) {
                b.searching--;
                b.artItems = d;
                b.categories = null;
                c(!0);
                b.$$phase || b.$apply();
            });
        };
        b.selectArt = function(c) {
            b.beforeSelect();
            state.dsUtils.addClipArt(c, function(c) {
                b.$$phase || b.$apply();
                b.clipArtAdded && (b.clipArtAdded(c), delete b.clipArtAdded);

            });
            b.close();
        };
        var c = function(d) {
            b.crumbs = [{
                label: "Design Ideas",
                click: function() {
                    b.categories = b.topCategories;
                    delete b.selectedCategory;
                    b.artItems = [];
                    c(!1);
                }
            }];
            if (d) {
                b.crumbs.push({
                    label: "Search:" + b.searchTerm,
                    click: function() {}
                });
            } else {
                for (var h = b.selectedCategory, f = []; h;) {
                    (function(c) {
                        f.push({
                            label: h.name,
                            click: function() {
                                b.selectCategory(c);
                            }
                        });
                    })(h), h = h.parentCategory;
                }
                f.reverse();
                b.crumbs = b.crumbs.concat(f);
            }
        };
        c(!1);
    };
    b.onShow = d;
    b.beforeSelect = function() {
        "undefined" !== typeof window.stop ? window.stop() : void 0 !== document.execCommand && document.execCommand("Stop", !1);
        b.artItems = [];
        b.$$phase || b.$apply();
    };
    d();
};
/**
 * Created by haolun on 15/6/17.
 */
/**
 * ActionController
 * @param b $scope
 * @param d $rootScope
 * @param c $routeParams
 * @param g $location
 * @param k $compile
 * @param h $sce
 * @constructor
 */
ui.controllers.ActionController = function(b, d, c, g, k, h) {
    b.showProductModal = function() {
        productChanger.showProductsModal();
    };
    b.showUploadModal = function() {
        mobileUploader.showMobileUploadModal();
    };
    b.showHelpModal = function() {
        var c = h.trustAsResourceUrl("//www.youtube.com/embed/" + ezdVars.HelpVideoOverview + "?autoplay=1");
        showModal("video", b, k, {
            videoUrl: c
        });
    };
    b.toggleZoom = function() {
        d.hasDesign(!0) ? state.designer.doZoom() : state.designer.zoomOut();
    };
    b.selectAll = function() {
        d.hasDesign(!0) && state.designer.selectAll();
    };
    b.copySelection = function() {
        var b = state.designer.copySelection();
        eventManager.trigger("elementsAdded", b);
    };
    b.openCategoryDrawer = function(c) {
        showModalDrawer("browseProductsSingle", b, k, {
            selectedCategory: c,
            inDrawer: !0,
            product: state.selectedProduct,
            noToggleOnClick: !0
        }, "759px", null);
    };
    b.showCheckoutModal = function() {
        delete state.designSaveResult;
        showModal("selectSizes", b, k);
    };
    b.SaveDesign = function() {
        if (!state.selectedDesign.isEmpty()) {
            state.designer.saveDesign({
                designId: state.selectedDesignID,
                productStyleId: state.selectedProductStyle.product_style_id,
                UserToken: state.currentUserToken,
                UserToken: state.activeUserToken,
                name: b.designName,
                notes: state.designer.design.information.notes || "",
                success: function(g, kk) {
                    state.designer.design.information.name = b.designName;
                    state.selectedDesignID = state.selectedDesign.design_id = kk.designID;
                    ajaxCallEnded("SaveDesignTemplate");
                    state.designSaveResult = kk;
                    kk.UserToken && (state.currentUserToken = parseInt(kk.UserToken.trim(), 10));
                    kk.UserToken && (state.activeUserToken = parseInt(kk.UserToken, 10));
                    kk.sessionToken && (state.currentSessionToken = kk.sessionToken.trim());
                    if (ezdVars.NextURL) {
                        var h = ezdVars.NextURL.replace("designID=0", "designID=" + state.selectedDesignID);
                        try {
                            window.onbeforeunload = null, window.top.onbeforeunload = null, window.top.location.href = h;
                        } catch (f) {
                            location.href = h;
                        }
                    }
                    showModal("saveDesignTip", b, k);
                    setTimeout(function() {
                        hideModalDrawer("#saveDesignTip");
                    }, 1000)
                },
                error: function(b) {
                    ajaxCallEnded("SaveDesignTemplate");
                    alert("保存时发生错误: " + b);
                }
            });
        }
        //state.selectedDesign.isEmpty() || showModal("saveAndShare", b, k);
    };
};
/**
 * Created by haolun on 15/6/17.
 */
/**
 * DesignerController
 * @param b $scope
 * @param d $rootScope
 * @param c $location
 * @param g $compile
 * @param k unknown......
 * @constructor
 */
ui.controllers.DesignerController = function(b, d, c, g, k, $location) {
    console.log('DesignerController init');
    d.isZoomedIn = !1;
    d.ezdLocation = ezdVars.DesignerLocation;
    d.UserToken = state.activeUserToken;
    d.UserToken = state.currentUserToken;
    d.AppToken = window.ezdAppToken;
    d.hasDesign = function(b) {
        return state.selectedDesign && !state.selectedDesign.isEmpty(b);
    };
    d.saving = false;
    d.alphabroderEmbed = "alphabroder" == ezdVars.EmbeddedPartner;
    d.videoTutorialsUrl = ezdVars.VideoTutorialsURL;
    d.isTestEnvironment = 0 < location.href.indexOf("open.dev.jzw.la") || 0 <= location.href.indexOf("file://");
    d.artToolsMode = ezdVars.ArtToolsMode = !ezdVars.ProductID && !ezdVars.DefaultProductID;
    ezdVars.EmbroideryMode = ezdVars.EmbroideryMode || "embroidery_demo" == ezdVars.AppURI;
    ezdVars.AutoZoom = ezdVars.AutoZoom && !ezdVars.ArtToolsMode;
    ezdVars.EnforceBoundaries = ezdVars.EnforceBoundaries || ezdVars.ArtToolsMode;
    ezdVars.StartPage && "Designs" !== ezdVars.StartPage && (ezdVars.StartPageCategoryID = null, ezdVars.StartPage = null);
    ezdVars.ArtToolsMode && (ezdVars.DisableProducts = !0, ezdVars.EnableNameNumbers = !1, ezdVars.EnableCartCheckout = !1, ezdVars.DisableAddToCart = !0, ezdVars.OrderSummary = !1, ezdVars.AutoZoom = !1, state.designer.activeSide.boundingBox.enableRegionBorder = !1);
    d.transparentClass = function(b) {
        b = getColorString(b);
        return "none" == b ? "isd-transparentColor" : "";
    };
    d.getColorName = function(b) {
        b = getColorString(b);
        if ("none" == b) {
            return "Transparent";
        }
        if (state.storeInkColors) {
            for (var c = 0; c < state.storeInkColors.length; c++) {
                var d = state.storeInkColors[c];
                if (d.html_color == b) {
                    return d.name;
                }
            }
            return b;
        }
    };
    d.getColorString = getColorString;
    d.isAdmin = ezdVars.Admin && "none" != ezdVars.Admin.toString().toLowerCase();
    d.disableShareDesign = ezdVars.DisableShareDesign;
    d.requireDesign = state.selectedProduct && 0 != state.selectedProduct.require_design;
    d.allowCheckout = !ezdVars.DisableAddToCart && !d.isAdmin;
    b.disableDistress = ezdVars.DisableDistress;
    b.disableGetQuote = !ezdVars.OrderSummary;
    d.disableUserArt = ezdVars.DisableUserArt;
    d.disableDesigns = ezdVars.DisableDesigns;
    b.disableClipArt = ezdVars.DisableClipArt;
    b.disableAllArt = ezdVars.DisableClipArt && ezdVars.DisableUserArt && ezdVars.DisableDesigns;
    b.disableProducts = ezdVars.DisableProducts;
    b.disableUploadImage = ezdVars.DisableUploadImage || ezdVars.DisableUploadRasterArt && ezdVars.DisableUploadVectorArt;
    b.disableNamesNumbers = !ezdVars.EnableNameNumbers || ezdVars.EmbeddedPartner || state.selectedProduct && "0" == state.selectedProduct.enable_team_name_numbers;
    b.showBranding = !ezdVars.PB;
    b.canUndo = !1;
    b.canRedo = !1;
    k = "/designs" == c.path() || "/login" == c.path() || "/uploadArt" == c.path() || "/savedArt" == c.path();
    ezdVars.DesignID || ezdVars.ArtID || ezdVars.StartPageCategoryID || "LANDING" != ezdVars.GreetBoxSetting || k || d.disableDesigns && d.disableUserArt || showModal("landingPage", b, g, {
        noCenter: !0
    });
    ezdVars.ArtID ? service.getArtByID(ezdVars.ArtID, function(c) {
        getImageData(c.thumb_cached, !1, function(d) {
            c.width || (c.width = d.width);
            c.height || (c.height = d.height);
            var g = eventManager.on("rendered", function() {
                eventManager.trigger("designColorsChanged");
                b.$$phase || b.$apply();
                g && g();
            });
            d = state.designer.addClipArt(c);
            d = d.id;
            for (var h = 0; h < c.art_colors.length; h++) {
                c.art_colors[h].value = c.art_colors[h].color, delete c.art_colors[h].color;
            }
            d = {
                table_name: "canvas_art",
                location: "Front",
                canvas_art_id: 0,
                canvas_art_rendered: c.thumb_jit,
                colors: c.art_colors,
                art: c,
                id: d,
                z: 1E6
            };
            state.selectedDesign.canvas_art.push(d);
            eventManager.trigger("designColorsChanged");
            eventManager.trigger("designChanged");
        });
    }) : "Designs" == ezdVars.StartPage && ezdVars.StartPageCategoryID && showModalDrawer("designIdeas", b, g, {
        selectedCategoryID: ezdVars.StartPageCategoryID
    });
    d.currencySymbol = ezdVars.CurrencySymbol || "$";
    d.prewImageHtml = '';
    d.step = 1;

    //检查按钮状态
    d.checkState = function(btnType){
        switch(btnType){
            case 'prev':
                if(d.step==1){
                    return false;
                }else{
                    return true;
                }
                break;
            case 'next':
                if(d.step==1 || d.step==2){
                    return true;
                }else{
                    return false;
                }
                break;
            case 'save':
                if(d.step==3){
                    return true;
                }else{
                    return false;
                }
                break;
        }
    };
    //数据验证和动画效果
    d.goToStep = function(step){
        if($(event.target).hasClass('isd-disabled') || $(event.target).parent().hasClass('isd-disabled')){
            return;
        }
        if(step == 2 || step == 3){
            if(!d.hasDesign()){return;}
        }
        var oldStep = d.step;
        switch (step) {
            case 1:
                c.path('/step1');
                break;
            case 2:
                if(oldStep == 1){//从第一步过来
                    if(state.isInitialDesign || state.isChangedDesign){//如果初始化或设计改变
                        $('.step').addClass('isd-disabled');//按钮置灰
                        //保存设计
                        service.ajaxCallStarted('disabledDesign', '正在处理，请稍后...');
                        b.SaveDesign(function(designID, activityID){
                            state.isInitialDesign = false;
                            eventManager.trigger('updateStep2View', function(){
                                $('.step').removeClass('isd-disabled');//恢复按钮
                                c.path('/step2');
                                b.$apply();
                            });
                        });
                    }else{
                        c.path('/step2');
                    }
                }else{
                    c.path('/step2');
                }
                break;
            case 3:
                //必须从第二步过来
                if(oldStep != 2){
                    return;
                }
                eventManager.trigger('validateActivity', function(){
                    if(ezdVars.UserToken == '0'){
                        var url = window.location.href;
                        window.location.href = '/login?relurl='+encodeURIComponent(url);
                    }else{
                        $('.step').addClass('isd-disabled');
                        eventManager.trigger('saveActivity', function(){
                            $('.step').removeClass('isd-disabled');
                            c.path('/step3');
                            b.$apply();
                        });
                    }
                });
                break;
        }
    }
    eventManager.on('toAddTextPath', function(){
        c.path('/addText');
        d.$$phase || d.$apply();
    });
    //仅有动画效果
    d.goStep = function(step) {
//        console.debug('goStep ', new Date());
        if(event){
            if($(event.target).hasClass('isd-disabled')){return;}
        }
        var oldStep = d.step;
        d.step = step;
        var step = $('.isd-step'),
            step1 = $('.isd-step .isd-step-1'),
            step2 = $('.isd-step .isd-step-2'),
            step3 = $('.isd-step .isd-step-3');
        switch (d.step) {
            case 1:
                if(oldStep==2){
                    step2.animate({
                        'left': '100%'
                    }, 300, function(){
                        step1.animate({
                            width: '100%'
                        }, 300, function(){
                            step1.find('.design-tool').animate({
                                'left': 10
                            }, 300, function() {
                                step1.find('.design-product').animate({
                                    'right': 10
                                }, 200, function() {

                                });
                            });
                        });
                    });
                }
                if(oldStep==3){
                    step3.animate({
                        'left': '100%'
                    }, 300, function(){
                        step1.animate({
                            width: '100%'
                        }, 300, function(){
                            step1.find('.design-tool').animate({
                                'left': 10
                            }, 300, function() {
                                step1.find('.design-product').animate({
                                    'right': 10
                                }, 200, function() {

                                });
                            });
                        });
                    });
                }
                break;
            case 2:
                if(oldStep==1){
                    step1.find('.design-product').animate({
                        'right': -360
                    }, 300, function() {
                        step1.find('.design-tool').animate({
                            'left': -310
                        }, 200, function() {
                            step1.animate({
                                'width': '50%'
                            }, 500, function(){
                                service.ajaxCallEnded('disabledDesign');
                            });
                            step2.animate({
                                left: '50%'
                            }, 500);
                        });

                    });
                }
                if(oldStep==3){
                    step3.animate({
                        left: '100%'
                    }, 500, function(){
                        step2.animate({
                            left: '50%'
                        }, 500);
                    });
                }
                state.designer.activeSide.boundingBox.hide();
                break;
            case 3:
                if(oldStep==1){
                    step1.find('.design-product').animate({
                        'right': -360
                    }, 300, function() {
                        step1.find('.design-tool').animate({
                            'left': -310
                        }, 200, function() {
                            step1.animate({
                                'width': '50%'
                            }, 500);
                            step3.animate({
                                left: '50%'
                            }, 500);
                        });
                    });
                }
                if(oldStep==2){
                    step2.animate({
                        left: '100%'
                    }, 500, function(){
                        step3.animate({
                            left: '50%'
                        }, 500);
                    });
                }
                state.designer.activeSide.boundingBox.hide();
                break;
        }
        b.$$phase || b.$apply();
    };
    eventManager.on('goStep', function(step){
        d.goStep(step);
    });
    d.prevStep = function(){
        d.goToStep(d.step-1);
    };
    d.nextStep = function(){
        d.goToStep(d.step+1);
    };
    d.done = function(){
        console.log('done');
        eventManager.trigger('doneActivity', function(){
            //TODO 成功后跳转地址
            state.isDone = true;
            setTimeout(function(){
                window.location.href = $('#activityDirect').attr('href');
            },2000);
            $('#doneDialog').show();
        });
    };
    d.save = function(){
        b.SaveDesign();
    };
    d.isStep1 = function(){
        if(d.step == 1){
            return true;
        }else{
            return false;
        }
    }

    b.SaveDesign = function(callback) {
        if (!state.selectedDesign.isEmpty()) {
            state.designer.saveDesign({
                designId: state.selectedDesignID,
                productStyleId: state.selectedProductStyle.product_style_id,
                UserToken: state.currentUserToken,
                UserToken: state.activeUserToken,
                name: b.designName,
                notes: state.designer.design.information.notes || "",
                success: function(g, kk) {
                    state.designer.design.information.name = b.designName;
                    state.selectedDesignID = state.selectedDesign.design_id = kk.designID;
                    ajaxCallEnded("SaveDesignTemplate");
                    state.designSaveResult = kk;
                    kk.UserToken && (state.currentUserToken = parseInt(kk.UserToken.trim(), 10));
                    kk.UserToken && (state.activeUserToken = parseInt(kk.UserToken, 10));
                    kk.sessionToken && (state.currentSessionToken = kk.sessionToken.trim());
                    callback && callback(state.selectedDesignID, kk.activityId);
                },
                error: function(b) {
                    ajaxCallEnded("SaveDesignTemplate");
                    alert("保存时发生错误: " + b);
                }
            });
        }
    };

    d.formatPrice = function(b) {
        var c = b;
        if ("undefined" === typeof b || "" === b || null === b || "object" == typeof b) {
            return "";
        }
        if ("string" == typeof b && (b = b.replace(d.currencySymbol, ""), !/^[0-9\.\,]+$/.test(b))) {
            return c;
        }
        b = b.toString();
        b = b.replace(/[^0-9\.]/, "");
        b = Math.round(100 * parseFloat(b));
        return b = d.currencySymbol + (b / 100).toFixed(2).toString();
    };
    d.formatNumber = function(b, c) {
        b = parseFloat(b);
        return b.toFixed(c);
    };
    b.undo = function() {
        state.designer.hm.back;
    };
    b.redo = function() {
        state.designer.hm.next;
    };
    d.url = function(b) {
        return b;
    };
    state.theme && state.theme.url && (d.url = state.theme.url);
    b.saveShareLabel = d.isAdmin || d.disableShareDesign || d.artToolsMode ? d.artToolsMode ? "Share" : "Save" : "Save & Share";
    eventManager.on("undoStackChanged", function() {
        b.canUndo = state.designer.hm.canUndo();
        b.canRedo = state.designer.hm.canRedo();
        b.$$phase || b.$apply();
    });
    eventManager.on("zoomChanged", function(c) {
        d.isZoomedIn = c.isZoomedIn;
        b.$$phase || b.$apply();
    });
    eventManager.on("userLoggedIn", function(b) {
        state.currentUserToken = b.UserToken;
        state.activeUserToken = b.UserToken;
        state.currentSessionToken = b.sessionToken;
        d.UserToken = b.UserToken;
        d.UserToken = b.UserToken;
        window.LoadLogonUserDS && LoadLogonUserDS(ezdVars.AppURI, ezdVars.AppToken, "", !1, b.UserToken, b.userName, b.userRole);
        window.AccountSignIn && window.AccountSignIn(b.userName, b.userRole);
    });
    eventManager.on("gotSession", function(b) {
        b.UserToken && (d.UserToken = state.activeUserToken = ezdVars.UserToken = b.UserToken);
        d.UserToken = state.currentUserToken = ezdVars.UserToken = b.UserToken;
        state.currentSessionToken = ezdVars.SessionToken = b.sessionToken;
    });
    eventManager.on("elementsSelected", function(d) {
        if (angular.isArray(d) && 1 != d.length) {
            1 < d.length && (c.path("/editMultipleSelection/"), b.$$phase || b.$apply());
        } else {
            d = angular.isArray(d) ? d[0] : d;
            var g = d.data.type;
            c.path("/edit" + ("text" == g ? "Text" : "vector" == g ? "Svg" : "embroideryText" == g ? "TextEmbroidery" : "embroideryArt" == g ? "ArtEmbroidery" : "Image") + "/" + d.data.id);
            b.$$phase || b.$apply();
        }
    });
    eventManager.on("designChanged", function() {
        state.selectedDesign && !state.selectedDesign.isEmpty(!0) && ezdVars.AutoZoom && setTimeout(function() {
            state.designer.zoomIn();
        }, 2E3);
    });
    eventManager.on("productChanged", function() {
        delete state.quoteInformation;
        "0" == state.selectedProduct.enable_team_name_numbers && delete state.namesNumbers;
        state.selectedDesign && !state.selectedDesign.isEmpty(!0) && ezdVars.AutoZoom && state.dsUtils.addRenderedHandlerOneTime(function() {
            setTimeout(function() {
                state.designer.zoomIn();
            }, 2E3);
        });
        d.requireDesign = 0 != state.selectedProduct.require_design;
    });
    eventManager.on("selectedProductLoaded", function() {
        b.disableNamesNumbers = !ezdVars.EnableNameNumbers || ezdVars.EmbeddedPartner || "0" == state.selectedProduct.enable_team_name_numbers;
        b.$$phase || b.$apply();
    });
    eventManager.on("elementsAdded", function(b) {
        b && b.length && eventManager.trigger("layersChanged");
    });
    eventManager.on("designChanged", function() {
        delete state.quoteInformation;
    });
    eventManager.on("designColorsChanged", function() {
        delete state.quoteInformation;
    });
    eventManager.on("elementDeleted", function(b) {
        state.selectedDesign.isEmpty(!0) && state.designer.zoomOut();
        eventManager.trigger("designColorsChanged");
        eventManager.trigger("layersChanged");
    });
    $(document).keydown(function(d) {
        var g = document.activeElement && ("INPUT" == document.activeElement.tagName || "TEXTAREA" == document.activeElement.tagName);
//        console.log(g);
        if (90 === d.which && d.ctrlKey && !g) {
            state.designer.hm.back, console.debug("Undo");
        } else {
            if (89 === d.which && d.ctrlKey && !g) {
                state.designer.hm.next, console.debug("Redo");
            } else {
                if ((46 == d.which || 8 == d.which) && !g) {
                    if (d = state.designer.activeSide.boundingBox.getSelections()) {
                        state.designer.deleteElements(d), c.path("/layers"), state.designer.addSnapshotEvent("deleteElement", d), b.$$phase || b.$apply();
                    }
                    return !1;
                }
                if (null != state.designer.activeSide.boundingBox.getSelections() && !g) {
                    var h = state.designer.activeSide.boundingBox.getSelections();
                    if (37 == d.keyCode) {
                        return state.designer.nudgeElement(null, "left", 1, h), !1;
                    }
                    if (38 == d.keyCode) {
                        return state.designer.nudgeElement(null, "up", 1, h), !1;
                    }
                    if (39 == d.keyCode) {
                        return state.designer.nudgeElement(null, "right", 1, h), !1;
                    }
                    if (40 == d.keyCode) {
                        return state.designer.nudgeElement(null, "down", 1, h), !1;
                    }
                    if (8 == d.keyCode && !g) {
                        return !1;
                    }
                }
            }
        }
//        console.log(g);
    });
    if (!k && (ezdVars.WelcomeVideo || ezdVars.WelcomeScreen)) {
        var h = {};
        h.welcomeScreen = ezdVars.WelcomeScreen;
        ezdVars.WelcomeVideo && (0 <= ezdVars.WelcomeVideo.indexOf("http") ? h.videoUrl = ezdVars.WelcomeVideo + "?autoplay=1" : h.videoUrl = "//www.youtube.com/embed/" + ezdVars.WelcomeVideo + "?autoplay=1");
        showModal("video", b, g, h);
    }
//    k || state.dsUtils.goToDefaultRoute(c);
    state.selectedDesign && !state.selectedDesign.isEmpty(!0) && ezdVars.AutoZoom && setTimeout(function() {
        state.designer.zoomIn();
    }, 2E3);
    state.cart && state.cart.orderID && (state.cart.orderID ? showModal("emailDesign", b, g) : showModal("reviewOrder", b, g));
};
/**
 * Created by haolun on 15/6/18.
 */
Namespace("ui.controllers");
ui.controllers.SaleGoalController = function($scope){

    $scope.saleGoal = 50;//销售目标
    $scope.preTotalProfit = 0;//预计利润
    $scope.products = [];//产品列表
    $scope.activityName = '';
    $scope.description = '';
    $scope.deadline = '7';
    $scope.deliveryType = false;
    $scope.freePostage = false;
    $scope.addressId = '';
    $scope.addressInfo = '';

    function getProductDetails(product, callback){
        service.getProductDetails(product.product_id, null, null, function(c) {
            for(var i=0; i<c.product_styles.length; i++){
                var style = c.product_styles[i];
                style.selected = false;
            }
            product.product_styles = c.product_styles;
            product.product_selected_styles = [];
            callback(product);
        });
    }

    function updateView(){
        calcTotalProfitByTotalCount();//计算预计利润
        calcProfitOfProductsByTotalCount();//计算产品列表利润
        $scope.$$phase || $scope.$apply();
    }

    /**
     * 从产品列表中取得单件最高服装成本
     */
    function getMaxUnitPrice(){
        var unitPrices = [];
        for(var i=0; i<$scope.products.length; i++){
            if($scope.products[i].unit_price){
                unitPrices.push($scope.products[i].unit_price);
            }else{
                var product = $scope.products[i];
                for(var j=0; j<product.product_selected_styles.length; j++){
                    var selectedStyle = product.product_selected_styles[j];
                    unitPrices.push(selectedStyle.unit_price);
                }
            }
        }
        unitPrices = quickSort(unitPrices, 0, unitPrices.length-1);
        return parseFloat(unitPrices[unitPrices.length-1]);
    }

    function getMaxUnitPriceFromProduct(product){
        if(product.unit_price){
            return product.unit_price;
        }else{
            var unitPrices = [];
            for(var j=0; j<product.product_selected_styles.length; j++){
                var selectedStyle = product.product_selected_styles[j];
                unitPrices.push(selectedStyle.unit_price);
            }
            unitPrices = quickSort(unitPrices, 0, unitPrices.length-1);
            return parseFloat(unitPrices[unitPrices.length-1]);
        }
    }

    /**
     * 从产品列表中取得单件最低售价
     */
    function getMinPrice(minCost){
        var prices = [];
        for(var i=0; i<$scope.products.length; i++){
            if(!$scope.products[i].price){
                $scope.products[i].price = parseInt(minCost*1.5);//默认售出为1.5倍成本
            }
            prices.push($scope.products[i].price);
        }
        prices = quickSort(prices, 0, prices.length-1);
        return parseFloat(prices[0]);
    }

    /**
     * 根据总数计算最低总利润
     * 单件成本＝服装单价(state.selectedProductStyle.unit_price)＋加工成本（颜色数量、总销量）
     * 单件利润＝售价(input)－单件成本
     * 预计利润＝单件利润（最低）＊销售目标（默认50）
     */
    function calcTotalProfitByTotalCount(){
        var saleNum = parseInt($scope.saleGoal);
        var machiningCostAll = calcTotalMachiningCost(saleNum);
        var maxUnitPrice = getMaxUnitPrice();//最高服装成本
        var oneCost = maxUnitPrice + machiningCostAll;//单件最高成本
        var onePrice = getMinPrice(oneCost);//单件最低售价
        var oneProfit = onePrice - oneCost;//单件最低利润
        var totalProfit = parseFloat(oneProfit.toFixed(2)) * saleNum;//最低总利润
        $scope.preTotalProfit = totalProfit < 0.1 ? 0 : totalProfit.toFixed(2);//Math.ceil(totalProfit);
    }

    /**
     * 根据总数（造成的加工成本变化而）调整单件售价
     */
    function calcProfitOfProductsByTotalCount(){
        var machiningCostAll = calcTotalMachiningCost(parseInt($scope.saleGoal));
        var products = $scope.products;
        for(var i=0; i<products.length; i++){
            var product = products[i];
            var oneCost = parseFloat(getMaxUnitPriceFromProduct(product)) + machiningCostAll;//单件成本
            var oneProfit = product.price - oneCost;
            product.profit = parseFloat(oneProfit.toFixed(2));
        }
        $scope.product = products;
    }

    function calcPropertyProduct(product){
        var machiningCostAll = calcTotalMachiningCost(parseInt($scope.saleGoal));
        var oneCost = getMaxUnitPriceFromProduct(product) + machiningCostAll;//单件成本
        var onePrice = parseInt(oneCost * 1.5);
        var oneProfit = onePrice - oneCost;
        product.price = onePrice;
        product.profit = parseFloat(oneProfit.toFixed(2));
    }

    eventManager.on('saleGoal-selectedProduct', function(product){
        $scope.selectedProduct = product;
    });

    function searchProductInArray(product){
        var arr = $scope.products;
        for(var i=0; i<arr.length; i++){
            var obj = arr[i];
            if(obj.product_id == product.product_id){
                return obj;
            }
        }
        return false;
    }

    $scope.addProduct = function(){
        if(!searchProductInArray($scope.selectedProduct)){
            calcPropertyProduct($scope.selectedProduct);
            var style = {
                color: $scope.selectedProduct.color,
                html_color: $scope.selectedProduct.html_color,
                product_style_id: $scope.selectedProduct.product_style_id
            };
            getProductDetails($scope.selectedProduct, function(c){
                c.product_selected_styles.push(style);
                for(var i=0; i<c.product_styles.length; i++){
                    var _style = c.product_styles[i];
                    if(style.product_style_id == _style.product_style_id){
                        _style.selected = true;
                    }
                }
                $scope.products.push(c);
                $scope.$$phase || $scope.$apply();
            });
        }else{
            console.info('重复添加');
        }
    };

    $scope.productPriceInputCheck = function(product){
        var value = event.target.value;
        if(value.match(/\d{1,}\.{0,1}\d{0,2}/g) != null){
            value = value.match(/\d{1,}\.{0,1}\d{0,2}/g)[0];
            event.target.value = value;
            product.price = value;
            updateView();
        }else{
            value = '';
            event.target.value = value;
        }
    };

    $scope.saleGoalInputChange = function(){
        var value = event.target.value;
        value = value.match(/[0-9]/g) != null ? value.match(/[0-9]/g).join('') : '';
        if(value>1000){
            value = 1000;
        }
        event.target.value = value;
        $('#point_slider').honest_slider('value', value);
    };

    $scope.saleGoalInputBlur = function(){
        var value  = event.target.value;
        value = value.match(/[0-9]/g) != null ? value.match(/[0-9]/g).join('') : 10;
        if(value<10){
            value=10;
        }
        if(value>1000){
            value = 1000;
        }
        event.target.value = value;
        $('#point_slider').honest_slider('value', value);
    };

    $scope.toggleColor = function($event, product, style){
        $event.stopPropagation();
        var existed = false, index;
        for(var i=0; i<product.product_selected_styles.length; i++){
            var _style = product.product_selected_styles[i];
            if(_style.product_style_id == style.product_style_id){
                existed = true;
                index = i;
                break;
            }
        }
        if(existed){
            //保留一个颜色不可以取消
            if(product.product_selected_styles.length == 1){
                return;
            }
            style.selected = false;
            product.product_selected_styles.splice(index, 1);
        }else{
            style.selected = true;
            product.product_selected_styles.push(style);
        }
        $($event.target).parent().toggleClass('active');
        $scope.$$phase || $scope.$apply();
    };

    $scope.isErrorProTotalProfit = function(){
        return $scope.preTotalProfit == 0 ? true : false;
    };

    $scope.isErrorProfitOfProduct = function(){
        var errorNum;
        for(var i=0; i<$scope.products.length; i++){
            var product = $scope.products[i];
            if(product.price.length == 0){
                errorNum = i;
                break;
            }
        }
        return errorNum == undefined ? false : true;
    };

    eventManager.on('validateActivity', function(callback){
        for(var i=0; i< $scope.products.length; i++){
            var product = $scope.products[i];
            if(product.price.length == 0){
//                alert('售价不能为空');
                $('#product_price_input_'+product.product_id).focus();
                return;
            }
        }
        if($scope.preTotalProfit <= 0){
            $scope.proTotalProfitError = true;
            $scope.$apply();
//            alert('预计利润不能小于等于零。');
            return;
        }
        callback();
    });

    eventManager.on('saveActivity', function(callback){

        var _products = [];
        for(var i=0; i< $scope.products.length; i++){
            var product = $scope.products[i];
            var _product = {};
            _product.id = product.product_id;
            _product.price = product.price;
            _product.styles = [];
            var styles = product.product_selected_styles;
            for(var j=0; j<styles.length; j++){
                _product.styles.push({
                    id: styles[j].product_style_id
                });
            }
            _products.push(_product);
        }
        var data = {
            dataType: 'json',
            appKey: ezdVars.AppToken,
            userToken: ezdVars.UserToken,
            type: 0,//0代表众筹，1代表采购
            activityId: ezdVars.ActivityID,
            designId: state.selectedDesignID,
            target: parseInt($scope.saleGoal),
            products: _products
        };
        $.ajax({
            url: '//' + ezdVars.ApiDomain + '/activity/save/',
            type: 'post',
            dataType: 'json',
            data: data,
            success: function(data){
                callback();
            },
            failure: function(){
                console.log('failure');
            }
        })
    });

    $scope.deleteProduct = function(product){
        var idx;
        for(var i=0; i<$scope.products.length; i++){
            var _product = $scope.products[i];
            if(_product.product_id == product.product_id){
                idx = i;
                break;
            }
        }
        if(idx != undefined){
            $scope.products.splice(idx, 1);
            updateView();
        }
    };

    //保存活动
    eventManager.on('doneActivity', function(callback){
        var data = {
            dataType: 'json',
            appKey: ezdVars.AppToken,
            userToken: ezdVars.UserToken,
            designId: ezdVars.DesignID,
            activityId: ezdVars.ActivityID,
            name: $scope.activityName,//0代表众筹，1代表采购
            description: $scope.description,
            deadline: $scope.deadline,
            deliveryType: $scope.deliveryType ? 'unity' : 'custom',
            freePostage: $scope.freePostage,//包邮
            addressId: $('[name=selectedAddressGroup]', '#addressTable').val(),
            addressInfo: $scope.addressInfo
        };
        if(data.name == null || data.name.trim().length == 0){
            $('[ng-model=activityName]').parents('.form-group').addClass('has-error');
            $('[ng-model=activityName]').focus();
            return;
        }else{
            $('[ng-model=activityName]').parents('.form-group').removeClass('has-error');
        }
        if(data.description == null || data.description.trim().length == 0){
            $('[ng-model=description]').parents('.form-group').addClass('has-error');
            $('[ng-model=description]').focus();
            return;
        }else{
            $('[ng-model=description]').parents('.form-group').removeClass('has-error');
        }
        $.ajax({
            url: '//' + ezdVars.ApiDomain + '/activity/saveActivityInfo/',
            type: 'post',
            dataType: 'json',
            data: data,
            success: function(data){
                callback();
            },
            failure: function(){
                console.log('failure');
            }
        })
    });

    eventManager.on('updateStep2View', function(callback){
        service.ajaxCallStarted('activityInfo', '获取活动数据');
        $('#activityDirect').attr('href', '/activity/'+ezdVars.ActivityID);
        $scope.products = [];
        $.ajax({
            url: '//' + ezdVars.ApiDomain + '/activity/activityInfo/',
            type: 'post',
            dataType: 'json',
            data: {
                dataType: 'json',
                appKey: ezdVars.AppToken,
                userToken: ezdVars.UserToken,
                activityId: ezdVars.ActivityID
            },
            success: function(data){
                $scope.saleGoal = data.target;
                $scope.activityName = data.name;
                $scope.description = data.description || '';
                $scope.deadline = (data.deadline == 0 ? "7": data.deadline);//TODO 默认值是0可能不对
                $scope.deliveryType = data.deliveryType == 'custom' ? false : true;
                $scope.freePostage = data.freePostage == '1' ? true : false;//包邮
                $scope.addressId = data.addressId;
                $scope.addressInfo = data.notes;

                var products = [];
                for(var i=0; i<data.products.length; i++){
                    var obj = data.products[i];
                    var product_selected_styles = [];
                    var thumburl_front;
                    for(var j=0; j<obj.product_selected_styles.length; j++){
                        var style = obj.product_selected_styles[j];
                        if(j==0){
                            thumburl_front = style.image;
                        }
                        product_selected_styles.push({
                            product_style_id: style.id,
                            color: style.color,
                            unit_price: style.unit_price,
                            html_color: style.html_color
                        });
                    }
                    var product_styles = [];
                    for(var j=0; j<obj.product_styles.length; j++){
                        var style = obj.product_styles[j];
                        for(var n=0; n<obj.product_selected_styles.length; n++){
                            var selected_style = obj.product_selected_styles[n];
                            if(style.id == selected_style.id){
                                style.selected = true;
                                break;
                            }
                        }
                        product_styles.push({
                            product_style_id: style.id,
                            color: style.color,
                            html_color: style.html_color,
                            unit_price: style.unit_price,
                            selected: style.selected ? true : false
                        });
                    }
                    products.push({
                        product_id: obj.id,
                        thumburl_front: thumburl_front,
                        name: obj.name,
                        product_selected_styles: product_selected_styles,
                        product_styles: product_styles,
                        price: obj.price,
                        manufacturer: obj.manufacturer_name,
                        unit_price: getMaxUnitPriceFromProduct(obj)
                    });
                }
                $scope.products = products;
                updateView();
                if(callback){
                    callback()
                };
                service.ajaxCallEnded('activityInfo');
            }
        });
    });

    $scope.changeDeliveryType = function(){
        $scope.deliveryType = !$scope.deliveryType;
    }

    //初始化
    setTimeout(function(){
        $('#point_slider').honest_slider({
            scope: $scope,
            scales: [
                [0, 10],
                [0.05, 50],
                [0.1, 100],
                [0.3, 300],
                [0.5, 500],
                [0.7, 700],
                [1, 1000]
            ],
            slider: function(value, setSaleGoal){
                setSaleGoal && ($scope.saleGoal = parseInt(value));//修改销售目标
                updateView();
            }
        });
    }, 1);

    /**
     * 计算印刷成本1
     * @return array
     */
    function get_print_cost() {
        var arr = [];
        var colorNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var saleNumbers = [10, 20, 30, 40, 50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
        var Const = [];
        Const[10] = [];
        Const[10][1] = 15;
        Const[10][10] = 45;
        for(var i=0, c = colorNumbers.length; i<c; i++){
            var x = colorNumbers[i];
            if(x >1 && x < 10){
                Const[10][c-x+1] = Const[10][c-x+2] - (Const[10][10] - Const[10][1]) / c;
            }
        }
        Const[20] = [];
        Const[20][1] = 13.5;
        Const[20][2] = 19.5;
        Const[20][3] = 22;
        Const[20][4] = 25;
        Const[20][5] = 27.5;
        Const[20][6] = 30.0;
        Const[20][7] = 32.0;
        Const[20][8] = 34.0;
        Const[20][9] = 38.0;
        Const[20][10] = 41.5;
        Const[500] = [];
        Const[500][1] = 7.5;
        Const[500][2] = 11.0;
        Const[500][3] = 12;
        Const[500][4] = 14;
        Const[500][5] = 15.0;
        Const[500][6] = 16.40;
        Const[500][7] = 17.0;
        Const[500][8] = 18.0;
        Const[500][9] = 20.0;
        Const[500][10] = 23.0;
        var Const1 = [];
        Const1[1] = 5;
        Const1[2] = 6.40;
        Const1[3] = 7.10;
        Const1[4] = 7.80;
        Const1[5] = 8.50;
        Const1[6] = 9.20;
        Const1[7] = 9.90;
        Const1[8] = 10.60;
        Const1[9] = 11.30;
        Const1[10] = 12.0;
        var _y = 10;
        for(var i=0; i<saleNumbers.length; i++){
            var y = saleNumbers[i];
            for(var j=0; j<colorNumbers.length; j++){
                var x = colorNumbers[j];
                var value = '';
                if(Const[y] && Const[y][x]){
                    value = Const[y][x];
                }else{
                    if(y == 30){
                        value = arr[_y][x] - (Const[_y][x] - Const1[x]) / saleNumbers.length;
                    }else if(y > 30){
                        value = arr[_y][x] - (Const[10][x] - Const1[x]) / saleNumbers.length;
                    }
                }
                if(arr[y] == undefined){
                    arr[y] = [];
                }
                arr[y][x] = value;
            }
            _y = y;
        }
        return arr;
    }

    /**
     * 计算印刷成本2
     * @param color_num  颜色数量
     * @param sale_num   销售数量
     */
    function calcMachiningCost(colorNum, saleNum) {
        if(colorNum == 0){
            return 0;
        }
        var price = null;
        var costs = get_print_cost();
        var preSaleNum = 10;
        var preColors = [];
        for(var _saleNum in costs){
            var colors = costs[_saleNum];
            if(saleNum == _saleNum){
                price = colors[colorNum] != undefined ? colors[colorNum] : null;
                break;
            }else if(saleNum < _saleNum){
                preColors = costs[preSaleNum];
                price = Math.formatFloat(preColors[colorNum] + (colors[colorNum] - preColors[colorNum]) * (saleNum - preSaleNum) / (_saleNum - preSaleNum) , 2);
                break;
            }
            preSaleNum = _saleNum;
        }
        return price == null ? 0 : price;
    }

    /**
     * 计算印刷成本3
     * @param color_num  颜色数量
     * @param sale_num   销售数量
     */
    function calcTotalMachiningCost(saleNum) {
        return calcMachiningCost(getDesignColors(), saleNum);
    }
};
/**
 * Created by haolun on 15/7/1.
 */
Namespace("ui.controllers");
ui.controllers.Step1Controller = function($scope, $compile, $routeParams, $location, $rootScope){
    eventManager.trigger('goStep', 1);
    $location.path('/addText');
};
/**
 * Created by haolun on 15/7/1.
 */
Namespace("ui.controllers");
ui.controllers.Step2Controller = function($scope, $compile, $routeParams, $location, $rootScope){
    eventManager.trigger('goStep', 2);
};
/**
 * Created by haolun on 15/7/1.
 */
Namespace("ui.controllers");
ui.controllers.Step3Controller = function($scope, $compile, $routeParams, $location, $rootScope){
    eventManager.trigger('goStep', 3);
};
/**
 * Created by haolun on 15/7/1.
 */
Namespace("ui.controllers");
ui.controllers.AddressController = function($scope, $compile, $routeParams, $location, $rootScope){

    $scope.onShow = function(g, attr){
        if(attr.addressId){
            var data = {
                dataType: 'json',
                appKey: ezdVars.AppToken,
                userToken: ezdVars.UserToken,
                addressId: attr.addressId
            };
            $.ajax({
                url: '//' + ezdVars.ApiDomain + '/Address/get/',
                type: 'post',
                data: data,
                success: function(data){
                    if(data){
                        console.log(data);
                    }
                }
            });
        }else{
            $scope.address = {
                name: '',
                tel: '',
                province: $scope.province,
                city: $scope.city,
                area: $scope.area,
                address: ''
            };
            $scope.$apply();
        }
    };

    $scope.saveAndUse = function(){
        var data = {
            dataType: 'json',
            appKey: ezdVars.AppToken,
            userToken: ezdVars.UserToken,
            name: $scope.address.name,
            tel: $scope.address.tel,
            province: $scope.province,
            city: $scope.city,
            area: $scope.area,
            addr: $scope.address.address
        };
        var name = $('[ng-model="address.name"]');
        if (!name.val()) {
            name.focus().parents('.form-group').addClass('has-error').find('label.control-label').text('姓名不能为空');
            return false;
        }else{
            name.parents('.form-group').removeClass('has-error').find('label.control-label').text('姓名');
        }
        var tel = $('[ng-model="address.tel"]');
        if (!tel.val()) {
            tel.focus().parents('.form-group').addClass('has-error').find('label.control-label').text('手机不能为空');
            return false;
        }else{
            tel.parents('.form-group').removeClass('has-error').find('label.control-label').text('手机号码');
        }
        var filter  = /^((1[0-9]{1})+\d{9})$/;
        if (!filter.test(tel.val())) {
            tel.focus().parents('.form-group').addClass('has-error').find('label.control-label').text('手机号码格式错误');
            return false;
        }else{
            tel.parents('.form-group').removeClass('has-error').find('label.control-label').text('手机号码');
        }
        var address = $('[ng-model="address.address"]');
        if (!address.val()) {
            address.focus().parents('.form-group').addClass('has-error').find('label.control-label').text('详细地址不能为空');
            return false;
        }else{
            address.parents('.form-group').removeClass('has-error').find('label.control-label').text('详细地址');
        }
        var btn = $(event.target);
        btn.text('保存中...');
        $.ajax({
            url: '//' + ezdVars.ApiDomain + '/Address/save/',
            type: 'post',
            data: data,
            success: function(data){
                if(data){
                    btn.text('保存并使用该地址');
                    eventManager.trigger('loadAddressList', data.id);
                    $scope.close();
                }
            }
        });
    }

    $scope.save = function(){
        var data = {
            dataType: 'json',
            appKey: ezdVars.AppToken,
            userToken: ezdVars.UserToken,
            id: $scope.address.id,
            name: $scope.address.name,
            tel: $scope.address.tel,
            province: $scope.province,
            city: $scope.city,
            area: $scope.area,
            addr: $scope.address.address
        };
        $.ajax({
            url: '//' + ezdVars.ApiDomain + '/Address/save/',
            type: 'post',
            data: data,
            success: function(data){
                debugger;
            }
        });
    };
};
/**
 * Created by haolun on 15/7/1.
 */
Namespace("ui.controllers");
ui.controllers.AddressListController = function($scope, $compile, $routeParams, $location, $rootScope){



    function load(callback){
        $scope.addressList = [];
        var defaultId;
        $.ajax({
            url: '//' + ezdVars.ApiDomain + '/Address/getList/',
            type: 'post',
            data: {
                dataType: 'json',
                appKey: ezdVars.AppToken,
                userToken: ezdVars.UserToken,
                default: true
            },
            success: function(data){
                if(data){
                    for(var i=0; i<data.length; i++){
                        var obj = data[i].UserAddress;
                        if(i==0){
                            defaultId = obj.id;
                        }
                        $scope.addressList.push({
                            id: obj.id,
                            receiver: obj.name,
                            address: obj.province + obj.city + obj.county + obj.address,
                            tel: obj.mobile
                        });
                    }
                    $scope.$apply();
                    if(callback){
                        callback(defaultId);
                    }
                }
            }
        });
    }

    eventManager.on('addressSelectedRow', function(id){
        selectedRow(id);
        $scope.$apply();
    });

    function selectedRow(id){
        $('#addressTable').find('tr').removeClass('active');
        $('input[value='+id+']').prop('checked', true).parents('tr').addClass('active');
    }

    eventManager.on('loadAddressList', function(id){
        if(id){
            load(function(){
                selectedRow(id);
                $('#addressListTable').scrollTop(0);
            });
        }else{
            load();
        }
    });

    $scope.selectAddress = function(){
        if(event.target.tagName == 'A'){
            return false;
        }
        var radio = $(event.target).parents('tr').find('input[type=radio]');
        //如果不是点击的input radio
        if(radio[0] != event.target){
            //如果radio是未选中状态
            if(radio.prop('checked') == false){
                radio.prop('checked', true);
                selectedRow(radio.attr('value'));
            }
        }else{
            selectedRow(radio.attr('value'));
        }
    }

    load(function(defaultId){
        if(defaultId){
            selectedRow(defaultId);
        }
    });
};
ui.controllers.DesignColorsController = function(b, d, c) {
    b.canPrint = true;
    b.price_preview = (parseFloat(state.selectedProductStyle.unit_price)+10).toFixed(2);
    b.maxScreenPrintColors = ezdVars.MaxScreenPrintColors;
    var g = function() {
        //b.colorsInUse = state.dsUtils.getColorsInUse(null, false, false);
        //b.numColors = state.dsUtils.getColorsInUse(null, false, true).length;
        updatePricePreview();
        b.$$phase || b.$apply();
        b.canPrint = state.dsUtils.canPrintDesign();

    };
    eventManager.on("designCanvasChanged", g);
    eventManager.on("designChanged", g);
    eventManager.on("designColorsChanged", g);
    eventManager.on("undoRedo", g);
    state.dsUtils.addRenderedHandlerOneTime(g);
    g();
//    function calcMachiningCost(colorCount, totalCount){
//        var money = 10-((10-2)/990*totalCount);
//        money += colorCount;
//        return colorCount == 0 ? 0 : money;
//    }
    /**
     * 计算印刷成本1
     * @return array
     */
    function get_print_cost() {
        var arr = [];
        var colorNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var saleNumbers = [10, 20, 30, 40, 50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
        var Const = [];
        Const[10] = [];
        Const[10][1] = 15;
        Const[10][10] = 45;
        for(var i=0, c = colorNumbers.length; i<c; i++){
            var x = colorNumbers[i];
            if(x >1 && x < 10){
                Const[10][c-x+1] = Const[10][c-x+2] - (Const[10][10] - Const[10][1]) / c;
            }
        }
        Const[20] = [];
        Const[20][1] = 13.5;
        Const[20][2] = 19.5;
        Const[20][3] = 22;
        Const[20][4] = 25;
        Const[20][5] = 27.5;
        Const[20][6] = 30.0;
        Const[20][7] = 32.0;
        Const[20][8] = 34.0;
        Const[20][9] = 38.0;
        Const[20][10] = 41.5;
        Const[500] = [];
        Const[500][1] = 7.5;
        Const[500][2] = 11.0;
        Const[500][3] = 12;
        Const[500][4] = 14;
        Const[500][5] = 15.0;
        Const[500][6] = 16.40;
        Const[500][7] = 17.0;
        Const[500][8] = 18.0;
        Const[500][9] = 20.0;
        Const[500][10] = 23.0;
        var Const1 = [];
        Const1[1] = 5;
        Const1[2] = 6.40;
        Const1[3] = 7.10;
        Const1[4] = 7.80;
        Const1[5] = 8.50;
        Const1[6] = 9.20;
        Const1[7] = 9.90;
        Const1[8] = 10.60;
        Const1[9] = 11.30;
        Const1[10] = 12.0;
        var _y = 10;
        for(var i=0; i<saleNumbers.length; i++){
            var y = saleNumbers[i];
            for(var j=0; j<colorNumbers.length; j++){
                var x = colorNumbers[j];
                var value = '';
                if(Const[y] && Const[y][x]){
                    value = Const[y][x];
                }else{
                    if(y == 30){
                        value = parseFloat((arr[_y][x] - (Const[_y][x] - Const1[x]) / saleNumbers.length).toFixed(2));
                    }else if(y > 30){
                        value = parseFloat((arr[_y][x] - (Const[10][x] - Const1[x]) / saleNumbers.length).toFixed(2));
                    }
                }
                if(arr[y] == undefined){
                    arr[y] = [];
                }
                arr[y][x] = value;
            }
            _y = y;
        }
        return arr;
    }

    /**
     * 计算印刷成本2
     * @param color_num  颜色数量
     * @param sale_num   销售数量
     */
    function calcMachiningCost(colorNum, saleNum) {
        var price = null;
        var costs = get_print_cost();
        var preSaleNum = 10;
        var preColors = [];
        for(var _saleNum in costs){
            var colors = costs[_saleNum];
            if(saleNum == _saleNum){
                price = colors[colorNum] != undefined ? colors[colorNum] : null;
                break;
            }else if(saleNum < _saleNum){
                preColors = costs[preSaleNum];
                price = preColors[colorNum] + (colors[colorNum] - preColors[colorNum]) * (saleNum - preSaleNum) / (_saleNum - preSaleNum);
                break;
            }
            preSaleNum = _saleNum;
        }
        return price == null ? 0 : parseFloat(price.toFixed(2));
    }

    function updatePricePreview() {
//        var ColorData = state.dsUtils.getPricingColorData();
//        var machiningCostFront = calcMachiningCost(ColorData.usrColors.front.length, 50);//50件加工成本
//        var machiningCostBack = calcMachiningCost(ColorData.usrColors.back.length, 50);//50件加工成本
//        var machiningCostRight = calcMachiningCost(ColorData.usrColors.right.length, 50);//50件加工成本
//        var machiningCostLeft = calcMachiningCost(ColorData.usrColors.left.length, 50);//50件加工成本
//        var machiningCostAll = machiningCostFront + machiningCostBack + machiningCostRight + machiningCostLeft;
//        var oneCost = machiningCostAll + parseFloat(state.selectedProductStyle.unit_price);
        var oneCost = calcMachiningCost(getDesignColors(), 50) + parseFloat(state.selectedProductStyle.unit_price);
        if(getDesignColors() == 0){
            b.price_preview = (oneCost+10).toFixed(2);
        }else{
            b.price_preview = (oneCost).toFixed(2);
        }
    };

};
ui.controllers.ProductColorsController = function(b, d, c) {
    d = function() {
        service.getProductColors(state.selectedProductID, function(c) {
            b.styles = c;
            b.$$phase || b.$apply();
        });
        state.selectedProductStyle && (b.colorDescription = state.selectedProductStyle.color, b.colorDescriptionDrawer = state.selectedProductStyle.color, b.shortDescription = state.selectedProduct.name, b.selectedColor = state.selectedProductStyle.color, b.selectedColorDrawer = state.selectedProductStyle.color, b.hoverStyle = state.selectedProductStyle);
        b.selectStyle = function(c) {
            var d = parseInt(c.product_style_id, 10);
            state.selectedProductStyle = b.selectedProductStyle = c;
            state.selectedProductStyleID = c.product_style_id;
            b.colorDescription = c.color;
            b.colorDescriptionDrawer = c.color;
            b.selectedColor = c.color;
            b.hoverStyle = state.selectedProductStyle;
            0 < d ? state.designer.parseProduct(state.selectedProductID, state.selectedProductStyleID) : (state.designer.product.information.html_color = c.html_color, $("#raphael").css("background-color", getColorString(c.html_color)));
        };
    };
    b.mouseOverStyle = function(c) {
        b.hoverStyle = c;
    };
    b.mouseOutStyle = function(c) {
        b.hoverStyle = state.selectedProductStyle;
    };
    d();
    eventManager.on("productChanged", d);
    eventManager.on("selectedProductLoaded", d);
};
ui.controllers.AddTextController = function(b, d, c, $location, k) {
    $('.design-tool .nav-tabs li').removeClass('active');
    $('.design-tool .nav-tabs li:eq(0)').addClass('active');

    b.addTextFromUI = function() {
        var text = b.text.text;
        if (!text) {
            $("#isd-text-textarea").focus();
            return false;
        }
        var d = new ui.FontManager(!1),
            g = state.dsUtils.getColorsInUse();
        d.getFontDefaults(function(d) {
            var f = function() {
                var f = d.font;
                state.dsUtils.addRenderedHandlerOneTime(function() {
                    searchInArray(g, text.color) || eventManager.trigger("designColorsChanged");
                    eventManager.trigger("layersChanged");
                    $location.path("/editText/" + text.id);
                    b.$$phase || b.$apply($('#isd-text-textarea').focus());
                });
                var h = findMatch(state.storeInkColors, function(b) {
                    return "#000000" == b.html_color;
                });
                h || (h = state.storeInkColors[0]);
                text = state.designer.addNewText(f, {
                    fill_color: h.html_color,
                    stroke_color: h.html_color
                }, text).object;
            };
            "Microsoft" != d.font.fontFamily ? service.loadFont(d.font, f, text) : f();
        });
        b.$$phase || b.$apply();
    };

    //var isAddText = b.text && b.text.text.trim().length == 0 ? true : false
    b.isAddText = function(){
        if(b.text){
            return b.text.text.trim().length == 0 ? true : false;
        }else{
            return true;
        }
    };
}
ui.controllers.BrowseProductsController = function(b, d, c, g) {
    b.hideProductPricing = ezdVars.HideProductPricing;
    var designerSvg = $("#designerContainer svg");
    b.showMore = false;

    b.previewProductStyle = function() {
        $(document).on('mouseover', '.isd-product-colors li.colortip__color', function(e) {
            designerSvg.css('background-color', $(this).css('background-color'));//.find('image').attr('href', $(this).attr('preview-src'));
            e.stopPropagation();
        }).on('mouseout', '.isd-product-colors li.colortip__color', function(e) {
            designerSvg.css('background-color', "#" + state.selectedProductStyle.html_color)//.find('image').attr('href', state.selectedProductStyle.selectedRegion.imgurl);
            e.stopPropagation();
        });

    };
    b.showmore = function(){
        $('.isd-product-colors').toggleClass('isd-product-colors-auto-width');
        $('.isd-product-colors').find("li.colortip__color:gt(3)").toggle();
        b.$$phase || b.$apply();
    }

    eventManager.on("browseProducts-productSelected", function(c) {
        b.selectProduct(c);

    });

    b.selectProduct = function(c, style) {
        if (c.product_id != state.selectedProductID || !style) {
            service.getProductDetails(c.product_id, null, null, function(c) {
                c.name = g.trustAsHtml(c.name);
                c.long_description = g.trustAsHtml(c.long_description);
                b.product = c;
                b.selectProductStyle(style || c.defaultStyle);
                b.loadProduct();
                eventManager.trigger('updatePricePreview');
                b.$$phase || b.$apply();
            });
        } else {
            if (style && style.product_style_id != state.selectedProductStyleID) {
                b.selectProductStyle(style || c.defaultStyle);
                b.loadProduct();
            }
            eventManager.trigger('updatePricePreview');
            b.$$phase || b.$apply();
        }
        $('.isd-product-colors').addClass('isd-product-colors-auto-width').find('ul li:not(.more)').each(function(index,ele){
            if(index>3){
                $(ele).hide();
            }
        });
        return false;
    };

    //???
    b.selectProductStyle = function(c) {
        b.productStyle = b.hoverStyle = c;
        b.selectProductRegion(c.defaultRegion);
        b.colorDescriptionDrawer = b.productStyle;//???
    };

    b.mouseOverStyle = function(c) {
        b.hoverStyle = c;
    };

    b.mouseOutStyle = function(c) {
        b.hoverStyle = b.productStyle;
    };

    b.selectProductRegion = function(c) {
        b.productRegion = c;
    };

    b.loadProduct = function() {
        state.selectedProduct = b.product;
        state.selectedProductID = b.product.product_id;
        state.selectedProductStyle = b.productStyle;
        state.selectedProductStyle.selectedRegion = state.selectedProductStyle.defaultRegion;
        state.selectedProductStyleID = b.productStyle.product_style_id;
        eventManager.trigger("productChanged", null);//???
        eventManager.trigger("designCanvasChanged", null);//???
        state.designer.parseProduct(b.product.product_id, b.productStyle.product_style_id);//???
    };
};
ui.controllers.EditTextController = function(b, d, c, g, k) {
//    window.rightSideLoaded && rightSideLoaded(b);
    var h = null,
        f = null;
    $('.design-tool .nav-tabs li').removeClass('active');
    $('.design-tool .nav-tabs li:eq(0)').addClass('active');
    b.ThemeName = ezdVars.ThemeName;


    b.shapes = [
        {
            name: "none",
            id: 0,
            image: "/images/shape-none.png"
        }, {
            name: "curve",
            id: 7,
            image: "/images/shape-curve.png"
        }, {
            name: "arch",
            id: 3,
            image: "/images/shape-arch.png"
        }, {
            name: "archway",
            id: 2,
            image: "/images/shape-archway.png"
        }, {
            name: "bulge",
            id: 4,
            image: "/images/shape-bulge.png"
        }, {
            name: "bird's eye",
            id: 5,
            image: "/images/shape-birds-eye.png"
        }, {
            name: "pinch",
            id: 1,
            image: "/images/shape-pinch.png"
        }, {
            name: "slope",
            id: 6,
            image: "/images/shape-slope.png"
        }
    ];
    var m = function() {
        f = new ui.FontManager(!1);
        if (c.id || b.navigation && b.navigation.currentItem) {
            if (c.id) {
                if (h = searchInArray(state.selectedDesign.canvas_text, c.id, "id"), !h) {
                    g.path("/addText");
                    return;
                }
            } else {
                h = b.navigation.currentItem;
            }
            b.action = "Edit";
            b.$parent.selectedElement = h;
            b.elementOriginalRotation = h.rotation;
            eventManager.trigger("elementSelected", h.id);
        }
        if (h) {
            b.text = h;
            delete h.previewHtml;

            b.isMultiLine = h && h.text && 1 < h.text.split("\n").length;
            "undefined" === typeof h.lineHeight && (h.lineHeight = 0);
            "undefined" === typeof h.alignment && (h.alignment = 0);
            h.selectedShape = 0.01 < Math.abs(h.arching) ? b.shapes[1] : findMatch(b.shapes, function(b) {
                return b.id == h.wrap;
            });
            b.oldTextValue = h.text;
            var d = b.fontCategories = f.getCategories();
            h.fontId && h.fontStyleId ? searchInArray(d, h.fontStyleId, "font_style_id") && f.getFontsByCategory(h.fontStyleId, function(c) {
                b.fonts = c;
                if (c = searchInArray(c, h.fontId, "font_id")) {
                    h.fontObject = c;
                }
                b.$$phase || b.$apply();
            }) : console.log("错误:  无法找到对应的字体或字体样式.");
            b.$$phase || b.$apply();
        }



    };
    b.$on("sidePanelNavigation", function() {
        "editText" == b.navigation.sidePanel && m();
    });

    (c.id || "/addText" == g.$$path) && m();


    b.fontCategorySelected = function() {
        f.getFontsByCategory(b.text.fontStyleId, function(c) {
            b.fonts = c;
            var d = searchInArray(b.fontCategories, b.text.fontStyleId, "font_style_ID");
            d.fonts = c;
            for (c = 0; c < b.fonts.length; c++) {
                b.fonts[c].fontStyle = d;
            }
            b.$$phase || b.$apply();
        });
    };
    b.toggleFontList = function() {
        $('.ds-fonts .dropdown-menu').find('select').off('click').on('click', function(e) {
            e.stopPropagation();
        });
    };

    b.isEditText = function(){
        return b.text && b.text.text.trim().length == 0 ? true : false;
    }

    b.updateText = function(){
        b.updateTextFont(function(){
            b.updateTextValue();
        });
    };
    b.updateTextFont = function(callback) {
        var c = searchInArray(b.fonts, h.fontId, "font_id");
        h.fontObject = c;
        state.designer.updateTextFont(h.id, c, c.font_style_id || c.old_font_style_id, callback);
        state.designer.activeSide.boundingBox.checkElementSize(h);
    };
    b.updateTextValue = function() {
        b.isMultiLine = h.text && 1 < h.text.split("\n").length;//是否多行
        var c = 1 < (b.oldTextValue + "").split("\n").length;//oldText是否多行
        state.designer.updateTextValue(h.id, h.text);
        b.oldTextValue = h.text;
        c && !b.isMultiLine && b.changeTextShape(h.selectedShape);//如果新文本和老文本行数不一致，则调用b.changeTextShape(h.selectedShape)
        state.designer.activeSide.boundingBox.checkElementSize(h);
    };
    b.timerChange = function() {
        eventManager.trigger("textChanged");
        state.designer.chanPropertyEvent();
    };
    b.increaseStrokeWidth = function() {
        var b = 1E-8 >= Math.abs(h.stroke);
        h.stroke = Math.round(100 * Math.min(20, h.stroke + 0.2)) / 100;
        state.designer.updateTextStrokeWidth(h.id, h.stroke);
        h.stroke_old = h.stroke;
        b && eventManager.trigger("designColorsChanged");
    };
    b.decreaseStrokeWidth = function() {
        var b = 0.20000001 >= h.stroke;
        h.stroke = Math.round(100 * Math.max(0, h.stroke - 0.2)) / 100;
        state.designer.updateTextStrokeWidth(h.id, h.stroke);
        h.stroke_old = h.stroke;
        b && eventManager.trigger("designColorsChanged");
    };
    b.strokeWidthChanged = function() {
        if (null != h) {
            var b = 1E-7 >= Math.abs(h.stroke_old) || 1E-7 >= Math.abs(h.stroke);
            h.stroke = Math.round(10 * h.stroke) / 10;
            state.designer.updateTextStrokeWidth(h.id, h.stroke);
            h.stroke_old = h.stroke;
            b && eventManager.trigger("designColorsChanged");
        }
    };
    b.increaseShadowWidth = function() {
        var b = 0 == h.shadow_value;
        h.shadow_value = Math.min(20, h.shadow_value + 0.2);
        state.designer.updateShadowValue(h.id, h.shadow_value);
        b && eventManager.trigger("designColorsChanged");
    };
    b.decreaseShadowWidth = function() {
        var b = 1 == h.shadow_value;
        h.shadow_value = Math.max(0, h.shadow_value - 0.2);
        state.designer.updateShadowValue(h.id, h.shadow_value);
        b && eventManager.trigger("designColorsChanged");
    };
    b.increaseTextSpacing = function() {
        state.designer.startEvent("changeTextSpacing", []);
        h.letterSpacing = Math.round(100 * (h.letterSpacing + 0.05)) / 100;
        state.designer.activeSide.boundingBox.checkElementSize(h);
        state.designer.endEvent("changeTextSpacing", []);
    };
    b.decreaseTextSpacing = function() {
        state.designer.startEvent("changeTextSpacing", []);
        h.letterSpacing = Math.round(100 * (h.letterSpacing - 0.05)) / 100;
        state.designer.endEvent("changeTextSpacing", []);
    };
    b.increaseTextHeight = function() {
        var b = Math.min(20, h.lineHeight + 1);
        b != h.lineHeight && (h.lineHeight = b);
    };
    b.decreaseTextHeight = function() {
        var b = Math.max(0, h.lineHeight - 1);
        b != h.lineHeight && (h.lineHeight = b);
    };
    b.lineHeightChanged = function() {
        state.designer.setTextHeight(h.id, h.lineHeight);
    };
    b.nudge = function(b) {
        ezd.nudgeElement(h.id, b, 1);
    };
    b.increaseShapeSize = function() {
        h.selectedShape && "curve" == h.selectedShape.name ? h.arching = Math.round(Math.min(360, h.arching + 5)) : h.selectedShape && "none" != h.selectedShape.name && (h.wrapAmmount = Math.min(10, h.wrapAmmount + 1));
    };
    b.decreaseShapeSize = function() {
        h.selectedShape && "curve" == h.selectedShape.name ? h.arching = Math.round(Math.min(360, h.arching - 5)) : h.selectedShape && "none" != h.selectedShape.name && (h.wrapAmmount = Math.min(10, h.wrapAmmount - 1));
    };
    b.changeTextShape = function(c) {
        c || (c = h.selectedShape || b.shapes[0]);
        h.selectedShape = c;
        h.wrap = "curve" != c.name ? c.id : 0;
        "curve" == c.name ? 0 == h.arching && (h.arching = 45) : h.wrapAmmount || (h.wrapAmmount = 5);
    };
    b.changeAlignment = function(b) {
        state.designer.changeElementAlignment(h.id, b);
    };
    b.changeTextAlignment = function(b) {
        h.alignment = b;
    };
    b.showStrokeColorModal = function(event) {
        showColorModal(b, d, k, {
            currentColor: h.strokeColor,
            onSelect: function(c) {
                h.strokeColor = c;
                0 == h.stroke && b.increaseStrokeWidth();
                state.designer.updateTextStrokeColor(h.id, c);
                eventManager.trigger('updatePricePreview', true);
            },
            allowTransparent: !1
        }, event);
    };
    b.showShadowColorModal = function(event) {
        showColorModal(b, d, k, {
            currentColor: h.shadow_color,
            onSelect: function(c) {
                h.shadow_color = c;
                0 == h.shadow_value && b.increaseShadowWidth();
                state.designer.updateShadowColor(h.id, c);
                eventManager.trigger('updatePricePreview', true);
            },
            allowTransparent: !1
        }, event);
    };
    b.showFillColorModal = function(event) {
        showColorModal(b, d, k, {
            currentColor: h.color,
            onSelect: function(b) {
                h.color = b;
                state.designer.updateTextColor(h.id, b);
                eventManager.trigger('updatePricePreview', true);
            },
            allowTransparent: !0
        }, event);
    };
    var q = [];
    q.push(eventManager.on("undoRedo", function(c) {
        b && !b.$$destroyed && !b.$$phase && c.change && c.change.length && findMatch(c.change, function(b) {
            return b.id == canvasText.id;
        }) && (b.$$phase || b.$apply());
    }));
    q.push(eventManager.on("productChanged", function() {
        state.dsUtils.addRenderedHandlerOneTime(function() {
            m();
        });
    }));
    q.push(eventManager.on("elementDeleted", function(d) {
        !c.id || 0 > g.path().indexOf("editText") || (d = searchInArray(state.selectedDesign.canvas_text, c.id, "id"), !b || d || b.$$destroyed || (g.path("/addText"), b.$$phase || b.$apply()));
    }));
    b.$on("$destroy", function() {
        if (q) {
            for (var b = 0; b < q.length; b++) {
                q[b]();
            }
        }
    });
};
ui.controllers.ProductCategoriesController = function(b, d, c, g) {

    b.selectedProductID = state.selectedProductID || 0;
    b.products = [];
    b.categories = [];

    b.selectCategoryByID = function() {
        var c = findMatch(b.categoriesFlat, function(c) {
            return c.id == b.selectedCategoryID;
        });
        c && b.selectCategory(c.category);
    };
    b.selectCategory = function(c) {
        b.selectedCategoryID = c.product_category_id;
        b.product = null;
        b.selectedCategory = c;
        b.categories = c.children ? c.children : [];
        service.getProductsByCategory(c.product_category_id, null, false, function(c) {
            b.products = c;
            for (var d = 0; d < c.length; d++) {
                c[d].name = g.trustAsHtml(c[d].name);
                c[d].unit_price = parseFloat(c[d].unit_price);
            }
            b.categories = [];
            b.products.product = c[0];
            b.$apply();
        });
    };

    b.selectProductChange = function(){
        eventManager.trigger('saleGoal-selectedProduct', b.products.product);
    };

    b.selectProduct = function(product, event) {
        var li = event ? $(event.currentTarget) : $('.design-product li.list-group-item:eq(0)')
        var top = 50;
        if (li.length) {
            if (li.hasClass('active')) {
                return false;
            }
            li.siblings().removeClass('active');
            li.addClass('active');
            top = li.position().top;
        }
        $('.isd-product-colors').animate({
            top: top
        }, 300);

        eventManager.trigger("browseProducts-productSelected", product);
    };

    service.getProductCategories(function(c) {
        b.topCategories = b.categories = c;
        var d = [];
        var m = function(categories, c) {
            for (var i = 0; i < categories.length; i++) {
                var k = categories[i];
                var p = k.name;
                for (var j = 0; j < c; j++) {
                    p = "\u00a0\u00a0\u00a0\u00a0" + p;//缩紧＝4空格
                }
                p = g.trustAsHtml(p);
                d.push({
                    name: p,
                    id: k.product_category_id,
                    isParent: k.children && k.children.length,
                    category: k
                });
                k.children && k.children.length && m(k.children, c + 1);
            }
        };
        m(c, 0);
        b.categoriesFlat = d;
        b.selectedCategoryID = b.selectedCategory ? b.selectedCategory.product_category_id : b.topCategories[0].product_category_id;
        b.selectCategoryByID();
        b.$apply();
    });

    b.openDetailPage = function(id){
        window.open('/design/productInfo/'+id);
    };
};
ui.controllers.ProductRegionController = function(b, d, c) {

    b.showingInlineModal = true;
    b.loadPreview = function(c, d) {
        setTimeout(function() {
            if (null != document.getElementById("canvasPreview" + c)) {
                //state.designer.sides[d].boundingBox.hideRegion();
                state.designer.sides[d].boundingBox.selectElement(null);
                var g = state.designer.regions[c],
                    h = ("undefined" == typeof state.designer.sides[d].defaultRegion[2] ? state.designer.sides[d].defaultRegion.region : state.designer.sides[d].defaultRegion)[2] / g.region[2],
                    k = -g.region[0] * h,
                    t = -g.region[1] * h,
                    p = d + 1,
                    e = $("#side" + p).children().clone(!0, !0);
                $("#canvasPreview" + c).empty();
                for (var u = "previewSvg" + c, s = e[0].childNodes.length - 1; 0 <= s; s--) {
                    "g" == e[0].childNodes[s].tagName && "bbGroup" == e[0].childNodes[s].id || "rect" == e[0].childNodes[s].tagName || "desc" == e[0].childNodes[s].tagName || "text" == e[0].childNodes[s].tagName || "defs" == e[0].childNodes[s].tagName ? e[0].childNodes[s].parentNode.removeChild(e[0].childNodes[s]) : (e[0].childNodes[s].id == "designGroup" + p && (e[0].childNodes[s].id = "designGroupPreview" + c, -1 < navigator.userAgent.toLowerCase().indexOf("firefox") || e[0].childNodes[s].setAttribute("style",
                        "clip-path:url('#designMaskPreview" + c + "')"), "none" != $("#designGroup" + p).css("mask") && void 0 != $("#designGroup" + p).css("mask") && (1 < $("#designGroup" + p).css("mask").split("distress").length ? e[0].childNodes[s].setAttribute("mask", "url('#distressMaskPreview" + c + "')") : e[0].childNodes[s].setAttribute("mask", "url('#designMaskPreview" + c + "')"))), e[0].childNodes[s].id == "designMask" + p && (e[0].childNodes[s].id = "designMaskPreview" + c, e[0].childNodes[s].firstChild &&
                        1 >= $("#designMask" + p)[0].firstChild.id.split("Rect").length && (e[0].childNodes[s].firstChild.id = "coverMaskImagePreview" + c, e[0].childNodes[s].firstChild.setAttribute("filter", "url('#coverFilterPreview" + c + "')"))), e[0].childNodes[s].id == "distressMask" + p && (e[0].childNodes[s].id = "distressMaskPreview" + c, e[0].childNodes[s].firstChild && "image" == $("#designMask" + p)[0].firstChild.tagName && e[0].childNodes[s].firstChild.setAttribute("mask", "url('#designMaskPreview" +
                        c + "')")), e[0].childNodes[s].id == "coverFilter" + p && (e[0].childNodes[s].id = "coverFilterPreview" + c));
                }
                p = [k, t, state.designer.originalCanvasSize * h, state.designer.originalCanvasSize * h];
                s = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                s.setAttribute("id", "rectangle" + c);
                s.setAttributeNS(null, "x", g.region[0] * h + k + 1);
                s.setAttributeNS(null, "y", g.region[1] * h + t + 1);
                s.setAttributeNS(null, "height", g.region[3] * h - 2);
                s.setAttributeNS(null, "width", g.region[2] * h - 2);
                s.setAttributeNS(null, "stroke-width", 4 * h + "px");
                s.setAttributeNS(null, "stroke", "#fe199d");
                s.setAttributeNS(null, "fill", "transparent");
                e[0].appendChild(s);
                e[0].setAttributeNS(null, "viewBox", p.join(" "));
                e[0].setAttributeNS(null, "width", "80");
                e[0].setAttributeNS(null, "height", "80");
                e[0].setAttributeNS(null, "id", u);
                e[0].setAttributeNS(null, "preserveAspectRatio", "xMinYMin");
                e[0].setAttribute("viewBox", p.join(" "));
                e[0].setAttribute("width", "80");
                e[0].setAttribute("height", "80");
                e[0].setAttribute("id", u);
                e[0].setAttribute("preserveAspectRatio", "xMinYMin");
                $("#canvasPreview" + c).append(e);
                b.$$phase || b.$apply();
            }
        }, 1000);
    };
    b.changePrintRegion = function(b, c) {
        state.designer.activeSide.boundingBox.visibleRegion = !0;
        c || state.designer.selectRegion(b);
        console.log("选择了新的设计区域", state.designer.zoom);
        eventManager.trigger("designCanvasChanged");
        eventManager.trigger('toAddTextPath');//Allen
    };
    b.productStyle = state.selectedProductStyle;

    var g = function() {
        clearInterval(b._interval);
        b._interval = setInterval(function() {
            console.log('call k() ---- 2');
            k();
        }, 1E3);
    };

    var k = function() {
        clearInterval(b._interval);
        console.log("更行了图形位置");
        b.productSides = [];
        state.designer.previews || (state.designer.previews = []);
        b.numRegions = 0;
        b.current_view = state.selectedDesign.canvas.activeRegion.name.toLowerCase();
        b.current_side = state.selectedDesign.canvas.name.toLowerCase();
        b.current_sideID = state.selectedDesign.canvas.activeRegion.sideIndex - 1;
        var c = 0, d = '';
        if (state.selectedProductStyle) {
            b.html_color = getColorString(state.selectedProductStyle.html_color);
            for (var g = 0; g < state.selectedProductStyle.product_regions.length; g++) {
                b.numRegions++;
                var h = state.selectedProductStyle.product_regions[g];
                h.side = h.side.toLowerCase();
                h.name = h.name.toLowerCase();
                h.regionIndex = g;
                h.canvasId = "canvasPreview" + g;
                state.designer.previews[g] || state.designer.previews.push({});
                var k = findMatch(b.productSides, function(b) {
                    return b.name == h.side;
                });
                k || (k = {
                    name: h.side,
                    ui_name: h.side_name,
                    regions: []
                }, 3 == h.side_order && state.selectedProduct.third_side_name && (k.ui_name = state.selectedProduct.third_side_name), 4 == h.side_order && state.selectedProduct.fourth_side_name && (k.ui_name = state.selectedProduct.fourth_side_name), b.productSides.push(k));
                d != k.name && c++;
                d = k.name;
                h.description = String(k.ui_name).charAt(0).toLocaleUpperCase() + String(k.ui_name).substr(1) + "-" + String(h.name).charAt(0).toLocaleUpperCase() + String(h.name).substr(1);
                h.sideIndex = c - 1;
                k.regions.push(h);
                k.showName = k.ui_name;
                k.tabName = k.showName + "(" + k.regions.length + ")";
                for (var t = 0; t < state.designer.sides.length; t++) {
                    state.designer.sides[t].activeRegion.side == d && h.name == state.designer.sides[t].activeRegion.name.toLocaleLowerCase() && (k.activeRegion = h);
                }
            }
        }
        b.$$phase || b.$apply();
    };

    k();

    b.showArtLocations = function() {
        b.showingInlineModal = true;
    };

    b.selectFirstPrintRegionWithDesign = function() {
        for (var c = 0; c < state.selectedProductStyle.product_regions.length; c++) {
            var d = state.selectedProductStyle.product_regions[c];
            if (d.hasLayers) {
                console.log('call changePrintRegion 1');
                b.changePrintRegion(d.regionIndex);
                break;
            }
        }
    };

    if(state.selectedProductStyle){
        if("undefined" == typeof state.selectedDesign.currentCanvasIndex){
            b.selectFirstPrintRegionWithDesign();
        }
    }

    var h = [];

    h.push(eventManager.on("elementsAdded", function() {
        console.debug('event', 'elementsAdded');
        k();
    }));

    h.push(eventManager.on("designCanvasChanged", function() {
        console.debug('event','designCanvasChanged');
        k();
    }));

    h.push(eventManager.on("designLiveEdition", function() {
        console.debug('event','designLiveEdition');
        g();
    }));

    h.push(eventManager.on("productRegionsChanged", function() {
        console.debug('event','productRegionsChanged');
        for (var i = 0; i < state.selectedProductStyle.product_regions.length; i++) {
            var region = state.selectedProductStyle.product_regions[i];
            var g = searchInArray(state.designer.regions, region.product_region_id, "product_region_id");
            if(g){
                region.region = g.region;
                b.loadPreview(region.regionIndex, region.sideIndex);
            }
        }
        k();
    }));

    h.push(eventManager.on("productColorChanged", function() {
        console.debug('event','productColorChanged');
        k();
    }));

    h.push(eventManager.on("productChanged", function() {
        console.debug('event','productChanged');
        b.productStyle = state.selectedProductStyle;
        b.changePrintRegion(state.selectedProductStyle.product_regions.indexOf(state.selectedProductStyle.selectedRegion), true);
        k();
        b.$$phase || b.$apply();
    }));

    h.push(eventManager.on("selectedProductLoaded", function() {
        console.debug('event','selectedProductLoaded');
        b.productStyle = state.selectedProductStyle;
        k();
        b.selectFirstPrintRegionWithDesign();
        b.$$phase || b.$apply();
    }));

    b.$on("$destroy", function() {
        if (h) {
            for (var i = 0; i < h.length; i++) {
                h[i]();
            }
        }
    });
};
function startAngularApp() {
    var b = angular.module("ds", ["ngRoute", "ng.ueditor"])
        .directive("ngVisible", visibleDirective)
        .directive("ngShowModal", showModalDirective)
        .directive("isScrollPager", scrollPagerDirective)
        .directive("isLoading", loadingDirective)
        .directive("isVerticallyCentered", verticallyCenteredDirective)
        .directive("isDisabled", disabledDirective)
        .directive("showColorTooltip", colorsTooltipDirective)
        .directive("isSubmit", formSubmitDirective)
        .directive("isInlineModal", closeWhenClickOutside)
        .directive("isInlineDropDown", closeWhenClickOutsideDropDown)
        .directive("isInlineDropDownShow", closeWhenClickOutsideDropDownShow)
        .directive("isInlineDropDownHide", closeWhenClickOutsideDropDownHide)
        .directive("isAutoLoad", autoLoadFileInput)
        .directive("isAutoFocus", autoFocusDirective)
        .directive("isAutoSelect", autoSelect)
        .directive("isShowDrawer", showDrawerDirective)
        .directive("isHideDrawers", hideDrawersDirective)
        .directive("isShowFonts", showFontsDirective)
        .directive("isTimerChange", textboxTimerChangeDirective)
        .directive("isHideFonts", hideFontsDirective)
        .directive("isAttr", ngAttrDirective)
        .directive("isPrintElement", printElementDirective)
        .directive("isRequired", requiredDirective)
        .directive("cartNavigation", cartNavigationDirective)
        .directive("isColorPicker", ui.directives.colorPickerDirective)
        .directive("isAddThis", ui.directives.addThis)
        .directive("isSelectOnEnter", selectOnEnterTextboxDirective)
        .directive('pca', pcaDirective)
        .config([
            "$routeProvider",
            "$sceDelegateProvider",
            function(b, c) {
                dsLocation = ezdVars.DesignerLocation + "/ds";
                0 === ezdVars.DesignerLocation.indexOf("http") && ezdVars.DesignerLocation.substring(0, ezdVars.DesignerLocation.indexOf("/", 7));
                c.resourceUrlWhitelist(["self", "**"]);
                b.when("/addText", {
                    templateUrl: state.theme.url(dsLocation + "/html/designControls/addText.html"),
                    controller: ui.controllers.AddTextController
                }).when("/editText/:id", {
                    templateUrl: state.theme.url(dsLocation + "/html/designControls/editText.html"),
                    controller: ui.controllers.EditTextController
                }).when("/editSvg/:id", {
                    templateUrl: state.theme.url(dsLocation + "/html/designControls/editSvg.html"),
                    controller: ui.controllers.EditSvgController
                }).when("/editImage/:id", {
                    templateUrl: state.theme.url(dsLocation + "/html/designControls/editImage.html"),
                    controller: ui.controllers.EditImageController
                }).when("/designs", {
                    templateUrl: state.theme.url(dsLocation + "/html/designControls/layers.html"),
                    controller: ui.controllers.PunchInController
                }).when("/savedArt", {
                    templateUrl: state.theme.url(dsLocation + "/html/designControls/layers.html"),
                    controller: ui.controllers.PunchInController
                }).when("/uploadArt", {
                    templateUrl: state.theme.url(dsLocation + "/html/designControls/layers.html"),
                    controller: ui.controllers.PunchInController
                }).when("/editImagePane", {
                    templateUrl: state.theme.url(dsLocation + "/html/designControls/editImagePane.html"),
                    controller: ui.controllers.EditImagePane
                }).when("/step1", {
                    templateUrl: state.theme.url(dsLocation + "/html/designControls/empty.html"),
                    controller: ui.controllers.Step1Controller
                }).when("/step2", {
                    templateUrl: state.theme.url(dsLocation + "/html/designControls/empty.html"),
                    controller: ui.controllers.Step2Controller
                }).when("/step3", {
                    templateUrl: state.theme.url(dsLocation + "/html/designControls/empty.html"),
                    controller: ui.controllers.Step3Controller
                }).otherwise({
                    redirectTo: "/addText"
                });
            }
        ]
        );
    ui.controllers.LayersController.$inject = "$scope $routeParams $location $rootScope $compile $sce".split(" ");
    b.controller("LayersController", ui.controllers.LayersController);
    ui.controllers.EditSvgController.$inject = ["$scope", "$compile", "$routeParams", "$location", "$rootScope"];
    b.controller("EditSvgController", ui.controllers.EditSvgController);
    ui.controllers.EditTextController.$inject = ["$scope", "$compile", "$routeParams", "$location", "$rootScope"];
    b.controller("EditTextController", ui.controllers.EditTextController);
    ui.controllers.AddTextController.$inject = ["$scope", "$compile", "$routeParams", "$location", "$rootScope"];
    b.controller("AddTextController", ui.controllers.AddTextController);
    ui.controllers.EditTextEmbroideryController.$inject = ["$scope", "$compile", "$routeParams", "$location", "$rootScope"];
    b.controller("EditTextEmbroideryController", ui.controllers.EditTextEmbroideryController);
    ui.controllers.EditArtEmbroideryController.$inject = ["$scope", "$compile", "$routeParams", "$location", "$rootScope"];
    b.controller("EditArtEmbroideryController", ui.controllers.EditArtEmbroideryController);
    ui.controllers.EditImageController.$inject = ["$scope", "$compile", "$routeParams", "$location", "$rootScope"];
    b.controller("EditImageController", ui.controllers.EditImageController);
    ui.controllers.EditMultipleController.$inject = ["$scope", "$compile", "$routeParams", "$location", "$rootScope"];
    b.controller("EditMultipleController", ui.controllers.EditMultipleController);
    ui.controllers.DistressController.$inject = ["$scope", "$routeParams", "$location"];
    b.controller("DistressController", ui.controllers.DistressController);
    ui.controllers.ProductRegionController.$inject = ["$scope", "$rootScope", "$location"];
    b.controller("ProductRegionController", ui.controllers.ProductRegionController);
    ui.controllers.ProductColorsController.$inject = ["$scope", "$routeParams", "$location"];
    b.controller("ProductColorsController", ui.controllers.ProductColorsController);
    ui.controllers.BackgroundColorController.$inject = ["$scope", "$routeParams", "$location"];
    b.controller("BackgroundColorController", ui.controllers.BackgroundColorController);
    ui.controllers.DesignColorsController.$inject = ["$scope", "$rootScope", "$compile"];
    b.controller("DesignColorsController", ui.controllers.DesignColorsController);
    ui.controllers.ActionController.$inject = ["$scope", "$rootScope", "$routeParams", "$location", "$compile", "$sce"];
    b.controller("ActionController", ui.controllers.ActionController);
    ui.controllers.DesignerController.$inject = ["$scope", "$rootScope", "$location", "$compile"];
    b.controller("DesignerController", ui.controllers.DesignerController);
    ui.controllers.AdminController.$inject = ["$scope"];
    b.controller("AdminController", ui.controllers.AdminController);
    ui.controllers.VideoController.$inject = ["$scope", "$compile"];
    b.controller("VideoController", ui.controllers.VideoController);
    ui.controllers.PunchInController.$inject = ["$scope", "$rootScope", "$location", "$compile"];
    b.controller("PunchInController", ui.controllers.PunchInController);
    ui.controllers.DesignsAndClipArtController.$inject = ["$scope", "$location", "$rootScope"];
    b.controller("DesignsAndClipArtController", ui.controllers.DesignsAndClipArtController);
    ui.controllers.DesignIdeasController.$inject = ["$scope", "$location", "$rootScope"];
    b.controller("DesignIdeasController", ui.controllers.DesignIdeasController);
    ui.controllers.MyArtController.$inject = ["$scope", "$location", "$rootScope"];
    b.controller("MyArtController", ui.controllers.MyArtController);
    ui.controllers.ProductCategoriesController.$inject = ["$scope", "$location", "$compile", "$sce"];
    b.controller("ProductCategoriesController", ui.controllers.ProductCategoriesController);
    ui.controllers.BrowseProductsController.$inject = ["$scope", "$rootScope", "$compile", "$sce"];
    b.controller("BrowseProductsController", ui.controllers.BrowseProductsController);
    ui.controllers.ColorPickerController.$inject = ["$scope"];
    b.controller("ColorPickerController", ui.controllers.ColorPickerController);
    ui.controllers.AddNoteController.$inject = ["$scope"];
    b.controller("AddNoteController", ui.controllers.AddNoteController);
    ui.controllers.LandingPageController.$inject = ["$scope", "$compile"];
    b.controller("LandingPageController", ui.controllers.LandingPageController);
    ui.controllers.ClipArtController.$inject = ["$scope", "$location", "$rootScope"];
    b.controller("ClipArtController", ui.controllers.ClipArtController);
    ui.controllers.LogInOrCreateAccountController.$inject = ["$scope", "$rootScope", "$location"];
    b.controller("LogInOrCreateAccountController", ui.controllers.LogInOrCreateAccountController);
    ui.controllers.SaveAndShareController.$inject = ["$scope", "$rootScope", "$location", "$compile"];
    b.controller("SaveAndShareController", ui.controllers.SaveAndShareController);
    ui.controllers.SaveAndNameDesignController.$inject = ["$scope", "$rootScope", "$compile"];
    b.controller("SaveAndNameDesignController", ui.controllers.SaveAndNameDesignController);
    ui.controllers.SaveAndShareEmailController.$inject = ["$scope", "$rootScope"];
    b.controller("SaveAndShareEmailController", ui.controllers.SaveAndShareEmailController);
    ui.controllers.NamesAndNumbersController.$inject = ["$scope", "$compile", "$rootScope"];
    b.controller("NamesAndNumbersController", ui.controllers.NamesAndNumbersController);
    ui.controllers.GetQuoteController.$inject = ["$scope", "$compile", "$rootScope"];
    b.controller("GetQuoteController", ui.controllers.GetQuoteController);
    ui.controllers.MobileUploadController.$inject = ["$scope", "$rootScope"];
    b.controller("MobileUploadController", ui.controllers.MobileUploadController);
    ui.controllers.ShareWithSocialMediaController.$inject = ["$scope", "$rootScope", "$location", "$compile"];
    b.controller("ShareWithSocialMediaController", ui.controllers.ShareWithSocialMediaController);
    ui.controllers.SelectSizesController.$inject = ["$scope", "$compile", "$rootScope"];
    b.controller("SelectSizesController", ui.controllers.SelectSizesController);
    ui.controllers.CartLoginController.$inject = ["$scope", "$compile", "$rootScope"];
    b.controller("CartLoginController", ui.controllers.CartLoginController);
    ui.controllers.CartRegisterController.$inject = ["$scope", "$compile", "$rootScope"];
    b.controller("CartRegisterController", ui.controllers.CartRegisterController);
    ui.controllers.SaveDesignController.$inject = ["$scope", "$compile", "$rootScope"];
    b.controller("SaveDesignController", ui.controllers.SaveDesignController);
    ui.controllers.ViewCartController.$inject = ["$scope", "$compile", "$rootScope"];
    b.controller("ViewCartController", ui.controllers.ViewCartController);
    ui.controllers.EnterPaymentController.$inject = ["$scope", "$compile"];
    b.controller("EnterPaymentController", ui.controllers.EnterPaymentController);
    ui.controllers.EnterAddressesController.$inject = ["$scope", "$compile"];
    b.controller("EnterAddressesController", ui.controllers.EnterAddressesController);
    ui.controllers.ShippingMethodController.$inject = ["$scope", "$compile"];
    b.controller("ShippingMethodController", ui.controllers.ShippingMethodController);
    ui.controllers.ReviewOrderController.$inject = ["$scope", "$compile"];
    b.controller("ReviewOrderController", ui.controllers.ReviewOrderController);
    ui.controllers.EmailDesignController.$inject = ["$scope", "$compile"];
    b.controller("EmailDesignController", ui.controllers.EmailDesignController);
    ui.controllers.PrintReceiptController.$inject = ["$scope", "$compile"];
    b.controller("PrintReceiptController", ui.controllers.PrintReceiptController);
    ui.controllers.ViewTestCaseXmlController.$inject = ["$scope", "$compile"];
    b.controller("ViewTestCaseXmlController", ui.controllers.ViewTestCaseXmlController);
    ui.controllers.UploaderLandingController.$inject = ["$scope", "$compile", "$sce"];
    b.controller("UploaderLandingController", ui.controllers.UploaderLandingController);

    ui.controllers.upImageLoadingController.$inject = ["$scope", "$compile"];
    b.controller("upImageLoadingController", ui.controllers.upImageLoadingController);

    ui.controllers.ChooseNumberOfColorsController.$inject = ["$scope", "$compile"];
    b.controller("ChooseNumberOfColorsController", ui.controllers.ChooseNumberOfColorsController);

    ui.controllers.EmbroideryMapColorsController.$inject = ["$scope", "$compile"];
    b.controller("EmbroideryMapColorsController", ui.controllers.EmbroideryMapColorsController);
    ui.controllers.MobileUploadConfirmController.$inject = ["$scope", "$compile"];
    b.controller("MobileUploadConfirmController", ui.controllers.MobileUploadConfirmController);
    ui.controllers.SelectImageTypeController.$inject = ["$scope", "$compile"];
    b.controller("SelectImageTypeController", ui.controllers.SelectImageTypeController);
    ui.controllers.ColorOrBWController.$inject = ["$scope", "$compile"];
    b.controller("ColorOrBWController", ui.controllers.ColorOrBWController);
    ui.controllers.MobileUploadConfirmController.$inject = ["$scope", "$compile"];
    b.controller("MobileUploadConfirmController", ui.controllers.MobileUploadConfirmController);
    ui.controllers.EditImagePane.$inject = ["$scope", "$compile", "$routeParams", "$location", "$rootScope"];
    b.controller("EditImagePane", ui.controllers.EditImagePane);

    //control add by hl
    ui.controllers.SaleGoalController.$inject = ["$scope", "$compile", "$routeParams", "$location", "$rootScope"];
    b.controller('SaleGoalController', ui.controllers.SaleGoalController);
    ui.controllers.Step1Controller.$inject = ["$scope", "$compile", "$routeParams", "$location", "$rootScope"];
    b.controller('Step1Controller', ui.controllers.Step1Controller);
    ui.controllers.Step2Controller.$inject = ["$scope", "$compile", "$routeParams", "$location", "$rootScope"];
    b.controller('Step2Controller', ui.controllers.Step2Controller);
    ui.controllers.Step3Controller.$inject = ["$scope", "$compile", "$routeParams", "$location", "$rootScope"];
    b.controller('Step3Controller', ui.controllers.Step3Controller);
    ui.controllers.AddressController.$inject = ["$scope", "$compile", "$routeParams", "$location", "$rootScope"];
    b.controller('AddressController', ui.controllers.AddressController);
    ui.controllers.AddressListController.$inject = ["$scope", "$compile", "$routeParams", "$location", "$rootScope"];
    b.controller('AddressListController', ui.controllers.AddressListController);

    angular.bootstrap(document.getElementById("angularAppElement"), ["ds"]);
}
var modals = {
    landingPage: "/ds/html/modals/landingPage.html",
    addNote: "/ds/html/modals/addNote.html",
    browseProducts: "/ds/html/modals/browseProducts.html",
    browseProductsSingle: "/ds/html/modals/browseProductsSingle.html",
    clipArt: "/ds/html/modals/clipArt.html",
    designIdeas: "/ds/html/modals/designIdeas.html",
    designsAndClipArt: "/ds/html/modals/designsAndClipArt.html",
    getQuote: "/ds/html/modals/getQuote.html",
    login: "/ds/html/modals/login.html",
    namesAndNumbers: "/ds/html/modals/namesAndNumbers.html",
    productCategories: "/ds/html/modals/productCategories.html",
    saveAndShare: "/ds/html/modals/saveAndShare.html",
    saveAndShareEmail: "/ds/html/modals/saveAndShareEmail.html",
    myArt: "/ds/html/modals/myArt.html",
    saveAndNameDesign: "/ds/html/modals/saveAndNameDesign.html",
    cartLogin: "/ds/html/cart/cartLogin.html",
    cartRegister: "/ds/html/cart/cartRegister.html",
    emailDesign: "/ds/html/cart/emailDesign.html",
    enterAddresses: "/ds/html/cart/enterAddresses.html",
    enterPayment: "/ds/html/cart/enterPayment.html",
    shippingMethod: "/ds/html/cart/shippingMethod.html",
    reviewOrder: "/ds/html/cart/reviewOrder.html",
    saveDesign: "/ds/html/cart/saveDesign.html",
    selectSizes: "/ds/html/cart/selectSizes.html",
    shareDesign: "/ds/html/cart/shareDesign.html",
    viewCart: "/ds/html/cart/viewCart.html",
    printReceipt: "/ds/html/cart/printReceipt.html",
    viewTestCaseXml: "/ds/html/cart/viewTestCaseXml.html",
    colorPicker: "/ds/html/modals/colorPicker.html",
    video: "/ds/html/modals/video.html",
    chooseNumberOfColors: "/ds/html/modals/uploader/chooseNumberOfColors.html",
    embroideryMapColors: "/ds/html/modals/uploader/embroideryMapColors.html",
    matchAndCombineColors: "/ds/html/modals/uploader/matchAndCombineColors.html",
    mobileUploadFromDevice: "/ds/html/modals/uploader/mobileUpload.html",
    mobileUploadConfirm: "/ds/html/modals/uploader/mobileUploadConfirm.html",
    selectImageType: "/ds/html/modals/uploader/selectImageType.html",
    uploaderLanding: "/ds/html/modals/uploader/uploaderLanding.html",
    colorOrBW: "/ds/html/modals/uploader/colorOrBW.html",
    warningProduct: "/ds/html/modals/warningProduct.html",
    saveDesignTip: "/ds/html/modals/saveDesignTip.html",
    addressList: '/ds/html/modals/addressList.html',
    address: '/ds/html/modals/address.html',
    upImageLoading: "/ds/html/modals/uploader/upImageLoading.html"

};

function showModal(b, d, c, g) {
    d = state.theme.url(ezdVars.DesignerLocation + modals[b]);
    "colorPicker" != b && $(".isd-modalContainer").hide();
    (function() {
        for (var b = $("div.isd-modalContainer"), c = 0; c < b.length; c++) {
            var d = $(b[c]);
            if ("designIdeas" != d[0].id && "clipArt" != d[0].id) {
                for (var d = d.find("div[ng-controller]"), g = 0; g < d.length; g++) {
                    var k = $(d[g]).scope();
                    k && k.beforeClose && k.beforeClose();
                    k && k.close && k.close();
                }
            }
        }
    })();
    var k = $("#" + b);
    if (k.length) {
        if ("designIdeas" == b || "clipArt" == b || "colorOrBW" == b) {
            k.show();
            return;
        }
        k.remove();
    }
//    state.designer.hideBB();
    $.get(d, function(d) {
        var f = angular.element("#angularAppElement").scope().$new();
        if (g) {
            for (var k in g) {
                f[k] = g[k];
            }
        }
        f.close = function() {
            f.beforeClose && f.beforeClose();
            if ("designIdeas" == b || "clipArt" == b) {
                $("#" + b).modal('hide')
            } else {
                if (b == 'chooseNumberOfColors' || b == 'colorOrBW') b = "selectImageType";
                ($("#" + b).modal('hide'), $("#" + b).on('hidden.bs.modal', function(e) {
                    $("#" + b).remove()
                }), f.$destroy());
            }
        };
        f.sendEvent = function(b, c) {
            eventManager.trigger(b, c);
            f.close();
        };
        f.centerModal = function(c) {
            c || (c = $("#" + b + " .isd-light-container"));
            var d = $("#angularAppElement").height(),
                f = c.height();
            c.css("top", Math.max(2, d - f) / 2 + "px");
        };
        d = $(d)[0];
        c(d)(f);
        if (b == 'chooseNumberOfColors' || b == 'colorOrBW') {
            var $modeal = $('#selectImageType');
            $modeal.find('.modal-content').empty();
        } else {
            var $modeal = $('<div class="modal fade" tabindex="-1" data-backdrop="false" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" id="' + b + '"><div class="modal-dialog modal-lg"><div class="modal-content"></div> </div></div>');
        }
        f.$$destroyed || ($modeal.find('.modal-content').append(d), $modeal.appendTo('#dsContainer'), hideModalDrawer("#" + b), f.$apply());
        g && g.noCenter || setTimeout(function() {
            f.centerModal();
        }, 10);
    });
}

function hideModalDrawer(b) {
    if (!b) {
        b = '.modal';
    }

    if ($(b + ":visible").length) {
        $(b).modal('hide');
    } else {
        $(b).modal('show');
    }
}

function showModalDrawer(b, d, c, g, k, h, attr) {
    d = state.theme.url(ezdVars.DesignerLocation + modals[b]);
    var f = $("#drawersContainer");
    if (!$("#" + b + ":visible").length || g && g.noToggleOnClick) {
        hideModalDrawer("#" + b);
        var m = function(c) {
            hideModalDrawer("#" + b);
        };
//        state.designer.hideBB();
        k = $("#" + b);
        if (k.length) {
            for (d = k.find("div[ng-controller]"), k = 0; k < d.length; k++) {
                var q = $(d[k]).scope();
                if (q && q.onShow) {
                    if (g) {
                        for (var n in g) {
                            q[n] = g[n];
                        }
                    }
                    if ("clipArt" == b) {
                        $('.isd-clipart-category-list').removeClass('active')
                    }
                    q.onShow(g, attr);
                }
            }
        } else {
            $.get(d, function(d) {
                var f = angular.element("#angularAppElement").scope().$new();
                if (g) {
                    for (var k in g) {
                        f[k] = g[k];
                    }
                }
                f.close = function() {
                    f.beforeClose && f.beforeClose();
                    hideModalDrawer("#" + b);
                };
                f.centerModal = function(b) {};
                d = $(d)[0];
                c(d)(f);
                var $modeal = $('<div class="modal fade" tabindex="-1" data-backdrop="false" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" id="' + b + '"><div class="modal-dialog modal-lg"><div class="modal-content"></div> </div></div>');
                f.$$destroyed || ($modeal.find('.modal-content').append(d), $modeal.appendTo('#dsContainer'), f.$apply());
                m($("#" + b));
                h && h();
                //add by hl
                var modalElement = $('#'+b);
                if(modalElement.length>0){
                    var ngScope = modalElement.find('div[ng-controller]');
                    for(var i=0; i<ngScope.length; i++){
                        var ngScope = $(ngScope[i]).scope();
                        ngScope.onShow(null, attr);
                    }
                }
            });
        }
    } else {
        hideModalDrawer("#" + b);
    }
};

function showColorModal(b, d, c, g, event) {
    if($(".ds-colorPicker").length !=0){
        $(".ds-colorPicker").remove();
    }else{
        var k = g.currentColor,
            h = g.onSelect,
            f = g.allowTransparent,
            m = g.onlyNames,
            q = g.onlyNumbers,
            n = b.$new();
//        n.designColors = state.dsUtils.getColorsInUse(null, !1, !1);
//        g.embroidery ? (n.designColors = state.dsUtils.getColorsInUse(null, !1, !1), service.getStoreThreadChartColors(state.selectedThreadChartName || state.threadCharts[0].Name)) : (n.designColors = state.dsUtils.getColorsInUse(null, !1, !1), n.otherColors = angular.copy(state.storeInkColors));

        n.designColors = [];
        n.otherColors = angular.copy(state.storeInkColors);
        var sides = state.designer.sides;
        for(var i=0; i<sides.length; i++){
            var side = sides[i];
            var elements = side.elements;
            for(var j=0; j<elements.length; j++){
                var element = elements[j];
                if(element instanceof ui.text.TextElement){
                    if(element.stroke != 0){
                        n.designColors.push(element.strokeColor);
                    }
                    n.designColors.push(element.color);
                }
//                if(element instanceof ui.svg.SvgElement || element instanceof ui.bitmap.BitmapElement){
//                    for(var n=0; n<element.colors.length; n++){
//                        n.designColors.push(element.colors[n]);
//                    }
//                }
            }
        }
        n.designColors = n.designColors.unique();
        n.currentColor = k;
        n.currentColorName = c.getColorName(k);
        n.allowTransparent = f;
        n.otherColorCurrent = "-----";
        n.colorsInUseCurrent = "-----";
        normalizeColorStrings(n.designColors);
        n.currentColor = normalizeColorStrings(n.currentColor);
        if (m || q) {
            for (b = 0; b < n.otherColors.length; b++) {
                g = n.otherColors[b], m && "0" == g.name_color && (n.otherColors.splice(b, 1), b--), q && "0" == g.number_color && (n.otherColors.splice(b, 1), b--);
            }
            for (b = 0; b < n.designColors.length; b++) {
                var r = getColorString(n.designColors[b]);
                g = findMatch(n.otherColors, function(b) {
                    return r == getColorString(b.html_color);
                });
                g || (n.designColors.splice(b, 1), b--);
            }
        }
        n.selectColor = function(b) {
//            switch(state.designer.activeSide.name){
//                case 'third':
//                    sideName = 'left';
//                    break;
//                case 'fourth':
//                    sideName = 'right';
//                    break;
//                default:
//                    sideName = state.designer.activeSide.name;
//            }
//            var ColorData = state.dsUtils.getPricingColorData();
//            var activeRegionColors = ColorData.usrColors[sideName].length;
            if(getDesignColors() >= 10){
                n.close();
                alert("您添加的设计颜色数量超过了10种，为了保证印刷质量，请保证设计颜色数量不超过10种。\n或咨询客服：400-920-2085 协助您解决。");
                return false;
            }
            h && h(b);
            m || q || eventManager.trigger("designColorsChanged");
            n.close();
        };
        n.colorsInUseHover = function(b) {
            n.colorsInUseCurrent = c.getColorName(b);
        };
        n.colorsInUseLeave = function() {
            n.colorsInUseCurrent = "-----";
        };
        n.otherColorHover = function(b) {
            n.otherColorCurrent = c.getColorName(b);
        };
        n.otherColorLeave = function() {
            n.otherColorCurrent = "-----";
        };
        b = state.theme.url(ezdVars.DesignerLocation + "/ds/html/modals/colorPicker.html");
        $(".ds-colorPicker").length && $(".ds-colorPicker").remove();
        $.get(b, function(b) {
            n.close = function() {
                $(".ds-colorPicker").remove();
                n.$destroy();
            };
            b = $(b)[0];
            d(b)(n);

            $(event.currentTarget).parent().addClass('open').find('.ds-colorPicker').remove();
            $(event.currentTarget).parent().append(b);
            n.$apply();

        });
    }

}

var EasyTeeService = function(b) {

    function d(d) {
        var options = d;
        var e = options.methodName;
        var k = options.parameters;
        var s = options.queryStringParameters||{};
        s.appKey=b.AppToken;
        var w = options.successRootTagName;
        var v = options.error;
        var x = options.postData;
        var t = options.useSSL;
        var y = options.useAppURI;
        var D = options.returnSync;
        var V;//useCache
        if(typeof b.useCache == 'undefined'){//若全局未设置，则默认开启全局useCache，只能设置true/false。
            b.useCache = true;
        }
        if(b.useCache && options.useCache){//若全局和内部同时开启，启用缓存。
            V = true;
        }else{
            V = false;
        }
        var reqUrl = "";
        switch(e){
            case "GetProduct":
                reqUrl = "product/get";
                break;
            case "GetProductCategoryList":
                reqUrl = "product/getCategoryList";
                break;
            case "GetProductList":
                reqUrl = "product/getList";
                break;
            case "GetFontList":
                reqUrl = "font/getList";
                break;
            case "GetDesign":
                reqUrl = "design/get";
                break;
            case "GetDesignCategoryList":
                reqUrl = "design/getCategoryList";
                break;
            case "GetDesignCategoryTexts":
                reqUrl = "design/getCategoryTexts";
                break;
            case "GetDesignList":
                reqUrl = "design/getList";
                break;
            case "GetArtList":
                reqUrl = "art/getList";
                break;
            case "GetArtCategoryList":
                reqUrl = "art/getCategoryList";
                break;
            case "GetUserDesignList":
                reqUrl = "user/getDesignList";
                break;
            default:
                reqUrl = e;
        }
        //设置默认错误处理方法
        v || (v = d.error = h);
        //添加appURI
        v = y ? "/" + b.AppURI + "/" : "/";
        t && b.sslDomain && (v = "https://" + b.sslDomain + v);
        //添加请求方法名
        v += reqUrl + "/";

        //d.noAppTokenInUrl || (v += b.AppToken + "/");

        //这一段可能和缓存有关
        t = -1;
        for (y = 0; y < k.length; y++) {
            "undefined" != typeof k[y] && k[y] && (t = y);
        }
        for (y = 0; y <= t; y++) {
            "undefined" !== k[y] && k[y] ? k[y] && (v += escape(k[y]) + "/") : v += "0/";
        }

        //如果queryStringParameters不为空,将queryStringParameters的值放到Url参数里。
        var parameters = s;
        if (parameters) {
            var pArr = [];
            for (var pName in parameters) {
                pArr.push(pName+'='+encodeURIComponent(parameters[pName]));
            }
            v += '?' + pArr.join('&');
        }

        //若使用本地消息
        b.enableLocalFeeds && (v = "../common/data/" + e + ".xml");

        console.log('%c methodName: '+e, 'color:green');
        console.log('%c reqUrl: '+v, 'color:green');

        //loading mask
        service.ajaxCallStarted && service.ajaxCallStarted(e, d.loadingMessage);

        //q默认true，n为缓存对象（请求名—参数名=key, xmlDoc=value）。
        var M = q ? n[f(e, k)] : false;

        //从缓存中找到xmlDocument
        if(V && M){
            //是否开启同步
            if(D){
                c(M, d);//从xmlDocument中获取数据
            }else{
                setTimeout(function() {
                    c(M, d);//从xmlDocument中获取数据
                }, 10)
            }
        }else{
            var dataType = 'xml';
            if(w == 'OK'){//successRootTagName
                dataType = null;
            }
            $.ajax({
                type: x ? 'POST' : 'GET',
                url: m.adjustUrl(v),
                xhrFields: r,
                dataType: dataType,
                data: x,
                success: function(xmlDoc) {
                    console.log('%c 首次请求 url->' + m.adjustUrl(v), 'color:green');
//                    printXmlDocument(xmlDoc);
                    c(xmlDoc, d);//从xmlDocument中获取数据
                },
                error: function(b, e, c) {
                    g(d, b, e, c);
                }
            });
        }
    }

    function printXmlDocument(node){
        if(node == null){
            return;
        }
        var html = $(node.documentElement).html() + '\n';
        console.log(html);
        for(var i=0; i<node.childNodes.length; i++){
            printXmlDocument(node.childNodes[i]);
        }
    }

    //processXmlDocument
    function c(b, e) {
        var c = e.methodName,
            d = e.successRootTagName,
            g = e.deserializationSettings,
            m = e.processResults,
            r = e.success,
            t = e.error;
        service.ajaxCallEnded && service.ajaxCallEnded(c, e.loadingMessage);

        if ("OK" == d && "string" == typeof b && 0 > b.indexOf("<")) {
            r && r(b);
        } else {
            if ("string" == typeof b) {
                if (!b || 0 == b.length) {
                    if (t) {
                        var y = "请求： " + c + " 时服务器返回了长度为 0 的数据，这是不应该的.";
                        t(y, y);
                    } else {
                        alert(y);
                    }
                }
                b = $.parseXML(b);
            }

            var xmlDocument = b;
            var successRootTagName = d;
            var nodeName = c;
            var successRootTagName = d;
            var success = r;
            var error = t;
            c = b.documentElement.nodeName;
            var defaultError = h;
            var nodeName = c;
            if(successRootTagName && successRootTagName != nodeName){
                if(nodeName.toLowerCase() == "error"){
                    if(error){
                        error($(xmlDocument.documentElement).text(), $(xmlDocument.documentElement).text(), null, true);
                    }else{
                        defaultError({}, $(xmlDocument.documentElement).text(), $(xmlDocument.documentElement).text(), true);
                    }
                }else{
                    if(nodeName.toLowerCase() == "errors"){
                        var errorObject = k($(xmlDocument).children()[0], {
                            Error: {
                                name: "errors",
                                mode: "array"
                            }
                        });
                        console.log("调用成功，但返回一个错误: ", errorObject);
                        if(error){
                            error(errorObject.errors, null, null, true);
                        }
                    }
                }
            }else{
                var processResults = m;
                var t = k($(xmlDocument).children()[0], g);
                if(processResults){
                    if(processResults = processResults(t)){
                        t = processResults;
                    }
                }
                if(success){
                    success(t);
                }
                var r = xmlDocument;
                if(q){
                    n[f(e.methodName,e.parameters)] = r;
                }
            }
        }
    }

    //
    function g(b, e, d, f) {
        service.ajaxCallEnded && service.ajaxCallEnded(b.methodName, b.loadingMessage);
        if ("OK" == b.successRootTagName && "parsererror" == d) {
            return c("OK", b);
        }
        b.error ? b.error(e, d, f, false) : h(e, d, f, null);
    }

    function k(b, e) {
        if (!b) {
            return null;
        }
        var c = $(b),
            d = null;
        if (b.attributes && 0 < b.attributes.length || 0 < c.children().length) {
            d = {};
            if (b.attributes) {
                for (var f = 0; f < b.attributes.length; f++) {
                    var g = b.attributes[f].name,
                        h = b.attributes[f].value;
                    if (0 <= h.indexOf("REPLACE_DOMAIN_WITH")) {
                        h = t(h);
                    } else {
                        if ("0" === h || "1" === h) {
                            h = parseInt(h);
                        } else {
                            if ("false" === h.toLowerCase() || "true" === h.toLowerCase()) {
                                h = "true" === h.toLowerCase();
                            }
                        }
                    }
                    d[g] = h;
                }
            }
            0 === c.children().length && c.text().trim() && (d.textValue = c.text());
            c = c.children();
            for (f = 0; f < c.length; f++) {
                var m = c[f];
                $(m);
                h = m.tagName;
                g = null == e || "undefined" == typeof e[h] ? {
                    mode: "array",
                    name: h
                } : e[h];
                "undefined" != typeof g.name && g.name ? h = g.name : h && g && !g.name && (g.name = h);
                m = k(m, e);
                if (d[h]) {
                    (h = d[g.name]) && "undefined" != typeof h.push ? h.push(m) : (d[g.name] = [], d[g.name].push(h), d[g.name].push(m));
                } else {
                    if ("single" == g.mode) {
                        d[g.name] = m;
                    } else {
                        if ("merge" == g.mode) {
                            for (var n in m) {
                                d[n] = m[n];
                            }
                        } else {
                            d[g.name] = [], d[g.name].push(m);
                        }
                    }
                }
            }
        } else {
            d = c.text();
        }
        return d;
    }

    //defualtError
    function h(b, e, c, d) {
        console.log("Ajax请求失败: " + e + "\r\n" + c);
        d && alert("错误: " + e);
        window.defaultAjaxErrorHandler && window.defaultAjaxErrorHandler(b, e, c, d);
    }

    //method_params1_params2_...paramsN
    function f(b, e) {
        var c = b;
        if (e) {
            for (var d = 0; d < e.length; d++) {
                c += "_" + e[d];
            }
        }
        return c;
    }
    var m = this,
        q = true,//缓存开关
        n = {};//缓存对象

    this.ajaxCallEnded = this.ajaxCallStarted = null;

    b || (b = {
        domain: window.ezdDomain,
        sslDomain: window.ezdSSLDomain,
        AppToken: window.ezdAppToken,
        publisherID: window.ezdPublisherID,
        AppURI: window.ezdAppURI,
        addDomainToUrls: true
    });

    var r = null,
        t = window.fixImageUrl || function(b) {
            return b;
        };
    this.getThemeInfo = function(b, e) {
        $.ajax({
            type: "GET",
            url: b,
            xhrFields: r,
            dataType: "text/xml",
            complete: function(b) {
                if (e) {
                    var c = b.responseXML;
                    !c && b.responseText && (c = $.parseXML(b.responseText));
                    (b = k(c, {
                        customization: {
                            mode: "single"
                        },
                        rule: {
                            name: "rules"
                        },
                        file: {
                            name: "files"
                        },
                        theme: {
                            mode: "single"
                        }
                    })) && b.theme && (b = b.theme);
                    e(b);
                }
            }
        });
    };
    this.saveThemeCustomizations = function() {};
    this.getThemeCustomizations = function() {};
    this.adjustUrl = function(c) {
        if (!c) {
            return c;
        }
        var e = b.addDomainToUrls;
        c = t(c);
        e && 0 != c.indexOf("http") && 0 != c.indexOf("//") && (c = "http://" + b.domain + c);
        document.location.href.startsWith("file") || (c = c.replace("http://", "//"));
        return c;
    };
    this.getStoreAddress = function(b, e) {
        return "undefined" !== typeof n.address && b ? (b(n.address), n.address) : d({
            methodName: "GetStoreAddress",
            parameters: [],
            successRootTagName: "StoreAddress",
            deserializationSettings: {
                stores: {
                    mode: "merge"
                },
                addresses: {
                    mode: "merge"
                },
                states: {
                    mode: "single",
                    name: "state"
                },
                countries: {
                    mode: "single",
                    name: "country"
                }
            },
            processResults: function(b) {},
            loadingMessage: "获取地址",
            useCache: !0,
            success: b,
            error: e
        });
    };
    this.getEmbroideryImageInfo = function(b, e, c) {
        $.ajax({
            type: "GET",
            headers: {
                Accept: "application/json; charset=utf-8",
                "Content-Type": "application/json; charset=utf-8"
            },
            url: b,
            xhrFields: r,
            success: function(c) {
                e({
                    url: b,
                    dataUrl: c.url,
                    stitchWidth: c.width,
                    stitchHeight: c.height
                });
            },
            error: c
        });
    };
    this.getSizeChartUrl = function(c, e, d) {
        c = encodeURIComponent(c.replace(/ /gi, ""));
        var f = "http://" + b.domain + "/images/publishers/" + b.publisherID + "/brands/" + c + "/SizeChart.jpg";
        e(f);

    };
    this.getInitialLoad = function(c, e, d, g, k) {
        service.ajaxCallStarted("InitialLoad", "初始化设计工具...");
        $.ajax({
            type: "POST",
            xhrFields: r,
            url: m.adjustUrl("/init/getConfig/?appKey=" + b.AppToken  +"&productId=" + c + "&embroideryMode=" + d),
            success: function(e) {
//                debugger;
                $('.design-tool, .design-product').fadeIn();
                service.ajaxCallEnded && service.ajaxCallEnded("InitialLoad");
                var m = {}, q = e.getElementsByTagName("error");
                if (q.length) {
                    k ? k($(q[0]).text()) : h(null, $(q[0]).text(), null, $(q[0]).text());
                } else {
                    var q = e.getElementsByTagName("FontList");
                    q.length && (m.fontCategoriesXml = $.parseXML(q[0].xml || (new XMLSerializer).serializeToString(q[0])));
                    q = e.getElementsByTagName("InkColorList");
                    q.length && (m.inkColorsXml = $.parseXML(q[0].xml || (new XMLSerializer).serializeToString(q[0])));
                    q = e.getElementsByTagName("ProductResult");
                    q.length ? m.productResultXml = $.parseXML(q[0].xml || (new XMLSerializer).serializeToString(q[0])) : 0 == c ? m.productResultXml = $.parseXML(service.createProductXml()) : (k = k || h, k(null, "Product not found or store suspended.", "Product not found or store suspended.", !0));
                    q = e.getElementsByTagName("DesignerToolTips");
                    q.length && (m.toolTipsXml = $.parseXML(q[0].xml || (new XMLSerializer).serializeToString(q[0])));
                    q = e.getElementsByTagName("ExcludedFontIDs");
                    q.length && (m.excludedFontsXml = $.parseXML(q[0].xml || (new XMLSerializer).serializeToString(q[0])));
                    q = e.getElementsByTagName("ThreadChartResult");
                    q.length && (m.threadChartsXml = $.parseXML(q[0].xml || (new XMLSerializer).serializeToString(q[0])));
                    q = e.getElementsByTagName("UploadImageTerms");
                    q.length && (m.uploadImageTerms = q[0].xml || (new XMLSerializer).serializeToString(q[0]), m.uploadImageTerms = htmlUnescape(m.uploadImageTerms.replace("<UploadImageTerms>", "").replace("</UploadImageTerms>", "")));
                    n[f("GetFontList", [d])] = m.fontCategoriesXml || $.parseXML("<FontList></FontList>");
                    n[f("GetInkColorList", [])] = m.inkColorsXml || $.parseXML("<InkColorList></InkColorList>");
                    n[f("GetProduct", [c, ""])] = m.productResultXml || $.parseXML("<ProductResult></ProductResult>");
                    n[f("GetStoreDesignerToolTips", [])] = m.toolTipsXml || $.parseXML("<DesignerToolTips></DesignerToolTips>");
                    n[f("GetExcludedFonts", [b.publisherID])] = m.excludedFontsXml || $.parseXML("<ExcludedFontIDs></ExcludedFontIDs>");
                    n[f("EmbroideryGetThreadChartList", [])] = m.threadChartsXml || $.parseXML("<ThreadChartResult></ThreadChartResult>");
                    console.debug('service.getFontCategories');
                    service.getFontCategories(d, function(b) {
                        m.fontCategories = b;
                    });
//                    console.debug('service.getStoreInkColors');
                    service.getStoreInkColors(function(b) {
                        m.inkColors = b;
                    });
//                    console.debug('service.getProductDetails');
                    service.getProductDetails(c, null, null, function(b) {
                        m.product = b;
                    });
//                    console.debug('service.getStoreDesignerToolTips');
                    service.getStoreDesignerToolTips(function(b) {
                        m.tooltips = b;
                    });
//                    console.debug('service.getExcludedFontIDs');
                    service.getExcludedFontIDs(function(b) {
                        m.excludedFontIDs = b;
                    });
//                    console.debug('service.getStoreThreadCharts');
                    service.getStoreThreadCharts(function(b) {
                        m.threadCharts = b;
                    });
                    m.hasGoogleFonts = !! findMatch(m.fontCategories, function(b) {
                        return 1E6 > b.font_style_id && 100 <= b.font_style_id;
                    });
                    ezdVars.HasGoogleFonts = m.hasGoogleFonts;
                    g && (m.hasGoogleFonts ? (e = ezdVars.DesignerLocation.replace("/designer/html5", "/designer/fonts/galleries/2/replacements.txt"), ".." === e && (e = "http://" + ezdVars.ApiDomain + "/designer/fonts/galleries/2/replacements.txt"), $.ajax({
                        type: "GET",
                        url: e,
                        success: function(b) {
                            state.fontReplacements = [];
                            b = b.split("\n");
                            for (var e = 0; e < b.length; e++) {
                                var c = b[e].split("\t"),
                                    c = {
                                        new_font_id: c[0],
                                        old_font_id: c[1],
                                        new_font_style_id: c[2],
                                        new_font_name: c[3],
                                        new_font_style_name: c[3].split(" ")[0]
                                    };
                                c.jspath = "REPLACE_DOMAIN_WITH/designer/fonts/galleries/2/" + c.new_font_style_name + "/" + c.new_font_name.replace(" ", "") + ".ttf.js";
                                c.gifpath = c.jspath.replace(".ttf.js", ".gif");
                                c.swfpath = c.jspath.replace(".ttf.js", ".swf");
                                state.fontReplacements.push(c);
                            }
                            g(m);
                        }
                    })) : g(m));
                }
            },
            error: function(b, e, c) {
                service.ajaxCallEnded && service.ajaxCallEnded("InitialLoad");
                k && k(null, b, e, c);
            }
        });
    };
    this.getStoreThreadCharts = function(b, e) {
        return d({
            methodName: "EmbroideryGetThreadChartList",
            parameters: [],
            successRootTagName: "ThreadChartList",
            deserializationSettings: {},
            processResults: function(b) {
                var e = [];
                if (!b || !b.ink_color_maps) {
                    return e;
                }
                for (var c = 0; c < b.ink_color_maps.length; c++) {
                    e = e.concat(b.ink_color_maps[c].ink_colors);
                }
                return e;
            },
            loadingMessage: "获取开发者颜色配置",
            useCache: !0,
            returnSync: !0,
            success: b,
            error: e
        });
    };
    this.getStoreThreadChartColors = function(b, e, c) {
        return d({
            methodName: "EmbroideryGetThreadColorList",
            parameters: [b],
            successRootTagName: "ThreadColorList",
            deserializationSettings: {},
            processResults: function(b) {
                return b;
            },
            loadingMessage: "获取开发者颜色配置",
            useCache: !0,
            returnSync: !0,
            success: e,
            error: c
        });
    };
    this.getStoreInkColors = function(b, e) {
        return d({
            methodName: "GetInkColorList",
            parameters: [],
            successRootTagName: "InkColorList",
            deserializationSettings: {
                ink_color_map_colors: {
                    mode: "merge"
                }
            },
            processResults: function(b) {
                var e = [];
                if (!b || !b.ink_color_maps) {
                    return e;
                }
                for (var c = 0; c < b.ink_color_maps.length; c++) {
                    if(b.ink_color_maps[c].ink_colors){
                        e = e.concat(b.ink_color_maps[c].ink_colors);
                    }
                }
                return e;
            },
            loadingMessage: "获取开发者颜色配置",
            useCache: !0,
            returnSync: !0,
            success: b,
            error: e
        });
    };
    this.getStoreToolTips = function(b, e) {
        return d({
            methodName: "GetStoreDesignerToolTips",
            parameters: [],
            successRootTagName: "DesignerToolTips",
            deserializationSettings: {},
            processResults: function(b) {
                return b.ToolTips;
            },
            loadingMessage: "获取工具提示",
            useCache: !0,
            returnSync: !0,
            success: b,
            error: e
        });
    };
    this.logIn = function(b, e, c, f, g) {
        return d({
            methodName: "LoginUser",
            parameters: [c],
            successRootTagName: "Login",
            deserializationSettings: {
                UserToken: {
                    mode: "single",
                    name: "UserToken"
                },
                SessionToken: {
                    mode: "single",
                    name: "sessionToken"
                },
                UserToken: {
                    mode: "single",
                    name: "UserToken"
                },
                UserName: {
                    mode: "single",
                    name: "userName"
                },
                UserRole: {
                    mode: "single",
                    name: "userRole"
                },
                Status: {
                    mode: "single",
                    name: "status"
                }
            },
            loadingMessage: "登录中",
            processResults: function(b) {
                window.eventManager && b.UserToken && (window.eventManager.trigger("gotSession", b), window.eventManager.trigger("userLoggedIn", b));
                return b;
            },
            success: f,
            error: g,
            postData: {
                Email: b,
                Password: e
            }
        });
    };
    this.createAccount = function(b, e, c, f, g, h, k, m) {
        return d({
            methodName: "RegisterUser",
            parameters: [h],
            successRootTagName: "Account",
            deserializationSettings: {
                UserToken: {
                    mode: "single",
                    name: "UserToken"
                },
                SessionToken: {
                    mode: "single",
                    name: "sessionToken"
                },
                UserToken: {
                    mode: "single",
                    name: "UserToken"
                },
                UserName: {
                    mode: "single",
                    name: "userName"
                },
                UserRole: {
                    mode: "single",
                    name: "userRole"
                },
                Status: {
                    mode: "single",
                    name: "status"
                }
            },
            loadingMessage: "注册中",
            processResults: function(b) {
                window.eventManager && b.UserToken && (window.eventManager.trigger("gotSession", b), window.eventManager.trigger("userLoggedIn", b));
                return b;
            },
            success: k,
            error: m,
            postData: {
                Email: c,
                Password: f,
                FirstName: b,
                LastName: e,
                ConfirmPassword: g
            }
        });
    };
    this.resetPassword = function(c, e, d) {
        var f = {
            methodName: "ResetPassword",
            loadingMessage: "重置密码",
            success: e,
            error: d,
            postData: {
                Email: c
            }
        };
        $.ajax({
            type: "POST",
            url: m.adjustUrl("/ResetPassword/" + b.AppToken),
            xhrFields: r,
            data: f.postData,
            success: function(b) {
                service.ajaxCallEnded && service.ajaxCallEnded("ResetPassword", f.loadingMessage);
                "OK" == b && e ? e() : ($(b), b = $(b).find("Error").text(), d(b));
            },
            error: function(b, e, c) {
                service.ajaxCallEnded && service.ajaxCallEnded("ResetPassword", f.loadingMessage);
                d && d(f, b, e, c);
            }
        });
    };
    this.logOff = function(c) {
        var e = "/" + b.AppURI + "/Account/LogOff/";
        service.ajaxCallStarted && service.ajaxCallStarted("LogOff", "注销...");
        $.ajax({
            type: "GET",
            url: m.adjustUrl(e),
            xhrFields: r,
            dataType: "text/html",
            complete: function(b) {
                service.ajaxCallEnded && service.ajaxCallEnded("LogOff");
                c && c(b);
            }
        });
    };
    this.createNewSession = function(c, e) {
        delete n.currentSessionInfo;
        $.ajax({
            type: "POST",
            url: m.adjustUrl("/" + b.AppURI + "/Cart/GetCartSession/"),
            xhrFields: r,
            data: {},
            dataType: "xml",
            success: function(b) {
                var e = parseInt($(b).find("UserToken").text()),
                    d = $(b).find("SessionToken").text();
                b = $(b).find("UserToken").text();
                e = {
                    UserToken: e,
                    UserToken: b,
                    sessionToken: d
                };
                n.currentSessionInfo = e;
                window.eventManager && window.eventManager.trigger("gotSession", e);
                c && c(e);
            },
            error: function(b, e, c) {
                handleError(b, e, c);
            }
        });
    };
    this.getOrCreateSession = function(c, e) {
        n.currentSessionInfo && c ? c(n.currentSessionInfo) : $.ajax({
            type: "POST",
            url: m.adjustUrl("/GetNewSession/" + b.AppToken),
            xhrFields: r,
            data: {},
            dataType: "xml",
            success: function(b) {
                var e = parseInt($(b).find("UserToken").text()),
                    d = $(b).find("SessionToken").text();
                b = $(b).find("UserToken").text();
                e = {
                    UserToken: e,
                    UserToken: b,
                    sessionToken: d
                };
                n.currentSessionInfo = e;
                window.eventManager && window.eventManager.trigger("gotSession", e);
                c && c(e);
            },
            error: function(b, e, c) {
                handleError(b, e, c);
            }
        });
    };
    this.getArtByID = function(b, e, c) {
        return d({
            methodName: "GetArtList",
            parameters: [0, b, 0, 0],
            queryStringParameters:{
                ArtId:b
            },
            successRootTagName: "ArtList",
            deserializationSettings: {},
            loadingMessage: "获取剪贴画",
            processResults: function(b) {
                return b = "" === b ? null : b.art[0];
            },
            success: e,
            error: c
        });
    };
    this.saveUserArt = function(d, e, f, k, n) {
        // debugger;
        var q = {
            methodName: "SaveArt",
            parameters: [d, e],
            successRootTagName: "Art",
            deserializationSettings: {
                ArtID: {
                    mode: "single"
                },
                UserToken: {
                    mode: "single"
                },
                SessionToken: {
                    mode: "single"
                },
                ArtName: {
                    mode: "single"
                }
            },
            loadingMessage: "保存剪贴画",
            processResults: function(b) {
                return b;
            },
            success: k,
            error: n
        };
        n || (n = h);
//        if(d){
            d = "/art/save/?appKey=" + b.AppToken + "&userToken=" + d + "&DesignID=" + ezdVars.DesignID;
            service.ajaxCallStarted && service.ajaxCallStarted("SaveArt", "处理图像中...");
            $.ajax({
                type: "POST",
                url: m.adjustUrl(d),
                xhrFields: r,
                dataType: "xml",
                data: f,
                cache: !1,
                contentType: !1,
                processData: !1,
                success: function(b) {
                    c(b, q);
                },
                error: function(b) {
                    service.ajaxCallEnded && service.ajaxCallEnded("SaveArt");
                    n && g(b);
                }
            });
//        }else{
//            service.getOrCreateSession(function(b) {
//                service.saveUserArt(b.UserToken, b.UserToken, f, k, n);
//            });
//        }
    };
    this.getArtInCategory = function(b, e, c, f, g) {
        return d({
            methodName: "GetArtList",
//            parameters: [b, 0, 0, 0, e ? e : "", c],
            parameters:[],
            successRootTagName: "ArtList",
            deserializationSettings: {},
            postData: {
                ArtCategoryId: b
            },
            loadingMessage: "获取剪贴画",
            processResults: function(b) {
                b = "" === b ? [] : b.art;
                for (var e = /.*\/images\/userart\/images\/(.*)\.[a-zA-Z0-9]{3}/, c = 0; c < b.length; c++) {
                    var d = b[c];
                    d.thumburl_large = changeJITImageSize(d.thumb_jit, 250, ".png");
                    if (d.art_path && e.test(d.art_path)) {
                        var f = e.exec(d.art_path);
                        f && 1 < f.length && (d.art_name_full = f[1]);
                    }
                }
                return b;
            },
            success: f,
            error: g
        });
    };
    this.getArtForUser = function(b, e, c) {
        return d({
            methodName: "GetArtList",
            parameters: [0, 0, b, ""],
            successRootTagName: "ArtList",
            deserializationSettings: {},
            loadingMessage: "获取剪贴画",
            processResults: function(b) {
                b = "" === b ? [] : b.art;
                for (var e = 0; e < b.length; e++) {
                    var c = b[e];
                    c.thumburl_large = changeJITImageSize(c.thumb_jit, 250, ".png");
                }
                return b;
            },
            success: e,
            error: c
        });
    };
    this.getArtCategoryList = function(b, e, c, f) {
        return d({
            methodName: "GetArtCategoryList",
            parameters: [b, e],
            queryStringParameters:{
                ArtCategoryId:b
            },
            successRootTagName: "ArtCategoryList",
            deserializationSettings: {},
            loadingMessage: "获取剪贴画分类",
            processResults: function(e) {
                e = "" === e ? [] : e.gallery_art_categories;
                if (b) {
                    for (var c = 0; c < e.length; c++) {
                        e[c].parent_id = b;
                    }
                }
                for (c = 0; c < e.length; c++) {
                    var d = e[c];
                    d.thumburl_large = changeJITImageSize(d.thumb_jit, 250, ".png");
                }
                return e;
            },
            success: c,
            error: f
        });
    };
    this.checkMobileUploads = function(b, e, c, f) {
        f || (f = h);
        return d({
            methodName: "CheckMobileUpload",
            parameters: [b],
            successRootTagName: "Art",
            deserializationSettings: {
                art_url: {
                    mode: "single"
                },
                art_id: {
                    mode: "single"
                },
                art_name: {
                    mode: "single"
                },
                width: {
                    mode: "single"
                },
                height: {
                    mode: "single"
                },
                Status: {
                    mode: "single"
                }
            },
            loadingMessage: "检查Email",
            processResults: function(b) {
                return b;
            },
            success: e,
            error: function(b, e, d, g) {
                if (g) {
                    var h = k($(b), {});
                    "PENDING" === h.status ? c(h) : f(b, e, d, g);
                } else {
                    f(b, e, d, g);
                }
            }
        });
    };
    this.getMobileUploadUserKey = function(c) {
        var e = "000" + parseInt(b.AppToken, 10).toString(36),
            e = e.substring(e.length - 3);
        c = parseInt(c, 10);
        return e += c.toString(36);
    };
    this.getProductCategories = function(b, e) {
        e || (e = h);
        return d({
            methodName: "GetProductCategoryList",
            parameters: [],
            successRootTagName: "ProductCategoryList",
            deserializationSettings: {
                vw_product_categories: {
                    name: "categories"
                }
            },
            loadingMessage: "获取产品分类",
            useCache: true,
            processResults: function(b) {
                b = b.categories;
                for (var e = 0; e < b.length; e++) {
                    var c = b[e],
                        d = c.thumburl;
                    "undefined" == typeof d && (d = c.thumburl_front);
                    c.thumburl = t(d);
                    c.thumburl_large = changeJITImageSize(c.thumburl, 150, ".png");
                }
                e = arrangeHierarchy(b, function(b) {
                    return b.product_category_id;
                }, function(b) {
                    return b.parent_id;
                });
                e.categoriesFlat = b;
                return e;
            },
            success: b,
            error: e
        });
    };
    this.findProductCategoryByID = function(b, e) {
        if (!b) {
            return null;
        }
        for (var c = 0; c < b.length; c++) {
            if (b[c].product_category_id == e) {
                return b[c];
            }
            if ("undefined" !== typeof b[c].children) {
                var d = m.findProductCategoryByID(b[c].children, e);
                if (d) {
                    return d;
                }
            }
        }
        return null;
    };
    this.getProductsByCategory = function(b, e, c, f, g) {
        var h = m.findProductCategoryByID(n.productCategories, b);
        var request = {};
        if(b){
            request.productCategoryId = b;
        }else{
            request.keyWord= e ;
        }
        return h && h.products && !e && c ? (f && f(h.products), h.products) : d({
            methodName: "GetProductList",
            parameters: [b, e ? e : "", c],
            queryStringParameters:request,
            successRootTagName: "ProductList",
            deserializationSettings: {
                products: {
                    name: "product",
                    mode: "merge"
                }
            },
            loadingMessage: "获取产品列表",
            useCache: !0,
            processResults: function(b) {
                b = b.CS;
                h && !e && c && (h.products = b);
                if (b && b.length) {
                    for (var d = 0; d < b.length; d++) {
                        var f = b[d];
                        f.thumburl_large = changeJITImageSize(t(f.thumburl_front), 150, ".png");
                    }
                }
                return b;
            },
            success: f,
            error: g
        });
    };
    this.getProductDetails = function(b, e, c, g, h) {
        var request = {}
        if(c){
            request.productId = c;
        }else{
            request.productId = b;
            request.productStyleId = e ||'';
        }
        var m = {
            methodName: c ? "GetProductFromBarCode" : "GetProduct",
            parameters: c ? [c] : [b, e ? e : ""],
            queryStringParameters: request,
            successRootTagName: "ProductResult",
            useCache: true,
            returnSync: true,
            deserializationSettings: {
                products: {
                    name: "product",
                    mode: "merge"
                }
            },
            loadingMessage: "获取产品详情",
            processResults: function(c) {
                c.product_styles && 1 === c.product_styles.length ? c.product_style = c.product_styles[0] : c.product_styles && e && (c.product_style = findMatch(c.product_styles, function(b) {
                    return b.product_style_id == e;
                }));
                for (var d = 0; d < c.product_styles.length; d++) {
                    var g = c.product_styles[d];
                    "GetProduct" != m.methodName || e || (n[f("GetProduct", [b, g.product_style_id])] = n[f("GetProduct", [b, ""])]);
                    if (g.is_default || !c.defaultStyle) {
                        c.defaultStyle = g;
                    }
                    g.product_regions && 1 == g.product_regions.length && "undefined" == typeof g.product_regions[0].is_default && (g.product_regions = []);
                    for (var h = 0; h < g.product_regions.length; h++) {
                        var k = g.product_regions[h];
                        1 != k.is_default || g.defaultRegion || (g.defaultRegion = k);
                        k.originalRegion = k.region;
                        k.region = k.region.split(",");
                        for (var q = 0; q < k.region.length; q++) {
                            k.region[q] *= 0.5;
                        }
                        k.region[0] += 0.5 * (500 - g["image_width_" + k.side]);
                    }!g.defaultRegion && c.regions && c.regions.length && (g.defaultRegion = c.regions[0]);
                    if (g.sizes && g.sizeids) {
                        for (k = g.sizes.split(","), q = g.sizeids.split(","), g.sizeData = [], h = 0; h < k.length; h++) {
                            g.sizeData.push({
                                name: k[h],
                                id: q[h]
                            });
                        }
                    }
                }
                return c;
            },
            success: g,
            error: h
        };
        return b || c ? d(m) : (c = $.parseXML(this.createProductXml()), c = k($(c).children()[0], m.deserializationSettings), h = m.processResults(c), g && g(h || c), h || c);
    };
    this.createProductXml = function() {
        return '<ProductResult><products product_id="0" manufacturer="Default" manufacturer_sku="0" sku="0" name="Placeholder Product" customizable="1" can_print="1" can_digital_print="1" can_screen_print="0" can_embroider="0" can_handle_sleeves="0" enable_team_name_numbers="1" has_back="0" has_third_side="0" has_fourth_side="0" third_side_name="Left Sleeve" fourth_side_name="Right Sleeve" is_static="0" long_description=" "><product_styles product_style_id="0" is_default="1" color="WHITE" html_color="FFFFFF" customizable="1" can_print="1" can_digital_print="1" can_screen_print="1" can_embroider="1" unit_price="0.00" canvas_price="0.00" name_price="0.00" number_price="0.00" sizes="11 Size" sizeids="0" image_width_front="500" image_height_front="500"><product_regions product_region_id="0" side="front" is_default="1" name="Full" region="80,30,840,830" render_width_inches="12.00" side_order="1" region_order="1" imgurl="REPLACE_DOMAIN_WITH/designer/html5/ds/images/productImage.png" thumburl="REPLACE_DOMAIN_WITH/designer/html5/ds/images/productImage.png"><print_mask/></product_regions></product_styles></products></ProductResult>';
    };
    this.getProductColors = function(b, e, c) {
        c = {
            methodName: "GetProduct",
            parameters: [b, ""],
            successRootTagName: "ProductResult",
            deserializationSettings: {
                products: {
                    name: "product",
                    mode: "merge"
                }
            },
            loadingMessage: "获取产品颜色（款式）",
            useCache: !0,
            processResults: function(b) {
                for (var e = 0; e < b.product_styles.length; e++) {
                    var c = b.product_styles[e];
                    if (c.sizes && c.sizeids) {
                        var d = c.sizes.split(","),
                            f = c.sizeids.split(",");
                        c.sizeData = [];
                        for (var g = 0; g < d.length; g++) {
                            c.sizeData.push({
                                name: d[g],
                                id: f[g]
                            });
                        }
                    }
                }
                return b.product_styles;
            },
            success: e,
            error: c
        };
        if (b) {
            return d(c);
        }
        b = $.parseXML(this.createBlankProductColors());
        b = k($(b).children()[0], c.deserializationSettings);
        c = c.processResults(b);
        e && e(c || b);
        return c || b;
    };
    this.createBlankProductColors = function() {
        var b;
        return b = '<ProductResult><products product_id="0"><product_styles product_style_id="-1" is_default="0" color="ASH" html_color="D1D4D3"></product_styles><product_styles product_style_id="-2" is_default="0" color="BLACK" html_color="000000"></product_styles><product_styles product_style_id="-3" is_default="0" color="CACTUS GREEN" html_color="939871"></product_styles><product_styles product_style_id="-4" is_default="0" color="CAROLINA BLUE" html_color="6299DD"></product_styles><product_styles product_style_id="-5" is_default="0" color="CHARITY PINK" html_color="F8B4BE"></product_styles><product_styles product_style_id="-6" is_default="0" color="CITY GREEN" html_color="3E4723"></product_styles><product_styles product_style_id="-7" is_default="0" color="HEATHER GREY" html_color="B7B7B7"></product_styles><product_styles product_style_id="-8" is_default="0" color="KELLY GREEN" html_color="009A63"></product_styles><product_styles product_style_id="-9" is_default="0" color="KEY LIME" html_color="BAD97E"></product_styles><product_styles product_style_id="-10" is_default="0" color="LIGHT BLUE" html_color="6AB2E7"></product_styles><product_styles product_style_id="-11" is_default="0" color="NEON YELLOW" html_color="EEEA84"></product_styles><product_styles product_style_id="-12" is_default="0" color="PURPLE" html_color="4D2379"></product_styles><product_styles product_style_id="-13" is_default="0" color="RED" html_color="C10435"></product_styles><product_styles product_style_id="-14" is_default="0" color="ROYAL BLUE" html_color="0079DB"></product_styles><product_styles product_style_id="-15" is_default="0" color="STORM GREY" html_color="326AAE"></product_styles><product_styles product_style_id="-16" is_default="0" color="TEXAS ORANGE" html_color="AE6134"></product_styles><product_styles product_style_id="0" is_default="1" color="WHITE" html_color="FFFFFF"></product_styles></products></ProductResult>'.replace(/\<\/product_styles/gi,
            '<product_regions product_region_id="0" side="front" is_default="1" name="Full" region="80,30,840,830" render_width_inches="12.00" side_order="1" region_order="1" imgurl="REPLACE_DOMAIN_WITH/designer/html5/ds/images/productImage.png" thumburl="REPLACE_DOMAIN_WITH/designer/html5/ds/images/productImage.png"><print_mask/></product_regions></product_styles');
    };
    this.getDistress = function(b, e, c) {
        this.getDistressList(function(d) {
            for (var f = 0; f < d.length; f++) {
                if (d[f].distress_id == b) {
                    e(d[f]);
                    return;
                }
            }
            c && c("Distress not found.");
        }, c);
    };
    this.getDistressList = function(b, e) {
        return d({
            methodName: "GetDistressList",
            parameters: [],
            successRootTagName: "DistressList",
            deserializationSettings: {},
            loadingMessage: "获取印刷特效",
            useCache: !0,
            processResults: function(b) {
                for (var e = 0; e < b.distresses.length; e++) {
                    var c = b.distresses[e];
                    c.distress_path = t(c.distress_path);
                    c.distress_small_path = t(c.distress_small_path);
                    c.distress_thumb_path = t(c.distress_thumb_path);
                    c.distress_path_jpg = c.distress_path.replace(".png", ".jpg");
                    c.distress_small_path_jpg = c.distress_small_path.replace(".png", ".jpg");
                    c.distress_thumb_path_jpg = c.distress_thumb_path.replace(".png", ".jpg");
                }
                return b.distresses;
            },
            success: b,
            error: e
        });
    };
    //callback2 add by hl
    this.loadFont = function(font, callback, text, errCallback, callback2) {
        // debugger;
        var tagId = font.font || font.fontFamily;
        var fontId = font.font_id || font.fontId;
        var src = "//" + b.domain + "/font/getJsFont/?appKey=" + b.AppToken + "&fontid=" + fontId + "&text=" + encodeURIComponent(text);
        service.loadScript(src, tagId, callback, errCallback, callback2)
    };
    this.getExcludedFontIDs = function(c, e) {
        return d({
            methodName: "GetExcludedFonts",
            parameters: [b.publisherID],
            successRootTagName: "ExcludedFontIDs",
            deserializationSettings: {},
            loadingMessage: "获取字体信息",
            useCache: !0,
            returnSync: !0,
            processResults: function(b) {
                return b.Font;
            },
            success: c,
            error: e,
            noAppTokenInUrl: !0
        });
    };
    this.getFontCategories = function(b, e, c) {
        return d({
            methodName: "GetFontList",
            parameters: [b],
            successRootTagName: "FontList",
            deserializationSettings: {},
            loadingMessage: "获取字体信息",
            useCache: !0,
            returnSync: !0,
            processResults: function(b) {
                if (!b || !b.font_styles) {
                    return [];
                }
                for (var e = 0; e < b.font_styles.length; e++) {
                    var c = b.font_styles[e];
                    c.font_style = c.style;
                    0 == c.FontCount && (b.font_styles.splice(e, 1), e--);
                }
                return b.font_styles;
            },
            success: e,
            error: c
        });
    };
    this.getFontsByCategory = function(b, e, c) {
        return d({
            methodName: "GetFontList",
            queryStringParameters:{
                fontCategorieId:b
            },
            parameters: [b, "true"],
            successRootTagName: "FontList",
            deserializationSettings: {},
            loadingMessage: "获取字体信息",
            useCache: !0,
            processResults: function(b) {
                for (var e = 0; e < b.fonts.length; e++) {
                    var c = b.fonts[e],
                        d = c.jspath.split("/");
                    c.fontFamily = c.name; //d[d.length - 1].split(".")[0].replace("'", "");
                    c.font = c.name;
                }
                return b.fonts;
            },
            success: e,
            error: c
        });
    };
    this.getStoreDesignerToolTips = function(b, e) {
        return d({
            methodName: "GetStoreDesignerToolTips",
            parameters: [],
            successRootTagName: "DesignerToolTips",
            deserializationSettings: {},
            loadingMessage: "获取工具提示",
            useCache: !0,
            processResults: function(b) {
                return b;
            },
            success: b,
            error: e
        });
    };

    this.loadScript = function(src, e, c, d, callback) {
        // debugger;
        var f = document.getElementsByTagName("head")[0],
            g = document.createElement("script");
        var id = e.replace(/ /g,'');
        g.setAttribute('id', id);
        g.type = "text/javascript";

        g.src = src
        $('#' + e.replace(/ /g,'')).remove();

        f.appendChild(g);

        //callback add by hl
        // g.onload = c;
        g.onload = function(){
            c.call();
            if(callback)
                callback.call();
        }

        g.onerror = d;
        // g.src = "//" + b.domain + "/getClounFont/1/2/"+d;//b;
        // g.src="http://open.dev.jzw.la/cloud_font/MicrosoftJhengHei/Regular.js"
        // g.src="/Microsoft_JhengHei_400.font-2.js";
        // g.src = "/Regular.js";
        //g.src ="/Arial_400.font.js";
    };
    this.loadCss = function(b) {
        var e = document.createElement("link");
        e.setAttribute("rel", "stylesheet");
        e.setAttribute("type", "text/css");
        e.setAttribute("href", b);
        document.getElementsByTagName("head")[0].appendChild(e);
        return e;
    };
    this.getDesignCategoryList = function(b, e, c) {
        // debugger;
        return d({
            methodName: "GetDesignCategoryList",
            parameters: [b],
            successRootTagName: "StoreDesignCategoryList",
            deserializationSettings: {},
            loadingMessage: "获取模版市场素材分类",
            useCache: !0,
            processResults: function(b) {
                var e = "undefined" !== typeof kioskFlowType && "NAMEDROP" === kioskFlowType ? ["Bachelorette", "Choir", "Baseball Tournament", "Fashion"] : [],
                    c = b,
                    c = b && b.store_design_categories ? b.store_design_categories : [];
                for (b = 0; b < c.length; b++) {
                    var d = c[b];
                    searchInArray(e, d.name) && (d.enableKioskNameDrop = !0);
                    d.thumburl_large = changeJITImageSize(d.thumburl, 250, ".png");
                }
                return c;
            },
            success: e,
            error: c
        });
    };
    this.getDesignCategoryTexts = function(b, e, c) {
        // debugger;
        return d({
            methodName: "GetDesignCategoryTexts",
            parameters: [b],
            successRootTagName: "CategoryCanvasTexts",
            deserializationSettings: {},
            loadingMessage: "获取模版市场素材 Texts",
            useCache: !0,
            processResults: function(b) {
                var e = b;
                return e = b && b.canvas_text ? b.canvas_text : [];
            },
            success: e,
            error: c
        });
    };
    this.getDesignsByCategory = function(b, e, c, f) {
        // debugger;
        return d({
            methodName: "GetDesignList",
            parameters: [b, e ? e : ""],
            successRootTagName: "StoreDesignList",
            deserializationSettings: {},
            loadingMessage: "获取模版市场素材",
            useCache: !0,
            processResults: function(b) {
                var e = b,
                    e = b && 0 !== b.length ? b.designs : [];
                for (b = 0; b < e.length; b++) {
                    var c = e[b];
                    c.isFrame = 0 <= c.name.toUpperCase().indexOf("FRAME");
                    c.thumburl_large = changeJITImageSize(c.thumburl, 250, ".png");
                }
                return e;
            },
            success: c,
            error: f
        });
    };
    this.getDesignsByUser = function(b, e, c) {
        // debugger;
        return d({
            methodName: "GetUserDesignList",
            parameters: [b],
            successRootTagName: "UserDesignList",
            deserializationSettings: {},
            loadingMessage: "获取模版市场素材",
            processResults: function(b) {
                var e = b,
                    e = b && 0 !== b.length ? b.designs : [];
                for (b = 0; b < e.length; b++) {
                    var c = e[b];
                    c.thumburl_large = changeJITImageSize(c.imgurl, 250, ".png");
                }
                return e;
            },
            success: e,
            error: c
        });
    };
    this.createDesignXml = function() {
        return '<ThisDesign><designs table_name="design" name="未命名" can_customize="1" can_screen_print="1" is_embroidery="0" designer_version="" disable_product_update_front="0" disable_product_update_color="0" disable_product_update_back="0" disable_canvas_add="0"><product_styles /></designs><canvases table_name="canvas" location="Front"  width="500" height="500" bgcolor="ffffff" is_distressed="0" shadow="0" region_name="Full" disable_image_add="0" disable_text_add="0" disable_image_delete="0" disable_text_delete="0" imgurl=""><canvas_embroidery /></canvases></ThisDesign>';
    };
    this.getDesign = function(b, e, c) {
        // debugger;
        c = {
            methodName: "GetDesign",
            parameters: [b],
            successRootTagName: "ThisDesign",
            deserializationSettings: {
                font_styles: {
                    mode: "single",
                    name: "fontStyle"
                },
                designs: {
                    mode: "merge",
                    name: "designInfo"
                },
                art: {
                    mode: "single",
                    name: "art"
                },
                fonts: {
                    mode: "single",
                    name: "font"
                },
                canvas_text_embroidery: {
                    mode: "single"
                },
                product_styles: {
                    mode: "single",
                    name: "productStyle"
                }
            },
            loadingMessage: "获取模版市场素材",
            useCache: !0,
            processResults: function(b) {
                b.isFrame = 0 <= b.name.toUpperCase().indexOf("FRAME");
                if (b.canvas_text) {
                    for (var e = 0; e < b.canvas_text.length; e++) {
                        var c = b.canvas_text[e];
                        c.type = "text";
                        var d = c.font;
                        d.font_id = c.font_id;
                        var f = d.fontStyle.jspath.split("/");
                        if (d.fontStyle.canvas_text_embroidery) {
                            c.canvas_text_embroidery = d.fontStyle.canvas_text_embroidery;
                            delete d.fontStyle.canvas_text_embroidery;
                            for (var g in c.canvas_text_embroidery) {
                                c[g] = c.canvas_text_embroidery[g], c.isEmbroidery = !0;
                            }
                        }
                        f = f[f.length - 1].split(".")[0].replace("'", "");
                        d.fontStyle.font_family = d.font_family = d.fontFamily = f;
                        d.jspath = service.adjustUrl(d.fontStyle.jspath);
                        d.fontttfpath = service.adjustUrl(d.fontStyle.fontttfpath);
                        d.altfontttfpath = service.adjustUrl(d.fontStyle.altfontttfpath);
                        d.fontswfpath = service.adjustUrl(d.fontStyle.fontswfpath);
                        d.localswfpath = service.adjustUrl(d.fontStyle.localswfpath);
                        d.gifpath = service.adjustUrl(d.fontswfpath.replace(/swf/gi, "gif"));
                        c.shadow_color = "#000000";
                        c.shadow_value = 0;
                        c.wrap_amount && (c.wrap_amount = parseFloat(c.wrap_amount));
                        c.kerning && (c.kerning = parseFloat(c.kerning));
                        c.stroke_width && (c.stroke_width = parseFloat(c.stroke_width) / 2);
                    }
                } else {
                    b.canvas_text = [];
                }
                if (b.canvas_art) {
                    for (e = 0; e < b.canvas_art.length; e++) {
                        c = [];
                        d = b.canvas_art[e];
                        d.canvas_art_rendered && (d.canvas_art_rendered = d.canvas_art_rendered.replace("\\", "~"));
                        for (var h in d) {
                            "color" === h.substring(0, 5) && (g = getColorString(d[h], !0), c.push({
                                name: h,
                                value: g
                            }));
                        }
                        g = [];
                        for (d = 0; d < c.length; d++) {
                            if (f = c[d], -1 == f.name.search("_mapped")) {
                                var k = searchInArray(c, f.name + "_mapped", "name");
                                !1 !== k && (f.value = k.value);
                                "ffffffff" == f.value && (f.value = "ffffff");
                                g.push({
                                    name: f.name,
                                    value: f.value
                                });
                            }
                        }
                        c = g;
                        b.canvas_art[e].colors = c;
                    }
                } else {
                    b.canvas_art = [];
                }
                normalizeColorStrings(b);
                for (e = 0; e < b.canvases.length; e++) {
                    var m = b.canvases[e];
                    m.canvas_text = [];
                    m.canvas_art = [];
                    for (d = 0; d < b.canvas_text.length; d++) {
                        c = b.canvas_text[d], c.canvas_id == m.canvas_id && m.canvas_text.push(c);
                    }
                    for (d = 0; d < b.canvas_art.length; d++) {
                        h = b.canvas_art[d], h.canvas_id == m.canvas_id && m.canvas_art.push(h);
                    }
                    (function() {
                        var b = m;
                        b.isEmpty = function() {
                            return !(b.canvas_text && b.canvas_text.length) && !(b.canvas_art && b.canvas_art.length);
                        };
                    })();
                }
                delete b.canvas_text;
                delete b.canvas_art;
                b.currentCanvasIndex = 0;
                Object.defineProperty(b, "canvas", {
                    get: function() {
                        return b.canvases[b.currentCanvasIndex];
                    }
                });
                Object.defineProperty(b, "canvas_text", {
                    get: function() {
                        return b.canvas.canvas_text;
                    }
                });
                Object.defineProperty(b, "canvas_art", {
                    get: function() {
                        return b.canvas.canvas_art;
                    }
                });
                b.isEmpty = function() {
                    var c;
                    if (!b.canvases || !b.canvases.length) {
                        return !0;
                    }
                    for (var e = 0; e < b.canvases.length; e++) {
                        if (c = b.canvases[e], !c.isEmpty()) {
                            return !1;
                        }
                    }
                    return !0;
                };
            },
            success: e,
            error: c
        };
        return b ? d(c) : (b = $.parseXML(this.createDesignXml()), b = k($(b).children()[0], c.deserializationSettings), c = c.processResults(b), e && e(c || b), c || b);
    };
    this.getCartPaymentMethods = function(b, c, f) {
        return d({
            methodName: "GetCartPaymentMethods",
            parameters: [b],
            successRootTagName: "payment_methods",
            deserializationSettings: {},
            loadingMessage: "获取付款方式",
            processResults: function(b) {
                return b.payment_method;
            },
            useSSL: jQuery.support.cors,
            success: c,
            error: f
        });
    };
    this.getProductQuote = function(b, c, f, g, h, k, m, n, q, r) {
        b = {
            methodName: "GetProductQuote",
            parameters: [b, c, f],
            successRootTagName: "ProductPriceGrid",
            deserializationSettings: {
                Range: {
                    name: "ranges",
                    mode: "array"
                },
                Low: {
                    name: "low",
                    mode: "single"
                },
                High: {
                    name: "high",
                    mode: "single"
                },
                Price: {
                    name: "price",
                    mode: "single"
                },
                CombinePrintAndProduct: {
                    name: "combinePrintAndProduct",
                    mode: "single"
                },
                ApplyQtyDiscToPrinting: {
                    name: "applyQtyDiscToPrinting",
                    mode: "single"
                },
                Setup: {
                    name: "setup",
                    mode: "single"
                },
                NamePrice: {
                    name: "namePrice",
                    mode: "single"
                },
                NumberPrice: {
                    name: "numberPrice",
                    mode: "single"
                },
                QtyDiscPercent: {
                    name: "qtyDiscPercent",
                    mode: "single"
                },
                PriceDiscountable: {
                    name: "priceDiscountable",
                    mode: "single"
                }
            },
            loadingMessage: "获取报价",
            processResults: function(b) {
                for (var c = 0; c < b.ranges.length; c++) {
                    var e = b.ranges[c];
                    e.low = parseFloat(e.low);
                    e.high = parseFloat(e.high);
                    e.high < b.min_quantity ? (b.ranges.splice(c, 1), c--) : (e.low < b.min_quantity && (e.low = b.min_quantity), e.price = parseFloat(e.price), e.combinePrintAndProduct = "true" == e.combinePrintAndProduct.toLowerCase(), e.applyQtyDiscToPrinting = "true" == e.applyQtyDiscToPrinting.toLowerCase(), e.setup = e.setup ? parseFloat(e.setup) : 0, e.namePrice = e.namePrice ? parseFloat(e.namePrice) : 0, e.numberPrice = e.numberPrice ? parseFloat(e.numberPrice) : 0, e.qtyDiscPercent = e.qtyDiscPercent ?
                        parseFloat(e.qtyDiscPercent) : 0, e.priceDiscountable = e.priceDiscountable ? parseFloat(e.priceDiscountable) : 0);
                }
                b.ranges.sort(function(b, e) {
                    return b.low - e.low;
                });
                return b.ranges;
            },
            success: q,
            error: r
        };
        b.postData = {
            ColorsFront: g,
            ColorsSleeveRight: m,
            ColorsBack: h,
            ColorsSleeveLeft: k,
            AllVector: n
        };
        return d(b);
    };
    this.getQuote = function(b, e, c, f, g, h, k, m, n, q, r, t, M, A, G) {
        b = {
            methodName: "GetProductQuoteByQty",
            parameters: [b, e, c, f, g, h, k, m, n, q, t, M],
            successRootTagName: null,
            processResults: function(b) {
                if (b.ranges) {
                    for (var e = 0; e < b.ranges.length; e++) {
                        var c = b.ranges[e];
                        c.low = parseFloat(c.low);
                        c.high = parseFloat(c.high);
                        c.high < b.min_quantity ? (b.ranges.splice(e, 1), e--) : (c.low < b.min_quantity && (c.low = b.min_quantity), c.price = parseFloat(c.price), c.combinePrintAndProduct = "true" == c.combinePrintAndProduct.toLowerCase(), c.applyQtyDiscToPrinting = "true" == c.applyQtyDiscToPrinting.toLowerCase(), c.setup = c.setup ? parseFloat(c.setup) : 0, c.namePrice = c.namePrice ? parseFloat(c.namePrice) : 0, c.numberPrice = c.numberPrice ? parseFloat(c.numberPrice) : 0, c.qtyDiscPercent = c.qtyDiscPercent ?
                            parseFloat(c.qtyDiscPercent) : 0, c.priceDiscountable = c.priceDiscountable ? parseFloat(c.priceDiscountable) : 0);
                    }
                    b.ranges.sort(function(b, c) {
                        return b.low - c.low;
                    });
                    return b.ranges;
                }
                for (e in b) {
                    b[e] = parseFloat(b[e]);
                }
            },
            deserializationSettings: {
                Range: {
                    name: "ranges",
                    mode: "array"
                },
                Low: {
                    name: "low",
                    mode: "single"
                },
                High: {
                    name: "high",
                    mode: "single"
                },
                Price: {
                    name: "price",
                    mode: "single"
                },
                CombinePrintAndProduct: {
                    name: "combinePrintAndProduct",
                    mode: "single"
                },
                ApplyQtyDiscToPrinting: {
                    name: "applyQtyDiscToPrinting",
                    mode: "single"
                },
                Setup: {
                    name: "setup",
                    mode: "single"
                },
                NamePrice: {
                    name: "namePrice",
                    mode: "single"
                },
                NumberPrice: {
                    name: "numberPrice",
                    mode: "single"
                },
                QtyDiscPercent: {
                    name: "qtyDiscPercent",
                    mode: "single"
                },
                PriceDiscountable: {
                    name: "priceDiscountable",
                    mode: "single"
                },
                AppToken: {
                    name: "AppToken",
                    mode: "single"
                },
                ProductID: {
                    name: "productID",
                    mode: "single"
                },
                ProductStyleID: {
                    name: "productStyleID",
                    mode: "single"
                },
                ProductStyleSizeID: {
                    name: "productStyleSizeID",
                    mode: "single"
                },
                Qty: {
                    name: "qty",
                    mode: "single"
                },
                PrintPrice: {
                    name: "printPrice",
                    mode: "single"
                },
                SetupPrice: {
                    name: "setupPrice",
                    mode: "single"
                },
                EachProduct: {
                    name: "eachProduct",
                    mode: "single"
                },
                NameNumberPrice: {
                    name: "nameNumberPrice",
                    mode: "single"
                },
                EachTotal: {
                    name: "eachTotal",
                    mode: "single"
                },
                TotalPrice: {
                    name: "totalPrice",
                    mode: "single"
                },
                QuantityDiscount: {
                    name: "quantityDiscount",
                    mode: "single"
                }
            },
            loadingMessage: "获取报价",
            success: A,
            error: G
        };
        b.postData = {
            ColorsFront: k,
            ColorsSleeveRight: q,
            ColorsBack: m,
            ColorsSleeveLeft: n,
            AllVector: r
        };
        return d(b);
    };
    this.checkStyleInventory = function(b, c, f) {
        return d({
            methodName: "CheckStyleInventory",
            parameters: [b],
            successRootTagName: "Sizes",
            deserializationSettings: {
                Size: {
                    name: "sizes"
                }
            },
            loadingMessage: "检查库存",
            processResults: function(b) {
                return b;
            },
            success: c,
            error: f
        });
    };
    this.addItemToCart = function(c, e, d, f, g, k, n, q) {
        if (m.lockCart) {
            setTimeout(function() {
                m.addItemToCart(c, e, d, f, g, k, n, q);
            }, 100);
        } else {
            q || (q = h);
            var t = "/" + b.AppURI + "/Cart/Add/" + c + "/" + e + "/" + d + "/" + f + "/" + g + "/" + k;
            service.ajaxCallStarted && service.ajaxCallStarted("AddItemToCart", "保存到购物车...");
            m.lockCart = !0;
            $.ajax({
                type: "POST",
                url: m.adjustUrl(t),
                xhrFields: r,
                dataType: "text",
                data: {
                    Designer: 1
                },
                success: function(b) {
                    m.lockCart = !1;
                    service.ajaxCallEnded && service.ajaxCallEnded("AddItemToCart");
                    n && n(b);
                },
                error: function(b) {
                    m.lockCart = !1;
                    service.ajaxCallEnded && service.ajaxCallEnded("AddItemToCart");
                    q && q(b);
                }
            });
        }
    };
    this.addItemToCartWithName = function(c, e, d, f, g, k, n, q, t, D) {
        if (m.lockCart) {
            setTimeout(function() {
                m.addItemToCartWithName(c, e, d, f, g, k, n, q, t, D);
            }, 100);
        } else {
            D || (D = h);
            var V = "/" + b.AppURI + "/Cart/AddWithName/" + c + "/" + e + "/" + d + "/" + f + "/" + g + "/" + k,
                V = V + ("/" + (n.name || "-") + "/" + (q.number || "-") + "/" + n.color + "/" + n.size + "/" + n.font_id + "/" + q.size + "/" + q.font_id + "/" + q.color);
            service.ajaxCallStarted && service.ajaxCallStarted("AddItemToCart", "添加到购物车...");
            m.lockCart = !0;
            $.ajax({
                type: "POST",
                url: m.adjustUrl(V),
                xhrFields: r,
                dataType: "text",
                data: {
                    Designer: 1
                },
                success: function(b) {
                    m.lockCart = !1;
                    service.ajaxCallEnded && service.ajaxCallEnded("AddItemToCart");
                    t && t(b);
                },
                error: function(b) {
                    m.lockCart = !1;
                    service.ajaxCallEnded && service.ajaxCallEnded("AddItemToCart");
                    D && D(b);
                }
            });
        }
    };
    this.removeNameNumberFromCart = function(b, c, f, g, h) {
        if (m.lockCart) {
            setTimeout(function() {
                m.removeNameNumberFromCart(b, c, f, g, h);
            }, 100);
        } else {
            return d({
                methodName: "SaveCartItemNameNumberRemove",
                parameters: [b, c, f],
                successRootTagName: "OK",
                deserializationSettings: {},
                loadingMessage: "获取 球衣模式 子项",
                processResults: null,
                success: g,
                error: h,
                postData: {
                    designer: 1
                },
                lockCart: !0
            });
        }
    };
    this.updateNameNumberFont = function(b, c, f, g, h, k) {
        if (m.lockCart) {
            setTimeout(function() {
                m.updateNameNumberFont(b, c, f, g, h, k);
            }, 100);
        } else {
            var n = {
                methodName: "SaveCartItemNameNumberFont",
                parameters: [b, c],
                successRootTagName: "OK",
                deserializationSettings: {},
                loadingMessage: "更新 球衣模式 子项",
                processResults: null,
                success: h,
                error: k,
                postData: {
                    designer: 1
                },
                lockCart: !0
            }, q = n.postData;
            q.Color = f.color;
            q.NameSize = f.size;
            q.NameFontID = f.font_id;
            q.NumberColor = g.color;
            q.NumberSize = g.size;
            q.NumberFontID = g.font_id;
            return d(n);
        }
    };
    this.updateNameNumber = function(b, c, f, g, h, k, n, q) {
        if (m.lockCart) {
            setTimeout(function() {
                m.updateNameNumber(b, c, f, g, h, k, n, q);
            }, 100);
        } else {
            var r = {
                methodName: "SaveCartItemNameNumber",
                parameters: [b, c, f, g],
                successRootTagName: "OK",
                deserializationSettings: {},
                loadingMessage: "更新 球衣模式 子项",
                processResults: null,
                success: n,
                error: q,
                postData: {
                    designer: 1
                },
                lockCart: !0
            }, t = r.postData;
            t.Name = h;
            t.Number = k;
            return d(r);
        }
    };
    this.saveCartCouponCode = function(b, c, f, g) {
        if (m.lockCart) {
            setTimeout(function() {
                m.saveCartCouponCode(b, c, f, g);
            }, 100);
        } else {
            return d({
                methodName: "SaveCartCouponCode",
                parameters: [b, c],
                successRootTagName: "OK",
                deserializationSettings: {},
                loadingMessage: "检查优惠券",
                processResults: null,
                success: f,
                error: g,
                postData: {
                    designer: 1
                },
                lockCart: !0
            });
        }
    };
    this.removeCartItemSize = function(c, e, d, f) {
        if (m.lockCart) {
            setTimeout(function() {
                m.removeCartItemSize(c, e, d, f);
            }, 100);
        } else {
            f || (f = h);
            var g = "/" + b.AppURI + "/Cart/RemoveSize/" + c + "/" + e;
            service.ajaxCallStarted && service.ajaxCallStarted("RemoveCartItemSize", "删除尺码...");
            m.lockCart = !0;
            $.ajax({
                type: "POST",
                url: m.adjustUrl(g),
                xhrFields: r,
                dataType: "text",
                data: {
                    Designer: 1
                },
                success: function(b) {
                    m.lockCart = !1;
                    service.ajaxCallEnded && service.ajaxCallEnded("RemoveCartItemSize");
                    d && d(b);
                },
                error: function(b) {
                    m.lockCart = !1;
                    service.ajaxCallEnded && service.ajaxCallEnded("RemoveCartItemSize");
                    f && f(b);
                }
            });
        }
    };
    this.removeCartItem = function(c, e, d, f) {
        if (m.lockCart) {
            setTimeout(function() {
                m.removeCartItem(c, e, d, f);
            }, 100);
        } else {
            f || (f = h);
            var g = "/" + b.AppURI + "/Cart/Remove/" + c + "/" + e;
            service.ajaxCallStarted && service.ajaxCallStarted("RemoveCartItem", "删除购买项目...");
            m.lockCart = !0;
            $.ajax({
                type: "POST",
                url: m.adjustUrl(g),
                xhrFields: r,
                dataType: "text",
                data: {
                    Designer: 1
                },
                success: function(b) {
                    m.lockCart = !1;
                    service.ajaxCallEnded && service.ajaxCallEnded("RemoveCartItem");
                    d && d(b);
                },
                error: function(b) {
                    m.lockCart = !1;
                    service.ajaxCallEnded && service.ajaxCallEnded("RemoveCartItem");
                    f && f(b);
                }
            });
        }
    };
    this.updateCartItemQuantity = function(c, e, d, f, g, k) {
        if (m.lockCart) {
            setTimeout(function() {
                m.updateCartItemQuantity(c, e, d, f, g, k);
            }, 100);
        } else {
            k || (k = h);
            var n = "/" + b.AppURI + "/Cart/UpdateQty/" + c + "/" + e + "/" + d + "/" + f;
            service.ajaxCallStarted && service.ajaxCallStarted("UpdateCartItemQuantity", "更新数量...");
            m.lockCart = !0;
            $.ajax({
                type: "POST",
                url: m.adjustUrl(n),
                xhrFields: r,
                dataType: "text",
                data: {
                    Designer: 1
                },
                success: function(b) {
                    m.lockCart = !1;
                    service.ajaxCallEnded && service.ajaxCallEnded("UpdateCartItemQuantity");
                    g && g(b);
                },
                error: function(b) {
                    m.lockCart = !1;
                    service.ajaxCallEnded && service.ajaxCallEnded("UpdateCartItemQuantity");
                    k && k(b);
                }
            });
        }
    };
    this.saveCartItemNotes = function(b, c, f, g, h) {
        if (m.lockCart) {
            setTimeout(function() {
                m.saveCartItemNotes(b, c, f, g, h);
            }, 100);
        } else {
            return d({
                methodName: "SaveCartItemNotes",
                parameters: [b, c],
                successRootTagName: "OK",
                deserializationSettings: {},
                loadingMessage: "保存备注",
                processResults: null,
                success: g,
                error: h,
                postData: {
                    designer: 1,
                    Notes: f
                },
                lockCart: !0
            });
        }
    };
    this.clearCart = function(b, c, d, f) {
        service.getCart(b, !1, function(b) {
            for (var f = 0, g = 0; g < b.cart_retail_items.length; g++) {
                service.removeCartItem(c, b.cart_retail_items[g].cart_retail_item_id, function() {
                    f++;
                    f == b.cart_retail_items.length && d && d();
                });
            }
        }, function(b, c, e, d) {
            f && f(b, c, e, d);
        });
    };
    this.removeCartItem = function(c, e, d, f) {
        m.lockCart ? setTimeout(function() {
            m.removeCartItem(c, e, d, f);
        }, 100) : (service.ajaxCallStarted && service.ajaxCallStarted("RemoveCartItem", "从购物车中删除..."), m.lockCart = !0, $.ajax({
            type: "POST",
            url: m.adjustUrl("/" + b.AppURI + "/Cart/Remove/" + c + "/" + e),
            xhrFields: r,
            data: {
                Designer: 1
            },
            success: function(b) {
                m.lockCart = !1;
                service.ajaxCallEnded && service.ajaxCallEnded("RemoveCartItem");
                d && d(b);
            },
            error: function(b, c, e) {
                m.lockCart = !1;
                service.ajaxCallEnded && service.ajaxCallEnded("RemoveCartItem");
                f && f(b, c, e);
            }
        }));
    };
    this.saveCartEmail = function(b, c, f, g) {
        if (m.lockCart) {
            setTimeout(function() {
                m.saveCartEmail(b, c, f, g);
            }, 100);
        } else {
            var h = {
                methodName: "SaveCartEmail",
                parameters: [b],
                successRootTagName: "OK",
                loadingMessage: "保存 Cart E-mail",
                success: f,
                error: g,
                lockCart: !0
            };
            h.postData = {
                email: c
            };
            return d(h);
        }
    };
    this.getCart = function(b, c, f, g) {
        return d({
            methodName: "GetCart",
            parameters: [b],
            queryStringParameters: {
                ReadyToOrder: c
            },
            successRootTagName: "Cart",
            deserializationSettings: {
                carts: {
                    name: "cart",
                    mode: "single"
                },
                retail_products: {
                    mode: "merge"
                },
                cart_retail_item_sizes: {
                    name: "selectedSizes",
                    mode: "array"
                },
                validation_messages: {
                    mode: "single"
                }
            },
            loadingMessage: "获取购物车",
            processResults: function(b) {
                if ("" == b) {
                    return {};
                }
                var c = b.cart;
                if (c.validation_messages && c.validation_messages.validation_message) {
                    for (c.validation_messages = c.validation_messages.validation_message, b = c.validation_messages.length - 1; 0 <= b; b--) {
                        var e = c.validation_messages[b];
                        if (e.cart_retail_item_id) {
                            c.validation_messages.splice(b, 1);
                            var d = findMatch(c.cart_retail_items, function(b) {
                                return b.cart_retail_item_id === e.cart_retail_item_id;
                            });
                            e.cartRetailItem = d;
                            if (e.cart_retail_item_size_id) {
                                var f = findMatch(d.sizes, function(b) {
                                    return b.cart_retail_item_size_id === e.cart_retail_item_size_id;
                                });
                                e.cartRetailItemSize = f;
                                f.validation_messages || (f.validation_messages = []);
                                f.validation_messages.push(e);
                            }
                            d.validation_messages || (d.validation_messages = []);
                            d.validation_messages.push(e);
                        } else {
                            c.validation_messages[b] = e.replace("~", "");
                        }
                    }
                } else {
                    c.can_checkout = !0;
                }
                for (b = 0; b < c.cart_retail_items.length; b++) {
                    d = c.cart_retail_items[b];
                    "null" == d.note && (d.note = null);
                    d.original_note = d.note;
                    d.sidePreviews = [];
                    d.design_product_image_url_front && d.sidePreviews.push({
                        name: "Front",
                        imgUrl: d.design_product_image_url_front
                    });
                    d.design_product_image_url_back && d.sidePreviews.push({
                        name: "Back",
                        imgUrl: d.design_product_image_url_back
                    });
                    d.design_product_image_url_sleeveleft && d.sidePreviews.push({
                        name: "Left Sleeve",
                        imgUrl: d.design_product_image_url_sleeveleft
                    });
                    d.design_product_image_url_sleeveright && d.sidePreviews.push({
                        name: "Right Sleeve",
                        imgUrl: d.design_product_image_url_sleeveright
                    });
                    0 == d.sidePreviews.length && d.sidePreviews.push({
                        name: "Front",
                        imgUrl: d.design_product_image_url
                    });
                    if (d.sizes && d.sizeids) {
                        var f = d.sizes.split(","),
                            g = d.sizeids.split(",");
                        d.sizeData = [];
                        for (var h = 0; h < f.length; h++) {
                            d.sizeData.push({
                                name: f[h],
                                id: g[h]
                            });
                        }
                    }
                    for (f = 0; f < d.selectedSizes.length; f++) {
                        g = d.selectedSizes[f], g.quantity = parseInt(g.quantity || 0), 0 == g.quantity ? (d.selectedSizes.splice(f, 1), f--) : g.cart_retail_item_size_namenumbers && g.cart_retail_item_size_namenumbers.length ? g.cart_retail_item_size_namenumbers[0] ? d.hasNamesNumbers = !0 : (d.hasNamesNumbers = !1, g.cart_retail_item_size_namenumbers = null) : g.cart_retail_item_size_namenumbers = null, g.subtotal && g.quantity && (g.subtotal = parseFloat(g.subtotal) * parseFloat(g.quantity)), g.original_product_style_size_id =
                            g.product_style_size_id;
                    }
                    var k = "," + d.sizes + ",";
                    d.selectedSizes.sort(function(b, c) {
                        return k.indexOf("," + b.product_style_size_name + ",") - k.indexOf("," + c.product_style_size_name + ",");
                    });
                }
                c.getNameNumber = function(b) {
                    for (var e = 0; e < c.cart_retail_items.length; e++) {
                        var d = c.cart_retail_items[e];
                        if (d.hasNamesNumbers) {
                            for (var f = 0; f < d.selectedSizes.length; f++) {
                                var g = d.selectedSizes[f];
                                if (g.cart_retail_item_size_namenumbers && g.cart_retail_item_size_namenumbers.length) {
                                    for (var h = 0; h < g.cart_retail_item_size_namenumbers.length; h++) {
                                        var k = g.cart_retail_item_size_namenumbers[h];
                                        if (k.cart_retail_item_size_namenumber_id == b) {
                                            return k;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return null;
                };
                return c;
            },
            success: f,
            error: g
        });
    };
    this.getCartShippingCountryList = function(b, c, f) {
        return d({
            methodName: "GetCartShippingCountryList",
            parameters: [b],
            successRootTagName: "countries",
            deserializationSettings: {
                country: {
                    name: "countries",
                    mode: "array"
                }
            },
            loadingMessage: "获取列表-1",
            processResults: function(b) {
                for (var c = 0; c < b.countries.length; c++) {
                    var e = b.countries[c];
                    e.require_state = 1 == e.country_id || 2 == e.country_id ? !0 : !1;
                }
                return b.countries;
            },
            useCache: !0,
            success: c,
            error: f
        });
    };
    this.getCartBillingCountryList = function(b, c, f) {
        return d({
            methodName: "GetCartBillingCountryList",
            parameters: [b],
            successRootTagName: "countries",
            deserializationSettings: {
                country: {
                    name: "countries",
                    mode: "array"
                }
            },
            loadingMessage: "获取列表-2",
            processResults: function(b) {
                for (var c = 0; c < b.countries.length; c++) {
                    var e = b.countries[c];
                    e.require_state = 1 == e.country_id || 2 == e.country_id ? !0 : !1;
                }
                return b.countries;
            },
            useCache: !0,
            success: c,
            error: f
        });
    };
    this.getCartShippingStateList = function(b, c, f) {
        return d({
            methodName: "GetCartShippingStateList",
            parameters: [b],
            successRootTagName: "states",
            deserializationSettings: {
                state: {
                    name: "states",
                    mode: "array"
                }
            },
            loadingMessage: "获取列表-3",
            processResults: function(b) {
                return b.states;
            },
            useCache: !0,
            success: c,
            error: f
        });
    };
    this.getCartBillingStateList = function(b, c, f) {
        return d({
            methodName: "GetCartBillingStateList",
            parameters: [b],
            successRootTagName: "states",
            deserializationSettings: {
                state: {
                    name: "states",
                    mode: "array"
                }
            },
            loadingMessage: "获取列表-4",
            processResults: function(b) {
                return b.states;
            },
            useCache: !0,
            success: c,
            error: f
        });
    };
    this.getCartShippingAddresses = function(b, c, f) {
        return d({
            methodName: "GetCartShippingAddresses",
            parameters: [b],
            successRootTagName: "addresses",
            deserializationSettings: {
                address: {
                    name: "addresses",
                    mode: "array"
                }
            },
            loadingMessage: "获取以保存的地址",
            processResults: function(b) {
                return b.addresses;
            },
            success: c,
            error: f
        });
    };
    this.saveCartShippingAddress = function(b, c, f, g) {
        return d({
            methodName: "SaveCartShippingAddress",
            parameters: [b],
            successRootTagName: "address_id",
            deserializationSettings: {},
            loadingMessage: "保存地址",
            processResults: function(b) {},
            success: f,
            error: g,
            postData: c
        });
    };
    this.saveCartBillingAddress = function(b, c, f, g) {
        return d({
            methodName: "SaveCartBillingAddress",
            parameters: [b],
            successRootTagName: "address_id",
            deserializationSettings: {},
            loadingMessage: "保存地址",
            processResults: function(b) {},
            success: f,
            error: g,
            postData: c
        });
    };
    this.getCartShippingMethods = function(b, c, f) {
        return d({
            methodName: "GetCartShippingMethods",
            parameters: [b],
            successRootTagName: "shipping_methods",
            deserializationSettings: {},
            loadingMessage: "获取购物设置",
            processResults: function(b) {
                return b.shipping_method;
            },
            success: c,
            error: f
        });
    };
    this.saveCartShippingMethod = function(b, c, f, g) {
        return d({
            methodName: "SaveCartShippingMethod",
            parameters: [b],
            successRootTagName: "method_id",
            deserializationSettings: {},
            loadingMessage: "保存购物设置",
            processResults: function(b) {
                return b;
            },
            postData: {
                method_id: c
            },
            success: f,
            error: g
        });
    };
    this.saveCartOrder = function(c, e, f, g) {
        return d({
            methodName: "SaveCartOrder",
            parameters: [c],
            successRootTagName: "OrderNumber",
            deserializationSettings: {},
            loadingMessage: "保存订单",
            processResults: function(b) {},
            success: f,
            error: g,
            postData: e,
            useSSL: "Credit Card" == e.payment_method ? !0 : b.sslDomain && jQuery.support.cors ? !0 : !1
        });
    };
    this.getCartOrder = function(b, c, f) {
        return d({
            methodName: "GetCartOrder",
            parameters: [UserToken],
            successRootTagName: "OrderNumber",
            deserializationSettings: {},
            loadingMessage: "获取订单",
            processResults: function(b) {},
            success: c,
            error: f,
            postData: order
        });
    };
    this.sendDesignEmail = function(b, c, f, g, h, k, m, n, q, r) {
        g = '<?xml version="1.0"?><xml><designs><to_email>' + htmlEscape(g) + "</to_email><from_email>" + htmlEscape(h) + "</from_email><from_name>" + htmlEscape(k) + "</from_name><to_name>" + htmlEscape(m) + "</to_name><message>" + htmlEscape(n) + "</message></designs></xml>";
        return d({
            methodName: "SendDesignEmail",
            parameters: [b, c, f],
            successRootTagName: "Design",
            deserializationSettings: {},
            loadingMessage: "发送电子邮件",
            processResults: function(b) {},
            success: q,
            error: r,
            postData: {
                designer: 1,
                xmlTemplate: g
            }
        });
    };
    this.getAccountDetails = function(b, c) {
        return d({
            methodName: "Account/EditUserXml",
            parameters: [],
            successRootTagName: "User",
            deserializationSettings: {},
            loadingMessage: "检索帐户",
            processResults: function(b) {},
            success: b,
            error: c,
            noAppTokenInUrl: !0
        });
    };
    this.updateAccountDetails = function(b, c, f) {
        return d({
            methodName: "Account/EditUserXml",
            parameters: [],
            successRootTagName: "Success",
            deserializationSettings: {},
            loadingMessage: "更新账号",
            processResults: function() {},
            success: c,
            error: f,
            postData: b,
            noAppTokenInUrl: !0
        });
    };
    this.getOrderHistory = function(b, c) {
        return d({
            methodName: "Account/OrderHistoryXml",
            parameters: [],
            successRootTagName: "OrderSearchResult",
            deserializationSettings: {
                retail_products: {
                    mode: "merge"
                },
                addresses: {
                    mode: "merge"
                },
                billing_address: {
                    name: "billing_address",
                    mode: "single"
                },
                shipping_address: {
                    name: "shipping_address",
                    mode: "single"
                },
                order_retail_item_sizes: {
                    name: "selectedSizes",
                    mode: "array"
                }
            },
            loadingMessage: "获取订单",
            processResults: function(b) {
                return "" === b ? [] : b.orders;
            },
            success: b,
            error: c,
            noAppTokenInUrl: !0,
            useAppURI: !0
        });
    };
    this.deserializeCartTests = function(b) {
        return k($.parseXML(b).children[0], {
            tests: {
                mode: "merge"
            },
            billing_address: {
                mode: "single"
            },
            shipping_address: {
                mode: "single"
            },
            result: {
                mode: "single"
            },
            cart: {
                mode: "single"
            },
            cart_item: {
                name: "cart_items"
            },
            size: {
                name: "sizes"
            },
            name_number: {
                name: "names_numbers"
            }
        }).test;
    };
    this.resultCache = n;
};
var numErrorsLogged = 0;
window.onerror = function(b, d, c) {
    console && console.log && console.log("错误: " + b + "\n" + d + ":" + c);
    10 > numErrorsLogged && (jQuery.post(service.adjustUrl("/" + (ezdVars && ezdVars.ApiDomain ? ezdVars.ApiDomain : "open.dev.jzw.la/clientapi") + "/DesignerInterface/LogJavascriptError"), {
        msg: b,
        jsUrl: d,
        line: c,
        pageUrl: window.location.href,
        UserToken: ezdVars ? ezdVars.UserToken : null,
        AppToken: ezdVars ? ezdVars.AppToken : null
    }), numErrorsLogged++);
    return !1;
};

var WINDOW_ONBEFOREUNLOAD = function() {
//    console.log('state.selectedDesign: '+ state.selectedDesign);
//    console.log('state.isInitialDesign: '+ state.isInitialDesign);
//    console.log('state.isChangedDesign: '+ state.isChangedDesign);
//    console.log('ezdVars.userToken:', ezdVars.userToken);
    if(ezdVars.UserToken == 0){
//        return "您暂时还未登录哦，系统将为您跳转到登录页面，是否继续？";
    }else{
        if(!state.isDone){
            if (state.selectedDesign) {
                if(state.isInitialDesign || state.isChangedDesign){
                    return "您的设计还没保存，为避免丢失，建议保存后再执行。";
                }
            }
        }
    }
};

window.onbeforeunload = WINDOW_ONBEFOREUNLOAD;

window.console || (window.console = {});
window.console.log || (window.console.log = function() {});
window.console.debug || (window.console.debug = function() {});

window.service = new EasyTeeService({
    domain: ezdVars.ApiDomain,
    sslDomain: ezdVars.SSLApiDomain,
    AppToken: ezdVars.AppToken,
    publisherID: ezdVars.PublisherID,
    AppURI: ezdVars.AppURI,
    addDomainToUrls: true
});
var dsLocation = ezdVars.DesignerLocation + "/ds";
if (!window.state || window.state.designer) {
    console.log('window.state init');
    window.state = {
        selectedDesignID: null,
        selectedDesign: null,
        selectedProductID: null,
        selectedProduct: null,
        selectedProductStyleID: null,
        selectedProductStyle: null,
        fontCategories: null,
        designer: null,
        storeInkColors: null,
        cart: {},
        namesNumbers: null,
        quoteInformation: null,
        currentUserToken: ezdVars.UserToken,
        activeUserToken: ezdVars.UserToken,
        currentSessionToken: ezdVars.SessionToken
    };
}
state.selectedProductID = ezdVars.ProductID;
state.selectedDesignID = ezdVars.DesignID;
state.selectedProductStyleID = ezdVars.ProductStyleID;
state.dsUtils = new ui.DSUtils;
$(document).ready(function() {
    getUrlParam && getUrlParam("themeName") && (ezdVars.ThemeName = getUrlParam("themeName"));
    "default" == ezdVars.ThemeName && (ezdVars.ThemeName = null);
    var b = navigator.userAgent.match(/(MSIE 8)/g) || navigator.userAgent.match(/(MSIE 7)/g) || navigator.userAgent.match(/(MSIE 6)/g),
        d = navigator.userAgent.match(/(MSIE 9)/g);
    $.browser && (b = $.browser.msie && 9 > parseFloat($.browser.version, 10), d = $.browser.msie && 10 > parseFloat($.browser.version, 10));
    b ? getHtmlContent($("#dsContainer"), ezdVars.DesignerLocation + "/ds/html/modals/browserWarningIE8.html", function() {}) : (d && (b = $("<div></div>"), b.insertBefore($("#dsContainer")), getHtmlContent(b, ezdVars.DesignerLocation + "/ds/html/modals/browserWarningIE9.html", function() {})), ezdVars.ThemeName ? service.getThemeInfo(ezdVars.DesignerLocation + "/ds/themes/" + ezdVars.ThemeName + "/theme.xml", function(b) {
        state.theme = b;
        state.theme.hasFile = function(b) {
            if (!b) {
                return !1;
            }
            b = b.toLowerCase();
            for (var c = 0; c < state.theme.files.length; c++) {
                if (b.endsWith(state.theme.files[c].toLowerCase())) {
                    return !0;
                }
            }
        };
        state.theme.url = function(b) {
            if (!state.theme.hasFile(b)) {
                return b;
            }
            b = b.replace("/ds/html/", "/ds/themes/" + ezdVars.ThemeName + "/html/");
            b = b.replace("/ds/images/", "/ds/themes/" + ezdVars.ThemeName + "/images/");
            b = b.replace("/ds/css/", "/ds/themes/" + ezdVars.ThemeName + "/css/");
            ezdVars.Version && (b = 0 <= b.indexOf("?") ? b + ("&version=" + ezdVars.Version) : b + ("?version=" + ezdVars.Version));
            return b;
        };
        for (b = 0; b < state.theme.files.length; b++) {
            var d = state.theme.files[b];
            if (d.endsWith(".css")) {
                service.loadCss(ezdVars.DesignerLocation + "/ds/themes/" + ezdVars.ThemeName + "/" + d);
            } else {
                if (d.endsWith(".less") && window.less) {
                    var k = document.createElement("link");
                    k.setAttribute("rel", "stylesheet/less");
                    k.setAttribute("type", "text/css");
                    k.setAttribute("href", ezdVars.DesignerLocation + "/ds/themes/" + ezdVars.ThemeName + "/" + d);
                    document.getElementsByTagName("head")[0].appendChild(k);
                    less.sheets.push(k);
                    less.refresh();
                }
            }
        }
        getHtmlContent($("#dsContainer"), state.theme.url(ezdVars.DesignerLocation + "/ds/html/dsStructure.html"), function() {
            state.dsUtils.loadDesignInformation(function() {
                startAngularApp();
            });
            var b = document.getElementById("designerParentContainer");
            b && "iframe" == ezdVars.EmbedType || (b = document.getElementById("dsContainer"));
            ezdVars.BackgroundColor ? $(b).css("background-color", getColorString(ezdVars.BackgroundColor)) : ezdVars.Background && 0 == ezdVars.Background.indexOf("http") && $(b).css("background-image", "url(" + ezdVars.Background + ")");
        });
    }) : (state.theme = {
        url: function(b) {
            return b;
        }
    }, state.theme.hasFile = function(b) {
        return !1;
    }, getHtmlContent($("#dsContainer"), state.theme.url(ezdVars.DesignerLocation + "/ds/html/dsStructure.html"), function() {
        state.dsUtils.loadDesignInformation(function() {
            startAngularApp();
        });
    })));
});
var hideLoader = null;
var pendingAjaxCalls = [];
var excludedAjaxCalls = "LogOff CheckMobileUpload GetStoreDesignerToolTips GetFontList GetCartBillingCountryList GetCartShippingCountryList GetCartBillingStateList GetCartShippingStateList".split(" ");

function hideLoaderForNext() {
    hideLoader = {};
}

function ajaxCallStarted(b, d, c) {
//    console.debug('ajaxCallStarted ------> ', b, d, c);
    if (!(0 <= excludedAjaxCalls.indexOf(b))) {
        if (hideLoader && !hideLoader.methodName) {
            hideLoader.methodName = b;
        } else {
            d = d || "载入中，请稍等...";
            if(d == '载入中，请稍等...'){
                debugger;
            }
            pendingAjaxCalls.push(d);
            var g = $("#isd-LoaderContainer");
            b = $("#angularAppElement").height();
            var k = $("#angularAppElement").width();
            g.css("height", b + "px");
            g.css("width", k + "px");
            g.find(".loading-center-text").text(d);
            c || (c = 10);
            0 < c ? setTimeout(function() {
                pendingAjaxCalls.length && g.fadeIn();
            }, c) : g.show();
        }
    }
}
function ajaxCallEnded(b) {
//    console.debug('ajaxCallEnded ------> ', b);
    if(hideLoader && hideLoader.methodName == b){
        hideLoader = null
    }else{
        pendingAjaxCalls.pop();
        setTimeout(function() {
            if(pendingAjaxCalls.length == 0){
                $("#isd-LoaderContainer").fadeOut();
            }
        }, 100);
    }
}
service.ajaxCallStarted = ajaxCallStarted;
service.ajaxCallEnded = ajaxCallEnded;
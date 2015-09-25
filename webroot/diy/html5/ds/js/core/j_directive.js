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
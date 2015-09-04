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
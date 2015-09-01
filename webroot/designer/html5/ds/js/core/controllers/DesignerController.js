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
            var time = 2000;
            //var $time = 11112000;
            alert($time);
            state.isDone = true;
            setTimeout(function(){
                window.location.href = $('#activityDirect').attr('href');
            },$time);
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
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
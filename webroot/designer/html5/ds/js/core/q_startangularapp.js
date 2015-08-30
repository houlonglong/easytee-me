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
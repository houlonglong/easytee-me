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
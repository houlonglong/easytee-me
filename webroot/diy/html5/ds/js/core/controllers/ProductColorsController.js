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
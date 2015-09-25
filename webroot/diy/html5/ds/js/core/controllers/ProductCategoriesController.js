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
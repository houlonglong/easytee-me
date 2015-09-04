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
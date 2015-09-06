function convert(){
    var svg = Snap("#svg_tmp");
    console.log($("#designerContainer svg")[0].style.backgroundColor);
    var rect = svg.paper.rect(0, 0, 500, 500, 0);
    rect.attr({
        fill: $("#designerContainer svg")[0].style.backgroundColor
    });
    canvg('canvas_convert', $("#designerContainer svg")[0].outerHTML,{
        log:true,
        useCORS: true,
        ignoreMouse: true, ignoreAnimation: true ,
        renderCallback: function (dom) {
            var imageDataUri = $("#canvas_convert")[0].toDataURL("image/png");
            svg.paper.image(imageDataUri, 0, 0, 500, 500);
            canvg('canvas_convert', $("#side1 svg")[0].outerHTML,{
                log:true,
                useCORS: true,
                ignoreMouse: true, ignoreAnimation: true ,
                renderCallback: function (dom) {
                    var imageDataUri = $("#canvas_convert")[0].toDataURL("image/png");
                    svg.paper.image(imageDataUri, 0, 0, 500, 500);
                    canvg('canvas_convert', $("#svg_tmp")[0].outerHTML,{
                        log:true,
                        useCORS: true,
                        ignoreMouse: true, ignoreAnimation: true ,
                        renderCallback: function (dom) {
                            var imageDataUri = $("#canvas_convert")[0].toDataURL("image/png");
                            console.log(imageDataUri);
                        }
                    })

                }
            })
        }
    })
    //var r = s.paper.rect( 0, 0, 500, 500);
    //r.paper.attr("fill","#"+$color);
}
function convert_to_png(cb){
    var svg = Snap("#svg_tmp");
    console.log($("#designerContainer svg")[0].style.backgroundColor);
    var rect = svg.paper.rect(0, 0, 500, 500, 0);
    rect.attr({
        fill: $("#designerContainer svg")[0].style.backgroundColor
    });
    canvg('canvas_convert', $("#designerContainer svg")[0].outerHTML,{
        log:true,
        useCORS: true,
        ignoreMouse: true, ignoreAnimation: true ,
        renderCallback: function (dom) {
            var imageDataUri = $("#canvas_convert")[0].toDataURL("image/png");
            svg.paper.image(imageDataUri, 0, 0, 500, 500);
            canvg('canvas_convert', $("#side1 svg")[0].outerHTML,{
                log:true,
                useCORS: true,
                ignoreMouse: true, ignoreAnimation: true ,
                renderCallback: function (dom) {
                    var imageDataUri = $("#canvas_convert")[0].toDataURL("image/png");
                    svg.paper.image(imageDataUri, 0, 0, 500, 500);
                    canvg('canvas_convert', $("#svg_tmp")[0].outerHTML,{
                        log:true,
                        useCORS: true,
                        ignoreMouse: true, ignoreAnimation: true ,
                        renderCallback: function (dom) {
                            var imageDataUri = $("#canvas_convert")[0].toDataURL("image/png");
                            //console.log(imageDataUri);
                            if(cb) cb(imageDataUri);
                        }
                    })

                }
            })
        }
    })
    //var r = s.paper.rect( 0, 0, 500, 500);
    //r.paper.attr("fill","#"+$color);
}
//convert_to_png(function(data){
//    console.log(data);
//});
function reset_canvas(){
    $("#canvas_convert").parent().html('<canvas id="canvas_convert" width="500px" height="500px"></canvas>');
    $("#svg_tmp").empty();
}
function convert(){
    //canvg('canvas_convert', 'http://oss-cn-hangzhou.aliyuncs.com/open-edit/dev/design/svg/825/front.svg',{
    //renderCallback: function (dom) {
    //var imageDataUri = $("#canvas_convert")[0].toDataURL("image/png");
    //console.log(imageDataUri);
    //}
    //});
    var svg = Snap("#svg_tmp");
    canvg('canvas_convert', $("#designerContainer svg")[0].outerHTML,{
        log:true,
        useCORS: true,
        ignoreMouse: true, ignoreAnimation: true ,
        renderCallback: function (dom) {
            console.log(1)
            var imageDataUri = $("#canvas_convert")[0].toDataURL("image/png");
            svg.paper.image(imageDataUri, 0, 0, 500, 500);
            canvg('canvas_convert', $("#side1 svg")[0].outerHTML,{
                log:true,
                useCORS: true,
                ignoreMouse: true, ignoreAnimation: true ,
                renderCallback: function (dom) {
                    var imageDataUri = $("#canvas_convert")[0].toDataURL("image/png");
                    svg.paper.image(imageDataUri, 0, 0, 500, 500);
                    console.log(2)
                    canvg('canvas_convert', $("#svg_tmp")[0].outerHTML,{
                        log:true,
                        useCORS: true,
                        ignoreMouse: true, ignoreAnimation: true ,
                        renderCallback: function (dom) {
                            console.log(3)
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

function reset_canvas(){
    $("#canvas_convert").parent().html('<canvas id="canvas_convert" width="500px" height="500px"></canvas>');
    $("#svg_tmp").empty();
}
function change_text(){
    var val = $("#c_text").val();
    texts['text1'] = new fabric.Text(val, { left: 160, top: 150 });
    canvas.add(texts['text1']);
}
var canvas = new fabric.Canvas('canvas');
var texts = {};
var rect = new fabric.Rect({
    top : 100,
    left : 100,
    width : 60,
    height : 70,
    fill : 'red'
});
//texts['text1'] = new fabric.Text('hello world', { left: 160, top: 150 });
//canvas.add(texts['text1']);
//fabric.Image.fromURL('http://www.easytee.me/resources/public/image/site-logo.png', function(oImg) {
//    console.log(oImg);
//    canvas.add(oImg);
//},{
//    left: 160,
//    top: 100,
// });
//canvas.add(rect);
$(function(){

    $("#text1").keydown(function(){
        if(this.value){
            console.log(this.value,texts['text1'])
            texts['text1'].setText(this.value);
            canvas.renderAll();
        }
    });
    $("#file_select").change(function(e){
        if (!(window.File && window.FileList && window.FileReader)) {
            return alert("不支持上传方法");
        }
        var files = e.target.files || e.dataTransfer.files;
        var file = files[0];
        console.log(file.name,file.type,file.size+"bytes",file);
        if (file.type.indexOf("svg") > 0) {
            var reader = new FileReader();
            reader.onload = function(e) {
                //$("#result").html(e.target.result);
                fabric.loadSVGFromURL(e.target.result, function(objects, options){
                    var obj = fabric.util.groupSVGElements(objects, options);
                    obj.set({
                        left: 100,
                        top: 100,
                    });
                    canvas.add(obj);
                });
            }
            reader.readAsDataURL(file);
            //reader.readAsText(file);
        }else if (file.type.indexOf("image") == 0) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var img_base64 = e.target.result;
                fabric.Image.fromURL(img_base64, function(oImg) {
                    // scale image down, and flip it, before adding it onto canvas
                    //oImg.scale(0.5).setFlipX(true);
                    canvas.add(oImg);
                },{
                    width:600,
                    height:581,
                    left:100,
                    top:100
                });
                //console.log(img_base64);
                //$("#result").html('<img src="'+img_base64+'">');
            };
            reader.readAsDataURL(file);
        }
    });
});

(function(){

})();
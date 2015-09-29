$.fn.fileUploader = function(option) {

    var opt = {
        callback: function(file, dataUrl){
            console.log(file, dataUrl);
        }
    };

    option && option.callback && (opt.callback = option.callback);

    function fileSelect(e) {
        e = e || window.event;
        var files = e.target.files;
        var reg = /image\/.*/i;
        for(var i = 0, f; f = files[i]; i++) {
            if(!f.type.match(reg)) {
                continue;
            }
            var reader = new FileReader();
            reader.onload = (function(file) {
                return function() {
                    opt.callback(file, this.result);
                };
            })(f);
            reader.readAsDataURL(f);
        }
    }

    $(this).each(function(idx, obj){
        if(window.File && window.FileList && window.FileReader && window.Blob) {
            obj.addEventListener('change', fileSelect, false);
        } else {
            console.error('Not found File Api');
        }
    });
};
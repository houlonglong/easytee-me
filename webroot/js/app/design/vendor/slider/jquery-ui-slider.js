/**
 * Created by haolun on 15/6/15.
 原始数据：
 0: [0, 10],
 1: [0.07, 20],
 2: [0.14, 30],
 3: [0.21, 50],
 4: [0.28, 100],
 5: [0.35, 150],
 6: [0.42, 200],
 7: [0.49, 250],
 8: [0.56, 300],
 9: [0.63, 350],
 10: [0.7, 400],
 11: [1, 1000]

 0    70   140  210  280       ...           630    700          1000
 --------------------------------------------------------------------
 |    |    |    |    |         ...           |      |             |
 10   20   30   50   100                     350    400          1000

 i:0 ignore
 i:1 [prev[0], this[0], this[1]-prev[1], prev[1]]; -> [0, 70, 10, 10]
 i:2 [prev[0], this[0], this[1]-prev[1], prev[1]]; -> [70, 140, 10, 20]
 i:3 [prev[0], this[0], this[1]-prev[1], prev[1]]; -> [140, 210, 20, 30]
 i:4 [prev[0], this[0], this[1]-prev[1], prev[1]]; -> [210, 280, 50, 50]
 ...
 i:10 [prev[0], this[0], this[1]-prev[1], prev[1]]; -> [630, 700, 50, 350]
 i:11 [prev[0], this[0], this[1]-prev[1], prev[1]]; -> [700, 1000, 600, 400]
 */
(function($) {
    $.fn.honest_slider = function(options, settings) {
        if($.fn.slider == undefined){
            console.error('honest_slider dependency error:','jquery.ui.slider is undefined.');
            return;
        }
        function honest_slider(opts){
            var self = this;
            var $slider, $slider_range;
            this.ranges = [];
            this.initParams = function(){
                opts.min = 0;
                opts.max = opts.scales[opts.scales.length-1][1];
            };
            this.initRanges = function(){
                var min = opts.min, max = opts.max, scales = opts.scales;
                if(scales.length>=2){
                    for(var i=0; i<scales.length; i++){
                        if(i!=0){
                            var scale = scales[i];
                            var scale_prev = scales[i-1];
                            var range_start;//jqSlider的value
                            var range_end;//jqSlider的value
                            var range_scale;//start和end之间的刻度数
                            var range_d;//范围的启始值
                            range_start = max*scale_prev[0];
                            range_end = max*scale[0];
                            range_scale = scale[1] - scale_prev[1];
                            range_d = scale_prev[1];
                            this.ranges.push([range_start, range_end, range_scale, range_d]);
                        }
                    }
                }
            };
            this.getValueBySliderValue = function(sliderValue){
                var value = 0;
                for(var i=0; i<this.ranges.length; i++){
                    var range = this.ranges[i];
                    if(sliderValue == 0){
                        value = this.ranges[0][3];
                    }else if(sliderValue > range[0] && sliderValue <= range[1]){
                        //公式：((当前刻度百分比)＊总刻度)＋差值
                        value = Math.floor((sliderValue-range[0])/(range[1]-range[0])*range[2])+range[3];
                    }
                }
                return value;
            };
            this.setSliderValueByValue = function(value){
                var sliderValue;
                var valueRanges = [];
                for(var i=0; i<this.ranges.length; i++){
                    var range = this.ranges[i];
                    if(i!=0){
                        valueRanges.push([this.ranges[i-1][3], this.ranges[i][3]]);
                        if(i==this.ranges.length-1){
                            if(this.ranges[i][3] != opts.max){
                                valueRanges.push([this.ranges[i][3], opts.max]);
                            }
                        }
                    }
                }
                value = parseInt(value);
                if(value <= this.ranges[0][3]){
                    sliderValue = this.ranges[0][0];
                }else{
                    for(var i=0; i<valueRanges.length; i++){
                        var valueRange = valueRanges[i];
                        var range = this.ranges[i];
                        if(value > valueRange[0] && value <= valueRange[1]){
                            sliderValue = (value - range[3]) / range[2] * (range[1] - range[0]) + range[0];
                        }
                    }
                }
                $slider.slider('option','value', sliderValue);
                $slider_range.width((sliderValue/opts.max)*100+"%");
                opts.slider.call(window, self.getValueBySliderValue(sliderValue));
            };
            this.init = function(obj){
                this.initParams();
                this.initRanges();
                var $this = $(obj);
                $this.addClass('honest_slider');
                var slider_obj = $slider =  $('<div class="slider_obj"></div>');
                var slider_obj_range = $slider_range = $('<div class="ui-slider-range"></div>');
                slider_obj.append(slider_obj_range);
                var scales_obj = $('<div class="scales_obj"></div>');
                $this.append(slider_obj);
                $this.append(scales_obj);
                for(var i=0; i<opts.scales.length; i++){
                    var scale = opts.scales[i];
//                    if(i!=opts.scales.length-1){
                        var scale_obj = $('<div class="scale_obj"><i class="line"></i><i class="number">'+scale[1]+'</i></div>').css('left', scale[0]*100+'%');
                        scales_obj.append(scale_obj);
//                    }
                }
                scales_obj.find('.number').click(function(){
                    self.setSliderValueByValue($(this).text());
                    opts.slider.call(window, $(this).text());
                });
                slider_obj.slider({
                    min: opts.min,
                    max: opts.max,
                    slide: function (event, ui) {
                        slider_obj_range.width((ui.value/opts.max)*100+"%");
                        opts.slider.call(window, self.getValueBySliderValue(ui.value));
                    }
                });
            };
            this.value = this.setSliderValueByValue;
        }
        return this.each(function() {
            if ($.type(options) === 'string') {
                var obj = $(this).data('obj');
                obj[options](settings);
                return false;
            }
            var opts = $.extend({}, $.fn.honest_slider.defaults, options);
            var obj = new honest_slider(opts);
            obj.init(this);
            $(this).data('obj', obj);
            opts.value && obj.setSliderValueByValue(opts.value);
        });
    };

    $.fn.honest_slider.defaults = {
        value: 50,
        min: 0,
        max: 1000,
        scales: [
            [0, 10],
            [0.07, 20],
            [0.14, 30],
            [0.21, 50],
            [0.28, 100],
            [0.35, 150],
            [0.42, 200],
            [0.49, 250],
            [0.56, 300],
            [0.63, 350],
            [0.7, 400],
            [1, 1000]
        ],
        slider: function(value){
            console.log(value);
        }
    };

})(jQuery);